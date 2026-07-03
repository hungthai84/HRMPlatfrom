/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Employee,
  JobPosting,
  Candidate,
  Interview,
  Offer,
  OnboardingTask,
  PerformanceGoal,
  PeerFeedback,
  Assessment,
  TimeOffRequest,
  AttendanceRecord,
  TimesheetWeek,
  ShiftSchedule,
  PayrollRun,
  PayrollRecord,
  Announcement
} from "../types";

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: "EMP-001",
    fullName: "Matt Vargas",
    nickName: "Matty",
    jobTitle: "Sr. Product Manager",
    department: "Product Management",
    email: "matt.vargas@ownco.com",
    phone: "415-555-9012 Ext. 1042",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
    hireDate: "2019-06-15",
    location: "San Francisco, CA",
    employmentType: "Full-Time",
    status: "Active",
    managerName: "Jenn Caldwell",
    directReportsCount: 3,
    workEligibility: "US Citizen",
    compensation: {
      salary: 145000,
      frequency: "Yearly",
      currency: "USD",
      effectiveDate: "2023-01-01",
      bonusPercent: 12,
      payGrade: "P4"
    },
    benefits: [
      { id: "BEN-01", name: "Comprehensive Medical Plan", provider: "Blue Shield", costPerMonth: 650, employeeContribution: 120, startDate: "2019-07-01", status: "Enrolled" },
      { id: "BEN-02", name: "Dental PPO", provider: "Delta Dental", costPerMonth: 45, employeeContribution: 10, startDate: "2019-07-01", status: "Enrolled" },
      { id: "BEN-03", name: "Vision Preferred", provider: "VSP", costPerMonth: 22, employeeContribution: 5, startDate: "2019-07-01", status: "Enrolled" },
      { id: "BEN-04", name: "401(k) Retirement Plan (4% Match)", provider: "Fidelity", costPerMonth: 500, employeeContribution: 500, startDate: "2019-07-01", status: "Enrolled" }
    ],
    documents: [
      { id: "DOC-101", name: "W-4 Form Tax Withholding", category: "Tax", uploadedDate: "2019-06-15", status: "Signed", fileSize: "1.2 MB" },
      { id: "DOC-102", name: "Employment Agreement", category: "Contract", uploadedDate: "2019-06-15", status: "Signed", fileSize: "3.4 MB" },
      { id: "DOC-103", name: "NDA & IP Assignment", category: "Contract", uploadedDate: "2019-06-15", status: "Signed", fileSize: "2.1 MB" },
      { id: "DOC-104", name: "Q3 Bonus Structure Addendum", category: "Contract", uploadedDate: "2026-06-01", status: "Pending Signature", fileSize: "420 KB" },
      { id: "DOC-105", name: "I-9 Employment Verification", category: "Tax", uploadedDate: "2019-06-16", status: "Signed", fileSize: "1.8 MB" }
    ],
    jobDetails: {
      division: "Product & Engineering",
      reportsTo: "Jenn Caldwell, VP of People",
      jobDescription: "Lead core product definition, coordinate with engineering squads, and manage product roadmap.",
      payType: "Salary",
      flsaStatus: "Exempt"
    }
  },
  {
    id: "EMP-002",
    fullName: "Charlotte Danielle Abbott",
    nickName: "Charlie",
    jobTitle: "Sr. HR Administrator",
    department: "Human Resources",
    email: "charlotte.a@ownco.com",
    phone: "415-555-1273 Ext. 1272",
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250",
    hireDate: "2020-03-13",
    location: "Lindon, Utah",
    employmentType: "Part-Time",
    status: "Active",
    managerName: "Jenn Caldwell",
    directReportsCount: 1,
    workEligibility: "US Citizen",
    compensation: {
      salary: 78000,
      frequency: "Yearly",
      currency: "USD",
      effectiveDate: "2021-03-13",
      bonusPercent: 5,
      payGrade: "H3"
    },
    benefits: [
      { id: "BEN-05", name: "High Deductible Medical", provider: "Aetna", costPerMonth: 400, employeeContribution: 50, startDate: "2020-04-01", status: "Enrolled" },
      { id: "BEN-06", name: "Dental PPO", provider: "Delta Dental", costPerMonth: 45, employeeContribution: 10, startDate: "2020-04-01", status: "Enrolled" }
    ],
    documents: [
      { id: "DOC-201", name: "Employment Offer Letter", category: "Contract", uploadedDate: "2020-03-01", status: "Signed", fileSize: "2.3 MB" },
      { id: "DOC-202", name: "Benefits Enrollment Form", category: "Tax", uploadedDate: "2020-03-15", status: "Signed", fileSize: "1.5 MB" }
    ],
    jobDetails: {
      division: "North America",
      reportsTo: "Jenn Caldwell, VP of People",
      jobDescription: "Handle payroll prep, compliance, onboarding setups, and employee queries across the Utah hub.",
      payType: "Salary",
      flsaStatus: "Exempt"
    }
  },
  {
    id: "EMP-003",
    fullName: "Omar Abbad",
    jobTitle: "Account Executive",
    department: "Sales",
    email: "omar.abbad@ownco.com",
    phone: "801-555-4321 Ext. 881",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
    hireDate: "2026-03-28",
    location: "Lindon, Utah",
    employmentType: "Full-Time",
    status: "Active",
    managerName: "Sarah Connor",
    directReportsCount: 0,
    workEligibility: "US Citizen",
    compensation: {
      salary: 85000,
      frequency: "Yearly",
      currency: "USD",
      effectiveDate: "2026-03-28",
      bonusPercent: 20,
      payGrade: "S2"
    },
    benefits: [
      { id: "BEN-07", name: "Comprehensive Medical Plan", provider: "Blue Shield", costPerMonth: 650, employeeContribution: 120, startDate: "2026-04-01", status: "Enrolled" }
    ],
    documents: [
      { id: "DOC-301", name: "Sales Bonus Agreement", category: "Contract", uploadedDate: "2026-03-25", status: "Signed", fileSize: "1.9 MB" }
    ],
    jobDetails: {
      division: "North America",
      reportsTo: "Sarah Connor, Director of Sales",
      jobDescription: "Drive commercial sales cycles, pitch prospects, close pipeline deals in the enterprise sector.",
      payType: "Salary",
      flsaStatus: "Exempt"
    }
  },
  {
    id: "EMP-004",
    fullName: "Anna Lim",
    jobTitle: "Director, Customer Support",
    department: "Operations",
    email: "anna.lim@ownco.com",
    phone: "212-555-7890 Ext. 312",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250",
    hireDate: "2026-03-09",
    location: "New York, NY",
    employmentType: "Full-Time",
    status: "Active",
    managerName: "Jenn Caldwell",
    directReportsCount: 8,
    workEligibility: "US Visa Holder",
    compensation: {
      salary: 120000,
      frequency: "Yearly",
      currency: "USD",
      effectiveDate: "2026-03-09",
      bonusPercent: 10,
      payGrade: "O5"
    },
    benefits: [
      { id: "BEN-08", name: "Comprehensive Medical Plan", provider: "Blue Shield", costPerMonth: 650, employeeContribution: 120, startDate: "2026-04-01", status: "Enrolled" }
    ],
    documents: [
      { id: "DOC-401", name: "Visa Support Clearance", category: "ID/Passport", uploadedDate: "2026-02-15", status: "Signed", fileSize: "4.1 MB" }
    ],
    jobDetails: {
      division: "Global Operations",
      reportsTo: "Jenn Caldwell, VP of People",
      jobDescription: "Oversee global customer tier support, design SLAs, lead operations training programs.",
      payType: "Salary",
      flsaStatus: "Exempt"
    }
  },
  {
    id: "EMP-005",
    fullName: "Clark Fuller",
    jobTitle: "HR Generalist",
    department: "Human Resources",
    email: "clark.f@ownco.com",
    phone: "415-555-4422 Ext. 1290",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250",
    hireDate: "2021-11-01",
    location: "Lindon, Utah",
    employmentType: "Full-Time",
    status: "Active",
    managerName: "Charlotte Danielle Abbott",
    directReportsCount: 0,
    workEligibility: "US Citizen",
    compensation: {
      salary: 62000,
      frequency: "Yearly",
      currency: "USD",
      effectiveDate: "2021-11-01",
      bonusPercent: 5,
      payGrade: "H2"
    },
    benefits: [],
    documents: [],
    jobDetails: {
      division: "North America",
      reportsTo: "Charlotte Danielle Abbott, Sr. HR Administrator",
      jobDescription: "Support onboarding operations, process background checks, resolve basic employee policy questions.",
      payType: "Salary",
      flsaStatus: "Non-Exempt"
    }
  },
  {
    id: "EMP-006",
    fullName: "Jenn Caldwell",
    jobTitle: "VP of People",
    department: "Human Resources",
    email: "jenn.caldwell@ownco.com",
    phone: "415-555-0010 Ext. 001",
    photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250",
    hireDate: "2018-02-14",
    location: "San Francisco, CA",
    employmentType: "Full-Time",
    status: "Active",
    managerName: "CEO",
    directReportsCount: 5,
    workEligibility: "US Citizen",
    compensation: {
      salary: 210000,
      frequency: "Yearly",
      currency: "USD",
      effectiveDate: "2023-01-01",
      bonusPercent: 25,
      payGrade: "E2"
    },
    benefits: [],
    documents: [],
    jobDetails: {
      division: "Executive Office",
      reportsTo: "CEO",
      jobDescription: "Formulate human resource corporate strategy, manage compensation pools, direct talent acquisition and culture.",
      payType: "Salary",
      flsaStatus: "Exempt"
    }
  },
  {
    id: "EMP-007",
    fullName: "John Ryan",
    jobTitle: "Senior Frontend Engineer",
    department: "Engineering",
    email: "john.ryan@ownco.com",
    phone: "415-555-2233 Ext. 941",
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=250",
    hireDate: "2019-04-01", // 7th Anniversary around April 2026!
    location: "Remote",
    employmentType: "Full-Time",
    status: "Active",
    managerName: "Alisha Patel",
    directReportsCount: 0,
    workEligibility: "US Citizen",
    compensation: {
      salary: 135000,
      frequency: "Yearly",
      currency: "USD",
      effectiveDate: "2022-04-01",
      bonusPercent: 10,
      payGrade: "P3"
    },
    benefits: [],
    documents: [],
    jobDetails: {
      division: "Product & Engineering",
      reportsTo: "Alisha Patel, Engineering Manager",
      jobDescription: "Craft clean, accessible UI interfaces across web apps using React and modern architectures.",
      payType: "Salary",
      flsaStatus: "Exempt"
    }
  },
  {
    id: "EMP-008",
    fullName: "Dom Pasque",
    jobTitle: "UI/UX Lead Designer",
    department: "Design",
    email: "dom.pasque@ownco.com",
    phone: "415-555-8844 Ext. 221",
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=250",
    hireDate: "2022-04-02", // 4th Anniversary around April 2026!
    location: "San Francisco, CA",
    employmentType: "Full-Time",
    status: "Active",
    managerName: "Matt Vargas",
    directReportsCount: 1,
    workEligibility: "US Citizen",
    compensation: {
      salary: 125000,
      frequency: "Yearly",
      currency: "USD",
      effectiveDate: "2024-01-01",
      bonusPercent: 8
    },
    benefits: [],
    documents: [],
    jobDetails: {
      division: "Product & Engineering",
      reportsTo: "Matt Vargas, Sr. Product Manager",
      jobDescription: "Own the design system, lead UX research, compile wireframes and beautiful user flows.",
      payType: "Salary",
      flsaStatus: "Exempt"
    }
  },
  {
    id: "EMP-009",
    fullName: "Karin Petty",
    jobTitle: "Growth Marketing Specialist",
    department: "Marketing",
    email: "karin.p@ownco.com",
    phone: "415-555-1155 Ext. 742",
    photoUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=250",
    hireDate: "2024-05-15",
    location: "Los Angeles, CA",
    employmentType: "Full-Time",
    status: "Active",
    managerName: "Marcus Vance",
    directReportsCount: 0,
    workEligibility: "US Citizen",
    compensation: {
      salary: 75000,
      frequency: "Yearly",
      currency: "USD",
      effectiveDate: "2024-05-15",
      bonusPercent: 5
    },
    benefits: [],
    documents: [],
    jobDetails: {
      division: "Go To Market",
      reportsTo: "Marcus Vance, Director of Growth",
      jobDescription: "Analyze campaign conversions, optimize paid spend models, scale customer conversion channels.",
      payType: "Salary",
      flsaStatus: "Exempt"
    }
  }
];

