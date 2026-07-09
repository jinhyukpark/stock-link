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
const Avatar = ({ name, className }: { name?: string, className?: string }) => {
    if (!name) return null;

    const src = influencerAvatars[name];
    const initials = typeof name === "string" ? name.replace(/\s/g, '').slice(0, 2) : "??";

    


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
            <span className="text-emerald-500/80 text-[10px] font-bold ml-0.5">{(ticker.charCodeAt(0) + (name ? name.length : 0)) % 40 + 50}%</span>
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
            <span className="text-rose-500/80 text-[10px] font-bold ml-0.5">{(ticker.charCodeAt(0) + (name ? name.length : 0)) % 40 + 50}%</span>
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
                country: "미국", countryCode: "us",
                platform: "Truth Social / 공개 발언", 
                summary: "이란과의 협상을 서두르지 않겠다며 'Truth Social'에 '나는 모든 시간이 있지만, 이란에는 없다. 시계가 가고 있다'고 게시. 협상을 원하지 않으면 군사적으로 끝낼 것이라고 경고하고, 호르무즈 해협 기뢰 설치 선박에 대한 격침 명령을 발표. 이스라엘-레바논 휴전은 3주 추가 연장.", 
                analysis: "호르무즈 해협 봉쇄 현실화 시 전 세계 원유 수출의 약 20%가 차단될 수 있어 에너지 가격 급등 리스크가 현실화됨. 방산주는 단기 수혜가 명확하나, 항공·해운주는 유가 급등과 항로 차질이라는 이중 부담에 노출.",
                positiveStocks: [{ ticker: "012450", name: "한화에어로스페이스", reason: "전쟁 장기화 기대에 방위산업 수혜" }, { ticker: "079550", name: "LIG넥스원", reason: "미사일/방어시스템 수요 증가 기대" }, { ticker: "064350", name: "현대로템", reason: "방산 수요 증가" }, { ticker: "329180", name: "HD현대중공업", reason: "해군 함정 수요 증가 기대" }, { ticker: "LMT", name: "Lockheed Martin", reason: "전쟁 장기화로 방위산업 수혜" }, { ticker: "XOM", name: "Exxon Mobil", reason: "호르무즈 해협 봉쇄로 유가 상승 수혜" }],
                negativeStocks: [{ ticker: "003490", name: "대한항공", reason: "유가 상승 및 중동 운항 차질 우려" }, { ticker: "086280", name: "현대글로비스", reason: "해운 운송 리스크 증가" }, { ticker: "010950", name: "S-Oil", reason: "원유 공급 불확실성" }, { ticker: "DAL", name: "Delta Air Lines", reason: "유가 급등 비용 부담" }],
                impactLevel: "high",
                time: "2026-04-24"
            },
            { 
                id: 2, 
                speaker: "일론 머스크", speakerTitle: "테슬라 CEO / X 오너", 
                country: "미국", countryCode: "us",
                platform: "테슬라 Q1 2026 실적발표 컨퍼런스콜", 
                summary: "테슬라 Q1 2026 실적 발표에서 EPS 0.41달러(예상치 0.37달러 상회, 어닝 서프라이즈), 매출 223.9억 달러(기대 미달). 2026년 CapEx를 200억 달러에서 250억 달러로 50억 달러 상향 조정. 옵티머스 로봇 대규모 공장 Q2 착공, 연간 100만 대 생산 목표 제시.", 
                analysis: "어닝 서프라이즈와 CapEx 대규모 확대가 동시에 발표되어 단기(수익성 우려)와 장기(성장 기대) 사이의 해석이 갈리는 상황. 옵티머스 로봇 연간 100만 대 목표는 로보틱스 섹터 전반의 밸류에이션 재평가를 유도.",
                positiveStocks: [{ ticker: "000660", name: "SK하이닉스", reason: "AI 자율주행용 HBM 수요 증가" }, { ticker: "277810", name: "레인보우로보틱스", reason: "휴머노이드 로봇 시장 확장 기대" }, { ticker: "TSLA", name: "Tesla", reason: "EPS 어닝 서프라이즈, 자율주행 로봇 미래 성장성" }, { ticker: "NVDA", name: "NVIDIA", reason: "AI 칩 자율주행 인프라 수요 확대" }],
                negativeStocks: [{ ticker: "TSLA", name: "Tesla", reason: "CapEx 250억 달러 상향으로 단기 수익성 압박, 실적 발표 후 시간외 하락" }],
                impactLevel: "high",
                time: "2026-04-22 17:30 ET"
            },
            { 
                id: 3, 
                speaker: "젠슨 황", speakerTitle: "NVIDIA CEO", 
                country: "미국", countryCode: "us",
                platform: "Fortune 인터뷰", 
                summary: "2027년까지 NVIDIA AI 칩 주문이 1조 달러에 달한다고 전망. AI가 '추론 인플렉션 포인트'에 진입했으며 반도체 수요는 '지수적(exponential)' 증가세라고 강조.", 
                analysis: "1조 달러 AI 칩 수요 전망은 AI 인프라 투자 사이클이 최소 2027년까지 지속됨을 의미하며, HBM 공급망 전반에 구조적 매수 근거를 강화함.",
                positiveStocks: [{ ticker: "000660", name: "SK하이닉스", reason: "AI 가속기용 HBM 수요 급증 수혜" }, { ticker: "042700", name: "한미반도체", reason: "HBM 패키징 장비 수요 증가" }, { ticker: "007660", name: "이수페타시스", reason: "AI 서버 기판 수요 증가" }, { ticker: "NVDA", name: "NVIDIA", reason: "AI 칩 수요 1조 달러 전망" }],
                negativeStocks: [],
                impactLevel: "high",
                time: "2026-04-22"
            },
            { 
                id: 4, 
                speaker: "신현송", speakerTitle: "한국은행 신임 총재", 
                country: "한국", countryCode: "kr",
                platform: "취임사 / 공식 기자회견", 
                summary: "취임 일성으로 '신중하고 유연한 통화정책 운영을 통해 물가안정과 금융안정을 도모하겠다'고 밝힘. 가계부채를 관리하지 못하면 내수 침체로 이어질 수 있다고 경고. 전문가들은 하반기 금리 인상 가능성을 주목.", 
                analysis: "하반기 금리 인상 가능성이 열리며 인터넷은행 할부금융주에 부담이 증가. 전통 금융지주사는 금리 상승 환경에서 예대마진 확대 수혜 기대.",
                positiveStocks: [{ ticker: "105560", name: "KB금융", reason: "금융안정 정책 수혜" }, { ticker: "016360", name: "삼성증권", reason: "금융안정 강조로 자본시장 신뢰 제고" }, { ticker: "006800", name: "미래에셋증권", reason: "자본시장 안정 기대" }],
                negativeStocks: [{ ticker: "323410", name: "카카오뱅크", reason: "가계부채 규제 강화 우려" }, { ticker: "279570", name: "케이뱅크", reason: "가계대출 축소 압력" }, { ticker: "005380", name: "현대차", reason: "금리 인상 가능성에 자동차 할부 수요 감소" }],
                impactLevel: "high",
                time: "2026-04-21 KST"
            },
            { 
                id: 5, 
                speaker: "팀 쿡", speakerTitle: "애플 CEO", 
                country: "미국", countryCode: "us",
                platform: "공식 보도자료 (Apple Newsroom)", 
                summary: "팀 쿡 CEO가 2026년 9월 1일부로 Executive Chairman으로 전환하고, 존 터너스 SVP가 차기 CEO. 재임 중 시가총액이 3,500억 달러에서 4조 달러로 성장. Q2 2026 실적은 4월 30일 발표 예정.", 
                analysis: "공식 승계 계획 발표로 최악의 시나리오는 회피함. 4월 30일 Q2 실적 발표가 신규 CEO 체제 첫 결정적 모멘텀.",
                positiveStocks: [{ ticker: "034220", name: "LG디스플레이", reason: "애플 부품 공급망 안정 지속 기대" }, { ticker: "AAPL", name: "Apple", reason: "승계 계획 공개로 불확실성 해소" }],
                negativeStocks: [{ ticker: "AAPL", name: "Apple", reason: "리더십 전환 불확실성으로 시간외 소폭 하락" }],
                impactLevel: "high",
                time: "2026-04-20"
            },
            { 
                id: 6, 
                speaker: "이창용", speakerTitle: "전 한국은행 총재", 
                country: "한국", countryCode: "kr",
                platform: "금통위 기자간담회", 
                summary: "기준금리 2.50% 7연속 동결 결정. '환율 안정 상태에서 후임에게 넘기고 싶었는데 트럼프 대통령이 도와주지 않았다'고 이임 발언.", 
                analysis: "2.50% 기준금리 7연속 동결로 금융지주사의 예대마진 환경 안정적 유지. 트럼프발 환율 변동성 지속이 에너지·해운주의 구조적 리스크로 지속.",
                positiveStocks: [{ ticker: "105560", name: "KB금융", reason: "금리 동결로 은행 예대마진 안정" }, { ticker: "055550", name: "신한지주", reason: "대출 수익 유지" }, { ticker: "086790", name: "하나금융지주", reason: "금리 동결 수혜" }],
                negativeStocks: [{ ticker: "015760", name: "한국전력", reason: "고환율 지속으로 연료 수입 비용 부담" }, { ticker: "042660", name: "한화오션", reason: "환율 불확실성 부담" }],
                impactLevel: "high",
                time: "2026-04-10 KST"
            },
            { 
                id: 7, 
                speaker: "스콧 베센트", speakerTitle: "미국 재무장관", 
                country: "미국", countryCode: "us",
                platform: "달라스 이코노믹 클럽", 
                summary: "미국인 40%가 주식시장에 노출되지 않았다며 '트럼프 어카운트' 등 주식 시장 참여 확대 필요성 역설. 관세 수익 '실질적으로 변하지 않을 것'이라고 발언.", 
                analysis: "개인 투자자 참여 확대는 브로커리지 및 소매 플랫폼에 긍정적이나, 제조업은 여전히 관세 불확실성 지속.",
                positiveStocks: [{ ticker: "006800", name: "미래에셋증권", reason: "" }, { ticker: "016360", name: "삼성증권", reason: "" }, { ticker: "SCHW", name: "Charles Schwab", reason: "소매 투자자 확대 수혜" }, { ticker: "HOOD", name: "Robinhood", reason: "소매 투자자 확대 수혜" }],
                negativeStocks: [{ ticker: "XLI", name: "Manufacturing ETF", reason: "관세 불확실성 지속" }],
                impactLevel: "medium",
                time: "2026-04-25"
            },
            { 
                id: 8, 
                speaker: "캐롤라인 레빗", speakerTitle: "백악관 대변인", 
                country: "미국", countryCode: "us",
                platform: "폭스뉴스 인터뷰", 
                summary: "미·이란 직접 회담 재개 발표. 파키스탄 중재 하 4월 25일 이슬라마바드에서 협상 재개. 긴장 완화 기대.", 
                analysis: "중동 긴장 완화로 유가 하락 기대, 항공 및 정유 섹터 변동성 예상.",
                positiveStocks: [{ ticker: "003490", name: "대한항공", reason: "" }, { ticker: "010950", name: "S-Oil", reason: "" }, { ticker: "DAL", name: "Delta Air Lines", reason: "유가 하락 기대" }],
                negativeStocks: [],
                impactLevel: "medium",
                time: "2026-04-24"
            },
            { 
                id: 9, 
                speaker: "이재명", speakerTitle: "더불어민주당 대표", 
                country: "한국", countryCode: "kr",
                platform: "X(트위터) / 공개 발언", 
                summary: "주식 과세체계 개편 필요성, 코스닥 제도 개선 가속화 희망, 자본시장 4대 개혁 추진.", 
                analysis: "코스닥 및 대표 플랫폼, 게임주 전반의 투자심리 개선 기대.",
                positiveStocks: [{ ticker: "KOSDAQ", name: "코스닥 전체", reason: "" }, { ticker: "035720", name: "카카오", reason: "" }, { ticker: "259960", name: "크래프톤", reason: "" }, { ticker: "247540", name: "에코프로비엠", reason: "" }],
                negativeStocks: [],
                impactLevel: "low",
                time: "2026-04-09 KST"
            }],
        sectorSummary: [
            { name: "반도체/AI 인프라", positive: 85, negative: 15, comment: "역대 최대 실적 릴레이와 AI 설비 투자 소식에 강력한 시선이 쏠리고 있습니다.", speakers: ["젠슨 황", "일론 머스크", "최태원"] },
            { name: "금융/전체 시장", positive: 50, negative: 50, comment: "기준금리 동결과 매파적 교체가 혼재되며 뚜렷한 방향을 찾지 못하고 있습니다.", speakers: ["스콧 베센트", "신원식", "이창용"] },
            { name: "무역·관세/수출 제조업", positive: 20, negative: 80, comment: "관세 세수 유지 발언으로 수출 대형주들에 무거운 부담이 가중되는 중입니다.", speakers: ["도널드 트럼프"] },
            { name: "전기차/AI 로봇", positive: 45, negative: 55, comment: "Optimus 양산 기대감과 단기 실적 우려가 맞서며 치열한 공방이 벌어지고 있습니다.", speakers: ["일론 머스크"] },
            { name: "자동차/하이브리드", positive: 30, negative: 70, comment: "역대 최대 매출에도 관세 불확실성이 발목을 강하게 잡고 있습니다.", speakers: ["정의선", "호세 무뇨스"] },
            { name: "조선/방산/전력", positive: 75, negative: 25, comment: "수주 모멘텀과 비중확대 리포트가 이어지며 단단한 훈풍이 부는 구간입니다.", speakers: ["카를로스 델 토로", "신원식"] }
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
    
    return <span className={cn("inline-block max-w-full rounded-md border px-2 py-0.5 text-[11px] font-medium leading-[1.4] text-left whitespace-normal break-keep", colorClass)}>{platform}</span>;
}

