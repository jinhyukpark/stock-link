import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "wouter";

export default function LicensesPage() {
  return (
    <DashboardLayout>
      <div className="min-h-screen py-16 px-4 relative overflow-hidden">
        {/* Background abstract waves (simulated with gradients) */}
        <div className="absolute top-1/2 left-0 w-full h-[500px] bg-gradient-to-r from-red-500/20 via-purple-500/20 to-blue-500/20 blur-[100px] -translate-y-1/2 -z-10 opacity-50" />
        
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Pricing</h1>
            <p className="text-gray-400 text-lg">증권 관계 분석부터 AI 분석까지 모든 것을 제공합니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Guest Plan */}
            <div className="bg-[#0f111a]/80 backdrop-blur-sm border border-white/5 rounded-2xl p-8 flex flex-col h-full hover:border-white/10 transition-colors">
              <div className="text-center space-y-4 mb-8">
                <h3 className="text-xl font-medium text-gray-300">Guest</h3>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-4xl font-bold text-white">Free</span>
                  <span className="text-xs bg-[#2a2d36] text-gray-300 px-2 py-1 rounded-full border border-white/10">광고 포함</span>
                </div>
                <Button variant="outline" className="w-full bg-white text-black hover:bg-gray-200 mt-4 rounded-lg">
                  변경하기
                </Button>
              </div>

              <div className="space-y-8 flex-1">
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-400 border-b border-white/10 pb-2">커뮤니티</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm text-gray-400"><Check className="w-4 h-4 text-gray-600" /> 커뮤니티 참여 (읽기 전용)</li>
                    <li className="flex items-center gap-3 text-sm text-gray-400"><Check className="w-4 h-4 text-gray-600" /> 커뮤니티 방 만들기 <span className="ml-auto text-xs">1개</span></li>
                    <li className="flex items-center gap-3 text-sm text-gray-400"><Check className="w-4 h-4 text-gray-600" /> 커뮤니티 초대하기 <span className="ml-auto text-xs">5명</span></li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-400 border-b border-white/10 pb-2">온톨로지 분석</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-blue-400" /> 노드 사이즈</li>
                    <li className="flex items-center gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-blue-400" /> 다중선택</li>
                    <li className="flex items-center gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-blue-400" /> 증권 - 테마</li>
                    <li className="flex items-center gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-blue-400" /> 노드 형태</li>
                    <li className="flex items-center gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-blue-400" /> 증권 - 산업분류</li>
                    <li className="flex items-center gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-blue-400" /> 클러스터링</li>
                    <li className="flex items-center gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-blue-400" /> 선택 노드 추출</li>
                    <li className="flex items-center gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-blue-400" /> Graph 문서</li>
                    <li className="flex items-center gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-blue-400" /> 확장 - 축소</li>
                    <li className="flex items-center gap-3 text-sm text-gray-600"><Check className="w-4 h-4 text-gray-600" /> 데이터 추출</li>
                    <li className="flex items-center gap-3 text-sm text-gray-600"><Check className="w-4 h-4 text-gray-600" /> 필터</li>
                    <li className="flex items-center gap-3 text-sm text-gray-600"><Check className="w-4 h-4 text-gray-600" /> 투명</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-400 border-b border-white/10 pb-2">주식 분석</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-blue-400" /> GPT 주식 검색 <span className="ml-auto text-xs">50회/일</span></li>
                    <li className="flex items-center gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-blue-400" /> AI 주식 레포트 <span className="ml-auto text-xs">50회/일</span></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Business Plan */}
            <div className="bg-[#0f111a]/80 backdrop-blur-sm border border-white/5 rounded-2xl p-8 flex flex-col h-full hover:border-white/10 transition-colors">
              <div className="text-center space-y-4 mb-8">
                <h3 className="text-xl font-medium text-gray-300">Business</h3>
                <div className="flex items-center justify-center gap-1">
                  <span className="text-4xl font-bold text-white">50,000</span>
                  <span className="text-xl text-white">원</span>
                  <span className="text-gray-500 text-sm mt-2">/ 월</span>
                </div>
                <Button variant="outline" className="w-full bg-white text-black hover:bg-gray-200 mt-4 rounded-lg">
                  변경하기
                </Button>
              </div>

              <div className="space-y-8 flex-1">
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-400 border-b border-white/10 pb-2">커뮤니티</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-blue-400" /> 커뮤니티 참여</li>
                    <li className="flex items-center gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-blue-400" /> 커뮤니티 방 만들기 <span className="ml-auto text-xs">5개</span></li>
                    <li className="flex items-center gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-blue-400" /> 커뮤니티 초대하기 <span className="ml-auto text-xs">100명</span></li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-400 border-b border-white/10 pb-2">온톨로지 분석</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-blue-400" /> 노드 사이즈</li>
                    <li className="flex items-center gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-blue-400" /> 다중선택</li>
                    <li className="flex items-center gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-blue-400" /> 증권 - 테마</li>
                    <li className="flex items-center gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-blue-400" /> 노드 형태</li>
                    <li className="flex items-center gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-blue-400" /> 증권 - 산업분류</li>
                    <li className="flex items-center gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-blue-400" /> 클러스터링</li>
                    <li className="flex items-center gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-blue-400" /> 선택 노드 추출</li>
                    <li className="flex items-center gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-blue-400" /> Graph 문서</li>
                    <li className="flex items-center gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-blue-400" /> 확장 - 축소</li>
                    <li className="flex items-center gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-blue-400" /> 데이터 추출</li>
                    <li className="flex items-center gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-blue-400" /> 필터</li>
                    <li className="flex items-center gap-3 text-sm text-gray-600"><Check className="w-4 h-4 text-gray-600" /> 투명</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-400 border-b border-white/10 pb-2">주식 분석</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-blue-400" /> AI Scoring letter <span className="ml-auto text-xs">1회/주</span></li>
                    <li className="flex items-center gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-blue-400" /> GPT 주식 검색 <span className="ml-auto text-xs">무제한</span></li>
                    <li className="flex items-center gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-blue-400" /> AI 주식 레포트 <span className="ml-auto text-xs">무제한</span></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Enterprise Plan (Active) */}
            <div className="bg-[#0f111a]/80 backdrop-blur-sm border border-[#2db8a2] rounded-2xl p-8 flex flex-col h-full relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
              <div className="text-center space-y-4 mb-8">
                <h3 className="text-xl font-medium text-white">Enterprise</h3>
                <div className="flex items-center justify-center gap-1">
                  <span className="text-4xl font-bold text-white">150,000</span>
                  <span className="text-xl text-white">원</span>
                  <span className="text-gray-400 text-sm mt-2">/ 월</span>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white border-0 mt-4 rounded-lg font-bold hover:opacity-90">
                  적용 중
                </Button>
              </div>

              <div className="space-y-8 flex-1">
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-400 border-b border-white/10 pb-2">커뮤니티</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm text-gray-200"><Check className="w-4 h-4 text-blue-400" /> 커뮤니티 참여</li>
                    <li className="flex items-center gap-3 text-sm text-gray-200"><Check className="w-4 h-4 text-blue-400" /> 커뮤니티 방 만들기 <span className="ml-auto text-xs text-gray-400">20개</span></li>
                    <li className="flex items-center gap-3 text-sm text-gray-200"><Check className="w-4 h-4 text-blue-400" /> 커뮤니티 초대하기 <span className="ml-auto text-xs text-gray-400">300명</span></li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-400 border-b border-white/10 pb-2">온톨로지 분석</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm text-gray-200"><Check className="w-4 h-4 text-blue-400" /> 노드 사이즈</li>
                    <li className="flex items-center gap-3 text-sm text-gray-200"><Check className="w-4 h-4 text-blue-400" /> 다중선택</li>
                    <li className="flex items-center gap-3 text-sm text-gray-200"><Check className="w-4 h-4 text-blue-400" /> 증권 - 테마</li>
                    <li className="flex items-center gap-3 text-sm text-gray-200"><Check className="w-4 h-4 text-blue-400" /> 노드 형태</li>
                    <li className="flex items-center gap-3 text-sm text-gray-200"><Check className="w-4 h-4 text-blue-400" /> 증권 - 산업분류</li>
                    <li className="flex items-center gap-3 text-sm text-gray-200"><Check className="w-4 h-4 text-blue-400" /> 클러스터링</li>
                    <li className="flex items-center gap-3 text-sm text-gray-200"><Check className="w-4 h-4 text-blue-400" /> 선택 노드 추출</li>
                    <li className="flex items-center gap-3 text-sm text-gray-200"><Check className="w-4 h-4 text-blue-400" /> Graph 문서</li>
                    <li className="flex items-center gap-3 text-sm text-gray-200"><Check className="w-4 h-4 text-blue-400" /> 확장 - 축소</li>
                    <li className="flex items-center gap-3 text-sm text-gray-200"><Check className="w-4 h-4 text-blue-400" /> 데이터 추출</li>
                    <li className="flex items-center gap-3 text-sm text-gray-200"><Check className="w-4 h-4 text-blue-400" /> 필터</li>
                    <li className="flex items-center gap-3 text-sm text-gray-200"><Check className="w-4 h-4 text-blue-400" /> 투명</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-400 border-b border-white/10 pb-2">주식 분석</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm text-gray-200"><Check className="w-4 h-4 text-blue-400" /> AI Scoring letter <span className="ml-auto text-xs text-gray-400">1회/주</span></li>
                    <li className="flex items-center gap-3 text-sm text-gray-200"><Check className="w-4 h-4 text-blue-400" /> GPT 주식 검색 <span className="ml-auto text-xs text-gray-400">무제한</span></li>
                    <li className="flex items-center gap-3 text-sm text-gray-200"><Check className="w-4 h-4 text-blue-400" /> AI 주식 레포트 <span className="ml-auto text-xs text-gray-400">무제한</span></li>
                    <li className="flex items-center gap-3 text-sm text-gray-200"><Check className="w-4 h-4 text-blue-400" /> 모멘텀 분석 기능 <span className="ml-auto text-xs text-gray-400">무제한</span></li>
                    <li className="flex items-center gap-3 text-sm text-gray-200"><Check className="w-4 h-4 text-blue-400" /> 시장 분석 기능 <span className="ml-auto text-xs text-gray-400">무제한</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center text-xs text-gray-500 pt-8 border-t border-white/5">
            <p>Illunex, Inc. is registered for sales tax purposes in certain countries. As a result, depending on your location, a sales tax could be added to your final bill.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
