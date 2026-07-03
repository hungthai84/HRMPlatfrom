/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Employee {
  id: string;
  fullName: string;
  nickName?: string;
  jobTitle: string;
  department: string;
  email: string;
  phone: string;
  photoUrl: string;
  hireDate: string;
  location: string;
  employmentType: "Full-Time" | "Part-Time" | "Contract" | "Internship";
  status: "Active" | "On Leave" | "Terminated";
  managerName: string;
  directReportsCount: number;
  workEligibility?: string;
  compensation: {
    salary: number;
    frequency: "Yearly" | "Hourly" | "Monthly";
    currency: string;
    effectiveDate: string;
    bonusPercent?: number;
    payGrade?: string;
  };
  benefits: {
    id: string;
    name: string;
    provider: string;
    costPerMonth: number;
    employeeContribution: number;
    startDate: string;
    status: "Enrolled" | "Waived" | "Pending";
  }[];
  documents: {
    id: string;
    name: string;
    category: "Contract" | "Tax" | "ID/Passport" | "Certificates" | "Other";
    uploadedDate: string;
    status: "Signed" | "Pending Signature" | "Draft";
    fileSize: string;
  }[];
  jobDetails: {
    division: string;
    reportsTo: string;
    jobDescription: string;
    payType: string;
    flsaStatus: string;
  };
}

export interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-Time" | "Part-Time" | "Remote" | "Contract";
  status: "Draft" | "Open" | "Closed";
  applicantsCount: number;
  postedDate: string;
  description: string;
  salaryRange: string;
}

export interface Candidate {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  appliedForJobId: string;
  appliedForJobTitle: string;
  source: string;
  stage: "Applied" | "Phone Screen" | "Interviewing" | "Offer" | "Hired" | "Declined";
  appliedDate: string;
  resumeUrl?: string;
  rating: number; // 1-5
  notes?: string;
}

export interface Interview {
  id: string;
  candidateId: string;
  candidateName: string;
  jobTitle: string;
  date: string;
  time: string;
  interviewers: string[];
  type: "Screening" | "Technical" | "Behavioral" | "Executive" | "Culture Fit";
  status: "Scheduled" | "Completed" | "Cancelled";
  feedback?: string;
}

export interface Offer {
  id: string;
  candidateId: string;
  candidateName: string;
  jobTitle: string;
  baseSalary: number;
  bonusPercent: number;
  offerDate: string;
  expirationDate: string;
  status: "Draft" | "Sent" | "Accepted" | "Declined" | "Expired";
}

export interface OnboardingTask {
  id: string;
  employeeId: string;
  employeeName: string;
  title: string;
  dueDate: string;
  category: "IT Setup" | "HR Admin" | "Training" | "Facilities" | "Team Meet";
  isCompleted: boolean;
  description: string;
}

export interface PerformanceGoal {
  id: string;
  employeeId: string;
  title: string;
  description: string;
  targetDate: string;
  progress: number; // 0 to 100
  status: "Not Started" | "In Progress" | "Completed" | "Deferred";
  category: "Individual" | "Team" | "Company";
}

export interface PeerFeedback {
  id: string;
  fromEmployeeId: string;
  fromEmployeeName: string;
  toEmployeeId: string;
  toEmployeeName: string;
  content: string;
  date: string;
  rating: number; // 1-5
}

export interface Assessment {
  id: string;
  employeeId: string;
  period: string; // e.g. "Q2 2026", "Annual 2026"
  status: "Not Started" | "Self Assessment Pending" | "Manager Review Pending" | "Completed";
  selfScore?: number;
  managerScore?: number;
  selfComments?: string;
  managerComments?: string;
}

export interface TimeOffRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  employeePhoto: string;
  type: "Vacation" | "Sick Leave" | "Personal" | "Maternity" | "Paternity";
  startDate: string;
  endDate: string;
  totalDays: number;
  status: "Pending" | "Approved" | "Denied";
  notes?: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  clockIn?: string;
  clockOut?: string;
  status: "Present" | "Late" | "Absent" | "On Leave" | "Missing Clock-Out";
  notes?: string;
}

export interface TimesheetWeek {
  id: string;
  employeeId: string;
  weekStartDate: string;
  status: "Draft" | "Submitted" | "Approved" | "Rejected";
  dailyHours: {
    day: string; // Mon, Tue, Wed, Thu, Fri, Sat, Sun
    date: string;
    regularHours: number;
    overtimeHours: number;
  }[];
}

export interface ShiftSchedule {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  startTime: string;
  endTime: string;
  department: string;
}

export interface PayrollRun {
  id: string;
  periodStart: string;
  periodEnd: string;
  payDate: string;
  totalGrossPay: number;
  totalDeductions: number;
  totalNetPay: number;
  employeesPaidCount: number;
  status: "Upcoming" | "Draft" | "Processed";
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  grossSalary: number;
  allowances: number;
  deductions: number;
  taxes: number;
  netPay: number;
  paymentMethod: "Direct Deposit" | "Check";
  status: "Paid" | "Pending";
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  postedDate: string;
  author: string;
  category: "General" | "Holiday" | "Policy" | "Event";
  isImportant?: boolean;
}
