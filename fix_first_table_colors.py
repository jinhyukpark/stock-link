import os
import re

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Make the table colors and spacing exactly like image 3/4 
# In image 3, the table header is a solid dark blue #1e2338 and the body alternates with #161a29 and #1a1e2f.
# We also want to remove Avatar from the left side if we want to save space and match the image (the image doesn't seem to have avatars in the overview table).

old_tr = """<td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <Avatar name={item.speaker} className="w-8 h-8 rounded-full" />
                                            <span className="text-white font-bold text-sm whitespace-nowrap">{item.speaker}</span>
                                        </div>
                                    </td>"""

new_tr = """<td className="px-6 py-5">
                                        <span className="text-white font-bold text-sm whitespace-nowrap">{item.speaker}</span>
                                    </td>"""

content = content.replace(old_tr, new_tr)

# Fix the column sizing slightly
content = content.replace('<th className="px-6 py-4 w-32 font-semibold text-left">주요 인사</th>', '<th className="px-6 py-4 w-28 font-semibold text-left">주요 인사</th>')
content = content.replace('<th className="px-6 py-4 min-w-[300px] font-semibold text-left">발언 요약</th>', '<th className="px-6 py-4 min-w-[400px] font-semibold text-left">핵심 발언 요약</th>')

with open(filepath, "w") as f:
    f.write(content)
