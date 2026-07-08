import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r", encoding='utf-8') as f:
    content = f.read()

# Let's fix the missing closing tag problem. We have a missing </tbody> or </table> or something similar because of bad replacement.
# Looking at the file, the previous duplicate was removed, but there's an orphan <thead ...> floating somewhere probably?
# Let's completely recreate the Market Impact Overview section to ensure it's clean and syntactically correct.

content_split = content.split('            {/* 3. ② 시장 영향 분석 (하단) */}')
if len(content_split) > 1:
    pre = content_split[0]
    # We find where this section ends
    post_split = content_split[1].split('            {/* 4. 긍/부정 종목 종합 */}')
    if len(post_split) > 1:
        post = '            {/* 4. 긍/부정 종목 종합 */}' + post_split[1]
        
        # Now recreate the table perfectly
        new_section = """            {/* 3. ② 시장 영향 분석 (하단) */}
            <section className="mb-16">
                <SectionTitle icon={TrendingUp} title="📊 시장 영향 분석" subtitle="각 발언이 국내 증시에 미칠 영향을 분석했습니다" />
                <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden shadow-lg w-full overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left min-w-[1300px] border-collapse">
                        <thead className="bg-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 w-40 font-semibold text-left border-b border-slate-700">주요 인사</th>
                                <th className="px-6 py-4 min-w-[240px] font-semibold text-left border-b border-slate-700">시장 영향 분석</th>
                                <th className="px-6 py-4 min-w-[180px] font-semibold text-left border-b border-slate-700 text-emerald-400">수혜 종목</th>
                                <th className="px-6 py-4 min-w-[180px] font-semibold text-left border-b border-slate-700 text-rose-400">리스크 종목</th>
                                <th className="px-6 py-4 w-24 font-semibold text-center border-b border-slate-700">방향</th>
                                <th className="px-6 py-4 w-32 font-semibold text-center border-b border-slate-700">강도</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {data.speakers.map((speaker, i) => {
                                const isPositive = speaker.positiveStocks.length >= speaker.negativeStocks.length;
                                const directionText = isPositive ? '수혜' : '리스크';
                                const marketImpactEntry = data.marketImpact.find(m => m.name === speaker.speaker) || data.marketImpact[i % data.marketImpact.length];
                                const stars = marketImpactEntry ? marketImpactEntry.stars : 3;
                                
                                return (
                                    <tr key={`overview-${speaker.id}`} className={cn(
                                        "bg-slate-900", 
                                        "align-top border-b border-slate-800/50",
                                        "hover:bg-slate-800/50 transition-colors"
                                    )}>
                                        <td className="px-6 py-6 border-r border-slate-800/30">
                                            <div className="flex items-start gap-3">
                                                <Avatar name={speaker.speaker} className="w-10 h-10 shrink-0" />
                                                <div className="flex flex-col">
                                                    <span className="text-white font-bold text-sm whitespace-nowrap mb-0.5">{speaker.speaker}</span>
                                                    <span className="text-slate-400 text-xs font-medium leading-tight whitespace-pre-wrap">{speaker.speakerTitle}</span>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-6 pr-8 border-r border-slate-800/30">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center justify-between gap-2 mb-1">
                                                    <span className="text-slate-500 text-[11px] font-mono flex items-center gap-1.5 bg-slate-800/80 px-2 py-1 rounded-md w-fit">
                                                        <Clock className="w-3 h-3" />
                                                        {speaker.timestamp}
                                                    </span>
                                                    <a href="#" className="text-slate-500 hover:text-blue-400 transition-colors flex items-center gap-1 text-[11px] group">
                                                        <LinkIcon className="w-3 h-3" />
                                                        <span className="group-hover:underline">원문 보기</span>
                                                    </a>
                                                </div>
                                                <p className="text-slate-300 text-sm leading-relaxed" title={speaker.summary}>
                                                    {speaker.summary}
                                                </p>
                                            </div>
                                        </td>

                                        <td className="px-6 py-6 border-r border-slate-800/30 bg-emerald-950/10">
                                            <div className="flex flex-col gap-2.5">
                                                {speaker.positiveStocks.length > 0 ? (
                                                    speaker.positiveStocks.map((stock, idx) => (
                                                        <div key={`pos-${idx}`} className="flex items-center gap-2 group">
                                                            <StockLogo ticker={stock.ticker} name={stock.name} className="w-5 h-5 rounded-sm" />
                                                            <div className="flex flex-col">
                                                                <span className="text-white text-xs font-semibold group-hover:text-emerald-400 transition-colors">{stock.name}</span>
                                                                <span className="text-slate-500 text-[10px] font-mono">{stock.ticker.match(/^\\d{6}$/) ? stock.ticker : '해외'}</span>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <span className="text-slate-600 text-xs">-</span>
                                                )}
                                            </div>
                                        </td>
                                        
                                        <td className="px-6 py-6 border-r border-slate-800/30 bg-rose-950/10">
                                            <div className="flex flex-col gap-2.5">
                                                {speaker.negativeStocks.length > 0 ? (
                                                    speaker.negativeStocks.map((stock, idx) => (
                                                        <div key={`neg-${idx}`} className="flex items-center gap-2 group">
                                                            <StockLogo ticker={stock.ticker} name={stock.name} className="w-5 h-5 rounded-sm" />
                                                            <div className="flex flex-col">
                                                                <span className="text-white text-xs font-semibold group-hover:text-rose-400 transition-colors">{stock.name}</span>
                                                                <span className="text-slate-500 text-[10px] font-mono">{stock.ticker.match(/^\\d{6}$/) ? stock.ticker : '해외'}</span>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <span className="text-slate-600 text-xs">-</span>
                                                )}
                                            </div>
                                        </td>

                                        <td className="px-6 py-6 border-r border-slate-800/30">
                                            <div className="flex justify-center pt-2">
                                                {isPositive ? (
                                                    <Badge variant="outline" className="text-emerald-400 border-emerald-400/30 bg-emerald-950/30 text-xs">수혜</Badge>
                                                ) : (
                                                    <Badge variant="outline" className="text-rose-400 border-rose-400/30 bg-rose-950/30 text-xs">리스크</Badge>
                                                )}
                                            </div>
                                        </td>

                                        <td className="px-6 py-6">
                                            <div className="flex justify-center pt-2 gap-0.5">
                                                {[...Array(5)].map((_, idx) => (
                                                    <Star 
                                                        key={idx} 
                                                        className={cn(
                                                            "w-4 h-4", 
                                                            idx < stars 
                                                                ? (isPositive ? "fill-emerald-400 text-emerald-400" : "fill-[#ff7c7e] text-[#ff7c7e]")
                                                                : "fill-slate-700 text-slate-700"
                                                        )} 
                                                    />
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </section>

            <div className="mb-20 border-t-2 border-slate-700/50"></div>
"""

        content = pre + new_section + post
        with open(filepath, "w", encoding='utf-8') as f:
            f.write(content)

