# 多模态认知智能实验室网站

国科大 / 中科院沈阳计算技术研究所实验室双语官网。采用浅色、深蓝与青绿的学术排版，以真实合照、新闻与论文图为主。包含八个栏目、新闻全文与成员详情，适配电脑和手机。

当前录入 **28 位成员、12 条新闻、48 篇近三年论文（2024–2026）**。成员包括教师 2 位、实验室秘书 1 位、博士研究生 4 位、硕士研究生 21 位。内容来源与校对事项见 [内容说明](docs/CONTENT.md)。

## 快速打开

安装 Node.js 22 LTS 后，在本项目文件夹打开终端：

```bash
npm install
npm run dev
```

打开终端显示的网址，通常为 <http://127.0.0.1:5173/>。保存源码会自动更新。终端按 `Control + C` 停止服务。遇到 npm 缓存权限问题，可使用 `npm install --cache /tmp/mci-lab-npm-cache`，不需要 sudo。

## 日常维护

最常用的维护入口：

| 内容                                     | 修改位置                                             |
| ---------------------------------------- | ---------------------------------------------------- |
| 成员、培养阶段、兴趣与照片路径           | `src/data/members.json`                              |
| 新闻标题、日期、双语正文与配图           | `src/data/news.json`                                 |
| 论文目录                                 | `src/data/publications.json`                         |
| 研究方向及论文关联                       | `src/data/research.ts`                               |
| 实践项目、相关技术与合作单位             | `src/data/collaboration.ts`                          |
| 实验室名称、机构和联系方式               | `src/data/site.ts`                                   |
| 首页介绍                                 | `src/pages/HomePage.tsx`                             |
| 首页精选论文与配图                       | `src/pages/PublicationsPage.tsx` 的 `FeaturedPapers` |
| 招生说明                                 | `src/pages/JoinPage.tsx`                             |
| 字体配色 / 版面 / 各页 / 论文 / 手机布局 | `src/styles/` 内对应 CSS 文件                        |

具体的新增成员、发布新闻和素材导入步骤见 [维护与文件管理](docs/MAINTENANCE.md)。双语文字用 `{ "zh": "中文", "en": "English" }` 配对维护。未知中文姓名保留英文；缺少或尚未确认的照片用 `null`。

**不要把照片或新闻稿放进 `dist/`。每次构建会重建该文件夹。** 原件放 `materials/incoming/日期/`，用于网页的整理版本放 `public/images/`。文件名使用英文小写和连字符，内容 JSON 中填写 `images/...` 路径。

## 文件夹用途

```text
src/
  pages/             八个栏目、新闻详情、404
  components/        页头页尾、标题、弹窗等公共组件
  context/           语言选择与提示
  data/              成员、新闻、论文、研究方向及机构资料
  lib/               资源路径等小工具
  styles/            分职责样式，index.css 统一导入
public/
  images/people/     成员肖像
  images/lab/        实验室合照
  images/news/       按新闻 slug 分类的配图
  images/collaboration/  实践项目、平台界面与技术图示
  images/institutions/  国科大与沈阳计算所标识
materials/
  incoming/          按日期保存的新素材原件（本地）
  reference/         旧站源码、旧站 ZIP、论文 Excel（本地）
  asset-manifest.json  原件到发布图片的对应关系
  asset-report.json    最近一次素材处理记录及原件校验值
scripts/             内容检查、Excel 导入、图片处理、评审打包
docs/                维护说明、来源说明、验收记录及截图
archive/             修改前快照（本地保留）
dist/                自动生成的部署文件，不手工编辑
交付/                各版评审 HTML、ZIP 和截图
```

原素材目录、备份、交付包已从 Git 默认跟踪中排除；网页运行只需要代码与 `public/` 中的发布素材。团队迁移电脑时，原件需另行完整备份，不能只依赖 Git。

## 检查、构建与打包

```bash
npm run check          # TypeScript + 内容、图片、关联记录检查
npm run format         # 统一源码及文档排版
npm run format:check   # 检查格式
npm run build          # 自动先检查，再输出 dist/
npm run preview        # 生产预览，通常 http://127.0.0.1:4173/
npm run package:review # 构建并打包成单文件 HTML 与 ZIP
```

评审打包需要 Python 3（仅标准库）。生成位置为 `交付/多模态认知智能实验室-学术版评审包-日期/`，旧的首版包保留。对方解压后打开 `双击打开网站.html`；图片、样式和脚本均内置，可以只转发这个 HTML。外部论文、地图、机构链接仍需联网，邮件按钮调用系统邮箱。手机聊天软件的内置文件预览可能不执行脚本，建议下载后用桌面浏览器打开或查看附带截图。

项目根目录及 `dist/` 的普通 `index.html` 依赖其他文件，不能单独发送；评审脚本生成的 HTML 才是独立文件。

## 论文与图片导入（可选）

网站运行不依赖 Python。重新导入论文 Excel 或转换原始图片时才需要安装以下依赖：

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r scripts/requirements.txt
python scripts/import_publications.py
python scripts/sync_assets.py
npm run check
```

Excel 默认读取 `materials/incoming/2026-11-02/四位研究者_联合论文目录_2026-11-01.xlsx`，也可传入另一份工作簿，支持“论文总表”和“四人联合总表”。导入脚本仅生成 `.qa/imports/` 候选核对文件，**不会覆盖正式 publications.json**。逐条核对后再合并，保留已有 ID 和原文作者顺序。图片同步仅处理清单列出的文件，不修改原件。

## 部署

源码已上传至 <https://github.com/yanghaoyuliao/sict-mcilab>，正式域名为 `sict-mcilab.cn`。`.github/workflows/deploy.yml` 已部署成功：推送到 main 分支后自动检查、构建，并只将 `dist/` 发布到 GitHub Pages；也支持手动触发。

Pages 自定义域名与 DNSPod 解析已配置，<http://sict-mcilab.cn/> 已可访问；HTTPS 证书正在等待签发。当前状态、解析表、后续更新方式和常见问题见 [上线与域名配置](docs/DEPLOYMENT.md)。资料维护前先核对 [内容说明](docs/CONTENT.md)。

技术栈为 React、TypeScript、Vite、React Router、Lucide。采用相对资源路径与 HashRouter，可部署到 GitHub Pages 的根站或项目子目录，刷新子页面无需额外服务器路由。没有数据库、后台、自动收件或访问统计服务。后续若需要更强的搜索引擎收录与文章分享预览，可升级为静态预渲染方案。
