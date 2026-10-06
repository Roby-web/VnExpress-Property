import React, { useState, useMemo } from 'react';
import { REAL_ESTATE_PROJECTS, ProjectProfile } from './data/projects';
import { Header } from './components/Header';
import { HeroSearch, FilterState } from './components/HeroSearch';
import { ProjectCard } from './components/ProjectCard';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ComparisonDrawer } from './components/ComparisonDrawer';
import { MapView } from './components/MapView';
import { MortgageCalculator } from './components/MortgageCalculator';
import { LegalChecklistSection } from './components/LegalChecklistSection';
import { WarningListSection } from './components/WarningListSection';
import { NewsSection } from './components/NewsSection';
import { VnExpressSSOModal } from './components/VnExpressSSOModal';
import { Footer } from './components/Footer';
import { 
  LayoutGrid, 
  Map, 
  AlertCircle, 
  CheckCircle2
} from 'lucide-react';

export default function App() {
  // 1. Filter state
  const [filters, setFilters] = useState<FilterState>({
    listingType: 'buy',
    city: 'all',
    district: 'all',
    propertyType: 'all',
    priceRange: 'all',
    legalStatus: 'all',
    aiChips: [],
    aiPrompt: ''
  });

  const [sortOption, setSortOption] = useState<'relevant' | 'transparency' | 'price_asc' | 'price_desc' | 'metro'>('relevant');
  const [catalogViewMode, setCatalogViewMode] = useState<'grid' | 'map'>('grid');

  // 2. Modals & Interaction state
  const [selectedDetailProject, setSelectedDetailProject] = useState<ProjectProfile | null>(null);
  const [comparedProjects, setComparedProjects] = useState<ProjectProfile[]>([]);
  const [savedProjectIds, setSavedProjectIds] = useState<string[]>(['the-metropole', 'masteri-centre-point']);
  const [isSsoModalOpen, setIsSsoModalOpen] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [calculatorInitialPrice, setCalculatorInitialPrice] = useState<number>(3.5);
  const [selectedMapProjectId, setSelectedMapProjectId] = useState<string>('the-metropole');

  // Toast notice
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleInspectZoningOnMap = (projectId: string) => {
    setSelectedDetailProject(null);
    setSelectedMapProjectId(projectId);
    const elem = document.getElementById('section-map');
    elem?.scrollIntoView({ behavior: 'smooth' });
    showToast('Đã chuyển đến bản đồ tra cứu quy hoạch chi tiết 1/500');
  };

  // 3. Filtered and Sorted Projects
  const filteredProjects = useMemo(() => {
    return REAL_ESTATE_PROJECTS.filter((item) => {
      // Listing type (Buy / Rent)
      if (item.listingType !== filters.listingType) return false;

      // City
      if (filters.city !== 'all' && item.city !== filters.city) return false;

      // District
      if (filters.district !== 'all' && item.district !== filters.district) return false;

      // Property type
      if (filters.propertyType !== 'all' && item.propertyType !== filters.propertyType) return false;

      // Legal status
      if (filters.legalStatus !== 'all' && item.legalStatus !== filters.legalStatus) return false;

      // Price Range filter
      if (filters.priceRange !== 'all') {
        if (filters.priceRange === '< 2 tỷ' && item.totalPriceNumber >= 2) return false;
        if (filters.priceRange === '2 - 3.5 tỷ' && (item.totalPriceNumber < 2 || item.totalPriceNumber > 3.5)) return false;
        if (filters.priceRange === '3.5 - 5 tỷ' && (item.totalPriceNumber < 3.5 || item.totalPriceNumber > 5)) return false;
        if (filters.priceRange === '5 - 10 tỷ' && (item.totalPriceNumber < 5 || item.totalPriceNumber > 10)) return false;
        if (filters.priceRange === '> 10 tỷ' && item.totalPriceNumber <= 10) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortOption === 'transparency') {
        return b.transparencyScore - a.transparencyScore;
      }
      if (sortOption === 'price_asc') {
        return a.pricePerM2 - b.pricePerM2;
      }
      if (sortOption === 'price_desc') {
        return b.pricePerM2 - a.pricePerM2;
      }
      if (sortOption === 'metro') {
        const aHasMetro = a.metroDistance.toLowerCase().includes('ga metro') || a.metroDistance.toLowerCase().includes('tuyến');
        const bHasMetro = b.metroDistance.toLowerCase().includes('ga metro') || b.metroDistance.toLowerCase().includes('tuyến');
        return (bHasMetro ? 1 : 0) - (aHasMetro ? 1 : 0);
      }
      return 0; // default relevant
    });
  }, [filters, sortOption]);

  // Comparison Handlers
  const handleToggleCompare = (project: ProjectProfile) => {
    const isAlready = comparedProjects.some(p => p.id === project.id);
    if (isAlready) {
      setComparedProjects(prev => prev.filter(p => p.id !== project.id));
      showToast(`Đã bỏ ${project.name} khỏi khay so sánh`);
    } else {
      if (comparedProjects.length >= 3) {
        showToast('Bạn chỉ có thể so sánh tối đa 3 dự án cùng lúc');
        return;
      }
      if (comparedProjects.length > 0 && comparedProjects[0].listingType !== project.listingType) {
        showToast('Không thể so sánh dự án Mua với dự án Thuê');
        return;
      }
      setComparedProjects(prev => [...prev, project]);
      showToast(`Đã thêm ${project.name} vào khay so sánh`);
    }
  };

  const handleRemoveCompare = (projectId: string) => {
    setComparedProjects(prev => prev.filter(p => p.id !== projectId));
  };

  const handleClearAllCompare = () => {
    setComparedProjects([]);
  };

  // Saved Projects Handlers
  const handleToggleSave = (projectId: string) => {
    if (savedProjectIds.includes(projectId)) {
      setSavedProjectIds(prev => prev.filter(id => id !== projectId));
      showToast('Đã bỏ lưu dự án');
    } else {
      setSavedProjectIds(prev => [...prev, projectId]);
      showToast('Đã lưu dự án vào danh sách theo dõi');
    }
  };

  // Calculator interaction
  const handleOpenCalculatorWithPrice = (priceBillion: number) => {
    setSelectedDetailProject(null);
    setCalculatorInitialPrice(priceBillion);
    const elem = document.getElementById('section-calculator');
    elem?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleApplyBudgetFilter = (maxBudgetBillion: number) => {
    if (maxBudgetBillion <= 2) {
      setFilters(prev => ({ ...prev, priceRange: '< 2 tỷ' }));
    } else if (maxBudgetBillion <= 3.5) {
      setFilters(prev => ({ ...prev, priceRange: '2 - 3.5 tỷ' }));
    } else if (maxBudgetBillion <= 5) {
      setFilters(prev => ({ ...prev, priceRange: '3.5 - 5 tỷ' }));
    } else {
      setFilters(prev => ({ ...prev, priceRange: 'all' }));
    }
    const elem = document.getElementById('section-projects');
    elem?.scrollIntoView({ behavior: 'smooth' });
    showToast(`Đã áp dụng mức ngân sách tối đa ~${maxBudgetBillion.toFixed(1).replace('.', ',')} tỷ đồng vào bộ lọc`);
  };

  const handleNavigateSection = (sectionId: string) => {
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const savedProjectsList = useMemo(() => {
    return REAL_ESTATE_PROJECTS.filter(p => savedProjectIds.includes(p.id));
  }, [savedProjectIds]);

  return (
    <div className="min-h-screen bg-[#fcfaf6] text-[#202020] flex flex-col selection:bg-[#fce6eb] selection:text-[#b13460]">
      
      {/* Toast Notification (Flat, no shadow) */}
      {toastMessage && (
        <div className="fixed top-18 right-4 z-50 bg-[#202020] text-white text-xs font-ui px-4 py-2.5 rounded-[4px] border border-[#5f5f5f] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#24a148] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Header */}
      <Header
        onOpenSSO={() => setIsSsoModalOpen(true)}
        savedCount={savedProjectIds.length}
        compareCount={comparedProjects.length}
        onOpenCompare={() => {}}
        onNavigateSection={handleNavigateSection}
        userLoggedIn={userLoggedIn}
        userName={userEmail ? userEmail.split('@')[0] : 'Độc giả VnExpress'}
      />

      <main className="flex-1">
        {/* 1. Hero Search Section with Dual Standard & AI Search */}
        <HeroSearch
          filters={filters}
          onFilterChange={setFilters}
          onExecuteSearch={() => handleNavigateSection('section-projects')}
          totalMatches={filteredProjects.length}
        />

        {/* 2. Core Catalog Section (F1 & F4 Projects List) - Container max-w-[1200px] per RULE.md */}
        <section id="section-projects" className="py-8 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Catalog Controls Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#d6d6d6]">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-article-title text-xl sm:text-2xl font-bold text-[#202020]">
                  Hồ sơ dự án thẩm định
                </h2>
                <span className="text-xs font-bold font-numeric text-[#b13460] bg-[#fce6eb] px-2 py-0.5 rounded-[2px]">
                  {filteredProjects.length} dự án
                </span>
              </div>
              <p className="font-body-content text-xs text-[#5f5f5f] mt-1">
                Hiển thị 3 loại giá (CĐT, thứ cấp, thực tế), điểm minh bạch pháp lý và tình trạng cấp sổ
              </p>
            </div>

            {/* View Mode & Sorter Controls */}
            <div className="flex flex-wrap items-center gap-2.5">
              
              {/* Sort dropdown */}
              <div className="flex items-center gap-1.5 text-xs font-ui">
                <span className="text-[#5f5f5f] hidden md:inline">Sắp xếp:</span>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as any)}
                  className="bg-white border border-[#9f9f9f] rounded-[4px] px-2.5 py-1.5 text-xs font-body-content text-[#202020] focus:outline-none focus:border-[#0590de]"
                >
                  <option value="relevant">Phù hợp nhất</option>
                  <option value="transparency">Điểm minh bạch cao nhất (B1)</option>
                  <option value="price_asc">Đơn giá thấp đến cao</option>
                  <option value="price_desc">Đơn giá cao đến thấp</option>
                  <option value="metro">Ưu tiên gần ga Metro</option>
                </select>
              </div>

              {/* Grid / Map Switcher (F5) */}
              <div className="flex items-center bg-[#f3f3f3] p-1 rounded-[8px] border border-[#d6d6d6]">
                <button
                  type="button"
                  onClick={() => setCatalogViewMode('grid')}
                  className={`px-2.5 py-1 rounded-[8px] transition-colors cursor-pointer flex items-center gap-1 text-xs font-ui ${
                    catalogViewMode === 'grid'
                      ? 'bg-white text-[#202020] font-bold border border-[#d6d6d6]'
                      : 'text-[#5f5f5f] hover:text-[#202020]'
                  }`}
                  title="Xem dạng danh sách thẻ"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Danh sách</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCatalogViewMode('map')}
                  className={`px-2.5 py-1 rounded-[8px] transition-colors cursor-pointer flex items-center gap-1 text-xs font-ui ${
                    catalogViewMode === 'map'
                      ? 'bg-white text-[#202020] font-bold border border-[#d6d6d6]'
                      : 'text-[#5f5f5f] hover:text-[#202020]'
                  }`}
                  title="Xem bản đồ và metro"
                >
                  <Map className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Bản đồ</span>
                </button>
              </div>

            </div>
          </div>

          {/* Catalog Content (Grid or Map) */}
          <div className="mt-5">
            {catalogViewMode === 'map' ? (
              <MapView
                projects={filteredProjects}
                onOpenDetail={setSelectedDetailProject}
                selectedProjectId={selectedMapProjectId}
              />
            ) : filteredProjects.length === 0 ? (
              /* Empty state */
              <div className="p-10 text-center bg-white rounded-[4px] border border-[#d6d6d6]">
                <AlertCircle className="w-8 h-8 text-[#ee853b] mx-auto mb-2.5" />
                <h3 className="font-article-title text-base font-bold text-[#202020]">
                  Không tìm thấy dự án phù hợp với tiêu chí lọc
                </h3>
                <p className="font-body-content text-xs text-[#5f5f5f] mt-1 max-w-md mx-auto leading-relaxed">
                  Gợi ý nới lỏng bộ lọc: Mở rộng khoảng giá hoặc chọn "Toàn quốc" để xem thêm các dự án đang triển khai.
                </p>
                <button
                  type="button"
                  onClick={() => setFilters({
                    listingType: 'buy',
                    city: 'all',
                    district: 'all',
                    propertyType: 'all',
                    priceRange: 'all',
                    legalStatus: 'all',
                    aiChips: []
                  })}
                  className="mt-4 h-8 px-4 text-xs font-bold font-ui text-white bg-[#b13460] rounded-[8px] hover:bg-[#932a4e] transition-colors cursor-pointer"
                >
                  Xem tất cả hồ sơ dự án
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onOpenDetail={setSelectedDetailProject}
                    onToggleCompare={handleToggleCompare}
                    isCompared={comparedProjects.some(p => p.id === project.id)}
                    onToggleSave={handleToggleSave}
                    isSaved={savedProjectIds.includes(project.id)}
                    onInspectZoning={handleInspectZoningOnMap}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 3. Dedicated Zoning & Master Plan Interactive Map Section (F5) */}
        {catalogViewMode === 'grid' && (
          <section className="py-4 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <MapView
              projects={REAL_ESTATE_PROJECTS}
              onOpenDetail={setSelectedDetailProject}
              selectedProjectId={selectedMapProjectId}
            />
          </section>
        )}

        {/* 4. Legal Buyer Checklist Section (B3) */}
        <LegalChecklistSection />

        {/* 5. Mortgage & Affordability Calculator (F7 & B4) */}
        <MortgageCalculator
          initialPriceBillion={calculatorInitialPrice}
          onApplyBudgetFilter={handleApplyBudgetFilter}
        />

        {/* 6. Official Risk Warning List Section (B2) */}
        <WarningListSection />

        {/* 7. Tagged News & Expert Insights (F10) */}
        <NewsSection />
      </main>

      {/* Floating Comparison Drawer (F8) */}
      <ComparisonDrawer
        comparedProjects={comparedProjects}
        onRemoveProject={handleRemoveCompare}
        onClearAll={handleClearAllCompare}
        onOpenDetail={setSelectedDetailProject}
      />

      {/* Detailed Project Profile Modal (F1 - Epicenter) */}
      <ProjectDetailModal
        project={selectedDetailProject}
        onClose={() => setSelectedDetailProject(null)}
        onToggleCompare={handleToggleCompare}
        isCompared={selectedDetailProject ? comparedProjects.some(p => p.id === selectedDetailProject.id) : false}
        onToggleSave={handleToggleSave}
        isSaved={selectedDetailProject ? savedProjectIds.includes(selectedDetailProject.id) : false}
        onOpenCalculatorWithPrice={handleOpenCalculatorWithPrice}
        onInspectZoningOnMap={handleInspectZoningOnMap}
      />

      {/* VnExpress SSO Login & Notifications Modal (F9) */}
      <VnExpressSSOModal
        isOpen={isSsoModalOpen}
        onClose={() => setIsSsoModalOpen(false)}
        isLoggedIn={userLoggedIn}
        onLoginSuccess={(email) => {
          setUserLoggedIn(true);
          setUserEmail(email);
          setIsSsoModalOpen(false);
          showToast(`Đăng nhập thành công tài khoản ${email}`);
        }}
        onLogout={() => {
          setUserLoggedIn(false);
          setUserEmail('');
          showToast('Đã đăng xuất tài khoản VnExpress');
        }}
        savedProjects={savedProjectsList}
        onRemoveSaved={handleToggleSave}
        onOpenProjectDetail={setSelectedDetailProject}
      />

      {/* Footer */}
      <Footer onNavigateSection={handleNavigateSection} />

    </div>
  );
}
