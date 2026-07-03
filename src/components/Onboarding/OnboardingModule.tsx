/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  CheckSquare, 
  Square, 
  Plus, 
  Trash2, 
  Users, 
  Clock, 
  FolderLock, 
  Laptop, 
  Award, 
  HelpCircle,
  X,
  AlertCircle
} from "lucide-react";
import { OnboardingTask, Employee } from "../../types";

interface OnboardingModuleProps {
  onboardingTasks: OnboardingTask[];
  setOnboardingTasks: React.Dispatch<React.SetStateAction<OnboardingTask[]>>;
  employees: Employee[];
}

export default function OnboardingModule({
  onboardingTasks,
  setOnboardingTasks,
  employees
}: OnboardingModuleProps) {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>("All");
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [taskTitle, setTaskTitle] = useState("");
  const [taskEmpId, setTaskEmpId] = useState(employees[0]?.id || "");
  const [taskCat, setTaskCat] = useState<OnboardingTask["category"]>("IT Setup");
  const [taskDate, setTaskDate] = useState("");
  const [taskDesc, setTaskDesc] = useState("");

  const handleToggleTask = (taskId: string) => {
    setOnboardingTasks(onboardingTasks.map((t) => 
      t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t
    ));
  };

  const handleDeleteTask = (taskId: string) => {
    if (confirm("Xóa nhiệm vụ onboarding này?")) {
      setOnboardingTasks(onboardingTasks.filter((t) => t.id !== taskId));
    }
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle || !taskEmpId) return;

    const matchedEmp = employees.find((emp) => emp.id === taskEmpId);
    const newTask: OnboardingTask = {
      id: "ONB-" + Date.now(),
      employeeId: taskEmpId,
      employeeName: matchedEmp ? matchedEmp.fullName : "Nhân viên",
      title: taskTitle,
      dueDate: taskDate || new Date().toISOString().split("T")[0],
      category: taskCat,
      isCompleted: false,
      description: taskDesc
    };

    setOnboardingTasks([...onboardingTasks, newTask]);
    setTaskTitle("");
    setTaskDesc("");
    setShowAddModal(false);
  };

  // Get list of employees who have onboarding tasks
  const onboardingEmployeeIds = Array.from(new Set(onboardingTasks.map((t) => t.employeeId)));
  const onboardingEmployees = employees.filter((emp) => onboardingEmployeeIds.includes(emp.id));

  // Filter tasks
  const filteredTasks = selectedEmployeeId === "All"
    ? onboardingTasks
    : onboardingTasks.filter((t) => t.employeeId === selectedEmployeeId);

  // Calculate stats for current filter
  const getProgressStats = (empId: string) => {
    const empTasks = onboardingTasks.filter((t) => t.employeeId === empId);
    const total = empTasks.length;
    const completed = empTasks.filter((t) => t.isCompleted).length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, percent };
  };

  const getCategoryIcon = (cat: OnboardingTask["category"]) => {
    switch (cat) {
      case "IT Setup": return <Laptop className="w-4 h-4 text-blue-500" />;
      case "HR Admin": return <FolderLock className="w-4 h-4 text-purple-500" />;
      case "Training": return <Award className="w-4 h-4 text-amber-500" />;
      case "Team Meet": return <Users className="w-4 h-4 text-green-500" />;
      default: return <HelpCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div id="onboarding-module" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Selection Filters & Add Action */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <span className="text-xs font-bold text-gray-500 uppercase shrink-0">Hồ sơ Onboarding của:</span>
          <select
            value={selectedEmployeeId}
            onChange={(e) => setSelectedEmployeeId(e.target.value)}
            className="border border-gray-300 rounded px-2.5 py-1.5 text-xs font-bold text-gray-700 focus:ring-[#2d8a39] focus:border-[#2d8a39] w-full sm:w-60"
          >
            <option value="All">Tất cả nhân viên mới</option>
            {onboardingEmployees.map((emp) => (
              <option key={emp.id} value={emp.id}>{emp.fullName} ({emp.jobTitle})</option>
            ))}
          </select>
        </div>

        <button
          id="btn-add-onboarding-task"
          onClick={() => setShowAddModal(true)}
          className="w-full sm:w-auto bg-[#1c7c24] hover:bg-green-700 text-white text-xs font-bold py-2 px-4 rounded shadow-sm flex items-center justify-center space-x-1.5 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Nhiệm Vụ Onboarding</span>
        </button>
      </div>

      {/* Overview Progress bar per selected scope */}
      {selectedEmployeeId !== "All" && (
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 space-y-3">
          {(() => {
            const stats = getProgressStats(selectedEmployeeId);
            const emp = employees.find(e => e.id === selectedEmployeeId);
            return (
              <>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-bold text-gray-800">Tiến độ gia nhập của {emp?.fullName}</h3>
                  <span className="text-xs font-bold text-green-700">{stats.completed}/{stats.total} việc đã xong ({stats.percent}%)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div
                    className="bg-[#1c7c24] h-3 rounded-full transition-all duration-300"
                    style={{ width: `${stats.percent}%` }}
                  ></div>
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* Task checklist listing */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden divide-y divide-gray-100">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div 
              key={task.id} 
              className={`p-4 flex items-start justify-between text-xs transition gap-4 ${
                task.isCompleted ? "bg-gray-50/50 opacity-75" : "bg-white"
              }`}
            >
              <div className="flex items-start space-x-3.5 min-w-0">
                <button
                  onClick={() => handleToggleTask(task.id)}
                  className="p-1 text-gray-400 hover:text-[#1c7c24] transition shrink-0 mt-0.5"
                  title={task.isCompleted ? "Đánh dấu chưa làm" : "Đánh dấu hoàn thành"}
                >
                  {task.isCompleted ? (
                    <CheckSquare className="w-5 h-5 text-[#1c7c24]" />
                  ) : (
                    <Square className="w-5 h-5" />
                  )}
                </button>

                <div className="min-w-0">
                  <div className="flex items-baseline space-x-2">
                    <h4 className={`font-bold text-sm ${task.isCompleted ? "line-through text-gray-400" : "text-gray-800"}`}>
                      {task.title}
                    </h4>
                    <span className="text-[10px] text-gray-400">({task.employeeName})</span>
                  </div>
                  {task.description && (
                    <p className="text-gray-500 mt-1 leading-relaxed">{task.description}</p>
                  )}
                  
                  <div className="flex items-center space-x-4 mt-2 text-[10px] text-gray-400 font-medium">
                    <span className="flex items-center space-x-1">
                      {getCategoryIcon(task.category)}
                      <span>{task.category}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Hạn chót: {task.dueDate}</span>
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDeleteTask(task.id)}
                className="text-gray-300 hover:text-rose-600 transition p-1 shrink-0"
                title="Xóa đầu việc"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-gray-400">
            Không có nhiệm vụ onboarding nào được ghi nhận.
          </div>
        )}
      </div>

      {/* ADD TASK MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-150">
            <div className="bamboo-header p-4 text-white flex justify-between items-center">
              <h3 className="text-sm font-bold font-display flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Tạo nhiệm vụ onboarding mới</span>
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-white hover:opacity-80">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddTask} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Tên đầu việc *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Ký thỏa thuận bảo mật NDA..."
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="block w-full border border-gray-300 rounded p-1.5 focus:ring-green-600 focus:border-green-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Giao cho nhân viên mới *</label>
                <select
                  value={taskEmpId}
                  onChange={(e) => setTaskEmpId(e.target.value)}
                  className="block w-full border border-gray-300 rounded p-1.5 focus:ring-green-600 focus:border-green-600"
                >
                  <option value="">-- Chọn nhân viên mới --</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>{emp.fullName} ({emp.jobTitle})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Phân mục</label>
                  <select
                    value={taskCat}
                    onChange={(e) => setTaskCat(e.target.value as any)}
                    className="block w-full border border-gray-300 rounded p-1.5 focus:ring-green-600 focus:border-green-600"
                  >
                    <option value="IT Setup">Cấp thiết bị & Tài khoản (IT Setup)</option>
                    <option value="HR Admin">Thủ tục nhân sự (HR Admin)</option>
                    <option value="Training">Đào tạo hội nhập (Training)</option>
                    <option value="Facilities">Cơ sở vật chất (Facilities)</option>
                    <option value="Team Meet">Gặp gỡ nội bộ (Team Meet)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Hạn hoàn thành *</label>
                  <input
                    type="date"
                    required
                    value={taskDate}
                    onChange={(e) => setTaskDate(e.target.value)}
                    className="block w-full border border-gray-300 rounded p-1.5 focus:ring-green-600 focus:border-green-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Mô tả cụ thể nhiệm vụ</label>
                <textarea
                  rows={3}
                  placeholder="Các bước hướng dẫn chi tiết..."
                  value={taskDesc}
                  onChange={(e) => setTaskDesc(e.target.value)}
                  className="block w-full border border-gray-300 rounded p-1.5 focus:ring-green-600 focus:border-green-600"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-white border text-gray-700 font-bold py-2 px-4 rounded hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="bg-[#1c7c24] text-white font-bold py-2 px-4 rounded shadow-sm hover:bg-green-700"
                >
                  Thêm Nhiệm Vụ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
