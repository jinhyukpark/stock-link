import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Let's completely redesign the Market Impact table inner rows to match the user's mockups.
# The mockup has:
# 발언 요약 | 긍정 종목 | 부정 종목 | 시장 영향 분석
# But since we group by speaker, and each item in marketImpact is a specific stock's impact, 
# The mockup structure ("발언 요약", "긍정/부정 종목 리스트", "시장 영향 분석") is basically what we have in "2. 주요 인사 발언 (상단)" table.

# Oh, looking at the user's mockup:
# 1. "종합 요약 테이블" (Overview table)
# 2. "시장 영향도: 높음 - 상세 분석" (Detailed analysis grouped by impact level, then speaker)

# For "시장 영향도: 상세 분석"
# Left column: Speaker Info (Avatar, Name, Title, date, source)
# Right column:
#   - 발언 요약 (Summary of what they said)
#   - 긍정 종목 (List of positive stocks)
#   - 부정 종목 (List of negative stocks)
#   - 시장 영향 분석 (Overall impact analysis)

# This means the "시장 영향도: 상세 분석" section should actually iterate over `data.speakers` !!
# Because `data.speakers` has `summary`, `positiveStocks`, `negativeStocks`, and we can add `marketAnalysis`.
# Wait, `data.marketImpact` has the detailed `comment` for each stock.
# The user wants to group by '주요 인사' (speaker).

# Let's rebuild the "시장 영향도: 상세 분석" section to use the `data.speakers` structure, as it perfectly matches the requested design!

# We'll map through data.speakers.
# But group them by impact level? The mockup shows "시장 영향도: 높음", "중간", "낮음" sections.
# Let's map data.speakers, assuming stars >= 4 is High, 3 is Medium, 2 is Low.

new_table = """<SectionTitle icon={Activity} title="시장 영향도: 상세 분석" subtitle="주요 인사의 발언과 이에 따른 종목별 세부 영향 분석입니다" />
                
                <div className="flex flex-col gap-6">
                    {data.speakers.map((speaker, i) => (
                        <div key={i} className="bg-slate-900 border border-slate-700/60 rounded-xl overflow-hidden shadow-lg flex flex-col md:flex-row">
                            {/* Left Column: Speaker Info */}
                            <div className="w-full md:w-64 bg-slate-800/40 p-6 border-b md:border-b-0 md:border-r border-slate-700/60 flex flex-col gap-4 shrink-0">
                                <div className="flex flex-col gap-1.5">
                                    <span className="text-white font-bold text-base">{speaker.speaker}</span>
                                    <span className="text-slate-400 text-xs">{speaker.speakerTitle}</span>
                                </div>
                                
                                <div className="flex flex-col gap-2 mt-2">
                                    <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                                        <PlatformBadge platform={speaker.platform} />
                                    </div>
                                    <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                                        <Calendar className="w-3.5 h-3.5" />
                                        <span>{speaker.time || '2026-04-24'}</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Right Column: Details */}
                            <div className="flex-1 p-6 flex flex-col gap-5">
                                <div>
                                    <span className="text-white font-bold text-sm mb-2 block">발언 요약:</span>
                                    <p className="text-slate-300 text-sm leading-relaxed">{speaker.summary}</p>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5 border-t border-slate-700/50">
                                    <div>
                                        <span className="flex items-center gap-1.5 text-emerald-400 font-bold text-sm mb-3">
                                            <TrendingUp className="w-4 h-4" /> 긍정 종목
                                        </span>
                                        {speaker.positiveStocks.length > 0 ? (
                                            <div className="flex flex-col gap-2">
                                                {speaker.positiveStocks.map((stock, idx) => (
                                                    <div key={idx} className="flex items-center gap-2">
                                                        <StockLogo ticker={stock.ticker} name={stock.name} className="w-5 h-5 rounded" />
                                                        <span className="text-slate-300 text-sm">{stock.name}</span>
                                                        <span className="text-slate-500 text-xs font-mono ml-auto">{stock.ticker}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <span className="text-slate-500 text-sm">없음</span>
                                        )}
                                    </div>
                                    
                                    <div>
                                        <span className="flex items-center gap-1.5 text-rose-400 font-bold text-sm mb-3">
                                            <TrendingDown className="w-4 h-4" /> 부정 종목
                                        </span>
                                        {speaker.negativeStocks.length > 0 ? (
                                            <div className="flex flex-col gap-2">
                                                {speaker.negativeStocks.map((stock, idx) => (
                                                    <div key={idx} className="flex items-center gap-2">
                                                        <StockLogo ticker={stock.ticker} name={stock.name} className="w-5 h-5 rounded" />
                                                        <span className="text-slate-300 text-sm">{stock.name}</span>
                                                        <span className="text-slate-500 text-xs font-mono ml-auto">{stock.ticker}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <span className="text-slate-500 text-sm">없음</span>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="pt-5 border-t border-slate-700/50">
                                    <span className="text-white font-bold text-sm mb-2 block">시장 영향 분석:</span>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        {/* Find corresponding marketImpact comment for this speaker, or show a generic summary */}
                                        {data.marketImpact.find(impact => impact.speaker === speaker.speaker)?.comment || 
                                         `${speaker.speaker}의 발언은 관련 섹터 전반에 영향을 미치며 단기적 변동성을 키우고 있습니다. 향후 구체적인 액션 플랜과 시장의 반응을 주시해야 합니다.`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>"""

# Replace the existing Market Impact table section
start_marker = '<SectionTitle icon={Activity} title="시장 영향도: 상세 분석" subtitle="언급된 종목들의 단기적 시장 영향 및 모멘텀 분석입니다" />'
end_marker = '</section>'

parts = content.split(start_marker)
if len(parts) > 1:
    pre = parts[0]
    post = parts[1]
    
    end_index = post.find(end_marker)
    if end_index != -1:
        post_after = post[end_index:]
        content = pre + new_table + "\n            " + post_after

with open(filepath, "w") as f:
    f.write(content)
