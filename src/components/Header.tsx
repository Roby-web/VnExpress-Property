import React from 'react';
import { Bookmark, Scale, User, ShieldAlert } from 'lucide-react';

interface HeaderProps {
  onOpenSSO: () => void;
  savedCount: number;
  compareCount: number;
  onOpenCompare: () => void;
  onNavigateSection: (sectionId: string) => void;
  userLoggedIn: boolean;
  userName?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSSO,
  savedCount,
  compareCount,
  onOpenCompare,
  onNavigateSection,
  userLoggedIn,
  userName = 'Độc giả VnExpress'
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#ffffff] border-b border-[#d6d6d6] transition-colors">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-article-title text-xl font-bold tracking-tight text-[#b13460] hover:text-[#932a4e] transition-colors whitespace-nowrap"
          >
            VnExpress - Property
          </a>
        </div>

        {/* Zone 2: 4-6 clean text navigation links (Merriweather Sans) */}
        <nav className="hidden lg:flex items-center gap-6 font-ui text-xs font-normal text-[#202020]">
          <button
            type="button"
            onClick={() => onNavigateSection('section-projects')}
            className="hover:text-[#b13460] transition-colors cursor-pointer py-1"
          >
            Hồ sơ dự án
          </button>
          <button
            type="button"
            onClick={() => onNavigateSection('section-checklist')}
            className="hover:text-[#b13460] transition-colors cursor-pointer py-1"
          >
            Checklist pháp lý
          </button>
          <button
            type="button"
            onClick={() => onNavigateSection('section-map')}
            className="hover:text-[#b13460] transition-colors cursor-pointer py-1"
          >
            Tra cứu quy hoạch
          </button>
          <button
            type="button"
            onClick={() => onNavigateSection('section-calculator')}
            className="hover:text-[#b13460] transition-colors cursor-pointer py-1"
          >
            Tính khoản vay
          </button>
          <button
            type="button"
            onClick={() => onNavigateSection('section-warnings')}
            className="text-[#da1e28] hover:text-[#b13460] transition-colors cursor-pointer py-1 flex items-center gap-1 font-bold"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-[#da1e28]" />
            <span>Cảnh báo rủi ro</span>
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5">
          {compareCount > 0 && (
            <button
              type="button"
              onClick={onOpenCompare}
              className="h-8 px-3 text-xs font-bold font-ui text-[#466fa1] bg-[#eaf0f8] hover:bg-[#d8e5f5] border border-[#d6d6d6] rounded-[8px] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>So sánh (<span className="font-numeric">{compareCount}</span>)</span>
            </button>
          )}

          {userLoggedIn ? (
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline font-ui text-xs text-[#5f5f5f] truncate max-w-[120px]">
                {userName}
              </span>
              <button
                type="button"
                onClick={onOpenSSO}
                className="h-8 px-3 text-xs font-bold font-ui text-[#365983] bg-[#eaf0f8] border border-[#d6d6d6] rounded-[8px] transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Tài khoản cá nhân"
              >
                <Bookmark className="w-3.5 h-3.5 text-[#466fa1]" />
                <span className="font-numeric">{savedCount} đã lưu</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenSSO}
              className="h-8 px-3.5 text-xs font-bold font-ui text-white bg-[#b13460] hover:bg-[#932a4e] rounded-[8px] transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <User className="w-3.5 h-3.5" />
              <span>Đăng nhập VnExpress</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
