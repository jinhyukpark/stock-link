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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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

// Mock Data for Charts
const chartData = Array.from({ length: 50 }, (_, i) => ({
  time: i,
  price: 130000 + Math.random() * 20000 - 10000 + (i * 500),
  volume: Math.random() * 1000000
}));

const radarData = [
  { subject: '매출액', A: 120, fullMark: 150 },
  { subject: '영업이익', A: 98, fullMark: 150 },
  { subject: '배당수익률', A: 86, fullMark: 150 },
  { subject: 'EPS', A: 99, fullMark: 150 },
  { subject: 'ROE', A: 85, fullMark: 150 },
];

const shareholderData = [
  { name: '삼성생명보험 외 16인', value: 20.07, color: '#3b82f6' },
  { name: '국민연금공단', value: 7.68, color: '#10b981' },
  { name: 'BlackRock Fund', value: 5.03, color: '#f59e0b' },
  { name: '자사주', value: 0.58, color: '#ef4444' },
  { name: '기타', value: 66.64, color: '#6b7280' },
];

const productMixData = [
  { name: 'DX(가전, 스마트폰)', value: 45, color: '#3b82f6' },
  { name: 'DS(반도체)', value: 35, color: '#ef4444' },
  { name: 'SDC(디스플레이)', value: 12, color: '#10b981' },
  { name: 'Harman', value: 8, color: '#f59e0b' },
];

