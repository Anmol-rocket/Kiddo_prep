"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"

interface FeatureCardProps {
  href: string
  icon: React.ReactNode
  title: string
  description: string
  stats?: React.ReactNode
  gradient: string
  borderColor: string
  iconColor?: string
  className?: string
}

export function FeatureCard({
  href,
  icon,
  title,
  description,
  stats,
  gradient,
  borderColor,
  iconColor = "text-foreground",
  className,
}: FeatureCardProps) {
  return (
    <Link href={href} className="block group">
      <Card
        className={cn(
          "relative overflow-hidden p-5 md:p-6 transition-all duration-300",
          "hover:scale-[1.01] hover:shadow-lg",
          gradient,
          borderColor,
          className
        )}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative flex items-center gap-4">
          {/* Icon container */}
          <div className={cn(
            "flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center",
            "bg-background/20 backdrop-blur-sm",
            "group-hover:scale-110 transition-transform duration-300"
          )}>
            <span className={cn("text-2xl md:text-3xl", iconColor)}>{icon}</span>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg md:text-xl font-bold text-foreground mb-0.5 truncate">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
            {stats && (
              <div className="mt-2">
                {stats}
              </div>
            )}
          </div>

          {/* Arrow indicator */}
          <div className="flex-shrink-0 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all duration-300">
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </div>
        </div>
      </Card>
    </Link>
  )
}
