import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  ReferenceLine
} from "recharts";
import { Info, Download } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Mock Data ---

const sectors = [
  "자동차", "로봇", "백화점/마트", "자동차 부품", "운송", "산업기계", "소매판매", "상업서비스와공급품", "해운/해운운송", 
  "조선", "해운", "스마트폰 소재/부품", "바이오/신약개발", "기타금융", "디스플레이 패널", "건자재", "진단기기/의료기기", 
  "정유/화학", "화장품", "건설기계", "통신/통신장비", "미디어", "디스플레이 장비", "의류", "첨단소재", "철강/비철금속", 
  "해운/항공운송", "기타", "여행", "전력에너지", "유통", "음식료", "IT소프트웨어", "홈리빙/가구", "호텔/카지노", 
  "반도체", "건설", "가전제품", "방위산업", "반도체 소재", "반도체 부품", "디스플레이 소재", "전략기기", "항공/항공운송", 
  "엔터테인먼트", "보험", "교육", "지주회사", "반도체 장비", "은행", "유틸리티", "AI/클라우드", "헬스케어", 
  "필수소비재", "이차전지 배터리", "증권", "창업투자/VC", "게임", "이차전지 장비", "이차전지 소재", "미용기기", 
  "신재생에너지", "PCB/기판", "반도체 OSAT", "원자력", "유리기판"
];

// Generate random return data for sectors
const generateSectorData = () => {
  return sectors.map(sector => {
    // Generate a value between -5 and +3
    const value = (Math.random() * 8) - 5; 
    return {
      name: sector,
      value: Number(value.toFixed(1))
    };
  }).sort((a, b) => b.value - a.value); // Sort descending
};

const periods = [
  { id: "1d", label: "1일 (오늘)" },
  { id: "5d", label: "5일 (1주)" },
  { id: "20d", label: "20일 (1개월)" },
  { id: "60d", label: "60일 (3개월)" },
  { id: "120d", label: "120일 (6개월)" },
  { id: "rs", label: "RS 점수" }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    const isPositive = value > 0;
    
    return (
      <div className="bg-[#1e293b] border border-border/50 p-3 rounded shadow-xl text-xs font-mono border-l-4" 
           style={{ borderLeftColor: isPositive ? '#ef4444' : '#3b82f6' }}>
        <p className="font-bold text-white mb-1">{label}</p>
        <div className="flex items-center gap-2">
          <span className="text-gray-400">수익률:</span>
          <span className={cn("font-bold", isPositive ? "text-red-400" : "text-blue-400")}>
            {value > 0 ? '+' : ''}{value}%
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export default function ThemeView() {
  const [selectedPeriod, setSelectedPeriod] = useState("1d");
  const [data, setData] = useState(generateSectorData());

  // Function to get color based on value
  const getBarColor = (value: number) => {
    if (value > 0) {
      // Red scale
      if (value > 2) return "#7f1d1d"; // dark red
      if (value > 1) return "#991b1b";
      if (value > 0.5) return "#b91c1c";
      return "#ef4444"; // red-500
    } else {
      // Blue scale
      if (value < -3) return "#172554"; // dark blue
      if (value < -2) return "#1e3a8a";
      if (value < -1) return "#1d4ed8";
      return "#3b82f6"; // blue-500
    }
  };

  const handlePeriodChange = (periodId: string) => {
    setSelectedPeriod(periodId);
    // Regenerate random data for effect
    setData(generateSectorData());
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Description Banner */}
      <div className="flex items-center gap-4 mb-2">
         <div className="flex items-center gap-3 bg-purple-950/20 border border-purple-500/20 rounded-lg px-4 py-3 text-sm text-purple-100 w-full">
           <Info className="w-5 h-5 text-purple-400 shrink-0" />
           <div>
             <span className="font-bold text-purple-300 mr-2">테마 분석 (Theme Analysis)</span>
             <span className="text-gray-400">
               시장 전체의 자금 흐름을 섹터별로 시각화하여 주도 테마와 소외 테마를 한눈에 파악합니다.
             </span>
           </div>
         </div>
      </div>

      <div className="bg-[#151921] border border-white/5 rounded-xl p-6 shadow-xl">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-1">
              섹터별 수익률
              <span className="text-sm font-normal text-gray-400 ml-2">({periods.find(p => p.id === selectedPeriod)?.label})</span>
            </h2>
            <p className="text-xs text-gray-500 font-mono">Real-time Sector Performance</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {periods.map((period) => (
              <button
                key={period.id}
                onClick={() => handlePeriodChange(period.id)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-bold transition-all border",
                  selectedPeriod === period.id
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-gray-500 border-white/10 hover:border-white/30 hover:text-gray-300"
                )}
              >
                <div className="flex items-center gap-1.5">
                  <div className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    selectedPeriod === period.id ? "bg-red-500" : "bg-transparent border border-gray-500"
                  )} />
                  {period.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chart Area */}
        <div className="h-[500px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
              barGap={2}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis 
                dataKey="name" 
                interval={0} 
                angle={-45} 
                textAnchor="end" 
                height={100} 
                tick={{ fontSize: 10, fill: '#94a3b8' }}
                tickLine={false}
                axisLine={{ stroke: '#334155' }}
              />
              <YAxis 
                tick={{ fontSize: 11, fill: '#64748b' }} 
                tickLine={false}
                axisLine={false}
                unit="%"
                domain={['dataMin - 1', 'dataMax + 1']}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
              <ReferenceLine y={0} stroke="#475569" />
              <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.value)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
