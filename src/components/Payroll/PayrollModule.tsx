/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Landmark, 
  Coins, 
  ShieldAlert, 
  Play, 
  CheckCircle, 
  Printer, 
  TrendingUp, 
  FileCheck, 
  ChevronRight,
  Calculator,
  X
} from "lucide-react";
import { PayrollRun, PayrollRecord } from "../../types";

interface PayrollModuleProps {
  payrollRuns: PayrollRun[];
  setPayrollRuns: React.Dispatch<React.SetStateAction<PayrollRun[]>>;
  payrollRecords: PayrollRecord[];
  setPayrollRecords: React.Dispatch<React.SetStateAction<PayrollRecord[]>>;
}

export default function PayrollModule({
  payrollRuns,
  setPayrollRuns,
  payrollRecords,
  setPayrollRecords
}: PayrollModuleProps) {
  const [activeCycleTab, setActiveCycleTab] = useState<"Current" | "History">("Current");
  const [selectedRecord, setSelectedRecord] = useState<PayrollRecord | null>(null);

  const currentRun = payrollRuns.find((run) => run.status === "Draft") || payrollRuns[0];

  const handleProcessPayroll = (runId: string) => {
    if (confirm("Bạn có chắc chắn muốn xử lý thanh toán và phát bảng lương cho kỳ lương này? Việc này sẽ gửi thông báo phiếu lương tới toàn bộ nhân viên.")) {
      // Mark run as processed
      setPayrollRuns(payrollRuns.map((run) => 
        run.id === runId ? { ...run, status: "Processed" as const } : run
      ));

      // Mark all records as paid
      setPayrollRecords(payrollRecords.map((rec) => ({ ...rec, status: "Paid" as const })));
    }
  };

  return (
    <div id="payroll-module" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Upper sub navigation */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex space-x-4 shrink-0">
        <button
          onClick={() => setActiveCycleTab("Current")}
          className={`px-4 py-2 text-xs font-bold rounded-md transition ${
            activeCycleTab === "Current"
              ? "bg-[#1c7c24] text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Kỳ Lương Hiện Tại (Current Run)
        </button>
        <button
          onClick={() => setActiveCycleTab("History")}
          className={`px-4 py-2 text-xs font-bold rounded-md transition ${
            activeCycleTab === "History"
              ? "bg-[#1c7c24] text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Lịch Sử Thanh Toán (History Logs)
        </button>
      </div>

      {activeCycleTab === "Current" ? (
        /* ================= CURRENT PAYROLL RUN ================= */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Payroll calculation overview card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 space-y-5">
              <div>
                <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded uppercase">
                  {currentRun.status === "Draft" ? "Bản Nháp" : "Đã Phát Lương"}
                </span>
                <h3 className="text-md font-extrabold text-gray-800 mt-2 font-display">Kỳ thanh toán lương tháng này</h3>
                <p className="text-[10px] text-gray-400">Thời gian chu kỳ: {currentRun.periodStart} đến {currentRun.periodEnd}</p>
              </div>

              <div className="divide-y divide-gray-100 text-xs space-y-3 pt-2">
                <div className="flex justify-between py-1 pt-3">
                  <span className="text-gray-500">Tổng lương gộp (Gross Pay):</span>
                  <span className="font-bold text-gray-800">${currentRun.totalGrossPay.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 pt-3">
                  <span className="text-gray-500">Khấu trừ & Thuế (Deductions):</span>
                  <span className="font-bold text-rose-600">-${currentRun.totalDeductions.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 pt-3">
                  <span className="text-gray-500 font-bold text-gray-700">Thực lĩnh chuyển khoản:</span>
                  <span className="font-extrabold text-green-700">${currentRun.totalNetPay.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 pt-3 border-b pb-3">
                  <span className="text-gray-500">Nhân viên được chi trả:</span>
                  <span className="font-bold text-gray-800">{currentRun.employeesPaidCount} nhân sự</span>
                </div>
              </div>

              {currentRun.status === "Draft" ? (
                <button
                  id="btn-process-payroll"
                  onClick={() => handleProcessPayroll(currentRun.id)}
                  className="w-full bg-[#1c7c24] hover:bg-green-700 text-white font-bold text-xs py-3 rounded shadow flex items-center justify-center space-x-2 transition"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Chạy Thanh Toán & Gửi Bảng Lương</span>
                </button>
              ) : (
                <div className="bg-green-50 text-green-800 border border-green-200 p-3.5 rounded text-center text-xs font-semibold flex items-center justify-center space-x-1.5">
                  <CheckCircle className="w-4 h-4" />
                  <span>Kỳ lương đã được xử lý thành công</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Individual Paychecks stub ledger */}
          <div className="lg:col-span-8 bg-white p-5 rounded-lg border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Phiếu lương chi tiết nhân sự</h3>

            <div className="overflow-x-auto border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 text-xs">
                <thead className="bg-gray-50 text-gray-500 font-bold">
                  <tr>
                    <th className="px-4 py-2.5 text-left uppercase">Nhân viên</th>
                    <th className="px-4 py-2.5 text-left uppercase">Lương gộp (Gross)</th>
                    <th className="px-4 py-2.5 text-left uppercase">Khấu trừ</th>
                    <th className="px-4 py-2.5 text-left uppercase">Thực lĩnh (Net)</th>
                    <th className="px-4 py-2.5 text-left uppercase">Trạng thái</th>
                    <th className="px-4 py-2.5 text-right uppercase">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-600">
                  {payrollRecords.map((rec) => (
                    <tr key={rec.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3 font-bold text-gray-800">{rec.employeeName}</td>
                      <td className="px-4 py-3">${rec.grossSalary.toLocaleString()}</td>
                      <td className="px-4 py-3 text-rose-600">-${(rec.deductions + rec.taxes).toLocaleString()}</td>
                      <td className="px-4 py-3 font-extrabold text-green-700">${rec.netPay.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded font-bold text-[9px] ${
                          rec.status === "Paid" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                        }`}>
                          {rec.status === "Paid" ? "Đã trả" : "Chờ xử lý"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => setSelectedRecord(rec)}
                          className="bg-gray-100 border hover:bg-gray-200 font-bold px-2 py-1 rounded text-[10px]"
                        >
                          Chi tiết stub
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      ) : (
        /* ================= HISTORY PAYROLL RUNS ================= */
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm space-y-4 text-xs">
          <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Lịch sử phát lương</h3>
          <div className="space-y-3">
            {payrollRuns.filter(r => r.status === "Processed").map((run) => (
              <div key={run.id} className="p-4 border rounded-lg bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-gray-800">Mã kỳ lương: {run.id}</h4>
                  <p className="text-[10px] text-gray-400">Chu kỳ từ {run.periodStart} đến {run.periodEnd}</p>
                </div>
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <span className="text-gray-400 text-[10px]">Lương gộp:</span>
                    <p className="font-bold text-gray-800">${run.totalGrossPay.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-[10px]">Net Payout:</span>
                    <p className="font-bold text-green-700">${run.totalNetPay.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-[10px]">Người nhận:</span>
                    <p className="font-bold text-gray-800">{run.employeesPaidCount} nhân sự</p>
                  </div>
                </div>
                <button
                  onClick={() => alert(`Đang tải báo cáo tổng kết chi tiết cho kỳ lương ${run.id}...`)}
                  className="bg-white border text-gray-700 hover:bg-gray-100 font-bold px-3 py-1.5 rounded"
                >
                  Tải Báo Cáo CSV
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DETAILED PAYROLL STUB MODAL */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-150">
            <div className="bamboo-header p-4 text-white flex justify-between items-center">
              <h3 className="text-sm font-bold font-display flex items-center space-x-1.5">
                <Landmark className="w-5 h-5" />
                <span>Phiếu lương chi tiết (Payslip Stub)</span>
              </h3>
              <button onClick={() => setSelectedRecord(null)} className="text-white hover:opacity-80">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 text-xs">
              <div className="flex justify-between items-start border-b pb-4">
                <div>
                  <h4 className="text-md font-bold text-gray-800">{selectedRecord.employeeName}</h4>
                  <p className="text-gray-400">Mã số nhân viên: {selectedRecord.employeeId}</p>
                  <p className="text-gray-400">Phương thức chi trả: {selectedRecord.paymentMethod}</p>
                </div>
                <div className="text-right">
                  <span className="bg-green-100 text-green-800 font-bold px-2.5 py-1 rounded text-[10px] uppercase">
                    {selectedRecord.status === "Paid" ? "Đã Quyết Toán" : "Chờ xử lý"}
                  </span>
                  <p className="text-[10px] text-gray-400 mt-2">Kỳ thanh toán tháng 07/2026</p>
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-gray-700 uppercase tracking-wider border-b pb-1 text-[10px]">Cơ cấu thu nhập</h5>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 border-r pr-4">
                    <p className="font-bold text-gray-600 text-[10px] uppercase tracking-wide">Khoản Cộng (Earnings)</p>
                    <div className="flex justify-between py-1">
                      <span>Lương cơ bản:</span>
                      <span className="font-bold text-gray-800">${selectedRecord.grossSalary.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Phụ cấp / Khác:</span>
                      <span className="font-bold text-gray-800">${selectedRecord.allowances.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="font-bold text-rose-600 text-[10px] uppercase tracking-wide">Khoản Trừ (Deductions)</p>
                    <div className="flex justify-between py-1">
                      <span>Khấu trừ bảo hiểm:</span>
                      <span className="font-bold text-rose-600">-${selectedRecord.deductions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Thuế thu nhập cá nhân:</span>
                      <span className="font-bold text-rose-600">-${selectedRecord.taxes.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg flex justify-between items-center border border-green-100">
                <div>
                  <span className="text-[10px] text-green-700 uppercase font-extrabold tracking-wide">Thực lĩnh (Net Pay Transfer)</span>
                  <p className="text-[10px] text-gray-400 mt-0.5">Đã được chuyển khoản tự động vào tài khoản liên kết</p>
                </div>
                <span className="text-lg font-black text-green-700 font-display">${selectedRecord.netPay.toLocaleString()}</span>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="bg-white border text-gray-700 font-bold py-2 px-4 rounded hover:bg-gray-50 flex items-center space-x-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>In Phiếu Lương</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRecord(null)}
                  className="bg-[#1c7c24] hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Xác nhận đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
