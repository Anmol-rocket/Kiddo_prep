const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'mock_papers');
const filesToProcess = ['TEST_PAPER11.html', 'TEST_PAPER12.html', 'TEST_PAPER13.html'];

function shuffleArrayWithIndexTracking(arr, correctIndex) {
    let items = arr.map((val, index) => ({ val, isCorrect: index === correctIndex }));
    
    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
    }
    
    let newCorrectIndex = items.findIndex(item => item.isCorrect);
    return {
        shuffledOptions: items.map(item => item.val),
        newCorrectIndex
    };
}

filesToProcess.forEach(file => {
    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let lines = content.split('\n');
    let modifiedLineCount = 0;

    let newLines = lines.map(line => {
        if (line.includes('createQ(')) {
            // Find the options array and the correct index
            // e.g. questions.push(createQ(1, 'Cat', 'Text', ["A", "B"], 0, 'Expl'));
            let match = line.match(/(.*?, \s*)(\[.*?\])(\s*,\s*)(\d+)(\s*,.*)/);
            if (match) {
                let prefix = match[1];
                let optionsStr = match[2];
                let mid = match[3];
                let correctIndex = parseInt(match[4]);
                let suffix = match[5];
                
                try {
                    let options = new Function('return ' + optionsStr)();
                    let { shuffledOptions, newCorrectIndex } = shuffleArrayWithIndexTracking(options, correctIndex);
                    let newOptionsStr = JSON.stringify(shuffledOptions);
                    
                    modifiedLineCount++;
                    return prefix + newOptionsStr + mid + newCorrectIndex + suffix;
                } catch (e) {
                    // console.error("Failed to parse options:", optionsStr);
                }
            }
        }
        return line;
    });

    if (modifiedLineCount > 0) {
        fs.writeFileSync(filePath, newLines.join('\n'));
        console.log(`Updated ${file}: randomized ${modifiedLineCount} questions.`);
    } else {
        console.log(`No questions randomized in ${file}.`);
    }
});
