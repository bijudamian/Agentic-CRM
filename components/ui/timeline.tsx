import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface TimelineItem {
  title: string
  description?: string
  date: string
  icon?: ReactNode
  status?: "completed" | "current" | "upcoming"
}

interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item, index) => (
        <div key={index} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "h-8 w-8 rounded-full flex items-center justify-center",
                item.status === "completed"
                  ? "bg-green-500/10 text-green-500"
                  : item.status === "current"
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground",
              )}
            >
              {item.icon || (
                <div
                  className={cn(
                    "h-2 w-2 rounded-full",
                    item.status === "completed"
                      ? "bg-green-500"
                      : item.status === "current"
                        ? "bg-primary"
                        : "bg-muted-foreground",
                  )}
                />
              )}
            </div>
            {index < items.length - 1 && <div className="w-0.5 flex-1 bg-border mt-2" />}
          </div>
          <div className="flex-1 pb-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">{item.title}</h4>
              <span className="text-xs text-muted-foreground">{item.date}</span>
            </div>
            {item.description && <p className="text-sm text-muted-foreground mt-1">{item.description}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}
