"use client"
import localforage from "localforage"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import {
  ReactNode,
  createContext,
  useCallback,
  useMemo,
} from "react"
import useGetFromStorage from "../_hooks/useGetFromStorage"

export const AuthContext = createContext<{
  token: string | null
  isAuthorized: boolean
  updateToken: (newToken: string, useSession?: boolean) => void
  isSessionStorage?: boolean
  resetAuthorization: () => void
  deleteToken: () => void
  loading: boolean
}>({
  token: null,
  isAuthorized: false,
  updateToken: (newToken: string) => {},
  isSessionStorage: undefined,
  resetAuthorization: () => {},
  deleteToken: () => {},
  loading: true
})

const privatePaths = [
  "/profile",
  "/my-ads",
  "/chats",
  "/favorites",
  "/interests",
  "/notifications",
]

export default function AuthProvider({
  children,
}: {
  children: ReactNode | ReactNode
}) {
  const {
    data: token,
    updateData: updateToken,
    deleteData: deleteToken,
    loading,
    isSessionStorage,
  } = useGetFromStorage("RF_TOKEN")
  const pathname = usePathname()
  const router = useRouter()
  const isAuthorized = useMemo(() => token !== null, [token])

  const resetAuthorization = useCallback(
    (saveUrlState = false) => {
      updateToken(null)
      const currentUrl = window.location.pathname
      if (
        pathname !== "/" &&
        privatePaths.some((path) =>
          path.toLowerCase().startsWith(pathname.toLowerCase())
        )
      ) {
        if (saveUrlState) router.push(`/login?next=${currentUrl}`)
        else router.push("/login")
      }
    },
    [updateToken, pathname, router]
  )

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthorized,
        updateToken,
        isSessionStorage,
        resetAuthorization,
        deleteToken,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
