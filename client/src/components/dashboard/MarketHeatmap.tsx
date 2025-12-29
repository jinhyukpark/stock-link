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
    { name: "KB Financial", change: 1.5, value: 70, code: "105560" },
  ];

  return (
    <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2 shrink-0">
        <CardTitle className="text-base font-semibold">Real-time Market Map</CardTitle>
        <div className="flex gap-2">
            <span className="w-3 h-3 bg-red-500 rounded-sm"></span>
            <span className="text-xs text-muted-foreground">Bullish</span>
            <span className="w-3 h-3 bg-blue-500 rounded-sm ml-2"></span>
            <span className="text-xs text-muted-foreground">Bearish</span>
        </div>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 p-2 pt-0">
        <div className="grid grid-cols-4 grid-rows-5 gap-1 h-full w-full">
          {/* Custom Bento-style Heatmap Layout (4 cols x 5 rows) */}
          
          {/* R1-R3, C1-C2: Samsung (Big Left) */}
          <div className="col-span-2 row-span-3 bg-red-500/80 hover:bg-red-500 transition-colors rounded-sm flex flex-col items-center justify-center p-4 cursor-pointer relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <span className="font-bold text-lg md:text-xl text-white z-10">{stocks[0].name}</span>
             <span className="text-white/90 font-mono font-bold z-10">+{stocks[0].change}%</span>
          </div>

          {/* R1-R2, C3-C4: SK Hynix (Big Right Top) */}
          <div className="col-span-2 row-span-2 bg-red-600/90 hover:bg-red-600 transition-colors rounded-sm flex flex-col items-center justify-center p-4 cursor-pointer relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <span className="font-bold text-lg text-white z-10">{stocks[1].name}</span>
             <span className="text-white/90 font-mono font-bold z-10">+{stocks[1].change}%</span>
          </div>

          {/* R3-R4, C3: LG Energy (Tall Right Middle) */}
          <div className="col-span-1 row-span-2 bg-blue-500/80 hover:bg-blue-500 transition-colors rounded-sm flex flex-col items-center justify-center p-2 cursor-pointer group">
             <span className="font-semibold text-xs text-white text-center leading-tight mb-1">{stocks[2].name}</span>
             <span className="text-white/90 font-mono text-xs">{stocks[2].change}%</span>
          </div>
          
          {/* R3, C4: Samsung Bio */}
          <div className="col-span-1 row-span-1 bg-red-400/80 hover:bg-red-400 transition-colors rounded-sm flex flex-col items-center justify-center p-1 cursor-pointer">
             <span className="font-semibold text-[10px] text-white truncate w-full text-center">{stocks[3].name}</span>
             <span className="text-white/90 font-mono text-[10px]">+{stocks[3].change}%</span>
          </div>

          {/* R4, C1: Kia */}
          <div className="col-span-1 row-span-1 bg-red-400/80 hover:bg-red-400 transition-colors rounded-sm flex flex-col items-center justify-center p-1 cursor-pointer">
             <span className="font-semibold text-[10px] text-white truncate w-full text-center">{stocks[5].name}</span>
             <span className="text-white/90 font-mono text-[10px]">+{stocks[5].change}%</span>
          </div>

          {/* R4, C2: POSCO */}
          <div className="col-span-1 row-span-1 bg-blue-400/80 hover:bg-blue-400 transition-colors rounded-sm flex flex-col items-center justify-center p-1 cursor-pointer">
             <span className="font-semibold text-[10px] text-white truncate w-full text-center">{stocks[6].name}</span>
             <span className="text-white/90 font-mono text-[10px]">{stocks[6].change}%</span>
          </div>

          {/* R4, C4: Hyundai Motor */}
           <div className="col-span-1 row-span-1 bg-red-500/80 hover:bg-red-500 transition-colors rounded-sm flex flex-col items-center justify-center p-1 cursor-pointer">
             <span className="font-semibold text-[10px] text-white truncate w-full text-center">{stocks[4].name}</span>
             <span className="text-white/90 font-mono text-[10px]">+{stocks[4].change}%</span>
          </div>

          {/* R5, C1: NAVER */}
           <div className="col-span-1 row-span-1 bg-red-400/80 hover:bg-red-400 transition-colors rounded-sm flex flex-col items-center justify-center p-1 cursor-pointer">
             <span className="font-semibold text-[10px] text-white truncate w-full text-center">{stocks[7].name}</span>
             <span className="text-white/90 font-mono text-[10px]">+{stocks[7].change}%</span>
          </div>

          {/* R5, C2: Kakao */}
           <div className="col-span-1 row-span-1 bg-blue-400/80 hover:bg-blue-400 transition-colors rounded-sm flex flex-col items-center justify-center p-1 cursor-pointer">
             <span className="font-semibold text-[10px] text-white truncate w-full text-center">{stocks[8].name}</span>
             <span className="text-white/90 font-mono text-[10px]">{stocks[8].change}%</span>
          </div>

          {/* R5, C3: Celltrion */}
           <div className="col-span-1 row-span-1 bg-red-400/80 hover:bg-red-400 transition-colors rounded-sm flex flex-col items-center justify-center p-1 cursor-pointer">
             <span className="font-semibold text-[10px] text-white truncate w-full text-center">{stocks[9].name}</span>
             <span className="text-white/90 font-mono text-[10px]">+{stocks[9].change}%</span>
          </div>

          {/* R5, C4: KB Financial */}
           <div className="col-span-1 row-span-1 bg-red-400/80 hover:bg-red-400 transition-colors rounded-sm flex flex-col items-center justify-center p-1 cursor-pointer">
             <span className="font-semibold text-[10px] text-white truncate w-full text-center">{stocks[10].name}</span>
             <span className="text-white/90 font-mono text-[10px]">+{stocks[10].change}%</span>
          </div>

        </div>
      </CardContent>
    </Card>
  );
}