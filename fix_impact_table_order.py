import os
import re

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# We need to change the column order of the "시장 영향도: 상세 분석" table.
# Currently it is: 종목 (item.name/ticker), 변동 방향 (DirectionBadge), 강도 (stars), 주요 언급 인사 (Avatar+speaker)
# Requested order: 주요 인사 (이름 + 소속/직함), 종목 리스트... Wait, the request says:
# "주요 인사가 가장 먼저 나오고, 그 다음에 해당 인물이 영향을 준 종목 리스트가 오는 순서."
# Currently, the table is structured per "marketImpact" item which represents a single stock.
# We need to render the table so the first column is the speaker and the second column is the stock, or we need to group by speaker.
# Looking at the user's mockups, the table has speaker on the left, then "발언 요약", "긍정 종목", "부정 종목", "시장 영향 분석"
# Wait, this means we should rebuild the "시장 영향도: 상세 분석" table to match the image!

# The image shows sections grouped by Impact Level (시장 영향도: 높음, 시장 영향도: 중간, 시장 영향도: 낮음).
# Inside each section, there's a card/row for each speaker.
# Left side: Speaker Name, Title, date, source.
# Right side: 발언 요약, 긍정 종목, 부정 종목, 시장 영향 분석.

# We already have this grouped-by-speaker layout in "2. 주요 인사 발언 및 시장 반응" !!
# Let me check if `marketImpact` table is supposed to be *replaced* or just modified.
# "시장 영향도 분석 섹션 컬럼 순서
# - 컬럼(항목) 순서를 다음과 같이 배치해줘: 주요 인사가 가장 먼저 나오고, 그 다음에 해당 인물이 영향을 준 종목 리스트가 오는 순서.
# - 주요 인사 항목에는 반드시 그 사람이 누구인지(이름 + 소속/직함)가 함께 표시되어야 해. 이름만 나오지 않도록 해줘."

# Let's change the columns in the marketImpact table.
old_table_header = """                        <thead className="bg-slate-800/80 border-b border-slate-700">
                            <tr>
                                <th className="px-6 py-4 w-48 font-semibold text-left">종목</th>
                                <th className="px-6 py-4 w-32 font-semibold text-center">변동 방향</th>
                                <th className="px-6 py-4 w-24 font-semibold text-center">강도</th>
                                <th className="px-6 py-4 w-32 font-semibold text-left">주요 언급 인사</th>
                            </tr>
                        </thead>"""

new_table_header = """                        <thead className="bg-slate-800/80 border-b border-slate-700">
                            <tr>
                                <th className="px-6 py-4 w-48 font-semibold text-left">주요 언급 인사</th>
                                <th className="px-6 py-4 w-48 font-semibold text-left">종목</th>
                                <th className="px-6 py-4 w-32 font-semibold text-center">변동 방향</th>
                                <th className="px-6 py-4 w-24 font-semibold text-center">강도</th>
                            </tr>
                        </thead>"""

old_tbody = """                                        <td className="px-6 py-5">
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
                                        </td>

                                        <td className="px-6 py-5 text-center">
                                            <DirectionBadge type={item.direction} />
                                        </td>

                                        <td className="px-6 py-5 text-center">
                                            <div className="flex justify-center gap-0.5">
                                                {[...Array(5)].map((_, idx) => (
                                                    <Star 
                                                        key={idx} 
                                                        className={cn(
                                                            "w-3.5 h-3.5", 
                                                            idx < item.stars 
                                                                ? (item.direction === '리스크' ? "fill-[#ff7c7e] text-[#ff7c7e]" : "fill-emerald-400 text-emerald-400") 
                                                                : "fill-slate-700 text-slate-700"
                                                        )} 
                                                    />
                                                ))}
                                            </div>
                                        </td>

                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2.5">
                                                <Avatar name={item.speaker} className="w-8 h-8" />
                                                <span className="text-slate-300 font-medium text-sm whitespace-nowrap">{item.speaker}</span>
                                            </div>
                                        </td>"""

new_tbody = """                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <Avatar name={item.speaker} className="w-10 h-10" />
                                                <div className="flex flex-col">
                                                    <span className="text-slate-200 font-bold text-sm whitespace-nowrap">{item.speaker}</span>
                                                    <span className="text-slate-500 text-[11px] whitespace-nowrap">{item.speakerTitle || "주요 인사"}</span>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-5">
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
                                        </td>

                                        <td className="px-6 py-5 text-center">
                                            <DirectionBadge type={item.direction} />
                                        </td>

                                        <td className="px-6 py-5 text-center">
                                            <div className="flex justify-center gap-0.5">
                                                {[...Array(5)].map((_, idx) => (
                                                    <Star 
                                                        key={idx} 
                                                        className={cn(
                                                            "w-3.5 h-3.5", 
                                                            idx < item.stars 
                                                                ? (item.direction === '리스크' ? "fill-[#ff7c7e] text-[#ff7c7e]" : "fill-emerald-400 text-emerald-400") 
                                                                : "fill-slate-700 text-slate-700"
                                                        )} 
                                                    />
                                                ))}
                                            </div>
                                        </td>"""

content = content.replace(old_table_header, new_table_header)
content = content.replace(old_tbody, new_tbody)

# Since speakerTitle might not exist in MOCK_DATA.marketImpact, we should add it.
content = re.sub(
    r'(speaker: "일론 머스크")',
    r'\1, speakerTitle: "테슬라 CEO / X 오너"',
    content
)
content = re.sub(
    r'(speaker: "도널드 트럼프")',
    r'\1, speakerTitle: "미국 대통령"',
    content
)
content = re.sub(
    r'(speaker: "이창용")',
    r'\1, speakerTitle: "전 한국은행 총재"',
    content
)
content = re.sub(
    r'(speaker: "케빈 워시")',
    r'\1, speakerTitle: "연준 의장 지명자"',
    content
)

with open(filepath, "w") as f:
    f.write(content)
