import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface DoctorScheduleEntry {
  name: string;
  specialty: string;
  nextSlot: string;
  patientsToday: number;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function DoctorScheduleWidget({ doctors }: { doctors: DoctorScheduleEntry[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Doctors on duty</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {doctors.map((doc) => (
            <li key={doc.name} className="flex items-center gap-3">
              <Avatar className="size-9 shrink-0">
                <AvatarFallback className="bg-accent text-accent-foreground text-xs">
                  {initials(doc.name)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{doc.name}</p>
                <p className="truncate text-xs text-muted-foreground">{doc.specialty}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-xs text-muted-foreground">Next: {doc.nextSlot}</p>
                <p className="text-xs font-medium text-foreground">{doc.patientsToday} today</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
