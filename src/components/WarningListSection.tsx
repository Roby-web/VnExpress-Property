import React, { useState } from 'react';
import { OFFICIAL_WARNINGS } from '../data/projects';
import { ShieldAlert, FileText, Filter } from 'lucide-react';

export const WarningListSection: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredWarnings = selectedType === 'all'
    ? OFFICIAL_WARNINGS
    : OFFICIAL_WARNINGS.filter(w => w.type === selectedType);

  return (
    <section id="section-warnings" className="py-10 bg-[#fcfaf6] border-b border-[#d6d6d6]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-6">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-[#f8d4d6] text-[#da1e28] text-xs font-bold font-ui mb-2 border border-[#da1e28]">
            <ShieldAlert className="w-3.5 h-3.5 text-[#da1e28]" />
            <span>Danh sách cảnh báo vi phạm (B2 - P0)</span>
          </div>
          <h2 className="font-article-title text-xl sm:text-2xl md:text-3xl font-bold text-[#202020] leading-snug">
            Dự án có cảnh báo pháp lý và nguy cơ rủi ro đã công bố
          </h2>
          <p className="font-body-content text-xs sm:text-sm text-[#5f5f5f] mt-1.5 leading-relaxed">
            Tổng hợp các văn bản xử phạt hành chính, thông báo ngăn chặn giao dịch và dự án chưa đủ điều kiện mở bán từ Thanh tra Xây dựng và cơ quan có thẩm quyền.
          </p>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span className="text-xs font-ui text-[#5f5f5f] mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3 text-[#466fa1]" />
            Lọc theo dạng rủi ro:
          </span>
          <button
            type="button"
            onClick={() => setSelectedType('all')}
            className={`px-3 py-1.5 text-xs font-ui rounded-[8px] transition-colors cursor-pointer ${
              selectedType === 'all'
                ? 'bg-[#202020] text-white font-bold'
                : 'bg-white text-[#5f5f5f] border border-[#d6d6d6] hover:bg-[#fafafa]'
            }`}
          >
            Tất cả cảnh báo (<span className="font-numeric">{OFFICIAL_WARNINGS.length}</span>)
          </button>
          <button
            type="button"
            onClick={() => setSelectedType('chua_du_dieu_kien')}
            className={`px-3 py-1.5 text-xs font-ui rounded-[8px] transition-colors cursor-pointer ${
              selectedType === 'chua_du_dieu_kien'
                ? 'bg-[#da1e28] text-white font-bold'
                : 'bg-white text-[#5f5f5f] border border-[#d6d6d6] hover:bg-[#fafafa]'
            }`}
          >
            Chưa đủ điều kiện mở bán
          </button>
          <button
            type="button"
            onClick={() => setSelectedType('sai_pham_quy_hoach')}
            className={`px-3 py-1.5 text-xs font-ui rounded-[8px] transition-colors cursor-pointer ${
              selectedType === 'sai_pham_quy_hoach'
                ? 'bg-[#da1e28] text-white font-bold'
                : 'bg-white text-[#5f5f5f] border border-[#d6d6d6] hover:bg-[#fafafa]'
            }`}
          >
            Sai phạm quy hoạch & Cơi nới
          </button>
          <button
            type="button"
            onClick={() => setSelectedType('tranh_chap_the_chap')}
            className={`px-3 py-1.5 text-xs font-ui rounded-[8px] transition-colors cursor-pointer ${
              selectedType === 'tranh_chap_the_chap'
                ? 'bg-[#da1e28] text-white font-bold'
                : 'bg-white text-[#5f5f5f] border border-[#d6d6d6] hover:bg-[#fafafa]'
            }`}
          >
            Tranh chấp thế chấp ngân hàng
          </button>
        </div>

        {/* Warning cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredWarnings.map((warn) => (
            <div
              key={warn.id}
              className="bg-white rounded-[4px] border-2 border-[#f8d4d6] p-4 flex flex-col justify-between transition-colors relative"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold font-ui text-[#da1e28] bg-[#f8d4d6] px-2 py-0.5 rounded-[2px]">
                    {warn.status}
                  </span>
                  <span className="text-xs font-numeric text-[#7f7f7f]">
                    {warn.warningDate.split(',')[1] || warn.warningDate}
                  </span>
                </div>

                <h3 className="font-article-title text-sm sm:text-base font-bold text-[#202020] leading-snug">
                  {warn.projectName}
                </h3>
                <p className="font-body-content text-xs text-[#5f5f5f] mt-1">
                  CĐT: <strong className="text-[#202020]">{warn.developer}</strong> · {warn.location}
                </p>

                <div className="mt-3 p-2.5 bg-[#fafafa] rounded-[4px] border border-[#ececec] text-xs font-body-content">
                  <span className="font-bold text-[#202020] block mb-1 font-ui">
                    {warn.title}
                  </span>
                  <p className="text-[#5f5f5f] leading-relaxed">
                    {warn.details}
                  </p>
                </div>
              </div>

              <div className="mt-3.5 pt-2.5 border-t border-[#ececec] flex items-center justify-between text-xs font-body-content text-[#5f5f5f]">
                <span className="flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-[#9f9f9f]" />
                  <span>{warn.sourceDoc}</span>
                </span>
                <span className="text-[#da1e28] font-bold font-ui text-xs">Không giao dịch</span>
              </div>
            </div>
          ))}
        </div>

        {/* Legal Disclaimer Box */}
        <div className="mt-6 p-3.5 bg-white rounded-[4px] border border-[#d6d6d6] text-xs font-body-content text-[#5f5f5f] leading-relaxed">
          <strong className="text-[#202020]">Tuyên bố miễn trừ trách nhiệm (Nghị định 13/2023):</strong> Dữ liệu cảnh báo được tổng hợp từ thông báo xử phạt và văn bản cảnh báo công khai của cơ quan thanh tra quản lý nhà nước. Nếu chủ đầu tư đã hoàn tất khắc phục và có quyết định giải tỏa, vui lòng liên hệ Ban biên tập VnExpress - Property để đối chiếu văn bản trong 48 giờ.
        </div>

      </div>
    </section>
  );
};