export const INITIAL_JOBS: JobPosting[] = [
  {
    id: "JOB-001",
    title: "Senior Backend Engineer (Node.js/Go)",
    department: "Engineering",
    location: "Remote",
    type: "Full-Time",
    status: "Open",
    applicantsCount: 34,
    postedDate: "2026-06-10",
    description: "We are seeking a senior systems builder to design and scale our cloud services. Expertise in database optimization, distributed event brokers (Kafka), and microservices is required.",
    salaryRange: "$140,000 - $175,000"
  },
  {
    id: "JOB-002",
    title: "Staff Product Designer",
    department: "Design",
    location: "San Francisco, CA",
    type: "Full-Time",
    status: "Open",
    applicantsCount: 18,
    postedDate: "2026-06-18",
    description: "Lead design exploration for our brand-new financial analytics suites. Cooperate closely with product managers, analyze telemetry, and construct pixel-perfect visual workflows.",
    salaryRange: "$150,000 - $190,000"
  },
  {
    id: "JOB-003",
    title: "Enterprise Account Executive",
    department: "Sales",
    location: "New York, NY",
    type: "Full-Time",
    status: "Open",
    applicantsCount: 22,
    postedDate: "2026-06-25",
    description: "Own commercial sales cycles, target major financial hubs, pitch to C-level stakeholders, and manage multi-million pipelines.",
    salaryRange: "$90,000 Base + OTE"
  },
  {
    id: "JOB-004",
    title: "HR Compliance Coordinator",
    department: "Human Resources",
    location: "Lindon, Utah",
    type: "Full-Time",
    status: "Draft",
    applicantsCount: 0,
    postedDate: "2026-07-02",
    description: "Maintain and update national policy manuals, track labor-law compliance filings, process local worker logs, and support audit operations.",
    salaryRange: "$55,000 - $65,000"
  }
];

