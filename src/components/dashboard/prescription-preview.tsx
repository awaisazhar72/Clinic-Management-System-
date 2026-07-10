import { Stethoscope } from "lucide-react";
import type { PrescriptionFormValues } from "@/schemas/prescription.schema";
import type { PrescriptionLayoutSettings } from "@/types";

interface PrescriptionPreviewProps {
  values: Partial<PrescriptionFormValues>;
  layout: PrescriptionLayoutSettings;
}

export function PrescriptionPreview({ values, layout }: PrescriptionPreviewProps) {
  const today = new Date().toLocaleDateString("en-GB").split("/").join("-");

  return (
    <div className="rounded-lg border border-border bg-white shadow-sm">
      <div className="p-6 text-[11px] leading-tight text-neutral-800">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-neutral-300 pb-3">
          <div className="text-left">
            <p className="text-sm font-semibold text-neutral-900">{layout.doctorName}</p>
            <p className="text-[10px] text-neutral-500">{layout.doctorPhone}</p>
            <p className="text-[10px] text-neutral-500">{layout.degrees}</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Stethoscope className="size-4" />
            </div>
            <p className="mt-1 text-sm font-bold tracking-wide text-neutral-900">
              {layout.clinicName.toUpperCase()}
            </p>
            <p className="text-[9px] uppercase tracking-wide text-neutral-500">
              {layout.clinicTagline}
            </p>
          </div>

          <div className="text-right" dir="rtl">
            <p className="text-sm font-semibold text-neutral-900">{layout.doctorName.replace("Dr. ", "ڈاکٹر ")}</p>
            <p className="text-[10px] text-neutral-500">{layout.degreesUrdu}</p>
            <p className="text-[10px] text-neutral-500">{layout.specialtiesUrdu}</p>
          </div>
        </div>

        {/* Patient info bar */}
        <div className="mt-3 grid grid-cols-4 gap-2 border-b border-neutral-300 pb-2 text-[10px]">
          <span>
            <span className="text-neutral-500">Name: </span>
            <span className="font-medium">{values.patientName || "___________"}</span>
          </span>
          <span>
            <span className="text-neutral-500">Age: </span>
            <span className="font-medium">{values.patientAge || "___"} Y</span>
          </span>
          <span>
            <span className="text-neutral-500">Gender: </span>
            <span className="font-medium">{values.patientGender || "___"}</span>
          </span>
          <span className="text-right">
            <span className="text-neutral-500">Date: </span>
            <span className="font-medium">{today}</span>
          </span>
        </div>

        {/* Vitals + Rx body */}
        <div className="mt-3 grid grid-cols-[auto_1fr] gap-4">
          <div className="space-y-1 border-r border-neutral-200 pr-3 text-[10px]">
            <p className="font-semibold text-neutral-600">VITALS</p>
            <p>Pulse: {values.pulse || "—"}</p>
            <p>BP: {values.bp || "—"}</p>
            <p>SpO2: {values.spo2 || "—"}</p>
            <p>Temp: {values.temp || "—"}</p>
            <p>Weight: {values.weight ? `${values.weight} kg` : "—"}</p>
          </div>

          <div className="min-h-40 space-y-2">
            {values.diagnosis && (
              <p className="text-[10px]">
                <span className="font-semibold text-neutral-600">Dx: </span>
                {values.diagnosis}
              </p>
            )}

            {values.medicines && values.medicines.length > 0 ? (
              <ol className="space-y-1.5 text-[11px]">
                {values.medicines
                  .filter((m) => m.name)
                  .map((med, i) => (
                    <li key={i} className="flex justify-between gap-2">
                      <span className="font-medium">
                        {i + 1}. {med.name}
                      </span>
                      <span className="shrink-0 text-neutral-500">
                        {med.frequency} &middot; {med.duration}
                      </span>
                    </li>
                  ))}
              </ol>
            ) : (
              <p className="text-neutral-300 italic">Medicines will appear here...</p>
            )}

            {values.specialTests && values.specialTests.length > 0 && (
              <p className="text-[10px]">
                <span className="font-semibold text-neutral-600">Tests advised: </span>
                {values.specialTests.join(", ")}
              </p>
            )}

            {values.furtherPlan && (
              <p className="text-[10px]">
                <span className="font-semibold text-neutral-600">Plan: </span>
                {values.furtherPlan}
              </p>
            )}
          </div>
        </div>

        {values.notes && (
          <p className="mt-3 border-t border-neutral-200 pt-2 text-[10px] text-neutral-600">
            {values.notes}
          </p>
        )}

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between border-t border-neutral-300 pt-2 text-[9px] text-neutral-500">
          <span>Clinic #2 Doctor Line Islamabad</span>
          <span>MON – SAT &middot; 9AM – 9PM &middot; {layout.doctorPhone}</span>
        </div>
      </div>
    </div>
  );
}