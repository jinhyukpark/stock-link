import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function TrendWordCloud() {
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);

  const words = [
    { text: "AI Semiconductors", value: 95, type: "up" },
    { text: "Low PBR", value: 88, type: "up" },
    { text: "Secondary Batteries", value: 82, type: "down" },
    { text: "Medical AI", value: 76, type: "up" },
    { text: "Crypto ETFs", value: 70, type: "up" },
    { text: "Hyperclova X", value: 65, type: "neutral" },
    { text: "Robotics", value: 60, type: "up" },
    { text: "EV Slowdown", value: 55, type: "down" },
    { text: "Superconductors", value: 45, type: "down" },
    { text: "Apple Vision Pro", value: 40, type: "neutral" },
    { text: "Platform Act", value: 35, type: "neutral" },
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
      <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 flex flex-col">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Market Trends & Keywords</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-center gap-4 h-full content-center p-4">
            {words.map((word, i) => {
              const size = Math.max(0.8, word.value / 40);
              const color = word.type === 'up' 
                ? 'text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.3)]' 
                : word.type === 'down' 
                  ? 'text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.3)]' 
                  : 'text-gray-400';
              
              return (
                <span 
                  key={i}
                  style={{ fontSize: `${size}rem` }}
                  className={`font-display font-bold cursor-pointer hover:scale-110 transition-transform duration-200 ${color}`}
                  onClick={() => setSelectedKeyword(word.text)}
                >
                  {word.text}
                </span>
              );
            })}
          </div>
          <div className="absolute bottom-2 right-2">
              <Badge variant="outline" className="bg-background/50 backdrop-blur text-[10px] text-muted-foreground">
                  Updated: 14:30 KST
              </Badge>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedKeyword} onOpenChange={(open) => !open && setSelectedKeyword(null)}>
        <DialogContent className="sm:max-w-[700px] bg-[#151921] border-white/10 text-white p-0 gap-0 overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 pb-4">
            <div className="flex items-center gap-2">
              <DialogTitle className="text-xl font-bold text-white m-0 p-0">
                전체 <span className="text-gray-400 font-normal text-sm ml-1">(1건)</span>
              </DialogTitle>
            </div>
            <Button variant="outline" className="h-8 px-4 border-white/10 bg-transparent hover:bg-white/5 text-xs text-gray-300 rounded-full">
              전체보기
            </Button>
          </div>

          {/* Related Keywords Filters */}
          <div className="px-6 pb-4 flex items-center gap-2">
            <Badge variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-transparent cursor-pointer rounded-full px-3 py-1 font-medium">전체</Badge>
            <Badge variant="outline" className="bg-transparent text-gray-400 border-white/10 hover:bg-white/5 cursor-pointer rounded-full px-3 py-1 font-medium">AI전력수요</Badge>
            <Badge variant="outline" className="bg-transparent text-gray-400 border-white/10 hover:bg-white/5 cursor-pointer rounded-full px-3 py-1 font-medium">전력기기수요확대</Badge>
            <Badge variant="outline" className="bg-transparent text-gray-400 border-white/10 hover:bg-white/5 cursor-pointer rounded-full px-3 py-1 font-medium">전력인프라투자</Badge>
          </div>

          {/* Scrollable News List Area */}
          <div className="px-6 pb-6 max-h-[500px] overflow-y-auto">
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
            
            {/* Added details button area (disabled as requested) */}
            <div className="mt-6 flex justify-end">
              <Button disabled className="bg-white/5 text-white/50 border border-white/10 cursor-not-allowed px-6">
                자세히 보기
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}