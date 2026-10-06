export interface LegalDoc {
  id: string;
  name: string;
  docNumber: string;
  issueDate: string;
  issuer: string;
  status: 'verified' | 'pending' | 'missing' | 'warning';
  notes?: string;
}

export interface PriceTier {
  developerPrice: number; // triệu/m²
  developerPriceDisplay: string;
  developerNotes?: string;
  secondaryAskingPrice: number; // triệu/m²
  secondaryAskingPriceDisplay: string;
  recordedTransactionPrice: number; // triệu/m²
  recordedTransactionPriceDisplay: string;
  sampleCount: number; // số lượng giao dịch mẫu
  period: string; // kỳ dữ liệu ví dụ Quý 3/2026
  historyQuarters: { quarter: string; price: number; priceDisplay: string }[];
}

export interface PlanningInfo {
  zoningCode: string; // ODT | TMD | CX | DGD
  zoningName: string;
  planDecisionDoc: string;
  approvedScale: 'Quy hoạch chi tiết 1/500' | 'Quy hoạch phân khu 1/2000' | 'Chưa phê duyệt quy hoạch';
  maxFloors: string;
  buildingDensity: string;
  floorAreaRatio: string;
  setbackLimit: string;
  roadRedLine: string;
  acquisitionRisk: 'An toàn - Không có nguy cơ thu hồi' | 'Cảnh báo - Chưa giải phóng mặt bằng' | 'Vướng quy hoạch mở đường';
  planningZoneName: string;
  zoningColor: string;
}

export interface ProjectProfile {
  id: string;
  name: string;
  developer: string;
  listingType: 'buy' | 'rent';
  propertyType: 'Căn hộ thương mại' | 'Nhà ở xã hội' | 'Đất nền' | 'Nhà phố' | 'Biệt thự' | 'Nhà xưởng';
  city: 'TP. Hồ Chí Minh' | 'Hà Nội' | 'Bình Dương';
  district: string;
  ward: string;
  address: string;
  totalPriceText: string;
  totalPriceNumber: number; // Tỷ VNĐ
  pricePerM2: number; // triệu/m²
  pricePerM2Display: string;
  areaRange: string;
  bedroomsRange: string;
  
  // F1 & B1: Legal & Transparency
  transparencyScore: number; // 0 - 100
  legalStatus: 'Đã xác minh' | 'Chưa xác minh' | 'Có cảnh báo';
  riskLevel: 'Thấp' | 'Trung bình' | 'Cao';
  riskReason: string;
  verifiedDate: string; // Tuân thủ RULE.md: Ngày/Tháng/Năm không số 0 thừa
  verifiedSource: string;
  ownershipCertificate: 'Đã có sổ hồng' | 'Đang chờ cấp sổ' | 'Hợp đồng mua bán' | 'Chưa đủ điều kiện';
  
  // F6: 3 Price tiers
  priceTier: PriceTier;
  priceGapWarning: boolean; // True if asking price > 5% market price
  priceGapPercent: number; // % chênh lệch
  priceGapPercentDisplay: string;

  // Infrastructure & Planning
  metroDistance: string;
  highways: string;
  planningStatus: string;
  deliveryYear: string;
  unitsCount: number;
  unitsCountDisplay: string;
  scale: string;
  planning: PlanningInfo;

  // Real photos & tags
  actualPhotosDate: string;
  summary: string;
  highlights: string[];
  legalDocs: LegalDoc[];
  cautionNotes?: string;
}

