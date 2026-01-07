import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  Maximize2, 
  Minimize2, 
  Info, 
  ZoomIn, 
  ZoomOut,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// --- Mock Data ---
type StockNode = {
  id: string;
  name: string;
  code: string;
  value: number; // Market Cap or similar weight
  change: number; // Percentage change
  price: string;
  sector: string;
};

const marketData: StockNode[] = [
  { id: "samsung", name: "Samsung Elec", code: "005930", value: 400, change: 2.14, price: "78,200", sector: "Semiconductor" },
  { id: "sk", name: "SK Hynix", code: "000660", value: 300, change: 6.84, price: "142,000", sector: "Semiconductor" },
  { id: "lg", name: "LG Energy", code: "373220", value: 200, change: -1.20, price: "392,000", sector: "Battery" },
  { id: "hyundai", name: "Hyundai Motor", code: "005380", value: 100, change: 3.40, price: "245,000", sector: "Auto" },
  { id: "kia", name: "Kia", code: "000270", value: 80, change: 2.80, price: "112,000", sector: "Auto" },
  { id: "posco", name: "POSCO", code: "005490", value: 90, change: -0.80, price: "420,000", sector: "Steel" },
  { id: "sbi", name: "Samsung Bio", code: "207940", value: 70, change: 0.50, price: "810,000", sector: "Bio" },
  { id: "naver", name: "NAVER", code: "035420", value: 60, change: 1.20, price: "205,000", sector: "Tech" },
  { id: "kakao", name: "Kakao", code: "035720", value: 50, change: -2.10, price: "54,000", sector: "Tech" },
  { id: "celltrion", name: "Celltrion", code: "068270", value: 55, change: 0.90, price: "182,000", sector: "Bio" },
  { id: "kb", name: "KB Financial", code: "105560", value: 45, change: 1.50, price: "68,000", sector: "Finance" },
];

