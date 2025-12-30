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
  ShoppingCart,
  MessageSquare,
  Sparkles,
  Send,
  X,
  Bot,
  ArrowLeftRight
} from "lucide-react";
import FearGreedIndex from "@/components/dashboard/FearGreedIndex";
import { useState, useMemo, useRef, useEffect } from "react";

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

interface Node {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
  label?: string;
  pulse?: boolean;
}

interface Link {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  opacity: number;
}

const GraphNode = ({ 
    x, y, size, color, label, pulse, selected, onClick 
}: { 
    x: string, y: string, size: number, color: string, label?: string, pulse?: boolean, selected?: boolean, onClick?: () => void 
}) => (
  <div 
    className={cn(
        "absolute rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group z-20 cursor-pointer",
        selected ? "z-50 scale-125" : ""
    )}
    style={{ left: x, top: y, width: size, height: size }}
    onClick={onClick}
  >
    {pulse && !selected && (
       <div className={cn("absolute inset-0 rounded-full animate-ping opacity-20", color)}></div>
    )}
    {selected && (
       <div className="absolute inset-[-8px] rounded-full border-2 border-primary animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
    )}
    <div className={cn(
        "w-full h-full rounded-full shadow-lg border hover:scale-125 transition-transform", 
        color,
        selected ? "border-white" : "border-white/20"
    )}></div>
    {label && (
      <span className={cn(
          "absolute top-full mt-2 text-[10px] font-bold text-white whitespace-nowrap bg-black/70 px-2 py-0.5 rounded backdrop-blur-sm z-30 pointer-events-none border border-white/10 group-hover:scale-110 transition-transform",
          selected ? "bg-primary text-black border-primary" : ""
      )}>
        {label}
      </span>
    )}
  </div>
);

// --- Chat Components ---
interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    text: string;
    context?: string[];
}

const suggestedQuestions = [
    "이 종목들의 향후 전망은?",
    "최근 상승 이유는 무엇인가요?",
    "관련된 주요 뉴스를 알려줘",
    "매수/매도 타이밍 분석해줘"
];

