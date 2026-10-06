import React, { useState, useMemo } from 'react';
import { ProjectProfile } from '../data/projects';
import { ZoningCertificateModal } from './ZoningCertificateModal';
import { 
  Layers, 
  Train, 
  CircleDollarSign, 
  AlertTriangle, 
  ExternalLink, 
  MapPin, 
  ShieldCheck, 
  Building2, 
  Compass,
  Search,
  Filter,
  FileCheck2,
  Printer,
  Info,
  Maximize2,
  Minimize2,
  CheckCircle2,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

interface MapViewProps {
  projects: ProjectProfile[];
  onOpenDetail: (project: ProjectProfile) => void;
  selectedProjectId?: string;
}

export const MapView: React.FC<MapViewProps> = ({
  projects,
  onOpenDetail,
  selectedProjectId
}) => {
  // Layer toggles
  const [showZoningLayer, setShowZoningLayer] = useState(true);
  const [showRoadRedLine, setShowRoadRedLine] = useState(true);
  const [showMetroLayer, setShowMetroLayer] = useState(true);
  const [showRiverCorridor, setShowRiverCorridor] = useState(true);
  const [showPriceHeatmap, setShowPriceHeatmap] = useState(false);
  
  // Selection and Search state
  const [activePinId, setActivePinId] = useState<string>(selectedProjectId || 'the-metropole');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterZoningCode, setFilterZoningCode] = useState<string>('all');
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [compareWithId, setCompareWithId] = useState<string>('');

  // Synchronize when selectedProjectId changes from parent
  React.useEffect(() => {
    if (selectedProjectId) {
      setActivePinId(selectedProjectId);
    }
  }, [selectedProjectId]);

  const activeProject = useMemo(() => {
    return projects.find(p => p.id === activePinId) || projects[0];
  }, [projects, activePinId]);

  const comparisonProject = useMemo(() => {
    return projects.find(p => p.id === compareWithId) || null;
  }, [projects, compareWithId]);

  // Coordinates on map simulation (in percentages 0-100)
  const coordinates: Record<string, { 
    x: number; 
    y: number; 
    zoneShape: string;
    corridorShape?: string;
    presetZone: string;
  }> = {
    'the-metropole': { 
      x: 36, 
      y: 52, 
      zoneShape: '30,47 42,47 44,57 32,57',
      corridorShape: '28,45 44,45 46,59 30,59',
      presetZone: 'thuthiem'
    },
    'lumiere-riverside': { 
      x: 52, 
      y: 43, 
      zoneShape: '47,38 57,38 55,48 45,48',
      presetZone: 'thaodien'
    },
    'masteri-centre-point': { 
      x: 78, 
      y: 35, 
      zoneShape: '72,27 85,27 86,41 73,41',
      presetZone: 'grandpark'
    },
    'akari-city': { 
      x: 22, 
      y: 68, 
      zoneShape: '16,62 28,62 27,74 15,74',
      presetZone: 'binhtan'
    },
    'ehome-southgate': { 
      x: 12, 
      y: 84, 
      zoneShape: '7,78 18,78 18,89 7,89',
      presetZone: 'benluc'
    },
    'the-matrix-one': { 
      x: 48, 
      y: 18, 
      zoneShape: '42,12 55,12 53,24 40,24',
      presetZone: 'metri'
    },
    'du-an-canh-bao-binh-chanh': { 
      x: 27, 
      y: 83, 
      zoneShape: '21,77 33,77 34,88 22,88',
      presetZone: 'binhchanh'
    },
  };

  // Filtered projects for search
  const searchedProjects = useMemo(() => {
    return projects.filter(p => {
      if (filterZoningCode !== 'all') {
        if (!p.planning.zoningCode.includes(filterZoningCode)) return false;
      }
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.district.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.planning.planDecisionDoc.toLowerCase().includes(q) ||
        p.planning.zoningCode.toLowerCase().includes(q)
      );
    });
  }, [projects, searchQuery, filterZoningCode]);

  return (
    <div id="section-map" className="bg-white rounded-[4px] border border-[#d6d6d6] overflow-hidden">
      
      {/* 1. Header Toolbar */}
      <div className="p-4 sm:p-5 bg-[#fafafa] border-b border-[#d6d6d6]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-ui text-xs font-bold text-[#b13460] uppercase tracking-wider bg-[#fce6eb] px-2 py-0.5 rounded-[2px]">
                Tính năng F5
              </span>
              <h2 className="font-article-title text-lg sm:text-xl font-bold text-[#202020] flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#b13460]" />
                Tra cứu thông tin quy hoạch dự án theo bản đồ
              </h2>
            </div>
            <p className="font-body-content text-xs text-[#5f5f5f] mt-1 leading-relaxed">
              Kiểm tra ranh quy hoạch sử dụng đất (ODT/TMD/NOXH), chỉ tiêu tầng cao, hệ số FAR, lộ giới mở đường và nguy cơ giải tỏa theo đồ án 1/500 & 1/2000.
            </p>
          </div>

          {/* Quick Search & Filter Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Input */}
            <div className="relative min-w-[220px]">
              <Search className="w-3.5 h-3.5 text-[#7f7f7f] absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm dự án, số QĐ 1/500, quận..."
                className="w-full h-8 pl-8 pr-2.5 text-xs font-body-content bg-white border border-[#9f9f9f] rounded-[4px] text-[#202020] placeholder-[#9f9f9f] focus:outline-none focus:border-[#0590de]"
              />
            </div>

            {/* Zoning Type Filter */}
            <select
              value={filterZoningCode}
              onChange={(e) => setFilterZoningCode(e.target.value)}
              className="h-8 text-xs font-ui bg-white border border-[#9f9f9f] rounded-[4px] px-2 text-[#202020] focus:outline-none focus:border-[#0590de]"
            >
              <option value="all">Tất cả loại đất</option>
              <option value="ODT">Đất ở đô thị (ODT)</option>
              <option value="TMD">Thương mại dịch vụ (TMD)</option>
              <option value="NOXH">Nhà ở xã hội (NOXH)</option>
            </select>
          </div>
        </div>

        {/* Preset Location Shortcuts */}
        <div className="mt-3.5 pt-3 border-t border-[#ececec] flex items-center gap-1.5 overflow-x-auto text-xs font-ui">
          <span className="text-[#5f5f5f] whitespace-nowrap mr-1 flex items-center gap-1 font-bold">
            <MapPin className="w-3 h-3 text-[#b13460]" />
            Phân khu trọng điểm:
          </span>

          <button
            type="button"
            onClick={() => setActivePinId('the-metropole')}
            className={`h-6 px-2.5 rounded-[4px] border whitespace-nowrap transition-colors cursor-pointer ${
              activePinId === 'the-metropole'
                ? 'bg-[#b13460] text-white border-[#b13460] font-bold'
                : 'bg-white text-[#5f5f5f] border-[#d6d6d6] hover:text-[#202020]'
            }`}
          >
            Thủ Thiêm (Khu 1)
          </button>

          <button
            type="button"
            onClick={() => setActivePinId('lumiere-riverside')}
            className={`h-6 px-2.5 rounded-[4px] border whitespace-nowrap transition-colors cursor-pointer ${
              activePinId === 'lumiere-riverside'
                ? 'bg-[#b13460] text-white border-[#b13460] font-bold'
                : 'bg-white text-[#5f5f5f] border-[#d6d6d6] hover:text-[#202020]'
            }`}
          >
            Thảo Điền - Metro 1
          </button>

          <button
            type="button"
            onClick={() => setActivePinId('masteri-centre-point')}
            className={`h-6 px-2.5 rounded-[4px] border whitespace-nowrap transition-colors cursor-pointer ${
              activePinId === 'masteri-centre-point'
                ? 'bg-[#b13460] text-white border-[#b13460] font-bold'
                : 'bg-white text-[#5f5f5f] border-[#d6d6d6] hover:text-[#202020]'
            }`}
          >
            Grand Park - Vành đai 3
          </button>

          <button
            type="button"
            onClick={() => setActivePinId('akari-city')}
            className={`h-6 px-2.5 rounded-[4px] border whitespace-nowrap transition-colors cursor-pointer ${
              activePinId === 'akari-city'
                ? 'bg-[#b13460] text-white border-[#b13460] font-bold'
                : 'bg-white text-[#5f5f5f] border-[#d6d6d6] hover:text-[#202020]'
            }`}
          >
            Võ Văn Kiệt (Bình Tân)
          </button>

          <button
            type="button"
            onClick={() => setActivePinId('the-matrix-one')}
            className={`h-6 px-2.5 rounded-[4px] border whitespace-nowrap transition-colors cursor-pointer ${
              activePinId === 'the-matrix-one'
                ? 'bg-[#b13460] text-white border-[#b13460] font-bold'
                : 'bg-white text-[#5f5f5f] border-[#d6d6d6] hover:text-[#202020]'
            }`}
          >
            Mễ Trì (Hà Nội)
          </button>

          <button
            type="button"
            onClick={() => setActivePinId('du-an-canh-bao-binh-chanh')}
            className={`h-6 px-2.5 rounded-[4px] border whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1 ${
              activePinId === 'du-an-canh-bao-binh-chanh'
                ? 'bg-[#da1e28] text-white border-[#da1e28] font-bold'
                : 'bg-[#f8d4d6] text-[#da1e28] border-[#da1e28] hover:bg-[#da1e28] hover:text-white'
            }`}
          >
            <AlertTriangle className="w-3 h-3" />
            <span>Khu Nam - Bình Chánh ⚠️</span>
          </button>
        </div>
      </div>

      {/* 2. Interactive Layer Toggles Bar */}
      <div className="px-4 py-2.5 bg-[#fcfaf6] border-b border-[#ececec] flex flex-wrap items-center gap-2 text-xs font-ui">
        <span className="text-[#5f5f5f] mr-1 flex items-center gap-1 font-bold">
          <Layers className="w-3.5 h-3.5 text-[#466fa1]" />
          Lớp quy hoạch:
        </span>

        {/* Layer 1: Land use */}
        <button
          type="button"
          onClick={() => setShowZoningLayer(!showZoningLayer)}
          className={`h-7 px-2.5 rounded-[4px] border transition-colors cursor-pointer flex items-center gap-1.5 ${
            showZoningLayer
              ? 'bg-[#fce6eb] text-[#b13460] border-[#db7499] font-bold'
              : 'bg-white text-[#5f5f5f] border-[#d6d6d6]'
          }`}
          title="Bật/tắt ranh quy hoạch sử dụng đất"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#f87171] inline-block" />
          <span>Ranh sử dụng đất (ODT/TMD/NOXH)</span>
        </button>

        {/* Layer 2: Road Red Line */}
        <button
          type="button"
          onClick={() => setShowRoadRedLine(!showRoadRedLine)}
          className={`h-7 px-2.5 rounded-[4px] border transition-colors cursor-pointer flex items-center gap-1.5 ${
            showRoadRedLine
              ? 'bg-[#fce8da] text-[#ee853b] border-[#ee853b] font-bold'
              : 'bg-white text-[#5f5f5f] border-[#d6d6d6]'
          }`}
          title="Bật/tắt chỉ giới đường đỏ và lộ giới mở đường"
        >
          <span className="w-3 h-1 bg-[#ee853b] inline-block" />
          <span>Chỉ giới đường đỏ & Lộ giới</span>
        </button>

        {/* Layer 3: Metro Line 1 */}
        <button
          type="button"
          onClick={() => setShowMetroLayer(!showMetroLayer)}
          className={`h-7 px-2.5 rounded-[4px] border transition-colors cursor-pointer flex items-center gap-1.5 ${
            showMetroLayer
              ? 'bg-[#eaf0f8] text-[#365983] border-[#466fa1] font-bold'
              : 'bg-white text-[#5f5f5f] border-[#d6d6d6]'
          }`}
          title="Bật/tắt tuyến và ga Metro số 1"
        >
          <Train className="w-3.5 h-3.5 text-[#0590de]" />
          <span>Tuyến Metro số 1 & Bán kính ga</span>
        </button>

        {/* Layer 4: River corridor */}
        <button
          type="button"
          onClick={() => setShowRiverCorridor(!showRiverCorridor)}
          className={`h-7 px-2.5 rounded-[4px] border transition-colors cursor-pointer flex items-center gap-1.5 ${
            showRiverCorridor
              ? 'bg-[#d5eddc] text-[#145b29] border-[#24a148] font-bold'
              : 'bg-white text-[#5f5f5f] border-[#d6d6d6]'
          }`}
          title="Hành lang bảo vệ bờ sông Sài Gòn 50m"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#24a148] inline-block" />
          <span>Hành lang bảo vệ sông (50 m)</span>
        </button>

        {/* Layer 5: Price Heatmap */}
        <button
          type="button"
          onClick={() => setShowPriceHeatmap(!showPriceHeatmap)}
          className={`h-7 px-2.5 rounded-[4px] border transition-colors cursor-pointer flex items-center gap-1.5 ${
            showPriceHeatmap
              ? 'bg-[#202020] text-white border-[#202020] font-bold'
              : 'bg-white text-[#5f5f5f] border-[#d6d6d6]'
          }`}
          title="Bật/tắt giá đất thị trường"
        >
          <CircleDollarSign className="w-3 h-3" />
          <span>Đơn giá triệu/m²</span>
        </button>
      </div>

      {/* 3. Main Map Canvas + Right Inspector Sheet Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        
        {/* Left Side: SVG Interactive Map Graphics */}
        <div className="lg:col-span-7 relative h-[460px] sm:h-[540px] bg-[#f0f2f5] overflow-hidden select-none border-b lg:border-b-0 lg:border-r border-[#d6d6d6]">
          
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* Base Geographic Background Grid */}
            <defs>
              <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
                <path d="M 5 0 L 0 0 0 5" fill="none" stroke="#e4e7eb" strokeWidth="0.4" />
              </pattern>
              {/* Hatch pattern for high risk warning zone */}
              <pattern id="warningHatch" width="2" height="2" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="2" stroke="#da1e28" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />

            {/* Sông Sài Gòn River Geometry */}
            <path
              d="M 12 0 C 35 25, 20 45, 40 60 C 52 72, 44 90, 58 100"
              fill="none"
              stroke="#b9e2f5"
              strokeWidth="7"
              strokeLinecap="round"
            />
            {/* Sông Đồng Nai & Sông Tắc nhánh Đông */}
            <path
              d="M 70 0 C 82 25, 88 50, 95 100"
              fill="none"
              stroke="#d0ecf9"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* Layer 4: River Green Setback Corridor (50m) */}
            {showRiverCorridor && (
              <path
                d="M 12 0 C 35 25, 20 45, 40 60 C 52 72, 44 90, 58 100"
                fill="none"
                stroke="#86efac"
                strokeWidth="11"
                strokeOpacity="0.35"
                strokeLinecap="round"
              />
            )}

            {/* Bridges (Cầu Ba Son, Cầu Sài Gòn) */}
            <line x1="33" y1="52" x2="38" y2="52" stroke="#718096" strokeWidth="1.4" />
            <line x1="45" y1="44" x2="52" y2="44" stroke="#718096" strokeWidth="1.4" />

            {/* Layer 1: Zoning Polygons (Màu sắc quy chuẩn theo Bộ Xây dựng) */}
            {showZoningLayer && (
              <g opacity="0.75">
                {projects.map((p) => {
                  const coord = coordinates[p.id];
                  if (!coord) return null;
                  const isCurrent = p.id === activePinId;
                  const isCaution = p.riskLevel === 'Cao';

                  return (
                    <polygon
                      key={`poly-${p.id}`}
                      points={coord.zoneShape}
                      fill={isCaution ? 'url(#warningHatch)' : p.planning.zoningColor}
                      stroke={isCurrent ? '#b13460' : isCaution ? '#da1e28' : '#ffffff'}
                      strokeWidth={isCurrent ? '1.2' : '0.6'}
                      className="cursor-pointer transition-all hover:opacity-100"
                      onClick={() => setActivePinId(p.id)}
                    />
                  );
                })}
              </g>
            )}

            {/* Layer 2: Road Red Line / Lộ giới mở đường */}
            {showRoadRedLine && (
              <g>
                {/* Trục Xa Lộ Hà Nội (Lộ giới 153m) */}
                <path
                  d="M 0 52 Q 50 48, 100 38"
                  fill="none"
                  stroke="#ee853b"
                  strokeWidth="1.4"
                  strokeDasharray="2,1"
                />
                {/* Vành đai 3 TP. Hồ Chí Minh (Lộ giới 60m) */}
                <path
                  d="M 75 0 Q 80 45, 88 100"
                  fill="none"
                  stroke="#ee853b"
                  strokeWidth="1.4"
                  strokeDasharray="2,1"
                />
                {/* Đại lộ Võ Văn Kiệt (Lộ giới 60m) */}
                <path
                  d="M 0 68 Q 20 68, 40 60"
                  fill="none"
                  stroke="#ee853b"
                  strokeWidth="1.2"
                  strokeDasharray="2,1"
                />
                {/* Lộ giới mở rộng Quốc lộ 50 (Vướng đất cảnh báo Bình Chánh) */}
                <line
                  x1="18"
                  y1="75"
                  x2="32"
                  y2="92"
                  stroke="#da1e28"
                  strokeWidth="2.2"
                  strokeDasharray="1.5,1"
                />
              </g>
            )}

            {/* Layer 3: Metro Line 1 & Stations with 500m/1km Buffer */}
            {showMetroLayer && (
              <g>
                {/* Metro Line 1 Route */}
                <path
                  d="M 28 60 L 36 53 L 52 44 L 68 37 L 82 32"
                  fill="none"
                  stroke="#0590de"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
                {/* Metro Stations */}
                {/* Ga Ba Son */}
                <circle cx="36" cy="53" r="1.5" fill="#ffffff" stroke="#0590de" strokeWidth="1.2" />
                <circle cx="36" cy="53" r="5" fill="none" stroke="#0590de" strokeWidth="0.4" strokeDasharray="1,1" opacity="0.6" />

                {/* Ga Thảo Điền / An Phú */}
                <circle cx="52" cy="44" r="1.5" fill="#ffffff" stroke="#0590de" strokeWidth="1.2" />
                <circle cx="52" cy="44" r="5.5" fill="none" stroke="#0590de" strokeWidth="0.4" strokeDasharray="1,1" opacity="0.6" />

                {/* Ga Bến xe Miền Đông mới */}
                <circle cx="82" cy="32" r="1.5" fill="#ffffff" stroke="#0590de" strokeWidth="1.2" />
                <circle cx="82" cy="32" r="6" fill="none" stroke="#0590de" strokeWidth="0.4" strokeDasharray="1,1" opacity="0.6" />
              </g>
            )}

            {/* District Landmarks Labels */}
            <text x="31" y="44" fontSize="2.5" fill="#718096" fontWeight="bold">SÔNG SÀI GÒN</text>
            <text x="33" y="63" fontSize="2.2" fill="#718096">Khu chức năng 1 Thủ Thiêm</text>
            <text x="50" y="38" fontSize="2.2" fill="#718096">Thảo Điền</text>
            <text x="73" y="24" fontSize="2.2" fill="#718096">Vinhomes Grand Park</text>
            <text x="21" y="93" fontSize="2.2" fill="#da1e28" fontWeight="bold">Khu vực cảnh báo QL50</text>
          </svg>

          {/* Interactive Project Location Pins */}
          {searchedProjects.map((proj) => {
            const coord = coordinates[proj.id];
            if (!coord) return null;
            const isSelected = proj.id === activePinId;
            const isCaution = proj.riskLevel === 'Cao';

            return (
              <div
                key={proj.id}
                style={{ left: `${coord.x}%`, top: `${coord.y}%` }}
                onClick={() => setActivePinId(proj.id)}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer transition-transform hover:scale-105"
              >
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] text-xs font-numeric font-bold border transition-colors ${
                  isSelected
                    ? 'bg-[#b13460] text-white border-[#b13460] ring-2 ring-[#b13460]/30'
                    : isCaution
                    ? 'bg-[#da1e28] text-white border-[#da1e28]'
                    : showPriceHeatmap
                    ? 'bg-[#202020] text-white border-[#202020]'
                    : 'bg-white text-[#202020] border-[#9f9f9f]'
                }`}>
                  {isCaution ? (
                    <AlertTriangle className="w-3.5 h-3.5 text-white shrink-0" />
                  ) : (
                    <MapPin className="w-3.5 h-3.5 text-[#b13460] shrink-0" />
                  )}
                  <span className="whitespace-nowrap font-ui text-[11px]">
                    {proj.name}
                  </span>
                  {showPriceHeatmap && (
                    <span className="text-[10px] font-numeric text-[#facc15] font-normal pl-1 border-l border-white/20">
                      {proj.pricePerM2} tr/m²
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {/* Map Legend (Bottom-Left overlay) */}
          <div className="absolute bottom-3 left-3 bg-white/95 p-2.5 rounded-[4px] border border-[#d6d6d6] text-[11px] font-ui space-y-1 max-w-[210px] backdrop-blur-xs">
            <span className="font-bold text-[#202020] block border-b border-[#ececec] pb-1">
              Chú giải màu quy hoạch:
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f87171] inline-block shrink-0" />
              <span>Đất ở đô thị cao tầng (ODT)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#fb923c] inline-block shrink-0" />
              <span>Đất thương mại & Compound</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#34d399] inline-block shrink-0" />
              <span>Đất nhà ở xã hội (NOXH)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-1 bg-[#ee853b] inline-block shrink-0" />
              <span>Chỉ giới đường đỏ / Lộ giới mở đường</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#da1e28]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#da1e28] inline-block shrink-0" />
              <span className="font-bold">Đất vướng ranh thu hồi / Chưa 1/500</span>
            </div>
          </div>

          {/* Quick Notice Bottom-Right */}
          <div className="absolute bottom-3 right-3 bg-white/95 px-2.5 py-1.5 rounded-[4px] border border-[#d6d6d6] text-[11px] font-ui text-[#5f5f5f]">
            <span>Click vào dự án trên bản đồ để tra cứu</span>
          </div>

        </div>

        {/* Right Side: Detailed Planning Certificate Sheet (Phiếu tra cứu thông tin quy hoạch) */}
        <div className="lg:col-span-5 p-4 sm:p-5 flex flex-col justify-between bg-white overflow-y-auto max-h-[540px]">
          
          <div className="space-y-4">
            
            {/* Sheet Title & Status Badge */}
            <div className="pb-3 border-b border-[#ececec]">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-ui text-xs font-bold text-[#b13460]">
                      Phiếu tra cứu chỉ tiêu quy hoạch (F5)
                    </span>
                    <span className="text-[#9f9f9f] text-xs">•</span>
                    <span className="font-numeric text-[11px] text-[#5f5f5f]">
                      1/500 & 1/2000
                    </span>
                  </div>
                  <h3 className="font-article-title text-base sm:text-lg font-bold text-[#202020] leading-snug mt-0.5">
                    {activeProject.name}
                  </h3>
                  <p className="font-body-content text-xs text-[#5f5f5f] mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#7f7f7f] shrink-0" />
                    <span>{activeProject.address}</span>
                  </p>
                </div>

                <span className={`text-xs font-ui font-bold px-2 py-0.5 rounded-[2px] shrink-0 ${
                  activeProject.planning.approvedScale === 'Quy hoạch chi tiết 1/500'
                    ? 'text-[#145b29] bg-[#d5eddc]'
                    : 'text-[#da1e28] bg-[#f8d4d6]'
                }`}>
                  {activeProject.planning.approvedScale}
                </span>
              </div>
            </div>

            {/* Risk & Acquisition Alert Box */}
            <div className={`p-3 rounded-[4px] border text-xs font-body-content ${
              activeProject.riskLevel === 'Cao'
                ? 'bg-[#f8d4d6] border-[#da1e28] text-[#da1e28]'
                : 'bg-[#fafafa] border-[#d6d6d6] text-[#202020]'
            }`}>
              <div className="flex items-center gap-1.5 font-bold font-ui mb-1">
                {activeProject.riskLevel === 'Cao' ? (
                  <AlertTriangle className="w-4 h-4 text-[#da1e28]" />
                ) : (
                  <ShieldCheck className="w-4 h-4 text-[#24a148]" />
                )}
                <span>Đánh giá rủi ro thu hồi & Chỉ giới đường đỏ:</span>
              </div>
              <p className="leading-relaxed">
                {activeProject.planning.acquisitionRisk}. {activeProject.planning.roadRedLine}.
              </p>
            </div>

            {/* Core Planning Parameters (4 chỉ tiêu kiến trúc) */}
            <div className="space-y-2 text-xs font-body-content">
              <div className="flex items-center justify-between">
                <span className="font-ui font-bold text-[#202020]">
                  4 chỉ tiêu quy hoạch kiến trúc thẩm định:
                </span>
                <span className="text-[11px] text-[#5f5f5f] font-ui">
                  {activeProject.planning.planDecisionDoc}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                
                {/* 1. Chức năng sử dụng đất */}
                <div className="p-2.5 bg-[#fafafa] rounded-[4px] border border-[#ececec]">
                  <span className="text-[#5f5f5f] block text-[11px]">Chức năng sử dụng đất:</span>
                  <strong className="text-[#b13460] font-numeric text-xs font-bold">{activeProject.planning.zoningCode}</strong>
                  <span className="block text-[11px] text-[#7f7f7f] mt-0.5 line-clamp-1">
                    {activeProject.planning.zoningName}
                  </span>
                </div>

                {/* 2. Tầng cao tối đa */}
                <div className="p-2.5 bg-[#fafafa] rounded-[4px] border border-[#ececec]">
                  <span className="text-[#5f5f5f] block text-[11px]">Tầng cao cho phép:</span>
                  <strong className="text-[#202020] font-numeric text-xs font-bold">{activeProject.planning.maxFloors}</strong>
                  <span className="block text-[11px] text-[#7f7f7f] mt-0.5">Theo thỏa thuận tĩnh không</span>
                </div>

                {/* 3. Mật độ xây dựng */}
                <div className="p-2.5 bg-[#fafafa] rounded-[4px] border border-[#ececec]">
                  <span className="text-[#5f5f5f] block text-[11px]">Mật độ xây dựng:</span>
                  <strong className="text-[#202020] font-numeric text-xs font-bold">{activeProject.planning.buildingDensity}</strong>
                  <span className="block text-[11px] text-[#7f7f7f] mt-0.5">Khối tháp công trình</span>
                </div>

                {/* 4. Hệ số sử dụng đất (FAR) */}
                <div className="p-2.5 bg-[#fafafa] rounded-[4px] border border-[#ececec]">
                  <span className="text-[#5f5f5f] block text-[11px]">Hệ số sử dụng đất (FAR):</span>
                  <strong className="text-[#202020] font-numeric text-xs font-bold">{activeProject.planning.floorAreaRatio}</strong>
                  <span className="block text-[11px] text-[#7f7f7f] mt-0.5">Đạt chuẩn QCVN 01:2021</span>
                </div>

              </div>

              {/* Setbacks and Authority Details */}
              <div className="p-3 bg-[#fafafa] rounded-[4px] border border-[#ececec] space-y-1.5 text-xs">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-[#5f5f5f] shrink-0">Khoảng lùi chỉ giới:</span>
                  <strong className="text-[#202020] text-right font-numeric">{activeProject.planning.setbackLimit}</strong>
                </div>
                <div className="flex justify-between items-start gap-2">
                  <span className="text-[#5f5f5f] shrink-0">Phân khu đô thị:</span>
                  <span className="text-[#202020] font-bold text-right">{activeProject.planning.planningZoneName}</span>
                </div>
                <div className="flex justify-between items-start gap-2">
                  <span className="text-[#5f5f5f] shrink-0">Đơn vị thẩm định:</span>
                  <span className="text-[#5f5f5f] text-right">{activeProject.verifiedSource}</span>
                </div>
              </div>
            </div>

            {/* Quick Zoning Comparison Dropdown */}
            <div className="pt-2 border-t border-[#ececec]">
              <div className="flex items-center justify-between text-xs font-ui mb-1.5">
                <span className="text-[#5f5f5f]">So sánh chỉ tiêu quy hoạch với:</span>
                {compareWithId && (
                  <button
                    type="button"
                    onClick={() => setCompareWithId('')}
                    className="text-[11px] text-[#b13460] hover:underline cursor-pointer"
                  >
                    Hủy so sánh
                  </button>
                )}
              </div>
              <select
                value={compareWithId}
                onChange={(e) => setCompareWithId(e.target.value)}
                className="w-full h-7 text-xs font-ui bg-white border border-[#9f9f9f] rounded-[4px] px-2 text-[#202020]"
              >
                <option value="">-- Chọn dự án để đối chiếu chỉ tiêu --</option>
                {projects.filter(p => p.id !== activeProject.id).map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} (Mật độ {p.planning.buildingDensity}, FAR {p.planning.floorAreaRatio})
                  </option>
                ))}
              </select>

              {comparisonProject && (
                <div className="mt-2 p-2 bg-[#fcfaf6] rounded-[4px] border border-[#d6d6d6] text-[11px] space-y-1 font-numeric">
                  <div className="flex justify-between">
                    <span className="text-[#5f5f5f]">{activeProject.name}:</span>
                    <strong>Mật độ {activeProject.planning.buildingDensity} | FAR {activeProject.planning.floorAreaRatio}</strong>
                  </div>
                  <div className="flex justify-between text-[#466fa1]">
                    <span className="text-[#5f5f5f]">{comparisonProject.name}:</span>
                    <strong>Mật độ {comparisonProject.planning.buildingDensity} | FAR {comparisonProject.planning.floorAreaRatio}</strong>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Action CTAs: Print Certificate & View Full Profile */}
          <div className="pt-3 border-t border-[#ececec] mt-4 flex flex-col sm:flex-row items-center gap-2">
            <button
              type="button"
              onClick={() => setIsCertificateOpen(true)}
              className="w-full sm:w-auto h-8 px-3 text-xs font-bold font-ui text-[#202020] bg-white hover:bg-[#f3f3f3] border border-[#9f9f9f] rounded-[8px] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              title="Xuất phiếu thông tin quy hoạch theo mẫu"
            >
              <Printer className="w-3.5 h-3.5 text-[#5f5f5f]" />
              <span>In phiếu trích lục quy hoạch</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenDetail(activeProject)}
              className="w-full sm:flex-1 h-8 px-3 text-xs font-bold font-ui text-white bg-[#b13460] hover:bg-[#932a4e] rounded-[8px] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Xem đầy đủ hồ sơ pháp lý & giá</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

      {/* Printable Planning Certificate Modal */}
      <ZoningCertificateModal
        project={activeProject}
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
      />

    </div>
  );
};