export default function StockDetailView({ onBack, stockName }: StockDetailViewProps) {
  return (
    <div className="flex flex-col h-full bg-[#0B0E14] text-white overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="flex items-center justify-between p-6 pb-4 border-b border-white/5">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-gray-400 hover:text-white shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
             {/* Logo removed as per user request/screenshot fix */}
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

      <div className="flex-1 p-6 space-y-6">
        {/* Top Section: Chart & Info */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 min-h-[500px]">
          {/* Main Chart */}
          <Card className="col-span-12 lg:col-span-9 bg-[#151921] border-white/10 p-4 flex flex-col h-[500px] lg:h-auto">
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
             
             <div className="flex-1 relative">
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
                
                {/* Volume Overlay (Mock) */}
                <div className="absolute bottom-0 left-0 right-0 h-20 opacity-30">
                  <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={chartData}>
                        <Bar dataKey="volume" fill="#ef4444" />
                     </BarChart>
                  </ResponsiveContainer>
                </div>
             </div>
          </Card>

          {/* Right Info Panel */}
          <Card className="col-span-12 lg:col-span-3 bg-[#151921] border-white/10 flex flex-col">
             <div className="p-4 border-b border-white/10">
                <h3 className="font-bold text-white mb-4">종목 정보</h3>
                <div className="grid grid-cols-4 gap-2 text-center text-xs mb-6">
                   <div className="bg-red-500/10 rounded p-1">
                      <div className="text-gray-400">일별</div>
                      <div className="text-red-400 font-bold">+1.51%</div>
                   </div>
                   <div className="bg-red-500/10 rounded p-1">
                      <div className="text-gray-400">주별</div>
                      <div className="text-red-400 font-bold">+7.17%</div>
                   </div>
                   <div className="bg-red-500/10 rounded p-1">
                      <div className="text-gray-400">월별</div>
                      <div className="text-red-400 font-bold">+1.01%</div>
                   </div>
                   <div className="bg-blue-500/10 rounded p-1">
                      <div className="text-gray-400">년별</div>
                      <div className="text-blue-400 font-bold">-0.89%</div>
                   </div>
                </div>
                
                <div className="space-y-3 text-xs">
                   <div className="flex justify-between">
                      <span className="text-gray-500">시장 구분</span>
                      <span className="text-white">코스피</span>
                   </div>
                   <div className="flex justify-between">
                      <span className="text-gray-500">시가총액 순위</span>
                      <span className="text-white">1위</span>
                   </div>
                   <div className="flex justify-between">
                      <span className="text-gray-500">액면가</span>
                      <span className="text-white">100원</span>
                   </div>
                   <Separator className="bg-white/10 my-2" />
                   <div className="flex justify-between">
                      <span className="text-gray-500">시가총액</span>
                      <span className="text-white">834조 6,689억</span>
                   </div>
                   <div className="flex justify-between">
                      <span className="text-gray-500">상장주식수</span>
                      <span className="text-white font-mono">5,919,637,922</span>
                   </div>
                   <Separator className="bg-white/10 my-2" />
                   <div className="grid grid-cols-4 gap-2 text-center">
                      <div>
                         <div className="text-gray-500 mb-1">PER</div>
                         <div className="text-white">47.07배</div>
                      </div>
                      <div>
                         <div className="text-gray-500 mb-1">PBR</div>
                         <div className="text-white">1.38배</div>
                      </div>
                      <div>
                         <div className="text-gray-500 mb-1">PSR</div>
                         <div className="text-white">6.57배</div>
                      </div>
                      <div>
                         <div className="text-gray-500 mb-1">ROE</div>
                         <div className="text-white">3.01%</div>
                      </div>
                   </div>
                </div>
             </div>

             <div className="p-4 flex-1">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-16 h-16">
                       <svg viewBox="0 0 36 36" className="w-full h-full rotate-[-90deg]">
                          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#333" strokeWidth="4" />
                          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="52.22, 100" />
                       </svg>
                       <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[#10b981]">52.2%</div>
                    </div>
                    <div className="text-xs space-y-1">
                       <div className="text-gray-400">상장주식</div>
                       <div className="text-white font-bold">5,919,637,922</div>
                       <div className="text-gray-400">외국인 보유 비율 <span className="text-white ml-2">52.22%</span></div>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <div className="space-y-1">
                       <div className="flex justify-between text-xs text-gray-500">
                          <span>1일 최저가</span>
                          <span>1일 최고가</span>
                       </div>
                       <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden relative">
                          <div className="absolute top-0 bottom-0 left-[70%] w-2 h-full bg-white rounded-full shadow-[0_0_10px_white]"></div>
                          <div className="w-full h-full bg-gradient-to-r from-blue-500 via-gray-700 to-red-500 opacity-50"></div>
                       </div>
                       <div className="flex justify-between text-xs font-mono text-white">
                          <span>137,600원</span>
                          <span>144,400원</span>
                       </div>
                    </div>
                    <div className="space-y-1">
                       <div className="flex justify-between text-xs text-gray-500">
                          <span>52주 최저가</span>
                          <span>52주 최고가</span>
                       </div>
                       <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden relative">
                          <div className="absolute top-0 bottom-0 left-[90%] w-2 h-full bg-white rounded-full shadow-[0_0_10px_white]"></div>
                          <div className="w-full h-full bg-gradient-to-r from-blue-500 via-gray-700 to-red-500 opacity-50"></div>
                       </div>
                       <div className="flex justify-between text-xs font-mono text-white">
                          <span>50,800원</span>
                          <span>144,400원</span>
                       </div>
                    </div>
                 </div>
                 
                 <Button className="w-full mt-6 bg-[#2a2e39] hover:bg-[#343a46] text-white border border-white/10 h-10 gap-2">
                    <Star className="w-4 h-4 text-purple-400 fill-purple-400" />
                    AI 주가예측 (생성형AI)
                 </Button>
             </div>
          </Card>
        </div>

        {/* Bottom Section */}
        <div>
           <Tabs defaultValue="company" className="w-full">
              <TabsList className="bg-transparent border-b border-white/10 w-full justify-start h-auto p-0 gap-6 rounded-none">
                 {['기업소개', '호가', '실시간/일별시세', '실적', '배당', '뉴스/공시', '투자자동향', '재무분석', '투자지표', '토론'].map((tab) => (
                    <TabsTrigger 
                       key={tab} 
                       value={tab === '기업소개' ? 'company' : tab} 
                       className="rounded-none border-b-2 border-transparent data-[state=active]:border-white data-[state=active]:bg-transparent data-[state=active]:text-white text-gray-400 py-3 px-0 transition-all hover:text-white"
                    >
                       {tab}
                    </TabsTrigger>
                 ))}
              </TabsList>
              
              <TabsContent value="company" className="mt-6">
                 <div className="grid grid-cols-12 gap-6">
                    {/* Company Summary */}
                    <Card className="col-span-12 lg:col-span-8 bg-[#151921] border-white/10 p-6">
                       <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                          기업소개
                          <Badge variant="outline" className="text-[10px] bg-blue-500/10 text-blue-400 border-blue-500/30">대기업</Badge>
                          <Badge variant="outline" className="text-[10px] bg-purple-500/10 text-purple-400 border-purple-500/30">KOSPI 1위</Badge>
                       </h3>
                       
                       <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm mb-6">
                          <div className="grid grid-cols-[100px_1fr]">
                             <span className="text-gray-500">사업자번호</span>
                             <span className="text-white">124-81-00998</span>
                          </div>
                          <div className="grid grid-cols-[100px_1fr]">
                             <span className="text-gray-500">대표이사</span>
                             <span className="text-white">전영현</span>
                          </div>
                          <div className="grid grid-cols-[100px_1fr]">
                             <span className="text-gray-500">설립일자</span>
                             <span className="text-white">1969년 01월 13일</span>
                          </div>
                          <div className="grid grid-cols-[100px_1fr]">
                             <span className="text-gray-500">직원수</span>
                             <span className="text-white">124,917명</span>
                          </div>
                          <div className="grid grid-cols-[100px_1fr] col-span-2">
                             <span className="text-gray-500">주소</span>
                             <span className="text-white">경기 수원시 영통구 삼성로 129</span>
                          </div>
                       </div>
                       
                       <div className="space-y-3 text-sm text-gray-300 leading-relaxed bg-black/20 p-4 rounded-lg border border-white/5">
                          <p>• 한국 및 DX부문 해외 9개 지역총괄과 DS부문 해외 5개 지역총괄, SDC, Harman 등 229개의 종속기업으로 구성된 글로벌 전자기업임.</p>
                          <p>• 세트사업은 TV를 비롯 모니터, 냉장고, 세탁기, 에어컨, 스마트폰, 네트워크시스템, 컴퓨터 등을 생산하는 DX부문이 있음.</p>
                          <p>• 부품 사업에는 DRAM, NAND Flash, 모바일AP 등의 제품을 생산하고 있는 DS 부문과 스마트폰용 OLED 패널을 생산하고 있는 SDC가 있음.</p>
                       </div>
                       
                       <div className="mt-8 grid grid-cols-2 gap-8">
                          <div>
                             <h4 className="font-bold text-white mb-4 text-sm">주주 정보</h4>
                             <div className="space-y-3">
                                {shareholderData.map((item, idx) => (
                                   <div key={idx} className="flex justify-between text-xs">
                                      <div className="flex items-center gap-2">
                                         <div className="w-2 h-2 rounded-full" style={{backgroundColor: item.color}}></div>
                                         <span className="text-gray-400">{item.name}</span>
                                      </div>
                                      <div className="text-white font-mono">{item.value}%</div>
                                   </div>
                                ))}
                             </div>
                          </div>
                          <div>
                             <h4 className="font-bold text-white mb-4 text-sm">주요 제품 매출 구성</h4>
                             <div className="flex items-center gap-4">
                                <div className="h-32 w-32 relative">
                                   <ResponsiveContainer width="100%" height="100%">
                                      <PieChart>
                                         <Pie 
                                            data={productMixData} 
                                            innerRadius={25} 
                                            outerRadius={40} 
                                            paddingAngle={5} 
                                            dataKey="value"
                                            stroke="none"
                                         >
                                            {productMixData.map((entry, index) => (
                                               <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                         </Pie>
                                      </PieChart>
                                   </ResponsiveContainer>
                                   <div className="absolute inset-0 flex items-center justify-center text-[10px] text-gray-400">
                                      2024.09
                                   </div>
                                </div>
                                <div className="space-y-2 text-xs flex-1">
                                   {productMixData.map((item, idx) => (
                                      <div key={idx} className="flex justify-between">
                                         <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full" style={{backgroundColor: item.color}}></div>
                                            <span className="text-gray-400 truncate max-w-[100px]">{item.name}</span>
                                         </div>
                                         <span className="text-white font-bold">{item.value}%</span>
                                      </div>
                                   ))}
                                </div>
                             </div>
                          </div>
                       </div>
                    </Card>

                    {/* Right Analysis */}
                    <Card className="col-span-12 lg:col-span-4 bg-[#151921] border-white/10 p-6 flex flex-col">
                       <h3 className="font-bold text-white mb-6 flex items-center justify-between">
                          <span>관련 업종</span>
                          <span className="text-xs font-normal text-gray-500">전기전자 | 코스피</span>
                       </h3>
                       
                       <div className="mb-8">
                          <div className="text-gray-400 text-sm mb-1">순위</div>
                          <div className="text-4xl font-bold text-white">1위</div>
                       </div>
                       
                       <div className="flex-1 relative min-h-[250px]">
                          <ResponsiveContainer width="100%" height="100%">
                             <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                                <PolarGrid stroke="#333" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 11 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                                <Radar
                                   name="Samsung"
                                   dataKey="A"
                                   stroke="#8b5cf6"
                                   strokeWidth={2}
                                   fill="#8b5cf6"
                                   fillOpacity={0.3}
                                />
                             </RadarChart>
                          </ResponsiveContainer>
                       </div>
                       
                       <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                          <div className="flex items-center gap-2 text-xs justify-center">
                             <div className="w-3 h-0.5 bg-blue-500"></div>
                             <span className="text-gray-400">2022년</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs justify-center">
                             <div className="w-3 h-0.5 bg-red-500"></div>
                             <span className="text-gray-400">2023년</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs justify-center">
                             <div className="w-3 h-0.5 bg-purple-500"></div>
                             <span className="text-gray-400">2024년</span>
                          </div>
                       </div>
                    </Card>
                 </div>
              </TabsContent>
           </Tabs>
        </div>
      </div>
    </div>
  );
}
