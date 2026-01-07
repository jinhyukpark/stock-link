import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";
import { 
  Zap, 
  Newspaper, 
  BarChart3, 
  Share2,
  TrendingUp,
  MessageSquare,
  Globe
} from "lucide-react";

type InsightTab = "momentum" | "news" | "market" | "social";

export default function InsightPage() {
  const [activeTab, setActiveTab] = useState<InsightTab>("momentum");

  const menuItems = [
    { id: "momentum", label: "Momentum 분석", icon: Zap },
    { id: "news", label: "News 분석", icon: Newspaper },
    { id: "market", label: "시장분석", icon: BarChart3 },
    { id: "social", label: "소셜분석", icon: Share2 },
  ];

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-4rem)] bg-[#0B0E14] text-white font-sans overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-64 flex flex-col border-r border-white/5 bg-[#151921] shrink-0">
          <div className="p-4 border-b border-white/5">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Insight
            </h2>
          </div>
          
          <nav className="flex-1 p-2 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as InsightTab)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  activeTab === item.id 
                    ? "bg-primary/10 text-primary border border-primary/20" 
                    : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                )}
              >
                <item.icon className={cn("w-4 h-4", activeTab === item.id ? "text-primary" : "text-gray-500")} />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 bg-[#0B0E14] overflow-hidden">
            <div className="flex-1 overflow-y-auto p-8">
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-white mb-2">
                        {menuItems.find(i => i.id === activeTab)?.label}
                    </h1>
                    <p className="text-gray-400 text-sm">
                        {activeTab === 'momentum' && "주가 모멘텀과 기술적 지표를 심층적으로 분석합니다."}
                        {activeTab === 'news' && "최신 뉴스 기사를 AI가 분석하여 시장에 미치는 영향을 파악합니다."}
                        {activeTab === 'market' && "거시 경제 지표와 시장 동향을 종합적으로 분석합니다."}
                        {activeTab === 'social' && "소셜 미디어와 커뮤니티의 여론을 실시간으로 분석합니다."}
                    </p>
                </header>

                {/* Content Placeholder */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Example Content Card 1 */}
                    <div className="bg-[#151921] border border-white/5 rounded-xl p-6 h-64 flex flex-col items-center justify-center text-gray-500 gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                            {activeTab === 'momentum' && <Zap className="w-6 h-6" />}
                            {activeTab === 'news' && <Newspaper className="w-6 h-6" />}
                            {activeTab === 'market' && <BarChart3 className="w-6 h-6" />}
                            {activeTab === 'social' && <Share2 className="w-6 h-6" />}
                        </div>
                        <p>{menuItems.find(i => i.id === activeTab)?.label} 콘텐츠 영역 1</p>
                    </div>
                    
                    {/* Example Content Card 2 */}
                    <div className="bg-[#151921] border border-white/5 rounded-xl p-6 h-64 flex flex-col items-center justify-center text-gray-500 gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                            <Globe className="w-6 h-6" />
                        </div>
                        <p>{menuItems.find(i => i.id === activeTab)?.label} 콘텐츠 영역 2</p>
                    </div>

                    {/* Example Content Card 3 */}
                    <div className="bg-[#151921] border border-white/5 rounded-xl p-6 h-64 flex flex-col items-center justify-center text-gray-500 gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                             <MessageSquare className="w-6 h-6" />
                        </div>
                        <p>{menuItems.find(i => i.id === activeTab)?.label} 콘텐츠 영역 3</p>
                    </div>
                </div>
                
                <div className="mt-6 bg-[#151921] border border-white/5 rounded-xl p-6 h-96 flex flex-col items-center justify-center text-gray-500">
                    <p>메인 상세 분석 차트 및 데이터 영역</p>
                </div>
            </div>
        </main>
      </div>
    </DashboardLayout>
  );
}
