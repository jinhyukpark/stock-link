import { PieChart, Pie, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Check, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function FearGreedIndex() {
  const [isOpen, setIsOpen] = useState(false);
  const data = [
    { name: "Value", value: 75 },
    { name: "Remaining", value: 25 },
  ];
  
  // Fixed coordinate system for perfect alignment
  const width = 300;
  const height = 180;
  const cx = width / 2;
  const cy = height * 0.8;
  const iR = 80;
  const oR = 100;

  // Function to determine needle rotation
  const needle = (value: number, data: any[], cx: number, cy: number, iR: number, oR: number, color: string) => {
    let total = 0;
    data.forEach((v) => {
      total += v.value;
    });
    const ang = 180.0 * (1 - value / total);
    const length = (iR + 2 * oR) / 3;
    const sin = Math.sin(-Math.PI / 180 * ang);
    const cos = Math.cos(-Math.PI / 180 * ang);
    const r = 5;
    const x0 = cx;
    const y0 = cy;
    const xba = x0 + r * sin;
    const yba = y0 - r * cos;
    const xbb = x0 - r * sin;
    const ybb = y0 + r * cos;
    const xp = x0 + length * cos;
    const yp = y0 + length * sin;

    return [
      <circle key="pivot" cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
      <path key="needle" d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="none" fill={color} />,
    ];
  };

  return (
    <Card className="h-fit bg-card/50 backdrop-blur-sm border-border/50 flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Fear & Greed Index</CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="w-4 h-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Market sentiment indicator</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Gauge Chart Section */}
          <div className="relative h-[220px] w-full md:w-1/2 flex justify-center">
            <div className="scale-90 md:scale-100 origin-center transition-transform mt-2">
              <PieChart width={width} height={height}>
                <Pie
                  dataKey="value"
                  startAngle={180}
                  endAngle={0}
                  data={data}
                  cx={cx}
                  cy={cy}
                  innerRadius={iR}
                  outerRadius={oR}
                  fill="#8884d8"
                  stroke="none"
                >
                  <Cell fill="url(#gradientFear)" />
                  <Cell fill="#333" />
                </Pie>
                {needle(75, data, cx, cy, iR, oR, '#e2e8f0')}
                <defs>
                  <linearGradient id="gradientFear" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3b82f6" /> {/* Extreme Fear (Blue in original) */}
                    <stop offset="50%" stopColor="#a855f7" /> {/* Neutral (Purple) */}
                    <stop offset="100%" stopColor="#ef4444" /> {/* Extreme Greed (Red) */}
                  </linearGradient>
                </defs>
              </PieChart>
            </div>
            
            {/* Chart Labels Overlay */}
             <div className="absolute inset-x-0 top-[155px] flex justify-between px-6 pointer-events-none">
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest text-center leading-tight">Extreme<br/>Fear</span>
              <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest text-center leading-tight">Extreme<br/>Greed</span>
            </div>

             {/* Separate Score Display below the gauge */}
             <div className="absolute bottom-1 flex flex-col items-center z-20">
                 <div className="px-4 py-1 bg-background/80 backdrop-blur-md rounded-full border border-white/10 shadow-lg flex items-center gap-2">
                    <span className="text-2xl font-bold font-display text-white">75</span>
                    <span className="text-xs font-medium text-red-400 uppercase tracking-wider">Greed</span>
                 </div>
             </div>
          </div>

          {/* Time-based Indices List */}
          <div className="w-full md:w-1/2 flex flex-col gap-1.5">
             {[
               { label: "Fear Index", period: "1 Week", val: 28, color: "text-blue-400 border-blue-500/30" },
               { label: "Neutral Index", period: "1 Month", val: 57, color: "text-purple-400 border-purple-500/30" },
               { label: "Greed Index", period: "3 Months", val: 66, color: "text-red-400 border-red-500/30" },
               { label: "Greed Index", period: "6 Months", val: 71, color: "text-red-400 border-red-500/30" },
             ].map((item, i) => (
               <div key={i} className={`flex items-center justify-between p-2 rounded-lg border bg-secondary/20 ${item.color.split(' ')[1]}`}>
                  <div className="flex flex-col">
                    <span className={`text-xs font-bold ${item.color.split(' ')[0]}`}>{item.label}</span>
                    <span className="text-[10px] text-muted-foreground">{item.period}</span>
                  </div>
                  <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${item.color}`}>
                     {item.val}
                  </div>
               </div>
             ))}
          </div>
        </div>

        {/* Check Point Section */}
        <div className="bg-secondary/10 border border-border/50 rounded-lg p-3 space-y-2">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                 <Check className="w-5 h-5 text-primary" />
                 <span className="font-bold font-display italic text-lg">Check Point!</span>
              </div>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="h-7 text-xs border-primary/30 text-primary hover:bg-primary/10">
                     View Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl bg-[#151921] border-white/10 text-white p-0 gap-0">
                  <div className="p-6 border-b border-white/10">
                    <DialogTitle className="text-xl font-bold">공포 & 탐욕지수</DialogTitle>
                  </div>
                  
                  <Tabs defaultValue="1w" className="w-full">
                    <div className="px-6 pt-4 border-b border-white/10">
                      <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-none gap-8 rounded-none">
                        <TabsTrigger value="1w" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#8b5cf6] data-[state=active]:text-white data-[state=active]:shadow-none rounded-none px-0 pb-3 text-gray-400 hover:text-white transition-none data-[state=active]:font-bold text-base flex items-center gap-2">
                          공포 지수(1주일)
                          <span className="w-6 h-6 rounded-full border border-[#8b5cf6] text-[#8b5cf6] flex items-center justify-center text-xs font-bold bg-[#8b5cf6]/10">33</span>
                        </TabsTrigger>
                        <TabsTrigger value="1m" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#8b5cf6] data-[state=active]:text-white data-[state=active]:shadow-none rounded-none px-0 pb-3 text-gray-400 hover:text-white transition-none data-[state=active]:font-bold text-base flex items-center gap-2">
                          공포 지수(1달)
                          <span className="w-6 h-6 rounded-full border border-[#8b5cf6] text-[#8b5cf6] flex items-center justify-center text-xs font-bold bg-[#8b5cf6]/10">28</span>
                        </TabsTrigger>
                        <TabsTrigger value="3m" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#a855f7] data-[state=active]:text-white data-[state=active]:shadow-none rounded-none px-0 pb-3 text-gray-400 hover:text-white transition-none data-[state=active]:font-bold text-base flex items-center gap-2">
                          중립 지수(3개월)
                          <span className="w-6 h-6 rounded-full border border-[#a855f7] text-[#a855f7] flex items-center justify-center text-xs font-bold bg-[#a855f7]/10">51</span>
                        </TabsTrigger>
                        <TabsTrigger value="6m" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#a855f7] data-[state=active]:text-white data-[state=active]:shadow-none rounded-none px-0 pb-3 text-gray-400 hover:text-white transition-none data-[state=active]:font-bold text-base flex items-center gap-2">
                          중립 지수(6개월)
                          <span className="w-6 h-6 rounded-full border border-[#a855f7] text-[#a855f7] flex items-center justify-center text-xs font-bold bg-[#a855f7]/10">52</span>
                        </TabsTrigger>
                      </TabsList>
                    </div>

                    <div className="p-6">
                      <TabsContent value="1w" className="m-0 focus-visible:ring-0">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="w-full md:w-1/4 shrink-0">
                            <div className="bg-[#8b5cf6] rounded-xl p-6 flex flex-col items-center justify-center text-white h-full min-h-[140px]">
                              <span className="text-[100px] font-bold font-display leading-none mb-1">33</span>
                              <span className="text-lg font-medium opacity-90">공포 지수</span>
                              <span className="text-base font-medium opacity-90">(1주일)</span>
                            </div>
                          </div>
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-2 mb-2">
                               <Check className="w-6 h-6 text-primary" />
                               <span className="font-bold font-display italic text-2xl text-white">Check Point!</span>
                            </div>
                            <p className="text-sm text-gray-300 leading-relaxed break-keep">
                              지난 1주일 동안 주식시장의 공포 탐욕지수는 시작값 19.11 포인트에서 최고값 85.14 포인트까지 변동하며, 최저값은 19.11 포인트로 기록되었습니다. 변동폭은 66.03 포인트입니다. 시작값은 30 이하로 공포 구간에 해당하며, 최고값은 70 이상으로 탐욕 구간에 속합니다. 평균값 대비 탐욕일수가 더 많고 최근 기울기가 -8.43으로 공포 심리가 확산되는 경향을 보입니다. 이는 시장 참여자들이 불안정한 상태에서 심리적 압박을 받고 있음을 시사합니다.
                            </p>
                          </div>
                        </div>

                        <div className="mt-10 mb-6 flex items-center">
                          <div className="flex-1 h-px bg-white/10"></div>
                          <span className="px-4 text-sm font-medium text-gray-400">투자 조언</span>
                          <div className="flex-1 h-px bg-white/10"></div>
                        </div>

                        <div className="mb-6">
                          <p className="text-sm font-medium text-white leading-relaxed break-keep">
                            현재 시장은 탐욕과 공포 사이에서 불안정한 움직임을 보이고 있습니다. 최근 기울기가 음수로 나타나 공포 심리가 확산되고 있는 상황에서, 투자자들은 신중한 접근이 필요합니다. 단기적인 변동성에 대비하여 포트폴리오를 다각화하고, 시장의 심리적 변화에 민감하게 반응할 수 있는 전략을 고려해야합니다.
                          </p>
                        </div>

                        <div className="bg-[#1e2330] rounded-xl p-6 space-y-6">
                          <div>
                            <h5 className="text-[24px] font-bold text-white mb-2">1. 포트폴리오 다각화</h5>
                            <p className="text-[18px] text-gray-400 leading-relaxed break-keep">
                              다양한 자산군에 투자하여 리스크를 분산시키는 전략을 고려하세요. 주식뿐만 아니라 채권, 금, 부동산 등 다양한 자산에 투자함으로써 시장의 변동성에 대비할 수 있습니다.
                            </p>
                          </div>
                          <div>
                            <h5 className="text-[24px] font-bold text-white mb-2">2. 방어적 투자</h5>
                            <p className="text-[18px] text-gray-400 leading-relaxed break-keep">
                              시장의 불확실성이 높아지는 상황에서는 방어적 섹터에 투자하는 것이 유리할 수 있습니다. 필수 소비재, 헬스케어 등 경기 변동에 덜 민감한 섹터에 집중하여 안정성을 확보하세요.
                            </p>
                          </div>
                          <div>
                            <h5 className="text-[24px] font-bold text-white mb-2">3. 기술적 분석 활용</h5>
                            <p className="text-[18px] text-gray-400 leading-relaxed break-keep">
                              최근 기울기와 같은 기술적 지표를 활용하여 시장의 심리적 변화를 모니터링하고, 매수 및 매도 시점을 판단하는 데 도움을 받을 수 있습니다.
                            </p>
                          </div>
                          <div>
                            <h5 className="text-[24px] font-bold text-white mb-2">4. 현금 비중 확대</h5>
                            <p className="text-[18px] text-gray-400 leading-relaxed break-keep">
                              시장의 불확실성이 높아질 때는 현금 비중을 늘려 유동성을 확보하는 것이 중요합니다. 이는 급격한 시장 변동에 대비할 수 있는 안전장치가 될 수 있습니다.
                            </p>
                          </div>
                        </div>
                      </TabsContent>
                      
                      {/* 1 Month Tab Content */}
                      <TabsContent value="1m" className="m-0 focus-visible:ring-0">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="w-full md:w-1/4 shrink-0">
                            <div className="bg-[#8b5cf6] rounded-xl p-6 flex flex-col items-center justify-center text-white h-full min-h-[140px]">
                              <span className="text-[100px] font-bold font-display leading-none mb-1">28</span>
                              <span className="text-lg font-medium opacity-90">공포 지수</span>
                              <span className="text-base font-medium opacity-90">(1달)</span>
                            </div>
                          </div>
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-2 mb-2">
                               <Check className="w-6 h-6 text-primary" />
                               <span className="font-bold font-display italic text-2xl text-white">Check Point!</span>
                            </div>
                            <p className="text-sm text-gray-300 leading-relaxed break-keep">
                              지난 1달 동안 주식시장의 공포 탐욕지수는 지속적인 하락세를 보이며 공포 구간(28 포인트)에 머물러 있습니다. 이는 거시경제적 불확실성과 주요 기업들의 실적 부진 우려가 복합적으로 작용하여 시장 참여자들의 투자 심리가 크게 위축되었음을 나타냅니다. 단기적인 반등 시도에도 불구하고 전반적인 하락 추세가 이어지고 있습니다.
                            </p>
                          </div>
                        </div>

                        <div className="mt-10 mb-6 flex items-center">
                          <div className="flex-1 h-px bg-white/10"></div>
                          <span className="px-4 text-sm font-medium text-gray-400">투자 조언</span>
                          <div className="flex-1 h-px bg-white/10"></div>
                        </div>

                        <div className="mb-6">
                          <p className="text-sm font-medium text-white leading-relaxed break-keep">
                            지속적인 공포 심리가 시장을 지배하고 있는 현재 상황에서는 보수적인 투자 접근이 필요합니다. 성급한 매수보다는 관망하며 현금 비중을 유지하는 전략이 유효할 수 있습니다.
                          </p>
                        </div>

                        <div className="bg-[#1e2330] rounded-xl p-6 space-y-6">
                          <div>
                            <h5 className="text-[24px] font-bold text-white mb-2">1. 리스크 관리 우선</h5>
                            <p className="text-[18px] text-gray-400 leading-relaxed break-keep">
                              손절매 라인을 명확히 설정하고, 변동성이 큰 자산의 비중을 축소하여 포트폴리오의 안정성을 높이세요.
                            </p>
                          </div>
                          <div>
                            <h5 className="text-[24px] font-bold text-white mb-2">2. 우량주 중심의 관심</h5>
                            <p className="text-[18px] text-gray-400 leading-relaxed break-keep">
                              시장이 안정화될 때 반등 탄력이 좋을 수 있는 재무 구조가 탄탄하고 배당 수익률이 높은 우량주 위주로 관심 종목을 압축하세요.
                            </p>
                          </div>
                          <div>
                            <h5 className="text-[24px] font-bold text-white mb-2">3. 분할 매수 고려</h5>
                            <p className="text-[18px] text-gray-400 leading-relaxed break-keep">
                              장기적인 관점에서 접근한다면, 극단적인 공포 구간은 저가 매수의 기회가 될 수 있습니다. 한 번에 큰 금액을 투자하기보다는 일정 기간 동안 분할 매수하는 전략을 고려해볼 수 있습니다.
                            </p>
                          </div>
                        </div>
                      </TabsContent>
                      
                      {/* 3 Months Tab Content */}
                      <TabsContent value="3m" className="m-0 focus-visible:ring-0">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="w-full md:w-1/4 shrink-0">
                            <div className="bg-[#a855f7] rounded-xl p-6 flex flex-col items-center justify-center text-white h-full min-h-[140px]">
                              <span className="text-[100px] font-bold font-display leading-none mb-1">51</span>
                              <span className="text-lg font-medium opacity-90">중립 지수</span>
                              <span className="text-base font-medium opacity-90">(3개월)</span>
                            </div>
                          </div>
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-2 mb-2">
                               <Check className="w-6 h-6 text-primary" />
                               <span className="font-bold font-display italic text-2xl text-white">Check Point!</span>
                            </div>
                            <p className="text-sm text-gray-300 leading-relaxed break-keep">
                              지난 3개월간의 지수는 평균 51포인트로 전형적인 '중립' 상태를 보여줍니다. 이는 시장에 뚜렷한 상승이나 하락 모멘텀이 부재한 채 횡보 장세가 이어지고 있음을 의미합니다. 투자자들은 적극적인 매수나 매도보다는 관망하며 새로운 시장의 방향성을 탐색하고 있는 것으로 분석됩니다.
                            </p>
                          </div>
                        </div>

                        <div className="mt-10 mb-6 flex items-center">
                          <div className="flex-1 h-px bg-white/10"></div>
                          <span className="px-4 text-sm font-medium text-gray-400">투자 조언</span>
                          <div className="flex-1 h-px bg-white/10"></div>
                        </div>

                        <div className="mb-6">
                          <p className="text-sm font-medium text-white leading-relaxed break-keep">
                            방향성이 모호한 중립 시장에서는 개별 종목의 장세가 펼쳐질 가능성이 높습니다. 시장 전체의 흐름보다는 기업 고유의 가치와 실적에 집중하는 바텀업(Bottom-up) 투자 전략이 효과적일 수 있습니다.
                          </p>
                        </div>

                        <div className="bg-[#1e2330] rounded-xl p-6 space-y-6">
                          <div>
                            <h5 className="text-[24px] font-bold text-white mb-2">1. 개별 종목 선별 강화</h5>
                            <p className="text-[18px] text-gray-400 leading-relaxed break-keep">
                              섹터 전체의 움직임보다는 실적 개선세가 뚜렷하거나 새로운 성장 동력을 확보한 개별 기업을 발굴하는 데 집중하세요.
                            </p>
                          </div>
                          <div>
                            <h5 className="text-[24px] font-bold text-white mb-2">2. 밸류에이션 점검</h5>
                            <p className="text-[18px] text-gray-400 leading-relaxed break-keep">
                              현재 보유 중인 종목의 밸류에이션을 재점검하고, 고평가된 종목은 비중을 축소하여 현금을 확보해 두는 것도 좋은 전략입니다.
                            </p>
                          </div>
                          <div>
                            <h5 className="text-[24px] font-bold text-white mb-2">3. 트레이딩 관점 접근</h5>
                            <p className="text-[18px] text-gray-400 leading-relaxed break-keep">
                              박스권 장세에서는 지지선과 저항선을 활용한 짧은 호흡의 트레이딩이 유효할 수 있습니다. 단, 확실한 추세 이탈 시에는 빠르게 대응해야 합니다.
                            </p>
                          </div>
                        </div>
                      </TabsContent>

                      {/* 6 Months Tab Content */}
                      <TabsContent value="6m" className="m-0 focus-visible:ring-0">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="w-full md:w-1/4 shrink-0">
                            <div className="bg-[#a855f7] rounded-xl p-6 flex flex-col items-center justify-center text-white h-full min-h-[140px]">
                              <span className="text-[100px] font-bold font-display leading-none mb-1">52</span>
                              <span className="text-lg font-medium opacity-90">중립 지수</span>
                              <span className="text-base font-medium opacity-90">(6개월)</span>
                            </div>
                          </div>
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-2 mb-2">
                               <Check className="w-6 h-6 text-primary" />
                               <span className="font-bold font-display italic text-2xl text-white">Check Point!</span>
                            </div>
                            <p className="text-sm text-gray-300 leading-relaxed break-keep">
                              최근 6개월 장기 추세를 살펴보면 지수가 52포인트로 중립 구간에 안착해 있습니다. 일시적인 탐욕과 공포의 급등락이 있었으나, 전반적으로는 균형을 찾아가는 모습입니다. 이는 거시경제 지표들이 혼조세를 보이며 통화 정책에 대한 기대감과 실망감이 번갈아 반영된 결과로 해석됩니다.
                            </p>
                          </div>
                        </div>

                        <div className="mt-10 mb-6 flex items-center">
                          <div className="flex-1 h-px bg-white/10"></div>
                          <span className="px-4 text-sm font-medium text-gray-400">투자 조언</span>
                          <div className="flex-1 h-px bg-white/10"></div>
                        </div>

                        <div className="mb-6">
                          <p className="text-sm font-medium text-white leading-relaxed break-keep">
                            중장기적인 관점에서 균형 잡힌 시각이 필요합니다. 핵심 코어 자산과 전술적 자산을 분리하여 관리하는 바벨 전략(Barbell Strategy)이 유효해 보입니다.
                          </p>
                        </div>

                        <div className="bg-[#1e2330] rounded-xl p-6 space-y-6">
                          <div>
                            <h5 className="text-[24px] font-bold text-white mb-2">1. 장기 메가트렌드 투자</h5>
                            <p className="text-[18px] text-gray-400 leading-relaxed break-keep">
                              단기적인 지수 변동에 흔들리지 않고, 인공지능(AI), 친환경 에너지 등 3~5년 이상 지속될 장기 성장 트렌드에 꾸준히 투자하는 핵심 자산 비중을 유지하세요.
                            </p>
                          </div>
                          <div>
                            <h5 className="text-[24px] font-bold text-white mb-2">2. 유연한 자산 배분</h5>
                            <p className="text-[18px] text-gray-400 leading-relaxed break-keep">
                              나머지 전술적 자산은 금리 인하 기대감 축소나 지정학적 리스크 부각 등 시장의 단기 이벤트에 따라 유연하게 대응할 수 있도록 일정 부분 유동성을 확보해 두는 것이 좋습니다.
                            </p>
                          </div>
                          <div>
                            <h5 className="text-[24px] font-bold text-white mb-2">3. 배당 수익률 확인</h5>
                            <p className="text-[18px] text-gray-400 leading-relaxed break-keep">
                              지수 상승을 통한 자본 이득(Capital Gain)이 제한적일 수 있으므로, 안정적인 인컴(Income) 수익을 창출할 수 있는 고배당주에 대한 투자를 포트폴리오에 포함시키는 것을 권장합니다.
                            </p>
                          </div>
                        </div>
                      </TabsContent>
                    </div>
                  </Tabs>
                </DialogContent>
              </Dialog>
           </div>
           <p className="text-xs text-muted-foreground leading-relaxed">
             Over the past week, the stock market's Fear & Greed Index fluctuated between 12.65 and 44.76, showing a total volatility of 32.11 points. 
             The starting value was 25.38, falling within the Fear range (29 or lower), while the peak of 44.76 corresponded to the Neutral range (30-69). 
             The index initially showed strong fear but rose to neutral levels mid-week before declining again, demonstrating volatility. 
             This suggests that market sentiment has shown unstable movements.
           </p>
        </div>
      </CardContent>
    </Card>
  );
}