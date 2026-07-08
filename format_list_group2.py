import os
import re

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Let's verify the first table is "🎙 주요 인사 발언". We just updated it.
# Check if it looks good and matches the requested logic perfectly.
# "주요 인사(이름) → 직책/소속 → 발언 요약 → 영향받은 종목 리스트(긍정/부정 구분, 종목명+코드) → 방향(수혜/리스크/관망) → 강도(별점) → 발언 시각"
# Yes, we updated it to match this.

# Let's ensure the "영향받은 종목 리스트" is styled neatly.
old_stock_layout = """<div className="flex flex-col gap-1.5">
                                            {item.positiveStocks.length > 0 && (
                                                <div className="flex items-start gap-2">
                                                    <span className="text-emerald-400 text-[11px] font-bold shrink-0 mt-0.5">상승 기대</span>
                                                    <div className="flex flex-wrap gap-1">
                                                        {item.positiveStocks.map((stock, idx) => (
                                                            <span key={idx} className="text-slate-300 text-xs after:content-[','] after:text-slate-600 last:after:content-['']">
                                                                {stock.name}<span className="text-slate-500 text-[10px] font-mono ml-0.5">({stock.ticker})</span>
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {item.negativeStocks.length > 0 && (
                                                <div className="flex items-start gap-2">
                                                    <span className="text-[#ff7c7e] text-[11px] font-bold shrink-0 mt-0.5">하락 우려</span>
                                                    <div className="flex flex-wrap gap-1">
                                                        {item.negativeStocks.map((stock, idx) => (
                                                            <span key={idx} className="text-slate-300 text-xs after:content-[','] after:text-slate-600 last:after:content-['']">
                                                                {stock.name}<span className="text-slate-500 text-[10px] font-mono ml-0.5">({stock.ticker})</span>
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {item.positiveStocks.length === 0 && item.negativeStocks.length === 0 && (
                                                <span className="text-slate-500 text-xs">-</span>
                                            )}
                                        </div>"""

new_stock_layout = """<div className="flex flex-col gap-2">
                                            {item.positiveStocks.length > 0 && (
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-emerald-400 text-[11px] font-bold">상승 기대 종목</span>
                                                    <div className="flex flex-wrap gap-x-2 gap-y-1">
                                                        {item.positiveStocks.map((stock, idx) => (
                                                            <span key={idx} className="text-slate-300 text-xs flex items-center gap-1 bg-emerald-950/20 px-1.5 py-0.5 rounded border border-emerald-900/30">
                                                                {stock.name} <span className="text-slate-500 text-[10px] font-mono">{stock.ticker}</span>
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {item.negativeStocks.length > 0 && (
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-[#ff7c7e] text-[11px] font-bold">하락 우려 종목</span>
                                                    <div className="flex flex-wrap gap-x-2 gap-y-1">
                                                        {item.negativeStocks.map((stock, idx) => (
                                                            <span key={idx} className="text-slate-300 text-xs flex items-center gap-1 bg-rose-950/20 px-1.5 py-0.5 rounded border border-rose-900/30">
                                                                {stock.name} <span className="text-slate-500 text-[10px] font-mono">{stock.ticker}</span>
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {item.positiveStocks.length === 0 && item.negativeStocks.length === 0 && (
                                                <span className="text-slate-500 text-xs">-</span>
                                            )}
                                        </div>"""

content = content.replace(old_stock_layout, new_stock_layout)

with open(filepath, "w") as f:
    f.write(content)
