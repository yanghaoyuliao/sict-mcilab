export type Language = "zh" | "en";
export type Localized = { zh: string; en: string };
export const site = {
  name: {
    zh: "多模态认知智能实验室",
    en: "Multimodal Cognitive Intelligence Lab",
  },
  school: {
    zh: "中国科学院大学",
    en: "University of Chinese Academy of Sciences",
  },
  institute: {
    zh: "中国科学院沈阳计算技术研究所",
    en: "Shenyang Institute of Computing Technology, CAS",
  },
  email: "yubihui@sict.ac.cn",
  phone: "024-24696188-8668",
  address: {
    zh: "辽宁省沈阳市南屏东路 16 号",
    en: "16 Nanping East Road, Shenyang, Liaoning, China",
  },
  postcode: "110168",
  updated: "2026-11-02",
  educationCenter: "http://yjs.sict.ac.cn/",
};

export const navigation = [
  { path: "/", label: { zh: "首页", en: "Home" } },
  { path: "/research", label: { zh: "研究方向", en: "Research" } },
  { path: "/team", label: { zh: "团队成员", en: "Members" } },
  { path: "/publications", label: { zh: "科研成果", en: "Publications" } },
  { path: "/news", label: { zh: "新闻动态", en: "News" } },
  { path: "/join", label: { zh: "加入我们", en: "Join us" } },
  { path: "/contact", label: { zh: "联系方式", en: "Contact" } },
];
