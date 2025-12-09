"use client"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  value: string | number
  label: string
  icon?: React.ReactNode
  variant?: "default" | "primary" | "success" | "warning" | "accent"
  className?: string
  delay?: string
}

const variantStyles = {
  default: "text-foreground",
  primary: "text-primary",
  success: "text-green-500",
  warning: "text-secondary",
  accent: "text-accent",
}

export function StatsCard({ value, label, icon, variant = "default", className, delay = "0s" }: StatsCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden p-4 md:p-5 bg-card/40 backdrop-blur-sm border-border/40",
        "hover:bg-card/60 hover:border-border/60 hover:scale-[1.02]",
        "transition-all duration-300 animate-fade-in group",
        className
      )}
      style={{ animationDelay: delay }}
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative flex items-start justify-between">
        <div>
          <div className={cn("text-2xl md:text-3xl font-bold tracking-tight", variantStyles[variant])}>
            {value}
          </div>
          <div className="text-xs md:text-sm text-muted-foreground mt-1 font-medium">
            {label}
          </div>
        </div>
        {icon && (
          <div className={cn("text-muted-foreground/50 group-hover:text-muted-foreground/70 transition-colors", variantStyles[variant])}>
            {icon}
          </div>
        )}
      </div>
    </Card>
  )
}
