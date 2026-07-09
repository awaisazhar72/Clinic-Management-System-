import Link from "next/link";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/constants";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6 text-center">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground text-xl font-bold">
        S
      </div>
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          {APP_NAME}
        </h1>
        <p className="mt-2 text-muted-foreground max-w-md">
          A modern clinic management platform for appointments, patients,
          prescriptions, and billing.
        </p>
      </div>
      <div className="flex gap-3">
        <Button asChild size="lg">
          <Link href="/login">Sign in</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/register">Register your clinic</Link>
        </Button>
      </div>
    </div>
  );
}
