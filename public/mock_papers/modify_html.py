import json
import re

html_path = "c:/Users/annsh/Documents/kiddoprep-quiz-app/public/mock_papers/TEST_PAPER19.html"
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

# Replace title
html = re.sub(r'<title>.*?</title>', '<title>AIIMS CRE Radiographer - Test Paper 19</title>', html)

# Replace h1
html = re.sub(r'<h1>.*?</h1>', '<h1>AIIMS CRE - Test Paper 19</h1>', html)

with open("c:/Users/annsh/Documents/kiddoprep-quiz-app/public/mock_papers/q.json", "r", encoding="utf-8") as f:
    questions = json.load(f)

# Format the questions array
raw_data_str = json.dumps(questions, indent=4)
new_func_body = f"""
        const createQ = (id, type, text, opts, ans, exp) => ({{ id, type, text, opts, ans, exp }});
        questions = [];
        const raw_data = {raw_data_str};
        raw_data.forEach((d, i) => questions.push(createQ(i + 1, d.type, d.text, d.opts, d.ans, d.exp)));
"""

# Replace generateQuestions body
html = re.sub(r'function generateQuestions\(\)\s*\{.*?\n        // --- STATE MANAGEMENT ---', 
              f'function generateQuestions() {{{new_func_body}}}\n\n        // --- STATE MANAGEMENT ---', 
              html, flags=re.DOTALL)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)
print("Updated HTML.")
