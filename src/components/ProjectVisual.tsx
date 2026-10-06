import React from 'react';

interface ProjectVisualProps {
  id: string;
  name: string;
  className?: string;
  variant?: 'thumb' | 'hero' | 'banner';
}

export const ProjectVisual: React.FC<ProjectVisualProps> = ({
  id,
  name,
  className = '',
  variant = 'thumb'
}) => {
  const getTheme = () => {
    switch (id) {
      case 'the-metropole':
        return {
          bg: '#f0f4f8',
          building: '#365983',
          accents: '#466fa1',
          glass: '#ffffff',
          tag: 'Thủ Thiêm ven sông'
        };
      case 'masteri-centre-point':
        return {
          bg: '#f5f7fa',
          building: '#2c425e',
          accents: '#466fa1',
          glass: '#ffffff',
          tag: 'Grand Park Compound'
        };
      case 'lumiere-riverside':
        return {
          bg: '#eef2f6',
          building: '#334e68',
          accents: '#627d98',
          glass: '#ffffff',
          tag: 'Thảo Điền gần Metro'
        };
      case 'akari-city':
        return {
          bg: '#f7f7f7',
          building: '#486581',
          accents: '#829ab1',
          glass: '#ffffff',
          tag: 'Đại lộ Võ Văn Kiệt'
        };
      case 'ehome-southgate':
        return {
          bg: '#f0f5f2',
          building: '#2d6a4f',
          accents: '#52b788',
          glass: '#ffffff',
          tag: 'Đô thị Waterpoint'
        };
      case 'the-matrix-one':
        return {
          bg: '#f4f4f6',
          building: '#3e4c59',
          accents: '#52606d',
          glass: '#ffffff',
          tag: 'Mễ Trì công viên 14 ha'
        };
      case 'du-an-canh-bao-binh-chanh':
      default:
        return {
          bg: '#fdf2f2',
          building: '#9b2c2c',
          accents: '#da1e28',
          glass: '#ffffff',
          tag: 'Cảnh báo vi phạm'
        };
    }
  };

  const theme = getTheme();
  const isCaution = id.includes('canh-bao');

  return (
    <div
      className={`relative overflow-hidden flex flex-col justify-between select-none ${className}`}
      style={{ 
        backgroundColor: theme.bg,
        minHeight: variant === 'hero' ? '280px' : '160px' 
      }}
    >
      {/* Background Architectural Vector Silhouette */}
      <svg
        className="absolute inset-0 w-full h-full opacity-75 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 240"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id={`pattern-win-${id}`} width="12" height="18" patternUnits="userSpaceOnUse">
            <rect x="2" y="2" width="8" height="12" rx="1" fill={theme.glass} opacity="0.8" />
          </pattern>
        </defs>

        {/* Distant skyline */}
        <polygon points="20,190 40,140 70,140 85,190" fill="#d6d6d6" opacity="0.5" />
        <polygon points="90,190 110,110 145,110 160,190" fill="#d6d6d6" opacity="0.6" />
        <polygon points="260,190 285,120 325,120 345,190" fill="#d6d6d6" opacity="0.5" />

        {/* Main Architectural Tower 1 */}
        <rect x="70" y="45" width="110" height="165" fill={theme.building} />
        <rect x="75" y="55" width="100" height="145" fill={`url(#pattern-win-${id})`} />

        {/* Main Architectural Tower 2 */}
        <rect x="195" y="75" width="95" height="135" fill={theme.building} opacity="0.9" />
        <rect x="200" y="85" width="85" height="115" fill={`url(#pattern-win-${id})`} />

        {/* Architectural lines */}
        <line x1="70" y1="45" x2="180" y2="45" stroke={theme.accents} strokeWidth="2" />
        <line x1="195" y1="75" x2="290" y2="75" stroke={theme.accents} strokeWidth="2" />
        
        {/* Base ground line */}
        <rect x="0" y="200" width="400" height="40" fill="#333333" opacity="0.2" />
      </svg>

      {/* Top badges */}
      <div className="relative z-10 p-2.5 flex justify-between items-start font-ui">
        <span className="text-[11px] font-bold text-[#202020] bg-white/95 px-2 py-0.5 rounded-[2px] border border-[#d6d6d6]">
          {theme.tag}
        </span>
        {isCaution && (
          <span className="text-[11px] font-bold text-[#da1e28] bg-[#f8d4d6] px-2 py-0.5 rounded-[2px] border border-[#da1e28] flex items-center gap-1">
            <span>Cảnh báo rủi ro</span>
          </span>
        )}
      </div>

      {/* Bottom overlay with project title */}
      <div className="relative z-10 p-2.5 bg-gradient-to-t from-[#202020]/90 via-[#202020]/60 to-transparent text-white pt-5">
        <h4 className="font-article-title text-sm md:text-base font-bold leading-snug">
          {name}
        </h4>
        <p className="font-body-content text-[11px] text-[#fafafa] mt-0.5 flex items-center gap-1">
          <span>Hồ sơ chuẩn hóa VnExpress - Property</span>
          <span>·</span>
          <span>Ảnh thực địa 2026</span>
        </p>
      </div>
    </div>
  );
};
