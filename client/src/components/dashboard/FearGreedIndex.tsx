import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function FearGreedIndex() {
  const data = [
    { name: "Value", value: 75 },
    { name: "Remaining", value: 25 },
  ];
  const cx = 150;
  const cy = 150;
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
    const x0 = cx + 5;
    const y0 = cy + 5;
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
    <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50">
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
      <CardContent>
        <div className="relative h-[200px] w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                dataKey="value"
                startAngle={180}
                endAngle={0}
                data={data}
                cx="50%"
                cy="70%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                stroke="none"
              >
                <Cell fill="url(#gradientFear)" />
                <Cell fill="#333" />
              </Pie>
              {needle(75, data, 150, 140, 60, 80, '#d0d000')} {/* This positioning needs fine tuning based on container but svg is tricky in responsive */}
              <defs>
                <linearGradient id="gradientFear" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="50%" stopColor="#eab308" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
              </defs>
            </PieChart>
          </ResponsiveContainer>
          
          <div className="absolute bottom-4 flex flex-col items-center">
             <span className="text-4xl font-bold font-display text-primary drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">75</span>
             <span className="text-sm font-medium text-green-400">Greed</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 mt-4">
           <div className="flex justify-between items-center bg-secondary/30 p-2 rounded text-xs">
              <span className="text-muted-foreground">Previous Close</span>
              <span className="font-medium">68 (Greed)</span>
           </div>
           <div className="flex justify-between items-center bg-secondary/30 p-2 rounded text-xs">
              <span className="text-muted-foreground">1 Week Ago</span>
              <span className="font-medium">45 (Neutral)</span>
           </div>
        </div>
      </CardContent>
    </Card>
  );
}