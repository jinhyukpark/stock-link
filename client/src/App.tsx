import { Switch, Route, Router as WouterRouter } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";

import MarketAnalysis from "@/pages/market";
import MomentumPage from "@/pages/momentum";
import StockPage from "@/pages/stock";
import OntologyPage from "@/pages/ontology";
import CommunityPage from "@/pages/community";
import MyPage from "@/pages/mypage";
import SocialPage from "@/pages/social";
import SubscriptionPage from "@/pages/subscription";

function Router() {
  return (
    <WouterRouter hook={useHashLocation}>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/stock" component={StockPage} />
        <Route path="/market" component={MarketAnalysis} />
        <Route path="/social" component={SocialPage} />
        <Route path="/ontology" component={OntologyPage} />
        <Route path="/analysis" component={MomentumPage} />
        <Route path="/community" component={CommunityPage} />
        <Route path="/mypage" component={MyPage} />
        <Route path="/subscription" component={SubscriptionPage} />
        {/* Fallback to 404 */}
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;