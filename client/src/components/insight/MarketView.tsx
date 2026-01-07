import { Card, CardContent } from "@/components/ui/card";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, ComposedChart, ReferenceLine } from "recharts";
import { Activity, TrendingUp, BarChart2, PieChart as PieChartIcon, Zap, Sparkles, FileText, Calendar, User, Download, CalendarDays, Check, ChevronsUpDown, HelpCircle, Maximize2, X, Gauge, ArrowRightLeft, Target, ChevronLeft, ChevronRight, LayoutGrid, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useState } from "react";
import { format, addDays, subDays } from "date-fns";

// --- Mock Data ---

// Generate last 30 days for date picker
const generateDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push({
      value: format(date, "yyyy-MM-dd"),
      label: format(date, "MMM dd, yyyy"),
    });
  }
  return dates;
};
const dateOptions = generateDates();

// 1. Fear & Greed History
const fgiHistoryData = Array.from({ length: 30 }, (_, i) => ({
  date: `2025-12-${i + 1}`,
  weekly: 40 + Math.random() * 40 + Math.sin(i / 3) * 15,
  monthly: 50 + Math.random() * 20 + Math.sin(i / 5) * 10,
}));

// 2. Rising Stocks Count (KOSPI/KOSDAQ)
const risingStocksKospi = Array.from({ length: 30 }, (_, i) => ({
  date: `12-${i + 1}`,
  ma5: 400 + Math.random() * 200,
  ma10: 450 + Math.random() * 150,
  ma20: 500 + Math.random() * 100,
  daily: 300 + Math.random() * 400,
}));

const risingStocksKosdaq = Array.from({ length: 30 }, (_, i) => ({
  date: `12-${i + 1}`,
  ma5: 700 + Math.random() * 300,
  ma10: 750 + Math.random() * 200,
  ma20: 800 + Math.random() * 150,
  daily: 500 + Math.random() * 600,
}));

// 3. Price Change Distribution (Histogram & KDE)
const generateDistData = (center: number, spread: number) => {
  return Array.from({ length: 40 }, (_, i) => {
    const x = (i - 20) / 2; // -10% to +10%
    const kde = Math.exp(-Math.pow(x - center, 2) / (2 * spread * spread)) * 100;
    const count = kde * (0.8 + Math.random() * 0.4) * 5; 
    return { range: x.toFixed(1), count: Math.floor(count), kde };
  });
};

const distKospi = generateDistData(0.5, 2.5);
const distKosdaq = generateDistData(-0.2, 3.5);

// 4. Rising Ratio by Market Size (Cumulative)
const risingRatioKospi = Array.from({ length: 14 }, (_, i) => ({
  date: `12-${15 + i}`,
  large: 20 + Math.random() * 10 + i * 2,
  mid: 30 + Math.random() * 15 + i,
  small: 50 + Math.random() * 20 - i,
}));

const risingRatioKosdaq = Array.from({ length: 14 }, (_, i) => ({
  date: `12-${15 + i}`,
  large: 15 + Math.random() * 10 - i,
  mid: 40 + Math.random() * 15 + i,
  small: 45 + Math.random() * 20 + i * 1.5,
  }));

// 5. Market Expected Return (PAM)
const pamKospi = Array.from({ length: 30 }, (_, i) => ({
  date: `12-${i + 1}`,
  day5: Math.sin(i / 2) * 0.5 + 0.2 + Math.random() * 0.2,
  day10: Math.sin(i / 4) * 0.4 + 0.1 + Math.random() * 0.1,
  day20: Math.sin(i / 6) * 0.3 + 0.05 + Math.random() * 0.1,
}));

const pamKosdaq = Array.from({ length: 30 }, (_, i) => ({
  date: `12-${i + 1}`,
  day5: Math.cos(i / 2) * 0.8 + 0.1 + Math.random() * 0.3,
  day10: Math.cos(i / 4) * 0.6 + 0.1 + Math.random() * 0.2,
  day20: Math.cos(i / 6) * 0.4 + 0.05 + Math.random() * 0.1,
}));

