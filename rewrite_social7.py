import os

filepath = "client/src/components/insight/SocialAnalysisView.tsx"

with open(filepath, "r") as f:
    content = f.read()

# Update influencer avatars
old_avatars = """const influencerAvatars: Record<string, string> = {
    '일론 머스크': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/240px-Elon_Musk_Royal_Society_%28crop2%29.jpg',
    '도널드 트럼프': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/240px-Donald_Trump_official_portrait.jpg',
    '짐 크레이머': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Jim_Cramer_2012_Shankbone.jpg/240px-Jim_Cramer_2012_Shankbone.jpg',
    '워런 버핏': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Warren_Buffett_KU_Visit.jpg/240px-Warren_Buffett_KU_Visit.jpg',
    '레이 달리오': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Ray_Dalio_2011.jpg/240px-Ray_Dalio_2011.jpg',
    '이창용': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Rhee_Chang-yong_in_2022.jpg/240px-Rhee_Chang-yong_in_2022.jpg',
    '제롬 파월': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Jerome_Powell_official_portrait_%28cropped%29.jpg/240px-Jerome_Powell_official_portrait_%28cropped%29.jpg',
    '한국은행 (공식)': 'https://logo.clearbit.com/bok.or.kr'
};"""

new_avatars = """const influencerAvatars: Record<string, string> = {
  '일론 머스크': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/240px-Elon_Musk_Royal_Society_%28crop2%29.jpg',
  '도널드 트럼프': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/240px-Donald_Trump_official_portrait.jpg',
  '이창용': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Chang_Yong_Rhee_%28cropped%29.jpg/240px-Chang_Yong_Rhee_%28cropped%29.jpg',
  '짐 크레이머': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Jim_Cramer_2012_Shankbone.jpg/240px-Jim_Cramer_2012_Shankbone.jpg',
  '워런 버핏': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Warren_Buffett_KU_Visit.jpg/240px-Warren_Buffett_KU_Visit.jpg',
  '레이 달리오': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Ray_Dalio_2011.jpg/240px-Ray_Dalio_2011.jpg',
  '제롬 파월': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Jerome_H._Powell%2C_Governor%2C_Federal_Reserve_Board_of_Governors_%28cropped%29.jpg/240px-Jerome_H._Powell%2C_Governor%2C_Federal_Reserve_Board_of_Governors_%28cropped%29.jpg',
  '한국은행 (공식)': 'https://logo.clearbit.com/bok.or.kr'
};"""

content = content.replace(old_avatars, new_avatars)

# Update Avatar component
old_avatar_comp = """const Avatar = ({ name, className }: { name: string, className?: string }) => {
    const src = influencerAvatars[name];
    const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2);

    return (
        <div className={cn("relative flex-shrink-0", className || "w-10 h-10")}>
            {src ? (
                <img
                    src={src}
                    alt={name}
                    className="w-full h-full rounded-full object-cover object-top border-2 border-slate-600 shadow-md"
                    onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        ((e.target as HTMLImageElement).nextSibling as HTMLElement).style.display = 'flex';
                    }}
                />
            ) : null}
            <div
                style={{ display: src ? 'none' : 'flex' }}
                className="w-full h-full rounded-full bg-slate-600 border-2 border-slate-500 flex items-center justify-center text-white text-sm font-bold shadow-md"
            >
                {initials}
            </div>
        </div>
    );
};"""

new_avatar_comp = """const Avatar = ({ name, className }: { name: string, className?: string }) => {
    const src = influencerAvatars[name];
    const initials = name.replace(/\s/g, '').slice(0, 2);

    return (
        <div className={cn("relative flex-shrink-0", className || "w-10 h-10")}>
            {src && (
                <img
                    src={src}
                    alt={name}
                    className="w-full h-full rounded-full object-cover object-top border-2 border-slate-600 shadow-md"
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        (e.currentTarget.nextSibling as HTMLElement).style.display = 'flex';
                    }}
                />
            )}
            <div
                style={{ display: src ? 'none' : 'flex' }}
                className="absolute inset-0 w-full h-full rounded-full bg-slate-700 border-2 border-slate-600 items-center justify-center text-white text-sm font-bold shadow-md"
            >
                {initials}
            </div>
        </div>
    );
};"""

