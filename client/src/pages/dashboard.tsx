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
      <div className="flex flex-col h-auto xl:h-[calc(100vh-4rem)] gap-4 p-4 overflow-y-auto xl:overflow-hidden bg-[#0B0E14]">
        {/* Ticker - Compact */}
        <div className="shrink-0">
          <MarketTicker />
        </div>

        {/* Main Content Grid - Responsive: Stack on mobile/tablet, Grid on XL+ */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 flex-1 xl:min-h-0">
          
          {/* Left Column: Sentiment & Distribution (Stack) */}
          <div className="xl:col-span-3 flex flex-col gap-4 xl:h-full min-h-0">
            <div className="xl:flex-1 h-[300px] xl:h-auto overflow-hidden">
              <FearGreedIndex />
            </div>
            <div className="h-[250px] shrink-0">
              <MarketDistribution />
            </div>
          </div>

          {/* Middle Column: Stock List */}
          <div className="xl:col-span-5 xl:h-full h-[600px] min-h-0">
             <RealTimeStockList />
          </div>

          {/* Right Column: Heatmap & Trends (Stack) */}
          <div className="xl:col-span-4 flex flex-col gap-4 xl:h-full min-h-0">
             <div className="xl:flex-1 h-[400px] xl:h-auto min-h-0">
                <MarketHeatmap />
             </div>
             <div className="h-[250px] shrink-0">
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