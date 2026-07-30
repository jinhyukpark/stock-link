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
    } else if (ticker !== "N/A") {
        logoUrl = `https://logo.clearbit.com/${ticker.toLowerCase()}.com`;
    }

    const defaultClass = className || "w-8 h-8 rounded-lg";

    if (imgError || !ticker || ticker === "N/A" || !logoUrl) {
        return (
            <div className={cn("bg-slate-700 flex items-center justify-center text-white text-xs font-bold shrink-0", defaultClass)}>
                {name.charAt(0)}
            </div>
        );
    }

    return (
        <img 
            src={logoUrl} 
            alt={name} 
            className={cn("object-contain bg-white shrink-0", defaultClass)}
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

    const defaultClass = className || "w-10 h-10 rounded-full border-2 border-slate-600";

    if (imgError || !imgUrl) {
        return (
            <div className={cn("bg-slate-600 flex items-center justify-center text-white text-sm font-bold shrink-0", defaultClass)}>
                {name.charAt(0)}
            </div>
        );
    }

    return (
        <img 
            src={imgUrl} 
            alt={name} 
            className={cn("object-cover shrink-0", defaultClass)}
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
        table: [
            { 
                id: 1, 
                speaker: "일론 머스크", 
                country: "미국",
                flag: "🇺🇸",
                platform: "X (Twitter)", 
                summary: "Optimus 로봇 양산 라인 구축 위해 250억 달러 설비투자 상향 발표. Optimus 로봇 양산 로드맵은 AI 로봇 섹터 전반에 촉매가 될 수 있으며, 국내 메모리 반도체 훈풍은 중장기적으로 유효할 것으로 보임.", 
                positiveStocks: [{ ticker: "005930", name: "삼성전자" }, { ticker: "000660", name: "SK하이닉스" }],
                negativeStocks: [{ ticker: "TSLA", name: "Tesla" }],
                direction: "수혜",
                stars: 3
            },
            { 
                id: 2, 
                speaker: "도널드 트럼프", 
                country: "미국",
                flag: "🇺🇸",
                platform: "Truth Social", 
                summary: "미국 제조업 부활 위한 15% 보편 관세 부과 필요성 강경 발언 지속. 최근 관세 발언이 시장의 핵심 리스크 변수로 작용 중.", 
                positiveStocks: [],
                negativeStocks: [{ ticker: "005380", name: "현대차" }, { ticker: "000270", name: "기아" }],
                direction: "리스크",
                stars: 3
            },
            { 
                id: 3, 
                speaker: "미국 경제 유튜버 A", 
                country: "미국",
                flag: "🇺🇸",
                platform: "YouTube", 
                summary: "AI 전력 수요 폭발로 데이터센터 인프라 투자 지속될 것. AI 데이터센터 건설 붐으로 인해 전력기기 및 인프라 관련 수요 급증은 다년간 지속될 메가 트렌드.", 
                positiveStocks: [{ ticker: "010120", name: "LS일렉트릭" }],
                negativeStocks: [],
                direction: "수혜",
                stars: 2
            },
            { 
                id: 4, 
                speaker: "한국 애널리스트 B", 
                country: "한국",
                flag: "🇰🇷",
                platform: "News", 
                summary: "조선업 슈퍼사이클 진입 및 미국 함정 MRO 사업 수혜 기대. 미국 해군 함정 MRO 사업 진출과 신조선가 상승 흐름이 맞물리며 주요 조선사 수익성 개선 본격화 전망.", 
                positiveStocks: [{ ticker: "042660", name: "한화오션" }],
                negativeStocks: [],
                direction: "수혜",
                stars: 2
            }
        ],
        positiveStocks: [
            { ticker: "005930", name: "삼성전자", reason: "AI 로봇 투자 확대로 메모리 반도체 수요 급증 기대" },
            { ticker: "000660", name: "SK하이닉스", reason: "역대 최대 실적 및 HBM 독주 체제로 탄력 기대" },
            { ticker: "042660", name: "한화오션", reason: "미국 함정 MRO 사업 본격 진출로 모멘텀 포착" }
        ],
        negativeStocks: [
            { ticker: "005380", name: "현대차", reason: "미국 보편 관세 15% 적용 시 수출 역풍 우려" },
            { ticker: "TSLA", name: "Tesla", reason: "단기 Capex 급증으로 인한 수익성 악화 우려로 경계 필요" },
            { ticker: "N/A", name: "건설주 전반", reason: "금리 동결 장기화로 인한 PF 부담 가중" }
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
    "2026-04-25": {
        highlights: [
            <><HighlightInfluencer>미국 핀테크 블로거 B</HighlightInfluencer>, X에서 금리 인하 지연 가능성 시사 → 성장주 <HighlightNeg>변동성 주의</HighlightNeg></>
        ],
        table: [
            { 
                id: 5, 
                speaker: "미국 핀테크 블로거", 
                country: "미국",
                flag: "🇺🇸",
                platform: "X (Twitter)", 
                summary: "고용 지표 강세로 연내 금리 인하 사실상 무산 위기. 밸류에이션 할인이 불가피.", 
                positiveStocks: [],
                negativeStocks: [{ ticker: "035720", name: "카카오" }],
                direction: "리스크",
                stars: 2
            }
        ],
        positiveStocks: [],
        negativeStocks: [
            { ticker: "035720", name: "카카오", reason: "성장주 할인율 상승에 따른 부담 가중" }
        ],
        positiveSectors: [ { name: "금융", value: 4 } ],
        negativeSectors: [ { name: "플랫폼/IT", value: 8 } ],
        sectorSummary: [
            { name: "플랫폼/IT", positive: 20, negative: 80, comment: "성장주 전반에 조정 압박이 거세지고 있습니다." }
        ]
    },
    "2026-04-24": {
        highlights: [
            <><HighlightInfluencer>짐 크레이머</HighlightInfluencer>, CNBC에서 에너지 섹터 비중 축소 권고 → 정유주 <HighlightNeg>조정 압박</HighlightNeg></>
        ],
        table: [
            { 
                id: 6, 
                speaker: "짐 크레이머", 
                country: "미국",
                flag: "🇺🇸",
                platform: "CNBC", 
                summary: "유가 정점 통과 가능성. 에너지 관련주 비중 축소 의견 제시. 지정학적 리스크 완화로 유가 상승 꺾일 수 있음.", 
                positiveStocks: [],
                negativeStocks: [{ ticker: "010950", name: "S-Oil" }],
                direction: "리스크",
                stars: 3 
            }
        ],
        positiveStocks: [
            { ticker: "090430", name: "아모레퍼시픽", reason: "미국 매출 고성장세로 수혜 흐름 지속" }
        ],
        negativeStocks: [
            { ticker: "010950", name: "S-Oil", reason: "유가 하락 및 정제마진 축소로 역풍 우려" }
        ],
        positiveSectors: [ { name: "바이오", value: 9 } ],
        negativeSectors: [ { name: "에너지", value: 8 } ],
        sectorSummary: [
            { name: "에너지", positive: 10, negative: 90, comment: "단기 모멘텀 둔화로 발목이 잡힐 수 있는 구간입니다." }
        ]
    }
};

const SectionTitle = ({ icon: Icon, title, subtitle, hideTopBorder }: { icon: any, title: string, subtitle?: string, hideTopBorder?: boolean }) => (
    <div className={cn("pb-3 mb-6 flex flex-col md:flex-row md:items-end gap-2 md:gap-3", !hideTopBorder && "border-t-2 border-slate-600 pt-6")}>
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

const BenefitChip = ({ name, ticker }: { name: string, ticker: string }) => (
    <div className="flex items-center gap-1 bg-emerald-950 border border-emerald-700 text-emerald-300 rounded-md px-2 py-1 text-xs font-medium w-fit">
        <StockLogo ticker={ticker} name={name} className="w-5 h-5 rounded-sm object-cover bg-white" />
        <span>{name}</span>
    </div>
);

const RiskChip = ({ name, ticker }: { name: string, ticker: string }) => (
    <div className="flex items-center gap-1 bg-[#ff7c7e]/10 border border-[#ff7c7e]/40 text-[#ff7c7e] rounded-md px-2 py-1 text-xs font-medium w-fit">
        <StockLogo ticker={ticker} name={name} className="w-5 h-5 rounded-sm object-cover bg-white" />
        <span>{name}</span>
    </div>
);

const DATES = ["2026-04-24", "2026-04-25", "2026-04-26"];

export default function SocialAnalysisView() {
    const [dateKey, setDateKey] = useState<string>("2026-04-26");

    const data = MOCK_DATA[dateKey as keyof typeof MOCK_DATA] || MOCK_DATA["2026-04-26"];

    return (
        <div className="space-y-4 pb-20 animate-in fade-in duration-500 max-w-7xl mx-auto relative overflow-hidden">
            
            {/* Header */}
            <div className="flex flex-col gap-4 mb-8">
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

                    <div className="flex flex-col items-end gap-2 shrink-0">
                        {/* Pill Date Tabs */}
                        <div className="flex items-center gap-2 bg-slate-800/50 p-1.5 rounded-lg border border-slate-700">
                            {DATES.map(d => {
                                const isActive = dateKey === d;
                                const formatted = format(new Date(d), "MM/dd");
                                return (
                                    <button 
                                        key={d}
                                        onClick={() => setDateKey(d)}
                                        className={cn(
                                            "px-4 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5",
                                            isActive ? "bg-blue-600 text-white shadow-sm" : "text-slate-400 hover:text-slate-200 hover:bg-slate-700"
                                        )}
                                    >
                                        {formatted}
                                        {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                    </button>
                                )
                            })}
                        </div>
                        <span className="text-slate-400 text-[11px]">업데이트: {format(new Date(dateKey), "yyyy.MM.dd")} 18:30 KST</span>
                    </div>
                </div>
            </div>

            {/* 1. 주요 하이라이트 */}
            <section className="mb-16">
                <SectionTitle icon={Megaphone} title="주요 하이라이트" hideTopBorder />
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

            {/* 2. 종합 분석 테이블 */}
            <section className="mb-16">
                <SectionTitle icon={Target} title="주요 인사 발언 및 시장 영향" subtitle="오늘 증권 관련 주요 발언과 시장 영향을 모니터링했습니다" />
                <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden shadow-lg w-full overflow-x-auto custom-scrollbar">
                    
                    {/* Header */}
                    <div className="flex gap-4 items-center bg-slate-800 px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider min-w-[1000px]">
                        <div className="w-48 shrink-0">인물</div>
                        <div className="w-28 shrink-0 text-center">플랫폼</div>
                        <div className="flex-1 min-w-[180px]">발언 요약</div>
                        <div className="w-40 shrink-0 text-center text-emerald-400">📈 수혜 종목</div>
                        <div className="w-40 shrink-0 text-center text-[#ff7c7e]">📉 리스크 종목</div>
                        <div className="w-20 shrink-0 text-center">방향</div>
                        <div className="w-24 shrink-0 text-center">강도</div>
                    </div>

                    {/* Body */}
                    <div className="flex flex-col min-w-[1000px]">
                        {data.table.map((item, i) => {
                            return (
                                <div 
                                    key={`row-${item.id}`} 
                                    className={cn(
                                        "flex gap-4 px-6 py-5 items-start border-b border-white/5",
                                        i % 2 === 0 ? "bg-slate-800/60" : "bg-slate-900",
                                    )}
                                >
                                    {/* 인물: 아바타 + 이름 + 국기 + 소속국가 텍스트 */}
                                    <div className="w-48 shrink-0 flex items-center gap-3">
                                        <div className="flex flex-col items-center gap-1">
                                            <Avatar name={item.speaker} />
                                            <span className="text-slate-500 text-[10px] text-center">{item.country}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex items-center">
                                                <span className="text-white font-bold text-base">{item.speaker}</span>
                                                <span className="text-sm ml-1">{item.flag}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 플랫폼 */}
                                    <div className="w-28 shrink-0 flex justify-center mt-2">
                                        <PlatformBadge platform={item.platform} />
                                    </div>

                                    {/* 발언 요약 (최대 3줄) */}
                                    <div className="flex-1 min-w-[180px] text-slate-200 text-sm leading-relaxed line-clamp-3 mt-1 pr-4">
                                        "{item.summary}"
                                    </div>

                                    {/* 수혜 종목 */}
                                    <div className="w-40 shrink-0 flex flex-wrap gap-1 content-start mt-1">
                                        {item.positiveStocks.length > 0 ? (
                                            item.positiveStocks.map((stock, idx) => (
                                                <BenefitChip key={idx} name={stock.name} ticker={stock.ticker} />
                                            ))
                                        ) : (
                                            <div className="w-full text-center text-slate-600 text-xs mt-1">-</div>
                                        )}
                                    </div>

                                    {/* 리스크 종목 */}
                                    <div className="w-40 shrink-0 flex flex-wrap gap-1 content-start mt-1">
                                        {item.negativeStocks.length > 0 ? (
                                            item.negativeStocks.map((stock, idx) => (
                                                <RiskChip key={idx} name={stock.name} ticker={stock.ticker} />
                                            ))
                                        ) : (
                                            <div className="w-full text-center text-slate-600 text-xs mt-1">-</div>
                                        )}
                                    </div>

                                    {/* 방향 */}
                                    <div className="w-20 shrink-0 flex justify-center mt-1">
                                        <ImpactBadge impact={item.direction} />
                                    </div>

                                    {/* 강도 */}
                                    <div className="w-24 shrink-0 flex justify-center mt-2">
                                        <Stars count={item.stars} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 3. 긍/부정 종목 종합 -> 수혜 가능 / 리스크 주시 종목 */}
            <section className="mb-16">
                <SectionTitle icon={BarChart3} title="수혜 가능 / 리스크 주시 종목" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 수혜 가능 종목 */}
                    <div className="bg-emerald-950/20 rounded-xl p-5 border border-emerald-900/40">
                        <h3 className="text-emerald-400 font-bold text-base mb-4 flex items-center gap-2">
                            <div className="bg-emerald-500/30 text-emerald-300 w-8 h-8 rounded-md flex items-center justify-center">
                                <TrendingUp className="w-5 h-5" />
                            </div>
                            수혜 가능 종목
                        </h3>
                        <div className="flex flex-col gap-3">
                            {data.positiveStocks.length > 0 ? data.positiveStocks.map((stock, i) => (
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
                            )) : (
                                <div className="text-slate-500 text-sm py-4 text-center">관련 종목이 없습니다.</div>
                            )}
                        </div>
                    </div>

                    {/* 리스크 주시 종목 */}
                    <div className="bg-[#ff7c7e]/5 rounded-xl p-5 border border-[#ff7c7e]/20">
                        <h3 className="text-[#ff7c7e] font-bold text-base mb-4 flex items-center gap-2">
                            <div className="bg-[#ff7c7e]/20 text-[#ff7c7e] w-8 h-8 rounded-md flex items-center justify-center">
                                <TrendingDown className="w-5 h-5" />
                            </div>
                            리스크 주시 종목
                        </h3>
                        <div className="flex flex-col gap-3">
                            {data.negativeStocks.length > 0 ? data.negativeStocks.map((stock, i) => (
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
                            )) : (
                                <div className="text-slate-500 text-sm py-4 text-center">관련 종목이 없습니다.</div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. 섹터별 영향 분석 */}
            <section className="mb-16">
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

            {/* 5. 오늘의 투자 시사점 */}
            <section className="mb-16">
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

