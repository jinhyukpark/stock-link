import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Replace "w-40" with "min-w-[140px] w-40" in the completely separated column headers
content = content.replace(
    '<th className="px-6 py-4 w-40 font-semibold text-emerald-400 text-xs bg-emerald-950/10 text-left border-l border-emerald-900/20">📈 수혜 종목</th>',
    '<th className="px-6 py-4 min-w-[140px] w-40 font-semibold text-emerald-400 text-xs bg-emerald-950/10 text-left border-l border-emerald-900/20">📈 수혜 종목</th>'
)

content = content.replace(
    '<th className="px-6 py-4 w-40 font-semibold text-[#ff7c7e] text-xs bg-[#ff7c7e]/5 text-left border-l border-[#ff7c7e]/10">📉 리스크 종목</th>',
    '<th className="px-6 py-4 min-w-[140px] w-40 font-semibold text-[#ff7c7e] text-xs bg-[#ff7c7e]/5 text-left border-l border-[#ff7c7e]/10">📉 리스크 종목</th>'
)

with open(filepath, "w") as f:
    f.write(content)

