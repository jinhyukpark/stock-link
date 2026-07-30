import os

# ---- Fix MarketView.tsx: add `id` to selectedChart state type ----
filepath = "client/src/components/insight/MarketView.tsx"
with open(filepath, "r") as f:
    content = f.read()

old_state_def = """const [selectedChart, setSelectedChart] = useState<{
    title: string;
    description: string;
    chart: React.ReactNode;
    analysis: React.ReactNode;
    legend?: React.ReactNode;
    height?: string;
    hasDualChart?: boolean;
    kospiChart?: React.ReactNode;
    kosdaqChart?: React.ReactNode;
  } | null>(null);"""

new_state_def = """const [selectedChart, setSelectedChart] = useState<{
    id: string;
    title: string;
    description: string;
    chart: React.ReactNode;
    analysis: React.ReactNode;
    legend?: React.ReactNode;
    height?: string;
    hasDualChart?: boolean;
    kospiChart?: React.ReactNode;
    kosdaqChart?: React.ReactNode;
  } | null>(null);"""

if old_state_def in content:
    content = content.replace(old_state_def, new_state_def)
else:
    print("Could not find the exact selectedChart state definition. Will try regex.")
    import re
    content = re.sub(
        r'const \[selectedChart, setSelectedChart\] = useState<\{([^}]*)\}\s*\|\s*null>\(null\);',
        r'const [selectedChart, setSelectedChart] = useState<{id: string; \1} | null>(null);',
        content
    )

with open(filepath, "w") as f:
    f.write(content)

# ---- Fix SocialAnalysisView.tsx ----
filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Fix 1: Followers and Stars in speaker are missing in new mock data. Let's add default values.
content = content.replace('item.followers', 'item.followers || "공개 발언"')
content = content.replace('item.stars', 'item.stars || 3')
content = content.replace('speaker.stars', '(speaker.stars || 3)')

# Fix 2: data.positiveStocks and data.negativeStocks and data.marketImpact are not in MOCK_DATA.
# Let's derive them from data.speakers.
replacement_code = """
    const data = MOCK_DATA[dateKey as keyof typeof MOCK_DATA] || MOCK_DATA["2026-04-26"];

    // Compute aggregated stocks from speakers
    const allPositiveStocks = data.speakers?.flatMap(s => s.positiveStocks || []) || [];
    const allNegativeStocks = data.speakers?.flatMap(s => s.negativeStocks || []) || [];
    
    // Deduplicate by ticker
    const uniquePositiveStocks = Array.from(new Map(allPositiveStocks.map(item => [item.ticker, item])).values());
    const uniqueNegativeStocks = Array.from(new Map(allNegativeStocks.map(item => [item.ticker, item])).values());
"""
content = content.replace('const data = MOCK_DATA[dateKey as keyof typeof MOCK_DATA] || MOCK_DATA["2026-04-26"];', replacement_code)

content = content.replace('data.positiveStocks && data.positiveStocks.length', 'uniquePositiveStocks.length')
content = content.replace('data.positiveStocks.map', 'uniquePositiveStocks.map')
content = content.replace('data.negativeStocks && data.negativeStocks.length', 'uniqueNegativeStocks.length')
content = content.replace('data.negativeStocks.map', 'uniqueNegativeStocks.map')

# Fix 3: marketImpact
content = content.replace('data.marketImpact?.find(impact => impact.name === stock.name)', 'null')

with open(filepath, "w") as f:
    f.write(content)

# Fix MarketView.tsx: 'id' property mismatch fallback (compare by title instead)
mv_filepath = "client/src/components/insight/MarketView.tsx"
with open(mv_filepath, "r") as f:
    mv_content = f.read()

mv_content = mv_content.replace('c.id === selectedChart?.id', 'c.title === selectedChart?.title')
mv_content = mv_content.replace('selectedChart?.id === link.id', 'selectedChart?.title === link.title')

with open(mv_filepath, "w") as f:
    f.write(mv_content)

print("Done.")
