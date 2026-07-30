import os
import re

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Make the section title more prominent and match the mockup
old_title = '<SectionTitle icon={Activity} title="시장 영향도: 상세 분석" subtitle="주요 인사의 발언과 이에 따른 종목별 세부 영향 분석입니다" />'

# In the mockup it says "🔴 시장 영향도: 높음 - 상세 분석"
new_title = """<div className="flex flex-col gap-6">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]"></div>
                        <h2 className="text-xl font-bold text-white tracking-tight">시장 영향도: 높음 <span className="text-slate-500 font-normal">─ 상세 분석</span></h2>
                    </div>"""

# Replace and wrap the content in the right div
content = content.replace(old_title, new_title)

# The section ends with </div> from <div className="flex flex-col gap-6"> which was already there before. Let's fix the nesting.
# old code:
# <SectionTitle ... />
# <div className="flex flex-col gap-6">
# {data.speakers.map(...

content = content.replace(
    '<div className="flex flex-col gap-6">\n                    <div className="flex items-center gap-2 mb-2">\n                        <div className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]"></div>\n                        <h2 className="text-xl font-bold text-white tracking-tight">시장 영향도: 높음 <span className="text-slate-500 font-normal">─ 상세 분석</span></h2>\n                    </div>\n                \n                <div className="flex flex-col gap-6">',
    '<div className="flex flex-col gap-6">\n                    <div className="flex items-center gap-2 mb-2">\n                        <div className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]"></div>\n                        <h2 className="text-xl font-bold text-white tracking-tight">시장 영향도: 높음 <span className="text-slate-500 font-normal">─ 상세 분석</span></h2>\n                    </div>'
)

with open(filepath, "w") as f:
    f.write(content)
