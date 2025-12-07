"use client"

import { useStore } from "@/lib/store"
import { BusinessProfile } from "@/components/business/profile"
import { PersonalProfile } from "@/components/personal/profile"

export default function ProfilePage() {
  const { mode } = useStore()
  return mode === "business" ? <BusinessProfile /> : <PersonalProfile />
}
