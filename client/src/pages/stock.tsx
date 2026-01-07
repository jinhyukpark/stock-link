import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import StockDetailView from "@/components/stock/StockDetailView";
import { 
  Star, 
  Download, 
  Search,
  Zap,
  Cpu,
  Box,
  Globe,
  HardHat,
  Factory,
  Database,
  Satellite,
  Wifi,
  Radio,
  Microchip,
  ChevronUp,
  ChevronDown,
  LayoutGrid,
  List
} from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, YAxis } from "recharts";

// --- Mock Data ---

const themes = [
  { icon: Zap, name: "전선", change: 6.13, up: true },
  { icon: Factory, name: "로봇(산업용/협동로봇 등)", change: 5.13, up: true },
  { icon: Box, name: "3D 프린터", change: 5.04, up: true },
  { icon: Globe, name: "인터넷 대표주", change: 4.94, up: true },
  { icon: HardHat, name: "건설기계", change: 4.71, up: true },
  { icon: Factory, name: "스마트팩토리(스마트공장)", change: 3.91, up: true },
  { icon: Database, name: "핵융합에너지", change: 3.87, up: true },
  { icon: Cpu, name: "4차산업 수혜주", change: 3.34, up: true },
  { icon: Microchip, name: "지능형로봇/인공지능(AI)", change: 3.12, up: true },
  { icon: Satellite, name: "우주항공산업(누리호/...", change: 3.10, up: true },
  { icon: HardHat, name: "해저터널(지하화/지하...", change: 2.90, up: true },
  { icon: Microchip, name: "반도체 대표주(생산)", change: 2.89, up: true },
  { icon: Globe, name: "남북경협", change: 2.78, up: true },
  { icon: Zap, name: "초전도체", change: 2.68, up: true },
  { icon: Radio, name: "항공기부품", change: 2.58, up: true },
  { icon: HardHat, name: "우크라이나 재건", change: 2.58, up: true },
  { icon: Database, name: "줄기세포", change: 2.55, up: true },
  { icon: Factory, name: "방위산업/전쟁 및 테러", change: 2.50, up: true },
  { icon: Zap, name: "전력설비", change: 2.48, up: true },
  { icon: Database, name: "코로나19(치료제/백신...", change: 2.27, up: true },
  { icon: Factory, name: "제대혈", change: 2.25, up: true },
  { icon: Radio, name: "자율주행차", change: 2.24, up: true },
  { icon: Wifi, name: "웹툰", change: 2.23, up: true },
  { icon: Satellite, name: "스페이스X(SpaceX)", change: 2.17, up: true },
  { icon: Cpu, name: "IT 대표주", change: 2.16, up: true },
];

