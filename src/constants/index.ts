export const APP_NAME = "Clinic Management System";
export const APP_SHORT_NAME = "CMS";

export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  otp: "/otp",
  resetPassword: "/reset-password",
  dashboard: "/dashboard",
  appointments: "/appointments",
  pastHistory: "/appointments/history",
  patients: "/patients",
  doctors: "/doctors",
  staff: "/staff",
  prescriptions: "/prescriptions",
  billing: "/billing",
  reports: "/reports",
  settings: "/settings",
} as const;

export const SIDEBAR_LINKS = [
  { label: "Dashboard", href: ROUTES.dashboard, icon: "LayoutDashboard" },
  {
    label: "Appointments",
    href: ROUTES.appointments,
    icon: "CalendarClock",
    children: [
      { label: "All Appointments", href: ROUTES.appointments },
      { label: "Past History", href: ROUTES.pastHistory },
    ],
  },
  { label: "Patients", href: ROUTES.patients, icon: "Users" },
  { label: "Doctors", href: ROUTES.doctors, icon: "Stethoscope" },
  { label: "Staff", href: ROUTES.staff, icon: "UserCog" },
  { label: "Prescriptions", href: ROUTES.prescriptions, icon: "FileText" },
  { label: "Billing", href: ROUTES.billing, icon: "Receipt" },
  { label: "Reports", href: ROUTES.reports, icon: "BarChart3" },
  { label: "Settings", href: ROUTES.settings, icon: "Settings" },
] as const;

export const QUERY_KEYS = {
  auth: ["auth"],
  doctors: ["doctors"],
  patients: ["patients"],
  appointments: ["appointments"],
  billing: ["billing"],
  dashboard: ["dashboard"],
  reports: ["reports"],
} as const;