import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { 
  Search, 
  Settings, 
  ZoomIn, 
  ZoomOut, 
  Maximize, 
  RotateCcw, 
  MoreHorizontal, 
  Layers, 
  Filter, 
  Share2, 
  Info, 
  ChevronLeft,
  ChevronDown,
  LayoutGrid,
  Database,
  Cpu,
  Zap,
  Factory,
  Car,
  ShoppingCart
} from "lucide-react";
import { useState, useMemo } from "react";

// --- Mock Data ---

const stockList = [
  { rank: 1, name: "계양전기", price: "6,630", change: "+30.00%", up: true, icon: Zap, color: "bg-red-500" },
  { rank: 2, name: "계양전기우", price: "12,480", change: "+30.00%", up: true, icon: Zap, color: "bg-red-500" },
  { rank: 3, name: "삼마금속", price: "13,230", change: "+29.96%", up: true, icon: Factory, color: "bg-red-500" },
  { rank: 4, name: "한화갤러리아우", price: "9,420", change: "+29.93%", up: true, icon: ShoppingCart, color: "bg-orange-500" },
  { rank: 5, name: "라온테크", price: "13,940", change: "+29.92%", up: true, icon: Cpu, color: "bg-blue-500" },
  { rank: 6, name: "남선알미우", price: "21,100", change: "+29.89%", up: true, icon: Factory, color: "bg-orange-500" },
  { rank: 7, name: "삼보모터스", price: "5,220", change: "+29.85%", up: true, icon: Car, color: "bg-blue-500" },
  { rank: 8, name: "휴림로봇", price: "7,980", change: "+28.71%", up: true, icon: Cpu, color: "bg-green-500" },
  { rank: 9, name: "성호전자", price: "9,430", change: "+19.87%", up: true, icon: Zap, color: "bg-red-500" },
  { rank: 10, name: "원익홀딩스", price: "47,750", change: "+19.08%", up: true, icon: Cpu, color: "bg-blue-500" },
  { rank: 11, name: "TPC", price: "3,285", change: "+19.02%", up: true, icon: Factory, color: "bg-orange-500" },
  { rank: 12, name: "에이치브이엠", price: "59,400", change: "+16.93%", up: true, icon: Database, color: "bg-white" },
  { rank: 13, name: "한국캐스트", price: "21,350", change: "+16.54%", up: true, icon: Factory, color: "bg-gray-400" },
  { rank: 14, name: "대주산업", price: "3,235", change: "+15.54%", up: true, icon: Factory, color: "bg-red-500" },
  { rank: 15, name: "세미파이브", price: "27,650", change: "+15.21%", up: true, icon: Cpu, color: "bg-gray-400" },
  { rank: 16, name: "자화전자", price: "25,600", change: "+13.27%", up: true, icon: Zap, color: "bg-green-500" },
];

const legendItems = [
  { label: "급등(+15% 이상)", color: "bg-red-500", count: 15, pct: "2.39%" },
  { label: "강세(+10%~+15%)", color: "bg-orange-400", count: 8, pct: "1.27%" },
  { label: "상승(+5%~+10%)", color: "bg-yellow-400", count: 37, pct: "5.89%" },
  { label: "소폭상승(+1%~+5%)", color: "bg-green-400", count: 138, pct: "21.97%" },
  { label: "보합(-1%~+1%)", color: "bg-gray-400", count: 311, pct: "49.52%" },
  { label: "소폭하락(-1%~-5%)", color: "bg-blue-300", count: 95, pct: "15.13%" },
  { label: "하락(-5%~-10%)", color: "bg-blue-500", count: 20, pct: "3.18%" },
  { label: "약세(-10%~-15%)", color: "bg-indigo-500", count: 4, pct: "0.64%" },
  { label: "급락(-15% 이하)", color: "bg-purple-500", count: 0, pct: "0%" },
  { label: "정보없음", color: "bg-gray-700", count: 0, pct: "0%" },
];

