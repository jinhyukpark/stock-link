import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Make the initial calculation perfectly safe for the Avatar component
content = content.replace('const initials = name.replace(/\\s/g, \'\').slice(0, 2);', 'const initials = typeof name === "string" ? name.replace(/\\s/g, \'\').slice(0, 2) : "??";')

with open(filepath, "w") as f:
    f.write(content)
