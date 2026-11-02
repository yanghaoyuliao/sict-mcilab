import { readFile, access, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readJson = async (file) =>
  JSON.parse(await readFile(path.join(root, file), "utf8"));
const importData = async (file) => {
  const source = await readFile(path.join(root, file), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  });
  return import(
    `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`
  );
};
const [members, news, papers, manifest, { research }] = await Promise.all([
  readJson("src/data/members.json"),
  readJson("src/data/news.json"),
  readJson("src/data/publications.json"),
  readJson("materials/asset-manifest.json"),
  importData("src/data/research.ts"),
]);
const errors = [];
const check = (condition, message) => {
  if (!condition) errors.push(message);
};
const localized = (value, label) =>
  check(
    value &&
      typeof value.zh === "string" &&
      value.zh.trim() &&
      typeof value.en === "string" &&
      value.en.trim(),
    `${label}: both zh and en are required`,
  );
const uniqueIds = (items, label) => {
  const seen = new Set();
  for (const item of items) {
    check(
      typeof item.id === "string" && /^[a-z0-9-]+$/.test(item.id),
      `${label}: invalid id ${item.id}`,
    );
    check(!seen.has(item.id), `${label}: duplicate id ${item.id}`);
    seen.add(item.id);
  }
};
const imagePaths = new Set();
const image = (value, label) => {
  if (value === null) return;
  check(
    typeof value === "string" &&
      /^images\/[a-z0-9/.-]+\.(webp|png|jpe?g|svg)$/.test(value) &&
      !value.includes(".."),
    `${label}: invalid image path`,
  );
  if (typeof value === "string") imagePaths.add(value);
};
const webUrl = (value, label) => {
  try {
    check(
      ["https:", "http:"].includes(new URL(value).protocol),
      `${label}: invalid protocol`,
    );
  } catch {
    check(false, `${label}: invalid URL`);
  }
};
uniqueIds(members, "members");
uniqueIds(news, "news");
uniqueIds(papers, "papers");
uniqueIds(research, "research");
const paperIds = new Set(papers.map((p) => p.id));
for (const person of members) {
  check(
    ["faculty", "secretary", "phd", "masters"].includes(person.group),
    `${person.id}: invalid member group`,
  );
  check(
    typeof person.name === "string" && person.name.trim(),
    `${person.id}: missing name`,
  );
  localized(person.role, `${person.id} role`);
  localized(person.interests, `${person.id} interests`);
  image(person.image, person.id);
  if (person.homepage) webUrl(person.homepage, person.id);
}
let previous = "9999-99-99";
for (const item of news) {
  check(
    /^\d{4}-\d{2}-\d{2}$/.test(item.date) &&
      !Number.isNaN(Date.parse(item.date)),
    `${item.id}: invalid date`,
  );
  check(item.date <= previous, `${item.id}: news must be sorted newest first`);
  previous = item.date;
  localized(item.title, `${item.id} title`);
  localized(item.summary, `${item.id} summary`);
  localized(item.category, `${item.id} category`);
  check(
    !item.paperId || paperIds.has(item.paperId),
    `${item.id}: missing related paper`,
  );
  check(
    Array.isArray(item.sections) && item.sections.length > 0,
    `${item.id}: empty article`,
  );
  image(item.image, item.id);
  if (item.source) webUrl(item.source, item.id);
  if (item.byline) localized(item.byline, `${item.id} byline`);
  for (const section of item.sections) {
    if (section.heading)
      localized(section.heading, `${item.id} section heading`);
    localized(section.body, `${item.id} body`);
    image(section.image, item.id);
    if (section.image) localized(section.caption, `${item.id} caption`);
  }
}
for (const paper of papers) {
  check(["A", "B", null].includes(paper.ccf), `${paper.id}: invalid CCF tier`);
  check(Number.isInteger(paper.year), `${paper.id}: invalid year`);
  check(
    typeof paper.published === "boolean",
    `${paper.id}: missing publication status`,
  );
  check(
    paper.authors.length > 0 && paper.title && paper.venue,
    `${paper.id}: incomplete record`,
  );
  check(
    ["已发表", "已录用"].includes(paper.status),
    `${paper.id}: invalid status`,
  );
  check(
    paper.status === (paper.published ? "已发表" : "已录用"),
    `${paper.id}: inconsistent status`,
  );
  check(
    paper.year >= 2024 && paper.year <= 2026,
    `${paper.id}: outside three-year window`,
  );
  check(
    new Set(paper.authors).size === paper.authors.length,
    `${paper.id}: duplicate author`,
  );
  webUrl(paper.authorSource, `${paper.id} author source`);
  webUrl(paper.url, paper.id);
}
for (const area of research) {
  localized(area.title, `${area.id} title`);
  localized(area.detail, `${area.id} detail`);
  for (const id of area.papers)
    check(paperIds.has(id), `${area.id}: missing paper ${id}`);
}
// Check literal assets in page code as well as image paths supplied by content.
async function visit(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) await visit(file);
    else if (/\.tsx?$/.test(entry.name)) {
      const source = await readFile(file, "utf8");
      for (const match of source.matchAll(
        /["'](images\/[a-z0-9/.-]+\.(?:webp|png|jpe?g|svg))["']/g,
      ))
        imagePaths.add(match[1]);
    }
  }
}
await visit(path.join(root, "src"));
const targets = manifest.map((item) => item.target);
check(
  new Set(targets).size === targets.length,
  "asset manifest: duplicate target",
);
for (const item of manifest) image(item.target, "asset manifest");
for (const file of imagePaths) {
  try {
    await access(path.join(root, "public", file));
  } catch {
    check(false, `Missing public asset: ${file}`);
  }
}
if (errors.length) {
  console.error(errors.map((error) => `• ${error}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    `Content OK: ${members.length} people, ${news.length} articles, ${papers.length} publications, ${research.length} research areas, ${imagePaths.size} images.`,
  );
}
