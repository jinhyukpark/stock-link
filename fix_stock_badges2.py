import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Instead of regex with \d issues, I'll use string finding to replace.

start_benefit = "const BenefitChip"
end_benefit = "};\n\nconst RiskChip"

start_idx = content.find(start_benefit)
end_idx = content.find(end_benefit)

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
"""

if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + new_benefit_chip_full + content[end_idx:]


start_risk = "const RiskChip"
end_risk = "};\n\nconst TickerChip"

start_idx2 = content.find(start_risk)
end_idx2 = content.find(end_risk)

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
"""

if start_idx2 != -1 and end_idx2 != -1:
    content = content[:start_idx2] + new_risk_chip_full + content[end_idx2:]


with open(filepath, "w") as f:
    f.write(content)
