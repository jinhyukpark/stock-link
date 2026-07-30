import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Replace BenefitChip to match the requested style exactly
old_benefit_chip = """const BenefitChip = ({ name, ticker, domain }: { name: string, ticker: string, domain?: string }) => (
    <div className="flex items-center gap-1.5 bg-emerald-950 border border-emerald-700 rounded-md px-2 py-1 w-fit">
        <StockLogo ticker={ticker} name={name} domain={domain} className="w-5 h-5 rounded-sm" />
        <span className="text-emerald-300 text-xs font-medium">{name}</span>
        <span className="text-emerald-700 text-[10px] font-mono">{ticker}</span>
    </div>
);"""

new_benefit_chip = """const BenefitChip = ({ name, ticker, domain }: { name: string, ticker: string, domain?: string }) => (
    <div className="flex items-center gap-1.5 bg-emerald-950 border border-emerald-700 rounded-md px-2 py-1 w-fit mb-1 mr-1">
        <StockLogo ticker={ticker} name={name} domain={domain} />
        <span className="text-emerald-300 text-xs font-medium">{name}</span>
        <span className="text-emerald-700 text-[10px] font-mono">{ticker}</span>
    </div>
);"""

# Replace RiskChip to match the requested style exactly
old_risk_chip = """const RiskChip = ({ name, ticker, domain }: { name: string, ticker: string, domain?: string }) => (
    <div className="flex items-center gap-1.5 bg-[#ff7c7e]/10 border border-[#ff7c7e]/40 rounded-md px-2 py-1 w-fit">
        <StockLogo ticker={ticker} name={name} domain={domain} className="w-5 h-5 rounded-sm" />
        <span className="text-[#ff7c7e] text-xs font-medium">{name}</span>
        <span className="text-[#ff7c7e]/50 text-[10px] font-mono">{ticker}</span>
    </div>
);"""

new_risk_chip = """const RiskChip = ({ name, ticker, domain }: { name: string, ticker: string, domain?: string }) => (
    <div className="flex items-center gap-1.5 bg-[#ff7c7e]/10 border border-[#ff7c7e]/40 rounded-md px-2 py-1 w-fit mb-1 mr-1">
        <StockLogo ticker={ticker} name={name} domain={domain} />
        <span className="text-[#ff7c7e] text-xs font-medium">{name}</span>
        <span className="text-[#ff7c7e]/50 text-[10px] font-mono">{ticker}</span>
    </div>
);"""

content = content.replace(old_benefit_chip, new_benefit_chip)
content = content.replace(old_risk_chip, new_risk_chip)

with open(filepath, "w") as f:
    f.write(content)
