"use client";

import { useMemo, useState } from "react";
import {
  ClipboardList,
  History,
  LayoutGrid,
  MessageCircle,
  Pill,
  Printer,
  User,
} from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "@/components/common/page-header";
import { PrescriptionPreview } from "@/components/dashboard/prescription-preview";
import { PrescriptionLayoutDialog } from "@/components/forms/prescription-layout-dialog";
import { MedicineRow, type MedicineRowValue } from "@/components/forms/medicine-row";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

import {
  recentPatientsMock,
  specialTestOptions,
  defaultLayoutSettings,
} from "@/constants/prescriptions-mock";
import type { PrescriptionLayoutSettings } from "@/types";
import type { LayoutSettingsFormValues } from "@/schemas/prescription.schema";

const emptyMedicine: MedicineRowValue = { name: "", frequency: "", timing: "", duration: "" };

export default function PrescriptionsPage() {
  const [layoutOpen, setLayoutOpen] = useState(false);
  const [layoutSettings, setLayoutSettings] =
    useState<PrescriptionLayoutSettings>(defaultLayoutSettings);

  // form state
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientGender, setPatientGender] = useState<"Male" | "Female" | "Other" | "">("");
  const [recentPatientId, setRecentPatientId] = useState("");

  const [pulse, setPulse] = useState("");
  const [bp, setBp] = useState("");
  const [spo2, setSpo2] = useState("");
  const [temp, setTemp] = useState("");
  const [weight, setWeight] = useState("");

  const [diagnosis, setDiagnosis] = useState("");
  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  const [furtherPlan, setFurtherPlan] = useState("");
  const [medicines, setMedicines] = useState<MedicineRowValue[]>([{ ...emptyMedicine }]);
  const [notes, setNotes] = useState(
    "Avoid salt in diet, soft drinks, bakery items (cakes, pastries, biscuits, samosas, pakoras, naan, pickles, nimko, ketchup) and alcohol."
  );

  const previewValues = useMemo(
    () => ({
      patientName,
      patientAge,
      patientGender: patientGender || undefined,
      pulse,
      bp,
      spo2,
      temp,
      weight,
      diagnosis,
      specialTests: selectedTests,
      furtherPlan,
      medicines,
      notes,
    }),
    [patientName, patientAge, patientGender, pulse, bp, spo2, temp, weight, diagnosis, selectedTests, furtherPlan, medicines, notes]
  );

  const handleRecentPatientSelect = (id: string) => {
    setRecentPatientId(id);
    const patient = recentPatientsMock.find((p) => p.id === id);
    if (patient) {
      setPatientName(patient.name);
      setPatientAge(patient.age);
      setPatientGender(patient.gender);
    }
  };

  const toggleTest = (test: string) => {
    setSelectedTests((prev) =>
      prev.includes(test) ? prev.filter((t) => t !== test) : [...prev, test]
    );
  };

  const updateMedicine = (index: number, value: MedicineRowValue) => {
    setMedicines((prev) => prev.map((m, i) => (i === index ? value : m)));
  };

  const addMedicine = () => setMedicines((prev) => [...prev, { ...emptyMedicine }]);

  const removeMedicine = (index: number) =>
    setMedicines((prev) => prev.filter((_, i) => i !== index));

  const handlePrint = () => {
    if (!patientName) {
      toast.error("Enter patient details before printing");
      return;
    }
    toast.success("Preparing prescription for print/PDF export");
  };

  const handleWhatsapp = () => {
    if (!patientName) {
      toast.error("Enter patient details first");
      return;
    }
    toast.success(`Sharing prescription with ${patientName} via WhatsApp`);
  };

  const handleSaveLayout = (values: LayoutSettingsFormValues) => {
    setLayoutSettings((prev) => ({ ...prev, ...values }));
  };

  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        title="Prescription"
        description="Generate bilingual orders."
        action={
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm">
              <ClipboardList className="size-3.5" />
              Plans
            </Button>
            <Button variant="outline" size="sm" onClick={() => setLayoutOpen(true)}>
              <LayoutGrid className="size-3.5" />
              Layout
            </Button>
            <Button variant="outline" size="sm">
              <History className="size-3.5" />
              History
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-success/30 text-success hover:bg-success/10"
              onClick={handleWhatsapp}
            >
              <MessageCircle className="size-3.5" />
              WhatsApp
            </Button>
            <Button variant="outline" size="sm">
              <Pill className="size-3.5" />
              Pharmacy
            </Button>
            <Button size="sm" onClick={handlePrint}>
              <Printer className="size-3.5" />
              Print / PDF
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left: form */}
        <Card>
          <CardContent className="space-y-6">
            {/* Patient details */}
            <div className="space-y-3">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <User className="size-4 text-primary" />
                Patient Details
              </h3>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  Search in Directory (Global Search)
                </label>
                <Input placeholder="Search patient name..." />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  Quick Select (Recent Patients)
                </label>
                <Select value={recentPatientId} onValueChange={handleRecentPatientSelect}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="-- Choose Recent --" />
                  </SelectTrigger>
                  <SelectContent>
                    {recentPatientsMock.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name} &middot; {p.age}y &middot; {p.gender}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Patient Name</label>
                  <Input value={patientName} onChange={(e) => setPatientName(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Age (Years)</label>
                  <Input value={patientAge} onChange={(e) => setPatientAge(e.target.value)} />
                </div>
              </div>
            </div>

            {/* Vitals */}
            <div className="space-y-3 border-t border-border pt-4">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Vitals Overview
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Pulse</label>
                  <Input placeholder="70/min" value={pulse} onChange={(e) => setPulse(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">BP</label>
                  <Input placeholder="120/80" value={bp} onChange={(e) => setBp(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">SpO2</label>
                  <Input placeholder="98%" value={spo2} onChange={(e) => setSpo2(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Temp (°F/°C)</label>
                  <Input placeholder="98.6 F" value={temp} onChange={(e) => setTemp(e.target.value)} />
                </div>
                <div className="col-span-2 space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Weight</label>
                  <div className="flex gap-2">
                    <Input placeholder="65" value={weight} onChange={(e) => setWeight(e.target.value)} />
                    <Select defaultValue="kg">
                      <SelectTrigger className="w-24 shrink-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">kg</SelectItem>
                        <SelectItem value="lb">lb</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Diagnosis */}
            <div className="space-y-1.5 border-t border-border pt-4">
              <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Diagnosis
              </label>
              <Textarea
                rows={2}
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                placeholder="Enter diagnosis..."
              />
            </div>

            {/* Special tests */}
            <div className="space-y-2 border-t border-border pt-4">
              <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Special Tests Advised
              </label>
              <div className="flex flex-wrap gap-1.5">
                {specialTestOptions.map((test) => {
                  const isSelected = selectedTests.includes(test);
                  return (
                    <button key={test} type="button" onClick={() => toggleTest(test)}>
                      <Badge
                        variant={isSelected ? "default" : "outline"}
                        className="cursor-pointer select-none"
                      >
                        + {test}
                      </Badge>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Further plan */}
            <div className="space-y-1.5 border-t border-border pt-4">
              <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Further Plan / Comment
              </label>
              <Textarea
                rows={2}
                value={furtherPlan}
                onChange={(e) => setFurtherPlan(e.target.value)}
                placeholder="Follow-up instructions..."
              />
            </div>

            {/* Medicines */}
            <div className="space-y-3 border-t border-border pt-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Medicines Directory
                </label>
                <Button type="button" variant="outline" size="sm" onClick={addMedicine}>
                  + Add Med
                </Button>
              </div>
              <div className="space-y-2">
                {medicines.map((med, i) => (
                  <MedicineRow
                    key={i}
                    index={i}
                    value={med}
                    onChange={(v) => updateMedicine(i, v)}
                    onRemove={() => removeMedicine(i)}
                    canRemove={medicines.length > 1}
                  />
                ))}
              </div>
            </div>

            {/* General instructions */}
            <div className="space-y-1.5 border-t border-border pt-4">
              <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                General Instructions (English)
              </label>
              <Textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        {/* Right: live preview */}
        <div className="lg:sticky lg:top-20 lg:self-start">
          <PrescriptionPreview values={previewValues} layout={layoutSettings} />
        </div>
      </div>

      <PrescriptionLayoutDialog
        open={layoutOpen}
        onOpenChange={setLayoutOpen}
        settings={layoutSettings}
        onSaved={handleSaveLayout}
      />
    </div>
  );
}