export const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: "CAN-001",
    fullName: "Alex Rivera",
    email: "alex.rivera@gmail.com",
    phone: "510-555-3311",
    appliedForJobId: "JOB-001",
    appliedForJobTitle: "Senior Backend Engineer (Node.js/Go)",
    source: "LinkedIn",
    stage: "Interviewing",
    appliedDate: "2026-06-12",
    rating: 4,
    notes: "Demonstrates strong knowledge of database modeling. Solved the technical query with ease. Next up: Culture fit interview."
  },
  {
    id: "CAN-002",
    fullName: "Elena Rostova",
    email: "elena.r@yahoo.com",
    phone: "650-555-8890",
    appliedForJobId: "JOB-001",
    appliedForJobTitle: "Senior Backend Engineer (Node.js/Go)",
    source: "Referral",
    stage: "Offer",
    appliedDate: "2026-06-11",
    rating: 5,
    notes: "Incredible technical assessment score. Standard architect material. Recommended highly by Jenn. Drafted an initial compensation offer."
  },
  {
    id: "CAN-003",
    fullName: "Brandon Fletcher",
    email: "b_fletcher@designcorp.io",
    phone: "415-555-2244",
    appliedForJobId: "JOB-002",
    appliedForJobTitle: "Staff Product Designer",
    source: "Indeed",
    stage: "Phone Screen",
    appliedDate: "2026-06-20",
    rating: 3,
    notes: "Decent aesthetic portfolio. Needs additional depth on business logic metrics. Scheduling phone screen call."
  },
  {
    id: "CAN-004",
    fullName: "Maya Patel",
    email: "maya.patel@outlook.com",
    phone: "212-555-6677",
    appliedForJobId: "JOB-003",
    appliedForJobTitle: "Enterprise Account Executive",
    source: "LinkedIn",
    stage: "Applied",
    appliedDate: "2026-06-27",
    rating: 4,
    notes: "Has 6 years of fintech SaaS sales experience at Stripe. Highly active prospect."
  },
  {
    id: "CAN-005",
    fullName: "Lucas Zhao",
    email: "lucaszhao@ucla.edu",
    phone: "310-555-0102",
    appliedForJobId: "JOB-001",
    appliedForJobTitle: "Senior Backend Engineer (Node.js/Go)",
    source: "Campus",
    stage: "Declined",
    appliedDate: "2026-06-14",
    rating: 2,
    notes: "Candidate lacked sufficient industrial systems experience for a senior title. Great potential, referred to junior roster."
  }
];

