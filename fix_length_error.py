import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Add safer checks for positiveStocks and negativeStocks in the table and arrays

# 1. Overview Table
content = content.replace('item.positiveStocks.length > 0', 'item.positiveStocks && item.positiveStocks.length > 0')
content = content.replace('item.negativeStocks.length > 0', 'item.negativeStocks && item.negativeStocks.length > 0')

# 2. Section 2 Analysis tables
content = content.replace('data.positiveStocks.length > 0', 'data.positiveStocks && data.positiveStocks.length > 0')
content = content.replace('data.negativeStocks.length > 0', 'data.negativeStocks && data.negativeStocks.length > 0')

with open(filepath, "w") as f:
    f.write(content)