const generateSparklineData = (trend: 'up' | 'down' | 'mixed') => {
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

const stocks = [
  { rank: 1, name: "KODEX 200선물인버스2X", price: 618, change: -5.30, vol: "735,374,849", amt: "4,611억 5,565만", cap: "1조 5,060억", per: "-", pbr: "-", high: "2,745", low: "618", trend: 'down' },
  { rank: 2, name: "남선알미늄", price: 1369, change: 4.50, vol: "154,160,530", amt: "2,157억 9,017만", cap: "1,767억 900만", per: "-", pbr: "0.45", high: "1,628", low: "1,000", trend: 'up' },
  { rank: 3, name: "휴림로봇", price: 7980, change: 28.71, vol: "98,105,185", amt: "7,430억 2,658만", cap: "9,532억 6,800만", per: "-", pbr: "2.71", high: "8,060", low: "1,443", trend: 'up' },
  { rank: 4, name: "KODEX 인버스", price: 2440, change: -2.59, vol: "48,608,934", amt: "1,194억 2,733만", cap: "8,649억 8,000만", per: "-", pbr: "-", high: "4,995", low: "2,435", trend: 'down' },
  { rank: 5, name: "재영솔루텍", price: 4670, change: 12.26, vol: "41,357,410", amt: "1,885억 2,767만", cap: "5,459억 1,200만", per: "17.60", pbr: "1.04", high: "4,755", low: "600", trend: 'up' },
  { rank: 6, name: "대주산업", price: 3235, change: 15.54, vol: "33,331,641", amt: "1,072억 5,726만", cap: "1,144억 9,400만", per: "30.45", pbr: "0.65", high: "3,415", low: "1,371", trend: 'up' },
  { rank: 7, name: "KODEX 2차전지산업레버리지", price: 1392, change: -0.36, vol: "28,271,521", amt: "391억 8,266만", cap: "5,416억 2,700만", per: "-", pbr: "-", high: "2,190", low: "621", trend: 'mixed' },
  { rank: 8, name: "휴림에이텍", price: 843, change: 12.10, vol: "26,928,582", amt: "235억 994만", cap: "558억 1,500만", per: "-", pbr: "2.91", high: "1,062", low: "445", trend: 'up' },
  { rank: 9, name: "한화갤러리아", price: 1413, change: 3.44, vol: "25,132,027", amt: "356억 8,941만", cap: "2,739억 2,400만", per: "-", pbr: "0.28", high: "1,858", low: "999", trend: 'up' },
  { rank: 10, name: "한국캐스트", price: 21350, change: 16.54, vol: "20,497,418", amt: "4,122억 5,714만", cap: "7,793억 2,500만", per: "141.67", pbr: "2.84", high: "21,650", low: "4,355", trend: 'up' },
  { rank: 11, name: "삼성전자", price: 119500, change: 2.14, vol: "19,676,004", amt: "2조 3,422억", cap: "707조 3,967억", per: "47.07", pbr: "1.38", high: "119,700", low: "50,800", trend: 'up' },
  { rank: 12, name: "원익홀딩스", price: 47750, change: 19.08, vol: "19,673,630", amt: "8,984억 2,291만", cap: "3조 6,881억", per: "46.69", pbr: "1.13", high: "49,050", low: "2,265", trend: 'up' },
  { rank: 13, name: "형지I&C", price: 725, change: 9.68, vol: "19,481,931", amt: "149억 5,800만", cap: "311억 4,800만", per: "-", pbr: "0.70", high: "2,874", low: "591", trend: 'up' },
  { rank: 14, name: "삼성 인버스 2X WTI원유 선...", price: 91, change: 1.11, vol: "17,149,027", amt: "15억 7,679만", cap: "1,362억 2,700만", per: "-", pbr: "-", high: "134", low: "63", trend: 'mixed' },
  { rank: 15, name: "현대무벡스", price: 20350, change: 5.66, vol: "16,999,737", amt: "3,410억 6,726만", cap: "2조 2,665억", per: "206.37", pbr: "6.39", high: "20,800", low: "3,170", trend: 'up' },
  { rank: 16, name: "조일알미늄", price: 1370, change: -1.37, vol: "16,790,251", amt: "230억 8,751만", cap: "1,734억 8,500만", per: "-", pbr: "-", high: "1,844", low: "1,204", trend: 'down' },
  { rank: 17, name: "KODEX 코스닥150레버리지", price: 11680, change: 2.23, vol: "16,585,544", amt: "1,918억 6,022만", cap: "1조 8,337억", per: "-", pbr: "-", high: "12,970", low: "5,610", trend: 'up' },
  { rank: 18, name: "KODEX 레버리지", price: 47540, change: 5.40, vol: "16,362,361", amt: "7,679억 3,379만", cap: "3조 3,872억", per: "-", pbr: "-", high: "47,560", low: "12,570", trend: 'up' },
  { rank: 19, name: "셀루메드", price: 1648, change: -13.08, vol: "15,867,802", amt: "259억 9,593만", cap: "905억 6,900만", per: "4.86", pbr: "2.37", high: "2,735", low: "542", trend: 'down' },
  { rank: 20, name: "KODEX 은선물(H)", price: 13120, change: 2.82, vol: "14,139,261", amt: "1,881억 3,685만", cap: "6,402억 5,600만", per: "-", pbr: "-", high: "13,920", low: "4,979", trend: 'up' },
  { rank: 21, name: "와이투솔루션", price: 4240, change: 6.53, vol: "13,913,746", amt: "622억 7,256만", cap: "1,550억 7,500만", per: "-", pbr: "1.14", high: "5,070", low: "1,790", trend: 'up' },
];

export default function StockPage() {
  const [filter, setFilter] = useState("volume"); // volume, amount, cap, change
  const [selectedStock, setSelectedStock] = useState<typeof stocks[0] | null>(null);

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-4rem)] bg-[#0B0E14] text-gray-200 font-sans overflow-hidden">
        
        {/* Left Sidebar */}
        <aside className="w-64 flex flex-col border-r border-white/5 bg-[#151921] shrink-0 z-20">
          <div className="bg-[#111318] p-4 space-y-2 border-b border-white/5">
            <div 
              className={cn("flex items-center gap-2 text-sm px-2 py-2 rounded cursor-pointer", !selectedStock ? "font-bold text-white bg-blue-600/20 border border-blue-500/30" : "font-bold text-gray-300 hover:bg-white/5 border border-transparent")}
              onClick={() => setSelectedStock(null)}
            >
              <List className={cn("w-4 h-4", !selectedStock ? "text-blue-400" : "text-gray-400")} />
              실시간 Top 100 차트
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400 px-2 py-2 rounded hover:bg-white/5 cursor-pointer border border-transparent">
              <Star className="w-4 h-4" />
              즐겨찾기
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400 px-2 py-2 rounded hover:bg-white/5 cursor-pointer border border-transparent">
              <LayoutGrid className="w-4 h-4" />
              멀티차트
            </div>
          </div>
          
          <div className="flex-1 flex flex-col min-h-0 pt-4">
            <div className="px-4 pb-2">
              <div className="grid grid-cols-2 bg-black/40 p-1 rounded-md">
                <button className="text-xs font-bold py-1.5 px-2 bg-gray-700 text-white rounded shadow-sm text-center">테마</button>
                <button className="text-xs text-gray-400 py-1.5 px-2 hover:text-white text-center">산업분류</button>
              </div>
            </div>

            <ScrollArea className="flex-1 px-2">
              <div className="space-y-0.5 pb-4">
                {themes.map((theme, idx) => (
                  <div key={idx} className="flex items-center justify-between px-3 py-2.5 rounded hover:bg-white/5 cursor-pointer group">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center shrink-0 group-hover:bg-gray-700">
                        <theme.icon className="w-3.5 h-3.5 text-gray-400 group-hover:text-white" />
                      </div>
                      <span className="text-xs text-gray-300 truncate group-hover:text-white">{theme.name}</span>
                    </div>
                    <span className={`text-xs font-mono font-medium ${theme.up ? 'text-red-400' : 'text-blue-400'}`}>
                      {theme.up ? '▲' : '▼'}{theme.change}%
                    </span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0 bg-[#0B0E14] overflow-hidden relative">
          {selectedStock ? (
            <StockDetailView onBack={() => setSelectedStock(null)} stockName={selectedStock.name} />
          ) : (
            <div className="flex flex-col h-full overflow-hidden">
              {/* Content Header */}
              <div className="p-6 pb-2 shrink-0">
                <h1 className="text-2xl font-bold text-white mb-6">실시간 TOP 100 차트</h1>
                
                <div className="flex flex-wrap justify-between items-center gap-4 bg-[#151921] p-3 rounded-lg border border-white/5">
                  <div className="flex items-center gap-6">
                     <label className="flex items-center gap-2 cursor-pointer group">
                       <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${filter === 'volume' ? 'border-primary' : 'border-gray-600'}`}>
                         {filter === 'volume' && <div className="w-2 h-2 rounded-full bg-primary" />}
                       </div>
                       <input type="radio" name="filter" className="hidden" checked={filter === 'volume'} onChange={() => setFilter('volume')} />
                       <span className={`text-sm ${filter === 'volume' ? 'text-primary font-bold' : 'text-gray-400 group-hover:text-gray-300'}`}>거래량</span>
                     </label>
                     <label className="flex items-center gap-2 cursor-pointer group">
                       <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${filter === 'amount' ? 'border-primary' : 'border-gray-600'}`}>
                         {filter === 'amount' && <div className="w-2 h-2 rounded-full bg-primary" />}
                       </div>
                       <input type="radio" name="filter" className="hidden" checked={filter === 'amount'} onChange={() => setFilter('amount')} />
                       <span className={`text-sm ${filter === 'amount' ? 'text-primary font-bold' : 'text-gray-400 group-hover:text-gray-300'}`}>거래대금</span>
                     </label>
                     <label className="flex items-center gap-2 cursor-pointer group">
                       <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${filter === 'cap' ? 'border-primary' : 'border-gray-600'}`}>
                         {filter === 'cap' && <div className="w-2 h-2 rounded-full bg-primary" />}
                       </div>
                       <input type="radio" name="filter" className="hidden" checked={filter === 'cap'} onChange={() => setFilter('cap')} />
                       <span className={`text-sm ${filter === 'cap' ? 'text-primary font-bold' : 'text-gray-400 group-hover:text-gray-300'}`}>시가총액</span>
                     </label>
                     <label className="flex items-center gap-2 cursor-pointer group">
                       <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${filter === 'change' ? 'border-primary' : 'border-gray-600'}`}>
                         {filter === 'change' && <div className="w-2 h-2 rounded-full bg-primary" />}
                       </div>
                       <input type="radio" name="filter" className="hidden" checked={filter === 'change'} onChange={() => setFilter('change')} />
                       <span className={`text-sm ${filter === 'change' ? 'text-primary font-bold' : 'text-gray-400 group-hover:text-gray-300'}`}>등락률</span>
                     </label>
                  </div>

                  <Button variant="outline" size="sm" className="h-8 gap-2 bg-[#0B0E14] border-white/10 hover:bg-white/5 text-gray-400">
                    <Download className="w-3.5 h-3.5" />
                    CSV
                  </Button>
                </div>
                
                <p className="text-[10px] text-gray-500 mt-2 ml-1">
                  ※ StockLink 의 차트 솔루션은 글로벌 커뮤니티를 위한 차트 플랫폼인 <span className="text-primary cursor-pointer hover:underline">트레이딩뷰</span> 에서 제공합니다. 국내외 주식 차트뿐만 아니라, <span className="text-primary cursor-pointer hover:underline">이코노믹 캘린더</span> 또는 <span className="text-primary cursor-pointer hover:underline">스탁 스크리너</span> 와 같은 고급 분석도구를 통해 종합적인 시장 분석에 기반한 거래를 할 수 있습니다.
                </p>
              </div>

              {/* Table */}
              <div className="flex-1 overflow-auto px-6 pb-0">
                 <table className="w-full text-xs text-left border-separate border-spacing-0 border-l border-t border-white/10">
                   <thead className="bg-[#151921] sticky top-0 z-10 text-gray-400 font-medium h-9">
                     <tr>
                       <th className="px-2 w-10 text-center border-b border-r border-white/10">#</th>
                       <th className="px-2 border-b border-r border-white/10">종목</th>
                       <th className="px-2 text-right border-b border-r border-white/10">현재가 <span className="text-[9px]">▼</span></th>
                       <th className="px-2 text-right border-b border-r border-white/10">등락률 <span className="text-[9px]">▼</span></th>
                       <th className="px-2 text-right border-b border-r border-white/10">거래량 <span className="text-[9px]">▼</span></th>
                       <th className="px-2 text-right border-b border-r border-white/10">거래대금 <span className="text-[9px]">▼</span></th>
                       <th className="px-2 text-right border-b border-r border-white/10">시가총액 <span className="text-[9px]">▼</span></th>
                       <th className="px-2 text-right border-b border-r border-white/10">PER <span className="text-[9px]">▼</span></th>
                       <th className="px-2 text-right border-b border-r border-white/10">PBR <span className="text-[9px]">▼</span></th>
                       <th className="px-2 text-right border-b border-r border-white/10">52주 최고가 <span className="text-[9px]">▼</span></th>
                       <th className="px-2 text-right border-b border-r border-white/10">52주 최저가 <span className="text-[9px]">▼</span></th>
                       <th className="px-2 w-24 text-center border-b border-r border-white/10">미니차트</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-white/5">
                     {stocks.map((stock) => (
                       <tr 
                         key={stock.rank} 
                         className="hover:bg-white/[0.02] transition-colors group cursor-pointer"
                         onClick={() => setSelectedStock(stock)}
                       >
                         <td className="px-2 py-2.5 text-center text-gray-500 font-mono border-r border-white/10 border-b border-white/5">
                           <div className="flex items-center justify-center gap-1">
                             <Star className="w-3 h-3 text-gray-700 hover:text-yellow-400 cursor-pointer" />
                             {stock.rank}
                           </div>
                         </td>
                         <td className="px-2 py-2.5 border-r border-white/10 border-b border-white/5">
                           <div className="flex items-center gap-2">
                             <div className={`w-1 h-3 rounded-full ${stock.change > 0 ? 'bg-red-500' : 'bg-blue-500'}`} />
                             <span className="text-gray-200 font-bold hover:underline cursor-pointer">{stock.name}</span>
                           </div>
                         </td>
                         <td className="px-2 py-2.5 text-right font-mono text-gray-300 border-r border-white/10 border-b border-white/5">
                           {stock.price.toLocaleString()}
                         </td>
                         <td className={`px-2 py-2.5 text-right font-mono font-medium border-r border-white/10 border-b border-white/5 ${stock.change > 0 ? 'text-red-400' : 'text-blue-400'}`}>
                           <div className="flex items-center justify-end gap-1">
                             {stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)}%
                           </div>
                         </td>
                         <td className="px-2 py-2.5 text-right font-mono text-gray-400 border-r border-white/10 border-b border-white/5">{stock.vol}</td>
                         <td className="px-2 py-2.5 text-right font-mono text-gray-400 border-r border-white/10 border-b border-white/5">{stock.amt}</td>
                         <td className="px-2 py-2.5 text-right font-mono text-gray-400 border-r border-white/10 border-b border-white/5">{stock.cap}</td>
                         <td className={`px-2 py-2.5 text-right font-mono border-r border-white/10 border-b border-white/5 ${stock.per !== '-' ? 'text-red-400' : 'text-gray-600'}`}>{stock.per !== '-' && '+'}{stock.per}%</td>
                         <td className={`px-2 py-2.5 text-right font-mono border-r border-white/10 border-b border-white/5 ${stock.pbr !== '-' ? 'text-red-400' : 'text-gray-600'}`}>{stock.pbr !== '-' && '+'}{stock.pbr}%</td>
                         <td className="px-2 py-2.5 text-right font-mono text-gray-400 border-r border-white/10 border-b border-white/5">{Number(stock.high.replace(/,/g,'')).toLocaleString()}</td>
                         <td className="px-2 py-2.5 text-right font-mono text-gray-400 border-r border-white/10 border-b border-white/5">{Number(stock.low.replace(/,/g,'')).toLocaleString()}</td>
                         <td className="px-2 py-1 pr-4 border-r border-white/10 border-b border-white/5">
                           <div className="h-8 w-20 ml-auto">
                            <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={generateSparklineData(stock.trend as any)}>
                                <defs>
                                  <linearGradient id={`spark_${stock.rank}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={stock.change > 0 ? "#ef4444" : "#3b82f6"} stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor={stock.change > 0 ? "#ef4444" : "#3b82f6"} stopOpacity={0}/>
                                  </linearGradient>
                                </defs>
                                <Area 
                                  type="monotone" 
                                  dataKey="value" 
                                  stroke={stock.change > 0 ? "#ef4444" : "#3b82f6"} 
                                  fill={`url(#spark_${stock.rank})`} 
                                  strokeWidth={1.5}
                                />
                                <YAxis domain={['dataMin', 'dataMax']} hide />
                              </AreaChart>
                            </ResponsiveContainer>
                           </div>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
              </div>

              {/* Bottom Ticker */}
              <div className="bg-[#0f1115] border-t border-white/5 h-8 flex items-center px-4 overflow-hidden shrink-0">
                 <div className="flex gap-8 text-[10px] font-mono whitespace-nowrap animate-ticker">
                    <div className="flex items-center gap-2">
                       <span className="text-gray-400">코스피 종합</span>
                       <span className="text-gray-200 font-bold">2220.56</span>
                       <span className="text-red-400">▲ 90.88 2.2%</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="text-gray-400">코스닥 종합</span>
                       <span className="text-gray-200 font-bold">932.59</span>
                       <span className="text-red-400">▲ 12.92 1.4%</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="text-gray-400">나스닥 종합</span>
                       <span className="text-gray-200 font-bold">23450.97</span>
                       <span className="text-blue-400">▼ 142.13 -0.6%</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="text-gray-400">다우 산업</span>
                       <span className="text-gray-200 font-bold">48710.97</span>
                       <span className="text-blue-400">▼ 20.19 -0.04%</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="text-gray-400">S&P 500</span>
                       <span className="text-gray-200 font-bold">6900.9</span>
                       <span className="text-blue-400">▼ 29.04 -0.42%</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="text-gray-400">달러환율</span>
                       <span className="text-gray-200 font-bold">1434.1</span>
                       <span className="text-blue-400">▼ 8.1 -0.56%</span>
                    </div>
                 </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </DashboardLayout>
  );
}
