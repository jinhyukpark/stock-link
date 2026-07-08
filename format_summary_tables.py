import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Update "수혜 가능 / 리스크 주시 종목 종합" tables to match the requested image
# In the user's mockup:
# "수혜 가능 종목" column layout: 종목 | 섹터 | 주요 언급 인사 | 영향 근거 | 예상 수혜 강도
# "리스크 주시 종목" column layout: 종목 | 섹터 | 주요 언급 인사 | 영향 근거 | 리스크 강도

new_positive_table = """<table className="w-full text-left min-w-[1000px] border-collapse">
                                <thead className="bg-slate-800/80 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4 w-56 font-semibold text-left border-b border-slate-700">종목</th>
                                        <th className="px-6 py-4 w-32 font-semibold text-center border-b border-slate-700">섹터</th>
                                        <th className="px-6 py-4 w-40 font-semibold text-left border-b border-slate-700">주요 언급 인사</th>
                                        <th className="px-6 py-4 font-semibold text-left border-b border-slate-700">영향 근거</th>
                                        <th className="px-6 py-4 w-32 font-semibold text-center border-b border-slate-700">예상 수혜 강도</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {data.positiveStocks.length > 0 ? data.positiveStocks.map((stock: any, i: number) => {
                                        // Mock sector based on ticker or name for display purposes if not in data
                                        const mockSector = "IT/플랫폼"; // We would ideally have sector in data
                                        // Using marketImpact data to find the stars and sector if possible
                                        const relatedImpact = data.marketImpact.find(impact => impact.name === stock.name);
                                        const sector = relatedImpact ? "반도체/AI 인프라" : "금융/은행";
                                        const stars = relatedImpact?.stars || 3;
                                        
                                        return (
                                            <tr key={i} className="hover:bg-slate-800/50 transition-colors bg-slate-900">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <StockLogo ticker={stock.ticker} name={stock.name} className="w-8 h-8 rounded-md" />
                                                        <div className="flex flex-col">
                                                            <span className="text-white font-bold text-sm">{stock.name}</span>
                                                            <div className="flex items-center gap-1.5 mt-0.5">
                                                                {stock.ticker.match(/^\\d{6}$/) ? (
                                                                    <span className="text-slate-500 text-[10px] font-mono">{stock.ticker}</span>
                                                                ) : (
                                                                    <Badge variant="outline" className="w-fit text-[9px] px-1 py-0 h-4 border-slate-600 text-slate-400 bg-slate-800">해외</Badge>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="text-slate-400 text-xs bg-slate-800 px-2 py-1 rounded-md">{sector}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <Avatar name={stock.influencer} className="w-6 h-6" />
                                                        <span className="text-slate-300 text-sm font-medium">{stock.influencer}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-slate-400 text-sm leading-relaxed block line-clamp-2" title={stock.reason}>{stock.reason}</span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <div className="flex justify-center gap-0.5">
                                                        {[...Array(5)].map((_, idx) => (
                                                            <Star 
                                                                key={idx} 
                                                                className={cn(
                                                                    "w-3.5 h-3.5", 
                                                                    idx < stars 
                                                                        ? "fill-emerald-400 text-emerald-400"
                                                                        : "fill-slate-700 text-slate-700"
                                                                )} 
                                                            />
                                                        ))}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    }) : (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-8 text-center text-slate-500 text-sm">수혜 가능 종목이 없습니다.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>"""

