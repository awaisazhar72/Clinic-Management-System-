"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, LogOut } from "lucide-react";

import { cn } from "@/lib/utils";
import { ICON_MAP } from "@/lib/icon-map";
import { SIDEBAR_LINKS } from "@/constants";
import { useAuthStore } from "@/store/authStore";

type SidebarChild = { label: string; href: string };
type SidebarLink = {
  label: string;
  href: string;
  icon: string;
  children?: readonly SidebarChild[];
};

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const isLinkActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const link of SIDEBAR_LINKS as readonly SidebarLink[]) {
      if (link.children?.some((c) => isLinkActive(c.href))) {
        initial[link.label] = true;
      }
    }
    return initial;
  });

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleLogout = () => {
    clearAuth();
    router.push("/login");
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 px-5 py-5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
          C
        </div>
        <span className="text-base font-semibold tracking-tight text-sidebar-foreground">
          Clinic Management
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-2">
        <ul className="space-y-1">
          {(SIDEBAR_LINKS as readonly SidebarLink[]).map((link) => {
            const Icon = ICON_MAP[link.icon];
            const hasChildren = !!link.children?.length;
            const isParentActive = isLinkActive(link.href);
            const isOpen = hasChildren ? !!openMenus[link.label] : false;

            if (!hasChildren) {
              return (
                <li key={link.href}>
                  <Link href={link.href} onClick={onNavigate} className="block">
                    <motion.span
                      whileTap={{ scale: 0.97 }}
                      transition={{ duration: 0.1 }}
                      className={cn(
                        "relative flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        isParentActive
                          ? "text-sidebar-primary"
                          : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      )}
                    >
                      {isParentActive && (
                        <motion.span
                          layoutId="sidebar-active-pill"
                          className="absolute inset-0 rounded-md bg-sidebar-primary/10"
                          transition={{ type: "spring", stiffness: 500, damping: 35 }}
                        />
                      )}
                      {Icon && (
                        <Icon
                          className={cn(
                            "relative size-4 shrink-0",
                            isParentActive ? "text-sidebar-primary" : "text-sidebar-foreground/50"
                          )}
                        />
                      )}
                      <span className="relative">{link.label}</span>
                    </motion.span>
                  </Link>
                </li>
              );
            }

            return (
              <li key={link.label}>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.1 }}
                  onClick={() => toggleMenu(link.label)}
                  className={cn(
                    "relative flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isParentActive
                      ? "text-sidebar-primary"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  {isParentActive && !isOpen && (
                    <motion.span
                      layoutId="sidebar-active-pill"
                      className="absolute inset-0 rounded-md bg-sidebar-primary/10"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                  {Icon && (
                    <Icon
                      className={cn(
                        "relative size-4 shrink-0",
                        isParentActive ? "text-sidebar-primary" : "text-sidebar-foreground/50"
                      )}
                    />
                  )}
                  <span className="relative flex-1 text-left">{link.label}</span>
                  <ChevronDown
                    className={cn(
                      "relative size-3.5 shrink-0 transition-transform duration-200",
                      isOpen && "rotate-180"
                    )}
                  />
                </motion.button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.18, ease: "easeInOut" }}
                      className="overflow-hidden pl-4"
                    >
                      {link.children!.map((child) => {
                        const isChildActive = pathname === child.href;
                        return (
                          <li key={child.href} className="relative mt-0.5">
                            <Link href={child.href} onClick={onNavigate} className="block">
                              <motion.span
                                whileTap={{ scale: 0.97 }}
                                transition={{ duration: 0.1 }}
                                className={cn(
                                  "relative flex items-center gap-2 rounded-md py-1.5 pl-5 pr-3 text-sm transition-colors before:absolute before:left-1.5 before:top-1/2 before:h-1 before:w-1 before:-translate-y-1/2 before:rounded-full",
                                  isChildActive
                                    ? "font-medium text-sidebar-primary before:bg-sidebar-primary"
                                    : "text-sidebar-foreground/60 before:bg-sidebar-foreground/30 hover:text-sidebar-accent-foreground"
                                )}
                              >
                                {child.label}
                              </motion.span>
                            </Link>
                          </li>
                        );
                      })}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-sidebar-border px-3 py-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-destructive"
        >
          <LogOut className="size-4 shrink-0" />
          Logout
        </button>
      </div>
    </div>
  );
}