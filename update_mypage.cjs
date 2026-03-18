const fs = require('fs');
const file = 'client/src/pages/mypage.tsx';
let content = fs.readFileSync(file, 'utf8');

const newContent = `                                        <div className="pt-4 flex justify-end">
                                            <Button size="lg" className="bg-primary text-black hover:bg-primary/90 font-bold px-8">변경사항 저장</Button>
                                        </div>
                                        
                                        <div className="mt-8 pt-8 border-t border-white/5">
                                            <div className="bg-[#1e2330] rounded-xl p-5 border border-white/5">
                                                <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/5">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-gray-300 font-medium">추천인 코드</span>
                                                        <span className="text-white font-bold text-lg tracking-wider">MXHRC73M</span>
                                                    </div>
                                                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 hover:bg-primary/10 gap-2 font-medium">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                                                        복사하기
                                                    </Button>
                                                </div>
                                                <div className="space-y-4">
                                                    <p className="text-sm text-gray-400 leading-relaxed">
                                                        회원님을 추천한 유저가 결제할 때마다, 결제 금액의 일정 비율이 회원님께 리워드로 지급됩니다.
                                                    </p>
                                                    <div className="text-primary font-medium text-[15px]">
                                                        envitest님의 현재 리워드 비율: 20%
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`;

const searchString = `                                        <div className="pt-4 flex justify-end">
                                            <Button size="lg" className="bg-primary text-black hover:bg-primary/90 font-bold px-8">변경사항 저장</Button>
                                        </div>
                                    </div>`;

if (content.includes(searchString)) {
    content = content.replace(searchString, newContent);
    fs.writeFileSync(file, content);
    console.log("Success");
} else {
    console.log("Could not find the exact string to replace.");
}
