import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Plug, Bot, Printer, Globe, Tractor, Factory, CircuitBoard, Pill, Rocket, Gamepad, Wind, Car } from "lucide-react";
import { cn } from "@/lib/utils";

const themes = [
  {
    rank: 1,
    name: "Power Grid",
    icon: Plug,
    color: "bg-cyan-500",
    change: "+6.11%",
    stats: "8 of 8 rising",
    stocks: [
      { name: "LS", change: "+9.41%" },
      { name: "Gaon Cable", change: "+9.11%" },
      { name: "Taihan", change: "+8.45%" },
    ]
  },
  {
    rank: 2,
    name: "Industrial Robots",
    icon: Bot,
    color: "bg-pink-500",
    change: "+6.11%",
    stats: "50 of 59 rising",
    stocks: [
      { name: "Keyang", change: "+30.00%" },
      { name: "Intops", change: "+29.97%" },
      { name: "Raon Tech", change: "+29.92%" },
    ]
  },
  {
    rank: 3,
    name: "3D Printers",
    icon: Printer,
    color: "bg-blue-500",
    change: "+5.64%",
    stats: "7 of 11 rising",
    stocks: [
      { name: "Hyulim", change: "+28.71%" },
      { name: "TPC", change: "+19.02%" },
      { name: "Robostar", change: "+9.58%" },
    ]
  },
  {
    rank: 4,
    name: "Internet Services",
    icon: Globe,
    color: "bg-indigo-500",
    change: "+4.94%",
    stats: "2 of 2 rising",
    stocks: [
      { name: "Kakao", change: "+5.34%" },
      { name: "NAVER", change: "+4.54%" },
    ]
  },
  {
    rank: 5,
    name: "Construction",
    icon: Tractor,
    color: "bg-yellow-600",
    change: "+4.71%",
    stats: "11 of 16 rising",
    stocks: [
      { name: "Hyundai Infra", change: "+12.12%" },
      { name: "JinSung T.E.C", change: "+8.59%" },
      { name: "Jeonjin", change: "+7.61%" },
    ]
  },
  {
    rank: 6,
    name: "Smart Factory",
    icon: Factory,
    color: "bg-purple-500",
    change: "+3.91%",
    stats: "26 of 38 rising",
    stocks: [
      { name: "Raon Tech", change: "+29.92%" },
      { name: "Hyulim", change: "+28.71%" },
      { name: "TPC", change: "+19.02%" },
    ]
  },
  {
    rank: 7,
    name: "Semiconductors",
    icon: CircuitBoard,
    color: "bg-emerald-500",
    change: "+3.56%",
    stats: "42 of 64 rising",
    stocks: [
      { name: "SK Hynix", change: "+6.84%" },
      { name: "Samsung Elec", change: "+2.14%" },
      { name: "Hanmi Semi", change: "+12.4%" },
    ]
  },
  {
    rank: 8,
    name: "Bio/Pharma",
    icon: Pill,
    color: "bg-teal-500",
    change: "+2.89%",
    stats: "31 of 52 rising",
    stocks: [
      { name: "Samsung Bio", change: "+1.25%" },
      { name: "Celltrion", change: "+0.98%" },
      { name: "Yuhan", change: "+3.42%" },
    ]
  },
  {
    rank: 9,
    name: "Defense/Aerospace",
    icon: Rocket,
    color: "bg-orange-600",
    change: "+2.45%",
    stats: "15 of 22 rising",
    stocks: [
      { name: "Hanwha Aero", change: "+4.52%" },
      { name: "LIG Nex1", change: "+3.18%" },
      { name: "KAI", change: "+1.75%" },
    ]
  },
  {
    rank: 10,
    name: "Gaming/Metaverse",
    icon: Gamepad,
    color: "bg-violet-600",
    change: "+2.12%",
    stats: "18 of 28 rising",
    stocks: [
      { name: "Nexon Games", change: "+5.12%" },
      { name: "Krafton", change: "+2.84%" },
      { name: "Netmarble", change: "+1.45%" },
    ]
  },
  {
    rank: 11,
    name: "Renewable Energy",
    icon: Wind,
    color: "bg-lime-500",
    change: "+1.87%",
    stats: "12 of 19 rising",
    stocks: [
      { name: "CS Wind", change: "+3.65%" },
      { name: "Hanwha Sol", change: "+2.15%" },
      { name: "OCI", change: "+1.34%" },
    ]
  },
  {
    rank: 12,
    name: "Autonomous Driving",
    icon: Car,
    color: "bg-sky-500",
    change: "+1.54%",
    stats: "9 of 14 rising",
    stocks: [
      { name: "Hyundai Mobis", change: "+2.45%" },
      { name: "Mando", change: "+1.87%" },
      { name: "LG Innotek", change: "+1.23%" },
    ]
  }
];

export default function TrendingThemes() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
         <div className="space-y-1">
            <h2 className="text-lg font-bold font-display flex items-center gap-2">
               Trending Themes <Badge variant="secondary" className="text-[10px] h-5">Today 20:50</Badge>
            </h2>
         </div>
      </div>
      
      <ScrollArea className="w-full whitespace-nowrap pb-4">
        <div className="flex gap-4">
          {themes.map((theme, i) => (
            <Card key={i} className="min-w-[280px] w-[280px] bg-card/40 border-border/50 hover:bg-card/60 transition-colors group overflow-hidden">
              {/* Featured Image Area */}
              <div className={cn("h-32 relative flex items-center justify-center overflow-hidden", theme.color)}>
                 <div className="absolute inset-0 bg-black/20" />
                 <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md px-2 py-1 rounded text-xs font-bold text-white border border-white/10">
                    #{theme.rank}
                 </div>
                 
                 <theme.icon className="w-16 h-16 text-white drop-shadow-xl transform group-hover:scale-110 transition-transform duration-300" />
                 
                 {/* Decorative circles */}
                 <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                 <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              <CardContent className="p-4 pt-3 space-y-4">
                 {/* Header Stats */}
                 <div>
                    <div className="flex items-center justify-between mb-1">
                       <span className="font-bold text-base truncate">{theme.name}</span>
                       <span className="font-mono font-bold text-red-400">{theme.change}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{theme.stats}</p>
                 </div>

                 {/* Stock List */}
                 <div className="space-y-2 pt-2 border-t border-border/40">
                    {theme.stocks.map((stock, j) => (
                       <div key={j} className="flex items-center justify-between text-sm group/item">
                          <span className="text-muted-foreground group-hover/item:text-foreground transition-colors">{stock.name}</span>
                          <span className="font-mono text-red-400 text-xs">{stock.change}</span>
                       </div>
                    ))}
                 </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}