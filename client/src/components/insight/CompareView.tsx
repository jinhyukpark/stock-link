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
  ChevronDown,
  Settings2,
  Check,
  Download
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

const stockIcons: Record<string, string> = {
  samsung: "https://cdn.brandfetch.io/samsung.com/w/400/h/400",
  sk: "https://cdn.brandfetch.io/skhynix.com/w/400/h/400",
  "lg-energy": "https://cdn.brandfetch.io/lg.com/w/400/h/400",
  "hyundai-car": "https://cdn.brandfetch.io/hyundai.com/w/400/h/400",
  naver: "https://cdn.brandfetch.io/naver.com/w/400/h/400",
  kakao: "https://cdn.brandfetch.io/kakaocorp.com/w/400/h/400",
  kb: "https://cdn.brandfetch.io/kbfg.com/w/400/h/400",
  posco: "https://cdn.brandfetch.io/posco.com/w/400/h/400",
  celltrion: "https://cdn.brandfetch.io/celltrion.com/w/400/h/400",
  kia: "https://cdn.brandfetch.io/kia.com/w/400/h/400",
};

const stockDatabase: Stock[] = [
  { 
    id: "samsung", name: "삼성전자", code: "005930", price: "78,200", change: 1200, changePercent: "1.56%", color: "#3b82f6",
    metrics: { aiScore1w: 85, aiScore2w: 82, aiScore4w: 78, aiScore6w: 75, marketCapM: "467,254,800", foreignRate: 52.14, dividend: 2.35, per: 12.5, pbr: 1.2, eps: 6256, psr: 1.82, roe: 9.6, roa: 512.35, sps: 42985, totalAssets: 4265842, totalDebt: 1125486, revenue: 2589542, operatingProfit: 356214, grossProfit: 485621, continuingOps: 412542, netIncome: 356214, revenueGrowth: 8.52, opProfitGrowth: 15.24, netIncomeGrowth: 12.35, debtRatio: 26.38, currentRatio: 285.42 }
  },
  { 
    id: "sk", name: "SK하이닉스", code: "000660", price: "765,000", change: 23000, changePercent: "3.1%", color: "#ef4444",
    metrics: { aiScore1w: 92, aiScore2w: 88, aiScore4w: 85, aiScore6w: 80, marketCapM: "126,599,611", foreignRate: 53.98, dividend: 1.27, per: 6.4, pbr: 1.62, eps: 27182, psr: 1.91, roe: 31.07, roa: 1651.73, sps: 90924, totalAssets: 1198552, totalDebt: 459395, revenue: 661930, operatingProfit: 234673, grossProfit: 318281, continuingOps: 238854, netIncome: 197969, revenueGrowth: 102.02, opProfitGrowth: 403.58, netIncomeGrowth: 316.65, debtRatio: 62.15, currentRatio: 169.35 }
  },
  { 
    id: "lg-energy", name: "LG에너지솔루션", code: "373220", price: "392,000", change: -5500, changePercent: "-1.38%", color: "#22c55e",
    metrics: { aiScore1w: 58, aiScore2w: 62, aiScore4w: 55, aiScore6w: 52, marketCapM: "91,728,000", foreignRate: 28.45, dividend: 0, per: 45.3, pbr: 4.2, eps: 8652, psr: 3.85, roe: 9.3, roa: 425.68, sps: 101825, totalAssets: 685421, totalDebt: 285642, revenue: 338254, operatingProfit: 28542, grossProfit: 58642, continuingOps: 32541, netIncome: 25648, revenueGrowth: 32.45, opProfitGrowth: -15.24, netIncomeGrowth: -22.35, debtRatio: 41.68, currentRatio: 145.62 }
  },
  { 
    id: "hyundai-car", name: "현대차", code: "005380", price: "340,500", change: -10000, changePercent: "-2.85%", color: "#f97316",
    metrics: { aiScore1w: 45, aiScore2w: 48, aiScore4w: 52, aiScore6w: 58, marketCapM: "44,396,232", foreignRate: 36.62, dividend: 5.66, per: 4.6, pbr: 0.51, eps: 46042, psr: 0.33, roe: 11.91, roa: 389.35, sps: 644061, totalAssets: 3397984, totalDebt: 2195225, revenue: 1752312, operatingProfit: 142396, grossProfit: 357492, continuingOps: 177814, netIncome: 132299, revenueGrowth: 7.73, opProfitGrowth: -5.87, netIncomeGrowth: 7.8, debtRatio: 182.52, currentRatio: 80.92 }
  },
  { 
    id: "naver", name: "NAVER", code: "035420", price: "205,000", change: 3500, changePercent: "1.74%", color: "#a855f7",
    metrics: { aiScore1w: 72, aiScore2w: 75, aiScore4w: 70, aiScore6w: 68, marketCapM: "33,648,500", foreignRate: 48.52, dividend: 0.42, per: 28.4, pbr: 1.4, eps: 7218, psr: 4.25, roe: 4.9, roa: 285.42, sps: 48256, totalAssets: 425648, totalDebt: 98542, revenue: 98542, operatingProfit: 18542, grossProfit: 42568, continuingOps: 22548, netIncome: 18425, revenueGrowth: 12.85, opProfitGrowth: 8.54, netIncomeGrowth: 6.25, debtRatio: 23.15, currentRatio: 312.45 }
  },
  { 
    id: "kakao", name: "카카오", code: "035720", price: "54,000", change: -1200, changePercent: "-2.17%", color: "#eab308",
    metrics: { aiScore1w: 38, aiScore2w: 42, aiScore4w: 45, aiScore6w: 40, marketCapM: "24,012,000", foreignRate: 35.24, dividend: 0, per: 52.1, pbr: 1.1, eps: 1036, psr: 2.85, roe: 2.1, roa: 125.42, sps: 18952, totalAssets: 285642, totalDebt: 125486, revenue: 85426, operatingProfit: 5842, grossProfit: 28564, continuingOps: 6854, netIncome: 4256, revenueGrowth: -5.24, opProfitGrowth: -28.54, netIncomeGrowth: -35.42, debtRatio: 43.92, currentRatio: 185.24 }
  },
  { 
    id: "kb", name: "KB금융", code: "105560", price: "82,500", change: 1800, changePercent: "2.23%", color: "#14b8a6",
    metrics: { aiScore1w: 78, aiScore2w: 75, aiScore4w: 72, aiScore6w: 70, marketCapM: "32,835,000", foreignRate: 68.42, dividend: 5.82, per: 5.8, pbr: 0.58, eps: 14224, psr: 1.25, roe: 10.02, roa: 45.24, sps: 66024, totalAssets: 6854256, totalDebt: 6254862, revenue: 265842, operatingProfit: 85426, grossProfit: 125486, continuingOps: 95246, netIncome: 72548, revenueGrowth: 8.54, opProfitGrowth: 12.45, netIncomeGrowth: 15.24, debtRatio: 91.26, currentRatio: 112.35 }
  },
  { 
    id: "posco", name: "POSCO홀딩스", code: "005490", price: "312,000", change: 8500, changePercent: "2.80%", color: "#64748b",
    metrics: { aiScore1w: 55, aiScore2w: 52, aiScore4w: 48, aiScore6w: 45, marketCapM: "26,364,000", foreignRate: 42.85, dividend: 3.52, per: 6.2, pbr: 0.42, eps: 50322, psr: 0.28, roe: 6.77, roa: 285.42, sps: 1114285, totalAssets: 1254862, totalDebt: 685426, revenue: 942568, operatingProfit: 65428, grossProfit: 125486, continuingOps: 72548, netIncome: 58426, revenueGrowth: -12.45, opProfitGrowth: -25.42, netIncomeGrowth: -32.15, debtRatio: 54.62, currentRatio: 135.24 }
  },
  { 
    id: "celltrion", name: "셀트리온", code: "068270", price: "178,500", change: 4200, changePercent: "2.41%", color: "#ec4899",
    metrics: { aiScore1w: 68, aiScore2w: 72, aiScore4w: 75, aiScore6w: 78, marketCapM: "24,862,500", foreignRate: 18.54, dividend: 0.28, per: 35.2, pbr: 4.85, eps: 5071, psr: 8.52, roe: 13.78, roa: 542.68, sps: 20945, totalAssets: 185426, totalDebt: 42568, revenue: 29854, operatingProfit: 8542, grossProfit: 18542, continuingOps: 9854, netIncome: 7856, revenueGrowth: 25.42, opProfitGrowth: 32.45, netIncomeGrowth: 28.54, debtRatio: 22.95, currentRatio: 425.62 }
  },
  { 
    id: "kia", name: "기아", code: "000270", price: "128,500", change: -2500, changePercent: "-1.91%", color: "#06b6d4",
    metrics: { aiScore1w: 62, aiScore2w: 58, aiScore4w: 55, aiScore6w: 52, marketCapM: "52,268,250", foreignRate: 38.42, dividend: 4.85, per: 4.2, pbr: 0.72, eps: 30595, psr: 0.35, roe: 17.14, roa: 485.62, sps: 367142, totalAssets: 985426, totalDebt: 542568, revenue: 1485426, operatingProfit: 125486, grossProfit: 285642, continuingOps: 142568, netIncome: 118542, revenueGrowth: 12.54, opProfitGrowth: 18.42, netIncomeGrowth: 22.35, debtRatio: 55.06, currentRatio: 125.42 }
  },
];

