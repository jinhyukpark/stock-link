import { Link, useLocation } from "wouter";
import { LayoutDashboard, LineChart, PieChart, Newspaper, Users, Settings, LogOut, Search, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: LineChart, label: "Stock", href: "/stock" },
    { icon: PieChart, label: "Analysis", href: "/analysis" },
    { icon: Newspaper, label: "News", href: "/news" },
    { icon: Users, label: "Community", href: "/community" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-sidebar flex flex-col fixed h-full z-20 hidden md:flex">
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <LineChart className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xl font-bold font-display tracking-tight text-sidebar-foreground">
              StockLink<span className="text-primary text-xs align-top ml-1">BETA</span>
            </span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <a className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                  isActive 
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-[0_0_20px_rgba(59,130,246,0.3)]" 
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}>
                  <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-muted-foreground group-hover:text-sidebar-accent-foreground")} />
                  <span className="font-medium">{item.label}</span>
                </a>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border space-y-2">
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </Button>
          <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10">
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <header className="h-16 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-10 px-6 flex items-center justify-between">
          <div className="flex-1 max-w-xl relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search specific stocks, ETFs, news..." 
              className="pl-10 bg-secondary/50 border-transparent focus:bg-background transition-all"
            />
          </div>

          <div className="flex items-center gap-4 ml-4">
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse" />
            </Button>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">Alex Morgan</p>
                <p className="text-xs text-muted-foreground">Pro Member</p>
              </div>
              <Avatar className="h-9 w-9 border border-border">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>AM</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <div className="p-6 md:p-8 space-y-8 animate-in fade-in duration-500">
          {children}
        </div>
      </main>
    </div>
  );
}