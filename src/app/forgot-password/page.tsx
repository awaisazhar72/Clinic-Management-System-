"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2, MailCheck } from "lucide-react";
import { toast } from "sonner";

import { AuthLayout } from "@/layouts/auth-layout";
import { GuestLayout } from "@/layouts/guest-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/schemas/auth.schema";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setIsSubmitting(true);
    try {
      // TODO: replace with authService.forgotPassword(values.email)
      await new Promise((resolve) => setTimeout(resolve, 900));
      setSent(true);
      toast.success("Reset code sent to your email");
    } catch {
      toast.error("Couldn't send the reset code. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (sent) {
    return (
      <GuestLayout>
      <AuthLayout
        title="Check your inbox"
        subtitle="We've sent a 6-digit code to help you reset your password."
      >
        <div className="flex flex-col items-center text-center py-6">
          <div className="flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground mb-5">
            <MailCheck className="size-6" />
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            A verification code was sent to{" "}
            <span className="font-medium text-foreground">{getValues("email")}</span>.
            It expires in 10 minutes.
          </p>
          <Button
            className="mt-6 w-full"
            size="lg"
            onClick={() =>
              router.push(`/otp?email=${encodeURIComponent(getValues("email"))}`)
            }
          >
            Enter verification code
          </Button>
          <button
            type="button"
            onClick={() => setSent(false)}
            className="mt-4 text-sm text-muted-foreground hover:text-foreground"
          >
            Use a different email
          </button>
        </div>
      </AuthLayout>
      </GuestLayout>
    );
  }

  return (
    <GuestLayout>
    <AuthLayout
      title="Forgot your password?"
      subtitle="Enter the email linked to your clinic account and we'll send a reset code."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@clinic.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="size-4 animate-spin" />}
          Send reset code
        </Button>
      </form>

      <Link
        href="/login"
        className="mt-8 flex items-center justify-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Back to sign in
      </Link>
    </AuthLayout>
    </GuestLayout>
  );
}