// --- Components ---

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1e293b] border border-border/50 p-3 rounded-none shadow-xl text-xs font-mono border-l-4 border-l-primary">
        <p className="font-bold text-white mb-2 pb-1 border-b border-white/10">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-4 mb-1">
            <span className="text-gray-400">{entry.name}</span>
            <span className="font-bold text-white" style={{ color: entry.stroke || entry.fill }}>
              {typeof entry.value === 'number' ? entry.value.toFixed(2) : entry.value}
              {entry.unit}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// --- Report Components ---

const ReportHeader = ({ date }: { date: string }) => (
  <div className="border-b-2 border-primary/50 pb-6 mb-12">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h1 className="text-4xl font-display font-bold text-white tracking-tight mb-2">MARKET INSIGHT INTELLIGENCE</h1>
        <p className="text-muted-foreground font-mono text-sm tracking-widest uppercase">Stock Link Market Analysis Agent AI</p>
      </div>
      <div className="text-right">
        <div className="bg-primary/10 text-primary px-3 py-1 text-xs font-bold uppercase tracking-wider inline-block mb-2">
          Daily Briefing
        </div>
        <div className="text-xs text-muted-foreground font-mono">
          Ref: MK-{date}-A
        </div>
      </div>
    </div>
    
    <div className="grid grid-cols-3 gap-4 text-sm border-t border-border/30 pt-4 font-mono text-muted-foreground">
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4" />
        <span>{format(new Date(date), "MMM dd, yyyy").toUpperCase()}</span>
      </div>
      <div className="flex items-center gap-2">
        <User className="w-4 h-4" />
        <span>AI ANALYST: OMEGA-7</span>
      </div>
      <div className="flex items-center gap-2">
        <Target className="w-4 h-4" />
        <span>TARGET: KOSPI, KOSDAQ</span>
      </div>
    </div>
  </div>
);

const SectionHeader = ({ number, title, icon: Icon, description }: { number: string, title: string, icon: any, description?: string }) => (
  <div className="flex items-center gap-4 mb-6 border-b border-border/30 pb-2">
    <span className="text-3xl font-display font-bold text-primary/30">{number}</span>
    <div className="flex-1">
      <h2 className="text-xl font-bold text-white flex items-center gap-2 uppercase tracking-wide">
        <Icon className="w-5 h-5 text-primary" />
        {title}
        {description && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full hover:bg-primary/20 ml-1">
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                <span className="sr-only">Info</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4 bg-card border-border/50 backdrop-blur-md shadow-xl text-sm leading-relaxed text-muted-foreground">
              {description}
            </PopoverContent>
          </Popover>
        )}
      </h2>
    </div>
  </div>
);

const AnalysisBlock = ({ content, className }: { content: string, className?: string }) => (
  <div className={cn("rounded-lg border border-blue-500/30 bg-blue-900/10 overflow-hidden flex flex-col", className)}>
    <div className="bg-blue-500/20 px-4 py-2 flex items-center gap-2 border-b border-blue-500/20 shrink-0">
      <Sparkles className="w-4 h-4 text-blue-400" />
      <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider font-mono">
        AI Insight
      </h4>
    </div>
    <div className="p-4 flex-1">
      <p className="text-sm text-gray-300 leading-relaxed font-sans whitespace-pre-line">
        {content}
      </p>
    </div>
  </div>
);

const DescriptionBlock = ({ content }: { content: string }) => (
  <p className="text-sm text-muted-foreground mb-6 leading-relaxed border-l-2 border-border/30 pl-4">
    {content}
  </p>
);

