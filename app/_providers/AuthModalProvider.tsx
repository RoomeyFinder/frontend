"use client"
import { ReactNode, createContext, useState } from "react"

export const AuthModalContext = createContext<{
  actionHeading: string
  nextUrl: string
  isOpen: boolean
  close: () => void
  open: (props?: { title?: string; nextUrl?: string }) => void
}>({
  isOpen: false,
  close: () => {},
  open: () => {},
  actionHeading: "",
  nextUrl: "",
})

export default function AuthModalProvider({
  children,
}: {
  children: ReactNode | ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [actionHeading, setActionHeading] = useState("")
  const [nextUrl, setNextUrl] = useState("")

  return (
    <AuthModalContext.Provider
      value={{
        isOpen,
        close: () => {
          setIsOpen(false)
          setNextUrl("")
          setActionHeading("")
        },
        open: (options = { title: "", nextUrl: "" }) => {
          const { title = "", nextUrl = "" } = options
          console.log(options)
          setActionHeading(title)
          setNextUrl(nextUrl)
          setIsOpen(true)
        },
        actionHeading,
        nextUrl,
      }}
    >
      {children}
    </AuthModalContext.Provider>
  )
}
