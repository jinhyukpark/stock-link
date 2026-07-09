import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Make the stock.influencer replacement actually work in the context of the component mapping
content = content.replace('stock.influencer', '("인물")') # Provide a fallback string

with open(filepath, "w") as f:
    f.write(content)
