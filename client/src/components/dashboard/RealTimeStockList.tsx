import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, ChevronRight, Info, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const stockData = [
  { rank: 1, name: "SK Hynix", code: "000660", price: "164,000", change: "+6.84%", volume: "2.6T", isFavorite: true, icon: "SK", aiScore: 9.2 },
  { rank: 2, name: "Samsung Elec", code: "005930", price: "72,500", change: "+2.14%", volume: "1.2T", isFavorite: true, icon: "S", aiScore: 8.5 },
  { rank: 3, name: "Wonik Holdings", code: "030530", price: "4,750", change: "+19.08%", volume: "89B", isFavorite: true, icon: "W", aiScore: 9.8 },
  { rank: 4, name: "KODEX Leverage", code: "122630", price: "17,540", change: "+5.4%", volume: "767B", isFavorite: false, icon: "K", aiScore: 7.4 },
  { rank: 5, name: "Hyulim Robot", code: "090710", price: "2,980", change: "+28.71%", volume: "743B", isFavorite: true, icon: "H", aiScore: 9.5 },
  { rank: 6, name: "KODEX 200", code: "069500", price: "34,720", change: "+2.72%", volume: "695B", isFavorite: false, icon: "K", aiScore: 6.8 },
  { rank: 7, name: "Samsung C&T", code: "028260", price: "139,000", change: "+8.68%", volume: "531B", isFavorite: false, icon: "S", aiScore: 8.1 },
  { rank: 8, name: "POSCO Holdings", code: "005490", price: "398,500", change: "-0.88%", volume: "320B", isFavorite: true, icon: "P", aiScore: 4.2 },
  { rank: 9, name: "NAVER", code: "035420", price: "185,400", change: "+1.2%", volume: "245B", isFavorite: false, icon: "N", aiScore: 6.5 },
  { rank: 10, name: "Kakao", code: "035720", price: "48,900", change: "-2.1%", volume: "180B", isFavorite: true, icon: "K", aiScore: 3.8 },
  { rank: 11, name: "LG Energy", code: "373220", price: "382,000", change: "-1.2%", volume: "150B", isFavorite: false, icon: "L", aiScore: 5.1 },
  { rank: 12, name: "Hyundai Motor", code: "005380", price: "245,000", change: "+3.4%", volume: "420B", isFavorite: false, icon: "H", aiScore: 7.9 },
  { rank: 13, name: "Kia Corp", code: "000270", price: "124,500", change: "+2.8%", volume: "310B", isFavorite: false, icon: "K", aiScore: 7.6 },
];

