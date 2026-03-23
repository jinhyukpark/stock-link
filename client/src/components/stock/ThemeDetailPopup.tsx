import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { X, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeDetailPopupProps {
  isOpen: boolean;
  onClose: () => void;
  themeName: string;
}

export default function ThemeDetailPopup({ isOpen, onClose, themeName }: ThemeDetailPopupProps) {
  // Mock data for the theme
  const mockData = {
    name: themeName || "도시가스",
    stockCount: 9,
    description: "도시가스사업법에 따라 허가를 받은 사업자가 가스관을 통해 일반 수요가에 공급하는 가스공급업. 도시가스업은 대중의 일상생활에 직접적으로 미치는 영향이 크기 때문에 일반기업과 달리 공익사업으로 취급되어 요금/설비/품질 등을 법률로 규제하고 있음. 허가받은 지역내에서 독점적 지위를 유지하기 때문에 매출과 이익이 일정하고 일반적으로 배당수익률이 높기 때문에 고배당주로서 증시 침체기에 주목받는 경향이 있음.",
    performance: [
      { label: "하루", value: "+0.89%", isPositive: true },
      { label: "1개월", value: "+3.44%", isPositive: true },
      { label: "6개월", value: "+14.70%", isPositive: true },
      { label: "1년", value: "+35.19%", isPositive: true },
    ],
    stocks: [
      { id: 1, name: "대성에너지", price: "12,110", change: "+8.71%", changeValue: "▲ 970", isPositive: true, logo: "bg-red-500" },
      { id: 2, name: "지에스이", price: "3,255", change: "+5.51%", changeValue: "▲ 170", isPositive: true, logo: "bg-green-600" },
      { id: 3, name: "인천도시가스", price: "27,000", change: "+0.37%", changeValue: "▲ 100", isPositive: true, logo: "bg-emerald-600" },
      { id: 4, name: "서울가스", price: "68,700", change: "0.00%", changeValue: "0", isPositive: null, logo: "bg-cyan-500" },
      { id: 5, name: "경동도시가스", price: "22,600", change: "-0.22%", changeValue: "▼ -50", isPositive: false, logo: "bg-blue-600" },
      { id: 6, name: "삼천리", price: "153,400", change: "-0.65%", changeValue: "▼ -1,000", isPositive: false, logo: "bg-blue-400" },
      { id: 7, name: "대성홀딩스", price: "9,000", change: "-1.32%", changeValue: "▼ -120", isPositive: false, logo: "bg-red-600" },
      { id: 8, name: "예스코홀딩스", price: "80,200", change: "-1.72%", changeValue: "▼ -1,400", isPositive: false, logo: "bg-indigo-600" },
    ]
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[600px] w-[600px] bg-[#151921] border-white/10 text-white p-0 gap-0 shadow-2xl hide-close-button overflow-hidden flex flex-col h-[840px]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#1e2330]">
          <DialogTitle className="text-lg font-bold">{mockData.name}</DialogTitle>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 flex-1 overflow-hidden flex flex-col">
          {/* Theme Info */}
          <div className="mb-4 shrink-0">
            <h2 className="text-xl font-bold mb-1">{mockData.name}</h2>
            <p className="text-xs text-gray-400 mb-2">{mockData.stockCount}개 종목</p>
            <p className="text-xs text-gray-300 leading-relaxed break-keep line-clamp-3">
              {mockData.description}
            </p>
          </div>

          {/* Performance Grid */}
          <div className="grid grid-cols-4 gap-2 mb-4 shrink-0">
            {mockData.performance.map((item, index) => (
              <div key={index} className="bg-[#1e2330] rounded-lg p-2.5 flex flex-col items-center justify-center border border-white/5">
                <span className="text-[10px] text-gray-400 mb-1">{item.label}</span>
                <span className={cn(
                  "text-sm font-bold font-display",
                  item.isPositive ? "text-red-500" : "text-blue-500"
                )}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* Stock List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 mt-2">
            <div className="space-y-0">
              {mockData.stocks.map((stock) => (
                <div 
                  key={stock.id} 
                  className="flex items-center justify-between py-2 px-1 rounded hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/10"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-500 w-4 text-center">{stock.id}</span>
                    <div className={cn("w-7 h-7 rounded flex items-center justify-center text-white font-bold text-[10px] shadow-sm", stock.logo)}>
                      {stock.name.substring(0, 1)}
                    </div>
                    <span className="font-bold text-sm group-hover:text-primary transition-colors">{stock.name}</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end">
                      <span className="font-bold text-sm">{stock.price}</span>
                      <span className={cn(
                        "text-[10px] font-medium flex items-center gap-1",
                        stock.isPositive === true ? "text-red-500" : 
                        stock.isPositive === false ? "text-blue-500" : "text-gray-400"
                      )}>
                        {stock.changeValue}
                      </span>
                    </div>
                    <div className={cn(
                      "w-14 text-right font-bold text-xs",
                      stock.isPositive === true ? "text-red-500" : 
                      stock.isPositive === false ? "text-blue-500" : "text-gray-400"
                    )}>
                      {stock.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
