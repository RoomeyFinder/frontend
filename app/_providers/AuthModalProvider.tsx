"use client"
import {
  ReactNode,
  createContext,
  useState,
} from "react"

export const AuthModalContext = createContext<{
  isOpen: boolean
  close: () => void
  open: () => void
}>({
  isOpen: false,
  close: () => {},
  open: () => {},
})

export default function AuthModalProvider({
  children,
}: {
  children: ReactNode | ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <AuthModalContext.Provider
      value={{
        isOpen,
        close: () => setIsOpen(false),
        open: () => setIsOpen(true)
      }}
    >
      {children}
    </AuthModalContext.Provider>
  )
}
