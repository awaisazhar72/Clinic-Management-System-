import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import type { Patient } from "@/types";
import { cn } from "@/lib/utils";

export function PatientCard({ patient, onClick }: { patient: Patient; onClick?: () => void }) {
  const initials = patient.fullName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Card
      className={cn(onClick && "cursor-pointer transition-shadow hover:shadow-md")}
      onClick={onClick}
    >
      <CardContent className="flex items-center gap-3">
        <Avatar className="size-11">
          <AvatarImage src={patient.avatarUrl} alt={patient.fullName} />
          <AvatarFallback className="bg-accent text-accent-foreground">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-foreground">{patient.fullName}</p>
          <p className="text-sm text-muted-foreground capitalize">
            {patient.age} yrs &middot; {patient.gender}
          </p>
        </div>
        {patient.lastVisit && (
          <div className="text-right shrink-0">
            <p className="text-xs text-muted-foreground">Last visit</p>
            <p className="text-sm text-foreground">{patient.lastVisit}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