export const INITIAL_INTERVIEWS: Interview[] = [
  {
    id: "INT-001",
    candidateId: "CAN-001",
    candidateName: "Alex Rivera",
    jobTitle: "Senior Backend Engineer (Node.js/Go)",
    date: "2026-07-06",
    time: "10:00 AM - 11:00 AM",
    interviewers: ["Alisha Patel", "John Ryan"],
    type: "Technical",
    status: "Scheduled"
  },
  {
    id: "INT-002",
    candidateId: "CAN-003",
    candidateName: "Brandon Fletcher",
    jobTitle: "Staff Product Designer",
    date: "2026-07-04",
    time: "2:00 PM - 2:30 PM",
    interviewers: ["Dom Pasque"],
    type: "Screening",
    status: "Scheduled"
  },
  {
    id: "INT-003",
    candidateId: "CAN-002",
    candidateName: "Elena Rostova",
    jobTitle: "Senior Backend Engineer (Node.js/Go)",
    date: "2026-06-28",
    time: "3:00 PM - 4:00 PM",
    interviewers: ["Jenn Caldwell", "Matt Vargas"],
    type: "Culture Fit",
    status: "Completed",
    feedback: "Elena matches the company core dynamics wonderfully. Proactive, transparent, and eager to build. We should dispatch an offer."
  }
];

