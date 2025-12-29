import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, ChevronRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RelatedStocks() {
  const stocks = [
    { rank: 1, name: "SK Hynix", price: "140,000", change: "+6.84%", volume: "2.4T", trend: "up" },
    { rank: 2, name: "Hanmi Semi", price: "72,500", change: "+12.4%", volume: "450B", trend: "up" },
    { rank: 3, name: "Samsung Elec", price: "78,200", change: "+2.14%", volume: "1.2T", trend: "up" },
    { rank: 4, name: "Isc", price: "34,200", change: "-1.20%", volume: "89B", trend: "down" },
    { rank: 5, name: "HPSP", price: "45,600", change: "+3.40%", volume: "120B", trend: "up" },
  ];

  return (
    <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
           <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" />
           <CardTitle className="text-base font-semibold">Related Stocks: <span className="text-primary">AI Semiconductors</span></CardTitle>
        </div>
        <Button variant="ghost" size="sm" className="text-xs h-7">
          View All <ChevronRight className="w-3 h-3 ml-1" />
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-secondary/30">
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
    </Card>
  );
}