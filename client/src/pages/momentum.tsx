import { useState, useRef, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Star, 
  Search, 
  RotateCw, 
  Download, 
  LayoutGrid, 
  List, 
  Loader2
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Area, AreaChart, ResponsiveContainer, YAxis } from "recharts";

// --- Mock Data Generation ---

const generateChartData = (trend: 'up' | 'down' | 'mixed') => {
  const data = [];
  let value = 100;
  for (let i = 0; i < 20; i++) {
    const change = (Math.random() - 0.5) * 10;
    if (trend === 'up') value += Math.random() * 5;
    else if (trend === 'down') value -= Math.random() * 5;
    else value += change;
    
    data.push({ value: Math.max(50, value) });
  }
  return data;
};

const initialMockStocks = [
  { id: "043260", name: "성호전자", price: 7850, change: 1.16, score: 9.8, trend: 'up', market_rel_10: 4.45, market_rel_20: 6.49, strength_10_up: 5.13, strength_10_down: 3.76, strength_20_up: 10.30, strength_20_down: 0.69 },
  { id: "329180", name: "HD현대중공업", price: 512000, change: -1.35, score: 6.5, trend: 'down', market_rel_10: -0.89, market_rel_20: -0.53, strength_10_up: 0.07, strength_10_down: -2.11, strength_20_up: 0.02, strength_20_down: -1.09 },
  { id: "049630", name: "재영솔루텍", price: 4160, change: 21.99, score: 9.2, trend: 'up', market_rel_10: 3.15, market_rel_20: 4.54, strength_10_up: 4.97, strength_10_down: 1.32, strength_20_up: 5.05, strength_20_down: 3.79 },
  { id: "445680", name: "큐리옥스바이오시스템즈", price: 101900, change: 3.14, score: 8.7, trend: 'up', market_rel_10: 0.86, market_rel_20: 0.33, strength_10_up: 1.67, strength_10_down: 0.06, strength_20_up: 0.03, strength_20_down: 0.78 },
  { id: "474610", name: "RF시스템즈", price: 4920, change: 0.72, score: 7.9, trend: 'up', market_rel_10: 1.84, market_rel_20: 1.02, strength_10_up: 3.45, strength_10_down: 0.23, strength_20_up: 1.52, strength_20_down: 0.26 },
  { id: "122900", name: "아이마켓코리아", price: 8120, change: 0.74, score: 5.4, trend: 'mixed', market_rel_10: 0.28, market_rel_20: -0.06, strength_10_up: 0.16, strength_10_down: 0.93, strength_20_up: 0.70, strength_20_down: 0.59 },
  { id: "397030", name: "에이프릴바이오", price: 48800, change: 2.74, score: 8.9, trend: 'up', market_rel_10: 1.68, market_rel_20: 1.17, strength_10_up: 2.02, strength_10_down: 1.34, strength_20_up: 0.13, strength_20_down: 2.73 },
  { id: "419080", name: "엔젯", price: 8050, change: -1.35, score: 4.2, trend: 'down', market_rel_10: 2.17, market_rel_20: 2.75, strength_10_up: -1.88, strength_10_down: 6.23, strength_20_up: 2.34, strength_20_down: 3.35 },
  { id: "100790", name: "미래에셋벤처투자", price: 13280, change: -6.81, score: 3.5, trend: 'down', market_rel_10: -5.40, market_rel_20: -2.10, strength_10_up: 0.50, strength_10_down: -4.20, strength_20_up: 1.20, strength_20_down: -1.50 },
  { id: "474650", name: "링크솔루션", price: 61100, change: -2.40, score: 6.8, trend: 'mixed', market_rel_10: -1.20, market_rel_20: 0.50, strength_10_up: 1.10, strength_10_down: -1.80, strength_20_up: 2.40, strength_20_down: 0.80 },
  { id: "394800", name: "쓰리빌리언", price: 17890, change: 4.56, score: 9.5, trend: 'up', market_rel_10: 3.20, market_rel_20: 5.10, strength_10_up: 4.10, strength_10_down: 1.90, strength_20_up: 6.20, strength_20_down: 2.50 },
  { id: "466100", name: "클로봇", price: 64100, change: -3.75, score: 2.1, trend: 'down', market_rel_10: -2.50, market_rel_20: -1.10, strength_10_up: 0.80, strength_10_down: -3.50, strength_20_up: 1.50, strength_20_down: -2.20 },
];

