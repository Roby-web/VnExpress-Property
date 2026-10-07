import React, { useState } from 'react';
import { Search, Sparkles, ShieldCheck, MapPin, Building2, CircleDollarSign, CheckCircle2, RotateCcw, X, Info } from 'lucide-react';

export interface FilterState {
  listingType: 'buy' | 'rent';
  city: string;
  district: string;
  propertyType: string;
  priceRange: string;
  legalStatus: string;
  aiPrompt?: string;
  aiChips: { id: string; label: string; field: keyof FilterState; value: string }[];
}

interface HeroSearchProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onExecuteSearch: () => void;
  totalMatches: number;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  filters,
  onFilterChange,
  onExecuteSearch,
  totalMatches
}) => {
  const [activeTab, setActiveTab] = useState<'standard' | 'ai'>('standard');
  const [naturalQuery, setNaturalQuery] = useState('');
  const [isAiProcessing, setIsAiProcessing] = useState(false);

  // Sample AI queries (concise, factual)
  const sampleAiQueries = [
    'Tìm căn hộ 2 - 3,5 tỷ tại TP. Thủ Đức gần ga Metro số 1 đã có sổ hồng',
    'Nhà ở xã hội hoặc căn hộ dưới 2 tỷ tại TP. Hồ Chí Minh đã nghiệm thu móng',
    'Căn hộ thương mại tại Hà Nội đã hoàn thành thẩm định phòng cháy chữa cháy',
    'Dự án tại Thảo Điền view sông đã xác minh quy hoạch chi tiết 1/500'
  ];

  const handleApplyAiQuery = (queryText: string) => {
    setNaturalQuery(queryText);
    setIsAiProcessing(true);

    setTimeout(() => {
      const lower = queryText.toLowerCase();
      const newChips: FilterState['aiChips'] = [];
      let updatedCity = filters.city;
      let updatedDistrict = 'all';
      let updatedType = filters.propertyType;
      let updatedPrice = filters.priceRange;
      let updatedLegal = filters.legalStatus;

      // Detect city & district
      if (lower.includes('hà nội') || lower.includes('nam từ liêm') || lower.includes('cầu giấy')) {
        updatedCity = 'Hà Nội';
        newChips.push({ id: 'c1', label: 'Thành phố: Hà Nội', field: 'city', value: 'Hà Nội' });
        if (lower.includes('nam từ liêm')) {
          updatedDistrict = 'Quận Nam Từ Liêm';
          newChips.push({ id: 'd1', label: 'Quận: Nam Từ Liêm', field: 'district', value: 'Quận Nam Từ Liêm' });
        }
      } else if (lower.includes('thủ đức') || lower.includes('thảo điền') || lower.includes('tp. hồ chí minh') || lower.includes('hồ chí minh') || lower.includes('bình tân')) {
        updatedCity = 'TP. Hồ Chí Minh';
        newChips.push({ id: 'c2', label: 'Thành phố: TP. Hồ Chí Minh', field: 'city', value: 'TP. Hồ Chí Minh' });
        if (lower.includes('thủ đức') || lower.includes('thảo điền')) {
          updatedDistrict = 'TP. Thủ Đức';
          newChips.push({ id: 'd2', label: 'Khu vực: TP. Thủ Đức', field: 'district', value: 'TP. Thủ Đức' });
        } else if (lower.includes('bình tân')) {
          updatedDistrict = 'Quận Bình Tân';
          newChips.push({ id: 'd3', label: 'Khu vực: Quận Bình Tân', field: 'district', value: 'Quận Bình Tân' });
        }
      }

      // Detect property type
      if (lower.includes('nhà ở xã hội') || lower.includes('vừa túi tiền')) {
        updatedType = 'Nhà ở xã hội';
        newChips.push({ id: 't1', label: 'Loại hình: Nhà ở xã hội', field: 'propertyType', value: 'Nhà ở xã hội' });
      } else if (lower.includes('đất nền')) {
        updatedType = 'Đất nền';
        newChips.push({ id: 't2', label: 'Loại hình: Đất nền', field: 'propertyType', value: 'Đất nền' });
      } else {
        updatedType = 'Căn hộ thương mại';
        newChips.push({ id: 't3', label: 'Loại hình: Căn hộ thương mại', field: 'propertyType', value: 'Căn hộ thương mại' });
      }

      // Detect price range (Vietnamese decimal comma notation)
      if (lower.includes('dưới 2 tỷ') || lower.includes('< 2 tỷ')) {
        updatedPrice = '< 2 tỷ';
        newChips.push({ id: 'p1', label: 'Ngân sách: Dưới 2 tỷ đồng', field: 'priceRange', value: '< 2 tỷ' });
      } else if (lower.includes('2 - 3,5 tỷ') || lower.includes('2-3 tỷ') || lower.includes('2 - 3.5 tỷ')) {
        updatedPrice = '2 - 3.5 tỷ';
        newChips.push({ id: 'p2', label: 'Ngân sách: 2 - 3,5 tỷ đồng', field: 'priceRange', value: '2 - 3.5 tỷ' });
      } else if (lower.includes('5 - 10 tỷ') || lower.includes('cao cấp')) {
        updatedPrice = '5 - 10 tỷ';
        newChips.push({ id: 'p3', label: 'Ngân sách: 5 - 10 tỷ đồng', field: 'priceRange', value: '5 - 10 tỷ' });
      }

      // Detect legal status
      if (lower.includes('đã có sổ') || lower.includes('xác minh') || lower.includes('sổ hồng') || lower.includes('pháp lý')) {
        updatedLegal = 'Đã xác minh';
        newChips.push({ id: 'l1', label: 'Pháp lý: Đã xác minh', field: 'legalStatus', value: 'Đã xác minh' });
      }

      onFilterChange({
        ...filters,
        city: updatedCity,
        district: updatedDistrict,
        propertyType: updatedType,
        priceRange: updatedPrice,
        legalStatus: updatedLegal,
        aiChips: newChips,
        aiPrompt: queryText
      });

      setIsAiProcessing(false);
      onExecuteSearch();
    }, 250);
  };

  const removeChip = (chipId: string) => {
    const updated = filters.aiChips.filter(c => c.id !== chipId);
    onFilterChange({
      ...filters,
      aiChips: updated
    });
  };

  const resetAllFilters = () => {
    onFilterChange({
      listingType: 'buy',
      city: 'all',
      district: 'all',
      propertyType: 'all',
      priceRange: 'all',
      legalStatus: 'all',
      aiChips: [],
      aiPrompt: ''
    });
    setNaturalQuery('');
  };

  return (
    <section className="relative pt-10 pb-12 overflow-hidden border-b border-[#d6d6d6]">
      {/* Background Architectural Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
          alt="Kiến trúc đô thị hiện đại"
          className="w-full h-full object-cover object-center opacity-30"
        />
        {/* Soft Vignette & Editorial Tint */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#fcfaf6]/90 via-[#fcfaf6]/85 to-[#fcfaf6]" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Title & Lead following Editor standards - Shortened */}
        <div className="max-w-3xl mx-auto text-center mb-6">
          <p className="font-ui text-xs font-bold text-[#b13460] mb-2 tracking-normal">
            Dữ liệu độc lập · Sở Xây dựng & Văn phòng Đăng ký Đất đai
          </p>
          
          <h1 className="font-article-title text-2xl sm:text-3xl md:text-4xl font-bold text-[#202020] leading-snug mb-2">
            Tra cứu hồ sơ và kiểm định giá bất động sản
          </h1>

          <p className="font-body-content text-sm sm:text-base text-[#5f5f5f] max-w-xl mx-auto">
            Bóc tách 3 tầng giá và kiểm tra an toàn pháp lý trước khi xuống tiền.
          </p>

          {/* Adjacency Proof Bar */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-y-2 gap-x-5 text-xs text-[#5f5f5f] font-ui border-t border-[#d6d6d6]/60 pt-3">
            <span className="flex items-center gap-1.5 text-[#24a148] font-bold">
              <CheckCircle2 className="w-4 h-4 text-[#24a148]" />
              <span>500+ hồ sơ đạt chuẩn</span>
            </span>
            <span className="text-[#d6d6d6]">|</span>
            <span className="flex items-center gap-1.5 text-[#202020]">
              <ShieldCheck className="w-4 h-4 text-[#466fa1]" />
              <span>100% đối chiếu văn bản gốc</span>
            </span>
            <span className="text-[#d6d6d6]">|</span>
            <span className="flex items-center gap-1.5 text-[#ee853b] font-bold">
              <CircleDollarSign className="w-4 h-4 text-[#ee853b]" />
              <span>Cảnh báo lệch giá trên 5%</span>
            </span>
          </div>
        </div>

        {/* Central Search Card (Flat, no shadows per Design.md) */}
        <div className="max-w-4xl mx-auto bg-[#ffffff] rounded-[4px] border border-[#d6d6d6] p-4 sm:p-5">
          
          {/* Search Mode Segmented Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#ececec]">
            {/* Buy / Rent mode */}
            <div className="flex items-center bg-[#f3f3f3] p-1 rounded-[8px] w-fit">
              <button
                type="button"
                onClick={() => onFilterChange({ ...filters, listingType: 'buy' })}
                className={`px-3.5 py-1.5 text-xs font-bold font-ui rounded-[8px] transition-colors cursor-pointer ${
                  filters.listingType === 'buy'
                    ? 'bg-[#b13460] text-white'
                    : 'text-[#5f5f5f] hover:text-[#202020]'
                }`}
              >
                Mua bất động sản
              </button>
              <button
                type="button"
                onClick={() => onFilterChange({ ...filters, listingType: 'rent' })}
                className={`px-3.5 py-1.5 text-xs font-bold font-ui rounded-[8px] transition-colors cursor-pointer ${
                  filters.listingType === 'rent'
                    ? 'bg-[#b13460] text-white'
                    : 'text-[#5f5f5f] hover:text-[#202020]'
                }`}
              >
                Thuê bất động sản
              </button>
            </div>

            {/* Switch between Standard Filters and AI Search */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('standard')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-ui font-bold rounded-[8px] transition-colors cursor-pointer ${
                  activeTab === 'standard'
                    ? 'bg-[#466fa1] text-white'
                    : 'text-[#5f5f5f] bg-[#f3f3f3] hover:bg-[#e5e5e5]'
                }`}
              >
                <Search className="w-3.5 h-3.5" />
                <span>Bộ lọc chi tiết</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('ai')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-ui font-bold rounded-[8px] transition-colors cursor-pointer ${
                  activeTab === 'ai'
                    ? 'bg-[#b13460] text-white'
                    : 'text-[#b13460] bg-[#fce6eb] hover:bg-[#fbd3dc]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Tìm kiếm bằng AI</span>
              </button>
            </div>
          </div>

          {/* Mode 1: Standard Filters */}
          {activeTab === 'standard' ? (
            <div className="pt-3.5 space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                
                {/* 1. Location */}
                <div className="space-y-1">
                  <label className="text-xs font-ui font-normal text-[#5f5f5f] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#466fa1]" />
                    <span>Tỉnh / Thành phố</span>
                  </label>
                  <select
                    value={filters.city}
                    onChange={(e) => onFilterChange({ ...filters, city: e.target.value, district: 'all' })}
                    className="w-full text-xs font-body-content bg-[#fafafa] border border-[#9f9f9f] rounded-[4px] px-3 py-2 text-[#202020] focus:outline-none focus:border-[#0590de]"
                  >
                    <option value="all">Toàn quốc (TP. Hồ Chí Minh, Hà Nội)</option>
                    <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="Bình Dương">Bình Dương / Long An</option>
                  </select>
                </div>

                {/* 2. Property Type */}
                <div className="space-y-1">
                  <label className="text-xs font-ui font-normal text-[#5f5f5f] flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-[#466fa1]" />
                    <span>Loại hình bất động sản</span>
                  </label>
                  <select
                    value={filters.propertyType}
                    onChange={(e) => onFilterChange({ ...filters, propertyType: e.target.value })}
                    className="w-full text-xs font-body-content bg-[#fafafa] border border-[#9f9f9f] rounded-[4px] px-3 py-2 text-[#202020] focus:outline-none focus:border-[#0590de]"
                  >
                    <option value="all">Tất cả loại hình</option>
                    <option value="Căn hộ thương mại">Căn hộ thương mại</option>
                    <option value="Nhà ở xã hội">Nhà ở xã hội / Vừa túi tiền</option>
                    <option value="Đất nền">Đất nền dự án</option>
                    <option value="Nhà phố">Nhà phố / Biệt thự</option>
                  </select>
                </div>

                {/* 3. Price Range */}
                <div className="space-y-1">
                  <label className="text-xs font-ui font-normal text-[#5f5f5f] flex items-center gap-1">
                    <CircleDollarSign className="w-3.5 h-3.5 text-[#466fa1]" />
                    <span>Khoảng ngân sách</span>
                  </label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => onFilterChange({ ...filters, priceRange: e.target.value })}
                    className="w-full text-xs font-body-content bg-[#fafafa] border border-[#9f9f9f] rounded-[4px] px-3 py-2 text-[#202020] focus:outline-none focus:border-[#0590de]"
                  >
                    <option value="all">Tất cả mức giá</option>
                    <option value="< 2 tỷ">Dưới 2 tỷ đồng</option>
                    <option value="2 - 3.5 tỷ">2 - 3,5 tỷ đồng (Người mua ở thực)</option>
                    <option value="3.5 - 5 tỷ">3,5 - 5 tỷ đồng</option>
                    <option value="5 - 10 tỷ">5 - 10 tỷ đồng</option>
                    <option value="> 10 tỷ">Trên 10 tỷ đồng</option>
                  </select>
                </div>

                {/* 4. Legal Status */}
                <div className="space-y-1">
                  <label className="text-xs font-ui font-normal text-[#5f5f5f] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#466fa1]" />
                    <span>Tình trạng pháp lý</span>
                  </label>
                  <select
                    value={filters.legalStatus}
                    onChange={(e) => onFilterChange({ ...filters, legalStatus: e.target.value })}
                    className="w-full text-xs font-body-content bg-[#fafafa] border border-[#9f9f9f] rounded-[4px] px-3 py-2 text-[#202020] focus:outline-none focus:border-[#0590de]"
                  >
                    <option value="all">Tất cả tình trạng</option>
                    <option value="Đã xác minh">Đã xác minh 100% văn bản gốc</option>
                    <option value="Chưa xác minh">Đang trong tiến trình kiểm tra</option>
                    <option value="Có cảnh báo">Dự án có cảnh báo vi phạm</option>
                  </select>
                </div>
              </div>

              {/* Action row */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-1.5 text-xs text-[#7f7f7f] font-body-content">
                  <Info className="w-3.5 h-3.5 text-[#9f9f9f]" />
                  <span>Dữ liệu giá và pháp lý cập nhật định kỳ tháng 9/2026</span>
                </div>
                
                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={resetAllFilters}
                    className="h-10 px-3.5 text-xs font-ui font-normal text-[#5f5f5f] hover:text-[#202020] border border-[#d6d6d6] rounded-[8px] hover:bg-[#fafafa] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Đặt lại</span>
                  </button>
                  <button
                    type="button"
                    onClick={onExecuteSearch}
                    className="h-10 flex-1 sm:flex-initial px-5 text-xs font-bold font-ui text-white bg-[#b13460] hover:bg-[#932a4e] rounded-[8px] transition-colors cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap"
                  >
                    <Search className="w-4 h-4" />
                    <span>Tra cứu hồ sơ (<span className="font-numeric">{totalMatches}</span> kết quả)</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Mode 2: AI Natural Language Search */
            <div className="pt-3.5 space-y-3.5">
              <div className="relative">
                <textarea
                  rows={2}
                  value={naturalQuery}
                  onChange={(e) => setNaturalQuery(e.target.value)}
                  placeholder="Nhập yêu cầu tìm kiếm: Ví dụ 'Tìm căn hộ 2 - 3,5 tỷ tại TP. Thủ Đức gần ga Metro số 1 đã có sổ hồng'..."
                  className="w-full text-xs font-body-content bg-[#fafafa] border border-[#9f9f9f] rounded-[4px] p-3 text-[#202020] placeholder-[#9f9f9f] focus:outline-none focus:border-[#0590de] resize-none"
                />
                <button
                  type="button"
                  disabled={isAiProcessing || !naturalQuery.trim()}
                  onClick={() => handleApplyAiQuery(naturalQuery)}
                  className={`absolute right-2.5 bottom-2.5 h-8 px-3.5 text-xs font-bold font-ui rounded-[8px] transition-colors cursor-pointer flex items-center gap-1.5 ${
                    isAiProcessing || !naturalQuery.trim()
                      ? 'bg-[#ececec] text-[#9f9f9f] cursor-not-allowed'
                      : 'bg-[#b13460] text-white hover:bg-[#932a4e]'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isAiProcessing ? 'Đang trích xuất...' : 'Phân tích & Lọc'}</span>
                </button>
              </div>

              {/* Sample Prompts */}
              <div>
                <p className="font-ui text-xs text-[#5f5f5f] mb-1.5">
                  Truy vấn mẫu:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {sampleAiQueries.map((q, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleApplyAiQuery(q)}
                      className="text-xs font-body-content text-[#365983] bg-[#eaf0f8] hover:bg-[#d8e5f5] border border-[#d6d6d6] px-2.5 py-1 rounded-[4px] transition-colors text-left cursor-pointer"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Active AI Parsed Chips Display */}
          {filters.aiChips.length > 0 && (
            <div className="mt-3.5 pt-3 border-t border-[#ececec]">
              <div className="flex items-center justify-between mb-2">
                <span className="font-ui text-xs font-bold text-[#b13460] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Bộ lọc AI đã trích xuất (<span className="font-numeric">{filters.aiChips.length}</span>):</span>
                </span>
                <button
                  type="button"
                  onClick={() => onFilterChange({ ...filters, aiChips: [] })}
                  className="font-ui text-xs text-[#5f5f5f] hover:text-[#202020] underline cursor-pointer"
                >
                  Xóa bộ lọc
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {filters.aiChips.map((chip) => (
                  <span
                    key={chip.id}
                    className="inline-flex items-center gap-1.5 text-xs font-ui font-normal text-[#b13460] bg-[#fce6eb] border border-[#db7499] px-2.5 py-1 rounded-[4px]"
                  >
                    <span>{chip.label}</span>
                    <button
                      type="button"
                      onClick={() => removeChip(chip.id)}
                      className="hover:text-[#da1e28] ml-0.5 cursor-pointer"
                      title="Xóa tiêu chí này"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
