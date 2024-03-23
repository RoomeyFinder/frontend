"use client"
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react"
import useAxios from "../_hooks/useAxios"
import { AuthContext } from "./AuthContext"
import User from "../_types/User"
import useGetFromStorage from "../_hooks/useGetFromStorage"

export const UserContext = createContext<{
  user: User | null
  updateUser: (data: User, useSession?: boolean) => void
  deleteUser: () => void
  loading: boolean
  updateLoading: (upd?: boolean) => void
    }>({
      user: null,
      updateUser: () => {},
      deleteUser: () => {},
      updateLoading: () => {},
      loading: true,
    })

export default function UserProvider({
  children,
}: {
  children: ReactNode | ReactNode
}) {
  const { resetAuthorization, isAuthorized } = useContext(AuthContext)
  const {
    data: user,
    updateData: updateUser,
    deleteData: deleteUser,
    loading,
    updateLoading,
  } = useGetFromStorage("RF_USER")

  const { fetchData } = useAxios()

  const fetchUser = useCallback(async () => {
    if (user || !isAuthorized) return
    updateLoading(true)
    const res = await fetchData({
      url: "/users/me",
      method: "get",
    })
    if (res.statusCode === 200) updateUser(res.user)
    else if (res.statusCode === 403) resetAuthorization()
    updateLoading(false)
  }, [
    fetchData,
    resetAuthorization,
    user,
    updateUser,
    updateLoading,
    isAuthorized,
  ])

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <UserContext.Provider
      value={{ user, updateUser, deleteUser, loading, updateLoading }}
    >
      {children}
    </UserContext.Provider>
  )
}
