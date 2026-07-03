/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Search, Bell, HelpCircle, Settings, User, Menu, X, Landmark, Briefcase, FileText, BarChart3, Clock, Milestone } from "lucide-react";
import { Employee } from "../../types";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: Employee;
  employees: Employee[];
  onSelectEmployee: (emp: Employee) => void;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  currentUser,
  employees,
  onSelectEmployee
}: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Filter employees for search results
  const filteredEmployees = searchQuery.trim()
    ? employees.filter((emp) =>
        emp.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSearchSelect = (emp: Employee) => {
    onSelectEmployee(emp);
    setActiveTab("People");
    setSearchQuery("");
    setShowSearchResults(false);
  };

  const navItems = [
    { id: "Home", label: "Trang chủ" },
    { id: "My Info", label: "Hồ sơ" },
    { id: "People", label: "Nhân sự" },
    { id: "Hiring", label: "Tuyển dụng" },
    { id: "Onboarding", label: "Hội nhập" },
    { id: "Performance", label: "Hiệu suất" },
    { id: "Time", label: "Thời gian" },
    { id: "Payroll", label: "Lương thưởng" },
    { id: "Reports", label: "Báo cáo" }
  ];

  return (
    <header id="bamboohr-navbar" className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14">
          {/* Left side: Logo and Desktop navigation */}
          <div className="flex items-center space-x-6 flex-1">
            <div 
              onClick={() => setActiveTab("Home")} 
              className="flex items-center cursor-pointer select-none py-2"
            >
              <div className="flex items-center space-x-1">
                {/* SVG Leaf Logo */}
                <svg className="w-6 h-6 text-[#2d8a39]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 8C8 10 5.9 16.1 5 19c3.1-1.1 9.2-3.2 11.2-12.2.7.2 1.4.3 2 .3.3-1.6-.2-3.3-1.2-4.1-.8 1-2.5 1.5-4.1.8.1.7.3 1.4.5 2.1L17 8z" />
                  <path d="M9.7 15.3c-4.5.3-5.6 3.1-6.1 4.5 1.5-.2 4.3-.8 5.6-5.1.3.3.7.6 1.1.8 0-.8-.1-1.6-.6-2-.5.5-1.3.8-2.1.6 0 .3.1.7.2 1z" opacity="0.8" />
                </svg>
                <div className="flex items-baseline">
                  <span className="text-xl font-extrabold text-[#2d8a39] tracking-tight font-display">bamboo</span>
                  <span className="text-xl font-bold text-gray-500 font-display">HR</span>
                  <span className="text-[10px] bg-amber-500 text-white font-bold ml-1 px-1 rounded uppercase tracking-widest scale-90">PRO</span>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-1 h-full pt-2">
              {navItems.map((item) => {
                const isActive = activeTab === item.id || 
                  (item.id === "My Info" && activeTab === "MyInfoDetail");
                return (
                  <button
                    key={item.id}
                    id={`nav-tab-${item.id}`}
                    onClick={() => {
                      if (item.id === "My Info") {
                        // View Current user directly
                        onSelectEmployee(currentUser);
                        setActiveTab("People");
                      } else {
                        setActiveTab(item.id);
                      }
                    }}
                    className={`px-3 py-2 text-sm font-medium rounded-t-md border-b-2 transition-all duration-150 ${
                      isActive
                        ? "text-[#1c7c24] border-[#1c7c24] bg-[#f0f9f1]"
                        : "text-gray-600 border-transparent hover:text-[#1c7c24] hover:bg-gray-50"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right side: Search, Alerts, Settings, Profile */}
          <div className="flex items-center space-x-3">
            {/* Search Bar */}
            <div className="hidden sm:block relative w-48 md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchResults(true);
                }}
                onFocus={() => setShowSearchResults(true)}
                placeholder="Tìm nhân viên..."
                className="block w-full pl-9 pr-3 py-1.5 text-xs bg-gray-100 border border-transparent rounded-full focus:outline-none focus:ring-1 focus:ring-[#2d8a39] focus:bg-white focus:border-gray-200 transition-all duration-150"
              />

              {/* Search Dropdown */}
              {showSearchResults && searchQuery.trim() && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-xl z-50 max-h-80 overflow-y-auto">
                  <div className="p-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 flex justify-between items-center">
                    <span>Kết quả tìm kiếm ({filteredEmployees.length})</span>
                    <button onClick={() => setShowSearchResults(false)} className="hover:text-gray-600 text-gray-400">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((emp) => (
                      <div
                        key={emp.id}
                        onClick={() => handleSearchSelect(emp)}
                        className="flex items-center space-x-3 p-2 hover:bg-[#f0f9f1] cursor-pointer border-b border-gray-50 transition"
                      >
                        <img
                          src={emp.photoUrl}
                          alt={emp.fullName}
                          className="w-8 h-8 rounded-full object-cover border border-gray-100"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-gray-800 truncate">{emp.fullName}</p>
                          <p className="text-[10px] text-gray-500 truncate">{emp.jobTitle}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-xs text-gray-400">
                      Không tìm thấy nhân viên nào
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Notifications */}
            <div className="relative">
              <button 
                id="btn-notifications"
                onClick={() => setActiveTab("Home")} // Redirect to Home tasks
                className="p-1.5 rounded-full text-gray-500 hover:text-[#1c7c24] hover:bg-gray-100 relative transition"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[9px] font-bold leading-none text-white bg-amber-500 rounded-full border border-white">
                  9
                </span>
              </button>
            </div>

            {/* Settings Link */}
            <button
              id="btn-settings"
              onClick={() => setActiveTab("Settings")}
              className={`p-1.5 rounded-full text-gray-500 hover:text-[#1c7c24] hover:bg-gray-100 transition ${
                activeTab === "Settings" ? "text-[#1c7c24] bg-gray-100" : ""
              }`}
              title="Cấu hình hệ thống"
            >
              <Settings className="h-5 w-5" />
            </button>

            {/* Help Button */}
            <button className="p-1.5 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 hidden sm:block">
              <HelpCircle className="h-5 w-5" />
            </button>

            {/* User Profile Avatar */}
            <div 
              onClick={() => {
                onSelectEmployee(currentUser);
                setActiveTab("People");
              }}
              className="flex items-center space-x-2 pl-2 border-l border-gray-200 cursor-pointer hover:opacity-95"
            >
              <img
                src={currentUser.photoUrl}
                alt={currentUser.fullName}
                className="h-8 w-8 rounded-full object-cover border-2 border-green-600"
              />
              <span className="hidden md:inline text-xs font-bold text-gray-700 truncate max-w-[100px]">
                {currentUser.fullName}
              </span>
            </div>

            {/* Mobile Menu Icon */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1 rounded-md text-gray-500 hover:text-[#1c7c24] hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 py-2 px-4 shadow-inner space-y-1">
          {/* Mobile search */}
          <div className="relative mb-3 pt-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              placeholder="Tìm nhân viên..."
              className="block w-full pl-9 pr-3 py-1.5 text-xs bg-gray-100 border border-transparent rounded-full focus:outline-none focus:bg-white"
            />
          </div>

          {navItems.map((item) => {
            const isActive = activeTab === item.id || 
              (item.id === "My Info" && activeTab === "MyInfoDetail");
            return (
              <button
                key={item.id}
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (item.id === "My Info") {
                    onSelectEmployee(currentUser);
                    setActiveTab("People");
                  } else {
                    setActiveTab(item.id);
                  }
                }}
                className={`w-full text-left px-3 py-2 text-xs font-medium rounded-md transition ${
                  isActive
                    ? "text-white bg-[#1c7c24]"
                    : "text-gray-700 hover:bg-[#f0f9f1] hover:text-[#1c7c24]"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
