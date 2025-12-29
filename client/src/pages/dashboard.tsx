import DashboardLayout from "@/components/layout/DashboardLayout";
import MarketTicker from "@/components/dashboard/MarketTicker";
import FearGreedIndex from "@/components/dashboard/FearGreedIndex";
import MarketDistribution from "@/components/dashboard/MarketDistribution";
import RealTimeStockList from "@/components/dashboard/RealTimeStockList";
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
          <div className="flex flex-col items-end gap-1">
             <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-xs text-green-500 font-medium">Market Open</span>
             </div>
             <span className="text-[10px] text-muted-foreground font-mono">Data as of: 2024-12-29 20:55 KST</span>
          </div>
        </div>

        <MarketTicker />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto">
          {/* Left Column: Fear & Greed + Chart */}
          <div className="md:col-span-3 flex flex-col gap-6">
            <div className="h-auto">
              <FearGreedIndex />
            </div>
            
            <MarketDistribution />
          </div>

          {/* Middle Column: Real-time List */}
          <div className="md:col-span-5 flex flex-col gap-6">
             <div className="h-full min-h-[500px]">
               <RealTimeStockList />
             </div>
          </div>

          {/* Right Column: Market Heatmap (Matrix) */}
          <div className="md:col-span-4 flex flex-col gap-6">
             <div className="h-full min-h-[500px]">
                <MarketHeatmap />
             </div>
          </div>
        </div>

        {/* Trend Analysis Section */}
        <div className="h-[350px]">
           <TrendAnalysisWidget />
        </div>

        {/* Footer Area with Category Cards */}
        <TrendingThemes />
      </div>
    </DashboardLayout>
  );
}