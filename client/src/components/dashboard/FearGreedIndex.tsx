import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const priceDistributionData = [
  { name: "Rising", value: 44.6, color: "#3b82f6" }, // Blue
  { name: "Falling", value: 48.6, color: "#06b6d4" }, // Cyan
  { name: "Unchanged", value: 6.8, color: "#eab308" }, // Yellow
];

const investorVolumeData = [
  { name: "Individual", value: 75.7, color: "#3b82f6" }, // Blue
  { name: "Institution", value: 6.5, color: "#06b6d4" }, // Cyan
  { name: "Foreign", value: 17.8, color: "#eab308" }, // Yellow
];

const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  // Only show label if percentage is significant to avoid clutter
  if (percent < 0.05) return null;

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-[10px] font-bold fill-white drop-shadow-md">
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  );
};

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
    <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Market Sentiment</CardTitle>
        <TooltipProvider>
          <UITooltip>
            <TooltipTrigger>
              <Info className="w-4 h-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Market sentiment & distribution indicators</p>
            </TooltipContent>
          </UITooltip>
        </TooltipProvider>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col justify-between py-2">
        {/* Top Section: Fear & Greed + Indices */}
        <div className="flex flex-col xl:flex-row gap-2 xl:gap-4 items-center flex-1">
          {/* Gauge Chart Section */}
          <div className="relative h-[160px] w-full xl:w-1/2 flex items-center justify-center overflow-hidden shrink-0">
            <div className="scale-75 sm:scale-90 md:scale-90 origin-center transition-transform">
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
             <div className="absolute inset-x-0 bottom-[40px] flex justify-between px-6 pointer-events-none">
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest text-center leading-tight">Extreme<br/>Fear</span>
              <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest text-center leading-tight">Extreme<br/>Greed</span>
            </div>

             {/* Separate Score Display below the gauge */}
             <div className="absolute bottom-2 flex flex-col items-center">
                 <div className="px-4 py-1 bg-background/50 backdrop-blur-md rounded-full border border-white/10 shadow-lg">
                    <span className="text-2xl font-bold font-display text-white mr-2">75</span>
                    <span className="text-xs font-medium text-red-400 uppercase tracking-wider">Greed</span>
                 </div>
             </div>
          </div>

          {/* Time-based Indices List */}
          <div className="w-full xl:w-1/2 flex flex-col gap-1.5 px-2 xl:px-0">
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

        {/* Separator */}
        <div className="h-px bg-border/50 w-full my-2" />

        {/* Bottom Section: Distribution Donut Charts */}
        <div className="h-[140px] grid grid-cols-2 gap-2">
            {/* Chart 1: Price Distribution */}
            <div className="flex flex-col h-full items-center justify-center">
                <h3 className="text-[10px] font-semibold text-center mb-1 text-muted-foreground">
                    Price Distribution
                </h3>
                <div className="w-full h-[100px] relative">
                    <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                        data={priceDistributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={25}
                        outerRadius={40}
                        paddingAngle={2}
                        dataKey="value"
                        stroke="none"
                        labelLine={false}
                        label={CustomLabel}
                        >
                        {priceDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                            itemStyle={{ color: '#fff' }}
                        />
                    </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Chart 2: Investor Volume */}
            <div className="flex flex-col h-full items-center justify-center border-l border-border/30 pl-2">
                <h3 className="text-[10px] font-semibold text-center mb-1 text-muted-foreground">
                    Investor Volume
                </h3>
                <div className="w-full h-[100px] relative">
                    <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                        data={investorVolumeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={25}
                        outerRadius={40}
                        paddingAngle={2}
                        dataKey="value"
                        stroke="none"
                        labelLine={false}
                        label={CustomLabel}
                        >
                        {investorVolumeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                            itemStyle={{ color: '#fff' }}
                        />
                    </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}