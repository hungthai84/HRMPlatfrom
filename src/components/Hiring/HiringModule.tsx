/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Briefcase, 
  Users, 
  Calendar, 
  FileText, 
  Plus, 
  Search, 
  CheckCircle, 
  Clock, 
  Star, 
  ArrowRight, 
  ChevronRight, 
  X, 
  Mail, 
  Phone, 
  User, 
  DollarSign, 
  MapPin,
  FileSpreadsheet
} from "lucide-react";
import { JobPosting, Candidate, Interview, Offer } from "../../types";

interface HiringModuleProps {
  jobs: JobPosting[];
  setJobs: React.Dispatch<React.SetStateAction<JobPosting[]>>;
  candidates: Candidate[];
  setCandidates: React.Dispatch<React.SetStateAction<Candidate[]>>;
  interviews: Interview[];
  setInterviews: React.Dispatch<React.SetStateAction<Interview[]>>;
  offers: Offer[];
  setOffers: React.Dispatch<React.SetStateAction<Offer[]>>;
}

export default function HiringModule({
  jobs,
  setJobs,
  candidates,
  setCandidates,
  interviews,
  setInterviews,
  offers,
  setOffers
}: HiringModuleProps) {
  const [activeSubTab, setActiveSubTab] = useState<"Jobs" | "Candidates" | "Interviews" | "Offers">("Jobs");

  // Filter and search states
  const [jobSearch, setJobSearch] = useState("");
  const [candidateSearch, setCandidateSearch] = useState("");

  // Create Modals states
  const [showJobModal, setShowJobModal] = useState(false);
  const [showCandidateModal, setShowCandidateModal] = useState(false);
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);

  // Form States - Job Creation
  const [jobTitle, setJobTitle] = useState("");
  const [jobDept, setJobDept] = useState("Engineering");
  const [jobLoc, setJobLoc] = useState("Remote");
  const [jobType, setJobType] = useState<"Full-Time" | "Part-Time" | "Remote" | "Contract">("Full-Time");
  const [jobSalary, setJobSalary] = useState("");
  const [jobDesc, setJobDesc] = useState("");

  // Form States - Candidate Creation
  const [candName, setCandName] = useState("");
  const [candEmail, setCandEmail] = useState("");
  const [candPhone, setCandPhone] = useState("");
  const [candJobId, setCandJobId] = useState(jobs[0]?.id || "");
  const [candSource, setCandSource] = useState("LinkedIn");

  // Form States - Interview Scheduler
  const [intCandId, setIntCandId] = useState(candidates[0]?.id || "");
  const [intDate, setIntDate] = useState("");
  const [intTime, setIntTime] = useState("");
  const [intPanel, setIntPanel] = useState("");
  const [intType, setIntType] = useState<"Screening" | "Technical" | "Behavioral" | "Executive" | "Culture Fit">("Technical");

  // Form States - Offer Draft
  const [offCandId, setOffCandId] = useState(candidates[0]?.id || "");
  const [offBaseSalary, setOffBaseSalary] = useState(100000);
  const [offBonusPercent, setOffBonusPercent] = useState(10);

  // Actions
  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle) return;

    const newJob: JobPosting = {
      id: "JOB-00" + (jobs.length + 1),
      title: jobTitle,
      department: jobDept,
      location: jobLoc,
      type: jobType,
      status: "Open",
      applicantsCount: 0,
      postedDate: new Date().toISOString().split("T")[0],
      description: jobDesc,
      salaryRange: jobSalary || "Cạnh tranh"
    };

    setJobs([...jobs, newJob]);
    setJobTitle("");
    setJobSalary("");
    setJobDesc("");
    setShowJobModal(false);
  };

  const handleCreateCandidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candName || !candEmail) return;

    const matchedJob = jobs.find((j) => j.id === candJobId);
    const newCand: Candidate = {
      id: "CAN-00" + (candidates.length + 1),
      fullName: candName,
      email: candEmail,
      phone: candPhone,
      appliedForJobId: candJobId,
      appliedForJobTitle: matchedJob ? matchedJob.title : "Chức vụ khác",
      source: candSource,
      stage: "Applied",
      appliedDate: new Date().toISOString().split("T")[0],
      rating: 3,
      notes: "Hồ sơ mới tiếp nhận từ hệ thống."
    };

    // Increment applicants count
    if (matchedJob) {
      setJobs(jobs.map(j => j.id === matchedJob.id ? { ...j, applicantsCount: j.applicantsCount + 1 } : j));
    }

    setCandidates([...candidates, newCand]);
    setCandName("");
    setCandEmail("");
    setCandPhone("");
    setShowCandidateModal(false);
  };

  const handleCreateInterview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!intCandId || !intDate) return;

    const cand = candidates.find((c) => c.id === intCandId);
    if (!cand) return;

    const newInt: Interview = {
      id: "INT-0" + (interviews.length + 1),
      candidateId: intCandId,
      candidateName: cand.fullName,
      jobTitle: cand.appliedForJobTitle,
      date: intDate,
      time: intTime || "10:00 AM",
      interviewers: intPanel.split(",").map(name => name.trim()),
      type: intType,
      status: "Scheduled"
    };

    setInterviews([...interviews, newInt]);
    setIntDate("");
    setIntTime("");
    setIntPanel("");
    setShowInterviewModal(false);
  };

  const handleCreateOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!offCandId) return;

    const cand = candidates.find((c) => c.id === offCandId);
    if (!cand) return;

    const newOffer: Offer = {
      id: "OFF-00" + (offers.length + 1),
      candidateId: offCandId,
      candidateName: cand.fullName,
      jobTitle: cand.appliedForJobTitle,
      baseSalary: Number(offBaseSalary),
      bonusPercent: Number(offBonusPercent),
      offerDate: new Date().toISOString().split("T")[0],
      expirationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      status: "Draft"
    };

    // Update candidate stage to "Offer"
    setCandidates(candidates.map(c => c.id === offCandId ? { ...c, stage: "Offer" } : c));

    setOffers([...offers, newOffer]);
    setShowOfferModal(false);
  };

  const updateCandidateStage = (id: string, newStage: Candidate["stage"]) => {
    setCandidates(candidates.map((cand) => {
      if (cand.id === id) {
        return { ...cand, stage: newStage };
      }
      return cand;
    }));
  };

  const updateCandidateRating = (id: string, rating: number) => {
    setCandidates(candidates.map((cand) => {
      if (cand.id === id) {
        return { ...cand, rating };
      }
      return cand;
    }));
  };

  return (
    <div id="hiring-module" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Hiring Module Header Sub Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {(["Jobs", "Candidates", "Interviews", "Offers"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`flex-1 min-w-[120px] px-6 py-4 text-xs font-bold text-center whitespace-nowrap transition border-b-2 flex items-center justify-center space-x-2 ${
                activeSubTab === tab
                  ? "text-[#1c7c24] border-[#1c7c24] bg-green-50/20"
                  : "text-gray-600 border-transparent hover:text-[#1c7c24] hover:bg-gray-50"
              }`}
            >
              {tab === "Jobs" && <Briefcase className="w-4 h-4" />}
              {tab === "Candidates" && <Users className="w-4 h-4" />}
              {tab === "Interviews" && <Calendar className="w-4 h-4" />}
              {tab === "Offers" && <FileSpreadsheet className="w-4 h-4" />}
              <span>
                {tab === "Jobs" ? "Tin Tuyển Dụng" : 
                 tab === "Candidates" ? "Ứng Viên" : 
                 tab === "Interviews" ? "Lịch Phỏng Vấn" : "Thư Mời Nhận Việc"}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* SUB-MODULE 1: JOBS */}
      {activeSubTab === "Jobs" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm tin tuyển dụng..."
                value={jobSearch}
                onChange={(e) => setJobSearch(e.target.value)}
                className="pl-9 pr-4 py-1.5 w-full border border-gray-300 rounded-md text-xs focus:ring-[#2d8a39] focus:border-[#2d8a39]"
              />
            </div>

            <button
              id="btn-add-job"
              onClick={() => setShowJobModal(true)}
              className="w-full sm:w-auto bg-[#1c7c24] hover:bg-green-700 text-white text-xs font-bold py-2 px-4 rounded-md shadow-sm flex items-center justify-center space-x-1.5 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Đăng Tin Tuyển Dụng</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.filter(j => j.title.toLowerCase().includes(jobSearch.toLowerCase())).map((job) => (
              <div key={job.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 space-y-4 hover:shadow-md transition">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-bold text-gray-800">{job.title}</h4>
                    <p className="text-xs text-gray-500">{job.department} • {job.location}</p>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                    job.status === "Open" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  }`}>
                    {job.status === "Open" ? "Đang Tuyển" : "Nháp"}
                  </span>
                </div>

                <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">{job.description}</p>

                <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-[11px] text-gray-500">
                  <span className="font-semibold text-gray-700">Mức lương: {job.salaryRange}</span>
                  <span className="bg-gray-100 px-2 py-1 rounded font-bold text-gray-600">{job.applicantsCount} Ứng viên</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-MODULE 2: CANDIDATES */}
      {activeSubTab === "Candidates" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm tên ứng viên..."
                value={candidateSearch}
                onChange={(e) => setCandidateSearch(e.target.value)}
                className="pl-9 pr-4 py-1.5 w-full border border-gray-300 rounded-md text-xs focus:ring-[#2d8a39] focus:border-[#2d8a39]"
              />
            </div>

            <button
              id="btn-add-candidate"
              onClick={() => setShowCandidateModal(true)}
              className="w-full sm:w-auto bg-[#1c7c24] hover:bg-green-700 text-white text-xs font-bold py-2 px-4 rounded-md shadow-sm flex items-center justify-center space-x-1.5 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm Ứng Viên</span>
            </button>
          </div>

          {/* Candidate Pipeline Table representation */}
          <div className="bg-white border rounded-lg shadow-sm overflow-hidden border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-xs">
                <thead className="bg-gray-50 text-gray-500 font-bold">
                  <tr>
                    <th className="px-6 py-3 text-left uppercase tracking-wider">Họ và Tên</th>
                    <th className="px-6 py-3 text-left uppercase tracking-wider">Ứng tuyển vị trí</th>
                    <th className="px-6 py-3 text-left uppercase tracking-wider">Nguồn</th>
                    <th className="px-6 py-3 text-left uppercase tracking-wider">Xếp hạng</th>
                    <th className="px-6 py-3 text-left uppercase tracking-wider">Trạng thái vòng</th>
                    <th className="px-6 py-3 text-right uppercase tracking-wider">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-gray-600">
                  {candidates.filter(c => c.fullName.toLowerCase().includes(candidateSearch.toLowerCase())).map((cand) => (
                    <tr key={cand.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-green-100 text-[#1c7c24] font-bold flex items-center justify-center">
                            {cand.fullName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-gray-800">{cand.fullName}</p>
                            <p className="text-[10px] text-gray-400">{cand.email} • {cand.phone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-700 truncate max-w-[180px]">{cand.appliedForJobTitle}</p>
                        <p className="text-[10px] text-gray-400">Nộp ngày {cand.appliedDate}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium">{cand.source}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              onClick={() => updateCandidateRating(cand.id, i + 1)}
                              className={`w-4.5 h-4.5 cursor-pointer ${
                                i < cand.rating ? "text-amber-400 fill-amber-400" : "text-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={cand.stage}
                          onChange={(e) => updateCandidateStage(cand.id, e.target.value as any)}
                          className="border border-gray-300 rounded px-2 py-1 text-xs font-bold text-gray-700 focus:ring-[#2d8a39] focus:border-[#2d8a39]"
                        >
                          <option value="Applied">Hồ sơ mới (Applied)</option>
                          <option value="Phone Screen">Sơ vấn điện thoại (Phone Screen)</option>
                          <option value="Interviewing">Đang phỏng vấn (Interviewing)</option>
                          <option value="Offer">Thư mời (Offer)</option>
                          <option value="Hired">Đã tuyển dụng (Hired)</option>
                          <option value="Declined">Từ chối (Declined)</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-xs">
                        <button
                          onClick={() => {
                            if (confirm(`Bạn muốn chuyển trực tiếp ${cand.fullName} thành nhân viên chính thức?`)) {
                              alert(`Chuyển ${cand.fullName} thành nhân viên chính thức! Vui lòng cập nhật thông tin trong mục People.`);
                            }
                          }}
                          className="bg-green-50 text-green-700 hover:bg-green-100 font-bold px-2 py-1.5 rounded"
                        >
                          Tuyển Dụng
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-MODULE 3: INTERVIEWS */}
      {activeSubTab === "Interviews" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Danh sách phỏng vấn</h3>
            <button
              id="btn-schedule-interview"
              onClick={() => setShowInterviewModal(true)}
              className="bg-[#1c7c24] hover:bg-green-700 text-white text-xs font-bold py-2 px-4 rounded-md shadow-sm flex items-center space-x-1.5 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Đặt Lịch Phỏng Vấn</span>
            </button>
          </div>

          <div className="divide-y border rounded bg-white overflow-hidden shadow-sm">
            {interviews.map((int) => (
              <div key={int.id} className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between text-xs gap-4">
                <div className="flex items-start space-x-3.5">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">Phỏng vấn ứng viên: {int.candidateName}</h4>
                    <p className="text-gray-500">Vị trí: {int.jobTitle} • Vòng phỏng vấn: <span className="font-bold text-gray-700">{int.type}</span></p>
                    <p className="text-gray-400 mt-1">Hội đồng phỏng vấn: {int.interviewers.join(", ")}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-bold text-gray-800">{int.date}</p>
                    <p className="text-gray-400">{int.time}</p>
                  </div>
                  <span className={`px-2 py-1 rounded font-bold text-[10px] ${
                    int.status === "Scheduled" 
                      ? "bg-amber-100 text-amber-800" 
                      : int.status === "Completed" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {int.status === "Scheduled" ? "Sắp diễn ra" : "Đã xong"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-MODULE 4: OFFERS */}
      {activeSubTab === "Offers" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Thư mời nhận việc (Offers)</h3>
            <button
              id="btn-draft-offer"
              onClick={() => setShowOfferModal(true)}
              className="bg-[#1c7c24] hover:bg-green-700 text-white text-xs font-bold py-2 px-4 rounded-md shadow-sm flex items-center space-x-1.5 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Tạo Thư Mời Nhận Việc</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {offers.map((off) => (
              <div key={off.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-bold text-gray-800">{off.candidateName}</h4>
                    <p className="text-xs text-gray-500">Vị trí mời: {off.jobTitle}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    off.status === "Sent" ? "bg-amber-100 text-amber-800 animate-pulse" : 
                    off.status === "Accepted" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  }`}>
                    {off.status === "Sent" ? "Đã gửi" : off.status === "Accepted" ? "Đồng ý" : "Nháp"}
                  </span>
                </div>

                <div className="bg-gray-50 p-3 rounded text-xs space-y-1.5">
                  <p className="text-gray-600 flex justify-between">
                    <span>Lương cơ bản đề xuất:</span>
                    <span className="font-bold text-gray-800">${off.baseSalary.toLocaleString()}/năm</span>
                  </p>
                  <p className="text-gray-600 flex justify-between">
                    <span>Thưởng theo KPI:</span>
                    <span className="font-bold text-gray-800">{off.bonusPercent}%</span>
                  </p>
                </div>

                <div className="pt-2 flex justify-between text-[10px] text-gray-400">
                  <span>Ngày soạn: {off.offerDate}</span>
                  <span>Hạn chót phản hồi: {off.expirationDate}</span>
                </div>

                {off.status === "Sent" && (
                  <div className="pt-2 flex space-x-2 border-t border-gray-100">
                    <button
                      onClick={() => {
                        setOffers(offers.map(o => o.id === off.id ? { ...o, status: "Accepted" } : o));
                      }}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded text-[10px] transition"
                    >
                      Ký chấp thuận
                    </button>
                    <button
                      onClick={() => {
                        setOffers(offers.map(o => o.id === off.id ? { ...o, status: "Declined" } : o));
                      }}
                      className="bg-white border text-gray-600 hover:bg-gray-50 font-bold py-1 px-3 rounded text-[10px] transition"
                    >
                      Từ chối
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL 1: CREATE JOB */}
      {showJobModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-150">
            <div className="bamboo-header p-4 text-white flex justify-between items-center">
              <h3 className="text-sm font-bold font-display flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Thêm tin tuyển dụng mới</span>
              </h3>
              <button onClick={() => setShowJobModal(false)} className="text-white hover:opacity-80">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateJob} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-gray-600 mb-1">Tiêu đề công việc *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Senior Frontend Developer..."
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="block w-full border border-gray-300 rounded p-1.5 focus:ring-green-600 focus:border-green-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Phòng ban</label>
                  <select
                    value={jobDept}
                    onChange={(e) => setJobDept(e.target.value)}
                    className="block w-full border border-gray-300 rounded p-1.5 focus:ring-green-600 focus:border-green-600"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Human Resources">Human Resources</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Hình thức làm việc</label>
                  <select
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value as any)}
                    className="block w-full border border-gray-300 rounded p-1.5 focus:ring-green-600 focus:border-green-600"
                  >
                    <option value="Full-Time">Toàn thời gian (Full-Time)</option>
                    <option value="Part-Time">Bán thời gian (Part-Time)</option>
                    <option value="Remote">Làm từ xa (Remote)</option>
                    <option value="Contract">Hợp đồng (Contract)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Mức lương dự kiến</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: $120,000 - $140,000"
                    value={jobSalary}
                    onChange={(e) => setJobSalary(e.target.value)}
                    className="block w-full border border-gray-300 rounded p-1.5 focus:ring-green-600 focus:border-green-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Văn phòng / Địa điểm</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: San Francisco, CA"
                    value={jobLoc}
                    onChange={(e) => setJobLoc(e.target.value)}
                    className="block w-full border border-gray-300 rounded p-1.5 focus:ring-green-600 focus:border-green-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Mô tả chi tiết công việc *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Yêu cầu kỹ thuật, lợi ích và trách nhiệm..."
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                  className="block w-full border border-gray-300 rounded p-1.5 focus:ring-green-600 focus:border-green-600"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowJobModal(false)}
                  className="bg-white border text-gray-700 font-bold py-2 px-4 rounded hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="bg-[#1c7c24] text-white font-bold py-2 px-4 rounded shadow-sm hover:bg-green-700"
                >
                  Đăng tuyển dụng
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD CANDIDATE */}
      {showCandidateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-150">
            <div className="bamboo-header p-4 text-white flex justify-between items-center">
              <h3 className="text-sm font-bold font-display flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Nộp hồ sơ ứng viên mới</span>
              </h3>
              <button onClick={() => setShowCandidateModal(false)} className="text-white hover:opacity-80">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCandidate} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Họ và tên ứng viên *</label>
                <input
                  type="text"
                  required
                  placeholder="Nguyễn Văn B"
                  value={candName}
                  onChange={(e) => setCandName(e.target.value)}
                  className="block w-full border border-gray-300 rounded p-1.5 focus:ring-green-600 focus:border-green-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Email liên hệ *</label>
                  <input
                    type="email"
                    required
                    placeholder="nguyenvanb@gmail.com"
                    value={candEmail}
                    onChange={(e) => setCandEmail(e.target.value)}
                    className="block w-full border border-gray-300 rounded p-1.5 focus:ring-green-600 focus:border-green-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Điện thoại</label>
                  <input
                    type="text"
                    placeholder="0901-234-567"
                    value={candPhone}
                    onChange={(e) => setCandPhone(e.target.value)}
                    className="block w-full border border-gray-300 rounded p-1.5 focus:ring-green-600 focus:border-green-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Chức danh ứng tuyển *</label>
                <select
                  value={candJobId}
                  onChange={(e) => setCandJobId(e.target.value)}
                  className="block w-full border border-gray-300 rounded p-1.5 focus:ring-green-600 focus:border-green-600"
                >
                  <option value="">-- Chọn Tin Tuyển Dụng --</option>
                  {jobs.map((job) => (
                    <option key={job.id} value={job.id}>{job.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Nguồn hồ sơ</label>
                <select
                  value={candSource}
                  onChange={(e) => setCandSource(e.target.value)}
                  className="block w-full border border-gray-300 rounded p-1.5 focus:ring-green-600 focus:border-green-600"
                >
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Indeed">Indeed</option>
                  <option value="Referral">Giới thiệu (Referral)</option>
                  <option value="Campus">Hội chợ việc làm (Campus)</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowCandidateModal(false)}
                  className="bg-white border text-gray-700 font-bold py-2 px-4 rounded hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="bg-[#1c7c24] text-white font-bold py-2 px-4 rounded shadow-sm hover:bg-green-700"
                >
                  Ghi Nhận Hồ Sơ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: SCHEDULE INTERVIEW */}
      {showInterviewModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-150">
            <div className="bamboo-header p-4 text-white flex justify-between items-center">
              <h3 className="text-sm font-bold font-display flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Đặt lịch phỏng vấn ứng viên</span>
              </h3>
              <button onClick={() => setShowInterviewModal(false)} className="text-white hover:opacity-80">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateInterview} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Ứng viên *</label>
                <select
                  value={intCandId}
                  onChange={(e) => setIntCandId(e.target.value)}
                  className="block w-full border border-gray-300 rounded p-1.5 focus:ring-green-600 focus:border-green-600"
                >
                  <option value="">-- Chọn Ứng Viên --</option>
                  {candidates.map((cand) => (
                    <option key={cand.id} value={cand.id}>{cand.fullName} ({cand.appliedForJobTitle})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Ngày phỏng vấn *</label>
                  <input
                    type="date"
                    required
                    value={intDate}
                    onChange={(e) => setIntDate(e.target.value)}
                    className="block w-full border border-gray-300 rounded p-1.5 focus:ring-green-600 focus:border-green-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Giờ phỏng vấn</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: 10:00 AM"
                    value={intTime}
                    onChange={(e) => setIntTime(e.target.value)}
                    className="block w-full border border-gray-300 rounded p-1.5 focus:ring-green-600 focus:border-green-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Vòng phỏng vấn</label>
                <select
                  value={intType}
                  onChange={(e) => setIntType(e.target.value as any)}
                  className="block w-full border border-gray-300 rounded p-1.5 focus:ring-green-600 focus:border-green-600"
                >
                  <option value="Screening">Vòng Sơ loại (Screening)</option>
                  <option value="Technical">Phỏng vấn Kỹ thuật (Technical)</option>
                  <option value="Behavioral">Phỏng vấn Hành vi (Behavioral)</option>
                  <option value="Culture Fit">Phù hợp văn hóa (Culture Fit)</option>
                  <option value="Executive">Lãnh đạo cấp cao (Executive)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Hội đồng phỏng vấn (Phân tách bởi dấu phẩy) *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Alisha Patel, John Ryan"
                  value={intPanel}
                  onChange={(e) => setIntPanel(e.target.value)}
                  className="block w-full border border-gray-300 rounded p-1.5 focus:ring-green-600 focus:border-green-600"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowInterviewModal(false)}
                  className="bg-white border text-gray-700 font-bold py-2 px-4 rounded hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="bg-[#1c7c24] text-white font-bold py-2 px-4 rounded shadow-sm hover:bg-green-700"
                >
                  Xác nhận đặt lịch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: CREATE OFFER */}
      {showOfferModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-150">
            <div className="bamboo-header p-4 text-white flex justify-between items-center">
              <h3 className="text-sm font-bold font-display flex items-center space-x-2">
                <FileSpreadsheet className="w-4 h-4" />
                <span>Soạn Thư Mời Nhận Việc</span>
              </h3>
              <button onClick={() => setShowOfferModal(false)} className="text-white hover:opacity-80">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateOffer} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Ứng viên nhận thư mời *</label>
                <select
                  value={offCandId}
                  onChange={(e) => setOffCandId(e.target.value)}
                  className="block w-full border border-gray-300 rounded p-1.5 focus:ring-green-600 focus:border-green-600"
                >
                  <option value="">-- Chọn Ứng Viên Đạt Yêu Cầu --</option>
                  {candidates.map((cand) => (
                    <option key={cand.id} value={cand.id}>{cand.fullName} ({cand.appliedForJobTitle})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Mức lương đề xuất ($/năm) *</label>
                  <input
                    type="number"
                    required
                    value={offBaseSalary}
                    onChange={(e) => setOffBaseSalary(Number(e.target.value))}
                    className="block w-full border border-gray-300 rounded p-1.5 focus:ring-green-600 focus:border-green-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Phần trăm thưởng KPI (%)</label>
                  <input
                    type="number"
                    value={offBonusPercent}
                    onChange={(e) => setOffBonusPercent(Number(e.target.value))}
                    className="block w-full border border-gray-300 rounded p-1.5 focus:ring-green-600 focus:border-green-600"
                  />
                </div>
              </div>

              <p className="text-[10px] text-gray-400">
                * Thư mời nhận việc khi khởi tạo sẽ ở trạng thái Nháp (Draft). Bạn có thể bấm gửi cho ứng viên để đổi trạng thái thành Đã gửi (Sent) kèm thời hạn phản hồi mặc định là 7 ngày kể từ hôm nay.
              </p>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowOfferModal(false)}
                  className="bg-white border text-gray-700 font-bold py-2 px-4 rounded hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="bg-[#1c7c24] text-white font-bold py-2 px-4 rounded shadow-sm hover:bg-green-700"
                >
                  Khởi tạo Thư Mời
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
