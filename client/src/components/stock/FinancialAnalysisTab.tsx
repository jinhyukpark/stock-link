import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, ReferenceLine } from "recharts";
import { Sparkles, ChevronDown } from "lucide-react";

export function FinancialAnalysisTab() {
  const [activeTab, setActiveTab] = useState('손익계산서');

  // Mock data for AI summary
  const aiSummary = "최근 1주일간 외국인과 기관의 동반 매도세가 이어지고 있습니다. 특히 외국인은 최근 3거래일 연속 순매도를 기록하며 차익 실현에 나선 모습입니다. 반면 개인 투자자들은 저가 매수세 유입으로 물량을 소화하고 있으나, 수급 불균형에 따른 단기 변동성 확대가 예상됩니다.";

  // Mock chart data for left bottom
  const chartData = [
    { date: '23년 6월', revenue: 107, profit: -7, net: 107 },
    { date: '23년 6월', revenue: 0, profit: 0, net: 0 },
    { date: '23년 6월', revenue: 300, profit: -120, net: 80 } // Mocked variations
  ];

  // Mock table data
  const financialStatements = [
    { item: '매출액(수익)', values: ['124,296억', '113,055억', '90,661억', '73,059억', '50,881억'], hasSubItems: true },
    { item: '매출원가', values: ['76,349억', '90,799억', '90,020억', '84,837억', '67,334억'], hasSubItems: true },
    { item: '매출총이익', values: ['47,946억', '22,255억', '641억', '-11,778억', '-16,453억'], highlight: true },
    { item: '판매비와 관리비', values: ['19,086억', '18,795억', '18,560억', '17,042억', '17,570억'], hasSubItems: true },
    { item: '영업이익', values: ['28,860억', '3,460억', '-17,919억', '-28,820억', '-34,023억'], highlight: true },
    { item: '영업이익(발표기준)', values: ['28,860억', '3,460억', '-17,919억', '-28,820억', '-34,023억'] },
    { item: '금융수익', values: ['11,175억', '732억', '6,682억', '4,470억', '10,733억'], hasSubItems: true },
    { item: '매출액(수익)', values: ['124,296억', '113,055억', '90,661억', '73,059억', '50,881억'], hasSubItems: true },
    { item: '매출원가', values: ['76,349억', '90,799억', '90,020억', '84,837억', '67,334억'], hasSubItems: true },
    { item: '매출총이익', values: ['47,946억', '22,255억', '641억', '-11,778억', '-16,453억'], highlight: true },
    { item: '매출총이익', values: ['47,946억', '22,255억', '641억', '-11,778억', '-16,453억'], highlight: true },
  ];

  const getColor = (val: string) => {
    if (val.startsWith('-')) return 'text-blue-500';
    return 'text-white';
  };

  return (
    <div className="flex h-full gap-4 pb-4">
      {/* Left Panel */}
      <div className="w-[45%] flex flex-col gap-4 h-full min-h-[400px]">
        {/* Top: AI Summary */}
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

        {/* Bottom: Financial Chart */}
        <div className="bg-[#151921] rounded-lg border border-white/5 p-6 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-bold text-[15px]">재무</h3>
            <div className="flex text-xs text-gray-500 gap-2 items-center">
              <span className="cursor-pointer hover:text-white">연결</span>
              <ChevronDown className="w-3 h-3" />
              <span className="w-px h-3 bg-white/10"></span>
              <span className="cursor-pointer hover:text-white text-white font-medium">분기</span>
              <ChevronDown className="w-3 h-3" />
            </div>
          </div>
          
          <div className="flex-1 w-full min-h-[150px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 0, left: 0, bottom: 20 }} barGap={0}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" strokeOpacity={0.4} />
                <ReferenceLine y={0} stroke="#4b5563" />
                <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} dy={10} />
                <Bar dataKey="revenue" fill="#0f766e" barSize={12} radius={[2, 2, 0, 0]} />
                <Bar dataKey="profit" fill="#d97706" barSize={12} radius={[0, 0, 2, 2]} />
                <Bar dataKey="net" fill="#65a30d" barSize={12} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-2 pt-4">
             <div className="text-center">
               <div className="flex items-center justify-center gap-1.5 mb-1 text-gray-400 text-xs">
                 <div className="w-2 h-2 rounded-full bg-[#0f766e]"></div>
                 매출
               </div>
               <div className="text-white text-sm font-medium">107억</div>
             </div>
             <div className="text-center">
               <div className="flex items-center justify-center gap-1.5 mb-1 text-gray-400 text-xs">
                 <div className="w-2 h-2 rounded-full bg-[#d97706]"></div>
                 영업이익
               </div>
               <div className="text-white text-sm font-medium">-7억</div>
             </div>
             <div className="text-center">
               <div className="flex items-center justify-center gap-1.5 mb-1 text-gray-400 text-xs">
                 <div className="w-2 h-2 rounded-full bg-[#65a30d]"></div>
                 순이익
               </div>
               <div className="text-white text-sm font-medium">107억</div>
             </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Financial Table */}
      <div className="w-[55%] bg-[#151921] rounded-lg border border-white/5 flex flex-col p-6 h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-6 border-b border-white/5 flex-1">
            {['손익계산서', '재무상태표', '현금흐름표'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === tab ? 'border-teal-400 text-teal-400' : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex text-xs text-gray-500 gap-2 items-center ml-4 shrink-0">
            <span className="cursor-pointer hover:text-white">연결</span>
            <ChevronDown className="w-3 h-3" />
            <span className="w-px h-3 bg-white/10"></span>
            <span className="cursor-pointer hover:text-white text-white font-medium">연간</span>
            <ChevronDown className="w-3 h-3" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <table className="w-full text-[13px] border-collapse">
            <thead className="bg-[#151921] sticky top-0 z-10 border-b border-white/5">
              <tr>
                <th className="py-3 text-left font-normal text-gray-400 w-[25%]">항목</th>
                {['24년 3월', '23년 12월', '23년 9월', '23년 6월', '23년 3월'].map((period, idx) => (
                  <th key={idx} className="py-3 text-right font-normal text-gray-400">{period}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {financialStatements.map((row, idx) => (
                <tr key={idx} className={`hover:bg-white/5 transition-colors group`}>
                  <td className={`py-3.5 pr-2 text-left border-white/5 ${row.highlight ? 'text-white font-bold' : 'text-gray-300'}`}>
                    <div className="flex items-center gap-1.5">
                      {row.hasSubItems && <ChevronDown className="w-3 h-3 text-gray-500" />}
                      {!row.hasSubItems && <span className="w-4" />}
                      {row.item}
                    </div>
                  </td>
                  {row.values.map((val, vIdx) => (
                    <td key={vIdx} className={`py-3.5 pl-2 text-right font-mono tracking-tight border-white/5 ${getColor(val)} ${row.highlight ? 'font-bold' : ''}`}>
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
