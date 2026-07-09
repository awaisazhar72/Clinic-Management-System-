import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Doctor } from "@/types";
import { cn } from "@/lib/utils";

const statusVariant: Record<Doctor["status"], "success" | "warning" | "secondary"> = {
  active: "success",
  "on-leave": "warning",
  inactive: "secondary",
};

export function DoctorCard({ doctor, onClick }: { doctor: Doctor; onClick?: () => void }) {
  const initials = doctor.fullName
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
      <CardContent className="flex flex-col items-center text-center gap-3">
        <Avatar className="size-16">
          <AvatarImage src={doctor.avatarUrl} alt={doctor.fullName} />
          <AvatarFallback className="bg-primary/10 text-primary text-lg">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium text-foreground">{doctor.fullName}</p>
          <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {doctor.rating !== undefined && (
            <span className="flex items-center gap-1">
              <Star className="size-3.5 fill-warning text-warning" />
              {doctor.rating.toFixed(1)}
            </span>
          )}
          {doctor.experienceYears !== undefined && (
            <span>{doctor.experienceYears} yrs exp</span>
          )}
        </div>
        <Badge variant={statusVariant[doctor.status]} className="capitalize">
          {doctor.status.replace("-", " ")}
        </Badge>
      </CardContent>
    </Card>
  );
}
