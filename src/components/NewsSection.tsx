import React from 'react';
import { RELATED_NEWS } from '../data/projects';
import { ExternalLink, Clock, Tag } from 'lucide-react';

export const NewsSection: React.FC = () => {
  return (
    <section className="py-10 bg-[#fcfaf6] border-b border-[#d6d6d6]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <p className="font-ui text-xs font-bold text-[#b13460] mb-1">
              Dữ liệu kiểm chứng · VnExpress Bất động sản
            </p>
            <h2 className="font-article-title text-xl sm:text-2xl font-bold text-[#202020] leading-snug">
              Tin tức và phân tích pháp lý dự án
            </h2>
          </div>
          <a
            href="https://vnexpress.net/bat-dong-san"
            target="_blank"
            rel="noopener noreferrer"
            className="font-ui text-xs font-bold text-[#466fa1] hover:underline flex items-center gap-1 shrink-0"
          >
            <span>Chuyên mục Bất động sản</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* News Cards Grid with Image Thumbnails */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {RELATED_NEWS.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-[4px] border border-[#d6d6d6] overflow-hidden flex flex-col justify-between transition-colors hover:border-[#9f9f9f] group"
            >
              <div>
                {/* News Thumbnail Image */}
                <div className="relative aspect-16/9 w-full overflow-hidden bg-[#202020]">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Category Pill Tag */}
                  <span className="absolute top-2.5 left-2.5 z-10 text-[11px] font-bold font-ui text-[#b13460] bg-white/95 px-2 py-0.5 rounded-[2px] border border-[#d6d6d6]">
                    {item.category}
                  </span>
                  <div className="absolute bottom-2 right-2 z-10 flex items-center gap-1 font-numeric text-[11px] text-white bg-black/70 backdrop-blur-xs px-2 py-0.5 rounded-[2px]">
                    <Clock className="w-3 h-3 text-[#fce6eb]" />
                    <span>{item.readTime}</span>
                  </div>
                </div>

                <div className="p-4 pb-2">
                  {/* Date following RULE.md: Thứ..., Ngày/Tháng/Năm, Giờ:Phút (GMT+7) */}
                  <p className="font-numeric text-[11px] text-[#7f7f7f] mb-1">
                    {item.date}
                  </p>

                  {/* Title following Editor standards (S-V-O, facts first) */}
                  <h3 className="font-article-title text-sm sm:text-base font-bold text-[#202020] group-hover:text-[#b13460] transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </h3>

                  {/* Lead / Summary: crisp, concise */}
                  <p className="font-body-content text-xs text-[#5f5f5f] mt-1.5 leading-relaxed line-clamp-2">
                    {item.summary}
                  </p>
                </div>
              </div>

              <div className="px-4 py-3 border-t border-[#ececec] flex items-center justify-between text-xs font-body-content text-[#5f5f5f]">
                <span className="font-ui text-xs font-bold text-[#202020]">{item.source}</span>
                {item.relatedProjectName && (
                  <span className="flex items-center gap-1 text-[#466fa1] truncate max-w-[150px] font-ui" title={item.relatedProjectName}>
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
