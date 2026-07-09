import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Permission } from "@/types/permissions";
import type { RolePermissionConfig } from "@/types/roles";

const createRoleId = () =>
  `role_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

interface RoleStoreState {
  roles: RolePermissionConfig[];
  addRole: (payload: { name: string; description?: string }) => void;
  deleteRole: (roleId: string) => void;
  updateRolePermissions: (roleId: string, permissions: Permission[]) => void;
}

export const useRoleStore = create<RoleStoreState>()(
  persist(
    (set) => ({
      roles: [],
      addRole: ({ name, description }) =>
        set((state) => ({
          roles: [
            ...state.roles,
            {
              id: createRoleId(),
              name: name.trim(),
              description: description?.trim(),
              permissions: [],
            },
          ],
        })),
      deleteRole: (roleId) =>
        set((state) => ({
          roles: state.roles.filter((item) => item.id !== roleId),
        })),
      updateRolePermissions: (roleId, permissions) =>
        set((state) => ({
          roles: state.roles.map((item) =>
            item.id === roleId ? { ...item, permissions } : item
          ),
        })),
    }),
    {
      name: "sehatos-role-permissions",
      version: 2,
      migrate: (persistedState: unknown) => {
        const state = persistedState as { roles?: Array<Record<string, unknown>> };
        const previousRoles = Array.isArray(state?.roles) ? state.roles : [];

        return {
          roles: previousRoles.map((item) => ({
            id: typeof item.id === "string" ? item.id : createRoleId(),
            name:
              typeof item.name === "string"
                ? item.name
                : typeof item.role === "string"
                  ? item.role
                  : "Custom Role",
            description:
              typeof item.description === "string" ? item.description : undefined,
            permissions: Array.isArray(item.permissions)
              ? (item.permissions as Permission[])
              : [],
          })),
        };
      },
    }
  )
);
