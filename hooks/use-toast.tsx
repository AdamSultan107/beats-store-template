import { useCallback } from "react"
import { toast as sonnerToast } from "sonner"

// Use toast hook for displaying notifications
// This is a simple wrapper around sonner's toast function
export function useToast() {
  const toast = useCallback(({ title, description }: { title: string; description?: string }) => {
    sonnerToast(title, { description })
  }, [])

  return { toast }
}
