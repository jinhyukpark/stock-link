import os

filepath = "client/src/pages/insight.tsx"
with open(filepath, "r") as f:
    content = f.read()

old_menu = """  const menuItems = [
    { id: "momentum", label: "Momentum Analysis", icon: Zap },
    { id: "news", label: "News Analysis", icon: Newspaper },
    { id: "market", label: "Market Analysis", icon: BarChart3 },
    { id: "market-map", label: "Market Map Analysis", icon: Globe },
    { id: "theme", label: "Theme Analysis", icon: Layers },
    { id: "compare", label: "Stock Comparison", icon: GitCompare },
    { id: "social", label: "Social Analysis", icon: Share2 },
  ];"""

new_menu = """  const menuItems = [
    { id: "momentum", label: "Momentum Analysis", icon: Zap },
    { id: "social", label: "Social Analysis", icon: Share2 },
    { id: "news", label: "News Analysis", icon: Newspaper },
    { id: "market", label: "Market Analysis", icon: BarChart3 },
    { id: "market-map", label: "Market Map Analysis", icon: Globe },
    { id: "theme", label: "Theme Analysis", icon: Layers },
    { id: "compare", label: "Stock Comparison", icon: GitCompare },
  ];"""

if old_menu in content:
    content = content.replace(old_menu, new_menu)
else:
    print("Could not find old_menu in insight.tsx")

with open(filepath, "w") as f:
    f.write(content)
