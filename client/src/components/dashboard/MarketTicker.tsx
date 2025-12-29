import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MarketTicker() {
  const indices = [
    { name: "KOSPI", value: "2,654.32", change: "+1.2%", isUp: true },
    { name: "KOSDAQ", value: "894.12", change: "-0.5%", isUp: false },
    { name: "NASDAQ", value: "16,245.8", change: "+0.8%", isUp: true },
    { name: "S&P 500", value: "5,123.4", change: "+0.3%", isUp: true },
    { name: "DOW", value: "39,120.5", change: "-0.1%", isUp: false },
    { name: "USD/KRW", value: "1,342.5", change: "+2.5", isUp: true },
  ];

  return (
    <div className="w-full overflow-hidden bg-secondary/30 border-y border-border backdrop-blur-sm">
      <div className="flex animate-scroll whitespace-nowrap py-2">
        {/* Duplicate list for seamless loop */}
        {[...indices, ...indices, ...indices].map((item, i) => (
          <div key={i} className="flex items-center gap-2 px-6 border-r border-border/50 last:border-0">
            <span className="text-sm font-semibold text-muted-foreground font-display">{item.name}</span>
            <span className="text-sm font-bold tabular-nums">{item.value}</span>
            <span className={cn(
              "text-xs flex items-center font-medium",
              item.isUp ? "text-green-500" : "text-red-500"
            )}>
              {item.isUp ? <ArrowUp className="w-3 h-3 mr-0.5" /> : <ArrowDown className="w-3 h-3 mr-0.5" />}
              {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}