import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Fix Avatar crash:
content = content.replace('const Avatar = ({ name, className }: { name: string, className?: string }) => {', 'const Avatar = ({ name, className }: { name?: string, className?: string }) => {\n    if (!name) return null;\n')

# Fix influencer missing on stocks:
content = content.replace('stock.influencer', 'speaker?.speaker || "인플루언서"')
content = content.replace('item.followers', 'item.followers || "공개 발언"')

with open(filepath, "w") as f:
    f.write(content)
