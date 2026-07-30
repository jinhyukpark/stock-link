import os
import re

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# To perfectly match the mockup, let's fix the column order in `📊 시장 영향 분석` table again just to be 100% sure.
# Required order: 주요 인사 → 직책/소속 → 발언 요약 → 영향받은 종목 리스트(종목명+코드, 긍정/부정 구분) → 방향 → 강도 → 발언 시각
# Current order: 주요 인사 → 직책/소속 → 발언 요약 → 영향받은 종목 리스트 → 방향 → 강도 → 발언 시각
# The current order is correct.

# Make the stock list more readable inside the table cell
old_td_stocks = """<td className="px-6 py-5">
                                            <div className="flex flex-col gap-3">
                                                {speaker.positiveStocks.length > 0 && (
                                                    <div className="flex flex-wrap gap-1.5 items-center">
                                                        <span className="text-emerald-400 font-bold text-xs whitespace-nowrap mr-1">📈 긍정:</span>
                                                        {speaker.positiveStocks.map((stock, idx) => (
                                                            <div key={idx} className="flex items-center gap-1 bg-emerald-950/30 border border-emerald-900/40 rounded px-1.5 py-0.5 whitespace-nowrap">
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
                                                            <div key={idx} className="flex items-center gap-1 bg-[#ff7c7e]/10 border border-[#ff7c7e]/20 rounded px-1.5 py-0.5 whitespace-nowrap">
                                                                <span className="text-slate-200 text-xs">{stock.name}</span>
                                                                <span className="text-slate-500 text-[10px] font-mono">({stock.ticker})</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </td>"""

new_td_stocks = """<td className="px-6 py-5">
                                            <div className="flex flex-col gap-2">
                                                {speaker.positiveStocks.length > 0 && (
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-emerald-400 font-bold text-xs flex items-center gap-1"><TrendingUp className="w-3 h-3"/> 긍정 종목</span>
                                                        <div className="flex flex-wrap gap-1">
                                                            {speaker.positiveStocks.map((stock, idx) => (
                                                                <div key={idx} className="flex items-center gap-1">
                                                                    <StockLogo ticker={stock.ticker} name={stock.name} className="w-3.5 h-3.5 rounded-sm grayscale opacity-80" />
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
                                        </td>"""

content = content.replace(old_td_stocks, new_td_stocks)

with open(filepath, "w") as f:
    f.write(content)
