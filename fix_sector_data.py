import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Add speakers to the mock data for sectorSummary
old_mock_sectors = """        sectorSummary: [
            { name: "반도체/AI 인프라", positive: 85, negative: 15, comment: "역대 최대 실적 릴레이와 AI 설비 투자 소식에 강력한 시선이 쏠리고 있습니다." },
            { name: "금융/전체 시장", positive: 50, negative: 50, comment: "기준금리 동결과 매파적 교체가 혼재되며 뚜렷한 방향을 찾지 못하고 있습니다." },
            { name: "무역·관세/수출 제조업", positive: 20, negative: 80, comment: "관세 세수 유지 발언으로 수출 대형주들에 무거운 부담이 가중되는 중입니다." },
            { name: "전기차/AI 로봇", positive: 45, negative: 55, comment: "Optimus 양산 기대감과 단기 실적 우려가 맞서며 치열한 공방이 벌어지고 있습니다." },
            { name: "자동차/하이브리드", positive: 30, negative: 70, comment: "역대 최대 매출에도 관세 불확실성이 발목을 강하게 잡고 있습니다." },
            { name: "조선/방산/전력", positive: 75, negative: 25, comment: "수주 모멘텀과 비중확대 리포트가 이어지며 단단한 훈풍이 부는 구간입니다." }
        ]"""

new_mock_sectors = """        sectorSummary: [
            { name: "반도체/AI 인프라", positive: 85, negative: 15, comment: "역대 최대 실적 릴레이와 AI 설비 투자 소식에 강력한 시선이 쏠리고 있습니다.", speakers: ["젠슨 황", "일론 머스크", "최태원"] },
            { name: "금융/전체 시장", positive: 50, negative: 50, comment: "기준금리 동결과 매파적 교체가 혼재되며 뚜렷한 방향을 찾지 못하고 있습니다.", speakers: ["스콧 베센트", "신원식", "이창용"] },
            { name: "무역·관세/수출 제조업", positive: 20, negative: 80, comment: "관세 세수 유지 발언으로 수출 대형주들에 무거운 부담이 가중되는 중입니다.", speakers: ["도널드 트럼프"] },
            { name: "전기차/AI 로봇", positive: 45, negative: 55, comment: "Optimus 양산 기대감과 단기 실적 우려가 맞서며 치열한 공방이 벌어지고 있습니다.", speakers: ["일론 머스크"] },
            { name: "자동차/하이브리드", positive: 30, negative: 70, comment: "역대 최대 매출에도 관세 불확실성이 발목을 강하게 잡고 있습니다.", speakers: ["정의선", "호세 무뇨스"] },
            { name: "조선/방산/전력", positive: 75, negative: 25, comment: "수주 모멘텀과 비중확대 리포트가 이어지며 단단한 훈풍이 부는 구간입니다.", speakers: ["카를로스 델 토로", "신원식"] }
        ]"""

content = content.replace(old_mock_sectors, new_mock_sectors)

with open(filepath, "w") as f:
    f.write(content)
