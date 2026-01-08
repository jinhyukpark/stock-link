import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  X, 
  TrendingUp, 
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

type Stock = {
  id: string;
  name: string;
  code: string;
  price: string;
  change: number;
  marketCap: string;
  per: string;
  pbr: string;
  roe: string;
  sector: string;
  color: string;
};

const stockDatabase: Stock[] = [
  { id: "samsung", name: "삼성전자", code: "005930", price: "78,200", change: 2.14, marketCap: "467조", per: "12.5", pbr: "1.2", roe: "9.6%", sector: "반도체", color: "#3b82f6" },
  { id: "sk", name: "SK하이닉스", code: "000660", price: "142,000", change: 6.84, marketCap: "103조", per: "8.2", pbr: "1.8", roe: "22.0%", sector: "반도체", color: "#ef4444" },
  { id: "lg", name: "LG에너지솔루션", code: "373220", price: "392,000", change: -1.20, marketCap: "92조", per: "45.3", pbr: "4.2", roe: "9.3%", sector: "배터리", color: "#22c55e" },
  { id: "hyundai", name: "현대자동차", code: "005380", price: "245,000", change: 3.40, marketCap: "52조", per: "5.8", pbr: "0.6", roe: "10.3%", sector: "자동차", color: "#f97316" },
  { id: "naver", name: "NAVER", code: "035420", price: "205,000", change: 1.20, marketCap: "34조", per: "28.4", pbr: "1.4", roe: "4.9%", sector: "인터넷", color: "#a855f7" },
  { id: "kakao", name: "카카오", code: "035720", price: "54,000", change: -2.10, marketCap: "24조", per: "52.1", pbr: "1.1", roe: "2.1%", sector: "인터넷", color: "#eab308" },
];

const generateChartData = (stockId: string) => {
  const baseValue = stockId === "samsung" ? 78000 : stockId === "sk" ? 140000 : stockId === "lg" ? 395000 : 100000;
  return Array.from({ length: 30 }, (_, i) => ({
    date: `${i + 1}`,
    value: baseValue + (Math.random() - 0.5) * baseValue * 0.1 + Math.sin(i / 5) * baseValue * 0.03,
  }));
};

