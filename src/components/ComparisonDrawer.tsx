import React, { useState } from 'react';
import { ProjectProfile } from '../data/projects';
import { Scale, X, ExternalLink, ArrowRight, AlertTriangle } from 'lucide-react';

interface ComparisonDrawerProps {
  comparedProjects: ProjectProfile[];
  onRemoveProject: (projectId: string) => void;
  onClearAll: () => void;
  onOpenDetail: (project: ProjectProfile) => void;
}

export const ComparisonDrawer: React.FC<ComparisonDrawerProps> = ({
  comparedProjects,
  onRemoveProject,
  onClearAll,
  onOpenDetail
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  if (comparedProjects.length === 0) return null;

  const hasBuy = comparedProjects.some(p => p.listingType === 'buy');
  const hasRent = comparedProjects.some(p => p.listingType === 'rent');
  const isTypeConflict = hasBuy && hasRent;

  const minPricePerM2 = Math.min(...comparedProjects.map(p => p.pricePerM2));
  const maxScore = Math.max(...comparedProjects.map(p => p.transparencyScore));

  return (
    <>
      {/* Floating Bottom Bar (Flat, 8px radius, no drop shadow per Design.md) */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-2xl bg-[#ffffff] border border-[#d6d6d6] rounded-[8px] p-2.5 sm:p-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-8 h-8 rounded-[4px] bg-[#eaf0f8] text-[#466fa1] flex items-center justify-center shrink-0">
            <Scale className="w-4 h-4" />
          </div>
          
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            {comparedProjects.map((proj) => (
              <span
                key={proj.id}
                className="inline-flex items-center gap-1 text-xs font-ui font-normal text-[#202020] bg-[#fafafa] border border-[#d6d6d6] px-2.5 py-1 rounded-[4px] whitespace-nowrap"
              >
                <span className="truncate max-w-[120px]">{proj.name}</span>
                <button
                  type="button"
                  onClick={() => onRemoveProject(proj.id)}
                  className="text-[#9f9f9f] hover:text-[#da1e28] ml-1 cursor-pointer"
                  title="Bỏ dự án này"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onClearAll}
            className="text-xs font-ui text-[#7f7f7f] hover:text-[#202020] px-2 py-1 cursor-pointer hidden sm:inline"
          >
            Xóa hết
          </button>
          <button
            type="button"
            onClick={() => setIsOpenModal(true)}
            className="h-8 px-3.5 text-xs font-bold font-ui text-white bg-[#b13460] hover:bg-[#932a4e] rounded-[8px] transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>So sánh (<span className="font-numeric">{comparedProjects.length}</span>)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Comparison Modal (Flat, 4px radius) */}
      {isOpenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#000000]/60 overflow-y-auto">
          <div className="relative w-full max-w-5xl bg-[#ffffff] rounded-[4px] border border-[#d6d6d6] overflow-hidden my-auto max-h-[92vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-3.5 sm:p-4 bg-[#fafafa] border-b border-[#d6d6d6] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-[4px] bg-[#466fa1] text-white flex items-center justify-center">
                  <Scale className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-article-title text-base sm:text-lg font-bold text-[#202020]">
                    Bảng đối chiếu thông số và pháp lý dự án (F8)
                  </h3>
                  <p className="font-body-content text-xs text-[#5f5f5f]">
                    So sánh đa chiều: Pháp lý, Giá 3 tầng, Hạ tầng Metro và Thời điểm bàn giao
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpenModal(false)}
                className="p-1 text-[#5f5f5f] hover:text-[#202020] hover:bg-[#ececec] rounded-[4px] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Error banner if mixed Buy vs Rent */}
            {isTypeConflict ? (
              <div className="m-5 p-3.5 bg-[#f8d4d6] border border-[#da1e28] rounded-[4px] text-[#da1e28] text-xs font-body-content">
                <div className="flex items-center gap-2 font-bold font-ui text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  Không thể so sánh dự án Mua với dự án Thuê
                </div>
                <p className="mt-1">
                  Vui lòng chọn các dự án cùng hình thức sở hữu để đảm bảo tính chuẩn xác khi đối chiếu giá và văn bản pháp lý.
                </p>
              </div>
            ) : (
              /* Comparison Grid Table */
              <div className="overflow-x-auto p-4 sm:p-5 flex-1">
                <table className="w-full border-collapse text-left text-xs font-body-content">
                  <thead>
                    <tr className="border-b border-[#d6d6d6]">
                      <th className="p-3 w-44 font-ui font-bold text-[#202020] bg-[#fafafa]">
                        Tiêu chí so sánh
                      </th>
                      {comparedProjects.map((proj) => (
                        <th key={proj.id} className="p-3 min-w-[200px] bg-white font-ui font-bold text-[#202020] border-l border-[#ececec]">
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-article-title text-sm font-bold text-[#b13460]">{proj.name}</span>
                            <button
                              type="button"
                              onClick={() => onRemoveProject(proj.id)}
                              className="text-[#9f9f9f] hover:text-[#da1e28] p-0.5 cursor-pointer"
                              title="Bỏ chọn"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="text-xs font-normal text-[#5f5f5f] block mt-0.5">{proj.district}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#ececec]">
                    
                    {/* Row: Điểm minh bạch B1 */}
                    <tr>
                      <td className="p-3 font-ui font-bold text-[#5f5f5f] bg-[#fafafa]">
                        Điểm minh bạch (B1)
                      </td>
                      {comparedProjects.map((p) => {
                        const isBest = p.transparencyScore === maxScore;
                        return (
                          <td key={p.id} className={`p-3 border-l border-[#ececec] ${isBest ? 'bg-[#d5eddc]/40' : 'bg-white'}`}>
                            <div className="flex items-center gap-1.5 font-numeric">
                              <span className="font-bold text-sm text-[#202020]">{p.transparencyScore}/100</span>
                              {isBest && (
                                <span className="text-[11px] font-bold font-ui text-[#145b29] bg-[#d5eddc] px-1.5 py-0.5 rounded-[2px]">
                                  Tốt nhất
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-[#5f5f5f] block mt-0.5">Rủi ro: {p.riskLevel}</span>
                          </td>
                        );
                      })}
                    </tr>

                    {/* Row: Giá thị trường thực tế */}
                    <tr>
                      <td className="p-3 font-ui font-bold text-[#5f5f5f] bg-[#fafafa]">
                        Đơn giá thị trường
                      </td>
                      {comparedProjects.map((p) => {
                        const isBest = p.pricePerM2 === minPricePerM2;
                        return (
                          <td key={p.id} className={`p-3 border-l border-[#ececec] ${isBest ? 'bg-[#d5eddc]/40' : 'bg-white'}`}>
                            <div className="flex items-center gap-1.5 font-numeric">
                              <span className="font-bold text-sm text-[#b13460]">{p.pricePerM2Display}</span>
                              {isBest && (
                                <span className="text-[11px] font-bold font-ui text-[#145b29] bg-[#d5eddc] px-1.5 py-0.5 rounded-[2px]">
                                  Tốt nhất
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-[#5f5f5f] block mt-0.5 font-numeric">Tổng giá: {p.totalPriceText}</span>
                          </td>
                        );
                      })}
                    </tr>

                    {/* Row: Chênh lệch giá chào vs thị trường */}
                    <tr>
                      <td className="p-3 font-ui font-bold text-[#5f5f5f] bg-[#fafafa]">
                        Chênh lệch giá chào
                      </td>
                      {comparedProjects.map((p) => (
                        <td key={p.id} className="p-3 border-l border-[#ececec] bg-white">
                          <span className={`font-numeric font-bold ${p.priceGapWarning ? 'text-[#da1e28]' : 'text-[#24a148]'}`}>
                            +{p.priceGapPercentDisplay}
                          </span>
                          <span className="text-xs text-[#5f5f5f] block mt-0.5 font-numeric">
                            Giá chào: {p.priceTier.secondaryAskingPriceDisplay}
                          </span>
                        </td>
                      ))}
                    </tr>

                    {/* Row: Tình trạng sổ hồng & Pháp lý */}
                    <tr>
                      <td className="p-3 font-ui font-bold text-[#5f5f5f] bg-[#fafafa]">
                        Tình trạng sổ hồng
                      </td>
                      {comparedProjects.map((p) => (
                        <td key={p.id} className="p-3 border-l border-[#ececec] bg-white">
                          <div className="font-bold text-[#202020] font-ui">
                            {p.ownershipCertificate}
                          </div>
                          <span className="text-xs text-[#5f5f5f] block mt-0.5">{p.legalStatus}</span>
                        </td>
                      ))}
                    </tr>

                    {/* Row: Hạ tầng Metro */}
                    <tr>
                      <td className="p-3 font-ui font-bold text-[#5f5f5f] bg-[#fafafa]">
                        Khoảng cách Metro
                      </td>
                      {comparedProjects.map((p) => (
                        <td key={p.id} className="p-3 border-l border-[#ececec] bg-white">
                          <p className="text-[#202020] leading-snug">{p.metroDistance}</p>
                          <span className="text-xs text-[#5f5f5f] block mt-0.5">{p.highways}</span>
                        </td>
                      ))}
                    </tr>

                    {/* Row: Bàn giao & Quy mô */}
                    <tr>
                      <td className="p-3 font-ui font-bold text-[#5f5f5f] bg-[#fafafa]">
                        Tiến độ & Quy mô
                      </td>
                      {comparedProjects.map((p) => (
                        <td key={p.id} className="p-3 border-l border-[#ececec] bg-white">
                          <p className="text-[#202020]">{p.deliveryYear}</p>
                          <span className="text-xs text-[#5f5f5f] block mt-0.5 font-numeric">{p.unitsCountDisplay}</span>
                        </td>
                      ))}
                    </tr>

                    {/* Row: Xem hồ sơ CTA */}
                    <tr>
                      <td className="p-3 bg-[#fafafa] font-ui font-bold text-[#5f5f5f]">
                        Thao tác
                      </td>
                      {comparedProjects.map((p) => (
                        <td key={p.id} className="p-3 border-l border-[#ececec] bg-white">
                          <button
                            type="button"
                            onClick={() => {
                              setIsOpenModal(false);
                              onOpenDetail(p);
                            }}
                            className="h-8 w-full px-2 text-xs font-bold font-ui text-white bg-[#b13460] hover:bg-[#932a4e] rounded-[8px] transition-colors text-center cursor-pointer flex items-center justify-center gap-1"
                          >
                            <span>Xem hồ sơ</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </td>
                      ))}
                    </tr>

                  </tbody>
                </table>
              </div>
            )}

            {/* Modal Footer */}
            <div className="p-3 bg-[#fafafa] border-t border-[#d6d6d6] flex items-center justify-between text-xs font-body-content text-[#5f5f5f]">
              <span>* Ô màu xanh lá nhạt thể hiện giá trị có lợi nhất cho người mua</span>
              <button
                type="button"
                onClick={() => setIsOpenModal(false)}
                className="h-8 px-4 bg-white border border-[#d6d6d6] rounded-[8px] font-ui font-bold text-[#202020] hover:bg-[#f3f3f3] cursor-pointer"
              >
                Đóng
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
