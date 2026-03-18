import { useState } from "react";

// Mock data for disclosures
const disclosures = [
  {
    id: 1,
    date: '03.16',
    title: 'SK증권(주) 단기과열종목(가격괴리율, 3거래일 단일가매매) 지정 연장(SK증권우)',
    timeAgo: '1일전',
    type: '공시',
    content: {
      header: '단기과열종목(가격괴리율, 3거래일 단일가매매) 지정 연장',
      desc: '다음 종목은 유가증권시장 업무규정 제106조의2 및 같은 규정 시행세칙 제134조에 따라 단기과열종목 지정기간을 다음과 같이 3거래일간 연장합니다.',
      target: 'SK증권우(KR7001511005)',
      reason: '당일 종가를 기준으로 종류주식의 가격과 해당 보통주식의 가격간 괴리율이 50%를 초과',
      endDate: '2026-03-19',
      caution: '종료일의 다음 매매거래일(해제일)부터 단기과열종목 지정이 해제됩니다.\n\n단, 종료일 가격괴리율이 50%를 초과하는 경우에는 단기과열종목 지정기간을 3거래일간 연장하여 단일가매매 계속 적용(연장 횟수 제한 없음)\n\n단일가 기간 중 거래정지시 정지일수도 단일가 기간에 포함됨',
      etc: '단기과열종목 지정기간 종료시 별도의 시장안내는 없음'
    }
  },
  {
    id: 2,
    date: '03.13',
    title: 'SK증권(주) 감사보고서 제출',
    timeAgo: '5일전',
    type: '공시',
  },
  {
    id: 3,
    date: '03.11',
    title: 'SK증권(주) 단기과열종목(가격괴리율, 3거래일 단일가매매) 지정 연장(SK증권우)',
    timeAgo: '7일전',
    type: '공시',
  },
  {
    id: 4,
    date: '03.06',
    title: 'SK증권(주) 단기과열종목(가격괴리율, 3거래일 단일가매매) 지정 연장(SK증권우)',
    timeAgo: '12일전',
    type: '공시',
  },
  {
    id: 5,
    date: '03.05',
    title: 'SK증권(주) (정정)주주총회소집결의',
    timeAgo: '13일전',
    type: '공시',
  }
];

export function DisclosureTab() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedDisclosure = disclosures.find(d => d.id === selectedId);

  return (
    <div className="flex h-full gap-4">
      {/* List Section (Left) */}
      <div className="w-[45%] h-full bg-[#151921] rounded-lg border border-white/5 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-white/5">
          <h3 className="text-white font-bold text-sm">공시</h3>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="flex flex-col">
            {disclosures.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`flex gap-4 p-4 text-left border-b border-white/5 transition-colors ${
                  selectedId === item.id 
                    ? 'bg-white/10' 
                    : 'hover:bg-white/5'
                }`}
              >
                <div className="text-gray-400 font-mono text-sm shrink-0 pt-0.5">{item.date}</div>
                <div className="flex flex-col gap-1.5">
                  <div className={`font-medium leading-tight ${selectedId === item.id ? 'text-white' : 'text-gray-200'}`}>
                    {item.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.timeAgo} · {item.type}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Section (Right) */}
      <div className={`w-[55%] h-full rounded-lg border border-white/5 overflow-y-auto custom-scrollbar p-8 ${selectedDisclosure ? 'bg-white text-black' : 'bg-[#151921] text-gray-400'}`}>
        {selectedDisclosure ? (
          <div className="flex flex-col">
            {/* Detail Header */}
            <div className="mb-8 border-b border-gray-200 pb-4">
              <h2 className="text-xl font-bold text-gray-900 mb-2 leading-snug">
                {selectedDisclosure.title}
              </h2>
              <div className="text-sm text-gray-500">
                {selectedDisclosure.timeAgo} · {selectedDisclosure.type}
              </div>
            </div>

            {/* Detail Content */}
            {selectedDisclosure.content ? (
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-bold text-black mb-2">
                  {selectedDisclosure.content.header}
                </h3>
                
                <div className="border border-gray-300">
                  <div className="p-3 border-b border-gray-300 text-sm">
                    {selectedDisclosure.content.desc}
                  </div>
                  
                  <div className="grid grid-cols-[120px_1fr] text-sm">
                    <div className="bg-gray-100 p-3 border-b border-r border-gray-300 flex items-center justify-center font-medium">대상종목</div>
                    <div className="p-3 border-b border-gray-300">{selectedDisclosure.content.target}</div>
                    
                    <div className="bg-gray-100 p-3 border-b border-r border-gray-300 flex items-center justify-center font-medium text-center">지정연장 사유</div>
                    <div className="p-3 border-b border-gray-300 leading-snug">{selectedDisclosure.content.reason}</div>
                    
                    <div className="bg-gray-100 p-3 border-b border-r border-gray-300 flex items-center justify-center font-medium">종료일</div>
                    <div className="p-3 border-b border-gray-300">{selectedDisclosure.content.endDate}</div>
                    
                    <div className="bg-gray-100 p-3 border-b border-r border-gray-300 flex items-center justify-center font-medium">투자유의사항</div>
                    <div className="p-3 border-b border-gray-300 leading-relaxed whitespace-pre-line">{selectedDisclosure.content.caution}</div>
                    
                    <div className="bg-gray-100 p-3 border-r border-gray-300 flex items-center justify-center font-medium">기타사항</div>
                    <div className="p-3">{selectedDisclosure.content.etc}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-3 min-h-[300px]">
                <p>상세 내용이 제공되지 않는 공시입니다.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-3 h-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-20">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <line x1="10" y1="9" x2="8" y2="9" />
            </svg>
            <p className="text-sm font-medium text-gray-500">좌측 리스트에서 공시를 선택하시면<br/>상세 내용을 확인할 수 있습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
