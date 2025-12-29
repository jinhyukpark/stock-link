import { Sparkles, Lock, TrendingUp, TrendingDown, Crown, Check, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function MarketStatus() {
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [modalType, setModalType] = useState<"strong" | "weak">("strong");
  const isPremium = false; // Mock user status

  const handleCardClick = (type: "strong" | "weak") => {
    if (!isPremium) {
      setModalType(type);
      setShowPremiumModal(true);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Advancing Stocks */}
        <div 
          onClick={() => handleCardClick("strong")}
          className="relative flex items-center justify-between p-4 rounded-xl animate-flash-red transition-all cursor-pointer group border border-red-500/30 bg-card/30 hover:bg-red-500/5 overflow-hidden"
        >
          {/* Lock Overlay for non-premium */}
          {!isPremium && (
            <div className="absolute top-2 right-2 z-10 opacity-50 group-hover:opacity-100 transition-opacity">
               <Lock className="w-3 h-3 text-muted-foreground" />
            </div>
          )}

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
        <div 
          onClick={() => handleCardClick("weak")}
          className="relative flex items-center justify-between p-4 rounded-xl animate-flash-blue transition-all cursor-pointer group border border-blue-500/30 bg-card/30 hover:bg-blue-500/5 overflow-hidden"
        >
          {/* Lock Overlay for non-premium */}
          {!isPremium && (
            <div className="absolute top-2 right-2 z-10 opacity-50 group-hover:opacity-100 transition-opacity">
               <Lock className="w-3 h-3 text-muted-foreground" />
            </div>
          )}

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

      {/* Premium Required Dialog */}
      <Dialog open={showPremiumModal} onOpenChange={setShowPremiumModal}>
        <DialogContent className="bg-[#0B0E14] border-border/50 max-w-md p-0 overflow-hidden">
           <div className="relative h-32 bg-gradient-to-br from-indigo-900/50 via-purple-900/50 to-background flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop')] opacity-10 bg-cover bg-center" />
              <div className="relative z-10 flex flex-col items-center gap-2">
                 <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                    <Crown className="w-6 h-6 text-white fill-white" />
                 </div>
                 <h2 className="text-lg font-bold text-white tracking-tight">Premium Insight</h2>
              </div>
           </div>
           
           <div className="p-6 space-y-6">
              <div className="space-y-2 text-center">
                 <h3 className="text-xl font-bold text-foreground">
                    Unlock Market Momentum Analysis
                 </h3>
                 <p className="text-sm text-muted-foreground leading-relaxed">
                    {modalType === 'strong' 
                       ? "Detailed analysis of stocks leading the market rally. Identify breakout patterns and institutional accumulation zones."
                       : "Deep dive into sector weakness and potential reversal points. Spot oversold opportunities before the market turns."
                    }
                 </p>
              </div>

              <div className="space-y-3 bg-secondary/20 p-4 rounded-lg border border-border/50">
                 <div className="flex items-start gap-3">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                       <Check className="w-3 h-3 text-green-500" />
                    </div>
                    <div className="text-sm">
                       <span className="font-semibold text-foreground">Real-time Volume Analysis</span>
                       <p className="text-xs text-muted-foreground">Track institutional money flow instantly</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-3">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                       <Check className="w-3 h-3 text-green-500" />
                    </div>
                    <div className="text-sm">
                       <span className="font-semibold text-foreground">AI Pattern Recognition</span>
                       <p className="text-xs text-muted-foreground">Auto-detect flags, wedges, and reversal patterns</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-3">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                       <Check className="w-3 h-3 text-green-500" />
                    </div>
                    <div className="text-sm">
                       <span className="font-semibold text-foreground">Dark Pool Data</span>
                       <p className="text-xs text-muted-foreground">See hidden block trades and liquidity zones</p>
                    </div>
                 </div>
              </div>

              <div className="pt-2">
                 <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold h-12 shadow-lg shadow-indigo-500/25 group">
                    Upgrade to Premium
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                 </Button>
                 <p className="text-[10px] text-center text-muted-foreground mt-3">
                    Start your 14-day free trial today. Cancel anytime.
                 </p>
              </div>
           </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
