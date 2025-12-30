import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Lock, 
  Bell, 
  CreditCard, 
  Crown, 
  Check, 
  AlertCircle,
  Smartphone,
  Mail,
  Shield
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <DashboardLayout>
      <div className="container max-w-6xl mx-auto py-10 px-4 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">마이페이지</h1>
            <p className="text-gray-400 mt-2">개인 정보 및 계정 설정을 관리하세요.</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar Profile Summary */}
          <Card className="w-full lg:w-80 h-fit bg-[#151921] border-white/10 shrink-0">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="relative mb-4">
                <Avatar className="w-24 h-24 border-2 border-primary/20">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>AM</AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0 bg-primary text-black text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#151921]">
                  PRO
                </div>
              </div>
              <h2 className="text-xl font-bold text-white mb-1">Alex Morgan</h2>
              <p className="text-sm text-gray-400 mb-4">alex.morgan@stocklink.com</p>
              
              <div className="w-full bg-white/5 rounded-lg p-3 mb-6 flex items-center justify-between">
                <div className="text-left">
                  <p className="text-[10px] text-gray-500 font-bold uppercase">Membership</p>
                  <p className="text-sm font-bold text-primary flex items-center gap-1">
                    <Crown className="w-3 h-3 fill-primary" /> PRO Plan
                  </p>
                </div>
                <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10">Active</Badge>
              </div>

              <div className="w-full space-y-1">
                <div className="flex justify-between text-sm py-2 border-b border-white/5">
                  <span className="text-gray-400">가입일</span>
                  <span className="text-gray-200">2024.01.15</span>
                </div>
                <div className="flex justify-between text-sm py-2 border-b border-white/5">
                  <span className="text-gray-400">마지막 로그인</span>
                  <span className="text-gray-200">오늘 20:55</span>
                </div>
                <div className="flex justify-between text-sm py-2">
                  <span className="text-gray-400">상태</span>
                  <span className="text-green-500 font-medium">정상</span>
                </div>
              </div>
            </CardContent>
          </Card>

            {/* Right Content Area */}
            <div className="flex-1 min-w-0">
                <div className="bg-[#151921] border border-white/10 rounded-xl overflow-hidden min-h-[600px] flex flex-col">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex-1 flex flex-col">
                        <div className="border-b border-white/10 bg-[#0B0E14]/30">
                            <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-none overflow-x-auto flex-nowrap">
                                <TabsTrigger 
                                    value="profile" 
                                    className="flex-1 min-w-[100px] gap-2 py-4 rounded-none border-b-2 border-transparent data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-primary data-[state=active]:shadow-none transition-all hover:text-white"
                                >
                                    <User className="w-4 h-4" /> 내 정보
                                </TabsTrigger>
                                <TabsTrigger 
                                    value="password" 
                                    className="flex-1 min-w-[120px] gap-2 py-4 rounded-none border-b-2 border-transparent data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-primary data-[state=active]:shadow-none transition-all hover:text-white"
                                >
                                    <Lock className="w-4 h-4" /> 비밀번호 변경
                                </TabsTrigger>
                                <TabsTrigger 
                                    value="notifications" 
                                    className="flex-1 min-w-[100px] gap-2 py-4 rounded-none border-b-2 border-transparent data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-primary data-[state=active]:shadow-none transition-all hover:text-white"
                                >
                                    <Bell className="w-4 h-4" /> 알림 설정
                                </TabsTrigger>
                                <TabsTrigger 
                                    value="billing" 
                                    className="flex-1 min-w-[100px] gap-2 py-4 rounded-none border-b-2 border-transparent data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-primary data-[state=active]:shadow-none transition-all hover:text-white"
                                >
                                    <CreditCard className="w-4 h-4" /> 결제 내역
                                </TabsTrigger>
                                <TabsTrigger 
                                    value="subscription" 
                                    className="flex-1 min-w-[100px] gap-2 py-4 rounded-none border-b-2 border-transparent data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-primary data-[state=active]:shadow-none transition-all hover:text-white"
                                >
                                    <Crown className="w-4 h-4" /> 구독 관리
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <div className="p-6 md:p-8 flex-1">
                            {/* 1. Profile Info */}
                            <TabsContent value="profile" className="mt-0 space-y-6 h-full animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-1">기본 정보</h2>
                                    <p className="text-sm text-gray-400 mb-6">서비스에서 사용되는 기본 프로필 정보입니다.</p>
                                    
                                    <div className="space-y-6 max-w-2xl">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="name" className="text-gray-300">이름</Label>
                                                <Input id="name" defaultValue="Alex Morgan" className="bg-[#0B0E14] border-white/10 text-white h-11" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="text-gray-300">이메일</Label>
                                                <Input id="email" defaultValue="alex.morgan@stocklink.com" disabled className="bg-[#0B0E14]/50 border-white/5 text-gray-500 h-11" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="phone" className="text-gray-300">연락처</Label>
                                                <Input id="phone" defaultValue="+82 10-1234-5678" className="bg-[#0B0E14] border-white/10 text-white h-11" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="job" className="text-gray-300">직업 / 소속</Label>
                                                <Input id="job" defaultValue="Professional Trader" className="bg-[#0B0E14] border-white/10 text-white h-11" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="bio" className="text-gray-300">자기소개</Label>
                                            <Input id="bio" defaultValue="퀀트 투자와 알고리즘 트레이딩에 관심이 많습니다." className="bg-[#0B0E14] border-white/10 text-white h-11" />
                                        </div>
                                        
                                        <div className="pt-4 flex justify-end">
                                            <Button size="lg" className="bg-primary text-black hover:bg-primary/90 font-bold px-8">변경사항 저장</Button>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            {/* 2. Change Password */}
                            <TabsContent value="password" className="mt-0 h-full animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-1">비밀번호 변경</h2>
                                    <p className="text-sm text-gray-400 mb-6">계정 보안을 위해 주기적으로 비밀번호를 변경해주세요.</p>
                                    
                                    <div className="space-y-5 max-w-md">
                                        <div className="space-y-2">
                                            <Label htmlFor="current-pw" className="text-gray-300">현재 비밀번호</Label>
                                            <Input id="current-pw" type="password" placeholder="현재 비밀번호 입력" className="bg-[#0B0E14] border-white/10 text-white h-11" />
                                        </div>
                                        <Separator className="bg-white/5 my-2" />
                                        <div className="space-y-2">
                                            <Label htmlFor="new-pw" className="text-gray-300">새 비밀번호</Label>
                                            <Input id="new-pw" type="password" placeholder="8자 이상 입력" className="bg-[#0B0E14] border-white/10 text-white h-11" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="confirm-pw" className="text-gray-300">새 비밀번호 확인</Label>
                                            <Input id="confirm-pw" type="password" placeholder="새 비밀번호 다시 입력" className="bg-[#0B0E14] border-white/10 text-white h-11" />
                                        </div>
                                        
                                        <div className="pt-4 flex justify-end">
                                            <Button size="lg" className="bg-white text-black hover:bg-gray-200 font-bold px-8">비밀번호 업데이트</Button>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            {/* 3. Notification Settings */}
                            <TabsContent value="notifications" className="mt-0 h-full animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-1">알림 설정</h2>
                                    <p className="text-sm text-gray-400 mb-6">원하는 알림만 선택해서 받아보세요.</p>
                                    
                                    <div className="space-y-8 max-w-2xl">
                                        <div className="space-y-5">
                                            <h3 className="text-sm font-bold text-primary flex items-center gap-2 uppercase tracking-wider">
                                                <Smartphone className="w-4 h-4" /> 앱 푸시 알림
                                            </h3>
                                            <div className="bg-[#0B0E14] rounded-lg p-1 border border-white/5">
                                                <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors rounded">
                                                    <div className="space-y-1">
                                                        <Label className="text-base text-gray-200 font-medium">실시간 매매 신호</Label>
                                                        <p className="text-sm text-gray-500">AI가 포착한 급등/급락 종목 알림</p>
                                                    </div>
                                                    <Switch defaultChecked />
                                                </div>
                                                <Separator className="bg-white/5" />
                                                <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors rounded">
                                                    <div className="space-y-1">
                                                        <Label className="text-base text-gray-200 font-medium">관심 종목 변동</Label>
                                                        <p className="text-sm text-gray-500">지정한 목표가/손절가 도달 시 알림</p>
                                                    </div>
                                                    <Switch defaultChecked />
                                                </div>
                                                <Separator className="bg-white/5" />
                                                <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors rounded">
                                                    <div className="space-y-1">
                                                        <Label className="text-base text-gray-200 font-medium">커뮤니티 멘션</Label>
                                                        <p className="text-sm text-gray-500">누군가 나를 멘션하거나 답글을 달았을 때</p>
                                                    </div>
                                                    <Switch defaultChecked />
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-5">
                                            <h3 className="text-sm font-bold text-primary flex items-center gap-2 uppercase tracking-wider">
                                                <Mail className="w-4 h-4" /> 이메일 알림
                                            </h3>
                                            <div className="bg-[#0B0E14] rounded-lg p-1 border border-white/5">
                                                <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors rounded">
                                                    <div className="space-y-1">
                                                        <Label className="text-base text-gray-200 font-medium">주간 리포트</Label>
                                                        <p className="text-sm text-gray-500">매주 월요일 발송되는 주간 시장 분석 리포트</p>
                                                    </div>
                                                    <Switch defaultChecked />
                                                </div>
                                                <Separator className="bg-white/5" />
                                                <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors rounded">
                                                    <div className="space-y-1">
                                                        <Label className="text-base text-gray-200 font-medium">마케팅 정보 수신</Label>
                                                        <p className="text-sm text-gray-500">이벤트 및 프로모션 소식 받기</p>
                                                    </div>
                                                    <Switch />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            {/* 4. Payment History */}
                            <TabsContent value="billing" className="mt-0 h-full animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-1">결제 내역</h2>
                                    <p className="text-sm text-gray-400 mb-6">최근 6개월간의 결제 내역입니다.</p>
                                    
                                    <div className="rounded-xl border border-white/10 overflow-hidden bg-[#0B0E14]">
                                        <div className="grid grid-cols-4 bg-[#0B0E14] p-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-white/10">
                                            <div>날짜</div>
                                            <div>상품명</div>
                                            <div>결제 수단</div>
                                            <div className="text-right">금액</div>
                                        </div>
                                        <div className="divide-y divide-white/5">
                                            {[
                                                { date: "2024.12.15", item: "StockLink PRO (월간)", method: "KakaoPay", amount: "29,000원" },
                                                { date: "2024.11.15", item: "StockLink PRO (월간)", method: "KakaoPay", amount: "29,000원" },
                                                { date: "2024.10.15", item: "StockLink PRO (월간)", method: "KakaoPay", amount: "29,000원" },
                                                { date: "2024.09.15", item: "StockLink PRO (월간)", method: "KakaoPay", amount: "29,000원" },
                                            ].map((history, i) => (
                                                <div key={i} className="grid grid-cols-4 p-4 text-sm text-gray-200 hover:bg-white/5 transition-colors items-center">
                                                    <div className="font-mono text-gray-400">{history.date}</div>
                                                    <div className="font-medium text-white">{history.item}</div>
                                                    <div className="text-gray-400">{history.method}</div>
                                                    <div className="text-right font-bold text-white text-base">{history.amount}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            {/* 5. Subscription Management */}
                            <TabsContent value="subscription" className="mt-0 h-full animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-1">구독 관리</h2>
                                    <p className="text-sm text-gray-400 mb-6">현재 이용 중인 플랜을 관리하거나 업그레이드하세요.</p>
                                    
                                    <div className="max-w-xl mx-auto mt-12">
                                        <div className="relative group">
                                            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-2xl opacity-30 group-hover:opacity-50 blur-lg transition duration-500"></div>
                                            <div className="relative bg-[#0B0E14] rounded-2xl border border-primary/50 overflow-hidden h-full flex flex-col p-8">
                                                
                                                <div className="flex justify-between items-start mb-8">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                                                            <Crown className="w-8 h-8 text-primary fill-primary" />
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-3 mb-1">
                                                                <h3 className="text-2xl font-bold text-white">PRO Plan</h3>
                                                                <Badge className="bg-primary text-black hover:bg-primary font-bold px-2 py-0.5">이용 중</Badge>
                                                            </div>
                                                            <p className="text-gray-400 text-sm">전문 투자자를 위한 모든 기능</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="mb-8 p-6 bg-white/5 rounded-xl border border-white/5">
                                                    <div className="flex justify-between items-end mb-4">
                                                        <span className="text-gray-400 text-sm">결제 금액</span>
                                                        <div className="text-right">
                                                            <span className="text-3xl font-bold text-white">₩29,000</span>
                                                            <span className="text-gray-500 text-sm ml-1">/ 월</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between items-center text-sm pt-4 border-t border-white/10">
                                                        <span className="text-gray-400">다음 결제일</span>
                                                        <span className="text-white font-mono">2026. 01. 30</span>
                                                    </div>
                                                </div>
                                                
                                                <div className="space-y-3 mb-8">
                                                    <div className="flex items-center gap-3 text-sm text-gray-300">
                                                        <Check className="w-4 h-4 text-green-500" /> AI 실시간 매매 신호 무제한
                                                    </div>
                                                    <div className="flex items-center gap-3 text-sm text-gray-300">
                                                        <Check className="w-4 h-4 text-green-500" /> 심층 시장 분석 리포트
                                                    </div>
                                                    <div className="flex items-center gap-3 text-sm text-gray-300">
                                                        <Check className="w-4 h-4 text-green-500" /> VIP 커뮤니티 접근 권한
                                                    </div>
                                                    <div className="flex items-center gap-3 text-sm text-gray-300">
                                                        <Check className="w-4 h-4 text-green-500" /> 포트폴리오 진단 서비스
                                                    </div>
                                                </div>

                                                <div className="flex gap-4 mt-auto">
                                                    <Link href="/subscription" className="flex-1">
                                                        <Button className="w-full bg-white text-black hover:bg-gray-200 font-bold h-11">구독 변경</Button>
                                                    </Link>
                                                    <Button variant="outline" className="flex-1 border-white/10 text-white hover:bg-white/5 h-11">결제 수단 관리</Button>
                                                </div>
                                                <div className="mt-4 text-center">
                                                     <button className="text-xs text-red-400 hover:text-red-300 hover:underline">구독 해지하기</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>
            </div>
        </div>
      </div>
    </DashboardLayout>
  );
}