import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r", encoding='utf-8') as f:
    content = f.read()

# Remove the duplicated table header and content from the previous bad replace
parts = content.split('            {/* 3. ② 시장 영향 분석 (하단) */}')

# We only want one occurrence of 📊 시장 영향 분석.
if len(parts) > 2:
    # This means we have duplicate sections, let's truncate everything after the first proper table closing
    good_content = parts[0] + '            {/* 3. ② 시장 영향 분석 (하단) */}' + parts[1]
    
    # Check if the first instance has the proper table close
    if '</table>\n                </div>\n            </section>' in good_content:
        # Good, we can just replace
        content = good_content

# But wait, looking at the grep, we have the old section at line 561.
# Actually, the python script injected the NEW tbody inside the old tbody, but left the old thead! Wait no.

content = content.replace("""            {/* 3. ② 시장 영향 분석 (하단) */}
            <section className="mb-16">
                <SectionTitle icon={TrendingUp} title="📊 시장 영향 분석" subtitle="각 발언이 국내 증시에 미칠 영향을 분석했습니다" />
                <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden shadow-lg w-full overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left min-w-[1300px] border-collapse">
                        <thead className="bg-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 w-40 font-semibold text-left border-b border-slate-700">주요 인사</th>
                                <th className="px-6 py-4 min-w-[240px] font-semibold text-left border-b border-slate-700">시장 영향 분석</th>
                                <th className="px-6 py-4 min-w-[180px] font-semibold text-left border-b border-slate-700 text-emerald-400">수혜 종목</th>
                                <th className="px-6 py-4 min-w-[180px] font-semibold text-left border-b border-slate-700 text-rose-400">리스크 종목</th>
                                <th className="px-6 py-4 w-24 font-semibold text-center border-b border-slate-700">방향</th>
                                <th className="px-6 py-4 w-32 font-semibold text-center border-b border-slate-700">강도</th>
                            </tr>
                        </thead>
                        """, "                        ")

with open(filepath, "w", encoding='utf-8') as f:
    f.write(content)
