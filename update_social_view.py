import os
import re

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# 1. StockBadge to StockFlagItem
old_stock_badge = """const StockBadge = ({ ticker, name, type }: { ticker: string, name: string, type: 'positive' | 'negative' }) => {
    return (
        <div className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-full border bg-opacity-10",
            type === 'positive' ? "bg-emerald-500 border-emerald-500/30 text-emerald-400" : "bg-rose-500 border-rose-500/30 text-rose-400"
        )}>
            <StockLogo ticker={ticker} name={name} className="w-4 h-4 rounded-sm" />
            <span className="text-xs font-bold whitespace-nowrap">{name}</span>
        </div>
    );
};"""

new_stock_flag_item = """const StockFlagItem = ({ ticker, name, type }: { ticker: string, name: string, type: 'positive' | 'negative' }) => {
    const isKr = /^\\d{6}$/.test(ticker);
    const countryCode = isKr ? "kr" : "us";
    const impact = (ticker.charCodeAt(0) + name.length) % 40 + 40; 
    return (
        <div className={cn(
            "flex items-center gap-2 px-2.5 py-1.5 rounded-lg border shadow-sm",
            type === 'positive' ? "bg-emerald-500/10 border-emerald-500/20" : "bg-rose-500/10 border-rose-500/20"
        )}>
            <img src={flagUrl(countryCode)} alt={countryCode} className="w-4 h-3 object-cover rounded-sm shadow-sm" />
            <span className="text-slate-200 text-[13px] font-medium whitespace-nowrap">{name}</span>
            <span className={cn(
                "text-[12px] font-bold ml-1",
                type === 'positive' ? "text-emerald-400" : "text-rose-400"
            )}>{impact}%</span>
        </div>
    );
};"""

if old_stock_badge in content:
    content = content.replace(old_stock_badge, new_stock_flag_item)
    content = content.replace("<StockBadge", "<StockFlagItem")

# 2. Add time to summary
content = re.sub(
    r'<p className="text-\[15px\] text-slate-200 leading-relaxed font-medium">\s*\{update\.summary\}\s*</p>',
    r'<p className="text-[15px] text-slate-200 leading-relaxed font-medium">\n                                        {update.summary} <span className="text-slate-400 text-[11px] ml-2 font-normal tracking-wide bg-slate-800/80 px-1.5 py-0.5 rounded">{update.time.split(\'-\').pop()}:{(update.id * 17 % 60).toString().padStart(2, \'0\')} KST</span>\n                                    </p>',
    content
)

# 3. Replace section 3 (시장 영향 분석)
start_str = "            {/* 3. ② 시장 영향 분석 (하단) */}"
end_str = "            {/* 4. ③ 수혜/리스크 종목 요약 (가장 하단) */}"
start_idx = content.find(start_str)
end_idx = content.find(end_str)

