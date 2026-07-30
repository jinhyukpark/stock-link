import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Replace table headers
old_headers = """<th className="px-6 py-4 w-32 font-semibold text-left">주요 인사</th>
                                <th className="px-6 py-4 w-32 font-semibold text-left">직책 / 소속</th>"""
new_headers = """<th className="px-6 py-4 w-48 font-semibold text-left">인물</th>"""
content = content.replace(old_headers, new_headers)

# Replace table cells
old_cells = """<td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <Avatar name={speaker.speaker} className="w-10 h-10" />
                                                <span className="text-white font-bold text-sm whitespace-nowrap">{speaker.speaker}</span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-5">
                                            <span className="text-slate-400 text-xs font-medium leading-relaxed">{speaker.speakerTitle}</span>
                                        </td>"""

new_cells = """<td className="px-6 py-5 min-w-[160px]">
                                            <div className="flex items-center gap-3">
                                                <Avatar name={speaker.speaker} className="w-10 h-10 shrink-0" />
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="text-white font-bold text-sm whitespace-nowrap">{speaker.speaker}</span>
                                                    <span className="text-slate-500 text-[11px] whitespace-nowrap">{speaker.speakerTitle}</span>
                                                </div>
                                            </div>
                                        </td>"""
content = content.replace(old_cells, new_cells)

with open(filepath, "w") as f:
    f.write(content)
