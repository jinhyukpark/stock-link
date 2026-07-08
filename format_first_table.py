import os
import re

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Make the stock list in the first table look cleaner and more consistent with the image
old_stock_list = """<div className="flex flex-col gap-3">
                                            {item.positiveStocks.length > 0 && (
                                                <div className="flex flex-col gap-1.5">
                                                    <span className="text-emerald-400 text-[10px] font-bold">긍정</span>
                                                    <div className="flex flex-wrap gap-2">
                                                        {item.positiveStocks.map((stock, idx) => (
                                                            <div key={idx} className="flex items-center gap-1.5">
                                                                <span className="text-slate-200 text-xs">{stock.name}</span>
                                                                <span className="text-slate-500 text-[10px] font-mono">({stock.ticker})</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {item.negativeStocks.length > 0 && (
                                                <div className="flex flex-col gap-1.5">
                                                    <span className="text-[#ff7c7e] text-[10px] font-bold">부정</span>
                                                    <div className="flex flex-wrap gap-2">
                                                        {item.negativeStocks.map((stock, idx) => (
                                                            <div key={idx} className="flex items-center gap-1.5">
                                                                <span className="text-slate-200 text-xs">{stock.name}</span>
                                                                <span className="text-slate-500 text-[10px] font-mono">({stock.ticker})</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {item.positiveStocks.length === 0 && item.negativeStocks.length === 0 && (
                                                <span className="text-slate-500 text-xs">-</span>
                                            )}
                                        </div>"""

new_stock_list = """<div className="flex flex-col gap-1.5">
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

content = content.replace(old_stock_list, new_stock_list)

with open(filepath, "w") as f:
    f.write(content)