const DATES = ["2026-04-24", "2026-04-25", "2026-04-26"];

export default function SocialAnalysisView() {
    const [dateKey, setDateKey] = useState<string>("2026-04-26");
    
    const data = MOCK_DATA[dateKey as keyof typeof MOCK_DATA] || MOCK_DATA["2026-04-26"];

    // Compute aggregated stocks from speakers
    const allPositiveStocks = data.speakers?.flatMap(s => s.positiveStocks || []) || [];
    const allNegativeStocks = data.speakers?.flatMap(s => s.negativeStocks || []) || [];
    
    // Deduplicate by ticker
    const uniquePositiveStocks = Array.from(new Map(allPositiveStocks.map(item => [item.ticker, item])).values());
    const uniqueNegativeStocks = Array.from(new Map(allNegativeStocks.map(item => [item.ticker, item])).values());


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
                                const formatted = d.substring(5).replace("-", "/");
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
                        <span className="text-slate-400 text-[11px]">업데이트: {dateKey.replace(/-/g, ".")} 18:30 KST</span>
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
                <div className="bg-slate-900 border border-white/10 rounded-xl shadow-lg w-full">
                    
                    <table className="w-full text-left border-collapse table-fixed">
                        <thead className="bg-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 w-24 font-semibold text-center border-b border-slate-700/50">영향도</th>
                                <th className="px-6 py-4 w-[280px] font-semibold text-left border-b border-slate-700/50">인물</th>
                                <th className="px-6 py-4 font-semibold text-left border-b border-slate-700/50">발언 요약</th>
                                <th className="px-6 py-4 w-[200px] font-semibold text-emerald-400 text-xs bg-emerald-950/10 text-left border-b border-slate-700/50">📈 수혜 종목</th>
                                <th className="px-6 py-4 w-[200px] font-semibold text-[#ff7c7e] text-xs bg-[#ff7c7e]/5 text-left border-b border-slate-700/50">📉 리스크 종목</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {data.speakers.map((item, i) => {
                                const impactLevel = item.impactLevel || (((item as any).stars || 3) >= 4 ? 'high' : ((item as any).stars || 3) === 3 ? 'medium' : 'low');
                                const bgClass = i % 2 === 0 ? "bg-slate-800/60" : "bg-slate-900";
                                
                                const impactText = impactLevel === 'high' ? '높음' : impactLevel === 'medium' ? '중간' : '낮음';
                                const impactColor = impactLevel === 'high' ? 'text-[#ff7c7e]' : impactLevel === 'medium' ? 'text-amber-400' : 'text-emerald-400';
                                const dotColor = impactLevel === 'high' ? 'bg-[#ff7c7e]' : impactLevel === 'medium' ? 'bg-amber-400' : 'bg-emerald-400';
                                
                                return (
                                <tr key={`speaker-${item.id}`} className={cn(bgClass, "align-top")}>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col items-center justify-start gap-2 h-full pt-1">
                                            <div className="flex items-center gap-1.5">
                                                <div className={cn("w-2 h-2 rounded-full shadow-sm", dotColor)}></div>
                                                <span className={cn("text-xs font-bold whitespace-nowrap tracking-wide", impactColor)}>{impactText}</span>
                                            </div>
                                        </div>
                                    </td>
                                    
                                    <td className="px-6 py-5">
                                        <div className="flex items-start gap-3">
                                            <div className="flex flex-col items-center gap-1 shrink-0 pt-0.5">
                                                <Avatar name={item.speaker} />
                                            </div>
                                            <div className="flex flex-col gap-1 min-w-0 pr-4">
                                                <div className="flex items-center gap-1.5 whitespace-nowrap">
                                                    <span className="text-white font-bold text-sm">{item.speaker}</span>
                                                    <img 
                                                        src={flagUrl(item.countryCode)} 
                                                        alt={item.country}
                                                        className="w-5 h-3.5 rounded-[2px] object-cover shadow-sm shrink-0"
                                                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                                    />
                                                </div>
                                                <div className="text-slate-500 text-[10px] leading-tight flex items-center gap-1.5 flex-wrap mt-0.5">
                                                    <span>{(item as any).followers || "공개 발언" || "공개 발언"}</span>
                                                </div>
                                                <div className="mt-1">
                                                    <PlatformBadge platform={item.platform} />
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-5 pr-8">
                                        <div className="text-slate-200 text-sm leading-relaxed line-clamp-3">
                                            {item.summary}
                                        </div>
                                    </td>

                                    {/* Completely separated column: 수혜 종목 */}
                                    <td className="px-6 py-5 bg-emerald-950/10">
                                        <div className="flex flex-wrap gap-1 content-start">
                                            {item.positiveStocks && item.positiveStocks.length > 0 ? (
                                                item.positiveStocks.map((stock, idx) => (
                                                    <BenefitChip key={idx} name={stock.name} ticker={stock.ticker} />
                                                ))
                                            ) : (
                                                <div className="text-slate-600 text-xs w-full">—</div>
                                            )}
                                        </div>
                                    </td>

                                    {/* Completely separated column: 리스크 종목 */}
                                    <td className="px-6 py-5 bg-[#ff7c7e]/5">
                                        <div className="flex flex-wrap gap-1 content-start">
                                            {item.negativeStocks && item.negativeStocks.length > 0 ? (
                                                item.negativeStocks.map((stock, idx) => (
                                                    <RiskChip key={idx} name={stock.name} ticker={stock.ticker} />
                                                ))
                                            ) : (
                                                <div className="text-slate-600 text-xs w-full">—</div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </section>

            <div className="mb-20 border-t-2 border-slate-700/50"></div>

            {/* 3. ② 시장 영향 분석 (하단) */}
            <section className="mb-16">
                <SectionTitle icon={TrendingUp} title="📊 시장 영향 분석" subtitle="각 발언이 국내 증시에 미칠 영향을 분석했습니다" />
                <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden shadow-lg w-full overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse table-fixed min-w-[1250px]">
                        <thead className="bg-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            <tr>
                                <th className="px-4 py-4 w-24 font-semibold text-center border-b border-slate-700/50">영향도 강도</th>
                                <th className="px-4 py-4 w-[240px] font-semibold text-left border-b border-slate-700/50">인물</th>
                                <th className="px-4 py-4 font-semibold text-left border-b border-slate-700/50">발언</th>
                                <th className="px-4 py-4 w-[340px] font-semibold text-emerald-400 text-xs bg-emerald-950/10 text-left border-b border-slate-700/50">📈 수혜 종목</th>
                                <th className="px-4 py-4 w-[340px] font-semibold text-[#ff7c7e] text-xs bg-[#ff7c7e]/5 text-left border-b border-slate-700/50">📉 리스크 종목</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {data.speakers.map((speaker, i) => {
                                const impactLevel = speaker.impactLevel || (((speaker as any).stars || 3) >= 4 ? 'high' : ((speaker as any).stars || 3) === 3 ? 'medium' : 'low');
                                const bgClass = impactLevel === 'high' ? 'bg-[#ff7c7e]/10 hover:bg-[#ff7c7e]/15' :
                                                impactLevel === 'medium' ? 'bg-amber-500/10 hover:bg-amber-500/15' :
                                                'bg-emerald-500/10 hover:bg-emerald-500/15';
                                
                                const impactText = impactLevel === 'high' ? '높음' : impactLevel === 'medium' ? '중간' : '낮음';
                                const impactColor = impactLevel === 'high' ? 'text-[#ff7c7e]' : impactLevel === 'medium' ? 'text-amber-400' : 'text-emerald-400';
                                const dotColor = impactLevel === 'high' ? 'bg-[#ff7c7e]' : impactLevel === 'medium' ? 'bg-amber-400' : 'bg-emerald-400';
                                
                                return (
                                    <tr key={`overview-${speaker.id}`} className={cn(
                                        "align-top transition-colors",
                                        bgClass
                                    )}>
                                        {/* 1. 영향도 강도 */}
                                        <td className="px-4 py-6 border-r border-white/5">
                                            <div className="flex flex-col items-center justify-start gap-2 pt-2">
                                                <div className={cn("w-3.5 h-3.5 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)]", dotColor)}></div>
                                                <span className={cn("text-xs font-bold whitespace-nowrap", impactColor)}>{impactText}</span>
                                            </div>
                                        </td>
                                        
                                        {/* 2. 인물 */}
                                        <td className="px-4 py-6 border-r border-white/5 pr-2">
                                            <div className="flex items-center gap-3">
                                                <Avatar name={speaker.speaker} className="w-10 h-10 shrink-0" />
                                                <div className="flex flex-col gap-1 min-w-0 pr-2">
                                                    <div className="flex items-center gap-1.5 whitespace-nowrap">
                                                        <span className="text-white font-bold text-sm truncate">{speaker.speaker}</span>
                                                    </div>
                                                    <span className="text-slate-400 text-[11px] leading-tight truncate">{speaker.speakerTitle}</span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* 3. 발언 */}
                                        <td className="px-4 py-6 border-r border-white/5">
                                            <div className="flex flex-col gap-4">
                                                <div className="flex flex-col gap-1.5">
                                                    <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider">발언 요약</span>
                                                    <p className="text-slate-200 text-sm leading-relaxed font-medium">
                                                        {speaker.summary}
                                                    </p>
                                                </div>
                                                
                                                <div className="flex flex-col gap-1.5">
                                                    <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider">시장 영향 분석</span>
                                                    <p className="text-slate-400 text-[13px] leading-relaxed">
                                                        {speaker.analysis || `${speaker.speaker}의 발언은 관련 섹터에 즉각적인 변동성을 야기하고 있으며, 단기 포지션 관리의 핵심 변수로 부상했습니다.`}
                                                    </p>
                                                </div>
                                                
                                                <div className="flex items-center gap-4 mt-2 pt-3 border-t border-white/5">
                                                    <a href="#" className="inline-flex items-center text-blue-400 hover:text-blue-300 hover:underline text-[11px] font-medium" onClick={(e) => e.preventDefault()}>
                                                        <ExternalLink className="w-3 h-3 mr-1" />
                                                        원문 보기
                                                    </a>
                                                    <div className="flex items-center text-slate-500 text-[11px] font-mono tracking-wider gap-1">
                                                        <CalendarIcon className="w-3 h-3" />
                                                        {speaker.time ? speaker.time : "2026-04-26 09:00 KST"}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* 4. 수혜 종목 */}
                                        <td className="px-4 py-6 border-r border-white/5">
                                            <div className="flex flex-col gap-2">
                                                {speaker.positiveStocks && speaker.positiveStocks.length > 0 ? (
                                                    speaker.positiveStocks.map((stock, idx) => (
                                                        <div key={idx} className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                                                            <StockLogo ticker={stock.ticker} name={stock.name} className="w-3.5 h-3.5 rounded-sm shrink-0" />
                                                            <span className="text-emerald-400 text-xs font-bold">{stock.name}</span>
                                                            <span className="text-emerald-500/70 text-[10px] font-mono">({stock.ticker})</span>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="text-slate-600 text-xs w-full text-center py-4">—</div>
                                                )}
                                            </div>
                                        </td>

                                        {/* 5. 리스크 종목 */}
                                        <td className="px-4 py-6">
                                            <div className="flex flex-col gap-2">
                                                {speaker.negativeStocks && speaker.negativeStocks.length > 0 ? (
                                                    speaker.negativeStocks.map((stock, idx) => (
                                                        <div key={idx} className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-rose-500/10 border border-rose-500/20">
                                                            <StockLogo ticker={stock.ticker} name={stock.name} className="w-3.5 h-3.5 rounded-sm shrink-0 grayscale opacity-80" />
                                                            <span className="text-rose-400 text-xs font-bold">{stock.name}</span>
                                                            <span className="text-rose-500/70 text-[10px] font-mono">({stock.ticker})</span>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="text-slate-600 text-xs w-full text-center py-4">—</div>
                                                )}
                                            </div>
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
                
                <div className="flex flex-col gap-8">
                    {/* 수혜 가능 종목 테이블 */}
                    <div className="bg-slate-900 border border-emerald-900/40 rounded-xl overflow-hidden shadow-lg w-full">
                        <div className="bg-emerald-950/40 px-6 py-4 border-b border-emerald-900/40 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-emerald-400" />
                            <h3 className="text-emerald-400 font-bold text-base">수혜 가능 종목</h3>
                        </div>
                        <div className="overflow-x-auto custom-scrollbar">
                            <table className="w-full text-left min-w-[1000px] border-collapse">
                                <thead className="bg-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4 w-64 font-semibold text-left border-b border-slate-700">종목</th>
                                        <th className="px-6 py-4 w-32 font-semibold text-center border-b border-slate-700">섹터</th>
                                        <th className="px-6 py-4 w-48 font-semibold text-left border-b border-slate-700">주요 언급 인사</th>
                                        <th className="px-6 py-4 font-semibold text-left border-b border-slate-700">영향 근거</th>
                                        <th className="px-6 py-4 w-32 font-semibold text-center border-b border-slate-700">수혜 강도</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {uniquePositiveStocks.length > 0 ? uniquePositiveStocks.map((stock, i) => {
                                        const relatedImpact = null;
                                        const sector = relatedImpact ? "반도체/AI 인프라" : "IT/플랫폼";
                                        const stars = (relatedImpact as any)?.stars || 3;
                                        
                                        return (
                                            <tr key={i} className="hover:bg-slate-800/50 transition-colors bg-slate-900">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <StockLogo ticker={stock.ticker} name={stock.name} className="w-8 h-8 rounded-md" />
                                                        <div className="flex flex-col">
                                                            <span className="text-white font-bold text-sm">{stock.name}</span>
                                                            {stock.ticker.match(/^\d{6}$/) ? (
                                                                <span className="text-slate-500 text-[10px] font-mono">{stock.ticker}</span>
                                                            ) : (
                                                                <Badge variant="outline" className="w-fit text-[9px] px-1 py-0 h-4 border-slate-600 text-slate-400 bg-slate-800 mt-0.5">해외</Badge>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="text-slate-400 text-[11px] font-medium bg-slate-800/80 px-2 py-1 rounded-md">{sector}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <Avatar name={"인플루언서"} className="w-6 h-6" />
                                                        <span className="text-slate-300 text-sm font-medium">{"인플루언서"}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-slate-400 text-sm leading-relaxed block">{stock.reason}</span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <div className="flex justify-center gap-0.5 mt-1">
                                                        {[...Array(5)].map((_, idx) => (
                                                            <Star 
                                                                key={idx} 
                                                                className={cn(
                                                                    "w-3.5 h-3.5", 
                                                                    idx < stars 
                                                                        ? "fill-emerald-400 text-emerald-400" 
                                                                        : "fill-slate-700 text-slate-700"
                                                                )} 
                                                            />
                                                        ))}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    }) : (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-8 text-center text-slate-500 text-sm">수혜 가능 종목이 없습니다.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* 리스크 주시 종목 테이블 */}
                    <div className="bg-slate-900 border border-[#ff7c7e]/20 rounded-xl overflow-hidden shadow-lg w-full">
                        <div className="bg-[#ff7c7e]/10 px-6 py-4 border-b border-[#ff7c7e]/20 flex items-center gap-2">
                            <TrendingDown className="w-5 h-5 text-rose-400" />
                            <h3 className="text-rose-400 font-bold text-base">리스크 주시 종목</h3>
                        </div>
                        <div className="overflow-x-auto custom-scrollbar">
                            <table className="w-full text-left min-w-[1000px] border-collapse">
                                <thead className="bg-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4 w-64 font-semibold text-left border-b border-slate-700">종목</th>
                                        <th className="px-6 py-4 w-32 font-semibold text-center border-b border-slate-700">섹터</th>
                                        <th className="px-6 py-4 w-48 font-semibold text-left border-b border-slate-700">주요 언급 인사</th>
                                        <th className="px-6 py-4 font-semibold text-left border-b border-slate-700">영향 근거</th>
                                        <th className="px-6 py-4 w-32 font-semibold text-center border-b border-slate-700">리스크 강도</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {uniqueNegativeStocks.length > 0 ? uniqueNegativeStocks.map((stock, i) => {
                                        const relatedImpact = null;
                                        const sector = relatedImpact ? "자동차/수출제조업" : "금융/은행";
                                        const stars = (relatedImpact as any)?.stars || 3;
                                        
                                        return (
                                            <tr key={i} className="hover:bg-slate-800/50 transition-colors bg-slate-900">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <StockLogo ticker={stock.ticker} name={stock.name} className="w-8 h-8 rounded-md" />
                                                        <div className="flex flex-col">
                                                            <span className="text-white font-bold text-sm">{stock.name}</span>
                                                            {stock.ticker.match(/^\d{6}$/) ? (
                                                                <span className="text-slate-500 text-[10px] font-mono">{stock.ticker}</span>
                                                            ) : (
                                                                <Badge variant="outline" className="w-fit text-[9px] px-1 py-0 h-4 border-slate-600 text-slate-400 bg-slate-800 mt-0.5">해외</Badge>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="text-slate-400 text-[11px] font-medium bg-slate-800/80 px-2 py-1 rounded-md">{sector}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <Avatar name={"인플루언서"} className="w-6 h-6" />
                                                        <span className="text-slate-300 text-sm font-medium">{"인플루언서"}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-slate-400 text-sm leading-relaxed block">{stock.reason}</span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <div className="flex justify-center gap-0.5 mt-1">
                                                        {[...Array(5)].map((_, idx) => (
                                                            <Star 
                                                                key={idx} 
                                                                className={cn(
                                                                    "w-3.5 h-3.5", 
                                                                    idx < stars 
                                                                        ? "fill-[#ff7c7e] text-[#ff7c7e]" 
                                                                        : "fill-slate-700 text-slate-700"
                                                                )} 
                                                            />
                                                        ))}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    }) : (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-8 text-center text-slate-500 text-sm">리스크 주시 종목이 없습니다.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
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
                                    <div className="h-2 w-full flex rounded-full overflow-hidden bg-slate-800/80 mb-4">
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
