import os
import re

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

new_section = """{/* 4. 긍/부정 종목 종합 */}
            <section className="mb-16 flex flex-col gap-10">
                {/* 긍정 종목 테이블 */}
                <div>
                    <h3 className="text-emerald-400 font-bold text-lg mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" /> 긍정 종목 종합 (상승/호재 기대)
                    </h3>
                    <div className="bg-slate-900 border border-emerald-900/30 rounded-xl overflow-hidden shadow-lg w-full overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left min-w-[1000px] border-collapse">
                            <thead className="bg-[#4a7c59] text-white text-xs">
                                <tr>
                                    <th className="px-6 py-3 font-semibold text-center w-16">시장</th>
                                    <th className="px-6 py-3 font-semibold w-40">종목명</th>
                                    <th className="px-6 py-3 font-semibold w-32">티커</th>
                                    <th className="px-6 py-3 font-semibold w-56">언급 발언자</th>
                                    <th className="px-6 py-3 font-semibold">긍정 사유 요약</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-emerald-900/20">
                                {data.positiveStocks.length > 0 ? data.positiveStocks.map((stock, i) => {
                                    const isKr = /^\\d{6}$/.test(stock.ticker);
                                    const countryCode = isKr ? "kr" : "us";
                                    return (
                                        <tr key={`pos-${i}`} className={cn(i % 2 === 0 ? "bg-emerald-950/10" : "bg-emerald-950/5", "hover:bg-emerald-900/20 transition-colors")}>
                                            <td className="px-6 py-4 text-center">
                                                <img src={flagUrl(countryCode)} alt={countryCode} className="w-5 h-3.5 mx-auto object-cover rounded-[2px] shadow-sm" />
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-slate-200 font-bold text-sm">{stock.name}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-slate-400 text-xs font-mono">{stock.ticker}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-slate-300 text-xs">{stock.influencer}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-slate-300 text-xs leading-relaxed">{stock.reason}</span>
                                            </td>
                                        </tr>
                                    )
                                }) : (
                                    <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500 text-sm">관련 종목이 없습니다.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 부정 종목 테이블 */}
                <div>
                    <h3 className="text-[#ff7c7e] font-bold text-lg mb-4 flex items-center gap-2">
                        <TrendingDown className="w-5 h-5" /> 부정 종목 종합 (하락/악재 우려)
                    </h3>
                    <div className="bg-slate-900 border border-[#ff7c7e]/20 rounded-xl overflow-hidden shadow-lg w-full overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left min-w-[1000px] border-collapse">
                            <thead className="bg-[#b33939] text-white text-xs">
                                <tr>
                                    <th className="px-6 py-3 font-semibold text-center w-16">시장</th>
                                    <th className="px-6 py-3 font-semibold w-40">종목명</th>
                                    <th className="px-6 py-3 font-semibold w-32">티커</th>
                                    <th className="px-6 py-3 font-semibold w-56">언급 발언자</th>
                                    <th className="px-6 py-3 font-semibold">부정 사유 요약</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-rose-900/20">
                                {data.negativeStocks.length > 0 ? data.negativeStocks.map((stock, i) => {
                                    const isKr = /^\\d{6}$/.test(stock.ticker);
                                    const countryCode = isKr ? "kr" : "us";
                                    return (
                                        <tr key={`neg-${i}`} className={cn(i % 2 === 0 ? "bg-rose-950/10" : "bg-rose-950/5", "hover:bg-rose-900/20 transition-colors")}>
                                            <td className="px-6 py-4 text-center">
                                                <img src={flagUrl(countryCode)} alt={countryCode} className="w-5 h-3.5 mx-auto object-cover rounded-[2px] shadow-sm" />
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-slate-200 font-bold text-sm">{stock.name}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-slate-400 text-xs font-mono">{stock.ticker}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-slate-300 text-xs">{stock.influencer}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-slate-300 text-xs leading-relaxed">{stock.reason}</span>
                                            </td>
                                        </tr>
                                    )
                                }) : (
                                    <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500 text-sm">관련 종목이 없습니다.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>"""

parts = content.split('{/* 4. 긍/부정 종목 종합 */}')
if len(parts) > 1:
    pre = parts[0]
    post = parts[1]
    
    end_idx = post.find('</section>')
    if end_idx != -1:
        post_after = post[end_idx + len('</section>'):]
        content = pre + new_section + post_after
        with open(filepath, "w") as f:
            f.write(content)
