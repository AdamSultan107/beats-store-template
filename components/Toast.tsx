"use client"

import { useEffect, useState } from "react"

type ToastProps = {
  message: string
  show: boolean
  onClose: () => void
}

export default function Toast({ message, show, onClose }: ToastProps) {
  const [visible, setVisible] = useState(show)

  useEffect(() => {
    if (show) {
      setVisible(true)
      const timeout = setTimeout(() => {
        setVisible(false)
        onClose()
      }, 3000)

      return () => clearTimeout(timeout)
    }
  }, [show, onClose])

  if (!visible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-pink-500 text-white px-4 py-3 rounded-lg shadow-lg text-sm animate-slide-in">
        {message}
      </div>
    </div>
  )
}
