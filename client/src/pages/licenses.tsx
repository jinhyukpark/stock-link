import DashboardLayout from "@/components/layout/DashboardLayout";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function LicensesPage() {
  return (
    <DashboardLayout>
      <div className="min-h-screen py-16 px-4 relative overflow-hidden bg-[#0B0E14]">
        {/* Background abstract elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto space-y-16 relative z-10">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">요금제 안내</h1>
            <p className="text-gray-400 text-lg">증권 관계 분석부터 AI 분석까지, 최적의 플랜을 선택하세요.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Guest Plan */}
            <div className="bg-[#151921] border border-white/10 rounded-2xl p-8 flex flex-col h-full hover:border-white/20 transition-all hover:translate-y-[-4px] shadow-lg">
              <div className="text-center space-y-4 mb-8 pb-8 border-b border-white/5">
                <div className="flex justify-center items-center h-8">
                  <span className="text-xs font-semibold bg-white/5 text-gray-400 px-3 py-1 rounded-full border border-white/10">Free</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Guest</h3>
                <div className="flex items-center justify-center gap-2 pt-2">
                  <span className="text-4xl font-bold text-white">0</span>
                  <span className="text-xl text-gray-400 font-normal">원 / 월</span>
                </div>
                <div className="text-sm text-gray-500 pb-2">기본적인 분석 기능 체험</div>
                <div className="w-full flex items-center justify-center bg-[#1e2330] text-white border border-white/10 mt-4 rounded-xl py-4 font-medium cursor-pointer hover:bg-[#2a303f] transition-colors">
                  현재 플랜
                </div>
              </div>

              <div className="space-y-8 flex-1">
                <div className="space-y-4">
                  <div className="flex items-baseline gap-2">
                    <h4 className="text-sm font-bold text-gray-300">커뮤니티</h4>
                    <span className="text-[10px] text-gray-500">(정식버전 제공 예정)</span>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-sm text-gray-500"><X className="w-4 h-4 text-gray-600 mt-0.5 shrink-0" /> <span>커뮤니티 참여</span></li>
                    <li className="flex items-start justify-between gap-3 text-sm text-gray-500"><div className="flex gap-3"><X className="w-4 h-4 text-gray-600 mt-0.5 shrink-0" /> <span>커뮤니티 방 만들기</span></div> <span className="font-medium">1개</span></li>
                    <li className="flex items-start justify-between gap-3 text-sm text-gray-500"><div className="flex gap-3"><X className="w-4 h-4 text-gray-600 mt-0.5 shrink-0" /> <span>커뮤니티 초대하기</span></div> <span className="font-medium">5명</span></li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-300">온톨로지 분석</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-white mt-0.5 shrink-0" /> <span>노드 사이즈</span></li>
                    <li className="flex items-start gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-white mt-0.5 shrink-0" /> <span>타임라인</span></li>
                    <li className="flex items-start gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-white mt-0.5 shrink-0" /> <span>증권 - 테마</span></li>
                    <li className="flex items-start gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-white mt-0.5 shrink-0" /> <span>노드 형태</span></li>
                    <li className="flex items-start gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-white mt-0.5 shrink-0" /> <span>증권 - 산업분류</span></li>
                    <li className="flex items-start gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-white mt-0.5 shrink-0" /> <span>클러스터링</span></li>
                    <li className="flex items-start gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-white mt-0.5 shrink-0" /> <span>선택 노드 추출</span></li>
                    <li className="flex items-start gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-white mt-0.5 shrink-0" /> <span>Graph 분석</span></li>
                    <li className="flex items-start gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-white mt-0.5 shrink-0" /> <span>확장 · 축소</span></li>
                    <li className="flex items-start gap-3 text-sm text-gray-500"><X className="w-4 h-4 text-gray-600 mt-0.5 shrink-0" /> <span>데이터 추출</span></li>
                    <li className="flex items-start gap-3 text-sm text-gray-500"><X className="w-4 h-4 text-gray-600 mt-0.5 shrink-0" /> <span>필터</span></li>
                    <li className="flex items-start gap-3 text-sm text-gray-500"><X className="w-4 h-4 text-gray-600 mt-0.5 shrink-0" /> <span>투명</span></li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-300">주식 분석</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start justify-between gap-3 text-sm text-gray-300"><div className="flex gap-3"><Check className="w-4 h-4 text-white mt-0.5 shrink-0" /> <span>GPT 주식 검색</span></div> <span className="font-medium text-gray-400">50회 / 월</span></li>
                    <li className="flex items-start justify-between gap-3 text-sm text-gray-300"><div className="flex gap-3"><Check className="w-4 h-4 text-white mt-0.5 shrink-0" /> <span>AI 주식 레포트</span></div> <span className="font-medium text-gray-400">50회 / 월</span></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Business Plan */}
            <div className="bg-[#151921] border border-white/10 rounded-2xl p-8 flex flex-col h-full hover:border-white/20 transition-all hover:translate-y-[-4px] shadow-lg">
              <div className="text-center space-y-4 mb-8 pb-8 border-b border-white/5">
                <div className="flex justify-center items-center h-8">
                  <span className="text-xs font-semibold bg-transparent text-transparent px-3 py-1 rounded-full border border-transparent"></span>
                </div>
                <h3 className="text-2xl font-bold text-white">Business</h3>
                <div className="flex items-center justify-center gap-2 pt-2">
                  <span className="text-4xl font-bold text-white">50,000</span>
                  <span className="text-xl text-gray-400 font-normal">원 / 월</span>
                </div>
                <div className="text-sm text-gray-500 pb-2">&nbsp;</div>
                <div className="w-full flex items-center justify-center bg-white text-black hover:bg-gray-200 mt-4 rounded-xl py-4 font-medium cursor-pointer transition-colors">
                  변경하기
                </div>
              </div>

              <div className="space-y-8 flex-1">
                <div className="space-y-4">
                  <div className="flex items-baseline gap-2">
                    <h4 className="text-sm font-bold text-gray-300">커뮤니티</h4>
                    <span className="text-[10px] text-gray-500">(정식버전 제공 예정)</span>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-sm text-gray-500"><X className="w-4 h-4 text-gray-600 mt-0.5 shrink-0" /> <span>커뮤니티 참여</span></li>
                    <li className="flex items-start justify-between gap-3 text-sm text-gray-500"><div className="flex gap-3"><X className="w-4 h-4 text-gray-600 mt-0.5 shrink-0" /> <span>커뮤니티 방 만들기</span></div> <span className="font-medium">5개</span></li>
                    <li className="flex items-start justify-between gap-3 text-sm text-gray-500"><div className="flex gap-3"><X className="w-4 h-4 text-gray-600 mt-0.5 shrink-0" /> <span>커뮤니티 초대하기</span></div> <span className="font-medium">100명</span></li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-300">온톨로지 분석</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-white mt-0.5 shrink-0" /> <span>노드 사이즈</span></li>
                    <li className="flex items-start gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-white mt-0.5 shrink-0" /> <span>타임라인</span></li>
                    <li className="flex items-start gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-white mt-0.5 shrink-0" /> <span>증권 - 테마</span></li>
                    <li className="flex items-start gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-white mt-0.5 shrink-0" /> <span>노드 형태</span></li>
                    <li className="flex items-start gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-white mt-0.5 shrink-0" /> <span>증권 - 산업분류</span></li>
                    <li className="flex items-start gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-white mt-0.5 shrink-0" /> <span>클러스터링</span></li>
                    <li className="flex items-start gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-white mt-0.5 shrink-0" /> <span>선택 노드 추출</span></li>
                    <li className="flex items-start gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-white mt-0.5 shrink-0" /> <span>Graph 분석</span></li>
                    <li className="flex items-start gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-white mt-0.5 shrink-0" /> <span>확장 · 축소</span></li>
                    <li className="flex items-start gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-white mt-0.5 shrink-0" /> <span>데이터 추출</span></li>
                    <li className="flex items-start gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-white mt-0.5 shrink-0" /> <span>필터</span></li>
                    <li className="flex items-start gap-3 text-sm text-gray-500"><X className="w-4 h-4 text-gray-600 mt-0.5 shrink-0" /> <span>투명</span></li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-300">주식 분석</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start justify-between gap-3 text-sm text-gray-300"><div className="flex gap-3"><Check className="w-4 h-4 text-white mt-0.5 shrink-0" /> <span>AI Scoring letter</span></div> <span className="font-medium text-gray-400">1회/주</span></li>
                    <li className="flex items-start justify-between gap-3 text-sm text-gray-300"><div className="flex gap-3"><Check className="w-4 h-4 text-white mt-0.5 shrink-0" /> <span>GPT 주식 검색</span></div> <span className="font-medium text-gray-400">무제한</span></li>
                    <li className="flex items-start justify-between gap-3 text-sm text-gray-300"><div className="flex gap-3"><Check className="w-4 h-4 text-white mt-0.5 shrink-0" /> <span>AI 주식 레포트</span></div> <span className="font-medium text-gray-400">무제한</span></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Enterprise Plan (Active) */}
            <div className="bg-[#151921] border-2 border-[#7EE7D2] rounded-2xl p-8 flex flex-col h-full relative overflow-hidden shadow-[0_0_30px_rgba(126,231,210,0.15)] md:-translate-y-2">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-[#7EE7D2]"></div>
              
              <div className="text-center space-y-4 mb-8 pb-8 border-b border-white/5">
                <div className="flex justify-center items-center h-8">
                  <span className="text-xs font-bold bg-[#7EE7D2]/10 text-[#7EE7D2] px-3 py-1 rounded-full border border-[#7EE7D2]/30 uppercase tracking-wider">Premium</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Enterprise</h3>
                <div className="flex items-center justify-center gap-2 pt-2">
                  <span className="text-4xl font-bold text-white">150,000</span>
                  <span className="text-xl text-gray-400 font-normal">원 / 월</span>
                </div>
                <div className="text-sm text-gray-500 pb-2">기업 및 기관을 위한 최고급 플랜</div>
                <div className="w-full flex items-center justify-center bg-gradient-to-r from-[#7EE7D2] to-[#3b82f6] text-[#0B0E14] mt-4 rounded-xl py-4 font-bold shadow-[0_0_15px_rgba(126,231,210,0.4)]">
                  적용 중
                </div>
              </div>

              <div className="space-y-8 flex-1">
                <div className="space-y-4">
                  <div className="flex items-baseline gap-2">
                    <h4 className="text-sm font-bold text-white">커뮤니티</h4>
                    <span className="text-[10px] text-gray-500">(정식버전 제공 예정)</span>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-sm text-gray-500"><X className="w-4 h-4 text-gray-600 mt-0.5 shrink-0" /> <span>커뮤니티 참여</span></li>
                    <li className="flex items-start justify-between gap-3 text-sm text-gray-500"><div className="flex gap-3"><X className="w-4 h-4 text-gray-600 mt-0.5 shrink-0" /> <span>커뮤니티 방 만들기</span></div> <span className="font-medium">20개</span></li>
                    <li className="flex items-start justify-between gap-3 text-sm text-gray-500"><div className="flex gap-3"><X className="w-4 h-4 text-gray-600 mt-0.5 shrink-0" /> <span>커뮤니티 초대하기</span></div> <span className="font-medium">200명</span></li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-white">온톨로지 분석</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-sm text-gray-200"><Check className="w-4 h-4 text-[#7EE7D2] mt-0.5 shrink-0" /> <span>노드 사이즈</span></li>
                    <li className="flex items-start gap-3 text-sm text-gray-200"><Check className="w-4 h-4 text-[#7EE7D2] mt-0.5 shrink-0" /> <span>타임라인</span></li>
                    <li className="flex items-start gap-3 text-sm text-gray-200"><Check className="w-4 h-4 text-[#7EE7D2] mt-0.5 shrink-0" /> <span>증권 - 테마</span></li>
                    <li className="flex items-start gap-3 text-sm text-gray-200"><Check className="w-4 h-4 text-[#7EE7D2] mt-0.5 shrink-0" /> <span>노드 형태</span></li>
                    <li className="flex items-start gap-3 text-sm text-gray-200"><Check className="w-4 h-4 text-[#7EE7D2] mt-0.5 shrink-0" /> <span>증권 - 산업분류</span></li>
                    <li className="flex items-start gap-3 text-sm text-gray-200"><Check className="w-4 h-4 text-[#7EE7D2] mt-0.5 shrink-0" /> <span>클러스터링</span></li>
                    <li className="flex items-start gap-3 text-sm text-gray-200"><Check className="w-4 h-4 text-[#7EE7D2] mt-0.5 shrink-0" /> <span>선택 노드 추출</span></li>
                    <li className="flex items-start gap-3 text-sm text-gray-200"><Check className="w-4 h-4 text-[#7EE7D2] mt-0.5 shrink-0" /> <span>Graph 분석</span></li>
                    <li className="flex items-start gap-3 text-sm text-gray-200"><Check className="w-4 h-4 text-[#7EE7D2] mt-0.5 shrink-0" /> <span>확장 · 축소</span></li>
                    <li className="flex items-start gap-3 text-sm text-gray-200"><Check className="w-4 h-4 text-[#7EE7D2] mt-0.5 shrink-0" /> <span>데이터 추출</span></li>
                    <li className="flex items-start gap-3 text-sm text-gray-200"><Check className="w-4 h-4 text-[#7EE7D2] mt-0.5 shrink-0" /> <span>필터</span></li>
                    <li className="flex items-start gap-3 text-sm text-gray-200"><Check className="w-4 h-4 text-[#7EE7D2] mt-0.5 shrink-0" /> <span>투명</span></li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-white">주식 분석</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start justify-between gap-3 text-sm text-gray-200"><div className="flex gap-3"><Check className="w-4 h-4 text-[#7EE7D2] mt-0.5 shrink-0" /> <span>AI Scoring letter</span></div> <span className="font-medium text-[#7EE7D2]">1회/주</span></li>
                    <li className="flex items-start justify-between gap-3 text-sm text-gray-200"><div className="flex gap-3"><Check className="w-4 h-4 text-[#7EE7D2] mt-0.5 shrink-0" /> <span>GPT 주식 검색</span></div> <span className="font-medium text-[#7EE7D2]">무제한</span></li>
                    <li className="flex items-start justify-between gap-3 text-sm text-gray-200"><div className="flex gap-3"><Check className="w-4 h-4 text-[#7EE7D2] mt-0.5 shrink-0" /> <span>AI 주식 레포트</span></div> <span className="font-medium text-[#7EE7D2]">무제한</span></li>
                    <li className="flex items-start justify-between gap-3 text-sm text-gray-200"><div className="flex gap-3"><Check className="w-4 h-4 text-[#7EE7D2] mt-0.5 shrink-0" /> <span>모멘텀 분석 기능</span></div> <span className="font-medium text-[#7EE7D2]">무제한</span></li>
                    <li className="flex items-start justify-between gap-3 text-sm text-gray-200"><div className="flex gap-3"><Check className="w-4 h-4 text-[#7EE7D2] mt-0.5 shrink-0" /> <span>시장 분석 기능</span></div> <span className="font-medium text-[#7EE7D2]">무제한</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center text-xs text-gray-500 pt-12 pb-8">
            <p>StockLink, Inc. is registered for sales tax purposes in certain countries. As a result, depending on your location, a sales tax could be added to your final bill.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
