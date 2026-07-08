import os
import re

# 1. 메뉴 위치 변경 (insight.tsx)
filepath_insight = "client/src/pages/insight.tsx"
with open(filepath_insight, "r") as f:
    content_insight = f.read()

# Swap the order in TABS array
old_tabs = """const TABS = [
    { id: "market", label: "Market View", icon: LineChart },
    { id: "social", label: "Social Analysis", icon: Share2 },
    { id: "momentum", label: "Momentum", icon: Activity },
];"""

new_tabs = """const TABS = [
    { id: "market", label: "Market View", icon: LineChart },
    { id: "momentum", label: "Momentum", icon: Activity },
    { id: "social", label: "Social Analysis", icon: Share2 },
];"""

if old_tabs in content_insight:
    content_insight = content_insight.replace(old_tabs, new_tabs)

with open(filepath_insight, "w") as f:
    f.write(content_insight)


# 2, 3, 4, 5. 소셜 분석 UI 개편 (SocialAnalysisView.tsx)
filepath_social = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath_social, "r") as f:
    content_social = f.read()

# Add time to MOCK_DATA
# This is a bit tricky with pure replace, let's just do a big replace for the speaker items 
# by injecting the time field and updating the UI render.

# First, modify the mock data to include 'time'
old_mock_data_1 = """summary: "한국 1분기 실질 GDP가 전기 대비 1.3% 성장하며 시장 전망치(0.6%)를 크게 웃돌았습니다. 이는 2년 3개월 만에 최고치입니다.","""
new_mock_data_1 = """summary: "한국 1분기 실질 GDP가 전기 대비 1.3% 성장하며 시장 전망치(0.6%)를 크게 웃돌았습니다. 이는 2년 3개월 만에 최고치입니다.",
                time: "10:30","""
                
old_mock_data_2 = """summary: "테슬라 Q1 실적 발표. EPS 0.45달러로 예상치 하회했으나, 저가형 모델 조기 출시와 로보택시 비전 제시로 애프터마켓 주가 13% 급등.","""
new_mock_data_2 = """summary: "테슬라 Q1 실적 발표. EPS 0.45달러로 예상치 하회했으나, 저가형 모델 조기 출시와 로보택시 비전 제시로 애프터마켓 주가 13% 급등.",
                time: "07:15","""

old_mock_data_3 = """summary: "우리가 백악관에 돌아가면 무역 적자를 줄이고 미국 제조업을 보호하기 위해 15%의 보편 관세를 즉각 도입할 것입니다.","""
new_mock_data_3 = """summary: "우리가 백악관에 돌아가면 무역 적자를 줄이고 미국 제조업을 보호하기 위해 15%의 보편 관세를 즉각 도입할 것입니다.",
                time: "14:22","""

content_social = content_social.replace(old_mock_data_1, new_mock_data_1)
content_social = content_social.replace(old_mock_data_2, new_mock_data_2)
content_social = content_social.replace(old_mock_data_3, new_mock_data_3)

# Now rebuild the sections
# Let's replace the whole table block with the new layout matching the request.
# The user wants:
# - 발언자 카드에 요약 + 시각 표시
# - 종목 로고 대신 국가 국기 표시, 종목명 + 영향도 % (수혜/리스크 종목만)
# - 시장 영향도 섹션을 발언자 카드 구조로 변경
# - 종합 요약(기존 수혜/리스크 박스)을 테이블 구조로 변경

# This is a massive UI rewrite. It's safer to use a full replacement script.

import re
