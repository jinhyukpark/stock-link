import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, ComposedChart, ReferenceLine } from "recharts";
import { Activity, TrendingUp, BarChart2, PieChart as PieChartIcon, Zap, Sparkles, FileText, Calendar, User, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// --- Mock Data ---

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

const ReportHeader = () => (
  <div className="border-b-2 border-primary/50 pb-6 mb-12">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h1 className="text-4xl font-display font-bold text-white tracking-tight mb-2">MARKET INTELLIGENCE</h1>
        <p className="text-muted-foreground font-mono text-sm tracking-widest uppercase">Quantitative Strategy Division</p>
      </div>
      <div className="text-right">
        <div className="bg-primary/10 text-primary px-3 py-1 text-xs font-bold uppercase tracking-wider inline-block mb-2">
          Daily Briefing
        </div>
        <div className="text-xs text-muted-foreground font-mono">
          Ref: MK-2025-12-29-A
        </div>
      </div>
    </div>
    
    <div className="grid grid-cols-3 gap-4 text-sm border-t border-border/30 pt-4 font-mono text-muted-foreground">
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4" />
        <span>DEC 29, 2025</span>
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
  <div className="bg-gradient-to-r from-blue-500/5 to-transparent border-l-2 border-blue-500 pl-4 py-2 mb-6">
    <h4 className="text-xs font-bold text-blue-400 mb-2 flex items-center gap-2 uppercase tracking-wider font-mono">
      <Sparkles className="w-3 h-3" />
      AI Insight
    </h4>
    <p className="text-sm text-gray-300 leading-relaxed font-sans whitespace-pre-line">
      {content}
    </p>
  </div>
);

const DescriptionBlock = ({ content }: { content: string }) => (
  <p className="text-sm text-muted-foreground mb-6 leading-relaxed border-l-2 border-border/30 pl-4">
    {content}
  </p>
);

const MarketSummaryReport = () => (
  <div className="bg-card border border-border/40 p-0 mb-12 shadow-2xl overflow-hidden">
    <div className="bg-secondary/30 px-6 py-3 border-b border-border/40 flex justify-between items-center">
      <h3 className="font-bold text-white uppercase tracking-wider text-sm flex items-center gap-2">
        <FileText className="w-4 h-4 text-primary" />
        Executive Summary
      </h3>
      <span className="text-xs font-mono text-primary animate-pulse">LIVE ANALYSIS</span>
    </div>
    
    <div className="p-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
           <h4 className="text-2xl font-bold text-white mb-4 leading-tight">
             Market signals <span className="text-green-400">bullish continuation</span> driven by large-cap momentum.
           </h4>
           <p className="text-muted-foreground leading-relaxed mb-6">
             The aggregated market data indicates a robust recovery phase. The Fear & Greed Index has shifted into "Greed" territory (65), supported by strong foreign inflows into semiconductor heavyweights. While KOSDAQ small-caps lag slightly, the overall breadth is expanding.
           </p>
           
           <div className="grid grid-cols-3 gap-4 border-t border-border/30 pt-6">
             <div>
               <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Sentiment</div>
               <div className="text-lg font-bold text-green-400">Bullish</div>
             </div>
             <div>
               <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Volatility</div>
               <div className="text-lg font-bold text-yellow-500">Moderate</div>
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
  { id: "fgi", label: "01. Fear & Greed", icon: Zap },
  { id: "rising-stocks", label: "02. Rising Stocks", icon: TrendingUp },
  { id: "price-dist", label: "03. Price Dist.", icon: BarChart2 },
  { id: "market-size", label: "04. Market Size", icon: PieChartIcon },
  { id: "pam", label: "05. Expected Return", icon: Activity },
];

export default function MarketAnalysis() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Height of sticky header + padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      const container = document.getElementById('market-content-container');
      if (container) {
          container.scrollTo({
              top: element.offsetTop - 40,
              behavior: "smooth"
          });
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full bg-[#0B0E14] text-foreground relative font-sans">
        
        {/* Report Toolbar / Navigation */}
        <div className="sticky top-0 z-30 bg-[#0B0E14]/95 backdrop-blur border-b border-border/50 px-6 py-3 flex items-center justify-between shrink-0 shadow-md">
           <div className="flex items-center gap-2 font-mono text-sm text-primary">
              <span className="font-bold">STOCKLINK</span>
              <span className="text-muted-foreground">/</span>
              <span>ANALYSIS_REPORT_V1.0</span>
           </div>
           
           <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
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
        </div>

        {/* Main Document Area */}
        <div id="market-content-container" className="flex-1 overflow-y-auto bg-[#050505] p-8">
          <div className="max-w-5xl mx-auto bg-[#0B0E14] min-h-full border border-border/30 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <div className="p-12 md:p-16 space-y-16">
            
              <ReportHeader />
              <MarketSummaryReport />

              {/* 1. Fear & Greed Index */}
              <section id="fgi" className="scroll-mt-32">
                <SectionHeader number="01" title="Fear & Greed Index" icon={Zap} />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1">
                    <DescriptionBlock 
                      content="The Fear & Greed Index is a composite score of market sentiment derived from momentum, volatility, and options volume. It serves as a contrarian indicator: extreme fear suggests oversold conditions, while extreme greed warns of a potential correction."
                    />
                    <AnalysisBlock 
                      analysis={`Current Index is at 65 (Greed), increasing from last month's neutral zone.
                      Historical data shows that when the weekly average crosses above the monthly average in the 'Greed' zone, the market tends to extend its rally for another 2-3 weeks.
                      Caution is advised if it breaches 80 (Extreme Greed).`}
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
                <SectionHeader number="02" title="Market Breadth: Rising Stocks" icon={TrendingUp} />
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mb-8">
                   <DescriptionBlock 
                      content="Market breadth measures the degree to which price participation is widespread. Tracking the number of rising stocks against their moving averages helps validate the strength of an index trend. A rally supported by broad participation is more sustainable than one driven by a few large caps."
                    />
                   <AnalysisBlock 
                      analysis={`KOSPI rising stocks count has consistently stayed above the 20-day Moving Average for the past 5 sessions, confirming a broad-based rally.
                      KOSDAQ, however, shows a 'divergence' where the index is rising but the number of rising stocks is decreasing, suggesting the rally is concentrated in a few large-cap stocks.`}
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
                <SectionHeader number="03" title="Price Volatility Distribution" icon={BarChart2} />
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1">
                    <DescriptionBlock 
                      content="This histogram displays the frequency distribution of daily price changes. The Kernel Density Estimation (KDE) line provides a smoothed probability density. A skew to the right indicates positive momentum, while 'fat tails' suggest higher probability of extreme moves."
                    />
                    <AnalysisBlock 
                      analysis={`KOSPI distribution is slightly skewed to the right (+0.5%), indicating buying pressure is stronger than selling.
                      The 'fat tail' on the positive side suggests some stocks are experiencing significant breakouts.
                      KOSDAQ shows a narrower peak around 0%, indicating indecision and consolidation.`}
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
                <SectionHeader number="04" title="Sector Rotation: Market Cap" icon={PieChartIcon} />
                <div className="mb-6">
                  <DescriptionBlock 
                    content="Cumulative rising ratio analysis by market capitalization segment (Large, Mid, Small Cap). This visualization helps identify whether a rally is being led by blue chips (Large Cap) or if risk appetite is spreading to smaller growth stocks (Small Cap)."
                  />
                  <AnalysisBlock 
                    analysis={`Large-cap stocks (Blue Area) have been leading the KOSPI rally for the last 3 days, driven by foreign inflows.
                    Small-cap stocks in KOSDAQ are starting to pick up momentum, suggesting a 'trickle-down' effect may begin soon.
                    Watch for Mid-cap stocks to bridge the gap in the coming sessions.`}
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
                <SectionHeader number="05" title="Expected Returns (PAM Model)" icon={Activity} />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1">
                     <DescriptionBlock 
                       content="The Projected Annualized Market (PAM) model forecasts future market returns based on multi-timeframe momentum analysis. It helps visualize the 'slope' of the current trend across 5, 10, and 20-day horizons."
                     />
                     <AnalysisBlock 
                       analysis={`The 5-day expected return (Red Line) for KOSPI is trending upwards, outperforming the longer-term projections. This confirms strong short-term momentum.
                       KOSDAQ's 20-day projection remains flat, indicating no clear long-term trend yet.
                       Traders should focus on KOSPI short-term plays while waiting for KOSDAQ to establish a clearer direction.`}
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
                 <p className="mb-2">CONFIDENTIAL - INTERNAL USE ONLY</p>
                 <p>Generated by StockLink AI Intelligence Engine • © 2025 StockLink Inc.</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}