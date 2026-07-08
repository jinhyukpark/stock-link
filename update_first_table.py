import os
import re

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# We need to change the first table "🎙 주요 인사 발언".
# The user wants it to look like Image 1, but grouped by speaker. Wait, Image 3 is the new request!
# Look at image 3 (attached_assets/image_1783518901705.png) which shows "종합 요약 테이블" grouped by speaker.
# The user said: "이미지 1번의 개요 테이블을 이미지 2,4,5,6과 동일하게 '인물(주요 인사)'을 기준으로 그룹핑해줘."
# "개요 테이블 컬럼 구성 (좌→우 순서): 주요 인사(이름) → 직책/소속 → 발언 요약 → 영향받은 종목 리스트(긍정/부정 구분, 종목명+코드) → 방향(수혜/리스크/관망) → 강도(별점) → 발언 시각"
# And in this table, there is no impact percentage, just stock name + ticker.

# Wait, Image 1 was the old "시장 영향 분석" table. Let's find out which table the user means by "이미지 1번의 개요 테이블".
# Our current code has "🎙 주요 인사 발언" at the top which is mapped by `data.speakers`.
# But `data.speakers` ALREADY groups by speaker! Let's check `data.speakers`. Yes, it's an array of speaker objects, one per speaker.
# Wait, let's look at the columns requested:
# 주요 인사(이름) → 직책/소속 → 발언 요약 → 영향받은 종목 리스트(긍정/부정 구분, 종목명+코드) → 방향(수혜/리스크/관망) → 강도(별점) → 발언 시각
# Current columns: 인물 | 플랫폼 | 발언 요약 | 수혜 종목 | 리스크 종목 | 강도.
# Let's change the "🎙 주요 인사 발언" table to match this exact requested structure.

old_first_table = """<table className="w-full text-left min-w-[1100px] border-collapse">
                        <thead className="bg-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 w-48 font-semibold text-left">인물</th>
                                <th className="px-6 py-4 w-32 font-semibold text-center">플랫폼</th>
                                <th className="px-6 py-4 min-w-[220px] font-semibold text-left">발언 요약</th>
                                <th className="px-6 py-4 min-w-[140px] w-40 font-semibold text-emerald-400 text-xs bg-emerald-900/10 text-left border-l border-emerald-900/20">📈 수혜 종목</th>
                                <th className="px-6 py-4 min-w-[140px] w-40 font-semibold text-[#ff7c7e] text-xs bg-[#ff7c7e]/5 text-left border-l border-[#ff7c7e]/10">📉 리스크 종목</th>
                                <th className="px-6 py-4 w-28 font-semibold text-center">강도</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {data.speakers.map((item, i) => (
                                <tr key={`speaker-${item.id}`} className={cn(i % 2 === 0 ? "bg-slate-800/60" : "bg-slate-900", "align-top")}>
                                    <td className="px-6 py-5 min-w-[160px]">
                                        <div className="flex items-center gap-3">
                                            <div className="flex flex-col items-center gap-1 shrink-0">
                                                <Avatar name={item.speaker} />
                                            </div>
                                            <div className="flex flex-col gap-0.5 min-w-0">
                                                <div className="flex items-center gap-1.5 whitespace-nowrap">
                                                    <span className="text-white font-bold text-sm">{item.speaker}</span>
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
                                    </td>
                                    
                                    <td className="px-6 py-5 text-center">
                                        <PlatformBadge platform={item.platform} />
                                    </td>

                                    <td className="px-6 py-5 pr-8">
                                        <div className="text-slate-200 text-sm leading-relaxed line-clamp-3">
                                            {item.summary}
                                        </div>
                                    </td>

                                    <td className="px-6 py-5 bg-emerald-900/5 border-l border-emerald-900/20">
                                        <div className="flex flex-wrap gap-1.5">
                                            {item.positiveStocks.map((stock, idx) => (
                                                <BenefitChip key={idx} name={stock.name} ticker={stock.ticker} domain={stock.domain} />
                                            ))}
                                            {item.positiveStocks.length === 0 && <span className="text-slate-500 text-xs">없음</span>}
                                        </div>
                                    </td>

                                    <td className="px-6 py-5 bg-[#ff7c7e]/5 border-l border-[#ff7c7e]/10">
                                        <div className="flex flex-wrap gap-1.5">
                                            {item.negativeStocks.map((stock, idx) => (
                                                <RiskChip key={idx} name={stock.name} ticker={stock.ticker} domain={stock.domain} />
                                            ))}
                                            {item.negativeStocks.length === 0 && <span className="text-slate-500 text-xs">없음</span>}
                                        </div>
                                    </td>

                                    <td className="px-6 py-5 text-center">
                                        <div className="flex flex-col items-center gap-1.5">
                                            <div className="flex justify-center gap-0.5">
                                                {[...Array(5)].map((_, idx) => (
                                                    <Star 
                                                        key={idx} 
                                                        className={cn(
                                                            "w-3 h-3", 
                                                            idx < item.stars ? "fill-amber-400 text-amber-400" : "fill-slate-700 text-slate-700"
                                                        )} 
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-slate-400 text-[10px]">
                                                {item.stars === 3 ? "매우 높음" : item.stars === 2 ? "높음" : "보통"}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>"""

