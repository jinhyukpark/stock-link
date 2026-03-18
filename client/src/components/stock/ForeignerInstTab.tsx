import { useState, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, ReferenceArea, CartesianGrid } from "recharts";

export function ForeignerInstTab() {
  const [subTab, setSubTab] = useState<'foreigner' | 'institution'>('foreigner');

  // Mock data for foreign and institution net buying
  const data = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => {
      // Create some continuous looking data like the screenshot
      const val1 = Math.sin(i * 0.5) * 6000000 + (Math.random() - 0.5) * 10000000 - 3000000;
      const val2 = Math.cos(i * 0.5) * 6000000 + (Math.random() - 0.5) * 10000000;
      return {
        date: `2026-02-${(i + 1).toString().padStart(2, '0')}`,
        foreigner: val1,
        institution: val2,
      };
    });
  }, []);

  const currentDataKey = subTab;
  
  // Calculate max and min for gradient
  const dataMax = Math.max(...data.map(i => i[subTab]));
  const dataMin = Math.min(...data.map(i => i[subTab]));

  const gradientOffset = () => {
    if (dataMax <= 0) return 0;
    if (dataMin >= 0) return 1;
    return dataMax / (dataMax - dataMin);
  };
  
  const off = gradientOffset();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      const isPositive = value > 0;
      const color = isPositive ? '#f97316' : '#3b82f6';
      
      return (
        <div className="bg-white rounded-md px-3 py-2 shadow-lg text-black min-w-[140px] text-sm">
          <div className="text-gray-900 font-bold mb-1">{label}</div>
          <div className="flex items-center gap-1.5 font-bold">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }}></div>
            <span>{subTab === 'foreigner' ? '외국인' : '기관'}: {Math.floor(value).toLocaleString()}주</span>
          </div>
        </div>
      );
    }
    return null;
  };

  // Determine fixed ticks based on screenshot style (-15M, -10M, -5M, 0, 5M, 10M)
  const ticks = [-15000000, -10000000, -5000000, 0, 5000000, 10000000];

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
      
      <div className="h-[250px] w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="0" vertical={false} stroke="#374151" strokeOpacity={0.5} />
            <defs>
              <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset={off} stopColor="#c2410c" stopOpacity={1} />
                <stop offset={off} stopColor="#3b82f6" stopOpacity={1} />
              </linearGradient>
              <linearGradient id="splitFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset={off} stopColor="#c2410c" stopOpacity={0.6} />
                <stop offset={off} stopColor="#3b82f6" stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" hide />
            <YAxis 
              ticks={ticks}
              domain={[-15000000, 10000000]}
              tick={{ fill: '#e5e7eb', fontSize: 11, fontWeight: 600 }} 
              tickFormatter={(val) => val === 0 ? '0' : `${val / 1000000}M`} 
              axisLine={false} 
              tickLine={false} 
              orientation="left"
              width={40}
            />
            {/* Background block for negative area */}
            <ReferenceArea y1={0} y2={-15000000} fill="#1e3a8a" fillOpacity={0.3} />
            
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#4b5563', strokeWidth: 1, strokeDasharray: '3 3' }} />
            
            <Area 
              type="monotone" 
              dataKey={subTab} 
              stroke="url(#splitColor)" 
              strokeWidth={2.5} 
              fill="url(#splitFill)" 
              dot={false} 
              baseValue={0}
              activeDot={{ r: 5, stroke: '#1a1d24', strokeWidth: 2 }} 
              isAnimationActive={true} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
