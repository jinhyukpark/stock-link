import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, ComposedChart, ReferenceLine } from "recharts";
import { Activity, TrendingUp, BarChart2, PieChart as PieChartIcon, Zap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

export default function MarketAnalysis() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 p-6 min-h-full bg-[#0B0E14] text-foreground">
        
        {/* Header */}
        <div className="flex flex-col gap-1 border-b border-border/50 pb-4">
           <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2">
             <Activity className="w-6 h-6 text-primary" />
             Market Statistical Analysis
           </h1>
           <p className="text-sm text-muted-foreground">Detailed statistical analysis and quantitative metrics for the entire market.</p>
        </div>

        {/* 1. Fear & Greed Index Chart */}
        <Card className="bg-card/30 backdrop-blur-sm border-border/50">
            <CardHeader className="py-3 border-b border-border/50">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                Fear & Greed Index History (6 Months)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-[250px] w-full">
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

        {/* 2. Rising Stocks Count */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card/30 backdrop-blur-sm border-border/50 col-span-1 lg:col-span-2">
                <CardHeader className="py-3 border-b border-border/50">
                    <CardTitle className="text-sm font-semibold flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-red-500" />
                        Rising Stocks Count (Daily)
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="h-[200px] w-full">
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
                    <div className="h-[200px] w-full">
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

        {/* 3. Price Change Distribution */}
        <Card className="bg-card/30 backdrop-blur-sm border-border/50">
            <CardHeader className="py-3 border-b border-border/50">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <BarChart2 className="w-4 h-4 text-blue-500" />
                    Price Change Distribution (Histogram & KDE)
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="h-[200px] w-full">
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
                <div className="h-[200px] w-full">
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

        {/* 4. Rising Ratio by Market Size */}
        <Card className="bg-card/30 backdrop-blur-sm border-border/50">
            <CardHeader className="py-3 border-b border-border/50">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <PieChartIcon className="w-4 h-4 text-green-500" />
                    Rising Ratio by Market Size (Cumulative)
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="h-[200px] w-full">
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
                <div className="h-[200px] w-full">
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

        {/* 5. Market Expected Return (PAM) */}
        <Card className="bg-card/30 backdrop-blur-sm border-border/50">
            <CardHeader className="py-3 border-b border-border/50">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <Activity className="w-4 h-4 text-purple-500" />
                    Market Expected Return (PAM)
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="h-[200px] w-full">
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
                <div className="h-[200px] w-full">
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

      </div>
    </DashboardLayout>
  );
}