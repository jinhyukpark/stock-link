import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"

with open(filepath, "r") as f:
    content = f.read()

# Replace BenefitChip
old_benefit_chip = """const BenefitChip = ({ name, ticker, domain }: { name: string, ticker: string, domain?: string }) => (
    <div className="flex items-center gap-1.5 bg-emerald-950 border border-emerald-700 rounded-md px-2 py-1 w-fit mb-1 mr-1">
        <StockLogo ticker={ticker} name={name} domain={domain} />
        <span className="text-emerald-300 text-xs font-medium">{name}</span>
        <span className="text-emerald-700 text-[10px] font-mono">{ticker}</span>
    </div>
);"""

new_benefit_chip = """const BenefitChip = ({ name, ticker, domain }: { name: string, ticker: string, domain?: string }) => {
    const src = getLogoUrl(ticker, domain);
    const initial = name?.[0] ?? ticker?.[0] ?? '?';
    
    return (
        <div className="flex items-center gap-1 px-1.5 py-1 rounded-md bg-slate-800/80 border border-emerald-500/20 shadow-sm whitespace-nowrap overflow-hidden max-w-[130px] mb-1 mr-1 hover:bg-slate-800 transition-colors">
            <div className="relative w-4 h-4 flex-shrink-0">
                {src ? (
                    <img
                        src={src}
                        alt={name}
                        className="w-full h-full rounded-[3px] object-contain bg-white p-[1px]"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            ((e.target as HTMLImageElement).nextSibling as HTMLElement).style.display = 'flex';
                        }}
                    />
                ) : null}
                <div
                    style={{ display: src ? 'none' : 'flex' }}
                    className="w-full h-full rounded-[3px] bg-slate-700 border border-slate-600 items-center justify-center text-white text-[9px] font-bold"
                >
                    {initial}
                </div>
            </div>
            <span className="text-emerald-400 text-xs font-medium truncate max-w-[72px] tracking-tight">{name}</span>
            <span className="text-emerald-500/40 text-[9px] font-mono ml-0.5">{ticker}</span>
        </div>
    );
};"""

content = content.replace(old_benefit_chip, new_benefit_chip)

# Replace RiskChip
old_risk_chip = """const RiskChip = ({ name, ticker, domain }: { name: string, ticker: string, domain?: string }) => (
    <div className="flex items-center gap-1.5 bg-[#ff7c7e]/10 border border-[#ff7c7e]/40 rounded-md px-2 py-1 w-fit mb-1 mr-1">
        <StockLogo ticker={ticker} name={name} domain={domain} />
        <span className="text-[#ff7c7e] text-xs font-medium">{name}</span>
        <span className="text-[#ff7c7e]/50 text-[10px] font-mono">{ticker}</span>
    </div>
);"""

new_risk_chip = """const RiskChip = ({ name, ticker, domain }: { name: string, ticker: string, domain?: string }) => {
    const src = getLogoUrl(ticker, domain);
    const initial = name?.[0] ?? ticker?.[0] ?? '?';
    
    return (
        <div className="flex items-center gap-1 px-1.5 py-1 rounded-md bg-slate-800/80 border border-[#ff7c7e]/20 shadow-sm whitespace-nowrap overflow-hidden max-w-[130px] mb-1 mr-1 hover:bg-slate-800 transition-colors">
            <div className="relative w-4 h-4 flex-shrink-0">
                {src ? (
                    <img
                        src={src}
                        alt={name}
                        className="w-full h-full rounded-[3px] object-contain bg-white p-[1px]"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            ((e.target as HTMLImageElement).nextSibling as HTMLElement).style.display = 'flex';
                        }}
                    />
                ) : null}
                <div
                    style={{ display: src ? 'none' : 'flex' }}
                    className="w-full h-full rounded-[3px] bg-slate-700 border border-slate-600 items-center justify-center text-white text-[9px] font-bold"
                >
                    {initial}
                </div>
            </div>
            <span className="text-[#ff7c7e] text-xs font-medium truncate max-w-[72px] tracking-tight">{name}</span>
            <span className="text-[#ff7c7e]/40 text-[9px] font-mono ml-0.5">{ticker}</span>
        </div>
    );
};"""

content = content.replace(old_risk_chip, new_risk_chip)

# Update Speaker column to prevent text wrapping on names
old_speaker_col = """<td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="flex flex-col items-center gap-1">
                                                <Avatar name={item.speaker} />
                                                <span className="text-slate-500 text-[10px] text-center">{item.country}</span>
                                            </div>
                                            <div className="flex flex-col gap-0.5">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-white font-bold text-sm leading-tight">{item.speaker}</span>
                                                    <img 
                                                        src={flagUrl(item.countryCode)} 
                                                        alt={item.country}
                                                        className="w-5 h-3.5 rounded-sm object-cover shadow-sm"
                                                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                                    />
                                                </div>
                                                <span className="text-slate-400 text-[10px] font-mono leading-none mt-1">{item.time}</span>
                                                <span className="text-slate-500 text-[10px] leading-tight mt-0.5">{item.followers}</span>
                                            </div>
                                        </div>
                                    </td>"""

new_speaker_col = """<td className="px-6 py-5 min-w-[140px]">
                                        <div className="flex items-center gap-3">
                                            <div className="flex flex-col items-center gap-1 shrink-0">
                                                <Avatar name={item.speaker} />
                                            </div>
                                            <div className="flex flex-col gap-0.5 min-w-0">
                                                <div className="flex items-center gap-1.5 whitespace-nowrap">
                                                    <span className="text-white font-bold text-sm truncate max-w-[80px]">{item.speaker}</span>
                                                    <img 
                                                        src={flagUrl(item.countryCode)} 
                                                        alt={item.country}
                                                        className="w-5 h-3.5 rounded-[2px] object-cover shadow-sm shrink-0"
                                                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                                    />
                                                </div>
                                                <span className="text-slate-500 text-[10px] leading-tight mt-0.5 line-clamp-2">{item.followers}</span>
                                            </div>
                                        </div>
                                    </td>"""

content = content.replace(old_speaker_col, new_speaker_col)

# Update market impact table speaker column to prevent wrapping
old_impact_speaker = """<td className="px-6 py-5">
                                            <div className="flex items-center gap-2 text-slate-300 text-sm w-max">
                                                <Avatar name={item.influencer} className="w-6 h-6 text-[10px] border border-slate-600" />
                                                <span className="font-medium text-xs truncate max-w-[100px]">{item.influencer}</span>
                                            </div>
                                        </td>"""

new_impact_speaker = """<td className="px-6 py-5 min-w-[120px]">
                                            <div className="flex items-center gap-2 text-slate-300 text-sm whitespace-nowrap">
                                                <Avatar name={item.influencer} className="w-6 h-6 text-[10px] border border-slate-600 shrink-0" />
                                                <span className="font-medium text-xs truncate max-w-[80px]">{item.influencer}</span>
                                            </div>
                                        </td>"""

content = content.replace(old_impact_speaker, new_impact_speaker)

with open(filepath, "w") as f:
    f.write(content)
