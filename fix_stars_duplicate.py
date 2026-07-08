import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r", encoding='utf-8') as f:
    content = f.read()

# It seems `Stars` is declared twice. The previous replacement added it, but it might already exist.
# Let's clean up the duplicate `Stars` component.
# First, remove the one we just added at the top.
stars_component = """
export function Stars({ count }: { count: number }) {
    return (
        <div className="flex justify-center gap-0.5 mt-1">
            {[...Array(5)].map((_, i) => (
                <Star 
                    key={i} 
                    className={cn(
                        "w-3.5 h-3.5", 
                        i < count ? "fill-emerald-400 text-emerald-400" : "fill-slate-700 text-slate-700"
                    )} 
                />
            ))}
        </div>
    );
}

"""

if stars_component in content:
    content = content.replace(stars_component, '')
    with open(filepath, "w", encoding='utf-8') as f:
        f.write(content)
