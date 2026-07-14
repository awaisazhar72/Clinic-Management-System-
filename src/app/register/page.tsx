"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { AuthLayout } from "@/layouts/auth-layout";
import { GuestLayout } from "@/layouts/guest-layout";
import { AnimatedField, staggerContainer } from "@/components/common/animated-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { registerSchema, type RegisterFormValues } from "@/schemas/auth.schema";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      clinicName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: true as unknown as true,
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setIsSubmitting(true);
    try {
      // TODO: replace with authService.register(values) once backend is connected
      await new Promise((resolve) => setTimeout(resolve, 900));
      toast.success("Clinic account created — please sign in");
      router.push("/login");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <GuestLayout>
      <AuthLayout
        title="Set up your clinic"
        subtitle="Create an account to start managing appointments, patients, and billing."
      >
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          initial="hidden"
          animate="show"
          variants={staggerContainer}
        >
          <AnimatedField className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full name</Label>
              <Input
                id="fullName"
                placeholder="Dr. Ayesha Khan"
                autoComplete="name"
                aria-invalid={!!errors.fullName}
                {...register("fullName")}
              />
              {errors.fullName && (
                <p className="text-xs text-destructive">{errors.fullName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="clinicName">Clinic name</Label>
              <Input
                id="clinicName"
                placeholder="Sehat Clinic"
                aria-invalid={!!errors.clinicName}
                {...register("clinicName")}
              />
              {errors.clinicName && (
                <p className="text-xs text-destructive">{errors.clinicName.message}</p>
              )}
            </div>
          </AnimatedField>

          <AnimatedField className="space-y-2">
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
          </AnimatedField>

          <AnimatedField className="space-y-2">
            <Label htmlFor="phone">Phone number</Label>
            <Input
<<<<<<< Updated upstream
              id="clinicName"
              placeholder="City Care Clinic"
              aria-invalid={!!errors.clinicName}
              {...register("clinicName")}
=======
              id="phone"
              type="tel"
              placeholder="+92 300 1234567"
              autoComplete="tel"
              aria-invalid={!!errors.phone}
              {...register("phone")}
>>>>>>> Stashed changes
            />
            {errors.phone && (
              <p className="text-xs text-destructive">{errors.phone.message}</p>
            )}
          </AnimatedField>

          <AnimatedField className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="new-password"
                aria-invalid={!!errors.password}
                className="pr-10"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password.message}</p>
            )}
          </AnimatedField>

          <AnimatedField className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="new-password"
              aria-invalid={!!errors.confirmPassword}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-destructive">
                {errors.confirmPassword.message}
              </p>
            )}
          </AnimatedField>

          <AnimatedField>
            <div className="flex items-start gap-2">
              <Checkbox id="terms" className="mt-0.5" {...register("terms")} />
              <Label htmlFor="terms" className="font-normal text-muted-foreground leading-snug">
                I agree to the Terms of Service and Privacy Policy
              </Label>
            </div>
            {errors.terms && (
              <p className="mt-2 text-xs text-destructive">{errors.terms.message}</p>
            )}
          </AnimatedField>

          <AnimatedField>
            <motion.div whileTap={{ scale: 0.98 }}>
              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="size-4 animate-spin" />}
                Create clinic account
              </Button>
            </motion.div>
          </AnimatedField>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-sm text-muted-foreground"
        >
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </motion.p>
      </AuthLayout>
    </GuestLayout>
  );
}