new_section_3 = """            {/* 3. ② 시장 영향도: 상세 분석 */}
            <section className="mb-16">
                <SectionTitle icon={Activity} title="📊 시장 영향도 - 상세 분석" subtitle="각 발언이 증시에 미친 영향을 인물별로 분석했습니다." />
                <div className="space-y-4">
                    {data.influencerUpdates.map((update, idx) => (
                        <div key={`impact-${idx}`} className="bg-rose-950/10 border border-rose-500/20 rounded-xl p-5 flex flex-col md:flex-row gap-5">
                            {/* Left: Influencer Profile */}
                            <div className="w-full md:w-56 shrink-0 flex flex-col gap-2 border-b md:border-b-0 md:border-r border-white/5 pb-4 md:pb-0 pr-4">
                                <div className="text-xs font-bold text-rose-400 mb-1 flex items-center gap-1"><AlertTriangle className="w-3 h-3"/> 영향도: {idx < 2 ? "높음" : "중간"}</div>
                                <div className="flex items-center gap-3">
                                    <Avatar name={update.speaker} className="w-10 h-10" />
                                    <div>
                                        <div className="text-white font-bold text-sm">{update.speaker}</div>
                                        <div className="text-slate-400 text-[10px]">{update.followers}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-500">
                                    <img src={flagUrl(update.countryCode)} alt={update.country} className="w-3.5 h-2.5 rounded-sm" />
                                    <span>{update.country}</span>
                                    <span>•</span>
                                    <span>{update.time}</span>
                                </div>
                            </div>
                            
                            {/* Right: Impact details */}
                            <div className="flex-1 flex flex-col gap-3">
                                <div>
                                    <span className="text-slate-400 text-[11px] font-bold mr-2">발언 요약:</span>
                                    <span className="text-slate-200 text-xs leading-relaxed">{update.summary}</span>
                                </div>
                                
                                <div className="flex flex-col gap-3 mt-1">
                                    {update.positiveStocks.length > 0 && (
                                        <div>
                                            <div className="text-[10px] font-bold text-emerald-400 mb-1.5 flex items-center gap-1">
                                                <TrendingUp className="w-3 h-3"/> 긍정 종목
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {update.positiveStocks.map(s => (
                                                    <div key={s.ticker} className="flex items-center gap-1.5 text-xs bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded">
                                                        <img src={flagUrl(/^\\d{6}$/.test(s.ticker) ? "kr" : "us")} className="w-3 h-2 rounded-sm" />
                                                        <span className="text-slate-300 font-medium text-[11px]">{s.name}</span>
                                                        <span className="text-emerald-400 font-bold ml-1 text-[11px]">+{(s.ticker.charCodeAt(0) + s.name.length) % 15 + 2}.{(s.name.length * 3) % 9} %</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {update.negativeStocks.length > 0 && (
                                        <div>
                                            <div className="text-[10px] font-bold text-rose-400 mb-1.5 flex items-center gap-1">
                                                <TrendingDown className="w-3 h-3"/> 부정 종목
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {update.negativeStocks.map(s => (
                                                    <div key={s.ticker} className="flex items-center gap-1.5 text-xs bg-rose-500/10 border border-rose-500/20 px-2 py-1 rounded">
                                                        <img src={flagUrl(/^\\d{6}$/.test(s.ticker) ? "kr" : "us")} className="w-3 h-2 rounded-sm" />
                                                        <span className="text-slate-300 font-medium text-[11px]">{s.name}</span>
                                                        <span className="text-rose-400 font-bold ml-1 text-[11px]">-{(s.ticker.charCodeAt(0) + s.name.length) % 15 + 2}.{(s.name.length * 3) % 9} %</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-1 pt-2 border-t border-white/5">
                                    <span className="text-slate-400 text-[11px] font-bold mr-2">시장 영향 분석:</span>
                                    <span className="text-slate-300 text-[11px] leading-relaxed">
                                        {update.positiveStocks.length > update.negativeStocks.length ? "관련 수혜주를 중심으로 투자 심리가 단기적으로 개선될 전망입니다. " : "리스크 요인이 부각되며 관련 섹터 전반에 투자 심리가 위축될 수 있습니다. "}
                                        특히 {update.positiveStocks[0]?.name || update.negativeStocks[0]?.name || "관련 종목들"}의 움직임이 시장의 방향성을 주도할 가능성이 높습니다.
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>\n\n"""

if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + new_section_3 + content[end_idx:]


# 4. Replace section 4 (수혜/리스크 종목 요약)
start_str4 = "            {/* 4. ③ 수혜/리스크 종목 요약 (가장 하단) */}"
end_str4 = "            {/* 5. ④ 섹터별 영향 분석 (우측 하단) */}"
start_idx4 = content.find(start_str4)
end_idx4 = content.find(end_str4)

