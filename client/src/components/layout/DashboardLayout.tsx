import { Link, useLocation } from "wouter";
import { LayoutDashboard, LineChart, PieChart, Newspaper, Users, Settings, LogOut, Search, Bell, Menu, Network, User, CreditCard, Lock, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: LineChart, label: "Stock", href: "/stock" },
    { icon: PieChart, label: "Momentum", href: "/analysis" },
    { icon: Newspaper, label: "Market", href: "/market" },
    { icon: Network, label: "Ontology", href: "/ontology" },
    { icon: Users, label: "Community", href: "/community" },
  ];

  const NavContent = ({ className, vertical = false }: { className?: string, vertical?: boolean }) => (
    <nav className={cn("flex gap-1", vertical ? "flex-col" : "items-center", className)}>
      {navItems.map((item) => {
        const isActive = location === item.href;
        return (
          <Link key={item.href} href={item.href}>
            <a className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 text-sm font-medium",
              isActive 
                ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(59,130,246,0.5)]" 
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
              vertical && "w-full justify-start rounded-lg px-4 py-3"
            )}>
              <item.icon className={cn("w-4 h-4", isActive ? "text-white" : "text-muted-foreground")} />
              <span>{item.label}</span>
            </a>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* Header */}
      <header className="h-16 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50 px-6 flex items-center justify-between">
        {/* Left: Logo & Search */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <LineChart className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xl font-bold font-display tracking-tight hidden md:block">
              StockLink<span className="text-primary text-xs align-top ml-1">BETA</span>
            </span>
          </div>

          <div className="relative hidden md:block w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search..." 
              className="pl-9 h-9 bg-secondary/50 border-transparent focus:bg-background transition-all text-sm rounded-full"
            />
          </div>

          <div className="flex items-center gap-3">
             <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-500/10 rounded-full border border-green-500/20">
                <span className="flex h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-[10px] text-green-500 font-bold uppercase">Open</span>
             </div>
             <span className="text-[10px] font-mono text-muted-foreground/80">2024-12-29 20:55 KST</span>
          </div>
        </div>

        {/* Right: Navigation & User */}
        <div className="flex items-center gap-4">
          {/* Desktop Navigation */}
          <div className="hidden md:block mr-4">
             <NavContent />
          </div>

          <div className="flex items-center gap-3 pl-4 border-l border-border/50">
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground h-9 w-9">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="hidden sm:flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                  <div className="text-right">
                    <p className="text-sm font-medium leading-none mb-1">Alex Morgan</p>
                    <div className="flex justify-end">
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-primary/20 text-primary border border-primary/30 leading-none tracking-widest uppercase">
                            PRO
                        </span>
                    </div>
                  </div>
                  <Avatar className="h-8 w-8 border border-border">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>AM</AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-[#0B0E14] border-white/10 text-white" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Alex Morgan</p>
                    <p className="text-xs leading-none text-gray-400">alex.morgan@stocklink.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <Link href="/mypage">
                  <DropdownMenuItem className="focus:bg-white/10 focus:text-white cursor-pointer group">
                    <User className="mr-2 h-4 w-4 text-gray-400 group-hover:text-white" />
                    <span>내 정보</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/mypage">
                  <DropdownMenuItem className="focus:bg-white/10 focus:text-white cursor-pointer group">
                    <CreditCard className="mr-2 h-4 w-4 text-gray-400 group-hover:text-white" />
                    <span>결제 내역</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/mypage">
                  <DropdownMenuItem className="focus:bg-white/10 focus:text-white cursor-pointer group">
                    <Crown className="mr-2 h-4 w-4 text-yellow-500 group-hover:text-yellow-400" />
                    <span>구독 관리</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator className="bg-white/10" />
                <Link href="/mypage">
                  <DropdownMenuItem className="focus:bg-white/10 focus:text-white cursor-pointer group">
                    <Settings className="mr-2 h-4 w-4 text-gray-400 group-hover:text-white" />
                    <span>설정</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem className="focus:bg-red-500/10 focus:text-red-400 text-red-400 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>로그아웃</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Trigger */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] border-l border-border bg-background/95 backdrop-blur-xl">
                 <div className="flex flex-col gap-6 mt-6">
                    <div className="px-2 mb-4">
                      <span className="text-xl font-bold font-display tracking-tight">
                        StockLink
                      </span>
                    </div>
                    <NavContent vertical />
                    <div className="border-t border-border pt-6 space-y-2">
                      <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
                        <Settings className="w-4 h-4 mr-3" />
                        Settings
                      </Button>
                      <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10">
                        <LogOut className="w-4 h-4 mr-3" />
                        Logout
                      </Button>
                    </div>
                 </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden bg-[#0B0E14]">
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}