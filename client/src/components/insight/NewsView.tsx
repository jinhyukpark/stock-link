import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  ExternalLink, 
  Clock, 
  ChevronRight,
  Filter,
  RefreshCw,
  Newspaper
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Mock Data ---

const keywords = [
  { text: "AI Semiconductors", value: 95, sentiment: "positive", color: "text-green-400", size: "text-5xl" },
  { text: "Low PBR", value: 85, sentiment: "positive", color: "text-green-500", size: "text-4xl" },
  { text: "Secondary Batteries", value: 80, sentiment: "negative", color: "text-red-400", size: "text-4xl" },
  { text: "Medical AI", value: 75, sentiment: "positive", color: "text-green-500", size: "text-3xl" },
  { text: "Crypto ETFs", value: 70, sentiment: "positive", color: "text-green-600", size: "text-3xl" },
  { text: "Hyperclova X", value: 65, sentiment: "neutral", color: "text-gray-400", size: "text-2xl" },
  { text: "Robotics", value: 65, sentiment: "positive", color: "text-green-500", size: "text-2xl" },
  { text: "EV Slowdown", value: 60, sentiment: "negative", color: "text-red-500", size: "text-2xl" },
  { text: "Superconductors", value: 55, sentiment: "negative", color: "text-red-400", size: "text-2xl" },
  { text: "Apple Vision Pro", value: 50, sentiment: "neutral", color: "text-gray-500", size: "text-xl" },
  { text: "Platform Act", value: 45, sentiment: "negative", color: "text-red-500", size: "text-lg" },
  { text: "On-Device AI", value: 60, sentiment: "positive", color: "text-green-400", size: "text-lg" },
  { text: "6G Network", value: 40, sentiment: "positive", color: "text-green-600", size: "text-lg" },
  { text: "Space X", value: 35, sentiment: "neutral", color: "text-gray-400", size: "text-sm" },
  { text: "Quantum Computing", value: 45, sentiment: "positive", color: "text-green-500", size: "text-sm" },
  { text: "HBM3E", value: 88, sentiment: "positive", color: "text-green-400", size: "text-3xl" },
  { text: "Neuromorphic", value: 30, sentiment: "neutral", color: "text-gray-500", size: "text-xs" },
  { text: "Solid-state Battery", value: 55, sentiment: "positive", color: "text-green-500", size: "text-xl" },
  { text: "Digital Healthcare", value: 40, sentiment: "positive", color: "text-green-600", size: "text-sm" },
  { text: "Web 3.0", value: 25, sentiment: "negative", color: "text-red-500", size: "text-xs" },
  { text: "ESG", value: 30, sentiment: "neutral", color: "text-gray-400", size: "text-xs" },
  { text: "Metaverse", value: 35, sentiment: "negative", color: "text-red-400", size: "text-xs" },
  { text: "Autonomous Driving", value: 65, sentiment: "positive", color: "text-green-500", size: "text-2xl" },
  { text: "Generative AI", value: 90, sentiment: "positive", color: "text-green-400", size: "text-4xl" },
  { text: "Cybersecurity", value: 50, sentiment: "positive", color: "text-green-600", size: "text-lg" },
];

// Randomize positions slightly to make it look like a cloud
// In a real app, use a word cloud library. Here we simulate the layout with flex wrap and justification.
// Or a grid. Let's try a centered flex layout that naturally wraps.