content = content.replace(old_avatar_comp, new_avatar_comp)


# Replace complex icon components with the new DirectionBadge
old_direction_icons = """// 3. Direction Icons (Stock Market Style)
const BenefitIcon = () => (
    <div className="flex flex-col items-center gap-0.5">
      <div className="flex items-center gap-1">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect x="10" y="8" width="4" height="10" fill="#34d399" rx="1"/>
          <line x1="12" y1="2" x2="12" y2="8" stroke="#34d399" strokeWidth="2"/>
          <line x1="12" y1="18" x2="12" y2="22" stroke="#34d399" strokeWidth="2"/>
          <polyline points="6,10 12,4 18,10" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
        <span className="text-emerald-400 text-xs font-bold">수혜</span>
      </div>
      <div className="flex items-end gap-[2px] h-4">
        <div className="w-1.5 h-1.5 bg-emerald-600 rounded-sm"/>
        <div className="w-1.5 h-2.5 bg-emerald-500 rounded-sm"/>
        <div className="w-1.5 h-3.5 bg-emerald-400 rounded-sm"/>
        <div className="w-1.5 h-4 bg-emerald-300 rounded-sm"/>
      </div>
    </div>
);

const RiskIcon = () => (
    <div className="flex flex-col items-center gap-0.5">
      <div className="flex items-center gap-1">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect x="10" y="6" width="4" height="10" fill="#ff7c7e" rx="1"/>
          <line x1="12" y1="2" x2="12" y2="6" stroke="#ff7c7e" strokeWidth="2"/>
          <line x1="12" y1="16" x2="12" y2="22" stroke="#ff7c7e" strokeWidth="2"/>
          <polyline points="6,14 12,20 18,14" fill="none" stroke="#ff7c7e" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
        <span className="text-[#ff7c7e] text-xs font-bold">리스크</span>
      </div>
      <div className="flex items-end gap-[2px] h-4">
        <div className="w-1.5 h-4 bg-[#ff7c7e] rounded-sm opacity-90"/>
        <div className="w-1.5 h-3 bg-[#ff7c7e] rounded-sm opacity-70"/>
        <div className="w-1.5 h-2 bg-[#ff7c7e] rounded-sm opacity-50"/>
        <div className="w-1.5 h-1 bg-[#ff7c7e] rounded-sm opacity-30"/>
      </div>
    </div>
);

const NeutralIcon = () => (
    <div className="flex flex-col items-center gap-0.5">
      <div className="flex items-center gap-1">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <line x1="4" y1="12" x2="20" y2="12" stroke="#94a3b8" strokeWidth="2"/>
          <polyline points="7,9 4,12 7,15" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
          <polyline points="17,9 20,12 17,15" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <span className="text-slate-400 text-xs font-bold">관망</span>
      </div>
      <div className="flex items-end gap-[2px] h-4">
        <div className="w-1.5 h-2.5 bg-slate-600 rounded-sm"/>
        <div className="w-1.5 h-2 bg-slate-600 rounded-sm"/>
        <div className="w-1.5 h-3 bg-slate-600 rounded-sm"/>
        <div className="w-1.5 h-2.5 bg-slate-600 rounded-sm"/>
      </div>
    </div>
);

const SlightBenefitIcon = () => (
    <div className="flex flex-col items-center gap-0.5 opacity-80">
      <div className="flex items-center gap-1">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect x="10" y="8" width="4" height="10" fill="#34d399" rx="1"/>
          <line x1="12" y1="2" x2="12" y2="8" stroke="#34d399" strokeWidth="2"/>
          <line x1="12" y1="18" x2="12" y2="22" stroke="#34d399" strokeWidth="2"/>
          <polyline points="6,10 12,4 18,10" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
        <span className="text-emerald-500 text-xs font-bold">소폭 수혜</span>
      </div>
      <div className="flex items-end gap-[2px] h-4">
        <div className="w-1.5 h-1.5 bg-emerald-600 rounded-sm opacity-60"/>
        <div className="w-1.5 h-2.5 bg-emerald-500 rounded-sm opacity-60"/>
        <div className="w-1.5 h-3.5 bg-emerald-400 rounded-sm opacity-60"/>
      </div>
    </div>
);

const SlightRiskIcon = () => (
    <div className="flex flex-col items-center gap-0.5 opacity-80">
      <div className="flex items-center gap-1">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect x="10" y="6" width="4" height="10" fill="#ff7c7e" rx="1"/>
          <line x1="12" y1="2" x2="12" y2="6" stroke="#ff7c7e" strokeWidth="2"/>
          <line x1="12" y1="16" x2="12" y2="22" stroke="#ff7c7e" strokeWidth="2"/>
          <polyline points="6,14 12,20 18,14" fill="none" stroke="#ff7c7e" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
        <span className="text-[#ff7c7e] text-xs font-bold opacity-70">소폭 리스크</span>
      </div>
      <div className="flex items-end gap-[2px] h-4">
        <div className="w-1.5 h-3.5 bg-[#ff7c7e] rounded-sm opacity-60"/>
        <div className="w-1.5 h-2.5 bg-[#ff7c7e] rounded-sm opacity-60"/>
        <div className="w-1.5 h-1.5 bg-[#ff7c7e] rounded-sm opacity-60"/>
      </div>
    </div>
);

const renderDirectionIcon = (direction: string) => {
    switch (direction) {
        case "수혜": return <BenefitIcon />;
        case "리스크": return <RiskIcon />;
        case "소폭 수혜": return <SlightBenefitIcon />;
        case "소폭 리스크": return <SlightRiskIcon />;
        case "관망":
        default: return <NeutralIcon />;
    }
};"""

