/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Award, 
  Target, 
  MessageSquare, 
  Users, 
  Plus, 
  TrendingUp, 
  CheckCircle2, 
  Heart, 
  Activity,
  Star
} from "lucide-react";
import { PerformanceGoal, PeerFeedback, Assessment, Employee } from "../../types";

interface PerformanceModuleProps {
  goals: PerformanceGoal[];
  feedbacks: PeerFeedback[];
  assessments: Assessment[];
  employees: Employee[];
}

export default function PerformanceModule({
  goals,
  feedbacks,
  assessments,
  employees
}: PerformanceModuleProps) {
  const [filterType, setFilterType] = useState<"All" | "Individual" | "Team" | "Company">("All");

  const filteredGoals = filterType === "All"
    ? goals
    : goals.filter((g) => g.category === filterType);

  const getEmployeeName = (id: string) => {
    return employees.find((e) => e.id === id)?.fullName || "Nhân viên";
  };

  const getEmployeePhoto = (id: string) => {
    return employees.find((e) => e.id === id)?.photoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100";
  };

  return (
    <div id="performance-module" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top statistics banners */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs flex items-center space-x-4">
          <div className="p-3 bg-green-100 rounded-full text-green-700">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Mục tiêu đang chạy</span>
            <h4 className="text-xl font-extrabold text-gray-800 font-display">{goals.filter(g => g.status === "In Progress").length} mục tiêu</h4>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs flex items-center space-x-4">
          <div className="p-3 bg-amber-100 rounded-full text-amber-700">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Ghi nhận phản hồi</span>
            <h4 className="text-xl font-extrabold text-gray-800 font-display">+{feedbacks.length} ý kiến</h4>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs flex items-center space-x-4">
          <div className="p-3 bg-blue-100 rounded-full text-blue-700">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Hoàn thành đánh giá</span>
            <h4 className="text-xl font-extrabold text-gray-800 font-display">
              {assessments.filter(a => a.status === "Completed").length}/{assessments.length} đợt
            </h4>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column: Goals Panel */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 shadow-xs p-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-gray-100 gap-3 mb-4">
              <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center space-x-1.5">
                <Target className="w-4 h-4 text-green-600" />
                <span>Theo dõi mục tiêu tổ chức</span>
              </h3>

              {/* Categories filters */}
              <div className="flex space-x-1">
                {(["All", "Individual", "Team", "Company"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`px-2.5 py-1 text-[10px] font-bold rounded-md transition ${
                      filterType === type
                        ? "bg-[#1c7c24] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {type === "All" ? "Tất cả" : type === "Individual" ? "Cá nhân" : type === "Team" ? "Đội nhóm" : "Công ty"}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filteredGoals.map((goal) => (
                <div key={goal.id} className="border border-gray-100 rounded-lg p-4 bg-gray-50/50 space-y-2 text-xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-gray-800">{goal.title}</h4>
                      <p className="text-[10px] text-gray-500">{goal.description}</p>
                    </div>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                      goal.category === "Company" ? "bg-purple-100 text-purple-800" :
                      goal.category === "Team" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                    }`}>
                      {goal.category}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="flex items-center space-x-3 pt-1">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                    <span className="font-bold text-gray-700">{goal.progress}%</span>
                  </div>

                  <div className="flex justify-between items-center text-[10px] text-gray-400 pt-1">
                    <span>Giao cho: <span className="font-semibold text-gray-600">{getEmployeeName(goal.employeeId)}</span></span>
                    <span>Hạn chót: {goal.targetDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Kudos Feed & Review cycles */}
        <div className="lg:col-span-5 space-y-6">
          {/* Kudos Feedback Stream */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-xs">
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider pb-3 border-b border-gray-100 mb-4 flex items-center space-x-1.5">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>Bảng Vinh Danh Đồng Nghiệp</span>
            </h3>

            <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
              {feedbacks.map((fb) => (
                <div key={fb.id} className="p-3 border border-gray-100 rounded-lg bg-gray-50/50 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <img
                        src={getEmployeePhoto(fb.toEmployeeId)}
                        alt={fb.toEmployeeName}
                        className="w-6 h-6 rounded-full object-cover border border-gray-200"
                      />
                      <span className="font-bold text-gray-800">{fb.toEmployeeName}</span>
                    </div>
                    <span className="text-[10px] text-gray-400">{fb.date}</span>
                  </div>
                  <p className="text-gray-600 italic">"{fb.content}"</p>
                  <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1">
                    <span>Gửi bởi: <span className="font-semibold">{fb.fromEmployeeName}</span></span>
                    <div className="flex text-amber-500">
                      {Array.from({ length: fb.rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Review Cycles progress */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-xs">
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider pb-3 border-b border-gray-100 mb-4 flex items-center space-x-1.5">
              <Activity className="w-4 h-4 text-blue-600" />
              <span>Tiến Độ Chu Kỳ Đánh Giá</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-bold text-gray-700 mb-1">
                  <span>Đánh giá Thử việc 2026</span>
                  <span>100% Hoàn thành</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: "100%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-gray-700 mb-1">
                  <span>Đánh giá Giữa năm Q2</span>
                  <span>45% Hoàn thành</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "45%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
