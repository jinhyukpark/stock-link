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
                <div className="flex flex-col gap-4">
                    {data.speakers.map((speaker, i) => {
                        const impactLevel = speaker.stars >= 4 ? 'high' : speaker.stars === 3 ? 'medium' : 'low';
                        const bgClass = impactLevel === 'high' ? 'bg-[#ff7c7e]/10 border-[#ff7c7e]/20' :
                                        impactLevel === 'medium' ? 'bg-amber-500/10 border-amber-500/20' :
                                        'bg-emerald-500/10 border-emerald-500/20';
                        
                        const impactText = impactLevel === 'high' ? '시장 영향도: 높음' : impactLevel === 'medium' ? '시장 영향도: 중간' : '시장 영향도: 낮음';
                        const impactColor = impactLevel === 'high' ? 'text-[#ff7c7e]' : impactLevel === 'medium' ? 'text-amber-400' : 'text-emerald-400';
                        const dotColor = impactLevel === 'high' ? 'bg-[#ff7c7e]' : impactLevel === 'medium' ? 'bg-amber-400' : 'bg-emerald-400';
                        
                        return (
                            <div key={`overview-${speaker.id}`} className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 px-2 py-1">
                                    <div className={cn("w-3 h-3 rounded-full", dotColor)}></div>
                                    <span className="text-white font-bold text-sm">{impactText}</span>
                                </div>
                                
                                <div className={cn("rounded-lg border p-4 flex gap-6", bgClass)}>
                                    {/* 인물 정보 */}
                                    <div className="w-48 shrink-0 flex flex-col gap-2">
                                        <div className="flex items-start gap-3">
                                            <Avatar name={speaker.speaker} className="w-12 h-12 rounded-lg" />
                                            <div className="flex flex-col gap-1">
                                                <span className="text-white font-bold text-sm leading-tight">{speaker.speaker}</span>
                                                <span className="text-slate-400 text-[11px] leading-tight break-keep">{speaker.speakerTitle}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 발언 요약 */}
                                    <div className="flex-1 flex flex-col gap-3 min-w-[300px]">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-white font-bold text-xs">발언 요약:</span>
                                            <p className="text-slate-300 text-sm leading-relaxed" title={speaker.summary}>
                                                {speaker.summary}
                                            </p>
                                        </div>
                                        
                                        <div className="flex flex-col gap-1">
                                            <span className="text-white font-bold text-xs">시장 영향 분석:</span>
                                            <p className="text-slate-400 text-sm leading-relaxed">
                                                {speaker.speaker}의 발언은 관련 섹터에 즉각적인 변동성을 야기하고 있으며, 단기 포지션 관리의 핵심 변수로 부상했습니다.
                                            </p>
                                        </div>

                                        <div className="mt-auto pt-2 flex items-center gap-4">
                                            <a href="#" className="inline-flex items-center text-blue-400 hover:text-blue-300 hover:underline text-[11px] font-medium" onClick={(e) => e.preventDefault()}>
                                                <ExternalLink className="w-3 h-3 mr-1" />
                                                원문 보기
                                            </a>
                                            <div className="flex items-center text-slate-500 text-[11px] font-mono tracking-wider gap-1">
                                                <CalendarIcon className="w-3 h-3" />
                                                {speaker.time ? format(new Date(speaker.time), "yyyy-MM-dd HH:mm KST") : "2026-04-26 09:00 KST"}
                                            </div>
                                        </div>
                                    </div>

                                    {/* 종목 리스트 */}
                                    <div className="w-[300px] shrink-0 flex flex-col gap-4 pl-4 border-l border-white/10">
                                        <div className="flex flex-col gap-2">
                                            <span className="text-emerald-400 font-bold text-xs flex items-center gap-1">
                                                <TrendingUp className="w-3 h-3"/> 수혜 종목
                                            </span>
                                            <div className="flex flex-col gap-1.5">
                                                {speaker.positiveStocks.length > 0 ? (
                                                    speaker.positiveStocks.map((stock, idx) => (
                                                        <div key={idx} className="flex items-center gap-2">
                                                            <StockLogo ticker={stock.ticker} name={stock.name} className="w-4 h-4 rounded-sm shrink-0" />
                                                            <span className="text-emerald-300 text-xs font-medium truncate">{stock.name}</span>
                                                            <span className="text-slate-500 text-[10px] font-mono shrink-0">({stock.ticker})</span>
                                                            <span className="text-slate-400 text-[10px] ml-1 truncate">- {idx % 2 === 0 ? '실적 호조 수혜' : '정책 방향성 수혜'}</span>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="text-slate-500 text-xs w-full">—</div>
                                                )}
                                            </div>
                                        </div>

                                        {speaker.positiveStocks.length > 0 && speaker.negativeStocks.length > 0 && <div className="w-full h-px bg-white/10"></div>}
                                        
                                        <div className="flex flex-col gap-2">
                                            <span className="text-rose-400 font-bold text-xs flex items-center gap-1">
                                                <TrendingDown className="w-3 h-3"/> 리스크 종목
                                            </span>
                                            <div className="flex flex-col gap-1.5">
                                                {speaker.negativeStocks.length > 0 ? (
                                                    speaker.negativeStocks.map((stock, idx) => (
                                                        <div key={idx} className="flex items-center gap-2">
                                                            <StockLogo ticker={stock.ticker} name={stock.name} className="w-4 h-4 rounded-sm shrink-0 grayscale opacity-80" />
                                                            <span className="text-rose-300 text-xs font-medium truncate">{stock.name}</span>
                                                            <span className="text-slate-500 text-[10px] font-mono shrink-0">({stock.ticker})</span>
                                                            <span className="text-slate-400 text-[10px] ml-1 truncate">- {idx % 2 === 0 ? '단기 차익 실현' : '정책 불확실성 리스크'}</span>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="text-slate-500 text-xs w-full">—</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                """
    
    with open(filepath, "w") as f:
        f.write(before + new_table_section + after)
