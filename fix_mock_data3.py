import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Make marketImpact safer
content = content.replace('const relatedImpact = data.marketImpact.find(', 'const relatedImpact = data.marketImpact?.find(')

with open(filepath, "w") as f:
    f.write(content)