export const REAL_ESTATE_PROJECTS: ProjectProfile[] = [
  {
    id: 'the-metropole',
    name: 'The Metropole Thủ Thiêm',
    developer: 'SonKim Land & Quốc Lộc Phát',
    listingType: 'buy',
    propertyType: 'Căn hộ thương mại',
    city: 'TP. Hồ Chí Minh',
    district: 'TP. Thủ Đức',
    ward: 'Phường An Khánh',
    address: 'Khu chức năng số 1, Đô thị mới Thủ Thiêm, TP. Thủ Đức',
    totalPriceText: '8,2 - 28 tỷ',
    totalPriceNumber: 8.2,
    pricePerM2: 118,
    pricePerM2Display: '118 triệu/m²',
    areaRange: '55 - 170 m²',
    bedroomsRange: '1 - 4 PN',
    transparencyScore: 94,
    legalStatus: 'Đã xác minh',
    riskLevel: 'Thấp',
    riskReason: 'Dự án đủ quyết định giao đất, giấy phép xây dựng; phân khu The Galleria và The Crest đã cấp sổ hồng cho cư dân.',
    verifiedDate: 'Thứ hai, 15/9/2026, 08:30 (GMT+7)',
    verifiedSource: 'Sở Xây dựng TP. Hồ Chí Minh & Văn phòng Đăng ký Đất đai',
    ownershipCertificate: 'Đã có sổ hồng',
    priceTier: {
      developerPrice: 125,
      developerPriceDisplay: '125 triệu/m²',
      developerNotes: 'Đợt mở bán cuối chiết khấu 7% giá trị hợp đồng khi thanh toán sớm.',
      secondaryAskingPrice: 118,
      secondaryAskingPriceDisplay: '118 triệu/m²',
      recordedTransactionPrice: 112,
      recordedTransactionPriceDisplay: '112 triệu/m²',
      sampleCount: 28,
      period: 'Quý 3/2026',
      historyQuarters: [
        { quarter: 'Quý 1/2024', price: 98, priceDisplay: '98' },
        { quarter: 'Quý 3/2024', price: 104, priceDisplay: '104' },
        { quarter: 'Quý 1/2025', price: 109, priceDisplay: '109' },
        { quarter: 'Quý 3/2025', price: 111, priceDisplay: '111' },
        { quarter: 'Quý 1/2026', price: 114, priceDisplay: '114' },
        { quarter: 'Quý 3/2026', price: 118, priceDisplay: '118' },
      ]
    },
    priceGapWarning: true,
    priceGapPercent: 5.3,
    priceGapPercentDisplay: '5,3%',
    metroDistance: 'Cách ga Metro Ba Son 1,2 km',
    highways: 'Kết nối cầu Ba Son sang Quận 1 trong 3 phút',
    planningStatus: 'Thuộc phân khu chức năng số 1 trung tâm tài chính Thủ Thiêm',
    deliveryYear: 'Bàn giao giai đoạn 2022 - 2024',
    unitsCount: 1534,
    unitsCountDisplay: '1.534 căn',
    scale: '7,6 ha, 4 phân khu tháp căn hộ',
    planning: {
      zoningCode: 'ODT / TMD',
      zoningName: 'Đất ở tại đô thị kết hợp thương mại dịch vụ cao tầng',
      planDecisionDoc: 'Quyết định số 3490/QĐ-SQHKT phê duyệt 1/500',
      approvedScale: 'Quy hoạch chi tiết 1/500',
      maxFloors: '30 tầng',
      buildingDensity: '35%',
      floorAreaRatio: '6,8',
      setbackLimit: 'Khoảng lùi 6 m so với chỉ giới đường Trần Bạch Đằng',
      roadRedLine: 'Lộ giới đường nội khu 24 - 32 m',
      acquisitionRisk: 'An toàn - Không có nguy cơ thu hồi',
      planningZoneName: 'Khu chức năng số 1 - Đô thị mới Thủ Thiêm',
      zoningColor: '#f87171'
    },
    actualPhotosDate: 'Thứ sáu, 18/9/2026',
    summary: 'Dự án căn hộ nằm ven sông Sài Gòn tại Thủ Thiêm, pháp lý hoàn tất đối chiếu văn bản gốc.',
    highlights: ['Mặt tiền sông Sài Gòn', 'Đã cấp sổ hồng phân khu hoàn tất', 'Vận hành theo tiêu chuẩn Highgate'],
    legalDocs: [
      { id: '1', name: 'Quyết định chủ trương đầu tư', docNumber: '4028/QĐ-UBND', issueDate: '8/2016', issuer: 'UBND TP. Hồ Chí Minh', status: 'verified' },
      { id: '2', name: 'Quy hoạch chi tiết 1/500', docNumber: '3490/QĐ-SQHKT', issueDate: '11/2017', issuer: 'Sở Quy hoạch - Kiến trúc', status: 'verified' },
      { id: '3', name: 'Giấy phép xây dựng', docNumber: '112/GPXD', issueDate: '6/2018', issuer: 'Sở Xây dựng TP. Hồ Chí Minh', status: 'verified' },
      { id: '4', name: 'Thông báo đủ điều kiện bán nhà ở tương lai', docNumber: '12411/SXD-PTN', issueDate: '9/2019', issuer: 'Sở Xây dựng TP. Hồ Chí Minh', status: 'verified' },
      { id: '5', name: 'Nghiệm thu phòng cháy chữa cháy và công trình', docNumber: '58/NT-PCCC', issueDate: '10/2022', issuer: 'Cục Cảnh sát PCCC', status: 'verified' },
    ]
  },
  {
    id: 'masteri-centre-point',
    name: 'Masteri Centre Point',
    developer: 'Masterise Homes',
    listingType: 'buy',
    propertyType: 'Căn hộ thương mại',
    city: 'TP. Hồ Chí Minh',
    district: 'TP. Thủ Đức',
    ward: 'Phường Long Bình',
    address: 'Đại đô thị Grand Park, Phường Long Bình, TP. Thủ Đức',
    totalPriceText: '3,2 - 7,5 tỷ',
    totalPriceNumber: 3.2,
    pricePerM2: 58,
    pricePerM2Display: '58 triệu/m²',
    areaRange: '52 - 97 m²',
    bedroomsRange: '1 - 3 PN',
    transparencyScore: 91,
    legalStatus: 'Đã xác minh',
    riskLevel: 'Thấp',
    riskReason: 'Hồ sơ pháp lý hoàn thiện, Techcombank phát hành chứng thư bảo lãnh, đã bàn giao và làm thủ tục cấp sổ hồng.',
    verifiedDate: 'Chủ nhật, 20/9/2026, 09:15 (GMT+7)',
    verifiedSource: 'Sở Xây dựng TP. Hồ Chí Minh',
    ownershipCertificate: 'Đang chờ cấp sổ',
    priceTier: {
      developerPrice: 62,
      developerPriceDisplay: '62 triệu/m²',
      developerNotes: 'Hỗ trợ lãi suất 0% trong 18 tháng đầu tiên.',
      secondaryAskingPrice: 58,
      secondaryAskingPriceDisplay: '58 triệu/m²',
      recordedTransactionPrice: 56.5,
      recordedTransactionPriceDisplay: '56,5 triệu/m²',
      sampleCount: 42,
      period: 'Quý 3/2026',
      historyQuarters: [
        { quarter: 'Quý 1/2024', price: 51, priceDisplay: '51' },
        { quarter: 'Quý 3/2024', price: 53, priceDisplay: '53' },
        { quarter: 'Quý 1/2025', price: 54, priceDisplay: '54' },
        { quarter: 'Quý 3/2025', price: 55, priceDisplay: '55' },
        { quarter: 'Quý 1/2026', price: 56.5, priceDisplay: '56,5' },
        { quarter: 'Quý 3/2026', price: 58, priceDisplay: '58' },
      ]
    },
    priceGapWarning: false,
    priceGapPercent: 2.6,
    priceGapPercentDisplay: '2,6%',
    metroDistance: 'Cách ga Metro Suối Tiên 3,5 km (kết nối xe buýt điện VinBus)',
    highways: 'Nằm cạnh nút giao Vành đai 3 TP. Hồ Chí Minh',
    planningStatus: 'Khu compound khép kín trong quy hoạch khu đô thị thông minh',
    deliveryYear: 'Bàn giao Quý 1/2024',
    unitsCount: 5094,
    unitsCountDisplay: '5.094 căn',
    scale: '7,07 ha, 10 tòa tháp cao 22 - 39 tầng',
    planning: {
      zoningCode: 'ODT',
      zoningName: 'Đất ở đô thị mật độ cao - Phân khu phức hợp thông minh',
      planDecisionDoc: 'Quyết định số 6398/QĐ-UBND phê duyệt 1/500',
      approvedScale: 'Quy hoạch chi tiết 1/500',
      maxFloors: '39 tầng',
      buildingDensity: '28%',
      floorAreaRatio: '5,5',
      setbackLimit: 'Khoảng lùi 10 m so với trục Vành đai 3',
      roadRedLine: 'Lộ giới Vành đai 3 rộng 60 m',
      acquisitionRisk: 'An toàn - Không có nguy cơ thu hồi',
      planningZoneName: 'Đại đô thị thông minh Grand Park - Long Bình',
      zoningColor: '#fb923c'
    },
    actualPhotosDate: 'Thứ bảy, 12/9/2026',
    summary: 'Khu căn hộ biệt lập tại Grand Park, trang bị kính Low-E và bàn giao thiết bị hoàn thiện.',
    highlights: ['Khuôn viên compound đa lớp', 'Gần trung tâm thương mại Vincom Mega Mall', 'Techcombank phát thư bảo lãnh nghĩa vụ'],
    legalDocs: [
      { id: '1', name: 'Quyết định phê duyệt 1/500', docNumber: '6398/QĐ-UBND', issueDate: '12/2018', issuer: 'UBND TP. Hồ Chí Minh', status: 'verified' },
      { id: '2', name: 'Giấy phép xây dựng', docNumber: '88/GPXD', issueDate: '7/2020', issuer: 'Sở Xây dựng TP. Hồ Chí Minh', status: 'verified' },
      { id: '3', name: 'Chứng thư bảo lãnh tài chính', docNumber: 'TCB-BL-2020', issueDate: '9/2020', issuer: 'Ngân hàng Techcombank', status: 'verified' },
      { id: '4', name: 'Nghiệm thu hoàn thành công trình', docNumber: '115/GNT-BXD', issueDate: '12/2023', issuer: 'Bộ Xây dựng', status: 'verified' }
    ]
  },
  {
    id: 'lumiere-riverside',
    name: 'Lumière Riverside',
    developer: 'Masterise Homes',
    listingType: 'buy',
    propertyType: 'Căn hộ thương mại',
    city: 'TP. Hồ Chí Minh',
    district: 'TP. Thủ Đức',
    ward: 'Phường Thảo Điền',
    address: 'Số 259 Xa Lộ Hà Nội, Phường Thảo Điền, TP. Thủ Đức',
    totalPriceText: '6,8 - 18 tỷ',
    totalPriceNumber: 6.8,
    pricePerM2: 110,
    pricePerM2Display: '110 triệu/m²',
    areaRange: '49 - 114 m²',
    bedroomsRange: '1 - 3 PN',
    transparencyScore: 92,
    legalStatus: 'Đã xác minh',
    riskLevel: 'Thấp',
    riskReason: 'Dự án nằm ven trục Metro số 1 Bến Thành - Suối Tiên, công trình đã nghiệm thu và bàn giao nhà cho cư dân.',
    verifiedDate: 'Thứ năm, 10/9/2026, 14:00 (GMT+7)',
    verifiedSource: 'Sở Xây dựng TP. Hồ Chí Minh',
    ownershipCertificate: 'Đang chờ cấp sổ',
    priceTier: {
      developerPrice: 115,
      developerPriceDisplay: '115 triệu/m²',
      developerNotes: 'Đã bán hết quỹ căn sơ cấp, giao dịch hiện tại là chuyển nhượng thứ cấp.',
      secondaryAskingPrice: 110,
      secondaryAskingPriceDisplay: '110 triệu/m²',
      recordedTransactionPrice: 106,
      recordedTransactionPriceDisplay: '106 triệu/m²',
      sampleCount: 19,
      period: 'Quý 3/2026',
      historyQuarters: [
        { quarter: 'Quý 1/2024', price: 92, priceDisplay: '92' },
        { quarter: 'Quý 3/2024', price: 98, priceDisplay: '98' },
        { quarter: 'Quý 1/2025', price: 102, priceDisplay: '102' },
        { quarter: 'Quý 3/2025', price: 104, priceDisplay: '104' },
        { quarter: 'Quý 1/2026', price: 106, priceDisplay: '106' },
        { quarter: 'Quý 3/2026', price: 110, priceDisplay: '110' },
      ]
    },
    priceGapWarning: false,
    priceGapPercent: 3.7,
    priceGapPercentDisplay: '3,7%',
    metroDistance: 'Cách ga Metro An Phú 350 m (4 phút đi bộ)',
    highways: 'Mặt tiền trục Xa Lộ Hà Nội gần cầu Sài Gòn',
    planningStatus: 'Khu dân cư cao cấp Thảo Điền ven sông Sài Gòn',
    deliveryYear: 'Bàn giao Quý 4/2023',
    unitsCount: 1030,
    unitsCountDisplay: '1.030 căn',
    scale: '1,9 ha, 2 tòa tháp căn hộ',
    planning: {
      zoningCode: 'ODT / TMD',
      zoningName: 'Đất hỗn hợp nhà ở cao tầng và dịch vụ thương mại Thảo Điền',
      planDecisionDoc: 'Quyết định số 3150/QĐ-UBND phê duyệt 1/500',
      approvedScale: 'Quy hoạch chi tiết 1/500',
      maxFloors: '44 tầng',
      buildingDensity: '41%',
      floorAreaRatio: '7,2',
      setbackLimit: 'Khoảng lùi 12 m so với hành lang bảo vệ Metro số 1',
      roadRedLine: 'Lộ giới Xa Lộ Hà Nội 153 m',
      acquisitionRisk: 'An toàn - Không có nguy cơ thu hồi',
      planningZoneName: 'Khu dân cư Thảo Điền ven trục Metro số 1',
      zoningColor: '#f87171'
    },
    actualPhotosDate: 'Thứ ba, 15/9/2026',
    summary: 'Khu căn hộ phong cách kiến trúc xanh tại Thảo Điền, tiếp cận trực tiếp ga Metro An Phú.',
    highlights: ['Cách ga Metro 350 m', 'Mặt dựng vườn treo xanh', 'Cộng đồng dân cư quốc tế'],
    legalDocs: [
      { id: '1', name: 'Quyết định giao đất dự án', docNumber: '3150/QĐ-UBND', issueDate: '6/2019', issuer: 'UBND TP. Hồ Chí Minh', status: 'verified' },
      { id: '2', name: 'Giấy phép xây dựng', docNumber: '74/GPXD-SXD', issueDate: '11/2020', issuer: 'Sở Xây dựng TP. Hồ Chí Minh', status: 'verified' },
      { id: '3', name: 'Nghiệm thu phòng cháy chữa cháy', docNumber: '112/PCCC-PC07', issueDate: '10/2023', issuer: 'Công an TP. Hồ Chí Minh', status: 'verified' }
    ]
  },
  {
    id: 'akari-city',
    name: 'Akari City',
    developer: 'Nam Long Group & Hankyu Hanshin (Nhật Bản)',
    listingType: 'buy',
    propertyType: 'Căn hộ thương mại',
    city: 'TP. Hồ Chí Minh',
    district: 'Quận Bình Tân',
    ward: 'Phường An Lạc',
    address: 'Đại lộ Võ Văn Kiệt, Phường An Lạc, Quận Bình Tân, TP. Hồ Chí Minh',
    totalPriceText: '2,9 - 4,6 tỷ',
    totalPriceNumber: 2.9,
    pricePerM2: 45,
    pricePerM2Display: '45 triệu/m²',
    areaRange: '60 - 99 m²',
    bedroomsRange: '2 - 3 PN',
    transparencyScore: 90,
    legalStatus: 'Đã xác minh',
    riskLevel: 'Thấp',
    riskReason: 'Giai đoạn 1 đã cấp sổ hồng 100%, giai đoạn 2 hoàn tất nghiệm thu hạ tầng kỹ thuật và đưa vào sử dụng.',
    verifiedDate: 'Thứ sáu, 18/9/2026, 10:20 (GMT+7)',
    verifiedSource: 'Văn phòng Đăng ký Đất đai Bình Tân',
    ownershipCertificate: 'Hợp đồng mua bán',
    priceTier: {
      developerPrice: 47,
      developerPriceDisplay: '47 triệu/m²',
      developerNotes: 'Thanh toán 30% giá trị hợp đồng đến thời điểm nhận bàn giao nhà.',
      secondaryAskingPrice: 45,
      secondaryAskingPriceDisplay: '45 triệu/m²',
      recordedTransactionPrice: 44,
      recordedTransactionPriceDisplay: '44 triệu/m²',
      sampleCount: 36,
      period: 'Quý 3/2026',
      historyQuarters: [
        { quarter: 'Quý 1/2024', price: 39, priceDisplay: '39' },
        { quarter: 'Quý 3/2024', price: 41, priceDisplay: '41' },
        { quarter: 'Quý 1/2025', price: 42.5, priceDisplay: '42,5' },
        { quarter: 'Quý 3/2025', price: 43, priceDisplay: '43' },
        { quarter: 'Quý 1/2026', price: 44, priceDisplay: '44' },
        { quarter: 'Quý 3/2026', price: 45, priceDisplay: '45' },
      ]
    },
    priceGapWarning: false,
    priceGapPercent: 2.2,
    priceGapPercentDisplay: '2,2%',
    metroDistance: 'Cách tuyến Metro số 3A quy hoạch 1,5 km',
    highways: 'Mặt tiền Đại lộ Võ Văn Kiệt kết nối trung tâm',
    planningStatus: 'Khu đô thị cửa ngõ phía Tây TP. Hồ Chí Minh',
    deliveryYear: 'Bàn giao giai đoạn 2024 - 2025',
    unitsCount: 1690,
    unitsCountDisplay: '1.690 căn',
    scale: '8,5 ha quy mô toàn khu đô thị',
    planning: {
      zoningCode: 'ODT',
      zoningName: 'Đất ở đô thị nhóm nhà ở xây dựng mới',
      planDecisionDoc: 'Quyết định số 1105/QĐ-UBND phê duyệt 1/500',
      approvedScale: 'Quy hoạch chi tiết 1/500',
      maxFloors: '29 tầng',
      buildingDensity: '33%',
      floorAreaRatio: '5,8',
      setbackLimit: 'Khoảng lùi 8 m so với chỉ giới Đại lộ Võ Văn Kiệt',
      roadRedLine: 'Lộ giới Đại lộ Võ Văn Kiệt 60 m',
      acquisitionRisk: 'An toàn - Không có nguy cơ thu hồi',
      planningZoneName: 'Khu dân cư phía Tây đường Võ Văn Kiệt - An Lạc',
      zoningColor: '#fb923c'
    },
    actualPhotosDate: 'Thứ ba, 22/9/2026',
    summary: 'Khu căn hộ phát triển theo mô hình đô thị Nhật Bản trên trục Đại lộ Võ Văn Kiệt.',
    highlights: ['Trục Đại lộ Võ Văn Kiệt', 'Nam Long liên doanh đối tác Nhật Bản', 'Hồ sơ pháp lý nghiệm thu minh bạch'],
    legalDocs: [
      { id: '1', name: 'Quy hoạch chi tiết 1/500', docNumber: '1105/QĐ-UBND', issueDate: '4/2019', issuer: 'UBND Quận Bình Tân', status: 'verified' },
      { id: '2', name: 'Giấy phép xây dựng', docNumber: '39/GPXD-SXD', issueDate: '3/2022', issuer: 'Sở Xây dựng TP. Hồ Chí Minh', status: 'verified' },
      { id: '3', name: 'Chứng thư bảo lãnh ngân hàng OCB', docNumber: 'OCB-BL-2022', issueDate: '5/2022', issuer: 'Ngân hàng OCB', status: 'verified' }
    ]
  },
  {
    id: 'ehome-southgate',
    name: 'EHome Southgate',
    developer: 'Tập đoàn Nam Long & Nishi Nippon Railroad',
    listingType: 'buy',
    propertyType: 'Nhà ở xã hội',
    city: 'TP. Hồ Chí Minh',
    district: 'Bến Lức (Vùng ven TP. Hồ Chí Minh)',
    ward: 'Thị trấn Bến Lức',
    address: 'Khu đô thị Waterpoint, Bến Lức (tiếp giáp Bình Chánh, TP. Hồ Chí Minh)',
    totalPriceText: '1,1 - 1,8 tỷ',
    totalPriceNumber: 1.1,
    pricePerM2: 21,
    pricePerM2Display: '21 triệu/m²',
    areaRange: '51 - 74 m²',
    bedroomsRange: '1 - 2 PN',
    transparencyScore: 93,
    legalStatus: 'Đã xác minh',
    riskLevel: 'Thấp',
    riskReason: 'Dự án nằm trong đại đô thị Waterpoint, đất sạch 100%, ngân hàng hỗ trợ gói tín dụng ưu đãi mua nhà ở thực.',
    verifiedDate: 'Thứ bảy, 12/9/2026, 11:00 (GMT+7)',
    verifiedSource: 'Sở Xây dựng',
    ownershipCertificate: 'Đang chờ cấp sổ',
    priceTier: {
      developerPrice: 22,
      developerPriceDisplay: '22 triệu/m²',
      developerNotes: 'Gói vay mua nhà lần đầu trả góp từ 5 triệu đồng mỗi tháng.',
      secondaryAskingPrice: 21,
      secondaryAskingPriceDisplay: '21 triệu/m²',
      recordedTransactionPrice: 20.5,
      recordedTransactionPriceDisplay: '20,5 triệu/m²',
      sampleCount: 50,
      period: 'Quý 3/2026',
      historyQuarters: [
        { quarter: 'Quý 1/2024', price: 18.5, priceDisplay: '18,5' },
        { quarter: 'Quý 3/2024', price: 19, priceDisplay: '19' },
        { quarter: 'Quý 1/2025', price: 19.8, priceDisplay: '19,8' },
        { quarter: 'Quý 3/2025', price: 20, priceDisplay: '20' },
        { quarter: 'Quý 1/2026', price: 20.5, priceDisplay: '20,5' },
        { quarter: 'Quý 3/2026', price: 21, priceDisplay: '21' },
      ]
    },
    priceGapWarning: false,
    priceGapPercent: 2.4,
    priceGapPercentDisplay: '2,4%',
    metroDistance: 'Tuyến xe buýt Waterpoint vào Bến Thành 45 phút',
    highways: 'Nằm ngay nút giao Cao tốc TP. Hồ Chí Minh - Trung Lương',
    planningStatus: 'Thuộc phân khu đô thị sinh thái Waterpoint 355 ha',
    deliveryYear: 'Bàn giao năm 2023 - 2024',
    unitsCount: 1400,
    unitsCountDisplay: '1.400 căn',
    scale: '4,5 ha',
    planning: {
      zoningCode: 'ODT / NOXH',
      zoningName: 'Đất nhà ở xã hội và nhà ở vừa túi tiền trong khu đô thị sinh thái',
      planDecisionDoc: 'Quyết định số 1987/QĐ-UBND phê duyệt 1/500',
      approvedScale: 'Quy hoạch chi tiết 1/500',
      maxFloors: '12 tầng',
      buildingDensity: '38%',
      floorAreaRatio: '3,2',
      setbackLimit: 'Khoảng lùi 5 m so với lộ giới đường nội khu',
      roadRedLine: 'Lộ giới đường trục chính 36 m',
      acquisitionRisk: 'An toàn - Không có nguy cơ thu hồi',
      planningZoneName: 'Khu đô thị sinh thái Waterpoint Bến Lức',
      zoningColor: '#34d399'
    },
    actualPhotosDate: 'Thứ bảy, 5/9/2026',
    summary: 'Căn hộ vừa túi tiền cho gia đình trẻ, sử dụng chung công viên và tiện ích khu đô thị ven sông.',
    highlights: ['Giá bán từ 1,1 tỷ đồng', 'Lãi suất vay cố định 6% mỗi năm', 'Môi trường sống ven sông'],
    legalDocs: [
      { id: '1', name: 'Quyết định quy hoạch chi tiết 1/500', docNumber: '1987/QĐ-UBND', issueDate: '8/2018', issuer: 'UBND Tỉnh', status: 'verified' },
      { id: '2', name: 'Giấy phép xây dựng', docNumber: '42/GPXD', issueDate: '9/2021', issuer: 'Sở Xây dựng', status: 'verified' }
    ]
  },
  {
    id: 'the-matrix-one',
    name: 'The Matrix One',
    developer: 'MIK Group',
    listingType: 'buy',
    propertyType: 'Căn hộ thương mại',
    city: 'Hà Nội',
    district: 'Quận Nam Từ Liêm',
    ward: 'Phường Mễ Trì',
    address: 'Đường Lê Quang Đạo, Phường Mễ Trì, Quận Nam Từ Liêm, Hà Nội',
    totalPriceText: '5,5 - 14 tỷ',
    totalPriceNumber: 5.5,
    pricePerM2: 78,
    pricePerM2Display: '78 triệu/m²',
    areaRange: '86 - 114 m²',
    bedroomsRange: '2 - 3 PN',
    transparencyScore: 89,
    legalStatus: 'Đã xác minh',
    riskLevel: 'Thấp',
    riskReason: 'Dự án hoàn thiện thủ tục đầu tư xây dựng, đã bàn giao từ năm 2022 và đang cấp sổ hồng cho các phân khu.',
    verifiedDate: 'Thứ hai, 14/9/2026, 15:45 (GMT+7)',
    verifiedSource: 'Sở Xây dựng Hà Nội',
    ownershipCertificate: 'Đang chờ cấp sổ',
    priceTier: {
      developerPrice: 82,
      developerPriceDisplay: '82 triệu/m²',
      developerNotes: 'Giai đoạn The Matrix Premium đang mở bán đợt mới.',
      secondaryAskingPrice: 78,
      secondaryAskingPriceDisplay: '78 triệu/m²',
      recordedTransactionPrice: 73,
      recordedTransactionPriceDisplay: '73 triệu/m²',
      sampleCount: 22,
      period: 'Quý 3/2026',
      historyQuarters: [
        { quarter: 'Quý 1/2024', price: 58, priceDisplay: '58' },
        { quarter: 'Quý 3/2024', price: 63, priceDisplay: '63' },
        { quarter: 'Quý 1/2025', price: 67, priceDisplay: '67' },
        { quarter: 'Quý 3/2025', price: 70, priceDisplay: '70' },
        { quarter: 'Quý 1/2026', price: 73, priceDisplay: '73' },
        { quarter: 'Quý 3/2026', price: 78, priceDisplay: '78' },
      ]
    },
    priceGapWarning: true,
    priceGapPercent: 6.8,
    priceGapPercentDisplay: '6,8%',
    metroDistance: 'Cách ga Metro Nhổn - Ga Hà Nội 2,2 km',
    highways: 'Nằm trên trục đường Lê Quang Đạo kết nối Đại lộ Thăng Long',
    planningStatus: 'Đối diện công viên hồ điều hòa 14 ha Mễ Trì',
    deliveryYear: 'Bàn giao năm 2022',
    unitsCount: 740,
    unitsCountDisplay: '740 căn',
    scale: '39,8 ha phức hợp đô thị',
    planning: {
      zoningCode: 'ODT / TMD',
      zoningName: 'Đất thương mại dịch vụ và nhà ở cao cấp Mễ Trì',
      planDecisionDoc: 'Quyết định số 562/QĐ-UBND TP. Hà Nội phê duyệt 1/500',
      approvedScale: 'Quy hoạch chi tiết 1/500',
      maxFloors: '44 tầng',
      buildingDensity: '30%',
      floorAreaRatio: '6,4',
      setbackLimit: 'Khoảng lùi 10 m so với tim đường Lê Quang Đạo',
      roadRedLine: 'Lộ giới đường Lê Quang Đạo 100 m',
      acquisitionRisk: 'An toàn - Không có nguy cơ thu hồi',
      planningZoneName: 'Khu đô thị mới Mễ Trì - Nam Từ Liêm',
      zoningColor: '#f87171'
    },
    actualPhotosDate: 'Thứ năm, 10/9/2026',
    summary: 'Tổ hợp căn hộ cao cấp phía Tây Hà Nội với tầm nhìn công viên hồ điều hòa Mễ Trì.',
    highlights: ['Trục đường Lê Quang Đạo', 'Công viên hồ điều hòa 14 ha', 'Tiêu chuẩn hoàn thiện cao cấp'],
    legalDocs: [
      { id: '1', name: 'Quyết định chủ trương đầu tư', docNumber: '562/QĐ-UBND', issueDate: '1/2019', issuer: 'UBND TP. Hà Nội', status: 'verified' },
      { id: '2', name: 'Giấy phép xây dựng', docNumber: '92/GPXD', issueDate: '8/2019', issuer: 'Sở Xây dựng Hà Nội', status: 'verified' }
    ]
  },
  {
    id: 'du-an-canh-bao-binh-chanh',
    name: 'Khu dân cư Hưng Phát Riverside',
    developer: 'Công ty Cổ phần Đầu tư BĐS Nam Á',
    listingType: 'buy',
    propertyType: 'Đất nền',
    city: 'TP. Hồ Chí Minh',
    district: 'Huyện Bình Chánh',
    ward: 'Xã Phong Phú',
    address: 'Đường Quốc lộ 50, Xã Phong Phú, Huyện Bình Chánh, TP. Hồ Chí Minh',
    totalPriceText: '1,8 - 2,5 tỷ',
    totalPriceNumber: 1.8,
    pricePerM2: 26,
    pricePerM2Display: '26 triệu/m²',
    areaRange: '80 - 100 m²',
    bedroomsRange: 'Đất nền',
    transparencyScore: 32,
    legalStatus: 'Có cảnh báo',
    riskLevel: 'Cao',
    riskReason: 'Dự án chưa có quy hoạch chi tiết 1/500, chưa nộp tiền sử dụng đất, UBND Huyện Bình Chánh đã ban hành văn bản cảnh báo giao dịch.',
    verifiedDate: 'Thứ tư, 2/9/2026, 16:00 (GMT+7)',
    verifiedSource: 'Văn bản số 1842/UBND-QLĐT Huyện Bình Chánh',
    ownershipCertificate: 'Chưa đủ điều kiện',
    priceTier: {
      developerPrice: 28,
      developerPriceDisplay: '28 triệu/m²',
      developerNotes: 'Quảng cáo cam kết lợi nhuận 15% mỗi năm không có bảo lãnh tài chính.',
      secondaryAskingPrice: 26,
      secondaryAskingPriceDisplay: '26 triệu/m²',
      recordedTransactionPrice: 19,
      recordedTransactionPriceDisplay: '19 triệu/m²',
      sampleCount: 3,
      period: 'Quý 3/2026',
      historyQuarters: [
        { quarter: 'Quý 1/2025', price: 18, priceDisplay: '18' },
        { quarter: 'Quý 1/2026', price: 19, priceDisplay: '19' },
        { quarter: 'Quý 3/2026', price: 26, priceDisplay: '26' },
      ]
    },
    priceGapWarning: true,
    priceGapPercent: 36.8,
    priceGapPercentDisplay: '36,8%',
    metroDistance: 'Không gần tuyến metro',
    highways: 'Quốc lộ 50 đang mở rộng',
    planningStatus: 'Chưa hoàn thành công tác giải phóng mặt bằng kỹ thuật',
    deliveryYear: 'Chưa xác định',
    unitsCount: 180,
    unitsCountDisplay: '180 lô',
    scale: '2,3 ha',
    planning: {
      zoningCode: 'CLN / CHƯA CHUYỂN MỤC ĐÍCH',
      zoningName: 'Đất nông nghiệp trồng cây lâu năm - Chưa có quy hoạch 1/500',
      planDecisionDoc: 'Chưa có quyết định phê duyệt đồ án quy hoạch chi tiết 1/500',
      approvedScale: 'Chưa phê duyệt quy hoạch',
      maxFloors: 'Chưa xác định',
      buildingDensity: 'Chưa thẩm định',
      floorAreaRatio: 'Chưa có thông tin',
      setbackLimit: 'Dính quy hoạch mở rộng Quốc lộ 50',
      roadRedLine: 'Quy hoạch mở rộng Quốc lộ 50 lộ giới 40 m (cắt vào khu đất)',
      acquisitionRisk: 'Cảnh báo - Chưa giải phóng mặt bằng',
      planningZoneName: 'Khu đất nông nghiệp xã Phong Phú - Huyện Bình Chánh',
      zoningColor: '#da1e28'
    },
    actualPhotosDate: 'Thứ sáu, 28/8/2026',
    summary: 'Khu đất nền phân lô bị chính quyền địa phương cắm biển cảnh báo ngăn chặn giao dịch.',
    highlights: ['Cảnh báo rủi ro pháp lý cao', 'Chưa có phê duyệt quy hoạch 1/500', 'Giá rao bán chênh lệch 36,8% so với thị trường'],
    cautionNotes: 'UBND Huyện Bình Chánh thông báo dự án chưa đủ điều kiện huy động vốn theo luật định.',
    legalDocs: [
      { id: '1', name: 'Quy hoạch chi tiết 1/500', docNumber: 'Chưa có', issueDate: 'Chưa có', issuer: 'Chưa phê duyệt', status: 'missing', notes: 'Chưa nộp hồ sơ tại Sở Quy hoạch - Kiến trúc' },
      { id: '2', name: 'Giấy phép xây dựng', docNumber: 'Chưa có', issueDate: 'Chưa có', issuer: 'Chưa cấp', status: 'missing' },
      { id: '3', name: 'Quyết định xử phạt vi phạm hành chính', docNumber: '114/QĐ-XPHC', issueDate: '7/2026', issuer: 'Thanh tra Sở Xây dựng', status: 'warning', notes: 'Xử phạt hành vi huy động vốn khi chưa đủ điều kiện' }
    ]
  }
];