export const INITIAL_OFFERS: Offer[] = [
  {
    id: "OFF-001",
    candidateId: "CAN-002",
    candidateName: "Elena Rostova",
    jobTitle: "Senior Backend Engineer (Node.js/Go)",
    baseSalary: 155000,
    bonusPercent: 10,
    offerDate: "2026-07-01",
    expirationDate: "2026-07-08",
    status: "Sent"
  }
];

export const INITIAL_ONBOARDING: OnboardingTask[] = [
  { id: "ONB-01", employeeId: "EMP-003", employeeName: "Omar Abbad", title: "Sign Benefits Enrollment Form", dueDate: "2026-04-05", category: "HR Admin", isCompleted: true, description: "Select health plans, dental riders, and submit signed form." },
  { id: "ONB-02", employeeId: "EMP-003", employeeName: "Omar Abbad", title: "Complete IT Hardware & Auth Setup", dueDate: "2026-04-01", category: "IT Setup", isCompleted: true, description: "Provision security keys, register laptop, authorize Okta portals." },
  { id: "ONB-03", employeeId: "EMP-003", employeeName: "Omar Abbad", title: "Complete Sales Playbook Overview", dueDate: "2026-04-10", category: "Training", isCompleted: false, description: "Review CRM cycles, competitor landscape, price models, and pitch flow." },
  { id: "ONB-04", employeeId: "EMP-004", employeeName: "Anna Lim", title: "Complete Operations Systems Briefing", dueDate: "2026-03-15", category: "Training", isCompleted: true, description: "Review Zendesk routes, escalations thresholds, and VIP response tier SLAs." },
  { id: "ONB-05", employeeId: "EMP-001", employeeName: "Matt Vargas", title: "Schedule Team Intro Call for New Hires", dueDate: "2025-08-26", category: "Team Meet", isCompleted: false, description: "Set up informal 30-minute meeting to welcome Omar and Anna." },
  { id: "ONB-06", employeeId: "EMP-001", employeeName: "Matt Vargas", title: "Submit I-9 Re-verification Docs", dueDate: "2025-08-24", category: "HR Admin", isCompleted: false, description: "Re-validate visa status documents with HR department." },
  { id: "ONB-07", employeeId: "EMP-001", employeeName: "Matt Vargas", title: "Complete Security Compliance Certificate", dueDate: "2025-08-25", category: "Training", isCompleted: false, description: "Read SOC2 data protection guidelines and pass the compliance quiz." }
];

export const INITIAL_GOALS: PerformanceGoal[] = [
  { id: "G-01", employeeId: "EMP-001", title: "Launch V2 Analytics Engine", description: "Deliver standard analytics schemas, integrate metric charts in React client, achieve 99.8% availability.", targetDate: "2026-08-15", progress: 65, status: "In Progress", category: "Individual" },
  { id: "G-02", employeeId: "EMP-001", title: "Design 3 Growth Feature Tests", description: "Incorporate A/B tests on signup widgets, measure impact, and scale positive cohorts.", targetDate: "2026-07-30", progress: 20, status: "In Progress", category: "Individual" },
  { id: "G-03", employeeId: "EMP-002", title: "Complete Utah Office Safety Manual", description: "Draft physical safety layouts, fire exits, emergency contact sheets for Lindon.", targetDate: "2026-07-20", progress: 90, status: "In Progress", category: "Individual" },
  { id: "G-04", employeeId: "EMP-002", title: "Audit Employee Document Indexing", description: "Verify that all 2025 hires have fully signed NDAs and I-9 documents archived.", targetDate: "2026-09-01", progress: 100, status: "Completed", category: "Individual" }
];

