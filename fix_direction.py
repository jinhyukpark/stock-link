import os
import re

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Add small padding to stock list badges in the new table
content = content.replace(
    'className="flex items-center gap-1 bg-emerald-950/30 border border-emerald-900/40 rounded px-1.5 py-0.5"',
    'className="flex items-center gap-1 bg-emerald-950/30 border border-emerald-900/40 rounded px-1.5 py-0.5 whitespace-nowrap"'
)
content = content.replace(
    'className="flex items-center gap-1 bg-[#ff7c7e]/10 border border-[#ff7c7e]/20 rounded px-1.5 py-0.5"',
    'className="flex items-center gap-1 bg-[#ff7c7e]/10 border border-[#ff7c7e]/20 rounded px-1.5 py-0.5 whitespace-nowrap"'
)

# Also fix the vertical alignment of the columns to middle instead of top for the overview table if it looks better
content = content.replace(
    """                                        "align-top",""",
    """                                        "align-middle","""
)

with open(filepath, "w") as f:
    f.write(content)
