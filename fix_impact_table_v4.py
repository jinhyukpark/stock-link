import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

start_idx = content.find('{/* 3. ② 시장 영향 분석 (하단) */}')
end_idx = content.find('</section>', start_idx)

if start_idx != -1 and end_idx != -1:
    before = content[:start_idx]
    after = content[end_idx:]

    new_table_section = """{/* 3. ② 시장 영향 분석 (하단) */}
            <section className="mb-16">
                <SectionTitle icon={TrendingUp} title="📊 시장 영향 분석" subtitle="각 발언이 국내 증시에 미칠 영향을 분석했습니다" />
                <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden shadow-lg w-full overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left min-w-[1400px] border-collapse">
                        <thead className="bg-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            <tr>
                                <th className="px-4 py-4 w-28 font-semibold text-center border-b border-slate-700/50">영향도 강도</th>
                                <th className="px-4 py-4 w-48 font-semibold text-left border-b border-slate-700/50">인물</th>
                                <th className="px-4 py-4 min-w-[320px] font-semibold text-left border-b border-slate-700/50">발언</th>
                                <th className="px-4 py-4 min-w-[220px] w-64 font-semibold text-emerald-400 text-xs bg-emerald-950/10 text-left border-b border-slate-700/50">📈 수혜 종목</th>
                                <th className="px-4 py-4 min-w-[220px] w-64 font-semibold text-[#ff7c7e] text-xs bg-[#ff7c7e]/5 text-left border-b border-slate-700/50">📉 리스크 종목</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {data.speakers.map((speaker, i) => {
                                const impactLevel = speaker.impactLevel || (speaker.stars >= 4 ? 'high' : speaker.stars === 3 ? 'medium' : 'low');
                                const bgClass = impactLevel === 'high' ? 'bg-[#ff7c7e]/10 hover:bg-[#ff7c7e]/15' :
                                                impactLevel === 'medium' ? 'bg-amber-500/10 hover:bg-amber-500/15' :
                                                'bg-emerald-500/10 hover:bg-emerald-500/15';
                                
                                const impactText = impactLevel === 'high' ? '높음' : impactLevel === 'medium' ? '중간' : '낮음';
                                const impactColor = impactLevel === 'high' ? 'text-[#ff7c7e]' : impactLevel === 'medium' ? 'text-amber-400' : 'text-emerald-400';
                                const dotColor = impactLevel === 'high' ? 'bg-[#ff7c7e]' : impactLevel === 'medium' ? 'bg-amber-400' : 'bg-emerald-400';
                                
                                return (
                                    <tr key={`overview-${speaker.id}`} className={cn(
                                        "align-top transition-colors",
                                        bgClass
                                    )}>
                                        {/* 1. 영향도 강도 */}
                                        <td className="px-4 py-6 border-r border-white/5">
                                            <div className="flex flex-col items-center justify-start gap-2 pt-2">
                                                <div className={cn("w-3.5 h-3.5 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)]", dotColor)}></div>
                                                <span className={cn("text-xs font-bold whitespace-nowrap", impactColor)}>{impactText}</span>
                                            </div>
                                        </td>
                                        
                                        {/* 2. 인물 */}
                                        <td className="px-4 py-6 min-w-[160px] border-r border-white/5">
                                            <div className="flex flex-col gap-3">
                                                <div className="flex items-center gap-3">
                                                    <Avatar name={speaker.speaker} className="w-10 h-10 shrink-0" />
                                                    <div className="flex flex-col gap-0.5">
                                                        <span className="text-white font-bold text-sm leading-tight">{speaker.speaker}</span>
                                                        <span className="text-slate-400 text-[11px] leading-tight">{speaker.speakerTitle}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* 3. 발언 */}
                                        <td className="px-4 py-6 border-r border-white/5">
                                            <div className="flex flex-col gap-4">
                                                <div className="flex flex-col gap-1.5">
                                                    <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider">발언 요약</span>
                                                    <p className="text-slate-200 text-sm leading-relaxed font-medium">
                                                        {speaker.summary}
                                                    </p>
                                                </div>
                                                
                                                <div className="flex flex-col gap-1.5">
                                                    <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider">시장 영향 분석</span>
                                                    <p className="text-slate-400 text-[13px] leading-relaxed">
                                                        {speaker.analysis || `${speaker.speaker}의 발언은 관련 섹터에 즉각적인 변동성을 야기하고 있으며, 단기 포지션 관리의 핵심 변수로 부상했습니다.`}
                                                    </p>
                                                </div>
                                                
                                                <div className="flex items-center gap-4 mt-2 pt-3 border-t border-white/5">
                                                    <a href="#" className="inline-flex items-center text-blue-400 hover:text-blue-300 hover:underline text-[11px] font-medium" onClick={(e) => e.preventDefault()}>
                                                        <ExternalLink className="w-3 h-3 mr-1" />
                                                        원문 보기
                                                    </a>
                                                    <div className="flex items-center text-slate-500 text-[11px] font-mono tracking-wider gap-1">
                                                        <CalendarIcon className="w-3 h-3" />
                                                        {speaker.time ? speaker.time : "2026-04-26 09:00 KST"}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* 4. 수혜 종목 */}
                                        <td className="px-4 py-6 border-r border-white/5">
                                            <div className="flex flex-col gap-2">
                                                {speaker.positiveStocks && speaker.positiveStocks.length > 0 ? (
                                                    speaker.positiveStocks.map((stock, idx) => (
                                                        <div key={idx} className="flex flex-col gap-1 px-3 py-2 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                                                            <div className="flex items-center gap-1.5">
                                                                <StockLogo ticker={stock.ticker} name={stock.name} className="w-3.5 h-3.5 rounded-sm shrink-0" />
                                                                <span className="text-emerald-400 text-xs font-bold">{stock.name}</span>
                                                                <span className="text-emerald-500/70 text-[10px] font-mono">({stock.ticker})</span>
                                                            </div>
                                                            {stock.reason && (
                                                                <span className="text-emerald-200/70 text-[11px] leading-snug pl-5">- {stock.reason}</span>
                                                            )}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="text-slate-600 text-xs w-full text-center py-4">—</div>
                                                )}
                                            </div>
                                        </td>

                                        {/* 5. 리스크 종목 */}
                                        <td className="px-4 py-6">
                                            <div className="flex flex-col gap-2">
                                                {speaker.negativeStocks && speaker.negativeStocks.length > 0 ? (
                                                    speaker.negativeStocks.map((stock, idx) => (
                                                        <div key={idx} className="flex flex-col gap-1 px-3 py-2 rounded-md bg-rose-500/10 border border-rose-500/20">
                                                            <div className="flex items-center gap-1.5">
                                                                <StockLogo ticker={stock.ticker} name={stock.name} className="w-3.5 h-3.5 rounded-sm shrink-0 grayscale opacity-80" />
                                                                <span className="text-rose-400 text-xs font-bold">{stock.name}</span>
                                                                <span className="text-rose-500/70 text-[10px] font-mono">({stock.ticker})</span>
                                                            </div>
                                                            {stock.reason && (
                                                                <span className="text-rose-200/70 text-[11px] leading-snug pl-5">- {stock.reason}</span>
                                                            )}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="text-slate-600 text-xs w-full text-center py-4">—</div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                """
    
    with open(filepath, "w") as f:
        f.write(before + new_table_section + after)
