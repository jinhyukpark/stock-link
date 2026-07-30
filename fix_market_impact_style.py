import os
import re

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Change the "시장 영향도: 상세 분석" title to have groups (High, Medium, Low)
# The mockup shows groups like "시장 영향도: 높음", "시장 영향도: 중간", "시장 영향도: 낮음"

# Let's wrap the map in a function or just render it directly
# First, let's group data.speakers by stars
grouping_logic = """
    // Group speakers by impact
    const highImpact = data.speakers.filter(s => s.stars >= 3);
    const midImpact = data.speakers.filter(s => s.stars === 2);
    const lowImpact = data.speakers.filter(s => s.stars <= 1);
    
    // In MOCK_DATA, stars are 3, so all are high impact currently. We'll render all under one for now, or divide them.
    // The previous implementation mapped `data.speakers`. Let's just update the list to look exactly like the mockup.
"""

# Let's adjust the styling to match the mockup's row-based structure better
# In the mockup: Left column is slightly different.
# Speaker name, Title, Date, Avatar is not explicitly there, just Name and Title
# Wait, let's see the image: "트럼프 (S&P500 분석)", "미국 대통령", then "언론 보도 / 시장 이벤트", Date
# Let's remove Avatar from the left column to make it cleaner, or keep it if it looks good.

# The user explicitly said:
# "전체 데이터를 종목 기준이 아니라 '주요 인사' 기준으로 그룹핑해서 뿌려줘. 즉, 인물 하나당 하나의 그룹으로 묶고, 그 아래에 해당 인물이 영향을 준 종목들이 나열되는 구조로 만들어줘."
# "주요 인사(이름 + 소속/직함) → 영향받은 종목 리스트(종목명 + 코드) 순으로 배치."

old_card = """<div key={i} className="bg-slate-900 border border-slate-700/60 rounded-xl overflow-hidden shadow-lg flex flex-col md:flex-row">
                            {/* Left Column: Speaker Info */}
                            <div className="w-full md:w-64 bg-slate-800/40 p-6 border-b md:border-b-0 md:border-r border-slate-700/60 flex flex-col shrink-0">
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
                                
                                <div className="pt-4">
                                    <a href="#" className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 text-xs font-medium transition-colors">
                                        <Link2 className="w-3.5 h-3.5" /> 원문 보기
                                    </a>
                                </div>
                            </div>
                        </div>"""

new_card = """<div key={i} className="bg-slate-900/50 border border-slate-700/50 rounded-xl overflow-hidden shadow-md flex flex-col md:flex-row hover:bg-slate-800/40 transition-colors">
                            {/* Left Column: Speaker Info */}
                            <div className="w-full md:w-[280px] bg-slate-800/30 p-6 border-b md:border-b-0 md:border-r border-slate-700/50 flex flex-col shrink-0">
                                <div className="flex items-start gap-3 mb-4">
                                    <Avatar name={speaker.speaker} className="w-10 h-10 shadow-sm" />
                                    <div className="flex flex-col gap-1">
                                        <span className="text-white font-bold text-base leading-none">{speaker.speaker}</span>
                                        <span className="text-slate-400 text-xs font-medium">{speaker.speakerTitle}</span>
                                    </div>
                                </div>
                                
                                <div className="flex flex-col gap-2 mt-auto">
                                    <PlatformBadge platform={speaker.platform} />
                                    <div className="flex items-center gap-1.5 text-slate-500 text-[11px] mt-1">
                                        <Calendar className="w-3.5 h-3.5" />
                                        <span>{speaker.time || '2026-04-24'}</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Right Column: Details */}
                            <div className="flex-1 p-6 flex flex-col gap-4">
                                <div className="flex gap-3">
                                    <span className="text-white font-bold text-sm shrink-0 whitespace-nowrap">발언 요약:</span>
                                    <p className="text-slate-300 text-sm leading-relaxed">{speaker.summary}</p>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 pt-4 border-t border-slate-700/50">
                                    <div className="bg-emerald-950/10 rounded-lg p-3 border border-emerald-900/20">
                                        <span className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs mb-3">
                                            <TrendingUp className="w-3.5 h-3.5" /> 긍정 종목
                                        </span>
                                        {speaker.positiveStocks.length > 0 ? (
                                            <div className="flex flex-col gap-2">
                                                {speaker.positiveStocks.map((stock, idx) => (
                                                    <div key={idx} className="flex items-center gap-2 group">
                                                        <StockLogo ticker={stock.ticker} name={stock.name} className="w-4 h-4 rounded-sm" />
                                                        <span className="text-slate-300 text-sm font-medium">{stock.name}</span>
                                                        <span className="text-slate-500 text-[10px] font-mono ml-auto opacity-70 group-hover:opacity-100 transition-opacity">{stock.ticker}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <span className="text-slate-500 text-xs">없음</span>
                                        )}
                                    </div>
                                    
                                    <div className="bg-[#ff7c7e]/5 rounded-lg p-3 border border-[#ff7c7e]/10">
                                        <span className="flex items-center gap-1.5 text-rose-400 font-bold text-xs mb-3">
                                            <TrendingDown className="w-3.5 h-3.5" /> 부정 종목
                                        </span>
                                        {speaker.negativeStocks.length > 0 ? (
                                            <div className="flex flex-col gap-2">
                                                {speaker.negativeStocks.map((stock, idx) => (
                                                    <div key={idx} className="flex items-center gap-2 group">
                                                        <StockLogo ticker={stock.ticker} name={stock.name} className="w-4 h-4 rounded-sm" />
                                                        <span className="text-slate-300 text-sm font-medium">{stock.name}</span>
                                                        <span className="text-slate-500 text-[10px] font-mono ml-auto opacity-70 group-hover:opacity-100 transition-opacity">{stock.ticker}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <span className="text-slate-500 text-xs">없음</span>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="pt-4 border-t border-slate-700/50 flex gap-3">
                                    <span className="text-white font-bold text-sm shrink-0 whitespace-nowrap">시장 영향 분석:</span>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        {data.marketImpact.find(impact => impact.speaker === speaker.speaker)?.comment || 
                                         `${speaker.speaker}의 발언은 관련 섹터 전반에 영향을 미치며 단기적 변동성을 키우고 있습니다.`}
                                    </p>
                                </div>
                                
                                <div className="pt-2 mt-auto">
                                    <a href="#" className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 text-[11px] font-medium transition-colors bg-blue-500/10 px-2 py-1 rounded-md border border-blue-500/20">
                                        <Link2 className="w-3.5 h-3.5" /> 원문 보기
                                    </a>
                                </div>
                            </div>
                        </div>"""

content = content.replace(old_card, new_card)

with open(filepath, "w") as f:
    f.write(content)
