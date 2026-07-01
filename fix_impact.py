import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Make sure impact table sector column is wide enough to not wrap
content = content.replace(
    '<th className="px-6 py-4 min-w-[140px] font-semibold text-center">섹터</th>',
    '<th className="px-6 py-4 min-w-[180px] font-semibold text-center">섹터</th>'
)

# And make sure impact table name column doesn't wrap either
content = content.replace(
    '<span className="text-white font-bold text-sm">{item.name}</span>',
    '<span className="text-white font-bold text-sm whitespace-nowrap">{item.name}</span>'
)

with open(filepath, "w") as f:
    f.write(content)
