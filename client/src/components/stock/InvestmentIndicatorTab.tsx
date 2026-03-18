import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, ReferenceArea } from "recharts";
import { Sparkles, ChevronDown } from "lucide-react";

export function InvestmentIndicatorTab() {
  // Mock data for AI summary
  const aiSummary = "최근 1주일간 외국인과 기관의 동반 매도세가 이어지고 있습니다. 특히 외국인은 최근 3거래일 연속 순매도를 기록하며 차익 실현에 나선 모습입니다. 반면 개인 투자자들은 저가 매수세 유입으로 물량을 소화하고 있으나, 수급 불균형에 따른 단기 변동성 확대가 예상됩니다.";

  // Mock data for charts
  const valueData = [
    { date: '22년 12월', per: 60, pbr: 40, psr: 20 },
    { date: '22년 12월', per: 65, pbr: 45, psr: 22 },
    { date: '22년 12월', per: 80, pbr: 50, psr: 25 },
    { date: '22년 12월', per: 70, pbr: 60, psr: 30 },
    { date: '22년 12월', per: 65, pbr: 45, psr: 20 }
  ];

  const profitData = [
    { date: '22년 12월', roe: 50, roa: 30, ros: 20 },
    { date: '22년 12월', roe: 55, roa: 32, ros: 22 },
    { date: '22년 12월', roe: 60, roa: 30, ros: 25 },
    { date: '22년 12월', roe: 70, roa: 40, ros: 35 },
    { date: '22년 12월', roe: 60, roa: 35, ros: 25 }
  ];

  const stabilityData = [
    { date: '22년 12월', debt: 60, current: 40 },
    { date: '22년 12월', debt: 65, current: 40 },
    { date: '22년 12월', debt: 80, current: 40 },
    { date: '22년 12월', debt: 70, current: 40 },
    { date: '22년 12월', debt: 60, current: 35 }
  ];

  const renderChart = (data: any[], lines: {key: string, color: string, name: string}[], valueSuffix: string) => (
    <div className="flex-1 w-full min-h-[150px] relative mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" strokeOpacity={0.4} />
          {/* Mock ReferenceArea to show highlight as in image */}
          <ReferenceArea x1={data[3].date} x2={data[4].date} fill="#ffffff" fillOpacity={0.05} />
          <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} dy={10} />
          <YAxis hide domain={[0, 100]} />
          {lines.map(line => (
            <Line 
              key={line.key}
              type="monotone" 
              dataKey={line.key} 
              stroke={line.color} 
              strokeWidth={2} 
              dot={{ r: 4, fill: line.color, strokeWidth: 0 }} 
              activeDot={{ r: 6, fill: line.color, strokeWidth: 0 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="flex flex-col h-full gap-4 pb-4">
      {/* Top Panel - AI Summary */}
      <div className="bg-[#151921] rounded-lg border border-white/5 p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-[#1E222B] p-1.5 rounded-md border border-white/10">
            <Sparkles className="w-4 h-4 text-teal-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-white font-bold text-[15px]">AI 수급 분석 요약</h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-500/20 text-teal-400 border border-teal-500/30">PREMIUM</span>
            </div>
            <span className="text-gray-500 text-xs">25년 4분기 기준</span>
          </div>
        </div>
        <p className="text-gray-300 text-[13px] leading-relaxed mb-4">
          {aiSummary}
        </p>
        <div className="flex gap-2">
          <span className="px-3 py-1.5 rounded text-xs font-medium text-gray-300 border border-white/10 bg-[#1E222B]">
            외국인 <span className="text-teal-400 ml-1">매수 우위</span>
          </span>
          <span className="px-3 py-1.5 rounded text-xs font-medium text-gray-300 border border-white/10 bg-[#1E222B]">
            기관 <span className="text-red-400 ml-1">매도 우위</span>
          </span>
          <span className="px-3 py-1.5 rounded text-xs font-medium text-gray-300 border border-white/10 bg-[#1E222B]">
            수급점수 <span className="text-white ml-1">32점</span>
          </span>
        </div>
      </div>

      {/* Bottom Panel - Charts */}
      <div className="grid grid-cols-2 gap-4 flex-1 min-h-[300px]">
        {/* 가치성 */}
        <div className="bg-[#151921] rounded-lg border border-white/5 p-5 flex flex-col">
          <div className="flex justify-between items-center">
            <h3 className="text-white font-bold text-[15px]">가치성</h3>
            <div className="flex text-xs text-gray-500 gap-2 items-center">
              <span className="cursor-pointer hover:text-white">연결</span>
              <ChevronDown className="w-3 h-3" />
              <span className="w-px h-3 bg-white/10"></span>
              <span className="cursor-pointer hover:text-white text-white font-medium">분기</span>
              <ChevronDown className="w-3 h-3" />
            </div>
          </div>
          
          {renderChart(valueData, [
            { key: 'per', color: '#0ea5e9', name: 'PER' },
            { key: 'pbr', color: '#2dd4bf', name: 'PBR' },
            { key: 'psr', color: '#a855f7', name: 'PSR' }
          ], '배')}

          <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/5">
             <div className="text-center">
               <div className="flex items-center justify-center gap-1.5 mb-1 text-gray-400 text-[11px]">
                 <div className="w-2 h-2 rounded-full bg-[#0ea5e9]"></div>
                 PER
               </div>
               <div className="text-white text-sm font-medium">4.37배</div>
             </div>
             <div className="text-center">
               <div className="flex items-center justify-center gap-1.5 mb-1 text-gray-400 text-[11px]">
                 <div className="w-2 h-2 rounded-full bg-[#2dd4bf]"></div>
                 PBR
               </div>
               <div className="text-white text-sm font-medium">0.38배</div>
             </div>
             <div className="text-center">
               <div className="flex items-center justify-center gap-1.5 mb-1 text-gray-400 text-[11px]">
                 <div className="w-2 h-2 rounded-full bg-[#a855f7]"></div>
                 PSR
               </div>
               <div className="text-white text-sm font-medium">4.37배</div>
             </div>
          </div>
        </div>

        {/* 안정성 */}
        <div className="bg-[#151921] rounded-lg border border-white/5 p-5 flex flex-col">
          <div className="flex justify-between items-center">
            <h3 className="text-white font-bold text-[15px]">안정성</h3>
            <div className="flex text-xs text-gray-500 gap-2 items-center">
              <span className="cursor-pointer hover:text-white">연결</span>
              <ChevronDown className="w-3 h-3" />
              <span className="w-px h-3 bg-white/10"></span>
              <span className="cursor-pointer hover:text-white text-white font-medium">분기</span>
              <ChevronDown className="w-3 h-3" />
            </div>
          </div>
          
          {renderChart(stabilityData, [
            { key: 'debt', color: '#0ea5e9', name: '부채비율' },
            { key: 'current', color: '#2dd4bf', name: '유동비율' }
          ], '%')}

          <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/5">
             <div className="text-center">
               <div className="flex items-center justify-center gap-1.5 mb-1 text-gray-400 text-[11px]">
                 <div className="w-2 h-2 rounded-full bg-[#0ea5e9]"></div>
                 부채비율
               </div>
               <div className="text-white text-sm font-medium">4.37%</div>
             </div>
             <div className="text-center">
               <div className="flex items-center justify-center gap-1.5 mb-1 text-gray-400 text-[11px]">
                 <div className="w-2 h-2 rounded-full bg-[#2dd4bf]"></div>
                 유동비율
               </div>
               <div className="text-white text-sm font-medium">0.38%</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
