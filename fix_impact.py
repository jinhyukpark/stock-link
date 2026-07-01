import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Update Direction column width in market impact table to be narrower
content = content.replace(
    '<th className="px-6 py-4 w-28 font-semibold text-center">방향</th>',
    '<th className="px-6 py-4 w-24 font-semibold text-center">방향</th>'
)

with open(filepath, "w") as f:
    f.write(content)
