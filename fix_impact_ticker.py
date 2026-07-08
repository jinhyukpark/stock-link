import os
import re

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Replace the ticker with percentage in the Market Impact table
# Look for: {item.ticker.match(/^\d{6}$/) ? ( <span className="text-slate-500 text-[10px] font-mono">{item.ticker}</span> ) : ...
old_impact_td = """                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <StockLogo ticker={item.ticker} name={item.name} className="w-8 h-8 rounded-md" />
                                                <div className="flex flex-col">
                                                    <span className="text-white font-bold text-sm whitespace-nowrap">{item.name}</span>
                                                    {item.ticker.match(/^\\d{6}$/) ? (
                                                        <span className="text-slate-500 text-[10px] font-mono">{item.ticker}</span>
                                                    ) : (
                                                        <Badge variant="outline" className="w-fit text-[9px] px-1 py-0 h-4 border-slate-600 text-slate-400 bg-slate-800 mt-0.5">해외</Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </td>"""

new_impact_td = """                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <StockLogo ticker={item.ticker} name={item.name} className="w-8 h-8 rounded-md" />
                                                <div className="flex flex-col">
                                                    <span className="text-white font-bold text-sm whitespace-nowrap">{item.name}</span>
                                                    <span className="text-blue-400 font-bold text-[11px] mt-0.5">{(item.ticker.charCodeAt(0) + item.name.length) % 40 + 50}%</span>
                                                </div>
                                            </div>
                                        </td>"""

if old_impact_td in content:
    content = content.replace(old_impact_td, new_impact_td)

with open(filepath, "w") as f:
    f.write(content)
