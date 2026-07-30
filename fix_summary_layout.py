import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Replace block 1
content = content.replace(
    '<span className="text-slate-400 text-sm leading-relaxed">{stock.reason}</span>',
    '<span className="text-slate-400 text-sm leading-relaxed block">{stock.reason}</span>'
)

with open(filepath, "w") as f:
    f.write(content)
