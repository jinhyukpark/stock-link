import { useState } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { TrendingUp, TrendingDown, Globe, Megaphone, Target, Calendar as CalendarIcon, ChevronDown, BarChart3, Newspaper, Twitter, Info, Star, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Mock Data
const MOCK_DATA = {
    "2026-04-26": {
        highlights: [
            "일론 머스크, X에서 AI 로봇 및 반도체 공급망 이슈 언급 → 삼성전자/SK하이닉스 단기 주목",
            "도널드 트럼프, Truth Social에서 관세 정책 재차 강조 → 자동차/수출주 하방 압력 우려",
            "미국 핀테크 유튜버 3인, 연준의 금리 동결 전망 언급 → 금융주 긍정 시그널",
            "국내 경제 유튜버, 2차전지 섹터 조정 경고 → 관련주 변동성 확대 예상"
        ],
        table: [
            { impact: "긍정", stars: 3, speaker: "일론 머스크", platform: "X (Twitter)", summary: "Optimus 로봇 양산 라인 구축 위해 250억 달러 설비투자 상향 발표", related: "삼성전자, SK하이닉스" },
            { impact: "부정", stars: 3, speaker: "도널드 트럼프", platform: "Truth Social", summary: "미국 제조업 부활 위한 15% 보편 관세 부과 필요성 강경 발언", related: "현대차, 기아" },
            { impact: "중립", stars: 2, speaker: "미국 경제 유튜버 A", platform: "YouTube", summary: "AI 전력 수요 폭발로 데이터센터 인프라 투자 지속될 것", related: "LS일렉트릭" },
            { impact: "긍정", stars: 1, speaker: "한국 애널리스트 B", platform: "News", summary: "조선업 슈퍼사이클 진입 및 미국 함정 MRO 사업 수혜 기대", related: "한화오션, HD현대중공업" },
            { impact: "부정", stars: 2, speaker: "월가 핀테크 블로거 C", platform: "X (Twitter)", summary: "소비자 물가 지수 상승 여파로 하반기 금리 인하 물건너갔다", related: "건설주 전반" }
        ],
        positiveStocks: [
            { ticker: "005930", name: "삼성전자", reason: "AI 로봇 투자 확대로 메모리 반도체 수요 급증 기대", influencer: "일론 머스크" },
            { ticker: "000660", name: "SK하이닉스", reason: "역대 최대 실적 및 HBM 독주 체제 지속", influencer: "일론 머스크, 한국 애널리스트" },
            { ticker: "042660", name: "한화오션", reason: "미국 함정 유지보수(MRO) 사업 및 조선업 슈퍼사이클", influencer: "한국 애널리스트 B" }
        ],
        negativeStocks: [
            { ticker: "005380", name: "현대차", reason: "미국 보편 관세 15% 적용 시 수출 타격 우려", influencer: "도널드 트럼프" },
            { ticker: "TSLA", name: "Tesla", reason: "단기 Capex 급증으로 인한 수익성 악화 우려", influencer: "일론 머스크" },
            { ticker: "N/A", name: "건설주 전반", reason: "금리 동결 장기화로 인한 프로젝트 파이낸싱 부담", influencer: "월가 핀테크 블로거 C" }
        ],
        sectors: [
            { name: "반도체", positive: 8, negative: 1 },
            { name: "플랫폼/IT", positive: 4, negative: 2 },
            { name: "금융", positive: 5, negative: 4 },
            { name: "에너지/전력", positive: 6, negative: 0 },
            { name: "2차전지", positive: 2, negative: 7 },
            { name: "바이오/헬스", positive: 3, negative: 3 }
        ],
        insights: [
            { title: "AI 반도체 및 전력 인프라 랠리 지속", desc: "글로벌 테크 기업들의 설비투자(Capex) 상향이 이어지며 HBM 및 전력기기 관련주의 모멘텀이 견고합니다." },
            { title: "관세 및 금리 리스크 모니터링", desc: "미국 정치권의 관세 발언과 인플레이션 고착화 우려로 수출 중심의 자동차 및 금리 민감주(건설)의 변동성에 유의해야 합니다." },
            { title: "조선업 슈퍼사이클 진입", desc: "미국 해군 MRO 사업 진출 등 강력한 호재가 뒷받침되며 장기적인 수익성 개선이 예상됩니다." }
        ]
    },
    "default": {
        highlights: [
            "짐 크레이머, CNBC에서 에너지 섹터 비중 축소 권고 → 정유주 하방 압력",
            "한국 애널리스트 C, 뉴스 인터뷰에서 K-뷰티 수출 호조 강조 → 화장품 관련주 강세",
            "미국 핀테크 블로거 B, X에서 금리 인하 지연 가능성 시사 → 성장주 변동성 주의"
        ],
        table: [
            { impact: "긍정", stars: 2, speaker: "한국 애널리스트 C", platform: "News", summary: "미국 내 K-뷰티 점유율 확대 및 1분기 수출 서프라이즈 발표", related: "아모레퍼시픽, 실리콘투" },
            { impact: "부정", stars: 3, speaker: "짐 크레이머", platform: "CNBC", summary: "유가 정점 통과 가능성. 에너지 관련주 비중 축소 의견 제시", related: "S-Oil, GS" },
            { impact: "부정", stars: 2, speaker: "미국 핀테크 블로거 B", platform: "X (Twitter)", summary: "예상보다 강한 고용 지표로 연내 금리 인하 사실상 무산 위기", related: "성장주 전반" }
        ],
        positiveStocks: [
            { ticker: "090430", name: "아모레퍼시픽", reason: "미국 매출 고성장 및 글로벌 포트폴리오 다변화 성공", influencer: "한국 애널리스트 C" },
            { ticker: "257720", name: "실리콘투", reason: "인디 뷰티 브랜드 수출 급증에 따른 구조적 성장", influencer: "한국 애널리스트 C" }
        ],
        negativeStocks: [
            { ticker: "010950", name: "S-Oil", reason: "유가 하락 및 정제마진 축소 우려로 인한 실적 둔화 전망", influencer: "짐 크레이머" },
            { ticker: "N/A", name: "바이오/IT 성장주", reason: "고금리 환경 지속으로 인한 밸류에이션 할인 압박", influencer: "미국 핀테크 블로거 B" }
        ],
        sectors: [
            { name: "화장품/소비재", positive: 9, negative: 0 },
            { name: "금융", positive: 4, negative: 2 },
            { name: "반도체", positive: 5, negative: 3 },
            { name: "에너지/전력", positive: 1, negative: 8 },
            { name: "바이오/헬스", positive: 0, negative: 6 }
        ],
        insights: [
            { title: "K-뷰티 구조적 성장세", desc: "미국을 비롯한 글로벌 시장에서 한국 화장품 브랜드의 점유율이 빠르게 확대되고 있어 중장기 투자가 유망합니다." },
            { title: "에너지 섹터 비중 조절 필요", desc: "지정학적 리스크 완화와 유가 하향 안정화로 정유/에너지 주식의 모멘텀 둔화가 예상됩니다." },
            { title: "고금리 장기화 대비", desc: "매크로 지표 호조로 금리 인하 기대가 후퇴하고 있으므로, 밸류에이션 부담이 높은 성장주의 리스크 관리가 필요합니다." }
        ]
    }
};

const ImpactBadge = ({ impact }: { impact: string }) => {
    if (impact === "긍정") return <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border-0">긍정</Badge>;
    if (impact === "부정") return <Badge className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border-0">부정</Badge>;
    return <Badge className="bg-gray-500/20 text-gray-400 hover:bg-gray-500/30 border-0">중립</Badge>;
};

const Stars = ({ count }: { count: number }) => {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3].map(i => (
                <Star key={i} className={cn("w-3.5 h-3.5", i <= count ? "fill-current text-yellow-500" : "text-gray-600")} />
            ))}
        </div>
    );
};

