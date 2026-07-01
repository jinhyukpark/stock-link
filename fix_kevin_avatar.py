import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Add Kevin Warsh to the influencerAvatars record
content = content.replace(
    "'한국은행 (공식)': 'https://logo.clearbit.com/bok.or.kr'",
    "'한국은행 (공식)': 'https://logo.clearbit.com/bok.or.kr',\n  '케빈 워시': '/images/kevinwarsh.png'"
)

with open(filepath, "w") as f:
    f.write(content)
