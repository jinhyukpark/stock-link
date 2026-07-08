import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r", encoding='utf-8') as f:
    content = f.read()

# Let's fix the missing closing tags by looking at the whole file structure
parts = content.split('<thead className="bg-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">')

# We need to make sure the table correctly closes
content_to_replace = parts[2] # 1st is for details, 2nd is summary pos, 3rd is summary neg, wait...

# Let's just fix the end of the Market Impact Overview table
# Search for the newly added new_tbody_content and ensure table and div close properly
if '                            }' in content:
    # the issue is likely missing </tbody></table></div> from the injected text
    # Let's do a more robust replace
    pass