export default function SocialAnalysisView() {
    const [date, setDate] = useState<Date>(new Date(2026, 3, 26)); // Default to 2026-04-26

    const dateKey = format(date, "yyyy-MM-dd");
    const data = MOCK_DATA[dateKey as keyof typeof MOCK_DATA] || MOCK_DATA["default"];

    return (
        <div className="space-y-10 pb-12 animate-in fade-in duration-500">
            
            {/* Page Header Area */}
            <div className="flex flex-col gap-4 mb-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                            <BarChart3 className="w-6 h-6 text-primary" />
                            [일일 리포트] 인플루언서 증권 관련 SNS 모니터링
                        </h1>
                        <div className="flex items-center gap-2 mt-3">
                            <Badge variant="outline" className="bg-[#1e2330] text-gray-300 border-white/10 px-3 py-1 flex items-center gap-1.5"><Newspaper className="w-3.5 h-3.5"/> 미국 뉴스</Badge>
                            <Badge variant="outline" className="bg-[#1e2330] text-gray-300 border-white/10 px-3 py-1 flex items-center gap-1.5"><Newspaper className="w-3.5 h-3.5"/> 한국 뉴스</Badge>
                            <Badge variant="outline" className="bg-[#1e2330] text-gray-300 border-white/10 px-3 py-1 flex items-center gap-1.5"><Twitter className="w-3.5 h-3.5"/> 미국 SNS (X)</Badge>
                        </div>
                    </div>

                    {/* Date Picker */}
                    <div className="flex flex-col items-end gap-2 shrink-0">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-[240px] justify-start text-left font-normal bg-[#151921] border-white/10 text-white hover:bg-white/5 hover:text-white",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                                    {date ? format(date, "yyyy년 MM월 dd일", { locale: ko }) : <span>날짜를 선택하세요</span>}
                                    <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-[#151921] border-white/10" align="end">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={(d) => d && setDate(d)}
                                    initialFocus
                                    className="bg-[#151921] text-white"
                                />
                            </PopoverContent>
                        </Popover>
                        <div className="text-xs text-gray-500">
                            마지막 업데이트: {format(date, "yyyy.MM.dd")} 18:30
                        </div>
                    </div>
                </div>
            </div>

            {/* 1. 주요 하이라이트 */}
            <section className="space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Megaphone className="w-5 h-5 text-primary" />
                    주요 하이라이트
                </h2>
                <Card className="bg-[#151921] border-l-4 border-l-primary border-y-white/10 border-r-white/10 p-6 rounded-xl">
                    <ul className="space-y-3 text-sm text-gray-300 leading-relaxed list-disc list-inside marker:text-primary">
                        {data.highlights.map((highlight, idx) => (
                            <li key={idx}>
                                {highlight}
                            </li>
                        ))}
                    </ul>
                </Card>
            </section>

            {/* 2. 종합 요약 테이블 */}
            <section className="space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-400" />
                    종합 요약 테이블 & 시장 영향도
                </h2>
                <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#151921]">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-[#1e2330] text-gray-400 font-medium">
                            <tr>
                                <th className="px-4 py-3 whitespace-nowrap">인플루언서명</th>
                                <th className="px-4 py-3 whitespace-nowrap">플랫폼</th>
                                <th className="px-4 py-3 min-w-[300px]">발언 요약</th>
                                <th className="px-4 py-3 whitespace-nowrap">관련 종목</th>
                                <th className="px-4 py-3 whitespace-nowrap text-center">시장 영향도</th>
                                <th className="px-4 py-3 whitespace-nowrap text-center">영향 강도</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-gray-300">
                            {data.table.map((row, idx) => (
                                <tr key={idx} className="hover:bg-white/5 transition-colors">
                                    <td className="px-4 py-4 font-bold text-white whitespace-nowrap">{row.speaker}</td>
                                    <td className="px-4 py-4 whitespace-nowrap text-xs">
                                        <Badge variant="outline" className="bg-[#1e2330] border-white/10">{row.platform}</Badge>
                                    </td>
                                    <td className="px-4 py-4 leading-relaxed text-xs">{row.summary}</td>
                                    <td className="px-4 py-4 text-xs font-mono text-gray-400">
                                        {row.related}
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <ImpactBadge impact={row.impact} />
                                    </td>
                                    <td className="px-4 py-4 flex justify-center">
                                        <Stars count={row.stars} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* 3. 긍/부정 종목 종합 */}
            <section className="space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Globe className="w-5 h-5 text-purple-400" />
                    긍/부정 종목 종합
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 상승 기대 종목 */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-green-500/20">
                            <TrendingUp className="w-5 h-5 text-green-500" />
                            <h3 className="font-bold text-white">상승/호재 기대 종목</h3>
                        </div>
                        <div className="space-y-3">
                            {data.positiveStocks.map((stock, idx) => (
                                <Card key={idx} className="bg-[#151921] border-green-500/20 p-4 hover:border-green-500/40 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-white">{stock.name}</span>
                                            <span className="text-xs text-gray-500 font-mono">{stock.ticker}</span>
                                        </div>
                                        <Badge variant="outline" className="text-xs bg-green-500/10 text-green-400 border-green-500/20">호재</Badge>
                                    </div>
                                    <p className="text-sm text-gray-400 mb-3 leading-snug">{stock.reason}</p>
                                    <div className="text-xs text-gray-500 flex items-center gap-1.5">
                                        <MessageSquare className="w-3 h-3" />
                                        <span>주요 언급: {stock.influencer}</span>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* 하락 우려 종목 */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-red-500/20">
                            <TrendingDown className="w-5 h-5 text-red-500" />
                            <h3 className="font-bold text-white">하락/악재 우려 종목</h3>
                        </div>
                        <div className="space-y-3">
                            {data.negativeStocks.map((stock, idx) => (
                                <Card key={idx} className="bg-[#151921] border-red-500/20 p-4 hover:border-red-500/40 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-white">{stock.name}</span>
                                            <span className="text-xs text-gray-500 font-mono">{stock.ticker}</span>
                                        </div>
                                        <Badge variant="outline" className="text-xs bg-red-500/10 text-red-400 border-red-500/20">악재</Badge>
                                    </div>
                                    <p className="text-sm text-gray-400 mb-3 leading-snug">{stock.reason}</p>
                                    <div className="text-xs text-gray-500 flex items-center gap-1.5">
                                        <MessageSquare className="w-3 h-3" />
                                        <span>주요 언급: {stock.influencer}</span>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. 섹터별 영향 분석 */}
            <section className="space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-cyan-400" />
                    섹터별 영향 분석
                </h2>
                <Card className="bg-[#151921] border-white/10 p-6 h-[320px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data.sectors}
                            layout="vertical"
                            margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                        >
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} width={100} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#1e2330', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }}
                                cursor={{fill: 'rgba(255,255,255,0.05)'}}
                            />
                            <Bar dataKey="positive" name="긍정" stackId="a" fill="#22c55e" radius={[0, 0, 0, 0]} barSize={24} />
                            <Bar dataKey="negative" name="부정" stackId="a" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={24} />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
            </section>

            {/* 5. 투자 시사점 */}
            <section className="space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-orange-400" />
                    📌 오늘의 투자 시사점
                </h2>
                <Card className="bg-[#1e2330] border-white/10 p-6 space-y-4 rounded-xl">
                    <div className="space-y-4">
                        {data.insights.map((insight, idx) => (
                            <div key={idx}>
                                <h3 className="font-bold text-white mb-1.5 text-sm">
                                    • {insight.title}
                                </h3>
                                <p className="text-sm text-gray-400 leading-relaxed ml-3">
                                    {insight.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                    
                    <div className="pt-6 mt-4 border-t border-white/5">
                        <p className="text-xs text-gray-500 text-center">
                            본 리포트는 참고용이며 투자 권유가 아닙니다.
                        </p>
                    </div>
                </Card>
            </section>
        </div>
    );
}
