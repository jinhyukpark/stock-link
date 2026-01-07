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
  Globe,
  Menu,
  ChevronLeft,
  Download,
  Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";

type InsightTab = "momentum" | "news" | "market" | "market-map" | "theme" | "social";

import MomentumView from "@/components/insight/MomentumView";
import MarketView from "@/components/insight/MarketView";
import ThemeView from "@/components/insight/ThemeView";
import NewsView from "@/components/insight/NewsView";
import MarketMapView from "@/components/insight/MarketMapView";

export default function InsightPage() {
  const [activeTab, setActiveTab] = useState<InsightTab>("momentum");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { id: "momentum", label: "Momentum Analysis", icon: Zap },
    { id: "news", label: "News Analysis", icon: Newspaper },
    { id: "market", label: "Market Analysis", icon: BarChart3 },
    { id: "market-map", label: "Market Map Analysis", icon: Globe },
    { id: "theme", label: "Theme Analysis", icon: Layers },
    { id: "social", label: "Social Analysis", icon: Share2 },
  ];

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-4rem)] bg-[#0B0E14] text-white font-sans overflow-hidden">
        {/* Left Sidebar */}
        <aside 
          className={cn(
            "flex flex-col border-r border-white/5 bg-[#151921] shrink-0 transition-all duration-300 ease-in-out",
            isSidebarOpen ? "w-64" : "w-16"
          )}
        >
          <div className={cn("p-4 border-b border-white/5 flex items-center h-16", isSidebarOpen ? "justify-between" : "justify-center")}>
            {isSidebarOpen && (
              <h2 className="text-lg font-bold flex items-center gap-2 whitespace-nowrap overflow-hidden">
                <TrendingUp className="w-5 h-5 text-primary" />
                Insight
              </h2>
            )}
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {isSidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
          
          <nav className="flex-1 p-2 space-y-1 overflow-hidden">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as InsightTab)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  activeTab === item.id 
                    ? "bg-primary/10 text-primary border border-primary/20" 
                    : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent",
                  !isSidebarOpen && "justify-center px-0"
                )}
                title={!isSidebarOpen ? item.label : undefined}
              >
                <item.icon className={cn("w-4 h-4 shrink-0", activeTab === item.id ? "text-primary" : "text-gray-500")} />
                {isSidebarOpen && <span className="whitespace-nowrap overflow-hidden">{item.label}</span>}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 bg-[#0B0E14] overflow-hidden">
            <div className="flex-1 overflow-y-auto p-8">
                <header className="mb-8 flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-2">
                            {menuItems.find(i => i.id === activeTab)?.label}
                        </h1>
                        <p className="text-gray-400 text-sm">
                            {activeTab === 'momentum' && "Analyze price momentum and technical indicators in depth."}
                            {activeTab === 'news' && "AI-powered analysis of the latest news and its market impact."}
                            {activeTab === 'market' && "Comprehensive analysis of macroeconomic indicators and market trends."}
                            {activeTab === 'market-map' && "Interactive visualization of market structure and relationships."}
                            {activeTab === 'theme' && "Visualize sector performance and identify leading market themes."}
                            {activeTab === 'social' && "Real-time analysis of social media and community sentiment."}
                        </p>
                    </div>
                    {activeTab === 'market' && (
                        <Button size="sm" variant="outline" className="h-9 gap-2 bg-blue-900/20 text-blue-400 border-blue-500/30 hover:bg-blue-900/40">
                            <Download className="w-3.5 h-3.5" />
                            Export PDF
                        </Button>
                    )}
                </header>

                {/* Content Area */}
                <div className="mt-6">
                    {activeTab === 'momentum' ? (
                        <MomentumView />
                    ) : activeTab === 'news' ? (
                        <NewsView />
                    ) : activeTab === 'market' ? (
                        <MarketView />
                    ) : activeTab === 'market-map' ? (
                        <MarketMapView />
                    ) : activeTab === 'theme' ? (
                        <ThemeView />
                    ) : (
                        <>
                            {/* Placeholder for other tabs */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Example Content Card 1 */}
                                <div className="bg-[#151921] border border-white/5 rounded-xl p-6 h-64 flex flex-col items-center justify-center text-gray-500 gap-4">
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                                        {activeTab === 'news' && <Newspaper className="w-6 h-6" />}
                                        {activeTab === 'market' && <BarChart3 className="w-6 h-6" />}
                                        {activeTab === 'social' && <Share2 className="w-6 h-6" />}
                                    </div>
                                    <p>{menuItems.find(i => i.id === activeTab)?.label} Content Area 1</p>
                                </div>
                                
                                {/* Example Content Card 2 */}
                                <div className="bg-[#151921] border border-white/5 rounded-xl p-6 h-64 flex flex-col items-center justify-center text-gray-500 gap-4">
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                                        <Globe className="w-6 h-6" />
                                    </div>
                                    <p>{menuItems.find(i => i.id === activeTab)?.label} Content Area 2</p>
                                </div>

                                {/* Example Content Card 3 */}
                                <div className="bg-[#151921] border border-white/5 rounded-xl p-6 h-64 flex flex-col items-center justify-center text-gray-500 gap-4">
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                                        <MessageSquare className="w-6 h-6" />
                                    </div>
                                    <p>{menuItems.find(i => i.id === activeTab)?.label} Content Area 3</p>
                                </div>
                            </div>
                            
                            <div className="mt-6 bg-[#151921] border border-white/5 rounded-xl p-6 h-96 flex flex-col items-center justify-center text-gray-500">
                                <p>Main detailed analysis chart and data area</p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </main>
      </div>
    </DashboardLayout>
  );
}
