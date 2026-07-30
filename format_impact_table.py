import os
import re

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Replace Headers
old_headers = """<th className="px-6 py-4 w-48 font-semibold text-left">인물</th>
                                <th className="px-6 py-4 min-w-[200px] font-semibold text-left">발언 요약</th>
                                <th className="px-6 py-4 min-w-[240px] font-semibold text-left">영향받은 종목 리스트</th>
                                <th className="px-6 py-4 w-24 font-semibold text-center">방향</th>
                                <th className="px-6 py-4 w-28 font-semibold text-center">강도</th>
                                <th className="px-6 py-4 w-32 font-semibold text-center">발언 시각</th>"""

new_headers = """<th className="px-6 py-4 w-48 font-semibold text-left">인물</th>
                                <th className="px-6 py-4 min-w-[300px] font-semibold text-left">발언 요약</th>
                                <th className="px-6 py-4 min-w-[140px] w-40 font-semibold text-emerald-400 text-xs bg-emerald-950/10 text-left border-l border-emerald-900/20">📈 수혜 종목</th>
                                <th className="px-6 py-4 min-w-[140px] w-40 font-semibold text-[#ff7c7e] text-xs bg-[#ff7c7e]/5 text-left border-l border-[#ff7c7e]/10">📉 리스크 종목</th>
                                <th className="px-6 py-4 w-24 font-semibold text-center">방향</th>
                                <th className="px-6 py-4 w-28 font-semibold text-center">강도</th>"""

content = content.replace(old_headers, new_headers)

# Replace the cells
old_cells = """                                        <td className="px-6 py-5 pr-8">
                                            <p className="text-slate-300 text-sm leading-relaxed line-clamp-3" title={speaker.summary}>
                                                {speaker.summary}
                                            </p>
                                        </td>

                                        <td className="px-6 py-5">
                                            <div className="flex flex-col gap-2">
                                                {speaker.positiveStocks.length > 0 && (
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-emerald-400 font-bold text-xs flex items-center gap-1"><TrendingUp className="w-3 h-3"/> 긍정 종목</span>
                                                        <div className="flex flex-wrap gap-1">
                                                            {speaker.positiveStocks.map((stock, idx) => (
                                                                <div key={idx} className="flex items-center gap-1">
                                                                    <StockLogo ticker={stock.ticker} name={stock.name} className="w-3.5 h-3.5 rounded-sm" />
                                                                    <span className="text-slate-300 text-xs">{stock.name}</span>
                                                                    <span className="text-slate-500 text-[10px] font-mono">({stock.ticker})</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                                {speaker.positiveStocks.length > 0 && speaker.negativeStocks.length > 0 && <div className="w-full h-px bg-white/5 my-1"></div>}
                                                {speaker.negativeStocks.length > 0 && (
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-rose-400 font-bold text-xs flex items-center gap-1"><TrendingDown className="w-3 h-3"/> 부정 종목</span>
                                                        <div className="flex flex-wrap gap-1">
                                                            {speaker.negativeStocks.map((stock, idx) => (
                                                                <div key={idx} className="flex items-center gap-1">
                                                                    <StockLogo ticker={stock.ticker} name={stock.name} className="w-3.5 h-3.5 rounded-sm grayscale opacity-80" />
                                                                    <span className="text-slate-300 text-xs">{stock.name}</span>
                                                                    <span className="text-slate-500 text-[10px] font-mono">({stock.ticker})</span>
                                                                </div>
                                                            ))}
                                                        </div>
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
                                        
                                        <td className="px-6 py-5 text-center text-slate-500 text-xs font-mono">
                                            {format(new Date(speaker.date), "MM.dd HH:mm")}
                                        </td>"""

new_cells = """                                        <td className="px-6 py-5 pr-8">
                                            <div className="flex flex-col gap-3">
                                                <p className="text-slate-300 text-sm leading-relaxed" title={speaker.summary}>
                                                    {speaker.summary}
                                                    <a href="#" className="inline-flex items-center text-blue-400 hover:text-blue-300 hover:underline ml-2 text-[11px] font-medium" onClick={(e) => e.preventDefault()}>(원문 보기)</a>
                                                </p>
                                                <span className="text-slate-500 text-xs font-mono tracking-wider">
                                                    {format(new Date(speaker.date), "yyyy-MM-dd")}
                                                </span>
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
                                        </td>"""

content = content.replace(old_cells, new_cells)

with open(filepath, "w") as f:
    f.write(content)
