import os
import re

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# We need to replace the first table under <SectionTitle icon={Target} title="🎙 주요 인사 발언" subtitle="오늘 증권 관련 주요 발언을 모니터링했습니다" />
# It currently loops over data.speakers, but has different columns.

old_thead = """<thead className="bg-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 w-48 font-semibold text-left">인물</th>
                                <th className="px-6 py-4 w-32 font-semibold text-center">플랫폼</th>
                                <th className="px-6 py-4 min-w-[220px] font-semibold text-left">발언 요약</th>
                                <th className="px-6 py-4 min-w-[140px] w-40 font-semibold text-emerald-400 text-xs bg-emerald-950/10 text-left border-l border-emerald-900/20">📈 수혜 종목</th>
                                <th className="px-6 py-4 min-w-[140px] w-40 font-semibold text-[#ff7c7e] text-xs bg-[#ff7c7e]/5 text-left border-l border-[#ff7c7e]/10">📉 리스크 종목</th>
                                <th className="px-6 py-4 w-28 font-semibold text-center">강도</th>
                            </tr>
                        </thead>"""

new_thead = """<thead className="bg-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
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

# The tbody uses data.speakers.map
old_tbody_start = """<tbody className="divide-y divide-white/5">
                            {data.speakers.map((item, i) => ("""

# Let's completely replace the table body inner part.
# We need to find from <tbody ...> to </tbody>
pattern = r'<tbody className="divide-y divide-white/5">.*?</tbody>'

new_tbody = """<tbody className="divide-y divide-white/5">
                            {data.speakers.map((item, i) => {
                                const hasPositive = item.positiveStocks.length > 0;
                                const hasNegative = item.negativeStocks.length > 0;
                                let direction = "관망";
                                if (hasPositive && hasNegative) direction = "혼조";
                                else if (hasPositive) direction = "수혜";
                                else if (hasNegative) direction = "리스크";

                                return (
                                <tr key={`speaker-${item.id}`} className={cn(i % 2 === 0 ? "bg-slate-800/60" : "bg-slate-900", "align-top")}>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <Avatar name={item.speaker} className="w-10 h-10" />
                                            <span className="text-white font-bold text-sm whitespace-nowrap">{item.speaker}</span>
                                        </div>
                                    </td>
                                    
                                    <td className="px-6 py-5">
                                        <span className="text-slate-400 text-xs">{item.speakerTitle}</span>
                                    </td>

                                    <td className="px-6 py-5 pr-8">
                                        <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
                                            {item.summary}
                                        </p>
                                    </td>

                                    <td className="px-6 py-5 border-l border-white/5">
                                        <div className="flex flex-col gap-3">
                                            {hasPositive && (
                                                <div className="flex flex-col gap-1.5">
                                                    <span className="text-emerald-400 font-semibold text-[10px] uppercase tracking-wider">📈 수혜 종목</span>
                                                    <div className="flex flex-col gap-1">
                                                        {item.positiveStocks.map((s: any, idx: number) => (
                                                            <div key={idx} className="flex items-center gap-2">
                                                                <span className="text-slate-200 text-xs">{s.name}</span>
                                                                <span className="text-slate-500 text-[10px] font-mono">({s.ticker})</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {hasNegative && (
                                                <div className="flex flex-col gap-1.5 mt-1">
                                                    <span className="text-rose-400 font-semibold text-[10px] uppercase tracking-wider">📉 리스크 종목</span>
                                                    <div className="flex flex-col gap-1">
                                                        {item.negativeStocks.map((s: any, idx: number) => (
                                                            <div key={idx} className="flex items-center gap-2">
                                                                <span className="text-slate-200 text-xs">{s.name}</span>
                                                                <span className="text-slate-500 text-[10px] font-mono">({s.ticker})</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </td>

                                    <td className="px-6 py-5 text-center">
                                        <div className="flex justify-center">
                                            {direction === '혼조' ? (
                                                <Badge variant="outline" className="w-fit text-[11px] px-2 py-0.5 border-slate-600 text-slate-300 bg-slate-800/50">혼조</Badge>
                                            ) : (
                                                <DirectionBadge type={direction} />
                                            )}
                                        </div>
                                    </td>

                                    <td className="px-6 py-5 text-center">
                                        <div className="flex justify-center gap-0.5">
                                            {[...Array(5)].map((_, idx) => (
                                                <Star 
                                                    key={idx} 
                                                    className={cn(
                                                        "w-3.5 h-3.5", 
                                                        idx < item.stars 
                                                            ? (direction === '리스크' ? "fill-[#ff7c7e] text-[#ff7c7e]" : "fill-emerald-400 text-emerald-400") 
                                                            : "fill-slate-700 text-slate-700"
                                                    )} 
                                                />
                                            ))}
                                        </div>
                                    </td>

                                    <td className="px-6 py-5 text-center">
                                        <span className="text-slate-400 text-[11px] whitespace-nowrap">{item.time || '2026-04-24'}</span>
                                    </td>
                                </tr>
                            )})}
                        </tbody>"""

import re
content = content.replace(old_thead, new_thead)
content = re.sub(pattern, new_tbody, content, count=1, flags=re.DOTALL)

with open(filepath, "w") as f:
    f.write(content)
