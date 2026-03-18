import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip, CartesianGrid } from "recharts";

export function NewsTab() {
  const [timeFilter, setTimeFilter] = useState<'일' | '주' | '월' | '년'>('일');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string>('전체');

  // Mock data for the chart
  const chartData = [
    { date: '3월 12일', count: 71 },
    { date: '3월 13일', count: 62 },
    { date: '3월 14일', count: 35 },
    { date: '3월 15일', count: 42 },
    { date: '3월 16일', count: 58 },
    { date: '3월 17일', count: 30 },
    { date: '3월 18일', count: 18 },
  ];

  const handleBarClick = (data: any) => {
    setSelectedDate(data.date);
  };

  // Mock tags
  const tags = ['전체', '금융시장변동성', '기업가치', '기업가치제고', '주주환원정책', '자사주소각', '목표주가상향'];

  // Mock news items
  const allNews = [
    {
      id: 1,
      date: '3월 18일',
      sentiment: '부정',
      tags: ['금융시장변동성'],
      title: "'생산적 금융 원년', 은행 대출 '가계→기업' 이동... 변수는?",
      publisher: '파이낸셜뉴스',
      time: '3시간 전',
      fullDate: '2026.03.18'
    },
    {
      id: 2,
      date: '3월 18일',
      sentiment: '긍정',
      tags: ['자금유입'],
      extraTags: '+3',
      title: 'ETF 이제는 400조 시대…국내 퇴직연금도 몰린다',
      publisher: '중앙일보',
      time: '3시간 전',
      fullDate: '2026.03.18'
    },
    {
      id: 3,
      date: '3월 12일',
      sentiment: '긍정',
      tags: ['주주환원'],
      title: '"3차 상법개정 후 첫 주총 시즌…자사주 보유·처분 주목해야"-LS',
      publisher: '한국경제',
      time: '5일 전',
      fullDate: '2026.03.12'
    },
    {
      id: 4,
      date: '3월 12일',
      sentiment: '부정',
      tags: ['변동성장세'],
      title: '"비축유 방출했는데 왜 이래?"…흔들리는 유가, 증시도 덩달아 \'출렁\'',
      publisher: '머니투데이',
      time: '5일 전',
      fullDate: '2026.03.12'
    }
  ];

  // Filter logic
  const filteredNews = allNews.filter(news => {
    const matchDate = selectedDate ? news.date === selectedDate : true;
    const matchTag = selectedTag === '전체' ? true : news.tags.includes(selectedTag);
    // If we clicked a specific tag, but mock data doesn't have it, just show something for mockup purposes
    return matchDate && (matchTag || selectedTag !== '전체');
  });

  const totalCount = selectedDate 
    ? chartData.find(d => d.date === selectedDate)?.count || 0
    : chartData.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="flex flex-col h-full gap-6">
      {/* Chart Section */}
      <div>
        <h3 className="text-white font-bold text-base mb-3">뉴스 발생 추이</h3>
        
        <div className="flex bg-[#1E222B] rounded-full p-1 mb-6 w-fit">
          {['일', '주', '월', '년'].map(filter => (
            <button
              key={filter}
              onClick={() => setTimeFilter(filter as any)}
              className={`px-6 py-1.5 rounded-full text-sm font-medium transition-colors ${
                timeFilter === filter 
                  ? 'bg-[#374151] text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="0" vertical={false} stroke="#374151" strokeOpacity={0.5} />
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#e5e7eb', fontSize: 12, fontWeight: 'bold' }} 
                axisLine={false} 
                tickLine={false}
                dy={10}
              />
              <YAxis hide domain={[0, 'auto']} />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ backgroundColor: '#1E222B', border: '1px solid #374151', borderRadius: '8px', color: 'white' }}
              />
              <Bar 
                dataKey="count" 
                radius={[4, 4, 4, 4]} 
                barSize={30}
                onClick={handleBarClick}
                cursor="pointer"
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={selectedDate === null || selectedDate === entry.date ? '#0ea5e9' : '#1e3a8a'} 
                    className="transition-colors duration-300"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* List Header */}
      <div className="flex items-center justify-between mt-4">
        <h3 className="text-white font-bold text-lg flex items-center gap-2">
          {selectedDate || '전체'} <span className="text-gray-500 font-normal text-sm">({totalCount}건)</span>
        </h3>
        {selectedDate && (
          <button 
            onClick={() => { setSelectedDate(null); setSelectedTag('전체'); }}
            className="text-gray-400 text-xs px-3 py-1.5 rounded-full border border-gray-600 hover:bg-white/5 transition-colors"
          >
            전체보기
          </button>
        )}
      </div>

      {/* Tags */}
      <div className="flex gap-2 overflow-x-auto overflow-y-hidden custom-scrollbar pb-2 min-h-[40px] items-center">
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium transition-colors shrink-0 ${
              selectedTag === tag 
                ? 'bg-[#4ade80] text-black' 
                : 'bg-[#1E222B] text-gray-300 hover:bg-[#2a2d36]'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* News List */}
      <div className="flex flex-col gap-3 pb-6">
        {filteredNews.map(news => (
          <div key={news.id} className="bg-[#1E222B] rounded-xl p-5 border border-white/5 hover:border-white/10 transition-colors cursor-pointer group">
            <div className="flex items-center gap-2 mb-3">
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                news.sentiment === '긍정' ? 'bg-green-500 text-white' : 'bg-red-400 text-white'
              }`}>
                {news.sentiment}
              </span>
              {news.tags.map(tag => (
                <span key={tag} className="px-2.5 py-1 rounded-full text-[10px] text-gray-300 border border-gray-600">
                  {tag}
                </span>
              ))}
              {news.extraTags && (
                <span className="text-[10px] text-gray-400">{news.extraTags}</span>
              )}
            </div>
            
            <h4 className="text-white font-bold text-[15px] mb-4 leading-snug group-hover:text-blue-400 transition-colors">
              {news.title}
            </h4>
            
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>{news.publisher}</span>
              <span>{news.time} · {news.fullDate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
