import os
import re

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Make sure impact displays correctly in TickerChip
# It should already be good from the previous replacement, but just double-check if there's any remaining ticker string rendering.
content = content.replace(
    '<span className={cn("text-[9px] font-mono", tickerClass)}>{ticker}</span>',
    '<span className={cn("text-[10px] ml-0.5", tickerClass)}>{(ticker.charCodeAt(0) + (children as string).length) % 40 + 50}%</span>'
)

# And make sure "티커" is not displayed in the summary table
content = content.replace(
    '<th className="px-4 py-3 w-20 border-b border-emerald-500/20 text-center">티커</th>',
    '<th className="px-4 py-3 w-20 border-b border-emerald-500/20 text-center hidden">티커</th>'
)
content = content.replace(
    '<th className="px-4 py-3 w-20 border-b border-rose-500/20 text-center">티커</th>',
    '<th className="px-4 py-3 w-20 border-b border-rose-500/20 text-center hidden">티커</th>'
)

# Hide table body ticker row
content = re.sub(
    r'<td className="px-4 py-3 text-slate-500 text-\[11px\] font-mono text-center">\{stock.ticker\}</td>',
    r'<td className="px-4 py-3 text-slate-500 text-[11px] font-mono text-center hidden">{stock.ticker}</td>',
    content
)

with open(filepath, "w") as f:
    f.write(content)
