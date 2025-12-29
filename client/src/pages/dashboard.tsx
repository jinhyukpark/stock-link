import DashboardLayout from "@/components/layout/DashboardLayout";
import MarketTicker from "@/components/dashboard/MarketTicker";
import FearGreedIndex from "@/components/dashboard/FearGreedIndex";
import MarketHeatmap from "@/components/dashboard/MarketHeatmap";
import TrendAnalysisWidget from "@/components/dashboard/TrendAnalysisWidget";
import TrendingThemes from "@/components/dashboard/TrendingThemes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const chartData = [
  { time: "09:00", value: 2640 },
  { time: "10:00", value: 2645 },
  { time: "11:00", value: 2655 },
  { time: "12:00", value: 2650 },
  { time: "13:00", value: 2652 },
  { time: "14:00", value: 2658 },
  { time: "15:00", value: 2662 },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold tracking-tight text-white mb-1">Market Dashboard</h1>
            <p className="text-muted-foreground">Real-time AI analysis of global markets.</p>
          </div>
          <div className="flex items-center gap-2">
             <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
             <span className="text-xs text-green-500 font-medium">Market Open</span>
          </div>
        </div>

        <MarketTicker />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto">
          {/* Left Column: Fear & Greed + Chart */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="h-auto">
              <FearGreedIndex />
            </div>
            
            <Card className="h-[300px] bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-base">KOSPI Intraday</CardTitle>
              </CardHeader>
              <CardContent className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" hide />
                    <YAxis domain={['auto', 'auto']} hide />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Middle/Right Column: Heatmap + Trends */}
          <div className="md:col-span-8 flex flex-col gap-6">
             <div className="h-[350px]">
               <MarketHeatmap />
             </div>

             <div className="h-[350px]">
                <TrendAnalysisWidget />
             </div>
          </div>
        </div>

        {/* Footer Area with Category Cards */}
        <TrendingThemes />
      </div>
    </DashboardLayout>
  );
}