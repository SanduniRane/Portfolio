#!/usr/bin/env python3
"""
Scan the projects/ directory and regenerate dirIndex.json mapping each project
folder to its files (paths relative to the folder).

Run from the repo root: python projects/generate_dir_index.py
"""
import os
import json

HERE = os.path.dirname(__file__)
PROJECTS_DIR = os.path.join(HERE)
OUT_FILE = os.path.join(HERE, 'dirIndex.json')

def is_ignored(name):
    # ignore the index and helper files in the projects folder itself
    return name in ('viewer.html', 'folder-overview.html', 'projectManifest.json', 'dirIndex.json', 'fileData.js', 'folderData.js', 'generate_dir_index.py')

def collect_folder(folder_path):
    entries = []
    for root, dirs, files in os.walk(folder_path):
        # skip hidden directories like __pycache__? include them but keep paths
        for f in files:
            # compute relative path to folder_path
            rel = os.path.relpath(os.path.join(root, f), folder_path)
            # convert backslashes to forward slashes for web paths
            rel = rel.replace('\\', '/')
            entries.append(rel)
    entries.sort(key=lambda s: s.lower())
    return entries

def main():
    result = {}
    for name in sorted(os.listdir(PROJECTS_DIR)):
        full = os.path.join(PROJECTS_DIR, name)
        if not os.path.isdir(full):
            continue
        if is_ignored(name):
            continue
        # collect files
        files = collect_folder(full)
        result[name] = files

    # write JSON
    with open(OUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    # also write a JS file that assigns window.dirIndex for file:// usage
    js_out = os.path.join(HERE, 'dirIndex.js')
    with open(js_out, 'w', encoding='utf-8') as fj:
        fj.write('window.dirIndex = ')
        json.dump(result, fj, ensure_ascii=False, indent=2)
        fj.write(';')

    print(f'Regenerated {OUT_FILE} and {js_out} with {len(result)} folders')

if __name__ == '__main__':
    main()
