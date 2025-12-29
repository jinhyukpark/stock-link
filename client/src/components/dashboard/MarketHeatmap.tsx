import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Maximize2, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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

  const HeatmapContent = ({ expanded = false }) => (
    <div className={cn("grid gap-1 h-full w-full", expanded ? "grid-cols-6 grid-rows-6 p-4" : "grid-cols-4 grid-rows-5")}>
      {/* R1-R3, C1-C2: Samsung (Big Left) */}
      <div className={cn(
        "bg-red-500/80 hover:bg-red-500 transition-colors rounded-sm flex flex-col items-center justify-center cursor-pointer relative overflow-hidden group",
        expanded ? "col-span-3 row-span-4 p-8" : "col-span-2 row-span-3 p-4"
      )}>
         <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
         <span className={cn("font-bold text-white z-10", expanded ? "text-4xl" : "text-lg md:text-xl")}>{stocks[0].name}</span>
         <span className={cn("text-white/90 font-mono font-bold z-10", expanded ? "text-2xl mt-2" : "")}>+{stocks[0].change}%</span>
         {expanded && <span className="text-white/60 text-sm mt-1">{stocks[0].code} | 400T KRW</span>}
      </div>

      {/* R1-R2, C3-C4: SK Hynix (Big Right Top) */}
      <div className={cn(
        "bg-red-600/90 hover:bg-red-600 transition-colors rounded-sm flex flex-col items-center justify-center cursor-pointer relative overflow-hidden group",
        expanded ? "col-span-3 row-span-3 p-6" : "col-span-2 row-span-2 p-4"
      )}>
         <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
         <span className={cn("font-bold text-white z-10", expanded ? "text-3xl" : "text-lg")}>{stocks[1].name}</span>
         <span className={cn("text-white/90 font-mono font-bold z-10", expanded ? "text-xl mt-2" : "")}>+{stocks[1].change}%</span>
         {expanded && <span className="text-white/60 text-sm mt-1">{stocks[1].code} | 300T KRW</span>}
      </div>

      {/* R3-R4, C3: LG Energy (Tall Right Middle) */}
      <div className={cn(
        "bg-blue-500/80 hover:bg-blue-500 transition-colors rounded-sm flex flex-col items-center justify-center cursor-pointer group",
        expanded ? "col-span-2 row-span-3 p-4" : "col-span-1 row-span-2 p-2"
      )}>
         <span className={cn("font-semibold text-white text-center leading-tight mb-1", expanded ? "text-xl" : "text-xs")}>{stocks[2].name}</span>
         <span className={cn("text-white/90 font-mono", expanded ? "text-lg" : "text-xs")}>{stocks[2].change}%</span>
      </div>
      
      {/* R3, C4: Samsung Bio */}
      <div className={cn(
        "bg-red-400/80 hover:bg-red-400 transition-colors rounded-sm flex flex-col items-center justify-center cursor-pointer",
        expanded ? "col-span-1 row-span-2 p-2" : "col-span-1 row-span-1 p-1"
      )}>
         <span className={cn("font-semibold text-white truncate w-full text-center", expanded ? "text-sm" : "text-[10px]")}>{stocks[3].name}</span>
         <span className={cn("text-white/90 font-mono", expanded ? "text-sm" : "text-[10px]")}>+{stocks[3].change}%</span>
      </div>

      {/* R4, C1: Kia */}
      <div className={cn(
        "bg-red-400/80 hover:bg-red-400 transition-colors rounded-sm flex flex-col items-center justify-center cursor-pointer",
        expanded ? "col-span-1 row-span-2 p-2" : "col-span-1 row-span-1 p-1"
      )}>
         <span className={cn("font-semibold text-white truncate w-full text-center", expanded ? "text-sm" : "text-[10px]")}>{stocks[5].name}</span>
         <span className={cn("text-white/90 font-mono", expanded ? "text-sm" : "text-[10px]")}>+{stocks[5].change}%</span>
      </div>

      {/* R4, C2: POSCO */}
      <div className={cn(
        "bg-blue-400/80 hover:bg-blue-400 transition-colors rounded-sm flex flex-col items-center justify-center cursor-pointer",
        expanded ? "col-span-1 row-span-2 p-2" : "col-span-1 row-span-1 p-1"
      )}>
         <span className={cn("font-semibold text-white truncate w-full text-center", expanded ? "text-sm" : "text-[10px]")}>{stocks[6].name}</span>
         <span className={cn("text-white/90 font-mono", expanded ? "text-sm" : "text-[10px]")}>{stocks[6].change}%</span>
      </div>

      {/* R4, C4: Hyundai Motor */}
       <div className={cn(
        "bg-red-500/80 hover:bg-red-500 transition-colors rounded-sm flex flex-col items-center justify-center cursor-pointer",
        expanded ? "col-span-1 row-span-2 p-2" : "col-span-1 row-span-1 p-1"
      )}>
         <span className={cn("font-semibold text-white truncate w-full text-center", expanded ? "text-sm" : "text-[10px]")}>{stocks[4].name}</span>
         <span className={cn("text-white/90 font-mono", expanded ? "text-sm" : "text-[10px]")}>+{stocks[4].change}%</span>
      </div>

      {/* R5, C1: NAVER */}
       <div className={cn(
        "bg-red-400/80 hover:bg-red-400 transition-colors rounded-sm flex flex-col items-center justify-center cursor-pointer",
        expanded ? "col-span-1 row-span-2 p-2" : "col-span-1 row-span-1 p-1"
      )}>
         <span className={cn("font-semibold text-white truncate w-full text-center", expanded ? "text-sm" : "text-[10px]")}>{stocks[7].name}</span>
         <span className={cn("text-white/90 font-mono", expanded ? "text-sm" : "text-[10px]")}>+{stocks[7].change}%</span>
      </div>

      {/* R5, C2: Kakao */}
       <div className={cn(
        "bg-blue-400/80 hover:bg-blue-400 transition-colors rounded-sm flex flex-col items-center justify-center cursor-pointer",
        expanded ? "col-span-1 row-span-2 p-2" : "col-span-1 row-span-1 p-1"
      )}>
         <span className={cn("font-semibold text-white truncate w-full text-center", expanded ? "text-sm" : "text-[10px]")}>{stocks[8].name}</span>
         <span className={cn("text-white/90 font-mono", expanded ? "text-sm" : "text-[10px]")}>{stocks[8].change}%</span>
      </div>

      {/* R5, C3: Celltrion */}
       <div className={cn(
        "bg-red-400/80 hover:bg-red-400 transition-colors rounded-sm flex flex-col items-center justify-center cursor-pointer",
        expanded ? "col-span-1 row-span-2 p-2" : "col-span-1 row-span-1 p-1"
      )}>
         <span className={cn("font-semibold text-white truncate w-full text-center", expanded ? "text-sm" : "text-[10px]")}>{stocks[9].name}</span>
         <span className={cn("text-white/90 font-mono", expanded ? "text-sm" : "text-[10px]")}>+{stocks[9].change}%</span>
      </div>

      {/* R5, C4: KB Financial */}
       <div className={cn(
        "bg-red-400/80 hover:bg-red-400 transition-colors rounded-sm flex flex-col items-center justify-center cursor-pointer",
        expanded ? "col-span-1 row-span-2 p-2" : "col-span-1 row-span-1 p-1"
      )}>
         <span className={cn("font-semibold text-white truncate w-full text-center", expanded ? "text-sm" : "text-[10px]")}>{stocks[10].name}</span>
         <span className={cn("text-white/90 font-mono", expanded ? "text-sm" : "text-[10px]")}>+{stocks[10].change}%</span>
      </div>

    </div>
  );

  return (
    <Dialog>
      <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 flex flex-col relative group/card">
        <CardHeader className="flex flex-row items-center justify-between pb-2 shrink-0">
          <CardTitle className="text-base font-semibold">Real-time Market Map</CardTitle>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-sm"></span>
                <span className="text-xs text-muted-foreground">Bullish</span>
                <span className="w-3 h-3 bg-blue-500 rounded-sm ml-2"></span>
                <span className="text-xs text-muted-foreground">Bearish</span>
            </div>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover/card:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4 text-muted-foreground hover:text-foreground" />
              </Button>
            </DialogTrigger>
          </div>
        </CardHeader>
        <CardContent className="flex-1 min-h-0 p-2 pt-0">
          <HeatmapContent />
        </CardContent>
      </Card>
      
      <DialogContent className="max-w-[90vw] h-[85vh] flex flex-col p-0 gap-0 bg-[#0B0E14] border-border/50">
        <DialogHeader className="p-4 border-b border-border/50 flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-4">
             <DialogTitle className="text-xl font-bold">Market Map Analysis</DialogTitle>
             <div className="flex gap-3">
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground"><span className="w-3 h-3 bg-red-500 rounded-sm"></span>Bullish</span>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground"><span className="w-3 h-3 bg-blue-500 rounded-sm"></span>Bearish</span>
            </div>
          </div>
        </DialogHeader>
        <div className="flex-1 p-6 overflow-hidden">
          <HeatmapContent expanded={true} />
        </div>
      </DialogContent>
    </Dialog>
  );
}