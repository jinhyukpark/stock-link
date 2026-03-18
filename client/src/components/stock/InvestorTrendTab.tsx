import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip, CartesianGrid } from "recharts";
import { Sparkles } from "lucide-react";

export function InvestorTrendTab() {
  const [activeTab, setActiveTab] = useState('투자자별');

  // Mock data for chart
  const chartData = [
    { date: '23년 6월', individual: -3200000, foreigner: 4100000, institution: -1200000 },
    { date: '23년 6월', individual: -1200000, foreigner: -2000000, institution: 500000 },
    { date: '23년 6월', individual: -1500000, foreigner: -800000, institution: 2000000 },
    { date: '23년 6월', individual: 4200000, foreigner: -3000000, institution: -800000 },
    { date: '23년 6월', individual: -600000, foreigner: 300000, institution: -400000 },
  ];

  // Mock table data
  const tableData = [
    { date: '오늘', individual: '-1.14', foreigner: '-1.14', inst: '+1.14', other: '-1.14' },
    { date: '07.24', individual: '-1.14', foreigner: '+1.14', inst: '-1.14', other: '-1.14' },
    { date: '07.23', individual: '+1.14', foreigner: '+1.14', inst: '-1.14', other: '-1.14' },
    { date: '07.22', individual: '-1.14', foreigner: '+1.14', inst: '+1.14', other: '-1.14' },
    { date: '07.21', individual: '-1.14', foreigner: '-1.14', inst: '+1.14', other: '-1.14' },
    { date: '07.20', individual: '+1.14', foreigner: '-1.14', inst: '-1.14', other: '-1.14' },
    { date: '07.19', individual: '-1.14', foreigner: '+1.14', inst: '-1.14', other: '+1.14' },
    { date: '07.19', individual: '-1.14', foreigner: '-1.14', inst: '-1.14', other: '-1.14' },
    { date: '07.19', individual: '-1.14', foreigner: '+1.14', inst: '-1.14', other: '+1.14' },
  ];

  const getColor = (val: string) => {
    if (val.startsWith('+')) return 'text-red-500';
    if (val.startsWith('-')) return 'text-blue-500';
    return 'text-gray-400';
  };

  return (
    <div className="flex h-full gap-4 pb-4">
      {/* Left Panel */}
      <div className="w-[45%] flex flex-col gap-4">
        {/* AI Summary Card */}
        <div className="bg-[#151921] rounded-lg border border-white/5 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-[#1E222B] p-1.5 rounded-md border border-white/10">
              <Sparkles className="w-4 h-4 text-teal-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-white font-bold text-[15px]">AI 투자지표 분석 요약</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-500/20 text-teal-400 border border-teal-500/30">PREMIUM</span>
              </div>
              <span className="text-gray-500 text-xs">25년 4분기 기준</span>
            </div>
          </div>
          <p className="text-gray-300 text-[13px] leading-relaxed mb-4">
            현재 주가수익비율(PER)은 <span className="text-red-400 font-medium">47.07배</span>로 동종 업계 평균 대비 다소 높은 수준이나, 향후 이익 성장성을 감안할 때 정당화될 수 있는 구간입니다. 유동비율은 251.37%로 단기 채무 지급 능력이 매우 우수하며, 부채비율 또한 26.36%로 재무적 안정성이 탁월합니다.
          </p>
          <div className="flex gap-2">
            <span className="px-3 py-1 rounded text-xs text-gray-300 border border-white/10 bg-white/5">
              밸류에이션 <span className="text-red-400">고평가</span>
            </span>
            <span className="px-3 py-1 rounded text-xs text-gray-300 border border-white/10 bg-white/5">
              재무건전성 <span className="text-teal-400">우수</span>
            </span>
          </div>
        </div>

        {/* Chart Card */}
        <div className="bg-[#151921] rounded-lg border border-white/5 p-5 flex-1 flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold text-sm">기간별 거래량</h3>
            <div className="flex bg-[#1E222B] rounded-md p-1 border border-white/5">
              {['주', '월', '년'].map(filter => (
                <button
                  key={filter}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    filter === '주' ? 'bg-[#2a2d36] text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 w-full min-h-[200px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" strokeOpacity={0.4} />
                <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} dy={10} />
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: '#1E222B', border: '1px solid #374151', borderRadius: '8px', color: 'white' }} />
                <Bar dataKey="individual" fill="#0284c7" radius={[2, 2, 0, 0]} />
                <Bar dataKey="foreigner" fill="#d97706" radius={[2, 2, 0, 0]} />
                <Bar dataKey="institution" fill="#0f766e" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Legend */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/5">
             <div className="text-center">
               <div className="flex items-center justify-center gap-1.5 mb-1 text-gray-400 text-xs">
                 <div className="w-2 h-2 rounded-full bg-[#0284c7]"></div>
                 개인 <span className="text-[10px]">ⓘ</span>
               </div>
               <div className="text-white text-sm font-medium">-3,266,791</div>
             </div>
             <div className="text-center">
               <div className="flex items-center justify-center gap-1.5 mb-1 text-gray-400 text-xs">
                 <div className="w-2 h-2 rounded-full bg-[#d97706]"></div>
                 외국인
               </div>
               <div className="text-white text-sm font-medium">4,169,935</div>
             </div>
             <div className="text-center">
               <div className="flex items-center justify-center gap-1.5 mb-1 text-gray-400 text-xs">
                 <div className="w-2 h-2 rounded-full bg-[#0f766e]"></div>
                 기관
               </div>
               <div className="text-white text-sm font-medium">-1,201,919</div>
             </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-[55%] bg-[#151921] rounded-lg border border-white/5 flex flex-col p-5">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-white font-bold text-[15px]">일별 거래량</h3>
          <span className="text-gray-500 text-xs">단위: 수량(주)</span>
        </div>

        <div className="flex bg-[#1E222B] rounded-lg p-1 mb-6 border border-white/5">
          {['투자자', '신용', '대차', '공매도', 'CFD'].map(tab => (
            <button
              key={tab}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                tab === '투자자' ? 'bg-[#374151] text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex gap-6 border-b border-white/5 mb-4">
          {['투자자별', '기관별'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm font-medium transition-colors border-b-2 ${
                activeTab === tab ? 'border-teal-400 text-teal-400' : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <table className="w-full text-center text-xs">
            <thead className="text-gray-400 sticky top-0 bg-[#151921] z-10 border-b border-white/5">
              <tr>
                <th className="py-3 font-medium">날짜</th>
                <th className="py-3 font-medium">개인</th>
                <th className="py-3 font-medium">외국인</th>
                <th className="py-3 font-medium">기관</th>
                <th className="py-3 font-medium">기타법인</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {tableData.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 text-gray-300 font-mono">{row.date}</td>
                  <td className={`py-3.5 font-mono ${getColor(row.individual)}`}>{row.individual}</td>
                  <td className={`py-3.5 font-mono ${getColor(row.foreigner)}`}>{row.foreigner}</td>
                  <td className={`py-3.5 font-mono ${getColor(row.inst)}`}>{row.inst}</td>
                  <td className={`py-3.5 font-mono ${getColor(row.other)}`}>{row.other}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
