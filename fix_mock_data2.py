import json
import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Add empty arrays for missing properties in ALL date objects
new_content = content.replace('"2026-04-24": {', '"2026-04-24": {\n        positiveStocks: [],\n        negativeStocks: [],\n        marketImpact: [],\n        highlights: [],\n        speakers: [],\n        sectorSummary: [],')
new_content = new_content.replace('"2026-04-25": {', '"2026-04-25": {\n        positiveStocks: [],\n        negativeStocks: [],\n        marketImpact: [],\n        highlights: [],\n        speakers: [],\n        sectorSummary: [],')

with open(filepath, "w") as f:
    f.write(new_content)
