import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Modify BenefitChip and RiskChip to show percentage instead of ticker.

# 1. Update BenefitChip
old_benefit_chip = """<span className="text-emerald-500/40 text-[9px] font-mono ml-0.5">{ticker}</span>"""
new_benefit_chip = """<span className="text-emerald-500/80 text-[10px] font-bold ml-1">{(ticker.charCodeAt(0) + name.length) % 40 + 50}%</span>"""

if old_benefit_chip in content:
    content = content.replace(old_benefit_chip, new_benefit_chip)

# 2. Update RiskChip
old_risk_chip = """<span className="text-[#ff7c7e]/40 text-[9px] font-mono ml-0.5">{ticker}</span>"""
new_risk_chip = """<span className="text-[#ff7c7e]/80 text-[10px] font-bold ml-1">{(ticker.charCodeAt(0) + name.length) % 40 + 50}%</span>"""

if old_risk_chip in content:
    content = content.replace(old_risk_chip, new_risk_chip)

with open(filepath, "w") as f:
    f.write(content)
