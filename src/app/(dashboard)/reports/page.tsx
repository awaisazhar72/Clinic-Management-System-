"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Download, FileText, Star } from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "@/components/common/page-header";
import { DataTable } from "@/components/tables/data-table";
import { AreaTrendChart } from "@/components/charts/area-trend-chart";
import { SimpleBarChart } from "@/components/charts/simple-bar-chart";
import { DonutChart } from "@/components/charts/donut-chart";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

import {
  patientsGrowthData,
  patientsByAgeGroup,
  patientsReportRows,
  revenueTrendData,
  revenueByDepartment,
  revenueReportRows,
  appointmentsTrendData,
  appointmentsStatusBreakdown,
  appointmentsReportRows,
  doctorsPerformanceRows,
  doctorsRevenueComparison,
  downloadableReportsMock,
  type DownloadableReport,
} from "@/constants/reports-mock";
import { exportToCsv } from "@/lib/export-csv";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

const categoryVariant: Record<DownloadableReport["category"], "default" | "secondary" | "success" | "warning"> = {
  Patients: "default",
  Revenue: "success",
  Appointments: "warning",
  Doctors: "secondary",
};

export default function ReportsPage() {
  const patientsColumns: ColumnDef<(typeof patientsReportRows)[number]>[] = [
    { header: "Month", accessorKey: "month" },
    { header: "New patients", accessorKey: "newPatients" },
    { header: "Returning", accessorKey: "returning" },
    {
      header: "Total",
      accessorKey: "total",
      cell: ({ row }) => <span className="font-medium text-foreground">{row.original.total}</span>,
    },
  ];

  const revenueColumns: ColumnDef<(typeof revenueReportRows)[number]>[] = [
    { header: "Month", accessorKey: "month" },
    {
      header: "Revenue",
      accessorKey: "revenue",
      cell: ({ row }) => <span className="text-success">{formatCurrency(row.original.revenue)}</span>,
    },
    {
      header: "Expenses",
      accessorKey: "expenses",
      cell: ({ row }) => <span className="text-destructive">{formatCurrency(row.original.expenses)}</span>,
    },
    {
      header: "Profit",
      accessorKey: "profit",
      cell: ({ row }) => (
        <span className="font-medium text-foreground">{formatCurrency(row.original.profit)}</span>
      ),
    },
  ];

  const appointmentsColumns: ColumnDef<(typeof appointmentsReportRows)[number]>[] = [
    { header: "Month", accessorKey: "month" },
    { header: "Completed", accessorKey: "completed" },
    { header: "Cancelled", accessorKey: "cancelled" },
    { header: "No-show", accessorKey: "noShow" },
    {
      header: "Total",
      accessorKey: "total",
      cell: ({ row }) => <span className="font-medium text-foreground">{row.original.total}</span>,
    },
  ];

  const doctorsColumns: ColumnDef<(typeof doctorsPerformanceRows)[number]>[] = [
    {
      header: "Doctor",
      accessorKey: "doctor",
      cell: ({ row }) => (
        <div>
          <p className="font-medium text-foreground">{row.original.doctor}</p>
          <p className="text-xs text-muted-foreground">{row.original.specialty}</p>
        </div>
      ),
    },
    { header: "Appointments", accessorKey: "appointments" },
    {
      header: "Revenue",
      accessorKey: "revenue",
      cell: ({ row }) => (
        <span className="font-medium text-foreground">{formatCurrency(row.original.revenue)}</span>
      ),
    },
    {
      header: "Rating",
      accessorKey: "rating",
      cell: ({ row }) => (
        <span className="flex items-center gap-1">
          <Star className="size-3.5 fill-warning text-warning" />
          {row.original.rating.toFixed(1)}
        </span>
      ),
    },
    {
      header: "Completion rate",
      accessorKey: "completionRate",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 w-32">
          <Progress value={row.original.completionRate} className="h-1.5" />
          <span className="text-xs text-muted-foreground shrink-0">{row.original.completionRate}%</span>
        </div>
      ),
    },
  ];

  const downloadColumns: ColumnDef<DownloadableReport>[] = [
    {
      header: "Report",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <FileText className="size-4" />
          </div>
          <div className="min-w-0">
            <p className="truncate font-medium text-foreground">{row.original.name}</p>
            <p className="text-xs text-muted-foreground">{row.original.generatedAt}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Category",
      accessorKey: "category",
      cell: ({ row }) => (
        <Badge variant={categoryVariant[row.original.category]}>{row.original.category}</Badge>
      ),
    },
    {
      header: "Format",
      accessorKey: "format",
      cell: ({ row }) => <Badge variant="outline">{row.original.format}</Badge>,
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            toast.success(`Downloading "${row.original.name}"`, {
              description: `Format: ${row.original.format}`,
            })
          }
        >
          <Download className="size-3.5" />
          Download
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        title="Reports"
        description="Analyze clinic performance across patients, revenue, appointments, and staff."
      />

      <Tabs defaultValue="patients">
        <TabsList>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="doctors">Doctors Performance</TabsTrigger>
          <TabsTrigger value="downloads">Downloads</TabsTrigger>
        </TabsList>

        {/* Patients report */}
        <TabsContent value="patients" className="pt-4 space-y-4">
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportToCsv("patients-report", patientsReportRows)}
            >
              <Download className="size-3.5" />
              Export CSV
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Patient growth</CardTitle>
              </CardHeader>
              <CardContent>
                <AreaTrendChart data={patientsGrowthData} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>By age group</CardTitle>
              </CardHeader>
              <CardContent>
                <DonutChart data={patientsByAgeGroup} />
                <div className="mt-2 flex flex-wrap justify-center gap-3 text-xs">
                  {patientsByAgeGroup.map((d) => (
                    <span key={d.label} className="flex items-center gap-1.5">
                      <span className="size-2 rounded-full" style={{ backgroundColor: d.color }} />
                      {d.label}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <DataTable columns={patientsColumns} data={patientsReportRows} />
        </TabsContent>

        {/* Revenue report */}
        <TabsContent value="revenue" className="pt-4 space-y-4">
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportToCsv("revenue-report", revenueReportRows)}
            >
              <Download className="size-3.5" />
              Export CSV
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Revenue trend</CardTitle>
              </CardHeader>
              <CardContent>
                <AreaTrendChart data={revenueTrendData} color="var(--color-success)" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>By department</CardTitle>
              </CardHeader>
              <CardContent>
                <SimpleBarChart data={revenueByDepartment} color="var(--color-chart-2)" height={220} />
              </CardContent>
            </Card>
          </div>
          <DataTable columns={revenueColumns} data={revenueReportRows} />
        </TabsContent>

        {/* Appointments report */}
        <TabsContent value="appointments" className="pt-4 space-y-4">
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportToCsv("appointments-report", appointmentsReportRows)}
            >
              <Download className="size-3.5" />
              Export CSV
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Appointments trend</CardTitle>
              </CardHeader>
              <CardContent>
                <AreaTrendChart data={appointmentsTrendData} color="var(--color-chart-4)" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>By status</CardTitle>
              </CardHeader>
              <CardContent>
                <DonutChart data={appointmentsStatusBreakdown} />
                <div className="mt-2 flex flex-wrap justify-center gap-3 text-xs">
                  {appointmentsStatusBreakdown.map((d) => (
                    <span key={d.label} className="flex items-center gap-1.5">
                      <span className="size-2 rounded-full" style={{ backgroundColor: d.color }} />
                      {d.label}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <DataTable columns={appointmentsColumns} data={appointmentsReportRows} />
        </TabsContent>

        {/* Doctors performance report */}
        <TabsContent value="doctors" className="pt-4 space-y-4">
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportToCsv("doctors-performance-report", doctorsPerformanceRows)}
            >
              <Download className="size-3.5" />
              Export CSV
            </Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Revenue by doctor</CardTitle>
            </CardHeader>
            <CardContent>
              <SimpleBarChart data={doctorsRevenueComparison} color="var(--color-chart-1)" />
            </CardContent>
          </Card>
          <DataTable columns={doctorsColumns} data={doctorsPerformanceRows} />
        </TabsContent>

        {/* Downloads */}
        <TabsContent value="downloads" className="pt-4">
          <DataTable
            columns={downloadColumns}
            data={downloadableReportsMock}
            emptyTitle="No reports generated yet"
            emptyDescription="Generated reports will appear here for download."
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
