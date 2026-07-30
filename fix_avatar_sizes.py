import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# 1. Increase default Avatar size (used in the main Speaker table) from w-10 to w-14
content = content.replace(
    'className || "w-10 h-10"',
    'className || "w-14 h-14"'
)

# 2. Increase the Market Impact table Avatar size from w-6 to w-8
content = content.replace(
    '<Avatar name={item.influencer} className="w-6 h-6 text-[10px] border border-slate-600 shrink-0" />',
    '<Avatar name={item.influencer} className="w-8 h-8 text-[10px] border border-slate-600 shrink-0" />'
)

with open(filepath, "w") as f:
    f.write(content)
