import json

with open('paper5_raw.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

items = data[50:]
for i, item in enumerate(items):
    question = item.get("question", item.get("raw", ""))
    options = item.get("options", [])
    print(f"--- Q{i} ---")
    print(f"Question: {question}")
    print(f"Options: {options}")