export default function MarketMapView() {
  const [selectedStock, setSelectedStock] = useState<StockNode | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);

  // Helper to get color based on change
  const getBlockColor = (change: number) => {
    if (change > 3) return "bg-[#ef4444]"; // Bright Red
    if (change > 0) return "bg-[#b91c1c]"; // Red
    if (change > -1) return "bg-[#1d4ed8]"; // Blue
    return "bg-[#1e3a8a]"; // Dark Blue
  };

  const getBlockSizeClass = (id: string) => {
    // Hardcoded layout classes to match the mockup visual
    switch(id) {
        case "samsung": return "col-span-2 row-span-2 text-3xl";
        case "sk": return "col-span-2 row-span-1 text-2xl";
        case "lg": return "col-span-1 row-span-1 text-xl";
        case "hyundai": return "col-span-1 row-span-1 text-lg";
        case "kia": return "col-span-1 row-span-1 text-base";
        case "posco": return "col-span-1 row-span-1 text-base";
        case "sbi": return "col-span-1 row-span-1 text-xs";
        case "naver": return "col-span-1 row-span-1 text-xs";
        default: return "col-span-1 text-xs";
    }
  };

  return (
    <div className={cn(
        "flex flex-col h-[calc(100vh-12rem)] animate-in fade-in duration-500",
        isExpanded ? "fixed inset-0 z-50 bg-[#0B0E14] p-6 h-screen" : "relative"
    )}>
      
      {/* Header */}
      <div className="flex justify-end items-center mb-4 shrink-0">
         <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8 bg-[#151921] border-white/10" onClick={() => setZoomLevel(Math.min(zoomLevel + 0.1, 2))}>
                <ZoomIn className="w-4 h-4 text-gray-400" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8 bg-[#151921] border-white/10" onClick={() => setZoomLevel(Math.max(zoomLevel - 0.1, 0.5))}>
                <ZoomOut className="w-4 h-4 text-gray-400" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white" onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
         </div>
      </div>

      <div className="flex flex-1 gap-0 min-h-0 border-t border-white/10">
          {/* Main Map Area */}
          <div className="flex-1 bg-[#151921] p-0 overflow-hidden relative group">
              
              {/* This Grid Layout mimics a treemap */}
              <div 
                className="w-full h-full grid grid-cols-4 grid-rows-3 gap-[1px] bg-[#0B0E14] transition-transform duration-300 origin-top-left border-r border-white/10"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                  {/* Row 1: Samsung (Left 2x2), SK Hynix (Right Top 2x1) */}
                  <div className="col-span-2 row-span-2">
                      <StockBlock stock={marketData[0]} onClick={setSelectedStock} selected={selectedStock?.id === marketData[0].id} />
                  </div>
                  <div className="col-span-2 row-span-1">
                      <StockBlock stock={marketData[1]} onClick={setSelectedStock} selected={selectedStock?.id === marketData[1].id} />
                  </div>

                  {/* Row 2: LG Energy (Mid Right 2x1 -> actually let's split this area) */}
                  {/* Right side lower block */}
                  <div className="col-span-1 row-span-1">
                      <StockBlock stock={marketData[2]} onClick={setSelectedStock} selected={selectedStock?.id === marketData[2].id} />
                  </div>
                   <div className="col-span-1 row-span-1 flex flex-col gap-[1px] bg-[#0B0E14]">
                      <StockBlock stock={marketData[6]} onClick={setSelectedStock} selected={selectedStock?.id === marketData[6].id} className="h-1/2" />
                      <StockBlock stock={marketData[7]} onClick={setSelectedStock} selected={selectedStock?.id === marketData[7].id} className="h-1/2" />
                  </div>

                  {/* Row 3: Bottom Row */}
                  <div className="col-span-1 row-span-1 flex flex-col gap-[1px] bg-[#0B0E14]">
                      <StockBlock stock={marketData[4]} onClick={setSelectedStock} selected={selectedStock?.id === marketData[4].id} className="flex-1" />
                      <StockBlock stock={marketData[8]} onClick={setSelectedStock} selected={selectedStock?.id === marketData[8].id} className="h-1/3" />
                  </div>
                  <div className="col-span-1 row-span-1 flex flex-col gap-[1px] bg-[#0B0E14]">
                      <StockBlock stock={marketData[5]} onClick={setSelectedStock} selected={selectedStock?.id === marketData[5].id} className="flex-1" />
                      <StockBlock stock={marketData[9]} onClick={setSelectedStock} selected={selectedStock?.id === marketData[9].id} className="h-1/4" />
                  </div>
                  <div className="col-span-1 row-span-1 flex flex-col gap-[1px] bg-[#0B0E14]">
                      <StockBlock stock={marketData[3]} onClick={setSelectedStock} selected={selectedStock?.id === marketData[3].id} className="flex-1" />
                      <StockBlock stock={marketData[10]} onClick={setSelectedStock} selected={selectedStock?.id === marketData[10].id} className="h-1/4" />
                  </div>
                   {/* Empty space filler or extra stocks */}
                   <div className="col-span-1 row-span-1 bg-[#151921]" />
              </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-80 flex flex-col shrink-0 bg-[#151921]">
              
              {/* AI Insight */}
              <div className="p-6 flex-1 flex flex-col border-b border-white/10">
                  <div className="flex items-center gap-2 mb-4 text-blue-400">
                      <Sparkles className="w-4 h-4" />
                      <h3 className="font-bold text-sm">AI Market Insight</h3>
                  </div>
                  <div className="space-y-4 text-sm text-gray-400 leading-relaxed overflow-y-auto pr-2 custom-scrollbar">
                      <p>
                        The <span className="text-white font-bold">semiconductor sector</span> is currently leading the market with strong buying pressure, driven by increased demand for AI chips.
                      </p>
                      <p>
                        <span className="text-red-400 font-bold">Samsung Electronics</span> and <span className="text-red-400 font-bold">SK Hynix</span> are showing significant gains, contributing to the overall bullish sentiment.
                      </p>
                      <div className="h-px bg-white/5 my-2" />
                      <p>
                        Conversely, the <span className="text-white font-bold">secondary battery sector</span> is experiencing a slight correction, with <span className="text-blue-400 font-bold">LG Energy Solution</span> and <span className="text-blue-400 font-bold">POSCO Holdings</span> trading lower.
                      </p>
                  </div>
              </div>

              {/* Selected Stock Info */}
              <div className="p-6 h-64 shrink-0 flex flex-col justify-center bg-[#12141a]">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Selected Stock</div>
                  
                  {selectedStock ? (
                      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                          <div className="flex justify-between items-start">
                              <div>
                                  <h2 className="text-2xl font-bold text-white">{selectedStock.name}</h2>
                                  <p className="text-sm text-gray-500 font-mono">{selectedStock.code}</p>
                              </div>
                              <Badge className={cn(
                                  "text-sm px-2 py-1", 
                                  selectedStock.change > 0 ? "bg-red-500/20 text-red-400 hover:bg-red-500/30" : "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                              )}>
                                  {selectedStock.change > 0 ? "+" : ""}{selectedStock.change}%
                              </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                              <div>
                                  <p className="text-xs text-gray-500 mb-1">Current Price</p>
                                  <p className="text-lg font-mono font-bold text-white">{selectedStock.price} KRW</p>
                              </div>
                              <div>
                                  <p className="text-xs text-gray-500 mb-1">Market Cap</p>
                                  <p className="text-lg font-mono font-bold text-white">{selectedStock.value}T KRW</p>
                              </div>
                          </div>
                          
                          <Button className="w-full mt-2 bg-white/5 hover:bg-white/10 text-xs h-8 border border-white/10">
                              View Details <ArrowUpRight className="w-3 h-3 ml-1" />
                          </Button>
                      </div>
                  ) : (
                      <div className="text-center text-gray-500 flex flex-col items-center">
                          <Maximize2 className="w-8 h-8 mb-3 opacity-20" />
                          <p className="text-sm">Select a stock block from the heatmap to view details.</p>
                      </div>
                  )}
              </div>
          </div>
      </div>
    </div>
  );
}

function StockBlock({ stock, onClick, selected, className }: { stock: StockNode, onClick: (s: StockNode) => void, selected: boolean, className?: string }) {
    const isBullish = stock.change > 0;
    const bgColor = isBullish 
        ? stock.change > 3 ? "bg-[#ef4444]" : "bg-[#b91c1c]"
        : stock.change < -2 ? "bg-[#172554]" : "bg-[#3b82f6]";
    
    return (
        <motion.div 
            layoutId={stock.id}
            onClick={() => onClick(stock)}
            className={cn(
                "w-full h-full flex flex-col items-center justify-center p-2 cursor-pointer transition-all duration-200 hover:brightness-110 hover:z-10 hover:scale-[1.02]",
                bgColor,
                selected ? "ring-2 ring-white z-20 shadow-xl scale-[1.02]" : "border border-black/10",
                className
            )}
        >
            <span className="font-bold text-white text-center leading-tight drop-shadow-md truncate w-full">
                {stock.name}
            </span>
            <span className="font-mono text-white/90 text-sm drop-shadow-md">
                {stock.change > 0 ? "+" : ""}{stock.change}%
            </span>
            <span className="text-[10px] text-white/60 font-mono mt-1 hidden sm:block">
                {stock.code} | {stock.value}T KRW
            </span>
        </motion.div>
    );
}
