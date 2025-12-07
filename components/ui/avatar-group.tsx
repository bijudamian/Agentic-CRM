import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { cn } from "@/lib/utils"

interface AvatarGroupProps {
  avatars: Array<{
    src?: string
    fallback: string
    alt?: string
  }>
  max?: number
  size?: "sm" | "md" | "lg"
  className?: string
}

export function AvatarGroup({ avatars, max = 4, size = "md", className }: AvatarGroupProps) {
  const visibleAvatars = avatars.slice(0, max)
  const remainingCount = avatars.length - max

  const sizeClasses = {
    sm: "h-6 w-6 text-xs",
    md: "h-8 w-8 text-sm",
    lg: "h-10 w-10 text-base",
  }

  return (
    <div className={cn("flex -space-x-2", className)}>
      {visibleAvatars.map((avatar, index) => (
        <Avatar key={index} className={cn(sizeClasses[size], "border-2 border-background")}>
          <AvatarImage src={avatar.src || "/placeholder.svg"} alt={avatar.alt} />
          <AvatarFallback className="text-xs">{avatar.fallback}</AvatarFallback>
        </Avatar>
      ))}
      {remainingCount > 0 && (
        <div
          className={cn(
            sizeClasses[size],
            "rounded-full bg-muted border-2 border-background flex items-center justify-center font-medium",
          )}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  )
}
