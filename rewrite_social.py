import os

content = """import { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { TrendingUp, TrendingDown, Globe, Megaphone, Target, Calendar as CalendarIcon, ChevronDown, BarChart3, Newspaper, Twitter, Star, MessageSquare, ArrowUp, ArrowDown, ChevronLeft, ChevronRight, X, ExternalLink, ChevronRight as ChevronRightIcon, CheckCircle2, PauseCircle, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Global Ticker Chip Component
const TickerChip = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <span className={cn("inline-block bg-blue-950 text-blue-300 border border-blue-800 rounded-full px-2 py-0.5 text-xs font-mono font-medium mx-1", className)}>
        {children}
    </span>
);

const HighlightInfluencer = ({ children }: { children: React.ReactNode }) => (
    <strong className="text-slate-200 font-bold">{children}</strong>
);

const HighlightPos = ({ children }: { children: React.ReactNode }) => (
    <strong className="text-emerald-400 font-semibold">{children}</strong>
);

const HighlightNeg = ({ children }: { children: React.ReactNode }) => (
    <strong className="text-[#ff7c7e] font-semibold">{children}</strong>
);

// 1. Logo Component
const StockLogo = ({ ticker, name, className }: { ticker: string, name: string, className?: string }) => {
    const [imgError, setImgError] = useState(false);

    let logoUrl = "";
    if (name === "삼성전자") logoUrl = "https://logo.clearbit.com/samsung.com";
    else if (name === "SK하이닉스") logoUrl = "https://logo.clearbit.com/skhynix.com";
    else if (name === "현대차" || name === "현대건설") logoUrl = "https://logo.clearbit.com/hyundai.com";
    else if (name === "기아") logoUrl = "https://logo.clearbit.com/kia.com";
    else if (name === "Apple" || name === "AAPL") logoUrl = "https://logo.clearbit.com/apple.com";
    else if (name === "Tesla" || name === "TSLA") logoUrl = "https://logo.clearbit.com/tesla.com";
    else if (name === "카카오") logoUrl = "https://logo.clearbit.com/kakaocorp.com";
    else if (name === "아모레퍼시픽") logoUrl = "https://logo.clearbit.com/amorepacific.com";
    else if (ticker && ticker.match(/^\\d{6}$/)) {
        logoUrl = `https://file.alphasquare.co.kr/media/images/stock_logo/kr/${ticker}.png`;
    } else {
        logoUrl = `https://logo.clearbit.com/${ticker.toLowerCase()}.com`;
    }

    if (imgError || !ticker || ticker === "N/A") {
        return (
            <div className={cn("w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-white text-xs font-bold shrink-0", className)}>
                {name.charAt(0)}
            </div>
        );
    }

    return (
        <img 
            src={logoUrl} 
            alt={name} 
            className={cn("w-8 h-8 rounded-lg object-contain bg-white shrink-0", className)}
            onError={() => setImgError(true)}
        />
    );
};

// 2. Avatar Component
const Avatar = ({ name, className }: { name: string, className?: string }) => {
    const [imgError, setImgError] = useState(false);
    
    let imgUrl = "";
    if (name.includes("일론 머스크") || name.includes("Elon Musk")) {
        imgUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/220px-Elon_Musk_Royal_Society_%28crop2%29.jpg";
    } else if (name.includes("도널드 트럼프") || name.includes("Donald Trump")) {
        imgUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/220px-Donald_Trump_official_portrait.jpg";
    } else if (name.includes("짐 크레이머") || name.includes("Jim Cramer")) {
        imgUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Jim_Cramer_2013.jpg/220px-Jim_Cramer_2013.jpg";
    } else if (name.includes("이재용")) {
        imgUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Lee_Jae-yong_in_2022.jpg/220px-Lee_Jae-yong_in_2022.jpg";
    } else if (name.includes("젠슨 황") || name.includes("Jensen Huang")) {
        imgUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Jensen_Huang_%28cropped%29.jpg/220px-Jensen_Huang_%28cropped%29.jpg";
    }

    if (imgError || !imgUrl) {
        return (
            <div className={cn("w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center text-white text-sm font-bold border-2 border-slate-600 shrink-0", className)}>
                {name.charAt(0)}
            </div>
        );
    }

    return (
        <img 
            src={imgUrl} 
            alt={name} 
            className={cn("w-10 h-10 rounded-full object-cover border-2 border-slate-600 shrink-0", className)}
            onError={() => setImgError(true)}
        />
    );
};

const SECTOR_COLORS: Record<string, string> = {
    "반도체": "#60a5fa",
    "2차전지": "#34d399",
    "바이오/헬스케어": "#f472b6",
    "금융": "#fbbf24",
    "에너지": "#fb923c",
    "플랫폼/IT": "#a78bfa"
};

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
            { id: 4, impact: "긍정", stars: 1, speaker: "한국 애널리스트 B", platform: "News", summary: "조선업 슈퍼사이클 진입 및 미국 함정 MRO 사업 수혜 기대", related: [{name: "한화오션", ticker: "042660", comment: "미국 해군 함정 MRO 사업 본격 진출 수혜", sentiment: "positive"}, {name: "HD현대중공업", ticker: "329180", comment: "미국 함정 수주 물량 확대 기대", sentiment: "positive"}], followers: "증권사 리서치 센터", time: "2026-04-26 08:30", fullText: <><HighlightPos>미국 해군 함정 MRO 사업 진출과 신조선가 상승 흐름</HighlightPos>이 맞물리며 국내 주요 조선사들의 <HighlightPos>수익성 개선이 본격화</HighlightPos>될 전망입니다.</>, analysis: "미국 함정 MRO 사업 수주 시 장기적이고 안정적인 캐시카우 확보 가능. 조선업 사이클 상승과 겹쳐 강력한 모멘텀 형성 중." }
        ],
        positiveStocks: [
            { ticker: "005930", name: "삼성전자", reason: "AI 로봇 투자 확대로 메모리 반도체 수요 급증 기대", influencer: "일론 머스크" },
            { ticker: "000660", name: "SK하이닉스", reason: "역대 최대 실적 및 HBM 독주 체제 지속", influencer: "일론 머스크, 한국 애널리스트" },
            { ticker: "042660", name: "한화오션", reason: "미국 함정 MRO 사업 본격 진출 수혜", influencer: "한국 애널리스트 B" }
        ],
        negativeStocks: [
            { ticker: "005380", name: "현대차", reason: "미국 보편 관세 15% 적용 시 수출 타격 우려", influencer: "도널드 트럼프" },
            { ticker: "TSLA", name: "Tesla", reason: "단기 Capex 급증으로 인한 수익성 악화 우려", influencer: "일론 머스크" },
            { ticker: "N/A", name: "건설주 전반", reason: "금리 동결 장기화로 인한 PF 부담", influencer: "월가 핀테크 블로거" }
        ],
        positiveSectors: [
            { name: "반도체", value: 85 },
            { name: "방산/우주", value: 72 },
            { name: "에너지", value: 61 }
        ],
        negativeSectors: [
            { name: "자동차", value: 55 },
            { name: "2차전지", value: 43 },
            { name: "플랫폼/IT", value: 36 }
        ],
        sectorSummary: [
            { name: "반도체", positive: 85, negative: 10, comment: "NVIDIA 투자 확대 기대감" },
            { name: "방산/우주", positive: 72, negative: 11, comment: "지정학적 리스크 지속 중장기 모멘텀" },
            { name: "에너지", positive: 61, negative: 22, comment: "유가 안정화 및 투자 확대 기대" },
            { name: "바이오/헬스케어", positive: 48, negative: 27, comment: "신약 개발 기대감 속 임상 불확실성" },
            { name: "자동차", positive: 30, negative: 55, comment: "관세 부과 우려, 수출 둔화 전망" },
            { name: "2차전지", positive: 28, negative: 43, comment: "수요 둔화 우려, 중국 경쟁 심화" }
        ]
    },
    "default": {
        highlights: [
            <><HighlightInfluencer>짐 크레이머</HighlightInfluencer>, CNBC에서 에너지 섹터 비중 축소 권고 → 정유주 <HighlightNeg>하방 압력</HighlightNeg></>
        ],
        table: [
            { id: 6, impact: "부정", stars: 3, speaker: "짐 크레이머", platform: "CNBC", summary: "유가 정점 통과 가능성. 에너지 관련주 비중 축소 의견 제시", related: [{name: "S-Oil", ticker: "010950", comment: "정제마진 하락 우려", sentiment: "negative"}], followers: "시청자 300만명", time: "2026-04-24 22:30", fullText: <><HighlightNeg>지정학적 리스크 완화</HighlightNeg>로 유가 상승 꺾일 수 있음.</>, analysis: "단기적인 실적 둔화가 예상됨. 비중 축소 고려." }
        ],
        positiveStocks: [
            { ticker: "090430", name: "아모레퍼시픽", reason: "미국 매출 고성장", influencer: "한국 애널리스트" }
        ],
        negativeStocks: [
            { ticker: "010950", name: "S-Oil", reason: "유가 하락 및 정제마진 축소", influencer: "짐 크레이머" }
        ],
        positiveSectors: [ { name: "바이오", value: 9 } ],
        negativeSectors: [ { name: "에너지", value: 8 } ],
        sectorSummary: [
            { name: "바이오", positive: 90, negative: 10, comment: "긍정 모멘텀" }
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

const ImpactBadge = ({ impact }: { impact: string }) => {
    if (impact === "긍정") return <span className="inline-block rounded-lg bg-emerald-500 text-white font-bold px-3 py-1 text-sm shadow-sm">긍정</span>;
    if (impact === "부정") return <span className="inline-block rounded-lg bg-[#ff7c7e] text-white font-bold px-3 py-1 text-sm shadow-sm">부정</span>;
    return <span className="inline-block rounded-lg bg-slate-500 text-white font-bold px-3 py-1 text-sm shadow-sm">중립</span>;
};

const Stars = ({ count, className }: { count: number, className?: string }) => {
    return (
        <div className={cn("flex gap-0.5", className)}>
            {[1, 2, 3].map(i => (
                <Star key={i} className={cn("w-4 h-4", i <= count ? "fill-amber-400 text-amber-400" : "text-slate-700")} />
            ))}
        </div>
    );
};

const PlatformBadge = ({ platform }: { platform: string }) => {
    let colorClass = "bg-slate-700 text-slate-200 border-slate-600"; 
    if (platform === "YouTube") colorClass = "bg-red-900/50 text-red-300 border-red-800";
    else if (platform === "News") colorClass = "bg-blue-900/50 text-blue-300 border-blue-800";
    else if (platform === "Truth Social") colorClass = "bg-orange-900/50 text-orange-300 border-orange-800";
    
    return <span className={cn("inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-medium", colorClass)}>{platform}</span>;
}

export default function SocialAnalysisView() {
    const [date, setDate] = useState<Date>(new Date(2026, 3, 26));
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [expandedRow, setExpandedRow] = useState<number | null>(null);
    
    const calendarRef = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
                setIsCalendarOpen(false);
            }
        };
        if (isCalendarOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isCalendarOpen]);

    const dateKey = format(date, "yyyy-MM-dd");
    const data = MOCK_DATA[dateKey as keyof typeof MOCK_DATA] || MOCK_DATA["default"];

    return (
        <div className="space-y-12 pb-16 animate-in fade-in duration-500 max-w-6xl mx-auto relative overflow-hidden">
            
            {/* Header */}
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
                                            if (d) { setDate(d); setIsCalendarOpen(false); }
                                        }}
                                        initialFocus
                                        className="bg-slate-900 text-white w-full mx-auto"
                                    />
                                </div>
                            )}
                        </div>
                        <span className="text-slate-400 text-[11px]">업데이트: {format(date || new Date(), "yyyy.MM.dd")} 18:30 KST</span>
                    </div>
                </div>
            </div>

            {/* 1. 주요 하이라이트 */}
            <section>
                <SectionTitle icon={Megaphone} title="1. 주요 하이라이트" />
                <div className="bg-slate-800/40 rounded-xl border border-white/5 p-6">
                    <ul className="space-y-4">
                        {data.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex gap-3 text-slate-300 text-sm leading-relaxed items-start">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                                <div>{highlight}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* 2. 주요 연사 테이블 */}
            <section>
                <SectionTitle icon={Target} title="2. 주요 연사 (Influencer TOP)" />
                <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden shadow-lg">
                    {/* Header */}
                    <div className="grid grid-cols-[80px_1.5fr_2fr_100px_100px_40px] gap-4 bg-slate-800 px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        <div className="text-center">순위</div>
                        <div>인물 / 직책</div>
                        <div>주요 발언 요약</div>
                        <div className="text-center">영향 강도</div>
                        <div className="text-center">시장 영향</div>
                        <div></div>
                    </div>

                    {/* Body */}
                    <div className="flex flex-col">
                        {data.table.map((item, i) => {
                            const isExpanded = expandedRow === item.id;
                            const isHighImpact = item.stars >= 3;
                            const isKorean = item.speaker.includes("한국") || item.speaker.includes("국내") || item.speaker === "이재용" || item.speaker === "정의선" || item.speaker.includes("A") || item.speaker.includes("B") || item.speaker.includes("C");

                            return (
                                <div key={item.id} className="flex flex-col">
                                    <div 
                                        onClick={() => setExpandedRow(isExpanded ? null : item.id)}
                                        className={cn(
                                            "grid grid-cols-[80px_1.5fr_2fr_100px_100px_40px] gap-4 px-6 items-center cursor-pointer transition-colors border-b border-white/5",
                                            isHighImpact ? "border-l-2 border-l-amber-400" : "border-l-2 border-l-transparent",
                                            i % 2 === 0 ? "bg-slate-800/60" : "bg-slate-900",
                                            "py-5 hover:bg-slate-800/80"
                                        )}
                                    >
                                        <div className="text-center font-bold text-slate-500">{i + 1}</div>
                                        
                                        <div className="flex items-center gap-3">
                                            <div className="flex flex-col items-center">
                                                <Avatar name={item.speaker} />
                                                <span className="text-slate-500 text-[10px] text-center mt-0.5">{isKorean ? "한국" : "미국"}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <div className="flex items-center">
                                                    <span className="text-white font-bold text-base">{item.speaker}</span>
                                                    <span className="text-xs ml-1">{isKorean ? "🇰🇷" : "🇺🇸"}</span>
                                                </div>
                                                <span className="text-slate-400 text-xs">{item.followers}</span>
                                            </div>
                                        </div>

                                        <div className="text-slate-200 text-sm leading-relaxed pr-4">
                                            "{item.summary}"
                                        </div>

                                        <div className="flex justify-center">
                                            <Stars count={item.stars} />
                                        </div>

                                        <div className="flex justify-center">
                                            <ImpactBadge impact={item.impact} />
                                        </div>

                                        <div className="flex justify-center text-slate-500">
                                            {isExpanded ? <ChevronDown className="w-5 h-5"/> : <ChevronRightIcon className="w-5 h-5"/>}
                                        </div>
                                    </div>

                                    {/* Expanded Accordion Area */}
                                    {isExpanded && (
                                        <div className="bg-slate-800/80 border-b border-slate-700 p-6 w-full animate-in fade-in slide-in-from-top-2">
                                            <div className="grid grid-cols-2 gap-8">
                                                {/* Left Column */}
                                                <div className="space-y-6">
                                                    <div className="bg-slate-900/50 rounded-lg p-4 border border-white/5">
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <MessageSquare className="w-4 h-4 text-blue-400" />
                                                            <h4 className="text-sm font-bold text-white">발언 원문</h4>
                                                            <PlatformBadge platform={item.platform} />
                                                        </div>
                                                        <p className="text-slate-300 text-sm leading-relaxed">{item.fullText}</p>
                                                    </div>
                                                    
                                                    <div>
                                                        <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                                                            <Target className="w-4 h-4 text-blue-400" /> 관련 종목
                                                        </h4>
                                                        <div className="space-y-3">
                                                            {/* Positive Stocks */}
                                                            {item.related.filter(r => r.sentiment === 'positive').length > 0 && (
                                                                <div className="space-y-2">
                                                                    <div className="text-xs font-bold text-emerald-400 mb-1 flex items-center gap-1"><ArrowUp className="w-3 h-3"/> 긍정 영향</div>
                                                                    {item.related.filter(r => r.sentiment === 'positive').map((r, rIdx) => (
                                                                        <div key={`pos-${rIdx}`} className="flex items-center gap-3 bg-slate-900/50 p-2.5 rounded-lg border border-white/5 group">
                                                                            <StockLogo ticker={r.ticker} name={r.name} />
                                                                            <div className="flex-1 flex flex-col">
                                                                                <div className="flex items-center gap-1.5">
                                                                                    <span className="text-white text-sm font-bold">{r.name}</span>
                                                                                    {r.ticker.match(/^\\d{6}$/) ? (
                                                                                        <span className="text-slate-500 text-xs font-mono">{r.ticker}</span>
                                                                                    ) : (
                                                                                        <Badge variant="outline" className="text-[9px] px-1 py-0 h-4 border-slate-600 text-slate-400 bg-slate-800">해외</Badge>
                                                                                    )}
                                                                                </div>
                                                                                <span className="text-slate-400 text-xs mt-0.5">{r.comment}</span>
                                                                            </div>
                                                                            {r.ticker.match(/^\\d{6}$/) && (
                                                                                <ChevronRightIcon className="w-4 h-4 text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-white" />
                                                                            )}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                            {/* Negative Stocks */}
                                                            {item.related.filter(r => r.sentiment === 'negative').length > 0 && (
                                                                <div className="space-y-2 mt-4">
                                                                    <div className="text-xs font-bold text-[#ff7c7e] mb-1 flex items-center gap-1"><ArrowDown className="w-3 h-3"/> 부정 우려</div>
                                                                    {item.related.filter(r => r.sentiment === 'negative').map((r, rIdx) => (
                                                                        <div key={`neg-${rIdx}`} className="flex items-center gap-3 bg-slate-900/50 p-2.5 rounded-lg border border-white/5 group">
                                                                            <StockLogo ticker={r.ticker} name={r.name} />
                                                                            <div className="flex-1 flex flex-col">
                                                                                <div className="flex items-center gap-1.5">
                                                                                    <span className="text-white text-sm font-bold">{r.name}</span>
                                                                                    {r.ticker.match(/^\\d{6}$/) ? (
                                                                                        <span className="text-slate-500 text-xs font-mono">{r.ticker}</span>
                                                                                    ) : (
                                                                                        <Badge variant="outline" className="text-[9px] px-1 py-0 h-4 border-slate-600 text-slate-400 bg-slate-800">해외</Badge>
                                                                                    )}
                                                                                </div>
                                                                                <span className="text-slate-400 text-xs mt-0.5">{r.comment}</span>
                                                                            </div>
                                                                            {r.ticker.match(/^\\d{6}$/) && (
                                                                                <ChevronRightIcon className="w-4 h-4 text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-white" />
                                                                            )}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Right Column */}
                                                <div className="space-y-6">
                                                    <div className="bg-slate-900/50 rounded-lg p-4 border border-white/5">
                                                        <div className="flex items-center gap-3 mb-3">
                                                            <ImpactBadge impact={item.impact} />
                                                            <Stars count={item.stars} className="text-lg [&>svg]:w-5 [&>svg]:h-5" />
                                                        </div>
                                                        <p className="text-slate-300 text-sm leading-relaxed">{item.analysis}</p>
                                                    </div>
                                                    
                                                    <div className="flex justify-start">
                                                        <Button variant="ghost" className="text-slate-300 border border-slate-600 hover:text-white hover:border-slate-400">
                                                            원문 보기 <ExternalLink className="w-4 h-4 ml-2" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 3. 긍/부정 종목 종합 — 2열 병렬 표시 */}
            <section>
                <SectionTitle icon={BarChart3} title="3. 긍/부정 종목 종합" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 상승·호재 기대 */}
                    <div className="bg-emerald-950/20 rounded-xl p-5 border border-emerald-900/40">
                        <h3 className="text-emerald-400 font-bold text-base mb-4 flex items-center gap-2">
                            <div className="bg-emerald-500/30 text-emerald-300 w-8 h-8 rounded-md flex items-center justify-center">
                                <TrendingUp className="w-5 h-5" />
                            </div>
                            상승 · 호재 기대
                        </h3>
                        <div className="space-y-3">
                            {data.positiveStocks.map((stock, i) => (
                                <div key={i} className="flex items-center gap-3 bg-emerald-950/30 p-3 rounded-lg border border-emerald-900/30">
                                    <StockLogo ticker={stock.ticker} name={stock.name} />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-white font-bold text-sm">{stock.name}</span>
                                            <span className="bg-emerald-950 text-emerald-300 border border-emerald-600 rounded px-1.5 py-0.5 text-[10px] font-mono font-bold">
                                                {stock.ticker}
                                            </span>
                                        </div>
                                        <div className="text-slate-300 text-xs">
                                            {stock.reason}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 하락·악재 우려 */}
                    <div className="bg-[#ff7c7e]/5 rounded-xl p-5 border border-[#ff7c7e]/20">
                        <h3 className="text-[#ff7c7e] font-bold text-base mb-4 flex items-center gap-2">
                            <div className="bg-[#ff7c7e]/20 text-[#ff7c7e] w-8 h-8 rounded-md flex items-center justify-center">
                                <TrendingDown className="w-5 h-5" />
                            </div>
                            하락 · 악재 우려
                        </h3>
                        <div className="space-y-3">
                            {data.negativeStocks.map((stock, i) => (
                                <div key={i} className="flex items-center gap-3 bg-[#ff7c7e]/5 p-3 rounded-lg border border-[#ff7c7e]/10">
                                    <StockLogo ticker={stock.ticker} name={stock.name} />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-white font-bold text-sm">{stock.name}</span>
                                            <span className="bg-[#ff7c7e]/10 text-[#ff7c7e] border border-[#ff7c7e]/40 rounded px-1.5 py-0.5 text-[10px] font-mono font-bold">
                                                {stock.ticker}
                                            </span>
                                        </div>
                                        <div className="text-slate-300 text-xs">
                                            {stock.reason}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. 섹터별 영향 분석 */}
            <section>
                <SectionTitle icon={Globe} title="4. 섹터별 영향 분석" />
                
                {/* 2x3 Grid of Sector Insight Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                    {data.sectorSummary.map((sector, i) => {
                        const total = sector.positive + sector.negative;
                        const posPct = total > 0 ? (sector.positive / total) * 100 : 50;
                        const isPos = sector.positive > sector.negative;
                        const isNeg = sector.negative > sector.positive;
                        
                        const bgClass = isPos ? "bg-emerald-950/15 border-emerald-900/30" : 
                                        isNeg ? "bg-[#ff7c7e]/5 border-[#ff7c7e]/15" : 
                                        "bg-slate-800/50 border-slate-700/50";
                        
                        return (
                            <div key={i} className={cn("p-5 rounded-xl border", bgClass)}>
                                <h4 className="font-bold text-white text-base mb-2 flex items-center gap-2">
                                    {sector.name} 
                                    {isPos ? <ArrowUp className="w-4 h-4 text-emerald-400" /> : isNeg ? <ArrowDown className="w-4 h-4 text-[#ff7c7e]" /> : <span className="text-slate-500">-</span>}
                                </h4>
                                <p className="text-slate-300 text-xs leading-relaxed mb-4 min-h-[32px]">
                                    {sector.comment}
                                </p>
                                <div className="flex justify-between items-center text-xs mb-1.5">
                                    <span className="text-emerald-400 font-bold">긍정 {sector.positive}건</span>
                                    <span className="text-[#ff7c7e] font-bold">부정 {sector.negative}건</span>
                                </div>
                                <div className="h-1.5 w-full flex rounded-full overflow-hidden bg-slate-800">
                                    <div className="bg-emerald-500" style={{width: `${posPct}%`}} />
                                    <div className="bg-[#ff7c7e]" style={{width: `${100-posPct}%`}} />
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Shrunken Pie Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl mx-auto opacity-90">
                    <div className="bg-slate-800/30 rounded-xl border border-white/5 p-4">
                        <h3 className="text-emerald-400 text-sm font-bold text-center mb-1">상승 기대가 높은 섹터</h3>
                        <p className="text-slate-400 text-[10px] text-center mb-4">어느 섹터가 가장 긍정 언급이 많았나?</p>
                        <div className="h-[180px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data.positiveSectors}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={45}
                                        outerRadius={70}
                                        paddingAngle={2}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {data.positiveSectors.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={SECTOR_COLORS[entry.name] || "#94a3b8"} />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                                        itemStyle={{ color: '#f8fafc' }}
                                    />
                                    <Legend wrapperStyle={{ fontSize: '11px', color: '#cbd5e1' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="bg-slate-800/30 rounded-xl border border-white/5 p-4">
                        <h3 className="text-[#ff7c7e] text-sm font-bold text-center mb-1">하락 우려가 높은 섹터</h3>
                        <p className="text-slate-400 text-[10px] text-center mb-4">어느 섹터가 가장 리스크 신호를 받았나?</p>
                        <div className="h-[180px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data.negativeSectors}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={45}
                                        outerRadius={70}
                                        paddingAngle={2}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {data.negativeSectors.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={SECTOR_COLORS[entry.name] || "#94a3b8"} />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                                        itemStyle={{ color: '#f8fafc' }}
                                    />
                                    <Legend wrapperStyle={{ fontSize: '11px', color: '#cbd5e1' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. 오늘의 투자 시사점 */}
            <section>
                <SectionTitle icon={Target} title="5. 오늘의 투자 시사점 (AI)" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* 매수 관점 */}
                    <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-xl p-5 flex flex-col">
                        <h4 className="text-emerald-400 font-bold mb-4 flex items-center gap-2 text-base"><CheckCircle2 className="w-5 h-5"/> 매수 관점 (BUY)</h4>
                        <ul className="space-y-3 text-sm text-slate-300 list-disc pl-4 mb-6 flex-1">
                            <li>AI·반도체 섹터: HBM, 데이터센터 장비 중심 투자 확대 유효</li>
                            <li>방산/우주 섹터: 지정학적 리스크 수혜로 중장기 모멘텀 유지</li>
                        </ul>
                        <div className="pt-4 border-t border-emerald-900/30">
                            <span className="text-slate-500 text-xs mr-2">대표 종목:</span>
                            <div className="inline-flex gap-1 flex-wrap">
                                <TickerChip className="bg-emerald-950 text-emerald-300 border-emerald-600">삼성전자</TickerChip>
                                <TickerChip className="bg-emerald-950 text-emerald-300 border-emerald-600">SK하이닉스</TickerChip>
                            </div>
                        </div>
                    </div>

                    {/* 관망 관점 */}
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 flex flex-col">
                        <h4 className="text-slate-300 font-bold mb-4 flex items-center gap-2 text-base"><PauseCircle className="w-5 h-5"/> 관망 관점 (WATCH)</h4>
                        <ul className="space-y-3 text-sm text-slate-300 list-disc pl-4 mb-6 flex-1">
                            <li>에너지 섹터: 유가 흐름 및 글로벌 경기 방향성 확인 필요</li>
                            <li>바이오/헬스케어 섹터: 임상 결과 및 규제 이슈 모니터링 요망</li>
                        </ul>
                        <div className="pt-4 border-t border-slate-700">
                            <span className="text-slate-500 text-xs mr-2">대표 종목:</span>
                            <div className="inline-flex gap-1 flex-wrap">
                                <TickerChip className="bg-slate-800 text-slate-300 border-slate-600">셀트리온</TickerChip>
                                <TickerChip className="bg-slate-800 text-slate-300 border-slate-600">LG화학</TickerChip>
                            </div>
                        </div>
                    </div>

                    {/* 주의 관점 */}
                    <div className="bg-[#ff7c7e]/5 border border-[#ff7c7e]/20 rounded-xl p-5 flex flex-col">
                        <h4 className="text-[#ff7c7e] font-bold mb-4 flex items-center gap-2 text-base"><AlertTriangle className="w-5 h-5"/> 주의 관점 (RISK)</h4>
                        <ul className="space-y-3 text-sm text-slate-300 list-disc pl-4 mb-6 flex-1">
                            <li>자동차 섹터: 관세 부과 및 수출 둔화 우려로 단기 변동성 확대</li>
                            <li>2차전지 섹터: 수요 둔화 및 경쟁 심화로 단기 조정 가능성</li>
                        </ul>
                        <div className="pt-4 border-t border-[#ff7c7e]/10">
                            <span className="text-slate-500 text-xs mr-2">대표 종목:</span>
                            <div className="inline-flex gap-1 flex-wrap">
                                <TickerChip className="bg-[#ff7c7e]/10 text-[#ff7c7e] border-[#ff7c7e]/40">현대차</TickerChip>
                                <TickerChip className="bg-[#ff7c7e]/10 text-[#ff7c7e] border-[#ff7c7e]/40">기아</TickerChip>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="text-slate-500 text-xs text-center mt-8">
                    본 리포트는 AI가 자동 수집·분석한 내용이며, 투자 판단의 참고 자료로만 활용해 주시기 바랍니다.
                </p>
            </section>

        </div>
    );
}
"""

with open("client/src/components/insight/SocialAnalysisView.tsx", "w") as f:
    f.write(content)

