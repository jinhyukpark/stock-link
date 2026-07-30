import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# The yellow border comes from this line:
# isHighImpact ? "border-l-2 border-l-amber-400" : "border-l-2 border-l-transparent"

content = content.replace(
    'isHighImpact ? "border-l-2 border-l-amber-400" : "border-l-2 border-l-transparent"',
    '"border-l-2 border-l-transparent"'
)

# Alternatively, if we just want to remove the left border completely
# we can just take out the dynamic border assignment.
old_tr_class = """<tr key={`impact-${item.id}`} className={cn(
                                        i % 2 === 0 ? "bg-slate-800/60" : "bg-slate-900", 
                                        "align-middle",
                                        isHighImpact ? "border-l-2 border-l-amber-400" : "border-l-2 border-l-transparent"
                                    )}>"""

new_tr_class = """<tr key={`impact-${item.id}`} className={cn(
                                        i % 2 === 0 ? "bg-slate-800/60" : "bg-slate-900", 
                                        "align-middle"
                                    )}>"""

if old_tr_class in content:
    content = content.replace(old_tr_class, new_tr_class)

with open(filepath, "w") as f:
    f.write(content)
