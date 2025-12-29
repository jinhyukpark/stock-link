import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Sparkline = ({ data, color, isUp }: { data: number[], color: string, isUp: boolean }) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const height = 24;
  const width = 60;
  
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    // For up trend (green), we want positive visual reinforcement, but charts y-axis is inverted in SVG (0 is top)
    // So higher value = smaller y
    const y = height - ((d - min) / range) * height; 
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg width={width} height={height} className="overflow-visible ml-2">
      <defs>
         <linearGradient id={`gradient-${color.replace('#','')}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={isUp ? "#22c55e" : "#ef4444"} stopOpacity="0.5"/>
            <stop offset="100%" stopColor={isUp ? "#22c55e" : "#ef4444"} stopOpacity="0"/>
         </linearGradient>
      </defs>
      <path
        d={`M 0 ${height} L ${points} L ${width} ${height} Z`}
        fill="transparent" 
        stroke="none"
      />
      <polyline
        points={points}
        fill="none"
        stroke={isUp ? "#22c55e" : "#ef4444"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default function MarketTicker() {
  const indices = [
    { name: "KOSPI", value: "2,654.32", change: "+1.2%", isUp: true, data: [2620, 2635, 2630, 2642, 2648, 2650, 2654] },
    { name: "KOSDAQ", value: "894.12", change: "-0.5%", isUp: false, data: [900, 898, 895, 896, 892, 890, 894] },
    { name: "NASDAQ", value: "16,245.8", change: "+0.8%", isUp: true, data: [16100, 16150, 16120, 16180, 16200, 16220, 16245] },
    { name: "S&P 500", value: "5,123.4", change: "+0.3%", isUp: true, data: [5100, 5110, 5105, 5115, 5120, 5118, 5123] },
    { name: "DOW", value: "39,120.5", change: "-0.1%", isUp: false, data: [39200, 39180, 39190, 39150, 39140, 39130, 39120] },
    { name: "USD/KRW", value: "1,342.5", change: "+2.5", isUp: true, data: [1335, 1338, 1336, 1340, 1341, 1343, 1342] },
  ];

  return (
    <div className="w-full overflow-hidden bg-secondary/30 border-y border-border backdrop-blur-sm h-12 flex items-center">
      <div className="flex animate-scroll whitespace-nowrap items-center">
        {/* Duplicate list for seamless loop */}
        {[...indices, ...indices, ...indices].map((item, i) => (
          <div key={i} className="flex items-center gap-3 px-6 border-r border-border/50 last:border-0 h-full">
            <div className="flex flex-col justify-center">
               <div className="flex items-baseline gap-2">
                 <span className="text-sm font-semibold text-muted-foreground font-display">{item.name}</span>
                 <span className="text-sm font-bold tabular-nums text-foreground">{item.value}</span>
               </div>
               <span className={cn(
                  "text-[10px] flex items-center font-medium -mt-1",
                  item.isUp ? "text-green-500" : "text-red-500"
                )}>
                  {item.isUp ? <ArrowUp className="w-2.5 h-2.5 mr-0.5" /> : <ArrowDown className="w-2.5 h-2.5 mr-0.5" />}
                  {item.change}
                </span>
            </div>
            <Sparkline data={item.data} color={item.isUp ? "#22c55e" : "#ef4444"} isUp={item.isUp} />
          </div>
        ))}
      </div>
    </div>
  );
}