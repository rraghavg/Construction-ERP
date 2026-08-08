import apiClient from '../api/apiClient';

export const hrService = {
  // Employees
  createEmployee: (data) => apiClient.post('/hr/employees', data),
  getEmployees: (params) => apiClient.get('/hr/employees', { params }),

  // Attendance
  recordAttendance: (data) => apiClient.post('/hr/attendance', data),

  // Leaves
  submitLeaveRequest: (data) => apiClient.post('/hr/leaves', data),
  approveLeaveRequest: (leaveRequestId) => apiClient.patch(`/hr/leaves/${leaveRequestId}/approve`),

  // Payroll
  calculatePayroll: (data) => apiClient.post('/hr/payroll/calculate', data),
  postPayrollToFinance: (payrollRunId) => apiClient.post(`/hr/payroll/${payrollRunId}/post`),

  // Analytics
  getAnalytics: () => apiClient.get('/hr/analytics')
};
