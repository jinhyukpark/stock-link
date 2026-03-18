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

const regex = /<TabsContent value="재무분석" className="mt-0 h-full">[\s\S]*?<TabsContent value="토론" className="mt-0 h-full">/;

content = content.replace(regex, newTabs + '\n\n                            <TabsContent value="토론" className="mt-0 h-full">');

fs.writeFileSync(file, content);
