import type { Permission } from "@/types/permissions";

export interface RolePermissionConfig {
  id: string;
  name: string;
  description?: string;
  permissions: Permission[];
}
