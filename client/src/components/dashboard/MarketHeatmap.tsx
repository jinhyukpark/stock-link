import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function MarketHeatmap() {
  const stocks = [
    { name: "Samsung Elec", change: 2.14, value: 400, code: "005930" },
    { name: "SK Hynix", change: 6.84, value: 300, code: "000660" },
    { name: "LG Energy", change: -1.2, value: 150, code: "373220" },
    { name: "Samsung Bio", change: 0.5, value: 120, code: "207940" },
    { name: "Hyundai Motor", change: 3.4, value: 110, code: "005380" },
    { name: "Kia", change: 2.8, value: 100, code: "000270" },
    { name: "POSCO", change: -0.8, value: 90, code: "005490" },
    { name: "NAVER", change: 1.2, value: 85, code: "035420" },
    { name: "Kakao", change: -2.1, value: 80, code: "035720" },
    { name: "Celltrion", change: 0.9, value: 75, code: "068270" },
  ];

  return (
    <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold">Real-time Market Map</CardTitle>
        <div className="flex gap-2">
            <span className="w-3 h-3 bg-red-500 rounded-sm"></span>
            <span className="text-xs text-muted-foreground">Bullish</span>
            <span className="w-3 h-3 bg-blue-500 rounded-sm ml-2"></span>
            <span className="text-xs text-muted-foreground">Bearish</span>
        </div>
      </CardHeader>
      <CardContent className="h-[300px] p-2">
        <div className="grid grid-cols-4 grid-rows-4 gap-1 h-full">
          {/* Custom Bento-style Heatmap Layout */}
          
          {/* Main Block - Samsung */}
          <div className="col-span-2 row-span-4 bg-red-500/80 hover:bg-red-500 transition-colors rounded-sm flex flex-col items-center justify-center p-4 cursor-pointer relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <span className="font-bold text-lg md:text-xl text-white z-10">{stocks[0].name}</span>
             <span className="text-white/90 font-mono font-bold z-10">+{stocks[0].change}%</span>
          </div>

          {/* Secondary Block - SK Hynix */}
          <div className="col-span-2 row-span-2 bg-red-600/90 hover:bg-red-600 transition-colors rounded-sm flex flex-col items-center justify-center p-4 cursor-pointer relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <span className="font-bold text-lg text-white z-10">{stocks[1].name}</span>
             <span className="text-white/90 font-mono font-bold z-10">+{stocks[1].change}%</span>
          </div>

          {/* Tertiary Blocks */}
          <div className="col-span-1 row-span-2 bg-blue-500/80 hover:bg-blue-500 transition-colors rounded-sm flex flex-col items-center justify-center p-2 cursor-pointer group">
             <span className="font-semibold text-xs text-white text-center">{stocks[2].name}</span>
             <span className="text-white/90 font-mono text-xs">{stocks[2].change}%</span>
          </div>
          
          <div className="col-span-1 row-span-1 bg-red-400/80 hover:bg-red-400 transition-colors rounded-sm flex flex-col items-center justify-center p-1 cursor-pointer">
             <span className="font-semibold text-[10px] text-white truncate w-full text-center">{stocks[3].name}</span>
             <span className="text-white/90 font-mono text-[10px]">+{stocks[3].change}%</span>
          </div>

           <div className="col-span-1 row-span-1 bg-red-500/80 hover:bg-red-500 transition-colors rounded-sm flex flex-col items-center justify-center p-1 cursor-pointer">
             <span className="font-semibold text-[10px] text-white truncate w-full text-center">{stocks[4].name}</span>
             <span className="text-white/90 font-mono text-[10px]">+{stocks[4].change}%</span>
          </div>
           
           {/* Remaining small blocks */}
           <div className="col-span-2 row-span-1 grid grid-cols-4 gap-1">
             {stocks.slice(5).map((stock, i) => (
               <div key={i} className={cn(
                 "rounded-sm flex flex-col items-center justify-center p-1 cursor-pointer transition-colors",
                 stock.change > 0 ? "bg-red-400/70 hover:bg-red-400" : "bg-blue-400/70 hover:bg-blue-400"
               )}>
                 <span className="text-[9px] text-white font-medium truncate w-full text-center">{stock.name}</span>
                 <span className="text-[9px] text-white/90 font-mono">{stock.change > 0 ? '+' : ''}{stock.change}%</span>
               </div>
             ))}
           </div>

        </div>
      </CardContent>
    </Card>
  );
}