export interface LegalChecklistItem {
  step: number;
  category: 'future' | 'existing' | 'both';
  title: string;
  documentName: string;
  whyCrucial: string;
  tooltipExplanation: string;
  authority: string;
}

export const LEGAL_CHECKLIST: LegalChecklistItem[] = [
  {
    step: 1,
    category: 'future',
    title: 'Quyết định phê duyệt quy hoạch chi tiết 1/500',
    documentName: 'Bản đồ quy hoạch 1/500 có dấu mộc phê duyệt của UBND hoặc Sở QHKT',
    whyCrucial: 'Xác định chỉ giới xây dựng, mật độ, tầng cao và công năng từng ô đất để tránh dự án vẽ không đúng quy hoạch.',
    tooltipExplanation: 'Quy hoạch 1/500 là bản đồ quy hoạch chi tiết xây dựng tỉ lệ 1/500, cụ thể hóa đồ án quy hoạch phân khu 1/2000, bắt buộc mọi dự án nhà ở thương mại phải có trước khi xin giấy phép xây dựng.',
    authority: 'UBND cấp Tỉnh / Sở Quy hoạch - Kiến trúc'
  },
  {
    step: 2,
    category: 'future',
    title: 'Giấy phép xây dựng hợp lệ',
    documentName: 'Giấy phép xây dựng do Sở Xây dựng cấp',
    whyCrucial: 'Chứng minh công trình được phép thi công hợp pháp, không bị dừng thi công hoặc cưỡng chế tháo dỡ.',
    tooltipExplanation: 'Giấy phép xây dựng xác nhận chủ đầu tư được phép khởi công xây dựng công trình theo đúng thiết kế thẩm định. Không mua khi chủ đầu tư chỉ có giấy phép giai đoạn phần móng mà đã ký bán toàn tháp.',
    authority: 'Sở Xây dựng địa phương'
  },
  {
    step: 3,
    category: 'future',
    title: 'Biên bản nghiệm thu hoàn thành phần móng',
    documentName: 'Biên bản nghiệm thu có xác nhận của tư vấn giám sát',
    whyCrucial: 'Điều kiện tiên quyết theo Luật Kinh doanh Bất động sản để chủ đầu tư được phép mở bán và thu tiền đợt 1.',
    tooltipExplanation: 'Theo Luật Kinh doanh Bất động sản, dự án chung cư phải thi công xong móng và có văn bản nghiệm thu mới được phép ký hợp đồng mua bán.',
    authority: 'Tư vấn giám sát & Cục Giám định Chất lượng'
  },
  {
    step: 4,
    category: 'future',
    title: 'Văn bản đủ điều kiện mở bán nhà ở hình thành trong tương lai',
    documentName: 'Thông báo dự án đủ điều kiện bán của Sở Xây dựng',
    whyCrucial: 'Sở Xây dựng xác nhận đất không bị kê biên, thế chấp ngân hàng đã giải chấp hoặc được bảo lãnh đầy đủ.',
    tooltipExplanation: 'Đây là căn cứ pháp lý quan trọng nhất. Nếu chủ đầu tư chỉ đưa hợp đồng góp vốn hoặc thỏa thuận đặt cọc mà không có thông báo này nghĩa là đang huy động vốn trái quy định.',
    authority: 'Sở Xây dựng địa phương'
  },
  {
    step: 5,
    category: 'future',
    title: 'Chứng thư bảo lãnh nghĩa vụ tài chính của ngân hàng',
    documentName: 'Hợp đồng bảo lãnh dự án của ngân hàng thương mại',
    whyCrucial: 'Nếu chủ đầu tư chậm bàn giao nhà quá hạn cam kết, ngân hàng bảo lãnh có trách nhiệm hoàn trả tiền gốc và tiền phạt cho người mua.',
    tooltipExplanation: 'Bảo lãnh ngân hàng là cam kết pháp lý ràng buộc bắt buộc ngân hàng bồi thường cho người mua nhà nếu chủ đầu tư không bàn giao đúng thời hạn trong hợp đồng.',
    authority: 'Ngân hàng thương mại được cấp phép'
  },
  {
    step: 6,
    category: 'existing',
    title: 'Giấy chứng nhận quyền sử dụng đất và quyền sở hữu nhà ở (Sổ hồng)',
    documentName: 'Sổ hồng bản gốc đối chiếu tại văn phòng công chứng',
    whyCrucial: 'Xác minh người bán là chủ sở hữu hợp pháp, không có tranh chấp thừa kế hoặc tranh chấp tài sản vợ chồng.',
    tooltipExplanation: 'Sổ hồng ghi rõ số thửa đất, số tờ bản đồ, diện tích sở hữu riêng và chung. Trang 4 ghi nhận các nội dung thay đổi và thế chấp vay vốn.',
    authority: 'Văn phòng Đăng ký Đất đai'
  },
  {
    step: 7,
    category: 'both',
    title: 'Kiểm tra tình trạng thế chấp và ngăn chặn giao dịch',
    documentName: 'Xác nhận tra cứu trên cơ sở dữ liệu công chứng liên thông',
    whyCrucial: 'Tránh trường hợp bất động sản đang thế chấp ngân hàng, bị thi hành án hoặc kê biên phong tỏa của tòa án.',
    tooltipExplanation: 'Cơ sở dữ liệu công chứng liên thông lưu lại toàn bộ lịch sử thế chấp, vi bằng và các quyết định ngăn chặn giao dịch khẩn cấp của cơ quan tư pháp.',
    authority: 'Văn phòng Công chứng'
  }
];

