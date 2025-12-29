import { PieChart, Pie, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Check } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export default function FearGreedIndex() {
  const data = [
    { name: "Value", value: 75 },
    { name: "Remaining", value: 25 },
  ];
  
  // Fixed coordinate system for perfect alignment
  const width = 300;
  const height = 180;
  const cx = width / 2;
  const cy = height * 0.8;
  const iR = 80;
  const oR = 100;

  // Function to determine needle rotation
  const needle = (value: number, data: any[], cx: number, cy: number, iR: number, oR: number, color: string) => {
    let total = 0;
    data.forEach((v) => {
      total += v.value;
    });
    const ang = 180.0 * (1 - value / total);
    const length = (iR + 2 * oR) / 3;
    const sin = Math.sin(-Math.PI / 180 * ang);
    const cos = Math.cos(-Math.PI / 180 * ang);
    const r = 5;
    const x0 = cx;
    const y0 = cy;
    const xba = x0 + r * sin;
    const yba = y0 - r * cos;
    const xbb = x0 - r * sin;
    const ybb = y0 + r * cos;
    const xp = x0 + length * cos;
    const yp = y0 + length * sin;

    return [
      <circle key="pivot" cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
      <path key="needle" d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="none" fill={color} />,
    ];
  };

  return (
    <Card className="h-fit bg-card/50 backdrop-blur-sm border-border/50 flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Fear & Greed Index</CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="w-4 h-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Market sentiment indicator</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Gauge Chart Section */}
          <div className="relative h-[220px] w-full md:w-1/2 flex justify-center">
            <div className="scale-90 md:scale-100 origin-center transition-transform mt-2">
              <PieChart width={width} height={height}>
                <Pie
                  dataKey="value"
                  startAngle={180}
                  endAngle={0}
                  data={data}
                  cx={cx}
                  cy={cy}
                  innerRadius={iR}
                  outerRadius={oR}
                  fill="#8884d8"
                  stroke="none"
                >
                  <Cell fill="url(#gradientFear)" />
                  <Cell fill="#333" />
                </Pie>
                {needle(75, data, cx, cy, iR, oR, '#e2e8f0')}
                <defs>
                  <linearGradient id="gradientFear" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3b82f6" /> {/* Extreme Fear (Blue in original) */}
                    <stop offset="50%" stopColor="#a855f7" /> {/* Neutral (Purple) */}
                    <stop offset="100%" stopColor="#ef4444" /> {/* Extreme Greed (Red) */}
                  </linearGradient>
                </defs>
              </PieChart>
            </div>
            
            {/* Chart Labels Overlay */}
             <div className="absolute inset-x-0 top-[155px] flex justify-between px-6 pointer-events-none">
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest text-center leading-tight">Extreme<br/>Fear</span>
              <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest text-center leading-tight">Extreme<br/>Greed</span>
            </div>

             {/* Separate Score Display below the gauge */}
             <div className="absolute bottom-1 flex flex-col items-center z-20">
                 <div className="px-4 py-1 bg-background/80 backdrop-blur-md rounded-full border border-white/10 shadow-lg flex items-center gap-2">
                    <span className="text-2xl font-bold font-display text-white">75</span>
                    <span className="text-xs font-medium text-red-400 uppercase tracking-wider">Greed</span>
                 </div>
             </div>
          </div>

          {/* Time-based Indices List */}
          <div className="w-full md:w-1/2 flex flex-col gap-1.5">
             {[
               { label: "Fear Index", period: "1 Week", val: 28, color: "text-blue-400 border-blue-500/30" },
               { label: "Neutral Index", period: "1 Month", val: 57, color: "text-purple-400 border-purple-500/30" },
               { label: "Greed Index", period: "3 Months", val: 66, color: "text-red-400 border-red-500/30" },
               { label: "Greed Index", period: "6 Months", val: 71, color: "text-red-400 border-red-500/30" },
             ].map((item, i) => (
               <div key={i} className={`flex items-center justify-between p-2 rounded-lg border bg-secondary/20 ${item.color.split(' ')[1]}`}>
                  <div className="flex flex-col">
                    <span className={`text-xs font-bold ${item.color.split(' ')[0]}`}>{item.label}</span>
                    <span className="text-[10px] text-muted-foreground">{item.period}</span>
                  </div>
                  <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${item.color}`}>
                     {item.val}
                  </div>
               </div>
             ))}
          </div>
        </div>

        {/* Check Point Section */}
        <div className="bg-secondary/10 border border-border/50 rounded-lg p-3 space-y-2">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                 <Check className="w-5 h-5 text-primary" />
                 <span className="font-bold font-display italic text-lg">Check Point!</span>
              </div>
              <Button variant="outline" size="sm" className="h-7 text-xs border-primary/30 text-primary hover:bg-primary/10">
                 View Details
              </Button>
           </div>
           <p className="text-xs text-muted-foreground leading-relaxed">
             Over the past week, the stock market's Fear & Greed Index fluctuated between 12.65 and 44.76, showing a total volatility of 32.11 points. 
             The starting value was 25.38, falling within the Fear range (29 or lower), while the peak of 44.76 corresponded to the Neutral range (30-69). 
             The index initially showed strong fear but rose to neutral levels mid-week before declining again, demonstrating volatility. 
             This suggests that market sentiment has shown unstable movements.
           </p>
        </div>
      </CardContent>
    </Card>
  );
}