const ChatPanel = ({ 
    isOpen, 
    onClose, 
    selectedNodes, 
    onRemoveNode 
}: { 
    isOpen: boolean, 
    onClose: () => void, 
    selectedNodes: Node[], 
    onRemoveNode: (id: string) => void 
}) => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: '1', role: 'assistant', text: "안녕하세요. AI 시장 분석가입니다. 관심있는 종목을 선택하고 질문해주세요." }
    ]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = (text: string = input) => {
        if (!text.trim()) return;
        
        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            text: text,
            context: selectedNodes.map(n => n.label || n.id)
        };
        
        setMessages(prev => [...prev, userMsg]);
        setInput("");

        // Mock AI Response
        setTimeout(() => {
            const contextText = userMsg.context && userMsg.context.length > 0 
                ? `${userMsg.context.join(', ')}에 대해 문의하셨군요. ` 
                : "";
            
            const responseMsg: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                text: `${contextText}현재 해당 종목들은 외국인 매수세가 유입되며 강한 상승 흐름을 보이고 있습니다. 특히 반도체 섹터의 전반적인 호조와 연동되어 긍정적인 모멘텀이 예상됩니다.`
            };
            setMessages(prev => [...prev, responseMsg]);
        }, 1000);
    };

    if (!isOpen) return null;

    return (
        <div className="absolute right-0 top-0 bottom-0 w-[420px] bg-[#0B0E14]/95 backdrop-blur-xl border-l border-white/10 flex flex-col shadow-2xl z-40 animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/5 backdrop-blur-sm shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center border border-white/5 shadow-inner">
                        <Bot className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <span className="block text-base font-bold text-white leading-none">AI Market Analyst</span>
                        <span className="text-[11px] text-gray-400 font-mono mt-1.5 block flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            Powered by Gemini
                        </span>
                    </div>
                </div>
                <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg" onClick={onClose}>
                    <X className="w-5 h-5" />
                </Button>
            </div>

            {/* Context Area (Selected Nodes) */}
            {selectedNodes.length > 0 && (
                <div className="px-5 py-4 border-b border-white/5 bg-primary/5 shrink-0">
                    <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-xs font-bold text-primary">선택된 종목 (Context)</span>
                    </div>
                    <div className="flex flex-wrap gap-2 max-h-[120px] overflow-y-auto custom-scrollbar">
                        {selectedNodes.map(node => (
                            <div key={node.id} className="flex items-center gap-2 bg-[#151921] border border-primary/30 rounded-lg pl-3 pr-2 py-1.5 shadow-sm group hover:border-primary/60 transition-colors">
                                <span className="text-xs font-medium text-gray-200">{node.label || "Unnamed"}</span>
                                <button onClick={() => onRemoveNode(node.id)} className="text-gray-500 hover:text-red-400 transition-colors p-0.5 rounded hover:bg-white/5">
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar" ref={scrollRef}>
                {messages.map((msg) => (
                    <div key={msg.id} className={cn("flex flex-col gap-2 max-w-[90%]", msg.role === 'user' ? "ml-auto items-end" : "mr-auto items-start")}>
                        <div className={cn(
                            "px-5 py-3.5 text-sm leading-relaxed shadow-md",
                            msg.role === 'user' 
                                ? "bg-primary text-black rounded-2xl rounded-tr-sm font-semibold" 
                                : "bg-[#1f232b] text-gray-200 rounded-2xl rounded-tl-sm border border-white/5"
                        )}>
                            {msg.text}
                        </div>
                        <span className="text-[11px] text-gray-600 px-1 font-medium">
                            {msg.role === 'assistant' ? 'AI Analyst' : 'You'}
                        </span>
                    </div>
                ))}
                
                {/* Suggested Questions */}
                {messages.length === 1 && (
                    <div className="mt-8 space-y-3">
                        <p className="text-xs text-gray-500 font-semibold px-1 mb-2">추천 질문</p>
                        <div className="flex flex-col gap-2.5">
                            {suggestedQuestions.map((q, idx) => (
                                <button 
                                    key={idx}
                                    onClick={() => handleSend(q)}
                                    className="text-left text-sm text-gray-300 bg-[#151921] hover:bg-[#1f232b] hover:text-white border border-white/5 rounded-xl px-4 py-3.5 transition-all duration-200 flex items-center gap-3 group hover:border-primary/30 hover:shadow-lg hover:translate-x-1"
                                >
                                    <MessageSquare className="w-4 h-4 text-primary/50 group-hover:text-primary transition-colors" />
                                    {q}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Input */}
            <div className="p-5 bg-[#0B0E14] border-t border-white/10 shrink-0">
                <div className="relative flex items-center gap-2">
                    <Input 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder={selectedNodes.length > 0 ? "선택된 종목에 대해 질문하세요..." : "시장 상황에 대해 물어보세요..."}
                        className="bg-[#151921] border-white/10 text-sm h-12 pl-5 pr-12 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 rounded-xl transition-all shadow-inner"
                    />
                    <Button 
                        size="icon" 
                        className="absolute right-2 top-2 h-8 w-8 bg-primary text-black hover:bg-primary/90 rounded-lg transition-all shadow-lg shadow-primary/20"
                        onClick={() => handleSend()}
                    >
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};


export default function OntologyPage() {
  const [activeTab, setActiveTab] = useState("theme");
  const [selectedNodeIds, setSelectedNodeIds] = useState<Set<string>>(new Set());
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  // Generate structured radial graph data
  const { nodes, links } = useMemo(() => {
    const nodes: Node[] = [];
    const links: Link[] = [];
    
    const centerX = 50;
    const centerY = 50;

    // 1. Center Node (Market Hub)
    nodes.push({
        id: "center",
        x: centerX,
        y: centerY,
        size: 50,
        color: "bg-indigo-600",
        label: "KOSPI 200",
        pulse: true
    });

    // 2. Inner Ring: Major Sectors (8 nodes)
    const sectors = [
        { name: "반도체", color: "bg-red-500", stocks: ["삼성전자", "SK하이닉스", "DB하이텍"] },
        { name: "2차전지", color: "bg-orange-500", stocks: ["LG엔솔", "삼성SDI", "에코프로"] },
        { name: "자동차", color: "bg-blue-500", stocks: ["현대차", "기아", "현대모비스"] },
        { name: "바이오", color: "bg-green-500", stocks: ["삼바", "셀트리온", "SK바이오"] },
        { name: "플랫폼", color: "bg-emerald-400", stocks: ["NAVER", "카카오", "하이브"] },
        { name: "금융", color: "bg-yellow-500", stocks: ["KB금융", "신한지주", "하나금융"] },
        { name: "화학/철강", color: "bg-cyan-500", stocks: ["POSCO홀딩스", "LG화학", "롯데케미칼"] },
        { name: "조선/기계", color: "bg-slate-400", stocks: ["HD현대중공업", "한화오션", "두산에너빌리티"] }
    ];

    const innerRadius = 20;

    sectors.forEach((sector, i) => {
        const angle = (i / sectors.length) * Math.PI * 2;
        const sx = centerX + Math.cos(angle) * innerRadius;
        const sy = centerY + Math.sin(angle) * innerRadius;
        
        // Sector Node
        nodes.push({
            id: `sector-${i}`,
            x: sx,
            y: sy,
            size: 28,
            color: sector.color,
            label: sector.name,
            pulse: false
        });

        // Link to Center
        links.push({
            x1: centerX, y1: centerY,
            x2: sx, y2: sy,
            opacity: 0.3
        });

        // Link to neighboring sectors (forming a ring)
        const nextIndex = (i + 1) % sectors.length;
        const nextAngle = (nextIndex / sectors.length) * Math.PI * 2;
        const nx = centerX + Math.cos(nextAngle) * innerRadius;
        const ny = centerY + Math.sin(nextAngle) * innerRadius;
        
        links.push({
            x1: sx, y1: sy,
            x2: nx, y2: ny,
            opacity: 0.15
        });

        // 3. Middle Ring: Major Stocks (3 per sector)
        const midRadius = 14; // Distance from sector node
        sector.stocks.forEach((stockName, j) => {
            // Spread stocks in a fan shape outwards from the sector node
            // Base angle is the sector's angle
            // Spread range: -30deg to +30deg
            const spread = 0.8; // radians spread
            const stockAngle = angle + (j - 1) * (spread / 2); 
            
            // Calculate absolute position based on sector position + offset vector
            // But to make it circular global layout, let's use global radius logic
            
            // Alternative: Global concentric circle for stocks
            const globalStockRadius = 35;
            const globalAngle = angle + (j - 1) * 0.15; // slightly offset from sector angle

            const kx = centerX + Math.cos(globalAngle) * globalStockRadius;
            const ky = centerY + Math.sin(globalAngle) * globalStockRadius;

            const stockId = `stock-${i}-${j}`;
            nodes.push({
                id: stockId,
                x: kx,
                y: ky,
                size: 18,
                color: sector.color.replace('500', '400').replace('600', '500'),
                label: stockName,
                pulse: false
            });

            // Link to Sector
            links.push({
                x1: sx, y1: sy,
                x2: kx, y2: ky,
                opacity: 0.25
            });

            // 4. Outer Ring: Related/Small Stocks (2 per stock)
            const outerRadiusDist = 10;
            for (let k = 0; k < 2; k++) {
                const smallAngle = globalAngle + (k - 0.5) * 0.1;
                const ox = centerX + Math.cos(smallAngle) * (globalStockRadius + 12);
                const oy = centerY + Math.sin(smallAngle) * (globalStockRadius + 12);
                
                nodes.push({
                    id: `sub-${i}-${j}-${k}`,
                    x: ox,
                    y: oy,
                    size: 6,
                    color: "bg-gray-600",
                    pulse: false
                });

                links.push({
                    x1: kx, y1: ky,
                    x2: ox, y2: oy,
                    opacity: 0.1
                });
            }
        });
    });

    // Add some random background stars for atmosphere
    for (let i = 0; i < 50; i++) {
        const angle = Math.random() * Math.PI * 2;
        const rad = Math.random() * 40 + 10;
        nodes.push({
            id: `star-${i}`,
            x: 50 + Math.cos(angle) * rad,
            y: 50 + Math.sin(angle) * rad,
            size: 2,
            color: "bg-white/20",
            pulse: Math.random() > 0.8
        });
    }

    return { nodes, links };
  }, []);

  const handleNodeClick = (id: string) => {
    setSelectedNodeIds(prev => {
        const next = new Set(prev);
        if (next.has(id)) {
            next.delete(id);
        } else {
            next.add(id);
        }
        return next;
    });
  };

  const selectedNodes = useMemo(() => 
    nodes.filter(n => selectedNodeIds.has(n.id)), 
  [nodes, selectedNodeIds]);

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-4rem)] bg-[#050505] text-white font-sans overflow-hidden relative">
        
        {/* Left Sidebar */}
        <aside 
            className={cn(
                "flex flex-col border-r border-white/10 bg-[#0B0E14] z-20 transition-all duration-300 ease-in-out overflow-hidden absolute left-0 top-0 bottom-0 md:relative", 
                isSidebarOpen ? "w-[340px] translate-x-0" : "w-0 -translate-x-full md:w-0 md:translate-x-0 border-r-0"
            )}
        >
            {/* Sidebar Header */}
            <div className="p-0 min-w-[340px]">
                <div className="flex border-b border-white/10">
                    {['종목', '테마', '산업분류', '키워드', '시장지수'].map((tab) => (
                        <button 
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                "flex-1 py-3 text-xs font-medium transition-colors hover:bg-white/5 whitespace-nowrap px-1",
                                activeTab === tab || (activeTab === "theme" && tab === "종목") ? "text-white border-b-2 border-primary" : "text-gray-500",
                                tab === "시장지수" && activeTab === "시장지수" ? "text-primary border-primary" : ""
                            )}
                        >
                            {tab}
                        </button>
                    ))}
                    <button 
                        className="px-2 border-l border-white/10 hover:bg-white/5 text-gray-500 hover:text-white transition-colors"
                        onClick={() => setIsSidebarOpen(false)}
                        title="사이드바 숨기기"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                </div>
                
                {/* Conditional Rendering based on Tab */}
                {activeTab !== '시장지수' && (
                    <>
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
                    </>
                )}
            </div>

            {/* Sidebar Content */}
            <ScrollArea className="flex-1 bg-[#0B0E14]">
                {activeTab === '시장지수' ? (
                    <div className="p-4">
                        <FearGreedIndex />
                    </div>
                ) : (
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
                )}
            </ScrollArea>
            
            {/* Sidebar Footer - REMOVED per user request */}
        </aside>

        {/* Main Graph Area */}
        <main className="flex-1 relative bg-black overflow-hidden flex flex-col">
            
            {/* Fear & Greed Index Widget - REMOVED from floating area */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none opacity-0">
                {/* Placeholder for positioning if needed, currently hidden as user wanted it integrated in the graph */}
            </div>

            {/* Top Toolbar Wrapper - Centered */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
                
                {/* Main Toolbar (Expandable) */}
                <div className={cn(
                    "flex items-center gap-1 bg-[#151921]/90 backdrop-blur border border-white/10 rounded-full px-2 py-1.5 shadow-xl transition-all duration-300 ease-in-out relative",
                    isSearchExpanded ? "w-[400px] overflow-hidden" : "w-auto"
                )}>
                     {/* Toolbar Items - Hidden when search expanded */}
                     <div className={cn(
                        "flex items-center gap-1 transition-all duration-300 whitespace-nowrap overflow-hidden",
                        isSearchExpanded ? "w-0 opacity-0 pointer-events-none" : "w-auto opacity-100"
                     )}>
                         <Button variant="ghost" size="sm" className="h-7 text-xs text-gray-400 hover:text-white hover:bg-white/10 rounded-full px-3">
                            관계 주식 <span className="text-blue-400 ml-1">테마</span>
                         </Button>
                         <div className="w-px h-3 bg-white/10 shrink-0"></div>
                         <Button variant="ghost" size="sm" className="h-7 text-xs text-gray-400 hover:text-white hover:bg-white/10 rounded-full px-3">
                            종목수 <span className="text-blue-400 ml-1">628</span>
                         </Button>
                         <div className="w-px h-3 bg-white/10 shrink-0"></div>
                         <Button variant="ghost" size="sm" className="h-7 text-xs text-gray-400 hover:text-white hover:bg-white/10 rounded-full px-3">
                            관계수 <span className="text-blue-400 ml-1">351</span>
                         </Button>
                         <div className="w-px h-3 bg-white/10 shrink-0"></div>
                         <Button variant="ghost" size="sm" className="h-7 text-xs text-gray-400 hover:text-white hover:bg-white/10 rounded-full px-3">
                            평균지수 <span className="text-red-400 ml-1">0.03%</span>
                         </Button>
                         <div className="w-px h-3 bg-white/10 shrink-0"></div>
                     </div>
                     
                     {/* Expandable Search Bar */}
                     <div 
                        className={cn(
                            "relative flex items-center h-7 transition-all duration-300 ease-in-out rounded-full shrink-0",
                            isSearchExpanded ? "flex-1 bg-white/5" : "w-8 hover:bg-white/5 cursor-pointer"
                        )}
                        onClick={() => {
                            if (!isSearchExpanded) {
                                setIsSearchExpanded(true);
                                setTimeout(() => document.getElementById('ontology-search-input')?.focus(), 100);
                            }
                        }}
                     >
                        <div className={cn(
                            "absolute z-10 pointer-events-none flex items-center justify-center transition-all duration-300", 
                            isSearchExpanded ? "left-2.5 w-4 h-4" : "inset-0 w-full h-full"
                        )}>
                            <Search className={cn("w-4 h-4 transition-colors", isSearchExpanded ? "text-primary" : "text-gray-400")} />
                        </div>
                        <input 
                            id="ontology-search-input"
                            type="text" 
                            placeholder="관계망 내 검색..." 
                            className={cn(
                                "w-full h-full bg-transparent border-none outline-none text-xs text-white transition-all duration-300 placeholder:text-gray-500 rounded-full",
                                isSearchExpanded ? "pl-9 pr-3 opacity-100" : "w-0 pl-0 pr-0 opacity-0 pointer-events-none"
                            )}
                            onBlur={() => setIsSearchExpanded(false)}
                            onClick={(e) => e.stopPropagation()} 
                        />
                     </div>
                </div>

                {/* Separated Stock Comparison Button */}
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-[42px] w-[42px] bg-[#151921]/90 backdrop-blur border border-white/10 rounded-full shadow-xl hover:bg-white/10 hover:text-white text-gray-400 shrink-0"
                    title="종목비교"
                >
                    <ArrowLeftRight className="w-4 h-4" />
                </Button>
            </div>

            {/* Fear & Greed Gauge - Top Left Floating - REMOVED */}
            
            {/* Show Sidebar Trigger - Visible when Sidebar is hidden */}
            {!isSidebarOpen && (
                <button 
                    className="absolute left-0 top-[160px] z-50 bg-[#151921]/90 backdrop-blur border border-white/10 border-l-0 rounded-r-lg p-1.5 shadow-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all hover:pl-2"
                    onClick={() => setIsSidebarOpen(true)}
                    title="사이드바 보이기"
                >
                    <ChevronLeft className="w-4 h-4 rotate-180" />
                </button>
            )}

            {/* Left Floating Toolbar */}
            <div className="absolute left-4 top-4 z-30 flex flex-col gap-4">
                 {/* Original Floating Buttons - Now at top */}
                 <div className="flex flex-col bg-[#151921]/90 backdrop-blur border border-white/10 rounded-lg overflow-hidden shadow-lg p-1 w-fit">
                     <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10 rounded">
                        <Database className="w-4 h-4" />
                     </Button>
                     <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10 rounded">
                        <RotateCcw className="w-4 h-4" />
                     </Button>
                     <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10 rounded">
                        <Share2 className="w-4 h-4" />
                     </Button>
                     <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10 rounded">
                        <Info className="w-4 h-4" />
                     </Button>
                 </div>
            </div>

            {/* Centered Widgets - Left Side */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-4">
                 {/* Mini Market Insights */}
                 <div className="flex flex-col gap-3">
                    {/* Compact Fear & Greed */}
                    <div className="bg-[#151921]/90 backdrop-blur border border-white/10 rounded-lg p-3 shadow-lg w-[180px]">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Greed Index</span>
                            <span className="text-[10px] text-red-400 font-bold">GREED</span>
                        </div>
                        <div className="flex items-end gap-2">
                             <div className="relative w-12 h-12 flex items-center justify-center">
                                {/* Simple CSS Gauge */}
                                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                    <path className="text-gray-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                                    <path className="text-red-500" strokeDasharray="75, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                                </svg>
                                <span className="absolute text-sm font-bold text-white">75</span>
                             </div>
                             <div className="flex flex-col pb-1">
                                <span className="text-[9px] text-gray-500">전일대비</span>
                                <span className="text-[10px] text-red-400 font-bold">▲ 2.5</span>
                             </div>
                        </div>
                    </div>

                    {/* Today's Theme Ranking */}
                    <div className="bg-[#151921]/90 backdrop-blur border border-white/10 rounded-lg p-3 shadow-lg w-[180px]">
                        <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
                            <Layers className="w-3.5 h-3.5 text-primary" />
                            <span className="text-[11px] font-bold text-gray-200">오늘의 테마 순위</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            {[
                                { rank: 1, text: "반도체", count: 42, pct: "+3.5%", trend: "up" },
                                { rank: 2, text: "2차전지", count: 28, pct: "-1.2%", trend: "down" },
                                { rank: 3, text: "AI", count: 35, pct: "+5.1%", trend: "up" },
                                { rank: 4, text: "초전도체", count: 12, pct: "+12.4%", trend: "up" },
                                { rank: 5, text: "바이오", count: 24, pct: "-0.5%", trend: "down" }
                            ].map((k) => (
                                <div key={k.rank} className="flex items-center justify-between group cursor-pointer">
                                    <div className="flex items-center gap-2">
                                        <span className={cn(
                                            "w-3.5 h-3.5 flex items-center justify-center text-[9px] font-bold rounded shadow-inner",
                                            k.rank <= 3 ? "bg-primary/20 text-primary border border-primary/30" : "bg-white/5 text-gray-500"
                                        )}>{k.rank}</span>
                                        <span className="text-[11px] text-gray-300 group-hover:text-white transition-colors">
                                            {k.text} 
                                            <span className="text-[9px] text-gray-500 font-normal ml-1">({k.count})</span>
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className={cn("text-[9px] font-mono", k.trend === 'up' ? "text-red-400" : "text-blue-400")}>
                                            {k.pct}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Today's Keywords - New Data */}
                    <div className="bg-[#151921]/90 backdrop-blur border border-white/10 rounded-lg p-3 shadow-lg w-[180px]">
                        <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
                            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                            <span className="text-[11px] font-bold text-gray-200">실시간 급상승 키워드</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                            {["HBM3", "리튬", "상온초전도", "알츠하이머", "NPU", "온디바이스AI", "로봇"].map((keyword, idx) => (
                                <span key={idx} className="px-2 py-1 bg-white/5 hover:bg-white/10 text-[10px] text-gray-300 rounded border border-white/5 cursor-pointer transition-colors">
                                    #{keyword}
                                </span>
                            ))}
                        </div>
                    </div>
                 </div>
            </div>
            
            {/* Right Floating Toolbar */}
            <div className="absolute right-4 top-4 z-30 flex flex-col gap-4">
                 {/* Chat Trigger - Moved back to toolbar */}
                 <div className="flex flex-col bg-[#151921]/90 backdrop-blur border border-white/10 rounded-lg overflow-hidden shadow-lg p-1 animate-pulse-subtle border-primary/30 group">
                     <Button 
                        variant="ghost" 
                        size="icon" 
                        className={cn(
                            "h-8 w-8 hover:text-white hover:bg-white/10 rounded transition-all duration-300 relative overflow-hidden", 
                            isChatOpen ? "text-cyan-400 bg-cyan-950/30" : "text-cyan-400"
                        )}
                        onClick={() => setIsChatOpen(!isChatOpen)}
                        title="AI 분석"
                     >
                        <div className="absolute inset-0 bg-cyan-500/20 blur-md rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <Sparkles className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] relative z-10 animate-pulse" />
                     </Button>
                 </div>

                 {/* View Controls Group */}
                 <div className="flex flex-col bg-[#151921]/90 backdrop-blur border border-white/10 rounded-lg overflow-hidden shadow-lg p-1">
                     <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10 rounded" title="전체화면">
                        <Maximize className="w-4 h-4" />
                     </Button>
                     <div className="h-px bg-white/10 my-0.5 mx-1"></div>
                     <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10 rounded" title="확대">
                        <ZoomIn className="w-4 h-4" />
                     </Button>
                     <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10 rounded" title="축소">
                        <ZoomOut className="w-4 h-4" />
                     </Button>
                 </div>

                 {/* Settings Group */}
                 <div className="flex flex-col bg-[#151921]/90 backdrop-blur border border-white/10 rounded-lg overflow-hidden shadow-lg p-1">
                     <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10 rounded" title="필터">
                        <Filter className="w-4 h-4" />
                     </Button>
                     <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10 rounded" title="레이어">
                        <Layers className="w-4 h-4" />
                     </Button>
                     <div className="h-px bg-white/10 my-0.5 mx-1"></div>
                     <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10 rounded" title="설정">
                        <Settings className="w-4 h-4" />
                     </Button>
                     <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10 rounded" title="더보기">
                        <MoreHorizontal className="w-4 h-4" />
                     </Button>
                 </div>
            </div>

            {/* AI Chat Panel - NEW */}
            <ChatPanel 
                isOpen={isChatOpen} 
                onClose={() => setIsChatOpen(false)}
                selectedNodes={selectedNodes}
                onRemoveNode={(id) => handleNodeClick(id)}
            />

            {/* Graph Visualization Layer */}
            <div className="absolute inset-0 z-10 overflow-hidden bg-black">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
                
                {/* Central "Sun" Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none"></div>

                {/* SVG Links Layer */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                  {links.map((link, i) => (
                    <line 
                      key={i}
                      x1={`${link.x1}%`}
                      y1={`${link.y1}%`}
                      x2={`${link.x2}%`}
                      y2={`${link.y2}%`}
                      stroke="white"
                      strokeWidth="1"
                      strokeOpacity={link.opacity}
                    />
                  ))}
                </svg>

                {/* Nodes Layer */}
                <div className="relative w-full h-full transform scale-90 md:scale-100 z-10">
                    {nodes.map((node, i) => (
                        <GraphNode 
                            key={i} 
                            x={`${node.x}%`} 
                            y={`${node.y}%`} 
                            size={node.size} 
                            color={node.color} 
                            label={node.label}
                            pulse={node.pulse}
                            selected={selectedNodeIds.has(node.id)}
                            onClick={() => handleNodeClick(node.id)}
                        />
                    ))}
                </div>
            </div>

            {/* Bottom Legend Panel */}
            <div className="absolute bottom-[140px] right-4 z-30 bg-[#0B0E14]/90 backdrop-blur border border-white/10 rounded-lg p-0 w-[240px] overflow-hidden shadow-2xl">
                 <div className="flex text-[10px] text-gray-400 bg-white/5 px-3 py-1.5 border-b border-white/10">
                    <span className="flex-1">등락률</span>
                    <span className="w-10 text-right">개수</span>
                    <span className="w-12 text-right">비율(%)</span>
                 </div>
                 <div className="px-1 pt-1 pb-2">
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
            <div className="absolute bottom-[36px] left-0 right-0 h-[60px] bg-[#0f1115]/80 backdrop-blur-sm border-t border-white/5 z-20 flex items-end px-4 pb-1 transition-all duration-300">
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
                <div className="absolute bottom-0 left-[20%] right-[20%] h-1 bg-primary cursor-col-resize rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
            </div>

            {/* Bottom Stock Ticker (Marquee) */}
            <div className="absolute bottom-0 left-0 right-0 h-[36px] bg-[#050505] border-t border-white/10 z-30 flex items-center overflow-hidden whitespace-nowrap">
                <div className="flex items-center animate-scroll">
                    {/* Duplicate items for seamless scroll */}
                    {[...Array(4)].map((_, groupIdx) => (
                        <div key={groupIdx} className="flex items-center">
                            {[
                                { name: "KOSPI", value: "2,612.43", change: "+0.85%", up: true },
                                { name: "KOSDAQ", value: "859.21", change: "-0.23%", up: false },
                                { name: "KOSPI 200", value: "351.42", change: "+1.12%", up: true },
                                { name: "USD/KRW", value: "1,315.50", change: "-0.15%", up: false },
                                { name: "WTI", value: "72.45", change: "+1.20%", up: true },
                                { name: "Bitcoin", value: "43,250", change: "-1.50%", up: false },
                                { name: "Gold", value: "2,050.10", change: "+0.30%", up: true },
                            ].map((idx, i) => (
                                <div key={`${groupIdx}-${i}`} className="flex items-center gap-2 px-6 border-r border-white/5 last:border-r-0">
                                    <span className="text-[11px] font-bold text-gray-400">{idx.name}</span>
                                    <span className="text-[11px] font-mono font-bold text-gray-200">{idx.value}</span>
                                    <span className={cn("text-[10px] font-mono flex items-center", idx.up ? "text-red-400" : "text-blue-400")}>
                                        {idx.up ? "▲" : "▼"} {idx.change.replace(/[+-]/, "")}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

        </main>
      </div>
      
    </DashboardLayout>
  );
}
