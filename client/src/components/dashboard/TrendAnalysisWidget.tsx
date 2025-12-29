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
      <div className="flex-1 border-b border-border/50 flex flex-col min-h-[200px]">
        <CardHeader className="py-2 px-4">
          <CardTitle className="text-sm font-semibold">Market Trends & Keywords</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 relative overflow-hidden bg-gradient-to-br from-transparent to-black/20 p-4">
          <div className="flex flex-wrap items-center justify-center gap-2 h-full content-center">
            {words.map((word, i) => {
              // Calculate bubble size based on value
              const size = Math.max(3, Math.min(8, word.value / 12));
              
              const colorClass = word.type === 'up' 
                ? 'bg-red-500/20 text-red-400 border-red-500/30' 
                : word.type === 'down' 
                  ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' 
                  : 'bg-gray-500/20 text-gray-400 border-gray-500/30';
              
              const isSelected = selectedTrend === word.text;
              const opacity = Math.max(0.6, word.value / 100);
              
              return (
                <div 
                  key={i}
                  onClick={() => setSelectedTrend(word.text)}
                  style={{ 
                      width: `${size}rem`,
                      height: `${size}rem`,
                      opacity: isSelected ? 1 : opacity
                  }}
                  className={cn(
                    `rounded-full border flex items-center justify-center text-center cursor-pointer transition-all duration-300 p-1`,
                    colorClass,
                    isSelected ? "scale-110 shadow-[0_0_15px_rgba(255,255,255,0.2)] z-10 border-primary" : "hover:scale-105 hover:opacity-100 hover:z-10"
                  )}
                >
                  <span className="text-[0.65rem] font-bold leading-tight break-words px-1">
                    {word.text}
                  </span>
                </div>
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

      {/* Bottom Panel: Related Stocks */}
      <div className="flex-1 flex flex-col bg-secondary/10 min-h-[200px]">
        <CardHeader className="flex flex-row items-center justify-between pb-2 bg-secondary/20 border-b border-border/30">
          <div className="flex items-center gap-2">
             <div className="p-1.5 bg-primary/20 rounded-md">
                <Zap className="w-4 h-4 text-primary" />
             </div>
             <div>
               <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Related Stocks</p>
               <CardTitle className="text-base font-semibold text-primary">{selectedTrend}</CardTitle>
             </div>
          </div>
          <Button variant="ghost" size="sm" className="text-xs h-7 text-muted-foreground hover:text-white">
            View All <ChevronRight className="w-3 h-3 ml-1" />
          </Button>
        </CardHeader>
        <CardContent className="p-0 flex-1 overflow-auto">
          <Table>
            <TableHeader className="bg-transparent">
              <TableRow className="hover:bg-transparent border-border/50">
                <TableHead className="w-12 text-center text-xs">Rank</TableHead>
                <TableHead className="text-xs">Company</TableHead>
                <TableHead className="text-right text-xs">Price</TableHead>
                <TableHead className="text-right text-xs">Chg%</TableHead>
                <TableHead className="text-right text-xs hidden sm:table-cell">Vol</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stocks.map((stock) => (
                <TableRow key={stock.rank} className="border-border/40 hover:bg-white/5 transition-colors cursor-pointer group">
                  <TableCell className="text-center font-medium text-xs text-muted-foreground group-hover:text-primary transition-colors">
                    {stock.rank}
                  </TableCell>
                  <TableCell className="font-medium text-sm">
                      {stock.name}
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">{stock.price}</TableCell>
                  <TableCell className={cn(
                    "text-right font-mono text-sm font-bold flex items-center justify-end gap-1",
                    stock.trend === 'up' ? "text-red-400" : "text-blue-400"
                  )}>
                    {stock.change}
                  </TableCell>
                  <TableCell className="text-right text-xs text-muted-foreground hidden sm:table-cell">{stock.volume}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </div>
    </Card>
  );
}