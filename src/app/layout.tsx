import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "@/context/app-providers";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "SehatOS | Clinic Management",
  description: "Modern clinic management platform for doctors, patients, and staff.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans">
        <AppProviders>
          {children}
          <Toaster richColors position="top-right" />
        </AppProviders>
      </body>
    </html>
  );
}
