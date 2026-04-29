import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, ChevronRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion } from "framer-motion";

export default function TrendAnalysisWidget() {
  const [selectedTrend, setSelectedTrend] = useState("AI Semiconductors");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const words = [
    { text: "AI Semiconductors", value: 98, type: "up" },
    { text: "Low PBR", value: 92, type: "up" },
    { text: "Secondary Batteries", value: 85, type: "down" },
    { text: "Medical AI", value: 78, type: "up" },
    { text: "Crypto ETFs", value: 72, type: "up" },
    { text: "Hyperclova X", value: 68, type: "neutral" },
    { text: "Robotics", value: 65, type: "up" },
    { text: "EV Slowdown", value: 60, type: "down" },
    { text: "Superconductors", value: 55, type: "down" },
    { text: "Apple Vision Pro", value: 50, type: "neutral" },
    { text: "Platform Act", value: 45, type: "neutral" },
    { text: "On-Device AI", value: 42, type: "up" },
    { text: "6G Network", value: 38, type: "up" },
    { text: "Space X", value: 35, type: "neutral" },
    { text: "Quantum Computing", value: 32, type: "up" },
    { text: "HBM3E", value: 88, type: "up" },
    { text: "Neuromorphic", value: 28, type: "neutral" },
    { text: "Solid-state Battery", value: 48, type: "up" },
    { text: "Digital Healthcare", value: 36, type: "up" },
    { text: "Web 3.0", value: 25, type: "down" },
    { text: "ESG", value: 30, type: "neutral" },
    { text: "Metaverse", value: 22, type: "down" },
    { text: "Autonomous Driving", value: 58, type: "up" },
    { text: "Generative AI", value: 90, type: "up" },
    { text: "Cybersecurity", value: 40, type: "up" },
  ];

  const stocks = [
    { rank: 1, name: "SK Hynix", price: "140,000", change: "+6.84%", volume: "2.4T", trend: "up" },
    { rank: 2, name: "Hanmi Semi", price: "72,500", change: "+12.4%", volume: "450B", trend: "up" },
    { rank: 3, name: "Samsung Elec", price: "78,200", change: "+2.14%", volume: "1.2T", trend: "up" },
    { rank: 4, name: "Isc", price: "34,200", change: "-1.20%", volume: "89B", trend: "down" },
    { rank: 5, name: "HPSP", price: "45,600", change: "+3.40%", volume: "120B", trend: "up" },
  ];

  // Mock news articles for the selected keyword
  const mockNews = [
    {
      id: 1,
      sentiment: "긍정",
      sentimentColor: "bg-green-500",
      relatedKeywords: ["AI전력수요", "+2"],
      title: "AI 수요 등에 업고 전력 질주하는 전력주",
      source: "조선일보",
      time: "약 2시간 전",
      date: "2026.04.29"
    },
    {
      id: 2,
      sentiment: "긍정",
      sentimentColor: "bg-green-500",
      relatedKeywords: ["AI전력수요", "전력기기"],
      title: "슈퍼사이클 진입한 전력기기, 하반기 실적도 맑음",
      source: "한국경제",
      time: "약 3시간 전",
      date: "2026.04.29"
    },
    {
      id: 3,
      sentiment: "중립",
      sentimentColor: "bg-gray-500",
      relatedKeywords: ["인프라투자"],
      title: "글로벌 빅테크들, AI 데이터센터 구축에 수십조 쏟아붓는다",
      source: "매일경제",
      time: "약 5시간 전",
      date: "2026.04.29"
    },
    {
      id: 4,
      sentiment: "긍정",
      sentimentColor: "bg-green-500",
      relatedKeywords: ["AI전력수요", "슈퍼사이클"],
      title: "끝모를 전력기기 호황... 수주 잔고 역대 최고치 경신",
      source: "파이낸셜뉴스",
      time: "약 8시간 전",
      date: "2026.04.29"
    }
  ];

  return (
    <>
      <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 flex flex-col overflow-hidden">
      {/* Top Panel: Trend Word Cloud */}
      <div className="flex-1 flex flex-col h-full">
        <CardHeader className="py-2 px-4 shrink-0">
          <CardTitle className="text-sm font-semibold">Market Trends & Keywords</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 relative overflow-hidden bg-gradient-to-br from-transparent to-black/20 p-2 flex flex-col">
          <div className="flex justify-center mb-6 mt-4 z-10">
              {/* Legend - Top Center */}
              <div className="flex items-center gap-2 px-2 py-1 bg-background/40 backdrop-blur rounded-md border border-white/5 shadow-sm">
                  <span className="text-[10px] text-muted-foreground font-medium">Sentiment</span>
                  <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-red-400">Negative</span>
                      <div className="w-16 h-1.5 rounded-full bg-gradient-to-r from-red-500 via-gray-500 to-green-500 opacity-80" />
                      <span className="text-[10px] font-bold text-green-400">Positive</span>
                  </div>
              </div>
          </div>
          <div className="flex-1 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 content-center p-2 pb-8 max-w-[85%] mx-auto">
            {words.map((word, i) => {
              // Enhanced size calculation for better visual hierarchy - Scaled down
              const size = Math.max(0.6, Math.min(1.8, word.value / 45));
              
              // Up = Green, Down = Red, Neutral = Gray
              const color = word.type === 'up' 
                ? 'text-green-400 drop-shadow-[0_0_12px_rgba(74,222,128,0.4)]' 
                : word.type === 'down' 
                  ? 'text-red-400 drop-shadow-[0_0_12px_rgba(248,113,113,0.4)]' 
                  : 'text-gray-400 drop-shadow-[0_0_8px_rgba(156,163,175,0.2)]';
              
              const isSelected = selectedTrend === word.text;
              const opacity = Math.max(0.4, word.value / 120);
              
              return (
                <motion.span 
                  key={i}
                  initial={{ opacity: 0, scale: 0.5, y: 10 }}
                  animate={{ opacity: isSelected ? 1 : opacity, scale: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: i * 0.03,
                    type: "spring",
                    stiffness: 100 
                  }}
                  onClick={() => {
                    setSelectedTrend(word.text);
                    setTimeout(() => setIsPopupOpen(true), 0);
                  }}
                  style={{ 
                      fontSize: `${size}rem`,
                  }}
                  className={cn(
                    `font-display font-bold cursor-pointer transition-all duration-300 ${color} leading-none relative z-[100] pointer-events-auto`,
                    isSelected ? "scale-110 underline decoration-2 underline-offset-4" : "hover:scale-110 hover:opacity-100"
                  )}
                >
                  {word.text}
                </motion.span>
              );
            })}
          </div>
          <div className="absolute bottom-2 right-2">
              <Badge variant="outline" className="bg-background/50 backdrop-blur text-[10px] text-muted-foreground">
                  Updated: 14:30 KST
              </Badge>
          </div>
        </CardContent>
      </div>
    </Card>

    <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
      <DialogContent className="sm:max-w-[700px] bg-[#151921] border-white/10 text-white p-0 gap-0 overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4">
          <div className="flex items-center gap-2">
            <DialogTitle className="text-xl font-bold text-white m-0 p-0">
              {selectedTrend} <span className="text-gray-400 font-normal text-sm ml-1">(4건)</span>
            </DialogTitle>
          </div>
        </div>

        {/* Scrollable News List Area */}
        <div className="px-6 max-h-[400px] overflow-y-auto">
          <div className="space-y-4">
            {mockNews.map((news) => (
              <div key={news.id} className="border border-white/10 rounded-xl bg-[#1e2330]/50 p-5 group hover:border-white/20 transition-colors">
                {/* Labels */}
                <div className="flex items-center gap-2 mb-4">
                  <Badge className={`${news.sentimentColor} hover:${news.sentimentColor} text-white border-transparent rounded-full px-3 py-0.5 text-xs font-bold`}>
                    {news.sentiment}
                  </Badge>
                  <div className="flex items-center gap-2 text-xs font-bold">
                    {news.relatedKeywords.map((kw, idx) => (
                      <span key={idx} className={idx === 0 ? "text-gray-300" : "text-white"}>{kw}</span>
                    ))}
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-6 group-hover:text-[#7EE7D2] transition-colors cursor-pointer">
                  {news.title}
                </h3>
                
                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-gray-400 font-medium">
                  <span>{news.source}</span>
                  <span>{news.time} · {news.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Added details button area (disabled as requested) */}
        <div className="p-6 flex justify-center bg-[#151921]">
          <Button disabled className="bg-white/5 text-white/50 border border-white/10 cursor-not-allowed px-8 py-2 h-auto rounded-full font-medium">
            자세히 보기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
}