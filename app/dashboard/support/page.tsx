"use client"

import { useStore } from "@/lib/store"
import { BusinessSupport } from "@/components/business/support"
import { PersonalSupport } from "@/components/personal/support"

export default function SupportPage() {
  const { mode } = useStore()
  return mode === "business" ? <BusinessSupport /> : <PersonalSupport />
}
