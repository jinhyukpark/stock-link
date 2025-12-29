import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, ComposedChart, ReferenceLine } from "recharts";
import { Activity, TrendingUp, BarChart2, PieChart as PieChartIcon, Zap, Info } from "lucide-react";
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
  day20: Math.cos(i / 6) * 0.4 + 0.05 + Math.random() * 0.1,
}));

// --- Components ---

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1e293b] border border-border/50 p-2 rounded shadow-xl text-xs">
        <p className="font-bold text-white mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.stroke || entry.fill }} />
            <span className="text-gray-300">{entry.name}:</span>
            <span className="font-mono font-medium text-white">
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

// --- Analysis Description Components ---

const AnalysisDescription = ({ title, description }: { title: string, description: string }) => (
  <div className="bg-secondary/10 p-4 rounded-lg border border-border/50 mb-4">
    <div className="flex items-start gap-3">
      <Info className="w-5 h-5 text-primary mt-0.5 shrink-0" />
      <div>
        <h4 className="text-sm font-bold text-foreground mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
);

// --- Navigation Links ---
const navLinks = [
  { id: "fgi", label: "Fear & Greed", icon: Zap },
  { id: "rising-stocks", label: "Rising Stocks", icon: TrendingUp },
  { id: "price-dist", label: "Price Dist.", icon: BarChart2 },
  { id: "market-size", label: "Market Size", icon: PieChartIcon },
  { id: "pam", label: "Expected Return", icon: Activity },
];

