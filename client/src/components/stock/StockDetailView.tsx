import { 
  Star, 
  ArrowLeft,
  Share2, 
  Printer, 
  Settings, 
  Maximize2,
  ChevronDown,
  Info,
  TrendingUp,
  Download,
  MessageCircle,
  MoreHorizontal,
  Cpu,
  Smartphone,
  Tv,
  Disc
} from "lucide-react";
import { useRef, useState } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { 
  ResizableHandle, 
  ResizablePanel, 
  ResizablePanelGroup 
} from "@/components/ui/resizable";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  LineChart,
  Line,
} from "recharts";

interface StockDetailViewProps {
  onBack: () => void;
  stockName: string;
}

// Mock Data for Order Book
const askOrders = Array.from({ length: 10 }, (_, i) => ({
  price: 141100 + i * 100,
  volume: Math.floor(Math.random() * 200000) + 10000,
  rate: ((141100 + i * 100 - 138900) / 138900 * 100).toFixed(2)
})).reverse();

const summaryData = [
  { label: '52주 최고', value: '144,400', color: 'text-red-400' },
  { label: '52주 최저', value: '50,800', color: 'text-blue-400' },
  { label: '상한가', value: '180,500', color: 'text-red-400' },
  { label: '하한가', value: '97,300', color: 'text-blue-400' },
  { label: '상승VI', value: '152,790', color: 'text-red-400' },
  { label: '하락VI', value: '125,010', color: 'text-blue-400' },
  { label: '시작', value: '143,500', color: 'text-white' },
  { label: '최고', value: '144,400', color: 'text-red-400' },
  { label: '최저', value: '137,600', color: 'text-blue-400' },
  { label: '거래량', value: '4,486만', color: 'text-white' },
];

const bidOrders = Array.from({ length: 10 }, (_, i) => ({
  price: 140900 - i * 100,
  volume: Math.floor(Math.random() * 20000) + 1000,
  rate: ((140900 - i * 100 - 138900) / 138900 * 100).toFixed(2)
}));

const currentPriceOrder = {
  price: 141000,
  rate: ((141000 - 138900) / 138900 * 100).toFixed(2),
  volume: 43886
};

const dailyPriceData = [
  { date: '2026.01.07', close: 141000, rate: 1.51, volume: 44861533 },
  { date: '2026.01.06', close: 138900, rate: 0.58, volume: 45208323 },
  { date: '2026.01.05', close: 138100, rate: 7.47, volume: 42847876 },
  { date: '2026.01.02', close: 128500, rate: 7.17, volume: 29435352 },
  { date: '2025.12.30', close: 119900, rate: 0.33, volume: 18866014 },
  { date: '2025.12.29', close: 119500, rate: 2.14, volume: 19676004 },
  { date: '2025.12.26', close: 117000, rate: 5.31, volume: 33999812 },
  { date: '2025.12.24', close: 111100, rate: -0.36, volume: 12492939 },
  { date: '2025.12.23', close: 111500, rate: 0.90, volume: 20419187 },
  { date: '2025.12.22', close: 110500, rate: 3.95, volume: 24705413 },
  { date: '2025.12.19', close: 106300, rate: -1.21, volume: 22670915 },
  { date: '2025.12.18', close: 107600, rate: -0.28, volume: 20010639 },
  { date: '2025.12.17', close: 107900, rate: 4.96, volume: 22109635 },
  { date: '2025.12.16', close: 102800, rate: -1.91, volume: 18829983 },
  { date: '2025.12.15', close: 104800, rate: -3.76, volume: 20317066 },
];

const performanceData = [
  { date: '24년 12월', operatingProfit: 6.4927, revenue: 75.7883, label: '2024년 4분기' },
  { date: '25년 03월', operatingProfit: 6.6853, revenue: 79.1405, label: '2025년 1분기' },
  { date: '25년 06월', operatingProfit: 4.6761, revenue: 74.5663, label: '2025년 2분기' },
  { date: '25년 09월', operatingProfit: 12.1661, revenue: 86.6170, label: '2025년 3분기' },
];

const financialStatements = [
  { 
    item: '매출액(수익)', 
    values: ['79조 987억', '74조 683억', '71조 9,156억', '67조 7,799억', '67조 4,046억'],
    isHeader: true,
    hasSubItems: true
  },
  { 
    item: '매출원가', 
    values: ['49조 950억', '44조 3,120억', '45조 8,863억', '46조 1,155억', '46조 6,187억']
  },
  { 
    item: '매출총이익', 
    values: ['30조 36억', '29조 7,562억', '26조 292억', '21조 6,643억', '20조 7,859억']
  },
  { 
    item: '판매비와 관리비', 
    values: ['20조 8,202억', '19조 3,123억', '19조 4,232억', '18조 8,396억', '18조 3,523억']
  },
  { 
    item: '영업이익', 
    values: ['9조 1,833억', '10조 4,438억', '6조 6,060억', '2조 8,247억', '2조 4,335억'],
    highlight: true
  },
  { 
    item: '영업이익(발표기준)', 
    values: ['9조 1,833억', '10조 4,438억', '6조 6,060억', '2조 8,247억', '2조 4,335억']
  },
  { 
    item: '금융수익', 
    values: ['3조 6,175억', '3조 6,161억', '3조 4,845억', '3조 3,030억', '4조 1,121억']
  },
  { 
    item: '금융원가', 
    values: ['2조 8,237억', '2조 7,362억', '2조 6,625억', '2조 5,412억', '2조 9,037억']
  },
  { 
    item: '기타영업외손익', 
    values: ['1,598억 6,200만', '730억 500만', '638억 8,800만', '-2,732억 6,000만', '379억 4,900만']
  },
  { 
    item: '종속기업, 공동지배기업 및 관계기업 관련 손익', 
    values: ['1,834억 1,100만', '1,985억 1,400만', '2,148억 3,300만', '2,110억 9,100만', '2,626억 7,700만']
  },
  { 
    item: '법인세비용차감전계속사업이익', 
    values: ['10조 3,204억', '11조 5,953억', '7조 7,067억', '3조 5,242억', '3조 9,426억'],
    highlight: true
  },
  { 
    item: '법인세비용', 
    values: ['2,195억 800만', '1조 7,539억', '9,520억 1,500만', '-2조 8,204억', '-1조 9,015억']
  }
];

const financialPeriods = ['2024년 09월', '2024년 06월', '2024년 03월', '2023년 12월', '2023년 09월'];

const shareholderData = [
  { name: '삼성물산 외 15인', value: 20.20, color: '#3b82f6' },
  { name: '국민연금공단', value: 7.43, color: '#a855f7' },
  { name: 'BlackRock Fund', value: 5.03, color: '#eab308' },
  { name: '자사주', value: 2.98, color: '#22c55e' },
  { name: '기타 주주', value: 64.36, color: '#64748b' },
];

