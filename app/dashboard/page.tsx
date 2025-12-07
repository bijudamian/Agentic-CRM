"use client"

import { useStore } from "@/lib/store"
import { BusinessDashboard } from "@/components/dashboard/business-dashboard"
import { PersonalDashboard } from "@/components/dashboard/personal-dashboard"

export default function DashboardPage() {
  const { mode } = useStore()

  return mode === "business" ? <BusinessDashboard /> : <PersonalDashboard />
}
