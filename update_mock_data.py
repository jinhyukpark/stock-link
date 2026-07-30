import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Replace the entire speakers array
start_speakers = content.find('speakers: [')
end_speakers = content.find('],\n        sectorSummary: [')

if start_speakers != -1 and end_speakers != -1:
    before = content[:start_speakers]
    after = content[end_speakers:]

    new_speakers = """speakers: [
            { 
                id: 1, 
                speaker: "도널드 트럼프", speakerTitle: "미국 대통령", 
                country: "미국", countryCode: "us",
                platform: "Truth Social / 공개 발언", 
                summary: "이란과의 협상을 서두르지 않겠다며 'Truth Social'에 '나는 모든 시간이 있지만, 이란에는 없다. 시계가 가고 있다'고 게시. 협상을 원하지 않으면 군사적으로 끝낼 것이라고 경고하고, 호르무즈 해협 기뢰 설치 선박에 대한 격침 명령을 발표. 이스라엘-레바논 휴전은 3주 추가 연장.", 
                analysis: "호르무즈 해협 봉쇄 현실화 시 전 세계 원유 수출의 약 20%가 차단될 수 있어 에너지 가격 급등 리스크가 현실화됨. 방산주는 단기 수혜가 명확하나, 항공·해운주는 유가 급등과 항로 차질이라는 이중 부담에 노출.",
                positiveStocks: [{ ticker: "012450", name: "한화에어로스페이스", reason: "전쟁 장기화 기대에 방위산업 수혜" }, { ticker: "079550", name: "LIG넥스원", reason: "미사일/방어시스템 수요 증가 기대" }, { ticker: "064350", name: "현대로템", reason: "방산 수요 증가" }, { ticker: "329180", name: "HD현대중공업", reason: "해군 함정 수요 증가 기대" }, { ticker: "LMT", name: "Lockheed Martin", reason: "전쟁 장기화로 방위산업 수혜" }, { ticker: "XOM", name: "Exxon Mobil", reason: "호르무즈 해협 봉쇄로 유가 상승 수혜" }],
                negativeStocks: [{ ticker: "003490", name: "대한항공", reason: "유가 상승 및 중동 운항 차질 우려" }, { ticker: "086280", name: "현대글로비스", reason: "해운 운송 리스크 증가" }, { ticker: "010950", name: "S-Oil", reason: "원유 공급 불확실성" }, { ticker: "DAL", name: "Delta Air Lines", reason: "유가 급등 비용 부담" }],
                impactLevel: "high",
                time: "2026-04-24"
            },
            { 
                id: 2, 
                speaker: "일론 머스크", speakerTitle: "테슬라 CEO / X 오너", 
                country: "미국", countryCode: "us",
                platform: "테슬라 Q1 2026 실적발표 컨퍼런스콜", 
                summary: "테슬라 Q1 2026 실적 발표에서 EPS 0.41달러(예상치 0.37달러 상회, 어닝 서프라이즈), 매출 223.9억 달러(기대 미달). 2026년 CapEx를 200억 달러에서 250억 달러로 50억 달러 상향 조정. 옵티머스 로봇 대규모 공장 Q2 착공, 연간 100만 대 생산 목표 제시.", 
                analysis: "어닝 서프라이즈와 CapEx 대규모 확대가 동시에 발표되어 단기(수익성 우려)와 장기(성장 기대) 사이의 해석이 갈리는 상황. 옵티머스 로봇 연간 100만 대 목표는 로보틱스 섹터 전반의 밸류에이션 재평가를 유도.",
                positiveStocks: [{ ticker: "000660", name: "SK하이닉스", reason: "AI 자율주행용 HBM 수요 증가" }, { ticker: "277810", name: "레인보우로보틱스", reason: "휴머노이드 로봇 시장 확장 기대" }, { ticker: "TSLA", name: "Tesla", reason: "EPS 어닝 서프라이즈, 자율주행 로봇 미래 성장성" }, { ticker: "NVDA", name: "NVIDIA", reason: "AI 칩 자율주행 인프라 수요 확대" }],
                negativeStocks: [{ ticker: "TSLA", name: "Tesla", reason: "CapEx 250억 달러 상향으로 단기 수익성 압박, 실적 발표 후 시간외 하락" }],
                impactLevel: "high",
                time: "2026-04-22 17:30 ET"
            },
            { 
                id: 3, 
                speaker: "젠슨 황", speakerTitle: "NVIDIA CEO", 
                country: "미국", countryCode: "us",
                platform: "Fortune 인터뷰", 
                summary: "2027년까지 NVIDIA AI 칩 주문이 1조 달러에 달한다고 전망. AI가 '추론 인플렉션 포인트'에 진입했으며 반도체 수요는 '지수적(exponential)' 증가세라고 강조.", 
                analysis: "1조 달러 AI 칩 수요 전망은 AI 인프라 투자 사이클이 최소 2027년까지 지속됨을 의미하며, HBM 공급망 전반에 구조적 매수 근거를 강화함.",
                positiveStocks: [{ ticker: "000660", name: "SK하이닉스", reason: "AI 가속기용 HBM 수요 급증 수혜" }, { ticker: "042700", name: "한미반도체", reason: "HBM 패키징 장비 수요 증가" }, { ticker: "007660", name: "이수페타시스", reason: "AI 서버 기판 수요 증가" }, { ticker: "NVDA", name: "NVIDIA", reason: "AI 칩 수요 1조 달러 전망" }],
                negativeStocks: [],
                impactLevel: "high",
                time: "2026-04-22"
            },
            { 
                id: 4, 
                speaker: "신현송", speakerTitle: "한국은행 신임 총재", 
                country: "한국", countryCode: "kr",
                platform: "취임사 / 공식 기자회견", 
                summary: "취임 일성으로 '신중하고 유연한 통화정책 운영을 통해 물가안정과 금융안정을 도모하겠다'고 밝힘. 가계부채를 관리하지 못하면 내수 침체로 이어질 수 있다고 경고. 전문가들은 하반기 금리 인상 가능성을 주목.", 
                analysis: "하반기 금리 인상 가능성이 열리며 인터넷은행 할부금융주에 부담이 증가. 전통 금융지주사는 금리 상승 환경에서 예대마진 확대 수혜 기대.",
                positiveStocks: [{ ticker: "105560", name: "KB금융", reason: "금융안정 정책 수혜" }, { ticker: "016360", name: "삼성증권", reason: "금융안정 강조로 자본시장 신뢰 제고" }, { ticker: "006800", name: "미래에셋증권", reason: "자본시장 안정 기대" }],
                negativeStocks: [{ ticker: "323410", name: "카카오뱅크", reason: "가계부채 규제 강화 우려" }, { ticker: "279570", name: "케이뱅크", reason: "가계대출 축소 압력" }, { ticker: "005380", name: "현대차", reason: "금리 인상 가능성에 자동차 할부 수요 감소" }],
                impactLevel: "high",
                time: "2026-04-21 KST"
            },
            { 
                id: 5, 
                speaker: "팀 쿡", speakerTitle: "애플 CEO", 
                country: "미국", countryCode: "us",
                platform: "공식 보도자료 (Apple Newsroom)", 
                summary: "팀 쿡 CEO가 2026년 9월 1일부로 Executive Chairman으로 전환하고, 존 터너스 SVP가 차기 CEO. 재임 중 시가총액이 3,500억 달러에서 4조 달러로 성장. Q2 2026 실적은 4월 30일 발표 예정.", 
                analysis: "공식 승계 계획 발표로 최악의 시나리오는 회피함. 4월 30일 Q2 실적 발표가 신규 CEO 체제 첫 결정적 모멘텀.",
                positiveStocks: [{ ticker: "034220", name: "LG디스플레이", reason: "애플 부품 공급망 안정 지속 기대" }, { ticker: "AAPL", name: "Apple", reason: "승계 계획 공개로 불확실성 해소" }],
                negativeStocks: [{ ticker: "AAPL", name: "Apple", reason: "리더십 전환 불확실성으로 시간외 소폭 하락" }],
                impactLevel: "high",
                time: "2026-04-20"
            },
            { 
                id: 6, 
                speaker: "이창용", speakerTitle: "전 한국은행 총재", 
                country: "한국", countryCode: "kr",
                platform: "금통위 기자간담회", 
                summary: "기준금리 2.50% 7연속 동결 결정. '환율 안정 상태에서 후임에게 넘기고 싶었는데 트럼프 대통령이 도와주지 않았다'고 이임 발언.", 
                analysis: "2.50% 기준금리 7연속 동결로 금융지주사의 예대마진 환경 안정적 유지. 트럼프발 환율 변동성 지속이 에너지·해운주의 구조적 리스크로 지속.",
                positiveStocks: [{ ticker: "105560", name: "KB금융", reason: "금리 동결로 은행 예대마진 안정" }, { ticker: "055550", name: "신한지주", reason: "대출 수익 유지" }, { ticker: "086790", name: "하나금융지주", reason: "금리 동결 수혜" }],
                negativeStocks: [{ ticker: "015760", name: "한국전력", reason: "고환율 지속으로 연료 수입 비용 부담" }, { ticker: "042660", name: "한화오션", reason: "환율 불확실성 부담" }],
                impactLevel: "high",
                time: "2026-04-10 KST"
            },
            { 
                id: 7, 
                speaker: "스콧 베센트", speakerTitle: "미국 재무장관", 
                country: "미국", countryCode: "us",
                platform: "달라스 이코노믹 클럽", 
                summary: "미국인 40%가 주식시장에 노출되지 않았다며 '트럼프 어카운트' 등 주식 시장 참여 확대 필요성 역설. 관세 수익 '실질적으로 변하지 않을 것'이라고 발언.", 
                analysis: "개인 투자자 참여 확대는 브로커리지 및 소매 플랫폼에 긍정적이나, 제조업은 여전히 관세 불확실성 지속.",
                positiveStocks: [{ ticker: "006800", name: "미래에셋증권", reason: "" }, { ticker: "016360", name: "삼성증권", reason: "" }, { ticker: "SCHW", name: "Charles Schwab", reason: "소매 투자자 확대 수혜" }, { ticker: "HOOD", name: "Robinhood", reason: "소매 투자자 확대 수혜" }],
                negativeStocks: [{ ticker: "XLI", name: "Manufacturing ETF", reason: "관세 불확실성 지속" }],
                impactLevel: "medium",
                time: "2026-04-25"
            },
            { 
                id: 8, 
                speaker: "캐롤라인 레빗", speakerTitle: "백악관 대변인", 
                country: "미국", countryCode: "us",
                platform: "폭스뉴스 인터뷰", 
                summary: "미·이란 직접 회담 재개 발표. 파키스탄 중재 하 4월 25일 이슬라마바드에서 협상 재개. 긴장 완화 기대.", 
                analysis: "중동 긴장 완화로 유가 하락 기대, 항공 및 정유 섹터 변동성 예상.",
                positiveStocks: [{ ticker: "003490", name: "대한항공", reason: "" }, { ticker: "010950", name: "S-Oil", reason: "" }, { ticker: "DAL", name: "Delta Air Lines", reason: "유가 하락 기대" }],
                negativeStocks: [],
                impactLevel: "medium",
                time: "2026-04-24"
            },
            { 
                id: 9, 
                speaker: "이재명", speakerTitle: "더불어민주당 대표", 
                country: "한국", countryCode: "kr",
                platform: "X(트위터) / 공개 발언", 
                summary: "주식 과세체계 개편 필요성, 코스닥 제도 개선 가속화 희망, 자본시장 4대 개혁 추진.", 
                analysis: "코스닥 및 대표 플랫폼, 게임주 전반의 투자심리 개선 기대.",
                positiveStocks: [{ ticker: "KOSDAQ", name: "코스닥 전체", reason: "" }, { ticker: "035720", name: "카카오", reason: "" }, { ticker: "259960", name: "크래프톤", reason: "" }, { ticker: "247540", name: "에코프로비엠", reason: "" }],
                negativeStocks: [],
                impactLevel: "low",
                time: "2026-04-09 KST"
            }"""
    
    with open(filepath, "w") as f:
        f.write(before + new_speakers + after)
