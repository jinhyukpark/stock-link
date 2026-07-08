import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Add link to original source like the mockup
content = content.replace(
    '</p>\n                                </div>\n                            </div>\n                        </div>',
    '</p>\n                                </div>\n                                \n                                <div className="pt-4">\n                                    <a href="#" className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 text-xs font-medium transition-colors">\n                                        <Link2 className="w-3.5 h-3.5" /> 원문 보기\n                                    </a>\n                                </div>\n                            </div>\n                        </div>'
)

# Fix some spacing in the left column
content = content.replace(
    '<div className="w-full md:w-64 bg-slate-800/40 p-6 border-b md:border-b-0 md:border-r border-slate-700/60 flex flex-col gap-4 shrink-0">',
    '<div className="w-full md:w-64 bg-slate-800/40 p-6 border-b md:border-b-0 md:border-r border-slate-700/60 flex flex-col shrink-0">'
)

with open(filepath, "w") as f:
    f.write(content)
