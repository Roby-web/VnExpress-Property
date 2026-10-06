import React from 'react';
import { ProjectProfile } from '../data/projects';
import { 
  X, 
  Printer, 
  Download, 
  ShieldCheck, 
  AlertTriangle, 
  Building2, 
  Compass, 
  Calendar, 
  FileCheck2, 
  Layers, 
  MapPin,
  CheckCircle2
} from 'lucide-react';

interface ZoningCertificateModalProps {
  project: ProjectProfile | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ZoningCertificateModal: React.FC<ZoningCertificateModalProps> = ({
  project,
  isOpen,
  onClose
}) => {
  if (!isOpen || !project) return null;

  const handlePrint = () => {
    window.print();
  };

  const isHighRisk = project.riskLevel === 'Cao';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-3 sm:p-6 backdrop-blur-xs">
      <div 
        className="relative bg-white w-full max-w-3xl rounded-[4px] border border-[#d6d6d6] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Certificate Top Action Bar (hidden when printing) */}
        <div className="print:hidden p-3 sm:p-4 bg-[#fafafa] border-b border-[#d6d6d6] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-ui text-xs font-bold text-[#b13460] uppercase tracking-wider">
              VnExpress - Property
            </span>
            <span className="text-[#9f9f9f] text-xs">/</span>
            <span className="font-ui text-xs font-bold text-[#202020]">
              Phiếu trích lục thông tin quy hoạch 1/500 & 1/2000
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="h-8 px-3 text-xs font-bold font-ui text-[#202020] bg-white hover:bg-[#f3f3f3] border border-[#9f9f9f] rounded-[8px] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5 text-[#5f5f5f]" />
              <span>In phiếu</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-[8px] border border-[#d6d6d6] hover:bg-[#f3f3f3] text-[#5f5f5f] hover:text-[#202020] flex items-center justify-center transition-colors cursor-pointer"
              title="Đóng"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Formal Printable Document Content */}
        <div className="p-6 sm:p-10 space-y-6 text-[#202020] font-body-content bg-white">
          
          {/* Official Document Header */}
          <div className="text-center pb-5 border-b-2 border-[#202020] space-y-1">
            <span className="font-ui text-xs font-bold uppercase tracking-widest text-[#5f5f5f] block">
              Hệ thống cơ sở dữ liệu quy hoạch đô thị trực tuyến
            </span>
            <h2 className="font-article-title text-xl sm:text-2xl font-bold text-[#202020]">
              PHIẾU TRÍCH LỤC THÔNG TIN QUY HOẠCH XÂY DỰNG
            </h2>
            <p className="font-ui text-xs text-[#5f5f5f]">
              (Cung cấp dữ liệu theo đồ án quy hoạch phân khu 1/2000 và quy hoạch chi tiết 1/500 đã được phê duyệt)
            </p>
            <div className="flex items-center justify-center gap-4 text-xs font-numeric text-[#5f5f5f] pt-1">
              <span>Mã trích lục: <strong>VNEX-QH-{project.id.toUpperCase()}-2026</strong></span>
              <span>•</span>
              <span>Thời điểm trích xuất: <strong>{project.verifiedDate}</strong></span>
            </div>
          </div>

          {/* Verification Badge */}
          <div className={`p-3.5 rounded-[4px] border text-xs flex items-start gap-3 ${
            isHighRisk 
              ? 'bg-[#f8d4d6] border-[#da1e28] text-[#da1e28]' 
              : 'bg-[#d5eddc] border-[#24a148] text-[#145b29]'
          }`}>
            {isHighRisk ? (
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-[#da1e28]" />
            ) : (
              <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5 text-[#24a148]" />
            )}
            <div className="space-y-0.5">
              <strong className="font-ui text-xs block font-bold">
                {isHighRisk ? 'CẢNH BÁO: DỰ ÁN CÓ RỦI RO QUY HOẠCH' : 'KẾT QUẢ ĐỐI CHIẾU DỮ LIỆU: ĐÃ PHÊ DUYỆT QUY HOẠCH HỢP PHÁP'}
              </strong>
              <p className="leading-relaxed">
                {isHighRisk 
                  ? `${project.riskReason}. ${project.planning.acquisitionRisk}. Đề nghị người mua không giao dịch đặt cọc khi chưa có quy hoạch chi tiết 1/500 phê duyệt hợp pháp.`
                  : `Hồ sơ khu đất thuộc đồ án quy hoạch chi tiết 1/500 đã được ${project.verifiedSource} thẩm định. Thửa đất không nằm trong diện tranh chấp hoặc giải phóng mặt bằng công cộng.`}
              </p>
            </div>
          </div>

          {/* Section 1: Thông tin địa điểm & Chủ đầu tư */}
          <div className="space-y-2">
            <h3 className="font-ui text-xs font-bold uppercase tracking-wider text-[#b13460] border-b border-[#ececec] pb-1">
              1. Thông tin vị trí khu đất dự án
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-[#fafafa] p-3.5 rounded-[4px] border border-[#ececec]">
              <div>
                <span className="text-[#5f5f5f] block">Tên dự án thương mại:</span>
                <strong className="text-[#202020] font-ui text-sm">{project.name}</strong>
              </div>
              <div>
                <span className="text-[#5f5f5f] block">Chủ đầu tư / Đơn vị phát triển:</span>
                <strong className="text-[#202020] font-ui">{project.developer}</strong>
              </div>
              <div>
                <span className="text-[#5f5f5f] block">Địa chỉ khu đất:</span>
                <span className="text-[#202020]">{project.address}</span>
              </div>
              <div>
                <span className="text-[#5f5f5f] block">Địa bàn hành chính:</span>
                <span className="text-[#202020]">{project.ward}, {project.district}, {project.city}</span>
              </div>
              <div>
                <span className="text-[#5f5f5f] block">Phân khu quy hoạch đô thị:</span>
                <span className="text-[#202020] font-bold">{project.planning.planningZoneName}</span>
              </div>
              <div>
                <span className="text-[#5f5f5f] block">Quy mô diện tích toàn khu:</span>
                <strong className="text-[#202020] font-numeric">{project.scale}</strong>
              </div>
            </div>
          </div>

          {/* Section 2: Văn bản pháp lý quy hoạch */}
          <div className="space-y-2">
            <h3 className="font-ui text-xs font-bold uppercase tracking-wider text-[#b13460] border-b border-[#ececec] pb-1">
              2. Văn bản pháp lý và quyết định phê duyệt quy hoạch
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-[#fafafa] p-3.5 rounded-[4px] border border-[#ececec]">
              <div>
                <span className="text-[#5f5f5f] block">Cấp độ đồ án đã duyệt:</span>
                <span className={`inline-block font-ui font-bold px-1.5 py-0.5 rounded-[2px] mt-0.5 ${
                  project.planning.approvedScale === 'Quy hoạch chi tiết 1/500'
                    ? 'text-[#145b29] bg-[#d5eddc]'
                    : 'text-[#da1e28] bg-[#f8d4d6]'
                }`}>
                  {project.planning.approvedScale}
                </span>
              </div>
              <div>
                <span className="text-[#5f5f5f] block">Số quyết định phê duyệt:</span>
                <strong className="text-[#202020] font-numeric">{project.planning.planDecisionDoc}</strong>
              </div>
              <div>
                <span className="text-[#5f5f5f] block">Cơ quan thẩm định & ban hành:</span>
                <span className="text-[#202020] font-ui">{project.verifiedSource}</span>
              </div>
            </div>
          </div>

          {/* Section 3: Chỉ tiêu quy hoạch kiến trúc cốt lõi */}
          <div className="space-y-2">
            <h3 className="font-ui text-xs font-bold uppercase tracking-wider text-[#b13460] border-b border-[#ececec] pb-1">
              3. Chỉ tiêu quy hoạch kiến trúc xây dựng (Áp dụng cho khối công trình)
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border border-[#d6d6d6]">
                <thead className="bg-[#f3f3f3] font-ui text-[#202020] border-b border-[#d6d6d6]">
                  <tr>
                    <th className="py-2 px-3 font-bold border-r border-[#d6d6d6]">Chỉ tiêu quy hoạch</th>
                    <th className="py-2 px-3 font-bold border-r border-[#d6d6d6]">Giá trị được phê duyệt</th>
                    <th className="py-2 px-3 font-bold border-r border-[#d6d6d6]">Quy chuẩn QCVN 01:2021/BXD</th>
                    <th className="py-2 px-3 font-bold">Đánh giá thẩm định</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ececec] font-body-content">
                  <tr>
                    <td className="py-2 px-3 font-bold text-[#202020] border-r border-[#ececec]">
                      Chức năng sử dụng đất
                    </td>
                    <td className="py-2 px-3 font-numeric font-bold text-[#b13460] border-r border-[#ececec]">
                      {project.planning.zoningCode}
                    </td>
                    <td className="py-2 px-3 text-[#5f5f5f] border-r border-[#ececec]">
                      Đất ở đô thị / TMDV
                    </td>
                    <td className="py-2 px-3 text-[#145b29] font-ui font-bold">
                      {isHighRisk ? 'Sai mục đích' : 'Đúng quy hoạch'}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold text-[#202020] border-r border-[#ececec]">
                      Tầng cao xây dựng tối đa
                    </td>
                    <td className="py-2 px-3 font-numeric font-bold border-r border-[#ececec]">
                      {project.planning.maxFloors}
                    </td>
                    <td className="py-2 px-3 text-[#5f5f5f] border-r border-[#ececec]">
                      Theo tĩnh không thỏa thuận
                    </td>
                    <td className="py-2 px-3 text-[#145b29] font-ui font-bold">
                      {isHighRisk ? 'Cảnh báo vi phạm' : 'Phù hợp'}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold text-[#202020] border-r border-[#ececec]">
                      Mật độ xây dựng khối tháp
                    </td>
                    <td className="py-2 px-3 font-numeric font-bold border-r border-[#ececec]">
                      {project.planning.buildingDensity}
                    </td>
                    <td className="py-2 px-3 text-[#5f5f5f] border-r border-[#ececec]">
                      Tối đa 40% (khối tháp)
                    </td>
                    <td className="py-2 px-3 text-[#145b29] font-ui font-bold">
                      {isHighRisk ? 'Vượt ngưỡng' : 'Đạt chuẩn'}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold text-[#202020] border-r border-[#ececec]">
                      Hệ số sử dụng đất (FAR)
                    </td>
                    <td className="py-2 px-3 font-numeric font-bold border-r border-[#ececec]">
                      {project.planning.floorAreaRatio}
                    </td>
                    <td className="py-2 px-3 text-[#5f5f5f] border-r border-[#ececec]">
                      Tối đa 13,0 lần
                    </td>
                    <td className="py-2 px-3 text-[#145b29] font-ui font-bold">
                      Đạt chuẩn
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold text-[#202020] border-r border-[#ececec]">
                      Khoảng lùi chỉ giới đường đỏ
                    </td>
                    <td className="py-2 px-3 font-numeric font-bold border-r border-[#ececec]">
                      {project.planning.setbackLimit}
                    </td>
                    <td className="py-2 px-3 text-[#5f5f5f] border-r border-[#ececec]">
                      Tối thiểu 6 m với đường &gt; 19 m
                    </td>
                    <td className="py-2 px-3 text-[#145b29] font-ui font-bold">
                      Đạt chuẩn
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 4: Lộ giới giao thông & Nguy cơ thu hồi đất */}
          <div className="space-y-2">
            <h3 className="font-ui text-xs font-bold uppercase tracking-wider text-[#b13460] border-b border-[#ececec] pb-1">
              4. Hạ tầng giao thông và tình trạng chỉ giới giải phóng mặt bằng
            </h3>
            <div className="p-3.5 bg-[#fafafa] rounded-[4px] border border-[#ececec] space-y-2 text-xs">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 border-b border-[#ececec] pb-2">
                <span className="text-[#5f5f5f]">Lộ giới đường quy hoạch tiếp giáp:</span>
                <strong className="text-[#202020] font-numeric">{project.planning.roadRedLine}</strong>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 border-b border-[#ececec] pb-2">
                <span className="text-[#5f5f5f]">Kết nối tuyến đường sắt đô thị (Metro):</span>
                <strong className="text-[#202020]">{project.metroDistance}</strong>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                <span className="text-[#5f5f5f]">Nguy cơ thu hồi hoặc vướng ranh giải tỏa:</span>
                <strong className={isHighRisk ? 'text-[#da1e28]' : 'text-[#145b29]'}>
                  {project.planning.acquisitionRisk}
                </strong>
              </div>
            </div>
          </div>

          {/* Official Signature Box */}
          <div className="pt-6 border-t border-[#d6d6d6] flex flex-col sm:flex-row justify-between items-end gap-6 text-xs">
            <div className="space-y-1 text-[#5f5f5f] max-w-sm">
              <span className="font-bold text-[#202020] block font-ui">LƯU Ý PHÁP LÝ & BẢN QUYỀN DỮ LIỆU:</span>
              <p className="leading-relaxed">
                Phiếu trích lục được đồng bộ hóa từ cơ sở dữ liệu công khai của Sở Quy hoạch - Kiến trúc và Sở Xây dựng. Kết quả nhằm phục vụ quyền được tiếp cận thông tin minh bạch của người mua nhà theo Luật Kinh doanh Bất động sản và Luật Nhà ở.
              </p>
            </div>

            <div className="text-center sm:text-right shrink-0 space-y-1">
              <span className="text-[#5f5f5f] block">
                TP. Hồ Chí Minh, {project.verifiedDate.split(',')[1]?.trim() || 'tháng 10/2026'}
              </span>
              <strong className="text-[#202020] block font-ui">
                TRUNG TÂM KIỂM ĐỊNH DỮ LIỆU BẤT ĐỘNG SẢN
              </strong>
              <span className="font-article-title font-bold text-[#b13460] block pt-1">
                VnExpress - Property
              </span>
              <div className="inline-flex items-center gap-1 text-[11px] font-numeric text-[#24a148] border border-[#24a148] px-2 py-0.5 rounded-[2px] mt-1">
                <CheckCircle2 className="w-3 h-3 text-[#24a148]" />
                <span>CHỨNG THỰC DỮ LIỆU SỐ HỢP CHUẨN</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer print note */}
        <div className="print:hidden p-3 bg-[#fafafa] border-t border-[#ececec] text-center text-xs text-[#5f5f5f] font-ui">
          Bấm <strong>"In phiếu"</strong> để xuất văn bản sang khổ giấy A4 hoặc lưu định dạng tệp PDF.
        </div>
      </div>
    </div>
  );
};
