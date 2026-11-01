# 维护与文件管理

## 更新时记住三个位置

1. `materials/` 保存原件与来源；不会自动发布。
2. `src/data/` 保存网站显示内容，`public/images/` 保存发布图片。
3. `dist/` 和 `交付/` 由命令生成，不用来存放原件，也不直接修改。

2026-11-01 前的首版源代码备份在 `archive/2026-11-01-before-revision/`；新增照片与新闻原件保存到 `materials/incoming/2026-11-01/`；旧 Hugo 网站和论文表归入 `materials/reference/`。顶层重复的发布图片已从 `public/images/` 移走，备份仍保留。

## 增加或修改成员

打开 `src/data/members.json`，复制一条成员记录。例如：

```json
{
  "id": "example-student",
  "name": "Example Student",
  "nameZh": null,
  "group": "masters",
  "role": { "zh": "硕士研究生", "en": "Master’s student" },
  "interests": {
    "zh": "多模态大模型",
    "en": "Multimodal large language models"
  },
  "image": null,
  "homepage": null
}
```

`id` 必须唯一；`group` 为 `faculty`、`phd` 或 `masters`。不要根据拼音猜中文名。照片确认后放到 `public/images/people/example-student.webp`，把 `image` 改为 `images/people/example-student.webp`。没有照片保持 `null`，网页会显示英文姓名首字母加浅绿色背景。成员在每个分组内按 JSON 中的顺序显示；分类人数自动计算。

教师可增加双语 `bio` 简介和 `email` 邮箱，团队页、详情及联系方式页会自动显示。主要联系邮箱另在 `src/data/site.ts` 的 `email` 中维护，目前为于碧辉老师邮箱；更换时同时核对成员数据，确保首页、页脚和招生邮件收件人与教师信息一致。

推荐肖像比例 3:4，确保头像留有边距。网页会裁成同一比例，合照和新闻图片则完整显示。原件始终另存 `materials/incoming/日期/`。

## 增加新闻

1. 原始稿件及图片放 `materials/incoming/YYYY-MM-DD/主题/`。
2. 发布图片放 `public/images/news/英文主题年份/`，命名 `figure-1.webp` 等。
3. 在 `src/data/news.json` 复制一篇结构相似的新闻，填入唯一 `id`、ISO 日期 `YYYY-MM-DD`、双语题名、摘要、分类、正文段落与图注。按日期从新到旧排列。
4. `sections` 数组中每项是一段正文，可带 `heading`、`image`、`caption`；不需要的字段填 `null`。正文为纯文本。
5. `paperId` 只填论文目录已有 ID；没有则填 `null`，可在 `paperTitle` 放真实论文题名，不要编造原文链接。`sourceFolder` 记录原件目录；`source` 仅用于真实旧站来源 URL。
6. 预览中检查标题、图文对应、放大图片和英文版。首页自动取最新五条，不用单独编辑。

已有五篇稿件进行了精简编辑和英文翻译；原始措辞均保留在素材目录，可继续校订，不以网页改稿覆盖原件。

## 批量处理图片

在 `materials/asset-manifest.json` 加一条来源和目标：

```json
{
  "source": "materials/incoming/YYYY-MM-DD/topic/figure.png",
  "target": "images/news/topic/figure-1.webp",
  "maxWidth": 1800,
  "note": "图片来源说明"
}
```

运行 `python scripts/sync_assets.py`。已有 WebP 原样复制，PNG/JPG 进行方向校正、缩放及 WebP 转换。处理记录写入 `materials/asset-report.json`。清单不是前端运行依赖；如果直接添加了发布图片，也要保留原件和来源说明。

## 检查和交付

```bash
npm run format
npm run check
npm run dev
```

在浏览器检查修改的页面及中英文。确认后运行 `npm run package:review`，把 `交付/` 内新版 ZIP 或单 HTML 发给评审者。ZIP 附带截图和反馈模板；脚本会使用当前 `docs/screenshots/`，所以视觉大改后应更新截图。

每次重要改动前建议保存 Git 版本或完整复制备份。不要把原始 Excel、私人未发布文件或整个素材库放入 `public/`；这个目录内的内容会随网站发布。不要覆盖仍在使用的旧站仓库；发布到哪个仓库和域名由实验室确定。
