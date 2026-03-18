import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

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
      // For stacked area shading
      posArea: val1 > 0 ? val1 : 0,
      negArea: val1 < 0 ? val1 : 0,
      posAreaInst: val2 > 0 ? val2 : 0,
      negAreaInst: val2 < 0 ? val2 : 0,
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
          <AreaChart data={data} margin={{ top: 10, right: 0, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorNeg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.5} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" hide />
            <YAxis tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 'bold' }} tickFormatter={(val) => `${val / 1000000}M`} axisLine={false} tickLine={false} />
            <ReferenceLine y={0} stroke="#4b5563" strokeWidth={1} />
            <Tooltip
              contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: 'none', color: 'black', padding: '8px 12px' }}
              itemStyle={{ color: 'black', fontWeight: 'bold' }}
              labelStyle={{ color: '#4b5563', fontSize: '12px', marginBottom: '4px' }}
              formatter={(value: number, name: string) => {
                 // Only show tooltip for the actual data line, not the shaded areas
                 if (name === 'posArea' || name === 'negArea' || name === 'posAreaInst' || name === 'negAreaInst') return [];
                 return [<span className="font-bold">{value.toLocaleString()}주</span>, <span className="flex items-center gap-1"><div className={`w-2 h-2 rounded-full ${value > 0 ? 'bg-orange-400' : 'bg-blue-400'}`}></div>{subTab === 'foreigner' ? '외국인' : '기관'}</span>];
              }}
            />
            {/* Show split areas for positive and negative */}
            {subTab === 'foreigner' && (
              <>
                <Area type="monotone" dataKey="posArea" stroke="#f97316" strokeWidth={2} fill="url(#colorPos)" dot={false} activeDot={false} isAnimationActive={false} />
                <Area type="monotone" dataKey="negArea" stroke="#3b82f6" strokeWidth={2} fill="url(#colorNeg)" dot={false} activeDot={false} isAnimationActive={false} />
                {/* Invisible line for tooltip interaction points on actual data */}
                <Area type="monotone" dataKey="foreigner" stroke="transparent" fill="transparent" dot={false} activeDot={{ r: 6, fill: '#ffffff', stroke: '#3b82f6', strokeWidth: 2 }} />
              </>
            )}
            
            {subTab === 'institution' && (
              <>
                <Area type="monotone" dataKey="posAreaInst" stroke="#f97316" strokeWidth={2} fill="url(#colorPos)" dot={false} activeDot={false} isAnimationActive={false} />
                <Area type="monotone" dataKey="negAreaInst" stroke="#3b82f6" strokeWidth={2} fill="url(#colorNeg)" dot={false} activeDot={false} isAnimationActive={false} />
                {/* Invisible line for tooltip interaction points on actual data */}
                <Area type="monotone" dataKey="institution" stroke="transparent" fill="transparent" dot={false} activeDot={{ r: 6, fill: '#ffffff', stroke: '#3b82f6', strokeWidth: 2 }} />
              </>
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      {/* Background area under 0 line */}
      <div className="absolute top-[120px] bottom-0 left-8 right-0 bg-[#3b82f6]/10 -z-10 rounded-b pointer-events-none"></div>
    </div>
  );
}
