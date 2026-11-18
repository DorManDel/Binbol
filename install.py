#!/usr/bin/env python3
"""Install the visual Binball site into the existing Binbol repository.

Preserves the original root index.html as studio.html before replacing it.
Only Python standard library is required. Usage:
    python install.py /path/to/Binbol
"""
from pathlib import Path
import shutil
import sys


def main() -> int:
    if len(sys.argv) != 2:
        print('Usage: python install.py /path/to/Binbol')
        return 2

    source = Path(__file__).resolve().parent
    target = Path(sys.argv[1]).expanduser().resolve()
    old_index = target / 'index.html'
    studio = target / 'studio.html'

    if not target.is_dir() or not (target / 'README.md').is_file():
        print(f'Not an existing Binbol repository: {target}')
        return 2
    if not old_index.is_file():
        print(f'Cannot preserve missing original index.html: {old_index}')
        return 2

    old_text = old_index.read_text(encoding='utf-8')
    if not studio.exists() and 'GlyphForge' in old_text:
        shutil.copy2(old_index, studio)
        print('Preserved the original research studio as studio.html')
    elif not studio.exists():
        print('Existing index is not recognized as the original research studio.')
        print('Preserve it manually as studio.html before installing this landing page.')
        return 2
    else:
        print('Existing studio.html preserved (not overwritten).')

    for relative in ('index.html', 'explorer.html', 'assets/site.css', 'assets/site.js', 'assets/favicon.svg', 'README-SITE.md'):
        dest = target / relative
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source / relative, dest)
        print('Installed:', relative)
    print('\nDone. Preview index.html or serve this repo with: python -m http.server 8000')
    print('To publish via GitHub Pages, review and commit the changes.')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
