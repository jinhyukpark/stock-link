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
  // Level 2 additions
  { id: "shinhan", name: "Shinhan", code: "055550", value: 42, change: 0.80, price: "42,500", sector: "Finance" },
  { id: "hana", name: "Hana Financial", code: "086790", value: 38, change: 1.10, price: "51,200", sector: "Finance" },
  { id: "ncsoft", name: "NCSOFT", code: "036570", value: 35, change: -1.50, price: "192,000", sector: "Tech" },
  { id: "krafton", name: "Krafton", code: "259960", value: 32, change: 2.20, price: "248,000", sector: "Tech" },
  // Level 3 additions
  { id: "samsung_sdi", name: "Samsung SDI", code: "006400", value: 65, change: -0.90, price: "352,000", sector: "Battery" },
  { id: "lg_chem", name: "LG Chem", code: "051910", value: 58, change: 0.40, price: "298,000", sector: "Battery" },
  { id: "hanwha", name: "Hanwha Aero", code: "012450", value: 48, change: 4.20, price: "185,000", sector: "Defense" },
  { id: "hyundai_mobis", name: "Hyundai Mobis", code: "012330", value: 44, change: 1.80, price: "232,000", sector: "Auto" },
  { id: "kt", name: "KT Corp", code: "030200", value: 28, change: 0.30, price: "38,500", sector: "Telecom" },
  { id: "skt", name: "SK Telecom", code: "017670", value: 30, change: 0.60, price: "52,800", sector: "Telecom" },
];

