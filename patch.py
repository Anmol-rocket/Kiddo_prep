import re

with open(r'c:\Users\annsh\Documents\kiddoprep-quiz-app\public\mock_papers\TEST_PAPER16.html', 'r', encoding='utf-8') as f:
    content = f.read()

init_old = """        function init() {
            generateQuestions(); // Load data
            // Persistence check could go here, but for strict timing, fresh start is safer
            els.landing.classList.remove('hidden');
            els.result.classList.add('hidden');
        }"""
init_new = """        const STORAGE_KEY = 'test_paper_16_state';
        
        function saveState() {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        }
        
        function init() {
            generateQuestions(); // Load data
            const savedState = localStorage.getItem(STORAGE_KEY);
            if (savedState) {
                try {
                    const parsed = JSON.parse(savedState);
                    if (parsed && parsed.answers && parsed.answers.length === TOTAL_QUESTIONS) {
                        state = parsed;
                        if (state.isFinished) {
                            finishExam();
                            return;
                        } else {
                            els.landing.classList.add('hidden');
                            renderExamInterface();
                            startSectionTimer();
                            return;
                        }
                    }
                } catch(e) {}
            }
            els.landing.classList.remove('hidden');
            els.result.classList.add('hidden');
        }"""

content = content.replace(init_old, init_new)

content = content.replace('state.answers[state.currentQ] = optIndex;', 'state.answers[state.currentQ] = optIndex;\n            saveState();')
content = content.replace('state.status[index] = (state.answers[index] !== null) ? \'answered\' : \'not-answered\';', 'state.status[index] = (state.answers[index] !== null) ? \'answered\' : \'not-answered\';\n            saveState();')
content = content.replace('state.status[index] = (state.answers[index] !== null) ? \'marked-answered\' : \'review\'; // Simplified', 'state.status[index] = (state.answers[index] !== null) ? \'marked-answered\' : \'review\'; // Simplified\n            saveState();')
content = content.replace('state.status[state.currentQ] = \'not-answered\';', 'state.status[state.currentQ] = \'not-answered\';\n            saveState();')
content = content.replace('state.sectionTimeLeft = SECTION_TIME_LIMIT;', 'state.sectionTimeLeft = SECTION_TIME_LIMIT;\n            saveState();')
content = content.replace('state.isFinished = true;', 'state.isFinished = true;\n            saveState();')
content = content.replace('state.sectionTimeLeft--;', 'state.sectionTimeLeft--;\n                if (state.sectionTimeLeft % 10 === 0) saveState();')

with open(r'c:\Users\annsh\Documents\kiddoprep-quiz-app\public\mock_papers\TEST_PAPER16.html', 'w', encoding='utf-8') as f:
    f.write(content)
