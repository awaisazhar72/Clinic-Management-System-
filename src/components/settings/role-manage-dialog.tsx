"use client";

import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PERMISSIONS, PERMISSION_LABELS, type Permission } from "@/types/permissions";
import type { RolePermissionConfig } from "@/types/roles";

interface RoleManageDialogProps {
  open: boolean;
  role: RolePermissionConfig | null;
  canEdit: boolean;
  onClose: () => void;
  onSave: (permissions: Permission[]) => void;
}

export function RoleManageDialog({
  open,
  role,
  canEdit,
  onClose,
  onSave,
}: RoleManageDialogProps) {
  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>([]);

  useEffect(() => {
    if (role) {
      setSelectedPermissions(role.permissions);
    }
  }, [role]);

  const selectedSet = useMemo(() => new Set(selectedPermissions), [selectedPermissions]);

  const togglePermission = (permission: Permission) => {
    setSelectedPermissions((current) => {
      if (current.includes(permission)) {
        return current.filter((item) => item !== permission);
      }
      return [...current, permission];
    });
  };

  const handleSave = () => {
    onSave(selectedPermissions);
    onClose();
  };

  if (!role) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{role.name} role permissions</DialogTitle>
          <DialogDescription>
            {canEdit ? "Select exactly which modules should be visible for this role." : "View role permissions."}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[55vh] pr-2">
          <div className="space-y-3 py-1">
            {PERMISSIONS.map((permission) => (
              <div key={permission} className="flex items-center gap-3 rounded-md border p-3">
                <Checkbox
                  id={`${role.id}-${permission}`}
                  checked={selectedSet.has(permission)}
                  onCheckedChange={() => togglePermission(permission)}
                  disabled={!canEdit}
                />
                <Label
                  htmlFor={`${role.id}-${permission}`}
                  className="w-full cursor-pointer text-sm font-medium"
                >
                  {PERMISSION_LABELS[permission]}
                </Label>
              </div>
            ))}
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {canEdit && <Button onClick={handleSave}>Save permissions</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
