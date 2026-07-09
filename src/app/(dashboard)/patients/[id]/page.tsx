"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarClock,
  FileText,
  Mail,
  MapPin,
  Phone,
  Pencil,
  Droplet,
} from "lucide-react";

import { Breadcrumb } from "@/components/common/breadcrumb";
import { EmptyState } from "@/components/common/empty-state";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  patientsMock,
  medicalRecordsMock,
  patientDocumentsMock,
  patientTimelineMock,
} from "@/constants/patients-mock";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const timelineIcon = {
  appointment: CalendarClock,
  prescription: FileText,
  billing: FileText,
  note: FileText,
};

export default function PatientDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const patient = patientsMock.find((p) => p.id === id);
  const records = medicalRecordsMock[id] ?? [];
  const documents = patientDocumentsMock[id] ?? [];
  const timeline = patientTimelineMock[id] ?? [];

  if (!patient) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" size="sm" onClick={() => router.push("/patients")}>
          <ArrowLeft className="size-4" />
          Back to patients
        </Button>
        <EmptyState title="Patient not found" description="This patient record may have been removed." />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10">
      <Breadcrumb
        items={[
          { label: "Patients", href: "/patients" },
          { label: patient.fullName },
        ]}
      />

      {/* Header */}
      <Card>
        <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="size-16">
              <AvatarFallback className="bg-primary/10 text-primary text-xl">
                {initials(patient.fullName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold text-foreground">{patient.fullName}</h1>
                <Badge variant={patient.status === "active" ? "success" : "secondary"} className="capitalize">
                  {patient.status ?? "active"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground capitalize">
                {patient.age} years old &middot; {patient.gender}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Pencil className="size-4" />
              Edit
            </Button>
            <Button size="sm">
              <CalendarClock className="size-4" />
              Book appointment
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Contact info strip */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-3">
            <Phone className="size-4 text-muted-foreground shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Phone</p>
              <p className="truncate text-sm font-medium text-foreground">{patient.phone}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3">
            <Mail className="size-4 text-muted-foreground shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="truncate text-sm font-medium text-foreground">{patient.email ?? "—"}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3">
            <Droplet className="size-4 text-muted-foreground shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Blood group</p>
              <p className="truncate text-sm font-medium text-foreground">{patient.bloodGroup ?? "—"}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3">
            <MapPin className="size-4 text-muted-foreground shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Address</p>
              <p className="truncate text-sm font-medium text-foreground">{patient.address ?? "—"}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs: Medical History / Documents / Timeline */}
      <Tabs defaultValue="history">
        <TabsList>
          <TabsTrigger value="history">Medical History</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="pt-4">
          {records.length === 0 ? (
            <EmptyState title="No medical history recorded" description="Conditions and diagnoses will appear here." />
          ) : (
            <div className="space-y-3">
              {records.map((r) => (
                <Card key={r.id}>
                  <CardContent className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium text-foreground">{r.condition}</p>
                      <p className="text-sm text-muted-foreground">Diagnosed {r.diagnosedOn}</p>
                      {r.notes && <p className="mt-1 text-sm text-muted-foreground">{r.notes}</p>}
                    </div>
                    <Badge variant={r.status === "ongoing" ? "warning" : "success"} className="capitalize shrink-0">
                      {r.status}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="documents" className="pt-4">
          {documents.length === 0 ? (
            <EmptyState title="No documents uploaded" description="Lab reports, prescriptions, and scans will appear here." />
          ) : (
            <div className="space-y-3">
              {documents.map((doc) => (
                <Card key={doc.id}>
                  <CardContent className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                        <FileText className="size-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-foreground">{doc.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {doc.type.replace("-", " ")} &middot; {doc.uploadedAt} &middot; {doc.sizeLabel}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="shrink-0">
                      Download
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="timeline" className="pt-4">
          {timeline.length === 0 ? (
            <EmptyState title="No activity yet" description="Appointments, prescriptions, and billing events will appear here." />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Activity timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="relative border-l border-border pl-6 space-y-6">
                  {timeline.map((event) => {
                    const Icon = timelineIcon[event.type];
                    return (
                      <li key={event.id} className="relative">
                        <span className="absolute -left-[1.95rem] flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Icon className="size-3.5" />
                        </span>
                        <p className="text-sm font-medium text-foreground">{event.title}</p>
                        {event.description && (
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                        )}
                        <p className="mt-0.5 text-xs text-muted-foreground">{event.date}</p>
                      </li>
                    );
                  })}
                </ol>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
