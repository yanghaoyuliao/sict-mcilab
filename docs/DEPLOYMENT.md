# 上线与域名配置

使用 GitHub Pages 托管当前静态网站，域名为 `sict-mcilab.cn`。这套方案不需要另买服务器，GitHub 自动构建网页并提供 HTTPS。免费账号使用公开仓库即可。

## 当前状态

2026-11-01 检查结果：

- 源码已上传至 <https://github.com/yanghaoyuliao/sict-mcilab>，本地 `main` 跟踪 `origin/main`。
- 自动发布文件为 `.github/workflows/deploy.yml`，使用 Node.js 22、`npm ci` 和 `npm run build`；构建任务具有读取 Pages 配置的权限，发布任务具有部署权限。
- GitHub Pages 已启用 GitHub Actions 发布，并绑定 `sict-mcilab.cn`；首次部署成功。
- DNSPod 已保存两条根域名 A 记录（`185.199.108.153`、`185.199.109.153`）和 `www` 的 CNAME（`yanghaoyuliao.github.io`），已通过权威 DNS 和公共 DNS 查询验证。
- DNSPod 免费版同主机、同线路、同类型最多支持两条记录，因此当前采用两个 GitHub 官方 IPv4 地址。无需为上线升级解析套餐。
- <http://sict-mcilab.cn/> 已可访问；HTTPS 证书正在等待 GitHub 签发，签发后启用强制 HTTPS。

## 1. 首次上传源码

在 Mac 的“终端”中，进入项目并运行：

```bash
cd "/Users/liaoyanghaoyu/Documents/ChatGPT/实验室网页"
npm run build
git add .
git commit -m "Publish MCI Lab website"
git push -u origin main
```

上传完成后刷新仓库首页，应看到 `src`、`public`、`package.json` 和 `.github` 等文件。`.github` 是隐藏文件夹，使用 Git 上传会包含它，无需在 Finder 中手动寻找。

`.gitignore` 已排除 `node_modules`、`dist`、原始素材、归档和评审包。源码与整理好的网页图片会上传；Actions 会自动生成 `dist`，不需要手动上传构建结果或单文件评审 HTML。

若 Git 提示缺少作者信息，先设置你希望出现在提交记录中的姓名和 GitHub 提交邮箱，再重试 `git commit`。邮箱可使用 GitHub **Settings → Emails** 中提供的 noreply 地址：

```bash
git config user.name "你的姓名"
git config user.email "你的 GitHub 提交邮箱"
```

若 `git push` 需要登录，使用你已配置的 Git 凭据，或用 GitHub Desktop 登录后将此文件夹作为现有仓库添加并推送。GitHub HTTPS 推送不接受账号密码；不要把密码或访问令牌写入项目文件。

## 2. 启用 GitHub Pages

1. 登录自己的 GitHub，打开 [仓库 Pages 设置](https://github.com/yanghaoyuliao/sict-mcilab/settings/pages)。
2. 在 **Build and deployment → Source** 中选择 **GitHub Actions**，保留现有工作流。
3. 打开 [Actions](https://github.com/yanghaoyuliao/sict-mcilab/actions)，选择 **Deploy website**。如果首次推送时 Pages 尚未启用而出现失败，点击 **Re-run all jobs**；也可通过 **Run workflow → main → Run workflow** 手动运行。
4. 等待 `build` 和 `deploy` 都成功。绑定自定义域名前，默认地址为 <https://yanghaoyuliao.github.io/sict-mcilab/>。
5. 回到 Pages 设置，在 **Custom domain** 填入 `sict-mcilab.cn`，点击 **Save**。此时 DNS 检查未通过属正常，继续下一步。填写时只输入域名。

先保存 GitHub 的自定义域名，再设置 DNS。当前采用自定义 Actions 发布，自定义域名以 Pages 设置为准；GitHub 会忽略产物中的 `CNAME` 文件，因此无需另建这个文件。

## 3. 配置域名解析

打开域名的 DNS 管理控制台。当前域名使用 DNSPod 的域名服务器；如果在腾讯云管理，可进入 [DNSPod 控制台](https://console.cloud.tencent.com/cns)。当前免费套餐已配置以下三条记录：

| 主机记录 | 记录类型 | 记录值                    |
| -------- | -------- | ------------------------- |
| `@`      | `A`      | `185.199.108.153`         |
| `@`      | `A`      | `185.199.109.153`         |
| `www`    | `CNAME`  | `yanghaoyuliao.github.io` |

每一行都是一条独立记录。“线路”选择默认，“TTL”保留默认即可。`@` 代表 `sict-mcilab.cn`，`www` 代表 `www.sict-mcilab.cn`。CNAME 的记录值只填写上表中的主机名。

已有指向其他网站的同名 `@` 或 `www` 记录时，需要将相关记录调整为上表的目标；域名邮箱的 MX / TXT 等其他记录按原用途保留。

以上记录支持 IPv4 访问。GitHub 还提供 `185.199.110.153` 和 `185.199.111.153`；若以后使用允许四条同类记录的 DNS 套餐，可补充这两个地址。若需要 IPv6，再根据 GitHub 官方文档补充 AAAA 记录。

## 4. 启用 HTTPS 并验收

1. 等待 DNS 生效后，回到仓库 Pages 设置，重新检查 **Custom domain**，直到出现 **DNS check successful**。
2. 等待证书签发，并勾选 **Enforce HTTPS**。DNS 生效和 HTTPS 选项就绪可能需要最多 24 小时；刚保存时不可勾选无需反复修改记录。
3. 打开 <https://sict-mcilab.cn/>，检查首页、团队成员、新闻详情、中英切换及手机布局。
4. 打开 <https://www.sict-mcilab.cn/>，确认能跳转到主域名。

团队页地址会形如 `https://sict-mcilab.cn/#/team`。这是当前 HashRouter 的正常地址形式，直接访问和刷新均可工作。

## 5. 后续更新

修改本地资料或图片并检查后，执行：

```bash
git add .
git commit -m "Update lab website"
git push
```

每次推送到 `main` 都会触发自动部署。到 Actions 查看最新一次任务，成功后刷新正式网站即可；域名解析只需首次配置。

## 常见问题

| 现象                         | 处理方式                                                                                     |
| ---------------------------- | -------------------------------------------------------------------------------------------- |
| 首次工作流提示无法获取 Pages | 先在仓库 Settings → Pages 选择 GitHub Actions，再重新运行工作流。                            |
| 找不到工作流                 | 检查仓库是否包含 `.github/workflows/deploy.yml`，并确认文件已推送到 `main`。                 |
| 域名打不开                   | 检查四条 A 记录和 Pages 的 Custom domain，等待 DNS 生效；只购买域名还不会产生网站。          |
| DNS 通过但暂时没有 HTTPS     | 等待证书签发，再勾选 Enforce HTTPS；如果一直不可用，按 GitHub 官方文档检查 DNS 和 CAA 记录。 |
| 默认 github.io 地址自动跳转  | 绑定自定义域名后属于正常行为，以正式域名访问。                                               |
| 更新后内容仍旧               | 先确认最新工作流成功，再刷新或使用浏览器无痕窗口查看。                                       |

GitHub Pages 的国内访问速度可能波动，可在上线后用学校和手机网络实际检查。

DNS 数值及配置顺序依据 [GitHub 官方自定义域名说明](https://docs.github.com/zh/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)，核对日期为 2026-11-01。
