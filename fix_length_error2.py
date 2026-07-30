import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Make all .length checks safer
content = content.replace('name.length', '(name ? name.length : 0)')

with open(filepath, "w") as f:
    f.write(content)