export default function CompareView() {
  const [selectedStocks, setSelectedStocks] = useState<Stock[]>([stockDatabase[0], stockDatabase[1]]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const filteredStocks = stockDatabase.filter(
    stock => 
      !selectedStocks.find(s => s.id === stock.id) &&
      (stock.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
       stock.code.includes(searchQuery))
  );

  const addStock = (stock: Stock) => {
    if (selectedStocks.length < 4) {
      setSelectedStocks([...selectedStocks, stock]);
      setSearchQuery("");
      setShowSearch(false);
    }
  };

  const removeStock = (stockId: string) => {
    setSelectedStocks(selectedStocks.filter(s => s.id !== stockId));
  };

  const metrics = [
    { key: "price", label: "현재가" },
    { key: "change", label: "등락률" },
    { key: "marketCap", label: "시가총액" },
    { key: "per", label: "PER" },
    { key: "pbr", label: "PBR" },
    { key: "roe", label: "ROE" },
    { key: "sector", label: "섹터" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      <div className="flex items-center gap-4 flex-wrap">
        {selectedStocks.map((stock) => (
          <div 
            key={stock.id}
            className="flex items-center gap-2 bg-[#151921] border border-white/10 rounded-full pl-4 pr-2 py-2"
          >
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stock.color }} />
            <span className="font-medium text-white text-sm">{stock.name}</span>
            <span className="text-gray-500 text-xs font-mono">{stock.code}</span>
            <button 
              onClick={() => removeStock(stock.id)}
              className="ml-2 w-6 h-6 rounded-full bg-white/5 hover:bg-red-500/20 hover:text-red-400 flex items-center justify-center text-gray-400 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
        
        {selectedStocks.length < 4 && (
          <div className="relative">
            {showSearch ? (
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="종목 검색..."
                    className="pl-9 h-10 w-48 bg-[#151921] border-white/10 text-white rounded-full"
                    autoFocus
                  />
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full"
                  onClick={() => { setShowSearch(false); setSearchQuery(""); }}
                >
                  <X className="w-4 h-4 text-gray-400" />
                </Button>
              </div>
            ) : (
              <Button 
                variant="outline" 
                size="sm"
                className="rounded-full gap-2 bg-primary/10 border-primary/30 text-primary hover:bg-primary/20"
                onClick={() => setShowSearch(true)}
              >
                <Plus className="w-4 h-4" />
                종목 추가
              </Button>
            )}
            
            {showSearch && searchQuery && filteredStocks.length > 0 && (
              <div className="absolute top-12 left-0 w-64 bg-[#151921] border border-white/10 rounded-lg shadow-xl z-10 overflow-hidden">
                {filteredStocks.slice(0, 5).map((stock) => (
                  <button
                    key={stock.id}
                    onClick={() => addStock(stock)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 text-left transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: stock.color }} />
                    <div>
                      <div className="text-white text-sm font-medium">{stock.name}</div>
                      <div className="text-gray-500 text-xs font-mono">{stock.code}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="bg-[#151921] border border-white/5 rounded-xl p-6">
        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-primary" />
          가격 추이 비교 (30일)
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} hide />
              <Tooltip 
                contentStyle={{ backgroundColor: '#151921', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                labelStyle={{ color: '#fff' }}
              />
              {selectedStocks.map((stock) => {
                const data = generateChartData(stock.id);
                return (
                  <Line 
                    key={stock.id}
                    data={data}
                    dataKey="value"
                    name={stock.name}
                    stroke={stock.color}
                    strokeWidth={2}
                    dot={false}
                  />
                );
              })}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-[#151921] border border-white/5 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            핵심 지표 비교
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">지표</th>
                {selectedStocks.map((stock) => (
                  <th key={stock.id} className="text-center px-6 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: stock.color }} />
                      <span className="text-xs font-bold text-white">{stock.name}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {metrics.map((metric) => (
                <tr key={metric.key} className="border-b border-white/5 last:border-b-0">
                  <td className="px-6 py-4 text-sm text-gray-400 font-medium">{metric.label}</td>
                  {selectedStocks.map((stock) => {
                    const value = stock[metric.key as keyof Stock];
                    const isChange = metric.key === "change";
                    return (
                      <td key={stock.id} className="text-center px-6 py-4">
                        {isChange ? (
                          <span className={cn(
                            "font-bold text-sm flex items-center justify-center gap-1",
                            (value as number) > 0 ? "text-red-400" : "text-blue-400"
                          )}>
                            {(value as number) > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                            {(value as number) > 0 ? "+" : ""}{value}%
                          </span>
                        ) : metric.key === "price" ? (
                          <span className="text-white font-bold text-sm">{value}원</span>
                        ) : metric.key === "per" || metric.key === "pbr" ? (
                          <span className="text-white font-mono text-sm">{value}배</span>
                        ) : (
                          <span className="text-white text-sm">{value}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-lg border border-blue-500/30 bg-blue-900/10 overflow-hidden">
        <div className="bg-blue-500/20 px-4 py-2 flex items-center gap-2 border-b border-blue-500/20">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider font-mono">AI 비교 분석</h4>
        </div>
        <div className="p-4">
          <div className="text-sm text-gray-300 leading-relaxed">
            {selectedStocks.length >= 2 ? (
              <span>
                <span className="text-white font-bold">{selectedStocks[0].name}</span>과 <span className="text-white font-bold">{selectedStocks[1].name}</span>을 비교 분석한 결과, 
                <br /><br />
                {selectedStocks[0].change > selectedStocks[1].change ? (
                  <span><span className="text-green-400 font-semibold">{selectedStocks[0].name}</span>이 단기 모멘텀에서 더 우수한 성과를 보이고 있습니다.</span>
                ) : (
                  <span><span className="text-green-400 font-semibold">{selectedStocks[1].name}</span>이 단기 모멘텀에서 더 우수한 성과를 보이고 있습니다.</span>
                )}
                <br /><br />
                밸류에이션 측면에서 <span className="text-yellow-400 font-semibold">PER 기준</span>으로는 {parseFloat(selectedStocks[0].per) < parseFloat(selectedStocks[1].per) ? selectedStocks[0].name : selectedStocks[1].name}이 더 저평가되어 있으며, 
                <span className="text-cyan-400 font-semibold"> ROE</span> 측면에서는 수익성의 차이가 확인됩니다.
              </span>
            ) : (
              <span className="text-gray-500">2개 이상의 종목을 선택하면 AI 비교 분석이 표시됩니다.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
