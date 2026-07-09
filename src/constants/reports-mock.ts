// Patients report
export const patientsGrowthData = [
  { label: "Feb", value: 980 },
  { label: "Mar", value: 1042 },
  { label: "Apr", value: 1105 },
  { label: "May", value: 1168 },
  { label: "Jun", value: 1224 },
  { label: "Jul", value: 1284 },
];

export const patientsByAgeGroup = [
  { label: "0-18", value: 210, color: "var(--color-chart-1)" },
  { label: "19-35", value: 420, color: "var(--color-chart-2)" },
  { label: "36-55", value: 380, color: "var(--color-chart-3)" },
  { label: "56+", value: 274, color: "var(--color-chart-5)" },
];

export const patientsReportRows = [
  { month: "Feb 2026", newPatients: 62, returning: 340, total: 402 },
  { month: "Mar 2026", newPatients: 74, returning: 365, total: 439 },
  { month: "Apr 2026", newPatients: 68, returning: 390, total: 458 },
  { month: "May 2026", newPatients: 81, returning: 402, total: 483 },
  { month: "Jun 2026", newPatients: 76, returning: 421, total: 497 },
  { month: "Jul 2026", newPatients: 58, returning: 445, total: 503 },
];

// Revenue report
export const revenueTrendData = [
  { label: "Feb", value: 14200 },
  { label: "Mar", value: 15100 },
  { label: "Apr", value: 15800 },
  { label: "May", value: 16900 },
  { label: "Jun", value: 17500 },
  { label: "Jul", value: 18420 },
];

export const revenueByDepartment = [
  { label: "Cardiology", value: 5200 },
  { label: "Orthopedics", value: 4100 },
  { label: "Pediatrics", value: 3400 },
  { label: "Dermatology", value: 2600 },
  { label: "Neurology", value: 3120 },
];

export const revenueReportRows = [
  { month: "Feb 2026", revenue: 14200, expenses: 5100, profit: 9100 },
  { month: "Mar 2026", revenue: 15100, expenses: 5300, profit: 9800 },
  { month: "Apr 2026", revenue: 15800, expenses: 5600, profit: 10200 },
  { month: "May 2026", revenue: 16900, expenses: 6000, profit: 10900 },
  { month: "Jun 2026", revenue: 17500, expenses: 6400, profit: 11100 },
  { month: "Jul 2026", revenue: 18420, expenses: 6680, profit: 11740 },
];

// Appointments report
export const appointmentsTrendData = [
  { label: "Feb", value: 320 },
  { label: "Mar", value: 365 },
  { label: "Apr", value: 401 },
  { label: "May", value: 428 },
  { label: "Jun", value: 462 },
  { label: "Jul", value: 490 },
];

export const appointmentsStatusBreakdown = [
  { label: "Completed", value: 68, color: "var(--color-success)" },
  { label: "Scheduled", value: 22, color: "var(--color-warning)" },
  { label: "Cancelled", value: 7, color: "var(--color-destructive)" },
  { label: "No-show", value: 3, color: "var(--color-muted-foreground)" },
];

export const appointmentsReportRows = [
  { month: "Feb 2026", completed: 218, cancelled: 24, noShow: 10, total: 320 },
  { month: "Mar 2026", completed: 248, cancelled: 27, noShow: 12, total: 365 },
  { month: "Apr 2026", completed: 275, cancelled: 28, noShow: 14, total: 401 },
  { month: "May 2026", completed: 296, cancelled: 30, noShow: 15, total: 428 },
  { month: "Jun 2026", completed: 318, cancelled: 32, noShow: 14, total: 462 },
  { month: "Jul 2026", completed: 334, cancelled: 34, noShow: 15, total: 490 },
];

// Doctors performance report
export const doctorsPerformanceRows = [
  { doctor: "Dr. Ayesha Khan", specialty: "Cardiology", appointments: 142, revenue: 6390, rating: 4.8, completionRate: 96 },
  { doctor: "Dr. Usman Tariq", specialty: "Orthopedics", appointments: 118, revenue: 5900, rating: 4.6, completionRate: 93 },
  { doctor: "Dr. Fatima Noor", specialty: "Pediatrics", appointments: 165, revenue: 5775, rating: 4.9, completionRate: 97 },
  { doctor: "Dr. Hamza Sheikh", specialty: "Dermatology", appointments: 84, revenue: 3360, rating: 4.5, completionRate: 90 },
  { doctor: "Dr. Sadia Malik", specialty: "Neurology", appointments: 96, revenue: 5760, rating: 4.7, completionRate: 94 },
  { doctor: "Dr. Omar Farooq", specialty: "General", appointments: 72, revenue: 1800, rating: 4.3, completionRate: 88 },
];

export const doctorsRevenueComparison = doctorsPerformanceRows.map((d) => ({
  label: d.doctor.replace("Dr. ", ""),
  value: d.revenue,
}));

// Downloadable reports list
export interface DownloadableReport {
  id: string;
  name: string;
  category: "Patients" | "Revenue" | "Appointments" | "Doctors";
  generatedAt: string;
  format: "PDF" | "CSV";
}

export const downloadableReportsMock: DownloadableReport[] = [
  { id: "rep-1", name: "Patient Growth Summary - Jul 2026", category: "Patients", generatedAt: "Jul 8, 2026", format: "PDF" },
  { id: "rep-2", name: "Monthly Revenue Report - Jul 2026", category: "Revenue", generatedAt: "Jul 8, 2026", format: "PDF" },
  { id: "rep-3", name: "Appointments Overview - Q2 2026", category: "Appointments", generatedAt: "Jul 1, 2026", format: "CSV" },
  { id: "rep-4", name: "Doctors Performance - Jun 2026", category: "Doctors", generatedAt: "Jul 1, 2026", format: "PDF" },
  { id: "rep-5", name: "Patient Demographics Breakdown", category: "Patients", generatedAt: "Jun 28, 2026", format: "CSV" },
  { id: "rep-6", name: "Revenue by Department - Q2 2026", category: "Revenue", generatedAt: "Jun 25, 2026", format: "CSV" },
];
