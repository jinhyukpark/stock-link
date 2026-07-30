import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Let's adjust the text rendering for highlights to allow embedded HTML/components or bolding.
# Currently it's just `<div>{highlight}</div>`.
# But wait, looking at the user's screenshot, it shows bolder key phrases, specific badge-like styles inside the text, and overall larger font.
# Let's increase font size further and enhance the styling of the text.

old_li = """<li key={idx} className="flex gap-3 text-slate-300 text-[15px] leading-relaxed items-start">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                                <div>{highlight}</div>
                            </li>"""
                            
new_li = """<li key={idx} className="flex gap-3 text-slate-200 text-base leading-relaxed items-start">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2.5 flex-shrink-0" />
                                <div className="font-medium tracking-wide">{highlight}</div>
                            </li>"""

if old_li in content:
    content = content.replace(old_li, new_li)

with open(filepath, "w") as f:
    f.write(content)
