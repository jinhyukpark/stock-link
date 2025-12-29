import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Maximize2, X, ChevronRight, Zap } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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

  const [selectedStock, setSelectedStock] = useState<typeof stocks[0] | null>(null);

  const HeatmapContent = ({ expanded = false }) => (
    <div className={cn("grid gap-1 h-full w-full", expanded ? "grid-cols-6 grid-rows-6" : "grid-cols-4 grid-rows-5")}>
      {/* R1-R3, C1-C2: Samsung (Big Left) */}
      <div 
        onClick={() => expanded && setSelectedStock(stocks[0])}
        className={cn(
        "bg-red-500/80 hover:bg-red-500 transition-colors rounded-sm flex flex-col items-center justify-center cursor-pointer relative overflow-hidden group",
        expanded ? "col-span-3 row-span-4 p-8 ring-2 ring-transparent hover:ring-white/50" : "col-span-2 row-span-3 p-4",
        expanded && selectedStock?.name === stocks[0].name && "ring-white ring-2 z-10"
      )}>
         <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
         <span className={cn("font-bold text-white z-10", expanded ? "text-4xl" : "text-lg md:text-xl")}>{stocks[0].name}</span>
         <span className={cn("text-white/90 font-mono font-bold z-10", expanded ? "text-2xl mt-2" : "")}>+{stocks[0].change}%</span>
         {expanded && <span className="text-white/60 text-sm mt-1">{stocks[0].code} | 400T KRW</span>}
      </div>

      {/* R1-R2, C3-C4: SK Hynix (Big Right Top) */}
      <div 
        onClick={() => expanded && setSelectedStock(stocks[1])}
        className={cn(
        "bg-red-600/90 hover:bg-red-600 transition-colors rounded-sm flex flex-col items-center justify-center cursor-pointer relative overflow-hidden group",
        expanded ? "col-span-3 row-span-3 p-6 ring-2 ring-transparent hover:ring-white/50" : "col-span-2 row-span-2 p-4",
        expanded && selectedStock?.name === stocks[1].name && "ring-white ring-2 z-10"
      )}>
         <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
         <span className={cn("font-bold text-white z-10", expanded ? "text-3xl" : "text-lg")}>{stocks[1].name}</span>
         <span className={cn("text-white/90 font-mono font-bold z-10", expanded ? "text-xl mt-2" : "")}>+{stocks[1].change}%</span>
         {expanded && <span className="text-white/60 text-sm mt-1">{stocks[1].code} | 300T KRW</span>}
      </div>

      {/* R3-R4, C3: LG Energy (Tall Right Middle) */}
      <div 
        onClick={() => expanded && setSelectedStock(stocks[2])}
        className={cn(
        "bg-blue-500/80 hover:bg-blue-500 transition-colors rounded-sm flex flex-col items-center justify-center cursor-pointer group",
        expanded ? "col-span-2 row-span-3 p-4 ring-2 ring-transparent hover:ring-white/50" : "col-span-1 row-span-2 p-2",
        expanded && selectedStock?.name === stocks[2].name && "ring-white ring-2 z-10"
      )}>
         <span className={cn("font-semibold text-white text-center leading-tight mb-1", expanded ? "text-xl" : "text-xs")}>{stocks[2].name}</span>
         <span className={cn("text-white/90 font-mono", expanded ? "text-lg" : "text-xs")}>{stocks[2].change}%</span>
      </div>
      
      {/* R3, C4: Samsung Bio */}
      <div 
        onClick={() => expanded && setSelectedStock(stocks[3])}
        className={cn(
        "bg-red-400/80 hover:bg-red-400 transition-colors rounded-sm flex flex-col items-center justify-center cursor-pointer",
        expanded ? "col-span-1 row-span-2 p-2 ring-2 ring-transparent hover:ring-white/50" : "col-span-1 row-span-1 p-1",
        expanded && selectedStock?.name === stocks[3].name && "ring-white ring-2 z-10"
      )}>
         <span className={cn("font-semibold text-white truncate w-full text-center", expanded ? "text-sm" : "text-[10px]")}>{stocks[3].name}</span>
         <span className={cn("text-white/90 font-mono", expanded ? "text-sm" : "text-[10px]")}>+{stocks[3].change}%</span>
      </div>

      {/* R4, C1: Kia */}
      <div 
        onClick={() => expanded && setSelectedStock(stocks[5])}
        className={cn(
        "bg-red-400/80 hover:bg-red-400 transition-colors rounded-sm flex flex-col items-center justify-center cursor-pointer",
        expanded ? "col-span-1 row-span-2 p-2 ring-2 ring-transparent hover:ring-white/50" : "col-span-1 row-span-1 p-1",
        expanded && selectedStock?.name === stocks[5].name && "ring-white ring-2 z-10"
      )}>
         <span className={cn("font-semibold text-white truncate w-full text-center", expanded ? "text-sm" : "text-[10px]")}>{stocks[5].name}</span>
         <span className={cn("text-white/90 font-mono", expanded ? "text-sm" : "text-[10px]")}>+{stocks[5].change}%</span>
      </div>

      {/* R4, C2: POSCO */}
      <div 
        onClick={() => expanded && setSelectedStock(stocks[6])}
        className={cn(
        "bg-blue-400/80 hover:bg-blue-400 transition-colors rounded-sm flex flex-col items-center justify-center cursor-pointer",
        expanded ? "col-span-1 row-span-2 p-2 ring-2 ring-transparent hover:ring-white/50" : "col-span-1 row-span-1 p-1",
        expanded && selectedStock?.name === stocks[6].name && "ring-white ring-2 z-10"
      )}>
         <span className={cn("font-semibold text-white truncate w-full text-center", expanded ? "text-sm" : "text-[10px]")}>{stocks[6].name}</span>
         <span className={cn("text-white/90 font-mono", expanded ? "text-sm" : "text-[10px]")}>{stocks[6].change}%</span>
      </div>

      {/* R4, C4: Hyundai Motor */}
       <div 
        onClick={() => expanded && setSelectedStock(stocks[4])}
        className={cn(
        "bg-red-500/80 hover:bg-red-500 transition-colors rounded-sm flex flex-col items-center justify-center cursor-pointer",
        expanded ? "col-span-1 row-span-2 p-2 ring-2 ring-transparent hover:ring-white/50" : "col-span-1 row-span-1 p-1",
        expanded && selectedStock?.name === stocks[4].name && "ring-white ring-2 z-10"
      )}>
         <span className={cn("font-semibold text-white truncate w-full text-center", expanded ? "text-sm" : "text-[10px]")}>{stocks[4].name}</span>
         <span className={cn("text-white/90 font-mono", expanded ? "text-sm" : "text-[10px]")}>+{stocks[4].change}%</span>
      </div>

      {/* R5, C1: NAVER */}
       <div 
        onClick={() => expanded && setSelectedStock(stocks[7])}
        className={cn(
        "bg-red-400/80 hover:bg-red-400 transition-colors rounded-sm flex flex-col items-center justify-center cursor-pointer",
        expanded ? "col-span-1 row-span-2 p-2 ring-2 ring-transparent hover:ring-white/50" : "col-span-1 row-span-1 p-1",
        expanded && selectedStock?.name === stocks[7].name && "ring-white ring-2 z-10"
      )}>
         <span className={cn("font-semibold text-white truncate w-full text-center", expanded ? "text-sm" : "text-[10px]")}>{stocks[7].name}</span>
         <span className={cn("text-white/90 font-mono", expanded ? "text-sm" : "text-[10px]")}>+{stocks[7].change}%</span>
      </div>

      {/* R5, C2: Kakao */}
       <div 
        onClick={() => expanded && setSelectedStock(stocks[8])}
        className={cn(
        "bg-blue-400/80 hover:bg-blue-400 transition-colors rounded-sm flex flex-col items-center justify-center cursor-pointer",
        expanded ? "col-span-1 row-span-2 p-2 ring-2 ring-transparent hover:ring-white/50" : "col-span-1 row-span-1 p-1",
        expanded && selectedStock?.name === stocks[8].name && "ring-white ring-2 z-10"
      )}>
         <span className={cn("font-semibold text-white truncate w-full text-center", expanded ? "text-sm" : "text-[10px]")}>{stocks[8].name}</span>
         <span className={cn("text-white/90 font-mono", expanded ? "text-sm" : "text-[10px]")}>{stocks[8].change}%</span>
      </div>

      {/* R5, C3: Celltrion */}
       <div 
        onClick={() => expanded && setSelectedStock(stocks[9])}
        className={cn(
        "bg-red-400/80 hover:bg-red-400 transition-colors rounded-sm flex flex-col items-center justify-center cursor-pointer",
        expanded ? "col-span-1 row-span-2 p-2 ring-2 ring-transparent hover:ring-white/50" : "col-span-1 row-span-1 p-1",
        expanded && selectedStock?.name === stocks[9].name && "ring-white ring-2 z-10"
      )}>
         <span className={cn("font-semibold text-white truncate w-full text-center", expanded ? "text-sm" : "text-[10px]")}>{stocks[9].name}</span>
         <span className={cn("text-white/90 font-mono", expanded ? "text-sm" : "text-[10px]")}>+{stocks[9].change}%</span>
      </div>

      {/* R5, C4: KB Financial */}
       <div 
        onClick={() => expanded && setSelectedStock(stocks[10])}
        className={cn(
        "bg-red-400/80 hover:bg-red-400 transition-colors rounded-sm flex flex-col items-center justify-center cursor-pointer",
        expanded ? "col-span-1 row-span-2 p-2 ring-2 ring-transparent hover:ring-white/50" : "col-span-1 row-span-1 p-1",
        expanded && selectedStock?.name === stocks[10].name && "ring-white ring-2 z-10"
      )}>
         <span className={cn("font-semibold text-white truncate w-full text-center", expanded ? "text-sm" : "text-[10px]")}>{stocks[10].name}</span>
         <span className={cn("text-white/90 font-mono", expanded ? "text-sm" : "text-[10px]")}>+{stocks[10].change}%</span>
      </div>

    </div>
  );

  return (
    <Dialog onOpenChange={(open) => !open && setSelectedStock(null)}>
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
      
      <DialogContent className="max-w-[95vw] h-[90vh] flex flex-col p-0 gap-0 bg-[#0B0E14] border-border/50 overflow-hidden">
        <DialogHeader className="p-4 border-b border-border/50 flex flex-row items-center justify-between space-y-0 shrink-0">
          <div className="flex items-center gap-4">
             <DialogTitle className="text-xl font-bold flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Market Map Analysis
             </DialogTitle>
             <div className="flex gap-3">
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground"><span className="w-3 h-3 bg-red-500 rounded-sm"></span>Bullish</span>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground"><span className="w-3 h-3 bg-blue-500 rounded-sm"></span>Bearish</span>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex flex-1 overflow-hidden">
            {/* Left: Interactive Heatmap */}
            <div className="flex-1 p-6 overflow-hidden border-r border-border/50">
                <HeatmapContent expanded={true} />
            </div>

            {/* Right: Analysis & Details Sidebar */}
            <div className="w-[350px] flex flex-col bg-secondary/10 shrink-0">
                {/* AI Analysis Section */}
                <div className="p-6 border-b border-border/50 flex-1 overflow-y-auto">
                    <h3 className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" /> AI Market Insight
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        The semiconductor sector is currently leading the market with strong buying pressure, driven by increased demand for AI chips. <br/><br/>
                        <span className="text-foreground font-semibold">Samsung Electronics</span> and <span className="text-foreground font-semibold">SK Hynix</span> are showing significant gains, contributing to the overall bullish sentiment. <br/><br/>
                        Conversely, the secondary battery sector is experiencing a slight correction, with <span className="text-foreground font-semibold">LG Energy Solution</span> and <span className="text-foreground font-semibold">POSCO Holdings</span> trading lower.
                    </p>
                </div>

                {/* Selected Stock Details Section */}
                <div className="p-6 bg-card/30 min-h-[250px]">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Selected Stock</h3>
                    
                    {selectedStock ? (
                        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-2xl font-bold text-white">{selectedStock.name}</h2>
                                    <p className="text-sm text-muted-foreground font-mono">{selectedStock.code}</p>
                                </div>
                                <span className={cn(
                                    "text-xl font-mono font-bold",
                                    selectedStock.change > 0 ? "text-red-400" : "text-blue-400"
                                )}>
                                    {selectedStock.change > 0 ? '+' : ''}{selectedStock.change}%
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-2 mt-2">
                                <div className="p-3 bg-secondary/30 rounded-lg border border-border/50">
                                    <p className="text-[10px] text-muted-foreground">Current Price</p>
                                    <p className="text-lg font-mono font-medium">Wait...</p>
                                </div>
                                <div className="p-3 bg-secondary/30 rounded-lg border border-border/50">
                                    <p className="text-[10px] text-muted-foreground">Market Value</p>
                                    <p className="text-lg font-mono font-medium">{selectedStock.value}T</p>
                                </div>
                            </div>

                            <Button className="w-full mt-2 gap-2" variant="secondary">
                                View Details <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground py-8">
                            <div className="w-12 h-12 rounded-full bg-secondary/30 flex items-center justify-center mb-3">
                                <Maximize2 className="w-6 h-6 opacity-50" />
                            </div>
                            <p className="text-sm">Select a stock block from the heatmap to view details.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Importing Sparkles specifically since it wasn't in the initial import list
import { Sparkles } from "lucide-react";