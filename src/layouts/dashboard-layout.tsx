import { Sidebar } from "@/components/dashboard/sidebar";
import { Navbar } from "@/components/dashboard/navbar";
import { AuthGuard } from "@/components/common/auth-guard";
import { PageTransition } from "@/components/common/page-transition";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <Sidebar />
        <div className="lg:pl-64">
          <Navbar />
          <main className="px-4 py-6 lg:px-6">
            <PageTransition>{children}</PageTransition>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
