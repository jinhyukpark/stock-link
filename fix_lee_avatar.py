import os
import shutil

# Copy the attached Lee Chang-yong image to the public folder
os.makedirs('client/public/images', exist_ok=True)
shutil.copy('attached_assets/image_1782905554901.png', 'client/public/images/leechangyong.png')

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Replace the Wikipedia URL with the local image path
content = content.replace(
    "'이창용': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Chang_Yong_Rhee_%28cropped%29.jpg/240px-Chang_Yong_Rhee_%28cropped%29.jpg',",
    "'이창용': '/images/leechangyong.png',"
)

with open(filepath, "w") as f:
    f.write(content)
