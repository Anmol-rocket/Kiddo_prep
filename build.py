import re
import json

with open('c:\\Users\\annsh\\Documents\\kiddoprep-quiz-app\\public\\mock_papers\\CBT10.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Change Title
html = re.sub(r'<title>.*?</title>', '<title>AIIMS CRE Radiographer - Test Paper 18</title>', html)

# 2. Change Heading
html = re.sub(r'<h1>.*?</h1>', '<h1>AIIMS CRE - Test Paper 18</h1>', html, count=1)

# 3. Replace questions
with open('q.json', 'r', encoding='utf-8') as f:
    q_data = f.read()

new_gen_func = '''function generateQuestions() {
    const createQ = (id, type, text, opts, ans, exp) => ({ id, type, text, opts, ans, exp });
    questions = [];
    const raw_data = ''' + q_data + ''';
    raw_data.forEach((d, i) => questions.push(createQ(i + 1, d.type, d.text, d.opts, d.ans, d.exp)));
}'''

# Replace the generateQuestions function
html = re.sub(r'function generateQuestions\(\) \{.*?\n    \}', new_gen_func, html, flags=re.DOTALL)

# 4. Add localStorage key logic
# We'll inject saveState() at the end of state modifying functions.
# First, let's add saveState and loadState functions.
state_funcs = '''
        function saveState() {
            localStorage.setItem('test_paper_18_state', JSON.stringify(state));
        }
        function loadState() {
            const saved = localStorage.getItem('test_paper_18_state');
            if (saved) {
                state = JSON.parse(saved);
                return true;
            }
            return false;
        }
'''

html = html.replace('// Initialize\n        init();', state_funcs + '\n        // Initialize\n        init();')

# Update init()
new_init = '''function init() {
            generateQuestions(); // Load data
            if(loadState() && !state.isFinished) {
                els.landing.classList.add('hidden');
                renderExamInterface();
                startSectionTimer();
            } else {
                els.landing.classList.remove('hidden');
                els.result.classList.add('hidden');
            }
        }'''
html = re.sub(r'function init\(\) \{.*?\}', new_init, html, flags=re.DOTALL)

# Inject saveState in functions
html = html.replace('state.answers[state.currentQ] = optIndex;', 'state.answers[state.currentQ] = optIndex;\n            saveState();')
html = html.replace('moveToNextQuestion();', 'saveState();\n            moveToNextQuestion();')
html = html.replace('loadQuestion(state.currentQ);\n            renderPalette();', 'loadQuestion(state.currentQ);\n            renderPalette();\n            saveState();')
html = html.replace('startSectionTimer();\n        }', 'startSectionTimer();\n            saveState();\n        }')
html = html.replace('calculateResult();\n        }', 'calculateResult();\n            saveState();\n        }')

# state.sectionTimeLeft--;
html = html.replace('state.sectionTimeLeft--;', 'state.sectionTimeLeft--;\n                if(state.sectionTimeLeft % 5 === 0) saveState();')

with open('c:\\Users\\annsh\\Documents\\kiddoprep-quiz-app\\public\\mock_papers\\TEST_PAPER18.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Done.")
