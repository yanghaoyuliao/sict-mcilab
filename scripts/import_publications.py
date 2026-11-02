"""Extract Excel records for review; never overwrite curated website data.

Usage: python3 scripts/import_publications.py [workbook.xlsx]
Supports the original 论文总表 and the newer 四人联合总表. Requires openpyxl.
"""
import argparse
import json
import re
from pathlib import Path

import openpyxl

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_SOURCE = ROOT / "materials/incoming/2026-11-02/四位研究者_联合论文目录_2026-11-01.xlsx"


def normalize(title):
    return re.sub(r"\W+", "", str(title or "")).casefold()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("workbook", nargs="?", type=Path, default=DEFAULT_SOURCE)
    args = parser.parse_args()
    source = args.workbook.resolve()
    existing = json.loads((ROOT / "src/data/publications.json").read_text())
    by_title = {normalize(paper["title"]): paper for paper in existing}
    by_record = {paper.get("sourceRecord"): paper for paper in existing}
    workbook = openpyxl.load_workbook(source, read_only=True, data_only=True)
    try:
        if "四人联合总表" in workbook.sheetnames:
            sheet = "四人联合总表"
            rows = list(workbook[sheet].values)
            start = next(i for i, row in enumerate(rows) if row and row[0] == "编号")
            indexes = dict(record=0, year=1, title=2, authors=3, venue=4, ccf=5, status=6, url=10)
        elif "论文总表" in workbook.sheetnames:
            sheet = "论文总表"
            rows = list(workbook[sheet].values)
            start = next(i for i, row in enumerate(rows) if row and row[0] == "年份")
            indexes = dict(year=0, ccf=1, title=2, venue=3, authors=4, status=5, url=6)
        else:
            raise ValueError("Workbook must contain 四人联合总表 or 论文总表")
    finally:
        workbook.close()

    candidates = []
    for row in rows[start + 1:]:
        raw = {key: row[index] if index < len(row) else None for key, index in indexes.items()}
        if not isinstance(raw["year"], (int, float)) or not raw["title"]:
            continue
        if not 2024 <= int(raw["year"]) <= 2026:
            continue
        match = by_title.get(normalize(raw["title"]))
        if sheet == "四人联合总表":
            match = match or by_record.get(raw["record"])
        url = str(raw["url"] or "")
        candidates.append({
            "existingId": match["id"] if match else None,
            "action": "review-existing" if match else "review-new",
            "raw": raw,
            "review": [
                "核对正式题名、重复预印本、年份与发表去向",
                "从论文原文补全实验室相关作者并保留原顺序",
                "按已发表/已录用维护状态；未明确去向使用 arXiv/SSRN 来源",
                "CCF 归类需核对会议赛道；新论文分配唯一 ID 并检查页面关联",
            ] + ([] if url.startswith(("https://", "http://")) else ["缺少有效来源链接"]),
        })
    output = ROOT / ".qa/imports" / f"{source.stem}-candidates.json"
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps({
        "source": str(source), "sheet": sheet,
        "window": "2024–2026", "candidates": candidates,
    }, ensure_ascii=False, indent=2) + "\n")
    print(f"Prepared {len(candidates)} candidates: {output.relative_to(ROOT)}")
    print("Curated src/data/publications.json was not modified. Review and merge manually.")


if __name__ == "__main__":
    main()
