import re

html_path = "c:/Users/annsh/Documents/kiddoprep-quiz-app/public/mock_papers/TEST_PAPER19.html"
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

state_mgmt = """
        // --- STATE MANAGEMENT ---
        const STORAGE_KEY = 'test_paper_19_state';
        let state = {
            currentQ: 0,
            answers: new Array(TOTAL_QUESTIONS).fill(null),
            status: new Array(TOTAL_QUESTIONS).fill('not-visited'),
            currentSection: 1,      // 1 to 5
            sectionTimeLeft: SECTION_TIME_LIMIT,
            maxSetReached: 1,       // Tracks highest section unlocked
            isFinished: false
        };

        function saveState() {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        }

        function loadState() {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                state = JSON.parse(saved);
                return true;
            }
            return false;
        }
"""

html = re.sub(r'// --- STATE MANAGEMENT ---\s*let state = \{.*?\n        \};\n', state_mgmt, html, flags=re.DOTALL)

# Add saveState to init
init_repl = """
        function init() {
            generateQuestions();
            if (loadState()) {
                if (state.isFinished) {
                    finishExam();
                } else {
                    renderExamInterface();
                    startSectionTimer();
                }
            } else {
                els.landing.classList.remove('hidden');
                els.result.classList.add('hidden');
            }
        }
"""
html = re.sub(r'function init\(\) \{.*?\n        \}', init_repl.strip('\n'), html, flags=re.DOTALL)

# Hook saveState into timer and other functions
html = html.replace('state.sectionTimeLeft--;', 'state.sectionTimeLeft--;\n                if(state.sectionTimeLeft % 5 === 0) saveState();')
html = html.replace('state.answers[state.currentQ] = optIndex;', 'state.answers[state.currentQ] = optIndex;\n            saveState();')
html = html.replace('state.status[index] = (state.answers[index] !== null) ? \'answered\' : \'not-answered\';', 'state.status[index] = (state.answers[index] !== null) ? \'answered\' : \'not-answered\';\n            saveState();')
html = html.replace('state.status[index] = (state.answers[index] !== null) ? \'marked-answered\' : \'review\';', 'state.status[index] = (state.answers[index] !== null) ? \'marked-answered\' : \'review\';\n            saveState();')
html = html.replace('state.answers[state.currentQ] = null;', 'state.answers[state.currentQ] = null;\n            saveState();')
html = html.replace('state.maxSetReached = state.currentSection;', 'state.maxSetReached = state.currentSection;\n            saveState();')
html = html.replace('state.isFinished = true;', 'state.isFinished = true;\n            saveState();')


with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)
print("Added localStorage logic.")
