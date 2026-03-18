const fs = require('fs');
const file = 'client/src/components/stock/StockDetailView.tsx';
let content = fs.readFileSync(file, 'utf8');

const newTabs = `                            <TabsContent value="투자자동향" className="mt-0 h-full">
                                <InvestorTrendTab />
                            </TabsContent>

                            <TabsContent value="재무분석" className="mt-0 h-full">
                                <FinancialAnalysisTab />
                            </TabsContent>

                            <TabsContent value="투자지표" className="mt-0 h-full">
                                <InvestmentIndicatorTab />
                            </TabsContent>`;

const startStr = `<TabsContent value="재무분석" className="mt-0 h-full">`;
const endStr = `<TabsContent value="토론" className="mt-0 h-full">`;

const startIndex = content.indexOf(startStr);
const endIndex = content.indexOf(endStr);

if (startIndex !== -1 && endIndex !== -1) {
    const newContent = content.substring(0, startIndex) + newTabs + '\n\n                            ' + content.substring(endIndex);
    fs.writeFileSync(file, newContent);
    console.log("Success");
} else {
    console.log("Failed to find boundaries", {startIndex, endIndex});
}
