import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip, CartesianGrid } from "recharts";

export function NewsTab() {
  const [timeFilter, setTimeFilter] = useState<'일' | '주' | '월' | '년'>('일');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string>('금융소비자보호');

  // Mock data for the stacked chart
  const chartData = [
    { date: '23년 6월', id: 1, 긍정: 5, 중립: 3, 부정: 2 },
    { date: '23년 6월', id: 2, 긍정: 20, 중립: 15, 부정: 7 },
    { date: '23년 6월', id: 3, 긍정: 35, 중립: 20, 부정: 10 },
    { date: '23년 6월', id: 4, 긍정: 10, 중립: 10, 부정: 5 },
    { date: '23년 6월', id: 5, 긍정: 30, 중립: 15, 부정: 10 },
    { date: '23년 6월', id: 6, 긍정: 8, 중립: 7, 부정: 5 },
    { date: '23년 6월', id: 7, 긍정: 18, 중립: 12, 부정: 5 },
  ];

  const handleBarClick = (data: any) => {
    // Toggle selection
    if (selectedDate === data.id.toString()) {
      setSelectedDate(null);
    } else {
      setSelectedDate(data.id.toString());
    }
  };

  // Mock tags
  const tags = ['전체', '금융소비자보호', '스테이블 코인', '카테고리1', '카테고리2', '카테고리3'];

  // Mock news items
  const allNews = [
    {
      id: 1,
      date: '12.22',
      sentiment: '긍정',
      tags: ['카테고리1', '카테고리2', '카3'],
      extraTags: '+22',
      title: '뉴스 타이틀은 한줄까지 보여지고 한줄 넘어갈 경우 ... 처리 됩니다.',
      publisher: '한경뉴스',
      time: '12개월전',
      fullDate: '12.22'
    },
    {
      id: 2,
      date: '12.22',
      sentiment: '부정',
      tags: ['카테고리1', '카2', '카3'],
      extraTags: '+22',
      title: '뉴스 타이틀은 한줄까지 보여지고 한줄 넘어갈 경우 ... 처리 됩니다.',
      publisher: '한경뉴스',
      time: '12개월전',
      fullDate: '12.22'
    },
    {
      id: 3,
      date: '12.22',
      sentiment: '중립',
      tags: ['카1', '카2', '카테고리3'],
      extraTags: '+22',
      title: '뉴스 타이틀은 한줄까지 보여지고 한줄 넘어갈 경우 ... 처리 됩니다.',
      publisher: '한경뉴스',
      time: '12개월전',
      fullDate: '12.22'
    }
  ];

  // Fill up to look like the image
  const displayNews = [...allNews, ...allNews.map(n => ({...n, id: n.id + 3}))].slice(0, 5);

  const totalCount = 92; // Hardcoded to match image "92건"

  return (
    <div className="flex h-full gap-4 pb-4">
      {/* Left Panel - Chart */}
      <div className="w-[45%] bg-[#151921] rounded-lg border border-white/5 flex flex-col p-6 h-full min-h-[350px]">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-white font-medium text-[15px]">뉴스 발생 추이</h3>
          
          <div className="flex items-center gap-4">
            <div className="flex bg-[#1e2330] rounded-md p-1 border border-white/5">
              {['일', '주', '월', '년'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setTimeFilter(filter as any)}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    timeFilter === filter 
                      ? 'bg-[#374151] text-white shadow-sm' 
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 w-full min-h-[250px] relative mt-4">
          {/* Custom Y-axis grid lines manually to match image exactly */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6 z-0">
             <div className="border-b border-[#374151]/50 w-full h-[1px]"></div>
             <div className="border-b border-[#374151]/50 w-full h-[1px]"></div>
             <div className="border-b border-[#374151]/50 w-full h-[1px]"></div>
             <div className="border-b border-[#374151]/50 w-full h-[1px]"></div>
             <div className="border-b border-[#374151]/50 w-full h-[1px]"></div>
          </div>
          <ResponsiveContainer width="100%" height="100%" className="relative z-10">
            <BarChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#6b7280', fontSize: 11 }} 
                axisLine={false} 
                tickLine={false}
                dy={10}
              />
              <YAxis hide domain={[0, 'auto']} />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ backgroundColor: '#1E222B', border: '1px solid #374151', borderRadius: '8px', color: 'white' }}
                formatter={(val, name) => [`${val}건`, name]}
                labelFormatter={(label) => label}
              />
              <Bar dataKey="부정" stackId="a" fill="#ff7c7e" barSize={32} onClick={handleBarClick} cursor="pointer" />
              <Bar dataKey="중립" stackId="a" fill="#555867" barSize={32} onClick={handleBarClick} cursor="pointer" />
              <Bar dataKey="긍정" stackId="a" fill="#19a14c" barSize={32} radius={[4, 4, 0, 0]} onClick={handleBarClick} cursor="pointer" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-6">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <div className="w-2.5 h-2.5 rounded-sm bg-[#19a14c]"></div>
            긍정
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <div className="w-2.5 h-2.5 rounded-sm bg-[#555867]"></div>
            중립
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <div className="w-2.5 h-2.5 rounded-sm bg-[#ff7c7e]"></div>
            부정
          </div>
        </div>
      </div>

      {/* Right Panel - News List */}
      <div className="w-[55%] bg-[#151921] rounded-lg border border-white/5 flex flex-col p-6 h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-medium text-[15px] flex items-center gap-2">
            뉴스 {selectedDate ? '선택일' : '전체'}
          </h3>
          <span className="text-gray-400 text-sm">{totalCount}건</span>
        </div>

        {/* Tags Row */}
        <div className="flex gap-2 overflow-x-auto overflow-y-hidden custom-scrollbar pb-3 mb-4 min-h-[36px] items-center shrink-0">
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium transition-colors shrink-0 ${
                selectedTag === tag && tag !== '전체'
                  ? 'bg-teal-500/20 text-teal-400' 
                  : selectedTag === tag && tag === '전체'
                  ? 'bg-[#374151] text-white'
                  : 'bg-[#1e2330] text-gray-400 hover:bg-[#2a303f] border border-white/5'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* News Items */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 flex flex-col">
          {displayNews.map((news, index) => (
            <div key={news.id} className="py-4 group border-b border-white/5 last:border-0 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                  news.sentiment === '긍정' ? 'bg-[#19a14c] text-white' : 
                  news.sentiment === '부정' ? 'bg-[#ff7c7e] text-white' : 
                  'bg-[#555867] text-white'
                }`}>
                  {news.sentiment}
                </span>
                
                <div className="flex gap-1.5 overflow-hidden items-center">
                  {news.tags.map(tag => (
                    <span key={tag} className="text-[11px] text-gray-400 shrink-0 before:content-['#'] before:mr-0.5">
                      {tag}
                    </span>
                  ))}
                  {news.extraTags && (
                    <span className="text-[11px] text-gray-500 shrink-0">{news.extraTags}</span>
                  )}
                </div>
              </div>
              
              <div className="flex items-start justify-between gap-4">
                <h4 className="text-gray-200 text-[14px] leading-snug group-hover:text-white transition-colors cursor-pointer flex-1 text-left line-clamp-2">
                  {news.title}
                </h4>
                <div className="text-gray-500 text-[11px] shrink-0 text-right mt-0.5">
                  <div className="mb-0.5">{news.publisher}</div>
                  <div>{news.fullDate}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
