import os

content = """import { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { TrendingUp, TrendingDown, Globe, Megaphone, Target, Calendar as CalendarIcon, ChevronDown, BarChart3, Newspaper, Twitter, Star, MessageSquare, ArrowUp, ArrowDown, ChevronLeft, ChevronRight, X, ExternalLink, ChevronRight as ChevronRightIcon, CheckCircle2, PauseCircle, AlertTriangle, Activity } from "lucide-react";
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
    else if (name === "LS일렉트릭") logoUrl = "https://logo.clearbit.com/ls-electric.com";
    else if (name === "한화오션") logoUrl = "https://logo.clearbit.com/hanwhaocean.com";
    else if (name === "셀트리온") logoUrl = "https://logo.clearbit.com/celltrion.com";
    else if (name === "S-Oil") logoUrl = "https://logo.clearbit.com/s-oil.com";
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
    "플랫폼/IT": "#a78bfa",
    "자동차": "#ef4444",
    "조선": "#0ea5e9",
    "전력설비": "#eab308",
    "건설": "#a8a29e"
};

const MOCK_DATA = {
    "2026-04-26": {
        highlights: [
            <><HighlightInfluencer>일론 머스크</HighlightInfluencer>, X에서 반도체 공급망 이슈 언급 → <TickerChip>삼성전자</TickerChip> <TickerChip>SK하이닉스</TickerChip> <HighlightPos>주목 집중</HighlightPos></>,
            <><HighlightInfluencer>도널드 트럼프</HighlightInfluencer>, Truth Social에서 관세 정책 재차 강조 → 자동차/수출주 <HighlightNeg>역풍 우려</HighlightNeg></>,
            <><HighlightInfluencer>미국 핀테크 유튜버 3인</HighlightInfluencer>, 금리 동결 전망 언급 → 금융주 <HighlightPos>모멘텀 포착</HighlightPos></>,
            <><HighlightInfluencer>국내 경제 유튜버</HighlightInfluencer>, 2차전지 섹터 조정 경고 → 관련주 <HighlightNeg>조정 압박</HighlightNeg></>
        ],
        speakers: [
            { id: 1, speaker: "일론 머스크", platform: "X (Twitter)", sector: "AI·반도체", summary: "Optimus 로봇 양산 라인 구축 위해 250억 달러 설비투자 상향 발표", followers: "팔로워 1.8억명", time: "04:22", fullText: <><HighlightPos>Optimus 로봇 양산 로드맵은 AI 로봇 섹터 전반에 촉매</HighlightPos>가 될 수 있으며, 250억 달러 capex 투자와 맞물려 국내 메모리 반도체 훈풍은 <HighlightPos>중장기적으로 유효</HighlightPos>.</> },
            { id: 2, speaker: "도널드 트럼프", platform: "Truth Social", sector: "자동차·소비재", summary: "미국 제조업 부활 위한 15% 보편 관세 부과 필요성 강경 발언", followers: "팔로워 650만명", time: "10:15", fullText: <><HighlightNeg>관세 정책이 미국 제조업 부활, 재정적자 감소, 인플레이션 억제에 도움</HighlightNeg>이 된다는 취지 발언 지속. 최근 관세 발언이 시장의 <HighlightNeg>핵심 리스크 변수</HighlightNeg>로 작용 중.</> },
            { id: 3, speaker: "미국 경제 유튜버 A", platform: "YouTube", sector: "전력·인프라", summary: "AI 전력 수요 폭발로 데이터센터 인프라 투자 지속될 것", followers: "구독자 120만명", time: "13:40", fullText: <>AI 데이터센터 건설 붐으로 인해 전력기기 및 인프라 관련 수요가 급증하고 있으며 이는 단기 테마가 아닌 다년간 지속될 메가 트렌드입니다.</> },
            { id: 4, speaker: "한국 애널리스트 B", platform: "News", sector: "조선·방산", summary: "조선업 슈퍼사이클 진입 및 미국 함정 MRO 사업 수혜 기대", followers: "증권사 리서치 센터", time: "08:30", fullText: <><HighlightPos>미국 해군 함정 MRO 사업 진출과 신조선가 상승 흐름</HighlightPos>이 맞물리며 국내 주요 조선사들의 <HighlightPos>수익성 개선이 본격화</HighlightPos>될 전망입니다.</> }
        ],
        marketImpact: [
            { id: 1, ticker: "005930", name: "삼성전자", sector: "반도체", comment: "Tesla AI 로봇 투자 확대로 메모리 반도체 수요 증가 기대", direction: "수혜", stars: 3, influencer: "일론 머스크" },
            { id: 2, ticker: "000660", name: "SK하이닉스", sector: "반도체", comment: "AI 인프라 투자 확대 모멘텀 포착", direction: "수혜", stars: 3, influencer: "일론 머스크" },
            { id: 3, ticker: "005380", name: "현대차", sector: "자동차", comment: "미국 관세 15% 적용으로 영업이익 부담 가중", direction: "리스크", stars: 3, influencer: "도널드 트럼프" },
            { id: 4, ticker: "000270", name: "기아", sector: "자동차", comment: "미국 수출 물량 역풍 우려", direction: "리스크", stars: 3, influencer: "도널드 트럼프" },
            { id: 5, ticker: "010120", name: "LS일렉트릭", sector: "전력설비", comment: "북미 데이터센터 전력기기 수주 모멘텀 지속", direction: "수혜", stars: 2, influencer: "미국 경제 유튜버 A" },
            { id: 6, ticker: "042660", name: "한화오션", sector: "조선", comment: "미국 해군 함정 MRO 사업 본격 진출 수혜", direction: "수혜", stars: 2, influencer: "한국 애널리스트 B" },
            { id: 7, ticker: "000720", name: "현대건설", sector: "건설", comment: "금리 동결 장기화로 프로젝트 파이낸싱 발목 잡힐 수 있어", direction: "리스크", stars: 2, influencer: "월가 핀테크 블로거 C" },
            { id: 8, ticker: "068270", name: "셀트리온", sector: "바이오/헬스케어", comment: "신약 파이프라인 임상 결과 관망세 짙어짐", direction: "관망", stars: 1, influencer: "글로벌 매크로 분석가" }
        ],
        positiveStocks: [
            { ticker: "005930", name: "삼성전자", reason: "AI 로봇 투자 확대로 메모리 반도체 수요 급증 기대", influencer: "일론 머스크" },
            { ticker: "000660", name: "SK하이닉스", reason: "역대 최대 실적 및 HBM 독주 체제로 탄력 기대", influencer: "일론 머스크, 한국 애널리스트" },
            { ticker: "042660", name: "한화오션", reason: "미국 함정 MRO 사업 본격 진출로 모멘텀 포착", influencer: "한국 애널리스트 B" }
        ],
        negativeStocks: [
            { ticker: "005380", name: "현대차", reason: "미국 보편 관세 15% 적용 시 수출 역풍 우려", influencer: "도널드 트럼프" },
            { ticker: "TSLA", name: "Tesla", reason: "단기 Capex 급증으로 인한 수익성 악화 우려로 경계 필요", influencer: "일론 머스크" },
            { ticker: "N/A", name: "건설주 전반", reason: "금리 동결 장기화로 인한 PF 부담 가중", influencer: "월가 핀테크 블로거" }
        ],
        positiveSectors: [
            { name: "반도체", value: 85 },
            { name: "조선", value: 72 },
            { name: "전력설비", value: 61 }
        ],
        negativeSectors: [
            { name: "자동차", value: 55 },
            { name: "2차전지", value: 43 },
            { name: "건설", value: 36 }
        ],
        sectorSummary: [
            { name: "반도체", positive: 85, negative: 10, comment: "AI 설비 발언 이후 시선이 쏠리고 있습니다." },
            { name: "조선", positive: 72, negative: 11, comment: "미국 함정 MRO 모멘텀으로 단기 반등 불씨가 살아날지 주목됩니다." },
            { name: "전력설비", positive: 61, negative: 22, comment: "인프라 투자 확대로 구조적 수혜가 기대됩니다." },
            { name: "바이오/헬스케어", positive: 48, negative: 27, comment: "임상 불확실성 속 방향을 가늠하기 어려운 시점입니다." },
            { name: "자동차", positive: 30, negative: 55, comment: "관세 우려가 다시 수면 위로 올라왔습니다." },
            { name: "2차전지", positive: 28, negative: 43, comment: "수요 둔화 우려로 고점 부담이 쌓이는 구간입니다." }
        ]
    },
    "default": {
        highlights: [
            <><HighlightInfluencer>짐 크레이머</HighlightInfluencer>, CNBC에서 에너지 섹터 비중 축소 권고 → 정유주 <HighlightNeg>조정 압박</HighlightNeg></>
        ],
        speakers: [
            { id: 6, speaker: "짐 크레이머", platform: "CNBC", sector: "에너지", summary: "유가 정점 통과 가능성. 에너지 관련주 비중 축소 의견 제시", followers: "시청자 300만명", time: "22:30", fullText: <><HighlightNeg>지정학적 리스크 완화</HighlightNeg>로 유가 상승 꺾일 수 있음.</> }
        ],
        marketImpact: [
            { id: 9, ticker: "010950", name: "S-Oil", sector: "에너지", comment: "정제마진 하락 및 유가 피크아웃 우려", direction: "리스크", stars: 3, influencer: "짐 크레이머" }
        ],
        positiveStocks: [
            { ticker: "090430", name: "아모레퍼시픽", reason: "미국 매출 고성장세", influencer: "한국 애널리스트" }
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

const SectionTitle = ({ icon: Icon, title, subtitle }: { icon: any, title: string, subtitle?: string }) => (
    <div className="border-b border-white/10 pb-3 mb-6 flex flex-col md:flex-row md:items-end gap-2 md:gap-3">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Icon className="w-5 h-5 text-blue-400" />
            {title}
        </h2>
        {subtitle && <span className="text-slate-400 text-xs mb-0.5">{subtitle}</span>}
    </div>
);

const ImpactBadge = ({ impact }: { impact: string }) => {
    if (impact === "수혜") return <span className="inline-block rounded-lg bg-emerald-500 text-white font-bold px-3 py-1 text-sm shadow-sm">수혜</span>;
    if (impact === "리스크") return <span className="inline-block rounded-lg bg-[#ff7c7e] text-white font-bold px-3 py-1 text-sm shadow-sm">리스크</span>;
    return <span className="inline-block rounded-lg bg-slate-500 text-white font-bold px-3 py-1 text-sm shadow-sm">관망</span>;
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
    const [expandedSpeaker, setExpandedSpeaker] = useState<number | null>(null);
    
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

            {/* 2. ① 주요 인사 발언 (상단) */}
            <section>
                <SectionTitle icon={Target} title="주요 인사 발언" subtitle="오늘 증권 관련 주요 발언을 모니터링했습니다" />
                <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden shadow-lg">
                    {/* Header */}
                    <div className="grid grid-cols-[1.5fr_100px_2.5fr_120px_100px_40px] gap-4 bg-slate-800 px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider items-center">
                        <div>인물</div>
                        <div className="text-center">플랫폼</div>
                        <div>발언 요약</div>
                        <div className="text-center">관련 섹터</div>
                        <div className="text-center">시간</div>
                        <div></div>
                    </div>

                    {/* Body */}
                    <div className="flex flex-col">
                        {data.speakers.map((item, i) => {
                            const isExpanded = expandedSpeaker === item.id;
                            const isKorean = item.speaker.includes("한국") || item.speaker.includes("국내") || item.speaker === "이재용" || item.speaker === "정의선" || item.speaker.includes("A") || item.speaker.includes("B") || item.speaker.includes("C");

                            return (
                                <div key={`speaker-${item.id}`} className="flex flex-col">
                                    <div 
                                        onClick={() => setExpandedSpeaker(isExpanded ? null : item.id)}
                                        className={cn(
                                            "grid grid-cols-[1.5fr_100px_2.5fr_120px_100px_40px] gap-4 px-6 items-center cursor-pointer transition-colors border-b border-white/5",
                                            i % 2 === 0 ? "bg-slate-800/60" : "bg-slate-900",
                                            "py-5 hover:bg-slate-800/80"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Avatar name={item.speaker} />
                                            <div className="flex flex-col">
                                                <div className="flex items-center">
                                                    <span className="text-white font-bold text-base">{item.speaker}</span>
                                                    <span className="text-xs ml-1">{isKorean ? "🇰🇷" : "🇺🇸"}</span>
                                                </div>
                                                <span className="text-slate-400 text-xs">{item.followers}</span>
                                            </div>
                                        </div>

                                        <div className="flex justify-center">
                                            <PlatformBadge platform={item.platform} />
                                        </div>

                                        <div className="text-slate-200 text-sm leading-relaxed pr-4">
                                            "{item.summary}"
                                        </div>

                                        <div className="flex justify-center text-slate-300 text-sm font-medium">
                                            {item.sector}
                                        </div>

                                        <div className="flex justify-center text-slate-400 text-xs font-mono">
                                            {item.time}
                                        </div>

                                        <div className="flex justify-center text-slate-500">
                                            {isExpanded ? <ChevronDown className="w-5 h-5"/> : <ChevronRightIcon className="w-5 h-5"/>}
                                        </div>
                                    </div>

                                    {/* Expanded Accordion Area */}
                                    {isExpanded && (
                                        <div className="bg-slate-800/80 border-b border-slate-700 p-6 w-full animate-in fade-in slide-in-from-top-2">
                                            <div className="bg-slate-900/50 rounded-lg p-5 border border-white/5 mb-4">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <MessageSquare className="w-4 h-4 text-blue-400" />
                                                    <h4 className="text-sm font-bold text-white">발언 원문</h4>
                                                </div>
                                                <p className="text-slate-300 text-sm leading-relaxed">{item.fullText}</p>
                                            </div>
                                            <div className="flex justify-end">
                                                <Button variant="ghost" className="text-slate-300 border border-slate-600 hover:text-white hover:border-slate-400">
                                                    원문 보기 <ExternalLink className="w-4 h-4 ml-2" />
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <div className="border-t border-slate-700/60 my-8"></div>

            {/* 3. ② 시장 영향 분석 (하단) */}
            <section>
                <SectionTitle icon={TrendingUp} title="시장 영향 분석" subtitle="각 발언이 국내 증시에 미칠 영향을 분석했습니다" />
                <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden shadow-lg">
                    {/* Header */}
                    <div className="grid grid-cols-[1.5fr_100px_2.5fr_80px_100px_1.5fr] gap-4 bg-slate-800 px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider items-center">
                        <div>종목</div>
                        <div className="text-center">섹터</div>
                        <div>영향 근거</div>
                        <div className="text-center">방향</div>
                        <div className="text-center">강도</div>
                        <div>주요 언급 인사</div>
                    </div>

                    {/* Body */}
                    <div className="flex flex-col">
                        {data.marketImpact.map((item, i) => {
                            const isHighImpact = item.stars >= 3;
                            return (
                                <div 
                                    key={`impact-${item.id}`} 
                                    className={cn(
                                        "grid grid-cols-[1.5fr_100px_2.5fr_80px_100px_1.5fr] gap-4 px-6 items-center border-b border-white/5",
                                        isHighImpact ? "border-l-2 border-l-amber-400" : "border-l-2 border-l-transparent",
                                        i % 2 === 0 ? "bg-slate-800/60" : "bg-slate-900",
                                        "py-5"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <StockLogo ticker={item.ticker} name={item.name} />
                                        <div className="flex flex-col">
                                            <span className="text-white font-bold text-sm">{item.name}</span>
                                            {item.ticker.match(/^\\d{6}$/) ? (
                                                <span className="text-slate-500 text-[10px] font-mono">{item.ticker}</span>
                                            ) : (
                                                <Badge variant="outline" className="w-fit text-[9px] px-1 py-0 h-4 border-slate-600 text-slate-400 bg-slate-800">해외</Badge>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex justify-center text-slate-300 text-xs">
                                        {item.sector}
                                    </div>

                                    <div className="text-slate-200 text-sm leading-relaxed pr-2">
                                        {item.comment}
                                    </div>

                                    <div className="flex justify-center">
                                        <ImpactBadge impact={item.direction} />
                                    </div>

                                    <div className="flex justify-center">
                                        <Stars count={item.stars} />
                                    </div>

                                    <div className="flex items-center gap-2 text-slate-300 text-sm">
                                        <Avatar name={item.influencer} className="w-6 h-6 text-[10px]" />
                                        <span className="font-medium">{item.influencer}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 4. 긍/부정 종목 종합 -> 수혜 가능 / 리스크 주시 종목 */}
            <section>
                <SectionTitle icon={BarChart3} title="수혜 가능 / 리스크 주시 종목" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 상승·호재 기대 */}
                    <div className="bg-emerald-950/20 rounded-xl p-5 border border-emerald-900/40">
                        <h3 className="text-emerald-400 font-bold text-base mb-4 flex items-center gap-2">
                            <div className="bg-emerald-500/30 text-emerald-300 w-8 h-8 rounded-md flex items-center justify-center">
                                <TrendingUp className="w-5 h-5" />
                            </div>
                            수혜 가능 종목
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
                            리스크 주시 종목
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

            {/* 5. 섹터별 영향 분석 */}
            <section>
                <SectionTitle icon={Globe} title="섹터별 영향 분석" />
                
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
                                    <span className="text-emerald-400 font-bold">수혜 흐름 {sector.positive}건</span>
                                    <span className="text-[#ff7c7e] font-bold">리스크 요인 {sector.negative}건</span>
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
                        <h3 className="text-emerald-400 text-sm font-bold text-center mb-1">수혜 가능성이 높은 섹터</h3>
                        <p className="text-slate-400 text-[10px] text-center mb-4">어느 섹터가 가장 수혜 언급이 많았나?</p>
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
                        <h3 className="text-[#ff7c7e] text-sm font-bold text-center mb-1">리스크 주시 섹터</h3>
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

            {/* 6. 오늘의 투자 시사점 */}
            <section>
                <SectionTitle icon={Activity} title="오늘의 시장 인사이트 (AI)" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* 담아볼 만한 흐름 */}
                    <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-xl p-5 flex flex-col">
                        <h4 className="text-emerald-400 font-bold mb-4 flex items-center gap-2 text-base"><CheckCircle2 className="w-5 h-5"/> 담아볼 만한 흐름</h4>
                        <ul className="space-y-3 text-sm text-slate-300 list-disc pl-4 mb-6 flex-1">
                            <li>AI·반도체 섹터: HBM, 데이터센터 장비 중심의 모멘텀 포착</li>
                            <li>방산/우주 섹터: 지정학적 리스크 수혜로 중장기 탄력 기대</li>
                        </ul>
                        <div className="pt-4 border-t border-emerald-900/30">
                            <span className="text-slate-500 text-xs mr-2">대표 종목:</span>
                            <div className="inline-flex gap-1 flex-wrap">
                                <TickerChip className="bg-emerald-950 text-emerald-300 border-emerald-600">삼성전자</TickerChip>
                                <TickerChip className="bg-emerald-950 text-emerald-300 border-emerald-600">SK하이닉스</TickerChip>
                            </div>
                        </div>
                    </div>

                    {/* 좀 더 지켜볼 구간 */}
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 flex flex-col">
                        <h4 className="text-slate-300 font-bold mb-4 flex items-center gap-2 text-base"><PauseCircle className="w-5 h-5"/> 좀 더 지켜볼 구간</h4>
                        <ul className="space-y-3 text-sm text-slate-300 list-disc pl-4 mb-6 flex-1">
                            <li>에너지 섹터: 유가 흐름 및 글로벌 경기 방향 탐색 중</li>
                            <li>바이오/헬스케어 섹터: 임상 결과 및 규제 이슈 관망세</li>
                        </ul>
                        <div className="pt-4 border-t border-slate-700">
                            <span className="text-slate-500 text-xs mr-2">대표 종목:</span>
                            <div className="inline-flex gap-1 flex-wrap">
                                <TickerChip className="bg-slate-800 text-slate-300 border-slate-600">셀트리온</TickerChip>
                                <TickerChip className="bg-slate-800 text-slate-300 border-slate-600">LG화학</TickerChip>
                            </div>
                        </div>
                    </div>

                    {/* 한 발 물러설 이유 */}
                    <div className="bg-[#ff7c7e]/5 border border-[#ff7c7e]/20 rounded-xl p-5 flex flex-col">
                        <h4 className="text-[#ff7c7e] font-bold mb-4 flex items-center gap-2 text-base"><AlertTriangle className="w-5 h-5"/> 한 발 물러설 이유</h4>
                        <ul className="space-y-3 text-sm text-slate-300 list-disc pl-4 mb-6 flex-1">
                            <li>자동차 섹터: 관세 부과 및 수출 역풍 우려로 경계 필요</li>
                            <li>2차전지 섹터: 수요 둔화 및 경쟁 심화로 조정 압박 가중</li>
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

