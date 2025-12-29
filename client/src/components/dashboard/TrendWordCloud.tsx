import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function TrendWordCloud() {
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

  return (
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
  );
}