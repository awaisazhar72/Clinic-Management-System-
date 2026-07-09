import { SidebarNav } from "./sidebar-nav";

export function Sidebar() {
  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:border-r lg:border-sidebar-border lg:bg-sidebar">
      <SidebarNav />
    </aside>
  );
}
