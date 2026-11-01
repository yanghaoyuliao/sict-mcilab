"""Build an independent HTML/ZIP from dist; run npm run package:review.

Only Python's standard library is required. Never modifies source media.
"""

import base64
from datetime import date
import json
import mimetypes
from pathlib import Path
import re
import shutil
import zipfile

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'
STAMP = date.today().isoformat()
NAME = f'多模态认知智能实验室-学术版评审包-{STAMP}'
OUTPUT = ROOT / '交付' / NAME


def data_uri(path):
    mime = mimetypes.guess_type(path.name)[0]
    if not mime:
        raise ValueError(f'Unknown asset MIME type: {path}')
    return f'data:{mime};base64,{base64.b64encode(path.read_bytes()).decode("ascii")}'


def build_asset(url):
    file = (DIST / url.removeprefix('./').lstrip('/')).resolve()
    if not file.is_relative_to(DIST.resolve()) or not file.is_file():
        raise ValueError(f'Invalid build asset: {url}')
    return file


html = (DIST / 'index.html').read_text(encoding='utf-8')
script_tag = re.search(r'<script\b[^>]*src="([^"]+)"[^>]*></script>', html)
style_tag = re.search(r'<link\b[^>]*rel="stylesheet"[^>]*>', html)
if not script_tag or not style_tag:
    raise ValueError('Expected a Vite entry script and stylesheet. Run npm run build first.')
script = build_asset(script_tag[1]).read_text(encoding='utf-8')
stylesheet = build_asset(re.search(r'href="([^"]+)"', style_tag[0])[1]).read_text(encoding='utf-8')
# React Router includes an unused generic import(module) helper even when all
# application routes are eagerly bundled. Reject actual split build assets and
# literal imports, rather than that dormant library helper.
js_assets = list((DIST / 'assets').rglob('*.js'))
if (len(js_assets) != 1 or 'import.meta' in script
        or re.search(r'\bimport\s*\(\s*[\'"`]', script)):
    raise ValueError('Split modules require additional offline handling.')
if re.search(r'url\(\s*[\'"]?(?!data:|#)', stylesheet) or '@import' in stylesheet:
    raise ValueError('External stylesheet resources require additional offline handling.')
images = {
    file.relative_to(DIST).as_posix(): data_uri(file)
    for file in sorted((DIST / 'images').rglob('*'))
    if file.is_file() and file.suffix.lower() in {'.webp', '.png', '.jpg', '.jpeg', '.svg'}
}
# asset() resolves every page image through this registry in the standalone copy.
script = 'window.__MCI_ASSETS=' + json.dumps(images, separators=(',', ':')) + ';\n' + script
script = re.sub(r'</script', r'<\\/script', script, flags=re.IGNORECASE)
html = html.replace(script_tag[0], '')
html = html.replace(style_tag[0], '<style>' + stylesheet + '</style>')
html = re.sub(r'href="\./favicon.svg"', lambda _: 'href="' + data_uri(DIST / 'favicon.svg') + '"', html)
html = html.replace('</body>', '<script type="module">\n' + script + '\n</script>\n</body>')
if re.search(r'<(?:script|link)[^>]+(?:src|href)="\./', html):
    raise ValueError('Unbundled entry resource in offline HTML.')
OUTPUT.mkdir(parents=True, exist_ok=True)
(OUTPUT / '双击打开网站.html').write_text(html, encoding='utf-8')
counts = {key: len(json.loads((ROOT / f'src/data/{key}.json').read_text())) for key in ('members', 'news', 'publications')}
(OUTPUT / '先读我.txt').write_text(f'''多模态认知智能实验室 · 学术版网站评审包
版本日期：{STAMP}

如何查看
1. 完整解压 ZIP，双击“双击打开网站.html”，使用 Chrome、Edge 或 Safari 打开。
2. 这个 HTML 已内置脚本、样式、成员照、合照、新闻图和机构标识，可单独转发。
3. 页面导航可查看全部七个栏目；English / 中文按钮切换语言。
4. 手机聊天软件的内置文件预览可能不执行脚本，可下载到电脑浏览器打开，或先看“预览截图”。

离线可浏览网页。论文、地图、旧站和机构网站链接需要联网。
邮件按钮调用本机邮箱客户端。复制功能受浏览器权限限制时，可手动选择文本。
请先解压，不要直接在压缩包或聊天软件文件预览中打开网页。

本版内容
首页、研究方向、团队成员、科研成果、新闻动态、加入我们、联系方式；
中英双语、手机布局、{counts['members']} 位成员、{counts['publications']} 项论文、{counts['news']} 条新闻；
包含新闻全文与配图放大、成员详情、论文搜索与组合筛选、CSV 导出。
本版采用学术排版，并加入国科大与沈阳计算所标识。
已更新两位导师资料与联系邮箱；缺少照片的成员以姓名首字母头像显示。
已按用户确认补全 13 位成员中文姓名；目前仅 Lejia Wang 保留英文姓名。

这是用于评价效果的本地快照，未发布公网。
请用“评价反馈.txt”记录意见；成员现状、完整作者信息与招生细则由实验室继续校对。
''', encoding='utf-8-sig')
(OUTPUT / '评价反馈.txt').write_text('''实验室网站 · 评价反馈

查看设备 / 浏览器：
主要浏览语言：中文 / English

1. 整体风格是否符合高校实验室定位？最想调整的地方是什么？

2. 能否快速找到研究方向、成果、负责人和联系方式？

3. 首页合照、新闻列表与论文配图的比例是否合适？

4. 成员姓名、培养阶段、兴趣、论文信息和新闻表达有无错误？

5. 申请者或合作方是否清楚如何联系实验室？

6. 手机阅读和点击有无不便？请附页面名称和截图。

最优先修改的三点：
①
②
③
''', encoding='utf-8-sig')
screenshots = OUTPUT / '预览截图'
screenshots.mkdir(exist_ok=True)
for source, destination in [
    ('home-preview.jpg', '01-首页与机构标识.jpg'),
    ('home-desktop.jpg', '02-完整首页.jpg'),
    ('team-desktop.jpg', '03-团队成员.jpg'),
    ('news-detail.jpg', '04-新闻详情.jpg'),
    ('home-mobile.jpg', '05-手机首页.jpg'),
    ('publications-mobile.jpg', '06-英文手机论文页.jpg'),
    ('faculty-preview.jpg', '07-导师资料与联系方式.jpg'),
]:
    file = ROOT / 'docs/screenshots' / source
    if not file.exists():
        raise ValueError(f'Missing current review screenshot: {source}')
    shutil.copyfile(file, screenshots / destination)
archive = OUTPUT.with_suffix('.zip')
with zipfile.ZipFile(archive, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=9) as bundle:
    for file in sorted(OUTPUT.rglob('*')):
        if file.is_file() and file.name != '.DS_Store':
            bundle.write(file, arcname=file.relative_to(OUTPUT.parent))
with zipfile.ZipFile(archive) as bundle:
    if bundle.testzip():
        raise ValueError('ZIP integrity check failed')
print(f'HTML: {OUTPUT / "双击打开网站.html"}')
print(f'ZIP: {archive}')
print(f'{len(images)} embedded images; HTML {len(html.encode()) / 1024 / 1024:.2f} MB; ZIP {archive.stat().st_size / 1024 / 1024:.2f} MB')
