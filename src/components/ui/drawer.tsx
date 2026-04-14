"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Drawer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("fixed inset-0 z-50 flex flex-col", className)}
    {...props}
  />
))
Drawer.displayName = "Drawer"

export { Drawer }
