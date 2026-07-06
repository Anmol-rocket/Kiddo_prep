const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'mock_papers');
const filesToProcess = ['TEST_PAPER12.html', 'TEST_PAPER13.html'];

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
    
    // Find the raw_data = [...] block
    let match = content.match(/raw_data\s*=\s*(\[\{.*?\}\]);?/s);
    if (match) {
        let rawDataStr = match[1];
        try {
            let parsedData = JSON.parse(rawDataStr);
            let modifiedCount = 0;
            
            parsedData.forEach(item => {
                if (item.opts && item.ans !== undefined) {
                    let { shuffledOptions, newCorrectIndex } = shuffleArrayWithIndexTracking(item.opts, item.ans);
                    item.opts = shuffledOptions;
                    item.ans = newCorrectIndex;
                    modifiedCount++;
                }
            });
            
            let newRawDataStr = JSON.stringify(parsedData);
            content = content.replace(rawDataStr, newRawDataStr);
            fs.writeFileSync(filePath, content);
            console.log(`Updated ${file}: randomized ${modifiedCount} questions.`);
        } catch(e) {
            console.error(`Failed to parse raw_data in ${file}`);
        }
    } else {
        console.log(`No raw_data found in ${file}.`);
    }
});
