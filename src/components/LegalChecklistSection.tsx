import React, { useState } from 'react';
import { LEGAL_CHECKLIST } from '../data/projects';
import { ShieldCheck, HelpCircle, CheckCircle2 } from 'lucide-react';

export const LegalChecklistSection: React.FC = () => {
  const [filterType, setFilterType] = useState<'future' | 'existing'>('future');
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  const toggleCheck = (step: number) => {
    setCheckedSteps(prev => ({
      ...prev,
      [step]: !prev[step]
    }));
  };

  const filteredItems = LEGAL_CHECKLIST.filter(
    item => item.category === filterType || item.category === 'both'
  );

  const totalCompleted = filteredItems.filter(item => checkedSteps[item.step]).length;
  const progressPercent = Math.round((totalCompleted / filteredItems.length) * 100);

  return (
    <section id="section-checklist" className="py-10 bg-[#fcfaf6] border-b border-[#d6d6d6]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-5">
          <p className="font-ui text-xs font-bold text-[#b13460] mb-1">
            Cẩm nang an toàn pháp lý (B3)
          </p>
          <h2 className="font-article-title text-xl sm:text-2xl font-bold text-[#202020] leading-snug">
            Checklist kiểm định pháp lý trước khi đặt cọc
          </h2>
          <p className="font-body-content text-xs text-[#5f5f5f] mt-1">
            Danh mục văn bản bắt buộc đối chiếu bản gốc theo từng loại hình nhà ở.
          </p>
        </div>

        {/* Category Switcher & Progress */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div className="inline-flex p-1 bg-[#f3f3f3] rounded-[8px] border border-[#d6d6d6]">
            <button
              type="button"
              onClick={() => setFilterType('future')}
              className={`px-3.5 py-1.5 text-xs font-bold font-ui rounded-[8px] transition-colors cursor-pointer ${
                filterType === 'future'
                  ? 'bg-[#b13460] text-white'
                  : 'text-[#5f5f5f] hover:text-[#202020]'
              }`}
            >
              1. Mua nhà hình thành trong tương lai
            </button>
            <button
              type="button"
              onClick={() => setFilterType('existing')}
              className={`px-3.5 py-1.5 text-xs font-bold font-ui rounded-[8px] transition-colors cursor-pointer ${
                filterType === 'existing'
                  ? 'bg-[#b13460] text-white'
                  : 'text-[#5f5f5f] hover:text-[#202020]'
              }`}
            >
              2. Mua nhà đã có sổ hồng sẵn (Thứ cấp)
            </button>
          </div>

          {/* Interactive Progress Meter */}
          <div className="flex items-center gap-3 bg-white px-3.5 py-2 rounded-[4px] border border-[#d6d6d6]">
            <span className="font-ui text-xs text-[#5f5f5f]">Tiến độ kiểm tra:</span>
            <div className="w-24 bg-[#ececec] h-2 rounded-[2px] overflow-hidden">
              <div 
                className="bg-[#24a148] h-full transition-all duration-200"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="font-numeric text-xs font-bold text-[#202020]">{totalCompleted}/{filteredItems.length}</span>
          </div>
        </div>

        {/* Checklist Accordion / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredItems.map((item) => {
            const isChecked = !!checkedSteps[item.step];
            const isTooltipOpen = activeTooltip === item.step;

            return (
              <div
                key={item.step}
                className={`p-4 rounded-[4px] border transition-colors ${
                  isChecked 
                    ? 'bg-[#d5eddc]/20 border-[#24a148]' 
                    : 'bg-white border-[#d6d6d6] hover:border-[#9f9f9f]'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => toggleCheck(item.step)}
                      className={`mt-0.5 w-4.5 h-4.5 rounded-[2px] border flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                        isChecked 
                          ? 'bg-[#24a148] border-[#24a148] text-white' 
                          : 'bg-white border-[#9f9f9f] hover:border-[#b13460]'
                      }`}
                      aria-label={`Đánh dấu bước ${item.step}`}
                    >
                      {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </button>

                    <div>
                      <span className="font-ui text-xs font-bold text-[#b13460] block">
                        Bước <span className="font-numeric">{item.step}</span> · {item.authority}
                      </span>
                      <h4 className="font-article-title text-sm font-bold text-[#202020] mt-0.5 leading-snug">
                        {item.title}
                      </h4>
                      <p className="font-body-content text-xs text-[#5f5f5f] mt-1">
                        Văn bản cần kiểm tra: <strong className="text-[#202020]">{item.documentName}</strong>
                      </p>
                    </div>
                  </div>

                  {/* Tooltip explanation button */}
                  <div className="relative shrink-0">
                    <button
                      type="button"
                      onClick={() => setActiveTooltip(isTooltipOpen ? null : item.step)}
                      className="text-[#9f9f9f] hover:text-[#466fa1] p-1 cursor-pointer"
                      title="Giải thích thuật ngữ pháp lý"
                      aria-label="Giải thích thuật ngữ pháp lý"
                    >
                      <HelpCircle className="w-4 h-4" />
                    </button>

                    {/* Terminology Explanation Tooltip */}
                    {isTooltipOpen && (
                      <div className="absolute right-0 top-7 z-30 w-72 p-3 bg-[#202020] text-white text-xs rounded-[4px] leading-relaxed border border-[#5f5f5f] font-body-content">
                        <span className="font-ui font-bold text-[#fafafa] block mb-1">
                          Giải thích thuật ngữ pháp lý:
                        </span>
                        {item.tooltipExplanation}
                        <button
                          type="button"
                          onClick={() => setActiveTooltip(null)}
                          className="mt-2 block font-ui text-[#9f9f9f] hover:text-white underline text-xs cursor-pointer"
                        >
                          Đóng
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Why crucial text */}
                <p className="font-body-content text-xs text-[#5f5f5f] mt-2.5 pt-2 border-t border-[#ececec] leading-relaxed">
                  <span className="font-bold text-[#202020]">Lý do bắt buộc:</span> {item.whyCrucial}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-6 p-3.5 bg-white rounded-[4px] border border-[#d6d6d6] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-body-content text-[#5f5f5f]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#24a148] shrink-0" />
            <span>
              Các dự án đạt nhãn <strong>"Đã xác minh"</strong> trên VnExpress - Property đều có đủ các văn bản trong danh mục này.
            </span>
          </div>
          <span className="text-xs text-[#7f7f7f] shrink-0 font-ui">
            Căn cứ theo Luật Nhà ở & Luật Kinh doanh BĐS
          </span>
        </div>

      </div>
    </section>
  );
};
