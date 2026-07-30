import os
import re

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# 1. Add import for Trump image
if 'import trumpImg' not in content:
    content = content.replace(
        'import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";',
        'import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";\nimport trumpImg from "@assets/image_1782905282101.png";'
    )

# 2. Update avatar URL
content = content.replace(
    "'도널드 트럼프': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/240px-Donald_Trump_official_portrait.jpg',",
    "'도널드 트럼프': trumpImg,"
)

# 3. First table name truncation removal
content = content.replace(
    '<span className="text-white font-bold text-sm truncate max-w-[80px]">{item.speaker}</span>',
    '<span className="text-white font-bold text-sm">{item.speaker}</span>'
)
content = content.replace(
    '<td className="px-6 py-5 min-w-[140px]">',
    '<td className="px-6 py-5 min-w-[160px]">'
)

# 4. Second table name truncation removal
content = content.replace(
    '<span className="font-medium text-xs truncate max-w-[80px]">{item.influencer}</span>',
    '<span className="font-medium text-xs">{item.influencer}</span>'
)
content = content.replace(
    '<td className="px-6 py-5 min-w-[120px]">',
    '<td className="px-6 py-5 min-w-[160px]">'
)

# 5. Add line-clamp-3 to summary (allow it to be max 3 lines to save space)
content = re.sub(
    r'<div className="text-slate-200 text-sm leading-relaxed">\s*\{item\.summary\}\s*</div>',
    r'<div className="text-slate-200 text-sm leading-relaxed line-clamp-3">\n                                            {item.summary}\n                                        </div>',
    content
)

with open(filepath, "w") as f:
    f.write(content)
