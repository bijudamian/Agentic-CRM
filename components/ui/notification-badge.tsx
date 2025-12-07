import { cn } from "@/lib/utils"

interface NotificationBadgeProps {
  count: number
  max?: number
  className?: string
}

export function NotificationBadge({ count, max = 99, className }: NotificationBadgeProps) {
  if (count <= 0) return null

  const displayCount = count > max ? `${max}+` : count

  return (
    <span
      className={cn(
        "absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-xs font-medium text-destructive-foreground",
        className,
      )}
    >
      {displayCount}
    </span>
  )
}
