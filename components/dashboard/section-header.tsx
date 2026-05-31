"use client"

import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  action?: React.ReactNode
  className?: string
}

export function SectionHeader({ title, subtitle, action, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-end justify-between mb-4", className)}>
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-foreground">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-0.5">
            {subtitle}
          </p>
        )}
      </div>
      {action && (
        <div className="flex-shrink-0">
          {action}
        </div>
      )}
    </div>
  )
}
