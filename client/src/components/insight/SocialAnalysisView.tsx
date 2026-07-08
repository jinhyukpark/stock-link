import { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { TrendingUp, TrendingDown, Globe, Megaphone, Target, Calendar as CalendarIcon, ChevronDown, BarChart3, Newspaper, Twitter, Star, MessageSquare, ArrowUp, ArrowDown, ChevronLeft, ChevronRight, X, ExternalLink, ChevronRight as ChevronRightIcon, CheckCircle2, PauseCircle, AlertTriangle, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Image Source Helpers
const flagUrl = (countryCode: string) => `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;

const influencerAvatars: Record<string, string> = {
  '일론 머스크': '/images/drawn_elon.png',
  '도널드 트럼프': '/images/drawn_trump.png',
  '이창용': '/images/drawn_lee.png',
  '케빈 워시': '/images/drawn_warsh.png',
  '짐 크레이머': '/images/drawn_cramer.png',
  '워런 버핏': '/images/drawn_buffett.png',
  '레이 달리오': '/images/drawn_dalio.png',
  '제롬 파월': '/images/drawn_powell.png',
  '한국은행 (공식)': 'https://logo.clearbit.com/bok.or.kr'
};

const stockDomains: Record<string, string> = {
    'TSLA': 'tesla.com',
    'NVDA': 'nvidia.com',
    'AAPL': 'apple.com',
    'MSFT': 'microsoft.com',
    'AMZN': 'amazon.com',
    'META': 'meta.com',
    'GOOGL': 'google.com',
    'MU': 'micron.com',
    'SPY': 'spdrs.com'
};

const getLogoUrl = (ticker: string, domain?: string) => {
    if (/^\d{6}$/.test(ticker)) {
        return `https://file.alphasquare.co.kr/media/images/stock_logo/kr/${ticker}.png`;
    }
    if (domain) {
        return `https://logo.clearbit.com/${domain}`;
    }
    if (stockDomains[ticker]) {
        return `https://logo.clearbit.com/${stockDomains[ticker]}`;
    }
    return null;
};

// 1. Avatar Component
const Avatar = ({ name, className }: { name: string, className?: string }) => {
    const src = influencerAvatars[name];
    const initials = name.replace(/\s/g, '').slice(0, 2);

    


    return (
        <div className={cn("relative flex-shrink-0", className || "w-14 h-14")}>
            {src && (
                <img
                    src={src}
                    alt={name}
                    className="w-full h-full rounded-full object-cover object-top border-2 border-slate-600 shadow-md"
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        (e.currentTarget.nextSibling as HTMLElement).style.display = 'flex';
                    }}
                />
            )}
            <div
                style={{ display: src ? 'none' : 'flex' }}
                className="absolute inset-0 w-full h-full rounded-full bg-slate-700 border-2 border-slate-600 items-center justify-center text-white text-sm font-bold shadow-md"
            >
                {initials}
            </div>
        </div>
    );
};

// 2. Stock Logo Component
const StockLogo = ({ ticker, name, domain, className }: { ticker: string, name: string, domain?: string, className?: string }) => {
    const src = getLogoUrl(ticker, domain);
    const initial = name?.[0] ?? ticker?.[0] ?? '?';

    return (
        <div className={cn("relative flex-shrink-0", className || "w-7 h-7")}>
            {src ? (
                <img
                    src={src}
                    alt={name}
                    className="w-full h-full rounded-md object-contain bg-white p-0.5 shadow-sm"
                    onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        ((e.target as HTMLImageElement).nextSibling as HTMLElement).style.display = 'flex';
                    }}
                />
            ) : null}
            <div
                style={{ display: src ? 'none' : 'flex' }}
                className="w-full h-full rounded-md bg-slate-700 border border-slate-600 items-center justify-center text-white text-xs font-bold"
            >
                {initial}
            </div>
        </div>
    );
};


const HighlightInfluencer = ({ children }: { children: React.ReactNode }) => (
    <strong className="text-slate-200 font-bold">{children}</strong>
);

const HighlightPos = ({ children }: { children: React.ReactNode }) => (
    <strong className="text-emerald-400 font-semibold">{children}</strong>
);

const HighlightNeg = ({ children }: { children: React.ReactNode }) => (
    <strong className="text-[#ff7c7e] font-semibold">{children}</strong>
);

// 3. Direction Badge (Compact, single-line format)
const DirectionBadge = ({ type }: { type: string }) => {
  const config: Record<string, { icon: string, label: string, color: string, bg: string }> = {
    '수혜':       { icon: '▲', label: '수혜',    color: '#34d399', bg: 'rgba(52,211,153,0.1)'  },
    '소폭 수혜':   { icon: '↗', label: '소폭수혜', color: '#34d399', bg: 'rgba(52,211,153,0.07)' },
    '관망':       { icon: '─', label: '관망',    color: '#94a3b8', bg: 'rgba(148,163,184,0.1)' },
    '소폭 리스크': { icon: '↘', label: '소폭리스크', color: '#ff7c7e', bg: 'rgba(255,124,126,0.07)' },
    '리스크':     { icon: '▼', label: '리스크',  color: '#ff7c7e', bg: 'rgba(255,124,126,0.1)' },
  };

  const c = config[type] ?? config['관망'];

  return (
    <div
      className="inline-flex items-center justify-center gap-1 px-2 py-1 rounded-md whitespace-nowrap text-xs font-semibold min-w-[70px]"
      style={{ color: c.color, backgroundColor: c.bg }}
    >
      <span className="text-[10px] leading-none">{c.icon}</span>
      <span className="leading-none">{c.label}</span>
    </div>
  );
};

