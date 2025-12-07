"use client"

import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface RatingStarsProps {
  rating: number
  maxRating?: number
  size?: "sm" | "md" | "lg"
  interactive?: boolean
  onRatingChange?: (rating: number) => void
  className?: string
}

export function RatingStars({
  rating,
  maxRating = 5,
  size = "md",
  interactive = false,
  onRatingChange,
  className,
}: RatingStarsProps) {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-5 w-5",
    lg: "h-7 w-7",
  }

  return (
    <div className={cn("flex gap-0.5", className)}>
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1
        const isFilled = starValue <= rating

        return (
          <button
            key={index}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onRatingChange?.(starValue)}
            className={cn("transition-colors", interactive && "cursor-pointer hover:scale-110")}
          >
            <Star
              className={cn(
                sizeClasses[size],
                isFilled ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground/30",
              )}
            />
          </button>
        )
      })}
    </div>
  )
}