const summaryVariants = [
  {
    title: (<span>대형주 모멘텀 주도의 <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">강세장 지속 신호</span> 포착</span>),
    content: "종합 시장 데이터는 강력한 회복 국면을 시사합니다. 공포 & 탐욕 지수는 '탐욕' 구간(65)으로 진입했으며, 반도체 대형주에 대한 외국인의 강한 순매수가 이를 뒷받침하고 있습니다. 코스닥 소형주는 다소 뒤쳐져 있으나, 전반적인 시장의 상승 폭은 확대되고 있습니다.",
    metrics: [
      { label: "시장 국면", value: "위험 회피", icon: Gauge, color: "text-red-400" },
      { label: "시장 건전성", value: "붕괴", icon: Activity, color: "text-red-400" },
      { label: "자금 흐름", value: "소형주 투기", icon: ArrowRightLeft, color: "text-yellow-500" },
      { label: "대응 전략", value: "현금 관망", icon: Target, color: "text-blue-400" }
    ]
  },
  {
    title: (<span>단기 과열 우려 속 <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">숨고르기 장세</span> 진입</span>),
    content: "지수가 단기간 급등함에 따라 차익 실현 매물이 출회되고 있습니다. 기술적 지표들은 과매수 구간에 진입하였으며, 변동성 지수가 소폭 상승하고 있어 리스크 관리가 필요한 시점입니다. 현금 비중을 확대하고 보수적인 접근이 유효합니다.",
    metrics: [
      { label: "시장 국면", value: "과열권", icon: Gauge, color: "text-red-500" },
      { label: "시장 건전성", value: "주의", icon: Activity, color: "text-yellow-500" },
      { label: "자금 흐름", value: "순환매", icon: ArrowRightLeft, color: "text-blue-400" },
      { label: "대응 전략", value: "비중 축소", icon: Target, color: "text-red-400" }
    ]
  },
  {
    title: (<span>저가 매수세 유입으로 인한 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">기술적 반등</span> 시도</span>),
    content: "최근 하락에 따른 저가 매수세가 유입되며 지수가 반등을 시도하고 있습니다. 다만, 거래량이 수반되지 않은 반등은 신뢰도가 낮으므로 보수적인 접근이 필요합니다. 확실한 추세 전환 신호가 나올 때까지 관망하는 것이 좋습니다.",
    metrics: [
      { label: "시장 국면", value: "침체", icon: Gauge, color: "text-blue-500" },
      { label: "시장 건전성", value: "약세", icon: Activity, color: "text-blue-400" },
      { label: "자금 흐름", value: "자금 이탈", icon: ArrowRightLeft, color: "text-red-400" },
      { label: "대응 전략", value: "분할 매수", icon: Target, color: "text-green-400" }
    ]
  }
];

const MarketSummaryReport = ({ date }: { date: string }) => {
  const dayIndex = new Date(date).getDate() % 3;
  const data = summaryVariants[dayIndex];

  return (
  <div className="bg-gradient-to-br from-[#12141a] to-[#0B0E14] border border-border/30 rounded-xl mb-12 shadow-2xl overflow-hidden">
    {/* Header Section */}
    <div className="bg-secondary/30 px-6 py-3 border-b border-border/40 flex justify-between items-center">
      <h3 className="font-bold text-white uppercase tracking-wider text-sm flex items-center gap-2">
        <FileText className="w-4 h-4 text-primary" />
        요약 보고서 (Executive Summary)
      </h3>
      <span className="text-xs font-mono text-primary animate-pulse">LIVE ANALYSIS</span>
    </div>
    
    <div className="p-8">
      <div className="flex flex-col gap-8">
        {/* Main Text Content */}
        <div className="flex-1 pb-8 border-b border-border/20">
           <h4 className="text-3xl font-display font-bold text-white mb-6 leading-tight">
             {data.title}
           </h4>
           
           <div className="border-l-4 border-primary pl-4 py-1">
             <p className="text-gray-400 leading-relaxed text-lg font-light">
               {data.content}
             </p>
           </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4">
             {data.metrics.map((metric, idx) => (
               <div key={idx} className="bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors overflow-hidden group">
                 <div className="bg-white/5 px-4 py-3 border-b border-white/5 group-hover:bg-white/10 transition-colors">
                   <div className="flex items-center gap-2">
                     <metric.icon className={`w-4 h-4 ${metric.color}`} />
                     <div className="font-bold text-gray-200 text-sm tracking-wide">{metric.label}</div>
                   </div>
                 </div>
                 <div className="p-5">
                   <div className={`text-xl font-bold ${metric.color} flex items-center gap-2`}>
                     {metric.value}
                   </div>
                 </div>
               </div>
             ))}
        </div>
      </div>
    </div>
  </div>
)};

// --- Navigation Links ---
const navLinks = [
  { id: "fgi", label: "01. 공포 & 탐욕 지수", icon: Zap },
  { id: "rising-stocks", label: "02. 상승 종목 수", icon: TrendingUp },
  { id: "price-dist", label: "03. 등락률 분포", icon: BarChart2 },
  { id: "market-size", label: "04. 시총별 흐름", icon: PieChartIcon },
  { id: "pam", label: "05. 기대 수익률", icon: Activity },
];

export default function MarketView() {
  const [date, setDate] = useState<string>(dateOptions[0].value);
  const [open, setOpen] = useState(false);
  const [selectedChart, setSelectedChart] = useState<{ title: string; description: string; chart: React.ReactNode; analysis: string; legend?: React.ReactNode } | null>(null);
  const [showDescription, setShowDescription] = useState(true);

  const handlePrevDate = () => {
    const newDate = subDays(new Date(date), 1);
    setDate(format(newDate, "yyyy-MM-dd"));
  };

  const handleNextDate = () => {
    const newDate = addDays(new Date(date), 1);
    setDate(format(newDate, "yyyy-MM-dd"));
  };

  const analysisTexts = {
    fgi: `현재 지수는 65(탐욕)로, 지난달의 중립 구간에서 상승했습니다.
    과거 데이터를 볼 때, '탐욕' 구간에서 주간 평균이 월간 평균을 상향 돌파하면 시장 랠리가 2-3주 더 지속되는 경향이 있습니다.
    80(극도 탐욕)을 돌파할 경우 단기 조정에 대비하여 현금 비중을 늘리는 전략이 유효할 수 있습니다.`,
    breadth: `코스피 상승 종목 수는 지난 5거래일 동안 20일 이동평균선을 지속적으로 상회하며, 폭넓은 상승장을 확인시켜주고 있습니다.
    반면 코스닥은 지수는 상승하지만 상승 종목 수는 감소하는 '괴리(Divergence)' 현상을 보이고 있어, 랠리가 일부 대형주에 집중되고 있음을 시사합니다.`,
    dist: `코스피 분포는 약간 오른쪽(+0.5%)으로 치우쳐 있어, 매도세보다 매수세가 강함을 나타냅니다.
    양의 방향에 나타난 '두터운 꼬리'는 일부 종목이 강한 시세 분출을 하고 있음을 의미합니다.
    코스닥은 0% 부근에서 좁은 피크를 형성하고 있어, 관망세와 횡보장이 지속되고 있음을 보여줍니다.`,
    cap: `지난 3일간 외국인 매수세에 힘입어 대형주(파란색 영역)가 코스피 랠리를 주도해왔습니다.
    코스닥의 소형주들도 상승 탄력을 받기 시작했으며, 이는 '낙수 효과'가 곧 시작될 수 있음을 시사합니다.
    향후 중형주가 이 격차를 메우며 상승할지 주목해야 합니다.`,
    pam: `코스피의 단기(5일) 기대 수익률(적색 선)이 상승 추세를 보이며 장기 전망을 상회하고 있습니다. 이는 강력한 단기 모멘텀을 확인시켜 줍니다.
    코스닥의 20일 전망은 평탄하여 아직 뚜렷한 장기 추세가 형성되지 않았음을 나타냅니다.
    코스닥이 뚜렷한 방향성을 잡을 때까지는 코스피 단기 매매에 집중하는 것이 유리합니다.`
  };

  const chartDescriptions = {
    fgi: "공포 & 탐욕 지수는 모멘텀, 변동성, 옵션 거래량 등을 종합하여 시장 심리를 나타내는 지표입니다. 역발상 지표로 활용되며, 극도의 공포는 과매도 상태를, 극도의 탐욕은 잠재적인 조정 가능성을 시사합니다.",
    breadth: "시장 등락(Market Breadth)은 주가 상승이 얼마나 광범위하게 나타나는지를 측정합니다. 이동평균선 대비 상승 종목 수를 추적하여 지수 추세의 강도를 검증합니다. 소수의 대형주가 주도하는 랠리보다 다수의 종목이 상승하는 랠리가 더 지속 가능합니다.",
    dist: "이 히스토그램은 일일 주가 변동폭의 빈도 분포를 보여줍니다. 커널 밀도 추정(KDE) 선은 부드러운 확률 밀도를 나타냅니다. 오른쪽으로 치우친 분포는 긍정적인 모멘텀을, '두터운 꼬리(Fat tail)'는 급격한 변동 가능성이 높음을 의미합니다.",
    cap: "시가총액 규모(대형, 중형, 소형)별 누적 상승 비율 분석입니다. 이 시각화는 랠리가 블루칩(대형주)에 의해 주도되는지, 아니면 위험 선호 심리가 소형 성장주로 확산되고 있는지(낙수 효과)를 파악하는 데 도움을 줍니다.",
    pam: "예측 자산 모델(PAM)을 사용하여 향후 5일, 10일, 20일 동안의 시장 기대 수익률을 시뮬레이션합니다. 과거 패턴과 현재 모멘텀을 기반으로 산출되며, 단기 트레이딩 전략 수립에 활용됩니다."
  };

  const fgiChart = (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={fgiHistoryData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={true} />
        <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} dy={10} angle={-45} textAnchor="end" height={60} />
        <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} domain={[0, 100]} />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine y={80} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'EXTREME GREED', fill: '#ef4444', fontSize: 9, position: 'insideTopRight' }} />
        <ReferenceLine y={20} stroke="#3b82f6" strokeDasharray="3 3" label={{ value: 'EXTREME FEAR', fill: '#3b82f6', fontSize: 9, position: 'insideBottomRight' }} />
        <Line type="monotone" dataKey="weekly" name="Weekly FGI" stroke="#ef4444" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="monthly" name="Monthly FGI" stroke="#3b82f6" strokeWidth={2} dot={false} strokeDasharray="5 5" />
      </ComposedChart>
    </ResponsiveContainer>
  );

  const kospiBreadthChart = (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={risingStocksKospi}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
        <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} dy={10} angle={-45} textAnchor="end" height={60} />
        <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '15px' }} iconType="rect" />
        <Line type="step" dataKey="daily" name="Daily Count" stroke="#ef4444" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="ma5" name="5D MA" stroke="#f97316" strokeWidth={1} dot={false} strokeDasharray="3 3" />
        <Line type="monotone" dataKey="ma20" name="20D MA" stroke="#3b82f6" strokeWidth={1} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );

  const kosdaqBreadthChart = (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={risingStocksKosdaq}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
        <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} dy={10} angle={-45} textAnchor="end" height={60} />
        <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '15px' }} iconType="rect" />
        <Line type="step" dataKey="daily" name="Daily Count" stroke="#ef4444" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="ma5" name="5D MA" stroke="#f97316" strokeWidth={1} dot={false} strokeDasharray="3 3" />
        <Line type="monotone" dataKey="ma20" name="20D MA" stroke="#3b82f6" strokeWidth={1} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );

  const kospiDistChart = (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={distKospi}>
        <XAxis dataKey="range" hide />
        <YAxis hide />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="count" name="Freq" fill="#3b82f6" opacity={0.4} barSize={4} />
        <Line type="monotone" dataKey="kde" name="Density" stroke="#fff" strokeWidth={1.5} dot={false} />
      </ComposedChart>
    </ResponsiveContainer>
  );

  const kosdaqDistChart = (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={distKosdaq}>
        <XAxis dataKey="range" hide />
        <YAxis hide />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="count" name="Freq" fill="#3b82f6" opacity={0.4} barSize={4} />
        <Line type="monotone" dataKey="kde" name="Density" stroke="#fff" strokeWidth={1.5} dot={false} />
      </ComposedChart>
    </ResponsiveContainer>
  );

  const kospiSizeChart = (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={risingRatioKospi}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
        <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} dy={10} angle={-45} textAnchor="end" height={60} />
        <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} unit="%" />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '15px' }} iconType="rect" />
        <Area type="monotone" dataKey="small" name="Small Cap" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} />
        <Area type="monotone" dataKey="mid" name="Mid Cap" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
        <Area type="monotone" dataKey="large" name="Large Cap" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
      </AreaChart>
    </ResponsiveContainer>
  );

  const kosdaqSizeChart = (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={risingRatioKosdaq}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
        <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} dy={10} angle={-45} textAnchor="end" height={60} />
        <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} unit="%" />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '15px' }} iconType="rect" />
        <Area type="monotone" dataKey="small" name="Small Cap" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} />
        <Area type="monotone" dataKey="mid" name="Mid Cap" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
        <Area type="monotone" dataKey="large" name="Large Cap" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
      </AreaChart>
    </ResponsiveContainer>
  );

  const pamChart = (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={pamKospi}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
        <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} dy={10} angle={-45} textAnchor="end" height={60} />
        <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '15px' }} iconType="rect" />
        <Line type="monotone" dataKey="day5" name="5D Exp. Return" stroke="#ef4444" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="day10" name="10D Exp. Return" stroke="#f97316" strokeWidth={1} dot={false} strokeDasharray="3 3" />
        <Line type="monotone" dataKey="day20" name="20D Exp. Return" stroke="#3b82f6" strokeWidth={1} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );

  const pamLegend = (
    <div className="mt-2 grid grid-cols-2 gap-2 text-[10px] text-muted-foreground font-mono">
      <div className="flex flex-col gap-1">
        <span><strong className="text-gray-400">ER:</strong> Expected Return</span>
        <span><strong className="text-gray-400">VAR:</strong> Value at Risk</span>
      </div>
      <div className="flex flex-col gap-1">
        <span><strong className="text-gray-400">MSI:</strong> Market Strength Index</span>
        <span><strong className="text-gray-400">PI:</strong> 개인순매수지수</span>
      </div>
    </div>
  );

  const allCharts = [
    { 
      id: "fgi", 
      title: "공포 & 탐욕 지수 (FGI)", 
      chart: fgiChart, 
      analysis: analysisTexts.fgi,
      description: chartDescriptions.fgi
    },
    { 
      id: "rising-stocks", 
      title: "상승 종목 수 (Market Breadth)", 
      chart: <div className="grid grid-cols-2 gap-4 h-full"><div className="h-full">{kospiBreadthChart}</div><div className="h-full">{kosdaqBreadthChart}</div></div>,
      analysis: analysisTexts.breadth,
      description: chartDescriptions.breadth
    },
    { 
      id: "price-dist", 
      title: "등락률 분포 (Histogram)", 
      chart: <div className="grid grid-cols-2 gap-4 h-full"><div className="h-full">{kospiDistChart}</div><div className="h-full">{kosdaqDistChart}</div></div>,
      analysis: analysisTexts.dist,
      description: chartDescriptions.dist
    },
    { 
      id: "market-size", 
      title: "시가총액별 흐름 (Size Effect)", 
      chart: <div className="grid grid-cols-2 gap-4 h-full"><div className="h-full">{kospiSizeChart}</div><div className="h-full">{kosdaqSizeChart}</div></div>,
      analysis: analysisTexts.cap,
      description: chartDescriptions.cap
    },
    { 
      id: "pam", 
      title: "기대 수익률 (PAM)", 
      chart: pamChart,
      legend: pamLegend,
      analysis: analysisTexts.pam,
      description: chartDescriptions.pam
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
        {/* Info Banner */}
        {showDescription && (
          <div className="flex items-center justify-between gap-4 mb-2 bg-blue-950/30 border border-blue-800/30 rounded-lg px-4 py-3 text-sm text-blue-100 animate-in fade-in slide-in-from-top-2 duration-300">
             <div className="flex items-center gap-3">
               <Info className="w-4 h-4 text-blue-400 shrink-0" />
               <span className="font-bold text-blue-200 whitespace-nowrap">마켓 분석?</span>
               <span className="text-gray-300 border-l border-blue-800/50 pl-3">
                 시장 전반의 주요 지표와 AI 분석 리포트를 통해 시장의 흐름과 투자 심리를 심층적으로 파악할 수 있습니다.
               </span>
             </div>
             <button 
               onClick={() => setShowDescription(false)}
               className="p-1 hover:bg-blue-900/30 rounded-md transition-colors text-blue-400 hover:text-blue-200"
             >
               <X className="w-4 h-4" />
             </button>
          </div>
        )}

        {/* Date Navigation & Export */}
        <div className="flex justify-end items-center mb-6 gap-2">
            <div className="flex items-center gap-2 mr-auto">
              {/* Left spacer or other controls if needed */}
            </div>

            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handlePrevDate} 
                className="h-9 px-4 rounded-full bg-[#151921] border-white/10 hover:bg-white/5 text-gray-400 font-mono text-xs transition-all hover:text-white"
              >
                <ChevronLeft className="w-3 h-3 mr-2" />
                {format(subDays(new Date(date), 1), "MM.dd")}
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleNextDate} 
                className="h-9 px-4 rounded-full bg-[#151921] border-white/10 hover:bg-white/5 text-gray-400 font-mono text-xs transition-all hover:text-white"
              >
                {format(addDays(new Date(date), 1), "MM.dd")}
                <ChevronRight className="w-3 h-3 ml-2" />
              </Button>
            </div>
        </div>

        <div className="relative border border-green-500/30 rounded-xl p-8 md:p-12 shadow-[0_0_20px_rgba(34,197,94,0.05)] bg-[#0B0E14] overflow-hidden">
            {/* Top Glow Line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
            
            <div className="space-y-16">
                <ReportHeader date={date} />

                {/* Executive Summary */}
                <MarketSummaryReport date={date} />

                {/* Detailed Analysis Sections */}
                <div className="space-y-24">
                    {allCharts.map((section, idx) => {
                        const navItem = navLinks.find(link => link.id === section.id);
                        const SectionIcon = navItem ? navItem.icon : Activity;
                        const sectionNumber = navItem ? navItem.label.split('.')[0] : '00';

                        return (
                            <section key={section.id} id={section.id} className="scroll-mt-24">
                                <SectionHeader 
                                    number={sectionNumber} 
                                    title={section.title} 
                                    icon={SectionIcon} 
                                    description={section.description}
                                />

                                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                                    {/* Analysis Column (Left) */}
                                    <div className="lg:col-span-2 space-y-6">
                                        <AnalysisBlock content={section.analysis} />
                                        {section.legend && (
                                            <div className="bg-secondary/10 rounded-lg p-4 border border-border/30">
                                            <h5 className="text-xs font-bold text-muted-foreground uppercase mb-2 flex items-center gap-1">
                                                <Info className="w-3 h-3" />
                                                Legend
                                            </h5>
                                            {section.legend}
                                            </div>
                                        )}
                                    </div>

                                    {/* Chart Column (Right) */}
                                    <div className="lg:col-span-3 h-[320px] bg-[#12141a] rounded-lg border border-border/20 p-4 shadow-inner relative group">
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                            onClick={() => setSelectedChart(section)}
                                        >
                                            <Maximize2 className="w-4 h-4 text-muted-foreground" />
                                        </Button>
                                        {section.chart}
                                    </div>
                                </div>
                            </section>
                        );
                    })}
                </div>
            </div>
            
            {/* Bottom Glow Line */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
        </div>

        {/* Chart Modal */}
        <Dialog open={!!selectedChart} onOpenChange={(open) => !open && setSelectedChart(null)}>
          <DialogContent className="max-w-5xl h-[80vh] bg-[#0B0E14] border-border/50">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold flex items-center gap-2">
                 {selectedChart?.title}
              </DialogTitle>
              <DialogDescription>
                 {selectedChart?.description}
              </DialogDescription>
            </DialogHeader>
            <div className="flex-1 w-full h-full min-h-0 pt-4">
              {selectedChart?.chart}
            </div>
            {selectedChart?.analysis && (
              <div className="mt-4 p-4 bg-secondary/10 rounded-lg border border-border/20 text-sm text-gray-300">
                 {selectedChart.analysis}
              </div>
            )}
          </DialogContent>
        </Dialog>
    </div>
  );
}