# Wait, Image 3 ("종합 요약 테이블") is a reference to a layout.
# Let's write the new table. We will map through groupedMarketImpact, because we need the direction for the speaker?
# Actually, the user wants: "방향(수혜/리스크/관망) → 강도(별점) → 발언 시각".
# If a speaker has both positive and negative stocks, what is the direction?
# Let's check Image 3: The left-most column has a colored circle and "높음", then "트럼프 (S&P500 분석)".
# Ah! In Image 3, the columns are:
# 영향도 | 발언자 | 직책/소속 | 플랫폼 | 핵심 발언 요약 | 긍정 종목 | 부정 종목 | 시간
# But the user specifically listed:
# "개요 테이블 컬럼 구성 (좌→우 순서): 주요 인사(이름) → 직책/소속 → 발언 요약 → 영향받은 종목 리스트(긍정/부정 구분, 종목명+코드) → 방향(수혜/리스크/관망) → 강도(별점) → 발언 시각"

new_first_table = """<table className="w-full text-left min-w-[1300px] border-collapse">
                        <thead className="bg-[#1e2338] text-xs font-semibold text-slate-300 border-b border-slate-700">
                            <tr>
                                <th className="px-6 py-4 w-32 font-semibold text-left">주요 인사</th>
                                <th className="px-6 py-4 w-32 font-semibold text-left">직책/소속</th>
                                <th className="px-6 py-4 min-w-[300px] font-semibold text-left">발언 요약</th>
                                <th className="px-6 py-4 w-80 font-semibold text-left">영향받은 종목 리스트</th>
                                <th className="px-6 py-4 w-28 font-semibold text-center">방향</th>
                                <th className="px-6 py-4 w-28 font-semibold text-center">강도</th>
                                <th className="px-6 py-4 w-28 font-semibold text-center">발언 시각</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {data.speakers.map((item, i) => {
                                // Determine overall direction based on stock lists
                                let overallDirection = '관망';
                                if (item.positiveStocks.length > 0 && item.negativeStocks.length === 0) overallDirection = '수혜';
                                else if (item.negativeStocks.length > 0 && item.positiveStocks.length === 0) overallDirection = '리스크';
                                else if (item.positiveStocks.length > 0 && item.negativeStocks.length > 0) overallDirection = '혼조';

                                return (
                                <tr key={`speaker-${item.id}`} className={cn(i % 2 === 0 ? "bg-[#161a29]" : "bg-[#1a1e2f]", "align-top hover:bg-slate-800/50 transition-colors")}>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <Avatar name={item.speaker} className="w-8 h-8 rounded-full" />
                                            <span className="text-white font-bold text-sm whitespace-nowrap">{item.speaker}</span>
                                        </div>
                                    </td>
                                    
                                    <td className="px-6 py-5">
                                        <span className="text-slate-400 text-xs">{item.speakerTitle}</span>
                                    </td>

                                    <td className="px-6 py-5 pr-8">
                                        <div className="text-slate-300 text-[13px] leading-relaxed">
                                            {item.summary}
                                        </div>
                                    </td>

                                    <td className="px-6 py-5">
                                        <div className="flex flex-col gap-3">
                                            {item.positiveStocks.length > 0 && (
                                                <div className="flex flex-col gap-1.5">
                                                    <span className="text-emerald-400 text-[10px] font-bold">긍정</span>
                                                    <div className="flex flex-wrap gap-2">
                                                        {item.positiveStocks.map((stock, idx) => (
                                                            <div key={idx} className="flex items-center gap-1.5">
                                                                <span className="text-slate-200 text-xs">{stock.name}</span>
                                                                <span className="text-slate-500 text-[10px] font-mono">({stock.ticker})</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {item.negativeStocks.length > 0 && (
                                                <div className="flex flex-col gap-1.5">
                                                    <span className="text-[#ff7c7e] text-[10px] font-bold">부정</span>
                                                    <div className="flex flex-wrap gap-2">
                                                        {item.negativeStocks.map((stock, idx) => (
                                                            <div key={idx} className="flex items-center gap-1.5">
                                                                <span className="text-slate-200 text-xs">{stock.name}</span>
                                                                <span className="text-slate-500 text-[10px] font-mono">({stock.ticker})</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {item.positiveStocks.length === 0 && item.negativeStocks.length === 0 && (
                                                <span className="text-slate-500 text-xs">-</span>
                                            )}
                                        </div>
                                    </td>
                                    
                                    <td className="px-6 py-5 text-center">
                                        <DirectionBadge type={overallDirection} />
                                    </td>

                                    <td className="px-6 py-5 text-center">
                                        <div className="flex justify-center gap-0.5">
                                            {[...Array(5)].map((_, idx) => (
                                                <Star 
                                                    key={idx} 
                                                    className={cn(
                                                        "w-3.5 h-3.5", 
                                                        idx < item.stars ? "fill-amber-400 text-amber-400" : "fill-slate-700 text-slate-700"
                                                    )} 
                                                />
                                            ))}
                                        </div>
                                    </td>
                                    
                                    <td className="px-6 py-5 text-center">
                                        <span className="text-slate-400 text-[11px] whitespace-nowrap">{item.time || "2026-04-24 15:30"}</span>
                                    </td>
                                </tr>
                                )
                            })}
                        </tbody>
                    </table>"""

import re
content = re.sub(
    r'<table className="w-full text-left min-w-\[1100px\] border-collapse">.*?</table>',
    new_first_table,
    content,
    flags=re.DOTALL
)

with open(filepath, "w") as f:
    f.write(content)
