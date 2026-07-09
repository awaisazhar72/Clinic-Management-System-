export const PERMISSIONS = [
  "dashboard:view",
  "patients:view",
  "patients:create",
  "patients:update",
  "appointments:view",
  "appointments:create",
  "appointments:update",
  "prescriptions:view",
  "prescriptions:create",
  "billing:view",
  "billing:create",
  "reports:view",
  "settings:view",
  "settings:update",
] as const;

export type Permission = (typeof PERMISSIONS)[number];

export const PERMISSION_LABELS: Record<Permission, string> = {
  "dashboard:view": "View Dashboard",
  "patients:view": "View Patients",
  "patients:create": "Create Patients",
  "patients:update": "Edit Patients",
  "appointments:view": "View Appointments",
  "appointments:create": "Create Appointments",
  "appointments:update": "Edit Appointments",
  "prescriptions:view": "View Prescriptions",
  "prescriptions:create": "Create Prescriptions",
  "billing:view": "View Billing",
  "billing:create": "Create Billing Entries",
  "reports:view": "View Reports",
  "settings:view": "View Settings",
  "settings:update": "Manage Settings",
};
