"use client"
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
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
  logout: () => void
}>({
  user: null,
  updateUser: () => {},
  deleteUser: () => {},
  updateLoading: () => {},
  logout: () => {},
  loading: true,
})

export default function UserProvider({
  children,
}: {
  children: ReactNode | ReactNode
}) {
  const { resetAuthorization, isAuthorized } = useContext(AuthContext)
  const {
    data: fallbackUser,
    updateData: updateUser,
    deleteData: deleteUser,
    loading,
    updateLoading,
  } = useGetFromStorage<User>("RF_USER")
  const [user, setUser] = useState<User | null>(null)
  const { fetchData } = useAxios()
  const fetchUser = useCallback(async () => {
    updateLoading()
    const res = await fetchData({
      url: "/users/me",
      method: "get",
    })
    if (res.statusCode === 200) {
      setUser(res.user)
      updateUser(res.user)
    } else if (res.statusCode === 403) resetAuthorization()
    else setUser(fallbackUser)
    updateLoading(false)
  }, [
    fetchData,
    resetAuthorization,
    fallbackUser,
    updateUser,
    updateLoading,
    isAuthorized,
  ])

  const logout = useCallback(() => {
    resetAuthorization()
  }, [resetAuthorization])

  useEffect(() => {
    if (isAuthorized) fetchUser()
  }, [isAuthorized])

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser: (update: User) => setUser(update),
        deleteUser,
        loading,
        updateLoading,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