const generateChartData = (stockId: string) => {
  const baseValue = stockId === "samsung" ? 78000 : stockId === "sk" ? 140000 : stockId === "lg" ? 395000 : 100000;
  return Array.from({ length: 30 }, (_, i) => ({
    date: `${i + 1}`,
    value: baseValue + (Math.random() - 0.5) * baseValue * 0.1 + Math.sin(i / 5) * baseValue * 0.03,
  }));
};

const metricCategories = {
  aiScore: { label: "AI스코어", items: ["aiScore1w", "aiScore2w", "aiScore4w", "aiScore6w"] },
  basic: { label: "기본정보", items: ["marketCapM", "foreignRate", "dividend"] },
  investment: { label: "투자지표", items: ["per", "pbr", "eps", "psr", "roe", "roa", "sps"] },
  financial: { label: "재무정보", items: ["totalAssets", "totalDebt", "revenue", "operatingProfit", "grossProfit", "continuingOps", "netIncome"] },
  growth: { label: "성장성지표", items: ["revenueGrowth", "opProfitGrowth", "netIncomeGrowth"] },
  stability: { label: "안정성지표", items: ["debtRatio", "currentRatio"] },
};

export default function CompareView() {
  const stockGroups = [
    { id: 'semi', label: '💻 반도체/AI', stocks: ['samsung', 'sk'] },
    { id: 'auto', label: '🚗 자동차', stocks: ['hyundai-car', 'kia'] },
    { id: 'battery', label: '🔋 이차전지', stocks: ['lg-energy', 'posco'] },
    { id: 'platform', label: '📱 플랫폼', stocks: ['naver', 'kakao'] }
  ];

  const [selectedStocks, setSelectedStocks] = useState<Stock[]>(() => {
    const initialStocks = stockDatabase.filter(s => stockGroups[0].stocks.includes(s.id));
    return initialStocks;
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showFieldSelector, setShowFieldSelector] = useState(false);
  const [visibleFields, setVisibleFields] = useState<string[]>([
    "aiScore1w", "aiScore2w", "aiScore4w", "aiScore6w",
    "marketCapM", "foreignRate", "dividend", "per", "pbr", "eps", "psr", "roe", "roa", "sps",
    "totalAssets", "totalDebt", "revenue", "operatingProfit", "grossProfit", "continuingOps", "netIncome",
    "revenueGrowth", "opProfitGrowth", "netIncomeGrowth", "debtRatio", "currentRatio"
  ]);
  const [tempVisibleFields, setTempVisibleFields] = useState<string[]>([]);

  const filteredStocks = stockDatabase.filter(
    stock => 
      !selectedStocks.find(s => s.id === stock.id) &&
      (stock.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
       stock.code.includes(searchQuery))
  );

  const addStock = (stock: Stock) => {
    setSelectedStocks([...selectedStocks, stock]);
    setSearchQuery("");
    setShowSearch(false);
  };

  const removeStock = (stockId: string) => {
    setSelectedStocks(selectedStocks.filter(s => s.id !== stockId));
  };

  const allMetrics = [
    { key: "aiScore1w", label: "AI스코어 1주" },
    { key: "aiScore2w", label: "AI스코어 2주" },
    { key: "aiScore4w", label: "AI스코어 4주" },
    { key: "aiScore6w", label: "AI스코어 6주" },
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
    { key: "continuingOps", label: "세전계속사업이익(억)" },
    { key: "netIncome", label: "당기순이익(억)" },
    { key: "revenueGrowth", label: "매출액 증가율" },
    { key: "opProfitGrowth", label: "영업이익 증가율" },
    { key: "netIncomeGrowth", label: "순이익 증가율" },
    { key: "debtRatio", label: "부채비율" },
    { key: "currentRatio", label: "유동비율" },
  ];
  
  const metrics = allMetrics.filter(m => visibleFields.includes(m.key));

  const openFieldSelector = () => {
    setTempVisibleFields([...visibleFields]);
    setShowFieldSelector(true);
  };

  const toggleField = (key: string) => {
    setTempVisibleFields(prev => 
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const toggleCategory = (categoryKey: string) => {
    const category = metricCategories[categoryKey as keyof typeof metricCategories];
    const allSelected = category.items.every(item => tempVisibleFields.includes(item));
    if (allSelected) {
      setTempVisibleFields(prev => prev.filter(k => !category.items.includes(k)));
    } else {
      setTempVisibleFields(prev => Array.from(new Set([...prev, ...category.items])));
    }
  };

  const applyFieldSelection = () => {
    setVisibleFields(tempVisibleFields);
    setShowFieldSelector(false);
  };

  const addGroup = (groupStockIds: string[]) => {
    const stocksToAdd = stockDatabase.filter(stock => 
      groupStockIds.includes(stock.id) && !selectedStocks.find(s => s.id === stock.id)
    );
    if (stocksToAdd.length > 0) {
      setSelectedStocks([...selectedStocks, ...stocksToAdd]);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      <div className="flex flex-col gap-3 bg-[#151921] border border-white/5 rounded-xl p-4 shadow-sm">
        {/* Quick Add Groups */}
        <div className="flex items-center gap-2 pb-2 border-b border-white/5 overflow-x-auto no-scrollbar">
          {stockGroups.map(group => (
            <Button
              key={group.id}
              variant="outline"
              size="sm"
              className="h-7 text-xs bg-white/5 border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/20 px-3 py-0 rounded-full shrink-0"
              onClick={() => addGroup(group.stocks)}
            >
              {group.label}
              <Plus className="w-3 h-3 ml-1.5 opacity-70" />
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-4 flex-wrap pt-1">
          {selectedStocks.length < stockDatabase.length && (
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
              <div className="flex items-center gap-2">
                {selectedStocks.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 text-xs bg-red-500/10 border-red-500/30 text-red-400 hover:text-red-300 hover:bg-red-500/20 px-4 rounded-full font-medium"
                    onClick={() => setSelectedStocks([])}
                    title="전체 초기화"
                  >
                    초기화
                  </Button>
                )}
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="rounded-full gap-2 bg-primary/10 border-primary/30 text-primary hover:bg-primary/20"
                  onClick={() => setShowSearch(true)}
                >
                  <Plus className="w-4 h-4" />
                  종목 추가
                </Button>
              </div>
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
        </div>
      </div>

      {showFieldSelector && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setShowFieldSelector(false)}>
          <div className="bg-white rounded-xl w-[800px] max-h-[85vh] overflow-hidden shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100 shrink-0">
              <h3 className="text-lg font-bold text-gray-900">컬럼</h3>
              <button onClick={() => setShowFieldSelector(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-6 h-6" strokeWidth={1.5} />
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto bg-white">
              <label className="flex items-center gap-3 mb-10 cursor-pointer w-fit group">
                <div className={cn(
                  "w-5 h-5 rounded flex items-center justify-center transition-colors",
                  tempVisibleFields.length === allMetrics.length ? "bg-[#00bcd4] border-none" : "border-2 border-gray-200 group-hover:border-[#00bcd4]"
                )}>
                  {tempVisibleFields.length === allMetrics.length && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                </div>
                <span className="text-gray-900 font-bold text-[15px]">모든 컬럼 <span className="text-gray-400 font-medium">({tempVisibleFields.length} 선택됨)</span></span>
              </label>

              <div className="grid grid-cols-3 gap-x-12 gap-y-12">
                {Object.entries(metricCategories).map(([catKey, category]) => (
                  <div key={catKey}>
                    <label className="flex items-center gap-3 mb-5 cursor-pointer w-fit group" onClick={() => toggleCategory(catKey)}>
                      <div className={cn(
                        "w-5 h-5 rounded flex items-center justify-center transition-colors",
                        category.items.every(item => tempVisibleFields.includes(item)) ? "bg-[#00bcd4] border-none" : "border-2 border-gray-200 group-hover:border-[#00bcd4]"
                      )}>
                        {category.items.every(item => tempVisibleFields.includes(item)) && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                      </div>
                      <span className="text-gray-900 font-bold text-[15px]">{category.label}</span>
                    </label>
                    <div className="space-y-4 ml-8">
                      {category.items.map(itemKey => {
                        const metric = allMetrics.find(m => m.key === itemKey);
                        return (
                          <label key={itemKey} className="flex items-center gap-3 cursor-pointer w-fit group" onClick={() => toggleField(itemKey)}>
                            <div className={cn(
                              "w-5 h-5 rounded flex items-center justify-center transition-colors",
                              tempVisibleFields.includes(itemKey) ? "bg-[#00bcd4] border-none" : "border-2 border-gray-200 group-hover:border-[#00bcd4]"
                            )}>
                              {tempVisibleFields.includes(itemKey) && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                            </div>
                            <span className="text-gray-600 text-[14px]">{metric?.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center py-6 border-t border-gray-100 shrink-0 bg-white">
              <Button onClick={applyFieldSelection} className="px-12 bg-[#00bcd4] hover:bg-[#00acc1] text-white font-bold h-11 rounded-md text-base min-w-[120px]">
                적용
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-[#151921] border border-white/5 rounded-xl p-6">
        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-primary" />
          가격 추이 비교 (30일)
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={(() => {
                const stockSeeds: Record<string, number[]> = {};
                selectedStocks.forEach(stock => {
                  let current = 0;
                  stockSeeds[stock.id] = [];
                  for (let i = 0; i < 30; i++) {
                    const trend = Math.sin(i / 3 + stock.id.length) * 2;
                    const spike = Math.random() > 0.85 ? (Math.random() - 0.5) * 8 : 0;
                    const change = (Math.random() - 0.5) * 3 + trend + spike;
                    current = Math.max(-25, Math.min(25, current + change));
                    stockSeeds[stock.id].push(current);
                  }
                });
                return Array.from({ length: 30 }, (_, i) => {
                  const point: Record<string, number | string> = { date: `${i + 1}일` };
                  selectedStocks.forEach(stock => {
                    point[stock.id] = stockSeeds[stock.id][i];
                  });
                  return point;
                });
              })()}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} label={{ value: '일자', position: 'insideBottomRight', offset: -5, fill: '#64748b', fontSize: 11 }} />
              <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} width={80} tickFormatter={(value) => `${value > 0 ? '+' : ''}${value.toFixed(0)}%`} domain={[-30, 30]} label={{ value: '주식 상승율 (-30%~+30%)', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 10, dx: -10 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#151921', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                labelStyle={{ color: '#fff' }}
                formatter={(value: number, name: string) => {
                  const stock = selectedStocks.find(s => s.id === name);
                  return [`${value > 0 ? '+' : ''}${value.toFixed(1)}%`, stock?.name || name];
                }}
              />
              {selectedStocks.map((stock) => (
                <Line 
                  key={stock.id}
                  type="linear"
                  dataKey={stock.id}
                  name={stock.name}
                  stroke={stock.color}
                  strokeWidth={1.5}
                  dot={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-[#0a0c10] border border-white/10 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-primary" />
            종목심층비교
          </h3>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="rounded-lg gap-2 bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
              onClick={openFieldSelector}
            >
              <Settings2 className="w-4 h-4" />
              컬럼
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="rounded-lg gap-2 bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
              onClick={() => {
                const headers = ['항목', ...selectedStocks.map(s => s.name)];
                const rows = metrics.map(m => [m.label, ...selectedStocks.map(s => {
                  const value = s.metrics[m.key];
                  return value ?? '-';
                })]);
                const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
                const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = '종목비교.csv';
                a.click();
                URL.revokeObjectURL(url);
              }}
            >
              <Download className="w-4 h-4" />
              엑셀
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-[#0f1318]">
                <th className="text-left px-4 py-4 text-gray-400 font-medium sticky left-0 bg-[#0f1318] z-10 min-w-[160px] border-r border-white/10">항목</th>
                {selectedStocks.map((stock, i) => (
                  <th key={stock.id} className={cn(
                    "text-center px-4 py-4 min-w-[160px]",
                    i < selectedStocks.length - 1 && "border-r border-white/10"
                  )}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: stock.color + '20', borderColor: stock.color, borderWidth: 2 }}>
                        <img 
                          src={stockIcons[stock.id]} 
                          alt={stock.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            (e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="text-sm font-bold" style="color: ${stock.color}">${stock.name.substring(0,2)}</span>`;
                          }}
                        />
                      </div>
                      <div className="flex flex-col items-start text-left">
                        <span className="font-bold text-white text-sm">{stock.name}</span>
                        <div className="text-lg font-bold text-white">{stock.price}원</div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 text-xs font-mono">{stock.code}</span>
                          <span className={cn(
                            "text-xs font-semibold",
                            stock.change > 0 ? "text-red-400" : stock.change < 0 ? "text-blue-400" : "text-gray-400"
                          )}>
                            {stock.change > 0 ? "▲" : stock.change < 0 ? "▼" : ""} {Math.abs(stock.change).toLocaleString()} {stock.changePercent}
                          </span>
                        </div>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {metrics.map((metric, idx) => (
                <tr key={metric.key} className={cn(
                  "border-b border-white/5 hover:bg-white/[0.02] transition-colors",
                  idx % 2 === 0 ? "bg-[#0a0c10]" : "bg-[#0d0f14]"
                )}>
                  <td className={cn(
                    "px-4 py-2.5 font-medium text-gray-300 sticky left-0 z-10 border-r border-white/10",
                    idx % 2 === 0 ? "bg-[#0a0c10]" : "bg-[#0d0f14]"
                  )}>
                    <div className="flex items-center justify-between">
                      <span>{metric.label}</span>
                      <button className="flex flex-col items-center ml-2 hover:opacity-80 transition-opacity">
                        <svg width="8" height="5" viewBox="0 0 8 5" className="text-cyan-400 mb-0.5">
                          <path d="M4 0L8 5H0L4 0Z" fill="currentColor" />
                        </svg>
                        <svg width="8" height="5" viewBox="0 0 8 5" className="text-cyan-400">
                          <path d="M4 5L0 0H8L4 5Z" fill="currentColor" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  {selectedStocks.map((stock, i) => {
                    const value = stock.metrics[metric.key];
                    const numValue = typeof value === 'number' ? value : parseFloat(String(value).replace(/,/g, ''));
                    const allValues = selectedStocks.map(s => {
                      const v = s.metrics[metric.key];
                      return typeof v === 'number' ? v : parseFloat(String(v).replace(/,/g, ''));
                    }).filter(v => !isNaN(v));
                    const minVal = Math.min(...allValues);
                    const maxVal = Math.max(...allValues);
                    const range = maxVal - minVal || 1;
                    const normalizedValue = isNaN(numValue) ? 0.5 : (numValue - minVal) / range;
                    const getBgColor = () => {
                      if (isNaN(numValue) || value === '-') return 'transparent';
                      if (normalizedValue > 0.8) return 'rgba(34, 197, 94, 0.15)';
                      if (normalizedValue > 0.6) return 'rgba(34, 197, 94, 0.08)';
                      if (normalizedValue < 0.2) return 'rgba(239, 68, 68, 0.15)';
                      if (normalizedValue < 0.4) return 'rgba(239, 68, 68, 0.08)';
                      return 'transparent';
                    };
                    return (
                      <td key={stock.id} className={cn(
                        "text-center px-4 py-2.5",
                        i < selectedStocks.length - 1 && "border-r border-white/10"
                      )} style={{ backgroundColor: getBgColor() }}>
                        <span className="text-gray-200 font-mono text-sm">{typeof value === 'number' ? value.toLocaleString() : value}</span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
