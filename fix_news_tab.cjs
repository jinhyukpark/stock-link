const fs = require('fs');
const file = 'client/src/components/stock/NewsTab.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add Stacked Bar Chart data structure
const oldChartData = `  // Mock data for the chart
  const chartData = [
    { date: '23년 6월', id: 1, count: 10 },
    { date: '23년 6월', id: 2, count: 42 },
    { date: '23년 6월', id: 3, count: 65 },
    { date: '23년 6월', id: 4, count: 25 },
    { date: '23년 6월', id: 5, count: 55 },
    { date: '23년 6월', id: 6, count: 20 },
    { date: '23년 6월', id: 7, count: 35 },
  ];`;

const newChartData = `  // Mock data for the stacked chart
  const chartData = [
    { date: '23년 6월', id: 1, 긍정: 5, 중립: 3, 부정: 2 },
    { date: '23년 6월', id: 2, 긍정: 20, 중립: 15, 부정: 7 },
    { date: '23년 6월', id: 3, 긍정: 35, 중립: 20, 부정: 10 },
    { date: '23년 6월', id: 4, 긍정: 10, 중립: 10, 부정: 5 },
    { date: '23년 6월', id: 5, 긍정: 30, 중립: 15, 부정: 10 },
    { date: '23년 6월', id: 6, 긍정: 8, 중립: 7, 부정: 5 },
    { date: '23년 6월', id: 7, 긍정: 18, 중립: 12, 부정: 5 },
  ];`;

content = content.replace(oldChartData, newChartData);

// 2. Update BarChart to be stacked
const oldBarChart = `              <Bar 
                dataKey="count" 
                radius={[4, 4, 0, 0]} 
                barSize={32}
                onClick={handleBarClick}
                cursor="pointer"
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={\`cell-\${index}\`} 
                    fill={selectedDate === null || selectedDate === entry.id.toString() ? '#0ea5e9' : '#1e3a8a'} 
                    className="transition-colors duration-300"
                  />
                ))}
              </Bar>`;

const newBarChart = `              <Bar dataKey="부정" stackId="a" fill="#ff7c7e" barSize={32} onClick={handleBarClick} cursor="pointer" />
              <Bar dataKey="중립" stackId="a" fill="#555867" barSize={32} onClick={handleBarClick} cursor="pointer" />
              <Bar dataKey="긍정" stackId="a" fill="#19a14c" barSize={32} radius={[4, 4, 0, 0]} onClick={handleBarClick} cursor="pointer" />`;

content = content.replace(oldBarChart, newBarChart);

// 3. Update tooltip formatter
const oldTooltip = `                formatter={(val) => [\`\${val}건\`, '뉴스 수']}
                labelFormatter={() => ''}`;
                
const newTooltip = `                formatter={(val, name) => [\`\${val}건\`, name]}
                labelFormatter={(label) => label}`;
                
content = content.replace(oldTooltip, newTooltip);

// 4. Make UI match design perfectly
// Tag styling update
const oldTags = `                  : selectedTag === tag && tag === '전체'
                  ? 'bg-white/10 text-white'
                  : 'bg-[#1E222B] text-gray-400 hover:bg-[#2a2d36]'
              }\`}`;

const newTags = `                  : selectedTag === tag && tag === '전체'
                  ? 'bg-[#374151] text-white'
                  : 'bg-[#1e2330] text-gray-400 hover:bg-[#2a303f] border border-white/5'
              }\`}`;
              
content = content.replace(oldTags, newTags);

