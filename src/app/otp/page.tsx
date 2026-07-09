"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { AuthLayout } from "@/layouts/auth-layout";
import { GuestLayout } from "@/layouts/guest-layout";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { otpSchema, type OtpFormValues } from "@/schemas/auth.schema";

function OtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { code: "" },
  });

  const onSubmit = async (values: OtpFormValues) => {
    setIsSubmitting(true);
    try {
      // TODO: replace with authService.verifyOtp(email, values.code)
      await new Promise((resolve) => setTimeout(resolve, 900));
      toast.success("Code verified");
      router.push(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch {
      toast.error("That code doesn't look right. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <GuestLayout>
    <AuthLayout
      title="Enter verification code"
      subtitle={
        email
          ? `We sent a 6-digit code to ${email}.`
          : "Enter the 6-digit code we sent to your email."
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Controller
          control={control}
          name="code"
          render={({ field }) => (
            <InputOTP
              maxLength={6}
              value={field.value}
              onChange={field.onChange}
              containerClassName="justify-between"
            >
              <InputOTPGroup className="w-full justify-between">
                {Array.from({ length: 6 }).map((_, i) => (
                  <InputOTPSlot key={i} index={i} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          )}
        />
        {errors.code && (
          <p className="text-xs text-destructive -mt-3">{errors.code.message}</p>
        )}

        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="size-4 animate-spin" />}
          Verify code
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Didn&apos;t get a code?{" "}
        <button
          type="button"
          onClick={() => toast.info("A new code has been sent")}
          className="font-medium text-primary hover:underline"
        >
          Resend
        </button>
      </p>
    </AuthLayout>
    </GuestLayout>
  );
}

export default function OtpPage() {
  return (
    <Suspense fallback={null}>
      <OtpForm />
    </Suspense>
  );
}
