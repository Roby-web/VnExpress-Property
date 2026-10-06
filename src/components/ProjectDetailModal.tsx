import React, { useState } from 'react';
import { ProjectProfile } from '../data/projects';
import { ProjectVisual } from './ProjectVisual';
import { 
  X, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle, 
  MapPin, 
  FileText, 
  Share2, 
  Bookmark, 
  Flag, 
  Train, 
  Check, 
  Send,
  ExternalLink,
  Printer,
  Compass
} from 'lucide-react';
import { ZoningCertificateModal } from './ZoningCertificateModal';

interface ProjectDetailModalProps {
  project: ProjectProfile | null;
  onClose: () => void;
  onToggleCompare: (project: ProjectProfile) => void;
  isCompared: boolean;
  onToggleSave: (projectId: string) => void;
  isSaved: boolean;
  onOpenCalculatorWithPrice: (priceBillion: number) => void;
  onInspectZoningOnMap?: (projectId: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onToggleCompare,
  isCompared,
  onToggleSave,
  isSaved,
  onOpenCalculatorWithPrice,
  onInspectZoningOnMap
}) => {
  if (!project) return null;

  const [activeTab, setActiveTab] = useState<'prices' | 'legal' | 'zoning' | 'infra' | 'report'>('prices');
  const [reportField, setReportField] = useState('Giá giao dịch thực tế');
  const [reportComment, setReportComment] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleSendReport = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSubmitted(true);
    setTimeout(() => {
      setReportSubmitted(false);
      setReportComment('');
    }, 3000);
  };

  const quarters = project.priceTier.historyQuarters;
  const maxPrice = Math.max(...quarters.map(q => q.price), 130);
  const minPrice = Math.min(...quarters.map(q => q.price), 30);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-[#000000]/60 overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-[#ffffff] rounded-[4px] border border-[#d6d6d6] overflow-hidden my-auto max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        
        {/* Modal Top Bar */}
        <div className="p-3.5 sm:p-4 border-b border-[#d6d6d6] bg-[#fafafa] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-ui text-xs font-bold text-[#b13460] bg-[#fce6eb] px-2 py-0.5 rounded-[2px]">
              Hồ sơ dự án chuẩn hóa
            </span>
            <span className="text-xs text-[#7f7f7f] font-numeric hidden sm:inline">
              Mã hồ sơ: {project.id}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="h-8 px-2.5 text-[#5f5f5f] hover:text-[#202020] bg-white rounded-[4px] border border-[#d6d6d6] text-xs font-ui flex items-center gap-1 cursor-pointer"
              title="Chia sẻ URL hồ sơ"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{copiedUrl ? 'Đã sao chép' : 'Chia sẻ'}</span>
            </button>
            <button
              type="button"
              onClick={() => onToggleSave(project.id)}
              className={`h-8 px-2.5 rounded-[4px] border text-xs font-ui flex items-center gap-1 cursor-pointer transition-colors ${
                isSaved ? 'bg-[#b13460] text-white border-[#b13460]' : 'bg-white text-[#5f5f5f] border-[#d6d6d6]'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">{isSaved ? 'Đã lưu' : 'Lưu'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-[#5f5f5f] hover:text-[#202020] hover:bg-[#ececec] rounded-[4px] transition-colors cursor-pointer"
              aria-label="Đóng cửa sổ"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-6">
          
          {/* Header section of Project */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pb-5 border-b border-[#ececec]">
            <div className="md:col-span-2">
              <h2 className="font-article-title text-xl sm:text-2xl md:text-3xl font-bold text-[#202020] leading-snug">
                {project.name}
              </h2>
              <p className="font-body-content text-xs text-[#5f5f5f] flex items-center gap-1 mt-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#466fa1] shrink-0" />
                <span>{project.address}</span>
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#5f5f5f] font-body-content">
                <span>Chủ đầu tư: <strong className="text-[#202020]">{project.developer}</strong></span>
                <span className="text-[#d6d6d6]">|</span>
                <span>Quy mô: <strong className="text-[#202020]">{project.scale}</strong></span>
                <span className="text-[#d6d6d6]">|</span>
                <span>Số căn: <strong className="text-[#202020] font-numeric">{project.unitsCountDisplay}</strong></span>
                <span className="text-[#d6d6d6]">|</span>
                <span>Bàn giao: <strong className="text-[#202020]">{project.deliveryYear}</strong></span>
              </div>
            </div>

            {/* Score and Verification badge */}
            <div className="bg-[#fafafa] border border-[#d6d6d6] rounded-[4px] p-3.5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-ui text-[#5f5f5f] block">
                  Điểm minh bạch hồ sơ (B1):
                </span>
                <div className="flex items-baseline gap-1 mt-1 font-numeric">
                  <span className="text-3xl font-bold text-[#b13460]">
                    {project.transparencyScore}
                  </span>
                  <span className="text-xs text-[#7f7f7f]">/ 100 điểm</span>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-[#ececec] text-xs font-body-content">
                <div className="flex items-center gap-1.5 font-bold font-ui text-[#202020]">
                  {project.legalStatus === 'Đã xác minh' ? (
                    <ShieldCheck className="w-4 h-4 text-[#24a148] shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-[#da1e28] shrink-0" />
                  )}
                  <span>Pháp lý: {project.legalStatus}</span>
                </div>
                <p className="text-xs text-[#7f7f7f] mt-1 font-numeric">
                  Thời gian: {project.verifiedDate}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs (Merriweather Sans) */}
          <div className="flex border-b border-[#d6d6d6] gap-1 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('prices')}
              className={`pb-2 px-3 text-xs font-ui font-bold transition-colors border-b-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'prices'
                  ? 'border-[#b13460] text-[#b13460]'
                  : 'border-transparent text-[#5f5f5f] hover:text-[#202020]'
              }`}
            >
              1. Bóc tách 3 tầng giá & Lịch sử
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('legal')}
              className={`pb-2 px-3 text-xs font-ui font-bold transition-colors border-b-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'legal'
                  ? 'border-[#b13460] text-[#b13460]'
                  : 'border-transparent text-[#5f5f5f] hover:text-[#202020]'
              }`}
            >
              2. Kiểm định pháp lý & Văn bản gốc
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('zoning')}
              className={`pb-2 px-3 text-xs font-ui font-bold transition-colors border-b-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'zoning'
                  ? 'border-[#b13460] text-[#b13460]'
                  : 'border-transparent text-[#5f5f5f] hover:text-[#202020]'
              }`}
            >
              3. Tra cứu quy hoạch & Lộ giới (1/500)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('infra')}
              className={`pb-2 px-3 text-xs font-ui font-bold transition-colors border-b-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'infra'
                  ? 'border-[#b13460] text-[#b13460]'
                  : 'border-transparent text-[#5f5f5f] hover:text-[#202020]'
              }`}
            >
              4. Hạ tầng & Ảnh thực tế
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('report')}
              className={`pb-2 px-3 text-xs font-ui font-bold transition-colors border-b-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'report'
                  ? 'border-[#b13460] text-[#b13460]'
                  : 'border-transparent text-[#5f5f5f] hover:text-[#202020]'
              }`}
            >
              5. Báo sai thông tin (B10)
            </button>
          </div>

          {/* Tab 1: 3-Tier Prices & Historical Quarterly Chart (F6) */}
          {activeTab === 'prices' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                
                {/* 1. Developer Price */}
                <div className="bg-[#fafafa] p-3.5 rounded-[4px] border border-[#d6d6d6]">
                  <span className="text-xs font-ui text-[#5f5f5f] block">
                    1. Giá Chủ Đầu Tư (Sơ cấp)
                  </span>
                  <div className="flex items-baseline gap-1 mt-1 font-numeric">
                    <span className="text-2xl font-bold text-[#202020]">
                      {project.priceTier.developerPriceDisplay}
                    </span>
                  </div>
                  <p className="text-xs font-body-content text-[#5f5f5f] mt-2">
                    {project.priceTier.developerNotes || 'Mở bán theo hợp đồng mua bán.'}
                  </p>
                </div>

                {/* 2. Secondary Asking Price */}
                <div className={`p-3.5 rounded-[4px] border ${
                  project.priceGapWarning 
                    ? 'bg-[#f8d4d6] border-[#da1e28]' 
                    : 'bg-[#fafafa] border-[#d6d6d6]'
                }`}>
                  <span className="text-xs font-ui text-[#5f5f5f] block">
                    2. Giá Chào Bán Thứ Cấp (Môi giới)
                  </span>
                  <div className="flex items-baseline gap-1 mt-1 font-numeric">
                    <span className="text-2xl font-bold text-[#202020]">
                      {project.priceTier.secondaryAskingPriceDisplay}
                    </span>
                  </div>
                  <div className="mt-2 text-xs font-body-content">
                    {project.priceGapWarning ? (
                      <span className="text-[#da1e28] font-bold flex items-center gap-1 font-ui">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Lệch +{project.priceGapPercentDisplay} so với thị trường
                      </span>
                    ) : (
                      <span className="text-[#24a148] font-bold flex items-center gap-1 font-ui">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Chênh lệch ở mức an toàn (+{project.priceGapPercentDisplay})
                      </span>
                    )}
                  </div>
                </div>

                {/* 3. Recorded Actual Transaction Price */}
                <div className="bg-[#d5eddc]/40 p-3.5 rounded-[4px] border border-[#24a148]">
                  <span className="text-xs font-ui text-[#145b29] block font-bold">
                    3. Giá Giao Dịch Thực Tế
                  </span>
                  <div className="flex items-baseline gap-1 mt-1 font-numeric">
                    <span className="text-2xl font-bold text-[#145b29]">
                      {project.priceTier.recordedTransactionPriceDisplay}
                    </span>
                  </div>
                  <p className="text-xs font-body-content text-[#145b29] mt-2">
                    {project.priceTier.sampleCount >= 5 ? (
                      <>Thu thập từ <strong className="font-numeric">{project.priceTier.sampleCount} hợp đồng công chứng</strong> ({project.priceTier.period}).</>
                    ) : (
                      <span className="text-[#ee853b] font-bold">Dưới 5 mẫu — Dữ liệu chưa đủ tin cậy</span>
                    )}
                  </p>
                </div>
              </div>

              {/* Historical Price Trend Chart */}
              <div className="bg-[#fafafa] p-4 rounded-[4px] border border-[#d6d6d6]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h4 className="font-ui text-sm font-bold text-[#202020]">
                      Biến động giá thứ cấp (đơn giá triệu đồng/m² theo quý)
                    </h4>
                    <p className="text-xs font-body-content text-[#5f5f5f]">
                      Thống kê giao dịch công chứng từ năm 2024 đến {project.priceTier.period}
                    </p>
                  </div>
                  <div className="text-xs font-numeric text-[#365983] bg-[#eaf0f8] px-2.5 py-1 rounded-[4px] border border-[#d6d6d6]">
                    Kỳ cập nhật: {project.priceTier.period}
                  </div>
                </div>

                {/* Visualized Bar chart */}
                <div className="h-40 w-full flex items-end gap-3 sm:gap-6 pt-6 pb-2 border-b border-[#d6d6d6]">
                  {quarters.map((q, idx) => {
                    const heightPercent = Math.max(15, Math.min(100, ((q.price - minPrice) / (maxPrice - minPrice || 1)) * 100));
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                        <span className="text-xs font-numeric text-[#5f5f5f] group-hover:text-[#b13460] font-bold">
                          {q.priceDisplay}
                        </span>
                        <div 
                          className="w-full max-w-[32px] bg-[#466fa1] group-hover:bg-[#b13460] rounded-t-[2px] transition-colors"
                          style={{ height: `${heightPercent}%` }}
                        />
                        <span className="text-xs font-numeric text-[#7f7f7f] mt-1 whitespace-nowrap">
                          {q.quarter}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-3 flex items-center justify-between text-xs font-body-content text-[#5f5f5f]">
                  <span>* Đơn vị: Triệu đồng/m² diện tích thông thủy</span>
                  <button
                    type="button"
                    onClick={() => onOpenCalculatorWithPrice(project.totalPriceNumber)}
                    className="text-[#b13460] font-bold hover:underline flex items-center gap-1 cursor-pointer font-ui"
                  >
                    <span>Tính khoản vay cho căn hộ này</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Legal Verification & Source Documents (F1 & B1) */}
          {activeTab === 'legal' && (
            <div className="space-y-4">
              <div className="bg-[#fafafa] p-4 rounded-[4px] border border-[#d6d6d6]">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-[#24a148] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-ui font-bold text-[#202020] text-sm">
                      Kết luận thẩm định pháp lý của Ban biên tập VnExpress - Property
                    </h4>
                    <p className="font-body-content text-xs text-[#5f5f5f] mt-1 leading-relaxed">
                      {project.riskReason}
                    </p>
                    <div className="mt-2 text-xs font-body-content text-[#5f5f5f] flex flex-wrap gap-x-4 gap-y-1">
                      <span>Mức độ rủi ro: <strong className="text-[#202020]">{project.riskLevel}</strong></span>
                      <span>Sổ hồng: <strong className="text-[#202020]">{project.ownershipCertificate}</strong></span>
                      <span className="font-numeric">Thời gian: {project.verifiedDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Legal Documents Table */}
              <div className="bg-white rounded-[4px] border border-[#d6d6d6] overflow-hidden">
                <div className="p-3 bg-[#fafafa] border-b border-[#d6d6d6] text-xs font-ui font-bold text-[#202020]">
                  Danh mục hồ sơ pháp lý đối chiếu văn bản gốc
                </div>

                <div className="divide-y divide-[#ececec]">
                  {project.legalDocs.map((doc) => (
                    <div key={doc.id} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-[#fafafa]">
                      <div>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#466fa1]" />
                          <span className="font-ui text-xs font-bold text-[#202020]">{doc.name}</span>
                        </div>
                        <p className="font-body-content text-xs text-[#5f5f5f] mt-1">
                          Số hiệu: <span className="font-numeric font-medium text-[#202020]">{doc.docNumber}</span> · Cơ quan cấp: {doc.issuer} · Ban hành: {doc.issueDate}
                        </p>
                        {doc.notes && (
                          <p className="font-body-content text-xs text-[#da1e28] mt-0.5">{doc.notes}</p>
                        )}
                      </div>

                      <div className="shrink-0">
                        {doc.status === 'verified' && (
                          <span className="inline-flex items-center gap-1 text-xs font-ui font-bold text-[#24a148] bg-[#d5eddc] px-2 py-0.5 rounded-[2px]">
                            <CheckCircle className="w-3.5 h-3.5" />
                            Đã đối chiếu
                          </span>
                        )}
                        {doc.status === 'missing' && (
                          <span className="inline-flex items-center gap-1 text-xs font-ui font-bold text-[#da1e28] bg-[#f8d4d6] px-2 py-0.5 rounded-[2px]">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            Chưa có thông tin
                          </span>
                        )}
                        {doc.status === 'warning' && (
                          <span className="inline-flex items-center gap-1 text-xs font-ui font-bold text-[#ee853b] bg-[#fce8da] px-2 py-0.5 rounded-[2px]">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            Có quyết định xử phạt
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Detailed Planning Certificate & Red Line Zoning */}
          {activeTab === 'zoning' && (
            <div className="space-y-4">
              <div className="bg-[#fafafa] p-4 rounded-[4px] border border-[#d6d6d6]">
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#ececec]">
                  <div>
                    <span className="font-ui text-xs font-bold text-[#b13460] block">
                      Thông số chỉ tiêu quy hoạch phân khu & chi tiết 1/500
                    </span>
                    <h4 className="font-article-title text-base font-bold text-[#202020] mt-0.5">
                      Đồ án quy hoạch: {project.planning.planDecisionDoc}
                    </h4>
                    <p className="font-body-content text-xs text-[#5f5f5f] mt-0.5">
                      Khu vực: {project.planning.planningZoneName}
                    </p>
                  </div>
                  <span className={`text-xs font-ui font-bold px-2 py-0.5 rounded-[2px] ${
                    project.planning.approvedScale === 'Quy hoạch chi tiết 1/500'
                      ? 'text-[#145b29] bg-[#d5eddc]'
                      : 'text-[#da1e28] bg-[#f8d4d6]'
                  }`}>
                    {project.planning.approvedScale}
                  </span>
                </div>

                {/* Risk and road red line status */}
                <div className={`mt-3 p-3 rounded-[4px] border text-xs font-body-content ${
                  project.riskLevel === 'Cao'
                    ? 'bg-[#f8d4d6] border-[#da1e28] text-[#da1e28]'
                    : 'bg-white border-[#d6d6d6] text-[#202020]'
                }`}>
                  <strong className="font-ui font-bold block mb-1">
                    Tình trạng thu hồi đất & Lộ giới đường đỏ:
                  </strong>
                  <p>
                    {project.planning.acquisitionRisk}. {project.planning.roadRedLine}.
                  </p>
                </div>
              </div>

              {/* Technical Zoning Metric Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-body-content">
                <div className="p-3 bg-[#fafafa] rounded-[4px] border border-[#d6d6d6]">
                  <span className="text-[#5f5f5f] block">Mã loại đất:</span>
                  <strong className="text-[#202020] font-numeric text-sm">{project.planning.zoningCode}</strong>
                  <span className="text-[11px] text-[#7f7f7f] block mt-0.5 leading-snug">{project.planning.zoningName}</span>
                </div>

                <div className="p-3 bg-[#fafafa] rounded-[4px] border border-[#d6d6d6]">
                  <span className="text-[#5f5f5f] block">Tầng cao tối đa:</span>
                  <strong className="text-[#202020] font-numeric text-sm">{project.planning.maxFloors}</strong>
                  <span className="text-[11px] text-[#7f7f7f] block mt-0.5">Quy chuẩn 1/500</span>
                </div>

                <div className="p-3 bg-[#fafafa] rounded-[4px] border border-[#d6d6d6]">
                  <span className="text-[#5f5f5f] block">Mật độ xây dựng:</span>
                  <strong className="text-[#202020] font-numeric text-sm">{project.planning.buildingDensity}</strong>
                  <span className="text-[11px] text-[#7f7f7f] block mt-0.5">Khối tháp</span>
                </div>

                <div className="p-3 bg-[#fafafa] rounded-[4px] border border-[#d6d6d6]">
                  <span className="text-[#5f5f5f] block">Hệ số sử dụng đất (FAR):</span>
                  <strong className="text-[#202020] font-numeric text-sm">{project.planning.floorAreaRatio}</strong>
                  <span className="text-[11px] text-[#7f7f7f] block mt-0.5">FAR phê duyệt</span>
                </div>
              </div>

              {/* Setback and Road Info */}
              <div className="p-3.5 bg-white rounded-[4px] border border-[#d6d6d6] text-xs font-body-content space-y-2">
                <div className="flex justify-between pb-1.5 border-b border-[#ececec]">
                  <span className="text-[#5f5f5f]">Khoảng lùi chỉ giới xây dựng:</span>
                  <strong className="text-[#202020]">{project.planning.setbackLimit}</strong>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-[#ececec]">
                  <span className="text-[#5f5f5f]">Lộ giới giao thông tiếp giáp:</span>
                  <strong className="text-[#202020]">{project.planning.roadRedLine}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5f5f5f]">Cơ quan thẩm định quy hoạch:</span>
                  <strong className="text-[#202020]">{project.verifiedSource}</strong>
                </div>
              </div>

              {/* Action Buttons for Zoning */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsCertModalOpen(true)}
                  className="h-8 px-3 text-xs font-bold font-ui text-[#202020] bg-white hover:bg-[#f3f3f3] border border-[#9f9f9f] rounded-[8px] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5 text-[#5f5f5f]" />
                  <span>In phiếu trích lục quy hoạch 1/500</span>
                </button>

                {onInspectZoningOnMap && (
                  <button
                    type="button"
                    onClick={() => {
                      onInspectZoningOnMap(project.id);
                    }}
                    className="h-8 px-3 text-xs font-bold font-ui text-[#365983] bg-[#eaf0f8] hover:bg-[#d8e5f5] border border-[#466fa1] rounded-[8px] transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Compass className="w-3.5 h-3.5 text-[#466fa1]" />
                    <span>Xem vị trí trên bản đồ quy hoạch</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Tab 4: Infrastructure, Planning & Real Photos (F5) */}
          {activeTab === 'infra' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#fafafa] p-4 rounded-[4px] border border-[#d6d6d6] space-y-2">
                  <span className="font-ui text-xs font-bold text-[#202020] flex items-center gap-1.5">
                    <Train className="w-4 h-4 text-[#466fa1]" />
                    Kết nối Metro & Giao thông
                  </span>
                  <p className="font-body-content text-xs text-[#5f5f5f] leading-relaxed">
                    {project.metroDistance}
                  </p>
                  <p className="font-body-content text-xs text-[#5f5f5f] leading-relaxed">
                    Trục kết nối: {project.highways}
                  </p>
                </div>

                <div className="bg-[#fafafa] p-4 rounded-[4px] border border-[#d6d6d6] space-y-2">
                  <span className="font-ui text-xs font-bold text-[#202020] flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#466fa1]" />
                    Quy hoạch sử dụng đất
                  </span>
                  <p className="font-body-content text-xs text-[#5f5f5f] leading-relaxed">
                    {project.planningStatus}
                  </p>
                  <p className="font-body-content text-xs text-[#7f7f7f]">
                    Căn cứ theo đồ án quy hoạch phân khu 1/2000 được phê duyệt.
                  </p>
                </div>
              </div>

              {/* Real Site Photos */}
              <div className="bg-[#fafafa] p-4 rounded-[4px] border border-[#d6d6d6]">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-ui text-xs font-bold text-[#202020]">
                      Ảnh thực trạng công trình và tiến độ xây dựng
                    </h4>
                    <p className="font-body-content text-xs text-[#5f5f5f]">
                      Đội ngũ khảo sát VnExpress - Property chụp trực tiếp tại dự án
                    </p>
                  </div>
                  <span className="font-numeric text-xs text-[#5f5f5f] bg-white px-2 py-0.5 rounded-[2px] border border-[#d6d6d6]">
                    Thời gian: {project.actualPhotosDate}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="rounded-[4px] overflow-hidden border border-[#d6d6d6] h-40">
                    <ProjectVisual id={project.id} name={`${project.name} - Mặt chính`} variant="thumb" />
                  </div>
                  <div className="rounded-[4px] border border-[#d6d6d6] bg-white p-3.5 flex flex-col justify-between">
                    <div>
                      <span className="font-ui text-xs font-bold text-[#202020]">
                        Ghi nhận thực tế tại hiện trường:
                      </span>
                      <ul className="mt-2 space-y-1.5 font-body-content text-xs text-[#5f5f5f]">
                        {project.highlights.map((h, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-[#24a148] shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <p className="font-body-content text-xs text-[#7f7f7f] mt-3 pt-2 border-t border-[#ececec]">
                      Định kỳ cập nhật hình ảnh 30 ngày một lần.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Report Inaccurate Data (B10) */}
          {activeTab === 'report' && (
            <div className="bg-white p-4 rounded-[4px] border border-[#d6d6d6]">
              <div className="max-w-xl mx-auto space-y-3.5">
                <div className="flex items-center gap-2 text-[#b13460]">
                  <Flag className="w-4 h-4 text-[#b13460]" />
                  <h4 className="font-ui text-sm font-bold text-[#202020]">
                    Báo sai thông tin hồ sơ dự án (Cơ chế tự sửa 72h - B10)
                  </h4>
                </div>
                <p className="font-body-content text-xs text-[#5f5f5f] leading-relaxed">
                  Nếu bạn phát hiện sai lệch về giá bán, tình trạng pháp lý hoặc tiến độ, vui lòng phản ánh để Ban biên tập đối chiếu lại văn bản gốc trong 72 giờ.
                </p>

                {reportSubmitted ? (
                  <div className="p-3 bg-[#d5eddc] border border-[#24a148] rounded-[4px] text-[#145b29] text-xs font-body-content">
                    <p className="font-bold flex items-center gap-1.5 font-ui">
                      <CheckCircle className="w-4 h-4 text-[#24a148]" />
                      Thông tin phản ánh đã được gửi tới Ban thẩm định VnExpress.
                    </p>
                    <p className="mt-1">
                      Mã phiếu: #HN-REP-{Math.floor(Math.random() * 90000 + 10000)}. Chúng tôi sẽ cập nhật hồ sơ ngay khi kiểm tra xong.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSendReport} className="space-y-3">
                    <div>
                      <label className="block font-ui text-xs text-[#5f5f5f] mb-1">
                        Trường dữ liệu cần đối chiếu lại:
                      </label>
                      <select
                        value={reportField}
                        onChange={(e) => setReportField(e.target.value)}
                        className="w-full text-xs font-body-content bg-[#fafafa] border border-[#9f9f9f] rounded-[4px] px-3 py-2 text-[#202020] focus:outline-none focus:border-[#0590de]"
                      >
                        <option value="Giá giao dịch thực tế">Giá giao dịch thực tế hoặc giá thứ cấp</option>
                        <option value="Pháp lý & Sổ hồng">Tình trạng sổ hồng / Văn bản cấp phép</option>
                        <option value="Quy hoạch hạ tầng">Quy hoạch / Khoảng cách ga Metro</option>
                        <option value="Tiến độ xây dựng">Tiến độ xây dựng thực tế</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-ui text-xs text-[#5f5f5f] mb-1">
                        Nội dung phản ánh & Số hiệu văn bản đối chứng:
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={reportComment}
                        onChange={(e) => setReportComment(e.target.value)}
                        placeholder="Mô tả cụ thể nội dung chưa đúng kèm căn cứ tài liệu..."
                        className="w-full text-xs font-body-content bg-[#fafafa] border border-[#9f9f9f] rounded-[4px] p-2.5 text-[#202020] focus:outline-none focus:border-[#0590de]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="h-8 px-4 text-xs font-bold font-ui text-white bg-[#b13460] hover:bg-[#932a4e] rounded-[8px] transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Gửi thông tin đối chiếu</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Bar */}
        <div className="p-3.5 bg-[#fafafa] border-t border-[#d6d6d6] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="font-body-content text-xs text-[#5f5f5f] hidden sm:block">
            Tuân thủ quy định bảo vệ dữ liệu cá nhân theo Nghị định 13/2023.
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => onToggleCompare(project)}
              className={`h-8 flex-1 sm:flex-initial px-4 text-xs font-bold font-ui rounded-[8px] border transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                isCompared
                  ? 'bg-[#eaf0f8] text-[#365983] border-[#466fa1]'
                  : 'bg-white text-[#5f5f5f] border-[#d6d6d6] hover:bg-[#fafafa]'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>{isCompared ? 'Đang so sánh' : 'Thêm vào so sánh'}</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenCalculatorWithPrice(project.totalPriceNumber)}
              className="h-8 flex-1 sm:flex-initial px-4 text-xs font-bold font-ui text-white bg-[#b13460] hover:bg-[#932a4e] rounded-[8px] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Tính khoản vay trả nợ</span>
            </button>
          </div>
        </div>

      </div>

      {/* Printable Planning Certificate Modal */}
      <ZoningCertificateModal
        project={project}
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
      />
    </div>
  );
};
