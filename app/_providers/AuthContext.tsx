"use client"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
} from "react"
import useGetFromStorage from "../_hooks/useGetFromStorage"

export const AuthContext = createContext<{
  token: string | null
  isAuthorized: boolean
  updateToken: (newToken: string, useSession?: boolean) => void
  isSessionStorage?: boolean
  resetAuthorization: (saveUrlState?: boolean) => void
  deleteToken: () => void
  loading: boolean
    }>({
      token: null,
      isAuthorized: false,
      updateToken: () => {},
      isSessionStorage: undefined,
      resetAuthorization: () => {},
      deleteToken: () => {},
      loading: true,
    })

const privatePaths = [
  "/profile",
  "/ads",
  "/messengers",
  "/favorites",
  "/interests",
  "/notifications",
  "/messenger",
]

export default function AuthProvider({
  children,
}: {
  children: ReactNode | ReactNode
}) {

  //clear storage on logout!!!!
  const {
    data: token,
    updateData: updateToken,
    deleteData: deleteToken,
    loading,
    isSessionStorage,
  } = useGetFromStorage<string | null>("RF_TOKEN")
  const pathname = usePathname()
  const router = useRouter()
  const isAuthorized = useMemo(() => token !== null, [token])

  const resetAuthorization = useCallback(
    (saveUrlState = false) => {
      const currentUrl = window.location.pathname
      if (
        pathname !== "/" &&
        privatePaths.some((path) =>
          pathname.toLowerCase().startsWith(path.toLowerCase())
        )
      ) {
        if (saveUrlState)
          router.push(`/login?next=${currentUrl + window.location.search}`)
        else router.push("/login")
      }
    },
    [pathname, router]
  )

  useEffect(() => {
    if (
      !loading &&
      isAuthorized === false &&
      privatePaths.some((path) =>
        pathname.toLowerCase().startsWith(path.toLowerCase())
      )
    )
      resetAuthorization(true)
  }, [pathname, resetAuthorization, isAuthorized, loading])

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
