import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# First, let's update the mock data structure to include speakers for sectors
old_mock_data = """const MOCK_DATA = {
    overview: ["""

new_mock_data = """const MOCK_DATA = {
    overview: ["""

# Modify the sectorSummary data in the component to include speakers (for the mock data context)
# Looking for the sectorSummary array in the file
import re
sector_summary_match = re.search(r'sectorSummary:\s*\[([\s\S]*?)\]\s*,', content)

if sector_summary_match:
    original_sectors = sector_summary_match.group(1)
    
    # Simple replacement to add speakers to the mock data
    new_sectors = original_sectors.replace('{ name: "반도체/AI", positive: 5, negative: 1, comment: "HBM 수요 지속 및 AI 인프라 투자 확대 기대감으로 강한 수혜 예상" }', 
                                         '{ name: "반도체/AI", positive: 5, negative: 1, comment: "HBM 수요 지속 및 AI 인프라 투자 확대 기대감으로 강한 수혜 예상", speakers: ["젠슨 황", "일론 머스크", "마크 저커버그"] }')
    new_sectors = new_sectors.replace('{ name: "금융/은행", positive: 1, negative: 4, comment: "금리 인하 지연 가능성 및 부동산 PF 리스크로 인한 부정적 영향 우려" }', 
                                         '{ name: "금융/은행", positive: 1, negative: 4, comment: "금리 인하 지연 가능성 및 부동산 PF 리스크로 인한 부정적 영향 우려", speakers: ["제롬 파월", "이창용"] }')
    new_sectors = new_sectors.replace('{ name: "자동차/수출", positive: 2, negative: 3, comment: "관세 우려 및 수출 경계감 혼재" }', 
                                         '{ name: "자동차/수출", positive: 2, negative: 3, comment: "관세 우려 및 수출 경계감 혼재", speakers: ["도널드 트럼프", "조 바이든"] }')
    new_sectors = new_sectors.replace('{ name: "바이오/헬스케어", positive: 3, negative: 1, comment: "신약 파이프라인 기대감 및 금리 인하 수혜 전망" }', 
                                         '{ name: "바이오/헬스케어", positive: 3, negative: 1, comment: "신약 파이프라인 기대감 및 금리 인하 수혜 전망", speakers: ["앨버트 불라", "고한승"] }')
    new_sectors = new_sectors.replace('{ name: "IT/소프트웨어", positive: 4, negative: 2, comment: "B2B SaaS 수요 증가 및 클라우드 전환 가속화 긍정적" }', 
                                         '{ name: "IT/소프트웨어", positive: 4, negative: 2, comment: "B2B SaaS 수요 증가 및 클라우드 전환 가속화 긍정적", speakers: ["사티아 나델라", "순다르 피차이"] }')
    
    content = content.replace(original_sectors, new_sectors)

# Now update the UI to display the speakers below the gauge bar
old_ui_block = """                                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden flex">
                                        <div className="bg-emerald-500 h-full transition-all duration-1000" style={{ width: `${posPct}%` }} />
                                        <div className="bg-[#ff7c7e] h-full transition-all duration-1000" style={{ width: `${100 - posPct}%` }} />
                                    </div>
                                </div>
                            </div>
                        );"""

new_ui_block = """                                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden flex mb-4">
                                        <div className="bg-emerald-500 h-full transition-all duration-1000" style={{ width: `${posPct}%` }} />
                                        <div className="bg-[#ff7c7e] h-full transition-all duration-1000" style={{ width: `${100 - posPct}%` }} />
                                    </div>
                                    
                                    {/* Speakers tags added as requested */}
                                    <div className="pt-3 border-t border-white/5 flex flex-wrap gap-1.5">
                                        <span className="text-[10px] text-slate-500 mr-1 mt-0.5">주요 언급자:</span>
                                        {sector.speakers ? sector.speakers.map((speaker, idx) => (
                                            <span key={idx} className="text-[11px] text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded-full border border-slate-700/50">
                                                #{speaker}
                                            </span>
                                        )) : (
                                            <span className="text-[11px] text-slate-500 italic">관련 데이터 없음</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );"""

content = content.replace(old_ui_block, new_ui_block)

with open(filepath, "w") as f:
    f.write(content)
