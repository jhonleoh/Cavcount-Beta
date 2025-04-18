"use client"

import { Toast as ToastPrimitive, ToastProvider } from "@radix-ui/react-toast"
import * as React from "react"
import { useToast } from "@/hooks/use-toast"

export function Toaster() {
  const { toasts } = useToast()

  // Create a simple toast display without using the shadcn-ui component
  return (
    <ToastProvider>
      <div className="fixed bottom-0 right-0 z-50 p-4 flex flex-col items-end gap-2">
        {toasts.map(({ id, title, description, action, duration }) => (
          <div
            key={id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 min-w-[300px] max-w-md"
          >
            {title && <div className="font-medium">{title}</div>}
            {description && <div className="text-sm text-gray-500">{description}</div>}
            {action}
          </div>
        ))}
      </div>
    </ToastProvider>
  )
}
