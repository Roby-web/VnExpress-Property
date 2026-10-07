import React, { useState } from 'react';
import { OFFICIAL_WARNINGS } from '../data/projects';
import { ShieldAlert, AlertTriangle, FileText, Filter } from 'lucide-react';

export const WarningListSection: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredWarnings = selectedType === 'all'
    ? OFFICIAL_WARNINGS
    : OFFICIAL_WARNINGS.filter(w => w.type === selectedType);

  return (
    <section id="section-warnings" className="py-10 bg-[#fcfaf6] border-b border-[#d6d6d6]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header - concise, punchy */}
        <div className="max-w-3xl mb-6">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-[#f8d4d6] text-[#da1e28] text-xs font-bold font-ui mb-2 border border-[#da1e28]">
            <ShieldAlert className="w-3.5 h-3.5 text-[#da1e28]" />
            <span>Cảnh báo rủi ro pháp lý đã công bố</span>
          </div>
          <h2 className="font-article-title text-xl sm:text-2xl font-bold text-[#202020] leading-snug">
            Dự án có quyết định đình chỉ hoặc khuyến cáo không giao dịch
          </h2>
          <p className="font-body-content text-xs sm:text-sm text-[#5f5f5f] mt-1 leading-relaxed">
            Dữ liệu đối chiếu từ thông báo xử phạt của Thanh tra Xây dựng và cơ quan quản lý nhà nước.
          </p>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span className="text-xs font-ui text-[#5f5f5f] mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3 text-[#466fa1]" />
            Lọc rủi ro:
          </span>
          <button
            type="button"
            onClick={() => setSelectedType('all')}
            className={`px-3 py-1 text-xs font-ui rounded-[8px] transition-colors cursor-pointer ${
              selectedType === 'all'
                ? 'bg-[#202020] text-white font-bold'
                : 'bg-white text-[#5f5f5f] border border-[#d6d6d6] hover:bg-[#fafafa]'
            }`}
          >
            Tất cả (<span className="font-numeric">{OFFICIAL_WARNINGS.length}</span>)
          </button>
          <button
            type="button"
            onClick={() => setSelectedType('chua_du_dieu_kien')}
            className={`px-3 py-1 text-xs font-ui rounded-[8px] transition-colors cursor-pointer ${
              selectedType === 'chua_du_dieu_kien'
                ? 'bg-[#da1e28] text-white font-bold'
                : 'bg-white text-[#5f5f5f] border border-[#d6d6d6] hover:bg-[#fafafa]'
            }`}
          >
            Chưa đủ điều kiện bán
          </button>
          <button
            type="button"
            onClick={() => setSelectedType('sai_pham_quy_hoach')}
            className={`px-3 py-1 text-xs font-ui rounded-[8px] transition-colors cursor-pointer ${
              selectedType === 'sai_pham_quy_hoach'
                ? 'bg-[#da1e28] text-white font-bold'
                : 'bg-white text-[#5f5f5f] border border-[#d6d6d6] hover:bg-[#fafafa]'
            }`}
          >
            Sai phạm quy hoạch
          </button>
          <button
            type="button"
            onClick={() => setSelectedType('tranh_chap_the_chap')}
            className={`px-3 py-1 text-xs font-ui rounded-[8px] transition-colors cursor-pointer ${
              selectedType === 'tranh_chap_the_chap'
                ? 'bg-[#da1e28] text-white font-bold'
                : 'bg-white text-[#5f5f5f] border border-[#d6d6d6] hover:bg-[#fafafa]'
            }`}
          >
            Thế chấp ngân hàng
          </button>
        </div>

        {/* Warning cards grid with Real Photos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {filteredWarnings.map((warn) => (
            <div
              key={warn.id}
              className="bg-white rounded-[4px] border-2 border-[#f8d4d6] overflow-hidden flex flex-col justify-between transition-colors hover:border-[#da1e28] group"
            >
              <div>
                {/* Real Warning Photo Thumbnail */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-[#202020]">
                  <img
                    src={warn.imageUrl}
                    alt={warn.projectName}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 font-ui">
                    <span className="text-[11px] font-bold text-[#da1e28] bg-white/95 px-2 py-0.5 rounded-[2px] border border-[#da1e28] flex items-center gap-1 shadow-xs">
                      <AlertTriangle className="w-3 h-3 text-[#da1e28]" />
                      <span>{warn.status}</span>
                    </span>
                  </div>

                  {/* Warning Date */}
                  <span className="absolute top-2.5 right-2.5 z-10 text-[10px] font-numeric text-white bg-black/70 backdrop-blur-xs px-2 py-0.5 rounded-[2px]">
                    {warn.warningDate.split(',')[1] || warn.warningDate}
                  </span>

                  {/* Project Name Overlay */}
                  <div className="absolute bottom-2 left-3 right-3 z-10">
                    <h3 className="font-article-title text-sm sm:text-base font-bold text-white leading-snug drop-shadow-xs line-clamp-1">
                      {warn.projectName}
                    </h3>
                  </div>
                </div>

                {/* Card Body - concise, scannable */}
                <div className="p-4 space-y-2">
                  <p className="font-body-content text-xs text-[#5f5f5f]">
                    CĐT: <strong className="text-[#202020]">{warn.developer}</strong> · {warn.location}
                  </p>

                  <div className="p-2.5 bg-[#fdf2f2] rounded-[4px] border border-[#f8d4d6] text-xs font-body-content">
                    <strong className="text-[#9b2c2c] block mb-1 font-ui leading-tight">
                      {warn.title}
                    </strong>
                    <p className="text-[#5f5f5f] leading-relaxed line-clamp-3">
                      {warn.details}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Authority Source */}
              <div className="px-4 py-2.5 border-t border-[#ececec] bg-[#fafafa] flex items-center justify-between text-xs font-body-content text-[#5f5f5f]">
                <span className="flex items-center gap-1 text-[11px] font-numeric truncate max-w-[190px]" title={warn.sourceDoc}>
                  <FileText className="w-3 h-3 text-[#9f9f9f] shrink-0" />
                  <span className="truncate">{warn.sourceDoc}</span>
                </span>
                <span className="text-[#da1e28] font-bold font-ui text-[11px] shrink-0">Không giao dịch</span>
              </div>
            </div>
          ))}
        </div>

        {/* Legal Disclaimer Box - Shortened */}
        <div className="mt-5 p-3 bg-white rounded-[4px] border border-[#d6d6d6] text-[11px] font-body-content text-[#5f5f5f]">
          <strong className="text-[#202020]">Lưu ý:</strong> Dữ liệu tổng hợp từ văn bản xử phạt công khai. Nếu chủ đầu tư đã khắc phục và có quyết định giải tỏa, vui lòng gửi văn bản để cập nhật trong 48 giờ.
        </div>

      </div>
    </section>
  );
};
