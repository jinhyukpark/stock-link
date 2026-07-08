import os

filepath = "client/src/components/insight/MarketView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Fix the type definition for selectedChart
old_state_def = """const [selectedChart, setSelectedChart] = useState<{
    title: string;
    description: string;
    chart: React.ReactNode;
    analysis: React.ReactNode;
    legend?: React.ReactNode;
    height?: string;
    hasDualChart?: boolean;
    kospiChart?: React.ReactNode;
    kosdaqChart?: React.ReactNode;
  } | null>(null);"""

new_state_def = """const [selectedChart, setSelectedChart] = useState<{
    id: string;
    title: string;
    description: string;
    chart: React.ReactNode;
    analysis: React.ReactNode;
    legend?: React.ReactNode;
    height?: string;
    hasDualChart?: boolean;
    kospiChart?: React.ReactNode;
    kosdaqChart?: React.ReactNode;
  } | null>(null);"""

if old_state_def in content:
    content = content.replace(old_state_def, new_state_def)
else:
    print("Could not find the exact selectedChart state definition. Will try regex.")
    import re
    content = re.sub(
        r'const \[selectedChart, setSelectedChart\] = useState<\{([^}]*)\}\s*\|\s*null>\(null\);',
        r'const [selectedChart, setSelectedChart] = useState<{id: string; \1} | null>(null);',
        content
    )

with open(filepath, "w") as f:
    f.write(content)
