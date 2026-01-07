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
  MoreHorizontal
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
  Legend
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
                                        <div key={`ask-${i}`} className="grid grid-cols-[1fr_120px_1fr] h-10 border-b border-white/5 text-sm group hover:bg-white/5">
                                          <div className="relative flex items-center justify-end pr-2 bg-blue-500/5 group-hover:bg-blue-500/10">
                                              <div 
                                                className="absolute top-1 bottom-1 right-0 bg-blue-500/20 z-0 transition-all" 
                                                style={{ width: `${Math.min(order.volume / 500000 * 100, 100)}%` }}
                                              ></div>
                                              <span className="relative z-10 text-blue-300 font-mono tracking-wide">{order.volume.toLocaleString()}</span>
                                          </div>
                                          <div className="flex items-center justify-center bg-[#1E222B] text-red-400 font-bold border-x border-white/5">
                                              {order.price.toLocaleString()}
                                              <span className="ml-1 text-[10px] opacity-70">+{order.rate}%</span>
                                          </div>
                                          <div className="bg-[#151921]"></div>
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

                                  {/* Right Summary Panel */}
                                  <div className="w-[320px] shrink-0 flex flex-col gap-4">
                                      <div className="bg-[#151921] rounded-lg border border-white/5 p-0 overflow-hidden">
                                          <div className="grid grid-cols-2 text-xs border-b border-white/5">
                                              <div className="p-3 border-r border-white/5 text-gray-400">52주 최고</div>
                                              <div className="p-3 text-right font-medium text-red-400">144,400</div>
                                          </div>
                                          <div className="grid grid-cols-2 text-xs border-b border-white/5">
                                              <div className="p-3 border-r border-white/5 text-gray-400">52주 최저</div>
                                              <div className="p-3 text-right font-medium text-blue-400">50,800</div>
                                          </div>
                                          <div className="h-2 bg-[#0B0E14] border-b border-white/5"></div>
                                          <div className="grid grid-cols-2 text-xs border-b border-white/5">
                                              <div className="p-3 border-r border-white/5 text-gray-400">상한가</div>
                                              <div className="p-3 text-right font-medium text-red-400">180,500</div>
                                          </div>
                                          <div className="grid grid-cols-2 text-xs border-b border-white/5">
                                              <div className="p-3 border-r border-white/5 text-gray-400">하한가</div>
                                              <div className="p-3 text-right font-medium text-blue-400">97,300</div>
                                          </div>
                                          <div className="grid grid-cols-2 text-xs border-b border-white/5">
                                              <div className="p-3 border-r border-white/5 text-gray-400">상승VI</div>
                                              <div className="p-3 text-right font-medium text-red-400">152,790</div>
                                          </div>
                                          <div className="grid grid-cols-2 text-xs border-b border-white/5">
                                              <div className="p-3 border-r border-white/5 text-gray-400">하락VI</div>
                                              <div className="p-3 text-right font-medium text-blue-400">125,010</div>
                                          </div>
                                          <div className="h-2 bg-[#0B0E14] border-b border-white/5"></div>
                                          <div className="grid grid-cols-2 text-xs border-b border-white/5">
                                              <div className="p-3 border-r border-white/5 text-gray-400">시작</div>
                                              <div className="p-3 text-right font-medium text-white">143,500</div>
                                          </div>
                                          <div className="grid grid-cols-2 text-xs border-b border-white/5">
                                              <div className="p-3 border-r border-white/5 text-gray-400">최고</div>
                                              <div className="p-3 text-right font-medium text-red-400">144,400</div>
                                          </div>
                                          <div className="grid grid-cols-2 text-xs border-b border-white/5">
                                              <div className="p-3 border-r border-white/5 text-gray-400">최저</div>
                                              <div className="p-3 text-right font-medium text-blue-400">137,600</div>
                                          </div>
                                          <div className="h-2 bg-[#0B0E14] border-b border-white/5"></div>
                                          <div className="grid grid-cols-2 text-xs border-b border-white/5">
                                              <div className="p-3 border-r border-white/5 text-gray-400">거래량</div>
                                              <div className="p-3 text-right font-medium text-white">4,486만 1,533</div>
                                          </div>
                                          <div className="grid grid-cols-2 text-xs">
                                              <div className="p-3 border-r border-white/5 text-gray-400">어제보다</div>
                                              <div className="p-3 text-right font-medium text-white">98.99%</div>
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
                           <div className="text-gray-500 text-[10px] mb-1">{item.label}</div>
                           <div className={`font-bold text-xs ${item.color}`}>{item.value}</div>
                        </div>
                      ))}
                   </div>

                   {/* Market Info Row */}
                   <div className="grid grid-cols-3 gap-2">
                      <div className="bg-[#1E222B] rounded-md p-3 text-center border border-white/5 flex flex-col justify-center">
                         <div className="text-gray-500 text-[10px] mb-1">시장 구분</div>
                         <div className="text-white text-xs font-medium">코스피</div>
                      </div>
                      <div className="bg-[#1E222B] rounded-md p-3 text-center border border-white/5 flex flex-col justify-center">
                         <div className="text-gray-500 text-[10px] mb-1">시가총액 순위</div>
                         <div className="text-white text-xs font-medium">1위</div>
                      </div>
                      <div className="bg-[#1E222B] rounded-md p-3 text-center border border-white/5 flex flex-col justify-center">
                         <div className="text-gray-500 text-[10px] mb-1">액면가</div>
                         <div className="text-white text-xs font-medium">100원</div>
                      </div>
                   </div>

                   {/* Market Cap & Shares Row */}
                   <div className="grid grid-cols-2 gap-2">
                      <div className="bg-[#1E222B] rounded-md p-3 text-center border border-white/5">
                         <div className="text-gray-500 text-[10px] mb-1">시가총액</div>
                         <div className="text-white text-sm font-bold">834조 6,689억</div>
                      </div>
                      <div className="bg-[#1E222B] rounded-md p-3 text-center border border-white/5">
                         <div className="text-gray-500 text-[10px] mb-1">상장주식수</div>
                         <div className="text-white text-sm font-bold">5,919,637,922주</div>
                      </div>
                   </div>

                   {/* Valuation Ratios Row */}
                   <div className="grid grid-cols-4 gap-2">
                      {[
                        { label: 'PER', value: '47.07배' },
                        { label: 'PBR', value: '1.38배' },
                        { label: 'PSR', value: '6.57배' },
                        { label: 'ROE', value: '3.01%' }
                      ].map((item, i) => (
                        <div key={i} className="bg-[#1E222B] rounded-md p-2 text-center border border-white/5">
                           <div className="text-gray-500 text-[10px] mb-1">{item.label}</div>
                           <div className="text-white text-xs font-medium">{item.value}</div>
                        </div>
                      ))}
                   </div>

                   {/* Foreign Holdings Circle */}
                   <div className="flex items-center justify-center gap-6 mt-4 py-2 px-4">
                      <div className="relative w-24 h-24 shrink-0">
                          <svg viewBox="0 0 36 36" className="w-full h-full rotate-[-90deg]">
                             <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#2D3340" strokeWidth="3" />
                             <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" fill="none" stroke="#5EEAD4" strokeWidth="3" strokeDasharray="52.22, 100" strokeLinecap="round" />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                             <div className="text-xs font-bold text-white">52.22%</div>
                          </div>
                       </div>
                       <div className="flex flex-col gap-1 min-w-0 flex-1">
                          <div className="text-xs text-gray-400">상장주식</div>
                          <div className="text-base font-bold text-white truncate">5,919,637,922</div>
                          <div className="text-xs text-gray-400 mt-1">외국인 보유비율 <span className="text-teal-400 ml-1">52.22%</span></div>
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
                         
                         <div className="flex justify-center gap-6 mt-[-10px]">
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
                      </div>
                   </div>
                </div>
             </div>
          </ResizablePanel>
        </ResizablePanelGroup>
    </div>
  );
}
