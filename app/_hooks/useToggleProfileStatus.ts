import { useCallback } from "react"
import useAppToast from "./useAppToast"
import useAxios from "./useAxios"
import { useAppDispatch, useAppSelector } from "../_redux"
import { updateUser } from "../_redux/slices/auth.slice"

export default function useToggleProfileStatus() {
  const { user } = useAppSelector((store) => store.auth)
  const toast = useAppToast()
  const dispatch = useAppDispatch()
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
        dispatch(updateUser(res.user))
        toast({ status: "success", title: res.message })
      } else toast({ title: res.message, status: "error" })
    },
    [toast, fetchData, dispatch]
  )

  return { toggleProfileStatus, user, isFetching }
}
