import os
import shutil

# The build failed because the @assets alias is not configured in Vite or tsconfig.
# So we need to copy the image to the public folder and use a relative URL.

os.makedirs('client/public/images', exist_ok=True)
shutil.copy('attached_assets/image_1782905282101.png', 'client/public/images/trump.png')

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Remove the bad import
content = content.replace('import trumpImg from "@assets/image_1782905282101.png";\n', '')
content = content.replace('import trumpImg from "@assets/image_1782905282101.png";', '')

# Use the public URL
content = content.replace(
    "'도널드 트럼프': trumpImg,",
    "'도널드 트럼프': '/images/trump.png',"
)

with open(filepath, "w") as f:
    f.write(content)
