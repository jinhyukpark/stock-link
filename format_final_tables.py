import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

new_positive_table = """<table className="w-full text-left min-w-[1000px] border-collapse">
                                <thead className="bg-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4 w-64 font-semibold text-left border-b border-slate-700">종목</th>
                                        <th className="px-6 py-4 w-32 font-semibold text-center border-b border-slate-700">섹터</th>
                                        <th className="px-6 py-4 w-48 font-semibold text-left border-b border-slate-700">주요 언급 인사</th>
                                        <th className="px-6 py-4 font-semibold text-left border-b border-slate-700">영향 근거</th>
                                        <th className="px-6 py-4 w-32 font-semibold text-center border-b border-slate-700">수혜 강도</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {data.positiveStocks.length > 0 ? data.positiveStocks.map((stock, i) => {
                                        const relatedImpact = data.marketImpact.find(impact => impact.name === stock.name);
                                        const sector = relatedImpact ? "반도체/AI 인프라" : "IT/플랫폼";
                                        const stars = relatedImpact?.stars || 3;
                                        
                                        return (
                                            <tr key={i} className="hover:bg-slate-800/50 transition-colors bg-slate-900">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <StockLogo ticker={stock.ticker} name={stock.name} className="w-8 h-8 rounded-md" />
                                                        <div className="flex flex-col">
                                                            <span className="text-white font-bold text-sm">{stock.name}</span>
                                                            {stock.ticker.match(/^\\d{6}$/) ? (
                                                                <span className="text-slate-500 text-[10px] font-mono">{stock.ticker}</span>
                                                            ) : (
                                                                <Badge variant="outline" className="w-fit text-[9px] px-1 py-0 h-4 border-slate-600 text-slate-400 bg-slate-800 mt-0.5">해외</Badge>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="text-slate-400 text-[11px] font-medium bg-slate-800/80 px-2 py-1 rounded-md">{sector}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <Avatar name={stock.influencer} className="w-6 h-6" />
                                                        <span className="text-slate-300 text-sm font-medium">{stock.influencer}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-slate-400 text-sm leading-relaxed block">{stock.reason}</span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <div className="flex justify-center gap-0.5 mt-1">
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
                                <thead className="bg-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4 w-64 font-semibold text-left border-b border-slate-700">종목</th>
                                        <th className="px-6 py-4 w-32 font-semibold text-center border-b border-slate-700">섹터</th>
                                        <th className="px-6 py-4 w-48 font-semibold text-left border-b border-slate-700">주요 언급 인사</th>
                                        <th className="px-6 py-4 font-semibold text-left border-b border-slate-700">영향 근거</th>
                                        <th className="px-6 py-4 w-32 font-semibold text-center border-b border-slate-700">리스크 강도</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {data.negativeStocks.length > 0 ? data.negativeStocks.map((stock, i) => {
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
                                                            {stock.ticker.match(/^\\d{6}$/) ? (
                                                                <span className="text-slate-500 text-[10px] font-mono">{stock.ticker}</span>
                                                            ) : (
                                                                <Badge variant="outline" className="w-fit text-[9px] px-1 py-0 h-4 border-slate-600 text-slate-400 bg-slate-800 mt-0.5">해외</Badge>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="text-slate-400 text-[11px] font-medium bg-slate-800/80 px-2 py-1 rounded-md">{sector}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <Avatar name={stock.influencer} className="w-6 h-6" />
                                                        <span className="text-slate-300 text-sm font-medium">{stock.influencer}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-slate-400 text-sm leading-relaxed block">{stock.reason}</span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <div className="flex justify-center gap-0.5 mt-1">
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

# Replace the tables using string split to avoid regex escape issues
parts = content.split('<h3 className="text-emerald-400 font-bold text-base">수혜 가능 종목</h3>')
if len(parts) > 1:
    pre = parts[0] + '<h3 className="text-emerald-400 font-bold text-base">수혜 가능 종목</h3>\n                        </div>\n                        <div className="overflow-x-auto custom-scrollbar">\n                            '
    post = parts[1]
    
    end_table_index = post.find('</table>')
    if end_table_index != -1:
        post_after_table = post[end_table_index + len('</table>'):]
        content = pre + new_positive_table + post_after_table

parts2 = content.split('<h3 className="text-rose-400 font-bold text-base">리스크 주시 종목</h3>')
if len(parts2) > 1:
    pre2 = parts2[0] + '<h3 className="text-rose-400 font-bold text-base">리스크 주시 종목</h3>\n                        </div>\n                        <div className="overflow-x-auto custom-scrollbar">\n                            '
    post2 = parts2[1]
    
    end_table_index2 = post2.find('</table>')
    if end_table_index2 != -1:
        post_after_table2 = post2[end_table_index2 + len('</table>'):]
        content = pre2 + new_negative_table + post_after_table2

with open(filepath, "w") as f:
    f.write(content)
