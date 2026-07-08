import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Make the speaker column top-aligned and sticky, give it more space
old_tr = """<tr key={`group-${i}`} className={cn(i % 2 === 0 ? "bg-slate-800/60" : "bg-slate-900", "align-top")}>
                                    <td className="px-6 py-5">"""
new_tr = """<tr key={`group-${i}`} className={cn(i % 2 === 0 ? "bg-slate-800/60" : "bg-slate-900", "align-top")}>
                                    <td className="px-6 py-6 border-r border-white/5 bg-slate-900/40">"""

content = content.replace(old_tr, new_tr)

# Fix Avatar section size to match user's image structure
old_speaker = """<div className="flex items-center gap-3">
                                            <Avatar name={group.speaker} className="w-12 h-12" />
                                            <div className="flex flex-col">
                                                <span className="text-slate-200 font-bold text-sm whitespace-nowrap">{group.speaker}</span>
                                                <span className="text-slate-500 text-[11px] whitespace-nowrap mt-0.5">{group.speakerTitle}</span>
                                            </div>
                                        </div>"""

new_speaker = """<div className="flex flex-col gap-3 sticky top-6">
                                            <div className="flex items-center gap-3">
                                                <Avatar name={group.speaker} className="w-14 h-14" />
                                                <div className="flex flex-col">
                                                    <span className="text-white font-bold text-base whitespace-nowrap">{group.speaker}</span>
                                                    <span className="text-slate-400 font-medium text-xs whitespace-nowrap mt-0.5">{group.speakerTitle}</span>
                                                </div>
                                            </div>
                                            <div className="mt-2 text-slate-500 text-xs">
                                                <div className="flex items-center gap-1.5 mt-1">
                                                    <MessageSquare className="w-3.5 h-3.5" />
                                                    <span>주요 발언 영향력</span>
                                                </div>
                                            </div>
                                        </div>"""

content = content.replace(old_speaker, new_speaker)

# Make sure column widths look balanced
content = content.replace('<th className="px-6 py-4 w-64 font-semibold text-left">주요 인사</th>', '<th className="px-6 py-4 w-[280px] font-semibold text-left bg-slate-900/40 border-r border-white/5">주요 인사</th>')

with open(filepath, "w") as f:
    f.write(content)
