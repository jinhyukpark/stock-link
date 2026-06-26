import { AlertCircle, TrendingUp, TrendingDown, MessageSquare, Twitter, Globe, Megaphone, CheckCircle2, XCircle, ArrowRight, Zap, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function SocialAnalysisView() {
    return (
        <div className="space-y-8 pb-12 animate-in fade-in duration-500">
            {/* 1. 주요 하이라이트 */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Megaphone className="w-5 h-5 text-red-500" />
                    주요 하이라이트
                </h2>
                <Card className="bg-[#151921] border-white/10 p-6">
                    <ul className="space-y-3 text-sm text-gray-300 leading-relaxed">
                        <li className="flex gap-2">
                            <span className="text-gray-500 font-mono">①</span>
                            <span><strong className="text-white">코스피 6,500선 돌파 및 신고가 경신:</strong> 한국 1분기 실질 GDP 성장률이 전 분기 대비 1.7%를 기록해 시장 예상치(0.9%)를 두 배 상회, SK하이닉스 역대 최대 분기 실적(영업이익 37.6조 원·이익률 72%), 삼성전자 사상 최대 분기 실적(영업이익 57.2조 원, YoY +755%) 등 '어닝 서프라이즈 3중주'로 코스피가 사상 최고치 행진을 이어가고 있으며, 골드만삭스는 코스피 12개월 목표치를 8,000으로 상향 조정했다.</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="text-gray-500 font-mono">②</span>
                            <span><strong className="text-white">테슬라 Q1 2026 어닝콜 — Capex 25% 상향 및 Optimus 양산 선언:</strong> 일론 머스크가 설비투자를 250억 달러 이상으로 상향하고 연말까지 옵티머스 로봇 100만 대 규모 첫 생산라인을 목표로 한다고 밝혔으나, 매출 소폭 하회·capex 급증 우려로 시간 외 상승분을 반납하는 혼재된 반응이 나타났다.</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="text-gray-500 font-mono">③</span>
                            <span><strong className="text-white">트럼프 발언의 증시 변동성 지배력 재확인:</strong> 블룸버그·펀드스트랫 분석에 따르면 S&P500 상승 상위 5거래일·하락 상위 5거래일이 모두 트럼프 Truth Social 발언과 직결됐으며, 스콧 베센트 재무장관은 대법원 판결에도 관세 세수가 '사실상 변동 없을 것'이라며 관세 불확실성을 지속시켰다.</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="text-gray-500 font-mono">④</span>
                            <span><strong className="text-white">케빈 워시 연준 의장 지명자 매파 발언:</strong> 상원 청문회에서 대차대조표 축소 의지 및 '레짐 체인지'를 천명, 5월 15일 파월 퇴임 이후 금리 인상·양적 긴축 가속화 우려가 확산되며 모틀리 풀은 "관세보다 워시 취임이 증시에 더 큰 위협"이라고 경고했다.</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="text-gray-500 font-mono">⑤</span>
                            <span><strong className="text-white">국내 증권사 AI·방산·원전 비중확대 의견 유지:</strong> 코스피 주간 4.58% 상승(6,475.63 마감) 속에 NH투자증권·삼성증권·미래에셋증권 애널리스트들이 반도체·방산·전력기기·원전 업종 비중확대 의견을 유지하며 추가 상승 에너지에 주목했다.</span>
                        </li>
                    </ul>
                </Card>
            </section>

            {/* 2. 종합 요약 테이블 */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-400" />
                    종합 요약 테이블
                </h2>
                <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#151921]">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-[#1e2330] text-gray-400 font-medium">
                            <tr>
                                <th className="px-4 py-3 whitespace-nowrap">영향도</th>
                                <th className="px-4 py-3 whitespace-nowrap">발언자</th>
                                <th className="px-4 py-3 whitespace-nowrap">직책/소속</th>
                                <th className="px-4 py-3 whitespace-nowrap">플랫폼</th>
                                <th className="px-4 py-3 min-w-[300px]">핵심 발언 요약</th>
                                <th className="px-4 py-3 min-w-[150px]">긍정 종목 (🇰🇷/🇺🇸)</th>
                                <th className="px-4 py-3 min-w-[150px]">부정 종목 (🇰🇷/🇺🇸)</th>
                                <th className="px-4 py-3 whitespace-nowrap">시간</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-gray-300">
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="px-4 py-4"><Badge className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border-0">높음</Badge></td>
                                <td className="px-4 py-4 font-bold text-white">도널드 트럼프</td>
                                <td className="px-4 py-4 text-gray-400">미국 대통령</td>
                                <td className="px-4 py-4">Truth Social</td>
                                <td className="px-4 py-4 leading-relaxed">트럼프 발언이 S&P500 상·하위 5거래일 모두 좌우. 관세 정책이 미국 제조업 부활·재정 적자 감소에 도움 발언 지속</td>
                                <td className="px-4 py-4">
                                    <div className="flex flex-col gap-1 text-xs">
                                        <span className="text-red-400">🇰🇷 한화오션</span>
                                        <span className="text-red-400">🇰🇷 HD현대중공업</span>
                                        <span className="text-red-400">🇺🇸 S&P500 지수 전반</span>
                                    </div>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="flex flex-col gap-1 text-xs">
                                        <span className="text-blue-400">🇰🇷 삼성전자</span>
                                        <span className="text-blue-400">🇰🇷 현대차</span>
                                        <span className="text-blue-400">🇺🇸 Tesla</span>
                                        <span className="text-blue-400">🇺🇸 Apple</span>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-gray-500 text-xs">2026-04-26</td>
                            </tr>
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="px-4 py-4"><Badge className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border-0">높음</Badge></td>
                                <td className="px-4 py-4 font-bold text-white">일론 머스크</td>
                                <td className="px-4 py-4 text-gray-400">Tesla CEO</td>
                                <td className="px-4 py-4">어닝콜 (Q1 2026)</td>
                                <td className="px-4 py-4 leading-relaxed">Capex 250억 달러로 25% 상향, 연말까지 Optimus 100만 대 생산라인 목표. EPS $0.41 서프라이즈, 매출 소폭 하회</td>
                                <td className="px-4 py-4">
                                    <div className="flex flex-col gap-1 text-xs">
                                        <span className="text-red-400">🇰🇷 삼성전자</span>
                                        <span className="text-red-400">🇰🇷 SK하이닉스</span>
                                        <span className="text-red-400">🇺🇸 Tesla</span>
                                        <span className="text-red-400">🇺🇸 NVIDIA</span>
                                    </div>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="flex flex-col gap-1 text-xs">
                                        <span className="text-blue-400">🇺🇸 Tesla (매출 하회, capex 급증)</span>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-gray-500 text-xs">2026-04-22<br/>21:00(ET)</td>
                            </tr>
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="px-4 py-4"><Badge className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border-0">높음</Badge></td>
                                <td className="px-4 py-4 font-bold text-white">이창용</td>
                                <td className="px-4 py-4 text-gray-400">한국은행 총재</td>
                                <td className="px-4 py-4">기자간담회</td>
                                <td className="px-4 py-4 leading-relaxed">기준금리 2.50% 7연속 동결. 중동 전쟁으로 물가 상방·성장 하방 동시 증대. 2026년 성장률 2% 하회, 물가 2.2% 상당폭 상회 경고</td>
                                <td className="px-4 py-4">
                                    <div className="flex flex-col gap-1 text-xs">
                                        <span className="text-red-400">🇰🇷 KB금융</span>
                                        <span className="text-red-400">🇰🇷 신한지주</span>
                                        <span className="text-red-400">🇰🇷 삼성전자</span>
                                    </div>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="flex flex-col gap-1 text-xs">
                                        <span className="text-blue-400">🇰🇷 현대건설</span>
                                        <span className="text-blue-400">🇰🇷 건설사 전반</span>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-gray-500 text-xs">2026-04-10<br/>12:00(KST)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* 3. 시장 영향도: 높음 상세 분석 */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    시장 영향도: 높음 — 상세 분석
                </h2>
                <div className="space-y-4">
                    {/* Trump Card */}
                    <Card className="bg-[#151921] border-white/10 p-0 overflow-hidden flex flex-col md:flex-row">
                        <div className="p-6 md:w-1/4 bg-[#1e2330] border-r border-white/5">
                            <h3 className="font-bold text-white text-lg">도널드 트럼프</h3>
                            <p className="text-sm text-gray-400 mb-4">미국 대통령</p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <MessageSquare className="w-3.5 h-3.5" />
                                Truth Social
                            </div>
                            <div className="text-xs text-gray-500 mt-1">2026-04-26</div>
                        </div>
                        <div className="p-6 md:w-3/4 space-y-4">
                            <div>
                                <h4 className="text-sm font-bold text-gray-300 mb-2">발언 요약</h4>
                                <p className="text-sm text-gray-400 leading-relaxed">블룸버그·펀드스트랫 리서치에 따르면 트럼프 취임 이후 S&P500 상승 상위 5거래일·하락 상위 5거래일이 모두 트럼프 Truth Social 게시물·발언과 직결됐다고 밝혀짐. 관세 정책이 미국 제조업 부활·재정적자 감소·인플레이션 억제에 도움이 된다는 취지 발언 지속. 최근 관세 발언이 시장의 핵심 리스크 변수로 작용 중.</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-red-500/5 border border-red-500/10 rounded-lg p-3">
                                    <h4 className="text-xs font-bold text-red-400 mb-2 flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" /> 긍정 종목</h4>
                                    <ul className="text-xs text-gray-400 space-y-1">
                                        <li><span className="text-red-400">🇰🇷 한화오션(042660)</span> - 미국 조선업 협력 기대</li>
                                        <li><span className="text-red-400">🇰🇷 HD현대중공업(329180)</span> - 미국 제조업 투자 확대 기대</li>
                                        <li><span className="text-red-400">🇺🇸 S&P500 지수 전반(SPY)</span> - 관세 완화 발언 시 반등 기대</li>
                                    </ul>
                                </div>
                                <div className="bg-blue-500/5 border border-blue-500/10 rounded-lg p-3">
                                    <h4 className="text-xs font-bold text-blue-400 mb-2 flex items-center gap-1"><TrendingDown className="w-3.5 h-3.5" /> 부정 종목</h4>
                                    <ul className="text-xs text-gray-400 space-y-1">
                                        <li><span className="text-blue-400">🇰🇷 삼성전자(005930)</span> - 관세 강화 시 수출 타격 우려</li>
                                        <li><span className="text-blue-400">🇰🇷 현대차(005380)</span> - 미국 관세 15% 적용 영업이익 감소</li>
                                        <li><span className="text-blue-400">🇺🇸 Tesla(TSLA)</span> - 관세 불확실성 및 불매 영향</li>
                                        <li><span className="text-blue-400">🇺🇸 Apple(AAPL)</span> - 공급망 관세 부담 지속</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-3 text-sm">
                                <span className="font-bold text-gray-300">시장 영향 분석:</span> <span className="text-gray-400">트럼프 발언이 단순 SNS를 넘어 증시 최대 변동성 요인으로 구조화됨. 관세 완화 시 수출주 급등·강화 시 수출주 급락의 이분법적 구조 고착화. 스콧 베센트의 관세 재부과 의지와 맞물려 단기 불확실성 지속.</span>
                            </div>
                        </div>
                    </Card>

                    {/* Musk Card */}
                    <Card className="bg-[#151921] border-white/10 p-0 overflow-hidden flex flex-col md:flex-row">
                        <div className="p-6 md:w-1/4 bg-[#1e2330] border-r border-white/5">
                            <h3 className="font-bold text-white text-lg">일론 머스크</h3>
                            <p className="text-sm text-gray-400 mb-4">Tesla CEO</p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <MessageSquare className="w-3.5 h-3.5" />
                                어닝콜 (Q1 2026)
                            </div>
                            <div className="text-xs text-gray-500 mt-1">2026-04-22</div>
                        </div>
                        <div className="p-6 md:w-3/4 space-y-4">
                            <div>
                                <h4 className="text-sm font-bold text-gray-300 mb-2">발언 요약</h4>
                                <p className="text-sm text-gray-400 leading-relaxed">Tesla Q1 2026 어닝콜에서 2026년 설비투자(Capex)를 기존 200억 달러 이상에서 250억 달러 이상으로 25% 상향 발표. 프리몬트 공장에서 Q2부터 Optimus 로봇 대규모 생산 준비, 연말까지 100만 대 규모 첫 생산라인 목표 공개.</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-red-500/5 border border-red-500/10 rounded-lg p-3">
                                    <h4 className="text-xs font-bold text-red-400 mb-2 flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" /> 긍정 종목</h4>
                                    <ul className="text-xs text-gray-400 space-y-1">
                                        <li><span className="text-red-400">🇰🇷 삼성전자(005930)</span> - AI 로봇 투자 확대로 메모리 수요 증가</li>
                                        <li><span className="text-red-400">🇰🇷 SK하이닉스(000660)</span> - AI 인프라 투자 확대 수혜</li>
                                        <li><span className="text-red-400">🇺🇸 Tesla(TSLA)</span> - EPS 어닝 서프라이즈</li>
                                        <li><span className="text-red-400">🇺🇸 NVIDIA(NVDA)</span> - AI 투자 확대 시 엔비디아 칩 수요 증가</li>
                                    </ul>
                                </div>
                                <div className="bg-blue-500/5 border border-blue-500/10 rounded-lg p-3">
                                    <h4 className="text-xs font-bold text-blue-400 mb-2 flex items-center gap-1"><TrendingDown className="w-3.5 h-3.5" /> 부정 종목</h4>
                                    <ul className="text-xs text-gray-400 space-y-1">
                                        <li><span className="text-blue-400">🇺🇸 Tesla(TSLA)</span> - 매출 소폭 하회, capex 급증으로 단기 수익성 우려</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-3 text-sm">
                                <span className="font-bold text-gray-300">시장 영향 분석:</span> <span className="text-gray-400">Optimus 로봇 양산 로드맵은 AI·로봇 섹터 전반에 촉매가 될 수 있으나, 250억 달러 capex 부담과 소비자 불매 운동이 단기 주가 상승의 걸림돌. 국내 메모리 반도체 수혜는 중장기적으로 유효.</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>

            {/* 4. 긍정/부정 종목 종합 */}
            <section className="space-y-6">
                <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-3">
                        <TrendingUp className="w-5 h-5 text-red-500" />
                        긍정 종목 종합 (상승/호재 기대)
                    </h2>
                    <div className="overflow-x-auto rounded-xl border border-red-500/20 bg-red-500/5">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-red-500/10 text-red-400 font-medium border-b border-red-500/20">
                                <tr>
                                    <th className="px-4 py-3 w-16 text-center">시장</th>
                                    <th className="px-4 py-3">종목명</th>
                                    <th className="px-4 py-3">티커</th>
                                    <th className="px-4 py-3">언급 발언자</th>
                                    <th className="px-4 py-3">긍정 사유 요약</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-red-500/10 text-gray-300">
                                <tr>
                                    <td className="px-4 py-3 text-center">🇰🇷</td>
                                    <td className="px-4 py-3 font-bold text-white">삼성전자</td>
                                    <td className="px-4 py-3 text-gray-500">005930</td>
                                    <td className="px-4 py-3 text-gray-400">트럼프, 머스크, 이창용, SK하이닉스</td>
                                    <td className="px-4 py-3">1Q26 영업이익 57.2조 원(YoY +755%) 사상 최대, AI 반도체 호황</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 text-center">🇰🇷</td>
                                    <td className="px-4 py-3 font-bold text-white">SK하이닉스</td>
                                    <td className="px-4 py-3 text-gray-500">000660</td>
                                    <td className="px-4 py-3 text-gray-400">머스크, 이창용, 골드만삭스</td>
                                    <td className="px-4 py-3">1Q26 영업이익 37.6조 원(이익률 72%) 역대 최대, HBM3E 독주</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 text-center">🇺🇸</td>
                                    <td className="px-4 py-3 font-bold text-white">NVIDIA</td>
                                    <td className="px-4 py-3 text-gray-500">NVDA</td>
                                    <td className="px-4 py-3 text-gray-400">머스크, SK하이닉스, 삼성전자</td>
                                    <td className="px-4 py-3">Q4 FY2026 매출 $68.1B(YoY +80%), 시총 5조 달러 돌파</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-3">
                        <TrendingDown className="w-5 h-5 text-blue-500" />
                        부정 종목 종합 (하락/악재 우려)
                    </h2>
                    <div className="overflow-x-auto rounded-xl border border-blue-500/20 bg-blue-500/5">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-blue-500/10 text-blue-400 font-medium border-b border-blue-500/20">
                                <tr>
                                    <th className="px-4 py-3 w-16 text-center">시장</th>
                                    <th className="px-4 py-3">종목명</th>
                                    <th className="px-4 py-3">티커</th>
                                    <th className="px-4 py-3">언급 발언자</th>
                                    <th className="px-4 py-3">부정 사유 요약</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-blue-500/10 text-gray-300">
                                <tr>
                                    <td className="px-4 py-3 text-center">🇰🇷</td>
                                    <td className="px-4 py-3 font-bold text-white">삼성전자</td>
                                    <td className="px-4 py-3 text-gray-500">005930</td>
                                    <td className="px-4 py-3 text-gray-400">트럼프, 베센트</td>
                                    <td className="px-4 py-3">관세 강화 발언 시 수출 타격 우려</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 text-center">🇰🇷</td>
                                    <td className="px-4 py-3 font-bold text-white">현대차</td>
                                    <td className="px-4 py-3 text-gray-500">005380</td>
                                    <td className="px-4 py-3 text-gray-400">트럼프, 현대자동차</td>
                                    <td className="px-4 py-3">미국 관세 15% 적용 영업이익 감소, 1Q26 YoY -30.8%</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 text-center">🇺🇸</td>
                                    <td className="px-4 py-3 font-bold text-white">Tesla</td>
                                    <td className="px-4 py-3 text-gray-500">TSLA</td>
                                    <td className="px-4 py-3 text-gray-400">트럼프, 머스크, 베센트</td>
                                    <td className="px-4 py-3">관세 불확실성·소비자 불매·capex 250억 달러 급증 악재</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* 5. 섹터별 영향 분석 & 6. 투자 시사점 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <section className="space-y-4">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <Globe className="w-5 h-5 text-purple-400" />
                        섹터별 영향 분석
                    </h2>
                    <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#151921] h-[300px]">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-[#1e2330] text-gray-400 font-medium sticky top-0">
                                <tr>
                                    <th className="px-4 py-3">섹터</th>
                                    <th className="px-4 py-3">발언 수</th>
                                    <th className="px-4 py-3">전반적 방향</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-gray-300">
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="px-4 py-3 font-medium text-white">반도체 / AI 인프라</td>
                                    <td className="px-4 py-3 text-gray-500">7건</td>
                                    <td className="px-4 py-3"><Badge className="bg-red-500/20 text-red-400 border-0">긍정</Badge></td>
                                </tr>
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="px-4 py-3 font-medium text-white">금융 / 전체 시장</td>
                                    <td className="px-4 py-3 text-gray-500">4건</td>
                                    <td className="px-4 py-3"><Badge className="bg-gray-500/20 text-gray-400 border-0">중립</Badge></td>
                                </tr>
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="px-4 py-3 font-medium text-white">무역·관세 / 수출</td>
                                    <td className="px-4 py-3 text-gray-500">2건</td>
                                    <td className="px-4 py-3"><Badge className="bg-blue-500/20 text-blue-400 border-0">부정</Badge></td>
                                </tr>
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="px-4 py-3 font-medium text-white">전기차 / AI 로봇</td>
                                    <td className="px-4 py-3 text-gray-500">1건</td>
                                    <td className="px-4 py-3"><Badge className="bg-yellow-500/20 text-yellow-400 border-0">혼재</Badge></td>
                                </tr>
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="px-4 py-3 font-medium text-white">방산 / 원전 / 전력</td>
                                    <td className="px-4 py-3 text-gray-500">1건</td>
                                    <td className="px-4 py-3"><Badge className="bg-red-500/20 text-red-400 border-0">긍정</Badge></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-orange-400" />
                        투자 시사점
                    </h2>
                    <div className="overflow-y-auto rounded-xl border border-white/10 bg-[#151921] h-[300px] p-4 space-y-4">
                        <div className="space-y-2 border-b border-white/5 pb-4">
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <span className="text-orange-500">🔥</span> AI 반도체 슈퍼사이클 — 코스피 신고가 랠리 지속
                            </h3>
                            <p className="text-sm text-gray-400 leading-relaxed">삼성전자(영업이익 YoY +755%) SK하이닉스(영업이익률 72%)·NVIDIA(시총 5조 달러)의 동시 사상 최대 실적과 한국 GDP 1.7% 서프라이즈, 골드만삭스 코스피 목표 8,000 상향이 맞물리며 AI 반도체 중심 코스피 상승 랠리의 펀더멘털이 견고히 확인됨.</p>
                        </div>
                        <div className="space-y-2 border-b border-white/5 pb-4">
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <span className="text-orange-500">⚠️</span> 케빈 워시 '레짐 체인지' — AI 고밸류 성장주의 최대 리스크
                            </h3>
                            <p className="text-sm text-gray-400 leading-relaxed">5월 15일 파월 퇴임 이후 워시의 매파적 대차대조표 축소 정책이 현실화될 경우 AI 고밸류에이션 종목에 구조적 할인율 상승 압박 가능. 5월 15일 전후 포지션 점검 필요.</p>
                        </div>
                        <div className="space-y-2 border-b border-white/5 pb-4">
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <span className="text-red-500">🚗</span> 관세 구조적 리스크 — 한국 수출 제조업 이익 압박 지속
                            </h3>
                            <p className="text-sm text-gray-400 leading-relaxed">베센트의 '관세 세수 virtually unchanged' 발언과 현대차 영업이익 YoY -30.8%는 관세 리스크가 구조적 이익 압박 요인임을 확인. 수출 대형주의 이익 전망 하향 조정 필요성 존재.</p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <span className="text-blue-400">🤖</span> Optimus 로봇 양산 — 중장기 메모리·장비 수혜 체인
                            </h3>
                            <p className="text-sm text-gray-400 leading-relaxed">머스크의 연말 100만 대 목표는 AI 로봇 시대의 메모리·센서·장비 수요 폭발을 예고. SK하이닉스·한미반도체 등 공급 체인 기업 중장기 수혜 기대.</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
