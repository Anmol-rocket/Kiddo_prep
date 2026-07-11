import json
with open('paper5_raw.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
for i, q in enumerate(data[:50]):
    print(f"Q{i}: {q['question']}")
    for j, opt in enumerate(q['options']):
        print(f"  {j}: {opt}")
    print("---")
