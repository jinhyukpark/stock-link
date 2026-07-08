import os
import re

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# grouping logic
grouping_logic = """
    const groupedMarketImpact = Object.values(data.marketImpact.reduce((acc, item) => {
        if (!acc[item.speaker]) {
            acc[item.speaker] = {
                speaker: item.speaker,
                speakerTitle: item.speakerTitle || "주요 인사",
                stars: item.stars,
                stocks: []
            };
        }
        acc[item.speaker].stocks.push({
            name: item.name,
            ticker: item.ticker,
            direction: item.direction,
            comment: item.comment,
            stars: item.stars
        });
        acc[item.speaker].stars = Math.max(acc[item.speaker].stars, item.stars);
        return acc;
    }, {} as Record<string, any>)).sort((a: any, b: any) => b.stars - a.stars);
"""

if "const groupedMarketImpact" not in content:
    content = content.replace("return (", grouping_logic + "\n    return (", 1)

new_table = """<SectionTitle icon={Activity} title="시장 영향도: 상세 분석" subtitle="언급된 종목들의 단기적 시장 영향 및 모멘텀 분석입니다" />
                <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden shadow-lg w-full overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left min-w-[800px] border-collapse">
                        <thead className="bg-slate-800/80 border-b border-slate-700">
                            <tr>
                                <th className="px-6 py-4 w-64 font-semibold text-left">주요 인사</th>
                                <th className="px-6 py-4 font-semibold text-left">영향받은 종목 리스트</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {groupedMarketImpact.map((group: any, i: number) => (
                                <tr key={`group-${i}`} className={cn(i % 2 === 0 ? "bg-slate-800/60" : "bg-slate-900", "align-top")}>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <Avatar name={group.speaker} className="w-12 h-12" />
                                            <div className="flex flex-col">
                                                <span className="text-slate-200 font-bold text-sm whitespace-nowrap">{group.speaker}</span>
                                                <span className="text-slate-500 text-[11px] whitespace-nowrap mt-0.5">{group.speakerTitle}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col gap-3">
                                            {group.stocks.map((stock: any, idx: number) => (
                                                <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-3 bg-slate-800/50 p-3 rounded-lg border border-white/5 hover:bg-slate-800 transition-colors">
                                                    <div className="flex items-center gap-3 min-w-[160px] shrink-0">
                                                        <StockLogo ticker={stock.ticker} name={stock.name} className="w-8 h-8 rounded-md" />
                                                        <div className="flex flex-col">
                                                            <div className="flex items-center gap-1.5">
                                                                <span className="text-white font-bold text-sm whitespace-nowrap">{stock.name}</span>
                                                                {stock.ticker.match(/^\\d{6}$/) ? (
                                                                    <span className="text-slate-500 text-[10px] font-mono">{stock.ticker}</span>
                                                                ) : (
                                                                    <Badge variant="outline" className="w-fit text-[9px] px-1 py-0 h-4 border-slate-600 text-slate-400 bg-slate-800">해외</Badge>
                                                                )}
                                                            </div>
                                                            <div className="mt-1">
                                                                <DirectionBadge type={stock.direction} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-slate-300 text-xs leading-relaxed flex-1 border-l border-white/10 pl-4 py-1">
                                                        <div className="flex items-center gap-2 mb-1.5">
                                                            <span className="text-slate-500 font-semibold text-[10px]">시장 영향 분석</span>
                                                            <div className="flex gap-0.5">
                                                                {[...Array(5)].map((_, starIdx) => (
                                                                    <Star 
                                                                        key={starIdx} 
                                                                        className={cn(
                                                                            "w-2.5 h-2.5", 
                                                                            starIdx < stock.stars 
                                                                                ? (stock.direction === '리스크' ? "fill-[#ff7c7e] text-[#ff7c7e]" : "fill-emerald-400 text-emerald-400") 
                                                                                : "fill-slate-700 text-slate-700"
                                                                        )} 
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>
                                                        {stock.comment}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>"""

# Replace by splitting the content to avoid regex escape issues
parts = content.split('<SectionTitle icon={Activity} title="시장 영향도: 상세 분석" subtitle="언급된 종목들의 단기적 시장 영향 및 모멘텀 분석입니다" />')
if len(parts) > 1:
    pre = parts[0]
    post = parts[1]
    
    # We need to find the end of the table div.
    # The structure is:
    # <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden shadow-lg w-full overflow-x-auto custom-scrollbar">
    #   <table ...>
    #      ...
    #   </table>
    # </div>
    # </section>
    
    end_index = post.find('</section>')
    
    if end_index != -1:
        post_after_table = post[end_index:] # Includes </section>
        
        content = pre + new_table + "\n            " + post_after_table

with open(filepath, "w") as f:
    f.write(content)
