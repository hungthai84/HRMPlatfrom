/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Calendar, 
  Clock, 
  Palmtree, 
  Bandage, 
  ChevronRight, 
  Plus, 
  CheckSquare, 
  FileSignature, 
  ClipboardCheck, 
  Sparkles, 
  Volume2, 
  Users, 
  Cake, 
  Gift, 
  X,
  AlertCircle,
  TrendingUp,
  MapPin,
  CalendarCheck
} from "lucide-react";
import { Employee, TimeOffRequest, OnboardingTask, Announcement } from "../../types";

interface HomeDashboardProps {
  currentUser: Employee;
  employees: Employee[];
  timeOffRequests: TimeOffRequest[];
  onboardingTasks: OnboardingTask[];
  announcements: Announcement[];
  addTimeOffRequest: (request: TimeOffRequest) => void;
  setActiveTab: (tab: string) => void;
  onSelectEmployee: (emp: Employee) => void;
}

export default function HomeDashboard({
  currentUser,
  employees,
  timeOffRequests,
  onboardingTasks,
  announcements,
  addTimeOffRequest,
  setActiveTab,
  onSelectEmployee
}: HomeDashboardProps) {
  const [showTimeOffModal, setShowTimeOffModal] = useState(false);
  const [expandedWelcome, setExpandedWelcome] = useState<string | null>(null);

  // Time off request form state
  const [leaveType, setLeaveType] = useState<"Vacation" | "Sick Leave" | "Personal">("Vacation");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [leaveNotes, setLeaveNotes] = useState("");

  // Get active onboarding tasks for current user (Matt Vargas)
  const myOnboardingTasks = onboardingTasks.filter(
    (t) => t.employeeId === currentUser.id && !t.isCompleted
  );

  // Celebrations: Hardcoded from BambooHR mockup
  const celebrations = [
    { name: "John Ryan", type: "Anniversary", date: "Apr 1", detail: "7th Anniversary", photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150" },
    { name: "Dom Pasque", type: "Anniversary", date: "Apr 2", detail: "4th Anniversary", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150" },
    { name: "Karin Petty", type: "Birthday", date: "Apr 5", detail: "Happy Birthday!", photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=150" }
  ];

  // Who's Out: Calculate from approved time-off requests + standard mock faces
  const approvedLeaves = timeOffRequests.filter(req => req.status === "Approved");
  
  // Hardcoded face templates for visual fidelity mirroring image 1
  const whosOutToday = [
    { name: "Charlotte Abbott", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100" },
    { name: "Jenn Caldwell", photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100" },
    { name: "Omar Abbad", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" },
    { name: "Anna Lim", photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100" },
    { name: "Clark Fuller", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100" },
    { name: "John Ryan", photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=100" },
    { name: "Dom Pasque", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100" },
    { name: "Karin Petty", photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=100" }
  ];

  const whosOutTomorrow = [
    { name: "Charlotte Abbott", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100" },
    { name: "Clark Fuller", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100" },
    { name: "John Ryan", photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=100" }
  ];

  const handleTimeOffSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    const newRequest: TimeOffRequest = {
      id: "TO-" + (100 + timeOffRequests.length + 1),
      employeeId: currentUser.id,
      employeeName: currentUser.fullName,
      employeePhoto: currentUser.photoUrl,
      type: leaveType,
      startDate,
      endDate,
      totalDays: diffDays,
      status: "Approved", // Auto-approved for admin demonstration
      notes: leaveNotes
    };

    addTimeOffRequest(newRequest);
    setShowTimeOffModal(false);
    setStartDate("");
    setEndDate("");
    setLeaveNotes("");
  };

  return (
    <div id="home-dashboard" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Visual background brand banner */}
      <div className="h-28 bamboo-header rounded-t-lg shadow-md relative flex items-end p-6 mb-6">
        <div className="absolute right-4 top-4 bg-white/20 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full font-medium">
          Môi trường: Thử nghiệm OwnCo
        </div>
        <div className="text-white">
          <p className="text-xs uppercase tracking-widest font-semibold text-green-100">Hôm nay</p>
          <h1 className="text-2xl font-bold font-display">Chào mừng trở lại, {currentUser.fullName}!</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Profile Widget, Time Off Balance, Who's Out, Celebrations */}
        <div className="lg:col-span-4 space-y-6">
          {/* Main profile balance card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Header profile section */}
            <div className="bg-gradient-to-r from-green-700 to-green-800 p-4 flex items-center space-x-4">
              <img
                src={currentUser.photoUrl}
                alt={currentUser.fullName}
                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
              />
              <div className="text-white min-w-0">
                <h2 className="text-lg font-bold font-display truncate">{currentUser.fullName}</h2>
                <p className="text-xs text-green-100 truncate">{currentUser.jobTitle}</p>
                <p className="text-[10px] text-green-200 truncate">{currentUser.department}</p>
              </div>
            </div>

            {/* Balances grids */}
            <div className="grid grid-cols-2 divide-x divide-gray-100 border-b border-gray-100 p-4 text-center">
              <div className="py-2">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">Ngày nghỉ phép</span>
                <div className="flex items-center justify-center space-x-2 my-2">
                  <Palmtree className="w-5 h-5 text-green-600" />
                  <span className="text-2xl font-extrabold text-gray-800 font-display">34</span>
                </div>
                <span className="text-[9px] font-bold text-green-600 uppercase tracking-wider">Hộp giờ khả dụng</span>
              </div>
              <div className="py-2">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">Ngày phép ốm</span>
                <div className="flex items-center justify-center space-x-2 my-2">
                  <Bandage className="w-5 h-5 text-blue-500" />
                  <span className="text-2xl font-extrabold text-gray-800 font-display">0</span>
                </div>
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">0 Hộp Giờ Đã Dùng (YTD)</span>
              </div>
            </div>

            {/* Request button */}
            <div className="p-4 bg-gray-50 flex space-x-2">
              <button
                id="btn-request-timeoff"
                onClick={() => setShowTimeOffModal(true)}
                className="flex-1 bg-[#1c7c24] hover:bg-green-700 text-white text-xs font-bold py-2.5 px-4 rounded-md shadow-sm flex items-center justify-center space-x-2 transition"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Yêu Cầu Nghỉ Phép</span>
              </button>
              <button 
                onClick={() => setActiveTab("Time")}
                className="bg-white border border-gray-200 hover:bg-gray-100 p-2 rounded-md shadow-sm text-gray-600"
                title="Lịch chấm công"
              >
                <Clock className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Who's Out Widget */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2 mb-3">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-500" />
                <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Ai đang vắng mặt?</h3>
              </div>
              <button 
                onClick={() => setActiveTab("Time")}
                className="text-[10px] text-green-700 font-bold hover:underline"
              >
                Chi tiết
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Hôm nay ({whosOutToday.length})</p>
                <div className="flex flex-wrap gap-1.5">
                  {whosOutToday.map((item, idx) => (
                    <img
                      key={idx}
                      src={item.photo}
                      alt={item.name}
                      title={`${item.name} (Vắng mặt hôm nay)`}
                      className="w-7 h-7 rounded-full object-cover border border-gray-200 hover:scale-110 transition cursor-pointer"
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Ngày mai ({whosOutTomorrow.length})</p>
                <div className="flex flex-wrap gap-1.5">
                  {whosOutTomorrow.map((item, idx) => (
                    <img
                      key={idx}
                      src={item.photo}
                      alt={item.name}
                      title={`${item.name} (Vắng mặt ngày mai)`}
                      className="w-7 h-7 rounded-full object-cover border border-gray-200 hover:scale-110 transition cursor-pointer"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Celebrations Widget */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2 mb-3">
              <div className="flex items-center space-x-2">
                <Gift className="w-4 h-4 text-amber-500" />
                <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Sự Kiện Kỷ Niệm</h3>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {celebrations.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0">
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.photo}
                      alt={item.name}
                      className="w-8 h-8 rounded-full object-cover border border-gray-100"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-gray-800">{item.name}</h4>
                      <p className="text-[10px] text-gray-500 flex items-center space-x-1">
                        {item.type === "Anniversary" ? (
                          <>
                            <Sparkles className="w-3 h-3 text-amber-500" />
                            <span>Kỷ niệm làm việc: {item.detail}</span>
                          </>
                        ) : (
                          <>
                            <Cake className="w-3 h-3 text-pink-500" />
                            <span>Sinh nhật: {item.detail}</span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded">
                      {item.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Tasks panel, Welcome Panel, Important announcements */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Core Panel: WHAT'S HAPPENING AT YOUR OWN CO */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Đang diễn ra tại OwnCo</h3>
              <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">Có 3 việc cần xử lý</span>
            </div>

            <div className="p-4 divide-y divide-gray-100 space-y-4">
              {/* Alert 1: Onboarding tasks */}
              <div className="flex items-start space-x-4 pt-4 first:pt-0">
                <div className="p-2 bg-rose-50 rounded-lg text-rose-600 shrink-0">
                  <CheckSquare className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-xs font-bold text-gray-800">Bạn có 7 nhiệm vụ onboarding chưa hoàn thành.</h4>
                    <span className="bg-rose-100 text-rose-800 text-[9px] font-bold px-1.5 py-0.2 rounded uppercase">Quá Hạn</span>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1">Nhiệm vụ cũ nhất hết hạn vào 26 Tháng 8 (Đã quá hạn 216 ngày).</p>
                </div>
                <button 
                  onClick={() => setActiveTab("Onboarding")}
                  className="bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:text-[#1c7c24] text-[10px] font-bold text-gray-700 px-3 py-1.5 rounded-md shadow-xs shrink-0"
                >
                  Đi tới Inbox
                </button>
              </div>

              {/* Alert 2: Self Assessment */}
              <div className="flex items-start space-x-4 pt-4">
                <div className="p-2 bg-amber-50 rounded-lg text-amber-600 shrink-0">
                  <ClipboardCheck className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-xs font-bold text-gray-800">Hoàn thành Tự Đánh Giá Hiệu Suất Cá Nhân.</h4>
                    <span className="bg-amber-100 text-amber-800 text-[9px] font-bold px-1.5 py-0.2 rounded uppercase">Quá Hạn</span>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1">Vui lòng điền phiếu tự đánh giá trước ngày 2 Tháng 3 (Đã quá hạn 28 ngày).</p>
                </div>
                <button 
                  onClick={() => setActiveTab("Performance")}
                  className="bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:text-[#1c7c24] text-[10px] font-bold text-gray-700 px-3 py-1.5 rounded-md shadow-xs shrink-0"
                >
                  Tự đánh giá
                </button>
              </div>

              {/* Alert 3: Documents to sign */}
              <div className="flex items-start space-x-4 pt-4">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600 shrink-0">
                  <FileSignature className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-gray-800">Bạn có 6 tài liệu đang chờ ký duyệt.</h4>
                  <p className="text-[10px] text-gray-500 mt-1">Các hợp đồng lao động, thỏa thuận bảo mật NDA và phụ lục thưởng 2026.</p>
                </div>
                <button 
                  onClick={() => {
                    // Navigate to current user profile documents
                    onSelectEmployee(currentUser);
                    setActiveTab("People");
                  }}
                  className="bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:text-[#1c7c24] text-[10px] font-bold text-gray-700 px-3 py-1.5 rounded-md shadow-xs shrink-0"
                >
                  Ký văn bản
                </button>
              </div>
            </div>
          </div>

          {/* Welcome Panel: WELCOME TO YOUR OWN CO */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Chào mừng nhân viên mới</h3>
            </div>

            <div className="p-4 space-y-6">
              {/* Omar Abbad */}
              <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4 pb-6 border-b border-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
                  alt="Omar Abbad"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-gray-100 shadow-sm"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline space-x-2">
                    <h4 className="text-sm font-bold text-gray-800">Omar Abbad</h4>
                    <span className="text-xs text-gray-500">Account Executive tại phòng Sales</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 flex items-center">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 mr-1" />
                    Lindon, Utah • Bắt đầu làm việc từ Thứ Hai, 28 Tháng 3
                  </p>

                  <div className="mt-2 space-y-1 text-xs">
                    <p className="text-gray-600">
                      <span className="font-semibold text-gray-700">Sinh ra tại:</span> San Diego, CA
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold text-gray-700">Đang sống tại:</span> New York City, NY
                    </p>
                  </div>

                  <button 
                    onClick={() => setExpandedWelcome(expandedWelcome === "omar" ? null : "omar")}
                    className="text-[10px] text-green-700 font-bold hover:underline mt-2 inline-flex items-center space-x-1"
                  >
                    <span>{expandedWelcome === "omar" ? "Thu gọn" : "Xem thêm về Omar"}</span>
                    <ChevronRight className={`w-3 h-3 transform transition-transform ${expandedWelcome === "omar" ? "rotate-90" : ""}`} />
                  </button>

                  {expandedWelcome === "omar" && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-md text-xs text-gray-600 border border-gray-100">
                      Omar thích du lịch bụi, chụp ảnh phong cảnh thiên nhiên và là một fan hâm mộ cuồng nhiệt của các môn thể thao mạo hiểm. Anh ấy rất mong muốn được làm quen và giao lưu cùng các đồng nghiệp tại phòng ban Sales và các phòng ban khác!
                    </div>
                  )}
                </div>
              </div>

              {/* Anna Lim */}
              <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
                  alt="Anna Lim"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-gray-100 shadow-sm"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline space-x-2">
                    <h4 className="text-sm font-bold text-gray-800">Anna Lim</h4>
                    <span className="text-xs text-gray-500">Giám đốc Vận hành Chăm sóc khách hàng</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 flex items-center">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 mr-1" />
                    New York, New York • Bắt đầu làm việc từ Thứ Tư, 9 Tháng 3
                  </p>

                  <div className="mt-2 space-y-1 text-xs">
                    <p className="text-gray-600">
                      <span className="font-semibold text-gray-700">Sở trường:</span> Tối ưu hóa quy trình CSKH và vận hành hệ thống đa quốc gia.
                    </p>
                  </div>

                  <button 
                    onClick={() => setExpandedWelcome(expandedWelcome === "anna" ? null : "anna")}
                    className="text-[10px] text-green-700 font-bold hover:underline mt-2 inline-flex items-center space-x-1"
                  >
                    <span>{expandedWelcome === "anna" ? "Thu gọn" : "Xem thêm về Anna"}</span>
                    <ChevronRight className={`w-3 h-3 transform transition-transform ${expandedWelcome === "anna" ? "rotate-90" : ""}`} />
                  </button>

                  {expandedWelcome === "anna" && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-md text-xs text-gray-600 border border-gray-100">
                      Anna từng có 5 năm làm việc tại Singapore để xây dựng trung tâm chăm sóc khách hàng quy mô lớn. Cô ấy thích đọc sách kỹ năng mềm, pha chế cà phê specialty và chạy bộ vào sáng sớm.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Announcements block */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-2 border-b border-gray-100 pb-2 mb-3">
              <Volume2 className="w-4 h-4 text-green-600" />
              <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Thông báo nội bộ mới</h3>
            </div>

            <div className="space-y-4">
              {announcements.map((item) => (
                <div key={item.id} className={`p-4 rounded-lg border transition ${
                  item.isImportant 
                    ? "border-l-4 border-l-[#1c7c24] bg-green-50/50 border-gray-200" 
                    : "border-gray-100 bg-white"
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-xs font-bold text-gray-800">{item.title}</h4>
                      {item.isImportant && (
                        <span className="bg-[#1c7c24] text-white text-[9px] font-bold px-1.5 py-0.2 rounded">QUAN TRỌNG</span>
                      )}
                    </div>
                    <span className="text-[10px] text-gray-400">{item.postedDate}</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.content}</p>
                  <p className="text-[10px] text-gray-400 mt-2 text-right">Người đăng: <span className="font-semibold">{item.author}</span></p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* REQUEST TIME OFF MODAL */}
      {showTimeOffModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-150">
            <div className="bamboo-header p-4 text-white flex justify-between items-center">
              <h3 className="text-md font-bold font-display flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Đơn yêu cầu nghỉ phép</span>
              </h3>
              <button 
                onClick={() => setShowTimeOffModal(false)}
                className="text-white/80 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleTimeOffSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">Loại Nghỉ Phép</label>
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value as any)}
                  className="block w-full border border-gray-300 rounded-md p-2 text-xs focus:ring-[#2d8a39] focus:border-[#2d8a39]"
                >
                  <option value="Vacation">Nghỉ Phép Năm (Vacation)</option>
                  <option value="Sick Leave">Nghỉ Phép Ốm (Sick Leave)</option>
                  <option value="Personal">Nghỉ Phép Việc Riêng (Personal)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">Từ Ngày</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="block w-full border border-gray-300 rounded-md p-2 text-xs focus:ring-[#2d8a39] focus:border-[#2d8a39]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">Đến Ngày</label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="block w-full border border-gray-300 rounded-md p-2 text-xs focus:ring-[#2d8a39] focus:border-[#2d8a39]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">Lý do / Ghi chú</label>
                <textarea
                  value={leaveNotes}
                  onChange={(e) => setLeaveNotes(e.target.value)}
                  placeholder="Ghi chú thêm về chuyến đi hoặc lý do xin nghỉ..."
                  rows={3}
                  className="block w-full border border-gray-300 rounded-md p-2 text-xs focus:ring-[#2d8a39] focus:border-[#2d8a39]"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowTimeOffModal(false)}
                  className="bg-white border border-gray-300 text-gray-700 text-xs font-bold py-2 px-4 rounded-md hover:bg-gray-50 transition"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="bg-[#1c7c24] hover:bg-green-700 text-white text-xs font-bold py-2 px-4 rounded-md shadow-sm transition"
                >
                  Nộp Đơn Phê Duyệt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
