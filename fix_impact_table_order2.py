import os
import re

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Make sure we didn't miss adding speakerTitle to all objects in marketImpact
content = re.sub(
    r'(speaker: "국내 증권사")',
    r'\1, speakerTitle: "애널리스트"',
    content
)
content = re.sub(
    r'(speaker: "한국은행 \(공식\)")',
    r'\1, speakerTitle: "중앙은행"',
    content
)

with open(filepath, "w") as f:
    f.write(content)
