import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# I want to make sure the "종합 요약 테이블" from the mockup also looks correct, but looking at the user's request:
# "전체 데이터를 종목 기준이 아니라 '주요 인사' 기준으로 그룹핑해서 뿌려줘."
# "시장 영향 분석 테이블(또는 리스트)의 첫 번째 컬럼은 반드시 '주요 인사'여야 해."
# It seems they were mainly talking about the table we just modified.

# Let's adjust the spacing for the cards inside the "시장 영향도: 높음 - 상세 분석"
content = content.replace(
    '<div className="flex flex-col gap-6">',
    '<div className="flex flex-col gap-4">'
)

with open(filepath, "w") as f:
    f.write(content)
