import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

export function ForeignerInstTab() {
  const [subTab, setSubTab] = useState<'foreigner' | 'institution'>('foreigner');

  // Mock data for foreign and institution net buying
  const data = Array.from({ length: 30 }, (_, i) => {
    const val1 = (Math.random() - 0.5) * 20000000;
    const val2 = (Math.random() - 0.5) * 20000000;
    return {
      date: `2026-02-${(i + 1).toString().padStart(2, '0')}`,
      foreigner: val1,
      institution: val2,
    };
  });

  return (
    <div className="min-h-[300px] flex flex-col relative pt-2 animate-in fade-in duration-300">
      <div className="flex rounded-md bg-[#1a1d24] p-1 mb-6 border border-white/5">
        <button 
          className={`flex-1 py-1.5 text-sm font-medium rounded ${subTab === 'foreigner' ? 'bg-[#2a2d36] text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'}`}
          onClick={() => setSubTab('foreigner')}
        >
          외국인
        </button>
        <button 
          className={`flex-1 py-1.5 text-sm font-medium rounded ${subTab === 'institution' ? 'bg-[#2a2d36] text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'}`}
          onClick={() => setSubTab('institution')}
        >
          기관
        </button>
      </div>
      
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 0, left: -10, bottom: 0 }}>
            <XAxis dataKey="date" hide />
            <YAxis tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 'bold' }} tickFormatter={(val) => `${val / 1000000}M`} axisLine={false} tickLine={false} />
            <ReferenceLine y={0} stroke="#4b5563" strokeWidth={1} />
            <Tooltip
              contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: 'none', color: 'black', padding: '8px 12px' }}
              itemStyle={{ color: 'black', fontWeight: 'bold' }}
              labelStyle={{ color: '#4b5563', fontSize: '12px', marginBottom: '4px' }}
              formatter={(value: number) => [<span className="font-bold">{value.toLocaleString()}주</span>, <span className="flex items-center gap-1"><div className={`w-2 h-2 rounded-full ${subTab === 'foreigner' ? 'bg-blue-400' : 'bg-orange-400'}`}></div>{subTab === 'foreigner' ? '외국인' : '기관'}</span>]}
            />
            {/* Show shadow for negative area */}
            {subTab === 'foreigner' && <Line type="monotone" dataKey="foreigner" stroke="#3b82f6" strokeWidth={2} dot={false} activeDot={{ r: 6, fill: '#3b82f6', stroke: 'white', strokeWidth: 2 }} />}
            {subTab === 'institution' && <Line type="monotone" dataKey="institution" stroke="#f97316" strokeWidth={2} dot={false} activeDot={{ r: 6, fill: '#f97316', stroke: 'white', strokeWidth: 2 }} />}
            
            {/* Background pattern similar to image - simplified with lines for demonstration */}
            {subTab === 'foreigner' && <Line type="monotone" dataKey="institution" stroke="#f97316" strokeWidth={1} strokeOpacity={0.3} dot={false} activeDot={false} />}
            {subTab === 'institution' && <Line type="monotone" dataKey="foreigner" stroke="#3b82f6" strokeWidth={1} strokeOpacity={0.3} dot={false} activeDot={false} />}
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      {/* Background area under 0 line */}
      <div className="absolute top-[120px] bottom-0 left-8 right-0 bg-[#3b82f6]/10 -z-10 rounded-b pointer-events-none"></div>
    </div>
  );
}
