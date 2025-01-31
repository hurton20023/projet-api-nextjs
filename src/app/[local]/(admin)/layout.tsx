"use client";
import { AppSidebar } from "@/components/common/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import type React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  const { status } = useSession();

  return (
    <main>
      <SidebarProvider>
        <div className="flex h-screen">
          <AppSidebar />
          <SidebarInset>
            <div className="flex-1 overflow-y-auto bg-background py-8 px-20">
              {children}
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </main>
  );
}
