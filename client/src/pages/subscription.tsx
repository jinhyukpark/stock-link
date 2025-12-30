import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, ArrowLeft, Crown } from "lucide-react";
import { Link } from "wouter";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function SubscriptionPage() {
  const plans = [
    {
      name: "Free",
      price: "0원",
      period: "/ 월",
      description: "Guest",
      badge: "광고 포함",
      buttonText: "변경하기",
      buttonVariant: "outline",
      active: false,
      features: {
        community: [
          { name: "커뮤니티 참여", included: false },
          { name: "커뮤니티 방 만들기", value: "1개", included: false },
          { name: "커뮤니티 초대하기", value: "5명", included: false },
        ],
        ontology: [
          { name: "노드 사이즈", included: true },
          { name: "타임라인", included: true },
          { name: "증권 - 테마", included: true },
          { name: "노드 형태", included: true },
          { name: "증권 - 산업분류", included: true },
          { name: "클러스터링", included: true },
          { name: "선택 노드 추출", included: true },
          { name: "Graph 분석", included: true },
          { name: "확장-축소", included: true },
          { name: "데이터 추출", included: false },
          { name: "필터", included: false },
          { name: "투영", included: false },
        ],
        stock: [
          { name: "GPT 주식 검색", value: "50회 / 월", included: true },
          { name: "AI 주식 레포트", value: "50회 / 월", included: true },
        ]
      }
    },
    {
      name: "PRO",
      price: "29,000원",
      period: "/ 월",
      description: "Business",
      buttonText: "이용 중",
      buttonVariant: "default",
      active: true,
      popular: true,
      features: {
        community: [
          { name: "커뮤니티 참여", included: false },
          { name: "커뮤니티 방 만들기", value: "5개", included: false },
          { name: "커뮤니티 초대하기", value: "100명", included: false },
        ],
        ontology: [
          { name: "노드 사이즈", included: true },
          { name: "타임라인", included: true },
          { name: "증권 - 테마", included: true },
          { name: "노드 형태", included: true },
          { name: "증권 - 산업분류", included: true },
          { name: "클러스터링", included: true },
          { name: "선택 노드 추출", included: true },
          { name: "Graph 분석", included: true },
          { name: "확장-축소", included: true },
          { name: "데이터 추출", included: true },
          { name: "필터", included: true },
          { name: "투영", included: false },
        ],
        stock: [
          { name: "AI Scoring letter", value: "1회 / 주", included: true },
          { name: "GPT 주식 검색", value: "무제한", included: true },
          { name: "AI 주식 레포트", value: "무제한", included: true },
        ]
      }
    },
    {
      name: "Enterprise",
      price: "150,000원",
      period: "/ 월",
      description: "Enterprise",
      buttonText: "변경하기",
      buttonVariant: "primary",
      active: false,
      features: {
        community: [
          { name: "커뮤니티 참여", included: false },
          { name: "커뮤니티 방 만들기", value: "20개", included: false },
          { name: "커뮤니티 초대하기", value: "200명", included: false },
        ],
        ontology: [
          { name: "노드 사이즈", included: true },
          { name: "타임라인", included: true },
          { name: "증권 - 테마", included: true },
          { name: "노드 형태", included: true },
          { name: "증권 - 산업분류", included: true },
          { name: "클러스터링", included: true },
          { name: "선택 노드 추출", included: true },
          { name: "Graph 분석", included: true },
          { name: "확장-축소", included: true },
          { name: "데이터 추출", included: true },
          { name: "필터", included: true },
          { name: "투영", included: true },
        ],
        stock: [
          { name: "AI Scoring letter", value: "1회 / 주", included: true },
          { name: "GPT 주식 검색", value: "무제한", included: true },
          { name: "AI 주식 레포트", value: "무제한", included: true },
          { name: "모멘텀 분석 기능", value: "무제한", included: true },
        ]
      }
    }
  ];

  return (
    <DashboardLayout>
      <div className="container max-w-7xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12 space-y-4">
          <div className="w-full flex justify-start mb-4">
            <Link href="/mypage">
                <Button variant="ghost" className="gap-2 text-gray-400 hover:text-white pl-0">
                    <ArrowLeft className="w-4 h-4" /> 뒤로가기
                </Button>
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight">Pricing</h1>
          <p className="text-gray-400 max-w-2xl">증권 관계 분석부터 AI 분석까지 모든 것을 제공합니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={cn(
                "relative bg-[#151921] border-white/10 flex flex-col overflow-hidden transition-all duration-300",
                plan.active ? "border-primary shadow-[0_0_30px_rgba(var(--primary-rgb),0.1)] scale-105 z-10" : "hover:border-white/20 hover:bg-[#1a1f29]",
                plan.name === "Enterprise" && "border-blue-500/30"
              )}
            >
              {plan.badge && (
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30 border-yellow-500/50">{plan.badge}</Badge>
                </div>
              )}
              {plan.popular && (
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary to-blue-500" />
              )}
              {plan.name === "Enterprise" && (
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
              )}
              
              <CardHeader className="text-center pb-2">
                <p className="text-sm font-medium text-gray-400 mb-2">{plan.description}</p>
                <CardTitle className="text-3xl font-bold text-white">{plan.name}</CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 space-y-8">
                <div className="text-center">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-sm text-gray-500">{plan.period}</span>
                </div>

                <div className="space-y-3">
                    <Button 
                        className={cn(
                            "w-full font-bold h-12",
                            plan.active 
                                ? "bg-white text-black hover:bg-gray-200" 
                                : plan.name === "Enterprise"
                                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 hover:opacity-90"
                                    : "bg-white text-black hover:bg-gray-200"
                        )}
                        variant={plan.buttonVariant === "outline" ? "outline" : "default"}
                        disabled={plan.active}
                    >
                        {plan.buttonText}
                    </Button>
                </div>

                <div className="space-y-6 pt-6 border-t border-white/5 text-sm">
                    {/* Community Features */}
                    <div className="space-y-3">
                        <h4 className="font-bold text-gray-500 mb-2">커뮤니티 <span className="text-[10px] font-normal opacity-50">(정식버전 제공 예정)</span></h4>
                        {plan.features.community.map((feature, i) => (
                            <div key={i} className="flex justify-between items-center text-gray-400">
                                <div className="flex items-center gap-2">
                                    <X className="w-3 h-3 text-gray-600" />
                                    <span className="text-gray-500 line-through decoration-gray-700">{feature.name}</span>
                                </div>
                                {feature.value && <span className="text-gray-600">{feature.value}</span>}
                            </div>
                        ))}
                    </div>

                    {/* Ontology Features */}
                    <div className="space-y-3">
                        <h4 className="font-bold text-gray-300 mb-2">온톨로지 분석</h4>
                        {plan.features.ontology.map((feature, i) => (
                            <div key={i} className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    {feature.included ? (
                                        <Check className="w-3 h-3 text-white" />
                                    ) : (
                                        <X className="w-3 h-3 text-gray-600" />
                                    )}
                                    <span className={cn(feature.included ? "text-gray-300" : "text-gray-600")}>
                                        {feature.name}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Stock Analysis Features */}
                    <div className="space-y-3">
                        <h4 className="font-bold text-gray-300 mb-2">주식 분석</h4>
                        {plan.features.stock.map((feature, i) => (
                            <div key={i} className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    {feature.included ? (
                                        <Check className="w-3 h-3 text-white" />
                                    ) : (
                                        <X className="w-3 h-3 text-gray-600" />
                                    )}
                                    <span className={cn(feature.included ? "text-gray-300" : "text-gray-600")}>
                                        {feature.name}
                                    </span>
                                </div>
                                {feature.value && <span className={cn("font-medium", feature.included ? "text-white" : "text-gray-600")}>{feature.value}</span>}
                            </div>
                        ))}
                    </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center text-xs text-gray-600">
            <p>ilunex, Inc. is registered for sales tax purposes in certain countries. As a result, depending on your location, a sales tax could be added to your final bill.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}