export const INITIAL_FEEDBACK: PeerFeedback[] = [
  { id: "F-01", fromEmployeeId: "EMP-008", fromEmployeeName: "Dom Pasque", toEmployeeId: "EMP-001", toEmployeeName: "Matt Vargas", content: "Matt is an incredible partner. He provides crystal clear requirements which saves the design team tons of revisions.", date: "2026-06-20", rating: 5 },
  { id: "F-02", fromEmployeeId: "EMP-007", fromEmployeeName: "John Ryan", toEmployeeId: "EMP-001", toEmployeeName: "Matt Vargas", content: "Highly responsive during active sprints, although sometimes technical tasks need deeper refinement before planning starts.", date: "2026-06-25", rating: 4 }
];

export const INITIAL_ASSESSMENTS: Assessment[] = [
  { id: "AS-01", employeeId: "EMP-001", period: "Annual Review 2026", status: "Self Assessment Pending", selfComments: "", managerComments: "" },
  { id: "AS-02", employeeId: "EMP-002", period: "Annual Review 2026", status: "Completed", selfScore: 4.5, managerScore: 4.7, selfComments: "Had an incredible year organizing our Lindon team hub expansion.", managerComments: "Charlotte's contribution is critical to regional operations. Outstanding execution on compliance." }
];

