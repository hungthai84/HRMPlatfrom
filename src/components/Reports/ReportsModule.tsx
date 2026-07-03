/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  BarChart, 
  PieChart, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar, 
  UserCheck, 
  ArrowRight,
  Download,
  Filter
} from "lucide-react";
import { Employee, JobPosting, Candidate, TimeOffRequest } from "../../types";

interface ReportsModuleProps {
  employees: Employee[];
  jobs: JobPosting[];
  candidates: Candidate[];
  timeOffRequests: TimeOffRequest[];
}

export default function ReportsModule({
  employees,
  jobs,
  candidates,
  timeOffRequests
}: ReportsModuleProps) {
  const [activeReportType, setActiveReportType] = useState<"Headcount" | "Compensation" | "TimeOff" | "Recruitment">("Headcount");

  // Calculate Headcount distribution by Department
  const depts = ["Engineering", "Design", "Sales", "Marketing", "Human Resources"];
  const deptColors = ["bg-[#1c7c24]", "bg-[#3b82f6]", "bg-[#f59e0b]", "bg-[#ec4899]", "bg-[#8b5cf6]"];
  const deptHexColors = ["#1c7c24", "#3b82f6", "#f59e0b", "#ec4899", "#8b5cf6"];

  const deptCounts = depts.map((dept) => {
    return employees.filter((e) => e.department === dept).length;
  });

  const totalEmployees = employees.length;

  // Calculate average salary by department
  const deptAverageSalary = depts.map((dept) => {
    const deptEmps = employees.filter((e) => e.department === dept);
    if (deptEmps.length === 0) return 0;
    const total = deptEmps.reduce((sum, e) => sum + (e.compensation?.salary || 0), 0);
    return Math.round(total / deptEmps.length);
  });

  // Calculate Hiring pipeline counts
  const stages = ["Applied", "Phone Screen", "Interviewing", "Offer", "Hired", "Declined"];
  const stageCounts = stages.map((stage) => {
    return candidates.filter((c) => c.stage === stage).length;
  });

  // Calculate Time off request counts by category
  const leaveTypes = ["Vacation", "Sick Leave", "Maternity", "Paternity", "Unpaid"];
  const leaveCounts = leaveTypes.map((type) => {
    return timeOffRequests.filter((r) => r.type === type).length;
  });

  // Custom SVG Donut Calculation for Headcount
  let cumulativePercent = 0;
  const getCoordinatesForPercent = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  return (
    <div id="reports-module" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Upper Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {(["Headcount", "Compensation", "TimeOff", "Recruitment"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveReportType(tab)}
              className={`flex-1 min-w-[130px] px-6 py-4 text-xs font-bold text-center whitespace-nowrap transition border-b-2 flex items-center justify-center space-x-2 ${
                activeReportType === tab
                  ? "text-[#1c7c24] border-[#1c7c24] bg-green-50/20"
                  : "text-gray-600 border-transparent hover:text-[#1c7c24] hover:bg-gray-50"
              }`}
            >
              {tab === "Headcount" && <Users className="w-4 h-4" />}
              {tab === "Compensation" && <DollarSign className="w-4 h-4" />}
              {tab === "TimeOff" && <Calendar className="w-4 h-4" />}
              {tab === "Recruitment" && <UserCheck className="w-4 h-4" />}
              <span>
                {tab === "Headcount" ? "Cơ Cấu Nhân Sự" : 
                 tab === "Compensation" ? "Phân Tích Lương" : 
                 tab === "TimeOff" ? "Nghỉ Phép Tuần" : "Hiệu Suất Tuyển Dụng"}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Report Container */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 space-y-6">
        
        {/* Title and Download CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-b pb-4 gap-4">
          <div>
            <h3 className="text-sm font-extrabold text-gray-800 font-display">
              {activeReportType === "Headcount" && "Báo cáo phân bổ quy mô nhân sự"}
              {activeReportType === "Compensation" && "Báo cáo quỹ lương phòng ban"}
              {activeReportType === "TimeOff" && "Thống kê tình hình nghỉ phép"}
              {activeReportType === "Recruitment" && "Báo cáo phễu chuyển đổi tuyển dụng"}
            </h3>
            <p className="text-[10px] text-gray-400 mt-1">Dữ liệu tổng hợp theo thời gian thực tại BambooHR HRM</p>
          </div>

          <button
            onClick={() => alert("Đang xuất báo cáo định dạng PDF chất lượng cao...")}
            className="w-full sm:w-auto bg-[#1c7c24] hover:bg-green-700 text-white text-xs font-bold py-2 px-4 rounded shadow flex items-center justify-center space-x-1.5 transition"
          >
            <Download className="w-4 h-4" />
            <span>Xuất Báo Cáo PDF</span>
          </button>
        </div>

        {/* REPORT CONTENT 1: HEADCOUNT */}
        {activeReportType === "Headcount" && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left: Donut chart visualization */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative w-52 h-52">
                {/* SVG Circular Donut Chart */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 42 42">
                  <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#f3f4f6" strokeWidth="4" />
                  
                  {deptCounts.map((count, index) => {
                    const percent = count / totalEmployees;
                    if (percent === 0) return null;
                    const strokeDasharray = `${percent * 100} ${100 - (percent * 100)}`;
                    const strokeDashoffset = 100 - cumulativePercent;
                    cumulativePercent += (percent * 100);

                    return (
                      <circle
                        key={index}
                        cx="21"
                        cy="21"
                        r="15.915"
                        fill="transparent"
                        stroke={deptHexColors[index]}
                        strokeWidth="4"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                      />
                    );
                  })}
                </svg>

                {/* Inner center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-white rounded-full m-10 shadow-inner">
                  <span className="text-2xl font-black text-gray-800">{totalEmployees}</span>
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Nhân sự</span>
                </div>
              </div>
            </div>

            {/* Right: Detailed department listings with percentage indicators */}
            <div className="md:col-span-7 space-y-4">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Phân rã theo phòng ban</h4>
              <div className="space-y-3">
                {depts.map((dept, idx) => {
                  const count = deptCounts[idx];
                  const percent = totalEmployees > 0 ? Math.round((count / totalEmployees) * 100) : 0;
                  return (
                    <div key={dept} className="space-y-1">
                      <div className="flex justify-between items-baseline text-xs">
                        <div className="flex items-center space-x-2">
                          <span className={`w-3 h-3 rounded-full ${deptColors[idx]}`}></span>
                          <span className="font-bold text-gray-700">{dept}</span>
                        </div>
                        <span className="font-semibold text-gray-500">{count} nhân sự ({percent}%)</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full">
                        <div className={`h-2 rounded-full ${deptColors[idx]}`} style={{ width: `${percent}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* REPORT CONTENT 2: COMPENSATION */}
        {activeReportType === "Compensation" && (
          <div className="space-y-6">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Bảng so sánh thu nhập bình quân hàng năm ($ USD)</h4>
            
            <div className="space-y-4">
              {depts.map((dept, idx) => {
                const avgSalary = deptAverageSalary[idx];
                const maxSalary = 160000; // Reference maximum
                const barWidth = avgSalary > 0 ? (avgSalary / maxSalary) * 100 : 0;

                return (
                  <div key={dept} className="grid grid-cols-1 sm:grid-cols-12 items-center gap-4 text-xs">
                    <span className="sm:col-span-3 font-bold text-gray-700">{dept}</span>
                    <div className="sm:col-span-7 bg-gray-100 h-6 rounded-md overflow-hidden relative flex items-center pl-3">
                      <div 
                        className="absolute left-0 top-0 bottom-0 bg-[#eef7ef] border-l-4 border-[#1c7c24] transition-all duration-300"
                        style={{ width: `${barWidth}%` }}
                      ></div>
                      <span className="relative font-bold text-[#1c7c24] z-10">${avgSalary.toLocaleString()} / năm</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* REPORT CONTENT 3: TIMEOFF */}
        {activeReportType === "TimeOff" && (
          <div className="space-y-6">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Tần suất nghỉ phép theo danh mục</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
              {leaveTypes.map((type, idx) => {
                const count = leaveCounts[idx];
                return (
                  <div key={type} className="bg-gray-50 p-4 rounded-lg text-center border space-y-1 text-xs shadow-xs">
                    <span className="font-bold text-gray-400 uppercase tracking-wider text-[9px]">{type}</span>
                    <p className="text-2xl font-black text-gray-800">{count}</p>
                    <p className="text-[10px] text-gray-400">Yêu cầu được thực hiện</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* REPORT CONTENT 4: RECRUITMENT */}
        {activeReportType === "Recruitment" && (
          <div className="space-y-6">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Hành trình phễu tuyển dụng ứng viên</h4>
            
            <div className="max-w-xl mx-auto space-y-3 text-xs">
              {stages.map((stage, idx) => {
                const count = stageCounts[idx];
                const maxCount = Math.max(...stageCounts) || 1;
                const percent = Math.round((count / maxCount) * 100);

                // Create a funnel-like centered representation
                return (
                  <div key={stage} className="flex items-center space-x-4">
                    <span className="w-24 font-bold text-gray-600 text-right">{stage}</span>
                    <div className="flex-1 flex justify-center">
                      <div 
                        className="bg-green-100 border-y border-green-300 text-green-800 py-1 px-3 rounded text-center font-bold font-mono transition-all duration-300"
                        style={{ width: `${Math.max(25, percent)}%` }}
                      >
                        {count} ứng viên
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
