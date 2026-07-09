import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Replace all Date related processing to prevent invalid date errors
# DATES list might not match the format or dates might be invalid

content = content.replace('const formatted = format(new Date(d), "MM/dd");', 'const formatted = d.substring(5).replace("-", "/");')
content = content.replace('업데이트: {format(new Date(dateKey), "yyyy.MM.dd")} 18:30 KST', '업데이트: {dateKey.replace(/-/g, ".")} 18:30 KST')

with open(filepath, "w") as f:
    f.write(content)
