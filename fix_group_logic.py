import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Make the group logic more robust, ensuring the table matches the layout exactly
old_td_impact = """<td className="px-6 py-5">
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
                                    </td>"""

new_td_impact = """<td className="px-6 py-5">
                                        <div className="flex flex-col gap-3">
                                            {group.stocks.map((stock: any, idx: number) => (
                                                <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-4 bg-slate-800/50 p-4 rounded-xl border border-white/5 hover:bg-slate-800 transition-colors">
                                                    <div className="flex items-center gap-3 w-48 shrink-0">
                                                        <StockLogo ticker={stock.ticker} name={stock.name} className="w-10 h-10 rounded-md" />
                                                        <div className="flex flex-col">
                                                            <div className="flex items-center gap-1.5">
                                                                <span className="text-white font-bold text-sm whitespace-nowrap">{stock.name}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1.5 mt-0.5">
                                                                {stock.ticker.match(/^\\d{6}$/) ? (
                                                                    <span className="text-slate-500 text-[10px] font-mono">{stock.ticker}</span>
                                                                ) : (
                                                                    <Badge variant="outline" className="w-fit text-[9px] px-1 py-0 h-4 border-slate-600 text-slate-400 bg-slate-800">해외</Badge>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="w-28 shrink-0 flex items-center justify-center border-l border-white/10 pl-4">
                                                        <DirectionBadge type={stock.direction} />
                                                    </div>

                                                    <div className="text-slate-300 text-xs leading-relaxed flex-1 border-l border-white/10 pl-4 py-1">
                                                        <div className="flex items-center gap-2 mb-1.5">
                                                            <span className="text-slate-500 font-semibold text-[10px]">시장 영향 분석</span>
                                                            <div className="flex gap-0.5">
                                                                {[...Array(5)].map((_, starIdx) => (
                                                                    <Star 
                                                                        key={starIdx} 
                                                                        className={cn(
                                                                            "w-3 h-3", 
                                                                            starIdx < stock.stars 
                                                                                ? (stock.direction === '리스크' ? "fill-[#ff7c7e] text-[#ff7c7e]" : "fill-emerald-400 text-emerald-400") 
                                                                                : "fill-slate-700 text-slate-700"
                                                                        )} 
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <span className="text-slate-300/90 leading-relaxed text-sm">{stock.comment}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </td>"""

content = content.replace(old_td_impact, new_td_impact)

with open(filepath, "w") as f:
    f.write(content)
