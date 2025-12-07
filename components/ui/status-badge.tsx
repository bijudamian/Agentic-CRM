import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type StatusVariant = "default" | "success" | "warning" | "error" | "info"

interface StatusBadgeProps {
  status: string
  variant?: StatusVariant
  className?: string
}

const variantStyles: Record<StatusVariant, string> = {
  default: "bg-secondary text-secondary-foreground",
  success: "bg-green-500/10 text-green-500 border-green-500/20",
  warning: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  error: "bg-red-500/10 text-red-500 border-red-500/20",
  info: "bg-blue-500/10 text-blue-500 border-blue-500/20",
}

export function StatusBadge({ status, variant = "default", className }: StatusBadgeProps) {
  return (
    <Badge variant="outline" className={cn(variantStyles[variant], className)}>
      {status}
    </Badge>
  )
}
