import os
import json

base_dir = r"C:\Users\sandu\.gemini\antigravity\scratch\portfolio\projects"
data = {}

for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith(('.csv', '.json', '.txt', '.md')):
            file_path = os.path.join(root, file)
            # relative path from base_dir
            rel_path = os.path.relpath(file_path, base_dir).replace('\\', '/')
            # project name is the first part of rel_path
            parts = rel_path.split('/')
            if len(parts) >= 2:
                project = parts[0]
                filename = parts[-1]
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    if project not in data:
                        data[project] = {}
                    data[project][filename] = content
                except Exception as e:
                    print(f"Error reading {file_path}: {e}")

js_content = "const fileData = " + json.dumps(data) + ";"
with open(os.path.join(base_dir, "fileData.js"), 'w', encoding='utf-8') as f:
    f.write(js_content)
print("fileData.js generated successfully.")
