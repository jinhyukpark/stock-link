import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Make sure all dates have positiveStocks and negativeStocks defined
new_content = content.replace('"2026-04-25": {', '"2026-04-25": {\n        positiveStocks: [],\n        negativeStocks: [],')
new_content = new_content.replace('"2026-04-24": {', '"2026-04-24": {\n        positiveStocks: [],\n        negativeStocks: [],')

with open(filepath, "w") as f:
    f.write(new_content)
