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
    id: "samsung", name: "삼성전자", code: "005930", price: "78,200", change: 1200, changePercent: "1.56%", color: "#3b82f6",
    metrics: { marketCapM: "467,254,800", foreignRate: 52.14, dividend: 2.35, per: 12.5, pbr: 1.2, eps: 6256, psr: 1.82, roe: 9.6, roa: 512.35, sps: 42985, totalAssets: 4265842, totalDebt: 1125486, revenue: 2589542, operatingProfit: 356214, grossProfit: 485621, continuingOps: 412542, netIncome: 356214, revenueGrowth: 8.52, opProfitGrowth: 15.24, netIncomeGrowth: 12.35, debtRatio: 26.38, currentRatio: 285.42 }
  },
  { 
    id: "sk", name: "SK하이닉스", code: "000660", price: "765,000", change: 23000, changePercent: "3.1%", color: "#ef4444",
    metrics: { marketCapM: "126,599,611", foreignRate: 53.98, dividend: 1.27, per: 6.4, pbr: 1.62, eps: 27182, psr: 1.91, roe: 31.07, roa: 1651.73, sps: 90924, totalAssets: 1198552, totalDebt: 459395, revenue: 661930, operatingProfit: 234673, grossProfit: 318281, continuingOps: 238854, netIncome: 197969, revenueGrowth: 102.02, opProfitGrowth: 403.58, netIncomeGrowth: 316.65, debtRatio: 62.15, currentRatio: 169.35 }
  },
  { 
    id: "lg-energy", name: "LG에너지솔루션", code: "373220", price: "392,000", change: -5500, changePercent: "-1.38%", color: "#22c55e",
    metrics: { marketCapM: "91,728,000", foreignRate: 28.45, dividend: 0, per: 45.3, pbr: 4.2, eps: 8652, psr: 3.85, roe: 9.3, roa: 425.68, sps: 101825, totalAssets: 685421, totalDebt: 285642, revenue: 338254, operatingProfit: 28542, grossProfit: 58642, continuingOps: 32541, netIncome: 25648, revenueGrowth: 32.45, opProfitGrowth: -15.24, netIncomeGrowth: -22.35, debtRatio: 41.68, currentRatio: 145.62 }
  },
  { 
    id: "hyundai-car", name: "현대차", code: "005380", price: "340,500", change: -10000, changePercent: "-2.85%", color: "#f97316",
    metrics: { marketCapM: "44,396,232", foreignRate: 36.62, dividend: 5.66, per: 4.6, pbr: 0.51, eps: 46042, psr: 0.33, roe: 11.91, roa: 389.35, sps: 644061, totalAssets: 3397984, totalDebt: 2195225, revenue: 1752312, operatingProfit: 142396, grossProfit: 357492, continuingOps: 177814, netIncome: 132299, revenueGrowth: 7.73, opProfitGrowth: -5.87, netIncomeGrowth: 7.8, debtRatio: 182.52, currentRatio: 80.92 }
  },
  { 
    id: "naver", name: "NAVER", code: "035420", price: "205,000", change: 3500, changePercent: "1.74%", color: "#a855f7",
    metrics: { marketCapM: "33,648,500", foreignRate: 48.52, dividend: 0.42, per: 28.4, pbr: 1.4, eps: 7218, psr: 4.25, roe: 4.9, roa: 285.42, sps: 48256, totalAssets: 425648, totalDebt: 98542, revenue: 98542, operatingProfit: 18542, grossProfit: 42568, continuingOps: 22548, netIncome: 18425, revenueGrowth: 12.85, opProfitGrowth: 8.54, netIncomeGrowth: 6.25, debtRatio: 23.15, currentRatio: 312.45 }
  },
  { 
    id: "kakao", name: "카카오", code: "035720", price: "54,000", change: -1200, changePercent: "-2.17%", color: "#eab308",
    metrics: { marketCapM: "24,012,000", foreignRate: 35.24, dividend: 0, per: 52.1, pbr: 1.1, eps: 1036, psr: 2.85, roe: 2.1, roa: 125.42, sps: 18952, totalAssets: 285642, totalDebt: 125486, revenue: 85426, operatingProfit: 5842, grossProfit: 28564, continuingOps: 6854, netIncome: 4256, revenueGrowth: -5.24, opProfitGrowth: -28.54, netIncomeGrowth: -35.42, debtRatio: 43.92, currentRatio: 185.24 }
  },
  { 
    id: "kb", name: "KB금융", code: "105560", price: "82,500", change: 1800, changePercent: "2.23%", color: "#14b8a6",
    metrics: { marketCapM: "32,835,000", foreignRate: 68.42, dividend: 5.82, per: 5.8, pbr: 0.58, eps: 14224, psr: 1.25, roe: 10.02, roa: 45.24, sps: 66024, totalAssets: 6854256, totalDebt: 6254862, revenue: 265842, operatingProfit: 85426, grossProfit: 125486, continuingOps: 95246, netIncome: 72548, revenueGrowth: 8.54, opProfitGrowth: 12.45, netIncomeGrowth: 15.24, debtRatio: 91.26, currentRatio: 112.35 }
  },
  { 
    id: "posco", name: "POSCO홀딩스", code: "005490", price: "312,000", change: 8500, changePercent: "2.80%", color: "#64748b",
    metrics: { marketCapM: "26,364,000", foreignRate: 42.85, dividend: 3.52, per: 6.2, pbr: 0.42, eps: 50322, psr: 0.28, roe: 6.77, roa: 285.42, sps: 1114285, totalAssets: 1254862, totalDebt: 685426, revenue: 942568, operatingProfit: 65428, grossProfit: 125486, continuingOps: 72548, netIncome: 58426, revenueGrowth: -12.45, opProfitGrowth: -25.42, netIncomeGrowth: -32.15, debtRatio: 54.62, currentRatio: 135.24 }
  },
  { 
    id: "celltrion", name: "셀트리온", code: "068270", price: "178,500", change: 4200, changePercent: "2.41%", color: "#ec4899",
    metrics: { marketCapM: "24,862,500", foreignRate: 18.54, dividend: 0.28, per: 35.2, pbr: 4.85, eps: 5071, psr: 8.52, roe: 13.78, roa: 542.68, sps: 20945, totalAssets: 185426, totalDebt: 42568, revenue: 29854, operatingProfit: 8542, grossProfit: 18542, continuingOps: 9854, netIncome: 7856, revenueGrowth: 25.42, opProfitGrowth: 32.45, netIncomeGrowth: 28.54, debtRatio: 22.95, currentRatio: 425.62 }
  },
  { 
    id: "kia", name: "기아", code: "000270", price: "128,500", change: -2500, changePercent: "-1.91%", color: "#06b6d4",
    metrics: { marketCapM: "52,268,250", foreignRate: 38.42, dividend: 4.85, per: 4.2, pbr: 0.72, eps: 30595, psr: 0.35, roe: 17.14, roa: 485.62, sps: 367142, totalAssets: 985426, totalDebt: 542568, revenue: 1485426, operatingProfit: 125486, grossProfit: 285642, continuingOps: 142568, netIncome: 118542, revenueGrowth: 12.54, opProfitGrowth: 18.42, netIncomeGrowth: 22.35, debtRatio: 55.06, currentRatio: 125.42 }
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
