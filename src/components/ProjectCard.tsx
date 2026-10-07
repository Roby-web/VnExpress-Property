import React from 'react';
import { ProjectProfile } from '../data/projects';
import { ProjectVisual } from './ProjectVisual';
import { 
  ShieldCheck, 
  AlertTriangle, 
  TrendingUp, 
  Scale, 
  Bookmark, 
  MapPin, 
  Train, 
  Check, 
  ExternalLink,
  Compass
} from 'lucide-react';

interface ProjectCardProps {
  project: ProjectProfile;
  onOpenDetail: (project: ProjectProfile) => void;
  onToggleCompare: (project: ProjectProfile) => void;
  isCompared: boolean;
  onToggleSave: (projectId: string) => void;
  isSaved: boolean;
  onInspectZoning?: (projectId: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenDetail,
  onToggleCompare,
  isCompared,
  onToggleSave,
  isSaved,
  onInspectZoning
}) => {
  const hasPriceWarning = project.priceGapWarning;

  return (
    <article className="vne-card flex flex-col overflow-hidden transition-colors hover:border-[#9f9f9f]">
      
      {/* Visual Header with Real Status Overlay */}
      <div className="relative">
        <ProjectVisual 
          id={project.id} 
          name={project.name} 
          variant="thumb" 
          imageUrl={project.imageUrl} 
        />

        {/* Favorite bookmark button */}
        <button
          type="button"
          onClick={() => onToggleSave(project.id)}
          aria-label={isSaved ? 'Hủy lưu dự án' : 'Lưu dự án để theo dõi'}
          className={`absolute top-2.5 right-2.5 z-20 w-8 h-8 rounded-[8px] flex items-center justify-center transition-colors cursor-pointer ${
            isSaved 
              ? 'bg-[#b13460] text-white' 
              : 'bg-[#ffffff]/90 text-[#202020] hover:text-[#b13460] hover:bg-[#ffffff]'
          }`}
          title={isSaved ? 'Đã lưu trong danh sách theo dõi' : 'Lưu dự án'}
        >
          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* Transparency Score badge (B1) */}
        <div className="absolute bottom-2.5 left-2.5 z-20 flex items-center gap-1.5 bg-[#202020] text-white px-2.5 py-1 rounded-[4px] text-xs font-numeric">
          <span className="text-[11px] text-[#fafafa] font-ui">Minh bạch:</span>
          <span className={`font-bold ${
            project.transparencyScore >= 85 ? 'text-[#62c078]' : 
            project.transparencyScore >= 70 ? 'text-[#f3a670]' : 'text-[#e45b62]'
          }`}>
            {project.transparencyScore}/100
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Project Title (Merriweather - RULE.md: No truncate on title!) */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <h3 
                onClick={() => onOpenDetail(project)}
                className="font-article-title text-base sm:text-lg font-bold text-[#202020] hover:text-[#b13460] transition-colors cursor-pointer leading-snug"
                title={project.name}
              >
                {project.name}
              </h3>
              <p className="font-body-content text-xs text-[#5f5f5f] flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#466fa1] shrink-0" />
                <span>{project.ward}, {project.district}</span>
              </p>
            </div>
            
            <div className="text-right shrink-0">
              <span className="font-numeric text-base font-bold text-[#b13460] block">
                {project.totalPriceText}
              </span>
              <span className="font-numeric text-xs text-[#5f5f5f]">
                {project.pricePerM2Display}
              </span>
            </div>
          </div>

          {/* Key metadata line - Clean & compact */}
          <div className="font-body-content flex items-center justify-between text-xs text-[#5f5f5f] py-1.5 border-y border-[#ececec] my-2">
            <span className="truncate max-w-[160px] font-medium text-[#202020]" title={project.developer}>
              {project.developer}
            </span>
            <div className="flex items-center gap-1.5 shrink-0 font-numeric">
              <span>{project.bedroomsRange}</span>
              <span className="text-[#d6d6d6]">·</span>
              <span>{project.areaRange}</span>
            </div>
          </div>

          {/* Pricing Comparison (F4 & F6 3-Tier prices) */}
          <div className="bg-[#fafafa] rounded-[4px] p-2.5 my-2 border border-[#ececec] space-y-1 font-body-content">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#5f5f5f]">Giá thị trường:</span>
              <span className="font-numeric font-bold text-[#202020]">
                {project.priceTier.recordedTransactionPriceDisplay}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-[#5f5f5f]">Giá chào thứ cấp:</span>
              <div className="flex items-center gap-1.5">
                <span className="font-numeric font-bold text-[#202020]">
                  {project.priceTier.secondaryAskingPriceDisplay}
                </span>
                
                {/* Warning if price gap > 5% */}
                {hasPriceWarning ? (
                  <span 
                    className="inline-flex items-center gap-0.5 text-[11px] font-bold text-[#da1e28] bg-[#f8d4d6] border border-[#da1e28] px-1.5 py-0.5 rounded-[2px] font-numeric"
                    title={`Giá chào cao hơn giá thực tế ${project.priceGapPercentDisplay}`}
                  >
                    <TrendingUp className="w-2.5 h-2.5" />
                    +{project.priceGapPercentDisplay}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-[#24a148] bg-[#d5eddc] px-1.5 py-0.5 rounded-[2px] font-numeric">
                    +{project.priceGapPercentDisplay}
                  </span>
                )}
              </div>
            </div>

            {hasPriceWarning && (
              <p className="text-[11px] text-[#da1e28] flex items-center gap-1 pt-0.5 font-body-content font-medium">
                <AlertTriangle className="w-3 h-3 text-[#da1e28] shrink-0" />
                <span>Giá chào cao hơn thị trường trên 5%</span>
              </p>
            )}
          </div>

          {/* Legal status row */}
          <div className="space-y-1 text-xs font-body-content">
            <div className="flex items-center justify-between">
              <span className="text-[#7f7f7f]">Pháp lý:</span>
              <span className={`font-bold flex items-center gap-1 font-ui ${
                project.legalStatus === 'Đã xác minh' ? 'text-[#24a148]' :
                project.legalStatus === 'Có cảnh báo' ? 'text-[#da1e28]' : 'text-[#ee853b]'
              }`}>
                {project.legalStatus === 'Đã xác minh' ? (
                  <ShieldCheck className="w-3.5 h-3.5 text-[#24a148]" />
                ) : (
                  <AlertTriangle className="w-3.5 h-3.5 text-[#da1e28]" />
                )}
                <span>{project.legalStatus}</span>
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-[#5f5f5f]">
              <span>{project.ownershipCertificate}</span>
              <span className="font-numeric">Xác minh: {project.verifiedDate.split(',')[1]?.trim() || project.verifiedDate}</span>
            </div>

            {/* Metro & Planning Infrastructure Row */}
            <div className="flex items-center justify-between gap-1 text-xs text-[#202020] pt-1 border-t border-[#ececec]">
              <div className="flex items-center gap-1.5 truncate">
                <Train className="w-3.5 h-3.5 text-[#466fa1] shrink-0" />
                <span className="truncate">{project.metroDistance}</span>
              </div>

              {onInspectZoning && (
                <button
                  type="button"
                  onClick={() => onInspectZoning(project.id)}
                  className="shrink-0 text-[11px] font-ui font-bold text-[#b13460] hover:text-[#932a4e] flex items-center gap-1 cursor-pointer bg-[#fce6eb] px-1.5 py-0.5 rounded-[2px]"
                  title="Tra cứu thông tin quy hoạch 1/500 trên bản đồ"
                >
                  <Compass className="w-3 h-3 text-[#b13460]" />
                  <span>Quy hoạch {project.planning.zoningCode}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="mt-4 pt-3 border-t border-[#ececec] flex items-center gap-2">
          <button
            type="button"
            onClick={() => onOpenDetail(project)}
            className="h-8 flex-1 px-3 text-xs font-bold font-ui text-white bg-[#b13460] hover:bg-[#932a4e] rounded-[8px] transition-colors text-center cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Hồ sơ chi tiết</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => onToggleCompare(project)}
            className={`h-8 px-3 text-xs font-bold font-ui rounded-[8px] border transition-colors cursor-pointer flex items-center gap-1 ${
              isCompared
                ? 'bg-[#eaf0f8] text-[#365983] border-[#466fa1]'
                : 'text-[#5f5f5f] bg-[#ffffff] border-[#d6d6d6] hover:bg-[#f3f3f3]'
            }`}
            title={isCompared ? 'Bỏ chọn so sánh' : 'Thêm vào bảng so sánh'}
          >
            {isCompared ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#466fa1]" />
                <span>Đã chọn</span>
              </>
            ) : (
              <>
                <Scale className="w-3.5 h-3.5" />
                <span>So sánh</span>
              </>
            )}
          </button>
        </div>

      </div>
    </article>
  );
};
