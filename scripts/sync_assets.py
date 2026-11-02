"""Copy/convert only manifest-listed media to public/. Originals stay in materials/.
Usage: python3 scripts/sync_assets.py (requires Pillow for image conversion)
"""
from pathlib import Path
import hashlib
import json
import shutil
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
manifest = json.loads((ROOT / 'materials/asset-manifest.json').read_text())
report = []
for item in manifest:
    source = ROOT / item['source']
    destination = ROOT / 'public' / item['target']
    destination.parent.mkdir(parents=True, exist_ok=True)
    if source.suffix == '.webp' and not item.get('optimize', False):
        # Avoid recompressing the supplied member portraits.
        # Copy through a writable staging file; supplied originals can be read-only.
        temporary = destination.with_name(f'.{destination.name}.tmp')
        try:
            shutil.copyfile(source, temporary)
            temporary.replace(destination)
        finally:
            temporary.unlink(missing_ok=True)
    else:
        with Image.open(source) as image:
            image = ImageOps.exif_transpose(image).convert('RGB')
            image.thumbnail((item['maxWidth'], item['maxWidth']))
            image.save(destination, 'WEBP', quality=87, method=6)
    report.append({'source':item['source'], 'target':item['target'], 'sourceSha256': hashlib.sha256(source.read_bytes()).hexdigest(), 'publishedBytes':destination.stat().st_size})
(ROOT / 'materials/asset-report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2)+'\n')
print(f'Prepared {len(report)} published images; originals preserved.')
