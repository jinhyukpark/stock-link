import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowUp } from "lucide-react";

export function ShortSellingTab() {
  // Mock data for short selling volume chart
  const shortSellingData = Array.from({ length: 30 }, (_, i) => ({
    date: `2026-02-${(i + 1).toString().padStart(2, '0')}`,
    volume: Math.floor(Math.random() * 4000000) + 100000,
  }));

  return (
    <div className="min-h-[300px] flex flex-col relative pt-2 animate-in fade-in duration-300">
      <div className="text-gray-400 text-xs mb-4">기준일 : 2026년 03월 17일</div>
      
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={shortSellingData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" hide />
            <YAxis tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 'bold' }} tickFormatter={(val) => `${val / 1000000}M`} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: 'none', color: 'black', padding: '8px 12px' }}
              itemStyle={{ color: 'black', fontWeight: 'bold' }}
              labelStyle={{ color: '#4b5563', fontSize: '12px', marginBottom: '4px' }}
              formatter={(value: number) => [<span className="font-bold">{value.toLocaleString()}</span>, <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-400"></div>공매도량</span>]}
            />
            <Area type="monotone" dataKey="volume" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorVolume)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex justify-center mt-2 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-blue-500"></div>
          <span className="text-gray-300 text-xs">공매도량</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 mt-auto">
        <div className="bg-[#1a1d24] rounded-lg p-4 border border-white/5">
          <div className="flex justify-between items-center mb-1">
            <span className="text-gray-400 text-sm font-medium">공매도량</span>
            <div className="flex items-center text-red-500 text-xs font-bold gap-1">
              <ArrowUp className="w-3 h-3" /> 334,342주 <span className="ml-1">+116.37%</span>
            </div>
          </div>
          <div className="text-white text-xl font-bold">621,644주</div>
        </div>
        
        <div className="bg-[#1a1d24] rounded-lg p-4 border border-white/5">
          <div className="flex justify-between items-center mb-1">
            <span className="text-gray-400 text-sm font-medium">거래대금</span>
            <div className="flex items-center text-red-500 text-xs font-bold gap-1">
              <ArrowUp className="w-3 h-3" /> 612,616,791원 <span className="ml-1">+122.89%</span>
            </div>
          </div>
          <div className="text-white text-xl font-bold">1,111,113,797원</div>
        </div>
      </div>
    </div>
  );
}
