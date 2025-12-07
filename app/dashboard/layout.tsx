"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, type ReactNode } from "react"
import { Loader2 } from "lucide-react"

export default function Layout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  // If not loading and no user, we render nothing while redirecting
  if (!user) {
    return null
  }

  return <DashboardLayout>{children}</DashboardLayout>
}