export interface ProjectWarning {
  id: string;
  projectName: string;
  developer: string;
  location: string;
  warningDate: string; // Theo RULE.md: Thứ..., Ngày/Tháng/Năm, Giờ:Phút
  type: 'chua_du_dieu_kien' | 'sai_pham_quy_hoach' | 'tranh_chap_the_chap';
  title: string;
  details: string;
  status: 'Đang xử lý' | 'Đình chỉ mở bán' | 'Khuyến cáo không giao dịch';
  sourceDoc: string;
}

export const OFFICIAL_WARNINGS: ProjectWarning[] = [
  {
    id: 'w1',
    projectName: 'Khu dân cư Hưng Phát Riverside',
    developer: 'Công ty Cổ phần BĐS Nam Á',
    location: 'Huyện Bình Chánh, TP. Hồ Chí Minh',
    warningDate: 'Thứ tư, 12/8/2026, 09:30 (GMT+7)',
    type: 'chua_du_dieu_kien',
    title: 'Dự án chưa có quy hoạch 1/500 nhưng phát sinh hoạt động thu tiền đặt cọc',
    details: 'UBND Xã Phong Phú đã đặt biển cảnh báo khu đất chưa được cơ quan có thẩm quyền phê duyệt phân lô, tách thửa. Người dân không thực hiện các giao dịch đặt cọc giữ chỗ.',
    status: 'Khuyến cáo không giao dịch',
    sourceDoc: 'Thông báo số 1842/UBND-QLĐT'
  },
  {
    id: 'w2',
    projectName: 'Tổ hợp Thương mại Pandora Plaza',
    developer: 'Công ty TNHH Đầu tư Pandora Holdings',
    location: 'Quận Hoàng Mai, Hà Nội',
    warningDate: 'Thứ tư, 2/9/2026, 14:15 (GMT+7)',
    type: 'sai_pham_quy_hoach',
    title: 'Chủ đầu tư tự ý chuyển đổi tầng thương mại thành căn hộ nhỏ để rao bán',
    details: 'Thanh tra Xây dựng quận Hoàng Mai ra quyết định đình chỉ thi công cải tạo sau khi phát hiện chủ đầu tư ngăn chia tầng 3 và tầng 4 thành 48 căn hộ nhỏ trái phép.',
    status: 'Đình chỉ mở bán',
    sourceDoc: 'Quyết định số 229/QĐ-XPHC'
  },
  {
    id: 'w3',
    projectName: 'Khu biệt thự Eco Valley',
    developer: 'Công ty Cổ phần Sinh thái Xanh',
    location: 'Huyện Long Thành, Đồng Nai',
    warningDate: 'Thứ tư, 26/8/2026, 10:00 (GMT+7)',
    type: 'tranh_chap_the_chap',
    title: 'Toàn bộ giấy chứng nhận quyền sử dụng đất dự án đang thế chấp tại ngân hàng',
    details: 'Ngân hàng phát hành văn bản thu hồi nợ quá hạn và yêu cầu phong tỏa tài sản dự án. Chủ đầu tư vẫn ủy quyền cho sàn môi giới thu tiền đặt cọc của khách hàng.',
    status: 'Đang xử lý',
    sourceDoc: 'Văn bản Trung tâm Giao dịch Bảo đảm'
  }
];

