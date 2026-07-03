/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Search, 
  UserPlus, 
  Filter, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  User, 
  Briefcase, 
  ShieldCheck, 
  DollarSign, 
  HeartHandshake, 
  FileText, 
  Activity, 
  CheckCircle, 
  X, 
  Award, 
  Plus, 
  Trash2, 
  Edit3, 
  Upload, 
  ArrowLeft,
  Settings,
  ChevronDown,
  Lock
} from "lucide-react";
import { Employee, TimeOffRequest, OnboardingTask, PerformanceGoal, PeerFeedback, Assessment } from "../../types";

interface EmployeeDirectoryProps {
  employees: Employee[];
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
  selectedEmployee: Employee | null;
  setSelectedEmployee: (emp: Employee | null) => void;
  goals: PerformanceGoal[];
  setGoals: React.Dispatch<React.SetStateAction<PerformanceGoal[]>>;
  feedbacks: PeerFeedback[];
  setFeedbacks: React.Dispatch<React.SetStateAction<PeerFeedback[]>>;
  assessments: Assessment[];
  setAssessments: React.Dispatch<React.SetStateAction<Assessment[]>>;
}

export default function EmployeeDirectory({
  employees,
  setEmployees,
  selectedEmployee,
  setSelectedEmployee,
  goals,
  setGoals,
  feedbacks,
  setFeedbacks,
  assessments,
  setAssessments
}: EmployeeDirectoryProps) {
  // Navigation inside Employee Detail
  const [profileTab, setProfileTab] = useState<"Personal" | "Job" | "Documents" | "Compensation" | "Benefits" | "Performance">("Personal");
  const [perfSubTab, setPerfSubTab] = useState<"Goals" | "Feedback" | "Assessment">("Goals");

  // Filter state for directory
  const [searchTerm, setSearchTerm] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");

  // Modals / Slide-overs state
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Forms state
  const [newEmp, setNewEmp] = useState({
    fullName: "",
    nickName: "",
    jobTitle: "",
    department: "Human Resources",
    email: "",
    phone: "",
    hireDate: new Date().toISOString().split("T")[0],
    location: "Lindon, Utah",
    employmentType: "Full-Time" as "Full-Time" | "Part-Time" | "Contract" | "Internship",
    salary: 60000,
    frequency: "Yearly" as "Yearly" | "Hourly" | "Monthly",
    managerName: "Jenn Caldwell",
    workEligibility: "US Citizen",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250",
    division: "North America",
    payType: "Salary",
    flsaStatus: "Exempt"
  });

  // Goal Creation State
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [newGoalDesc, setNewGoalDesc] = useState("");
  const [newGoalTarget, setNewGoalTarget] = useState("");
  const [newGoalCat, setNewGoalCat] = useState<"Individual" | "Team" | "Company">("Individual");

  // Feedback State
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackContent, setFeedbackContent] = useState("");
  const [feedbackRating, setFeedbackRating] = useState(5);

  // Impromptu Assessment State
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [selfScore, setSelfScore] = useState(5);
  const [selfComments, setSelfComments] = useState("");

  // Document uploader state
  const [dragActive, setDragActive] = useState(false);
  const [uploadedDocName, setUploadedDocName] = useState("");

  const departments = ["All", ...Array.from(new Set(employees.map((e) => e.department)))];
  const locations = ["All", ...Array.from(new Set(employees.map((e) => e.location)))];

  // Filtered listing
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = emp.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          emp.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          emp.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = deptFilter === "All" || emp.department === deptFilter;
    const matchesLoc = locationFilter === "All" || emp.location === locationFilter;
    return matchesSearch && matchesDept && matchesLoc;
  });

  const calculateHireDuration = (dateStr: string) => {
    const hireDate = new Date(dateStr);
    const now = new Date();
    let years = now.getFullYear() - hireDate.getFullYear();
    let months = now.getMonth() - hireDate.getMonth();
    let days = now.getDate() - hireDate.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    return `${years}y - ${months}m - ${days}d`;
  };

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    const newEmpId = "EMP-0" + (employees.length + 1);
    const added: Employee = {
      id: newEmpId,
      fullName: newEmp.fullName,
      nickName: newEmp.nickName || undefined,
      jobTitle: newEmp.jobTitle,
      department: newEmp.department,
      email: newEmp.email,
      phone: newEmp.phone,
      photoUrl: newEmp.photoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
      hireDate: newEmp.hireDate,
      location: newEmp.location,
      employmentType: newEmp.employmentType,
      status: "Active",
      managerName: newEmp.managerName,
      directReportsCount: 0,
      workEligibility: newEmp.workEligibility,
      compensation: {
        salary: Number(newEmp.salary),
        frequency: newEmp.frequency,
        currency: "USD",
        effectiveDate: newEmp.hireDate,
        bonusPercent: 5,
        payGrade: "P1"
      },
      benefits: [
        { id: "BEN-AD-" + Date.now(), name: "Standard HMO Healthcare", provider: "Blue Cross", costPerMonth: 500, employeeContribution: 80, startDate: newEmp.hireDate, status: "Enrolled" }
      ],
      documents: [
        { id: "DOC-AD-1", name: "I-9 Form Verification", category: "Tax", uploadedDate: newEmp.hireDate, status: "Pending Signature", fileSize: "1.5 MB" }
      ],
      jobDetails: {
        division: newEmp.division,
        reportsTo: newEmp.managerName + ", Director",
        jobDescription: "Description to be configured.",
        payType: newEmp.payType,
        flsaStatus: newEmp.flsaStatus
      }
    };

    setEmployees([...employees, added]);
    setShowAddModal(false);
    setSelectedEmployee(added); // Jump directly to detail
  };

  const handleDeleteEmployee = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa nhân viên này khỏi hệ thống?")) {
      setEmployees(employees.filter((emp) => emp.id !== id));
      setSelectedEmployee(null);
    }
  };

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmployee || !newGoalTitle) return;

    const newGoal: PerformanceGoal = {
      id: "G-" + Date.now(),
      employeeId: selectedEmployee.id,
      title: newGoalTitle,
      description: newGoalDesc,
      targetDate: newGoalTarget || "2026-12-31",
      progress: 0,
      status: "Not Started",
      category: newGoalCat
    };

    setGoals([...goals, newGoal]);
    setNewGoalTitle("");
    setNewGoalDesc("");
    setNewGoalTarget("");
    setShowGoalModal(false);
  };

  const handleCreateFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmployee || !feedbackContent) return;

    const newFB: PeerFeedback = {
      id: "FB-" + Date.now(),
      fromEmployeeId: "EMP-001", // Matt Vargas
      fromEmployeeName: "Matt Vargas",
      toEmployeeId: selectedEmployee.id,
      toEmployeeName: selectedEmployee.fullName,
      content: feedbackContent,
      date: new Date().toISOString().split("T")[0],
      rating: feedbackRating
    };

    setFeedbacks([...feedbacks, newFB]);
    setFeedbackContent("");
    setShowFeedbackModal(false);
  };

  const handleCreateAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmployee) return;

    const newAssess: Assessment = {
      id: "AS-" + Date.now(),
      employeeId: selectedEmployee.id,
      period: "Impromptu Assessment 2026",
      status: "Completed",
      selfScore: selfScore,
      managerScore: 4.5,
      selfComments: selfComments,
      managerComments: "Assessment initialized spontaneously via prompt. Standard solid performance."
    };

    setAssessments([newAssess, ...assessments]);
    setSelfComments("");
    setShowAssessmentModal(false);
  };

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setUploadedDocName(file.name);
      // Simulate adding document to selected employee
      if (selectedEmployee) {
        const updatedDocs = [
          ...selectedEmployee.documents,
          {
            id: "DOC-" + Date.now(),
            name: file.name,
            category: "Other" as any,
            uploadedDate: new Date().toISOString().split("T")[0],
            status: "Pending Signature" as any,
            fileSize: (file.size / (1024 * 1024)).toFixed(1) + " MB"
          }
        ];
        
        const updatedEmployees = employees.map((emp) => 
          emp.id === selectedEmployee.id 
            ? { ...emp, documents: updatedDocs }
            : emp
        );
        setEmployees(updatedEmployees);
        setSelectedEmployee({ ...selectedEmployee, documents: updatedDocs });
      }
    }
  };

  return (
    <div id="employee-directory-tab" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {!selectedEmployee ? (
        /* ================= DIRECTORY LISTING STATE ================= */
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1 flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên, chức danh, mã..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 w-full border border-gray-300 rounded-md text-xs focus:ring-[#2d8a39] focus:border-[#2d8a39]"
                />
              </div>

              {/* Department Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="w-3.5 h-3.5 text-gray-400" />
                <select
                  value={deptFilter}
                  onChange={(e) => setDeptFilter(e.target.value)}
                  className="border border-gray-300 rounded-md p-1.5 text-xs focus:ring-[#2d8a39] focus:border-[#2d8a39]"
                >
                  <option value="All">Tất cả Phòng Ban</option>
                  {departments.filter(d => d !== "All").map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="border border-gray-300 rounded-md p-1.5 text-xs focus:ring-[#2d8a39] focus:border-[#2d8a39]"
              >
                <option value="All">Tất cả Văn Phòng</option>
                {locations.filter(l => l !== "All").map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>

            {/* Actions */}
            <button
              id="btn-add-employee"
              onClick={() => setShowAddModal(true)}
              className="bg-[#1c7c24] hover:bg-green-700 text-white text-xs font-bold py-2 px-4 rounded-md shadow-sm flex items-center space-x-1.5 shrink-0 justify-center transition"
            >
              <UserPlus className="w-4 h-4" />
              <span>Thêm Nhân Viên</span>
            </button>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmployees.map((emp) => (
              <div
                key={emp.id}
                onClick={() => {
                  setSelectedEmployee(emp);
                  setProfileTab("Personal");
                }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:border-green-600 hover:shadow-md transition duration-150 cursor-pointer overflow-hidden flex flex-col"
              >
                {/* Upper card colored band */}
                <div className="h-2 bg-[#1c7c24]"></div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="flex items-start space-x-4">
                    <img
                      src={emp.photoUrl}
                      alt={emp.fullName}
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-100 shadow-xs shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-bold text-gray-800 truncate">{emp.fullName}</h4>
                      <p className="text-xs text-gray-500 font-medium truncate mt-0.5">{emp.jobTitle}</p>
                      <p className="text-[11px] bg-green-50 text-green-700 font-semibold px-2 py-0.5 rounded-full inline-block mt-1">
                        {emp.department}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-2 border-t border-gray-100 pt-4 text-[11px] text-gray-500">
                    <p className="flex items-center space-x-2">
                      <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span className="truncate">{emp.email}</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span>{emp.phone}</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span className="truncate">{emp.location}</span>
                    </p>
                  </div>
                </div>

                {/* Footer bar */}
                <div className="bg-gray-50 px-5 py-2.5 border-t border-gray-100 flex justify-between items-center text-[10px] text-gray-400">
                  <span>Mã số: {emp.id}</span>
                  <span className="font-semibold text-gray-500">Ký hợp đồng: {emp.hireDate}</span>
                </div>
              </div>
            ))}
          </div>

          {filteredEmployees.length === 0 && (
            <div className="bg-white text-center p-12 rounded-lg border border-gray-200 text-gray-400">
              Không có nhân viên nào phù hợp với bộ lọc tìm kiếm.
            </div>
          )}
        </div>
      ) : (
        /* ================= DETAILED PROFILE VIEW STATE ================= */
        <div className="space-y-6">
          {/* Back button and profile header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <button
              onClick={() => setSelectedEmployee(null)}
              className="inline-flex items-center space-x-1 text-xs text-gray-600 hover:text-green-700 font-bold transition self-start"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại Danh sách</span>
            </button>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold py-1.5 px-3 rounded flex items-center space-x-1"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Yêu Cầu Thay Đổi</span>
              </button>
              <button
                onClick={() => handleDeleteEmployee(selectedEmployee.id)}
                className="bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 text-xs font-bold py-1.5 px-3 rounded flex items-center space-x-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Xóa Nhân Viên</span>
              </button>
            </div>
          </div>

          {/* Profile Header Band */}
          <div className="bg-gradient-to-r from-green-800 to-green-700 rounded-lg shadow-sm p-6 text-white flex flex-col md:flex-row items-center md:items-start md:space-x-6">
            <img
              src={selectedEmployee.photoUrl}
              alt={selectedEmployee.fullName}
              className="w-24 h-24 rounded-full object-cover border-4 border-white/20 shadow-md shrink-0 mb-4 md:mb-0"
            />
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-baseline md:space-x-3">
                <h2 className="text-xl md:text-2xl font-extrabold font-display">{selectedEmployee.fullName}</h2>
                {selectedEmployee.nickName && (
                  <span className="text-sm font-medium text-green-100">({selectedEmployee.nickName})</span>
                )}
              </div>
              <p className="text-sm font-semibold text-green-100 mt-1">{selectedEmployee.jobTitle}</p>
              <p className="text-xs text-green-200 mt-0.5">{selectedEmployee.department} • {selectedEmployee.location}</p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 text-xs font-medium text-green-100">
                <span className="bg-white/10 px-2.5 py-1 rounded-full">{selectedEmployee.employmentType}</span>
                <span className="bg-white/10 px-2.5 py-1 rounded-full">Trạng thái: Active</span>
              </div>
            </div>
          </div>

          {/* Layout Structure: Left Column details, Right Core Tabs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* LEFT PROFILE SIDEBAR CARD */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 space-y-4 text-xs text-gray-600">
                <div className="flex items-center space-x-3 border-b border-gray-100 pb-3 mb-2">
                  <User className="w-4 h-4 text-gray-400 shrink-0" />
                  <span className="font-bold text-gray-800 text-sm uppercase tracking-wider">Thông Tin Tóm Tắt</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                    <span>{selectedEmployee.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="truncate">{selectedEmployee.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                    <span>{selectedEmployee.location}</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-semibold uppercase tracking-wide text-[10px]">Ngày tuyển dụng:</span>
                    <span className="font-bold text-gray-800">{selectedEmployee.hireDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-semibold uppercase tracking-wide text-[10px]">Thời gian làm việc:</span>
                    <span className="font-bold text-gray-800">{calculateHireDuration(selectedEmployee.hireDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-semibold uppercase tracking-wide text-[10px]">Mã số:</span>
                    <span className="font-bold text-gray-800">#{selectedEmployee.id}</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 font-semibold uppercase tracking-wide text-[10px]">Quản lý:</span>
                    <span className="font-bold text-[#1c7c24]">{selectedEmployee.managerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-semibold uppercase tracking-wide text-[10px]">Báo cáo trực tiếp:</span>
                    <span className="font-bold text-gray-800">{selectedEmployee.directReportsCount} nhân viên</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT PROFILE CORE TABS PANEL */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Profile tabs nav bar */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="flex border-b border-gray-200 overflow-x-auto">
                  {(["Personal", "Job", "Documents", "Compensation", "Benefits", "Performance"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setProfileTab(tab)}
                      className={`px-4 py-3 text-xs font-bold whitespace-nowrap transition border-b-2 ${
                        profileTab === tab
                          ? "text-[#1c7c24] border-[#1c7c24] bg-green-50/20"
                          : "text-gray-600 border-transparent hover:text-[#1c7c24] hover:bg-gray-50"
                      }`}
                    >
                      {tab === "Personal" ? "Cá Nhân" : 
                       tab === "Job" ? "Công Việc" : 
                       tab === "Documents" ? "Tài Liệu" : 
                       tab === "Compensation" ? "Lương Thưởng" : 
                       tab === "Benefits" ? "Phúc Lợi" : "Đánh Giá"}
                    </button>
                  ))}
                </div>

                {/* Tab content display */}
                <div className="p-6">
                  
                  {/* TAB 1: PERSONAL DETAILS */}
                  {profileTab === "Personal" && (
                    <div className="space-y-6">
                      <h3 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-2">Thông tin cá nhân</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-600">
                        <div>
                          <p className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">Họ và Tên khai sinh</p>
                          <p className="text-sm font-bold text-gray-800 mt-1">{selectedEmployee.fullName}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">Biệt danh / Gọi tên</p>
                          <p className="text-sm font-bold text-gray-800 mt-1">{selectedEmployee.nickName || "Không có"}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">Điện thoại cá nhân</p>
                          <p className="text-sm font-bold text-gray-800 mt-1">{selectedEmployee.phone}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">Email liên hệ</p>
                          <p className="text-sm font-bold text-gray-800 mt-1">{selectedEmployee.email}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">Nơi sinh</p>
                          <p className="text-sm font-bold text-gray-800 mt-1">San Francisco, CA</p>
                        </div>
                        <div>
                          <p className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">Quyền công dân / Làm việc</p>
                          <p className="text-sm font-bold text-gray-800 mt-1">{selectedEmployee.workEligibility || "Đang xác thực"}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: JOB DETAILS */}
                  {profileTab === "Job" && (
                    <div className="space-y-6">
                      <h3 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-2">Sơ đồ tổ chức & Chức năng</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-600">
                        <div>
                          <p className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">Chức vụ</p>
                          <p className="text-sm font-bold text-gray-800 mt-1">{selectedEmployee.jobTitle}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">Phòng ban</p>
                          <p className="text-sm font-bold text-gray-800 mt-1">{selectedEmployee.department}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">Phân nhánh (Division)</p>
                          <p className="text-sm font-bold text-gray-800 mt-1">{selectedEmployee.jobDetails?.division || "Global"}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">Báo cáo cho</p>
                          <p className="text-sm font-bold text-gray-800 mt-1">{selectedEmployee.managerName}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">Hình thức làm việc</p>
                          <p className="text-sm font-bold text-gray-800 mt-1">{selectedEmployee.employmentType}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">Quy chế (FLSA Status)</p>
                          <p className="text-sm font-bold text-gray-800 mt-1">{selectedEmployee.jobDetails?.flsaStatus || "Exempt"}</p>
                        </div>
                      </div>
                      <div className="pt-4">
                        <p className="text-gray-400 font-bold uppercase tracking-wider text-[9px] mb-1">Mô tả công việc</p>
                        <p className="text-xs text-gray-600 leading-relaxed border p-3 rounded bg-gray-50">
                          {selectedEmployee.jobDetails?.jobDescription || "Đảm nhận thiết lập và vận hành các đầu việc kỹ thuật cốt lõi theo đúng thỏa thuận hợp đồng."}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: DOCUMENTS */}
                  {profileTab === "Documents" && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <h3 className="text-sm font-bold text-gray-800">Bộ hồ sơ tài liệu nhân viên</h3>
                        <span className="text-xs text-gray-500">Đã lưu trữ {selectedEmployee.documents?.length || 0} tài liệu</span>
                      </div>

                      {/* Drag and Drop Zone */}
                      <div
                        onDragEnter={handleDrag}
                        onDragOver={handleDrag}
                        onDragLeave={handleDrag}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-lg p-6 text-center transition flex flex-col items-center justify-center cursor-pointer ${
                          dragActive 
                            ? "border-[#1c7c24] bg-green-50/20" 
                            : "border-gray-300 hover:border-[#1c7c24] bg-gray-50"
                        }`}
                      >
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-xs font-semibold text-gray-700">Kéo thả tệp tin ở đây hoặc bấm để chọn tệp</p>
                        <p className="text-[10px] text-gray-400 mt-1">Định dạng hỗ trợ: PDF, Doc, PNG, JPG (Tối đa 10MB)</p>
                        <input
                          type="file"
                          id="file-upload-hidden"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              const file = e.target.files[0];
                              setUploadedDocName(file.name);
                              const updatedDocs = [
                                ...selectedEmployee.documents,
                                {
                                  id: "DOC-" + Date.now(),
                                  name: file.name,
                                  category: "Other" as any,
                                  uploadedDate: new Date().toISOString().split("T")[0],
                                  status: "Pending Signature" as any,
                                  fileSize: (file.size / (1024 * 1024)).toFixed(1) + " MB"
                                }
                              ];
                              setEmployees(employees.map(emp => emp.id === selectedEmployee.id ? { ...emp, documents: updatedDocs } : emp));
                              setSelectedEmployee({ ...selectedEmployee, documents: updatedDocs });
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => document.getElementById("file-upload-hidden")?.click()}
                          className="mt-3 bg-white border border-gray-300 text-gray-700 text-[10px] font-bold py-1 px-3 rounded shadow-xs hover:bg-gray-100"
                        >
                          Chọn Tệp Tin
                        </button>
                      </div>

                      {/* Documents Checklist */}
                      <div className="divide-y divide-gray-100 border rounded-lg bg-white overflow-hidden">
                        {selectedEmployee.documents?.map((doc) => (
                          <div key={doc.id} className="p-3.5 flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-3 min-w-0">
                              <FileText className="w-5 h-5 text-gray-400 shrink-0" />
                              <div className="min-w-0">
                                <h4 className="font-bold text-gray-800 truncate">{doc.name}</h4>
                                <p className="text-[10px] text-gray-400">Danh mục: {doc.category} • {doc.fileSize} • Upload ngày {doc.uploadedDate}</p>
                              </div>
                            </div>
                            <div>
                              <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded ${
                                doc.status === "Signed" 
                                  ? "bg-green-100 text-green-800" 
                                  : doc.status === "Pending Signature" 
                                  ? "bg-amber-100 text-amber-800 animate-pulse" 
                                  : "bg-gray-100 text-gray-800"
                              }`}>
                                {doc.status === "Signed" ? "Đã Ký Duyệt" : "Chờ Chữ Ký"}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 4: COMPENSATION */}
                  {profileTab === "Compensation" && (
                    <div className="space-y-6">
                      <h3 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-2">Bảng lương & Chế độ đãi ngộ</h3>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 flex flex-col md:flex-row items-center justify-between">
                        <div className="flex items-center space-x-4 mb-4 md:mb-0">
                          <div className="p-3 bg-green-100 rounded-full text-[#1c7c24]">
                            <DollarSign className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Mức lương cơ sở hiện tại</p>
                            <h4 className="text-xl font-black text-gray-800 font-display">
                              ${selectedEmployee.compensation?.salary.toLocaleString()}
                              <span className="text-xs font-medium text-gray-500"> / {selectedEmployee.compensation?.frequency}</span>
                            </h4>
                          </div>
                        </div>

                        <div className="space-y-2 text-xs text-right w-full md:w-auto">
                          <p className="text-gray-600"><span className="font-bold">Đồng tiền:</span> {selectedEmployee.compensation?.currency || "USD"}</p>
                          <p className="text-gray-600"><span className="font-bold">Hiệu lực từ:</span> {selectedEmployee.compensation?.effectiveDate}</p>
                          <p className="text-gray-600"><span className="font-bold">Tỷ lệ thưởng KPI:</span> {selectedEmployee.compensation?.bonusPercent || 0}%</p>
                        </div>
                      </div>

                      {/* Pay History Log */}
                      <div>
                        <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">Lịch sử tăng lương & Điều chỉnh</h4>
                        <div className="divide-y border rounded bg-white overflow-hidden text-xs">
                          <div className="p-3 bg-gray-50 font-bold grid grid-cols-3">
                            <span>Ngày hiệu lực</span>
                            <span>Mức lương cũ/mới</span>
                            <span>Lý do điều chỉnh</span>
                          </div>
                          <div className="p-3 grid grid-cols-3">
                            <span>{selectedEmployee.compensation?.effectiveDate}</span>
                            <span className="font-bold">${selectedEmployee.compensation?.salary.toLocaleString()}</span>
                            <span className="text-gray-500">Ký hợp đồng ban đầu</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 5: BENEFITS */}
                  {profileTab === "Benefits" && (
                    <div className="space-y-6">
                      <h3 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-2">Phúc lợi xã hội & Bảo hiểm</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedEmployee.benefits?.length > 0 ? (
                          selectedEmployee.benefits.map((ben) => (
                            <div key={ben.id} className="border border-gray-200 rounded-lg p-4 bg-white flex flex-col justify-between">
                              <div>
                                <div className="flex justify-between items-start">
                                  <h4 className="text-xs font-bold text-gray-800">{ben.name}</h4>
                                  <span className="bg-green-100 text-green-800 text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                                    Enrolled
                                  </span>
                                </div>
                                <p className="text-[10px] text-gray-400 mt-1">Đơn vị cấp: {ben.provider}</p>
                              </div>

                              <div className="mt-4 pt-4 border-t border-gray-50 grid grid-cols-2 text-[10px]">
                                <div>
                                  <span className="text-gray-400 uppercase font-bold">Công ty đóng:</span>
                                  <p className="font-bold text-gray-700 mt-0.5">${ben.costPerMonth - ben.employeeContribution}/tháng</p>
                                </div>
                                <div>
                                  <span className="text-gray-400 uppercase font-bold">Cá nhân đóng:</span>
                                  <p className="font-bold text-gray-700 mt-0.5">${ben.employeeContribution}/tháng</p>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="col-span-2 text-center p-6 border rounded bg-gray-50 text-gray-400 text-xs">
                            Chưa đăng ký bảo hiểm tự nguyện nào hoặc thông tin chưa cập nhật.
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* TAB 6: PERFORMANCE / ASSESSMENTS */}
                  {profileTab === "Performance" && (
                    <div className="space-y-6">
                      {/* Performance Sub Tabs Navigation */}
                      <div className="flex space-x-1 border-b border-gray-200">
                        {(["Goals", "Feedback", "Assessment"] as const).map((sub) => (
                          <button
                            key={sub}
                            onClick={() => setPerfSubTab(sub)}
                            className={`px-3 py-2 text-xs font-bold transition border-b-2 ${
                              perfSubTab === sub
                                ? "text-green-700 border-green-700"
                                : "text-gray-500 border-transparent hover:text-green-700"
                            }`}
                          >
                            {sub === "Goals" ? "Mục Tiêu Cá Nhân" : sub === "Feedback" ? "Phản Hồi Đồng Nghiệp" : "Phiếu Đánh Giá"}
                          </button>
                        ))}
                      </div>

                      {/* SUB TAB 1: GOALS */}
                      {perfSubTab === "Goals" && (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Mục tiêu hiện tại</h4>
                            <button
                              id="btn-add-goal"
                              onClick={() => setShowGoalModal(true)}
                              className="bg-[#1c7c24] text-white text-[10px] font-bold py-1.5 px-3 rounded flex items-center space-x-1"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Thêm Mục Tiêu</span>
                            </button>
                          </div>

                          <div className="space-y-3">
                            {goals.filter(g => g.employeeId === selectedEmployee.id).map((goal) => (
                              <div key={goal.id} className="border border-gray-200 rounded-lg p-4 bg-white space-y-2">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h5 className="text-xs font-bold text-gray-800">{goal.title}</h5>
                                    <p className="text-[10px] text-gray-500">{goal.description}</p>
                                  </div>
                                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                                    goal.status === "Completed" 
                                      ? "bg-green-100 text-green-800" 
                                      : goal.status === "In Progress" 
                                      ? "bg-amber-100 text-amber-800" 
                                      : "bg-gray-100 text-gray-800"
                                  }`}>
                                    {goal.status}
                                  </span>
                                </div>

                                <div className="flex items-center space-x-3 pt-2">
                                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                                    <div
                                      className="bg-green-600 h-2 rounded-full"
                                      style={{ width: `${goal.progress}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-[10px] font-bold text-gray-700">{goal.progress}%</span>
                                </div>

                                <p className="text-[9px] text-gray-400 text-right">Hạn chót: {goal.targetDate}</p>
                              </div>
                            ))}
                            {goals.filter(g => g.employeeId === selectedEmployee.id).length === 0 && (
                              <p className="text-center py-6 text-gray-400 text-xs">Chưa thiết lập mục tiêu nào.</p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* SUB TAB 2: PEER FEEDBACK */}
                      {perfSubTab === "Feedback" && (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Đánh giá chéo & Phản hồi</h4>
                            <button
                              id="btn-add-feedback"
                              onClick={() => setShowFeedbackModal(true)}
                              className="bg-[#1c7c24] text-white text-[10px] font-bold py-1.5 px-3 rounded flex items-center space-x-1"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Gửi Phản Hồi</span>
                            </button>
                          </div>

                          <div className="space-y-3">
                            {feedbacks.filter(f => f.toEmployeeId === selectedEmployee.id).map((fb) => (
                              <div key={fb.id} className="border border-gray-100 rounded-lg p-3.5 bg-gray-50 space-y-2">
                                <div className="flex justify-between items-center text-xs">
                                  <span className="font-bold text-gray-800">Từ: {fb.fromEmployeeName}</span>
                                  <span className="text-gray-400">{fb.date}</span>
                                </div>
                                <p className="text-xs text-gray-600 leading-relaxed italic">"{fb.content}"</p>
                                <div className="flex space-x-0.5 text-amber-500">
                                  {Array.from({ length: fb.rating }).map((_, i) => (
                                    <span key={i}>★</span>
                                  ))}
                                </div>
                              </div>
                            ))}
                            {feedbacks.filter(f => f.toEmployeeId === selectedEmployee.id).length === 0 && (
                              <p className="text-center py-6 text-gray-400 text-xs">Chưa có phản hồi đồng nghiệp nào được ghi nhận.</p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* SUB TAB 3: SELF & MANAGER ASSESSMENTS */}
                      {perfSubTab === "Assessment" && (
                        <div className="space-y-6">
                          <div className="flex justify-between items-center">
                            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Các kỳ đánh giá định kỳ</h4>
                            <button
                              id="btn-start-impromptu"
                              onClick={() => setShowAssessmentModal(true)}
                              className="bg-white border border-[#1c7c24] text-[#1c7c24] hover:bg-[#f0f9f1] text-[10px] font-bold py-1.5 px-3 rounded flex items-center space-x-1"
                            >
                              <Award className="w-3.5 h-3.5" />
                              <span>Bắt Đầu Đánh Giá Tức Thời</span>
                            </button>
                          </div>

                          <div className="space-y-4">
                            {assessments.filter(a => a.employeeId === selectedEmployee.id).map((assess) => (
                              <div key={assess.id} className="border border-gray-200 rounded-lg p-4 bg-white space-y-4">
                                <div className="flex justify-between items-center border-b pb-2">
                                  <h5 className="text-xs font-bold text-gray-800">{assess.period}</h5>
                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                    assess.status === "Completed" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800 animate-pulse"
                                  }`}>
                                    {assess.status}
                                  </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                                  <div className="p-3 bg-gray-50 rounded border">
                                    <h6 className="font-bold text-gray-700 flex justify-between items-center">
                                      <span>Tự Đánh Giá</span>
                                      <span className="text-amber-600 font-extrabold">{assess.selfScore ? `${assess.selfScore}/5 ★` : "Chờ điền"}</span>
                                    </h6>
                                    <p className="text-gray-600 italic mt-2">
                                      {assess.selfComments ? `"${assess.selfComments}"` : "Nhân viên chưa nộp nội dung tự đánh giá."}
                                    </p>
                                  </div>

                                  <div className="p-3 bg-gray-50 rounded border">
                                    <h6 className="font-bold text-gray-700 flex justify-between items-center">
                                      <span>Quản Lý Đánh Giá</span>
                                      <span className="text-amber-600 font-extrabold">{assess.managerScore ? `${assess.managerScore}/5 ★` : "Chờ điền"}</span>
                                    </h6>
                                    <p className="text-gray-600 italic mt-2">
                                      {assess.managerComments ? `"${assess.managerComments}"` : "Quản lý chưa nộp phiếu nhận xét."}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                            {assessments.filter(a => a.employeeId === selectedEmployee.id).length === 0 && (
                              <p className="text-center py-6 text-gray-400 text-xs">Chưa có bản ghi đánh giá định kỳ nào.</p>
                            )}
                          </div>
                        </div>
                      )}

                    </div>
                  )}

                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* MODAL 1: ADD EMPLOYEE */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-150 max-h-[90vh] flex flex-col">
            <div className="bamboo-header p-4 text-white flex justify-between items-center shrink-0">
              <h3 className="text-md font-bold font-display flex items-center space-x-2">
                <UserPlus className="w-5 h-5" />
                <span>Thêm nhân viên mới vào hệ thống</span>
              </h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-white/80 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddEmployee} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Họ và Tên khai sinh *</label>
                  <input
                    type="text"
                    required
                    value={newEmp.fullName}
                    onChange={(e) => setNewEmp({ ...newEmp, fullName: e.target.value })}
                    className="block w-full border border-gray-300 rounded p-1.5 focus:ring-[#2d8a39] focus:border-[#2d8a39]"
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Biệt danh / Gọi tắt</label>
                  <input
                    type="text"
                    value={newEmp.nickName}
                    onChange={(e) => setNewEmp({ ...newEmp, nickName: e.target.value })}
                    className="block w-full border border-gray-300 rounded p-1.5 focus:ring-[#2d8a39] focus:border-[#2d8a39]"
                    placeholder="Charlie"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Chức danh / Chức vụ *</label>
                  <input
                    type="text"
                    required
                    value={newEmp.jobTitle}
                    onChange={(e) => setNewEmp({ ...newEmp, jobTitle: e.target.value })}
                    className="block w-full border border-gray-300 rounded p-1.5 focus:ring-[#2d8a39] focus:border-[#2d8a39]"
                    placeholder="Software Engineer"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Phòng ban *</label>
                  <select
                    value={newEmp.department}
                    onChange={(e) => setNewEmp({ ...newEmp, department: e.target.value })}
                    className="block w-full border border-gray-300 rounded p-1.5 focus:ring-[#2d8a39] focus:border-[#2d8a39]"
                  >
                    <option value="Human Resources">Human Resources</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Operations">Operations</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Email nội bộ *</label>
                  <input
                    type="email"
                    required
                    value={newEmp.email}
                    onChange={(e) => setNewEmp({ ...newEmp, email: e.target.value })}
                    className="block w-full border border-gray-300 rounded p-1.5 focus:ring-[#2d8a39] focus:border-[#2d8a39]"
                    placeholder="nguyenvana@ownco.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Điện thoại di động *</label>
                  <input
                    type="text"
                    required
                    value={newEmp.phone}
                    onChange={(e) => setNewEmp({ ...newEmp, phone: e.target.value })}
                    className="block w-full border border-gray-300 rounded p-1.5 focus:ring-[#2d8a39] focus:border-[#2d8a39]"
                    placeholder="0912-345-678"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Ngày bắt đầu (Hire Date) *</label>
                  <input
                    type="date"
                    required
                    value={newEmp.hireDate}
                    onChange={(e) => setNewEmp({ ...newEmp, hireDate: e.target.value })}
                    className="block w-full border border-gray-300 rounded p-1.5 focus:ring-[#2d8a39] focus:border-[#2d8a39]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Văn phòng / Địa điểm *</label>
                  <input
                    type="text"
                    required
                    value={newEmp.location}
                    onChange={(e) => setNewEmp({ ...newEmp, location: e.target.value })}
                    className="block w-full border border-gray-300 rounded p-1.5 focus:ring-[#2d8a39] focus:border-[#2d8a39]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Mức lương cơ bản ($/năm) *</label>
                  <input
                    type="number"
                    required
                    value={newEmp.salary}
                    onChange={(e) => setNewEmp({ ...newEmp, salary: Number(e.target.value) })}
                    className="block w-full border border-gray-300 rounded p-1.5 focus:ring-[#2d8a39] focus:border-[#2d8a39]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Người quản lý trực tiếp *</label>
                  <input
                    type="text"
                    required
                    value={newEmp.managerName}
                    onChange={(e) => setNewEmp({ ...newEmp, managerName: e.target.value })}
                    className="block w-full border border-gray-300 rounded p-1.5 focus:ring-[#2d8a39] focus:border-[#2d8a39]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Link Ảnh chân dung (Photo URL)</label>
                <input
                  type="text"
                  value={newEmp.photoUrl}
                  onChange={(e) => setNewEmp({ ...newEmp, photoUrl: e.target.value })}
                  className="block w-full border border-gray-300 rounded p-1.5 focus:ring-[#2d8a39] focus:border-[#2d8a39]"
                />
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end space-x-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-white border border-gray-300 text-gray-700 text-xs font-bold py-2 px-4 rounded hover:bg-gray-50 transition"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="bg-[#1c7c24] hover:bg-green-700 text-white text-xs font-bold py-2 px-4 rounded shadow-sm transition"
                >
                  Khởi Tạo Nhân Viên
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD GOAL */}
      {showGoalModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-150">
            <div className="bamboo-header p-4 text-white flex justify-between items-center">
              <h3 className="text-sm font-bold font-display flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Thêm mục tiêu đánh giá mới</span>
              </h3>
              <button onClick={() => setShowGoalModal(false)} className="text-white hover:opacity-80">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateGoal} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Tiêu đề mục tiêu *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Hoàn thành chứng chỉ SOC2..."
                  value={newGoalTitle}
                  onChange={(e) => setNewGoalTitle(e.target.value)}
                  className="block w-full border border-gray-300 rounded p-1.5 focus:ring-green-600 focus:border-green-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Mô tả cụ thể</label>
                <textarea
                  rows={3}
                  placeholder="Các kết quả chính mong đợi (Key Results)..."
                  value={newGoalDesc}
                  onChange={(e) => setNewGoalDesc(e.target.value)}
                  className="block w-full border border-gray-300 rounded p-1.5 focus:ring-green-600 focus:border-green-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Hạn chót hoàn thành</label>
                  <input
                    type="date"
                    value={newGoalTarget}
                    onChange={(e) => setNewGoalTarget(e.target.value)}
                    className="block w-full border border-gray-300 rounded p-1.5 focus:ring-green-600 focus:border-green-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Phân loại</label>
                  <select
                    value={newGoalCat}
                    onChange={(e) => setNewGoalCat(e.target.value as any)}
                    className="block w-full border border-gray-300 rounded p-1.5 focus:ring-green-600 focus:border-green-600"
                  >
                    <option value="Individual">Cá Nhân (Individual)</option>
                    <option value="Team">Đội Nhóm (Team)</option>
                    <option value="Company">Công Ty (Company)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowGoalModal(false)}
                  className="bg-white border text-gray-700 font-bold py-2 px-4 rounded hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="bg-[#1c7c24] text-white font-bold py-2 px-4 rounded shadow-sm hover:bg-green-700"
                >
                  Tạo Mục Tiêu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: ADD FEEDBACK */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-150">
            <div className="bamboo-header p-4 text-white flex justify-between items-center">
              <h3 className="text-sm font-bold font-display flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Gửi phản hồi đồng nghiệp</span>
              </h3>
              <button onClick={() => setShowFeedbackModal(false)} className="text-white hover:opacity-80">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateFeedback} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Nội dung phản hồi tích cực *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Ghi nhận những nỗ lực hoặc đóng góp tích cực của đồng nghiệp..."
                  value={feedbackContent}
                  onChange={(e) => setFeedbackContent(e.target.value)}
                  className="block w-full border border-gray-300 rounded p-1.5 focus:ring-green-600 focus:border-green-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Xếp hạng đánh giá (Rating)</label>
                <select
                  value={feedbackRating}
                  onChange={(e) => setFeedbackRating(Number(e.target.value))}
                  className="block w-full border border-gray-300 rounded p-1.5 focus:ring-green-600 focus:border-green-600"
                >
                  <option value={5}>5 Sao - Xuất Sắc</option>
                  <option value={4}>4 Sao - Tốt</option>
                  <option value={3}>3 Sao - Đạt yêu cầu</option>
                  <option value={2}>2 Sao - Cần nỗ lực hơn</option>
                  <option value={1}>1 Sao - Kém</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowFeedbackModal(false)}
                  className="bg-white border text-gray-700 font-bold py-2 px-4 rounded hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="bg-[#1c7c24] text-white font-bold py-2 px-4 rounded shadow-sm hover:bg-green-700"
                >
                  Gửi Phản Hồi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: START ASSESSMENT */}
      {showAssessmentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-150">
            <div className="bamboo-header p-4 text-white flex justify-between items-center">
              <h3 className="text-sm font-bold font-display flex items-center space-x-2">
                <Award className="w-4 h-4" />
                <span>Bắt đầu Đánh Giá Tức Thời</span>
              </h3>
              <button onClick={() => setShowAssessmentModal(false)} className="text-white hover:opacity-80">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAssessment} className="p-6 space-y-4 text-xs">
              <p className="text-gray-500 leading-relaxed text-[10px]">
                Tính năng Đánh giá tức thời (Impromptu Assessment) cho phép khởi tạo nhanh kỳ đánh giá ngắn mà không cần chờ tới chu kỳ năm/quý của hệ thống.
              </p>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Điểm số tự nhận thức (Self Score) *</label>
                <select
                  value={selfScore}
                  onChange={(e) => setSelfScore(Number(e.target.value))}
                  className="block w-full border border-gray-300 rounded p-1.5 focus:ring-green-600 focus:border-green-600"
                >
                  <option value={5}>5.0 - Xuất Sắc xuất chúng</option>
                  <option value={4.5}>4.5 - Tốt vượt mong đợi</option>
                  <option value={4}>4.0 - Đạt mục tiêu đề ra</option>
                  <option value={3.5}>3.5 - Đạt yêu cầu cơ bản</option>
                  <option value={3}>3.0 - Cần cải thiện sâu</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Nhận xét tổng quan của cá nhân *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tự tổng hợp các kết quả chính đã làm tốt và các mặt hạn chế tự nhận thấy..."
                  value={selfComments}
                  onChange={(e) => setSelfComments(e.target.value)}
                  className="block w-full border border-gray-300 rounded p-1.5 focus:ring-green-600 focus:border-green-600"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAssessmentModal(false)}
                  className="bg-white border text-gray-700 font-bold py-2 px-4 rounded hover:bg-gray-50"
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  className="bg-[#1c7c24] text-white font-bold py-2 px-4 rounded shadow-sm hover:bg-green-700"
                >
                  Nộp Đánh Giá
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
