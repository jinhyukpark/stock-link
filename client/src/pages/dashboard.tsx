import DashboardLayout from "@/components/layout/DashboardLayout";
import MarketTicker from "@/components/dashboard/MarketTicker";
import FearGreedIndex from "@/components/dashboard/FearGreedIndex";
import MarketDistribution from "@/components/dashboard/MarketDistribution";
import RealTimeStockList from "@/components/dashboard/RealTimeStockList";
import MarketHeatmap from "@/components/dashboard/MarketHeatmap";
import TrendAnalysisWidget from "@/components/dashboard/TrendAnalysisWidget";
import TrendingThemes from "@/components/dashboard/TrendingThemes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      <div className="flex flex-col h-[calc(100vh-4rem)] gap-4 p-4 overflow-hidden">
        {/* Top Header Section - Compact */}
        <div className="flex justify-between items-end shrink-0">
          <div>
            <h1 className="text-2xl font-display font-bold tracking-tight text-white mb-0.5">Market Dashboard</h1>
            <p className="text-sm text-muted-foreground">Real-time AI analysis of global markets.</p>
          </div>
          <div className="flex flex-col items-end gap-0.5">
             <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-xs text-green-500 font-medium">Market Open</span>
             </div>
             <span className="text-[10px] text-muted-foreground font-mono">Data as of: 2024-12-29 20:55 KST</span>
          </div>
        </div>

        {/* Ticker - Compact */}
        <div className="shrink-0">
          <MarketTicker />
        </div>

        {/* Main Content Grid - Fills remaining height */}
        <div className="grid grid-cols-12 gap-4 flex-1 min-h-0">
          
          {/* Left Column: Sentiment & Distribution (Stack) */}
          <div className="col-span-3 flex flex-col gap-4 h-full min-h-0">
            <div className="flex-1 min-h-0 overflow-hidden">
              <FearGreedIndex />
            </div>
            <div className="h-[280px] shrink-0">
              <MarketDistribution />
            </div>
          </div>

          {/* Middle Column: Stock List */}
          <div className="col-span-5 h-full min-h-0">
             <RealTimeStockList />
          </div>

          {/* Right Column: Heatmap & Trends (Stack) */}
          <div className="col-span-4 flex flex-col gap-4 h-full min-h-0">
             <div className="flex-1 min-h-0">
                <MarketHeatmap />
             </div>
             <div className="h-[320px] shrink-0">
                <TrendAnalysisWidget />
             </div>
          </div>
        </div>

        {/* Footer Themes - Fixed Height at bottom */}
        <div className="shrink-0">
           <TrendingThemes />
        </div>
      </div>
    </DashboardLayout>
  );
}