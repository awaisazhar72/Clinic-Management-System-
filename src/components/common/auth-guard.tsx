"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { Loader2 } from "lucide-react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // zustand persist rehydrates on mount; give it a tick before deciding
    const timer = setTimeout(() => {
      if (!isAuthenticated) {
        router.replace("/login");
      } else {
        setChecked(true);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [isAuthenticated, router]);

  if (!checked && !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return <>{children}</>;
}
