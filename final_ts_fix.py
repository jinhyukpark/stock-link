import os

# Fix MarketView.tsx
mv_filepath = "client/src/components/insight/MarketView.tsx"
with open(mv_filepath, "r") as f:
    mv_content = f.read()

# "selectedChart?.title === link.title" => "selectedChart?.title === link.label"
mv_content = mv_content.replace('selectedChart?.title === link.title', 'selectedChart?.title === link.label')

with open(mv_filepath, "w") as f:
    f.write(mv_content)

# Fix SocialAnalysisView.tsx
sv_filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(sv_filepath, "r") as f:
    sv_content = f.read()

sv_content = sv_content.replace('item.followers', '(item as any).followers')
sv_content = sv_content.replace('item.stars', '(item as any).stars')
sv_content = sv_content.replace('speaker.stars', '(speaker as any).stars')
sv_content = sv_content.replace('relatedImpact?.stars', '(relatedImpact as any)?.stars')

# replace speaker?.speaker || "인플루언서" with just "인플루언서"
sv_content = sv_content.replace('speaker?.speaker || "인플루언서"', '"인플루언서"')

with open(sv_filepath, "w") as f:
    f.write(sv_content)