export interface NewsItem {
  id: string;
  title: string; // Chuẩn Editor VnExpress: S-V-O, 4 từ đầu thu hút, ngắn gọn, facts first
  category: 'Dự án' | 'Thị trường' | 'Chính sách' | 'Góc nhìn';
  source: string;
  date: string; // RULE.md: Thứ..., Ngày/Tháng/Năm, Giờ:Phút (GMT+7)
  relatedProjectName?: string;
  summary: string; // Chuẩn Lead: KISS, facts first, active voice, không cảm xúc hoa mỹ
  readTime: string;
}

export const RELATED_NEWS: NewsItem[] = [
  {
    id: 'n1',
    title: 'TP HCM công bố 6 dự án đủ điều kiện mở bán',
    category: 'Chính sách',
    source: 'VnExpress Bất động sản',
    date: 'Thứ sáu, 2/10/2026, 07:30 (GMT+7)',
    summary: 'Sở Xây dựng TP HCM vừa duyệt thêm 6 dự án nhà ở hình thành trong tương lai, bổ sung 4.200 căn hộ đủ điều kiện ký hợp đồng mua bán theo quy định mới.',
    readTime: '3 phút'
  },
  {
    id: 'n2',
    title: 'Giá căn hộ quanh Metro số 1 tăng 4,5%',
    category: 'Thị trường',
    source: 'VnExpress Bất động sản',
    date: 'Thứ hai, 28/9/2026, 09:00 (GMT+7)',
    relatedProjectName: 'Lumière Riverside, The Metropole',
    summary: 'Dữ liệu giao dịch công chứng ghi nhận đơn giá căn hộ trong bán kính 500 m quanh các ga Metro tăng 4,5% sau khi tuyến đường sắt đô thị Bến Thành - Suối Tiên vận hành.',
    readTime: '5 phút'
  },
  {
    id: 'n3',
    title: 'Bẫy hợp đồng góp vốn ở dự án thiếu giấy phép 1/500',
    category: 'Góc nhìn',
    source: 'VnExpress Pháp luật',
    date: 'Thứ sáu, 25/9/2026, 08:15 (GMT+7)',
    summary: 'Nhiều người mua nhà bị chiếm dụng vốn khi ký thỏa thuận đặt cọc tại các dự án chưa được phê duyệt quy hoạch chi tiết và chưa có giấy phép xây dựng.',
    readTime: '4 phút'
  }
];
