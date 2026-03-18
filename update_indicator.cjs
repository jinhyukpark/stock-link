const fs = require('fs');
const file = 'client/src/components/stock/InvestmentIndicatorTab.tsx';
let content = fs.readFileSync(file, 'utf8');

const startStr = `        {/* 수익성 */}`;
const endStr = `        {/* 안정성 */}`;

const startIndex = content.indexOf(startStr);
const endIndex = content.indexOf(endStr);

if (startIndex !== -1 && endIndex !== -1) {
    const newContent = content.substring(0, startIndex) + content.substring(endIndex);
    fs.writeFileSync(file, newContent);
    console.log("Success");
} else {
    console.log("Failed to find boundaries", {startIndex, endIndex});
}
