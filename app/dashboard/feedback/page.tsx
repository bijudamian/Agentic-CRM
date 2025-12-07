"use client"

import { useStore } from "@/lib/store"
import { BusinessFeedback } from "@/components/business/feedback"
import { PersonalFeedback } from "@/components/personal/feedback"

export default function FeedbackPage() {
  const { mode } = useStore()
  return mode === "business" ? <BusinessFeedback /> : <PersonalFeedback />
}
