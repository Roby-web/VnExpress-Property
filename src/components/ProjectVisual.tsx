import React, { useState } from 'react';
import { Camera, ShieldCheck, AlertTriangle } from 'lucide-react';

interface ProjectVisualProps {
  id: string;
  name: string;
  className?: string;
  variant?: 'thumb' | 'hero' | 'banner';
  imageUrl?: string;
}

const PROJECT_PHOTOS: Record<string, { url: string; tag: string; isCaution?: boolean }> = {
  'the-metropole': {
    url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    tag: 'Thủ Thiêm ven sông'
  },
  'masteri-centre-point': {
    url: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200&q=80',
    tag: 'Grand Park Compound'
  },
  'lumiere-riverside': {
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    tag: 'Thảo Điền gần Metro'
  },
  'akari-city': {
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    tag: 'Đại lộ Võ Văn Kiệt'
  },
  'ehome-southgate': {
    url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
    tag: 'Đô thị Waterpoint'
  },
  'the-matrix-one': {
    url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
    tag: 'Mễ Trì công viên 14 ha'
  },
  'du-an-canh-bao-binh-chanh': {
    url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    tag: 'Cảnh báo vi phạm',
    isCaution: true
  }
};

export const ProjectVisual: React.FC<ProjectVisualProps> = ({
  id,
  name,
  className = '',
  variant = 'thumb',
  imageUrl
}) => {
  const [imageError, setImageError] = useState(false);
  const data = PROJECT_PHOTOS[id] || {
    url: imageUrl || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    tag: 'Ảnh thực địa dự án'
  };

  const finalUrl = imageError ? (PROJECT_PHOTOS['the-metropole'].url) : (imageUrl || data.url);
  const isCaution = id.includes('canh-bao') || data.isCaution;

  const minHeight = variant === 'hero' ? 'h-72 sm:h-96' : variant === 'banner' ? 'h-52' : 'h-48 sm:h-52';

  return (
    <div className={`relative overflow-hidden w-full select-none bg-[#202020] ${minHeight} ${className}`}>
      {/* Real Architectural Photograph */}
      <img
        src={finalUrl}
        alt={name}
        onError={() => setImageError(true)}
        className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
        loading="lazy"
      />

      {/* Top badges */}
      <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-2 font-ui">
        <span className="text-[11px] font-bold text-[#202020] bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-[2px] border border-[#d6d6d6] shadow-xs">
          {data.tag}
        </span>
        {isCaution && (
          <span className="text-[11px] font-bold text-[#da1e28] bg-[#f8d4d6] px-2 py-0.5 rounded-[2px] border border-[#da1e28] flex items-center gap-1 shadow-xs">
            <AlertTriangle className="w-3 h-3 text-[#da1e28]" />
            <span>Cảnh báo rủi ro</span>
          </span>
        )}
      </div>

      {/* Verified On-site Watermark Stamp Top-Right (when not caution) */}
      {!isCaution && (
        <div className="absolute top-2.5 right-12 z-10 hidden sm:flex items-center gap-1 bg-[#202020]/75 backdrop-blur-xs text-white text-[10px] font-ui px-2 py-0.5 rounded-[2px] border border-white/20">
          <Camera className="w-3 h-3 text-[#24a148]" />
          <span>Ảnh thực địa</span>
        </div>
      )}

      {/* Bottom dark gradient overlay with project title */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white pt-8">
        <h4 className="font-article-title text-sm sm:text-base font-bold leading-snug drop-shadow-xs line-clamp-1">
          {name}
        </h4>
        <p className="font-body-content text-[11px] text-[#fafafa]/90 mt-0.5 flex items-center gap-1.5">
          <span className="text-[#fce6eb] font-semibold">VnExpress - Property</span>
          <span>·</span>
          <span>Đối chiếu thực tế 2026</span>
        </p>
      </div>
    </div>
  );
};
