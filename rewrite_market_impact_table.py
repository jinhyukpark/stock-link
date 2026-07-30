import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

start_idx = content.find('<SectionTitle icon={TrendingUp} title="📊 시장 영향 분석" subtitle="각 발언이 국내 증시에 미칠 영향을 분석했습니다" />')
end_idx = content.find('</section>', start_idx)

if start_idx != -1 and end_idx != -1:
    before = content[:start_idx]
    after = content[end_idx:]

    new_table_section = """<SectionTitle icon={TrendingUp} title="📊 시장 영향 분석" subtitle="각 발언이 국내 증시에 미칠 영향을 분석했습니다" />
                <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden shadow-lg w-full overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left min-w-[1200px] border-collapse">
                        <thead className="bg-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 w-28 font-semibold text-center border-b border-slate-700/50">영향도 강도</th>
                                <th className="px-6 py-4 w-48 font-semibold text-left border-b border-slate-700/50">인물</th>
                                <th className="px-6 py-4 min-w-[300px] font-semibold text-left border-b border-slate-700/50">발언</th>
                                <th className="px-6 py-4 min-w-[140px] w-48 font-semibold text-emerald-400 text-xs bg-emerald-950/10 text-left border-b border-slate-700/50">📈 수혜 종목</th>
                                <th className="px-6 py-4 min-w-[140px] w-48 font-semibold text-[#ff7c7e] text-xs bg-[#ff7c7e]/5 text-left border-b border-slate-700/50">📉 리스크 종목</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {data.speakers.map((speaker, i) => {
                                const impactLevel = speaker.stars >= 4 ? 'high' : speaker.stars === 3 ? 'medium' : 'low';
                                const bgClass = impactLevel === 'high' ? 'bg-[#ff7c7e]/10 hover:bg-[#ff7c7e]/15' :
                                                impactLevel === 'medium' ? 'bg-amber-500/10 hover:bg-amber-500/15' :
                                                'bg-emerald-500/10 hover:bg-emerald-500/15';
                                
                                const impactText = impactLevel === 'high' ? '높음' : impactLevel === 'medium' ? '중간' : '낮음';
                                const impactColor = impactLevel === 'high' ? 'text-[#ff7c7e]' : impactLevel === 'medium' ? 'text-amber-400' : 'text-emerald-400';
                                const dotColor = impactLevel === 'high' ? 'bg-[#ff7c7e]' : impactLevel === 'medium' ? 'bg-amber-400' : 'bg-emerald-400';
                                
                                return (
                                    <tr key={`overview-${speaker.id}`} className={cn(
                                        "align-top transition-colors border-b border-white/5",
                                        bgClass
                                    )}>
                                        <td className="px-6 py-5 text-center">
                                            <div className="flex flex-col items-center justify-start gap-1.5 pt-1">
                                                <div className={cn("w-3 h-3 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)]", dotColor)}></div>
                                                <span className={cn("text-xs font-bold", impactColor)}>{impactText}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 min-w-[160px]">
                                            <div className="flex items-center gap-3">
                                                <Avatar name={speaker.speaker} className="w-10 h-10 shrink-0" />
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="text-white font-bold text-sm whitespace-nowrap">{speaker.speaker}</span>
                                                    <span className="text-slate-500 text-[11px] whitespace-nowrap">{speaker.speakerTitle}</span>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-5 pr-8">
                                            <div className="flex flex-col gap-4">
                                                <div>
                                                    <span className="text-slate-400 text-xs font-bold mb-1 block">발언 요약:</span>
                                                    <p className="text-slate-300 text-sm leading-relaxed" title={speaker.summary}>
                                                        {speaker.summary}
                                                    </p>
                                                </div>
                                                
                                                <div>
                                                    <span className="text-slate-400 text-xs font-bold mb-1 block">시장 영향 분석:</span>
                                                    <p className="text-slate-300 text-sm leading-relaxed">
                                                        {speaker.speaker}의 발언은 관련 섹터에 즉각적인 변동성을 야기하고 있으며, 단기 포지션 관리의 핵심 변수로 부상했습니다.
                                                    </p>
                                                </div>
                                                
                                                <div className="flex items-center gap-4 mt-1">
                                                    <a href="#" className="inline-flex items-center text-blue-400 hover:text-blue-300 hover:underline text-[11px] font-medium" onClick={(e) => e.preventDefault()}>
                                                        <ExternalLink className="w-3 h-3 mr-1" />
                                                        원문 보기
                                                    </a>
                                                    <div className="flex items-center text-slate-500 text-[11px] font-mono tracking-wider gap-1">
                                                        <CalendarIcon className="w-3 h-3" />
                                                        {format(new Date(speaker.date), "yyyy-MM-dd HH:mm KST")}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-5 border-l border-white/5 bg-slate-900/30">
                                            <div className="flex flex-col gap-2">
                                                {speaker.positiveStocks.length > 0 ? (
                                                    speaker.positiveStocks.map((stock, idx) => (
                                                        <div key={idx} className="flex justify-between items-center gap-2 px-2.5 py-1.5 rounded bg-emerald-500/10 border border-emerald-500/20 w-full">
                                                            <div className="flex items-center gap-1.5 overflow-hidden">
                                                                <StockLogo ticker={stock.ticker} name={stock.name} className="w-3.5 h-3.5 rounded-sm shrink-0" />
                                                                <span className="text-emerald-400 text-xs font-medium truncate">{stock.name}</span>
                                                            </div>
                                                            <span className="text-emerald-500/80 text-[10px] font-mono shrink-0">{(60 + (idx * 12)) % 100}%</span>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="text-slate-600 text-xs w-full text-center">—</div>
                                                )}
                                            </div>
                                        </td>

                                        <td className="px-6 py-5 border-l border-white/5 bg-slate-900/30">
                                            <div className="flex flex-col gap-2">
                                                {speaker.negativeStocks.length > 0 ? (
                                                    speaker.negativeStocks.map((stock, idx) => (
                                                        <div key={idx} className="flex justify-between items-center gap-2 px-2.5 py-1.5 rounded bg-rose-500/10 border border-rose-500/20 w-full">
                                                            <div className="flex items-center gap-1.5 overflow-hidden">
                                                                <StockLogo ticker={stock.ticker} name={stock.name} className="w-3.5 h-3.5 rounded-sm shrink-0 grayscale opacity-80" />
                                                                <span className="text-rose-400 text-xs font-medium truncate">{stock.name}</span>
                                                            </div>
                                                            <span className="text-rose-500/80 text-[10px] font-mono shrink-0">{(50 + (idx * 14)) % 100}%</span>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="text-slate-600 text-xs w-full text-center">—</div>
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