export default function RealTimeStockList() {
  return (
    <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 flex flex-col">
      <CardHeader className="pb-2 space-y-4">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-2">
             <CardTitle className="text-base font-semibold">Real-time Chart</CardTitle>
             <span className="text-xs text-muted-foreground">Today 20:51 Standard</span>
           </div>
           <div className="flex items-center gap-2">
             <div className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                <div className="w-3 h-3 rounded-full border border-current" />
                Hide Risky Stocks
             </div>
           </div>
        </div>
        
        <div className="flex flex-col gap-4">
           {/* Main Tabs */}
           <div className="flex items-center gap-6 border-b border-border/50 pb-1">
              <button className="text-sm font-bold text-primary border-b-2 border-primary pb-3 -mb-1.5">Trading Value</button>
              <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors pb-3">Rapid Rising</button>
              <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors pb-3">Rapid Falling</button>
           </div>
           
           {/* Time Period Tabs */}
           <div className="flex gap-2">
              {['Real-time', '1 Day', '1 Week', '1 Month', '3 Months', '6 Months', '1 Year'].map((period, i) => (
                 <button 
                    key={i} 
                    className={cn(
                       "px-3 py-1 rounded-full text-xs font-medium transition-colors",
                       i === 0 ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    )}
                 >
                    {period}
                 </button>
              ))}
           </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 flex-1 overflow-auto">
         <div className="w-full text-sm">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-2 text-xs text-muted-foreground border-b border-border/50 sticky top-0 bg-[#0B0E14]/95 backdrop-blur z-10">
               <div className="col-span-5 md:col-span-4">Stock</div>
               <div className="col-span-2 md:col-span-2 text-right">Price</div>
               <div className="col-span-2 md:col-span-2 text-right">Change</div>
               <div className="hidden md:block col-span-2 text-right">Volume</div>
               <div className="col-span-3 md:col-span-2 text-right">AI Score</div>
            </div>
            
            {/* Table Body */}
            <div className="flex flex-col">
               {stockData.map((stock) => (
                  <div key={stock.rank} className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-border/30 hover:bg-white/5 transition-colors items-center group cursor-pointer">
                     {/* Stock Name Column */}
                     <div className="col-span-5 md:col-span-4 flex items-center gap-3">
                        <div className="flex items-center gap-2 min-w-[32px]">
                           <Star className={cn("w-3.5 h-3.5 cursor-pointer transition-colors", stock.isFavorite ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground/50 hover:text-muted-foreground")} />
                           <span className="font-bold text-muted-foreground w-4">{stock.rank}</span>
                        </div>
                        <Avatar className="h-8 w-8 hidden sm:block">
                           <AvatarFallback className="text-[10px] font-bold bg-primary/20 text-primary">{stock.icon}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                           <span className="font-bold text-sm group-hover:text-primary transition-colors truncate">{stock.name}</span>
                           <span className="text-[10px] text-muted-foreground hidden sm:block">{stock.code}</span>
                        </div>
                     </div>
                     
                     {/* Price Column */}
                     <div className="col-span-2 md:col-span-2 text-right font-mono font-medium">
                        {stock.price}
                     </div>
                     
                     {/* Change Column */}
                     <div className="col-span-2 md:col-span-2 text-right">
                        <span className={cn(
                           "font-mono font-medium",
                           stock.change.startsWith('+') ? "text-red-400" : "text-blue-400"
                        )}>
                           {stock.change}
                        </span>
                     </div>
                     
                     {/* Volume Column */}
                     <div className="hidden md:block col-span-2 text-right text-muted-foreground text-xs font-mono">
                        {stock.volume}
                     </div>

                     {/* AI Score Column */}
                     <div className="col-span-3 md:col-span-2 flex items-center justify-end">
                        <div className={cn(
                           "flex items-center justify-between gap-3 py-1 px-2.5 rounded-lg border w-full max-w-[110px] backdrop-blur-sm transition-all",
                           stock.aiScore >= 9.0 ? "bg-blue-500/10 border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.1)]" :
                           stock.aiScore >= 7.0 ? "bg-primary/10 border-primary/20" :
                           stock.aiScore >= 5.0 ? "bg-yellow-500/5 border-yellow-500/10" :
                           "bg-muted/10 border-white/5"
                        )}>
                           <div className="h-1.5 flex-1 bg-black/40 rounded-full overflow-hidden hidden sm:block max-w-[40px]">
                              <div 
                                 className={cn("h-full rounded-full", 
                                    stock.aiScore >= 9.0 ? "bg-blue-400" :
                                    stock.aiScore >= 7.0 ? "bg-primary" : 
                                    stock.aiScore >= 5.0 ? "bg-yellow-500" : "bg-muted-foreground"
                                 )} 
                                 style={{ width: `${(stock.aiScore / 10) * 100}%` }}
                              />
                           </div>
                           <span className={cn(
                              "font-mono font-bold text-sm ml-auto",
                              stock.aiScore >= 9.0 ? "text-blue-400" :
                              stock.aiScore >= 7.0 ? "text-primary" : 
                              stock.aiScore >= 5.0 ? "text-yellow-500" : "text-muted-foreground"
                           )}>
                              {stock.aiScore}
                           </span>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
            
            <div className="p-4 flex justify-center">
               <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground w-full">
                  View More <ChevronRight className="w-3 h-3 ml-1" />
               </Button>
            </div>
         </div>
      </CardContent>
    </Card>
  );
}