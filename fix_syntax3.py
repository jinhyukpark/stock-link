import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r", encoding='utf-8') as f:
    content = f.read()

# We need to make sure the end of the file is correct React component closing
# It looks like the main </div> closing the view and the `export default` might be missing
if "export default SocialAnalysisView;" not in content:
    # Append the missing end
    content = content.replace('            <div className="mb-20 border-t-2 border-slate-700/50"></div>\n\n                        ', '            <div className="mb-20 border-t-2 border-slate-700/50"></div>\n        </div>\n    );\n}\n\nexport default SocialAnalysisView;')
    with open(filepath, "w", encoding='utf-8') as f:
        f.write(content)
