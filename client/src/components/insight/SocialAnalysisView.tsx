import { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { TrendingUp, TrendingDown, Globe, Megaphone, Target, Calendar as CalendarIcon, ChevronDown, BarChart3, Newspaper, Twitter, Star, MessageSquare, ArrowUp, ArrowDown, ChevronLeft, ChevronRight, X, ExternalLink, ChevronRight as ChevronRightIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Global Ticker Chip Component (전 섹션 동일 적용)
const TickerChip = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <span className={cn("inline-block bg-blue-950 text-blue-300 border border-blue-800 rounded-full px-2 py-0.5 text-xs font-mono font-medium mx-1", className)}>
        {children}
    </span>
);

const TableTickerChip = ({ ticker, name, sentiment }: { ticker: string, name: string, sentiment?: "positive" | "negative" }) => (
    <div className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 rounded-md px-2 py-1">
        <div className={cn(
            "w-5 h-5 rounded-sm inline-block align-middle flex-shrink-0 flex items-center justify-center",
            sentiment === "positive" ? "bg-emerald-900/40 border border-emerald-800/60" :
            sentiment === "negative" ? "bg-[#ff7c7e]/20 border border-[#ff7c7e]/40" :
            "bg-slate-600 border border-slate-500"
        )}>
            {sentiment === "positive" && <ArrowUp className="w-3 h-3 text-emerald-400" />}
            {sentiment === "negative" && <ArrowDown className="w-3 h-3 text-[#ff7c7e]" />}
        </div>
        <div className="flex items-baseline gap-1">
            <span className={cn("text-xs font-medium", 
                sentiment === "positive" ? "text-emerald-300" :
                sentiment === "negative" ? "text-[#ff7c7e]" : "text-blue-300"
            )}>{name}</span>
            {ticker !== "N/A" && <span className="text-slate-400 text-[10px] font-mono">{ticker}</span>}
        </div>
    </div>
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
    <strong className="text-[#ff7c7e] font-semibold">{children}</strong>
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
            { id: 1, impact: "긍정", stars: 3, speaker: "일론 머스크", platform: "X (Twitter)", summary: "Optimus 로봇 양산 라인 구축 위해 250억 달러 설비투자 상향 발표", related: [{name: "삼성전자", ticker: "005930", comment: "Tesla AI 로봇 투자 확대로 메모리 반도체 수요 증가 기대", sentiment: "positive"}, {name: "SK하이닉스", ticker: "000660", comment: "AI 인프라 투자 확대 수혜", sentiment: "positive"}, {name: "Tesla", ticker: "TSLA", comment: "단기 Capex 급증(250억 달러)으로 수익성 훼손 우려", sentiment: "negative"}, {name: "LG에너지솔루션", ticker: "373220", comment: "테슬라 수익성 악화에 따른 배터리 단가 인하 압박 우려", sentiment: "negative"}], followers: "팔로워 1.8억명", time: "2026-04-26 04:22", fullText: <><HighlightPos>Optimus 로봇 양산 로드맵은 AI 로봇 섹터 전반에 촉매</HighlightPos>가 될 수 있으며, 250억 달러 capex 투자와 맞물려 국내 메모리 반도체 수혜는 <HighlightPos>중장기적으로 유효</HighlightPos>.</>, analysis: "테슬라 AI 로봇 투자 확대로 메모리 반도체 수요 증가 기대. 250억 달러 capex 상향은 국내 메모리 서플라이 체인에 강력한 모멘텀. 단, 단기 비용 증가에 따른 일부 밸류체인 압박 우려 상존." },
            { id: 2, impact: "부정", stars: 3, speaker: "도널드 트럼프", platform: "Truth Social", summary: "미국 제조업 부활 위한 15% 보편 관세 부과 필요성 강경 발언", related: [{name: "현대차", ticker: "005380", comment: "미국 관세 15% 적용으로 영업이익 감소 우려", sentiment: "negative"}, {name: "기아", ticker: "000270", comment: "미국 수출 물량 타격 우려", sentiment: "negative"}, {name: "Apple", ticker: "AAPL", comment: "공급망 관세 부담 지속", sentiment: "negative"}], followers: "팔로워 650만명", time: "2026-04-26 10:15", fullText: <><HighlightNeg>관세 정책이 미국 제조업 부활, 재정적자 감소, 인플레이션 억제에 도움</HighlightNeg>이 된다는 취지 발언 지속. 최근 관세 발언이 시장의 <HighlightNeg>핵심 리스크 변수</HighlightNeg>로 작용 중.</>, analysis: "트럼프 발언이 단순 SNS를 넘어 최대 변동성 요인으로 구조화됨. 관세 현실화 시 수출주 급락 및 이분법적 구조 고착화 우려." },
            { id: 3, impact: "중립", stars: 2, speaker: "미국 경제 유튜버 A", platform: "YouTube", summary: "AI 전력 수요 폭발로 데이터센터 인프라 투자 지속될 것", related: [{name: "LS일렉트릭", ticker: "010120", comment: "북미 데이터센터 전력기기 수주 모멘텀 지속", sentiment: "positive"}], followers: "구독자 120만명", time: "2026-04-26 13:40", fullText: <>AI 데이터센터 건설 붐으로 인해 전력기기 및 인프라 관련 수요가 급증하고 있으며 이는 단기 테마가 아닌 다년간 지속될 메가 트렌드입니다.</>, analysis: "전력 인프라 투자는 긍정적이나, 이미 주가에 상당 부분 선반영되어 있어 밸류에이션 부담이 존재. 추가적인 어닝 서프라이즈 필요." },
            { id: 4, impact: "긍정", stars: 1, speaker: "한국 애널리스트 B", platform: "News", summary: "조선업 슈퍼사이클 진입 및 미국 함정 MRO 사업 수혜 기대", related: [{name: "한화오션", ticker: "042660", comment: "미국 해군 함정 MRO 사업 본격 진출 수혜", sentiment: "positive"}, {name: "HD현대중공업", ticker: "329180", comment: "미국 함정 수주 물량 확대 기대", sentiment: "positive"}], followers: "증권사 리서치 센터", time: "2026-04-26 08:30", fullText: <><HighlightPos>미국 해군 함정 MRO 사업 진출과 신조선가 상승 흐름</HighlightPos>이 맞물리며 국내 주요 조선사들의 <HighlightPos>수익성 개선이 본격화</HighlightPos>될 전망입니다.</>, analysis: "미국 함정 MRO 사업 수주 시 장기적이고 안정적인 캐시카우 확보 가능. 조선업 사이클 상승과 겹쳐 강력한 모멘텀 형성 중." },
            { id: 5, impact: "부정", stars: 2, speaker: "월가 핀테크 블로거 C", platform: "X (Twitter)", summary: "소비자 물가 지수 상승 여파로 하반기 금리 인하 물건너갔다", related: [{name: "현대건설", ticker: "000720", comment: "금리 동결 지속으로 프로젝트 파이낸싱 부담", sentiment: "negative"}], followers: "팔로워 45만명", time: "2026-04-26 21:10", fullText: <><HighlightNeg>끈적한 인플레이션과 강한 고용 지표</HighlightNeg>로 인해 연준의 금리 인하 사이클 시작이 지연되고 있습니다. <HighlightNeg>고금리 장기화에 대비</HighlightNeg>해야 합니다.</>, analysis: "금리 인하 기대감 소멸로 인해 레버리지가 높은 건설, 부동산 관련 섹터의 프로젝트 파이낸싱(PF) 부담 지속 및 투자심리 악화." },
            // Add a mixed sentiment example for testing the divider
            { id: 9, impact: "중립", stars: 3, speaker: "글로벌 매크로 분석가", platform: "YouTube", summary: "반도체 수요 증가와 동시에 무역 갈등 우려 상존", related: [{name: "삼성전자", ticker: "005930", comment: "반도체 수요 증가 수혜", sentiment: "positive"}, {name: "LG전자", ticker: "051910", comment: "수출 관세 부담 우려", sentiment: "negative"}], followers: "구독자 200만명", time: "2026-04-26 15:20", fullText: <>반도체 수요 증가는 <HighlightPos>긍정적</HighlightPos>이나, 글로벌 무역 갈등이 지속되며 <HighlightNeg>수출주에는 타격</HighlightNeg>이 우려됩니다.</>, analysis: "섹터별 차별화 장세 심화 예상. 반도체는 비중 확대, 자동차 등 수출 민감주는 비중 축소 권고." }
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
            { name: "반도체", positive: 8, negative: 1 },
            { name: "에너지", positive: 6, negative: 0 },
            { name: "금융", positive: 5, negative: 4 },
            { name: "플랫폼/IT", positive: 4, negative: 2 },
            { name: "바이오/헬스케어", positive: 3, negative: 3 },
            { name: "2차전지", positive: 2, negative: 7 }
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
            { id: 6, impact: "긍정", stars: 2, speaker: "한국 애널리스트 C", platform: "News", summary: "미국 내 K-뷰티 점유율 확대 및 1분기 수출 서프라이즈 발표", related: [{name: "아모레퍼시픽", ticker: "090430", comment: "북미 시장 점유율 확대 기대", sentiment: "positive"}, {name: "실리콘투", ticker: "257720", comment: "인디 뷰티 수출 호조 수혜", sentiment: "positive"}], followers: "리서치 센터", time: "2026-04-25 09:00", fullText: <><HighlightPos>1분기 화장품 수출액이 전년 동기 대비 21% 증가</HighlightPos>했으며, 특히 북미 시장에서의 <HighlightPos>성장세가 두드러집니다</HighlightPos>.</>, analysis: "구조적 성장이 확인된 인디 뷰티 브랜드 중심의 포트폴리오 재편이 유효." },
            { id: 7, impact: "부정", stars: 3, speaker: "짐 크레이머", platform: "CNBC", summary: "유가 정점 통과 가능성. 에너지 관련주 비중 축소 의견 제시", related: [{name: "S-Oil", ticker: "010950", comment: "정제마진 하락 우려", sentiment: "negative"}, {name: "GS", ticker: "078930", comment: "유가 하락으로 인한 이익 감소 우려", sentiment: "negative"}], followers: "시청자 300만명", time: "2026-04-24 22:30", fullText: <><HighlightNeg>지정학적 리스크 완화와 수요 둔화 우려</HighlightNeg>로 유가 상승 모멘텀이 꺾일 수 있습니다. 정유주 <HighlightNeg>차익 실현을 권고</HighlightNeg>합니다.</>, analysis: "정제마진 하락 추세와 맞물려 단기적인 실적 둔화가 예상됨. 비중 축소 고려." },
            { id: 8, impact: "부정", stars: 2, speaker: "미국 핀테크 블로거 B", platform: "X (Twitter)", summary: "예상보다 강한 고용 지표로 연내 금리 인하 사실상 무산 위기", related: [{name: "카카오", ticker: "035720", comment: "성장주 할인율 상승에 따른 밸류에이션 부담", sentiment: "negative"}], followers: "팔로워 85만명", time: "2026-04-25 07:15", fullText: <><HighlightNeg>비농업 고용 지표가 시장 예상치를 상회</HighlightNeg>하며 연준의 금리 인하 명분이 사라졌습니다. 성장주의 <HighlightNeg>밸류에이션 할인이 불가피</HighlightNeg>합니다.</>, analysis: "고금리 환경 지속으로 인한 할인율 상승은 기술주 및 바이오 등 성장주에 부담으로 작용." }
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
            { name: "바이오/헬스케어", positive: 9, negative: 0 },
            { name: "반도체", positive: 5, negative: 3 },
            { name: "금융", positive: 4, negative: 2 },
            { name: "플랫폼/IT", positive: 2, negative: 4 },
            { name: "2차전지", positive: 1, negative: 6 },
            { name: "에너지", positive: 1, negative: 8 }
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
    if (impact === "긍정") return <span className="inline-block rounded-full bg-emerald-500 text-white font-semibold px-3 py-1 text-xs shadow-sm">긍정</span>;
    if (impact === "부정") return <span className="inline-block rounded-full bg-[#ff7c7e] text-white font-semibold px-3 py-1 text-xs shadow-sm">부정</span>;
    return <span className="inline-block rounded-full bg-slate-500 text-white font-semibold px-3 py-1 text-xs shadow-sm">중립</span>;
};

// ★★★ 영향 강도
const Stars = ({ count, className }: { count: number, className?: string }) => {
    return (
        <div className={cn("flex gap-0.5", className)}>
            {[1, 2, 3].map(i => (
                <Star key={i} className={cn("w-3.5 h-3.5", i <= count ? "fill-amber-400 text-amber-400" : "text-slate-600")} />
            ))}
        </div>
    );
};

// 플랫폼 chips
const PlatformBadge = ({ platform }: { platform: string }) => {
    let colorClass = "bg-slate-700 text-slate-200 border-slate-600"; // default
    if (platform === "X (Twitter)") colorClass = "bg-slate-700 text-slate-200 border-slate-600";
    else if (platform === "YouTube") colorClass = "bg-red-900/50 text-red-300 border-red-800";
    else if (platform === "News") colorClass = "bg-blue-900/50 text-blue-300 border-blue-800";
    else if (platform === "Truth Social") colorClass = "bg-orange-900/50 text-orange-300 border-orange-800"; // Keep Truth social branding
    
    return <span className={cn("inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-medium", colorClass)}>{platform}</span>;
}

export default function SocialAnalysisView() {
    const [date, setDate] = useState<Date>(new Date(2026, 3, 26)); // Default to 2026-04-26
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState<any>(null); // State for sliding panel
    
    const calendarRef = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLButtonElement>(null);

    // Close calendar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
                setIsCalendarOpen(false);
            }
        };
        
        if (isCalendarOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isCalendarOpen]);

    const dateKey = format(date, "yyyy-MM-dd");
    const data = MOCK_DATA[dateKey as keyof typeof MOCK_DATA] || MOCK_DATA["default"];

    return (
        <div className="space-y-12 pb-16 animate-in fade-in duration-500 max-w-6xl mx-auto relative overflow-hidden">
            
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

                    {/* Date Picker */}
                    <div className="flex flex-col items-end gap-2 shrink-0 relative z-40">
                        <div className="relative w-52" ref={calendarRef}>
                            <Button
                                ref={btnRef}
                                variant="outline"
                                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                                className={cn(
                                    "w-full justify-start text-left font-medium bg-slate-800 border-slate-700 text-white hover:bg-slate-700 hover:text-white shadow-none rounded-lg px-4 py-2 h-10",
                                    !date && "text-slate-400"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4 text-slate-400" />
                                {date ? format(date, "yyyy년 MM월 dd일", { locale: ko }) : <span>날짜를 선택하세요</span>}
                                <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                            </Button>

                            {isCalendarOpen && (
                                <div className="absolute top-[calc(100%+4px)] right-0 bg-slate-900 border border-slate-700 rounded-xl shadow-xl shadow-black/50 p-4 w-[280px]">
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
                                        components={{
                                            IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4 text-slate-400" />,
                                            IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4 text-slate-400" />,
                                        }}
                                        className="bg-slate-900 text-white w-full mx-auto [&_.rdp-nav]:flex [&_.rdp-nav]:gap-1 [&_.rdp-caption]:flex [&_.rdp-caption]:justify-between [&_.rdp-caption]:items-center [&_.rdp-caption]:mb-4 [&_.rdp-caption_label]:text-white [&_.rdp-caption_label]:font-semibold [&_.rdp-caption_label]:text-sm [&_.rdp-head_row]:flex [&_.rdp-head_row]:w-full [&_.rdp-head_row]:justify-between [&_.rdp-head_row]:mb-2 [&_.rdp-head_cell]:text-slate-500 [&_.rdp-head_cell]:text-xs [&_.rdp-head_cell]:font-medium [&_.rdp-head_cell]:text-center [&_.rdp-head_cell]:w-8 [&_.rdp-row]:flex [&_.rdp-row]:w-full [&_.rdp-row]:justify-between [&_.rdp-row]:mt-1 [&_.rdp-cell]:p-0 [&_.rdp-cell]:w-8 [&_.rdp-cell]:h-8 [&_.rdp-cell]:flex [&_.rdp-cell]:justify-center [&_.rdp-cell]:items-center [&_.rdp-button]:w-8 [&_.rdp-button]:h-8 [&_.rdp-button]:flex [&_.rdp-button]:items-center [&_.rdp-button]:justify-center [&_.rdp-button]:text-sm [&_.rdp-button]:text-slate-300 [&_.rdp-button]:rounded-lg [&_.rdp-button:hover]:bg-slate-700 [&_.rdp-button:hover]:text-white [&_.rdp-day_selected]:bg-blue-500 [&_.rdp-day_selected]:text-white [&_.rdp-day_selected]:font-bold [&_.rdp-day_today]:bg-blue-600 [&_.rdp-day_today]:text-white [&_.rdp-day_today]:font-semibold [&_.rdp-day_outside]:text-slate-600 [&_.rdp-day_outside]:hover:bg-transparent [&_.rdp-day_outside]:cursor-default [&_.rdp-nav_button]:w-7 [&_.rdp-nav_button]:h-7 [&_.rdp-nav_button]:flex [&_.rdp-nav_button]:items-center [&_.rdp-nav_button]:justify-center [&_.rdp-nav_button]:rounded-md [&_.rdp-nav_button_previous]:text-[0px] [&_.rdp-nav_button_next]:text-[0px] [&_.rdp-nav_button:hover]:bg-slate-700"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="text-xs text-slate-500 w-52 text-left mt-1">
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
                                <th className="px-5 py-4 min-w-[200px] font-medium">관련 종목</th>
                                <th className="px-5 py-4 whitespace-nowrap text-center font-medium">시장 영향도</th>
                                <th className="px-5 py-4 whitespace-nowrap text-center font-medium">영향 강도</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50 text-slate-300">
                            {data.table.map((row, idx) => (
                                <tr 
                                    key={row.id} 
                                    onClick={() => setSelectedRow(row)}
                                    className={cn(
                                        "transition-colors cursor-pointer hover:bg-slate-700/40",
                                        idx % 2 === 0 ? "bg-transparent" : "bg-slate-800/20"
                                    )}
                                >
                                    <td className={cn("px-5 py-4 font-bold text-slate-200 whitespace-nowrap border-l-4 border-t-[transparent] border-r-[transparent] border-b-[transparent]",
                                        row.impact === '긍정' ? "border-l-emerald-500" :
                                        row.impact === '부정' ? "border-l-[#ff7c7e]" : "border-l-slate-500"
                                    )}>
                                        {row.speaker}
                                    </td>
                                    <td className="px-5 py-4 whitespace-nowrap">
                                        <PlatformBadge platform={row.platform} />
                                    </td>
                                    <td className="px-5 py-4 leading-relaxed text-sm">{row.summary}</td>
                                    <td className="px-5 py-4 text-xs">
                                        <div className="flex flex-wrap gap-1.5">
                                            {row.related.map((r: any, i: number) => <TableTickerChip key={i} name={r.name} ticker={r.ticker} sentiment={r.sentiment} />)}
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-center">
                                        <ImpactBadge impact={row.impact} />
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex justify-center">
                                            <Stars count={row.stars} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* 3. 긍/부정 종목 종합 */}
            <section className="space-y-2 mt-12">
                <SectionTitle icon={Globe} title="긍/부정 종목 종합" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 상승 기대 종목 (Column Container with emerald background) */}
                    <div className="p-5 bg-emerald-950/15 rounded-xl border border-emerald-900/30">
                        <div className="flex items-center gap-2 pb-4 mb-5 border-b border-emerald-900/30">
                            <div className="bg-emerald-500/30 p-1.5 rounded-lg flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-emerald-400" />
                            </div>
                            <h3 className="font-bold text-emerald-400 text-lg flex items-center gap-2">
                                상승 · 호재 기대
                            </h3>
                        </div>
                        <div className="space-y-4">
                            {data.positiveStocks.map((stock, idx) => (
                                <Card key={idx} className="bg-slate-800 border-0 p-4 shadow-md rounded-xl flex gap-4 items-start">
                                    <div className="bg-emerald-500/25 text-emerald-300 rounded-md w-8 h-8 flex items-center justify-center shrink-0">
                                        <ArrowUp className="w-5 h-5" strokeWidth={3} />
                                    </div>
                                    <div>
                                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                            <TickerChip className="bg-emerald-950 text-emerald-300 border-emerald-700 m-0">{stock.ticker}</TickerChip>
                                            <span className="font-bold text-white text-base">
                                                {stock.name}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-300 mb-2 leading-relaxed">{stock.reason}</p>
                                        <div className="text-xs text-slate-500 flex items-center gap-1.5">
                                            <span>주요 언급:</span> <HighlightInfluencer>{stock.influencer}</HighlightInfluencer>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* 하락 우려 종목 (Column Container with #ff7c7e background) */}
                    <div className="p-5 bg-[#ff7c7e]/10 rounded-xl border border-[#ff7c7e]/30">
                        <div className="flex items-center gap-2 pb-4 mb-5 border-b border-[#ff7c7e]/30">
                            <div className="bg-[#ff7c7e]/20 p-1.5 rounded-lg flex items-center justify-center">
                                <TrendingDown className="w-5 h-5 text-[#ff7c7e]" />
                            </div>
                            <h3 className="font-bold text-[#ff7c7e] text-lg flex items-center gap-2">
                                하락 · 악재 우려
                            </h3>
                        </div>
                        <div className="space-y-4">
                            {data.negativeStocks.map((stock, idx) => (
                                <Card key={idx} className="bg-slate-800 border-0 p-4 shadow-md rounded-xl flex gap-4 items-start">
                                    <div className="bg-[#ff7c7e]/20 text-[#ff7c7e] rounded-md w-8 h-8 flex items-center justify-center shrink-0">
                                        <ArrowDown className="w-5 h-5" strokeWidth={3} />
                                    </div>
                                    <div>
                                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                            <TickerChip className="bg-[#ff7c7e]/20 text-[#ff7c7e] border-[#ff7c7e]/50 m-0">{stock.ticker}</TickerChip>
                                            <span className="font-bold text-white text-base">
                                                {stock.name}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-300 mb-2 leading-relaxed">{stock.reason}</p>
                                        <div className="text-xs text-slate-500 flex items-center gap-1.5">
                                            <span>주요 언급:</span> <HighlightInfluencer>{stock.influencer}</HighlightInfluencer>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. 섹터별 영향 분석 */}
            <section className="space-y-2 mt-12">
                <SectionTitle icon={BarChart3} title="섹터별 영향 분석" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* 긍정 분포 파이 차트 */}
                    <Card className="bg-slate-800 border-0 border-t-2 border-t-emerald-500/50 p-6 shadow-md flex flex-col items-center rounded-xl">
                        <h3 className="font-semibold text-emerald-400 mb-6 text-center text-sm tracking-wide">긍정 언급 섹터 분포</h3>
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
                                        stroke="#1e293b" // match bg-slate-800
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
                    <Card className="bg-slate-800 border-0 border-t-2 border-t-[#ff7c7e]/50 p-6 shadow-md flex flex-col items-center rounded-xl">
                        <h3 className="font-semibold text-[#ff7c7e] mb-6 text-center text-sm tracking-wide">부정 언급 섹터 분포</h3>
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
                                        stroke="#1e293b" // match bg-slate-800
                                        strokeWidth={2}
                                        opacity={1}
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
                    {data.sectorSummary.map((sec, idx) => {
                        const diff = sec.positive - sec.negative;
                        let arrow = "→";
                        let colorClass = "text-slate-400";
                        if (diff >= 3) { arrow = "↑"; colorClass = "text-red-400"; } // Price Up = Red
                        else if (diff > 0) { arrow = "↗"; colorClass = "text-red-400"; }
                        else if (diff === 0) { arrow = "→"; colorClass = "text-slate-400"; }
                        else if (diff >= -2) { arrow = "↘"; colorClass = "text-[#ff7c7e]"; } // Sentiment Negative = #ff7c7e
                        else { arrow = "↓"; colorClass = "text-[#ff7c7e]"; }
                        
                        return (
                        <div key={idx} className="flex items-center gap-3 bg-slate-900 rounded-full px-4 py-2 border border-slate-800 shadow-sm">
                            <span className="font-medium text-slate-300 text-[13px]">{sec.name}</span>
                            <div className="h-3 w-px bg-slate-700 mx-0.5"></div>
                            <span className="text-xs"><span className="text-slate-300">긍정</span> <span className="text-emerald-400 font-medium">{sec.positive}</span></span>
                            <span className="text-xs"><span className="text-slate-300">부정</span> <span className="text-[#ff7c7e] font-medium">{sec.negative}</span></span>
                            <div className="h-3 w-px bg-slate-700 mx-0.5"></div>
                            <span className={cn("font-bold text-sm leading-none", colorClass)}>{arrow}</span>
                        </div>
                    )})}
                </div>
            </section>

            {/* 5. 투자 시사점 */}
            <section className="space-y-2 mt-12">
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

            {/* Centered Modal Panel for Row Details */}
            {selectedRow && (
                <>
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity animate-in fade-in duration-150"
                        onClick={() => setSelectedRow(null)}
                    ></div>

                    {/* Centered Modal */}
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] max-w-[95vw] max-h-[85vh] overflow-y-auto bg-slate-900 rounded-2xl shadow-2xl shadow-black/60 border border-slate-700 p-6 z-50 animate-in zoom-in-95 fade-in duration-150 flex flex-col">
                        
                        {/* Close button */}
                        <button 
                            onClick={() => setSelectedRow(null)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-white w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-700 transition"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="space-y-6">
                            
                            {/* ① 상단 — 인플루언서 정보 */}
                            <div className="border-b border-slate-700 pb-4">
                                <h2 className="text-xl font-bold text-white mb-2 pr-8">{selectedRow.speaker}</h2>
                                <div className="flex flex-wrap items-center gap-3">
                                    <PlatformBadge platform={selectedRow.platform} />
                                    <span className="text-slate-400 text-sm whitespace-nowrap">{selectedRow.followers}</span>
                                    <span className="text-slate-400 text-sm whitespace-nowrap">·</span>
                                    <span className="text-slate-400 text-sm whitespace-nowrap">{selectedRow.time}</span>
                                </div>
                            </div>

                            {/* ② 발언 내용 박스 */}
                            <div>
                                <h3 className="text-slate-400 text-xs font-semibold mb-2 flex items-center gap-1.5">
                                    <MessageSquare className="w-3.5 h-3.5" /> 💬 발언 내용
                                </h3>
                                <div className="bg-slate-800 border border-slate-700/50 rounded-xl p-4">
                                    <p className="text-slate-200 text-sm leading-relaxed">
                                        {selectedRow.fullText}
                                    </p>
                                </div>
                            </div>

                            {/* ③ 관련 종목 리스트 */}
                            <div>
                                <h3 className="text-slate-400 text-xs font-semibold mb-3 flex items-center gap-1.5">
                                    <Target className="w-3.5 h-3.5" /> 📌 관련 종목
                                </h3>
                                <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/50 p-1">
                                    {(() => {
                                        const positiveStocks = selectedRow.related.filter((r: any) => r.sentiment === 'positive');
                                        const negativeStocks = selectedRow.related.filter((r: any) => r.sentiment === 'negative');
                                        const unclassifiedStocks = selectedRow.related.filter((r: any) => !r.sentiment);

                                        const renderStocks = (stocks: any[], groupSentiment: 'positive' | 'negative' | 'neutral') => {
                                            if (stocks.length === 0) return null;
                                            
                                            return (
                                                <div className="py-2 px-1">
                                                    {groupSentiment === 'positive' && (
                                                        <h4 className="text-emerald-400 text-xs font-semibold mb-3 ml-2 flex items-center gap-1.5">
                                                            📈 긍정 영향
                                                        </h4>
                                                    )}
                                                    {groupSentiment === 'negative' && (
                                                        <h4 className="text-[#ff7c7e] text-xs font-semibold mb-3 ml-2 flex items-center gap-1.5">
                                                            📉 부정 영향
                                                        </h4>
                                                    )}
                                                    
                                                    <div className="space-y-1">
                                                        {stocks.map((r: any, i: number) => {
                                                            // 국/내외 판별: 코드가 모두 숫자로만 구성되어 있고 길이가 6자리면 국내(true)
                                                            const isDomestic = /^\d{6}$/.test(r.ticker);
                                                            
                                                            return (
                                                            <div 
                                                                key={i} 
                                                                className={cn(
                                                                    "flex items-center justify-between py-2.5 px-3 rounded-lg group",
                                                                    isDomestic ? "cursor-pointer hover:bg-slate-800/80 transition-colors" : "cursor-default opacity-60 hover:bg-slate-800/30"
                                                                )}
                                                            >
                                                                <div className="flex items-center gap-3 w-full">
                                                                    <div className={cn(
                                                                        "w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0 border",
                                                                        groupSentiment === 'positive' ? "border-emerald-800/40" : 
                                                                        groupSentiment === 'negative' ? "border-[#ff7c7e]/30" : "border-slate-700"
                                                                    )}>
                                                                        {groupSentiment === 'positive' && <ArrowUp className="w-4 h-4 text-emerald-400" />}
                                                                        {groupSentiment === 'negative' && <ArrowDown className="w-4 h-4 text-[#ff7c7e]" />}
                                                                    </div>
                                                                    <div className="flex flex-col flex-1">
                                                                        <div className="flex items-center gap-1.5">
                                                                            <span className="text-white text-sm font-semibold">{r.name}</span>
                                                                            {r.ticker !== "N/A" && <span className="text-slate-400 text-xs font-mono">({r.ticker})</span>}
                                                                        </div>
                                                                        <span className="text-slate-400 text-xs mt-0.5">{r.comment}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                                                                    {r.sentiment === "positive" && (
                                                                        <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold rounded px-1.5 py-0.5">긍정</span>
                                                                    )}
                                                                    {r.sentiment === "negative" && (
                                                                        <span className="bg-[#ff7c7e]/20 text-[#ff7c7e] text-[10px] font-semibold rounded px-1.5 py-0.5">부정</span>
                                                                    )}
                                                                    {!isDomestic && r.ticker !== "N/A" ? (
                                                                        <span className="text-slate-500 text-[10px] border border-slate-700 rounded px-1.5 py-0.5">해외</span>
                                                                    ) : isDomestic ? (
                                                                        <ChevronRightIcon className="text-slate-500 w-4 h-4 group-hover:text-slate-300 transition-colors" />
                                                                    ) : null}
                                                                </div>
                                                            </div>
                                                        )})}
                                                    </div>
                                                </div>
                                            );
                                        };

                                        return (
                                            <>
                                                {renderStocks(positiveStocks, 'positive')}
                                                
                                                {positiveStocks.length > 0 && negativeStocks.length > 0 && (
                                                    <div className="border-t border-slate-800 my-2 mx-3"></div>
                                                )}
                                                
                                                {renderStocks(negativeStocks, 'negative')}
                                                
                                                {(positiveStocks.length > 0 || negativeStocks.length > 0) && unclassifiedStocks.length > 0 && (
                                                    <div className="border-t border-slate-800 my-2 mx-3"></div>
                                                )}
                                                
                                                {renderStocks(unclassifiedStocks, 'neutral')}
                                            </>
                                        );
                                    })()}
                                </div>
                            </div>

                            {/* ④ 시장 영향 분석 */}
                            <div>
                                <h3 className="text-slate-400 text-xs font-semibold mb-2 flex items-center gap-1.5">
                                    <TrendingUp className="w-3.5 h-3.5" /> 📊 영향 분석
                                </h3>
                                <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
                                    <div className="flex items-center gap-3 mb-2">
                                        <ImpactBadge impact={selectedRow.impact} />
                                        <Stars count={selectedRow.stars} className="[&>svg]:w-4 [&>svg]:h-4" />
                                    </div>
                                    <p className="text-slate-300 text-sm leading-relaxed">
                                        {selectedRow.analysis}
                                    </p>
                                </div>
                            </div>

                            {/* ⑤ 원문 보기 버튼 */}
                            <div className="pt-2 flex justify-center">
                                <a href="#" className="inline-flex items-center gap-2 border border-slate-600 rounded-lg px-4 py-2 text-slate-300 text-sm font-medium hover:border-slate-400 hover:text-white transition">
                                    원문 보기 <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>

                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
