import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, ComposedChart, ReferenceLine } from "recharts";
import { Activity, TrendingUp, BarChart2, PieChart as PieChartIcon, Zap, Sparkles, FileText, Calendar, User, Download, CalendarDays, Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
import { format } from "date-fns";

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
        <h1 className="text-4xl font-display font-bold text-white tracking-tight mb-2">MARKET INTELLIGENCE</h1>
        <p className="text-muted-foreground font-mono text-sm tracking-widest uppercase">퀀트 전략 본부 (Quantitative Strategy Division)</p>
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
        <Activity className="w-4 h-4" />
        <span>STATUS: ACTIVE TRADING</span>
      </div>
    </div>
  </div>
);

const SectionHeader = ({ number, title, icon: Icon }: { number: string, title: string, icon: any }) => (
  <div className="flex items-center gap-4 mb-6 border-b border-border/30 pb-2">
    <span className="text-3xl font-display font-bold text-primary/30">{number}</span>
    <div className="flex-1">
      <h2 className="text-xl font-bold text-white flex items-center gap-2 uppercase tracking-wide">
        <Icon className="w-5 h-5 text-primary" />
        {title}
      </h2>
    </div>
  </div>
);

const AnalysisBlock = ({ content }: { content: string }) => (
  <div className="mb-6 rounded-lg border border-blue-500/30 bg-blue-900/10 overflow-hidden">
    <div className="bg-blue-500/20 px-4 py-2 flex items-center gap-2 border-b border-blue-500/20">
      <Sparkles className="w-4 h-4 text-blue-400" />
      <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider font-mono">
        AI Insight
      </h4>
    </div>
    <div className="p-4">
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

const MarketSummaryReport = ({ date }: { date: string }) => (
  <div className="bg-card border border-border/40 p-0 mb-12 shadow-2xl overflow-hidden">
    <div className="bg-secondary/30 px-6 py-3 border-b border-border/40 flex justify-between items-center">
      <h3 className="font-bold text-white uppercase tracking-wider text-sm flex items-center gap-2">
        <FileText className="w-4 h-4 text-primary" />
        요약 보고서 (Executive Summary)
      </h3>
      <span className="text-xs font-mono text-primary animate-pulse">LIVE ANALYSIS</span>
    </div>
    
    <div className="p-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
           <h4 className="text-2xl font-bold text-white mb-4 leading-tight">
             대형주 모멘텀 주도의 <span className="text-green-400">강세장 지속 신호</span> 포착
           </h4>
           <p className="text-muted-foreground leading-relaxed mb-6">
             종합 시장 데이터는 강력한 회복 국면을 시사합니다. 공포 & 탐욕 지수는 '탐욕' 구간(65)으로 진입했으며, 반도체 대형주에 대한 외국인의 강한 순매수가 이를 뒷받침하고 있습니다. 코스닥 소형주는 다소 뒤쳐져 있으나, 전반적인 시장의 상승 폭은 확대되고 있습니다.
           </p>
           
           <div className="grid grid-cols-3 gap-4 border-t border-border/30 pt-6">
             <div>
               <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Sentiment</div>
               <div className="text-lg font-bold text-green-400">Bullish (강세)</div>
             </div>
             <div>
               <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Volatility</div>
               <div className="text-lg font-bold text-yellow-500">Moderate (보통)</div>
             </div>
             <div>
               <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Top Sector</div>
               <div className="text-lg font-bold text-white">Tech / AI</div>
             </div>
           </div>
        </div>
      </div>
    </div>
  </div>
);

// --- Navigation Links ---
const navLinks = [
  { id: "fgi", label: "01. 공포 & 탐욕 지수", icon: Zap },
  { id: "rising-stocks", label: "02. 상승 종목 수", icon: TrendingUp },
  { id: "price-dist", label: "03. 등락률 분포", icon: BarChart2 },
  { id: "market-size", label: "04. 시총별 흐름", icon: PieChartIcon },
  { id: "pam", label: "05. 기대 수익률", icon: Activity },
];

export default function MarketAnalysis() {
  const [date, setDate] = useState<string>(dateOptions[0].value);
  const [open, setOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset for sticky header
      const offset = 80;
      
      // Since the scroll is happening on the WINDOW/BODY (due to DashboardLayout structure changes requested),
      // we use window.scrollTo or element.scrollIntoView.
      // However, if we are in a specific container, we need to target that.
      
      // Let's stick to the container approach if we want the "toolbar fixed, report scrolls" behavior perfectly.
      const container = document.getElementById('market-content-container');
      if (container) {
          const elementPosition = element.offsetTop;
          container.scrollTo({
              top: elementPosition - 40,
              behavior: "smooth"
          });
      }
    }
  };

  return (
    <DashboardLayout>
      {/* 
        We want the Toolbar to be fixed at the top, and the content to scroll independently underneath.
        To achieve this inside DashboardLayout (which might have its own overflow), 
        we need to ensure this container takes full height and manages its own scrolling.
      */}
      <div className="flex flex-col h-[calc(100vh-4rem)] bg-[#0B0E14] text-foreground relative font-sans overflow-hidden">
        
        {/* Report Toolbar / Navigation - Fixed at top */}
        <div className="z-30 bg-[#0B0E14]/95 backdrop-blur border-b border-border/50 px-6 py-3 flex items-center justify-between shrink-0 shadow-md">
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 font-mono text-sm text-primary">
                <span className="font-bold hidden md:inline">STOCKLINK</span>
                <span className="text-muted-foreground hidden md:inline">/</span>
                <span>ANALYSIS_REPORT</span>
              </div>
              
              <div className="h-4 w-px bg-border/50 mx-2 hidden md:block" />

              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[180px] justify-between h-8 text-xs font-mono bg-secondary/20 border-border/40 hover:bg-secondary/40"
                  >
                    <CalendarDays className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                    {date
                      ? dateOptions.find((d) => d.value === date)?.label
                      : "Select date..."}
                    <ChevronsUpDown className="ml-2 h-3 w-3 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0 bg-[#0B0E14] border-border/40">
                  <Command className="bg-transparent">
                    <CommandInput placeholder="Search date..." className="h-8 text-xs" />
                    <CommandList>
                      <CommandEmpty>No date found.</CommandEmpty>
                      <CommandGroup>
                        {dateOptions.map((d) => (
                          <CommandItem
                            key={d.value}
                            value={d.value}
                            onSelect={(currentValue) => {
                              setDate(currentValue === date ? "" : currentValue);
                              setOpen(false);
                            }}
                            className="text-xs data-[selected=true]:bg-primary/20"
                          >
                            <Check
                              className={cn(
                                "mr-2 h-3 w-3",
                                date === d.value ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {d.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
           </div>
           
           <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar mr-4 hidden lg:flex">
                  {navLinks.map((link) => (
                    <Button 
                      key={link.id}
                      variant="ghost" 
                      size="sm" 
                      className="text-xs font-mono text-muted-foreground hover:text-primary hover:bg-primary/10 h-7 px-3"
                      onClick={() => scrollToSection(link.id)}
                    >
                      {link.label}
                    </Button>
                  ))}
              </div>
              
              <Button size="sm" className="h-8 gap-2 bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-bold">
                 <Download className="w-3.5 h-3.5" />
                 <span className="hidden sm:inline">Export PDF</span>
              </Button>
           </div>
        </div>

        {/* Main Document Area */}
        <div id="market-content-container" className="flex-1 overflow-y-auto bg-[#050505] p-8">
          <div className="max-w-5xl mx-auto bg-[#0B0E14] min-h-full border border-border/30 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <div className="p-12 md:p-16 space-y-16">
            
              <ReportHeader date={date} />
              <MarketSummaryReport date={date} />


              {/* 1. Fear & Greed Index */}
              <section id="fgi" className="scroll-mt-32">
                <SectionHeader number="01" title="공포 & 탐욕 지수 (Fear & Greed Index)" icon={Zap} />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1">
                    <DescriptionBlock 
                      content="공포 & 탐욕 지수는 모멘텀, 변동성, 옵션 거래량 등을 종합하여 시장 심리를 나타내는 지표입니다. 역발상 지표로 활용되며, 극도의 공포는 과매도 상태를, 극도의 탐욕은 잠재적인 조정 가능성을 시사합니다."
                    />
                    <AnalysisBlock 
                      analysis={`현재 지수는 65(탐욕)로, 지난달의 중립 구간에서 상승했습니다.
                      과거 데이터를 볼 때, '탐욕' 구간에서 주간 평균이 월간 평균을 상향 돌파하면 시장 랠리가 2-3주 더 지속되는 경향이 있습니다.
                      80(극도 탐욕)을 돌파할 경우 주의가 필요합니다.`}
                    />
                  </div>
                  <div className="lg:col-span-2">
                    <Card className="bg-transparent border border-border/30 shadow-none rounded-none">
                      <CardContent className="p-6">
                        <div className="h-[300px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={fgiHistoryData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={true} />
                              <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                              <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} domain={[0, 100]} />
                              <Tooltip content={<CustomTooltip />} />
                              <ReferenceLine y={80} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'EXTREME GREED', fill: '#ef4444', fontSize: 9, position: 'insideTopRight' }} />
                              <ReferenceLine y={20} stroke="#3b82f6" strokeDasharray="3 3" label={{ value: 'EXTREME FEAR', fill: '#3b82f6', fontSize: 9, position: 'insideBottomRight' }} />
                              <Line type="monotone" dataKey="weekly" name="Weekly FGI" stroke="#ef4444" strokeWidth={2} dot={false} />
                              <Line type="monotone" dataKey="monthly" name="Monthly FGI" stroke="#3b82f6" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                            </ComposedChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </section>

              {/* 2. Rising Stocks Count */}
              <section id="rising-stocks" className="scroll-mt-32">
                <SectionHeader number="02" title="시장 등락: 상승 종목 수 (Market Breadth)" icon={TrendingUp} />
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mb-8">
                   <DescriptionBlock 
                      content="시장 등락(Market Breadth)은 주가 상승이 얼마나 광범위하게 나타나는지를 측정합니다. 이동평균선 대비 상승 종목 수를 추적하여 지수 추세의 강도를 검증합니다. 소수의 대형주가 주도하는 랠리보다 다수의 종목이 상승하는 랠리가 더 지속 가능합니다."
                    />
                   <AnalysisBlock 
                      analysis={`코스피 상승 종목 수는 지난 5거래일 동안 20일 이동평균선을 지속적으로 상회하며, 폭넓은 상승장을 확인시켜주고 있습니다.
                      반면 코스닥은 지수는 상승하지만 상승 종목 수는 감소하는 '괴리(Divergence)' 현상을 보이고 있어, 랠리가 일부 대형주에 집중되고 있음을 시사합니다.`}
                    />
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="bg-transparent border border-border/30 shadow-none rounded-none">
                      <div className="p-3 border-b border-border/30 bg-secondary/10 text-xs font-bold text-center text-muted-foreground uppercase tracking-widest">KOSPI Breadth</div>
                      <CardContent className="p-6">
                          <div className="h-[250px] w-full">
                              <ResponsiveContainer width="100%" height="100%">
                                  <LineChart data={risingStocksKospi}>
                                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                                      <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                                      <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                      <Tooltip content={<CustomTooltip />} />
                                      <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '15px' }} iconType="rect" />
                                      <Line type="step" dataKey="daily" name="Daily Count" stroke="#ef4444" strokeWidth={2} dot={false} />
                                      <Line type="monotone" dataKey="ma5" name="5D MA" stroke="#f97316" strokeWidth={1} dot={false} strokeDasharray="3 3" />
                                      <Line type="monotone" dataKey="ma20" name="20D MA" stroke="#3b82f6" strokeWidth={1} dot={false} />
                                  </LineChart>
                              </ResponsiveContainer>
                          </div>
                      </CardContent>
                  </Card>
                  
                  <Card className="bg-transparent border border-border/30 shadow-none rounded-none">
                      <div className="p-3 border-b border-border/30 bg-secondary/10 text-xs font-bold text-center text-muted-foreground uppercase tracking-widest">KOSDAQ Breadth</div>
                      <CardContent className="p-6">
                          <div className="h-[250px] w-full">
                              <ResponsiveContainer width="100%" height="100%">
                                  <LineChart data={risingStocksKosdaq}>
                                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                                      <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                                      <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                      <Tooltip content={<CustomTooltip />} />
                                      <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '15px' }} iconType="rect" />
                                      <Line type="step" dataKey="daily" name="Daily Count" stroke="#ef4444" strokeWidth={2} dot={false} />
                                      <Line type="monotone" dataKey="ma5" name="5D MA" stroke="#f97316" strokeWidth={1} dot={false} strokeDasharray="3 3" />
                                      <Line type="monotone" dataKey="ma20" name="20D MA" stroke="#3b82f6" strokeWidth={1} dot={false} />
                                  </LineChart>
                              </ResponsiveContainer>
                          </div>
                      </CardContent>
                  </Card>
                </div>
              </section>

              {/* 3. Price Change Distribution */}
              <section id="price-dist" className="scroll-mt-32">
                <SectionHeader number="03" title="주가 등락률 분포 (Price Volatility Distribution)" icon={BarChart2} />
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1">
                    <DescriptionBlock 
                      content="이 히스토그램은 일일 주가 변동폭의 빈도 분포를 보여줍니다. 커널 밀도 추정(KDE) 선은 부드러운 확률 밀도를 나타냅니다. 오른쪽으로 치우친 분포는 긍정적인 모멘텀을, '두터운 꼬리(Fat tail)'는 급격한 변동 가능성이 높음을 의미합니다."
                    />
                    <AnalysisBlock 
                      analysis={`코스피 분포는 약간 오른쪽(+0.5%)으로 치우쳐 있어, 매도세보다 매수세가 강함을 나타냅니다.
                      양의 방향에 나타난 '두터운 꼬리'는 일부 종목이 강한 시세 분출을 하고 있음을 의미합니다.
                      코스닥은 0% 부근에서 좁은 피크를 형성하고 있어, 관망세와 횡보장이 지속되고 있음을 보여줍니다.`}
                    />
                  </div>
                  <div className="lg:col-span-2">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <Card className="bg-transparent border border-border/30 shadow-none rounded-none">
                         <div className="p-2 border-b border-border/30 bg-secondary/10 text-[10px] font-bold text-center text-muted-foreground uppercase">KOSPI Dist.</div>
                         <CardContent className="p-4">
                            <div className="h-[180px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <ComposedChart data={distKospi}>
                                        <XAxis dataKey="range" hide />
                                        <YAxis hide />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Bar dataKey="count" name="Freq" fill="#3b82f6" opacity={0.4} barSize={4} />
                                        <Line type="monotone" dataKey="kde" name="Density" stroke="#fff" strokeWidth={1.5} dot={false} />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div>
                         </CardContent>
                       </Card>
                       <Card className="bg-transparent border border-border/30 shadow-none rounded-none">
                         <div className="p-2 border-b border-border/30 bg-secondary/10 text-[10px] font-bold text-center text-muted-foreground uppercase">KOSDAQ Dist.</div>
                         <CardContent className="p-4">
                            <div className="h-[180px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <ComposedChart data={distKosdaq}>
                                        <XAxis dataKey="range" hide />
                                        <YAxis hide />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Bar dataKey="count" name="Freq" fill="#3b82f6" opacity={0.4} barSize={4} />
                                        <Line type="monotone" dataKey="kde" name="Density" stroke="#fff" strokeWidth={1.5} dot={false} />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div>
                         </CardContent>
                       </Card>
                     </div>
                  </div>
                </div>
              </section>

              {/* 4. Rising Ratio by Market Size */}
              <section id="market-size" className="scroll-mt-32">
                <SectionHeader number="04" title="섹터 로테이션: 시가총액별 (Market Cap Rotation)" icon={PieChartIcon} />
                <div className="mb-6">
                  <DescriptionBlock 
                    content="시가총액 규모(대형, 중형, 소형)별 누적 상승 비율 분석입니다. 이 시각화는 랠리가 블루칩(대형주)에 의해 주도되는지, 아니면 위험 선호 심리가 소형 성장주로 확산되고 있는지(낙수 효과)를 파악하는 데 도움을 줍니다."
                  />
                  <AnalysisBlock 
                    analysis={`지난 3일간 외국인 매수세에 힘입어 대형주(파란색 영역)가 코스피 랠리를 주도해왔습니다.
                    코스닥의 소형주들도 상승 탄력을 받기 시작했으며, 이는 '낙수 효과'가 곧 시작될 수 있음을 시사합니다.
                    향후 중형주가 이 격차를 메우며 상승할지 주목해야 합니다.`}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="bg-transparent border border-border/30 shadow-none rounded-none">
                        <div className="p-3 border-b border-border/30 bg-secondary/10 text-xs font-bold text-center text-muted-foreground uppercase tracking-widest">KOSPI Segments</div>
                        <CardContent className="p-6">
                            <div className="h-[250px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={risingRatioKospi}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                                        <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                                        <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} unit="%" />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '15px' }} iconType="rect" />
                                        <Area type="monotone" dataKey="small" name="Small Cap" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} />
                                        <Area type="monotone" dataKey="mid" name="Mid Cap" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                                        <Area type="monotone" dataKey="large" name="Large Cap" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-transparent border border-border/30 shadow-none rounded-none">
                        <div className="p-3 border-b border-border/30 bg-secondary/10 text-xs font-bold text-center text-muted-foreground uppercase tracking-widest">KOSDAQ Segments</div>
                        <CardContent className="p-6">
                            <div className="h-[250px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={risingRatioKosdaq}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                                        <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                                        <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} unit="%" />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '15px' }} iconType="rect" />
                                        <Area type="monotone" dataKey="small" name="Small Cap" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} />
                                        <Area type="monotone" dataKey="mid" name="Mid Cap" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                                        <Area type="monotone" dataKey="large" name="Large Cap" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>
              </section>

              {/* 5. PAM */}
              <section id="pam" className="scroll-mt-32 pb-12 border-b border-border/30">
                <SectionHeader number="05" title="기대 수익률 시뮬레이션 (Expected Returns)" icon={Activity} />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1">
                     <DescriptionBlock 
                       content="예측 자산 모델(PAM)을 사용하여 향후 5일, 10일, 20일 동안의 시장 기대 수익률을 시뮬레이션합니다. 과거 패턴과 현재 모멘텀을 기반으로 산출되며, 단기 트레이딩 전략 수립에 활용됩니다."
                     />
                     <AnalysisBlock 
                       analysis={`코스피의 단기(5일) 기대 수익률(적색 선)이 상승 추세를 보이며 장기 전망을 상회하고 있습니다. 이는 강력한 단기 모멘텀을 확인시켜 줍니다.
                       코스닥의 20일 전망은 평탄하여 아직 뚜렷한 장기 추세가 형성되지 않았음을 나타냅니다.
                       코스닥이 뚜렷한 방향성을 잡을 때까지는 코스피 단기 매매에 집중하는 것이 유리합니다.`}
                     />
                  </div>
                  <div className="lg:col-span-2">
                     <Card className="bg-transparent border border-border/30 shadow-none rounded-none">
                        <CardContent className="p-6">
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={pamKospi}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                                        <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                                        <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '15px' }} iconType="plainline" />
                                        <Line type="monotone" dataKey="day5" name="5 Day Projection" stroke="#ef4444" strokeWidth={2} dot={false} />
                                        <Line type="monotone" dataKey="day10" name="10 Day Projection" stroke="#22c55e" strokeWidth={2} dot={false} />
                                        <Line type="monotone" dataKey="day20" name="20 Day Projection" stroke="#3b82f6" strokeWidth={2} dot={false} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                     </Card>
                  </div>
                </div>
              </section>

              {/* Footer */}
              <div className="text-center text-xs font-mono text-muted-foreground pt-12">
                 <p className="mb-2">CONFIDENTIAL - INTERNAL USE ONLY (대외비)</p>
                 <p>본 리포트는 STOCKLINK AI 인텔리전스 엔진에 의해 생성되었습니다 • © 2025 StockLink Inc.</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}