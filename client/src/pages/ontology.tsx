import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Network, GitBranch, Database, Share2, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function OntologyPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-4rem)] bg-[#0B0E14] text-foreground font-sans overflow-hidden p-8">
        <div className="flex flex-col gap-8 max-w-7xl mx-auto w-full h-full">
          
          {/* Header */}
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-display font-bold text-white flex items-center gap-3">
              <Network className="w-8 h-8 text-primary" />
              시장 온톨로지 (Market Ontology)
            </h1>
            <p className="text-muted-foreground font-mono text-sm max-w-2xl">
              주식 시장의 복잡한 연관 관계를 시각화하고 분석합니다. 산업, 테마, 재료 간의 구조적 관계를 탐색하여 숨겨진 투자 기회를 발견하세요.
            </p>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="flex items-center gap-4 bg-[#151921] p-4 rounded-xl border border-white/5">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="종목, 테마, 키워드 검색..." 
                className="pl-9 bg-black/40 border-white/10 focus:border-primary/50 text-sm"
              />
            </div>
            <div className="h-6 w-px bg-white/10 mx-2" />
            <div className="flex gap-2">
               <Button variant="outline" size="sm" className="bg-transparent border-white/10 hover:bg-white/5 text-gray-400 hover:text-white gap-2">
                 <GitBranch className="w-4 h-4" />
                 관계도 보기
               </Button>
               <Button variant="outline" size="sm" className="bg-transparent border-white/10 hover:bg-white/5 text-gray-400 hover:text-white gap-2">
                 <Database className="w-4 h-4" />
                 데이터 소스
               </Button>
            </div>
            <div className="ml-auto">
               <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
                 <Filter className="w-4 h-4 mr-2" />
                 필터 설정
               </Button>
            </div>
          </div>

          {/* Main Content Area - Placeholder for Graph */}
          <div className="flex-1 bg-[#0f1115] rounded-xl border border-white/5 relative overflow-hidden flex items-center justify-center group">
            
            {/* Background Grid Animation Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
            
            <div className="text-center z-10 p-8 max-w-lg">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/20 group-hover:scale-110 transition-transform duration-500">
                <Share2 className="w-10 h-10 text-primary animate-pulse" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">지식 그래프 로딩 중...</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                시장 데이터와 뉴스 텍스트를 분석하여 종목 간의 연관 관계를 매핑하고 있습니다. 잠시만 기다려주세요.
              </p>
              <div className="flex justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
              </div>
            </div>

          </div>

          {/* Bottom Info Panel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <Card className="bg-[#151921] border-white/5">
                <CardHeader className="pb-2">
                   <CardTitle className="text-sm font-medium text-gray-400">분석된 엔티티</CardTitle>
                </CardHeader>
                <CardContent>
                   <div className="text-2xl font-bold text-white">24,892</div>
                   <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                     <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400"></span>
                     실시간 업데이트 중
                   </p>
                </CardContent>
             </Card>
             <Card className="bg-[#151921] border-white/5">
                <CardHeader className="pb-2">
                   <CardTitle className="text-sm font-medium text-gray-400">발견된 관계</CardTitle>
                </CardHeader>
                <CardContent>
                   <div className="text-2xl font-bold text-white">156,031</div>
                   <p className="text-xs text-blue-400 mt-1">+1,204 (Today)</p>
                </CardContent>
             </Card>
             <Card className="bg-[#151921] border-white/5">
                <CardHeader className="pb-2">
                   <CardTitle className="text-sm font-medium text-gray-400">테마 강도</CardTitle>
                </CardHeader>
                <CardContent>
                   <div className="text-2xl font-bold text-white">High</div>
                   <p className="text-xs text-gray-500 mt-1">AI 반도체, 2차전지 중심</p>
                </CardContent>
             </Card>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
