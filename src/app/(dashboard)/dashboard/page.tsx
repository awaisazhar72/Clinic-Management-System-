import { CalendarClock, DollarSign, Users, Activity, Plus } from "lucide-react";

import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/cards/stat-card";
import { AreaTrendChart } from "@/components/charts/area-trend-chart";
import { SimpleBarChart } from "@/components/charts/simple-bar-chart";
import { DonutChart } from "@/components/charts/donut-chart";
import { LatestAppointmentsList } from "@/components/dashboard/latest-appointments-list";
import { DoctorScheduleWidget } from "@/components/dashboard/doctor-schedule-widget";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";

import {
  dashboardStats,
  weeklyRevenue,
  appointmentsBySpecialty,
  invoiceStatusBreakdown,
  latestAppointments,
  upcomingDoctorSchedule,
} from "@/constants/dashboard-mock";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function DashboardPage() {
  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        title="Dashboard"
        description="Welcome back — here's what's happening at your clinic today."
        action={
          <Button size="sm">
            <Plus className="size-4" />
            New appointment
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Patients"
          value={dashboardStats.totalPatients.value.toLocaleString()}
          icon={Users}
          trend={{ value: dashboardStats.totalPatients.trend, label: "vs last month" }}
        />
        <StatCard
          label="Appointments Today"
          value={dashboardStats.todayAppointments.value}
          icon={CalendarClock}
          trend={{ value: dashboardStats.todayAppointments.trend, label: "vs yesterday" }}
        />
        <StatCard
          label="Revenue (MTD)"
          value={formatCurrency(dashboardStats.monthlyRevenue.value)}
          icon={DollarSign}
          trend={{ value: dashboardStats.monthlyRevenue.trend, label: "vs last month" }}
        />
        <StatCard
          label="Active Doctors"
          value={dashboardStats.activeDoctors.value}
          icon={Activity}
        />
      </div>

      {/* Revenue + Invoice status */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Weekly revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <AreaTrendChart data={weeklyRevenue} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Invoice status</CardTitle>
          </CardHeader>
          <CardContent>
            <DonutChart data={invoiceStatusBreakdown} />
            <div className="mt-2 flex flex-wrap justify-center gap-3 text-xs">
              {invoiceStatusBreakdown.map((d) => (
                <span key={d.label} className="flex items-center gap-1.5">
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: d.color }}
                  />
                  {d.label} &middot; {d.value}%
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Appointments by specialty + Calendar */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Appointments by specialty</CardTitle>
          </CardHeader>
          <CardContent>
            <SimpleBarChart data={appointmentsBySpecialty} color="var(--color-chart-4)" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar mode="single" className="rounded-md" />
          </CardContent>
        </Card>
      </div>

      {/* Latest appointments + Doctor schedule */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <LatestAppointmentsList appointments={latestAppointments} />
        </div>
        <DoctorScheduleWidget doctors={upcomingDoctorSchedule} />
      </div>
    </div>
  );
}
