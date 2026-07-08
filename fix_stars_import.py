import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r", encoding='utf-8') as f:
    content = f.read()

if "export function Stars" not in content and "function Stars" not in content:
    # Add a simple Stars component at the top of the file since it's missing
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
    # Insert after imports
    content = content.replace('// Image Source Helpers\n', stars_component + '// Image Source Helpers\n')
    
    with open(filepath, "w", encoding='utf-8') as f:
        f.write(content)