const productMixData = [
  { name: 'DX 부문', value: 43.7, color: '#3b82f6' },
  { name: 'DS 부문', value: 38.6, color: '#a855f7' },
  { name: 'SDC', value: 11.2, color: '#22c55e' },
  { name: 'Harman', value: 4.8, color: '#eab308' },
  { name: '기타', value: 1.7, color: '#64748b' },
];

const valuationData = [
  { date: '24년 12월', per: 47.07, pbr: 1.38, psr: 6.57 },
  { date: '25년 03월', per: 48.2, pbr: 1.45, psr: 6.8 },
  { date: '25년 06월', per: 82.5, pbr: 1.5, psr: 7.2 },
  { date: '25년 09월', per: 46.5, pbr: 1.4, psr: 6.6 },
];

const stabilityData = [
  { date: '24년 09월', currentRatio: 251.37, debtRatio: 26.36 },
  { date: '24년 12월', currentRatio: 245.0, debtRatio: 27.0 },
  { date: '25년 03월', currentRatio: 248.0, debtRatio: 26.5 },
  { date: '25년 06월', currentRatio: 252.0, debtRatio: 25.8 },
];

const radarData = [
  { subject: '수익성', A: 120, fullMark: 150 },
  { subject: '성장성', A: 98, fullMark: 150 },
  { subject: '안정성', A: 86, fullMark: 150 },
  { subject: '활동성', A: 99, fullMark: 150 },
  { subject: '배당', A: 85, fullMark: 150 },
  { subject: '가치', A: 65, fullMark: 150 },
];

// Mock Chart Data
const chartData = Array.from({ length: 100 }, (_, i) => {
  const basePrice = 138000;
  const randomChange = (Math.random() - 0.45) * 1000;
  return {
    time: `${9 + Math.floor(i / 12)}:${(i % 12) * 5}`,
    price: basePrice + Math.sin(i / 10) * 2000 + randomChange,
    volume: Math.floor(Math.random() * 10000) + 1000
  };
});

