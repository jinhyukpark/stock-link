import os
import shutil

# Copy the attached Elon Musk image to the public folder
os.makedirs('client/public/images', exist_ok=True)
shutil.copy('attached_assets/image_1782905538602.png', 'client/public/images/elon.png')

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Replace the Wikipedia URL with the local image path
content = content.replace(
    "'일론 머스크': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/240px-Elon_Musk_Royal_Society_%28crop2%29.jpg',",
    "'일론 머스크': '/images/elon.png',"
)

with open(filepath, "w") as f:
    f.write(content)
