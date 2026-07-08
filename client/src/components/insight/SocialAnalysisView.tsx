import { useState } from "react";
import { format } from "date-fns";
import { TrendingUp, TrendingDown, Globe, Megaphone, Target, Calendar as CalendarIcon, ChevronDown, BarChart3, Newspaper, Twitter, Star, MessageSquare, ArrowUp, ArrowDown, ChevronLeft, ChevronRight, X, ExternalLink, ChevronRight as ChevronRightIcon, CheckCircle2, PauseCircle, AlertTriangle, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

// --- Helpers ---
const flagUrl = (countryCode: string) => `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;

const Avatar = ({ name }: { name: string }) => {
    const images: Record<string, string> = {
        "제롬 파월": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Jerome_Powell_official_portrait.jpg/400px-Jerome_Powell_official_portrait.jpg",
        "일론 머스크": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Elon_Musk_Royal_Society_crop.jpg/400px-Elon_Musk_Royal_Society_crop.jpg",
        "젠슨 황": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Jensen_Huang_%kr%28cropped%29.jpg/400px-Jensen_Huang_%28cropped%29.jpg",
        "도널드 트럼프": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/400px-Donald_Trump_official_portrait.jpg",
        "이창용": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Rhee_Chang-yong_2023.jpg/400px-Rhee_Chang-yong_2023.jpg",
        "워런 버핏": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Warren_Buffett_KU_KU_Alumni_Association.jpg/400px-Warren_Buffett_KU_KU_Alumni_Association.jpg",
        "팀 쿡": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Tim_Cook_2024.jpg/400px-Tim_Cook_2024.jpg",
        "케빈 워시": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Kevin_Warsh.jpg/400px-Kevin_Warsh.jpg"
    };

    const src = images[name];
    const initials = name.substring(0, 2);

    return (
        <div className="relative w-12 h-12 flex-shrink-0">
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

const StockFlag = ({ countryCode }: { countryCode: string }) => {
    return (
        <img 
            src={flagUrl(countryCode)} 
            alt={countryCode}
            className="w-4 h-3 rounded-[2px] object-cover shadow-sm shrink-0"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
    )
}

const BenefitChip = ({ name, percent, countryCode }: { name: string, percent: number, countryCode: string }) => {
    return (
        <div className="flex items-center gap-1.5 bg-emerald-950/40 border border-emerald-900/60 rounded px-2 py-1 text-xs">
            <StockFlag countryCode={countryCode} />
            <span className="text-emerald-100 font-medium">{name}</span>
            <span className="text-emerald-400 font-bold">{percent}%</span>
        </div>
    );
};

const RiskChip = ({ name, percent, countryCode }: { name: string, percent: number, countryCode: string }) => {
    return (
        <div className="flex items-center gap-1.5 bg-[#ff7c7e]/10 border border-[#ff7c7e]/20 rounded px-2 py-1 text-xs">
            <StockFlag countryCode={countryCode} />
            <span className="text-red-100 font-medium">{name}</span>
            <span className="text-[#ff7c7e] font-bold">{percent}%</span>
        </div>
    );
};


// --- MOCK DATA ---
const MOCK_DATA = {
    "2026-04-26": {
        highlights: [
            <><HighlightInfluencer>코스피 6,500선 돌파 및 신고가 경신</HighlightInfluencer>: 한국 1분기 실질 GDP가 예상치를 상회하며 서프라이즈를 기록했고, 삼성전자 역대 최대 분기 실적으로 코스피 상승 랠리가 이어지고 있습니다.</>,
            <><HighlightInfluencer>일론 머스크</HighlightInfluencer>, 테슬라 어닝콜에서 Capex 25% 상향 및 Optimus 대규모 양산 선언 → <HighlightPos>삼성전자</HighlightPos>, <HighlightPos>SK하이닉스</HighlightPos> 주목 집중</>,
            <><HighlightInfluencer>도널드 트럼프</HighlightInfluencer>, Truth Social에서 15% 보편 관세 재차 강조 → 자동차/수출주 <HighlightNeg>역풍 우려</HighlightNeg> 확산</>,
            <><HighlightInfluencer>케빈 워시</HighlightInfluencer> 연준 의장 지명자 매파적 발언: 대차대조표 축소 의지 천명으로 모들리 풀은 '증시에 큰 위협' 경고 → 성장주 <HighlightNeg>발목 잡힐 수 있어</HighlightNeg></>,
            <><HighlightInfluencer>국내 증권사</HighlightInfluencer> AI·방산·원전 비중확대 의견 유지: 코스피 주간 상승 속 반도체·방산·전력기기 강세 지속 전망 → 관련주 <HighlightPos>모멘텀 포착</HighlightPos></>
        ],
        speakers: [
            {
                id: 1,
                speaker: "이창용", country: "한국", countryCode: "kr",
                role: "한국은행 총재",
                platform: "한국은행 / 언론보도", followers: "기자간담회",
                summary: "한국 1분기 실질 GDP가 전기 대비 1.3% 성장하며 시장 전망치(0.6%)를 크게 웃돌았습니다. 이는 2년 3개월 만에 최고치입니다.",
                time: "10:30",
                impact: "높음",
                positiveStocks: [
                    { name: "삼성전자", percent: 85, countryCode: "kr" },
                    { name: "SK하이닉스", percent: 82, countryCode: "kr" },
                    { name: "KB금융", percent: 65, countryCode: "kr" }
                ],
                negativeStocks: [
                    { name: "카카오뱅크", percent: 45, countryCode: "kr" },
                    { name: "현대건설", percent: 60, countryCode: "kr" }
                ]
            },
            {
                id: 2,
                speaker: "일론 머스크", country: "미국", countryCode: "us",
                role: "Tesla CEO",
                platform: "Tesla Q1 2026 어닝콜", followers: "컨퍼런스콜",
                summary: "테슬라 Q1 실적 발표. EPS 0.45달러로 예상치 하회했으나, 저가형 모델 조기 출시와 로보택시 비전 제시로 애프터마켓 주가 13% 급등.",
                time: "07:15",
                impact: "높음",
                positiveStocks: [
                    { name: "Tesla", percent: 92, countryCode: "us" },
                    { name: "LG에너지솔루션", percent: 75, countryCode: "kr" },
                    { name: "에코프로비엠", percent: 70, countryCode: "kr" }
                ],
                negativeStocks: []
            },
            {
                id: 3,
                speaker: "도널드 트럼프", country: "미국", countryCode: "us",
                role: "미국 대통령",
                platform: "Truth Social", followers: "공개 발언",
                summary: "우리가 백악관에 돌아가면 무역 적자를 줄이고 미국 제조업을 보호하기 위해 15%의 보편 관세를 즉각 도입할 것입니다.",
                time: "14:22",
                impact: "높음",
                positiveStocks: [
                    { name: "Lockheed Martin", percent: 68, countryCode: "us" },
                    { name: "한화에어로스페이스", percent: 72, countryCode: "kr" }
                ],
                negativeStocks: [
                    { name: "현대차", percent: 88, countryCode: "kr" },
                    { name: "기아", percent: 85, countryCode: "kr" },
                    { name: "Delta Air Lines", percent: 55, countryCode: "us" }
                ]
            },
            {
                id: 4,
                speaker: "케빈 워시", country: "미국", countryCode: "us",
                role: "연준 의장 지명자",
                platform: "Wall Street Journal", followers: "인터뷰",
                summary: "현재의 인플레이션 수준은 여전히 목표치를 상회하고 있으며, 필요하다면 추가적인 긴축 조치도 배제하지 않을 것입니다.",
                time: "09:45",
                impact: "중간",
                positiveStocks: [
                    { name: "JPMorgan", percent: 52, countryCode: "us" },
                    { name: "신한지주", percent: 48, countryCode: "kr" }
                ],
                negativeStocks: [
                    { name: "Apple", percent: 62, countryCode: "us" },
                    { name: "NAVER", percent: 75, countryCode: "kr" },
                    { name: "카카오", percent: 70, countryCode: "kr" }
                ]
            }
        ],
        sectors: [
            { sector: "반도체/AI", score: 85, mentions: 427, keywords: ["HBM3E", "Capex 상향", "엔비디아 랠리"], relatedSpeeches: ["일론 머스크: AI 인프라 투자 확대 기조 재확인", "팀 쿡: 자체 AI 칩 개발 가속화 시사"] },
            { sector: "자동차/수출", score: -72, mentions: 312, keywords: ["15% 보편 관세", "무역 장벽", "IRA 축소"], relatedSpeeches: ["도널드 트럼프: 미국 우선주의 및 보편 관세 15% 재차 강조"] },
            { sector: "금융/은행", score: 45, mentions: 256, keywords: ["기준금리 동결", "밸류업", "배당 확대"], relatedSpeeches: ["이창용: 단기 금리 인하 기대감 일축", "케빈 워시: 매파적 통화정책 유지 시사"] },
            { sector: "이차전지", score: 62, mentions: 198, keywords: ["테슬라 로보택시", "저가 모델", "배터리 수요"], relatedSpeeches: ["일론 머스크: 저가형 전기차 라인업 조기 출시 계획 발표"] }
        ],
        comprehensive: {
            benefits: [
                { name: "삼성전자", percent: 85, countryCode: "kr", speaker: "일론 머스크, 이창용", reason: "AI 인프라 수요 확대 및 국내 매크로 호조" },
                { name: "SK하이닉스", percent: 82, countryCode: "kr", speaker: "일론 머스크, 젠슨 황", reason: "HBM3E 독점적 지위 및 엔비디아 랠리 동조" },
                { name: "Tesla", percent: 92, countryCode: "us", speaker: "일론 머스크", reason: "저가 모델 출시 앞당김 및 로보택시 비전 제시" },
                { name: "한화에어로스페이스", percent: 72, countryCode: "kr", speaker: "도널드 트럼프", reason: "지정학적 리스크 부각 및 국방 예산 확대 기대" }
            ],
            risks: [
                { name: "현대차", percent: 88, countryCode: "kr", speaker: "도널드 트럼프", reason: "15% 보편 관세로 인한 대미 수출 타격 우려" },
                { name: "기아", percent: 85, countryCode: "kr", speaker: "도널드 트럼프", reason: "관세 인상 시 가격 경쟁력 약화 및 마진 축소" },
                { name: "NAVER", percent: 75, countryCode: "kr", speaker: "케빈 워시", reason: "고금리 장기화에 따른 밸류에이션 할인 압박" },
                { name: "Apple", percent: 62, countryCode: "us", speaker: "케빈 워시, 팀 쿡", reason: "중국 시장 점유율 하락 및 긴축 기조에 따른 수요 둔화" }
            ]
        }
    }
};


const SectionTitle = ({ icon: Icon, title, subtitle }: { icon: any, title: string, subtitle?: string }) => (
    <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
            <Icon className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
        </div>
        {subtitle && <p className="text-slate-400 text-base">{subtitle}</p>}
    </div>
);

const PlatformBadge = ({ platform }: { platform: string }) => {
    let colorClass = "bg-slate-800 text-slate-300 border-slate-600";
    let Icon = Globe;
    
    if (platform.includes("X") || platform.includes("Twitter")) {
        colorClass = "bg-[#1DA1F2]/20 text-[#1DA1F2] border-[#1DA1F2]/50";
        Icon = Twitter;
    }
    else if (platform.includes("Bloomberg") || platform.includes("WSJ") || platform.includes("언론") || platform.includes("News") || platform.includes("기자") || platform.includes("인터뷰")) {
        colorClass = "bg-indigo-900/50 text-indigo-300 border-indigo-700/50";
        Icon = Newspaper;
    }
    else if (platform.includes("어닝") || platform.includes("실적") || platform.includes("컨퍼런스") || platform.includes("IR")) {
        colorClass = "bg-emerald-900/50 text-emerald-300 border-emerald-700/50";
        Icon = BarChart3;
    }
    else if (platform.includes("Truth Social") || platform.includes("공개 발언")) {
        colorClass = "bg-orange-900/50 text-orange-300 border-orange-800";
        Icon = Megaphone;
    }

    return (
        <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border whitespace-nowrap", colorClass)}>
            <Icon className="w-3.5 h-3.5" />
            {platform}
        </span>
    );
};


export default function SocialAnalysisView() {
    const [dateKey, setDateKey] = useState("2026-04-26");
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
                        <div className="bg-slate-900/80 p-1 rounded-full border border-white/5 flex shadow-inner">
                            <button
                                onClick={() => setDateKey("2026-04-25")}
                                className={cn(
                                    "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                                    dateKey === "2026-04-25" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                                )}
                            >
                                04.25
                            </button>
                            <button
                                onClick={() => setDateKey("2026-04-26")}
                                className={cn(
                                    "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                                    dateKey === "2026-04-26" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                                )}
                            >
                                04.26 (Today)
                            </button>
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

            <div className="mb-16 border-t border-slate-700/50"></div>

            {/* 2 & 3. 주요 인사 발언 & 시장 영향도 (통합 구조) */}
            <section className="mb-16">
                <SectionTitle icon={Target} title="🎙 주요 인사 발언 및 시장 영향" subtitle="발언자 중심의 파급 효과 분석" />
                
                <div className="space-y-6">
                    {data.speakers.map((item, i) => (
                        <div key={item.id} className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden shadow-lg">
                            {/* 발언자 정보 및 요약 헤더 */}
                            <div className="p-5 flex flex-col md:flex-row gap-6 border-b border-white/5 items-start md:items-center bg-slate-800/30">
                                {/* 발언자 */}
                                <div className="flex items-center gap-4 w-full md:w-1/4 shrink-0">
                                    <Avatar name={item.speaker} />
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-white font-bold text-lg">{item.speaker}</h3>
                                            <StockFlag countryCode={item.countryCode} />
                                        </div>
                                        <div className="text-slate-400 text-xs">{item.role}</div>
                                        <div className="mt-1"><PlatformBadge platform={item.platform} /></div>
                                    </div>
                                </div>
                                {/* 발언 요약 */}
                                <div className="flex-1">
                                    <div className="text-slate-200 text-base font-medium leading-relaxed">
                                        "{item.summary}"
                                        <span className="text-slate-500 text-xs ml-2 font-normal whitespace-nowrap bg-slate-800 px-2 py-0.5 rounded border border-slate-700">{item.time}</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* 영향 종목 리스트 */}
                            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#0B0E14]">
                                <div>
                                    <h4 className="text-emerald-400 font-bold text-sm mb-3 flex items-center gap-2"><ArrowUp className="w-4 h-4"/> 수혜 종목</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {item.positiveStocks.length > 0 ? item.positiveStocks.map(stock => (
                                            <BenefitChip key={stock.name} name={stock.name} percent={stock.percent} countryCode={stock.countryCode} />
                                        )) : <span className="text-slate-500 text-sm">해당 없음</span>}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-[#ff7c7e] font-bold text-sm mb-3 flex items-center gap-2"><ArrowDown className="w-4 h-4"/> 리스크 종목</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {item.negativeStocks.length > 0 ? item.negativeStocks.map(stock => (
                                            <RiskChip key={stock.name} name={stock.name} percent={stock.percent} countryCode={stock.countryCode} />
                                        )) : <span className="text-slate-500 text-sm">해당 없음</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <div className="mb-16 border-t border-slate-700/50"></div>

            {/* 4. 수혜 / 리스크 종합 요약 테이블 */}
            <section className="mb-16">
                <SectionTitle icon={BarChart3} title="📋 종합 요약 테이블" subtitle="수혜 및 리스크 종목 상세 내역" />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* 수혜 종합 테이블 */}
                    <div className="bg-emerald-950/10 border border-emerald-900/30 rounded-xl overflow-hidden shadow-lg">
                        <div className="bg-emerald-900/20 px-5 py-3 border-b border-emerald-900/30">
                            <h3 className="text-emerald-400 font-bold text-sm flex items-center gap-2">
                                <ArrowUp className="w-4 h-4"/> 수혜 가능 종목 종합
                            </h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-emerald-900/10 text-emerald-500/70 text-xs font-semibold uppercase">
                                    <tr>
                                        <th className="px-4 py-3">종목명</th>
                                        <th className="px-4 py-3 text-center">영향도</th>
                                        <th className="px-4 py-3">관련 발언자</th>
                                        <th className="px-4 py-3 w-1/2">선정 사유</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-emerald-900/20">
                                    {data.comprehensive.benefits.map((item, i) => (
                                        <tr key={i} className="hover:bg-emerald-900/10 transition-colors">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <StockFlag countryCode={item.countryCode} />
                                                    <span className="text-slate-200 font-bold text-sm whitespace-nowrap">{item.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <span className="text-emerald-400 font-bold text-sm">{item.percent}%</span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-emerald-300/80 text-xs bg-emerald-950 px-2 py-1 rounded whitespace-nowrap border border-emerald-900/50">{item.speaker}</span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-slate-400 text-xs leading-relaxed line-clamp-2">{item.reason}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* 리스크 종합 테이블 */}
                    <div className="bg-[#ff7c7e]/5 border border-[#ff7c7e]/20 rounded-xl overflow-hidden shadow-lg">
                        <div className="bg-[#ff7c7e]/10 px-5 py-3 border-b border-[#ff7c7e]/20">
                            <h3 className="text-[#ff7c7e] font-bold text-sm flex items-center gap-2">
                                <ArrowDown className="w-4 h-4"/> 리스크 주시 종목 종합
                            </h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-[#ff7c7e]/5 text-[#ff7c7e]/70 text-xs font-semibold uppercase">
                                    <tr>
                                        <th className="px-4 py-3">종목명</th>
                                        <th className="px-4 py-3 text-center">영향도</th>
                                        <th className="px-4 py-3">관련 발언자</th>
                                        <th className="px-4 py-3 w-1/2">우려 사유</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#ff7c7e]/10">
                                    {data.comprehensive.risks.map((item, i) => (
                                        <tr key={i} className="hover:bg-[#ff7c7e]/10 transition-colors">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <StockFlag countryCode={item.countryCode} />
                                                    <span className="text-slate-200 font-bold text-sm whitespace-nowrap">{item.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <span className="text-[#ff7c7e] font-bold text-sm">{item.percent}%</span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-[#ff7c7e]/80 text-xs bg-[#ff7c7e]/10 px-2 py-1 rounded whitespace-nowrap border border-[#ff7c7e]/20">{item.speaker}</span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-slate-400 text-xs leading-relaxed line-clamp-2">{item.reason}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            <div className="mb-16 border-t border-slate-700/50"></div>

            {/* 5. 섹터별 영향 분석 */}
            <section className="mb-16">
                <SectionTitle icon={Activity} title="섹터별 영향 분석" subtitle="각 섹터에 미치는 파급력과 주요 코멘트" />
                <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden shadow-lg w-full overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left min-w-[800px] border-collapse">
                        <thead className="bg-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 w-48 font-semibold text-left">섹터</th>
                                <th className="px-6 py-4 w-32 font-semibold text-center">종합 점수</th>
                                <th className="px-6 py-4 w-32 font-semibold text-center">언급량</th>
                                <th className="px-6 py-4 font-semibold text-left">핵심 키워드</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {data.sectors.map((item, i) => (
                                <tr key={`sector-${i}`} className={cn(i % 2 === 0 ? "bg-slate-800/60" : "bg-slate-900", "align-top")}>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: SECTOR_COLORS[item.sector] || "#94a3b8" }}></div>
                                            <span className="text-slate-200 font-bold text-sm">{item.sector}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <span className={cn(
                                            "font-bold",
                                            item.score > 50 ? "text-emerald-400" : item.score < -50 ? "text-[#ff7c7e]" : "text-amber-400"
                                        )}>
                                            {item.score > 0 ? '+' : ''}{item.score}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-center text-slate-300 text-sm">
                                        {item.mentions.toLocaleString()}회
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col gap-3">
                                            <div className="flex flex-wrap gap-1.5">
                                                {item.keywords.map(kw => (
                                                    <span key={kw} className="bg-slate-800 text-slate-300 border border-slate-700 px-2 py-0.5 rounded text-xs">
                                                        {kw}
                                                    </span>
                                                ))}
                                            </div>
                                            {item.relatedSpeeches && item.relatedSpeeches.length > 0 && (
                                                <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                                                    <h5 className="text-slate-500 text-[11px] font-bold uppercase mb-2">관련 인사 발언</h5>
                                                    <ul className="space-y-1.5">
                                                        {item.relatedSpeeches.map((speech, idx) => (
                                                            <li key={idx} className="text-slate-400 text-xs flex items-start gap-1.5">
                                                                <MessageSquare className="w-3.5 h-3.5 mt-0.5 shrink-0 text-slate-500" />
                                                                <span>{speech}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

        </div>
    );
}
