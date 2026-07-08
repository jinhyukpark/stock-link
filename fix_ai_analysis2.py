import os
import re

filepath = "client/src/components/insight/MarketView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Make sure lucide-react has all the icons we need
lucide_import = 'import { Calendar, ChevronRight, Download, Share2, Activity, Info, BarChart2, TrendingUp, Maximize2, Sparkles, X, ChevronLeft, ArrowUpRight, ArrowDownRight, Minus, AlertCircle, PieChart, LineChart } from "lucide-react";'
if "ArrowUpRight" not in content:
    content = re.sub(
        r'import \{[^}]*\} from "lucide-react";',
        lucide_import,
        content
    )

old_analysis_block = """const AnalysisBlock = ({ content, className }: { content: React.ReactNode, className?: string }) => (
  <div className={cn("rounded-lg border border-blue-500/30 bg-blue-900/10 overflow-hidden flex flex-col", className)}>
    <div className="bg-blue-500/20 px-4 py-2 flex items-center gap-2 border-b border-blue-500/20 shrink-0">
      <Sparkles className="w-4 h-4 text-blue-400" />
      <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider font-mono">
        AI Insight
      </h4>
    </div>
    <div className="p-4 flex-1">
      <div className="text-sm text-gray-300 leading-relaxed font-sans">
        {content}
      </div>
    </div>
  </div>
);"""

new_analysis_block = """const AnalysisBlock = ({ content, className }: { content: React.ReactNode, className?: string }) => {
  // Since content is a ReactNode (can be a string or elements), we'll do our best to extract text for heuristic parsing,
  // but if it's complex, we'll fall back gracefully.
  let textContent = "";
  if (typeof content === 'string') {
    textContent = content;
  } else if (Array.isArray(content)) {
      textContent = content.map(c => typeof c === 'string' ? c : '').join('');
  } else if (content && typeof content === 'object' && 'props' in (content as any)) {
      textContent = (content as any).props.children?.toString() || "";
  }

  // Determine overall sentiment (basic heuristic for mockup)
  let sentiment = "neutral";
  if (textContent.includes("긍정") || textContent.includes("반등") || textContent.includes("상승") || textContent.includes("유입") || textContent.includes("강세")) sentiment = "positive";
  if (textContent.includes("부정") || textContent.includes("하락") || textContent.includes("리스크") || textContent.includes("이탈") || textContent.includes("우려") || textContent.includes("약세")) sentiment = "negative";

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* 1. Header & Main Insight */}
      <div className="bg-[#12141A] rounded-xl border border-white/5 overflow-hidden shadow-lg">
        <div className="p-5 border-b border-white/5 flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="bg-blue-500/20 p-1.5 rounded-lg border border-blue-500/30">
                <Sparkles className="w-4 h-4 text-blue-400" />
              </div>
              <h4 className="text-sm font-bold text-white tracking-wide">AI 핵심 진단</h4>
            </div>
            
            <div className={cn(
              "px-3 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-1.5",
              sentiment === "positive" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : 
              sentiment === "negative" ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" : 
              "bg-slate-500/10 text-slate-400 border border-slate-500/20"
            )}>
              {sentiment === "positive" && <><ArrowUpRight className="w-3.5 h-3.5"/> 긍정적 흐름</>}
              {sentiment === "negative" && <><ArrowDownRight className="w-3.5 h-3.5"/> 리스크 주의</>}
              {sentiment === "neutral" && <><Minus className="w-3.5 h-3.5"/> 방향성 탐색</>}
            </div>
          </div>
          
          <div className="bg-[#0B0E14] rounded-lg p-4 border border-white/5">
            <div className="text-slate-200 text-sm font-medium leading-relaxed">
              {content}
            </div>
          </div>
        </div>
        
        {/* 2. Detailed Breakdown Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/5 bg-[#161A22]">
          <div className="p-4 flex flex-col gap-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" /> 단기 추세
            </span>
            <span className={cn(
              "text-sm font-bold",
              sentiment === "positive" ? "text-emerald-400" : sentiment === "negative" ? "text-rose-400" : "text-slate-300"
            )}>
              {sentiment === "positive" ? "상승 모멘텀 유지" : sentiment === "negative" ? "하향 곡선" : "박스권 횡보"}
            </span>
          </div>
          <div className="p-4 flex flex-col gap-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1.5">
              <PieChart className="w-3.5 h-3.5" /> 시장 분위기
            </span>
            <span className={cn(
              "text-sm font-bold",
              sentiment === "positive" ? "text-blue-400" : sentiment === "negative" ? "text-rose-400" : "text-amber-400"
            )}>
              {sentiment === "positive" ? "위험 선호" : sentiment === "negative" ? "위험 회피 강화" : "눈치 보기 장세"}
            </span>
          </div>
          <div className="p-4 flex flex-col gap-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1.5">
              <LineChart className="w-3.5 h-3.5" /> 권장 대응
            </span>
            <span className="text-sm font-bold text-slate-200">
              {sentiment === "positive" ? "비중 확대" : sentiment === "negative" ? "단계적 관망" : "트레이딩 접근"}
            </span>
          </div>
        </div>
      </div>
      
      {/* 3. Actionable Info (Optional Tip) */}
      <div className="bg-[#12141A] rounded-xl border border-blue-500/10 p-4 flex items-start gap-3 shadow-sm">
        <Info className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
        <div className="text-blue-200/80 text-xs leading-relaxed">
          {sentiment === "positive" 
            ? "현재 흐름을 주도하는 주도주를 중심으로 비중을 늘려가는 전략이 유효합니다." 
            : sentiment === "negative" 
            ? "지금 따라 사기보다는 시장이 안정을 찾을 때까지 관망하며 단계적으로 접근하는 흐름이 살펴집니다." 
            : "뚜렷한 방향성이 나타나기 전까지는 섣부른 진입보다는 단기 트레이딩 위주의 접근을 권장합니다."}
        </div>
      </div>
    </div>
  );
};"""

content = content.replace(old_analysis_block, new_analysis_block)

with open(filepath, "w") as f:
    f.write(content)
