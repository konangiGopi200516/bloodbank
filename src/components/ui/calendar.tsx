"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CalendarProps {
  className?: string
  children?: React.ReactNode
}

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("p-3", className)}
      {...props}
    >
      {children}
    </div>
  )
)
Calendar.displayName = "Calendar"

export { Calendar }