new_negative_table = """<table className="w-full text-left min-w-[1000px] border-collapse">
                                <thead className="bg-slate-800/80 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4 w-56 font-semibold text-left border-b border-slate-700">종목</th>
                                        <th className="px-6 py-4 w-32 font-semibold text-center border-b border-slate-700">섹터</th>
                                        <th className="px-6 py-4 w-40 font-semibold text-left border-b border-slate-700">주요 언급 인사</th>
                                        <th className="px-6 py-4 font-semibold text-left border-b border-slate-700">영향 근거</th>
                                        <th className="px-6 py-4 w-32 font-semibold text-center border-b border-slate-700">리스크 강도</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {data.negativeStocks.length > 0 ? data.negativeStocks.map((stock: any, i: number) => {
                                        const relatedImpact = data.marketImpact.find(impact => impact.name === stock.name);
                                        const sector = relatedImpact ? "자동차/수출제조업" : "금융/은행";
                                        const stars = relatedImpact?.stars || 3;
                                        
                                        return (
                                            <tr key={i} className="hover:bg-slate-800/50 transition-colors bg-slate-900">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <StockLogo ticker={stock.ticker} name={stock.name} className="w-8 h-8 rounded-md" />
                                                        <div className="flex flex-col">
                                                            <span className="text-white font-bold text-sm">{stock.name}</span>
                                                            <div className="flex items-center gap-1.5 mt-0.5">
                                                                {stock.ticker.match(/^\\d{6}$/) ? (
                                                                    <span className="text-slate-500 text-[10px] font-mono">{stock.ticker}</span>
                                                                ) : (
                                                                    <Badge variant="outline" className="w-fit text-[9px] px-1 py-0 h-4 border-slate-600 text-slate-400 bg-slate-800">해외</Badge>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="text-slate-400 text-xs bg-slate-800 px-2 py-1 rounded-md">{sector}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <Avatar name={stock.influencer} className="w-6 h-6" />
                                                        <span className="text-slate-300 text-sm font-medium">{stock.influencer}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-slate-400 text-sm leading-relaxed block line-clamp-2" title={stock.reason}>{stock.reason}</span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <div className="flex justify-center gap-0.5">
                                                        {[...Array(5)].map((_, idx) => (
                                                            <Star 
                                                                key={idx} 
                                                                className={cn(
                                                                    "w-3.5 h-3.5", 
                                                                    idx < stars 
                                                                        ? "fill-[#ff7c7e] text-[#ff7c7e]"
                                                                        : "fill-slate-700 text-slate-700"
                                                                )} 
                                                            />
                                                        ))}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    }) : (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-8 text-center text-slate-500 text-sm">리스크 주시 종목이 없습니다.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>"""

# Replace the tables we created previously
content = re.sub(
    r'<table className="w-full text-left min-w-\[800px\] border-collapse">.*?<thead className="bg-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">.*?<tr>.*?<th className="px-6 py-4 w-64 font-semibold text-left border-b border-slate-700">종목</th>.*?<th className="px-6 py-4 w-48 font-semibold text-left border-b border-slate-700">주요 언급 인사</th>.*?<th className="px-6 py-4 font-semibold text-left border-b border-slate-700">영향 근거</th>.*?</tr>.*?</thead>.*?<tbody className="divide-y divide-white/5">.*?\{data\.positiveStocks\.length > 0 \? data\.positiveStocks\.map\(\(stock, i\) => \(.*?<tr key=\{i\}.*?>.*?</tr>.*?\)\) : \(.*?<tr>.*?<td colSpan=\{3\}.*?</tr>.*?\) \}.*?</tbody>.*?</table>',
    new_positive_table,
    content,
    flags=re.DOTALL
)

content = re.sub(
    r'<table className="w-full text-left min-w-\[800px\] border-collapse">.*?<thead className="bg-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">.*?<tr>.*?<th className="px-6 py-4 w-64 font-semibold text-left border-b border-slate-700">종목</th>.*?<th className="px-6 py-4 w-48 font-semibold text-left border-b border-slate-700">주요 언급 인사</th>.*?<th className="px-6 py-4 font-semibold text-left border-b border-slate-700">영향 근거</th>.*?</tr>.*?</thead>.*?<tbody className="divide-y divide-white/5">.*?\{data\.negativeStocks\.length > 0 \? data\.negativeStocks\.map\(\(stock, i\) => \(.*?<tr key=\{i\}.*?>.*?</tr>.*?\)\) : \(.*?<tr>.*?<td colSpan=\{3\}.*?</tr>.*?\) \}.*?</tbody>.*?</table>',
    new_negative_table,
    content,
    flags=re.DOTALL
)

with open(filepath, "w") as f:
    f.write(content)