const newsItems = [
  {
    id: 1,
    title: "Samsung Electronics Unveils New HBM3E Chip for AI Accelerators",
    summary: "Samsung Electronics has announced the mass production of its latest 12-stack HBM3E memory chips, targeting the booming AI semiconductor market led by NVIDIA and AMD.",
    source: "TechDaily",
    time: "10 mins ago",
    sentiment: "positive",
    stocks: [
      { name: "Samsung Elec", code: "005930", change: "+2.5%" },
      { name: "SK Hynix", code: "000660", change: "+1.8%" }
    ]
  },
  {
    id: 2,
    title: "Government Announces New Incentives for Low PBR Stocks",
    summary: "The Financial Services Commission (FSC) revealed a 'Corporate Value-up Program' to boost undervalued stocks with low Price-to-Book ratios, encouraging shareholder returns.",
    source: "MarketWatch",
    time: "35 mins ago",
    sentiment: "positive",
    stocks: [
      { name: "Hyundai Motor", code: "005380", change: "+4.2%" },
      { name: "KB Financial", code: "105560", change: "+3.1%" },
      { name: "Kia", code: "000270", change: "+3.8%" }
    ]
  },
  {
    id: 3,
    title: "EV Demand Slowdown Concerns Impact Battery Makers",
    summary: "Major battery manufacturers saw their shares dip as global EV sales growth is projected to slow down in the coming quarter due to high interest rates and subsidy cuts.",
    source: "Global Auto",
    time: "1 hour ago",
    sentiment: "negative",
    stocks: [
      { name: "LG Energy Sol", code: "373220", change: "-2.1%" },
      { name: "Samsung SDI", code: "006400", change: "-1.5%" },
      { name: "EcoPro BM", code: "247540", change: "-3.4%" }
    ]
  },
  {
    id: 4,
    title: "Naver's Hyperclova X Expands into B2B Market",
    summary: "Naver Cloud is accelerating the adoption of its Hyperclova X large language model across various industries including finance, education, and legal services.",
    source: "AI Times",
    time: "2 hours ago",
    sentiment: "positive",
    stocks: [
      { name: "NAVER", code: "035420", change: "+1.2%" },
      { name: "Polaris Office", code: "041020", change: "+5.6%" }
    ]
  },
  {
    id: 5,
    title: "Robotics Sector Rallies on New Humanoid Prototypes",
    summary: "Leading robotics companies demonstrated advanced humanoid prototypes capable of performing complex household tasks, sparking investor interest in the sector.",
    source: "FutureTech",
    time: "3 hours ago",
    sentiment: "positive",
    stocks: [
      { name: "Doosan Robotics", code: "454910", change: "+6.7%" },
      { name: "Rainbow Robotics", code: "277810", change: "+4.5%" }
    ]
  }
];