export default function MarketMapView() {
  const [selectedStock, setSelectedStock] = useState<StockNode | null>(null);
  const [detailLevel, setDetailLevel] = useState(1); // 1: Minimum (current), 2: Medium, 3: Maximum
  const [isExpanded, setIsExpanded] = useState(false);

  // Helper to determine visibility levels
  const showLevel2 = detailLevel >= 2;
  const showLevel3 = detailLevel >= 3;

  return (
    <div className={cn(
        "flex flex-col h-[calc(100vh-12rem)] animate-in fade-in duration-500",
        isExpanded ? "fixed inset-0 z-50 bg-[#0B0E14] p-6 h-screen" : "relative"
    )}>
      
      {/* Header */}
      <div className="flex justify-start items-center mb-4 shrink-0">
         <div className="flex items-center gap-2">
            <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 bg-[#151921] border-white/10 hover:bg-primary/20 hover:border-primary/50 transition-all" 
                onClick={() => setDetailLevel(Math.min(detailLevel + 1, 3))}
                disabled={detailLevel >= 3}
            >
                <ZoomIn className={cn("w-4 h-4", detailLevel >= 3 ? "text-gray-600" : "text-gray-400")} />
            </Button>
            <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 bg-[#151921] border-white/10 hover:bg-primary/20 hover:border-primary/50 transition-all" 
                onClick={() => setDetailLevel(Math.max(detailLevel - 1, 1))}
                disabled={detailLevel <= 1}
            >
                <ZoomOut className={cn("w-4 h-4", detailLevel <= 1 ? "text-gray-600" : "text-gray-400")} />
            </Button>
            <div className="text-[10px] text-gray-500 font-mono px-2 border-l border-white/10 ml-1">
                종목 수: {detailLevel === 1 ? "11" : detailLevel === 2 ? "15" : "21"}
            </div>
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
                className="w-full h-full grid grid-cols-4 grid-rows-3 gap-[1px] bg-[#0B0E14] border-r border-white/10"
              >
                  {/* Row 1: Samsung (Left 2x2), SK Hynix (Right Top 2x1) */}
                  <div className="col-span-2 row-span-2">
                      <StockBlock stock={marketData[0]} onClick={setSelectedStock} selected={selectedStock?.id === marketData[0].id} size="xl" />
                  </div>
                  <div className="col-span-2 row-span-1">
                      <StockBlock stock={marketData[1]} onClick={setSelectedStock} selected={selectedStock?.id === marketData[1].id} size="lg" />
                  </div>

                  {/* Row 2: LG Energy (Mid Right 2x1 -> actually let's split this area) */}
                  {/* Right side lower block */}
                  <div className="col-span-1 row-span-1 flex flex-col gap-[1px] bg-[#0B0E14]">
                      <StockBlock 
                        stock={marketData[2]} 
                        onClick={setSelectedStock} 
                        selected={selectedStock?.id === marketData[2].id} 
                        className={showLevel3 ? "flex-1" : "h-full"} 
                        size="md" 
                      />
                      {showLevel3 && (
                        <StockBlock stock={marketData[15]} onClick={setSelectedStock} selected={selectedStock?.id === marketData[15].id} className="h-1/3" size="sm" />
                      )}
                  </div>
                   <div className="col-span-1 row-span-1 flex flex-col gap-[1px] bg-[#0B0E14]">
                      <StockBlock 
                        stock={marketData[6]} 
                        onClick={setSelectedStock} 
                        selected={selectedStock?.id === marketData[6].id} 
                        className={showLevel2 ? "h-1/2" : "h-full"} 
                        size={showLevel2 ? "sm" : "md"} 
                      />
                      {showLevel2 && (
                        <StockBlock stock={marketData[7]} onClick={setSelectedStock} selected={selectedStock?.id === marketData[7].id} className="h-1/2" size="sm" />
                      )}
                  </div>

                  {/* Row 3: Bottom Row */}
                  <div className="col-span-1 row-span-1 flex flex-col gap-[1px] bg-[#0B0E14]">
                      <StockBlock 
                        stock={marketData[4]} 
                        onClick={setSelectedStock} 
                        selected={selectedStock?.id === marketData[4].id} 
                        className={showLevel2 ? "flex-1" : "h-full"} 
                        size="md" 
                       />
                      {showLevel2 && (
                        <StockBlock stock={marketData[8]} onClick={setSelectedStock} selected={selectedStock?.id === marketData[8].id} className={showLevel3 ? "h-1/4" : "h-1/3"} size="sm" />
                      )}
                      {showLevel3 && (
                        <StockBlock stock={marketData[16]} onClick={setSelectedStock} selected={selectedStock?.id === marketData[16].id} className="h-1/4" size="sm" />
                      )}
                  </div>
                  <div className="col-span-1 row-span-1 flex flex-col gap-[1px] bg-[#0B0E14]">
                      <StockBlock 
                        stock={marketData[5]} 
                        onClick={setSelectedStock} 
                        selected={selectedStock?.id === marketData[5].id} 
                        className={showLevel2 ? "flex-1" : "h-full"} 
                        size="md" 
                       />
                      {showLevel2 && (
                        <StockBlock stock={marketData[9]} onClick={setSelectedStock} selected={selectedStock?.id === marketData[9].id} className={showLevel3 ? "h-1/4" : "h-1/4"} size="sm" />
                      )}
                      {showLevel3 && (
                        <StockBlock stock={marketData[17]} onClick={setSelectedStock} selected={selectedStock?.id === marketData[17].id} className="h-1/4" size="sm" />
                      )}
                  </div>
                  <div className="col-span-1 row-span-1 flex flex-col gap-[1px] bg-[#0B0E14]">
                      <StockBlock 
                        stock={marketData[3]} 
                        onClick={setSelectedStock} 
                        selected={selectedStock?.id === marketData[3].id} 
                        className={showLevel2 ? "flex-1" : "h-full"} 
                        size="md" 
                      />
                      {showLevel2 && (
                        <StockBlock stock={marketData[10]} onClick={setSelectedStock} selected={selectedStock?.id === marketData[10].id} className={showLevel3 ? "h-1/4" : "h-1/4"} size="sm" />
                      )}
                      {showLevel3 && (
                        <StockBlock stock={marketData[18]} onClick={setSelectedStock} selected={selectedStock?.id === marketData[18].id} className="h-1/4" size="sm" />
                      )}
                  </div>
                   {/* Extra stocks at level 2+ */}
                   <div className="col-span-1 row-span-1 flex flex-col gap-[1px] bg-[#0B0E14]">
                      {showLevel2 ? (
                        <>
                          <StockBlock stock={marketData[11]} onClick={setSelectedStock} selected={selectedStock?.id === marketData[11].id} className={showLevel3 ? "flex-1" : "h-1/2"} size="sm" />
                          <StockBlock stock={marketData[12]} onClick={setSelectedStock} selected={selectedStock?.id === marketData[12].id} className={showLevel3 ? "flex-1" : "h-1/2"} size="sm" />
                          {showLevel3 && (
                            <>
                              <StockBlock stock={marketData[19]} onClick={setSelectedStock} selected={selectedStock?.id === marketData[19].id} className="flex-1" size="sm" />
                              <StockBlock stock={marketData[20]} onClick={setSelectedStock} selected={selectedStock?.id === marketData[20].id} className="flex-1" size="sm" />
                            </>
                          )}
                        </>
                      ) : (
                        <div className="w-full h-full bg-[#151921]" />
                      )}
                  </div>
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

function StockBlock({ stock, onClick, selected, className, size = 'sm' }: { stock: StockNode, onClick: (s: StockNode) => void, selected: boolean, className?: string, size?: 'xl' | 'lg' | 'md' | 'sm' }) {
    const isBullish = stock.change > 0;
    const bgColor = isBullish 
        ? stock.change > 3 ? "bg-[#ef4444]" : "bg-[#b91c1c]"
        : stock.change < -2 ? "bg-[#172554]" : "bg-[#3b82f6]";
    
    const sizeConfig = {
        xl: { name: "text-3xl md:text-5xl", change: "text-xl md:text-3xl", info: "text-sm md:text-xl", padding: "p-6" },
        lg: { name: "text-2xl md:text-4xl", change: "text-lg md:text-2xl", info: "text-xs md:text-lg", padding: "p-4" },
        md: { name: "text-lg md:text-2xl", change: "text-base md:text-xl", info: "text-[10px] md:text-sm", padding: "p-3" },
        sm: { name: "text-xs md:text-sm", change: "text-[10px] md:text-xs", info: "text-[9px] md:text-[10px]", padding: "p-1 md:p-2" }
    };

    const { name: nameSize, change: changeSize, info: infoSize, padding } = sizeConfig[size];

    return (
        <motion.div 
            layoutId={stock.id}
            onClick={() => onClick(stock)}
            className={cn(
                "w-full h-full flex flex-col items-center justify-center cursor-pointer transition-all duration-200 hover:brightness-110 hover:z-10 hover:scale-[1.02]",
                padding,
                bgColor,
                selected ? "ring-2 ring-white z-20 shadow-xl scale-[1.02]" : "border border-black/10",
                className
            )}
        >
            <span className={cn("font-bold text-white text-center leading-tight drop-shadow-md truncate w-full", nameSize)}>
                {stock.name}
            </span>
            <span className={cn("font-mono text-white/90 drop-shadow-md", changeSize)}>
                {stock.change > 0 ? "+" : ""}{stock.change}%
            </span>
            <span className={cn("text-white/60 font-mono mt-1 hidden sm:block", infoSize)}>
                {stock.code} | {stock.value}T KRW
            </span>
        </motion.div>
    );
}
