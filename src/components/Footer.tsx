import React from 'react';
import { ShieldCheck, Mail, Phone } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
  return (
    <footer className="bg-[#ffffff] border-t border-[#d6d6d6] pt-10 pb-8 text-[#5f5f5f]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-[#ececec]">
          
          {/* Brand & Mission */}
          <div className="md:col-span-1 space-y-2.5">
            <span className="font-article-title text-xl font-bold tracking-tight text-[#b13460]">
              VnExpress - Property
            </span>
            <p className="font-body-content text-xs text-[#5f5f5f] leading-relaxed">
              Chuyên trang dữ liệu và kiểm định hồ sơ bất động sản trực thuộc VnExpress. Lấy hồ sơ dự án làm sản phẩm lõi, bảo vệ người mua trước rủi ro pháp lý và giá ảo.
            </p>
            <div className="font-ui text-xs text-[#202020] pt-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#24a148]" />
              <span>Đối chiếu từ cơ sở dữ liệu công chứng</span>
            </div>
          </div>

          {/* Core Features */}
          <div className="space-y-2 text-xs">
            <span className="font-ui font-bold text-[#202020] block">
              Tính năng cốt lõi (MVP)
            </span>
            <ul className="space-y-1.5 font-ui text-[#5f5f5f]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('section-projects')}
                  className="hover:text-[#b13460] transition-colors cursor-pointer"
                >
                  Hồ sơ dự án chuẩn hóa (F1)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('section-projects')}
                  className="hover:text-[#b13460] transition-colors cursor-pointer"
                >
                  Bóc tách 3 tầng giá (F6)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('section-map')}
                  className="hover:text-[#b13460] transition-colors cursor-pointer"
                >
                  Bản đồ hạ tầng Metro (F5)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('section-checklist')}
                  className="hover:text-[#b13460] transition-colors cursor-pointer"
                >
                  Checklist pháp lý (B3)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('section-calculator')}
                  className="hover:text-[#b13460] transition-colors cursor-pointer"
                >
                  Công cụ tính khoản vay (F7)
                </button>
              </li>
            </ul>
          </div>

          {/* Trust & Warnings */}
          <div className="space-y-2 text-xs">
            <span className="font-ui font-bold text-[#202020] block">
              Minh bạch và Cảnh báo
            </span>
            <ul className="space-y-1.5 font-ui text-[#5f5f5f]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('section-warnings')}
                  className="hover:text-[#da1e28] transition-colors cursor-pointer text-[#da1e28] font-bold"
                >
                  Danh sách cảnh báo dự án (B2)
                </button>
              </li>
              <li>
                <span>Thang điểm minh bạch 0 - 100 (B1)</span>
              </li>
              <li>
                <span>Cơ chế tự sửa thông tin 72 giờ (B10)</span>
              </li>
              <li>
                <span>Tra cứu quy hoạch chi tiết 1/500</span>
              </li>
            </ul>
          </div>

          {/* Compliance & Contact */}
          <div className="space-y-2 text-xs">
            <span className="font-ui font-bold text-[#202020] block">
              Ban biên tập VnExpress
            </span>
            <p className="font-body-content text-xs text-[#5f5f5f] leading-relaxed">
              Tòa soạn Báo điện tử VnExpress · Ban Bất động sản và Dữ liệu điều tra.
            </p>
            <div className="space-y-1 font-body-content text-xs text-[#5f5f5f] pt-1">
              <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#466fa1]" />
                <span>bandoc@vnexpress.net</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#466fa1]" />
                <span className="font-numeric">Đường dây nóng: 083.888.0123</span>
              </p>
            </div>
          </div>

        </div>

        {/* Legal Disclaimer & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-body-content text-[#7f7f7f]">
          <p className="text-center sm:text-left leading-relaxed">
            © 2026 VnExpress - Property. Bản quyền thuộc Báo điện tử VnExpress. Tuân thủ Nghị định 13/2023 về bảo vệ dữ liệu cá nhân. Các thông tin đánh giá dựa trên nguồn văn bản công khai và đối chiếu độc lập.
          </p>
          <div className="flex items-center gap-3 shrink-0 font-ui text-xs">
            <span className="hover:text-[#202020] cursor-pointer">Điều khoản</span>
            <span className="text-[#d6d6d6]">|</span>
            <span className="hover:text-[#202020] cursor-pointer">Bảo mật</span>
            <span className="text-[#d6d6d6]">|</span>
            <span className="hover:text-[#202020] cursor-pointer">Quy trình khiếu nại (48 giờ)</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
