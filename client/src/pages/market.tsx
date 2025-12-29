import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, ComposedChart, Scatter } from "recharts";
import { TrendingUp, TrendingDown, Minus, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// 1. Fear & Greed Data (Last 6 Months)
const fearGreedHistory = [
  { date: "Jul", value: 25, status: "Fear" },
  { date: "Aug", value: 45, status: "Neutral" },
  { date: "Sep", value: 30, status: "Fear" },
  { date: "Oct", value: 65, status: "Greed" },
  { date: "Nov", value: 80, status: "Extreme Greed" },
  { date: "Dec", value: 75, status: "Greed" },
];

// 2. Theme Analysis Data
const themeData = [
  { name: "AI Semi", value: 85, fill: "#ef4444" },
  { name: "Batteries", value: 65, fill: "#f97316" },
  { name: "Bio", value: 45, fill: "#22c55e" },
  { name: "Auto", value: 30, fill: "#3b82f6" },
  { name: "Platform", value: 25, fill: "#a855f7" },
];

// 3. Daily Closing Price Changes Distribution (Histogram & KDE Mock)
const priceChangeDist = [
  { range: "-5%~", count: 120 },
  { range: "-3%~", count: 350 },
  { range: "-1%~", count: 890 },
  { range: "0%", count: 450 },
  { range: "~1%", count: 920 },
  { range: "~3%", count: 410 },
  { range: "~5%", count: 150 },
];

// 4. Cumulative Rising Ratio by Market/Size (Last 5 Days)
const marketSizeRisingRatio = [
  { day: "D-4", large: 12, mid: 8, small: 15 },
  { day: "D-3", large: 25, mid: 20, small: 18 },
  { day: "D-2", large: 18, mid: 25, small: 30 },
  { day: "D-1", large: 35, mid: 32, small: 45 },
  { day: "Today", large: 42, mid: 38, small: 52 },
];

// 5. Market Expected Return (PAM)
const pamData = [
  { name: "KOSPI", return: 8.5, risk: 12 },
  { name: "KOSDAQ", return: 12.2, risk: 18 },
  { name: "S&P500", return: 10.5, risk: 14 },
  { name: "NASDAQ", return: 15.8, risk: 22 },
];

export default function MarketAnalysis() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6 h-full overflow-y-auto">
        <div className="flex flex-col gap-1">
           <h1 className="text-2xl font-display font-bold text-white">Market Analysis</h1>
           <p className="text-sm text-muted-foreground">Comprehensive market overview and quantitative metrics.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* 1. Fear & Greed Index History */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />
                Fear & Greed History (6M)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={fearGreedHistory}>
                    <defs>
                      <linearGradient id="colorFear" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorFear)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* 2. Theme Analysis */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
               <CardTitle className="text-base font-semibold flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-red-500" />
                Theme Strength Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
               <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={themeData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={true} vertical={false} />
                    <XAxis type="number" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} hide />
                    <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} width={80} />
                    <Tooltip 
                        cursor={{fill: 'rgba(255,255,255,0.05)'}}
                        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {themeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

           {/* 3. Rising Stocks Count */}
           <Card className="bg-card/50 backdrop-blur-sm border-border/50 flex flex-col justify-between">
            <CardHeader>
               <CardTitle className="text-base font-semibold flex items-center gap-2">
                <ArrowUpRight className="w-4 h-4 text-green-500" />
                Rising Stocks Count
              </CardTitle>
               <p className="text-[10px] text-muted-foreground">Updated: 2025-12-29 21:51:36</p>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col items-center justify-center pb-8">
               <div className="text-5xl font-bold font-mono text-green-500 drop-shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                  1,248
               </div>
               <div className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
                  <span>vs Prev Day</span>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 gap-1">
                     <TrendingUp className="w-3 h-3" /> +152
                  </Badge>
               </div>
            </CardContent>
          </Card>

          {/* 4. Price Change Distribution */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 lg:col-span-2">
            <CardHeader>
               <CardTitle className="text-base font-semibold">Price Change Distribution (Histogram)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={priceChangeDist}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="range" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="count" fill="#3b82f6" barSize={40} radius={[4, 4, 0, 0]} />
                    <Line type="monotone" dataKey="count" stroke="#f97316" strokeWidth={2} dot={{r: 4, fill: "#f97316"}} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* 5. Market Size Rising Ratio */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
               <CardTitle className="text-base font-semibold">Rising Ratio by Size (5D)</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={marketSizeRisingRatio}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} unit="%" />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="large" name="Large Cap" stroke="#3b82f6" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="mid" name="Mid Cap" stroke="#f97316" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="small" name="Small Cap" stroke="#22c55e" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

           {/* 6. Market Expected Return (PAM) */}
           <Card className="bg-card/50 backdrop-blur-sm border-border/50 lg:col-span-3">
            <CardHeader>
               <CardTitle className="text-base font-semibold">Market Expected Return (PAM) - 2025-12-29</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis type="number" dataKey="risk" name="Risk (Std Dev)" unit="%" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false}>
                       <Label value="Risk (Standard Deviation)" offset={0} position="insideBottom" fill="#94a3b8" style={{fontSize: '12px'}} />
                    </XAxis>
                    <YAxis type="number" dataKey="return" name="Expected Return" unit="%" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false}>
                       <Label value="Expected Return" angle={-90} position="insideLeft" fill="#94a3b8" style={{fontSize: '12px'}} />
                    </YAxis>
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} 
                        content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-slate-800 border border-slate-700 p-2 rounded shadow-lg text-xs">
                                  <p className="font-bold text-white mb-1">{data.name}</p>
                                  <p className="text-blue-300">Return: {data.return}%</p>
                                  <p className="text-red-300">Risk: {data.risk}%</p>
                                </div>
                              );
                            }
                            return null;
                        }}
                    />
                    <Scatter name="Markets" data={pamData} fill="#8884d8">
                      {pamData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#3b82f6" : "#f97316"} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

// Importing ScatterChart specifically since it wasn't in the initial import list
import { ScatterChart, Label } from "recharts";