const SECTOR_COLORS: Record<string, string> = {
    "반도체/AI 인프라": "#60a5fa",
    "이차전지/전기차": "#34d399",
    "바이오/헬스케어": "#f472b6",
    "금융/은행": "#fbbf24",
    "에너지": "#fb923c",
    "플랫폼/IT": "#a78bfa",
    "자동차/수출제조업": "#ef4444",
    "조선/방산/전력": "#0ea5e9"
};

const BenefitChip = ({ name, ticker, domain }: { name: string, ticker: string, domain?: string }) => {
    const isKr = /^\d{6}$/.test(ticker);
    const countryCode = isKr ? "kr" : "us";
    
    return (
        <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 shadow-sm hover:bg-emerald-500/20 transition-colors w-full min-w-[120px] max-w-[180px]">
            <img src={flagUrl(countryCode)} alt={countryCode} className="w-3.5 h-2.5 object-cover rounded-sm shadow-sm" />
            <span className="text-emerald-400 text-xs font-bold tracking-tight">{name}</span>
            <span className="text-emerald-500/80 text-[10px] font-bold ml-0.5">{(ticker.charCodeAt(0) + name.length) % 40 + 50}%</span>
        </div>
    );
};

const RiskChip = ({ name, ticker, domain }: { name: string, ticker: string, domain?: string }) => {
    const isKr = /^\d{6}$/.test(ticker);
    const countryCode = isKr ? "kr" : "us";
    
    return (
        <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-rose-500/10 border border-rose-500/20 shadow-sm hover:bg-rose-500/20 transition-colors w-full min-w-[120px] max-w-[180px]">
            <img src={flagUrl(countryCode)} alt={countryCode} className="w-3.5 h-2.5 object-cover rounded-sm shadow-sm" />
            <span className="text-rose-400 text-xs font-bold tracking-tight">{name}</span>
            <span className="text-rose-500/80 text-[10px] font-bold ml-0.5">{(ticker.charCodeAt(0) + name.length) % 40 + 50}%</span>
        </div>
    );
};

const TickerChip = ({ children, ticker, domain, type = 'neutral' }: { children: React.ReactNode, ticker: string, domain?: string, type?: 'benefit' | 'risk' | 'neutral' }) => {
    let bgClass = "bg-slate-800 text-slate-300 border-slate-600";
    let tickerClass = "text-slate-500";
    
    if (type === 'benefit') {
        bgClass = "bg-emerald-950 text-emerald-300 border-emerald-700";
        tickerClass = "text-emerald-700 font-bold";
    } else if (type === 'risk') {
        bgClass = "bg-[#ff7c7e]/10 text-[#ff7c7e] border-[#ff7c7e]/40";
        tickerClass = "text-[#ff7c7e]/80 font-bold";
    }

    const name = children as string;

    return (
        <div className={cn("inline-flex items-center gap-1.5 border rounded-md px-2 py-0.5 w-fit mr-1 mb-1", bgClass)}>
            <StockLogo ticker={ticker} name={name} domain={domain} className="w-4 h-4 rounded-sm" />
            <span className="text-xs font-medium">{children}</span>
            <span className={cn("text-[9px] font-mono", tickerClass)}>{ticker}</span>
        </div>
    );
};

