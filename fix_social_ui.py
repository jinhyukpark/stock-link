import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# 1. Fix Sector Column Width and text wrapping
content = content.replace(
    '<th className="px-6 py-4 w-32 font-semibold text-center">섹터</th>',
    '<th className="px-6 py-4 min-w-[140px] font-semibold text-center">섹터</th>'
)
content = content.replace(
    '<span className="text-slate-300 text-xs">{item.sector}</span>',
    '<span className="text-slate-300 text-xs whitespace-nowrap">{item.sector}</span>'
)

# 2. Update influencer avatars to use the new drawn images
old_avatars = """const influencerAvatars: Record<string, string> = {
  '일론 머스크': '/images/elon.png',
  '도널드 트럼프': '/images/trump.png',
  '이창용': '/images/leechangyong.png',
  '짐 크레이머': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Jim_Cramer_2012_Shankbone.jpg/240px-Jim_Cramer_2012_Shankbone.jpg',
  '워런 버핏': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Warren_Buffett_KU_Visit.jpg/240px-Warren_Buffett_KU_Visit.jpg',
  '레이 달리오': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Ray_Dalio_2011.jpg/240px-Ray_Dalio_2011.jpg',
  '제롬 파월': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Jerome_H._Powell%2C_Governor%2C_Federal_Reserve_Board_of_Governors_%28cropped%29.jpg/240px-Jerome_H._Powell%2C_Governor%2C_Federal_Reserve_Board_of_Governors_%28cropped%29.jpg',
  '한국은행 (공식)': 'https://logo.clearbit.com/bok.or.kr',
  '케빈 워시': '/images/kevinwarsh.png'
};"""

# If the exact block above isn't matched due to formatting, we can just replace everything between const influencerAvatars and };
import re
new_avatars = """const influencerAvatars: Record<string, string> = {
  '일론 머스크': '/images/drawn_elon.png',
  '도널드 트럼프': '/images/drawn_trump.png',
  '이창용': '/images/drawn_lee.png',
  '케빈 워시': '/images/drawn_warsh.png',
  '짐 크레이머': '/images/drawn_cramer.png',
  '워런 버핏': '/images/drawn_buffett.png',
  '레이 달리오': '/images/drawn_dalio.png',
  '제롬 파월': '/images/drawn_powell.png',
  '한국은행 (공식)': 'https://logo.clearbit.com/bok.or.kr'
};"""

content = re.sub(r'const influencerAvatars: Record<string, string> = \{.*?\};', new_avatars, content, flags=re.DOTALL)

with open(filepath, "w") as f:
    f.write(content)
