"use client";

import Link from "next/link";
import { Mail, Phone, Pencil, ShieldCheck, Building2, CalendarClock } from "lucide-react";

import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { useAuthStore } from "@/store/authStore";

function initials(name?: string) {
  if (!name) return "SA";
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const activityLog = [
  { action: "Updated appointment for Sara Malik", time: "2 hours ago" },
  { action: "Marked invoice INV-2026-0142 as paid", time: "5 hours ago" },
  { action: "Added new patient Zainab Sheikh", time: "Yesterday" },
  { action: "Updated clinic operating hours", time: "2 days ago" },
];

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        title="My Profile"
        description="View your account details and recent activity."
        action={
          <Button asChild size="sm" variant="outline">
            <Link href="/settings">
              <Pencil className="size-4" />
              Edit profile
            </Link>
          </Button>
        }
      />

      {/* Header card */}
      <Card>
        <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="size-20">
              <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                {initials(user?.fullName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold text-foreground">
                  {user?.fullName ?? "Dr. Ayesha Khan"}
                </h2>
                <Badge variant="success" className="capitalize">
                  <ShieldCheck className="size-3" />
                  {user?.role ?? "admin"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {user?.clinicName ?? "City Care Clinic"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info strip */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-3">
            <Mail className="size-4 text-muted-foreground shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="truncate text-sm font-medium text-foreground">
                {user?.email ?? "ayesha.khan@clinic.com"}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3">
            <Phone className="size-4 text-muted-foreground shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Phone</p>
              <p className="truncate text-sm font-medium text-foreground">
                {user?.phone ?? "+92 300 1234567"}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3">
            <Building2 className="size-4 text-muted-foreground shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Clinic</p>
              <p className="truncate text-sm font-medium text-foreground">
                {user?.clinicName ?? "City Care Clinic"}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3">
            <CalendarClock className="size-4 text-muted-foreground shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Member since</p>
              <p className="truncate text-sm font-medium text-foreground">Jan 2025</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="divide-y divide-border">
            {activityLog.map((item, i) => (
              <li key={i} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                <p className="text-sm text-foreground">{item.action}</p>
                <span className="shrink-0 text-xs text-muted-foreground">{item.time}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Separator />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">Need to update your details?</p>
          <p className="text-sm text-muted-foreground">
            Manage your profile, clinic info, and preferences from Settings.
          </p>
        </div>
        <Button asChild>
          <Link href="/settings">Go to Settings</Link>
        </Button>
      </div>
    </div>
  );
}