const GraphNode = ({ x, y, size, color, label, pulse }: { x: string, y: string, size: number, color: string, label?: string, pulse?: boolean }) => (
  <div 
    className="absolute rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000"
    style={{ left: x, top: y, width: size, height: size }}
  >
    {pulse && (
       <div className={cn("absolute inset-0 rounded-full animate-ping opacity-20", color)}></div>
    )}
    <div className={cn("w-full h-full rounded-full shadow-lg border border-white/20 hover:scale-125 transition-transform cursor-pointer z-10", color)}></div>
    {label && (
      <span className="absolute top-full mt-1 text-[10px] text-white/80 whitespace-nowrap bg-black/50 px-1 rounded z-20 pointer-events-none">
        {label}
      </span>
    )}
    {/* Connections */}
    <svg className="absolute top-1/2 left-1/2 w-[200px] h-[200px] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20 -z-10">
       <line x1="50%" y1="50%" x2={Math.random() * 100 + "%"} y2={Math.random() * 100 + "%"} stroke="white" strokeWidth="1" />
       <line x1="50%" y1="50%" x2={Math.random() * 100 + "%"} y2={Math.random() * 100 + "%"} stroke="white" strokeWidth="1" />
    </svg>
  </div>
);

export default function OntologyPage() {
  const [activeTab, setActiveTab] = useState("theme"); // theme, industry, keyword

  // Generate random nodes for visual effect
  const nodes = useMemo(() => {
    const generated = [];
    // Center cluster
    for (let i = 0; i < 20; i++) {
       generated.push({
         x: `${50 + (Math.random() - 0.5) * 30}%`,
         y: `${50 + (Math.random() - 0.5) * 30}%`,
         size: Math.random() * 30 + 10,
         color: ["bg-red-500", "bg-orange-400", "bg-blue-400", "bg-yellow-400", "bg-gray-400"][Math.floor(Math.random() * 5)],
         label: i < 8 ? ["삼성전자", "SK하이닉스", "LG에너지솔루션", "POSCO홀딩스", "NAVER", "카카오", "현대차", "기아"][i] : undefined,
         pulse: Math.random() > 0.8
       });
    }
    // Outer ring
    for (let i = 0; i < 150; i++) {
        const angle = (i / 150) * Math.PI * 2;
        const radius = 40 + Math.random() * 5; // 40-45% radius
        generated.push({
            x: `${50 + Math.cos(angle) * radius}%`,
            y: `${50 + Math.sin(angle) * radius}%`,
            size: Math.random() * 8 + 4,
            color: ["bg-green-400", "bg-green-500/50", "bg-yellow-400/80", "bg-gray-500/50"][Math.floor(Math.random() * 4)],
            pulse: false
        });
    }
    return generated;
  }, []);

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-4rem)] bg-[#050505] text-white font-sans overflow-hidden">
        
        {/* Left Sidebar */}
        <aside className="w-[340px] flex flex-col border-r border-white/10 bg-[#0B0E14] z-20">
            {/* Sidebar Header */}
            <div className="p-0">
                <div className="flex border-b border-white/10">
                    {['종목', '테마', '산업분류', '키워드'].map((tab) => (
                        <button 
                            key={tab}
                            className={cn(
                                "flex-1 py-3 text-xs font-medium transition-colors hover:bg-white/5",
                                tab === '종목' ? "text-white border-b-2 border-primary" : "text-gray-500"
                            )}
                        >
                            {tab}
                        </button>
                    ))}
                    <button className="px-3 border-l border-white/10 hover:bg-white/5">
                        <ChevronLeft className="w-4 h-4 text-gray-500" />
                    </button>
                </div>
                
                <div className="p-3 bg-blue-500/10 border-b border-blue-500/20">
                    <div className="flex items-start gap-2 text-[11px] text-blue-300">
                        <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                        <p>실제 거래 시점과 10분 정도의 차이가 있을 수 있습니다.</p>
                    </div>
                </div>

                <div className="p-3 border-b border-white/10 flex gap-2">
                    <div className="relative flex-1">
                        <Input 
                            placeholder="종목명을 입력해 주세요." 
                            className="h-8 bg-[#151921] border-white/10 text-xs pl-8 placeholder:text-gray-600 focus:border-white/20 rounded-sm"
                        />
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                    </div>
                    <Button variant="outline" size="sm" className="h-8 px-2 bg-[#151921] border-white/10 text-gray-400 hover:text-white rounded-sm">
                        <Filter className="w-3.5 h-3.5" />
                        <span className="ml-1 text-xs">등락률</span>
                        <ChevronDown className="w-3 h-3 ml-1 opacity-50" />
                    </Button>
                </div>

                {/* List Header */}
                <div className="flex text-[10px] text-gray-500 px-4 py-2 bg-[#0f1115] border-b border-white/5">
                    <span className="w-8 text-center">순위</span>
                    <span className="flex-1">종목명</span>
                    <div className="flex gap-4 text-right">
                        <span className="w-16">현재가</span>
                        <span className="w-16">등락률</span>
                    </div>
                </div>
            </div>

            {/* Stock List */}
            <ScrollArea className="flex-1 bg-[#0B0E14]">
                <div className="flex flex-col">
                    {stockList.map((stock) => (
                        <div key={stock.rank} className="flex items-center px-4 py-2.5 border-b border-white/5 hover:bg-white/5 cursor-pointer group transition-colors">
                            <span className="w-8 text-center text-xs font-mono text-gray-500">{stock.rank}</span>
                            <div className="flex-1 flex items-center gap-2 overflow-hidden">
                                <div className={cn("w-5 h-5 rounded flex items-center justify-center shrink-0", stock.color)}>
                                    <stock.icon className="w-3 h-3 text-white" />
                                </div>
                                <span className="text-xs font-bold text-gray-200 truncate group-hover:text-white">{stock.name}</span>
                            </div>
                            <div className="flex gap-4 text-right items-center">
                                <span className="w-16 text-xs font-mono text-gray-300">{stock.price}원</span>
                                <div className="w-16 text-right">
                                    <span className="text-xs font-mono font-bold text-red-400">{stock.change}</span>
                                    <div className="text-[9px] text-red-500/70 flex justify-end items-center gap-0.5">
                                        ▲ 1,530
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* Repeat for scroll effect */}
                    {stockList.map((stock) => (
                        <div key={`dup-${stock.rank}`} className="flex items-center px-4 py-2.5 border-b border-white/5 hover:bg-white/5 cursor-pointer group transition-colors">
                            <span className="w-8 text-center text-xs font-mono text-gray-500">{stock.rank + 16}</span>
                            <div className="flex-1 flex items-center gap-2 overflow-hidden">
                                <div className={cn("w-5 h-5 rounded flex items-center justify-center shrink-0", stock.color)}>
                                    <stock.icon className="w-3 h-3 text-white" />
                                </div>
                                <span className="text-xs font-bold text-gray-200 truncate group-hover:text-white">{stock.name}</span>
                            </div>
                            <div className="flex gap-4 text-right items-center">
                                <span className="w-16 text-xs font-mono text-gray-300">{stock.price}원</span>
                                <div className="w-16 text-right">
                                    <span className="text-xs font-mono font-bold text-red-400">{stock.change}</span>
                                    <div className="text-[9px] text-red-500/70 flex justify-end items-center gap-0.5">
                                        ▲ 1,530
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
            
            {/* Sidebar Footer */}
             <div className="p-3 bg-[#0f1115] border-t border-white/10">
                 <div className="flex items-center gap-2 mb-2">
                     <span className="bg-primary/20 text-primary text-[10px] font-bold px-1.5 py-0.5 rounded">Beta</span>
                     <span className="text-[10px] text-gray-400">현재 베타 버전에서는 10분 지연 주식 정보를 제공합니다.</span>
                 </div>
                 <div className="text-[10px] text-gray-600 font-mono">
                     (12-29 22:11 KST)
                 </div>
             </div>
        </aside>

        {/* Main Graph Area */}
        <main className="flex-1 relative bg-black overflow-hidden flex flex-col">
            
            {/* Top Toolbar overlay */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 bg-[#151921]/90 backdrop-blur border border-white/10 rounded-full px-2 py-1.5 shadow-xl">
                 <Button variant="ghost" size="sm" className="h-7 text-xs text-gray-400 hover:text-white hover:bg-white/10 rounded-full px-3">
                    관계 주식 <span className="text-blue-400 ml-1">테마</span>
                 </Button>
                 <div className="w-px h-3 bg-white/10"></div>
                 <Button variant="ghost" size="sm" className="h-7 text-xs text-gray-400 hover:text-white hover:bg-white/10 rounded-full px-3">
                    종목수 <span className="text-blue-400 ml-1">628</span>
                 </Button>
                 <div className="w-px h-3 bg-white/10"></div>
                 <Button variant="ghost" size="sm" className="h-7 text-xs text-gray-400 hover:text-white hover:bg-white/10 rounded-full px-3">
                    관계수 <span className="text-blue-400 ml-1">351</span>
                 </Button>
                 <div className="w-px h-3 bg-white/10"></div>
                 <Button variant="ghost" size="sm" className="h-7 text-xs text-gray-400 hover:text-white hover:bg-white/10 rounded-full px-3">
                    평균지수 <span className="text-red-400 ml-1">0.03%</span>
                 </Button>
                 <div className="w-px h-3 bg-white/10"></div>
                 <Button variant="ghost" size="sm" className="h-7 text-xs text-gray-400 hover:text-white hover:bg-white/10 rounded-full px-3">
                    <RotateCcw className="w-3 h-3 mr-1" /> 종목비교
                 </Button>
            </div>

            {/* Left Floating Toolbar */}
            <div className="absolute left-4 top-4 z-30 flex flex-col gap-1">
                 <Button variant="secondary" size="icon" className="h-8 w-8 rounded bg-[#151921]/80 border border-white/10 text-gray-400 hover:text-white">
                    <Database className="w-4 h-4" />
                 </Button>
                 <Button variant="secondary" size="icon" className="h-8 w-8 rounded bg-[#151921]/80 border border-white/10 text-gray-400 hover:text-white">
                    <RotateCcw className="w-4 h-4" />
                 </Button>
                 <Button variant="secondary" size="icon" className="h-8 w-8 rounded bg-[#151921]/80 border border-white/10 text-gray-400 hover:text-white">
                    <Share2 className="w-4 h-4" />
                 </Button>
                 <Button variant="secondary" size="icon" className="h-8 w-8 rounded bg-[#151921]/80 border border-white/10 text-gray-400 hover:text-white">
                    <Info className="w-4 h-4" />
                 </Button>
            </div>
            
            {/* Right Floating Toolbar */}
            <div className="absolute right-4 top-4 z-30 flex flex-col gap-1">
                 <Button variant="secondary" size="icon" className="h-8 w-8 rounded bg-[#151921]/80 border border-white/10 text-gray-400 hover:text-white">
                    <Maximize className="w-4 h-4" />
                 </Button>
                 <Button variant="secondary" size="icon" className="h-8 w-8 rounded bg-[#151921]/80 border border-white/10 text-gray-400 hover:text-white">
                    <ZoomIn className="w-4 h-4" />
                 </Button>
                 <Button variant="secondary" size="icon" className="h-8 w-8 rounded bg-[#151921]/80 border border-white/10 text-gray-400 hover:text-white">
                    <ZoomOut className="w-4 h-4" />
                 </Button>
                 <Button variant="secondary" size="icon" className="h-8 w-8 rounded bg-[#151921]/80 border border-white/10 text-gray-400 hover:text-white">
                    <Filter className="w-4 h-4" />
                 </Button>
                 <Button variant="secondary" size="icon" className="h-8 w-8 rounded bg-[#151921]/80 border border-white/10 text-gray-400 hover:text-white">
                    <Settings className="w-4 h-4" />
                 </Button>
                 <Button variant="secondary" size="icon" className="h-8 w-8 rounded bg-[#151921]/80 border border-white/10 text-gray-400 hover:text-white">
                    <Layers className="w-4 h-4" />
                 </Button>
                 <Button variant="secondary" size="icon" className="h-8 w-8 rounded bg-[#151921]/80 border border-white/10 text-gray-400 hover:text-white">
                    <MoreHorizontal className="w-4 h-4" />
                 </Button>
            </div>

            {/* Graph Visualization Layer */}
            <div className="absolute inset-0 z-10 overflow-hidden bg-black">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
                
                {/* Central "Sun" Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none"></div>

                {/* Nodes */}
                <div className="relative w-full h-full transform scale-90 md:scale-100">
                    {nodes.map((node, i) => (
                        <GraphNode key={i} {...node} />
                    ))}
                </div>
            </div>

            {/* Bottom Legend Panel */}
            <div className="absolute bottom-[40px] right-4 z-30 bg-[#0B0E14]/90 backdrop-blur border border-white/10 rounded-lg p-0 w-[240px] overflow-hidden shadow-2xl">
                 <div className="flex text-[10px] text-gray-400 bg-white/5 px-3 py-1.5 border-b border-white/10">
                    <span className="flex-1">등락률</span>
                    <span className="w-10 text-right">개수</span>
                    <span className="w-12 text-right">비율(%)</span>
                 </div>
                 <div className="p-1">
                    {legendItems.map((item, idx) => (
                        <div key={idx} className="flex items-center text-[10px] px-2 py-1 hover:bg-white/5 rounded cursor-pointer">
                            <div className={cn("w-2 h-2 rounded-full mr-2", item.color)}></div>
                            <span className="flex-1 text-gray-300 truncate">{item.label}</span>
                            <span className="w-10 text-right text-gray-400">{item.count}</span>
                            <span className="w-12 text-right text-gray-500 font-mono">{item.pct}</span>
                        </div>
                    ))}
                 </div>
            </div>

            {/* Bottom Timeline Control */}
            <div className="absolute bottom-0 left-0 right-0 h-[40px] bg-[#0f1115] border-t border-white/10 z-30 flex items-end px-4 pb-1">
                <div className="flex-1 flex items-end gap-[2px] h-full pt-2 opacity-50 hover:opacity-100 transition-opacity">
                    {Array.from({ length: 100 }).map((_, i) => (
                        <div 
                            key={i} 
                            className="flex-1 bg-white/20 hover:bg-primary transition-colors rounded-t-sm" 
                            style={{ height: `${20 + Math.random() * 80}%` }}
                        ></div>
                    ))}
                </div>
                {/* Scroll Handle */}
                <div className="absolute bottom-0 left-[20%] right-[20%] h-1 bg-primary cursor-col-resize rounded-full"></div>
            </div>

        </main>
      </div>
      
      {/* Bottom Ticker (Consistent with other pages) */}
      <div className="bg-[#0f1115] border-t border-white/5 h-8 flex items-center px-4 overflow-hidden shrink-0 z-50 relative">
             <div className="flex gap-8 text-[10px] font-mono whitespace-nowrap animate-ticker text-gray-400">
                <div className="flex items-center gap-2">
                   <span>코스피 종합</span>
                   <span className="text-gray-200 font-bold">2220.56</span>
                   <span className="text-red-400">▲ 90.88 2.2%</span>
                </div>
                <div className="flex items-center gap-2">
                   <span>코스닥 종합</span>
                   <span className="text-gray-200 font-bold">932.59</span>
                   <span className="text-red-400">▲ 12.92 1.4%</span>
                </div>
                <div className="flex items-center gap-2">
                   <span>나스닥 종합</span>
                   <span className="text-gray-200 font-bold">23450.97</span>
                   <span className="text-blue-400">▼ 142.13 -0.6%</span>
                </div>
                <div className="flex items-center gap-2">
                   <span>다우 산업</span>
                   <span className="text-gray-200 font-bold">48710.97</span>
                   <span className="text-blue-400">▼ 20.19 -0.04%</span>
                </div>
                <div className="flex items-center gap-2">
                   <span>S&P 500</span>
                   <span className="text-gray-200 font-bold">6900.9</span>
                   <span className="text-blue-400">▼ 29.04 -0.42%</span>
                </div>
                <div className="flex items-center gap-2">
                   <span>달러환율</span>
                   <span className="text-gray-200 font-bold">1434.1</span>
                   <span className="text-blue-400">▼ 8.1 -0.56%</span>
                </div>
             </div>
      </div>
    </DashboardLayout>
  );
}
