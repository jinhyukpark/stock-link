import os
import re

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Replace ticker with percentage in TickerChip

old_ticker_chip = """const TickerChip = ({ children, ticker, domain, type = 'neutral' }: { children: React.ReactNode, ticker: string, domain?: string, type?: 'benefit' | 'risk' | 'neutral' }) => {
    let bgClass = "bg-slate-800 text-slate-300 border-slate-600";
    let tickerClass = "text-slate-500";
    
    if (type === 'benefit') {
        bgClass = "bg-emerald-950 text-emerald-300 border-emerald-700";
        tickerClass = "text-emerald-700";
    } else if (type === 'risk') {
        bgClass = "bg-[#ff7c7e]/10 text-[#ff7c7e] border-[#ff7c7e]/40";
        tickerClass = "text-[#ff7c7e]/50";
    }

    return (
        <div className={cn("inline-flex items-center gap-1.5 border rounded-md px-2 py-0.5 w-fit mr-1 mb-1", bgClass)}>
            <StockLogo ticker={ticker} name={children as string} domain={domain} className="w-4 h-4 rounded-sm" />
            <span className="text-xs font-medium">{children}</span>
            <span className={cn("text-[9px] font-mono", tickerClass)}>{ticker}</span>
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
    const impact = (ticker.charCodeAt(0) + name.length) % 40 + 50;

    return (
        <div className={cn("inline-flex items-center gap-1.5 border rounded-md px-2 py-0.5 w-fit mr-1 mb-1", bgClass)}>
            <StockLogo ticker={ticker} name={name} domain={domain} className="w-4 h-4 rounded-sm" />
            <span className="text-xs font-medium">{children}</span>
            <span className={cn("text-[10px] ml-0.5", tickerClass)}>{impact}%</span>
        </div>
    );
};"""

if old_ticker_chip in content:
    content = content.replace(old_ticker_chip, new_ticker_chip)
else:
    # Let's try to match and replace if exact string matching fails
    content = re.sub(
        r'const TickerChip =.*?</div>\s*\);\s*};',
        new_ticker_chip,
        content,
        flags=re.DOTALL
    )

with open(filepath, "w") as f:
    f.write(content)
