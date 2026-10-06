import React, { useState } from 'react';
import { ProjectProfile } from '../data/projects';
import { X, Bell, Bookmark, CheckCircle2 } from 'lucide-react';

interface VnExpressSSOModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  onLoginSuccess: (email: string) => void;
  onLogout: () => void;
  savedProjects: ProjectProfile[];
  onRemoveSaved: (id: string) => void;
  onOpenProjectDetail: (p: ProjectProfile) => void;
}

export const VnExpressSSOModal: React.FC<VnExpressSSOModalProps> = ({
  isOpen,
  onClose,
  isLoggedIn,
  onLoginSuccess,
  onLogout,
  savedProjects,
  onRemoveSaved,
  onOpenProjectDetail
}) => {
  if (!isOpen) return null;

  const [emailInput, setEmailInput] = useState('docgia.vnexpress@fpt.vn');
  const [notifyPriceChange, setNotifyPriceChange] = useState(true);
  const [notifyLegalChange, setNotifyLegalChange] = useState(true);
  const [savedSettingsSuccess, setSavedSettingsSuccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      onLoginSuccess(emailInput.trim());
    }
  };

  const handleSaveSettings = () => {
    setSavedSettingsSuccess(true);
    setTimeout(() => setSavedSettingsSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000000]/60">
      <div className="relative w-full max-w-lg bg-[#ffffff] rounded-[4px] border border-[#d6d6d6] overflow-hidden p-5 sm:p-6">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#7f7f7f] hover:text-[#202020] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-[4px] bg-[#b13460] text-white flex items-center justify-center font-article-title font-bold text-base">
            VnE
          </div>
          <div>
            <h3 className="font-article-title text-base sm:text-lg font-bold text-[#202020]">
              {isLoggedIn ? 'Tài khoản độc giả VnExpress (F9)' : 'Đăng nhập tài khoản VnExpress'}
            </h3>
            <p className="font-body-content text-xs text-[#5f5f5f]">
              Đồng bộ danh sách theo dõi dự án và nhận thông báo biến động định kỳ
            </p>
          </div>
        </div>

        {!isLoggedIn ? (
          /* Login Form */
          <form onSubmit={handleLogin} className="space-y-3.5">
            <div className="p-3 bg-[#fafafa] rounded-[4px] border border-[#ececec] text-xs font-body-content text-[#5f5f5f] leading-relaxed">
              Sử dụng tài khoản VnExpress ID để lưu hồ sơ dự án và nhận email thông báo khi có biến động giá hoặc thay đổi pháp lý (tối đa 1 email tổng hợp mỗi ngày).
            </div>

            <div>
              <label className="block text-xs font-ui text-[#5f5f5f] mb-1">
                Email hoặc Số điện thoại VnExpress ID:
              </label>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full text-xs font-body-content bg-[#fafafa] border border-[#9f9f9f] rounded-[4px] px-3 py-2 text-[#202020] focus:outline-none focus:border-[#0590de]"
              />
            </div>

            <div>
              <label className="block text-xs font-ui text-[#5f5f5f] mb-1">
                Mật khẩu:
              </label>
              <input
                type="password"
                defaultValue="••••••••••••"
                className="w-full text-xs font-body-content bg-[#fafafa] border border-[#9f9f9f] rounded-[4px] px-3 py-2 text-[#202020] focus:outline-none focus:border-[#0590de]"
              />
            </div>

            <button
              type="submit"
              className="w-full h-10 text-xs font-bold font-ui text-white bg-[#b13460] hover:bg-[#932a4e] rounded-[8px] transition-colors cursor-pointer"
            >
              Đăng nhập qua VnExpress
            </button>
          </form>
        ) : (
          /* User Dashboard */
          <div className="space-y-4">
            <div className="p-3 bg-[#fafafa] rounded-[4px] border border-[#ececec] flex items-center justify-between text-xs font-body-content">
              <div>
                <span className="font-bold text-[#202020] font-ui">{emailInput}</span>
                <span className="block text-[#7f7f7f] text-xs">Đã liên kết hệ thống VnExpress</span>
              </div>
              <button
                type="button"
                onClick={onLogout}
                className="text-xs font-ui text-[#da1e28] hover:underline cursor-pointer"
              >
                Đăng xuất
              </button>
            </div>

            {/* Notification preferences */}
            <div className="border border-[#d6d6d6] rounded-[4px] p-3 bg-white space-y-2">
              <span className="text-xs font-bold font-ui text-[#202020] flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5 text-[#466fa1]" />
                Cài đặt nhận thông báo (Tối đa 1 email mỗi ngày):
              </span>

              <label className="flex items-center gap-2 text-xs font-body-content text-[#5f5f5f] cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyPriceChange}
                  onChange={(e) => setNotifyPriceChange(e.target.checked)}
                  className="accent-[#b13460]"
                />
                <span>Gửi email khi dự án đã lưu biến động giá trên 3%</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-body-content text-[#5f5f5f] cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyLegalChange}
                  onChange={(e) => setNotifyLegalChange(e.target.checked)}
                  className="accent-[#b13460]"
                />
                <span>Cảnh báo khẩn cấp khi dự án có thay đổi về pháp lý hoặc tranh chấp</span>
              </label>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleSaveSettings}
                  className="h-8 px-3 text-xs font-bold font-ui text-white bg-[#466fa1] hover:bg-[#385b85] rounded-[8px] cursor-pointer"
                >
                  Lưu cấu hình
                </button>
                {savedSettingsSuccess && (
                  <span className="text-xs font-body-content text-[#24a148] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Đã lưu cài đặt
                  </span>
                )}
              </div>
            </div>

            {/* Saved Projects List */}
            <div>
              <span className="text-xs font-bold font-ui text-[#202020] block mb-1.5">
                Dự án đang theo dõi (<span className="font-numeric">{savedProjects.length}</span>):
              </span>

              {savedProjects.length === 0 ? (
                <p className="text-xs font-body-content text-[#7f7f7f] italic p-3 bg-[#fafafa] rounded-[4px] text-center border border-[#ececec]">
                  Bạn chưa lưu dự án nào. Bấm biểu tượng bookmark trên thẻ dự án để theo dõi.
                </p>
              ) : (
                <div className="max-h-44 overflow-y-auto divide-y divide-[#ececec] border border-[#d6d6d6] rounded-[4px] bg-white">
                  {savedProjects.map((p) => (
                    <div key={p.id} className="p-2.5 flex items-center justify-between gap-2 hover:bg-[#fafafa]">
                      <div>
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onOpenProjectDetail(p);
                          }}
                          className="font-ui font-bold text-xs text-[#202020] hover:text-[#b13460] text-left block"
                        >
                          {p.name}
                        </button>
                        <span className="text-xs text-[#7f7f7f] font-numeric">
                          {p.totalPriceText} · {p.district}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveSaved(p.id)}
                        className="text-[#9f9f9f] hover:text-[#da1e28] p-1 cursor-pointer"
                        title="Bỏ theo dõi"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
