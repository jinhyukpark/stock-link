import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Make the highlight list items text larger
old_highlight_li = """<li key={idx} className="flex gap-3 text-slate-300 text-sm leading-relaxed items-start">"""
new_highlight_li = """<li key={idx} className="flex gap-3 text-slate-300 text-[15px] leading-relaxed items-start">"""

if old_highlight_li in content:
    content = content.replace(old_highlight_li, new_highlight_li)

# Enlarge the Section Title for Megaphone (주요 하이라이트)
# Let's find the SectionTitle component
old_section_title = """const SectionTitle = ({ icon: Icon, title, description }: { icon: any, title: string, description?: string }) => (
    <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
            <Icon className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
        </div>
        {description && <p className="text-slate-400 text-sm">{description}</p>}
    </div>
);"""

new_section_title = """const SectionTitle = ({ icon: Icon, title, description }: { icon: any, title: string, description?: string }) => (
    <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
            <Icon className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
        </div>
        {description && <p className="text-slate-400 text-[15px]">{description}</p>}
    </div>
);"""

if old_section_title in content:
    content = content.replace(old_section_title, new_section_title)

with open(filepath, "w") as f:
    f.write(content)
