import os
import re

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Make BenefitChip and RiskChip take wider layout
content = content.replace(
    '<div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 shadow-sm whitespace-nowrap hover:bg-emerald-500/20 transition-colors">',
    '<div className="flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 shadow-sm hover:bg-emerald-500/20 transition-colors w-full min-w-[120px] max-w-[180px]">'
)
content = content.replace(
    '<div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-rose-500/10 border border-rose-500/20 shadow-sm whitespace-nowrap hover:bg-rose-500/20 transition-colors">',
    '<div className="flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-rose-500/10 border border-rose-500/20 shadow-sm hover:bg-rose-500/20 transition-colors w-full min-w-[120px] max-w-[180px]">'
)

# Use grid instead of flex wrap for better alignment in cards
content = content.replace(
    '<div className="flex flex-wrap gap-2">',
    '<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">'
)
# (In case it had mt-2 or similar)
content = content.replace(
    '<div className="flex flex-wrap gap-1.5 mt-2">',
    '<div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">'
)
content = content.replace(
    '<div className="flex flex-wrap gap-1.5">',
    '<div className="grid grid-cols-2 sm:grid-cols-3 gap-2">'
)

with open(filepath, "w") as f:
    f.write(content)
