import { Sparkles } from "lucide-react";

export default function MarketStatus() {
  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
      {/* Advancing Stocks */}
      <div className="flex items-center justify-between p-4 rounded-xl animate-flash-red transition-all cursor-pointer group border border-red-500/30 bg-card/30 hover:bg-red-500/5">
        <div className="flex flex-col gap-1">
            <span className="text-sm text-red-400 font-bold group-hover:text-red-300 flex items-center gap-2">
               <Sparkles className="w-4 h-4 text-red-400 animate-pulse fill-red-400/20" />
               Market Strong
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-black text-white font-display tracking-tight">1,248</span>
              <span className="text-xs text-red-400/80 font-medium">Stocks</span>
            </div>
        </div>
        <div className="flex flex-col items-end justify-center bg-red-500/10 px-3 py-2 rounded-lg border border-red-500/20">
            <span className="text-[10px] text-red-300/80 uppercase tracking-wider font-semibold mb-0.5">Avg Change</span>
            <span className="text-xl font-black text-red-400 font-mono">+4.2%</span>
        </div>
      </div>

      {/* Declining Stocks */}
      <div className="flex items-center justify-between p-4 rounded-xl animate-flash-blue transition-all cursor-pointer group border border-blue-500/30 bg-card/30 hover:bg-blue-500/5">
        <div className="flex flex-col gap-1">
            <span className="text-sm text-blue-400 font-bold group-hover:text-blue-300 flex items-center gap-2">
               <Sparkles className="w-4 h-4 text-blue-400 animate-pulse fill-blue-400/20" />
               Market Weak
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-black text-white font-display tracking-tight">892</span>
              <span className="text-xs text-blue-400/80 font-medium">Stocks</span>
            </div>
        </div>
        <div className="flex flex-col items-end justify-center bg-blue-500/10 px-3 py-2 rounded-lg border border-blue-500/20">
            <span className="text-[10px] text-blue-300/80 uppercase tracking-wider font-semibold mb-0.5">Avg Change</span>
            <span className="text-xl font-black text-blue-400 font-mono">-2.1%</span>
        </div>
      </div>
    </div>
  );
}
