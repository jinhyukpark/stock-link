import os

filepath = "client/src/components/insight/MarketView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Make sure lucide-react has all the icons we need
lucide_import = 'import { Calendar, ChevronRight, Download, Share2, Activity, Info, BarChart2, TrendingUp, Maximize2, Sparkles, X, ChevronLeft, ArrowUpRight, ArrowDownRight, Minus, AlertCircle, PieChart, LineChart } from "lucide-react";'
if "ArrowUpRight" not in content:
    content = content.replace(
        'import { Calendar, ChevronRight, Download, Share2, Activity, Info, BarChart2, TrendingUp, Maximize2, Sparkles, X, ChevronLeft } from "lucide-react";',
        lucide_import
    )

old_analysis_block = """const AnalysisBlock = ({ content }: { content: string }) => {
  return (
    <div className="bg-primary/5 rounded-lg border border-primary/20 p-6 flex items-start gap-4">
      <div className="bg-primary/10 p-2 rounded-full mt-1 shrink-0">
        <Sparkles className="w-5 h-5 text-primary" />
      </div>
      <div>
        <h4 className="text-sm font-bold text-primary mb-2 uppercase tracking-wider">AI Analysis</h4>
        <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
          {content}
        </div>
      </div>
    </div>
  );
};"""

new_analysis_block = """const AnalysisBlock = ({ content }: { content: string }) => {
  // Parsing logic to create a more structured dashboard-like AI analysis
  // We'll split the content into sections based on keywords or structure
  
  // Extract main insight/summary (usually first sentence or paragraph)
  const lines = content.split('\\n').filter(l => l.trim() !== '');
  const mainSummary = lines[0];
  const details = lines.slice(1).join('\\n');
  
  // Determine overall sentiment (very basic heuristic for mockup)
  let sentiment = "neutral";
  if (content.includes("긍정") || content.includes("반등") || content.includes("상승") || content.includes("유입")) sentiment = "positive";
  if (content.includes("부정") || content.includes("하락") || content.includes("리스크") || content.includes("이탈")) sentiment = "negative";

  return (
    <div className="flex flex-col gap-4">
      {/* 1. Header & Main Insight */}
      <div className="bg-[#12141A] rounded-xl border border-white/5 overflow-hidden">
        <div className="p-5 border-b border-white/5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-blue-500/20 p-1.5 rounded-lg">
                <Sparkles className="w-4 h-4 text-blue-400" />
              </div>
              <h4 className="text-sm font-bold text-white">AI 핵심 진단</h4>
            </div>
            
            <div className={cn(
              "px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1",
              sentiment === "positive" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : 
              sentiment === "negative" ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" : 
              "bg-slate-500/10 text-slate-400 border border-slate-500/20"
            )}>
              {sentiment === "positive" && <><ArrowUpRight className="w-3 h-3"/> 긍정적 흐름</>}
              {sentiment === "negative" && <><ArrowDownRight className="w-3 h-3"/> 리스크 주의</>}
              {sentiment === "neutral" && <><Minus className="w-3 h-3"/> 방향성 탐색</>}
            </div>
          </div>
          
          <div className="bg-[#0B0E14] rounded-lg p-4 border border-white/5">
            <p className="text-slate-200 text-sm font-medium leading-relaxed">
              {mainSummary}
            </p>
          </div>
        </div>
        
        {/* 2. Detailed Breakdown Grid */}
        {details && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/5 bg-[#161A22]">
            <div className="p-4 flex flex-col gap-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
                <Activity className="w-3 h-3" /> 단기 추세
              </span>
              <span className={cn(
                "text-sm font-semibold",
                sentiment === "positive" ? "text-emerald-400" : sentiment === "negative" ? "text-rose-400" : "text-slate-300"
              )}>
                {sentiment === "positive" ? "상승 모멘텀 유지" : sentiment === "negative" ? "하향 곡선" : "박스권 횡보"}
              </span>
            </div>
            <div className="p-4 flex flex-col gap-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
                <PieChart className="w-3 h-3" /> 시장 분위기
              </span>
              <span className={cn(
                "text-sm font-semibold",
                sentiment === "positive" ? "text-blue-400" : sentiment === "negative" ? "text-rose-400" : "text-amber-400"
              )}>
                {sentiment === "positive" ? "위험 선호" : sentiment === "negative" ? "위험 회피" : "눈치 보기"}
              </span>
            </div>
            <div className="p-4 flex flex-col gap-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
                <LineChart className="w-3 h-3" /> 권장 대응
              </span>
              <span className="text-sm font-semibold text-slate-200">
                {sentiment === "positive" ? "비중 확대" : sentiment === "negative" ? "단계적 관망" : "트레이딩 접근"}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 3. Detailed Analysis Text (Optional, if there's more content) */}
      {details && (
        <div className="bg-[#12141A] rounded-xl border border-blue-500/10 p-5 flex items-start gap-3">
          <Info className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
          <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
            {details}
          </div>
        </div>
      )}
    </div>
  );
};"""

if old_analysis_block in content:
    content = content.replace(old_analysis_block, new_analysis_block)
else:
    print("Could not find old_analysis_block, might have been modified.")

with open(filepath, "w") as f:
    f.write(content)
