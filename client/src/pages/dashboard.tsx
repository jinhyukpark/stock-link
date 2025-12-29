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
        {/* Top Header Section - Ultra Compact */}
        <div className="flex justify-between items-center shrink-0 h-10 border-b border-border/40 bg-card/20 backdrop-blur-sm px-1 rounded-t-lg">
          <div className="flex items-center gap-3">
             <span className="text-sm font-display font-bold text-white tracking-wider">StockLink</span>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-500/10 rounded-full border border-green-500/20">
                <span className="flex h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-[10px] text-green-500 font-bold uppercase">Open</span>
             </div>
             <span className="text-[10px] font-mono text-muted-foreground/80">2024-12-29 20:55 KST</span>
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