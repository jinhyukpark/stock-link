import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

export default function MarketDistribution() {
  return (
    <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50">
      <CardContent className="p-4 h-full flex items-center justify-center">
        <div className="w-full h-full grid grid-cols-2 gap-4">
          {/* Chart 1: Price Distribution */}
          <div className="flex flex-col h-full">
            <h3 className="text-sm font-bold text-center mb-1 text-white shrink-0 flex items-center justify-center gap-2">
              Price Distribution <span className="text-[10px] text-gray-400 font-medium font-normal">(Rise/Fall/Flat)</span>
            </h3>
            <div className="flex-1 flex items-center min-h-0">
                {/* Legend Left */}
                <div className="flex flex-col justify-center gap-2 pr-2 shrink-0">
                    {priceDistributionData.map((item, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                            <span className="text-[10px] text-muted-foreground whitespace-nowrap">{item.name}</span>
                        </div>
                    ))}
                </div>
                {/* Chart Right */}
                <div className="flex-1 h-full relative min-h-[120px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={priceDistributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius="65%"
                        outerRadius="100%"
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
          </div>

          {/* Chart 2: Investor Volume */}
          <div className="flex flex-col h-full border-l border-border/30 pl-4">
             <h3 className="text-sm font-bold text-center mb-1 text-white shrink-0 flex items-center justify-center gap-2">
              Investor Volume <span className="text-[10px] text-gray-400 font-medium font-normal">(Buy/Sell Ratio)</span>
            </h3>
            <div className="flex-1 flex items-center min-h-0">
                {/* Legend Left */}
                <div className="flex flex-col justify-center gap-2 pr-2 shrink-0">
                    {investorVolumeData.map((item, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                            <span className="text-[10px] text-muted-foreground whitespace-nowrap">{item.name}</span>
                        </div>
                    ))}
                </div>
                {/* Chart Right */}
                <div className="flex-1 h-full relative min-h-[120px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={investorVolumeData}
                        cx="50%"
                        cy="50%"
                        innerRadius="65%"
                        outerRadius="100%"
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
        </div>
      </CardContent>
    </Card>
  );
}