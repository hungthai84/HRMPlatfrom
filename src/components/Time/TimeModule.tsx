/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Calendar, 
  Clock, 
  FileSpreadsheet, 
  MapPin, 
  Check, 
  X, 
  LogIn, 
  LogOut, 
  CalendarDays, 
  Plus, 
  Briefcase,
  AlertCircle
} from "lucide-react";
import { TimeOffRequest, AttendanceRecord, TimesheetWeek, ShiftSchedule, Employee } from "../../types";

interface TimeModuleProps {
  timeOffRequests: TimeOffRequest[];
  setTimeOffRequests: React.Dispatch<React.SetStateAction<TimeOffRequest[]>>;
  attendanceRecords: AttendanceRecord[];
  setAttendanceRecords: React.Dispatch<React.SetStateAction<AttendanceRecord[]>>;
  timesheetWeeks: TimesheetWeek[];
  setTimesheetWeeks: React.Dispatch<React.SetStateAction<TimesheetWeek[]>>;
  shiftSchedules: ShiftSchedule[];
  setShiftSchedules: React.Dispatch<React.SetStateAction<ShiftSchedule[]>>;
  currentUser: Employee;
  employees: Employee[];
}

export default function TimeModule({
  timeOffRequests,
  setTimeOffRequests,
  attendanceRecords,
  setAttendanceRecords,
  timesheetWeeks,
  setTimesheetWeeks,
  shiftSchedules,
  setShiftSchedules,
  currentUser,
  employees
}: TimeModuleProps) {
  const [activeSubTab, setActiveSubTab] = useState<"Time Off" | "Attendance" | "Timesheet" | "Schedule">("Time Off");

  // Clock in/out states
  const [clockedIn, setClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState<string | null>(null);

  // Form State - Add Shift
  const [showShiftModal, setShowShiftModal] = useState(false);
  const [shiftEmpId, setShiftEmpId] = useState(employees[0]?.id || "");
  const [shiftDate, setShiftDate] = useState("");
  const [shiftStart, setShiftStart] = useState("09:00 AM");
  const [shiftEnd, setShiftEnd] = useState("05:00 PM");

  // Approve / Deny Time Off Request
  const handleApproveTimeOff = (id: string, status: "Approved" | "Denied") => {
    setTimeOffRequests(timeOffRequests.map((req) => 
      req.id === id ? { ...req, status } : req
    ));
  };

  // Virtual Punch Clock
  const handleClockIn = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateStr = now.toISOString().split("T")[0];

    const newRecord: AttendanceRecord = {
      id: "ATT-" + Date.now(),
      employeeId: currentUser.id,
      employeeName: currentUser.fullName,
      date: dateStr,
      clockIn: timeStr,
      status: "Present",
      notes: "Chấm công trực tuyến"
    };

    setAttendanceRecords([newRecord, ...attendanceRecords]);
    setClockedIn(true);
    setClockInTime(timeStr);
  };

  const handleClockOut = () => {
    if (attendanceRecords.length === 0) return;

    // Find today's record for this user
    const todayStr = new Date().toISOString().split("T")[0];
    const recordToUpdate = attendanceRecords.find(
      r => r.employeeId === currentUser.id && r.date === todayStr && !r.clockOut
    );

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (recordToUpdate) {
      setAttendanceRecords(attendanceRecords.map((rec) => 
        rec.id === recordToUpdate.id 
          ? { ...rec, clockOut: timeStr } 
          : rec
      ));
    } else {
      // Update first item as fallback
      setAttendanceRecords(attendanceRecords.map((rec, i) => 
        (i === 0 && rec.employeeId === currentUser.id)
          ? { ...rec, clockOut: timeStr }
          : rec
      ));
    }

    setClockedIn(false);
    setClockInTime(null);
  };

  const handleAddShift = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shiftEmpId || !shiftDate) return;

    const matchedEmp = employees.find(e => e.id === shiftEmpId);
    const newShift: ShiftSchedule = {
      id: "S-" + Date.now(),
      employeeId: shiftEmpId,
      employeeName: matchedEmp ? matchedEmp.fullName : "Nhân viên",
      date: shiftDate,
      startTime: shiftStart,
      endTime: shiftEnd,
      department: matchedEmp ? matchedEmp.department : "Phòng ban"
    };

    setShiftSchedules([...shiftSchedules, newShift]);
    setShowShiftModal(false);
  };

  return (
    <div id="time-module" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Time Module Header Sub Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {(["Time Off", "Attendance", "Timesheet", "Schedule"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`flex-1 min-w-[120px] px-6 py-4 text-xs font-bold text-center whitespace-nowrap transition border-b-2 flex items-center justify-center space-x-2 ${
                activeSubTab === tab
                  ? "text-[#1c7c24] border-[#1c7c24] bg-green-50/20"
                  : "text-gray-600 border-transparent hover:text-[#1c7c24] hover:bg-gray-50"
              }`}
            >
              {tab === "Time Off" && <Calendar className="w-4 h-4" />}
              {tab === "Attendance" && <Clock className="w-4 h-4" />}
              {tab === "Timesheet" && <FileSpreadsheet className="w-4 h-4" />}
              {tab === "Schedule" && <CalendarDays className="w-4 h-4" />}
              <span>
                {tab === "Time Off" ? "Nghỉ Phép" : 
                 tab === "Attendance" ? "Chấm Công" : 
                 tab === "Timesheet" ? "Bảng Kê Giờ" : "Lịch Làm Việc Shift"}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* SUB-TAB 1: TIME OFF MANAGEMENT */}
      {activeSubTab === "Time Off" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Vacation balances */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs">
              <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider pb-3 border-b border-gray-100 mb-4">Quỹ phép của bạn</h3>
              
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-green-50 text-green-800 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="font-bold">Nghỉ Phép Năm (Vacation)</p>
                    <p className="text-[10px] text-green-600">Được tích lũy hàng tháng</p>
                  </div>
                  <span className="text-xl font-black">34 Hộp Giờ</span>
                </div>

                <div className="p-4 bg-blue-50 text-blue-800 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="font-bold">Nghỉ Phép Ốm (Sick Leave)</p>
                    <p className="text-[10px] text-blue-600">Phục hồi sức khỏe</p>
                  </div>
                  <span className="text-xl font-black">0 Hộp Giờ</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Time-off requests list */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs">
              <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider pb-3 border-b border-gray-100 mb-4">Các yêu cầu nghỉ phép cần duyệt</h3>

              <div className="space-y-4">
                {timeOffRequests.map((req) => (
                  <div key={req.id} className="p-4 border rounded-lg bg-gray-50/50 text-xs space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={req.employeePhoto}
                          alt={req.employeeName}
                          className="w-8 h-8 rounded-full object-cover border"
                        />
                        <div>
                          <h4 className="font-bold text-gray-800">{req.employeeName}</h4>
                          <p className="text-[10px] text-gray-500">Loại: <span className="font-bold">{req.type}</span> • Số ngày: {req.totalDays} ngày</p>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        req.status === "Pending" ? "bg-amber-100 text-amber-800 animate-pulse" :
                        req.status === "Approved" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}>
                        {req.status === "Pending" ? "Chờ duyệt" : req.status === "Approved" ? "Đã duyệt" : "Từ chối"}
                      </span>
                    </div>

                    {req.notes && (
                      <p className="text-gray-600 italic leading-relaxed bg-white border p-2 rounded">
                        "{req.notes}"
                      </p>
                    )}

                    <div className="flex justify-between items-center pt-2 text-[10px] text-gray-400">
                      <span>Thời gian nghỉ: {req.startDate} đến {req.endDate}</span>
                      
                      {req.status === "Pending" && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleApproveTimeOff(req.id, "Approved")}
                            className="bg-green-600 text-white font-bold px-2 py-1 rounded flex items-center space-x-0.5 hover:bg-green-700 transition"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Duyệt</span>
                          </button>
                          <button
                            onClick={() => handleApproveTimeOff(req.id, "Denied")}
                            className="bg-white border text-rose-600 font-bold px-2 py-1 rounded flex items-center space-x-0.5 hover:bg-rose-50 transition"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Từ chối</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* SUB-TAB 2: ATTENDANCE PUNCH PANEL */}
      {activeSubTab === "Attendance" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Virtual Clock Panel */}
          <div className="lg:col-span-5 bg-white p-6 rounded-lg border border-gray-200 shadow-xs flex flex-col justify-between items-center text-center">
            <div>
              <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Máy chấm công ảo (Punch Clock)</h3>
              <p className="text-[10px] text-gray-400 mb-6">Chạm để ghi nhận mốc thời gian vào/ra ca làm việc</p>
            </div>

            {/* Virtual clock face */}
            <div className="w-36 h-36 bg-gray-50 rounded-full border-4 border-gray-200 flex flex-col items-center justify-center mb-6 shadow-inner relative">
              <Clock className="w-6 h-6 text-gray-400 mb-1" />
              <span className="text-lg font-black text-gray-800">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Múi giờ UTC</span>
            </div>

            {/* Action Buttons */}
            <div className="w-full space-y-3">
              {!clockedIn ? (
                <button
                  id="btn-clock-in"
                  onClick={handleClockIn}
                  className="w-full bg-[#1c7c24] hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md shadow flex items-center justify-center space-x-2 transition"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Vào Ca (Clock In)</span>
                </button>
              ) : (
                <div className="space-y-3 w-full">
                  <div className="p-2.5 bg-green-50 border border-green-200 rounded text-xs text-green-800 font-semibold">
                    Đã vào ca lúc {clockInTime}
                  </div>
                  <button
                    id="btn-clock-out"
                    onClick={handleClockOut}
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-4 rounded-md shadow flex items-center justify-center space-x-2 transition"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Ra Ca (Clock Out)</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* History logs panel */}
          <div className="lg:col-span-7 bg-white p-5 rounded-lg border border-gray-200 shadow-xs">
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider pb-3 border-b border-gray-100 mb-4">Lịch sử chấm công gần đây</h3>

            <div className="divide-y divide-gray-100 max-h-[360px] overflow-y-auto">
              {attendanceRecords.map((rec) => (
                <div key={rec.id} className="py-2.5 flex justify-between items-center text-xs">
                  <div>
                    <h4 className="font-bold text-gray-800">{rec.employeeName}</h4>
                    <p className="text-[10px] text-gray-400">Ngày: {rec.date} • {rec.notes || "Kênh Web"}</p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <span className="text-green-700 font-bold block">Vào: {rec.clockIn || "--:--"}</span>
                      <span className="text-rose-600 font-bold block">Ra: {rec.clockOut || "--:--"}</span>
                    </div>
                    <span className="inline-block bg-green-100 text-green-800 font-bold text-[9px] px-2 py-0.5 rounded-full">
                      Present
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* SUB-TAB 3: TIMESHEET WEEKLY LOGS */}
      {activeSubTab === "Timesheet" && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs">
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-4">Bảng khai báo giờ làm việc hàng tuần (Timesheet)</h3>
            
            {timesheetWeeks.map((week) => (
              <div key={week.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50/50 mb-4 space-y-4 text-xs">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-bold text-gray-800">Tuần làm việc: Từ {week.weekStartDate}</span>
                  <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                    week.status === "Approved" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                  }`}>
                    {week.status === "Approved" ? "Đã duyệt" : "Chờ phê duyệt"}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-7 gap-2">
                  {week.dailyHours.map((d, idx) => (
                    <div key={idx} className="bg-white p-2 rounded border text-center">
                      <span className="font-bold text-gray-400 uppercase text-[9px]">{d.day}</span>
                      <p className="text-sm font-black text-gray-800 mt-1">{d.regularHours + d.overtimeHours}h</p>
                      <p className="text-[9px] text-gray-400">({d.regularHours}r + {d.overtimeHours}o)</p>
                    </div>
                  ))}
                </div>

                {week.status !== "Approved" && (
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => {
                        setTimesheetWeeks(timesheetWeeks.map(w => w.id === week.id ? { ...w, status: "Approved" } : w));
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-1.5 px-4 rounded text-xs transition"
                    >
                      Duyệt Bảng Công Tuần
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 4: SCHEDULE SHIFTS CALENDAR */}
      {activeSubTab === "Schedule" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Lịch phân ca làm việc (Shifts)</h3>
            <button
              id="btn-add-shift"
              onClick={() => setShowShiftModal(true)}
              className="bg-[#1c7c24] hover:bg-green-700 text-white text-xs font-bold py-2 px-4 rounded shadow flex items-center space-x-1.5 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Phân Ca Làm Việc</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {shiftSchedules.map((shift) => (
              <div key={shift.id} className="bg-white rounded-lg border border-gray-200 p-4 space-y-3 text-xs hover:border-green-600 transition shadow-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-gray-800">{shift.employeeName}</h4>
                    <p className="text-[10px] text-gray-500">{shift.department}</p>
                  </div>
                  <span className="bg-[#f0f9f1] text-[#1c7c24] text-[10px] font-bold px-2 py-0.5 rounded">
                    Ca Trực
                  </span>
                </div>

                <div className="bg-gray-50 p-2.5 rounded flex justify-between font-bold text-gray-700 text-[11px]">
                  <span>Giờ làm việc:</span>
                  <span className="text-[#1c7c24]">{shift.startTime} - {shift.endTime}</span>
                </div>

                <p className="text-[10px] text-gray-400 text-right font-medium">Lịch trực ngày: {shift.date}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SHIFT SCHEDULER MODAL */}
      {showShiftModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-150">
            <div className="bamboo-header p-4 text-white flex justify-between items-center">
              <h3 className="text-sm font-bold font-display flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Thiết lập ca làm việc mới</span>
              </h3>
              <button onClick={() => setShowShiftModal(false)} className="text-white hover:opacity-80">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddShift} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Nhân viên trực ca *</label>
                <select
                  value={shiftEmpId}
                  onChange={(e) => setShiftEmpId(e.target.value)}
                  className="block w-full border border-gray-300 rounded p-1.5 focus:ring-green-600 focus:border-green-600"
                >
                  <option value="">-- Chọn Nhân Viên --</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>{emp.fullName} ({emp.jobTitle})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Ngày làm việc *</label>
                <input
                  type="date"
                  required
                  value={shiftDate}
                  onChange={(e) => setShiftDate(e.target.value)}
                  className="block w-full border border-gray-300 rounded p-1.5 focus:ring-green-600 focus:border-green-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Giờ bắt đầu</label>
                  <input
                    type="text"
                    value={shiftStart}
                    onChange={(e) => setShiftStart(e.target.value)}
                    className="block w-full border border-gray-300 rounded p-1.5 focus:ring-green-600 focus:border-green-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Giờ kết thúc</label>
                  <input
                    type="text"
                    value={shiftEnd}
                    onChange={(e) => setShiftEnd(e.target.value)}
                    className="block w-full border border-gray-300 rounded p-1.5 focus:ring-green-600 focus:border-green-600"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowShiftModal(false)}
                  className="bg-white border text-gray-700 font-bold py-2 px-4 rounded hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="bg-[#1c7c24] text-white font-bold py-2 px-4 rounded shadow-sm hover:bg-green-700"
                >
                  Tạo Ca Làm Việc
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
