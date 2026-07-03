/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Settings, 
  Building, 
  ShieldCheck, 
  CalendarDays, 
  Globe, 
  Save, 
  CheckCircle,
  Clock,
  UserCheck
} from "lucide-react";

export default function SettingsModule() {
  const [activeSettingsTab, setActiveSettingsTab] = useState<"General" | "Roles" | "Policies">("General");
  const [isSaved, setIsSaved] = useState(false);

  // General Settings States
  const [compName, setCompName] = useState("Antigravity Tech Corp");
  const [compLang, setCompLang] = useState("vi");
  const [compTimezone, setCompTimezone] = useState("Asia/Ho_Chi_Minh");
  const [compCurrency, setCompCurrency] = useState("VND");

  // Policies states
  const [policies, setPolicies] = useState([
    { id: 1, name: "Nghỉ phép năm tiêu chuẩn (Vacation)", allowance: "12 ngày / năm", autoAccrue: true },
    { id: 2, name: "Nghỉ ốm hưởng lương (Paid Sick Leave)", allowance: "5 ngày / năm", autoAccrue: true },
    { id: 3, name: "Nghỉ thai sản (Maternity Leave)", allowance: "180 ngày", autoAccrue: false }
  ]);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div id="settings-module" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Settings Module Layout with Left Sidebar Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Sidebar Links */}
        <div className="md:col-span-3 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden h-fit">
          <div className="p-4 bg-gray-50 border-b font-bold text-xs text-gray-700 flex items-center space-x-1.5">
            <Settings className="w-4 h-4 text-gray-500" />
            <span>Cài đặt hệ thống</span>
          </div>

          <div className="flex flex-col text-xs font-semibold text-gray-600 divide-y divide-gray-100">
            <button
              onClick={() => setActiveSettingsTab("General")}
              className={`p-3.5 text-left transition hover:bg-gray-50 flex items-center space-x-2 ${
                activeSettingsTab === "General" ? "bg-green-50/40 text-[#1c7c24] font-bold border-l-4 border-[#1c7c24]" : ""
              }`}
            >
              <Building className="w-4 h-4" />
              <span>Thông Tin Doanh Nghiệp</span>
            </button>

            <button
              onClick={() => setActiveSettingsTab("Roles")}
              className={`p-3.5 text-left transition hover:bg-gray-50 flex items-center space-x-2 ${
                activeSettingsTab === "Roles" ? "bg-green-50/40 text-[#1c7c24] font-bold border-l-4 border-[#1c7c24]" : ""
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Vai Trò & Quyền Hạn</span>
            </button>

            <button
              onClick={() => setActiveSettingsTab("Policies")}
              className={`p-3.5 text-left transition hover:bg-gray-50 flex items-center space-x-2 ${
                activeSettingsTab === "Policies" ? "bg-green-50/40 text-[#1c7c24] font-bold border-l-4 border-[#1c7c24]" : ""
              }`}
            >
              <CalendarDays className="w-4 h-4" />
              <span>Chính Sách Nghỉ Phép</span>
            </button>
          </div>
        </div>

        {/* Right content view */}
        <div className="md:col-span-9 bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          
          {/* GENERAL COMPANY SETTINGS */}
          {activeSettingsTab === "General" && (
            <form onSubmit={handleSaveSettings} className="space-y-6 text-xs">
              <div className="border-b pb-3">
                <h3 className="text-sm font-extrabold text-gray-800 font-display">Thông tin cấu hình doanh nghiệp</h3>
                <p className="text-[10px] text-gray-400 mt-1">Quản lý các thiết lập nền tảng hệ thống cho toàn bộ công ty.</p>
              </div>

              {isSaved && (
                <div className="p-3 bg-green-50 border border-green-200 text-green-800 rounded font-semibold flex items-center space-x-1.5 animate-in fade-in">
                  <CheckCircle className="w-4 h-4" />
                  <span>Thay đổi đã được cập nhật thành công vào hệ thống.</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">Tên doanh nghiệp hiển thị *</label>
                  <input
                    type="text"
                    required
                    value={compName}
                    onChange={(e) => setCompName(e.target.value)}
                    className="block w-full border border-gray-300 rounded p-2 focus:ring-green-600 focus:border-green-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">Múi giờ làm việc mặc định</label>
                  <select
                    value={compTimezone}
                    onChange={(e) => setCompTimezone(e.target.value)}
                    className="block w-full border border-gray-300 rounded p-2 focus:ring-green-600 focus:border-green-600"
                  >
                    <option value="Asia/Ho_Chi_Minh">Việt Nam (GMT+7) - Asia/Ho_Chi_Minh</option>
                    <option value="America/New_York">Hoa Kỳ (EST) - America/New_York</option>
                    <option value="Europe/London">Vương Quốc Anh (GMT) - Europe/London</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">Đơn vị tiền tệ chính</label>
                  <select
                    value={compCurrency}
                    onChange={(e) => setCompCurrency(e.target.value)}
                    className="block w-full border border-gray-300 rounded p-2 focus:ring-green-600 focus:border-green-600"
                  >
                    <option value="VND">Việt Nam Đồng (VND - ₫)</option>
                    <option value="USD">Đô la Mỹ (USD - $)</option>
                    <option value="EUR">Euro (EUR - €)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">Ngôn ngữ hiển thị chính</label>
                  <select
                    value={compLang}
                    onChange={(e) => setCompLang(e.target.value)}
                    className="block w-full border border-gray-300 rounded p-2 focus:ring-green-600 focus:border-green-600"
                  >
                    <option value="vi">Tiếng Việt (Vietnamese)</option>
                    <option value="en">English (US)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t flex justify-end">
                <button
                  type="submit"
                  className="bg-[#1c7c24] hover:bg-green-700 text-white font-bold py-2 px-6 rounded shadow flex items-center space-x-1.5 transition"
                >
                  <Save className="w-4 h-4" />
                  <span>Lưu Cấu Hình</span>
                </button>
              </div>
            </form>
          )}

          {/* ACCESS ROLES & PERMISSIONS */}
          {activeSettingsTab === "Roles" && (
            <div className="space-y-6 text-xs">
              <div className="border-b pb-3">
                <h3 className="text-sm font-extrabold text-gray-800 font-display">Phân quyền vai trò hệ thống</h3>
                <p className="text-[10px] text-gray-400 mt-1">Cấu hình chi tiết quyền hạn truy xuất dữ liệu cho từng nhóm tài khoản.</p>
              </div>

              <div className="space-y-4">
                {[
                  { role: "Administrator", desc: "Toàn quyền quản trị hệ thống, truy cập và sửa đổi mọi thông tin bảo mật, quỹ lương và hồ sơ nhân sự.", level: "bg-red-100 text-red-800" },
                  { role: "Manager / Lead", desc: "Quản lý nhân viên trực thuộc phòng ban, phê duyệt phép nghỉ, phân ca trực shifts, chấm điểm hiệu suất.", level: "bg-blue-100 text-blue-800" },
                  { role: "Standard Employee", desc: "Xem hồ sơ bản thân, nộp phép phép năm, thực hiện chấm công punch clock, gửi feedbacks đồng nghiệp.", level: "bg-green-100 text-green-800" }
                ].map((item) => (
                  <div key={item.role} className="p-4 border rounded-lg bg-gray-50/50 space-y-3">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-gray-800 text-sm">{item.role}</h4>
                      <span className={`px-2 py-0.5 rounded font-bold text-[9px] ${item.level}`}>
                        Kích hoạt
                      </span>
                    </div>
                    <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CUSTOM LEAVE POLICIES */}
          {activeSettingsTab === "Policies" && (
            <div className="space-y-6 text-xs">
              <div className="border-b pb-3">
                <h3 className="text-sm font-extrabold text-gray-800 font-display">Quản lý quỹ phép & chế độ nghỉ</h3>
                <p className="text-[10px] text-gray-400 mt-1">Quy định hạn định và công thức cộng dồn phép cho tổ chức.</p>
              </div>

              <div className="space-y-4">
                {policies.map((p) => (
                  <div key={p.id} className="p-4 border rounded-lg bg-gray-50/50 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm">{p.name}</h4>
                      <p className="text-gray-400 text-[10px] mt-1">Hạn mức quy định: <span className="font-bold text-gray-600">{p.allowance}</span></p>
                    </div>
                    <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-1 rounded">
                      Cộng dồn tự động
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
