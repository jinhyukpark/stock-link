import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r", encoding='utf-8') as f:
    content = f.read()

# Update the column headers
old_thead = """                        <thead className="bg-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 w-40 font-semibold text-left border-b border-slate-700">주요 인사</th>
                                <th className="px-6 py-4 min-w-[240px] font-semibold text-left border-b border-slate-700">시장 영향 분석</th>
                                <th className="px-6 py-4 min-w-[180px] font-semibold text-left border-b border-slate-700 text-emerald-400">수혜 종목</th>
                                <th className="px-6 py-4 min-w-[180px] font-semibold text-left border-b border-slate-700 text-rose-400">리스크 종목</th>
                                <th className="px-6 py-4 w-24 font-semibold text-center border-b border-slate-700">방향</th>
                                <th className="px-6 py-4 w-32 font-semibold text-center border-b border-slate-700">강도</th>
                            </tr>
                        </thead>"""

new_thead = """                        <thead className="bg-slate-800/80 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 w-40 font-semibold text-left border-b border-slate-700">주요 인사</th>
                                <th className="px-6 py-4 min-w-[300px] font-semibold text-left border-b border-slate-700">시장 영향 분석</th>
                                <th className="px-6 py-4 min-w-[200px] font-semibold text-left border-b border-slate-700 text-emerald-400">수혜 종목</th>
                                <th className="px-6 py-4 min-w-[200px] font-semibold text-left border-b border-slate-700 text-rose-400">리스크 종목</th>
                                <th className="px-6 py-4 w-20 font-semibold text-center border-b border-slate-700">방향</th>
                                <th className="px-6 py-4 w-28 font-semibold text-center border-b border-slate-700">강도</th>
                            </tr>
                        </thead>"""

content = content.replace(old_thead, new_thead)

# Make sure the table looks like the image 
content = content.replace('className="text-emerald-400 border-emerald-400/30 bg-emerald-950/30 text-xs"', 'className="text-emerald-400 border-emerald-400/30 bg-emerald-950/50 px-2 py-0.5 text-[11px]"')
content = content.replace('className="text-rose-400 border-rose-400/30 bg-rose-950/30 text-xs"', 'className="text-rose-400 border-rose-400/30 bg-rose-950/50 px-2 py-0.5 text-[11px]"')

with open(filepath, "w", encoding='utf-8') as f:
    f.write(content)
