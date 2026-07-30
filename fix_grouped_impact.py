import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Remove the grouping logic from Avatar
grouping_logic_start = """    const groupedMarketImpact = Object.values(data.marketImpact.reduce((acc, item) => {"""
# Find the exact string in the file and remove it
import re

# We can replace the whole chunk inside Avatar
# It starts at `const groupedMarketImpact` and ends at `}, {} as Record<string, any>)).sort((a: any, b: any) => b.stars - a.stars);`
avatar_bad_code = """    const groupedMarketImpact = Object.values(data.marketImpact.reduce((acc, item) => {
        if (!acc[item.speaker]) {
            acc[item.speaker] = {
                speaker: item.speaker,
                speakerTitle: item.speakerTitle || "주요 인사",
                stars: item.stars,
                stocks: []
            };
        }
        acc[item.speaker].stocks.push({
            name: item.name,
            ticker: item.ticker,
            direction: item.direction,
            comment: item.comment,
            stars: item.stars
        });
        acc[item.speaker].stars = Math.max(acc[item.speaker].stars, item.stars);
        return acc;
    }, {} as Record<string, any>)).sort((a: any, b: any) => b.stars - a.stars);"""

content = content.replace(avatar_bad_code, "")

# Now add it inside SocialAnalysisView
# Find `export default function SocialAnalysisView({ selectedDate }: { selectedDate: string }) {`
# and `const data = MOCK_DATA[selectedDate as keyof typeof MOCK_DATA];`
social_view_start = """    const data = MOCK_DATA[selectedDate as keyof typeof MOCK_DATA];
    if (!data) return null;"""

correct_placement = social_view_start + "\n\n" + avatar_bad_code

content = content.replace(social_view_start, correct_placement)

with open(filepath, "w") as f:
    f.write(content)
