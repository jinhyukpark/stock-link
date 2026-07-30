import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Add a subtle gap between impact rows
content = content.replace('<td className="px-6 py-5">', '<td className="px-6 py-6">')

with open(filepath, "w") as f:
    f.write(content)
