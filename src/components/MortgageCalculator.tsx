import React, { useState } from 'react';
import { ShieldCheck, ChevronRight } from 'lucide-react';

interface MortgageCalculatorProps {
  initialPriceBillion?: number;
  onApplyBudgetFilter?: (maxPriceBillion: number) => void;
}

export const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({
  initialPriceBillion = 3.5,
  onApplyBudgetFilter
}) => {
  const [calculatorMode, setCalculatorMode] = useState<'loan' | 'affordability'>('loan');

  // Mode 1: Loan Calculation
  const [housePrice, setHousePrice] = useState<number>(initialPriceBillion); // Tỷ đồng
  const [loanRatio, setLoanRatio] = useState<number>(70); // %
  const [loanYears, setLoanYears] = useState<number>(20); // năm
  const [promoRate, setPromoRate] = useState<number>(6.5); // % / năm
  const [floatRate, setFloatRate] = useState<number>(9.5); // % / năm

  // Mode 2: Affordability Calculation (B4)
  const [monthlyIncome, setMonthlyIncome] = useState<number>(45); // Triệu / tháng
  const [savingsAmount, setSavingsAmount] = useState<number>(800); // Triệu đồng

  // Calculations for Loan
  const loanAmountBillion = housePrice * (loanRatio / 100);
  const loanAmountVnd = loanAmountBillion * 1_000_000_000;
  const totalMonths = loanYears * 12;

  // Monthly principal repayment
  const monthlyPrincipal = loanAmountVnd / totalMonths;
  // First month interest (Promo)
  const promoMonthlyInterest = (loanAmountVnd * (promoRate / 100)) / 12;
  const firstMonthPayment = monthlyPrincipal + promoMonthlyInterest;

  // Float month interest
  const floatMonthlyInterest = (loanAmountVnd * (floatRate / 100)) / 12;
  const floatMonthPayment = monthlyPrincipal + floatMonthlyInterest;

  // Estimated total interest over life
  const estTotalInterest = (promoMonthlyInterest * 12) + (floatMonthlyInterest * (totalMonths - 12) * 0.75);

  // Recommended minimum household income (payment should be <= 40% income for safety)
  const recommendedIncome = Math.round((firstMonthPayment / 0.4) / 1_000_000);

  // Helper formatting for Vietnamese numbers
  const formatVnd = (num: number) => Math.round(num).toLocaleString('vi-VN');
  const formatDecimal = (num: number) => num.toFixed(1).replace('.', ',');

  // Calculations for Affordability (B4)
  const maxSafeMonthlyPayment = (monthlyIncome * 0.4) * 1_000_000;
  const maxBorrowVnd = (maxSafeMonthlyPayment * 240) / 1.7;
  const maxHouseBudgetBillion = ((savingsAmount * 1_000_000) + maxBorrowVnd) / 1_000_000_000;

  return (
    <section id="section-calculator" className="py-10 bg-[#fcfaf6] border-b border-[#d6d6d6]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-6">
          <p className="font-ui text-xs font-bold text-[#b13460] mb-1">
            Công cụ tài chính & Thẩm định ngân sách (F7 & B4)
          </p>
          <h2 className="font-article-title text-xl sm:text-2xl md:text-3xl font-bold text-[#202020] leading-snug">
            Tính toán khoản vay mua nhà và khả năng chi trả
          </h2>
          <p className="font-body-content text-xs sm:text-sm text-[#5f5f5f] mt-1.5 leading-relaxed">
            Dành cho người mua nhà lần đầu. Đánh giá khả năng thanh toán theo dư nợ giảm dần và ngưỡng an toàn tài chính gia đình.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="inline-flex p-1 bg-[#f3f3f3] rounded-[8px] mb-5 border border-[#d6d6d6]">
          <button
            type="button"
            onClick={() => setCalculatorMode('loan')}
            className={`px-3.5 py-1.5 text-xs font-bold font-ui rounded-[8px] transition-colors cursor-pointer ${
              calculatorMode === 'loan'
                ? 'bg-[#b13460] text-white'
                : 'text-[#5f5f5f] hover:text-[#202020]'
            }`}
          >
            1. Tính lịch trả nợ theo giá nhà
          </button>
          <button
            type="button"
            onClick={() => setCalculatorMode('affordability')}
            className={`px-3.5 py-1.5 text-xs font-bold font-ui rounded-[8px] transition-colors cursor-pointer ${
              calculatorMode === 'affordability'
                ? 'bg-[#b13460] text-white'
                : 'text-[#5f5f5f] hover:text-[#202020]'
            }`}
          >
            2. Thẩm định từ thu nhập gia đình (B4)
          </button>
        </div>

        {calculatorMode === 'loan' ? (
          /* Mode 1: Loan schedule calculator */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Input Controls */}
            <div className="lg:col-span-6 bg-white p-4 sm:p-5 rounded-[4px] border border-[#d6d6d6] space-y-4">
              <h3 className="font-ui text-xs font-bold text-[#202020] border-b border-[#ececec] pb-2">
                Thông số khoản vay thế chấp
              </h3>

              {/* Price input */}
              <div>
                <div className="flex justify-between text-xs font-ui font-normal text-[#5f5f5f] mb-1">
                  <label htmlFor="house-price-input">Giá trị bất động sản:</label>
                  <span className="font-numeric font-bold text-[#b13460]">{formatDecimal(housePrice)} tỷ đồng</span>
                </div>
                <input
                  id="house-price-input"
                  type="range"
                  min={1}
                  max={20}
                  step={0.1}
                  value={housePrice}
                  onChange={(e) => setHousePrice(parseFloat(e.target.value))}
                  className="w-full accent-[#b13460] cursor-pointer"
                />
                <div className="flex justify-between text-xs font-numeric text-[#9f9f9f] mt-0.5">
                  <span>1 tỷ</span>
                  <span>10 tỷ</span>
                  <span>20 tỷ</span>
                </div>
              </div>

              {/* Loan Ratio */}
              <div>
                <div className="flex justify-between text-xs font-ui font-normal text-[#5f5f5f] mb-1">
                  <label htmlFor="loan-ratio-input">Tỷ lệ vay ngân hàng:</label>
                  <span className="font-numeric font-bold text-[#202020]">{loanRatio}% ({formatDecimal(loanAmountBillion)} tỷ đồng)</span>
                </div>
                <input
                  id="loan-ratio-input"
                  type="range"
                  min={20}
                  max={80}
                  step={5}
                  value={loanRatio}
                  onChange={(e) => setLoanRatio(parseInt(e.target.value))}
                  className="w-full accent-[#b13460] cursor-pointer"
                />
                <div className="flex justify-between text-xs font-numeric text-[#9f9f9f] mt-0.5">
                  <span>20% (An toàn)</span>
                  <span>50%</span>
                  <span>80%</span>
                </div>
              </div>

              {/* Loan Term */}
              <div>
                <div className="flex justify-between text-xs font-ui font-normal text-[#5f5f5f] mb-1">
                  <label htmlFor="loan-years-input">Thời hạn vay:</label>
                  <span className="font-numeric font-bold text-[#202020]">{loanYears} năm ({totalMonths} tháng)</span>
                </div>
                <input
                  id="loan-years-input"
                  type="range"
                  min={5}
                  max={30}
                  step={1}
                  value={loanYears}
                  onChange={(e) => setLoanYears(parseInt(e.target.value))}
                  className="w-full accent-[#b13460] cursor-pointer"
                />
                <div className="flex justify-between text-xs font-numeric text-[#9f9f9f] mt-0.5">
                  <span>5 năm</span>
                  <span>15 năm</span>
                  <span>30 năm</span>
                </div>
              </div>

              {/* Interest Rates */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-[#fafafa] p-2.5 rounded-[4px] border border-[#d6d6d6]">
                  <label htmlFor="promo-rate-input" className="block text-xs font-ui text-[#5f5f5f] mb-1">
                    Lãi ưu đãi năm đầu (%/năm)
                  </label>
                  <input
                    id="promo-rate-input"
                    type="number"
                    step="0.1"
                    min="4"
                    max="12"
                    value={promoRate}
                    onChange={(e) => setPromoRate(parseFloat(e.target.value) || 0)}
                    className="w-full font-numeric text-sm font-bold bg-white border border-[#9f9f9f] rounded-[4px] px-2.5 py-1 text-[#202020]"
                  />
                  <span className="text-xs font-body-content text-[#7f7f7f] mt-1 block">Tham khảo ngân hàng thương mại</span>
                </div>

                <div className="bg-[#fafafa] p-2.5 rounded-[4px] border border-[#d6d6d6]">
                  <label htmlFor="float-rate-input" className="block text-xs font-ui text-[#5f5f5f] mb-1">
                    Lãi thả nổi ước tính (%/năm)
                  </label>
                  <input
                    id="float-rate-input"
                    type="number"
                    step="0.1"
                    min="6"
                    max="16"
                    value={floatRate}
                    onChange={(e) => setFloatRate(parseFloat(e.target.value) || 0)}
                    className="w-full font-numeric text-sm font-bold bg-white border border-[#9f9f9f] rounded-[4px] px-2.5 py-1 text-[#202020]"
                  />
                  <span className="text-xs font-body-content text-[#7f7f7f] mt-1 block">Lãi suất huy động + biên độ 3,5%</span>
                </div>
              </div>

            </div>

            {/* Repayment Breakdown Results */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-white p-4 sm:p-5 rounded-[4px] border border-[#d6d6d6] space-y-4">
                <span className="font-ui text-xs font-bold text-[#b13460] block">
                  Dự toán tài chính hàng tháng (Dư nợ giảm dần)
                </span>

                <div className="grid grid-cols-2 gap-4 border-b border-[#ececec] pb-4">
                  <div>
                    <span className="text-xs font-body-content text-[#5f5f5f] block">Tháng đầu tiên (Ưu đãi):</span>
                    <span className="font-numeric text-xl sm:text-2xl font-bold text-[#202020]">
                      {formatVnd(firstMonthPayment)} đ
                    </span>
                    <span className="text-xs font-numeric text-[#7f7f7f] block">Gốc: {formatVnd(monthlyPrincipal)} đ</span>
                  </div>

                  <div>
                    <span className="text-xs font-body-content text-[#5f5f5f] block">Tháng sau ưu đãi (Thả nổi):</span>
                    <span className="font-numeric text-xl sm:text-2xl font-bold text-[#b13460]">
                      ~{formatVnd(floatMonthPayment)} đ
                    </span>
                    <span className="text-xs font-body-content text-[#7f7f7f] block">Lãi thả nổi dự kiến</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-body-content">
                  <div>
                    <span className="text-[#5f5f5f] block">Tổng số tiền lãi ước tính:</span>
                    <span className="font-numeric font-bold text-[#202020] text-sm">
                      ~{formatDecimal(estTotalInterest / 1_000_000_000)} tỷ đồng
                    </span>
                  </div>
                  <div>
                    <span className="text-[#5f5f5f] block">Thu nhập khuyến nghị:</span>
                    <span className="font-numeric font-bold text-[#145b29] text-sm">
                      ≥ {recommendedIncome} triệu/tháng
                    </span>
                  </div>
                </div>

                <div className="bg-[#fafafa] p-3 rounded-[4px] border border-[#ececec] text-xs font-body-content text-[#5f5f5f] flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#466fa1] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>Quy tắc 40% an toàn:</strong> Khoản thanh toán định kỳ không nên vượt quá 40% tổng thu nhập hàng tháng để duy trì quỹ chi tiêu sinh hoạt và dự phòng rủi ro.
                  </p>
                </div>
              </div>

              {/* Sample Payment Milestones */}
              <div className="bg-white p-4 rounded-[4px] border border-[#d6d6d6] text-xs">
                <span className="font-ui font-bold text-[#202020] block mb-2">
                  Tiến trình trả nợ tiêu biểu:
                </span>
                <div className="divide-y divide-[#ececec] font-numeric text-xs">
                  <div className="py-1.5 flex justify-between text-[#5f5f5f]">
                    <span>Năm 1 (Ưu đãi {formatDecimal(promoRate)}%)</span>
                    <span className="font-bold text-[#202020]">{Math.round(firstMonthPayment / 1_000_000)} triệu/tháng</span>
                  </div>
                  <div className="py-1.5 flex justify-between text-[#5f5f5f]">
                    <span>Năm 2 (Thả nổi {formatDecimal(floatRate)}%)</span>
                    <span className="font-bold text-[#b13460]">{Math.round(floatMonthPayment / 1_000_000)} triệu/tháng</span>
                  </div>
                  <div className="py-1.5 flex justify-between text-[#5f5f5f]">
                    <span>Năm 5 (Dư nợ giảm 20%)</span>
                    <span className="font-bold text-[#202020]">{Math.round((floatMonthPayment * 0.88) / 1_000_000)} triệu/tháng</span>
                  </div>
                  <div className="py-1.5 flex justify-between text-[#5f5f5f]">
                    <span>Năm 10 (Dư nợ giảm 50%)</span>
                    <span className="font-bold text-[#202020]">{Math.round((floatMonthPayment * 0.7) / 1_000_000)} triệu/tháng</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        ) : (
          /* Mode 2: Reverse Affordability Calculator (B4) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            <div className="lg:col-span-6 bg-white p-4 sm:p-5 rounded-[4px] border border-[#d6d6d6] space-y-4">
              <h3 className="font-ui text-xs font-bold text-[#202020] border-b border-[#ececec] pb-2">
                Thẩm định từ thu nhập thực tế gia đình
              </h3>

              {/* Monthly income */}
              <div>
                <div className="flex justify-between text-xs font-ui font-normal text-[#5f5f5f] mb-1">
                  <label htmlFor="family-income-input">Tổng thu nhập ổn định hàng tháng:</label>
                  <span className="font-numeric font-bold text-[#b13460]">{monthlyIncome} triệu đồng/tháng</span>
                </div>
                <input
                  id="family-income-input"
                  type="range"
                  min={15}
                  max={150}
                  step={2}
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(parseInt(e.target.value))}
                  className="w-full accent-[#b13460] cursor-pointer"
                />
                <div className="flex justify-between text-xs font-numeric text-[#9f9f9f] mt-0.5">
                  <span>15 triệu</span>
                  <span>50 triệu</span>
                  <span>150 triệu</span>
                </div>
              </div>

              {/* Savings amount */}
              <div>
                <div className="flex justify-between text-xs font-ui font-normal text-[#5f5f5f] mb-1">
                  <label htmlFor="savings-input">Số tiền tích lũy hiện có:</label>
                  <span className="font-numeric font-bold text-[#202020]">{savingsAmount} triệu đồng ({formatDecimal(savingsAmount / 1000)} tỷ)</span>
                </div>
                <input
                  id="savings-input"
                  type="range"
                  min={100}
                  max={3000}
                  step={50}
                  value={savingsAmount}
                  onChange={(e) => setSavingsAmount(parseInt(e.target.value))}
                  className="w-full accent-[#b13460] cursor-pointer"
                />
                <div className="flex justify-between text-xs font-numeric text-[#9f9f9f] mt-0.5">
                  <span>100 triệu</span>
                  <span>1 tỷ</span>
                  <span>3 tỷ</span>
                </div>
              </div>

              <div className="p-3 bg-[#fafafa] rounded-[4px] border border-[#ececec] text-xs font-body-content text-[#5f5f5f]">
                Công thức thẩm định áp dụng tỷ lệ chi trả nợ an toàn không vượt quá 40% thu nhập hàng tháng.
              </div>
            </div>

            {/* Affordability Output */}
            <div className="lg:col-span-6 bg-white p-4 sm:p-5 rounded-[4px] border border-[#d6d6d6] space-y-4">
              <span className="font-ui text-xs font-bold text-[#b13460] block">
                Ngưỡng ngân sách mua nhà an toàn cho bạn
              </span>

              <div>
                <span className="text-xs font-body-content text-[#5f5f5f] block">Giá trị bất động sản tối đa nên tìm kiếm:</span>
                <span className="font-numeric text-3xl font-bold text-[#202020]">
                  ~{formatDecimal(maxHouseBudgetBillion)} tỷ đồng
                </span>
                <p className="text-xs font-body-content text-[#5f5f5f] mt-1">
                  Vốn tự có: {formatDecimal(savingsAmount / 1000)} tỷ đồng · Vay tối đa: ~{formatDecimal(maxBorrowVnd / 1_000_000_000)} tỷ đồng (trả nợ hàng tháng: ~{Math.round(maxSafeMonthlyPayment / 1_000_000)} triệu đồng)
                </p>
              </div>

              {onApplyBudgetFilter && (
                <button
                  type="button"
                  onClick={() => onApplyBudgetFilter(maxHouseBudgetBillion)}
                  className="h-10 w-full px-4 text-xs font-bold font-ui text-white bg-[#b13460] hover:bg-[#932a4e] rounded-[8px] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Áp dụng mức giá ≤ {formatDecimal(maxHouseBudgetBillion)} tỷ đồng vào bộ lọc</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