export default function MarketAnalysis() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Height of sticky header + padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      const container = document.getElementById('market-content-container');
      if (container) {
          container.scrollTo({
              top: element.offsetTop - 20,
              behavior: "smooth"
          });
      } else {
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full bg-[#0B0E14] text-foreground relative">
        
        {/* Sticky Sub-navigation Header */}
        <div className="sticky top-0 z-20 bg-[#0B0E14]/95 backdrop-blur border-b border-border/50 px-6 py-3 flex items-center justify-between shrink-0">
          <h1 className="text-lg font-display font-bold text-white flex items-center gap-2">
             <Activity className="w-5 h-5 text-primary" />
             Market Statistical Analysis
           </h1>
           <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {navLinks.map((link) => (
                <Button 
                  key={link.id}
                  variant="ghost" 
                  size="sm" 
                  className="text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 gap-1.5 h-8"
                  onClick={() => scrollToSection(link.id)}
                >
                  <link.icon className="w-3.5 h-3.5" />
                  {link.label}
                </Button>
              ))}
           </div>
        </div>

        <div id="market-content-container" className="flex-1 overflow-y-auto p-6 space-y-12 scroll-mt-16">
          
          {/* 1. Fear & Greed Index Chart */}
          <section id="fgi" className="scroll-mt-20">
            <AnalysisDescription 
              title="Market Sentiment Analysis" 
              description="The Fear & Greed Index is a key indicator of market sentiment. Extreme fear can be a buying opportunity, while extreme greed may signal a correction. This chart tracks the weekly and monthly trends to identify potential market turning points."
            />
            <Card className="bg-card/30 backdrop-blur-sm border-border/50">
                <CardHeader className="py-3 border-b border-border/50">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    Fear & Greed Index History (6 Months)
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={fgiHistoryData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={true} />
                        <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                        <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} domain={[0, 100]} />
                        <Tooltip content={<CustomTooltip />} />
                        <ReferenceLine y={80} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Extreme Greed', fill: '#ef4444', fontSize: 10, position: 'insideTopRight' }} />
                        <ReferenceLine y={20} stroke="#3b82f6" strokeDasharray="3 3" label={{ value: 'Extreme Fear', fill: '#3b82f6', fontSize: 10, position: 'insideBottomRight' }} />
                        <Line type="monotone" dataKey="weekly" name="Weekly FGI" stroke="#ef4444" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="monthly" name="Monthly FGI" stroke="#3b82f6" strokeWidth={2} dot={false} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
            </Card>
          </section>

          {/* 2. Rising Stocks Count */}
          <section id="rising-stocks" className="scroll-mt-20">
            <AnalysisDescription 
              title="Market Breadth: Rising Stocks" 
              description="Tracking the number of rising stocks against moving averages helps gauge the underlying strength of a market rally. A healthy market rally is typically supported by an increasing number of rising stocks across the board."
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-card/30 backdrop-blur-sm border-border/50 col-span-1 lg:col-span-2">
                    <CardHeader className="py-3 border-b border-border/50">
                        <CardTitle className="text-sm font-semibold flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-red-500" />
                            Rising Stocks Count (Daily vs MA)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="h-[250px] w-full">
                            <h4 className="text-xs font-bold text-center mb-2 text-muted-foreground">KOSPI</h4>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={risingStocksKospi}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                    <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                                    <Line type="monotone" dataKey="daily" name="Daily" stroke="#ef4444" strokeWidth={1} dot={false} />
                                    <Line type="monotone" dataKey="ma5" name="5D MA" stroke="#f97316" strokeWidth={1.5} dot={false} />
                                    <Line type="monotone" dataKey="ma10" name="10D MA" stroke="#22c55e" strokeWidth={1.5} dot={false} />
                                    <Line type="monotone" dataKey="ma20" name="20D MA" stroke="#3b82f6" strokeWidth={1.5} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="h-[250px] w-full">
                            <h4 className="text-xs font-bold text-center mb-2 text-muted-foreground">KOSDAQ</h4>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={risingStocksKosdaq}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                    <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                                    <Line type="monotone" dataKey="daily" name="Daily" stroke="#ef4444" strokeWidth={1} dot={false} />
                                    <Line type="monotone" dataKey="ma5" name="5D MA" stroke="#f97316" strokeWidth={1.5} dot={false} />
                                    <Line type="monotone" dataKey="ma10" name="10D MA" stroke="#22c55e" strokeWidth={1.5} dot={false} />
                                    <Line type="monotone" dataKey="ma20" name="20D MA" stroke="#3b82f6" strokeWidth={1.5} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
          </section>

          {/* 3. Price Change Distribution */}
          <section id="price-dist" className="scroll-mt-20">
            <AnalysisDescription 
              title="Daily Volatility Distribution" 
              description="This histogram and Kernel Density Estimation (KDE) plot show the distribution of daily price changes. A wider spread indicates higher market volatility, while a skew to the right suggests overall positive market momentum."
            />
            <Card className="bg-card/30 backdrop-blur-sm border-border/50">
                <CardHeader className="py-3 border-b border-border/50">
                    <CardTitle className="text-sm font-semibold flex items-center gap-2">
                        <BarChart2 className="w-4 h-4 text-blue-500" />
                        Price Change Distribution (Histogram & KDE)
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="h-[250px] w-full">
                        <h4 className="text-xs font-bold text-center mb-2 text-muted-foreground">KOSPI</h4>
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={distKospi}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="range" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                <YAxis yAxisId="left" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} hide />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar yAxisId="left" dataKey="count" name="Count" fill="#3b82f6" opacity={0.6} barSize={10} />
                                <Line yAxisId="right" type="monotone" dataKey="kde" name="KDE" stroke="#ef4444" strokeWidth={2} dot={false} />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="h-[250px] w-full">
                        <h4 className="text-xs font-bold text-center mb-2 text-muted-foreground">KOSDAQ</h4>
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={distKosdaq}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="range" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                <YAxis yAxisId="left" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} hide />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar yAxisId="left" dataKey="count" name="Count" fill="#3b82f6" opacity={0.6} barSize={10} />
                                <Line yAxisId="right" type="monotone" dataKey="kde" name="KDE" stroke="#ef4444" strokeWidth={2} dot={false} />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
          </section>

          {/* 4. Rising Ratio by Market Size */}
          <section id="market-size" className="scroll-mt-20">
            <AnalysisDescription 
              title="Sector Rotation by Market Cap" 
              description="Analyzing the rising ratio by market capitalization (Large, Mid, Small Cap) reveals which segment is leading the market. Divergence between large and small caps can indicate shifts in risk appetite."
            />
            <Card className="bg-card/30 backdrop-blur-sm border-border/50">
                <CardHeader className="py-3 border-b border-border/50">
                    <CardTitle className="text-sm font-semibold flex items-center gap-2">
                        <PieChartIcon className="w-4 h-4 text-green-500" />
                        Rising Ratio by Market Size (Cumulative)
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="h-[250px] w-full">
                        <h4 className="text-xs font-bold text-center mb-2 text-muted-foreground">KOSPI</h4>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={risingRatioKospi}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} unit="%" />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                                <Area type="monotone" dataKey="small" name="Small Cap" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} />
                                <Area type="monotone" dataKey="mid" name="Mid Cap" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                                <Area type="monotone" dataKey="large" name="Large Cap" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="h-[250px] w-full">
                        <h4 className="text-xs font-bold text-center mb-2 text-muted-foreground">KOSDAQ</h4>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={risingRatioKosdaq}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} unit="%" />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                                <Area type="monotone" dataKey="small" name="Small Cap" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} />
                                <Area type="monotone" dataKey="mid" name="Mid Cap" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                                <Area type="monotone" dataKey="large" name="Large Cap" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
          </section>

          {/* 5. Market Expected Return (PAM) */}
          <section id="pam" className="scroll-mt-20 pb-10">
            <AnalysisDescription 
              title="Projected Market Returns" 
              description="The Projected Annualized Market (PAM) return model estimates potential future returns based on current volatility and trend strength. Higher peaks suggest stronger momentum, while divergence between 5D, 10D, and 20D projections can signal trend reversals."
            />
            <Card className="bg-card/30 backdrop-blur-sm border-border/50">
                <CardHeader className="py-3 border-b border-border/50">
                    <CardTitle className="text-sm font-semibold flex items-center gap-2">
                        <Activity className="w-4 h-4 text-purple-500" />
                        Market Expected Return (PAM)
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="h-[250px] w-full">
                        <h4 className="text-xs font-bold text-center mb-2 text-muted-foreground">KOSPI</h4>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={pamKospi}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                                <Line type="monotone" dataKey="day5" name="5 Day PAM" stroke="#ef4444" strokeWidth={2} dot={false} />
                                <Line type="monotone" dataKey="day10" name="10 Day PAM" stroke="#22c55e" strokeWidth={2} dot={false} />
                                <Line type="monotone" dataKey="day20" name="20 Day PAM" stroke="#3b82f6" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="h-[250px] w-full">
                        <h4 className="text-xs font-bold text-center mb-2 text-muted-foreground">KOSDAQ</h4>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={pamKosdaq}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                                <Line type="monotone" dataKey="day5" name="5 Day PAM" stroke="#ef4444" strokeWidth={2} dot={false} />
                                <Line type="monotone" dataKey="day10" name="10 Day PAM" stroke="#22c55e" strokeWidth={2} dot={false} />
                                <Line type="monotone" dataKey="day20" name="20 Day PAM" stroke="#3b82f6" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
          </section>

        </div>
      </div>
    </DashboardLayout>
  );
}