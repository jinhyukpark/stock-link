import DashboardLayout from "@/components/layout/DashboardLayout";
import { Link } from "wouter";

export default function SitemapPage() {
  const routes = [
    { path: "/", name: "대시보드 (Dashboard)", description: "메인 요약 및 주요 지표" },
    { path: "/stock", name: "종목 분석 (Stock)", description: "개별 종목 상세 분석 및 차트" },
    { path: "/insight", name: "인사이트 (Insight)", description: "시장 맵, 종목 비교, 테마 분석" },
    { path: "/market", name: "시장 분석 (Market)", description: "시장 전체 동향 및 지수 분석" },
    { path: "/social", name: "소셜 & 뉴스 (Social)", description: "종목 관련 뉴스 및 소셜 데이터" },
    { path: "/ontology", name: "온톨로지 (Ontology)", description: "종목 간 연관성 및 테마 네트워크" },
    { path: "/analysis", name: "모멘텀 분석 (Momentum)", description: "수급 및 모멘텀 지표 분석" },
    { path: "/community", name: "커뮤니티 (Community)", description: "투자자 소통 및 의견 공유" },
    { path: "/mypage", name: "마이페이지 (My Page)", description: "개인 설정 및 포트폴리오 관리" },
    { path: "/subscription", name: "구독 관리 (Subscription)", description: "멤버십 및 결제 관리" },
    { path: "/licenses", name: "라이선스/플랜 (Licenses)", description: "요금제 및 제공 기능 상세 안내" },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-6 space-y-8 animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">사이트맵</h1>
          <p className="text-gray-400">StockLink의 모든 페이지를 한눈에 확인하세요.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {routes.map((route) => (
            <Link key={route.path} href={route.path}>
              <a className="block p-6 rounded-xl border border-white/5 bg-[#0F1218] hover:bg-white/5 hover:border-primary/50 transition-all group">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                    {route.name}
                  </h2>
                  <span className="text-xs font-mono text-gray-500 bg-black/50 px-2 py-1 rounded">
                    {route.path}
                  </span>
                </div>
                <p className="text-sm text-gray-400">
                  {route.description}
                </p>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
