/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Navbar from "./components/Layout/Navbar";
import HomeDashboard from "./components/Dashboard/HomeDashboard";
import EmployeeDirectory from "./components/Employees/EmployeeDirectory";
import HiringModule from "./components/Hiring/HiringModule";
import OnboardingModule from "./components/Onboarding/OnboardingModule";
import PerformanceModule from "./components/Performance/PerformanceModule";
import TimeModule from "./components/Time/TimeModule";
import PayrollModule from "./components/Payroll/PayrollModule";
import ReportsModule from "./components/Reports/ReportsModule";
import SettingsModule from "./components/Settings/SettingsModule";

import { Employee } from "./types";

import {
  INITIAL_EMPLOYEES,
  INITIAL_CANDIDATES,
  INITIAL_INTERVIEWS,
  INITIAL_OFFERS,
  INITIAL_ONBOARDING,
  INITIAL_GOALS,
  INITIAL_FEEDBACK,
  INITIAL_ASSESSMENTS,
  INITIAL_TIME_OFF_REQUESTS,
  INITIAL_ATTENDANCE,
  INITIAL_TIMESHEETS,
  INITIAL_SCHEDULE,
  INITIAL_PAYROLL_RUNS,
  INITIAL_PAYROLL_RECORDS,
  INITIAL_ANNOUNCEMENTS
} from "./data/mockData";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("Home");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // Core state arrays loaded from localStorage or falling back to detailed mockData
  const [employees, setEmployees] = useState<Employee[]>(() => {
    const saved = localStorage.getItem("bamboo_employees");
    return saved ? JSON.parse(saved) : INITIAL_EMPLOYEES;
  });

  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem("bamboo_jobs");
    if (saved) return JSON.parse(saved);
    // Deriving initial jobs list from the candidates or using default array
    return [
      { id: "JOB-001", title: "Senior Backend Engineer (Node.js/Go)", department: "Engineering", location: "Remote", type: "Full-Time", status: "Open", applicantsCount: 3, postedDate: "2026-06-10", description: "Xây dựng các API hiệu suất cao bằng Node.js và Go. Thiết kế cơ sở dữ liệu tối ưu.", salaryRange: "$130,000 - $160,000" },
      { id: "JOB-002", title: "Staff Product Designer", department: "Design", location: "San Francisco, CA", type: "Full-Time", status: "Open", applicantsCount: 1, postedDate: "2026-06-18", description: "Dẫn dắt ngôn ngữ thiết kế sản phẩm, xây dựng các wireframes chi tiết và prototype.", salaryRange: "$120,000 - $150,000" },
      { id: "JOB-003", title: "Enterprise Account Executive", department: "Sales", location: "Remote", type: "Full-Time", status: "Open", applicantsCount: 1, postedDate: "2026-06-25", description: "Mở rộng tệp khách hàng doanh nghiệp lớn cho các sản phẩm SaaS của công ty.", salaryRange: "$100,000 - $130,000" }
    ];
  });

  const [candidates, setCandidates] = useState(() => {
    const saved = localStorage.getItem("bamboo_candidates");
    return saved ? JSON.parse(saved) : INITIAL_CANDIDATES;
  });

  const [interviews, setInterviews] = useState(() => {
    const saved = localStorage.getItem("bamboo_interviews");
    return saved ? JSON.parse(saved) : INITIAL_INTERVIEWS;
  });

  const [offers, setOffers] = useState(() => {
    const saved = localStorage.getItem("bamboo_offers");
    return saved ? JSON.parse(saved) : INITIAL_OFFERS;
  });

  const [onboardingTasks, setOnboardingTasks] = useState(() => {
    const saved = localStorage.getItem("bamboo_onboarding");
    return saved ? JSON.parse(saved) : INITIAL_ONBOARDING;
  });

  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem("bamboo_goals");
    return saved ? JSON.parse(saved) : INITIAL_GOALS;
  });

  const [feedbacks, setFeedbacks] = useState(() => {
    const saved = localStorage.getItem("bamboo_feedback");
    return saved ? JSON.parse(saved) : INITIAL_FEEDBACK;
  });

  const [assessments, setAssessments] = useState(() => {
    const saved = localStorage.getItem("bamboo_assessments");
    return saved ? JSON.parse(saved) : INITIAL_ASSESSMENTS;
  });

  const [timeOffRequests, setTimeOffRequests] = useState(() => {
    const saved = localStorage.getItem("bamboo_timeoff");
    return saved ? JSON.parse(saved) : INITIAL_TIME_OFF_REQUESTS;
  });

  const [attendanceRecords, setAttendanceRecords] = useState(() => {
    const saved = localStorage.getItem("bamboo_attendance");
    return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE;
  });

  const [timesheetWeeks, setTimesheetWeeks] = useState(() => {
    const saved = localStorage.getItem("bamboo_timesheets");
    return saved ? JSON.parse(saved) : INITIAL_TIMESHEETS;
  });

  const [shiftSchedules, setShiftSchedules] = useState(() => {
    const saved = localStorage.getItem("bamboo_schedule");
    return saved ? JSON.parse(saved) : INITIAL_SCHEDULE;
  });

  const [payrollRuns, setPayrollRuns] = useState(() => {
    const saved = localStorage.getItem("bamboo_payroll_runs");
    return saved ? JSON.parse(saved) : INITIAL_PAYROLL_RUNS;
  });

  const [payrollRecords, setPayrollRecords] = useState(() => {
    const saved = localStorage.getItem("bamboo_payroll_records");
    return saved ? JSON.parse(saved) : INITIAL_PAYROLL_RECORDS;
  });

  const [announcements, setAnnouncements] = useState(() => {
    const saved = localStorage.getItem("bamboo_announcements");
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  // Current logged in user is Matt Vargas (Sr. Product Manager)
  const currentUser = employees.find(e => e.id === "EMP-001") || employees[0];

  // Save changes to LocalStorage on updates
  useEffect(() => {
    localStorage.setItem("bamboo_employees", JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem("bamboo_jobs", JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem("bamboo_candidates", JSON.stringify(candidates));
  }, [candidates]);

  useEffect(() => {
    localStorage.setItem("bamboo_interviews", JSON.stringify(interviews));
  }, [interviews]);

  useEffect(() => {
    localStorage.setItem("bamboo_offers", JSON.stringify(offers));
  }, [offers]);

  useEffect(() => {
    localStorage.setItem("bamboo_onboarding", JSON.stringify(onboardingTasks));
  }, [onboardingTasks]);

  useEffect(() => {
    localStorage.setItem("bamboo_goals", JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem("bamboo_feedback", JSON.stringify(feedbacks));
  }, [feedbacks]);

  useEffect(() => {
    localStorage.setItem("bamboo_assessments", JSON.stringify(assessments));
  }, [assessments]);

  useEffect(() => {
    localStorage.setItem("bamboo_timeoff", JSON.stringify(timeOffRequests));
  }, [timeOffRequests]);

  useEffect(() => {
    localStorage.setItem("bamboo_attendance", JSON.stringify(attendanceRecords));
  }, [attendanceRecords]);

  useEffect(() => {
    localStorage.setItem("bamboo_timesheets", JSON.stringify(timesheetWeeks));
  }, [timesheetWeeks]);

  useEffect(() => {
    localStorage.setItem("bamboo_schedule", JSON.stringify(shiftSchedules));
  }, [shiftSchedules]);

  useEffect(() => {
    localStorage.setItem("bamboo_payroll_runs", JSON.stringify(payrollRuns));
  }, [payrollRuns]);

  useEffect(() => {
    localStorage.setItem("bamboo_payroll_records", JSON.stringify(payrollRecords));
  }, [payrollRecords]);

  useEffect(() => {
    localStorage.setItem("bamboo_announcements", JSON.stringify(announcements));
  }, [announcements]);

  // Helper callback for Navbar to select an employee and automatically navigate to People tab
  const handleSelectEmployee = (emp: Employee) => {
    setSelectedEmployee(emp);
    setActiveTab("People");
  };

  return (
    <div className="website-wrapper">
      <div className="flex-1 bg-[#f3f4f6] flex flex-col font-sans text-gray-800 antialiased selection:bg-green-100 selection:text-green-800 rounded-lg overflow-hidden">
        
        {/* Top sticky Navbar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        currentUser={currentUser}
        employees={employees}
        onSelectEmployee={handleSelectEmployee}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16 overflow-y-auto">
        {activeTab === "Home" && (
          <HomeDashboard
            currentUser={currentUser}
            employees={employees}
            timeOffRequests={timeOffRequests}
            onboardingTasks={onboardingTasks}
            announcements={announcements}
            addTimeOffRequest={(newRequest) => setTimeOffRequests([newRequest, ...timeOffRequests])}
            setActiveTab={setActiveTab}
            onSelectEmployee={handleSelectEmployee}
          />
        )}

        {activeTab === "People" && (
          <EmployeeDirectory
            employees={employees}
            setEmployees={setEmployees}
            selectedEmployee={selectedEmployee}
            setSelectedEmployee={setSelectedEmployee}
            goals={goals}
            setGoals={setGoals}
            feedbacks={feedbacks}
            setFeedbacks={setFeedbacks}
            assessments={assessments}
            setAssessments={setAssessments}
          />
        )}

        {activeTab === "Hiring" && (
          <HiringModule
            jobs={jobs}
            setJobs={setJobs}
            candidates={candidates}
            setCandidates={setCandidates}
            interviews={interviews}
            setInterviews={setInterviews}
            offers={offers}
            setOffers={setOffers}
          />
        )}

        {activeTab === "Onboarding" && (
          <OnboardingModule
            onboardingTasks={onboardingTasks}
            setOnboardingTasks={setOnboardingTasks}
            employees={employees}
          />
        )}

        {activeTab === "Performance" && (
          <PerformanceModule
            goals={goals}
            feedbacks={feedbacks}
            assessments={assessments}
            employees={employees}
          />
        )}

        {activeTab === "Time" && (
          <TimeModule
            timeOffRequests={timeOffRequests}
            setTimeOffRequests={setTimeOffRequests}
            attendanceRecords={attendanceRecords}
            setAttendanceRecords={setAttendanceRecords}
            timesheetWeeks={timesheetWeeks}
            setTimesheetWeeks={setTimesheetWeeks}
            shiftSchedules={shiftSchedules}
            setShiftSchedules={setShiftSchedules}
            currentUser={currentUser}
            employees={employees}
          />
        )}

        {activeTab === "Payroll" && (
          <PayrollModule
            payrollRuns={payrollRuns}
            setPayrollRuns={setPayrollRuns}
            payrollRecords={payrollRecords}
            setPayrollRecords={setPayrollRecords}
          />
        )}

        {activeTab === "Reports" && (
          <ReportsModule
            employees={employees}
            jobs={jobs}
            candidates={candidates}
            timeOffRequests={timeOffRequests}
          />
        )}

        {activeTab === "Settings" && (
          <SettingsModule />
        )}
      </main>

      </div>
    </div>
  );
}