const MOCK_DATA = {
    "2026-04-26": {
        highlights: [
            <><HighlightInfluencer>코스피 6,500선 돌파 및 신고가 경신</HighlightInfluencer>: 한국 1분기 실질 GDP가 예상치를 상회하며 서프라이즈를 기록했고, 삼성전자 역대 최대 분기 실적으로 코스피 상승 랠리가 이어지고 있습니다.</>,
            <><HighlightInfluencer>일론 머스크</HighlightInfluencer>, 테슬라 어닝콜에서 Capex 25% 상향 및 Optimus 대규모 양산 선언 → <TickerChip ticker="005930" type="benefit">삼성전자</TickerChip> <TickerChip ticker="000660" type="benefit">SK하이닉스</TickerChip> <HighlightPos>주목 집중</HighlightPos></>,
            <><HighlightInfluencer>도널드 트럼프</HighlightInfluencer>, Truth Social에서 15% 보편 관세 재차 강조 → 자동차/수출주 <HighlightNeg>역풍 우려</HighlightNeg> 확산</>,
            <><HighlightInfluencer>케빈 워시</HighlightInfluencer> 연준 의장 지명자 매파적 발언: 대차대조표 축소 의지 천명으로 모들리 풀은 '증시에 큰 위협' 경고 → 성장주 <HighlightNeg>발목 잡힐 수 있어</HighlightNeg></>,
            <><HighlightInfluencer>국내 증권사</HighlightInfluencer> AI·방산·원전 비중확대 의견 유지: 코스피 주간 상승 속 반도체·방산·전력기기 강세 지속 전망 → 관련주 <HighlightPos>모멘텀 포착</HighlightPos></>
        ],
        speakers: [
            { 
                id: 1, 
                speaker: "도널드 트럼프", speakerTitle: "미국 대통령", 
                country: "미국",
                countryCode: "us",
                platform: "Truth Social", 
                summary: "블룸버그 펀드스트랫 분석에 따르면 S&P500 상하위 5거래일이 모두 트럼프 발언과 직결. 관세 정책이 미국 제조업 부활 및 재정적자 감소에 도움 된다는 취지.", 
                followers: "공개 발언",
                positiveStocks: [{ ticker: "042660", name: "한화오션" }, { ticker: "329180", name: "HD현대중공업" }, { ticker: "SPY", name: "S&P500" }],
                negativeStocks: [{ ticker: "005930", name: "삼성전자" }, { ticker: "005380", name: "현대차" }, { ticker: "TSLA", name: "Tesla" }, { ticker: "AAPL", name: "Apple" }],
                stars: 3,
                time: "2026-04-26"
            },
            { 
                id: 2, 
                speaker: "일론 머스크", speakerTitle: "테슬라 CEO / X 오너", 
                country: "미국",
                countryCode: "us",
                platform: "Tesla Q1 어닝콜", 
                summary: "Capex 250억 달러로 25% 상향, 연말까지 Optimus 100만 대 생산라인 목표. EPS $0.41 서프라이즈이나 매출 소폭 하회.", 
                followers: "Tesla CEO",
                positiveStocks: [{ ticker: "005930", name: "삼성전자" }, { ticker: "000660", name: "SK하이닉스" }, { ticker: "TSLA", name: "Tesla" }, { ticker: "NVDA", name: "NVIDIA" }],
                negativeStocks: [{ ticker: "TSLA", name: "Tesla" }],
                stars: 3,
                time: "2026-04-22"
            },
            { 
                id: 3, 
                speaker: "이창용", speakerTitle: "전 한국은행 총재", 
                country: "한국",
                countryCode: "kr",
                platform: "금통위 기자간담회", 
                summary: "기준금리 2.50% 7연속 동결. 중동 전쟁으로 물가 상방·성장 하방 동시 증대. 2026년 성장률 2% 하회, 물가 2.2% 상당폭 상회 경고.", 
                followers: "한국은행 총재",
                positiveStocks: [{ ticker: "105560", name: "KB금융" }, { ticker: "055550", name: "신한지주" }, { ticker: "005930", name: "삼성전자" }, { ticker: "000660", name: "SK하이닉스" }],
                negativeStocks: [{ ticker: "000720", name: "현대건설" }, { ticker: "N/A", name: "건설사 전반" }],
                stars: 3,
                time: "2026-04-10"
            },
            { 
                id: 4, 
                speaker: "SK하이닉스 (공식)", 
                country: "한국",
                countryCode: "kr",
                platform: "공식 보도자료", 
                summary: "1Q26 매출 52.6조 원, 영업이익 37.6조 원(이익률 72%). 역대 최대 분기 실적. HBM3E 확대 주효. 코스피 6,500선 돌파 촉매.", 
                followers: "경영진",
                positiveStocks: [{ ticker: "000660", name: "SK하이닉스" }, { ticker: "005930", name: "삼성전자" }, { ticker: "042700", name: "한미반도체" }, { ticker: "NVDA", name: "NVIDIA" }, { ticker: "MU", name: "Micron" }],
                negativeStocks: [],
                stars: 3,
                time: "2026-04-23"
            },
            { 
                id: 5, 
                speaker: "한국은행 (공식)", speakerTitle: "중앙은행", 
                country: "한국",
                countryCode: "kr",
                platform: "공식 보도자료", 
                summary: "1Q26 실질 GDP 전 분기 대비 +1.7%, 시장 예상 0.9% 두 배 상회. 5년 반 만에 최고치. ING 성장률 전망 2.8%로 상향.", 
                followers: "경제통계국",
                positiveStocks: [{ ticker: "005930", name: "삼성전자" }, { ticker: "000660", name: "SK하이닉스" }, { ticker: "069500", name: "코스피 ETF" }],
                negativeStocks: [],
                stars: 3,
                time: "2026-04-23"
            },
            { 
                id: 6, 
                speaker: "케빈 워시", speakerTitle: "연준 의장 지명자", 
                country: "미국",
                countryCode: "us",
                platform: "상원 청문회", 
                summary: "연준 '레짐 체인지' 예고, 대차대조표 축소 의지 천명. 트럼프 꼭두각시 안 되겠다 독립성 강조. 매파 성향으로 금리인상 가속 우려.", 
                followers: "연준 의장 지명자",
                positiveStocks: [],
                negativeStocks: [{ ticker: "N/A", name: "성장주 전반" }, { ticker: "SPY", name: "S&P500" }, { ticker: "NVDA", name: "NVIDIA" }, { ticker: "TSLA", name: "Tesla" }],
                stars: 3,
                time: "2026-04-20"
            }
        ],
        marketImpact: [
            { id: 1, ticker: "005930", name: "삼성전자", sector: "반도체/AI 인프라", comment: "Tesla AI 로봇 투자 확대로 메모리 반도체 수요가 견고해질 것이란 전망이 부각됩니다.", direction: "수혜", stars: 3, influencer: "일론 머스크" },
            { id: 2, ticker: "000660", name: "SK하이닉스", sector: "반도체/AI 인프라", comment: "역대 최대 1분기 실적과 HBM3E 독주 체제 재확인으로 업황 모멘텀이 포착됩니다.", direction: "수혜", stars: 3, influencer: "SK하이닉스 경영진" },
            { id: 3, ticker: "005380", name: "현대차", sector: "자동차/수출제조업", comment: "트럼프의 관세 15% 적용 의지 재확인으로 수출 실적에 역풍 우려가 쌓이고 있습니다.", direction: "리스크", stars: 3, influencer: "도널드 트럼프" },
            { id: 4, ticker: "TSLA", name: "Tesla", sector: "전기차/AI 로봇", comment: "Optimus 구체화는 긍정적이나 단기 Capex 급증과 수익성 훼손으로 방향을 탐색 중입니다.", direction: "관망", stars: 3, influencer: "일론 머스크" },
            { id: 5, ticker: "042660", name: "한화오션", sector: "조선/방산/전력", comment: "미국 관세 우회 및 해군 함정 협력 기대로 수혜 흐름이 이어집니다.", direction: "수혜", stars: 2, influencer: "도널드 트럼프" },
            { id: 6, ticker: "105560", name: "KB금융", sector: "금융/은행", comment: "기준금리 장기 동결 기조로 인해 은행권 예대마진 방어에 훈풍이 불고 있습니다.", direction: "소폭 수혜", stars: 2, influencer: "이창용" },
            { id: 7, ticker: "000720", name: "현대건설", sector: "건설", comment: "금리 인하 지연으로 부동산 및 PF 시장 회복이 지연되며 발목을 잡힐 수 있습니다.", direction: "리스크", stars: 2, influencer: "이창용" }
        ],
        positiveStocks: [
            { ticker: "005930", name: "삼성전자", reason: "1Q26 영업이익 57.2조(YoY +755%) 사상 최대, AI 반도체 호황 확인", influencer: "SK하이닉스, 한국은행 등" },
            { ticker: "000660", name: "SK하이닉스", reason: "1Q26 영업이익 37.6조(이익률 72%) 역대 최대, HBM3E 독주 증명", influencer: "머스크, SK하이닉스 등" },
            { ticker: "012450", name: "한화에어로스페이스", reason: "방산 비중 확대 의견 및 중장기 모멘텀 유효", influencer: "코스피 전문가" },
            { ticker: "NVDA", name: "NVIDIA", reason: "Q4 FY26 매출 $68.1B(YoY +80%), 시총 5조 달러 돌파", influencer: "머스크, 젠슨 황" }
        ],
        negativeStocks: [
            { ticker: "005930", name: "삼성전자", reason: "관세 강화 발언 시 수출 타격 우려 상존", influencer: "트럼프, 베센트" },
            { ticker: "005380", name: "현대차", reason: "미국 관세 15% 적용 우려 및 영업이익 감소 가능성", influencer: "트럼프, 현대자동차" },
            { ticker: "TSLA", name: "Tesla", reason: "관세 불확실성, 소비자 불매, capex 250억 달러 급증 등 복합 악재", influencer: "머스크, 트럼프 등" },
            { ticker: "AAPL", name: "Apple", reason: "중국 공급망 관세 부담 지속 및 재무과 우려", influencer: "트럼프, 베센트" }
        ],
        positiveSectors: [
            { name: "반도체/AI 인프라", value: 7 },
            { name: "금융/은행", value: 4 },
            { name: "조선/방산/전력", value: 1 }
        ],
        negativeSectors: [
            { name: "무역·관세/수출 제조업", value: 2 },
            { name: "전기차/AI 로봇", value: 1 },
            { name: "자동차/수출제조업", value: 1 }
        ],
        sectorSummary: [
            { name: "반도체/AI 인프라", positive: 85, negative: 15, comment: "역대 최대 실적 릴레이와 AI 설비 투자 소식에 강력한 시선이 쏠리고 있습니다." },
            { name: "금융/전체 시장", positive: 50, negative: 50, comment: "기준금리 동결과 매파적 교체가 혼재되며 뚜렷한 방향을 찾지 못하고 있습니다." },
            { name: "무역·관세/수출 제조업", positive: 20, negative: 80, comment: "관세 세수 유지 발언으로 수출 대형주들에 무거운 부담이 가중되는 중입니다." },
            { name: "전기차/AI 로봇", positive: 45, negative: 55, comment: "Optimus 양산 기대감과 단기 실적 우려가 맞서며 치열한 공방이 벌어지고 있습니다." },
            { name: "자동차/하이브리드", positive: 30, negative: 70, comment: "역대 최대 매출에도 관세 불확실성이 발목을 강하게 잡고 있습니다." },
            { name: "조선/방산/전력", positive: 75, negative: 25, comment: "수주 모멘텀과 비중확대 리포트가 이어지며 단단한 훈풍이 부는 구간입니다." }
        ]
    }
};