new_direction_badge = """// 3. Direction Badge (Compact, single-line format)
const DirectionBadge = ({ type }: { type: string }) => {
  const config: Record<string, { icon: string, label: string, color: string, bg: string }> = {
    '수혜':       { icon: '▲', label: '수혜',    color: '#34d399', bg: 'rgba(52,211,153,0.1)'  },
    '소폭 수혜':   { icon: '↗', label: '소폭수혜', color: '#34d399', bg: 'rgba(52,211,153,0.07)' },
    '관망':       { icon: '─', label: '관망',    color: '#94a3b8', bg: 'rgba(148,163,184,0.1)' },
    '소폭 리스크': { icon: '↘', label: '소폭리스크', color: '#ff7c7e', bg: 'rgba(255,124,126,0.07)' },
    '리스크':     { icon: '▼', label: '리스크',  color: '#ff7c7e', bg: 'rgba(255,124,126,0.1)' },
  };

  const c = config[type] ?? config['관망'];

  return (
    <div
      className="inline-flex items-center justify-center gap-1 px-2 py-1 rounded-md whitespace-nowrap text-xs font-semibold min-w-[70px]"
      style={{ color: c.color, backgroundColor: c.bg }}
    >
      <span className="text-[10px] leading-none">{c.icon}</span>
      <span className="leading-none">{c.label}</span>
    </div>
  );
};"""

content = content.replace(old_direction_icons, new_direction_badge)

# Update market impact table rendering
content = content.replace("{renderDirectionIcon(item.direction)}", "<DirectionBadge type={item.direction} />")

# Update section 4 summary cards
content = content.replace("<BenefitIcon />", '<DirectionBadge type="수혜" />')
content = content.replace("<RiskIcon />", '<DirectionBadge type="리스크" />')
content = content.replace("<NeutralIcon />", '<DirectionBadge type="관망" />')


with open(filepath, "w") as f:
    f.write(content)
