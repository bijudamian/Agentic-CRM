"use client"

import type { ReactNode } from "react"
import { StoreProvider, useStore } from "@/lib/store"
import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { cn } from "@/lib/utils"

function DashboardContent({ children }: { children: ReactNode }) {
  const { sidebarOpen } = useStore()

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header />
      <main className={cn("pt-16 min-h-screen transition-all duration-300", sidebarOpen ? "pl-64" : "pl-16")}>
        <div className="p-4 md:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  )
}

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <StoreProvider>
      <DashboardContent>{children}</DashboardContent>
    </StoreProvider>
  )
}
