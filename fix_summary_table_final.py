import os
import re

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Remove the card format completely if any remnants exist and ensure it looks exactly like the image
# The image shows two separate tables: one for positive (green header) and one for negative (red header).
# The columns are: 시장 (flag), 종목명, 티커, 언급 발언자, 긍정/부정 사유 요약
# The background of the table body is light in the mockup, but since we are in dark mode, we use very subtle tints of green/red or dark slate.

# Let's ensure the table background is consistent with dark mode but distinct
old_pos_bg = 'bg-emerald-950/10'
new_pos_bg = 'bg-emerald-900/10'
old_pos_bg_alt = 'bg-emerald-950/5'
new_pos_bg_alt = 'bg-emerald-900/5'

content = content.replace(old_pos_bg, new_pos_bg)
content = content.replace(old_pos_bg_alt, new_pos_bg_alt)

old_neg_bg = 'bg-rose-950/10'
new_neg_bg = 'bg-[#ff7c7e]/10'
old_neg_bg_alt = 'bg-rose-950/5'
new_neg_bg_alt = 'bg-[#ff7c7e]/5'

content = content.replace(old_neg_bg, new_neg_bg)
content = content.replace(old_neg_bg_alt, new_neg_bg_alt)

with open(filepath, "w") as f:
    f.write(content)
