import os
import re

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

old_gauge_html = """                                    <div className="h-2 w-full flex rounded-full overflow-hidden bg-slate-800/80">
                                        <div className="bg-emerald-500" style={{width: `${posPct}%`}} />
                                        <div className="bg-[#ff7c7e]" style={{width: `${100-posPct}%`}} />
                                    </div>
                                </div>
                            </div>
                        )"""

new_gauge_html = """                                    <div className="h-2 w-full flex rounded-full overflow-hidden bg-slate-800/80 mb-4">
                                        <div className="bg-emerald-500" style={{width: `${posPct}%`}} />
                                        <div className="bg-[#ff7c7e]" style={{width: `${100-posPct}%`}} />
                                    </div>
                                    
                                    <div className="pt-3 border-t border-white/5 flex flex-wrap gap-1.5 mt-auto">
                                        <span className="text-[10px] text-slate-500 mr-1 mt-0.5 font-medium">주요 언급자:</span>
                                        {sector.speakers ? sector.speakers.map((speaker, idx) => (
                                            <span key={idx} className="text-[10px] text-slate-300 bg-slate-800/50 px-2 py-0.5 rounded-sm border border-slate-700/50 transition-colors hover:bg-slate-700/50">
                                                #{speaker}
                                            </span>
                                        )) : (
                                            <span className="text-[10px] text-slate-500 italic">관련 데이터 없음</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )"""

content = content.replace(old_gauge_html, new_gauge_html)

# Add mock data speakers if missing
if 'speakers: ["젠슨 황", "일론 머스크"' not in content:
    content = content.replace('{ name: "반도체/AI", positive: 5, negative: 1, comment: "HBM 수요 지속 및 AI 인프라 투자 확대 기대감으로 강한 수혜 예상" }', 
                             '{ name: "반도체/AI", positive: 5, negative: 1, comment: "HBM 수요 지속 및 AI 인프라 투자 확대 기대감으로 강한 수혜 예상", speakers: ["젠슨 황", "일론 머스크", "마크 저커버그"] }')
    content = content.replace('{ name: "금융/은행", positive: 1, negative: 4, comment: "금리 인하 지연 가능성 및 부동산 PF 리스크로 인한 부정적 영향 우려" }', 
                             '{ name: "금융/은행", positive: 1, negative: 4, comment: "금리 인하 지연 가능성 및 부동산 PF 리스크로 인한 부정적 영향 우려", speakers: ["제롬 파월", "이창용"] }')
    content = content.replace('{ name: "자동차/수출", positive: 2, negative: 3, comment: "관세 우려 및 수출 경계감 혼재" }', 
                             '{ name: "자동차/수출", positive: 2, negative: 3, comment: "관세 우려 및 수출 경계감 혼재", speakers: ["도널드 트럼프", "조 바이든"] }')
    content = content.replace('{ name: "바이오/헬스케어", positive: 3, negative: 1, comment: "신약 파이프라인 기대감 및 금리 인하 수혜 전망" }', 
                             '{ name: "바이오/헬스케어", positive: 3, negative: 1, comment: "신약 파이프라인 기대감 및 금리 인하 수혜 전망", speakers: ["앨버트 불라", "고한승"] }')
    content = content.replace('{ name: "IT/소프트웨어", positive: 4, negative: 2, comment: "B2B SaaS 수요 증가 및 클라우드 전환 가속화 긍정적" }', 
                             '{ name: "IT/소프트웨어", positive: 4, negative: 2, comment: "B2B SaaS 수요 증가 및 클라우드 전환 가속화 긍정적", speakers: ["사티아 나델라", "순다르 피차이"] }')

with open(filepath, "w") as f:
    f.write(content)
