import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, ChevronRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function TrendAnalysisWidget() {
  const [selectedTrend, setSelectedTrend] = useState("AI Semiconductors");

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

  return (
    <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 flex flex-col overflow-hidden">
      {/* Top Panel: Trend Word Cloud */}
      <div className="flex-1 flex flex-col h-full">
        <CardHeader className="py-2 px-4 shrink-0">
          <CardTitle className="text-sm font-semibold">Market Trends & Keywords</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 relative overflow-hidden bg-gradient-to-br from-transparent to-black/20 p-2">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 h-full content-center p-2">
            {words.map((word, i) => {
              // Enhanced size calculation for better visual hierarchy - Scaled down
              const size = Math.max(0.6, Math.min(1.8, word.value / 45));
              
              const color = word.type === 'up' 
                ? 'text-red-400 drop-shadow-[0_0_12px_rgba(248,113,113,0.4)]' 
                : word.type === 'down' 
                  ? 'text-blue-400 drop-shadow-[0_0_12px_rgba(96,165,250,0.4)]' 
                  : 'text-gray-400 drop-shadow-[0_0_8px_rgba(156,163,175,0.2)]';
              
              const isSelected = selectedTrend === word.text;
              const opacity = Math.max(0.4, word.value / 120);
              
              return (
                <span 
                  key={i}
                  onClick={() => setSelectedTrend(word.text)}
                  style={{ 
                      fontSize: `${size}rem`,
                      opacity: isSelected ? 1 : opacity
                  }}
                  className={cn(
                    `font-display font-bold cursor-pointer transition-all duration-300 ${color} leading-none`,
                    isSelected ? "scale-110 underline decoration-2 underline-offset-4 z-10" : "hover:scale-110 hover:opacity-100 hover:z-10"
                  )}
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
      </div>
    </Card>
  );
}