import { useCallback } from "react"
import { toast as sonnerToast } from "sonner"

export function useToast() {
  const toast = useCallback(({ title, description }: { title: string; description?: string }) => {
    sonnerToast(title, { description })
  }, [])

  return { toast }
}
