import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r", encoding='utf-8') as f:
    content = f.read()

# Replace Market Impact Overview table structure
old_table_start = """<table className="w-full text-left min-w-[1200px] border-collapse">
                        <thead className="bg-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 w-32 font-semibold text-left">주요 인사</th>
                                <th className="px-6 py-4 w-32 font-semibold text-left">직책 / 소속</th>
                                <th className="px-6 py-4 min-w-[200px] font-semibold text-left">발언 요약</th>
                                <th className="px-6 py-4 min-w-[240px] font-semibold text-left">영향받은 종목 리스트</th>
                                <th className="px-6 py-4 w-24 font-semibold text-center">방향</th>
                                <th className="px-6 py-4 w-28 font-semibold text-center">강도</th>
                                <th className="px-6 py-4 w-32 font-semibold text-center">발언 시각</th>
                            </tr>
                        </thead>"""

new_table_start = """<table className="w-full text-left min-w-[1300px] border-collapse">
                        <thead className="bg-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 w-40 font-semibold text-left border-b border-slate-700">주요 인사</th>
                                <th className="px-6 py-4 min-w-[240px] font-semibold text-left border-b border-slate-700">시장 영향 분석</th>
                                <th className="px-6 py-4 min-w-[180px] font-semibold text-left border-b border-slate-700 text-emerald-400">수혜 종목</th>
                                <th className="px-6 py-4 min-w-[180px] font-semibold text-left border-b border-slate-700 text-rose-400">리스크 종목</th>
                                <th className="px-6 py-4 w-24 font-semibold text-center border-b border-slate-700">방향</th>
                                <th className="px-6 py-4 w-32 font-semibold text-center border-b border-slate-700">강도</th>
                            </tr>
                        </thead>"""

content = content.replace(old_table_start, new_table_start)

# Replace table body logic
parts = content.split('<tbody className="divide-y divide-white/5">')
if len(parts) > 1:
    pre = parts[0] + '<tbody className="divide-y divide-white/5">\n'
    post = parts[1]
    
    end_tbody = post.find('</tbody>')
    
    if end_tbody != -1:
        post_after = post[end_tbody:]
        
        new_tbody_content = """                            {data.speakers.map((speaker, i) => {
                                const isPositive = speaker.positiveStocks.length >= speaker.negativeStocks.length;
                                const directionText = isPositive ? '수혜' : '리스크';
                                const marketImpactEntry = data.marketImpact.find(m => m.name === speaker.speaker) || data.marketImpact[i % data.marketImpact.length];
                                const stars = marketImpactEntry ? marketImpactEntry.stars : 3;
                                
                                return (
                                    <tr key={`overview-${speaker.id}`} className={cn(
                                        "bg-slate-900", 
                                        "align-top border-b border-slate-800/50",
                                        "hover:bg-slate-800/50 transition-colors"
                                    )}>
                                        <td className="px-6 py-6 border-r border-slate-800/30">
                                            <div className="flex items-start gap-3">
                                                <Avatar name={speaker.speaker} className="w-10 h-10 shrink-0" />
                                                <div className="flex flex-col">
                                                    <span className="text-white font-bold text-sm whitespace-nowrap mb-0.5">{speaker.speaker}</span>
                                                    <span className="text-slate-400 text-xs font-medium leading-tight whitespace-pre-wrap">{speaker.speakerTitle}</span>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-6 pr-8 border-r border-slate-800/30">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center justify-between gap-2 mb-1">
                                                    <span className="text-slate-500 text-[11px] font-mono flex items-center gap-1.5 bg-slate-800/80 px-2 py-1 rounded-md w-fit">
                                                        <Clock className="w-3 h-3" />
                                                        {speaker.timestamp}
                                                    </span>
                                                    <a href="#" className="text-slate-500 hover:text-blue-400 transition-colors flex items-center gap-1 text-[11px] group">
                                                        <LinkIcon className="w-3 h-3" />
                                                        <span className="group-hover:underline">원문 보기</span>
                                                    </a>
                                                </div>
                                                <p className="text-slate-300 text-sm leading-relaxed" title={speaker.summary}>
                                                    {speaker.summary}
                                                </p>
                                            </div>
                                        </td>

                                        <td className="px-6 py-6 border-r border-slate-800/30 bg-emerald-950/10">
                                            <div className="flex flex-col gap-2.5">
                                                {speaker.positiveStocks.length > 0 ? (
                                                    speaker.positiveStocks.map((stock, idx) => (
                                                        <div key={`pos-${idx}`} className="flex items-center gap-2 group">
                                                            <StockLogo ticker={stock.ticker} name={stock.name} className="w-5 h-5 rounded-sm" />
                                                            <div className="flex flex-col">
                                                                <span className="text-white text-xs font-semibold group-hover:text-emerald-400 transition-colors">{stock.name}</span>
                                                                <span className="text-slate-500 text-[10px] font-mono">{stock.ticker.match(/^\\d{6}$/) ? stock.ticker : '해외'}</span>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <span className="text-slate-600 text-xs">-</span>
                                                )}
                                            </div>
                                        </td>
                                        
                                        <td className="px-6 py-6 border-r border-slate-800/30 bg-rose-950/10">
                                            <div className="flex flex-col gap-2.5">
                                                {speaker.negativeStocks.length > 0 ? (
                                                    speaker.negativeStocks.map((stock, idx) => (
                                                        <div key={`neg-${idx}`} className="flex items-center gap-2 group">
                                                            <StockLogo ticker={stock.ticker} name={stock.name} className="w-5 h-5 rounded-sm" />
                                                            <div className="flex flex-col">
                                                                <span className="text-white text-xs font-semibold group-hover:text-rose-400 transition-colors">{stock.name}</span>
                                                                <span className="text-slate-500 text-[10px] font-mono">{stock.ticker.match(/^\\d{6}$/) ? stock.ticker : '해외'}</span>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <span className="text-slate-600 text-xs">-</span>
                                                )}
                                            </div>
                                        </td>

                                        <td className="px-6 py-6 border-r border-slate-800/30">
                                            <div className="flex justify-center pt-2">
                                                {isPositive ? (
                                                    <Badge variant="outline" className="text-emerald-400 border-emerald-400/30 bg-emerald-950/30 text-xs">수혜</Badge>
                                                ) : (
                                                    <Badge variant="outline" className="text-rose-400 border-rose-400/30 bg-rose-950/30 text-xs">리스크</Badge>
                                                )}
                                            </div>
                                        </td>

                                        <td className="px-6 py-6">
                                            <div className="flex justify-center pt-2 gap-0.5">
                                                {[...Array(5)].map((_, idx) => (
                                                    <Star 
                                                        key={idx} 
                                                        className={cn(
                                                            "w-4 h-4", 
                                                            idx < stars 
                                                                ? (isPositive ? "fill-emerald-400 text-emerald-400" : "fill-[#ff7c7e] text-[#ff7c7e]")
                                                                : "fill-slate-700 text-slate-700"
                                                        )} 
                                                    />
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            """
                            
        content = pre + new_tbody_content + post_after

with open(filepath, "w", encoding='utf-8') as f:
    f.write(content)
