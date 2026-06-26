import { useState } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { TrendingUp, TrendingDown, Globe, Megaphone, Target, Calendar as CalendarIcon, ChevronDown, BarChart3, Newspaper, Twitter, Info, Star, MessageSquare, AlertCircle, ArrowUp, ArrowDown, MoveRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Global Ticker Chip Component
const TickerChip = ({ children }: { children: React.ReactNode }) => (
    <span className="inline-block bg-blue-900/60 border border-blue-500/30 text-blue-200 rounded-full px-2 py-0.5 text-xs font-mono font-medium mx-1">
        {children}
    </span>
);

const HighlightInfluencer = ({ children }: { children: React.ReactNode }) => (
    <strong className="text-yellow-400 font-bold">{children}</strong>
);

const HighlightPos = ({ children }: { children: React.ReactNode }) => (
    <strong className="text-green-400 font-bold">{children}</strong>
);

const HighlightNeg = ({ children }: { children: React.ReactNode }) => (
    <strong className="text-red-400 font-bold">{children}</strong>
);

// Sector Colors
const SECTOR_COLORS: Record<string, string> = {
    "반도체": "#3b82f6", // blue
    "2차전지": "#10b981", // green
    "바이오/헬스케어": "#ec4899", // purple
    "금융": "#f59e0b", // yellow
    "에너지": "#ef4444", // red
    "플랫폼/IT": "#8b5cf6" // violet
};

// Mock Data
const MOCK_DATA = {
    "2026-04-26": {
        highlights: [
            <><HighlightInfluencer>일론 머스크</HighlightInfluencer>, X에서 반도체 공급망 이슈 언급 → <TickerChip>삼성전자</TickerChip> <TickerChip>SK하이닉스</TickerChip> <HighlightPos>단기 주목</HighlightPos></>,
            <><HighlightInfluencer>도널드 트럼프</HighlightInfluencer>, Truth Social에서 관세 정책 재차 강조 → 자동차/수출주 <HighlightNeg>하방 압력 우려</HighlightNeg></>,
            <><HighlightInfluencer>미국 핀테크 유튜버 3인</HighlightInfluencer>, 금리 동결 전망 언급 → 금융주 <HighlightPos>긍정 시그널</HighlightPos></>,
            <><HighlightInfluencer>국내 경제 유튜버</HighlightInfluencer>, 2차전지 섹터 조정 <HighlightNeg>경고</HighlightNeg> → 관련주 <HighlightNeg>변동성 확대 예상</HighlightNeg></>
        ],
        table: [
            { impact: "긍정", stars: 3, speaker: "일론 머스크", platform: "X (Twitter)", summary: "Optimus 로봇 양산 라인 구축 위해 250억 달러 설비투자 상향 발표", related: ["삼성전자", "SK하이닉스"] },
            { impact: "부정", stars: 3, speaker: "도널드 트럼프", platform: "Truth Social", summary: "미국 제조업 부활 위한 15% 보편 관세 부과 필요성 강경 발언", related: ["현대차", "기아"] },
            { impact: "중립", stars: 2, speaker: "미국 경제 유튜버 A", platform: "YouTube", summary: "AI 전력 수요 폭발로 데이터센터 인프라 투자 지속될 것", related: ["LS일렉트릭"] },
            { impact: "긍정", stars: 1, speaker: "한국 애널리스트 B", platform: "News", summary: "조선업 슈퍼사이클 진입 및 미국 함정 MRO 사업 수혜 기대", related: ["한화오션", "HD현대중공업"] },
            { impact: "부정", stars: 2, speaker: "월가 핀테크 블로거 C", platform: "X (Twitter)", summary: "소비자 물가 지수 상승 여파로 하반기 금리 인하 물건너갔다", related: ["건설주 전반"] }
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
        positiveSectors: [
            { name: "반도체", value: 8 },
            { name: "플랫폼/IT", value: 4 },
            { name: "금융", value: 5 },
            { name: "에너지", value: 6 },
            { name: "바이오/헬스케어", value: 3 },
            { name: "2차전지", value: 2 }
        ],
        negativeSectors: [
            { name: "반도체", value: 1 },
            { name: "플랫폼/IT", value: 2 },
            { name: "금융", value: 4 },
            { name: "에너지", value: 0 },
            { name: "바이오/헬스케어", value: 3 },
            { name: "2차전지", value: 7 }
        ],
        sectorSummary: [
            { name: "반도체", positive: 8, negative: 1, dir: "↑" },
            { name: "에너지", positive: 6, negative: 0, dir: "↑" },
            { name: "금융", positive: 5, negative: 4, dir: "→" },
            { name: "플랫폼/IT", positive: 4, negative: 2, dir: "↑" },
            { name: "바이오/헬스케어", positive: 3, negative: 3, dir: "→" },
            { name: "2차전지", positive: 2, negative: 7, dir: "↓" }
        ],
        insights: [
            <><HighlightPos>AI 반도체 랠리 지속</HighlightPos>: 설비투자 상향으로 HBM 관련주 <TickerChip>000660</TickerChip>의 <HighlightPos>단기 매수 관심</HighlightPos>이 유효합니다.</>,
            <><HighlightNeg>관세 및 금리 리스크</HighlightNeg>: 인플레이션 고착화 우려로 <TickerChip>005380</TickerChip> 등 수출 중심 자동차 및 금리 민감주 <HighlightNeg>비중 축소 고려</HighlightNeg>.</>,
            <><HighlightPos>조선업 슈퍼사이클</HighlightPos>: 미국 해군 MRO 사업 진출 등 강력한 호재가 뒷받침되며 장기적인 수익성 개선이 예상되어 지속적인 <HighlightPos>모니터링 필요</HighlightPos>.</>
        ]
    },
    "default": {
        highlights: [
            <><HighlightInfluencer>짐 크레이머</HighlightInfluencer>, CNBC에서 에너지 섹터 비중 축소 권고 → 정유주 <HighlightNeg>하방 압력</HighlightNeg></>,
            <><HighlightInfluencer>한국 애널리스트 C</HighlightInfluencer>, 뉴스 인터뷰에서 K-뷰티 수출 호조 강조 → 화장품 관련주 <HighlightPos>강세</HighlightPos></>,
            <><HighlightInfluencer>미국 핀테크 블로거 B</HighlightInfluencer>, X에서 금리 인하 지연 가능성 시사 → 성장주 <HighlightNeg>변동성 주의</HighlightNeg></>
        ],
        table: [
            { impact: "긍정", stars: 2, speaker: "한국 애널리스트 C", platform: "News", summary: "미국 내 K-뷰티 점유율 확대 및 1분기 수출 서프라이즈 발표", related: ["아모레퍼시픽", "실리콘투"] },
            { impact: "부정", stars: 3, speaker: "짐 크레이머", platform: "CNBC", summary: "유가 정점 통과 가능성. 에너지 관련주 비중 축소 의견 제시", related: ["S-Oil", "GS"] },
            { impact: "부정", stars: 2, speaker: "미국 핀테크 블로거 B", platform: "X (Twitter)", summary: "예상보다 강한 고용 지표로 연내 금리 인하 사실상 무산 위기", related: ["성장주 전반"] }
        ],
        positiveStocks: [
            { ticker: "090430", name: "아모레퍼시픽", reason: "미국 매출 고성장 및 글로벌 포트폴리오 다변화 성공", influencer: "한국 애널리스트 C" },
            { ticker: "257720", name: "실리콘투", reason: "인디 뷰티 브랜드 수출 급증에 따른 구조적 성장", influencer: "한국 애널리스트 C" }
        ],
        negativeStocks: [
            { ticker: "010950", name: "S-Oil", reason: "유가 하락 및 정제마진 축소 우려로 인한 실적 둔화 전망", influencer: "짐 크레이머" },
            { ticker: "N/A", name: "바이오/IT 성장주", reason: "고금리 환경 지속으로 인한 밸류에이션 할인 압박", influencer: "미국 핀테크 블로거 B" }
        ],
        positiveSectors: [
            { name: "바이오/헬스케어", value: 9 },
            { name: "반도체", value: 5 },
            { name: "금융", value: 4 },
            { name: "에너지", value: 1 },
            { name: "플랫폼/IT", value: 2 },
            { name: "2차전지", value: 1 }
        ],
        negativeSectors: [
            { name: "바이오/헬스케어", value: 0 },
            { name: "반도체", value: 3 },
            { name: "금융", value: 2 },
            { name: "에너지", value: 8 },
            { name: "플랫폼/IT", value: 4 },
            { name: "2차전지", value: 6 }
        ],
        sectorSummary: [
            { name: "바이오/헬스케어", positive: 9, negative: 0, dir: "↑" },
            { name: "반도체", positive: 5, negative: 3, dir: "↑" },
            { name: "금융", positive: 4, negative: 2, dir: "↑" },
            { name: "플랫폼/IT", positive: 2, negative: 4, dir: "↓" },
            { name: "2차전지", positive: 1, negative: 6, dir: "↓" },
            { name: "에너지", positive: 1, negative: 8, dir: "↓" }
        ],
        insights: [
            <><HighlightPos>K-뷰티 구조적 성장세</HighlightPos>: 글로벌 점유율 확대 중인 <TickerChip>090430</TickerChip> 등 중장기 투자가 <HighlightPos>단기 매수 관심</HighlightPos> 대상으로 유망합니다.</>,
            <><HighlightNeg>에너지 섹터 비중 조절 필요</HighlightNeg>: 유가 하향 안정화로 정유주 모멘텀 둔화가 예상되어 <HighlightNeg>비중 축소 고려</HighlightNeg>가 필요합니다.</>,
            <><HighlightNeg>고금리 장기화 대비</HighlightNeg>: 밸류에이션 부담이 높은 성장주의 <HighlightNeg>리스크 관리 및 모니터링 필요</HighlightNeg>합니다.</>
        ]
    }
};

const SectionTitle = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div className="border-b border-white/10 pb-2 mb-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Icon className="w-5 h-5 text-primary" />
            {title}
        </h2>
    </div>
);

const ImpactBadge = ({ impact }: { impact: string }) => {
    if (impact === "긍정") return <Badge className="bg-green-500 text-white hover:bg-green-600 border-0 px-3 py-1">긍정</Badge>;
    if (impact === "부정") return <Badge className="bg-red-500 text-white hover:bg-red-600 border-0 px-3 py-1">부정</Badge>;
    return <Badge className="bg-gray-500 text-white hover:bg-gray-600 border-0 px-3 py-1">중립</Badge>;
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
                                        "w-[240px] justify-start text-left font-normal bg-[#151921] border-white/10 text-white hover:bg-white/5 hover:text-white shadow-sm",
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
            <section className="space-y-2">
                <SectionTitle icon={Megaphone} title="주요 하이라이트" />
                <Card className="bg-[#151921] border-l-4 border-l-primary border-y-white/10 border-r-white/10 p-6 rounded-xl shadow-sm">
                    <ul className="space-y-4 text-sm text-gray-300 leading-relaxed list-disc list-inside marker:text-primary">
                        {data.highlights.map((highlight, idx) => (
                            <li key={idx}>
                                {highlight}
                            </li>
                        ))}
                    </ul>
                </Card>
            </section>

            {/* 2. 종합 요약 테이블 */}
            <section className="space-y-2">
                <SectionTitle icon={Target} title="종합 요약 테이블 & 시장 영향도" />
                <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#151921] shadow-sm">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-[#1e2330] text-gray-400 font-medium border-b border-white/10">
                            <tr>
                                <th className="px-4 py-4 whitespace-nowrap">인플루언서명</th>
                                <th className="px-4 py-4 whitespace-nowrap">플랫폼</th>
                                <th className="px-4 py-4 min-w-[300px]">발언 요약</th>
                                <th className="px-4 py-4 whitespace-nowrap">관련 종목</th>
                                <th className="px-4 py-4 whitespace-nowrap text-center">시장 영향도</th>
                                <th className="px-4 py-4 whitespace-nowrap text-center">영향 강도</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-gray-300">
                            {data.table.map((row, idx) => (
                                <tr key={idx} className={cn(
                                    "transition-colors",
                                    idx % 2 === 0 ? "bg-transparent" : "bg-white/[0.02]",
                                    row.stars === 3 && row.impact === "긍정" ? "border-l-2 border-l-green-500" : "",
                                    row.stars === 3 && row.impact === "부정" ? "border-l-2 border-l-red-500" : ""
                                )}>
                                    <td className="px-4 py-4 font-bold text-yellow-400 whitespace-nowrap">{row.speaker}</td>
                                    <td className="px-4 py-4 whitespace-nowrap text-xs">
                                        <Badge variant="outline" className="bg-[#1e2330] border-white/10">{row.platform}</Badge>
                                    </td>
                                    <td className="px-4 py-4 leading-relaxed text-xs">{row.summary}</td>
                                    <td className="px-4 py-4 text-xs">
                                        <div className="flex flex-wrap gap-1">
                                            {row.related.map((r, i) => <TickerChip key={i}>{r}</TickerChip>)}
                                        </div>
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
            <section className="space-y-2">
                <SectionTitle icon={Globe} title="긍/부정 종목 종합" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 상승 기대 종목 */}
                    <div className="bg-green-500/5 p-5 rounded-xl border border-green-500/10 shadow-sm">
                        <div className="flex items-center gap-2 pb-3 mb-4 border-b border-green-500/20">
                            <TrendingUp className="w-5 h-5 text-green-500" />
                            <h3 className="font-bold text-green-400 text-lg">상승/호재 기대 종목</h3>
                        </div>
                        <div className="space-y-3">
                            {data.positiveStocks.map((stock, idx) => (
                                <Card key={idx} className="bg-[#151921] border-y-white/5 border-r-white/5 border-l-4 border-l-green-500 p-4 shadow-sm">
                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                        <TickerChip>{stock.ticker}</TickerChip>
                                        <span className="font-bold text-white text-base flex items-center gap-1">
                                            {stock.name} <ArrowUp className="w-4 h-4 text-green-500" />
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-300 mb-3 leading-snug">{stock.reason}</p>
                                    <div className="text-xs text-gray-500 flex items-center gap-1.5">
                                        <MessageSquare className="w-3.5 h-3.5" />
                                        <span>주요 언급: <HighlightInfluencer>{stock.influencer}</HighlightInfluencer></span>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* 하락 우려 종목 */}
                    <div className="bg-red-500/5 p-5 rounded-xl border border-red-500/10 shadow-sm">
                        <div className="flex items-center gap-2 pb-3 mb-4 border-b border-red-500/20">
                            <TrendingDown className="w-5 h-5 text-red-500" />
                            <h3 className="font-bold text-red-400 text-lg">하락/악재 우려 종목</h3>
                        </div>
                        <div className="space-y-3">
                            {data.negativeStocks.map((stock, idx) => (
                                <Card key={idx} className="bg-[#151921] border-y-white/5 border-r-white/5 border-l-4 border-l-red-500 p-4 shadow-sm">
                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                        <TickerChip>{stock.ticker}</TickerChip>
                                        <span className="font-bold text-white text-base flex items-center gap-1">
                                            {stock.name} <ArrowDown className="w-4 h-4 text-red-500" />
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-300 mb-3 leading-snug">{stock.reason}</p>
                                    <div className="text-xs text-gray-500 flex items-center gap-1.5">
                                        <MessageSquare className="w-3.5 h-3.5" />
                                        <span>주요 언급: <HighlightInfluencer>{stock.influencer}</HighlightInfluencer></span>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. 섹터별 영향 분석 */}
            <section className="space-y-2">
                <SectionTitle icon={BarChart3} title="섹터별 영향 분석" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* 긍정 분포 파이 차트 */}
                    <Card className="bg-[#151921] border-white/10 p-6 shadow-sm flex flex-col items-center">
                        <h3 className="font-bold text-white mb-4 text-center">긍정 언급 섹터 분포</h3>
                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data.positiveSectors}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={true}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                        stroke="rgba(0,0,0,0.5)"
                                    >
                                        {data.positiveSectors.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={SECTOR_COLORS[entry.name]} />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#1e2330', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    {/* 부정 분포 파이 차트 */}
                    <Card className="bg-[#151921] border-white/10 p-6 shadow-sm flex flex-col items-center">
                        <h3 className="font-bold text-white mb-4 text-center">부정 언급 섹터 분포</h3>
                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data.negativeSectors}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={true}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                        stroke="rgba(0,0,0,0.5)"
                                    >
                                        {data.negativeSectors.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={SECTOR_COLORS[entry.name]} />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#1e2330', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>

                {/* 섹터 서머리 행 */}
                <Card className="bg-[#151921] border-white/10 p-4 shadow-sm mt-4">
                    <div className="flex flex-wrap gap-4 justify-center">
                        {data.sectorSummary.map((sec, idx) => (
                            <div key={idx} className="flex items-center gap-3 bg-[#1e2330] rounded-full px-4 py-1.5 border border-white/5">
                                <span className="font-bold text-gray-300 text-sm">{sec.name}</span>
                                <div className="h-4 w-px bg-white/10 mx-1"></div>
                                <span className="text-green-400 text-xs font-mono">긍정 {sec.positive}</span>
                                <span className="text-red-400 text-xs font-mono">부정 {sec.negative}</span>
                                <div className="h-4 w-px bg-white/10 mx-1"></div>
                                {sec.dir === "↑" && <ArrowUp className="w-4 h-4 text-green-500" />}
                                {sec.dir === "↓" && <ArrowDown className="w-4 h-4 text-red-500" />}
                                {sec.dir === "→" && <MoveRight className="w-4 h-4 text-gray-500" />}
                            </div>
                        ))}
                    </div>
                </Card>
            </section>

            {/* 5. 투자 시사점 */}
            <section className="space-y-4">
                <div className="bg-[#1e2330] border-t-2 border-t-primary rounded-xl overflow-hidden shadow-sm">
                    <div className="p-5 border-b border-white/10 bg-[#151921]">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <AlertCircle className="w-6 h-6 text-primary" />
                            📌 오늘의 투자 시사점
                        </h2>
                    </div>
                    <div className="p-6 space-y-4">
                        <ul className="space-y-5">
                            {data.insights.map((insight, idx) => (
                                <li key={idx} className="flex gap-3 items-start">
                                    <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0"></div>
                                    <div className="text-gray-300 leading-relaxed text-sm">
                                        {insight}
                                    </div>
                                </li>
                            ))}
                        </ul>
                        
                        <div className="pt-6 mt-6 border-t border-white/5 flex justify-center">
                            <p className="text-xs text-gray-500">
                                본 리포트는 참고용이며 투자 권유가 아닙니다.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
