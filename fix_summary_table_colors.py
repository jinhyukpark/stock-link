import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Make the table design closely match the provided mockup image
old_pos_thead = """<thead className="bg-[#4a7c59] text-white text-xs">"""
new_pos_thead = """<thead className="bg-[#41764c] text-white text-xs">"""
content = content.replace(old_pos_thead, new_pos_thead)

old_neg_thead = """<thead className="bg-[#b33939] text-white text-xs">"""
new_neg_thead = """<thead className="bg-[#b93e3d] text-white text-xs">"""
content = content.replace(old_neg_thead, new_neg_thead)

# The mockup image has a very specific style: white background with green/red header.
# Since our app is dark mode, we will keep the dark mode aesthetic but match the general solid header and alternating rows concept.
# The previous change already achieves this with dark mode adaptations (emerald-950/10 and rose-950/10 backgrounds).

# Let's adjust font sizes and padding slightly to make it look tighter like the mockup
content = content.replace('<th className="px-6 py-3 font-semibold text-center w-16">시장</th>', '<th className="px-4 py-2.5 font-semibold text-center w-16 border-r border-white/10">시장</th>')
content = content.replace('<th className="px-6 py-3 font-semibold w-40">종목명</th>', '<th className="px-4 py-2.5 font-semibold w-48 border-r border-white/10">종목명</th>')
content = content.replace('<th className="px-6 py-3 font-semibold w-32">티커</th>', '<th className="px-4 py-2.5 font-semibold w-32 border-r border-white/10 text-center">티커</th>')
content = content.replace('<th className="px-6 py-3 font-semibold w-56">언급 발언자</th>', '<th className="px-4 py-2.5 font-semibold w-64 border-r border-white/10">언급 발언자</th>')
content = content.replace('<th className="px-6 py-3 font-semibold">긍정 사유 요약</th>', '<th className="px-4 py-2.5 font-semibold">긍정 사유 요약</th>')
content = content.replace('<th className="px-6 py-3 font-semibold">부정 사유 요약</th>', '<th className="px-4 py-2.5 font-semibold">부정 사유 요약</th>')

# Ticker centered
content = content.replace(
    '<td className="px-6 py-4">\n                                                <span className="text-slate-400 text-xs font-mono">{stock.ticker}</span>\n                                            </td>',
    '<td className="px-4 py-3 text-center">\n                                                <span className="text-slate-400 text-xs font-mono">{stock.ticker}</span>\n                                            </td>'
)

# Standard padding
content = content.replace('<td className="px-6 py-4 text-center">', '<td className="px-4 py-3 text-center">')
content = content.replace('<td className="px-6 py-4">', '<td className="px-4 py-3">')

with open(filepath, "w") as f:
    f.write(content)
