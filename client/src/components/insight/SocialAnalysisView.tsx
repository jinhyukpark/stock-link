import { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { TrendingUp, TrendingDown, Globe, Megaphone, Target, Calendar as CalendarIcon, ChevronDown, BarChart3, Newspaper, Twitter, Star, MessageSquare, ArrowUp, ArrowDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Global Ticker Chip Component (전 섹션 동일 적용)
const TickerChip = ({ children }: { children: React.ReactNode }) => (
    <span className="inline-block bg-blue-950 text-blue-300 border border-blue-800 rounded-full px-2 py-0.5 text-xs font-mono font-medium mx-1">
        {children}
    </span>
);

const HighlightInfluencer = ({ children }: { children: React.ReactNode }) => (
    <strong className="text-slate-200 font-bold">{children}</strong>
);

// 주요 하이라이트 Positive keywords
const HighlightPos = ({ children }: { children: React.ReactNode }) => (
    <strong className="text-emerald-400 font-semibold">{children}</strong>
);

// 주요 하이라이트 Negative keywords
const HighlightNeg = ({ children }: { children: React.ReactNode }) => (
    <strong className="text-red-400 font-semibold">{children}</strong>
);

// Distinct Vivid Sector Colors for Pie Charts
const SECTOR_COLORS: Record<string, string> = {
    "반도체": "#60a5fa", // blue-400
    "2차전지": "#34d399", // emerald-400
    "바이오/헬스케어": "#f472b6", // pink-400
    "금융": "#fbbf24", // amber-400
    "에너지": "#fb923c", // orange-400
    "플랫폼/IT": "#a78bfa" // violet-400
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
            <><HighlightPos>AI 반도체 랠리 지속</HighlightPos>: 설비투자 상향으로 HBM 관련주 <TickerChip>000660</TickerChip>의 단기 매수 관심이 유효합니다.</>,
            <><HighlightNeg>관세 및 금리 리스크</HighlightNeg>: 인플레이션 고착화 우려로 <TickerChip>005380</TickerChip> 등 수출 중심 자동차 및 금리 민감주 비중 축소 고려.</>,
            <><HighlightPos>조선업 슈퍼사이클</HighlightPos>: 미국 해군 MRO 사업 진출 등 강력한 호재가 뒷받침되며 장기적인 수익성 개선이 예상되어 지속적인 모니터링 필요.</>
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
    <div className="border-b border-white/10 pb-3 mb-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Icon className="w-5 h-5 text-blue-400" />
            {title}
        </h2>
    </div>
);

// 시장 영향도 badges
const ImpactBadge = ({ impact }: { impact: string }) => {
    if (impact === "긍정") return <span className="inline-block rounded-full bg-emerald-500 text-white font-semibold px-3 py-1 text-xs">긍정</span>;
    if (impact === "부정") return <span className="inline-block rounded-full bg-red-500 text-white font-semibold px-3 py-1 text-xs">부정</span>;
    return <span className="inline-block rounded-full bg-slate-500 text-white font-semibold px-3 py-1 text-xs">중립</span>;
};

// ★★★ 영향 강도
const Stars = ({ count }: { count: number }) => {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3].map(i => (
                <Star key={i} className={cn("w-3.5 h-3.5", i <= count ? "fill-amber-400 text-amber-400" : "text-slate-600")} />
            ))}
        </div>
    );
};

// 플랫폼 chips
const PlatformBadge = ({ platform }: { platform: string }) => {
    let colorClass = "bg-slate-700 text-slate-200"; // default
    if (platform === "X (Twitter)") colorClass = "bg-slate-700 text-slate-200";
    else if (platform === "YouTube") colorClass = "bg-red-900 text-red-300";
    else if (platform === "News") colorClass = "bg-blue-900 text-blue-300";
    else if (platform === "Truth Social") colorClass = "bg-orange-900 text-orange-300";
    
    return <span className={cn("inline-block rounded-full px-2.5 py-0.5 text-xs font-medium", colorClass)}>{platform}</span>;
}

