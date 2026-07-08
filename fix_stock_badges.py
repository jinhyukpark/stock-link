import os
import re

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Replace ticker with impact percentage in StockFlagItem if it exists (from my previous step, let's see if it's there or if I used a different component)
# Ah, in my previous step, `StockFlagItem` already calculates and shows `impact%`. Let's check `BenefitChip` and `RiskChip` again.

# Let's completely replace the StockLogo in BenefitChip and RiskChip with country flags to match the new UI requirement.
old_benefit_chip_full = """const BenefitChip = ({ name, ticker, domain }: { name: string, ticker: string, domain?: string }) => {
    const src = getLogoUrl(ticker, domain);
    const initial = name?.[0] ?? ticker?.[0] ?? '?';
    
    return (
        <div className="flex items-center gap-1 px-1.5 py-1 rounded-md bg-slate-800/80 border border-emerald-500/20 shadow-sm whitespace-nowrap overflow-hidden max-w-[130px] mb-1 mr-1 hover:bg-slate-800 transition-colors">
            <div className="relative w-4 h-4 flex-shrink-0">
                {src ? (
                    <img
                        src={src}
                        alt={name}
                        className="w-full h-full rounded-sm object-contain bg-white p-0.5"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            ((e.target as HTMLImageElement).nextSibling as HTMLElement).style.display = 'flex';
                        }}
                    />
                ) : null}
                <div
                    style={{ display: src ? 'none' : 'flex' }}
                    className="absolute inset-0 w-full h-full rounded-sm bg-slate-700 items-center justify-center text-[8px] font-bold text-slate-300"
                >
                    {initial}
                </div>
            </div>
            <span className="text-emerald-400 text-xs font-medium truncate max-w-[72px] tracking-tight">{name}</span>
            <span className="text-emerald-500/80 text-[10px] font-bold ml-1">{(ticker.charCodeAt(0) + name.length) % 40 + 50}%</span>
        </div>
    );
};"""

new_benefit_chip_full = """const BenefitChip = ({ name, ticker, domain }: { name: string, ticker: string, domain?: string }) => {
    const isKr = /^\\d{6}$/.test(ticker);
    const countryCode = isKr ? "kr" : "us";
    
    return (
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 shadow-sm whitespace-nowrap hover:bg-emerald-500/20 transition-colors">
            <img src={flagUrl(countryCode)} alt={countryCode} className="w-3.5 h-2.5 object-cover rounded-sm shadow-sm" />
            <span className="text-emerald-400 text-xs font-bold tracking-tight">{name}</span>
            <span className="text-emerald-500/80 text-[10px] font-bold ml-0.5">{(ticker.charCodeAt(0) + name.length) % 40 + 50}%</span>
        </div>
    );
};"""

if old_benefit_chip_full in content:
    content = content.replace(old_benefit_chip_full, new_benefit_chip_full)
else:
    # Use regex for robust replacement
    content = re.sub(
        r'const BenefitChip =.*?</div>\s*\);\s*};',
        new_benefit_chip_full,
        content,
        flags=re.DOTALL
    )

old_risk_chip_full = """const RiskChip = ({ name, ticker, domain }: { name: string, ticker: string, domain?: string }) => {
    const src = getLogoUrl(ticker, domain);
    const initial = name?.[0] ?? ticker?.[0] ?? '?';
    
    return (
        <div className="flex items-center gap-1 px-1.5 py-1 rounded-md bg-slate-800/80 border border-[#ff7c7e]/20 shadow-sm whitespace-nowrap overflow-hidden max-w-[130px] mb-1 mr-1 hover:bg-slate-800 transition-colors">
            <div className="relative w-4 h-4 flex-shrink-0">
                {src ? (
                    <img
                        src={src}
                        alt={name}
                        className="w-full h-full rounded-sm object-contain bg-white p-0.5"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            ((e.target as HTMLImageElement).nextSibling as HTMLElement).style.display = 'flex';
                        }}
                    />
                ) : null}
                <div
                    style={{ display: src ? 'none' : 'flex' }}
                    className="absolute inset-0 w-full h-full rounded-sm bg-slate-700 items-center justify-center text-[8px] font-bold text-slate-300"
                >
                    {initial}
                </div>
            </div>
            <span className="text-[#ff7c7e] text-xs font-medium truncate max-w-[72px] tracking-tight">{name}</span>
            <span className="text-[#ff7c7e]/80 text-[10px] font-bold ml-1">{(ticker.charCodeAt(0) + name.length) % 40 + 50}%</span>
        </div>
    );
};"""

new_risk_chip_full = """const RiskChip = ({ name, ticker, domain }: { name: string, ticker: string, domain?: string }) => {
    const isKr = /^\\d{6}$/.test(ticker);
    const countryCode = isKr ? "kr" : "us";
    
    return (
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-rose-500/10 border border-rose-500/20 shadow-sm whitespace-nowrap hover:bg-rose-500/20 transition-colors">
            <img src={flagUrl(countryCode)} alt={countryCode} className="w-3.5 h-2.5 object-cover rounded-sm shadow-sm" />
            <span className="text-rose-400 text-xs font-bold tracking-tight">{name}</span>
            <span className="text-rose-500/80 text-[10px] font-bold ml-0.5">{(ticker.charCodeAt(0) + name.length) % 40 + 50}%</span>
        </div>
    );
};"""

if old_risk_chip_full in content:
    content = content.replace(old_risk_chip_full, new_risk_chip_full)
else:
    # Use regex for robust replacement
    content = re.sub(
        r'const RiskChip =.*?</div>\s*\);\s*};',
        new_risk_chip_full,
        content,
        flags=re.DOTALL
    )

with open(filepath, "w") as f:
    f.write(content)