const SectionTitle = ({ icon: Icon, title, subtitle }: { icon: any, title: string, subtitle?: string }) => (
    <div className="border-b border-white/10 pb-3 mb-6 flex flex-col md:flex-row md:items-end gap-2 md:gap-3">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Icon className="w-5 h-5 text-blue-400" />
            {title}
        </h2>
        {subtitle && <span className="text-slate-400 text-sm mb-0.5">{subtitle}</span>}
    </div>
);

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
    if (platform.includes("YouTube") || platform.includes("어닝콜")) colorClass = "bg-red-900/50 text-red-300 border-red-800";
    else if (platform.includes("News") || platform.includes("보도자료") || platform.includes("간담회") || platform.includes("청문회")) colorClass = "bg-blue-900/50 text-blue-300 border-blue-800";
    else if (platform.includes("Truth Social") || platform.includes("공개 발언")) colorClass = "bg-orange-900/50 text-orange-300 border-orange-800";
    
    return <span className={cn("inline-block rounded-md border px-2 py-0.5 text-xs font-medium whitespace-nowrap", colorClass)}>{platform}</span>;
}

const DATES = ["2026-04-24", "2026-04-25", "2026-04-26"];

export default function SocialAnalysisView() {
    const [dateKey, setDateKey] = useState<string>("2026-04-26");
    const data = MOCK_DATA[dateKey as keyof typeof MOCK_DATA] || MOCK_DATA["2026-04-26"];

    return (
        <div className="space-y-4 pb-20 animate-in fade-in duration-500 max-w-[1400px] mx-auto relative overflow-hidden px-4 md:px-6">
            
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
                <SectionTitle icon={Megaphone} title="주요 하이라이트" />
                <div className="bg-slate-800/40 rounded-xl border border-white/5 p-6">
                    <ul className="space-y-5">
                        {data.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex gap-3 text-slate-200 text-base leading-relaxed items-start">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2.5 flex-shrink-0" />
                                <div className="font-medium tracking-wide">{highlight}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <div className="mb-20 border-t-2 border-slate-700/50"></div>

            {/* 2. ① 주요 인사 발언 (상단) */}
            <section className="mb-16">
                <SectionTitle icon={Target} title="🎙 주요 인사 발언" subtitle="오늘 증권 관련 주요 발언을 모니터링했습니다" />
                <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden shadow-lg w-full overflow-x-auto custom-scrollbar">
                    
                    <table className="w-full text-left min-w-[1100px] border-collapse">
                        <thead className="bg-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 w-48 font-semibold text-left">인물</th>
                                <th className="px-6 py-4 w-32 font-semibold text-center">플랫폼</th>
                                <th className="px-6 py-4 min-w-[220px] font-semibold text-left">발언 요약</th>
                                <th className="px-6 py-4 min-w-[140px] w-40 font-semibold text-emerald-400 text-xs bg-emerald-950/10 text-left border-l border-emerald-900/20">📈 수혜 종목</th>
                                <th className="px-6 py-4 min-w-[140px] w-40 font-semibold text-[#ff7c7e] text-xs bg-[#ff7c7e]/5 text-left border-l border-[#ff7c7e]/10">📉 리스크 종목</th>
                                <th className="px-6 py-4 w-28 font-semibold text-center">강도</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {data.speakers.map((item, i) => (
                                <tr key={`speaker-${item.id}`} className={cn(i % 2 === 0 ? "bg-slate-800/60" : "bg-slate-900", "align-top")}>
                                    <td className="px-6 py-5 min-w-[160px]">
                                        <div className="flex items-center gap-3">
                                            <div className="flex flex-col items-center gap-1 shrink-0">
                                                <Avatar name={item.speaker} />
                                            </div>
                                            <div className="flex flex-col gap-0.5 min-w-0">
                                                <div className="flex items-center gap-1.5 whitespace-nowrap">
                                                    <span className="text-white font-bold text-sm">{item.speaker}</span>
                                                    <img 
                                                        src={flagUrl(item.countryCode)} 
                                                        alt={item.country}
                                                        className="w-5 h-3.5 rounded-[2px] object-cover shadow-sm shrink-0"
                                                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                                    />
                                                </div>
                                                <span className="text-slate-500 text-[10px] leading-tight mt-0.5 line-clamp-2">{item.followers}</span>
                                            </div>
                                        </div>
                                    </td>
                                    
                                    <td className="px-6 py-5 text-center">
                                        <PlatformBadge platform={item.platform} />
                                    </td>

                                    <td className="px-6 py-5 pr-8">
                                        <div className="text-slate-200 text-sm leading-relaxed line-clamp-3">
                                            {item.summary}
                                        </div>
                                    </td>

                                    {/* Completely separated column: 수혜 종목 */}
                                    <td className="px-6 py-5 bg-emerald-950/10 border-l border-emerald-900/20">
                                        <div className="flex flex-wrap gap-1 content-start">
                                            {item.positiveStocks.length > 0 ? (
                                                item.positiveStocks.map((stock, idx) => (
                                                    <BenefitChip key={idx} name={stock.name} ticker={stock.ticker} />
                                                ))
                                            ) : (
                                                <div className="text-slate-600 text-xs w-full">—</div>
                                            )}
                                        </div>
                                    </td>

                                    {/* Completely separated column: 리스크 종목 */}
                                    <td className="px-6 py-5 bg-[#ff7c7e]/5 border-l border-[#ff7c7e]/10">
                                        <div className="flex flex-wrap gap-1 content-start">
                                            {item.negativeStocks.length > 0 ? (
                                                item.negativeStocks.map((stock, idx) => (
                                                    <RiskChip key={idx} name={stock.name} ticker={stock.ticker} />
                                                ))
                                            ) : (
                                                <div className="text-slate-600 text-xs w-full">—</div>
                                            )}
                                        </div>
                                    </td>

                                    <td className="px-6 py-6">
                                        <div className="flex justify-center h-full pt-1">
                                            <Stars count={item.stars} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <div className="mb-20 border-t-2 border-slate-700/50"></div>

            {/* 3. ② 시장 영향 분석 (하단) */}
            <section className="mb-16">
                <SectionTitle icon={TrendingUp} title="📊 시장 영향 분석" subtitle="각 발언이 국내 증시에 미칠 영향을 분석했습니다" />
                <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden shadow-lg w-full overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left min-w-[1200px] border-collapse">
                        <thead className="bg-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 w-32 font-semibold text-left">주요 인사</th>
                                <th className="px-6 py-4 w-32 font-semibold text-left">직책 / 소속</th>
                                <th className="px-6 py-4 min-w-[200px] font-semibold text-left">발언 요약</th>
                                <th className="px-6 py-4 min-w-[240px] font-semibold text-left">영향받은 종목 리스트</th>
                                <th className="px-6 py-4 w-24 font-semibold text-center">방향</th>
                                <th className="px-6 py-4 w-28 font-semibold text-center">강도</th>
                                <th className="px-6 py-4 w-32 font-semibold text-center">발언 시각</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {data.speakers.map((speaker, i) => {
                                // Determine overall direction based on stock counts or logic.
                                // For simplicity, if positive stocks > negative stocks, it's '수혜', etc.
                                // But data.marketImpact might have the specific directions. Let's just use a simple heuristic based on stars and mock data structure.
                                const isPositive = speaker.positiveStocks.length >= speaker.negativeStocks.length;
                                const directionText = isPositive ? '수혜' : '리스크';
                                
                                return (
                                    <tr key={`overview-${speaker.id}`} className={cn(
                                        i % 2 === 0 ? "bg-slate-800/60" : "bg-slate-900", 
                                        "align-middle",
                                        "hover:bg-slate-800 transition-colors"
                                    )}>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <Avatar name={speaker.speaker} className="w-10 h-10" />
                                                <span className="text-white font-bold text-sm whitespace-nowrap">{speaker.speaker}</span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-5">
                                            <span className="text-slate-400 text-xs font-medium leading-relaxed">{speaker.speakerTitle}</span>
                                        </td>

                                        <td className="px-6 py-5 pr-8">
                                            <p className="text-slate-300 text-sm leading-relaxed line-clamp-3" title={speaker.summary}>
                                                {speaker.summary}
                                            </p>
                                        </td>

                                        <td className="px-6 py-5">
                                            <div className="flex flex-col gap-2">
                                                {speaker.positiveStocks.length > 0 && (
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-emerald-400 font-bold text-xs flex items-center gap-1"><TrendingUp className="w-3 h-3"/> 긍정 종목</span>
                                                        <div className="flex flex-wrap gap-1">
                                                            {speaker.positiveStocks.map((stock, idx) => (
                                                                <div key={idx} className="flex items-center gap-1">
                                                                    <StockLogo ticker={stock.ticker} name={stock.name} className="w-3.5 h-3.5 rounded-sm grayscale opacity-80" />
                                                                    <span className="text-slate-300 text-xs">{stock.name}</span>
                                                                    <span className="text-slate-500 text-[10px] font-mono">({stock.ticker})</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                                {speaker.positiveStocks.length > 0 && speaker.negativeStocks.length > 0 && <div className="w-full h-px bg-white/5 my-1"></div>}
                                                {speaker.negativeStocks.length > 0 && (
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-rose-400 font-bold text-xs flex items-center gap-1"><TrendingDown className="w-3 h-3"/> 부정 종목</span>
                                                        <div className="flex flex-wrap gap-1">
                                                            {speaker.negativeStocks.map((stock, idx) => (
                                                                <div key={idx} className="flex items-center gap-1">
                                                                    <StockLogo ticker={stock.ticker} name={stock.name} className="w-3.5 h-3.5 rounded-sm grayscale opacity-80" />
                                                                    <span className="text-slate-300 text-xs">{stock.name}</span>
                                                                    <span className="text-slate-500 text-[10px] font-mono">({stock.ticker})</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </td>

                                        <td className="px-6 py-5 text-center">
                                            <DirectionBadge type={directionText} />
                                        </td>

                                        <td className="px-6 py-5 text-center">
                                            <div className="flex justify-center gap-0.5 mt-1">
                                                {[...Array(5)].map((_, idx) => (
                                                    <Star 
                                                        key={idx} 
                                                        className={cn(
                                                            "w-3.5 h-3.5", 
                                                            idx < speaker.stars 
                                                                ? (isPositive ? "fill-emerald-400 text-emerald-400" : "fill-[#ff7c7e] text-[#ff7c7e]") 
                                                                : "fill-slate-700 text-slate-700"
                                                        )} 
                                                    />
                                                ))}
                                            </div>
                                        </td>
                                        
                                        <td className="px-6 py-5 text-center">
                                            <span className="text-slate-400 text-xs font-mono">{speaker.time}</span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </section>

            <div className="mb-20 border-t-2 border-slate-700/50"></div>

            {/* 4. 긍/부정 종목 종합 */}
            <section className="mb-16">
                <SectionTitle icon={BarChart3} title="수혜 가능 / 리스크 주시 종목 종합" subtitle="발언을 바탕으로 집계된 종목들의 요약입니다" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 수혜 가능 종목 */}
                    <div className="bg-emerald-950/20 rounded-xl p-5 border border-emerald-900/40">
                        <h3 className="text-emerald-400 font-bold text-base mb-4 flex items-center gap-2 pb-3 border-b border-emerald-900/40">
                            <DirectionBadge type="수혜" />
                            수혜 가능 종목
                        </h3>
                        <div className="flex flex-col gap-3">
                            {data.positiveStocks.length > 0 ? data.positiveStocks.map((stock, i) => (
                                <div key={i} className="flex gap-4 bg-emerald-950/30 p-4 rounded-lg border border-emerald-900/30 items-start">
                                    <StockLogo ticker={stock.ticker} name={stock.name} className="w-10 h-10 rounded-lg mt-1" />
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-white font-bold text-base">{stock.name}</span>
                                                <span className="bg-emerald-950 text-emerald-300 border border-emerald-600 rounded px-1.5 py-0.5 text-[10px] font-mono font-bold">
                                                    {stock.ticker}
                                                </span>
                                            </div>
                                            <span className="text-emerald-500/70 text-[10px] font-medium flex items-center gap-1"><MessageSquare className="w-3 h-3"/> {stock.influencer}</span>
                                        </div>
                                        <div className="text-slate-300 text-sm leading-relaxed">
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
                        <h3 className="text-[#ff7c7e] font-bold text-base mb-4 flex items-center gap-2 pb-3 border-b border-[#ff7c7e]/20">
                            <DirectionBadge type="리스크" />
                            리스크 주시 종목
                        </h3>
                        <div className="flex flex-col gap-3">
                            {data.negativeStocks.length > 0 ? data.negativeStocks.map((stock, i) => (
                                <div key={i} className="flex gap-4 bg-[#ff7c7e]/5 p-4 rounded-lg border border-[#ff7c7e]/10 items-start">
                                    <StockLogo ticker={stock.ticker} name={stock.name} className="w-10 h-10 rounded-lg mt-1" />
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-white font-bold text-base">{stock.name}</span>
                                                <span className="bg-[#ff7c7e]/10 text-[#ff7c7e] border border-[#ff7c7e]/40 rounded px-1.5 py-0.5 text-[10px] font-mono font-bold">
                                                    {stock.ticker}
                                                </span>
                                            </div>
                                            <span className="text-[#ff7c7e]/60 text-[10px] font-medium flex items-center gap-1"><MessageSquare className="w-3 h-3"/> {stock.influencer}</span>
                                        </div>
                                        <div className="text-slate-300 text-sm leading-relaxed">
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

            <div className="mb-20 border-t-2 border-slate-700/50"></div>

            {/* 5. 섹터별 영향 분석 */}
            <section className="mb-16">
                <SectionTitle icon={Globe} title="섹터별 영향 분석" subtitle="모니터링 결과를 산업 섹터별로 분류하여 방향성을 진단합니다" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                    {data.sectorSummary.map((sector, i) => {
                        const total = sector.positive + sector.negative;
                        const posPct = total > 0 ? (sector.positive / total) * 100 : 50;
                        const isPos = sector.positive > sector.negative;
                        const isNeg = sector.negative > sector.positive;
                        
                        const bgClass = isPos ? "bg-emerald-950/15 border-emerald-900/30" : 
                                        isNeg ? "bg-[#ff7c7e]/5 border-[#ff7c7e]/15" : 
                                        "bg-slate-800/50 border-slate-700/50";
                        
                        return (
                            <div key={i} className={cn("p-6 rounded-xl border flex flex-col", bgClass)}>
                                <div className="flex items-start justify-between mb-4">
                                    <h4 className="font-bold text-white text-lg">
                                        {sector.name} 
                                    </h4>
                                    <div className="mt-1">
                                        {isPos ? <DirectionBadge type="수혜" /> : isNeg ? <DirectionBadge type="리스크" /> : <DirectionBadge type="관망" />}
                                    </div>
                                </div>
                                <p className="text-slate-300 text-sm leading-relaxed mb-6 flex-1">
                                    {sector.comment}
                                </p>
                                
                                <div>
                                    <div className="flex justify-between items-center text-xs mb-2">
                                        <span className="text-emerald-400 font-bold">수혜 {sector.positive}건</span>
                                        <span className="text-[#ff7c7e] font-bold">리스크 {sector.negative}건</span>
                                    </div>
                                    <div className="h-2 w-full flex rounded-full overflow-hidden bg-slate-800/80">
                                        <div className="bg-emerald-500" style={{width: `${posPct}%`}} />
                                        <div className="bg-[#ff7c7e]" style={{width: `${100-posPct}%`}} />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>

            <div className="mb-20 border-t-2 border-slate-700/50"></div>

            {/* 6. 오늘의 투자 시사점 */}
            <section className="mb-16">
                <SectionTitle icon={Activity} title="오늘의 시장 인사이트 (AI)" subtitle="AI가 위의 모든 발언과 데이터를 종합하여 투자 시점을 제안합니다" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* 담아볼 만한 흐름 */}
                    <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-xl p-6 flex flex-col">
                        <h4 className="text-emerald-400 font-bold mb-5 flex items-center gap-2 text-lg"><CheckCircle2 className="w-6 h-6"/> 담아볼 만한 흐름</h4>
                        <ul className="space-y-4 text-sm text-slate-300 list-disc pl-4 mb-8 flex-1 leading-relaxed">
                            <li>AI 반도체 슈퍼사이클: HBM, 데이터센터 장비 중심의 모멘텀 포착이 확인되며 펀더멘털 견고함 유지.</li>
                            <li>조선/방산/전력 섹터: 지정학적 리스크 지속과 미국 함정 MRO 사업 진출 등 수주 모멘텀으로 중장기 탄력 기대.</li>
                            <li>실적 장세 차별화: 삼성전자 서프라이즈로 촉발된 코스피 랠리 속에서 숫자가 증명되는 기업 위주 선별 접근 유효.</li>
                        </ul>
                        <div className="pt-5 border-t border-emerald-900/30">
                            <span className="text-slate-500 text-xs block mb-3 font-medium">관련 모멘텀 타겟:</span>
                            <div className="flex gap-2 flex-wrap">
                                <TickerChip ticker="005930" type="benefit">삼성전자</TickerChip>
                                <TickerChip ticker="000660" type="benefit">SK하이닉스</TickerChip>
                                <TickerChip ticker="042660" type="benefit">한화오션</TickerChip>
                            </div>
                        </div>
                    </div>

                    {/* 좀 더 지켜볼 구간 */}
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 flex flex-col">
                        <h4 className="text-slate-300 font-bold mb-5 flex items-center gap-2 text-lg"><PauseCircle className="w-6 h-6"/> 좀 더 지켜볼 구간</h4>
                        <ul className="space-y-4 text-sm text-slate-300 list-disc pl-4 mb-8 flex-1 leading-relaxed">
                            <li>전기차/AI 로봇: Optimus 양산 로드맵 등 중장기 비전은 긍정적이나, 단기 Capex 상향과 수요 둔화 우려로 방향 탐색 중.</li>
                            <li>금리 민감주 및 금융: 이창용 총재의 장기 동결 시사 및 케빈 워시의 매파 발언 등 통화정책 불확실성에 묶여 관망세 짙어짐.</li>
                            <li>바이오/헬스케어: 신약 파이프라인 임상 결과 및 트럼프 재집권 시 규제 리스크 모니터링이 필요하며 방향을 가늠하기 어려움.</li>
                        </ul>
                        <div className="pt-5 border-t border-slate-700">
                            <span className="text-slate-500 text-xs block mb-3 font-medium">단기 방향 탐색 타겟:</span>
                            <div className="flex gap-2 flex-wrap">
                                <TickerChip ticker="TSLA" type="neutral">Tesla</TickerChip>
                                <TickerChip ticker="105560" type="neutral">KB금융</TickerChip>
                                <TickerChip ticker="068270" type="neutral">셀트리온</TickerChip>
                            </div>
                        </div>
                    </div>

                    {/* 한 발 물러설 이유 */}
                    <div className="bg-[#ff7c7e]/5 border border-[#ff7c7e]/20 rounded-xl p-6 flex flex-col">
                        <h4 className="text-[#ff7c7e] font-bold mb-5 flex items-center gap-2 text-lg"><AlertTriangle className="w-6 h-6"/> 한 발 물러설 이유</h4>
                        <ul className="space-y-4 text-sm text-slate-300 list-disc pl-4 mb-8 flex-1 leading-relaxed">
                            <li>자동차/수출제조업: 트럼프 발언과 대법원 판결 등에서 관세 세수 유지 스탠스가 재확인되며 수출 대형주들에 무거운 부담 가중.</li>
                            <li>금리 인상 발작 우려: 파월 의장 퇴임 이후 '레짐 체인지'와 QT 가속 현실화 시 고밸류에이션 성장주의 구조적 할인율 상승 압박.</li>
                            <li>건설/부동산: 기준금리 인하 지연으로 인한 부동산 경기 회복 지연과 프로젝트 파이낸싱(PF) 발목 잡힐 가능성에 경계 필요.</li>
                        </ul>
                        <div className="pt-5 border-t border-[#ff7c7e]/10">
                            <span className="text-slate-500 text-xs block mb-3 font-medium">리스크 회피 타겟:</span>
                            <div className="flex gap-2 flex-wrap">
                                <TickerChip ticker="005380" type="risk">현대차</TickerChip>
                                <TickerChip ticker="000270" type="risk">기아</TickerChip>
                                <TickerChip ticker="AAPL" type="risk">Apple</TickerChip>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="text-slate-500 text-xs text-center mt-10 p-4 bg-slate-900/50 rounded-lg">
                    본 리포트는 AI가 각종 뉴스, 소셜 미디어, 공식 발표를 자동 수집·분석한 내용이며, 투자 판단의 참고 자료로만 활용해 주시기 바랍니다.
                </p>
            </section>

        </div>
    );
}