export default function MomentumPage() {
  const [period, setPeriod] = useState("1w");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [stocks, setStocks] = useState(initialMockStocks);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef(null);

  // Infinite Scroll Implementation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          loadMoreStocks();
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [isLoading, stocks]);

  const loadMoreStocks = () => {
    setIsLoading(true);
    // Simulate network delay
    setTimeout(() => {
      // Create duplicates with new IDs to simulate more data
      const newStocks = initialMockStocks.map(s => ({
        ...s,
        id: String(Number(s.id) + stocks.length), // simple unique id generation
        price: s.price + Math.floor(Math.random() * 1000 - 500), // slight price variation
        score: Math.max(0, Math.min(10, s.score + (Math.random() * 2 - 1))) // slight score variation
      }));
      
      setStocks(prev => [...prev, ...newStocks]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 bg-[#0B0E14] min-h-screen text-gray-200 font-sans">
        
        {/* Toolbar */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1 mb-2">
             <h1 className="text-xl font-bold text-white">랭킹 분석</h1>
             <p className="text-sm text-gray-400">
               시장 상황과 주가 흐름을 심층 분석하여 상승 잠재력이 높은 종목을 발굴합니다. 
               AI가 진단한 모멘텀 지표와 시장 대비 상승률을 통해 최적의 투자 기회를 포착하세요.
             </p>
          </div>

          <div className="flex flex-col xl:flex-row gap-4 justify-between items-start xl:items-center p-0">
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-yellow-400 hover:text-yellow-300">
                <Star className="fill-current w-5 h-5" />
              </Button>

            <div className="flex bg-black/40 rounded-md p-1 border border-white/10">
              {['1주', '2주', '4주', '6주'].map((label, idx) => (
                <button
                  key={idx}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                    idx === 0 ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            
            <div className="px-3 py-1.5 bg-black/40 rounded border border-white/10 text-xs text-gray-400 font-mono">
              2025-12-26
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
            <div className="relative flex-1 xl:w-64">
              <Input 
                placeholder="종목명 또는 종목 코드 입력" 
                className="pl-3 pr-10 bg-[#0B0E14] border-white/10 text-xs h-9 focus:ring-1 focus:ring-primary/50"
              />
              <Button size="icon" variant="ghost" className="absolute right-0 top-0 h-9 w-9 text-muted-foreground hover:text-white">
                <Search className="w-4 h-4" />
              </Button>
            </div>

            <Button size="icon" variant="outline" className="h-9 w-9 border-white/10 bg-[#0B0E14] hover:bg-white/5">
              <RotateCw className="w-4 h-4 text-gray-400" />
            </Button>

            <Select defaultValue="20">
              <SelectTrigger className="w-[70px] h-9 bg-[#0B0E14] border-white/10 text-xs">
                <SelectValue placeholder="20" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>

            <Button size="icon" variant="outline" className="h-9 w-9 border-white/10 bg-green-900/20 text-green-500 hover:bg-green-900/40 hover:text-green-400 border-green-500/30">
              <Download className="w-4 h-4" />
            </Button>

            <div className="flex bg-[#0B0E14] rounded-md border border-white/10 p-0.5">
              <Button 
                variant="ghost" 
                size="icon" 
                className={`h-8 w-8 rounded ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className={`h-8 w-8 rounded ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Stock Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {stocks.map((stock) => (
            <Card key={stock.id} className="bg-[#151921] border-white/5 shadow-lg hover:border-white/10 transition-colors group">
              <CardContent className="p-0">
                {/* Header */}
                <div className="p-3 flex justify-between items-start">
                  <div>
                    <div className="text-[10px] text-gray-500 font-mono mb-0.5">{stock.id}</div>
                    <div className="font-bold text-gray-200 text-sm truncate pr-2" title={stock.name}>{stock.name}</div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6 -mr-1 -mt-1 text-gray-600 hover:text-yellow-400 group-hover:text-gray-500">
                    <Star className="w-4 h-4 fill-current" />
                  </Button>
                </div>

                {/* Chart & Score Area */}
                <div className="flex items-center gap-0 p-3 pb-2 min-h-[80px]">
                  {/* Left: Chart - Reduced Width */}
                  <div className="w-[60%] h-14 relative pr-3">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={generateChartData(stock.trend as any)}>
                        <defs>
                          <linearGradient id={`grad_${stock.id}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={stock.change > 0 ? "#ef4444" : "#3b82f6"} stopOpacity={0.3}/>
                            <stop offset="95%" stopColor={stock.change > 0 ? "#ef4444" : "#3b82f6"} stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke={stock.change > 0 ? "#ef4444" : "#3b82f6"} 
                          fill={`url(#grad_${stock.id})`} 
                          strokeWidth={1.5}
                        />
                        <YAxis domain={['dataMin', 'dataMax']} hide />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Vertical Divider */}
                  <div className="w-px h-10 bg-white/10 mx-1"></div>

                  {/* Right: AI Score - Expanded Area */}
                  <div className="flex-1 text-center pl-1">
                    <div className="text-[9px] text-gray-500 font-bold mb-0.5 tracking-tighter">AI SCORE</div>
                    <div className={`text-3xl font-bold leading-none ${
                      stock.score >= 9 ? 'text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]' :
                      stock.score >= 7 ? 'text-blue-400' :
                      stock.score >= 5 ? 'text-green-400' :
                      stock.score >= 3 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {stock.score.toFixed(1)}
                    </div>
                    <div className="text-[9px] text-gray-600 mt-0.5">/ 10.0</div>
                  </div>
                </div>

                {/* Price Info */}
                <div className="px-3 pb-3 border-b border-white/5">
                  <div className="flex items-baseline gap-2">
                    <span className={`text-[10px] font-mono ${stock.change > 0 ? 'text-red-400' : 'text-blue-400'}`}>
                      종가
                    </span>
                    <span className={`text-sm font-bold font-mono ${stock.change > 0 ? 'text-red-400' : 'text-blue-400'}`}>
                      {stock.price.toLocaleString()}원
                    </span>
                    <span className={`text-xs font-medium ${stock.change > 0 ? 'text-red-400' : 'text-blue-400'} bg-${stock.change > 0 ? 'red' : 'blue'}-500/10 px-1 rounded`}>
                      {stock.change > 0 ? '+' : ''}{stock.change}%
                    </span>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div>
                  {/* Headers (Dark) */}
                  <div className="grid grid-cols-3 border-t border-white/5 text-[10px] bg-[#1a1f2b]">
                    <div className="py-2 text-center text-gray-400 border-r border-white/5">시장대비 상승률</div>
                    <div className="py-2 text-center text-gray-400 border-r border-white/5">10일간 주가 강도</div>
                    <div className="py-2 text-center text-gray-400">20일간 주가 강도</div>
                  </div>

                  {/* Values (White) */}
                  <div className="grid grid-cols-3 text-[11px] bg-white rounded-b-lg">
                    {/* Column 1 */}
                    <div className="p-2 border-r border-gray-100">
                      <div className="flex justify-around text-gray-500 mb-1.5 font-medium">
                        <span>10일</span>
                        <span>20일</span>
                      </div>
                      <div className="flex justify-around font-bold text-xs">
                        <span className={stock.market_rel_10 > 0 ? 'text-red-500' : 'text-blue-500'}>
                          {stock.market_rel_10 > 0 ? '+' : ''}{stock.market_rel_10}%
                        </span>
                        <span className={stock.market_rel_20 > 0 ? 'text-red-500' : 'text-blue-500'}>
                          {stock.market_rel_20 > 0 ? '+' : ''}{stock.market_rel_20}%
                        </span>
                      </div>
                    </div>

                    {/* Column 2 */}
                    <div className="p-2 border-r border-gray-100">
                      <div className="flex justify-around text-gray-500 mb-1.5 font-medium">
                        <span>상승 탄력</span>
                        <span>하락 방어</span>
                      </div>
                      <div className="flex justify-around font-bold text-xs">
                        <span className={stock.strength_10_up > 0 ? 'text-red-500' : 'text-blue-500'}>
                          {stock.strength_10_up > 0 ? '+' : ''}{stock.strength_10_up}%
                        </span>
                        <span className={stock.strength_10_down > 0 ? 'text-red-500' : 'text-blue-500'}>
                          {stock.strength_10_down > 0 ? '+' : ''}{stock.strength_10_down}%
                        </span>
                      </div>
                    </div>

                    {/* Column 3 */}
                    <div className="p-2">
                      <div className="flex justify-around text-gray-500 mb-1.5 font-medium">
                        <span>상승 탄력</span>
                        <span>하락 방어</span>
                      </div>
                      <div className="flex justify-around font-bold text-xs">
                        <span className={stock.strength_20_up > 0 ? 'text-red-500' : 'text-blue-500'}>
                           {stock.strength_20_up > 0 ? '+' : ''}{stock.strength_20_up}%
                        </span>
                        <span className={stock.strength_20_down > 0 ? 'text-red-500' : 'text-blue-500'}>
                           {stock.strength_20_down > 0 ? '+' : ''}{stock.strength_20_down}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Loading Indicator for Infinite Scroll */}
        <div ref={loaderRef} className="flex justify-center py-8">
          {isLoading && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <span className="text-sm">Loading more stocks...</span>
            </div>
          )}
        </div>

      </div>
    </DashboardLayout>
  );
}
