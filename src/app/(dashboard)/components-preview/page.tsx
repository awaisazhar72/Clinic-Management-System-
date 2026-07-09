"use client";

import { useState } from "react";
import { CalendarClock, DollarSign, Users, Activity } from "lucide-react";

import { PageHeader } from "@/components/common/page-header";
import { SearchBar } from "@/components/common/search-bar";
import { Filter } from "@/components/common/filter";
import { Pagination } from "@/components/common/pagination";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";

import { StatCard } from "@/components/cards/stat-card";
import { DoctorCard } from "@/components/cards/doctor-card";
import { PatientCard } from "@/components/cards/patient-card";
import { AppointmentCard } from "@/components/cards/appointment-card";

import { AreaTrendChart } from "@/components/charts/area-trend-chart";
import { SimpleBarChart } from "@/components/charts/simple-bar-chart";
import { DonutChart } from "@/components/charts/donut-chart";

import { ConfirmDialog } from "@/components/modals/confirm-dialog";
import { CardSkeletonGrid } from "@/components/loaders/card-skeleton";
import { TableSkeleton } from "@/components/loaders/table-skeleton";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";

const revenueData = [
  { label: "Mon", value: 4200 },
  { label: "Tue", value: 3800 },
  { label: "Wed", value: 5100 },
  { label: "Thu", value: 4700 },
  { label: "Fri", value: 6200 },
  { label: "Sat", value: 3200 },
  { label: "Sun", value: 2100 },
];

const appointmentsData = [
  { label: "Cardiology", value: 32 },
  { label: "Dermatology", value: 18 },
  { label: "Pediatrics", value: 24 },
  { label: "Orthopedics", value: 15 },
];

const donutData = [
  { label: "Paid", value: 62, color: "var(--color-success)" },
  { label: "Pending", value: 25, color: "var(--color-warning)" },
  { label: "Overdue", value: 13, color: "var(--color-destructive)" },
];

