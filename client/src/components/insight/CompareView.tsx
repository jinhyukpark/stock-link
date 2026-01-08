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
  Sparkles,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

type Stock = {
  id: string;
  name: string;
  code: string;
  price: string;
  change: number;
  changePercent: string;
  color: string;
  metrics: Record<string, string | number>;
};

const stockDatabase: Stock[] = [
  { 
    id: "sk", name: "SK하이닉스", code: "000660", price: "765,000", change: 23000, changePercent: "3.1%", color: "#ef4444",
    metrics: { marketCapM: "126,599,611", foreignRate: 53.98, dividend: 1.27, per: 6.4, pbr: 1.62, eps: 27182, psr: 1.91, roe: 31.07, roa: 1651.73, sps: 90924, totalAssets: 1198552, totalDebt: 459395, revenue: 661930, operatingProfit: 234673, grossProfit: 318281, continuingOps: 238854, netIncome: 197969, revenueGrowth: 102.02, opProfitGrowth: 403.58, netIncomeGrowth: 316.65, debtRatio: 62.15, currentRatio: 169.35 }
  },
  { 
    id: "samsung-ep", name: "삼성에피스홀딩스", code: "012620", price: "693,000", change: -4000, changePercent: "-0.57%", color: "#64748b",
    metrics: { marketCapM: "-", foreignRate: "-", dividend: "-", per: "-", pbr: "-", eps: "-", psr: "-", roe: "-", roa: "-", sps: "-", totalAssets: "-", totalDebt: "-", revenue: "-", operatingProfit: "-", grossProfit: "-", continuingOps: "-", netIncome: "-", revenueGrowth: "-", opProfitGrowth: "-", netIncomeGrowth: "-", debtRatio: "-", currentRatio: "-" }
  },
  { 
    id: "sk-square", name: "SK스퀘어", code: "402340", price: "431,500", change: 2000, changePercent: "0.47%", color: "#22c55e",
    metrics: { marketCapM: "10,685,672", foreignRate: 51.47, dividend: 0, per: 2.9, pbr: 0.55, eps: 27346, psr: 1.75, roe: 20.62, roa: 1665.3, sps: 45198, totalAssets: 219211, totalDebt: 23356, revenue: 61385, operatingProfit: 39126, grossProfit: 60134, continuingOps: 38356, netIncome: 36505, revenueGrowth: 169.41, opProfitGrowth: 267.23, netIncomeGrowth: 377.64, debtRatio: 11.92, currentRatio: 193.56 }
  },
  { 
    id: "hyundai-elevator", name: "현대오토에버", code: "307950", price: "396,000", change: 1500, changePercent: "0.38%", color: "#f97316",
    metrics: { marketCapM: "3,458,164", foreignRate: 2.52, dividend: 1.41, per: 20.25, pbr: 2.03, eps: 6228, psr: 0.93, roe: 10.54, roa: 523.01, sps: 135415, totalAssets: 33495, totalDebt: 16190, revenue: 37136, operatingProfit: 2244, grossProfit: 3945, continuingOps: 2267, netIncome: 1752, revenueGrowth: 21.16, opProfitGrowth: 23.71, netIncomeGrowth: 24.85, debtRatio: 93.55, currentRatio: 178.34 }
  },
  { 
    id: "hyundai-mobis", name: "현대모비스", code: "012330", price: "393,000", change: -500, changePercent: "0.13%", color: "#a855f7",
    metrics: { marketCapM: "21,993,340", foreignRate: 45.1, dividend: 2.54, per: 5.44, pbr: 0.46, eps: 43480, psr: 0.39, roe: 9.36, roa: 609.66, sps: 613625, totalAssets: 665969, totalDebt: 204787, revenue: 572370, operatingProfit: 30735, grossProfit: 80626, continuingOps: 52645, netIncome: 40602, revenueGrowth: -3.4, opProfitGrowth: 33.9, netIncomeGrowth: 18.6, debtRatio: 44.41, currentRatio: 223.02 }
  },
  { 
    id: "hyundai-car", name: "현대차", code: "005380", price: "340,500", change: -10000, changePercent: "-2.85%", color: "#3b82f6",
    metrics: { marketCapM: "44,396,232", foreignRate: 36.62, dividend: 5.66, per: 4.6, pbr: 0.51, eps: 46042, psr: 0.33, roe: 11.91, roa: 389.35, sps: 644061, totalAssets: 3397984, totalDebt: 2195225, revenue: 1752312, operatingProfit: 142396, grossProfit: 357492, continuingOps: 177814, netIncome: 132299, revenueGrowth: 7.73, opProfitGrowth: -5.87, netIncomeGrowth: 7.8, debtRatio: 182.52, currentRatio: 80.92 }
  },
  { 
    id: "hybe", name: "하이브", code: "352820", price: "332,000", change: -3000, changePercent: "-0.89%", color: "#eab308",
    metrics: { marketCapM: "13,978,242", foreignRate: 42.15, dividend: 0, per: 38.5, pbr: 3.82, eps: 8623, psr: 5.21, roe: 9.92, roa: 285.41, sps: 63745, totalAssets: 28542, totalDebt: 9854, revenue: 26854, operatingProfit: 3256, grossProfit: 8542, continuingOps: 4125, netIncome: 3624, revenueGrowth: 18.25, opProfitGrowth: 12.45, netIncomeGrowth: 15.32, debtRatio: 34.52, currentRatio: 245.32 }
  },
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
    { key: "marketCapM", label: "시가총액(백만)" },
    { key: "foreignRate", label: "외국인 지분율" },
    { key: "dividend", label: "배당수익률" },
    { key: "per", label: "PER" },
    { key: "pbr", label: "PBR" },
    { key: "eps", label: "EPS" },
    { key: "psr", label: "PSR" },
    { key: "roe", label: "ROE" },
    { key: "roa", label: "ROA" },
    { key: "sps", label: "SPS" },
    { key: "totalAssets", label: "자산총계(억)" },
    { key: "totalDebt", label: "부채총계(억)" },
    { key: "revenue", label: "매출액(억)" },
    { key: "operatingProfit", label: "영업이익(억)" },
    { key: "grossProfit", label: "매출총이익(억)" },
    { key: "continuingOps", label: "세전계속사업이..." },
    { key: "netIncome", label: "당기순이익(억)" },
    { key: "revenueGrowth", label: "매출액 증가율" },
    { key: "opProfitGrowth", label: "영업이익 증가율" },
    { key: "netIncomeGrowth", label: "순이익 증가율" },
    { key: "debtRatio", label: "부채비율" },
    { key: "currentRatio", label: "유동비율" },
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

      <div className="bg-[#0f1318] border border-white/5 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-[#151921]">
                <th className="text-left px-4 py-3 text-gray-400 font-medium sticky left-0 bg-[#151921] z-10 min-w-[140px]">항목</th>
                {selectedStocks.map((stock) => (
                  <th key={stock.id} className="text-center px-3 py-3 min-w-[120px]">
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: stock.color }} />
                        <span className="font-bold text-white text-sm">{stock.name}</span>
                      </div>
                      <div className="text-lg font-bold text-white">{stock.price}원</div>
                      <div className={cn(
                        "text-xs font-semibold",
                        stock.change > 0 ? "text-red-400" : stock.change < 0 ? "text-blue-400" : "text-gray-400"
                      )}>
                        {stock.change > 0 ? "▲" : stock.change < 0 ? "▼" : ""} {Math.abs(stock.change).toLocaleString()} {stock.changePercent}
                      </div>
                      <div className="text-gray-500 text-xs font-mono">{stock.code}</div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {metrics.map((metric, idx) => (
                <tr key={metric.key} className={cn(
                  "border-b border-white/5 hover:bg-white/[0.02] transition-colors",
                  idx % 2 === 0 ? "bg-[#0f1318]" : "bg-[#111519]"
                )}>
                  <td className={cn(
                    "px-4 py-2.5 font-medium text-gray-300 sticky left-0 z-10 flex items-center justify-between",
                    idx % 2 === 0 ? "bg-[#0f1318]" : "bg-[#111519]"
                  )}>
                    <span>{metric.label}</span>
                    <div className="flex flex-col ml-2">
                      <ChevronUp className="w-3 h-3 text-cyan-400 -mb-1" />
                      <ChevronDown className="w-3 h-3 text-cyan-400 -mt-1" />
                    </div>
                  </td>
                  {selectedStocks.map((stock) => {
                    const value = stock.metrics[metric.key];
                    return (
                      <td key={stock.id} className="text-center px-3 py-2.5">
                        <span className="text-gray-200 font-mono">{value}</span>
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
                밸류에이션 측면에서 <span className="text-yellow-400 font-semibold">PER 기준</span>으로는 {Number(selectedStocks[0].metrics.per) < Number(selectedStocks[1].metrics.per) ? selectedStocks[0].name : selectedStocks[1].name}이 더 저평가되어 있으며, 
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
