const fs = require('fs');
const file = 'client/src/pages/mypage.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Remove from right side
const rightSideCode = `                                        <div className="mt-8 pt-8 border-t border-white/5">
                                            <div className="bg-[#1e2330] rounded-xl p-5 border border-white/5">
                                                <div className="flex justify-between items-center mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-gray-300 font-medium">추천인 코드</span>
                                                        <span className="text-white font-bold text-lg tracking-wider">MXHRC73M</span>
                                                    </div>
                                                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 hover:bg-primary/10 gap-1.5 font-medium px-2 h-8">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                                                        복사하기
                                                    </Button>
                                                </div>
                                                <div className="bg-[#151921] rounded-lg p-4 space-y-3">
                                                    <p className="text-sm text-gray-400 leading-relaxed break-keep">
                                                        회원님을 추천한 유저가 결제할 때마다, 결제 금액의 일정 비율이 회원님께 리워드로 지급됩니다.
                                                    </p>
                                                    <div className="text-primary font-medium text-[14px]">
                                                        envitest님의 현재 리워드 비율: 20%
                                                    </div>
                                                </div>
                                            </div>
                                        </div>`;

content = content.replace(rightSideCode, '');

// 2. Add to left side below Card
const leftSideAddition = `          </Card>

          {/* Referral Code Box */}
          <div className="w-full lg:w-80 bg-[#151921] rounded-xl border border-white/10 shrink-0 overflow-hidden">
            <div className="p-5">
                <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-300 font-medium text-sm">추천인 코드</span>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 hover:bg-primary/10 gap-1.5 font-medium px-2 h-7 text-xs">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                        복사하기
                    </Button>
                </div>
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-white font-bold text-lg tracking-wider">MXHRC73M</span>
                </div>
                <div className="bg-[#1e2330] rounded-lg p-4 space-y-3 border border-white/5">
                    <p className="text-xs text-gray-400 leading-relaxed break-keep">
                        회원님을 추천한 유저가 결제할 때마다, 결제 금액의 일정 비율이 회원님께 리워드로 지급됩니다.
                    </p>
                    <div className="text-primary font-medium text-xs">
                        envitest님의 현재 리워드 비율: 20%
                    </div>
                </div>
            </div>
          </div>
          </div>`;

content = content.replace('          </Card>', leftSideAddition);

// Update layout grid to wrap both left items
content = content.replace(
  '<div className="flex flex-col lg:flex-row gap-8">',
  '<div className="flex flex-col lg:flex-row gap-8">\n          {/* Left Column (Profile + Referral) */}\n          <div className="flex flex-col gap-4">'
);

// We need to properly wrap the left side contents
fs.writeFileSync(file, content);
console.log("Done");
