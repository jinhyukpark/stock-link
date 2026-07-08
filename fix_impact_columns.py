import os
import re

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# 1. Revert TickerChip to show ticker
old_ticker_chip = """const TickerChip = ({ children, ticker, domain, type = 'neutral' }: { children: React.ReactNode, ticker: string, domain?: string, type?: 'benefit' | 'risk' | 'neutral' }) => {
    let bgClass = "bg-slate-800 text-slate-300 border-slate-600";
    let tickerClass = "text-slate-500";
    
    if (type === 'benefit') {
        bgClass = "bg-emerald-950 text-emerald-300 border-emerald-700";
        tickerClass = "text-emerald-700 font-bold";
    } else if (type === 'risk') {
        bgClass = "bg-[#ff7c7e]/10 text-[#ff7c7e] border-[#ff7c7e]/40";
        tickerClass = "text-[#ff7c7e]/80 font-bold";
    }

    const name = children as string;
    const impact = (ticker.charCodeAt(0) + name.length) % 40 + 50;

    return (
        <div className={cn("inline-flex items-center gap-1.5 border rounded-md px-2 py-0.5 w-fit mr-1 mb-1", bgClass)}>
            <StockLogo ticker={ticker} name={name} domain={domain} className="w-4 h-4 rounded-sm" />
            <span className="text-xs font-medium">{children}</span>
            <span className={cn("text-[10px] ml-0.5", tickerClass)}>{impact}%</span>
        </div>
    );
};"""

new_ticker_chip = """const TickerChip = ({ children, ticker, domain, type = 'neutral' }: { children: React.ReactNode, ticker: string, domain?: string, type?: 'benefit' | 'risk' | 'neutral' }) => {
    let bgClass = "bg-slate-800 text-slate-300 border-slate-600";
    let tickerClass = "text-slate-500";
    
    if (type === 'benefit') {
        bgClass = "bg-emerald-950 text-emerald-300 border-emerald-700";
        tickerClass = "text-emerald-700 font-bold";
    } else if (type === 'risk') {
        bgClass = "bg-[#ff7c7e]/10 text-[#ff7c7e] border-[#ff7c7e]/40";
        tickerClass = "text-[#ff7c7e]/80 font-bold";
    }

    const name = children as string;

    return (
        <div className={cn("inline-flex items-center gap-1.5 border rounded-md px-2 py-0.5 w-fit mr-1 mb-1", bgClass)}>
            <StockLogo ticker={ticker} name={name} domain={domain} className="w-4 h-4 rounded-sm" />
            <span className="text-xs font-medium">{children}</span>
            <span className={cn("text-[9px] font-mono", tickerClass)}>{ticker}</span>
        </div>
    );
};"""
content = content.replace(old_ticker_chip, new_ticker_chip)

# Revert ticker column hiding in tables
content = content.replace(
    '<th className="px-4 py-3 w-20 border-b border-emerald-500/20 text-center hidden">티커</th>',
    '<th className="px-4 py-3 w-20 border-b border-emerald-500/20 text-center">티커</th>'
)
content = content.replace(
    '<th className="px-4 py-3 w-20 border-b border-rose-500/20 text-center hidden">티커</th>',
    '<th className="px-4 py-3 w-20 border-b border-rose-500/20 text-center">티커</th>'
)
content = re.sub(
    r'<td className="px-4 py-3 text-slate-500 text-\[11px\] font-mono text-center hidden">\{stock.ticker\}</td>',
    r'<td className="px-4 py-3 text-slate-500 text-[11px] font-mono text-center">{stock.ticker}</td>',
    content
)

# Replace impact percentage back to ticker in the market impact table (the one we changed previously)
old_impact_td = """                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <StockLogo ticker={item.ticker} name={item.name} className="w-8 h-8 rounded-md" />
                                                <div className="flex flex-col">
                                                    <span className="text-white font-bold text-sm whitespace-nowrap">{item.name}</span>
                                                    <span className={cn("font-bold text-[11px] mt-0.5", item.direction === '리스크' ? 'text-rose-400' : 'text-emerald-400')}>{(item.ticker.charCodeAt(0) + item.name.length) % 40 + 50}%</span>
                                                </div>
                                            </div>
                                        </td>"""

new_impact_td = """                                        <td className="px-6 py-5">
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
content = content.replace(old_impact_td, new_impact_td)

with open(filepath, "w") as f:
    f.write(content)
