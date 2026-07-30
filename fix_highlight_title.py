import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

old_section_title = """const SectionTitle = ({ icon: Icon, title, description }: { icon: any, title: string, description?: string }) => (
    <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
            <Icon className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
        </div>
        {description && <p className="text-slate-400 text-[15px]">{description}</p>}
    </div>
);"""

new_section_title = """const SectionTitle = ({ icon: Icon, title, description }: { icon: any, title: string, description?: string }) => (
    <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
            <Icon className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
        </div>
        {description && <p className="text-slate-400 text-base">{description}</p>}
    </div>
);"""

if old_section_title in content:
    content = content.replace(old_section_title, new_section_title)

# Let's also increase spacing between highlights
old_ul = """<ul className="space-y-4">"""
new_ul = """<ul className="space-y-5">"""

if old_ul in content:
    content = content.replace(old_ul, new_ul)

with open(filepath, "w") as f:
    f.write(content)