export default function StockDetailView({ onBack, stockName }: StockDetailViewProps) {
  const [isAutoExpand, setIsAutoExpand] = useState(true);
  const chartPanelRef = useRef<ImperativePanelHandle>(null);
  const tabsPanelRef = useRef<ImperativePanelHandle>(null);

  const handleTabChange = (value: string) => {
    if (isAutoExpand && chartPanelRef.current && tabsPanelRef.current) {
      // Shrink chart, expand tabs
      chartPanelRef.current.resize(30);
      tabsPanelRef.current.resize(70);
    }
  };

  return (
    <div className="h-full bg-[#0B0E14] text-white overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          {/* Left Column (Header + Chart + Tabs) */}
          <ResizablePanel defaultSize={75} minSize={50} className="bg-[#151921]">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#151921] shrink-0 z-10">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" onClick={onBack} className="text-gray-400 hover:text-white shrink-0">
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex items-center gap-2">
                        <h1 className="text-lg font-bold truncate">{stockName}</h1>
                        <span className="text-gray-400 text-xs font-mono shrink-0">005930</span>
                        <Badge variant="outline" className="text-[10px] h-5 px-1.5 border-red-500/50 text-red-400 bg-red-500/10 shrink-0">KOSPI</Badge>
                        <Star className="w-4 h-4 text-gray-500 hover:text-yellow-400 cursor-pointer shrink-0" />
                      </div>
                      <div className="h-4 w-px bg-white/10 hidden sm:block" />
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-red-500">141,000<span className="text-sm font-normal text-white ml-0.5">원</span></span>
                        <span className="text-red-500 font-medium text-xs">▲ 2,100 (+1.51%)</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button variant="outline" size="sm" className="bg-[#151921] border-white/10 hover:bg-white/5 gap-2 hidden sm:flex">
                    <TrendingUp className="w-4 h-4" />
                    지표분석
                  </Button>
                  <Button variant="outline" size="sm" className="bg-[#151921] border-white/10 hover:bg-white/5 gap-2 hidden sm:flex">
                    <MessageCircle className="w-4 h-4" />
                    토론
                  </Button>
                </div>
              </div>

              <div className="flex-1 min-h-0">
                <ResizablePanelGroup direction="vertical">
                  {/* Top: Chart */}
                  <ResizablePanel 
                    ref={chartPanelRef}
                    defaultSize={60} 
                    minSize={20}
                  >
                    <div className="h-full flex flex-col p-4 relative">
                      <div className="flex justify-between items-center mb-4 text-xs text-gray-400 shrink-0">
                          <div className="flex items-center gap-4">
                            <div className="flex gap-2">
                              <span className="text-white font-bold cursor-pointer">일</span>
                              <span className="hover:text-white cursor-pointer">주</span>
                              <span className="hover:text-white cursor-pointer">월</span>
                              <span className="hover:text-white cursor-pointer">년</span>
                            </div>
                            <div className="w-px h-3 bg-gray-700" />
                            <div className="flex gap-2">
                              <span className="cursor-pointer hover:text-white">지표</span>
                              <span className="cursor-pointer hover:text-white">도구</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Settings className="w-4 h-4 cursor-pointer hover:text-white" />
                            <Maximize2 className="w-4 h-4 cursor-pointer hover:text-white" />
                          </div>
                      </div>
                      
                      <div className="flex-1 relative min-h-0">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                              <defs>
                                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                              <XAxis dataKey="time" hide />
                              <YAxis domain={['auto', 'auto']} orientation="right" tick={{fontSize: 11, fill: '#6b7280'}} tickLine={false} axisLine={false} />
                              <Tooltip contentStyle={{backgroundColor: '#1f2937', border: 'none', borderRadius: '8px'}} />
                              <Area type="monotone" dataKey="price" stroke="#ef4444" fillOpacity={1} fill="url(#colorPrice)" strokeWidth={2} />
                            </AreaChart>
                          </ResponsiveContainer>
                          
                          <div className="absolute bottom-0 left-0 right-0 h-20 opacity-30 pointer-events-none">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={chartData}>
                                  <Bar dataKey="volume" fill="#ef4444" />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                      </div>
                    </div>
                  </ResizablePanel>

                  <ResizableHandle withHandle className="bg-white/5 hover:bg-white/10 transition-colors" />

                  {/* Bottom: Tabs */}
                  <ResizablePanel 
                    ref={tabsPanelRef}
                    defaultSize={40} 
                    minSize={20}
                  >
                    <div className="h-full flex flex-col bg-[#151921]">
                      <Tabs defaultValue="company" className="h-full flex flex-col" onValueChange={handleTabChange}>
                          <div className="border-b border-white/10 px-4 shrink-0 flex items-center justify-between">
                            <TabsList className="bg-transparent justify-start h-auto p-0 gap-6 rounded-none">
                              {['기업소개', '호가', '실시간/일별시세', '실적', '배당', '뉴스/공시', '투자자동향', '재무분석', '투자지표', '토론'].map((tab) => (
                                  <TabsTrigger 
                                    key={tab} 
                                    value={tab === '기업소개' ? 'company' : (tab === '호가' ? 'orderbook' : tab)} 
                                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-white data-[state=active]:bg-transparent data-[state=active]:text-white text-gray-400 py-3 px-0 transition-all hover:text-white"
                                  >
                                    {tab}
                                  </TabsTrigger>
                              ))}
                            </TabsList>
                            
                            <div className="flex items-center gap-2">
                               <div className="flex items-center space-x-2">
                                  <label htmlFor="auto-expand" className="text-xs text-gray-400 cursor-pointer hover:text-white transition-colors">화면 자동 확장</label>
                                  <Switch 
                                    id="auto-expand" 
                                    checked={isAutoExpand} 
                                    onCheckedChange={setIsAutoExpand} 
                                    className="scale-75"
                                  />
                               </div>
                            </div>
                          </div>
                          
                          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-[#111318]/50">
                            <TabsContent value="company" className="mt-0 h-full">
                                {/* Company Summary Content - Adjusted Layout */}
                                <div className="flex flex-col gap-6 h-full">
                                  {/* Company Overview Card */}
                                  <div className="bg-[#151921] rounded-lg p-6 border border-white/5">
                                      <h3 className="font-bold text-white mb-6 flex items-center gap-2 text-lg">
                                        기업소개
                                        <Badge variant="outline" className="text-[10px] bg-blue-500/10 text-blue-400 border-blue-500/30">대기업</Badge>
                                        <Badge variant="outline" className="text-[10px] bg-purple-500/10 text-purple-400 border-purple-500/30">KOSPI 1위</Badge>
                                      </h3>
                                      
                                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6 text-sm mb-6">
                                        <div className="space-y-1.5">
                                            <span className="text-gray-500 text-xs block">사업자번호</span>
                                            <span className="text-white font-medium">124-81-00998</span>
                                        </div>
                                        <div className="space-y-1.5">
                                            <span className="text-gray-500 text-xs block">대표이사</span>
                                            <span className="text-white font-medium">전영현</span>
                                        </div>
                                        <div className="space-y-1.5">
                                            <span className="text-gray-500 text-xs block">설립일자</span>
                                            <span className="text-white font-medium">1969년 01월 13일</span>
                                        </div>
                                        <div className="space-y-1.5">
                                            <span className="text-gray-500 text-xs block">직원수</span>
                                            <span className="text-white font-medium">124,917명</span>
                                        </div>
                                        <div className="space-y-1.5 col-span-2">
                                            <span className="text-gray-500 text-xs block">주소</span>
                                            <span className="text-white font-medium">경기 수원시 영통구 삼성로 129</span>
                                        </div>
                                      </div>
                                      
                                      <div className="space-y-2 text-sm text-gray-400 leading-relaxed bg-[#0B0E14] p-5 rounded-md border border-white/5">
                                        <p>• 한국 및 DX부문 해외 9개 지역총괄과 DS부문 해외 5개 지역총괄, SDC, Harman 등 229개의 종속기업으로 구성된 글로벌 전자기업임.</p>
                                        <p>• 세트사업은 TV를 비롯 모니터, 냉장고, 세탁기, 에어컨, 스마트폰, 네트워크시스템, 컴퓨터 등을 생산하는 DX부문이 있음.</p>
                                        <p>• 부품 사업에는 DRAM, NAND Flash, 모바일AP 등의 제품을 생산하고 있는 DS 부문과 스마트폰용 OLED 패널을 생산하고 있는 SDC가 있음.</p>
                                      </div>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                      {/* Shareholder Info Card */}
                                      <div className="bg-[#151921] rounded-lg p-6 border border-white/5">
                                        <h4 className="font-bold text-white mb-6 text-sm flex items-center gap-2">
                                          <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                                          주주 정보
                                        </h4>
                                        <div className="space-y-4">
                                            {shareholderData.map((item, idx) => (
                                              <div key={idx} className="flex justify-between items-center text-sm group">
                                                  <div className="flex items-center gap-3">
                                                    <div className="w-2.5 h-2.5 rounded-full ring-2 ring-white/5 group-hover:ring-white/10 transition-all" style={{backgroundColor: item.color}}></div>
                                                    <span className="text-gray-400 group-hover:text-gray-300 transition-colors">{item.name}</span>
                                                  </div>
                                                  <div className="text-white font-mono font-medium">{item.value}%</div>
                                              </div>
                                            ))}
                                        </div>
                                      </div>
                                      
                                      {/* Product Mix Card */}
                                      <div className="bg-[#151921] rounded-lg p-6 border border-white/5">
                                        <h4 className="font-bold text-white mb-6 text-sm flex items-center gap-2">
                                          <div className="w-1 h-4 bg-purple-500 rounded-full"></div>
                                          주요 제품 매출 구성
                                        </h4>
                                        <div className="flex items-center gap-6">
                                            <div className="h-40 w-40 relative shrink-0">
                                              <ResponsiveContainer width="100%" height="100%">
                                                  <PieChart>
                                                    <Pie 
                                                        data={productMixData} 
                                                        innerRadius={35} 
                                                        outerRadius={55} 
                                                        paddingAngle={4} 
                                                        dataKey="value"
                                                        stroke="none"
                                                    >
                                                        {productMixData.map((entry, index) => (
                                                          <Cell key={`cell-${index}`} fill={entry.color} />
                                                        ))}
                                                    </Pie>
                                                  </PieChart>
                                              </ResponsiveContainer>
                                              <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-500">
                                                  2024.09
                                              </div>
                                            </div>
                                            <div className="space-y-3 text-sm flex-1 min-w-0">
                                              {productMixData.map((item, idx) => (
                                                  <div key={idx} className="flex justify-between items-center gap-2 group">
                                                    <div className="flex items-center gap-2 min-w-0 flex-1">
                                                        <div className="w-2.5 h-2.5 rounded-full shrink-0 ring-2 ring-white/5 group-hover:ring-white/10 transition-all" style={{backgroundColor: item.color}}></div>
                                                        <span className="text-gray-400 truncate group-hover:text-gray-300 transition-colors">{item.name}</span>
                                                    </div>
                                                    <span className="text-white font-bold shrink-0">{item.value}%</span>
                                                  </div>
                                              ))}
                                            </div>
                                        </div>
                                      </div>
                                  </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="orderbook" className="mt-0 h-full">
                                <div className="flex h-full gap-4">
                                  {/* Order Book Main Panel */}
                                  <div className="flex-1 bg-[#151921] rounded-lg border border-white/5 flex flex-col min-w-[500px]">
                                    <div className="flex-1 flex flex-col relative overflow-y-auto custom-scrollbar">
                                      {/* Ask Orders (Sell) - Blue */}
                                      {askOrders.map((order, i) => (
                                        <div key={`ask-${i}`} className="grid grid-cols-[1fr_120px_1fr] h-10 text-sm group">
                                          {/* Col 1: Volume */}
                                          <div className="relative flex items-center justify-end pr-2 bg-blue-500/5 group-hover:bg-blue-500/10 border-b border-white/5">
                                              <div 
                                                className="absolute top-1 bottom-1 right-0 bg-blue-500/20 z-0 transition-all" 
                                                style={{ width: `${Math.min(order.volume / 500000 * 100, 100)}%` }}
                                              ></div>
                                              <span className="relative z-10 text-blue-300 font-mono tracking-wide">{order.volume.toLocaleString()}</span>
                                          </div>
                                          {/* Col 2: Price */}
                                          <div className="flex items-center justify-center bg-[#1E222B] text-red-400 font-bold border-x border-b border-white/5 group-hover:bg-white/5 transition-colors">
                                              {order.price.toLocaleString()}
                                              <span className="ml-1 text-[10px] opacity-70">+{order.rate}%</span>
                                          </div>
                                          {/* Col 3: Summary Info - No row hover effect, specific borders */}
                                          <div className={`bg-[#151921] flex items-center px-4 ${[1, 5, 8].includes(i) ? 'border-b border-white/10' : ''}`}>
                                            {summaryData[i] && (
                                                <div className="flex justify-between w-full text-xs">
                                                    <span className="text-gray-500">{summaryData[i].label}</span>
                                                    <span className={`font-medium ${summaryData[i].color} font-mono`}>{summaryData[i].value}</span>
                                                </div>
                                            )}
                                          </div>
                                        </div>
                                      ))}

                                      {/* Current Price Divider */}
                                      <div className="grid grid-cols-[1fr_120px_1fr] h-12 border-y-2 border-white/10 text-sm bg-white/5">
                                         <div className="flex items-center justify-start pl-4 text-xs text-gray-400">
                                            <span>매도총잔량 <span className="text-white font-mono ml-1">1,245,920</span></span>
                                         </div>
                                         <div className="flex items-center justify-center text-red-500 font-extrabold text-lg border-x border-white/10 bg-[#252A36]">
                                            {currentPriceOrder.price.toLocaleString()}
                                         </div>
                                         <div className="flex items-center justify-end pr-4 text-xs text-gray-400">
                                            <span>매수총잔량 <span className="text-white font-mono ml-1">892,110</span></span>
                                         </div>
                                      </div>

                                      {/* Bid Orders (Buy) - Red */}
                                      {bidOrders.map((order, i) => (
                                        <div key={`bid-${i}`} className="grid grid-cols-[1fr_120px_1fr] h-10 border-b border-white/5 text-sm group hover:bg-white/5">
                                          <div className="bg-[#151921] relative">
                                            {i === bidOrders.length - 1 && (
                                              <div className="absolute bottom-2 left-4 text-xs text-gray-500">
                                                체결강도 <span className="text-white ml-2">98.99%</span>
                                              </div>
                                            )}
                                          </div>
                                          <div className="flex items-center justify-center bg-[#1E222B] text-red-400 font-bold border-x border-white/5">
                                              {order.price.toLocaleString()}
                                              <span className="ml-1 text-[10px] opacity-70">+{order.rate}%</span>
                                          </div>
                                          <div className="relative flex items-center justify-start pl-2 bg-red-500/5 group-hover:bg-red-500/10">
                                              <div 
                                                className="absolute top-1 bottom-1 left-0 bg-red-500/20 z-0 transition-all" 
                                                style={{ width: `${Math.min(order.volume / 50000 * 100, 100)}%` }}
                                              ></div>
                                              <span className="relative z-10 text-red-300 font-mono tracking-wide">{order.volume.toLocaleString()}</span>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="실시간/일별시세" className="mt-0 h-full">
                                <div className="grid grid-cols-2 gap-4 h-full">
                                    {/* Daily Price (Left) */}
                                    <div className="bg-[#151921] rounded-lg border border-white/5 flex flex-col h-full overflow-hidden">
                                        <div className="p-4 border-b border-white/5">
                                            <h3 className="text-white font-bold text-sm">일별 시세</h3>
                                        </div>
                                        <div className="flex-1 overflow-y-auto custom-scrollbar">
                                            <table className="w-full text-xs text-left">
                                                <thead className="text-gray-500 bg-[#1E222B] sticky top-0 z-10">
                                                    <tr>
                                                        <th className="p-3 font-medium">날짜</th>
                                                        <th className="p-3 font-medium text-right">종가</th>
                                                        <th className="p-3 font-medium text-right">등락률</th>
                                                        <th className="p-3 font-medium text-right">거래량(주)</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-white/5">
                                                    {dailyPriceData.map((item, idx) => (
                                                        <tr key={idx} className="hover:bg-white/5 transition-colors">
                                                            <td className="p-3 text-gray-400">{item.date}</td>
                                                            <td className="p-3 text-right text-white font-medium">{item.close.toLocaleString()}원</td>
                                                            <td className={`p-3 text-right font-medium ${item.rate > 0 ? 'text-red-400' : 'text-blue-400'}`}>
                                                                {item.rate > 0 ? '+' : ''}{item.rate}%
                                                            </td>
                                                            <td className="p-3 text-right text-gray-400">{item.volume.toLocaleString()}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* Real-time Price (Right) */}
                                    <div className="bg-[#151921] rounded-lg border border-white/5 flex flex-col h-full overflow-hidden">
                                        <div className="p-4 border-b border-white/5">
                                            <h3 className="text-white font-bold text-sm">실시간 시세</h3>
                                        </div>
                                        <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#0B0E14]">
                                             <table className="w-full text-xs text-left">
                                                <thead className="text-gray-500 bg-[#1E222B] sticky top-0 z-10">
                                                    <tr>
                                                        <th className="p-3 font-medium">시간</th>
                                                        <th className="p-3 font-medium text-right">체결가</th>
                                                        <th className="p-3 font-medium text-right">등락률</th>
                                                        <th className="p-3 font-medium text-right">체결량(주)</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-white/5">
                                                    {/* Empty state as per screenshot */}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="실적" className="mt-0 h-full">
                                <div className="grid grid-cols-2 gap-4 h-full">
                                    {/* Operating Profit (Left) */}
                                    <div className="bg-[#151921] rounded-lg border border-white/5 flex flex-col h-full overflow-hidden">
                                        <div className="p-4 border-b border-white/5 flex justify-between items-center">
                                            <h3 className="text-white font-bold text-sm">영업이익</h3>
                                            <div className="flex text-xs text-gray-500 gap-2">
                                                <span className="cursor-pointer hover:text-white">연결</span>
                                                <ChevronDown className="w-3 h-3" />
                                                <span className="w-px h-3 bg-white/10"></span>
                                                <span className="cursor-pointer hover:text-white text-white font-medium">분기</span>
                                                <ChevronDown className="w-3 h-3" />
                                            </div>
                                        </div>
                                        
                                        <div className="flex-1 p-4 flex flex-col">
                                            {/* Chart Area */}
                                            <div className="flex-1 min-h-0 relative mb-4">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <LineChart data={performanceData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                                                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                                        <XAxis 
                                                            dataKey="date" 
                                                            tick={{ fill: '#9ca3af', fontSize: 11 }} 
                                                            tickLine={false} 
                                                            axisLine={{ stroke: '#ffffff10' }} 
                                                            dy={10}
                                                        />
                                                        <YAxis 
                                                            domain={[4, 14]} 
                                                            tick={{ fill: '#6b7280', fontSize: 11 }} 
                                                            tickLine={false} 
                                                            axisLine={false}
                                                            tickFormatter={(value) => `${value}조`}
                                                        />
                                                        <Tooltip 
                                                            contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', fontSize: '12px' }}
                                                            itemStyle={{ color: '#fff' }}
                                                            formatter={(value: number) => [`${value}조`, '영업이익']}
                                                        />
                                                        <Line 
                                                            type="monotone" 
                                                            dataKey="operatingProfit" 
                                                            stroke="#3b82f6" 
                                                            strokeWidth={2}
                                                            dot={{ r: 4, fill: '#3b82f6', strokeWidth: 0 }}
                                                            activeDot={{ r: 6 }}
                                                        />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </div>

                                            {/* Data Table */}
                                            <div className="bg-[#1E222B] rounded-lg overflow-hidden border border-white/5">
                                                <table className="w-full text-xs">
                                                    <thead className="text-gray-500 border-b border-white/5">
                                                        <tr>
                                                            <th className="p-3 text-left font-normal">구분</th>
                                                            {performanceData.map((item, idx) => (
                                                                <th key={idx} className="p-3 text-right font-normal">{item.label}</th>
                                                            ))}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className="p-3 text-left font-medium text-white flex items-center gap-2">
                                                                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                                                실제 영업이익
                                                            </td>
                                                            {performanceData.map((item, idx) => (
                                                                <td key={idx} className="p-3 text-right text-white">{item.operatingProfit}조 {Math.floor(Math.random()*9000)}억</td>
                                                            ))}
                                                        </tr>
                                                        <tr>
                                                            <td className="p-3 text-left font-medium text-gray-500 flex items-center gap-2">
                                                                <div className="w-2 h-2 rounded-full border border-gray-600"></div>
                                                                예상 영업이익
                                                            </td>
                                                            {performanceData.map((item, idx) => (
                                                                <td key={idx} className="p-3 text-right text-gray-500">-</td>
                                                            ))}
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Revenue (Right) */}
                                    <div className="bg-[#151921] rounded-lg border border-white/5 flex flex-col h-full overflow-hidden">
                                        <div className="p-4 border-b border-white/5 flex justify-between items-center">
                                            <h3 className="text-white font-bold text-sm">매출액</h3>
                                            <div className="flex text-xs text-gray-500 gap-2">
                                                <span className="cursor-pointer hover:text-white">연결</span>
                                                <ChevronDown className="w-3 h-3" />
                                                <span className="w-px h-3 bg-white/10"></span>
                                                <span className="cursor-pointer hover:text-white text-white font-medium">분기</span>
                                                <ChevronDown className="w-3 h-3" />
                                            </div>
                                        </div>
                                        
                                        <div className="flex-1 p-4 flex flex-col">
                                            {/* Chart Area */}
                                            <div className="flex-1 min-h-0 relative mb-4">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <LineChart data={performanceData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                                                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                                        <XAxis 
                                                            dataKey="date" 
                                                            tick={{ fill: '#9ca3af', fontSize: 11 }} 
                                                            tickLine={false} 
                                                            axisLine={{ stroke: '#ffffff10' }} 
                                                            dy={10}
                                                        />
                                                        <YAxis 
                                                            domain={[70, 90]} 
                                                            tick={{ fill: '#6b7280', fontSize: 11 }} 
                                                            tickLine={false} 
                                                            axisLine={false}
                                                            tickFormatter={(value) => `${value}조`}
                                                        />
                                                        <Tooltip 
                                                            contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', fontSize: '12px' }}
                                                            itemStyle={{ color: '#fff' }}
                                                            formatter={(value: number) => [`${value}조`, '매출액']}
                                                        />
                                                        <Line 
                                                            type="monotone" 
                                                            dataKey="revenue" 
                                                            stroke="#3b82f6" 
                                                            strokeWidth={2}
                                                            dot={{ r: 4, fill: '#3b82f6', strokeWidth: 0 }}
                                                            activeDot={{ r: 6 }}
                                                        />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </div>

                                            {/* Data Table */}
                                            <div className="bg-[#1E222B] rounded-lg overflow-hidden border border-white/5">
                                                <table className="w-full text-xs">
                                                    <thead className="text-gray-500 border-b border-white/5">
                                                        <tr>
                                                            <th className="p-3 text-left font-normal">구분</th>
                                                            {performanceData.map((item, idx) => (
                                                                <th key={idx} className="p-3 text-right font-normal">{item.label}</th>
                                                            ))}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className="p-3 text-left font-medium text-white flex items-center gap-2">
                                                                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                                                실제 매출액
                                                            </td>
                                                            {performanceData.map((item, idx) => (
                                                                <td key={idx} className="p-3 text-right text-white">{item.revenue}조 {Math.floor(Math.random()*9000)}억</td>
                                                            ))}
                                                        </tr>
                                                        <tr>
                                                            <td className="p-3 text-left font-medium text-gray-500 flex items-center gap-2">
                                                                <div className="w-2 h-2 rounded-full border border-gray-600"></div>
                                                                예상 매출액
                                                            </td>
                                                            {performanceData.map((item, idx) => (
                                                                <td key={idx} className="p-3 text-right text-gray-500">-</td>
                                                            ))}
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="재무분석" className="mt-0 h-full">
                                <div className="bg-[#151921] rounded-lg border border-white/5 flex flex-col h-full overflow-hidden">
                                    <div className="p-4 border-b border-white/5 flex justify-between items-center">
                                        <div className="flex flex-col gap-4 w-full">
                                          <div className="flex justify-between items-center w-full">
                                            <h3 className="text-white font-bold text-sm">재무제표</h3>
                                            <div className="flex text-xs text-gray-500 gap-2">
                                                <span className="cursor-pointer hover:text-white">연결</span>
                                                <ChevronDown className="w-3 h-3" />
                                                <span className="w-px h-3 bg-white/10"></span>
                                                <span className="cursor-pointer hover:text-white text-white font-medium">분기</span>
                                                <ChevronDown className="w-3 h-3" />
                                            </div>
                                          </div>
                                          <div className="flex gap-6 border-b border-white/5 -mx-4 px-4">
                                            {['손익계산서', '재무상태표', '현금흐름표'].map((subtab, i) => (
                                              <div 
                                                key={subtab} 
                                                className={`pb-2 text-xs font-medium cursor-pointer border-b-2 transition-colors ${i === 0 ? 'text-teal-400 border-teal-400' : 'text-gray-500 border-transparent hover:text-white'}`}
                                              >
                                                {subtab}
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                                        <table className="w-full text-xs border-collapse">
                                            <thead className="bg-[#1E222B] sticky top-0 z-10">
                                                <tr>
                                                    <th className="p-3 text-left font-normal text-gray-400 w-[20%] border-b border-white/5">항목</th>
                                                    {financialPeriods.map((period, idx) => (
                                                        <th key={idx} className="p-3 text-right font-normal text-gray-400 border-b border-white/5">{period}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5">
                                                {financialStatements.map((row, idx) => (
                                                    <tr key={idx} className={`hover:bg-white/5 transition-colors group ${row.highlight ? 'bg-white/5' : ''}`}>
                                                        <td className={`p-3 text-left text-white border-r border-white/5 ${row.highlight ? 'font-bold' : ''}`}>
                                                          <div className="flex items-center gap-1">
                                                            {row.hasSubItems && <ChevronDown className="w-3 h-3 text-gray-500" />}
                                                            {row.item}
                                                          </div>
                                                        </td>
                                                        {row.values.map((val, vIdx) => (
                                                            <td key={vIdx} className={`p-3 text-right font-medium border-r border-white/5 last:border-r-0 ${val.startsWith('-') ? 'text-blue-400' : 'text-white'}`}>
                                                                {val}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                                {/* Mocking expanded rows for Revenue if needed, but per image it's collapsed or just shown as item */}
                                                {/* Adding empty sub-rows for "매출액(수익)" to match image slightly if desired, but sticking to provided data structure for cleaner code */}
                                                <tr className="hover:bg-white/5 transition-colors">
                                                    <td className="p-3 pl-8 text-left text-gray-400 border-r border-white/5">내수</td>
                                                    {financialPeriods.map((_, i) => <td key={i} className="p-3 text-right text-gray-600 border-r border-white/5 last:border-r-0">-</td>)}
                                                </tr>
                                                <tr className="hover:bg-white/5 transition-colors">
                                                    <td className="p-3 pl-8 text-left text-gray-400 border-r border-white/5">수출</td>
                                                    {financialPeriods.map((_, i) => <td key={i} className="p-3 text-right text-gray-600 border-r border-white/5 last:border-r-0">-</td>)}
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="투자지표" className="mt-0 h-full">
                                <div className="grid grid-cols-2 gap-4 h-full">
                                    {/* Valuation (Left) */}
                                    <div className="bg-[#151921] rounded-lg border border-white/5 flex flex-col h-full overflow-hidden">
                                        <div className="p-4 border-b border-white/5 flex justify-between items-center">
                                            <h3 className="text-white font-bold text-sm">가치성</h3>
                                            <div className="flex text-xs text-gray-500 gap-2">
                                                <span className="cursor-pointer hover:text-white">연결</span>
                                                <ChevronDown className="w-3 h-3" />
                                                <span className="w-px h-3 bg-white/10"></span>
                                                <span className="cursor-pointer hover:text-white text-white font-medium">분기</span>
                                                <ChevronDown className="w-3 h-3" />
                                            </div>
                                        </div>
                                        
                                        <div className="flex-1 p-4 flex flex-col">
                                            {/* Chart Area */}
                                            <div className="flex-1 min-h-0 relative mb-4">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <LineChart data={valuationData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                                                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                                        <XAxis 
                                                            dataKey="date" 
                                                            tick={{ fill: '#9ca3af', fontSize: 11 }} 
                                                            tickLine={false} 
                                                            axisLine={{ stroke: '#ffffff10' }} 
                                                            dy={10}
                                                        />
                                                        <YAxis 
                                                            domain={[0, 100]} 
                                                            tick={{ fill: '#6b7280', fontSize: 11 }} 
                                                            tickLine={false} 
                                                            axisLine={false}
                                                            tickFormatter={(value) => `${value}%`}
                                                        />
                                                        <Tooltip 
                                                            contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', fontSize: '12px' }}
                                                            itemStyle={{ color: '#fff' }}
                                                        />
                                                        <Line type="monotone" dataKey="per" name="PER" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 0 }} />
                                                        <Line type="monotone" dataKey="pbr" name="PBR" stroke="#5eead4" strokeWidth={2} dot={{ r: 4, fill: '#5eead4', strokeWidth: 0 }} />
                                                        <Line type="monotone" dataKey="psr" name="PSR" stroke="#a855f7" strokeWidth={2} dot={{ r: 4, fill: '#a855f7', strokeWidth: 0 }} />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </div>

                                            {/* Legend / Info */}
                                            <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-4">
                                                <div className="text-center">
                                                    <div className="flex items-center justify-center gap-2 mb-1">
                                                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                                        <span className="text-xs text-gray-400">PER</span>
                                                    </div>
                                                    <div className="text-sm font-bold text-white">47.07배</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="flex items-center justify-center gap-2 mb-1">
                                                        <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                                                        <span className="text-xs text-gray-400">PBR</span>
                                                    </div>
                                                    <div className="text-sm font-bold text-white">1.38배</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="flex items-center justify-center gap-2 mb-1">
                                                        <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                                        <span className="text-xs text-gray-400">PSR</span>
                                                    </div>
                                                    <div className="text-sm font-bold text-white">6.57배</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stability (Right) */}
                                    <div className="bg-[#151921] rounded-lg border border-white/5 flex flex-col h-full overflow-hidden">
                                        <div className="p-4 border-b border-white/5 flex justify-between items-center">
                                            <h3 className="text-white font-bold text-sm">안정성</h3>
                                            <div className="flex text-xs text-gray-500 gap-2">
                                                <span className="cursor-pointer hover:text-white">연결</span>
                                                <ChevronDown className="w-3 h-3" />
                                                <span className="w-px h-3 bg-white/10"></span>
                                                <span className="cursor-pointer hover:text-white text-white font-medium">분기</span>
                                                <ChevronDown className="w-3 h-3" />
                                            </div>
                                        </div>
                                        
                                        <div className="flex-1 p-4 flex flex-col">
                                            {/* Chart Area */}
                                            <div className="flex-1 min-h-0 relative mb-4">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <LineChart data={stabilityData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                                                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                                        <XAxis 
                                                            dataKey="date" 
                                                            tick={{ fill: '#9ca3af', fontSize: 11 }} 
                                                            tickLine={false} 
                                                            axisLine={{ stroke: '#ffffff10' }} 
                                                            dy={10}
                                                        />
                                                        <YAxis 
                                                            domain={[0, 320]} 
                                                            ticks={[0, 80, 160, 240, 320]}
                                                            tick={{ fill: '#6b7280', fontSize: 11 }} 
                                                            tickLine={false} 
                                                            axisLine={false}
                                                            tickFormatter={(value) => `${value}%`}
                                                        />
                                                        <Tooltip 
                                                            contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', fontSize: '12px' }}
                                                            itemStyle={{ color: '#fff' }}
                                                        />
                                                        <Line type="monotone" dataKey="currentRatio" name="유동비율" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 0 }} />
                                                        <Line type="monotone" dataKey="debtRatio" name="부채비율" stroke="#5eead4" strokeWidth={2} dot={{ r: 4, fill: '#5eead4', strokeWidth: 0 }} />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </div>

                                            {/* Legend / Info */}
                                            <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                                                <div className="text-center">
                                                    <div className="flex items-center justify-center gap-2 mb-1">
                                                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                                        <span className="text-xs text-gray-400">유동비율</span>
                                                    </div>
                                                    <div className="text-sm font-bold text-white">251.37배</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="flex items-center justify-center gap-2 mb-1">
                                                        <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                                                        <span className="text-xs text-gray-400">부채비율</span>
                                                    </div>
                                                    <div className="text-sm font-bold text-white">26.36배</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                          </div>
                      </Tabs>
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </div>
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle className="bg-white/5 hover:bg-white/10 transition-colors" />

          {/* Right Column: Info & Radar */}
          <ResizablePanel defaultSize={25} minSize={15} className="bg-[#151921] border-l border-white/5">
             <div className="h-full flex flex-col overflow-y-auto custom-scrollbar p-4">
                <h3 className="font-bold text-white mb-4 text-sm px-1">종목 정보</h3>

                <div className="space-y-3">
                   {/* Returns Row */}
                   <div className="grid grid-cols-4 gap-2">
                      {[
                        { label: '일별', value: '+1.51%', color: 'text-red-400' },
                        { label: '주별', value: '+7.17%', color: 'text-red-400' },
                        { label: '월별', value: '+1.01%', color: 'text-red-400' },
                        { label: '년별', value: '-0.89%', color: 'text-blue-400' }
                      ].map((item, i) => (
                        <div key={i} className="bg-[#1E222B] rounded-md p-2 text-center border border-white/5">
                           <div className="text-gray-500 text-xs mb-1 font-medium">{item.label}</div>
                           <div className={`font-bold text-sm ${item.color}`}>{item.value}</div>
                        </div>
                      ))}
                   </div>

                   {/* Market Info Row */}
                   <div className="grid grid-cols-3 gap-2">
                      <div className="bg-[#1E222B] rounded-md p-3 text-center border border-white/5 flex flex-col justify-center">
                         <div className="text-gray-500 text-xs mb-1 font-medium">시장 구분</div>
                         <div className="text-white text-sm font-medium">코스피</div>
                      </div>
                      <div className="bg-[#1E222B] rounded-md p-3 text-center border border-white/5 flex flex-col justify-center">
                         <div className="text-gray-500 text-xs mb-1 font-medium">시가총액 순위</div>
                         <div className="text-white text-sm font-medium">1위</div>
                      </div>
                      <div className="bg-[#1E222B] rounded-md p-3 text-center border border-white/5 flex flex-col justify-center">
                         <div className="text-gray-500 text-xs mb-1 font-medium">액면가</div>
                         <div className="text-white text-sm font-medium">100원</div>
                      </div>
                   </div>

                   {/* Market Cap & Shares Row */}
                   <div className="grid grid-cols-2 gap-2">
                      <div className="bg-[#1E222B] rounded-md p-3 text-center border border-white/5">
                         <div className="text-gray-500 text-xs mb-1 font-medium">시가총액</div>
                         <div className="text-white text-base font-bold">834조 6,689억</div>
                      </div>
                      <div className="bg-[#1E222B] rounded-md p-3 text-center border border-white/5">
                         <div className="text-gray-500 text-xs mb-1 font-medium">상장주식수</div>
                         <div className="text-white text-base font-bold">5,919,637,922주</div>
                      </div>
                   </div>

                   {/* Valuation Ratios Row - Combined */}
                   <div className="bg-[#1E222B] rounded-md border border-white/5 p-4">
                      <div className="grid grid-cols-4 gap-4 divide-x divide-white/5">
                        {[
                          { label: 'PER', value: '47.07배' },
                          { label: 'PBR', value: '1.38배' },
                          { label: 'PSR', value: '6.57배' },
                          { label: 'ROE', value: '3.01%' }
                        ].map((item, i) => (
                          <div key={i} className="text-center px-2 first:pl-0 last:pr-0">
                             <div className="text-gray-500 text-xs mb-1.5 font-medium">{item.label}</div>
                             <div className="text-white text-sm font-bold">{item.value}</div>
                          </div>
                        ))}
                      </div>
                   </div>

                   {/* Combined Ownership Breakdown */}
                   <div className="flex items-center gap-8 mt-8 px-4">
                      {/* Chart */}
                      <div className="relative w-28 h-28 shrink-0">
                          <svg viewBox="0 0 36 36" className="w-full h-full rotate-[-90deg]">
                             {/* Background */}
                             <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#2D3340" strokeWidth="4" />
                             
                             {/* Foreign Ownership (Teal) - 52.22% */}
                             <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#5EEAD4" strokeWidth="4" strokeDasharray="52.22, 100" />
                             
                             {/* Institution Ownership (Purple) - 20.50% */}
                             <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#a855f7" strokeWidth="4" strokeDasharray="20.5, 100" strokeDashoffset="-52.22" />

                             {/* Individual Ownership (Orange) - 27.28% */}
                             <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f97316" strokeWidth="4" strokeDasharray="27.28, 100" strokeDashoffset="-72.72" />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                             <div className="text-gray-400 text-[10px] mb-0.5">보유비율</div>
                             <div className="text-sm font-bold text-white">Major</div>
                          </div>
                      </div>

                      {/* Info */}
                      <div className="flex-1 space-y-4">
                          <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#5EEAD4]"></div>
                                <span className="text-gray-400 text-sm">외국인</span>
                              </div>
                              <span className="text-white text-base font-bold">52.22%</span>
                          </div>
                          <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#a855f7]"></div>
                                <span className="text-gray-400 text-sm">기관</span>
                              </div>
                              <span className="text-white text-base font-bold">20.50%</span>
                          </div>
                          <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#f97316]"></div>
                                <span className="text-gray-400 text-sm">개인/기타</span>
                              </div>
                              <span className="text-white text-base font-bold">27.28%</span>
                          </div>
                      </div>
                   </div>

                   {/* Price Ranges */}
                   <div className="space-y-6 px-1 mt-2">
                       <div className="space-y-2">
                          <div className="flex justify-between text-[10px] text-gray-500 mb-2">
                             <span>1일 최저가</span>
                             <span>1일 최고가</span>
                          </div>
                          <div className="relative h-1 w-full bg-[#2D3340] rounded-full">
                             <div className="absolute top-0 bottom-0 left-[70%] w-2 h-2 -mt-0.5 bg-[#5EEAD4] rounded-full shadow-[0_0_8px_rgba(94,234,212,0.5)] z-10 border border-[#151921]"></div>
                          </div>
                          <div className="flex justify-between text-[11px] font-medium text-white mt-1">
                             <span>137,600원</span>
                             <span>144,400원</span>
                          </div>
                       </div>
                       <div className="space-y-2">
                          <div className="flex justify-between text-[10px] text-gray-500 mb-2">
                             <span>1년 최저가</span>
                             <span>1년 최고가</span>
                          </div>
                          <div className="relative h-1 w-full bg-[#2D3340] rounded-full">
                             <div className="absolute top-0 bottom-0 left-[90%] w-2 h-2 -mt-0.5 bg-[#5EEAD4] rounded-full shadow-[0_0_8px_rgba(94,234,212,0.5)] z-10 border border-[#151921]"></div>
                          </div>
                          <div className="flex justify-between text-[11px] font-medium text-white mt-1">
                             <span>50,800원</span>
                             <span>144,400원</span>
                          </div>
                       </div>
                       
                       {/* Order Book Balance Bar */}
                       <div className="pt-2">
                          <div className="flex w-full h-1.5 rounded-full overflow-hidden">
                             <div className="w-[85%] bg-blue-500"></div>
                             <div className="w-[15%] bg-red-500"></div>
                          </div>
                          <div className="flex justify-between text-[10px] text-gray-400 mt-2">
                             <div>
                                <span>판매대기</span>
                                <div className="text-white font-medium mt-0.5">776,609주</div>
                             </div>
                             <div className="text-right">
                                <span>구매대기</span>
                                <div className="text-white font-medium mt-0.5">140,084주</div>
                             </div>
                          </div>
                       </div>
                   </div>
                   
                   {/* AI Prediction Button */}
                   <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white border-none h-10 text-sm font-bold shadow-lg shadow-orange-500/20 mt-2">
                      <Star className="w-4 h-4 mr-2 fill-white text-white" />
                      AI 주가예측 (생성형AI)
                   </Button>

                   {/* Related Industries Header */}
                   <div className="mt-6">
                      <div className="flex items-center gap-6 border-b border-white/10 mb-4">
                         <div className="text-sm font-bold text-teal-400 border-b-2 border-teal-400 pb-2 -mb-px cursor-pointer px-1">관련 업종</div>
                         <div className="text-sm text-gray-500 pb-2 hover:text-white cursor-pointer transition-colors px-1">공매도 현황</div>
                         <div className="text-sm text-gray-500 pb-2 hover:text-white cursor-pointer transition-colors px-1">외국인/기관</div>
                      </div>
                      
                      {/* Related Industries Content */}
                      <div className="min-h-[300px] flex flex-col relative">
                         <div className="absolute top-0 left-0 z-10">
                            <div className="text-gray-300 text-sm mb-1">순위</div>
                            <div className="text-4xl font-bold text-white">1위</div>
                         </div>
                         
                         <div className="flex-1 w-full -mt-4">
                            <ResponsiveContainer width="100%" height={280}>
                               <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                                  <PolarGrid stroke="#333" />
                                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 11 }} />
                                  <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                                  <Radar
                                     name="2024"
                                     dataKey="A"
                                     stroke="#8b5cf6"
                                     strokeWidth={2}
                                     fill="#8b5cf6"
                                     fillOpacity={0.4}
                                   />
                                   <Radar
                                     name="2023"
                                     dataKey="fullMark" // Mocking other years for visual similarity to screenshot
                                     stroke="#ef4444"
                                     strokeWidth={2}
                                     fill="transparent"
                                     fillOpacity={0}
                                   />
                                   <Radar
                                     name="2022"
                                     dataKey="A" // Mocking
                                     stroke="#3b82f6"
                                     strokeWidth={2}
                                     fill="transparent"
                                     fillOpacity={0}
                                   />
                               </RadarChart>
                            </ResponsiveContainer>
                         </div>
                         
                         <div className="flex justify-center gap-6 mt-[-10px] mb-6">
                            <div className="flex items-center gap-2 text-xs">
                               <div className="w-6 h-1 bg-blue-500 rounded-full"></div>
                               <span className="text-white">2022년</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                               <div className="w-6 h-1 bg-red-500 rounded-full"></div>
                               <span className="text-white">2023년</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                               <div className="w-6 h-1 bg-purple-500 rounded-full"></div>
                               <span className="text-white">2024년</span>
                            </div>
                         </div>

                         <div className="border-t border-white/10 mb-4"></div>

                         {/* Related Stocks List */}
                         <div className="space-y-1">
                            {[
                                { name: 'SK하이닉스', price: '742,000원', change: '16,000', rate: '+2.20%', isUp: true, color: 'bg-red-500', icon: Cpu },
                                { name: '삼성전기', price: '267,500원', change: '500', rate: '-0.19%', isUp: false, color: 'bg-blue-600', icon: Smartphone },
                                { name: 'LG전자', price: '92,300원', change: '1,700', rate: '-1.81%', isUp: false, color: 'bg-pink-600', icon: Tv },
                                { name: '한화시스템', price: '58,500원', change: '1,000', rate: '-2.99%', isUp: false, color: 'bg-orange-500', icon: Disc }
                            ].map((stock, i) => (
                                <div key={i} className="flex items-center justify-between py-3 px-2 hover:bg-white/5 rounded-lg cursor-pointer transition-all group border border-transparent hover:border-white/5">
                                   <div className="flex items-center gap-3">
                                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stock.color} bg-opacity-20`}>
                                         <stock.icon className={`w-5 h-5 ${stock.color.replace('bg-', 'text-')}`} />
                                      </div>
                                      <span className="text-white font-bold text-sm group-hover:text-primary transition-colors">{stock.name}</span>
                                   </div>
                                   <div className="text-right">
                                      <div className="text-white font-bold text-sm tracking-tight">{stock.price}</div>
                                      <div className={`text-xs font-semibold mt-0.5 flex items-center justify-end gap-1 ${stock.isUp ? 'text-red-400' : 'text-blue-400'}`}>
                                         <span>{stock.isUp ? '▲' : '▼'} {stock.change}</span>
                                         <span className="opacity-80">{stock.rate}</span>
                                      </div>
                                   </div>
                                </div>
                            ))}
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </ResizablePanel>
        </ResizablePanelGroup>
    </div>
  );
}
