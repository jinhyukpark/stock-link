import os

filepath = "client/src/components/insight/MarketView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Let's fix the selectedChart type properly
import re
content = re.sub(
    r'const \[selectedChart, setSelectedChart\] = useState<\{([^}]*)\}\s*\|\s*null>\(null\);',
    r'const [selectedChart, setSelectedChart] = useState<{id: string; \1} | null>(null);',
    content
)

with open(filepath, "w") as f:
    f.write(content)