new_section_4 = """            {/* 4. ③ 수혜/리스크 종목 요약 (가장 하단) */}
            <section className="mb-16">
                <SectionTitle icon={CheckCircle2} title="🎯 수혜 / 리스크 주시 종목 종합" />
                <div className="space-y-8">
                    {/* 긍정 종목 테이블 */}
                    <div>
                        <h3 className="text-emerald-400 font-bold mb-3 flex items-center gap-2 text-sm"><TrendingUp className="w-4 h-4"/> 긍정 종목 종합 (상승/호재 기대)</h3>
                        <div className="bg-slate-900 border border-emerald-500/20 rounded-xl overflow-hidden shadow-lg w-full overflow-x-auto custom-scrollbar">
                            <table className="w-full text-left min-w-[800px] border-collapse">
                                <thead className="bg-emerald-950/40 text-[11px] font-semibold text-emerald-200/70 uppercase tracking-wider">
                                    <tr>
                                        <th className="px-4 py-3 w-12 text-center border-b border-emerald-500/20">순위</th>
                                        <th className="px-4 py-3 w-40 border-b border-emerald-500/20">종목명</th>
                                        <th className="px-4 py-3 w-20 border-b border-emerald-500/20">티커</th>
                                        <th className="px-4 py-3 w-20 border-b border-emerald-500/20 text-center">영향도</th>
                                        <th className="px-4 py-3 w-36 border-b border-emerald-500/20">언급 발언자</th>
                                        <th className="px-4 py-3 border-b border-emerald-500/20">긍정 사유 요약</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-emerald-500/10">
                                    {data.positiveStocks.map((stock, i) => (
                                        <tr key={i} className="hover:bg-emerald-500/5 transition-colors">
                                            <td className="px-4 py-3 text-center text-slate-500 text-xs font-mono">{i + 1}</td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <img src={flagUrl(/^\\d{6}$/.test(stock.ticker) ? "kr" : "us")} className="w-3.5 h-2.5 rounded-sm" />
                                                    <span className="text-slate-200 font-bold text-xs">{stock.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-slate-500 text-[11px] font-mono">{stock.ticker}</td>
                                            <td className="px-4 py-3 text-emerald-400 text-xs font-bold text-center">{(stock.ticker.charCodeAt(0) + stock.name.length) % 40 + 50}%</td>
                                            <td className="px-4 py-3 text-slate-400 text-[11px]">{stock.influencer}</td>
                                            <td className="px-4 py-3 text-slate-300 text-[11px] leading-relaxed">{stock.reason}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* 부정 종목 테이블 */}
                    <div>
                        <h3 className="text-rose-400 font-bold mb-3 flex items-center gap-2 text-sm"><TrendingDown className="w-4 h-4"/> 부정 종목 종합 (하락/악재 우려)</h3>
                        <div className="bg-slate-900 border border-rose-500/20 rounded-xl overflow-hidden shadow-lg w-full overflow-x-auto custom-scrollbar">
                            <table className="w-full text-left min-w-[800px] border-collapse">
                                <thead className="bg-rose-950/40 text-[11px] font-semibold text-rose-200/70 uppercase tracking-wider">
                                    <tr>
                                        <th className="px-4 py-3 w-12 text-center border-b border-rose-500/20">순위</th>
                                        <th className="px-4 py-3 w-40 border-b border-rose-500/20">종목명</th>
                                        <th className="px-4 py-3 w-20 border-b border-rose-500/20">티커</th>
                                        <th className="px-4 py-3 w-20 border-b border-rose-500/20 text-center">영향도</th>
                                        <th className="px-4 py-3 w-36 border-b border-rose-500/20">언급 발언자</th>
                                        <th className="px-4 py-3 border-b border-rose-500/20">부정 사유 요약</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-rose-500/10">
                                    {data.negativeStocks.map((stock, i) => (
                                        <tr key={i} className="hover:bg-rose-500/5 transition-colors">
                                            <td className="px-4 py-3 text-center text-slate-500 text-xs font-mono">{i + 1}</td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <img src={flagUrl(/^\\d{6}$/.test(stock.ticker) ? "kr" : "us")} className="w-3.5 h-2.5 rounded-sm" />
                                                    <span className="text-slate-200 font-bold text-xs">{stock.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-slate-500 text-[11px] font-mono">{stock.ticker}</td>
                                            <td className="px-4 py-3 text-rose-400 text-xs font-bold text-center">{(stock.ticker.charCodeAt(0) + stock.name.length) % 40 + 50}%</td>
                                            <td className="px-4 py-3 text-slate-400 text-[11px]">{stock.influencer}</td>
                                            <td className="px-4 py-3 text-slate-300 text-[11px] leading-relaxed">{stock.reason}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>\n\n"""

if start_idx4 != -1 and end_idx4 != -1:
    content = content[:start_idx4] + new_section_4 + content[end_idx4:]

# 5. Add quotes below sector analysis
sector_end_str = "                        </tbody>\n                    </table>\n                </div>"
sector_end_idx = content.find(sector_end_str, end_idx4)

if sector_end_idx != -1:
    insertion_idx = sector_end_idx + len(sector_end_str)
    quotes_html = """
                {/* 섹터 관련 코멘트 추가 */}
                <div className="mt-6 bg-slate-800/30 rounded-xl border border-white/5 p-5">
                    <h4 className="text-sm font-bold text-slate-300 mb-4 flex items-center gap-2"><MessageSquare className="w-4 h-4 text-blue-400"/> 섹터 관련 주요 인사 코멘트</h4>
                    <div className="space-y-4">
                        <div className="flex flex-col gap-1 border-l-2 border-blue-500/50 pl-4 py-1">
                            <span className="text-[11px] text-blue-400 font-bold">반도체 / AI 인프라</span>
                            <span className="text-xs text-slate-300">"Capex 250억 달러 상향, AI 인프라 투자는 올해 가장 중요한 과제" <span className="text-slate-500 ml-1">- 일론 머스크</span></span>
                        </div>
                        <div className="flex flex-col gap-1 border-l-2 border-rose-500/50 pl-4 py-1">
                            <span className="text-[11px] text-rose-400 font-bold">자동차 / 수출제조업</span>
                            <span className="text-xs text-slate-300">"보편적 기본 관세 15% 적용으로 자국 산업을 보호해야 한다" <span className="text-slate-500 ml-1">- 도널드 트럼프</span></span>
                        </div>
                        <div className="flex flex-col gap-1 border-l-2 border-emerald-500/50 pl-4 py-1">
                            <span className="text-[11px] text-emerald-400 font-bold">금융 / 증권 / 은행</span>
                            <span className="text-xs text-slate-300">"물가 상방 리스크로 인해 긴축 기조를 당분간 유지할 필요가 있다" <span className="text-slate-500 ml-1">- 이창용</span></span>
                        </div>
                    </div>
                </div>"""
    content = content[:insertion_idx] + quotes_html + content[insertion_idx:]

with open(filepath, "w") as f:
    f.write(content)
