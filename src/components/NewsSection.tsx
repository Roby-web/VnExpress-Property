import React from 'react';
import { RELATED_NEWS } from '../data/projects';
import { ExternalLink, Clock, Tag } from 'lucide-react';

export const NewsSection: React.FC = () => {
  return (
    <section className="py-10 bg-[#fcfaf6] border-b border-[#d6d6d6]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <p className="font-ui text-xs font-bold text-[#b13460] mb-1">
              Thông tin thị trường xác thực (F10 - VnExpress BĐS)
            </p>
            <h2 className="font-article-title text-xl sm:text-2xl md:text-3xl font-bold text-[#202020] leading-snug">
              Tin tức và phân tích pháp lý theo từng dự án
            </h2>
          </div>
          <a
            href="https://vnexpress.net/bat-dong-san"
            target="_blank"
            rel="noopener noreferrer"
            className="font-ui text-xs font-bold text-[#466fa1] hover:underline flex items-center gap-1 shrink-0"
          >
            <span>Mục Bất động sản trên VnExpress</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {RELATED_NEWS.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-[4px] border border-[#d6d6d6] p-4 flex flex-col justify-between transition-colors hover:border-[#9f9f9f]"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#5f5f5f] mb-2 font-ui">
                  <span className="font-bold text-[#b13460] bg-[#fce6eb] px-2 py-0.5 rounded-[2px]">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1 font-numeric">
                    <Clock className="w-3.5 h-3.5 text-[#9f9f9f]" />
                    <span>{item.readTime}</span>
                  </div>
                </div>

                {/* Title following Editor standards (S-V-O, facts first) */}
                <h3 className="font-article-title text-base font-bold text-[#202020] hover:text-[#b13460] transition-colors leading-snug">
                  {item.title}
                </h3>

                {/* Date following RULE.md: Thứ..., Ngày/Tháng/Năm, Giờ:Phút (GMT+7) */}
                <p className="font-numeric text-xs text-[#7f7f7f] mt-1.5">
                  {item.date}
                </p>

                {/* Lead / Summary following KISS rules */}
                <p className="font-body-content text-xs text-[#5f5f5f] mt-2 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="mt-4 pt-2.5 border-t border-[#ececec] flex items-center justify-between text-xs font-body-content text-[#5f5f5f]">
                <span className="font-ui text-xs font-bold text-[#202020]">{item.source}</span>
                {item.relatedProjectName && (
                  <span className="flex items-center gap-1 text-[#466fa1] truncate max-w-[140px] font-ui" title={item.relatedProjectName}>
                    <Tag className="w-3 h-3 shrink-0" />
                    <span className="truncate">{item.relatedProjectName}</span>
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
