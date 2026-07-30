import os
import re

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

new_section = """{/* 4. 긍/부정 종목 종합 */}
            <section className="mb-16">
                <SectionTitle icon={BarChart3} title="수혜 가능 / 리스크 주시 종목 종합" subtitle="발언을 바탕으로 집계된 종목들의 요약입니다" />
                
                <div className="flex flex-col gap-8">
                    {/* 수혜 가능 종목 테이블 */}
                    <div className="bg-slate-900 border border-emerald-900/40 rounded-xl overflow-hidden shadow-lg w-full">
                        <div className="bg-emerald-950/40 px-6 py-4 border-b border-emerald-900/40 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-emerald-400" />
                            <h3 className="text-emerald-400 font-bold text-base">수혜 가능 종목</h3>
                        </div>
                        <div className="overflow-x-auto custom-scrollbar">
                            <table className="w-full text-left min-w-[800px] border-collapse">
                                <thead className="bg-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4 w-64 font-semibold text-left border-b border-slate-700">종목</th>
                                        <th className="px-6 py-4 w-48 font-semibold text-left border-b border-slate-700">주요 언급 인사</th>
                                        <th className="px-6 py-4 font-semibold text-left border-b border-slate-700">영향 근거</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {data.positiveStocks.length > 0 ? data.positiveStocks.map((stock, i) => (
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
                                            <td className="px-6 py-4">
                                                <span className="text-slate-300 text-sm font-medium">{stock.influencer}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-slate-400 text-sm leading-relaxed">{stock.reason}</span>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={3} className="px-6 py-8 text-center text-slate-500 text-sm">수혜 가능 종목이 없습니다.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* 리스크 주시 종목 테이블 */}
                    <div className="bg-slate-900 border border-[#ff7c7e]/20 rounded-xl overflow-hidden shadow-lg w-full">
                        <div className="bg-[#ff7c7e]/10 px-6 py-4 border-b border-[#ff7c7e]/20 flex items-center gap-2">
                            <TrendingDown className="w-5 h-5 text-rose-400" />
                            <h3 className="text-rose-400 font-bold text-base">리스크 주시 종목</h3>
                        </div>
                        <div className="overflow-x-auto custom-scrollbar">
                            <table className="w-full text-left min-w-[800px] border-collapse">
                                <thead className="bg-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4 w-64 font-semibold text-left border-b border-slate-700">종목</th>
                                        <th className="px-6 py-4 w-48 font-semibold text-left border-b border-slate-700">주요 언급 인사</th>
                                        <th className="px-6 py-4 font-semibold text-left border-b border-slate-700">영향 근거</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {data.negativeStocks.length > 0 ? data.negativeStocks.map((stock, i) => (
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
                                            <td className="px-6 py-4">
                                                <span className="text-slate-300 text-sm font-medium">{stock.influencer}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-slate-400 text-sm leading-relaxed">{stock.reason}</span>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={3} className="px-6 py-8 text-center text-slate-500 text-sm">리스크 주시 종목이 없습니다.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>"""

# Find the old section and replace it
# The old section starts with {/* 4. 긍/부정 종목 종합 */} and ends at the closing </section>
start_marker = "{/* 4. 긍/부정 종목 종합 */}"
parts = content.split(start_marker)
if len(parts) > 1:
    pre = parts[0]
    post = parts[1]
    
    end_index = post.find('</section>')
    if end_index != -1:
        post_after = post[end_index + len('</section>'):]
        content = pre + new_section + post_after

with open(filepath, "w") as f:
    f.write(content)
