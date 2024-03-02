import { useContext, useCallback } from "react"
import { UserContext } from "../_providers/UserProvider"
import useAppToast from "./useAppToast"
import useAxios from "./useAxios"

export default function useToggleProfileStatus() {
  const { updateUser, user } = useContext(UserContext)
  const toast = useAppToast()

  const { isFetching, fetchData } = useAxios()

  const toggleProfileStatus = useCallback(
    async (newStatus: boolean) => {
      toast.closeAll()
      const res = await fetchData({
        url: "/users/me/toggle-visibility",
        method: "put",
        body: {
          isVisible: newStatus,
        },
      })
      if (res.statusCode === 200) {
        updateUser(res.user)
        toast({ status: "success", title: res.message })
      } else toast({ title: res.message, status: "error" })
    },
    [updateUser, toast, fetchData]
  )

  return { toggleProfileStatus, user, isFetching }
}
