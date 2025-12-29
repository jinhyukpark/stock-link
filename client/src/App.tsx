import { Switch, Route } from "wouter";
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

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/stock" component={StockPage} />
      <Route path="/market" component={MarketAnalysis} />
      <Route path="/ontology" component={OntologyPage} />
      <Route path="/analysis" component={MomentumPage} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
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