export default function NewsView() {
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* 1. Word Cloud Section */}
      <div className="bg-[#151921] border border-white/5 rounded-xl p-8 relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
        {/* Sentiment Bar */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/40 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm z-10">
            <span className="text-xs font-bold text-red-400">Sentiment Negative</span>
            <div className="w-32 h-1.5 bg-gray-700 rounded-full overflow-hidden flex">
                <div className="w-[30%] bg-gradient-to-r from-red-500 to-red-400 h-full" />
                <div className="flex-1 bg-gray-800 h-full" />
                <div className="w-[50%] bg-gradient-to-l from-green-500 to-green-400 h-full" />
            </div>
            <span className="text-xs font-bold text-green-400">Positive</span>
        </div>

        {/* Updated Timestamp */}
        <div className="absolute bottom-4 right-6">
            <Badge variant="outline" className="bg-black/40 border-white/10 text-gray-400 font-mono text-xs">
                Updated: 14:30 KST
            </Badge>
        </div>

        {/* Word Cloud Visual */}
        <div className="w-full max-w-4xl flex flex-wrap justify-center items-center gap-x-6 gap-y-3 py-10">
            {keywords.map((word, idx) => (
                <button
                    key={idx}
                    onClick={() => setSelectedKeyword(word.text)}
                    className={cn(
                        "font-bold transition-all duration-300 hover:scale-110 cursor-pointer font-display leading-tight",
                        word.color,
                        word.size,
                        selectedKeyword === word.text && "scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                    )}
                    style={{
                        textShadow: word.sentiment === 'positive' 
                            ? '0 0 20px rgba(74, 222, 128, 0.1)' 
                            : word.sentiment === 'negative' 
                                ? '0 0 20px rgba(248, 113, 113, 0.1)' 
                                : 'none'
                    }}
                >
                    {word.text}
                </button>
            ))}
        </div>
      </div>

      {/* 2. News List Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: News Feed */}
          <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Newspaper className="w-5 h-5 text-primary" />
                      Key Headlines
                  </h3>
                  <div className="flex gap-2">
                      <Input placeholder="Search keywords..." className="h-8 w-48 bg-[#151921] border-white/10 text-xs" />
                      <Button size="icon" variant="outline" className="h-8 w-8 bg-[#151921] border-white/10">
                          <Filter className="w-3.5 h-3.5" />
                      </Button>
                  </div>
              </div>

              <div className="space-y-3">
                  {newsItems.map((news) => (
                      <div key={news.id} className="bg-[#151921] border border-white/5 rounded-lg p-5 hover:border-white/10 transition-colors group">
                          <div className="flex justify-between items-start mb-2">
                              <Badge variant="secondary" className={cn(
                                  "text-[10px] uppercase tracking-wider font-bold mb-2",
                                  news.sentiment === 'positive' ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                              )}>
                                  {news.sentiment} Impact
                              </Badge>
                              <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {news.time}
                              </span>
                          </div>
                          
                          <h4 className="text-base font-bold text-gray-100 mb-2 group-hover:text-primary transition-colors cursor-pointer">
                              {news.title}
                          </h4>
                          <p className="text-sm text-gray-400 mb-4 leading-relaxed line-clamp-2">
                              {news.summary}
                          </p>

                          <div className="flex items-center justify-between pt-3 border-t border-white/5">
                              <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-gray-500">{news.source}</span>
                              </div>
                              <div className="flex gap-2">
                                  {news.stocks.map((stock, idx) => (
                                      <div key={idx} className="flex items-center gap-1.5 bg-black/30 px-2 py-1 rounded text-xs border border-white/5">
                                          <span className="text-gray-300 font-medium">{stock.name}</span>
                                          <span className={cn(
                                              "font-bold",
                                              stock.change.startsWith('+') ? "text-red-400" : "text-blue-400"
                                          )}>
                                              {stock.change}
                                          </span>
                                      </div>
                                  ))}
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          {/* Right: Related Stocks Ranking */}
          <div className="lg:col-span-1">
             <div className="bg-[#151921] border border-white/5 rounded-xl p-5 sticky top-6">
                 <div className="flex items-center justify-between mb-4">
                     <h3 className="font-bold text-white flex items-center gap-2">
                         <TrendingUp className="w-4 h-4 text-red-400" />
                         Trending Stocks
                     </h3>
                     <Button size="icon" variant="ghost" className="h-6 w-6 rounded-full">
                         <RefreshCw className="w-3.5 h-3.5 text-gray-500" />
                     </Button>
                 </div>

                 <div className="space-y-1">
                     {newsItems.flatMap(n => n.stocks).slice(0, 8).map((stock, idx) => (
                         <div key={idx} className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg transition-colors cursor-pointer group">
                             <div className="flex items-center gap-3">
                                 <span className={cn(
                                     "text-xs font-mono font-bold w-4 text-center",
                                     idx < 3 ? "text-primary" : "text-gray-600"
                                 )}>
                                     {idx + 1}
                                 </span>
                                 <div>
                                     <div className="text-sm font-bold text-gray-200 group-hover:text-white">{stock.name}</div>
                                     <div className="text-[10px] text-gray-500 font-mono">{stock.code}</div>
                                 </div>
                             </div>
                             <div className={cn(
                                 "text-sm font-bold font-mono px-2 py-0.5 rounded",
                                 stock.change.startsWith('+') 
                                    ? "text-red-400 bg-red-400/10" 
                                    : "text-blue-400 bg-blue-400/10"
                             )}>
                                 {stock.change}
                             </div>
                         </div>
                     ))}
                 </div>
                 
                 <Button variant="outline" className="w-full mt-4 border-white/5 hover:bg-white/5 text-xs">
                     View All Rankings <ChevronRight className="w-3 h-3 ml-1" />
                 </Button>
             </div>
          </div>
      </div>
    </div>
  );
}
