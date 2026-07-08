import os
import re

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Let's use regex to find and replace the ticker part in the table if exact string matching failed
pattern = r'<td className="px-6 py-5">\s*<div className="flex items-center gap-3">\s*<StockLogo ticker=\{item\.ticker\} name=\{item\.name\} className="w-8 h-8 rounded-md" />\s*<div className="flex flex-col">\s*<span className="text-white font-bold text-sm whitespace-nowrap">\{item\.name\}</span>\s*\{item\.ticker\.match\(\/\^\\\\d\{6\}\$\/\) \? \(\s*<span className="text-slate-500 text-\[10px\] font-mono">\{item\.ticker\}</span>\s*\) : \(\s*<Badge variant="outline" className="w-fit text-\[9px\] px-1 py-0 h-4 border-slate-600 text-slate-400 bg-slate-800 mt-0\.5">해외</Badge>\s*\)\}\s*</div>\s*</div>\s*</td>'

new_td = """<td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <StockLogo ticker={item.ticker} name={item.name} className="w-8 h-8 rounded-md" />
                                                <div className="flex flex-col">
                                                    <span className="text-white font-bold text-sm whitespace-nowrap">{item.name}</span>
                                                    <span className="text-blue-400 font-bold text-[11px] mt-0.5">{(item.ticker.charCodeAt(0) + item.name.length) % 40 + 50}%</span>
                                                </div>
                                            </div>
                                        </td>"""

content = re.sub(pattern, new_td, content, flags=re.DOTALL)

with open(filepath, "w") as f:
    f.write(content)
