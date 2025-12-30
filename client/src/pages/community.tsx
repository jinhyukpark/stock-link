import DashboardLayout from "@/components/layout/DashboardLayout";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { 
  Hash, 
  Volume2, 
  Settings, 
  Mic, 
  Headphones, 
  Plus, 
  MessageSquare, 
  Users, 
  Search, 
  Bell, 
  Pin, 
  Inbox, 
  HelpCircle,
  Gift,
  Smile,
  Sticker,
  Image as ImageIcon,
  MoreVertical,
  Reply,
  Edit2,
  Trash2,
  LogOut,
  Crown,
  Shield,
  User,
  MoreHorizontal,
  X,
  Vote,
  BarChart2,
  Megaphone,
  Globe,
  TrendingUp,
  Activity,
  Star,
  Filter
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";
import { motion } from "framer-motion";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

import stockAnalysisImage from '@assets/stock_images/stock_market_analysi_5b45eee1.jpg';

// --- Mock Data ---

const featuredCommunities: Community[] = [
  {
    id: '1',
    name: 'StockLink Official',
    description: '공식 StockLink 커뮤니티입니다. 공지사항과 일반적인 토론이 이루어집니다.',
    members: 12540,
    online: 1240,
    image: stockAnalysisImage,
    tags: ['Official', 'General', 'News'],
    isFavorite: false,
    leader: {
      name: "StockLink Team",
      avatar: "https://github.com/shadcn.png"
    }
  },
  {
    id: 'featured-2',
    name: 'Global Macro Insight',
    description: '전 세계 거시경제 흐름과 주요 지표를 심층 분석하는 프리미엄 커뮤니티입니다.',
    members: 8900,
    online: 450,
    image: 'https://images.unsplash.com/photo-1611974765270-ca1258634369?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    tags: ['Global', 'Macro', 'Premium'],
    isFavorite: false,
    leader: {
      name: "Dr. Macro",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
    }
  },
  {
    id: 'featured-3',
    name: 'Quant Strategy Lab',
    description: '데이터 기반 퀀트 투자 전략을 연구하고 백테스팅 결과를 공유합니다.',
    members: 3200,
    online: 210,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    tags: ['Quant', 'Data', 'Strategy'],
    isFavorite: false,
    leader: {
      name: "Algorithm Ace",
      avatar: "https://i.pravatar.cc/150?u=a04258114e29026302d"
    }
  }
];


type UserStatus = 'online' | 'idle' | 'dnd' | 'offline';

interface Community {
  id: string;
  name: string;
  description: string;
  members: number;
  online: number;
  image: string;
  tags: string[];
  isFavorite?: boolean;
  leader?: {
    name: string;
    avatar: string;
  };
}

const mockCommunities: Community[] = [
  {
    id: '1',
    name: 'StockLink Official',
    description: '공식 StockLink 커뮤니티입니다. 공지사항과 일반적인 토론이 이루어집니다.',
    members: 12540,
    online: 1240,
    image: stockAnalysisImage,
    tags: ['Official', 'General', 'News'],
    isFavorite: true
  },
  {
    id: '2',
    name: '단타 스캘핑 연구소',
    description: '초단타 매매 기법을 공유하고 실시간으로 타점을 분석하는 방입니다.',
    members: 3420,
    online: 850,
    image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    tags: ['Trading', 'Scalping', 'High Risk'],
    isFavorite: false
  },
  {
    id: '3',
    name: '장기투자 가치투자',
    description: '10년 뒤를 바라보는 가치투자자들의 모임. 재무제표 분석 위주.',
    members: 8900,
    online: 420,
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    tags: ['Long-term', 'Value', 'Analysis'],
    isFavorite: false
  },
  {
    id: '4',
    name: '비트코인 & 알트코인',
    description: '암호화폐 시장 분석 및 정보 공유. 24시간 잠들지 않는 곳.',
    members: 15600,
    online: 3200,
    image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    tags: ['Crypto', 'Bitcoin', 'Altcoins'],
    isFavorite: true
  },
  {
    id: '5',
    name: '미국주식 나스닥',
    description: '애플, 테슬라, 엔비디아 등 미국 우량주 투자 토론.',
    members: 5600,
    online: 150,
    image: 'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    tags: ['US Stock', 'Nasdaq', 'Tech'],
    isFavorite: false
  },
  {
    id: '6',
    name: '부동산 경매',
    description: '부동산 경매 정보 공유 및 권리 분석 토론.',
    members: 2100,
    online: 80,
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    tags: ['Real Estate', 'Auction'],
    isFavorite: false
  },
  {
    id: '7',
    name: '차트 기술적 분석',
    description: '엘리어트 파동, 보조지표 등 차트 분석 기법 연구.',
    members: 4500,
    online: 600,
    image: 'https://images.unsplash.com/photo-1611974765270-ca1258634369?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    tags: ['Chart', 'Analysis', 'Technical'],
    isFavorite: false
  },
  {
    id: '8',
    name: '배당주 투자',
    description: '매달 월세받는 배당 포트폴리오 만들기.',
    members: 6200,
    online: 300,
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    tags: ['Dividend', 'Passive Income'],
    isFavorite: false
  },
  {
    id: '9',
    name: '공모주 청약',
    description: '따상 기원! 신규 상장주 청약 정보 공유.',
    members: 3800,
    online: 1200,
    image: 'https://images.unsplash.com/photo-1611974765270-ca1258634369?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    tags: ['IPO', 'New Listing'],
    isFavorite: false
  }
];

interface User {
  id: string;
  name: string;
  avatar: string;
  status: UserStatus;
  role: 'admin' | 'moderator' | 'user';
  bio?: string;
}

interface Message {
  id: string;
  userId: string;
  content: string;
  timestamp: Date;
  reactions?: { emoji: string; count: number }[];
  replyTo?: string;
}

interface Channel {
  id: string;
  name: string;
  type: 'text' | 'voice' | 'announcement';
  category: string;
  unread?: number;
  locked?: boolean;
}

interface Poll {
  id: string;
  question: string;
  options: { id: string; text: string; votes: number }[];
  totalVotes: number;
  createdBy: string;
  active: boolean;
  userVoted?: string; // optionId
}

const mockUsers: User[] = [
  { id: '1', name: 'Alex Morgan', avatar: 'https://github.com/shadcn.png', status: 'online', role: 'admin', bio: 'StockLink Lead Developer' },
  { id: '2', name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', status: 'idle', role: 'moderator', bio: 'Market Analyst' },
  { id: '3', name: 'Mike Ross', avatar: 'https://i.pravatar.cc/150?u=a04258114e29026302d', status: 'dnd', role: 'user', bio: 'Day Trader' },
  { id: '4', name: 'Jessica Pearson', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d', status: 'online', role: 'user' },
  { id: '5', name: 'Louis Litt', avatar: 'https://i.pravatar.cc/150?u=a04258a2462d826712d', status: 'offline', role: 'user' },
];

const mockChannels: Channel[] = [
  { id: '1', name: '공지사항', type: 'announcement', category: 'Information' },
  { id: '2', name: '자유게시판', type: 'text', category: 'General' },
  { id: '3', name: '주식토론', type: 'text', category: 'General', unread: 5 },
  { id: '4', name: '수익인증', type: 'text', category: 'General' },
  { id: '5', name: '시장투표', type: 'text', category: 'Analysis' },
  { id: '6', name: 'VIP-리딩방', type: 'text', category: 'VIP Zone', locked: true },
  { id: '7', name: '음성채팅', type: 'voice', category: 'Voice Channels' },
];

const initialMessages: Message[] = [
  { id: '1', userId: '2', content: '오늘 삼성전자 흐름 어떻게 보시나요?', timestamp: new Date(Date.now() - 1000 * 60 * 60) },
  { id: '2', userId: '3', content: '외국인 수급이 들어와서 긍정적으로 보고 있습니다.', timestamp: new Date(Date.now() - 1000 * 60 * 55) },
  { id: '3', userId: '1', content: '장 막판까지 지켜봐야 할 것 같아요.', timestamp: new Date(Date.now() - 1000 * 60 * 50) },
];

const initialPolls: Poll[] = [
  {
    id: 'poll-1',
    question: '오늘 코스피 지수 마감 예측',
    options: [
      { id: 'opt-1', text: '상승 마감 (+0.5% 이상)', votes: 45 },
      { id: 'opt-2', text: '보합 (-0.5% ~ +0.5%)', votes: 12 },
      { id: 'opt-3', text: '하락 마감 (-0.5% 이하)', votes: 8 },
    ],
    totalVotes: 65,
    createdBy: '1',
    active: true,
  }
];

// --- Components ---

const UserAvatar = ({ user, className }: { user: User, className?: string }) => {
  const statusColor = {
    online: 'bg-green-500',
    idle: 'bg-yellow-500',
    dnd: 'bg-red-500',
    offline: 'bg-gray-500'
  };

  return (
    <div className={cn("relative", className)}>
      <Avatar>
        <AvatarImage src={user.avatar} />
        <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
      </Avatar>
      <span className={cn("absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#0B0E14]", statusColor[user.status])} />
    </div>
  );
};

const PollCard = ({ poll, onVote, userRole }: { poll: Poll, onVote: (pollId: string, optionId: string) => void, userRole: string }) => {
  return (
    <div className="bg-[#151921] border border-primary/20 rounded-xl p-4 mb-4 max-w-md">
      <div className="flex items-center gap-2 mb-3">
        <BarChart2 className="w-5 h-5 text-primary" />
        <span className="font-bold text-sm text-gray-200">오늘의 투표</span>
        {poll.active ? (
          <Badge variant="outline" className="text-[10px] border-green-500/50 text-green-500 ml-auto">진행중</Badge>
        ) : (
          <Badge variant="outline" className="text-[10px] border-gray-500/50 text-gray-500 ml-auto">종료됨</Badge>
        )}
      </div>
      
      <h3 className="text-lg font-bold text-white mb-4">{poll.question}</h3>
      
      <div className="space-y-3">
        {poll.options.map(option => {
          const percentage = poll.totalVotes > 0 ? Math.round((option.votes / poll.totalVotes) * 100) : 0;
          const isSelected = poll.userVoted === option.id;
          
          return (
            <div 
              key={option.id} 
              className={cn(
                "relative rounded-lg overflow-hidden border transition-all cursor-pointer group",
                isSelected ? "border-primary" : "border-white/10 hover:border-white/30"
              )}
              onClick={() => !poll.userVoted && onVote(poll.id, option.id)}
            >
              {/* Progress Background */}
              <div 
                className={cn("absolute inset-0 opacity-20 transition-all duration-500", isSelected ? "bg-primary" : "bg-gray-700")} 
                style={{ width: `${percentage}%` }}
              />
              
              <div className="relative p-3 flex justify-between items-center z-10">
                <span className={cn("text-sm font-medium", isSelected ? "text-primary" : "text-gray-300")}>
                  {option.text}
                </span>
                <span className="text-xs text-gray-400 font-mono">
                  {percentage}% ({option.votes})
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
        <span>총 {poll.totalVotes}명 참여</span>
        {userRole === 'admin' && (
          <Button variant="ghost" size="sm" className="h-6 text-xs text-red-400 hover:text-red-300 px-2">투표 종료</Button>
        )}
      </div>
    </div>
  );
};

const CommunityDiscovery = ({ 
  communities, 
  onJoin,
  onToggleFavorite
}: { 
  communities: Community[], 
  onJoin: (community: Community) => void,
  onToggleFavorite: (id: string) => void 
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'favorites'>('all');
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const filteredCommunities = communities.filter(c => {
    if (activeTab === 'favorites') return c.isFavorite;
    return true;
  });

  return (
    <div className="flex-1 flex flex-col bg-[#0B0E14] overflow-hidden">
      {/* Discovery Header */}
      <div className="h-16 px-8 flex items-center justify-between border-b border-white/5 bg-[#0B0E14]/50 backdrop-blur sticky top-0 z-10">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Globe className="w-6 h-6 text-primary" />
            커뮤니티 탐색
          </h1>
          <p className="text-sm text-gray-400">관심 있는 주식/투자 커뮤니티를 찾아보세요.</p>
        </div>
        <div className="relative w-72">
          <Input 
            placeholder="커뮤니티 검색..." 
            className="bg-[#151921] border-white/10 pl-10 text-gray-200"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        </div>
      </div>

      <ScrollArea className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Tabs */}
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant={activeTab === 'all' ? "default" : "outline"}
              onClick={() => setActiveTab('all')}
              className={cn("gap-2", activeTab !== 'all' && "border-white/10 text-gray-400 hover:text-white hover:bg-white/5")}
            >
              <Globe className="w-4 h-4" />
              전체 커뮤니티
            </Button>
            <Button 
              variant={activeTab === 'favorites' ? "default" : "outline"}
              onClick={() => setActiveTab('favorites')}
              className={cn("gap-2", activeTab !== 'favorites' && "border-white/10 text-gray-400 hover:text-white hover:bg-white/5")}
            >
              <Star className={cn("w-4 h-4", activeTab === 'favorites' && "fill-current")} />
              즐겨찾기
            </Button>
          </div>

          {activeTab === 'all' && (
            <>
              {/* Featured Carousel */}
              <div className="mb-12">
                <Carousel className="w-full" opts={{ loop: true }} setApi={setApi}>
                  <CarouselContent>
                    {featuredCommunities.map((featured) => (
                      <CarouselItem key={featured.id}>
                        <div className="relative rounded-2xl overflow-hidden border border-white/10 group cursor-pointer" onClick={() => onJoin(featured)}>
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                          <img 
                            src={featured.image} 
                            className="w-full h-[300px] object-cover transition-transform duration-700 group-hover:scale-105" 
                            alt={featured.name} 
                          />
                          <div className="absolute bottom-0 left-0 p-8 z-20 max-w-2xl w-full">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className="bg-primary text-primary-foreground hover:bg-primary/90">추천 커뮤니티</Badge>
                            </div>
                            
                            {/* Leader Info & Title */}
                            <div className="flex items-end gap-4 mb-2">
                                {featured.leader && (
                                    <div className="flex flex-col gap-1 mb-1">
                                        <span className="text-[10px] text-gray-400 font-medium">Community Lead</span>
                                        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full border border-white/10">
                                            <Avatar className="w-5 h-5 border border-white/20">
                                                <AvatarImage src={featured.leader.avatar} />
                                                <AvatarFallback>{featured.leader.name[0]}</AvatarFallback>
                                            </Avatar>
                                            <span className="text-xs text-gray-200 font-medium pr-1">{featured.leader.name}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <h2 className="text-4xl font-bold text-white mb-2">{featured.name}</h2>
                            <p className="text-gray-200 text-lg mb-6 line-clamp-2">
                              {featured.description}
                            </p>
                            
                            <div className="flex items-center justify-between w-full pr-8">
                                <div className="flex items-center gap-3">
                                  <Button size="lg" className="bg-white text-black hover:bg-gray-200">
                                    <Users className="w-4 h-4 mr-2" /> 입장하기
                                  </Button>
                                  <Button 
                                    size="lg" 
                                    variant="outline" 
                                    className="bg-black/20 border-white/20 text-white hover:bg-white/10"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onToggleFavorite(featured.id);
                                    }}
                                  >
                                    <Star className="w-4 h-4 mr-2" /> 
                                    즐겨찾기 등록
                                  </Button>
                                </div>

                                <div className="flex flex-col items-end gap-1">
                                    <span className="text-xs text-gray-400 font-medium">현재 참여중인 팀원</span>
                                    <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
                                        <Users className="w-4 h-4 text-primary" />
                                        <span className="text-lg font-bold text-white tabular-nums">{featured.members.toLocaleString()}</span>
                                        <span className="text-xs text-gray-400">명</span>
                                    </div>
                                </div>
                            </div>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  
                  {/* Dots Indicator */}
                  <div className="absolute bottom-4 right-8 flex gap-2 z-30">
                    {Array.from({ length: count }).map((_, index) => (
                      <button
                        key={index}
                        className={cn(
                          "w-2 h-2 rounded-full transition-all duration-300",
                          current === index + 1 ? "bg-white w-6" : "bg-white/40 hover:bg-white/60"
                        )}
                        onClick={(e) => {
                            e.stopPropagation();
                            api?.scrollTo(index);
                        }}
                      />
                    ))}
                  </div>
                </Carousel>
              </div>

              {/* Categories */}
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                인기 커뮤니티
              </h3>
            </>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(activeTab === 'all' ? filteredCommunities.slice(1) : filteredCommunities).map((community) => (
              <motion.div 
                key={community.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#151921] border border-white/5 rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 group flex flex-col relative"
              >
                {/* Favorite Button Overlay */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(community.id);
                  }}
                  className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/50 backdrop-blur hover:bg-black/70 transition-colors"
                >
                  <Star className={cn("w-4 h-4", community.isFavorite ? "fill-yellow-500 text-yellow-500" : "text-gray-300")} />
                </button>

                <div className="h-32 overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                  <img 
                    src={community.image} 
                    alt={community.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-lg text-white group-hover:text-primary transition-colors">{community.name}</h4>
                  </div>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2 flex-1">
                    {community.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {community.tags.map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" /> {community.members.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1 text-green-500">
                        <Activity className="w-3.5 h-3.5" /> {community.online.toLocaleString()}
                      </span>
                    </div>
                    <Button size="sm" onClick={() => onJoin(community)} className="bg-white/10 hover:bg-white/20 text-white border-none">
                      입장하기
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {activeTab === 'favorites' && filteredCommunities.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-500 border border-dashed border-white/10 rounded-xl">
                <Star className="w-12 h-12 mb-4 opacity-20" />
                <p className="text-lg font-medium">즐겨찾기한 커뮤니티가 없습니다</p>
                <p className="text-sm">관심 있는 커뮤니티의 별 아이콘을 눌러 추가해보세요.</p>
                <Button variant="link" onClick={() => setActiveTab('all')} className="text-primary mt-2">
                  커뮤니티 둘러보기
                </Button>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default function CommunityPage() {
  const [viewMode, setViewMode] = useState<'chat' | 'discovery'>('discovery');
  const [communities, setCommunities] = useState<Community[]>(mockCommunities);
  const [selectedChannelId, setSelectedChannelId] = useState('3');
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [polls, setPolls] = useState<Poll[]>(initialPolls);
  const [inputText, setInputText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentUser] = useState<User>(mockUsers[0]); // Alex Morgan (Admin)
  const [isPollModalOpen, setIsPollModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const selectedChannel = mockChannels.find(c => c.id === selectedChannelId) || mockChannels[0];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, selectedChannelId]);

  const toggleFavorite = (id: string) => {
    setCommunities(prev => prev.map(c => 
      c.id === id ? { ...c, isFavorite: !c.isFavorite } : c
    ));
  };

  // If in discovery mode, render discovery component
  if (viewMode === 'discovery') {
    return (
      <DashboardLayout>
        <CommunityDiscovery 
          communities={communities}
          onJoin={(community) => {
            // In a real app, this would join the server. For now, we just switch back to chat.
            // Optionally update the server name/context here
            setViewMode('chat');
          }} 
          onToggleFavorite={toggleFavorite}
        />
      </DashboardLayout>
    );
  }

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      userId: currentUser.id,
      content: inputText,
      timestamp: new Date()
    };
    
    setMessages([...messages, newMessage]);
    setInputText("");
  };

  const handleVote = (pollId: string, optionId: string) => {
    setPolls(polls.map(poll => {
      if (poll.id === pollId) {
        return {
          ...poll,
          options: poll.options.map(opt => 
            opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
          ),
          totalVotes: poll.totalVotes + 1,
          userVoted: optionId
        };
      }
      return poll;
    }));
  };

  const handleCreatePoll = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementation for creating poll would go here
    setIsPollModalOpen(false);
  };

  const openUserProfile = (user: User) => {
    setSelectedUser(user);
    setIsProfileModalOpen(true);
  };

  // Group channels by category
  const channelsByCategory = mockChannels.reduce((acc, channel) => {
    if (!acc[channel.category]) acc[channel.category] = [];
    acc[channel.category].push(channel);
    return acc;
  }, {} as Record<string, Channel[]>);

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-4rem)] bg-[#0B0E14] text-white font-sans overflow-hidden">
        
        {/* Left Sidebar - Channels */}
        <aside className="w-[240px] flex flex-col bg-[#050505] border-r border-white/5">
          {/* Server Header */}
          <div className="h-12 flex items-center px-4 border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors shadow-sm">
            <h1 className="font-bold text-sm truncate flex-1">StockLink Official</h1>
            {currentUser.role === 'admin' && (
               <DropdownMenu>
                 <DropdownMenuTrigger asChild>
                   <Button variant="ghost" size="icon" className="h-6 w-6">
                     <MoreHorizontal className="w-4 h-4" />
                   </Button>
                 </DropdownMenuTrigger>
                 <DropdownMenuContent className="w-56 bg-[#0B0E14] border-white/10 text-gray-200">
                   <DropdownMenuLabel>서버 설정</DropdownMenuLabel>
                   <DropdownMenuSeparator className="bg-white/10" />
                   <DropdownMenuItem className="focus:bg-primary/20 focus:text-primary cursor-pointer">
                      <User className="mr-2 h-4 w-4" /> 초대하기
                   </DropdownMenuItem>
                   <DropdownMenuItem className="focus:bg-primary/20 focus:text-primary cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" /> 서버 설정
                   </DropdownMenuItem>
                   <DropdownMenuItem className="focus:bg-primary/20 focus:text-primary cursor-pointer">
                      <Plus className="mr-2 h-4 w-4" /> 채널 만들기
                   </DropdownMenuItem>
                   <DropdownMenuSeparator className="bg-white/10" />
                   <DropdownMenuItem 
                      className="focus:bg-red-500/20 focus:text-red-400 text-red-400 cursor-pointer"
                      onClick={() => setViewMode('discovery')}
                   >
                      <LogOut className="mr-2 h-4 w-4" /> 서버 나가기
                   </DropdownMenuItem>
                 </DropdownMenuContent>
               </DropdownMenu>
            )}
          </div>

          {/* Channel List */}
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-4">
              {Object.entries(channelsByCategory).map(([category, channels]) => (
                <div key={category}>
                  <div className="flex items-center justify-between px-2 mb-1 group">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider group-hover:text-gray-300 transition-colors">{category}</span>
                    <Plus className="w-3 h-3 text-gray-500 opacity-0 group-hover:opacity-100 cursor-pointer hover:text-white" />
                  </div>
                  <div className="space-y-0.5">
                    {channels.map(channel => (
                      <div 
                        key={channel.id}
                        className={cn(
                          "flex items-center px-2 py-1.5 rounded-md cursor-pointer group transition-colors",
                          selectedChannelId === channel.id ? "bg-primary/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                        )}
                        onClick={() => setSelectedChannelId(channel.id)}
                      >
                        {channel.type === 'voice' ? (
                          <Volume2 className="w-4 h-4 mr-1.5 shrink-0" />
                        ) : channel.type === 'announcement' ? (
                          <Megaphone className="w-4 h-4 mr-1.5 shrink-0" />
                        ) : (
                          <Hash className="w-4 h-4 mr-1.5 shrink-0" />
                        )}
                        
                        <span className={cn("text-sm truncate flex-1", channel.unread ? "font-bold text-white" : "")}>
                          {channel.name}
                        </span>
                        
                        {channel.locked && <Shield className="w-3 h-3 ml-1 text-gray-600" />}
                        {channel.unread && (
                          <span className="ml-auto flex h-2 w-2 rounded-full bg-primary" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* User Control Panel */}
          <div className="p-3 bg-[#030304] border-t border-white/5 flex items-center gap-2">
            <UserAvatar user={currentUser} className="w-8 h-8" />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-white truncate">{currentUser.name}</div>
              <div className="text-[10px] text-gray-400 truncate">#{currentUser.id.padStart(4, '0')}</div>
            </div>
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-sm hover:bg-white/10">
                <Mic className="w-4 h-4 text-gray-400" />
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-sm hover:bg-white/10">
                <Headphones className="w-4 h-4 text-gray-400" />
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-sm hover:bg-white/10">
                <Settings className="w-4 h-4 text-gray-400" />
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col bg-[#0B0E14] min-w-0">
          {/* Header */}
          <div className="h-12 px-4 flex items-center justify-between border-b border-white/5 shadow-sm bg-[#0B0E14]/50 backdrop-blur">
            <div className="flex items-center gap-2">
              <Hash className="w-5 h-5 text-gray-400" />
              <h2 className="font-bold text-white">{selectedChannel.name}</h2>
              {selectedChannel.category && (
                <span className="text-xs text-gray-500 hidden md:inline-block">
                  — {selectedChannel.category}
                </span>
              )}
            </div>
            <div className="flex items-center gap-4">
               {/* Poll Button - Only for Admins or in specific channels */}
               {currentUser.role === 'admin' && (
                 <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 gap-2 text-gray-400 hover:text-white"
                    onClick={() => setIsPollModalOpen(true)}
                 >
                    <Vote className="w-4 h-4" />
                    <span className="hidden sm:inline">투표 만들기</span>
                 </Button>
               )}
               
               <div className="flex items-center border-l border-white/10 pl-4 gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                    <Bell className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                    <Pin className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                    <Users className="w-4 h-4 md:hidden" />
                  </Button>
                  
                  <div className="relative w-48 hidden md:block ml-2">
                    <Input 
                      placeholder="검색하기" 
                      className="h-7 bg-[#050505] border-none text-xs pl-2 pr-8 rounded transition-all focus:w-60 focus:absolute focus:right-0 focus:z-10"
                    />
                    <Search className="absolute right-2 top-1.5 w-3.5 h-3.5 text-gray-500" />
                  </div>
               </div>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
             <div className="flex flex-col gap-6 max-w-4xl mx-auto">
               
               {/* Welcome Message */}
               <div className="mt-10 mb-8 px-4">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                     <Hash className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold text-white mb-1">#{selectedChannel.name}에 오신 것을 환영합니다!</h1>
                  <p className="text-gray-400 text-sm">이곳은 {selectedChannel.name} 채널의 시작입니다.</p>
               </div>

               {/* Polls Section (If any) */}
               {polls.filter(p => p.active).map(poll => (
                 <div key={poll.id} className="px-4">
                    <PollCard poll={poll} onVote={handleVote} userRole={currentUser.role} />
                 </div>
               ))}

               {messages.map((msg, index) => {
                 const isConsecutive = index > 0 && messages[index - 1].userId === msg.userId && (msg.timestamp.getTime() - messages[index - 1].timestamp.getTime() < 1000 * 60 * 5);
                 const user = mockUsers.find(u => u.id === msg.userId) || mockUsers[0];

                 return (
                   <div key={msg.id} className={cn("group flex px-4 hover:bg-white/[0.02] -mx-4 py-1", isConsecutive ? "mt-0.5" : "mt-4")}>
                     {!isConsecutive ? (
                       <div className="cursor-pointer" onClick={() => openUserProfile(user)}>
                         <UserAvatar user={user} className="w-10 h-10 mt-0.5" />
                       </div>
                     ) : (
                       <div className="w-10 text-[10px] text-gray-500 text-right opacity-0 group-hover:opacity-100 select-none pt-2 mr-0">
                         {format(msg.timestamp, "h:mm aa")}
                       </div>
                     )}
                     
                     <div className={cn("flex-1 min-w-0", !isConsecutive ? "ml-4" : "ml-4 pl-0")}>
                       {!isConsecutive && (
                         <div className="flex items-center gap-2 mb-1">
                           <span 
                              className="font-bold text-white text-sm hover:underline cursor-pointer"
                              onClick={() => openUserProfile(user)}
                           >
                              {user.name}
                           </span>
                           {user.role === 'admin' && (
                             <Badge variant="secondary" className="h-4 px-1 text-[9px] bg-primary/20 text-primary hover:bg-primary/20 border-primary/20 gap-0.5">
                               <Crown className="w-2.5 h-2.5" /> ADMIN
                             </Badge>
                           )}
                           {user.role === 'moderator' && (
                             <Badge variant="secondary" className="h-4 px-1 text-[9px] bg-blue-500/20 text-blue-400 hover:bg-blue-500/20 border-blue-500/20 gap-0.5">
                               <Shield className="w-2.5 h-2.5" /> MOD
                             </Badge>
                           )}
                           <span className="text-[10px] text-gray-500 ml-1">{format(msg.timestamp, "yyyy.MM.dd h:mm aa")}</span>
                         </div>
                       )}
                       <p className={cn("text-gray-200 text-sm leading-relaxed whitespace-pre-wrap break-words")}>
                          {msg.content}
                       </p>
                     </div>
                     
                     {/* Message Actions */}
                     <div className="opacity-0 group-hover:opacity-100 bg-[#0B0E14] border border-white/10 rounded-lg absolute right-4 -top-2 shadow-lg flex items-center p-0.5 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded hover:bg-white/10" title="반응 추가">
                           <Smile className="w-4 h-4 text-gray-400" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded hover:bg-white/10" title="답장">
                           <Reply className="w-4 h-4 text-gray-400" />
                        </Button>
                        {currentUser.id === msg.userId && (
                          <Button variant="ghost" size="icon" className="h-7 w-7 rounded hover:bg-white/10" title="수정">
                             <Edit2 className="w-3.5 h-3.5 text-gray-400" />
                          </Button>
                        )}
                        {currentUser.role === 'admin' && (
                          <Button variant="ghost" size="icon" className="h-7 w-7 rounded hover:bg-white/10 text-red-400 hover:text-red-400" title="삭제">
                             <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        )}
                     </div>
                   </div>
                 );
               })}
             </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 px-6 bg-[#0B0E14] shrink-0">
             <div className="bg-[#151921] rounded-lg p-3 border border-white/5 relative">
               {/* Upload & Tools */}
               <div className="absolute left-3 top-3 flex items-center gap-2">
                 <Button size="icon" variant="ghost" className="h-6 w-6 rounded-full bg-gray-600 text-white hover:bg-gray-500">
                    <Plus className="w-4 h-4" />
                 </Button>
               </div>
               
               <Textarea 
                 value={inputText}
                 onChange={(e) => setInputText(e.target.value)}
                 onKeyDown={(e) => {
                   if (e.key === 'Enter' && !e.shiftKey) {
                     e.preventDefault();
                     handleSendMessage();
                   }
                 }}
                 placeholder={`#${selectedChannel.name}에 메시지 보내기`}
                 className="min-h-[44px] max-h-[300px] w-full bg-transparent border-none focus-visible:ring-0 pl-10 pr-24 text-gray-200 resize-none py-1.5"
                 rows={1}
               />
               
               <div className="absolute right-3 top-2 flex items-center gap-1">
                 <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                    <Gift className="w-5 h-5" />
                 </Button>
                 <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                    <Sticker className="w-5 h-5" />
                 </Button>
                 <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                    <Smile className="w-5 h-5" />
                 </Button>
               </div>
             </div>
             <div className="mt-1 text-center">
                {selectedChannel.type === 'announcement' && currentUser.role !== 'admin' && (
                  <span className="text-[10px] text-gray-500">관리자만 메시지를 보낼 수 있습니다.</span>
                )}
             </div>
          </div>
        </main>

        {/* Right Sidebar - Members */}
        <aside className="w-[240px] hidden lg:flex flex-col bg-[#050505] border-l border-white/5">
          <div className="h-12 flex items-center px-4 shadow-sm">
             <h3 className="font-bold text-xs text-gray-400 uppercase tracking-wider">멤버</h3>
          </div>
          
          <ScrollArea className="flex-1 p-3">
             <div className="space-y-6">
                {/* Online */}
                <div>
                   <h4 className="px-2 mb-2 text-[10px] font-bold text-gray-500 uppercase">온라인 — {mockUsers.filter(u => u.status !== 'offline').length}</h4>
                   <div className="space-y-1">
                      {mockUsers.filter(u => u.status !== 'offline').map(user => (
                        <div 
                          key={user.id} 
                          className="flex items-center gap-3 px-2 py-1.5 rounded hover:bg-white/5 cursor-pointer opacity-90 hover:opacity-100"
                          onClick={() => openUserProfile(user)}
                        >
                           <UserAvatar user={user} className="w-8 h-8" />
                           <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                 <span className={cn("text-sm font-medium truncate", user.role === 'admin' ? "text-primary" : "text-gray-300")}>
                                   {user.name}
                                 </span>
                                 {user.role === 'admin' && <Crown className="w-3 h-3 text-primary fill-primary" />}
                                 {user.role === 'moderator' && <Shield className="w-3 h-3 text-blue-400 fill-blue-400" />}
                              </div>
                              {user.bio && (
                                <div className="text-[10px] text-gray-500 truncate">{user.bio}</div>
                              )}
                           </div>
                        </div>
                      ))}
                   </div>
                </div>

                {/* Offline */}
                <div>
                   <h4 className="px-2 mb-2 text-[10px] font-bold text-gray-500 uppercase">오프라인 — {mockUsers.filter(u => u.status === 'offline').length}</h4>
                   <div className="space-y-1">
                      {mockUsers.filter(u => u.status === 'offline').map(user => (
                        <div 
                          key={user.id} 
                          className="flex items-center gap-3 px-2 py-1.5 rounded hover:bg-white/5 cursor-pointer opacity-50 hover:opacity-80"
                          onClick={() => openUserProfile(user)}
                        >
                           <UserAvatar user={user} className="w-8 h-8 grayscale" />
                           <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                 <span className="text-sm font-medium text-gray-400 truncate">
                                   {user.name}
                                 </span>
                              </div>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </ScrollArea>
        </aside>
      </div>

      {/* --- Modals --- */}

      {/* User Profile Modal */}
      <Dialog open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen}>
        <DialogContent className="bg-[#0B0E14] border-white/10 p-0 overflow-hidden max-w-sm">
           {selectedUser && (
             <div className="relative">
                <div className="h-24 bg-primary/20"></div>
                <div className="absolute top-16 left-4 border-[6px] border-[#0B0E14] rounded-full">
                   <UserAvatar user={selectedUser} className="w-20 h-20" />
                </div>
                <div className="absolute top-2 right-2 flex gap-2">
                   {/* Admin Controls */}
                   {currentUser.role === 'admin' && selectedUser.id !== currentUser.id && (
                     <DropdownMenu>
                       <DropdownMenuTrigger asChild>
                         <Button variant="ghost" size="icon" className="h-8 w-8 bg-black/50 text-white hover:bg-black/70 rounded">
                           <MoreVertical className="w-4 h-4" />
                         </Button>
                       </DropdownMenuTrigger>
                       <DropdownMenuContent align="end" className="bg-[#151921] border-white/10 text-white">
                         <DropdownMenuItem className="text-red-400 focus:text-red-400 cursor-pointer">강퇴하기</DropdownMenuItem>
                         <DropdownMenuItem className="text-red-400 focus:text-red-400 cursor-pointer">차단하기</DropdownMenuItem>
                       </DropdownMenuContent>
                     </DropdownMenu>
                   )}
                </div>
                
                <div className="mt-14 px-4 pb-4">
                   <div className="flex items-center gap-2 mb-1">
                     <h2 className="text-xl font-bold text-white">{selectedUser.name}</h2>
                     {selectedUser.role === 'admin' && <Crown className="w-4 h-4 text-primary fill-primary" />}
                   </div>
                   <p className="text-sm text-gray-400 mb-4">{selectedUser.bio || "자기소개가 없습니다."}</p>
                   
                   <div className="bg-[#151921] rounded-lg p-3 mb-4 space-y-2 border border-white/5">
                      <div className="text-xs uppercase font-bold text-gray-500 mb-2">회원 정보</div>
                      <div className="flex justify-between text-sm">
                         <span className="text-gray-400">가입일</span>
                         <span className="text-gray-200">2024년 1월 1일</span>
                      </div>
                      <div className="flex justify-between text-sm">
                         <span className="text-gray-400">역할</span>
                         <span className="text-primary">{selectedUser.role.toUpperCase()}</span>
                      </div>
                   </div>

                   <div className="flex gap-2">
                      <Input 
                        placeholder={`@${selectedUser.name}에게 메시지 보내기`} 
                        className="bg-[#151921] border-white/10 text-sm h-10"
                      />
                      <Button className="shrink-0 bg-primary text-black hover:bg-primary/90">
                         전송
                      </Button>
                   </div>
                </div>
             </div>
           )}
        </DialogContent>
      </Dialog>

      {/* Poll Creation Modal */}
      <Dialog open={isPollModalOpen} onOpenChange={setIsPollModalOpen}>
        <DialogContent className="bg-[#151921] border-white/10 text-white sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>새로운 투표 만들기</DialogTitle>
            <DialogDescription className="text-gray-400">
              커뮤니티 멤버들의 의견을 물어보세요.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="question">질문</Label>
              <Input id="question" placeholder="예: 내일 주가 상승할까요?" className="bg-[#0B0E14] border-white/10" />
            </div>
            <div className="grid gap-2">
              <Label>옵션</Label>
              <Input placeholder="옵션 1" className="bg-[#0B0E14] border-white/10" />
              <Input placeholder="옵션 2" className="bg-[#0B0E14] border-white/10" />
              <div className="flex items-center gap-2 text-primary text-sm cursor-pointer hover:underline">
                 <Plus className="w-3 h-3" /> 옵션 추가
              </div>
            </div>
            <div className="grid gap-2">
              <Label>설정</Label>
              <div className="flex items-center justify-between p-2 border border-white/10 rounded bg-[#0B0E14]">
                 <div className="text-sm text-gray-300">복수 선택 허용</div>
                 <Switch id="multiple-choice" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPollModalOpen(false)} className="border-white/10 text-white hover:bg-white/5 hover:text-white">취소</Button>
            <Button onClick={handleCreatePoll} className="bg-primary text-black hover:bg-primary/90">투표 시작</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
    </DashboardLayout>
  );
}