export default function ComponentsPreviewPage() {
  const [search, setSearch] = useState("");
  const [filterValue, setFilterValue] = useState("all");
  const [page, setPage] = useState(1);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div className="space-y-10 pb-16">
      <Breadcrumb items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Components Preview" }]} />

      <PageHeader
        title="Component Library"
        description="Phase 3 reusable components — reference and visual QA."
        action={<Button onClick={() => setConfirmOpen(true)}>Open confirm dialog</Button>}
      />

      {/* Stat cards */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Stat Cards
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total Patients" value="1,284" icon={Users} trend={{ value: 8.2, label: "vs last month" }} />
          <StatCard label="Appointments Today" value="42" icon={CalendarClock} trend={{ value: -3.1, label: "vs yesterday" }} />
          <StatCard label="Revenue (MTD)" value="$18,420" icon={DollarSign} trend={{ value: 12.4, label: "vs last month" }} />
          <StatCard label="Active Doctors" value="16" icon={Activity} />
        </div>
      </section>

      {/* Search / Filter / Pagination */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Search, Filter & Pagination
        </h2>
        <Card>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row">
              <SearchBar value={search} onChange={setSearch} placeholder="Search patients..." className="flex-1" />
              <Filter
                label="Status"
                value={filterValue}
                onChange={setFilterValue}
                options={[
                  { label: "All", value: "all" },
                  { label: "Active", value: "active" },
                  { label: "Inactive", value: "inactive" },
                ]}
              />
            </div>
            <Pagination page={page} pageSize={10} total={87} onPageChange={setPage} />
          </CardContent>
        </Card>
      </section>

      {/* Domain cards */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Domain Cards
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <DoctorCard
            doctor={{
              id: "1",
              fullName: "Dr. Ayesha Khan",
              specialty: "Cardiologist",
              email: "ayesha@sehatos.com",
              phone: "+92 300 1234567",
              rating: 4.8,
              experienceYears: 9,
              status: "active",
            }}
          />
          <PatientCard
            patient={{
              id: "1",
              fullName: "Bilal Ahmed",
              age: 34,
              gender: "male",
              phone: "+92 301 9876543",
              lastVisit: "2 days ago",
            }}
          />
          <AppointmentCard
            appointment={{
              id: "1",
              patientId: "1",
              patientName: "Sara Malik",
              doctorId: "1",
              doctorName: "Ayesha Khan",
              date: "Jul 12",
              time: "10:30 AM",
              status: "scheduled",
            }}
          />
        </div>
      </section>

      {/* Charts */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Charts
        </h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Weekly revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <AreaTrendChart data={revenueData} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Invoice status</CardTitle>
            </CardHeader>
            <CardContent>
              <DonutChart data={donutData} />
              <div className="mt-2 flex flex-wrap justify-center gap-3 text-xs">
                {donutData.map((d) => (
                  <span key={d.label} className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full" style={{ backgroundColor: d.color }} />
                    {d.label}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Appointments by specialty</CardTitle>
          </CardHeader>
          <CardContent>
            <SimpleBarChart data={appointmentsData} color="var(--color-chart-4)" />
          </CardContent>
        </Card>
      </section>

      {/* Form elements */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Form Elements
        </h2>
        <Card>
          <CardContent className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Patient name</Label>
              <Input placeholder="Enter full name" />
            </div>
            <div className="space-y-2">
              <Label>Department</Label>
              <Select defaultValue="cardiology">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="dermatology">Dermatology</SelectItem>
                  <SelectItem value="pediatrics">Pediatrics</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Notes</Label>
              <Textarea placeholder="Additional notes..." />
            </div>
            <div className="space-y-3">
              <Label>Gender</Label>
              <RadioGroup defaultValue="male" className="flex gap-4">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male" className="font-normal">Male</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female" className="font-normal">Female</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-3">
              <Label>Preferences</Label>
              <div className="flex items-center gap-2">
                <Checkbox id="sms" />
                <Label htmlFor="sms" className="font-normal">SMS reminders</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="email-notif" />
                <Label htmlFor="email-notif" className="font-normal">Email notifications</Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Badges & Progress */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Badges & Progress
        </h2>
        <Card>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success">Paid</Badge>
              <Badge variant="warning">Pending</Badge>
              <Badge variant="destructive">Overdue</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
            <div className="space-y-2 max-w-sm">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Bed occupancy</span>
                <span className="font-medium">72%</span>
              </div>
              <Progress value={72} />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Tabs & Calendar */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Tabs & Calendar
        </h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card>
            <CardContent>
              <Tabs defaultValue="upcoming">
                <TabsList>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="past">Past</TabsTrigger>
                  <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming" className="pt-4 text-sm text-muted-foreground">
                  3 upcoming appointments today.
                </TabsContent>
                <TabsContent value="past" className="pt-4 text-sm text-muted-foreground">
                  128 completed appointments this month.
                </TabsContent>
                <TabsContent value="cancelled" className="pt-4 text-sm text-muted-foreground">
                  4 cancelled appointments this week.
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex justify-center">
              <Calendar mode="single" className="rounded-md" />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Loaders */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Loading & Empty States
        </h2>
        <div className="space-y-4">
          <CardSkeletonGrid count={4} />
          <Card>
            <CardContent>
              <TableSkeleton rows={3} columns={4} />
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <EmptyState title="No appointments yet" description="Schedule your first appointment to get started." action={{ label: "New appointment", onClick: () => {} }} />
            <ErrorState onRetry={() => {}} />
          </div>
        </div>
      </section>

      <Separator />

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Cancel appointment?"
        description="This action cannot be undone. The patient will be notified."
        confirmLabel="Yes, cancel it"
        variant="destructive"
        onConfirm={async () => {
          await new Promise((r) => setTimeout(r, 500));
        }}
      />
    </div>
  );
}
