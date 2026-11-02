# 素材资料库

- `incoming/2026-11-01/`：首轮成员、机构标识、五篇新闻稿与配图原件。
- `incoming/2026-11-02/images/`：本轮从用户 dist/images 安全备份的全部 94 份文件，包含成员照片、lab 活动图片、7 个新闻目录及 text.txt。
- `incoming/2026-11-02/`：本轮 PPT、联合论文目录及修改前 members-before.json。根目录用户原始文件保留，Git 忽略。
- `reference/`：旧网站源码、ZIP 和初始论文表。
- `asset-manifest.json`：每张网页图片的来源、目标路径及说明，目标不可重复。
- `asset-report.json`：同步时生成的来源 SHA-256 和发布文件大小。

网页只发布 `public/images/` 中整理后的图片。原始二进制资料和 archive 不上传 Git，需要独立备份。已换照片直接更新同一个目标的来源，不叠加重复映射。成员字母头像由代码生成；董洁本轮已有照片，卜立平老师仍使用字母头像。

用户原件不要再放 dist：构建会清空并重建 dist。本轮构建前已把用户新增资料完整保存到 incoming。
