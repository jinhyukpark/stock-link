import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";

export default function SocialPage() {
  return (
    <DashboardLayout>
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <div className="flex flex-col gap-2 mb-8">
            <h1 className="text-3xl font-bold text-white tracking-tight">Social Feed</h1>
            <p className="text-gray-400">실시간 투자 아이디어와 시장 반응을 확인하세요.</p>
        </div>
        
        <div className="space-y-6">
            {/* Write Post */}
            <Card className="bg-[#151921] border-white/10">
                <CardContent className="pt-6">
                    <div className="flex gap-4">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>AM</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-4">
                            <Input 
                                placeholder="지금 무슨 생각을 하고 계신가요? (종목 태그 $AAPL)" 
                                className="bg-[#0B0E14] border-white/10 text-white"
                            />
                            <div className="flex justify-end">
                                <Button className="bg-primary text-black hover:bg-primary/90">게시하기</Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Feed Items */}
            {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-[#151921] border-white/10">
                    <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                        <div className="flex gap-3">
                            <Avatar>
                                <AvatarImage src={`https://i.pravatar.cc/150?u=${i}`} />
                                <AvatarFallback>User</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-white">Trader_{i}</span>
                                    <span className="text-xs text-gray-500">2시간 전</span>
                                </div>
                                <p className="text-sm text-gray-400">Professional Investor</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" className="text-gray-400">
                            <MoreHorizontal className="w-4 h-4" />
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-gray-200">
                            오늘 시장 변동성이 심하네요. <span className="text-primary cursor-pointer">$TSLA</span> 지지선 테스트 중인 것 같습니다. 
                            단기 반등 노려볼만한 자리라고 생각합니다. #주식 #투자 #테슬라
                        </p>
                        <div className="flex items-center gap-6 text-gray-400 pt-2">
                            <button className="flex items-center gap-2 hover:text-red-400 transition-colors">
                                <Heart className="w-4 h-4" />
                                <span className="text-sm">24</span>
                            </button>
                            <button className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                                <MessageCircle className="w-4 h-4" />
                                <span className="text-sm">5</span>
                            </button>
                            <button className="flex items-center gap-2 hover:text-green-400 transition-colors">
                                <Share2 className="w-4 h-4" />
                            </button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
