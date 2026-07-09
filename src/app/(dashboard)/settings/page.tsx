"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Moon, Plus, Sun, Trash2 } from "lucide-react";

import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useAuthStore } from "@/store/authStore";
import { useThemeStore } from "@/store/themeStore";
import { useRoleStore } from "@/store/roleStore";
import type { Permission } from "@/types/permissions";
import type { RolePermissionConfig } from "@/types/roles";
import { RoleManageDialog } from "@/components/settings/role-manage-dialog";

export default function SettingsPage() {
  const user = useAuthStore((s) => s.user);
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);
  const roles = useRoleStore((s) => s.roles);
  const addRole = useRoleStore((s) => s.addRole);
  const deleteRole = useRoleStore((s) => s.deleteRole);
  const updateRolePermissions = useRoleStore((s) => s.updateRolePermissions);

  const [isSaving, setIsSaving] = useState(false);
  const [activeRole, setActiveRole] = useState<RolePermissionConfig | null>(null);
  const [isManageDialogOpen, setIsManageDialogOpen] = useState(false);
  const [newRoleName, setNewRoleName] = useState("");
  const [newRoleDescription, setNewRoleDescription] = useState("");
  const [notifications, setNotifications] = useState({
    emailReminders: true,
    smsReminders: true,
    appointmentAlerts: true,
    billingAlerts: false,
    marketingEmails: false,
  });

  const initials = user?.fullName
    ?.split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const canCustomizeRolePermissions = true;

  const handleSave = async (section: string) => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 700));
    setIsSaving(false);
    toast.success(`${section} settings saved`);
  };

  const openManageDialog = (role: RolePermissionConfig) => {
    setActiveRole(role);
    setIsManageDialogOpen(true);
  };

  const handleRolePermissionSave = (permissions: Permission[]) => {
    if (!activeRole || !canCustomizeRolePermissions) {
      toast.error("You cannot customize role permissions");
      return;
    }

    updateRolePermissions(activeRole.id, permissions);
    toast.success(`${activeRole.name} permissions updated`);
  };

  const handleAddRole = () => {
    const trimmedRoleName = newRoleName.trim();

    if (!trimmedRoleName) {
      toast.error("Role name is required");
      return;
    }

    const roleNameExists = roles.some(
      (role) => role.name.toLowerCase() === trimmedRoleName.toLowerCase()
    );

    if (roleNameExists) {
      toast.error("Role name already exists");
      return;
    }

    addRole({ name: trimmedRoleName, description: newRoleDescription });
    setNewRoleName("");
    setNewRoleDescription("");
    toast.success(`${trimmedRoleName} role created`);
  };

  const handleDeleteRole = (role: RolePermissionConfig) => {
    const confirmed = window.confirm(`Delete "${role.name}" role?`);
    if (!confirmed) return;

    deleteRole(role.id);
    if (activeRole?.id === role.id) {
      setIsManageDialogOpen(false);
      setActiveRole(null);
    }
    toast.success(`${role.name} role deleted`);
  };

  return (
    <div className="space-y-6 pb-10">
      <PageHeader title="Settings" description="Manage your account, clinic, and application preferences." />

      <Tabs defaultValue="profile">
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="clinic">Clinic</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        {/* Profile */}
        <TabsContent value="profile" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile information</CardTitle>
              <CardDescription>Update your personal details and contact information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="size-16">
                  <AvatarFallback className="bg-primary/10 text-primary text-lg">
                    {initials || "SA"}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  Change photo
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full name</Label>
                  <Input id="fullName" defaultValue={user?.fullName ?? "Dr. Ayesha Khan"} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" defaultValue={user?.role ?? "admin"} disabled className="capitalize" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={user?.email ?? "ayesha.khan@sehatos.com"} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" defaultValue="+92 300 1234567" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <p className="text-sm font-medium text-foreground">Change password</p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current password</Label>
                    <Input id="currentPassword" type="password" placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New password</Label>
                    <Input id="newPassword" type="password" placeholder="••••••••" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSave("Profile")} disabled={isSaving}>
                  {isSaving && <Loader2 className="size-4 animate-spin" />}
                  Save changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Clinic */}
        <TabsContent value="clinic" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Clinic information</CardTitle>
              <CardDescription>Details shown on invoices, prescriptions, and patient-facing pages.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="clinicName">Clinic name</Label>
                  <Input id="clinicName" defaultValue="Sehat Clinic" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clinicPhone">Clinic phone</Label>
                  <Input id="clinicPhone" defaultValue="+92 21 3456 7890" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="clinicAddress">Address</Label>
                <Textarea
                  id="clinicAddress"
                  rows={2}
                  defaultValue="Suite 4, DHA Phase 6, Karachi, Pakistan"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="pkr">PKR (₨)</SelectItem>
                      <SelectItem value="aed">AED (د.إ)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select defaultValue="pkt">
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pkt">Pakistan (PKT)</SelectItem>
                      <SelectItem value="gst">Gulf (GST)</SelectItem>
                      <SelectItem value="utc">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => handleSave("Clinic")} disabled={isSaving}>
                  {isSaving && <Loader2 className="size-4 animate-spin" />}
                  Save changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Roles & Permissions */}
        <TabsContent value="roles" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Roles & permissions</CardTitle>
              <CardDescription>
                Create your own roles and choose permissions with checkboxes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4 space-y-3">
                <p className="text-sm font-medium">Add custom role</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr_auto]">
                  <Input
                    placeholder="Role name (e.g. Doctor)"
                    value={newRoleName}
                    onChange={(e) => setNewRoleName(e.target.value)}
                  />
                  <Input
                    placeholder="Description (optional)"
                    value={newRoleDescription}
                    onChange={(e) => setNewRoleDescription(e.target.value)}
                  />
                  <Button onClick={handleAddRole} className="sm:w-auto">
                    <Plus className="size-4" />
                    Add role
                  </Button>
                </div>
              </div>

              {roles.length === 0 && (
                <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
                  No roles added yet. Create a role with the + button and then set permissions.
                </div>
              )}

              <ul className="divide-y divide-border">
                {roles.map((r) => (
                  <li key={r.id} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-foreground">{r.name}</p>
                        <Badge variant="secondary">{r.permissions.length} permissions</Badge>
                      </div>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {r.description || "No description provided"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="shrink-0"
                        onClick={() => openManageDialog(r)}
                      >
                        {canCustomizeRolePermissions ? "Manage" : "View"}
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDeleteRole(r)}
                        aria-label={`Delete ${r.name}`}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <RoleManageDialog
            open={isManageDialogOpen}
            role={activeRole}
            canEdit={canCustomizeRolePermissions}
            onClose={() => {
              setIsManageDialogOpen(false);
              setActiveRole(null);
            }}
            onSave={handleRolePermissionSave}
          />
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification preferences</CardTitle>
              <CardDescription>Choose what you want to be notified about.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              {[
                { key: "emailReminders" as const, label: "Email appointment reminders", description: "Get emailed before upcoming appointments" },
                { key: "smsReminders" as const, label: "SMS appointment reminders", description: "Get texted before upcoming appointments" },
                { key: "appointmentAlerts" as const, label: "New appointment alerts", description: "Notify when a new appointment is booked" },
                { key: "billingAlerts" as const, label: "Billing alerts", description: "Notify on overdue or pending invoices" },
                { key: "marketingEmails" as const, label: "Product updates", description: "Occasional emails about new SehatOS features" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between gap-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                  <Switch
                    checked={notifications[item.key]}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({ ...prev, [item.key]: checked }))
                    }
                  />
                </div>
              ))}
              <div className="flex justify-end pt-2">
                <Button onClick={() => handleSave("Notification")} disabled={isSaving}>
                  {isSaving && <Loader2 className="size-4 animate-spin" />}
                  Save changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance (Theme + Language) */}
        <TabsContent value="appearance" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how SehatOS looks for you.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Theme</Label>
                <div className="grid grid-cols-2 gap-3 max-w-sm">
                  <button
                    onClick={() => setTheme("light")}
                    className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-colors ${
                      theme === "light" ? "border-primary" : "border-border"
                    }`}
                  >
                    <Sun className="size-5" />
                    <span className="text-sm font-medium">Light</span>
                  </button>
                  <button
                    onClick={() => setTheme("dark")}
                    className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-colors ${
                      theme === "dark" ? "border-primary" : "border-border"
                    }`}
                  >
                    <Moon className="size-5" />
                    <span className="text-sm font-medium">Dark</span>
                  </button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2 max-w-sm">
                <Label>Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ur">اردو (Urdu)</SelectItem>
                    <SelectItem value="ar">العربية (Arabic)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
