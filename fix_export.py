import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r", encoding='utf-8') as f:
    content = f.read()

# Find how many times `export default SocialAnalysisView;` appears
count = content.count('export default SocialAnalysisView;')

if count > 1:
    # Replace all with empty string, then add one at the end
    content = content.replace('export default SocialAnalysisView;', '')
    content += '\nexport default SocialAnalysisView;\n'
    
    with open(filepath, "w", encoding='utf-8') as f:
        f.write(content)
