import os
import re

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Make sure avatar is completely removed from the first table if requested, or make it simpler.
# The user's image shows "트럼프 (S&P500 분석)" without a big avatar in the overview table.
old_speaker_cell = """<td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <Avatar name={item.speaker} className="w-10 h-10" />
                                            <span className="text-white font-bold text-sm whitespace-nowrap">{item.speaker}</span>
                                        </div>
                                    </td>"""

new_speaker_cell = """<td className="px-6 py-5">
                                        <span className="text-white font-bold text-sm whitespace-nowrap">{item.speaker}</span>
                                    </td>"""

content = content.replace(old_speaker_cell, new_speaker_cell)

with open(filepath, "w") as f:
    f.write(content)
