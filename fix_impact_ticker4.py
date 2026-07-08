import os
import re

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Let's verify all instances of `item.ticker` in the code.
# The user wants "종목명 옆에 영향도(%)로 표출해줘 종목코드 말고"
# Which means wherever a ticker string is displayed near a stock name, it should be the impact percentage.

# 1. "시장 영향도: 상세 분석" (Section 2/3) - The table or list might still have it.
# Check the JSX carefully
content = re.sub(
    r'<td className="px-4 py-3 text-slate-500 text-\[11px\] font-mono">\{stock\.ticker\}</td>',
    r'<td className="px-4 py-3 text-slate-500 text-[11px] font-mono hidden">{stock.ticker}</td>',
    content
)

# And check the table headers
content = content.replace(
    '<th className="px-4 py-3 w-20 border-b border-emerald-500/20">티커</th>',
    '<th className="px-4 py-3 w-20 border-b border-emerald-500/20 hidden">티커</th>'
)
content = content.replace(
    '<th className="px-4 py-3 w-20 border-b border-rose-500/20">티커</th>',
    '<th className="px-4 py-3 w-20 border-b border-rose-500/20 hidden">티커</th>'
)

with open(filepath, "w") as f:
    f.write(content)
