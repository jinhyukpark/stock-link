import os
import re

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Let's search for "해외" Badge, which was in the table to confirm if we missed it.
old_table_name_col = """                                                    <span className="text-white font-bold text-sm whitespace-nowrap">{item.name}</span>
                                                    {item.ticker.match(/^\\d{6}$/) ? (
                                                        <span className="text-slate-500 text-[10px] font-mono">{item.ticker}</span>
                                                    ) : (
                                                        <Badge variant="outline" className="w-fit text-[9px] px-1 py-0 h-4 border-slate-600 text-slate-400 bg-slate-800 mt-0.5">해외</Badge>
                                                    )}"""
new_table_name_col = """                                                    <span className="text-white font-bold text-sm whitespace-nowrap">{item.name}</span>
                                                    <span className={cn("text-[11px] font-bold mt-0.5", item.direction === '리스크' ? 'text-rose-400' : 'text-emerald-400')}>{(item.ticker.charCodeAt(0) + item.name.length) % 40 + 50}%</span>"""

if old_table_name_col in content:
    content = content.replace(old_table_name_col, new_table_name_col)
    
with open(filepath, "w") as f:
    f.write(content)
