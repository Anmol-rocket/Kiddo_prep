const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'mock_papers');
const files = fs.readdirSync(dir).filter(f => f.startsWith('TEST_PAPER') && f.endsWith('.html'));

function shuffleArrayWithIndexTracking(arr, correctIndex) {
    let items = arr.map((val, index) => ({ val, isCorrect: index === correctIndex }));
    
    // Fisher-Yates shuffle
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

let totalModified = 0;

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    let lines = content.split('\n');
    let modifiedLineCount = 0;
    
    let newLines = lines.map(line => {
        let trimmed = line.trim();
        // Check if it looks like our target array line
        if (trimmed.startsWith('["') && (trimmed.endsWith('],') || trimmed.endsWith(']'))) {
            let hasCommaAtEnd = trimmed.endsWith(',');
            let arrayStr = hasCommaAtEnd ? trimmed.slice(0, -1) : trimmed;
            
            try {
                // Safely evaluate the array string
                let parsed = new Function('return ' + arrayStr)();
                
                if (Array.isArray(parsed) && parsed.length === 4 && Array.isArray(parsed[1]) && typeof parsed[2] === 'number') {
                    let questionText = parsed[0];
                    let options = parsed[1];
                    let correctIndex = parsed[2];
                    let explanation = parsed[3];
                    
                    let { shuffledOptions, newCorrectIndex } = shuffleArrayWithIndexTracking(options, correctIndex);
                    
                    let newArrayStr = JSON.stringify([questionText, shuffledOptions, newCorrectIndex, explanation]);
                    
                    let leadingSpaces = line.match(/^\s*/)[0];
                    let trailingComma = hasCommaAtEnd ? ',' : '';
                    
                    modifiedLineCount++;
                    return leadingSpaces + newArrayStr + trailingComma;
                }
            } catch (e) {
                // Silently ignore if it doesn't parse
            }
        }
        return line;
    });
    
    if (modifiedLineCount > 0) {
        fs.writeFileSync(filePath, newLines.join('\n'));
        console.log(`Updated ${file}: randomized ${modifiedLineCount} questions.`);
        totalModified += modifiedLineCount;
    } else {
        console.log(`No questions randomized in ${file}.`);
    }
});

console.log(`Done. Total questions randomized: ${totalModified}`);
