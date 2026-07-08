import os
import re

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

old_span = """<span className="text-blue-400 font-bold text-[11px] mt-0.5">{(item.ticker.charCodeAt(0) + item.name.length) % 40 + 50}%</span>"""
new_span = """<span className={cn("font-bold text-[11px] mt-0.5", item.direction === '리스크' ? 'text-rose-400' : 'text-emerald-400')}>{(item.ticker.charCodeAt(0) + item.name.length) % 40 + 50}%</span>"""

content = content.replace(old_span, new_span)

with open(filepath, "w") as f:
    f.write(content)
