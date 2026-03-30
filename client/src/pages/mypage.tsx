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
import { Link } from "wouter";
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
  Shield,
  Camera,
  FileText
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const handleCancelEdit = () => {
    setShowCancelDialog(true);
  };

  const confirmCancelEdit = () => {
    setShowCancelDialog(false);
    setIsEditingProfile(false);
  };

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
          {/* Left Column (Profile + Referral) */}
          <div className="flex flex-col gap-4">
          {/* Left Sidebar Profile Summary */}
          <Card className="w-full lg:w-80 h-fit bg-[#151921] border-white/10 shrink-0">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="relative mb-4">
                <Avatar className="w-24 h-24 border-2 border-primary/20">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>AM</AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 bg-[#1e2330] hover:bg-[#2a303f] text-gray-300 p-1.5 rounded-full border border-white/10 transition-colors shadow-sm z-10" title="프로필 사진 변경">
                  <Camera className="w-4 h-4" />
                </button>
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

          {/* Referral Code Box */}
          <div className="w-full lg:w-80 bg-[#151921] rounded-xl border border-white/10 shrink-0 p-5">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2.5">
                    <span className="text-gray-300 font-medium text-[15px]">추천인 코드</span>
                    <span className="text-white font-bold text-[15px] tracking-wider">MXHRC73M</span>
                </div>
                <Button variant="ghost" size="sm" className="text-[#0ea5e9] hover:text-[#0ea5e9]/80 hover:bg-[#0ea5e9]/10 gap-1.5 font-medium px-2 h-8 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                    복사하기
                </Button>
            </div>
            <div className="bg-[#1e2330] rounded-lg p-4 space-y-3 border border-white/5">
                <p className="text-[13px] text-gray-400 leading-relaxed break-keep">
                    회원님을 추천한 유저가 결제할 때마다, 결제 금액의 일정 비율이 회원님께 리워드로 지급됩니다.
                </p>
                <div className="text-[#0ea5e9] font-medium text-[13px]">
                    envitest님의 현재 리워드 비율: 20%
                </div>
            </div>
          </div>
          </div>

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
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h2 className="text-xl font-bold text-white mb-1">기본 정보</h2>
                                            <p className="text-sm text-gray-400">서비스에서 사용되는 기본 프로필 정보입니다.</p>
                                        </div>
                                        {!isEditingProfile && (
                                            <Button 
                                                variant="outline" 
                                                className="border-white/10 bg-[#1e2330] hover:bg-white/5 text-white"
                                                onClick={() => setIsEditingProfile(true)}
                                            >
                                                프로필 수정
                                            </Button>
                                        )}
                                    </div>
                                    
                                    <div className="space-y-6 max-w-2xl">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="name" className="text-gray-300">이름</Label>
                                                <Input id="name" defaultValue="Alex Morgan" disabled={!isEditingProfile} className="bg-[#0B0E14] border-white/10 text-white h-11 disabled:opacity-70" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="text-gray-300">이메일</Label>
                                                <Input id="email" defaultValue="alex.morgan@stocklink.com" disabled className="bg-[#0B0E14]/50 border-white/5 text-gray-500 h-11" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="phone" className="text-gray-300">연락처</Label>
                                                <Input id="phone" defaultValue="+82 10-1234-5678" disabled={!isEditingProfile} className="bg-[#0B0E14] border-white/10 text-white h-11 disabled:opacity-70" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="job" className="text-gray-300">직업</Label>
                                                <Select defaultValue="trader" disabled={!isEditingProfile}>
                                                    <SelectTrigger id="job" className="bg-[#0B0E14] border-white/10 text-white h-11 disabled:opacity-70">
                                                        <SelectValue placeholder="직업을 선택하세요" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-[#0B0E14] border-white/10 text-white">
                                                        <SelectItem value="student">학생</SelectItem>
                                                        <SelectItem value="worker">직장인</SelectItem>
                                                        <SelectItem value="trader">전업 투자자</SelectItem>
                                                        <SelectItem value="business">사업가</SelectItem>
                                                        <SelectItem value="freelancer">프리랜서</SelectItem>
                                                        <SelectItem value="none">무직</SelectItem>
                                                        <SelectItem value="other">기타</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="company" className="text-gray-300">소속</Label>
                                                <Input id="company" defaultValue="StockLink Inc." placeholder="소속을 입력하세요 (예: 학교명, 직장명)" disabled={!isEditingProfile} className="bg-[#0B0E14] border-white/10 text-white h-11 disabled:opacity-70" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="bio" className="text-gray-300">자기소개</Label>
                                            <Input id="bio" defaultValue="퀀트 투자와 알고리즘 트레이딩에 관심이 많습니다." disabled={!isEditingProfile} className="bg-[#0B0E14] border-white/10 text-white h-11 disabled:opacity-70" />
                                        </div>
                                        
                                        {isEditingProfile && (
                                            <div className="pt-4 flex justify-end gap-3 animate-in fade-in duration-200">
                                                <Button 
                                                    variant="ghost" 
                                                    size="lg" 
                                                    className="text-gray-400 hover:text-white hover:bg-white/5 px-6"
                                                    onClick={handleCancelEdit}
                                                >
                                                    취소
                                                </Button>
                                                <Button 
                                                    size="lg" 
                                                    className="bg-primary text-black hover:bg-primary/90 font-bold px-8"
                                                    onClick={() => setIsEditingProfile(false)}
                                                >
                                                    변경사항 저장
                                                </Button>
                                            </div>
                                        )}
                                        
                                    </div>
                                </div>
                            </TabsContent>

                            {/* Cancel Edit Dialog */}
                            <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                                <DialogContent className="bg-[#151921] border-white/10 text-white sm:max-w-md">
                                    <DialogHeader>
                                        <DialogTitle>프로필 수정 취소</DialogTitle>
                                        <DialogDescription className="text-gray-400">
                                            변경 사항이 저장되지 않습니다. 프로필 수정을 취소하시겠습니까?
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter className="mt-4 flex gap-2 sm:justify-end">
                                        <Button variant="ghost" onClick={() => setShowCancelDialog(false)} className="text-gray-400 hover:text-white hover:bg-white/5">
                                            계속 수정하기
                                        </Button>
                                        <Button onClick={confirmCancelEdit} className="bg-red-500 hover:bg-red-600 text-white">
                                            네, 취소합니다
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>

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
                                                <Bell className="w-4 h-4" /> 알림 수신 여부
                                            </h3>
                                            <div className="bg-[#0B0E14] rounded-lg p-1 border border-white/5">
                                                <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors rounded">
                                                    <div className="space-y-1">
                                                        <Label className="text-base text-gray-200 font-medium">구독 관련 알림</Label>
                                                        <p className="text-sm text-gray-500">결제 및 구독 갱신, 서비스 이용 기간 등에 대한 알림</p>
                                                    </div>
                                                    <Switch defaultChecked />
                                                </div>
                                                <Separator className="bg-white/5" />
                                                <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors rounded">
                                                    <div className="space-y-1">
                                                        <Label className="text-base text-gray-200 font-medium">이벤트 알림</Label>
                                                        <p className="text-sm text-gray-500">프로모션, 할인 혜택 및 신규 기능 출시 소식</p>
                                                    </div>
                                                    <Switch />
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-5">
                                            <h3 className="text-sm font-bold text-primary flex items-center gap-2 uppercase tracking-wider">
                                                <Mail className="w-4 h-4" /> 이메일 수신 여부
                                            </h3>
                                            <div className="bg-[#0B0E14] rounded-lg p-1 border border-white/5">
                                                <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors rounded">
                                                    <div className="space-y-1">
                                                        <Label className="text-base text-gray-200 font-medium">뉴스레터 알림</Label>
                                                        <p className="text-sm text-gray-500">AI 추천 주요 종목 정보 뉴스레터</p>
                                                    </div>
                                                    <Switch defaultChecked />
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
                                        <div className="grid grid-cols-5 bg-[#0B0E14] p-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-white/10">
                                            <div>날짜</div>
                                            <div>상품명</div>
                                            <div>결제 수단</div>
                                            <div className="text-right">금액</div>
                                            <div className="text-center">영수증</div>
                                        </div>
                                        <div className="divide-y divide-white/5">
                                            {[
                                                { date: "2024.12.15", item: "StockLink PRO (월간)", method: "KakaoPay", amount: "29,000원" },
                                                { date: "2024.11.15", item: "StockLink PRO (월간)", method: "KakaoPay", amount: "29,000원" },
                                                { date: "2024.10.15", item: "StockLink PRO (월간)", method: "KakaoPay", amount: "29,000원" },
                                                { date: "2024.09.15", item: "StockLink PRO (월간)", method: "KakaoPay", amount: "29,000원" },
                                            ].map((history, i) => (
                                                <div key={i} className="grid grid-cols-5 p-4 text-sm text-gray-200 hover:bg-white/5 transition-colors items-center">
                                                    <div className="font-mono text-gray-400">{history.date}</div>
                                                    <div className="font-medium text-white">{history.item}</div>
                                                    <div className="text-gray-400">{history.method}</div>
                                                    <div className="text-right font-bold text-white text-base">{history.amount}</div>
                                                    <div className="flex justify-center">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10" title="영수증 보기">
                                                            <FileText className="h-4 w-4" />
                                                        </Button>
                                                    </div>
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
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                                        {/* Guest Plan */}
                                        <div className="bg-[#1e2330] rounded-xl p-6 border border-transparent flex flex-col h-full">
                                            <div className="mb-4">
                                                <h3 className="text-lg font-bold text-[#4ade80]">Guest</h3>
                                                <div className="text-2xl font-bold text-white mt-2">무료</div>
                                            </div>
                                            <div className="text-sm text-gray-400 space-y-1 flex-1">
                                                <p>AI 주식 분석의 첫걸음을 내딛으세요</p>
                                                <p>AI 기반 분석을 처음 경험하는 개인 투자자</p>
                                            </div>
                                            <div className="mt-8 pt-4 border-t border-transparent">
                                                <div className="flex items-center h-8">
                                                    <Link href="/licenses">
                                                        <Button variant="ghost" className="w-full text-[#3b82f6] hover:text-[#2563eb] hover:bg-transparent p-0 justify-start h-auto font-medium">
                                                            &gt; 자세히 보기
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Business Plan */}
                                        <div className="bg-[#1e2330] rounded-xl p-6 border border-transparent flex flex-col h-full">
                                            <div className="mb-4 flex items-center gap-2">
                                                <h3 className="text-lg font-bold text-[#60a5fa]">Business</h3>
                                                <Badge className="bg-[#f87171] hover:bg-[#ef4444] text-white px-2 py-0 h-5 text-[10px]">인기</Badge>
                                            </div>
                                            <div className="text-2xl font-bold text-white mt-1 mb-4">50,000원</div>
                                            <div className="text-sm text-gray-400 space-y-1 flex-1">
                                                <p>더 깊이 있는 AI 분석으로 시장을 선도하세요</p>
                                                <p>데이터 기반 의사결정을 강화하려는 소규모·리서치 팀</p>
                                            </div>
                                            <div className="mt-8 pt-4 border-t border-transparent">
                                                <div className="flex items-center justify-between h-8">
                                                    <Link href="/licenses">
                                                        <Button variant="ghost" className="text-[#3b82f6] hover:text-[#2563eb] hover:bg-transparent p-0 justify-start h-auto font-medium">
                                                            &gt; 자세히 보기
                                                        </Button>
                                                    </Link>
                                                    <Button className="bg-[#2dd4bf] hover:bg-[#14b8a6] text-black font-bold rounded-full h-8 px-4 text-xs">
                                                        플랜변경
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Enterprise Plan (Active) */}
                                        <div className="bg-[#1e2330] rounded-xl p-6 border border-[#2dd4bf] relative flex flex-col h-full">
                                            <div className="absolute top-4 right-4 border border-[#2dd4bf] text-[#2dd4bf] text-xs px-2 py-1 rounded-full">구독중</div>
                                            <div className="mb-4">
                                                <h3 className="text-lg font-bold text-[#c084fc]">Enterprise</h3>
                                                <div className="text-2xl font-bold text-white mt-2">150,000원</div>
                                            </div>
                                            <div className="text-sm text-gray-400 space-y-1 flex-1">
                                                <p>향상된 AI 기반의 정교한 리서치와 포트폴리오 인사이트를 제공합니다</p>
                                                <p className="font-bold text-gray-300 mt-2">애널리스트 및 자산운용사 등 기관 투자자</p>
                                            </div>
                                            
                                            <div className="mt-8 pt-4 border-t border-white/10">
                                                <div className="flex justify-between items-center text-sm mb-4">
                                                    <span className="text-gray-400 font-bold whitespace-nowrap">다음 결제일</span>
                                                    <span className="text-white font-bold whitespace-nowrap">2027-02-09</span>
                                                </div>
                                                <div className="flex items-center h-8">
                                                    <Link href="/licenses">
                                                        <Button variant="ghost" className="w-full text-[#3b82f6] hover:text-[#2563eb] hover:bg-transparent p-0 justify-start h-auto font-medium">
                                                            &gt; 자세히 보기
                                                        </Button>
                                                    </Link>
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