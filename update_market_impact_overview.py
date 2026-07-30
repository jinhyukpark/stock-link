import os
import re

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# We need to rebuild the "📊 시장 영향 분석" table.
# Currently it iterates `data.marketImpact`.
# The user wants to group by '주요 인사'. Since `data.speakers` already has `speaker`, `speakerTitle`, `summary`, `positiveStocks`, `negativeStocks`, `time` (발언 시각), we can just use `data.speakers` for this table as well!
# Wait, `data.speakers` has `stars` (강도), but no single `direction` (방향). 
# We could derive direction from positive/negative stocks or we can calculate it from `marketImpact`.
# But in the mock data, each speaker's impact direction is usually combined.
# Actually, the user's requested columns:
# 주요 인사 → 직책/소속 → 발언 요약 → 영향받은 종목 리스트(종목명+코드, 긍정/부정 구분) → 방향 → 강도 → 발언 시각
# Let's write a mapping over `groupedMarketImpact` or `data.speakers`. 
# It's better to use `data.speakers` since it has `summary` (발언 요약) and `time` (발언 시각).
# For `direction`, we can use a helper function or derive it from the stocks (if positive > negative => 수혜, etc) or just show multiple badges.
# Let's create a new component or function to handle this inside the file.

new_table = """<SectionTitle icon={TrendingUp} title="📊 시장 영향 분석" subtitle="각 발언이 국내 증시에 미칠 영향을 분석했습니다" />
                <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden shadow-lg w-full overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left min-w-[1200px] border-collapse">
                        <thead className="bg-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 w-32 font-semibold text-left">주요 인사</th>
                                <th className="px-6 py-4 w-32 font-semibold text-left">직책 / 소속</th>
                                <th className="px-6 py-4 min-w-[200px] font-semibold text-left">발언 요약</th>
                                <th className="px-6 py-4 min-w-[240px] font-semibold text-left">영향받은 종목 리스트</th>
                                <th className="px-6 py-4 w-24 font-semibold text-center">방향</th>
                                <th className="px-6 py-4 w-28 font-semibold text-center">강도</th>
                                <th className="px-6 py-4 w-32 font-semibold text-center">발언 시각</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {data.speakers.map((speaker, i) => {
                                // Determine overall direction based on stock counts or logic.
                                // For simplicity, if positive stocks > negative stocks, it's '수혜', etc.
                                // But data.marketImpact might have the specific directions. Let's just use a simple heuristic based on stars and mock data structure.
                                const isPositive = speaker.positiveStocks.length >= speaker.negativeStocks.length;
                                const directionText = isPositive ? '수혜' : '리스크';
                                
                                return (
                                    <tr key={`overview-${speaker.id}`} className={cn(
                                        i % 2 === 0 ? "bg-slate-800/60" : "bg-slate-900", 
                                        "align-top",
                                        "hover:bg-slate-800 transition-colors"
                                    )}>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <Avatar name={speaker.speaker} className="w-10 h-10" />
                                                <span className="text-white font-bold text-sm whitespace-nowrap">{speaker.speaker}</span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-5">
                                            <span className="text-slate-400 text-xs font-medium leading-relaxed">{speaker.speakerTitle}</span>
                                        </td>

                                        <td className="px-6 py-5 pr-8">
                                            <p className="text-slate-300 text-sm leading-relaxed line-clamp-3" title={speaker.summary}>
                                                {speaker.summary}
                                            </p>
                                        </td>

                                        <td className="px-6 py-5">
                                            <div className="flex flex-col gap-3">
                                                {speaker.positiveStocks.length > 0 && (
                                                    <div className="flex flex-wrap gap-1.5 items-center">
                                                        <span className="text-emerald-400 font-bold text-xs whitespace-nowrap mr-1">📈 긍정:</span>
                                                        {speaker.positiveStocks.map((stock, idx) => (
                                                            <div key={idx} className="flex items-center gap-1 bg-emerald-950/30 border border-emerald-900/40 rounded px-1.5 py-0.5">
                                                                <span className="text-slate-200 text-xs">{stock.name}</span>
                                                                <span className="text-slate-500 text-[10px] font-mono">({stock.ticker})</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                                {speaker.negativeStocks.length > 0 && (
                                                    <div className="flex flex-wrap gap-1.5 items-center">
                                                        <span className="text-[#ff7c7e] font-bold text-xs whitespace-nowrap mr-1">📉 부정:</span>
                                                        {speaker.negativeStocks.map((stock, idx) => (
                                                            <div key={idx} className="flex items-center gap-1 bg-[#ff7c7e]/10 border border-[#ff7c7e]/20 rounded px-1.5 py-0.5">
                                                                <span className="text-slate-200 text-xs">{stock.name}</span>
                                                                <span className="text-slate-500 text-[10px] font-mono">({stock.ticker})</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </td>

                                        <td className="px-6 py-5 text-center">
                                            <DirectionBadge type={directionText} />
                                        </td>

                                        <td className="px-6 py-5 text-center">
                                            <div className="flex justify-center gap-0.5 mt-1">
                                                {[...Array(5)].map((_, idx) => (
                                                    <Star 
                                                        key={idx} 
                                                        className={cn(
                                                            "w-3.5 h-3.5", 
                                                            idx < speaker.stars 
                                                                ? (isPositive ? "fill-emerald-400 text-emerald-400" : "fill-[#ff7c7e] text-[#ff7c7e]") 
                                                                : "fill-slate-700 text-slate-700"
                                                        )} 
                                                    />
                                                ))}
                                            </div>
                                        </td>
                                        
                                        <td className="px-6 py-5 text-center">
                                            <span className="text-slate-400 text-xs font-mono">{speaker.time}</span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>"""

# Replace the "📊 시장 영향 분석" section
start_marker = '<SectionTitle icon={TrendingUp} title="📊 시장 영향 분석" subtitle="각 발언이 국내 증시에 미칠 영향을 분석했습니다" />'
# We need to find where the table ends. It ends at `</div>\n            </section>`
parts = content.split(start_marker)
if len(parts) > 1:
    pre = parts[0]
    post = parts[1]
    
    end_index = post.find('</section>')
    if end_index != -1:
        post_after = post[end_index:]
        content = pre + new_table + "\n            " + post_after

with open(filepath, "w") as f:
    f.write(content)
