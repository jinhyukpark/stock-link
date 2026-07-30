import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

old_headers = """<th className="px-6 py-4 w-48 font-semibold text-left">인물</th>
                                <th className="px-6 py-4 font-semibold text-left border-l border-white/5">영향 받은 종목</th>"""

new_headers = """<th className="px-6 py-4 w-48 font-semibold text-left">인물</th>
                                <th className="px-6 py-4 w-[40%] font-semibold text-left border-l border-white/5">수혜 종목</th>
                                <th className="px-6 py-4 w-[40%] font-semibold text-left border-l border-white/5">리스크 종목</th>"""

old_cells = """<td className="px-6 py-5 min-w-[160px]">
                                            <div className="flex items-center gap-3">
                                                <Avatar name={speaker.speaker} className="w-10 h-10 shrink-0" />
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="text-white font-bold text-sm whitespace-nowrap">{speaker.speaker}</span>
                                                    <span className="text-slate-500 text-[11px] whitespace-nowrap">{speaker.speakerTitle}</span>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-5 border-l border-white/5 bg-slate-900/30">
                                            <div className="flex flex-wrap gap-2">
                                                {speaker.impacts.map((impact, j) => (
                                                    <div 
                                                        key={j} 
                                                        className={cn(
                                                            "flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] font-medium whitespace-nowrap transition-colors",
                                                            impact.impact > 0 
                                                                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20" 
                                                                : "bg-rose-500/10 border-rose-500/20 text-rose-400 hover:bg-rose-500/20"
                                                        )}
                                                    >
                                                        <span>{impact.name}</span>
                                                        <span className="text-[10px] opacity-80 font-mono">
                                                            {impact.impact > 0 ? "+" : ""}{impact.impact}%
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>"""

new_cells = """<td className="px-6 py-5 min-w-[160px]">
                                            <div className="flex items-center gap-3">
                                                <Avatar name={speaker.speaker} className="w-10 h-10 shrink-0" />
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="text-white font-bold text-sm whitespace-nowrap">{speaker.speaker}</span>
                                                    <span className="text-slate-500 text-[11px] whitespace-nowrap">{speaker.speakerTitle}</span>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-5 border-l border-white/5 bg-slate-900/30">
                                            <div className="flex flex-wrap gap-2">
                                                {speaker.impacts.filter(i => i.impact > 0).map((impact, j) => (
                                                    <div 
                                                        key={`pos-${j}`} 
                                                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] font-medium whitespace-nowrap transition-colors bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20"
                                                    >
                                                        <span>{impact.name}</span>
                                                        <span className="text-[10px] opacity-80 font-mono">
                                                            +{impact.impact}%
                                                        </span>
                                                    </div>
                                                ))}
                                                {speaker.impacts.filter(i => i.impact > 0).length === 0 && (
                                                    <span className="text-slate-600 text-xs italic">-</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 border-l border-white/5 bg-slate-900/30">
                                            <div className="flex flex-wrap gap-2">
                                                {speaker.impacts.filter(i => i.impact <= 0).map((impact, j) => (
                                                    <div 
                                                        key={`neg-${j}`} 
                                                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] font-medium whitespace-nowrap transition-colors bg-rose-500/10 border-rose-500/20 text-rose-400 hover:bg-rose-500/20"
                                                    >
                                                        <span>{impact.name}</span>
                                                        <span className="text-[10px] opacity-80 font-mono">
                                                            {impact.impact}%
                                                        </span>
                                                    </div>
                                                ))}
                                                {speaker.impacts.filter(i => i.impact <= 0).length === 0 && (
                                                    <span className="text-slate-600 text-xs italic">-</span>
                                                )}
                                            </div>
                                        </td>"""

content = content.replace(old_headers, new_headers)
content = content.replace(old_cells, new_cells)

with open(filepath, "w") as f:
    f.write(content)
