"""Read the supplied Excel without changing it, and update website data.

Usage: python3 scripts/import_publications.py [path-to-workbook]
Requires: pip install openpyxl
"""
import json
import sys
from collections import Counter
from pathlib import Path

import openpyxl

ROOT = Path(__file__).resolve().parents[1]
source = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / 'materials/reference/sict_publications_ccf_ab_2026.xlsx'
workbook = openpyxl.load_workbook(source, read_only=True, data_only=True)
rows = list(workbook['论文总表'].values)
workbook.close()
header_index = next(i for i, row in enumerate(rows) if row and row[0] == '年份')
keys = ['year', 'ccf', 'title', 'venue', 'authors', 'status', 'url', 'note', 'affiliation']
papers = []
output = ROOT / 'src/data/publications.json'
existing = json.loads(output.read_text(encoding='utf-8')) if output.exists() else []
ids_by_title = {paper['title'].strip(): paper['id'] for paper in existing}
next_id = max((int(paper['id'].split('-')[-1]) for paper in existing), default=0) + 1
seen_titles = set()
for row in rows[header_index + 1:]:
    if not row or not isinstance(row[0], (int, float)):
        continue
    paper = dict(zip(keys, row))
    title = paper['title'].strip()
    if title in seen_titles:
        raise ValueError(f"Duplicate title: {title}")
    seen_titles.add(title)
    if title in ids_by_title:
        paper['id'] = ids_by_title[title]
    else:
        paper['id'] = f"paper-{next_id:02d}"
        next_id += 1
    paper['year'] = int(paper['year'])
    paper['authors'] = [name.strip() for name in (paper['authors'] or '').split(';') if name.strip()]
    paper['published'] = paper['status'] == '正式发表'
    if not paper['url'].startswith(('https://', 'http://')):
        raise ValueError(f"Invalid paper URL: {paper['title']}")
    papers.append(paper)
output.write_text(json.dumps(papers, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f"Imported {len(papers)} records to {output.relative_to(ROOT)}")
print(dict(Counter(paper['ccf'] for paper in papers)))
print(f"Published: {sum(paper['published'] for paper in papers)}; accepted: {sum(not paper['published'] for paper in papers)}")
