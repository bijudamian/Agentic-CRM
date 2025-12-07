"use client"

import { useStore } from "@/lib/store"
import { Building2, User } from "lucide-react"
import { cn } from "@/lib/utils"

export function ModeToggle() {
  const { mode, setMode } = useStore()

  return (
    <div className="flex items-center gap-2 p-1 bg-muted rounded-lg">
      <button
        onClick={() => setMode("business")}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
          mode === "business"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground hover:bg-muted-foreground/10",
        )}
      >
        <Building2 className="h-4 w-4" />
        <span className="hidden sm:inline">Business</span>
      </button>
      <button
        onClick={() => setMode("personal")}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
          mode === "personal"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground hover:bg-muted-foreground/10",
        )}
      >
        <User className="h-4 w-4" />
        <span className="hidden sm:inline">Personal</span>
      </button>
    </div>
  )
}
