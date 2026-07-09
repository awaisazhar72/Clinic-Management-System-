"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, Phone, Pencil, Star, Briefcase, DollarSign, Plus } from "lucide-react";

import { Breadcrumb } from "@/components/common/breadcrumb";
import { EmptyState } from "@/components/common/empty-state";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

import {
  doctorsMock,
  doctorAvailabilityMock,
  doctorScheduleMock,
  doctorLeaveRequestsMock,
} from "@/constants/doctors-mock";
import type { Doctor, LeaveRequest } from "@/types";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const statusVariant: Record<Doctor["status"], "success" | "warning" | "secondary"> = {
  active: "success",
  "on-leave": "warning",
  inactive: "secondary",
};

const scheduleStatusVariant = {
  scheduled: "warning",
  completed: "success",
  cancelled: "destructive",
  "no-show": "secondary",
} as const;

const leaveStatusVariant: Record<LeaveRequest["status"], "success" | "warning" | "destructive"> = {
  approved: "success",
  pending: "warning",
  rejected: "destructive",
};

export default function DoctorProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const doctor = doctorsMock.find((d) => d.id === id);
  const availability = doctorAvailabilityMock[id] ?? [];
  const schedule = doctorScheduleMock[id] ?? [];
  const leaveRequests = doctorLeaveRequestsMock[id] ?? [];

  if (!doctor) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" size="sm" onClick={() => router.push("/doctors")}>
          <ArrowLeft className="size-4" />
          Back to doctors
        </Button>
        <EmptyState title="Doctor not found" description="This doctor profile may have been removed." />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10">
      <Breadcrumb
        items={[
          { label: "Doctors", href: "/doctors" },
          { label: doctor.fullName },
        ]}
      />

      {/* Header */}
      <Card>
        <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="size-16">
              <AvatarFallback className="bg-primary/10 text-primary text-xl">
                {initials(doctor.fullName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold text-foreground">{doctor.fullName}</h1>
                <Badge variant={statusVariant[doctor.status]} className="capitalize">
                  {doctor.status.replace("-", " ")}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
              {doctor.bio && (
                <p className="mt-1.5 max-w-xl text-sm text-muted-foreground">{doctor.bio}</p>
              )}
            </div>
          </div>
          <Button variant="outline" size="sm" className="shrink-0">
            <Pencil className="size-4" />
            Edit profile
          </Button>
        </CardContent>
      </Card>

      {/* Info strip */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-3">
            <Phone className="size-4 text-muted-foreground shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Phone</p>
              <p className="truncate text-sm font-medium text-foreground">{doctor.phone}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3">
            <Mail className="size-4 text-muted-foreground shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="truncate text-sm font-medium text-foreground">{doctor.email}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3">
            <Briefcase className="size-4 text-muted-foreground shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Experience</p>
              <p className="truncate text-sm font-medium text-foreground">{doctor.experienceYears} years</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3">
            <DollarSign className="size-4 text-muted-foreground shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Consultation fee</p>
              <p className="truncate text-sm font-medium text-foreground">${doctor.consultationFee}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {doctor.rating !== undefined && (
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Star className="size-4 fill-warning text-warning" />
          <span className="font-medium text-foreground">{doctor.rating.toFixed(1)}</span>
          rating from patients
        </div>
      )}

      {/* Tabs: Availability / Schedule / Leave Management */}
      <Tabs defaultValue="availability">
        <TabsList>
          <TabsTrigger value="availability">Availability</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="leave">Leave Management</TabsTrigger>
        </TabsList>

        <TabsContent value="availability" className="pt-4">
          {availability.length === 0 ? (
            <EmptyState title="No availability set" description="Set weekly working hours for this doctor." />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Weekly availability</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="divide-y divide-border">
                  {availability.map((slot) => (
                    <li key={slot.day} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                      <span className="text-sm font-medium text-foreground w-28">{slot.day}</span>
                      <span className="flex-1 text-sm text-muted-foreground">
                        {slot.isAvailable ? `${slot.startTime} – ${slot.endTime}` : "Unavailable"}
                      </span>
                      <Switch checked={slot.isAvailable} disabled />
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="schedule" className="pt-4">
          {schedule.length === 0 ? (
            <EmptyState title="No upcoming appointments" description="This doctor has no scheduled appointments." />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Upcoming appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="divide-y divide-border">
                  {schedule.map((entry) => (
                    <li key={entry.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                      <div>
                        <p className="text-sm font-medium text-foreground">{entry.patientName}</p>
                        <p className="text-xs text-muted-foreground">
                          {entry.date} &middot; {entry.time}
                        </p>
                      </div>
                      <Badge variant={scheduleStatusVariant[entry.status]} className="capitalize">
                        {entry.status.replace("-", " ")}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="leave" className="pt-4 space-y-4">
          <div className="flex justify-end">
            <Button size="sm" variant="outline">
              <Plus className="size-4" />
              Request leave
            </Button>
          </div>
          {leaveRequests.length === 0 ? (
            <EmptyState title="No leave requests" description="Leave history for this doctor will appear here." />
          ) : (
            <div className="space-y-3">
              {leaveRequests.map((leave) => (
                <Card key={leave.id}>
                  <CardContent className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {leave.fromDate} — {leave.toDate}
                      </p>
                      <p className="text-sm text-muted-foreground">{leave.reason}</p>
                    </div>
                    <Badge variant={leaveStatusVariant[leave.status]} className="capitalize shrink-0">
                      {leave.status}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
