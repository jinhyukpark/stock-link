import os
import re

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Fine-tune the overview table columns to perfectly match the mockup's visual hierarchy
old_thead = """<thead className="bg-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 w-32 font-semibold text-left">주요 인사</th>
                                <th className="px-6 py-4 w-36 font-semibold text-left">직책 / 소속</th>
                                <th className="px-6 py-4 min-w-[280px] font-semibold text-left">발언 요약</th>
                                <th className="px-6 py-4 min-w-[200px] w-56 font-semibold text-left border-l border-white/5">영향받은 종목 리스트</th>
                                <th className="px-6 py-4 w-24 font-semibold text-center">방향</th>
                                <th className="px-6 py-4 w-28 font-semibold text-center">강도</th>
                                <th className="px-6 py-4 w-32 font-semibold text-center">발언 시각</th>
                            </tr>
                        </thead>"""

new_thead = """<thead className="bg-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 w-40 font-semibold text-left">주요 인사 (이름)</th>
                                <th className="px-6 py-4 w-48 font-semibold text-left">직책 / 소속</th>
                                <th className="px-6 py-4 min-w-[300px] font-semibold text-left">발언 요약</th>
                                <th className="px-6 py-4 min-w-[240px] font-semibold text-left border-l border-white/5">영향받은 종목 리스트</th>
                                <th className="px-6 py-4 w-24 font-semibold text-center">방향</th>
                                <th className="px-6 py-4 w-28 font-semibold text-center">강도</th>
                                <th className="px-6 py-4 w-32 font-semibold text-center">발언 시각</th>
                            </tr>
                        </thead>"""

content = content.replace(old_thead, new_thead)

# Fine tune the stock list in the overview table to be simpler:
old_stock_list_pos = """<div className="flex flex-col gap-1">
                                                        {item.positiveStocks.map((s: any, idx: number) => (
                                                            <div key={idx} className="flex items-center gap-2">
                                                                <span className="text-slate-200 text-xs">{s.name}</span>
                                                                <span className="text-slate-500 text-[10px] font-mono">({s.ticker})</span>
                                                            </div>
                                                        ))}
                                                    </div>"""

new_stock_list_pos = """<div className="flex flex-wrap gap-2">
                                                        {item.positiveStocks.map((s: any, idx: number) => (
                                                            <div key={idx} className="flex items-center gap-1">
                                                                <span className="text-slate-200 text-xs">{s.name}</span>
                                                                <span className="text-slate-500 text-[10px] font-mono">({s.ticker})</span>
                                                            </div>
                                                        ))}
                                                    </div>"""

old_stock_list_neg = """<div className="flex flex-col gap-1">
                                                        {item.negativeStocks.map((s: any, idx: number) => (
                                                            <div key={idx} className="flex items-center gap-2">
                                                                <span className="text-slate-200 text-xs">{s.name}</span>
                                                                <span className="text-slate-500 text-[10px] font-mono">({s.ticker})</span>
                                                            </div>
                                                        ))}
                                                    </div>"""

new_stock_list_neg = """<div className="flex flex-wrap gap-2">
                                                        {item.negativeStocks.map((s: any, idx: number) => (
                                                            <div key={idx} className="flex items-center gap-1">
                                                                <span className="text-slate-200 text-xs">{s.name}</span>
                                                                <span className="text-slate-500 text-[10px] font-mono">({s.ticker})</span>
                                                            </div>
                                                        ))}
                                                    </div>"""

content = content.replace(old_stock_list_pos, new_stock_list_pos)
content = content.replace(old_stock_list_neg, new_stock_list_neg)

with open(filepath, "w") as f:
    f.write(content)
