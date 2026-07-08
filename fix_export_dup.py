import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r", encoding='utf-8') as f:
    content = f.read()

# Fix the duplicate export problem: It's declared as `export default function SocialAnalysisView()` 
# AND we added `export default SocialAnalysisView;` at the bottom.
content = content.replace('\nexport default SocialAnalysisView;\n', '')
content = content.replace('\nexport default SocialAnalysisView;', '')

with open(filepath, "w", encoding='utf-8') as f:
    f.write(content)
