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
import localforage from "localforage"

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
    updateLoading,
  } = useGetFromStorage<string | null>("RF_TOKEN")
  const pathname = usePathname()
  const router = useRouter()
  const isAuthorized = useMemo(() => token !== null, [token])

  const resetAuthorization = useCallback(async () => {
    if (!isAuthorized) return
    updateLoading(true)
    await deleteToken()
    await localforage.clear()
    sessionStorage.clear()
    updateLoading(false)
    router.refresh()
  }, [deleteToken, updateLoading, router, isAuthorized])

  const redirectWhenNotAuthorized = useCallback(() => {
    const currentUrl = window.location.pathname
    if (
      !loading &&
      isAuthorized === false &&
      pathname.toLowerCase().includes("nexus")
    )
      if (pathname.toLowerCase().includes("nexus"))
        router.push(`/login?next=${currentUrl + window.location.search}`)
  }, [pathname, router, isAuthorized, loading])

  useEffect(() => {
    redirectWhenNotAuthorized()
  }, [redirectWhenNotAuthorized])

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