// News Item Layout Update
const oldNewsItem = `              <div className="flex items-center gap-2">
                <span className={\`px-2.5 py-0.5 rounded-full text-[10px] font-bold shrink-0 \${
                  news.sentiment === '긍정' ? 'bg-[#19a14c] text-white' : 
                  news.sentiment === '부정' ? 'bg-[#ff7c7e] text-white' : 
                  'bg-[#555867] text-white'
                }\`}>
                  {news.sentiment}
                </span>
                
                <div className="flex gap-1.5 overflow-hidden items-center">
                  {news.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-0.5 rounded-full text-[10px] text-gray-400 border border-[#374151] shrink-0">
                      {tag}
                    </span>
                  ))}
                  {news.extraTags && (
                    <span className="text-[10px] text-gray-500 shrink-0">{news.extraTags}</span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between gap-3 mt-1">
                <div className="flex items-center gap-3 overflow-hidden flex-1">
                  <span className="text-gray-400 text-[13px] shrink-0">{news.fullDate}</span>
                  <h4 className="text-gray-300 text-[13px] font-medium truncate group-hover:text-white transition-colors cursor-pointer">
                    {news.title}
                  </h4>
                </div>
                <div className="text-gray-500 text-[11px] shrink-0 whitespace-nowrap">
                  {news.time} · {news.publisher}
                </div>
              </div>`;

const newNewsItem = `              <div className="flex items-center gap-2 mb-1.5">
                <span className={\`px-2.5 py-0.5 rounded-full text-[10px] font-bold shrink-0 \${
                  news.sentiment === '긍정' ? 'bg-[#19a14c] text-white' : 
                  news.sentiment === '부정' ? 'bg-[#ff7c7e] text-white' : 
                  'bg-[#555867] text-white'
                }\`}>
                  {news.sentiment}
                </span>
                
                <div className="flex gap-1.5 overflow-hidden items-center">
                  {news.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-0.5 rounded-full text-[10px] text-gray-400 border border-[#374151] bg-[#1e2330] shrink-0">
                      {tag}
                    </span>
                  ))}
                  {news.extraTags && (
                    <span className="text-[10px] text-gray-500 shrink-0">{news.extraTags}</span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden flex-1">
                  <span className="text-gray-400 text-[13px] shrink-0">{news.fullDate}</span>
                  <h4 className="text-gray-300 text-[13px] font-medium truncate group-hover:text-white transition-colors cursor-pointer flex-1 text-left">
                    {news.title}
                  </h4>
                </div>
                <div className="text-gray-500 text-[11px] shrink-0 whitespace-nowrap ml-4">
                  {news.time} · {news.publisher}
                </div>
              </div>`;

content = content.replace(oldNewsItem, newNewsItem);

// Tweak news item container to match spacing
content = content.replace(
  'className="py-4 group border-b border-white/5 last:border-0 flex flex-col gap-2"',
  'className="py-3 group border-b border-[#2a303f]/50 last:border-0 flex flex-col"'
);

// Tweak section header backgrounds/borders
content = content.replace(
  '<div className="w-[45%] bg-[#151921] rounded-lg border border-white/5 flex flex-col p-6 h-full min-h-[350px]">',
  '<div className="w-[45%] bg-[#151921]/80 rounded-xl border border-white/5 flex flex-col p-6 h-full min-h-[350px] shadow-sm">'
);

content = content.replace(
  '<div className="w-[55%] bg-[#151921] rounded-lg border border-white/5 flex flex-col p-6 h-full">',
  '<div className="w-[55%] bg-[#151921]/80 rounded-xl border border-white/5 flex flex-col p-6 h-full shadow-sm">'
);

// Tweak filter buttons in the left panel to match
content = content.replace(
  'className="flex bg-[#1E222B] rounded-md p-1 border border-white/5"',
  'className="flex bg-[#1e2330] rounded-md p-1 border border-white/5"'
);

content = content.replace(
  "timeFilter === filter \n                    ? 'bg-[#2a2d36] text-white shadow-sm' \n                    : 'text-gray-500 hover:text-gray-300'",
  "timeFilter === filter \n                    ? 'bg-[#374151] text-white shadow-sm' \n                    : 'text-gray-500 hover:text-gray-300'"
);

fs.writeFileSync(file, content);
console.log("Updated");