export const INITIAL_TIME_OFF_REQUESTS: TimeOffRequest[] = [
  { id: "TO-101", employeeId: "EMP-002", employeeName: "Charlotte Danielle Abbott", employeePhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250", type: "Vacation", startDate: "2026-07-10", endDate: "2026-07-14", totalDays: 3, status: "Approved", notes: "Family trip to Utah National Parks." },
  { id: "TO-102", employeeId: "EMP-005", employeeName: "Clark Fuller", employeePhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250", type: "Sick Leave", startDate: "2026-07-03", endDate: "2026-07-03", totalDays: 1, status: "Approved", notes: "Dental cleaning appointment." },
  { id: "TO-103", employeeId: "EMP-007", employeeName: "John Ryan", employeePhoto: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=250", type: "Vacation", startDate: "2026-08-01", endDate: "2026-08-08", totalDays: 5, status: "Pending", notes: "Summer vacation." },
  { id: "TO-104", employeeId: "EMP-009", employeeName: "Karin Petty", employeePhoto: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=250", type: "Personal", startDate: "2026-07-15", endDate: "2026-07-15", totalDays: 1, status: "Pending", notes: "Relocation setup assistance." }
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  { id: "ATT-01", employeeId: "EMP-001", employeeName: "Matt Vargas", date: "2026-07-02", clockIn: "08:52 AM", clockOut: "05:15 PM", status: "Present" },
  { id: "ATT-02", employeeId: "EMP-001", employeeName: "Matt Vargas", date: "2026-07-03", clockIn: "09:02 AM", status: "Present", notes: "Clocked in with 2 min variance." },
  { id: "ATT-03", employeeId: "EMP-002", employeeName: "Charlotte Danielle Abbott", date: "2026-07-02", clockIn: "09:15 AM", clockOut: "01:15 PM", status: "Present" },
  { id: "ATT-04", employeeId: "EMP-003", employeeName: "Omar Abbad", date: "2026-07-02", clockIn: "08:45 AM", clockOut: "05:00 PM", status: "Present" }
];

export const INITIAL_TIMESHEETS: TimesheetWeek[] = [
  {
    id: "TS-101",
    employeeId: "EMP-001",
    weekStartDate: "2026-06-29",
    status: "Approved",
    dailyHours: [
      { day: "Mon", date: "2026-06-29", regularHours: 8, overtimeHours: 0 },
      { day: "Tue", date: "2026-06-30", regularHours: 8, overtimeHours: 1 },
      { day: "Wed", date: "2026-07-01", regularHours: 8, overtimeHours: 0 },
      { day: "Thu", date: "2026-07-02", regularHours: 8, overtimeHours: 0 },
      { day: "Fri", date: "2026-07-03", regularHours: 8, overtimeHours: 0 },
      { day: "Sat", date: "2026-07-04", regularHours: 0, overtimeHours: 0 },
      { day: "Sun", date: "2026-07-05", regularHours: 0, overtimeHours: 0 }
    ]
  },
  {
    id: "TS-102",
    employeeId: "EMP-002",
    weekStartDate: "2026-06-29",
    status: "Submitted",
    dailyHours: [
      { day: "Mon", date: "2026-06-29", regularHours: 4, overtimeHours: 0 },
      { day: "Tue", date: "2026-06-30", regularHours: 4, overtimeHours: 0 },
      { day: "Wed", date: "2026-07-01", regularHours: 4, overtimeHours: 0 },
      { day: "Thu", date: "2026-07-02", regularHours: 4, overtimeHours: 0 },
      { day: "Fri", date: "2026-07-03", regularHours: 4, overtimeHours: 0 },
      { day: "Sat", date: "2026-07-04", regularHours: 0, overtimeHours: 0 },
      { day: "Sun", date: "2026-07-05", regularHours: 0, overtimeHours: 0 }
    ]
  }
];

export const INITIAL_SCHEDULE: ShiftSchedule[] = [
  { id: "S-101", employeeId: "EMP-002", employeeName: "Charlotte Danielle Abbott", date: "2026-07-06", startTime: "09:00 AM", endTime: "01:00 PM", department: "Human Resources" },
  { id: "S-102", employeeId: "EMP-002", employeeName: "Charlotte Danielle Abbott", date: "2026-07-07", startTime: "09:00 AM", endTime: "01:00 PM", department: "Human Resources" },
  { id: "S-103", employeeId: "EMP-005", employeeName: "Clark Fuller", date: "2026-07-06", startTime: "08:30 AM", endTime: "05:00 PM", department: "Human Resources" },
  { id: "S-104", employeeId: "EMP-003", employeeName: "Omar Abbad", date: "2026-07-06", startTime: "09:00 AM", endTime: "05:30 PM", department: "Sales" }
];

export const INITIAL_PAYROLL_RUNS: PayrollRun[] = [
  { id: "PR-01", periodStart: "2026-06-01", periodEnd: "2026-06-30", payDate: "2026-06-30", totalGrossPay: 72000, totalDeductions: 18000, totalNetPay: 54000, employeesPaidCount: 8, status: "Processed" },
  { id: "PR-02", periodStart: "2026-07-01", periodEnd: "2026-07-31", payDate: "2026-07-31", totalGrossPay: 76500, totalDeductions: 19100, totalNetPay: 57400, employeesPaidCount: 9, status: "Draft" }
];

export const INITIAL_PAYROLL_RECORDS: PayrollRecord[] = [
  { id: "P-101", employeeId: "EMP-001", employeeName: "Matt Vargas", grossSalary: 12083.33, allowances: 450, deductions: 1200, taxes: 2416.66, netPay: 8916.67, paymentMethod: "Direct Deposit", status: "Pending" },
  { id: "P-102", employeeId: "EMP-002", employeeName: "Charlotte Danielle Abbott", grossSalary: 6500.00, allowances: 150, deductions: 450, taxes: 1105.00, netPay: 5095.00, paymentMethod: "Direct Deposit", status: "Pending" },
  { id: "P-103", employeeId: "EMP-003", employeeName: "Omar Abbad", grossSalary: 7083.33, allowances: 200, deductions: 350, taxes: 1204.16, netPay: 5729.17, paymentMethod: "Direct Deposit", status: "Pending" }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ANN-001",
    title: "New Health & Wellness Benefits Package 2026",
    content: "We are thrilled to partner with Blue Shield and Delta Dental to offer expanded wellness reimbursements starting this quarter. Reach out to Charlotte in HR for enrollment portals.",
    postedDate: "2026-06-15",
    author: "Jenn Caldwell",
    category: "Policy",
    isImportant: true
  },
  {
    id: "ANN-002",
    title: "Independence Day Holiday Observance",
    content: "Please note that all regional hubs will be closed on Friday, July 3rd in observance of Independence Day. Enjoy the long weekend with your families!",
    postedDate: "2026-07-01",
    author: "Jenn Caldwell",
    category: "Holiday",
    isImportant: true
  }
];