export default function SocialAnalysisView() {
    const [date, setDate] = useState<Date>(new Date(2026, 3, 26)); // Default to 2026-04-26
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const calendarRef = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLButtonElement>(null);
    const [calendarWidth, setCalendarWidth] = useState<number | undefined>(undefined);

    // Close calendar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
                setIsCalendarOpen(false);
            }
        };
        
        if (isCalendarOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            if (btnRef.current) {
                setCalendarWidth(btnRef.current.offsetWidth);
            }
        }
        
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isCalendarOpen]);

    const dateKey = format(date, "yyyy-MM-dd");
    const data = MOCK_DATA[dateKey as keyof typeof MOCK_DATA] || MOCK_DATA["default"];

    return (
        <div className="space-y-12 pb-16 animate-in fade-in duration-500 max-w-6xl mx-auto">
            
            {/* Page Header Area */}
            <div className="flex flex-col gap-4 mb-10">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                            [일일 리포트] 인플루언서 증권 관련 SNS 모니터링
                        </h1>
                        <div className="flex flex-wrap items-center gap-2 mt-4">
                            <span className="inline-flex bg-blue-900 text-blue-300 border border-blue-700 rounded-full px-3 py-1 items-center gap-1.5 text-xs font-normal"><Newspaper className="w-3.5 h-3.5"/> 미국 뉴스</span>
                            <span className="inline-flex bg-indigo-900 text-indigo-300 border border-indigo-700 rounded-full px-3 py-1 items-center gap-1.5 text-xs font-normal"><Newspaper className="w-3.5 h-3.5"/> 한국 뉴스</span>
                            <span className="inline-flex bg-slate-700 text-slate-200 border border-slate-500 rounded-full px-3 py-1 items-center gap-1.5 text-xs font-normal"><Twitter className="w-3.5 h-3.5"/> 미국 SNS (X)</span>
                        </div>
                    </div>

                    {/* Date Picker - Fixed Width for exact match */}
                    <div className="flex flex-col items-end gap-2 shrink-0">
                        <div className="relative w-[280px]" ref={calendarRef}>
                            <Button
                                ref={btnRef}
                                variant="outline"
                                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                                className={cn(
                                    "w-full justify-start text-left font-normal bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800 hover:text-white shadow-none",
                                    !date && "text-slate-400"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4 text-slate-400" />
                                {date ? format(date, "yyyy년 MM월 dd일", { locale: ko }) : <span>날짜를 선택하세요</span>}
                                <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                            </Button>

                            {isCalendarOpen && (
                                <div 
                                    className="absolute top-[100%] right-0 mt-1 z-50 bg-slate-900 border border-slate-800 rounded-md shadow-lg overflow-hidden"
                                    style={{ width: calendarWidth ? `${calendarWidth}px` : '100%' }}
                                >
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={(d) => {
                                            if (d) {
                                                setDate(d);
                                                setIsCalendarOpen(false);
                                            }
                                        }}
                                        initialFocus
                                        className="bg-slate-900 text-slate-200 p-1 flex justify-center [&_.rdp-cell]:p-0.5 [&_.rdp-button]:w-8 [&_.rdp-button]:h-8 [&_.rdp-button]:text-xs [&_.rdp-head_cell]:text-xs"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="text-xs text-slate-500 w-[280px] text-left">
                            마지막 업데이트: {format(date, "yyyy.MM.dd")} 18:30
                        </div>
                    </div>
                </div>
            </div>

            {/* 1. 주요 하이라이트 */}
            <section className="space-y-2">
                <SectionTitle icon={Megaphone} title="주요 하이라이트" />
                <Card className="bg-slate-900 border-0 p-6 rounded-xl shadow-none">
                    <ul className="space-y-4 text-[15px] text-slate-300 leading-relaxed list-disc list-inside marker:text-slate-500">
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
                <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900 shadow-none">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-800/50 text-slate-400 font-medium border-b border-slate-800">
                            <tr>
                                <th className="px-5 py-4 whitespace-nowrap font-medium border-l-4 border-transparent">인플루언서명</th>
                                <th className="px-5 py-4 whitespace-nowrap font-medium">플랫폼</th>
                                <th className="px-5 py-4 min-w-[300px] font-medium">발언 요약</th>
                                <th className="px-5 py-4 whitespace-nowrap font-medium">관련 종목</th>
                                <th className="px-5 py-4 whitespace-nowrap text-center font-medium">시장 영향도</th>
                                <th className="px-5 py-4 whitespace-nowrap text-center font-medium">영향 강도</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50 text-slate-300">
                            {data.table.map((row, idx) => (
                                <tr key={idx} className={cn(
                                    "transition-colors",
                                    idx % 2 === 0 ? "bg-transparent" : "bg-slate-800/20"
                                )}>
                                    <td className={cn(
                                        "px-5 py-4 font-bold text-slate-200 whitespace-nowrap border-l-4",
                                        row.stars === 3 && row.impact === "긍정" ? "border-emerald-500" : 
                                        row.stars === 3 && row.impact === "부정" ? "border-red-500" : 
                                        "border-transparent"
                                    )}>
                                        {row.speaker}
                                    </td>
                                    <td className="px-5 py-4 whitespace-nowrap">
                                        <PlatformBadge platform={row.platform} />
                                    </td>
                                    <td className="px-5 py-4 leading-relaxed text-sm">{row.summary}</td>
                                    <td className="px-5 py-4 text-xs">
                                        <div className="flex flex-wrap gap-1.5">
                                            {row.related.map((r, i) => <TickerChip key={i}>{r}</TickerChip>)}
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-center">
                                        <ImpactBadge impact={row.impact} />
                                    </td>
                                    <td className="px-5 py-4 flex justify-center">
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
                    {/* 상승 기대 종목 (Column Container with subtle background) */}
                    <div className="p-5 bg-emerald-950/20 rounded-xl">
                        <div className="flex items-center gap-2 pb-4 mb-5 border-b border-emerald-900/30">
                            <h3 className="font-bold text-slate-200 text-lg">상승/호재 기대 종목</h3>
                        </div>
                        <div className="space-y-4">
                            {data.positiveStocks.map((stock, idx) => (
                                <Card key={idx} className="bg-slate-800 border-0 p-5 shadow-md rounded-xl">
                                    <div className="flex flex-wrap items-center gap-3 mb-3">
                                        <TickerChip>{stock.ticker}</TickerChip>
                                        <span className="font-bold text-white text-base flex items-center gap-1.5">
                                            {stock.name}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-300 mb-4 leading-relaxed">{stock.reason}</p>
                                    <div className="text-xs text-slate-400 flex items-center gap-2">
                                        <span>주요 언급: <HighlightInfluencer>{stock.influencer}</HighlightInfluencer></span>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* 하락 우려 종목 (Column Container with subtle background) */}
                    <div className="p-5 bg-red-950/20 rounded-xl">
                        <div className="flex items-center gap-2 pb-4 mb-5 border-b border-red-900/30">
                            <h3 className="font-bold text-slate-200 text-lg">하락/악재 우려 종목</h3>
                        </div>
                        <div className="space-y-4">
                            {data.negativeStocks.map((stock, idx) => (
                                <Card key={idx} className="bg-slate-800 border-0 p-5 shadow-md rounded-xl">
                                    <div className="flex flex-wrap items-center gap-3 mb-3">
                                        <TickerChip>{stock.ticker}</TickerChip>
                                        <span className="font-bold text-white text-base flex items-center gap-1.5">
                                            {stock.name}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-300 mb-4 leading-relaxed">{stock.reason}</p>
                                    <div className="text-xs text-slate-400 flex items-center gap-2">
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
                    <Card className="bg-emerald-950/20 border-0 border-t-2 border-t-emerald-500/40 p-6 shadow-md flex flex-col items-center rounded-xl">
                        <h3 className="font-medium text-emerald-400 mb-6 text-center text-sm tracking-wide">긍정 언급 섹터 분포</h3>
                        <div className="h-[280px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data.positiveSectors}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ percent }) => percent > 0 ? `${(percent * 100).toFixed(0)}%` : ''}
                                        outerRadius={90}
                                        innerRadius={50}
                                        dataKey="value"
                                        stroke="#022c22" // match background to hide borders somewhat
                                        strokeWidth={2}
                                        opacity={1}
                                    >
                                        {data.positiveSectors.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={SECTOR_COLORS[entry.name]} />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                                        itemStyle={{ color: '#e2e8f0', fontSize: '12px' }}
                                    />
                                    <Legend 
                                        wrapperStyle={{ fontSize: '12px', paddingTop: '20px', color: '#cbd5e1' }}
                                        iconType="circle"
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    {/* 부정 분포 파이 차트 */}
                    <Card className="bg-red-950/20 border-0 border-t-2 border-t-red-500/40 p-6 shadow-md flex flex-col items-center rounded-xl">
                        <h3 className="font-medium text-red-400 mb-6 text-center text-sm tracking-wide">부정 언급 섹터 분포</h3>
                        <div className="h-[280px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data.negativeSectors}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ percent }) => percent > 0 ? `${(percent * 100).toFixed(0)}%` : ''}
                                        outerRadius={90}
                                        innerRadius={50}
                                        dataKey="value"
                                        stroke="#450a0a" // match background
                                        strokeWidth={2}
                                        opacity={0.75}
                                    >
                                        {data.negativeSectors.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={SECTOR_COLORS[entry.name]} />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                                        itemStyle={{ color: '#e2e8f0', fontSize: '12px' }}
                                    />
                                    <Legend 
                                        wrapperStyle={{ fontSize: '12px', paddingTop: '20px', color: '#cbd5e1' }}
                                        iconType="circle"
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>

                {/* 섹터 서머리 행 */}
                <div className="flex flex-wrap gap-3 justify-center mt-6">
                    {data.sectorSummary.map((sec, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-slate-900 rounded-full px-4 py-2 border border-slate-800 shadow-sm">
                            <span className="font-medium text-slate-300 text-[13px]">{sec.name}</span>
                            <div className="h-3 w-px bg-slate-700 mx-0.5"></div>
                            <span className="text-slate-400 text-xs">긍정 {sec.positive}</span>
                            <span className="text-slate-400 text-xs">부정 {sec.negative}</span>
                            <div className="h-3 w-px bg-slate-700 mx-0.5"></div>
                            <span className="text-slate-500 font-bold text-sm leading-none">{sec.dir}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. 투자 시사점 */}
            <section className="space-y-2 mt-8">
                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-none">
                    <div className="px-6 py-4 border-b border-slate-800 bg-slate-800/30">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            📌 오늘의 투자 시사점
                        </h2>
                    </div>
                    <div className="p-6 space-y-2">
                        <ul className="space-y-6">
                            {data.insights.map((insight, idx) => (
                                <li key={idx} className="flex gap-3 items-start">
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-500 mt-2 shrink-0"></div>
                                    <div className="text-slate-300 leading-relaxed text-[15px]">
                                        {insight}
                                    </div>
                                </li>
                            ))}
                        </ul>
                        
                        <div className="pt-6 mt-8 border-t border-slate-800 flex justify-start">
                            <p className="text-xs text-slate-500">
                                본 리포트는 참고용이며 투자 권유가 아닙니다.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
