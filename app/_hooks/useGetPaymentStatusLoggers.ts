import { useCallback, useContext } from "react"
import useAxios from "./useAxios"
import { UserContext } from "../_providers/UserProvider"
import { useAppDispatch, useAppSelector } from "../_redux"
import { updateUser } from "../_redux/slices/auth.slice"

export default function PaymentStatusLoggers() {
  const { fetchData } = useAxios()
  const dispatch = useAppDispatch()
  const onSuccessLogger = useCallback(
    async (data: any) => {
      const res = await fetchData({
        url: "/purchases",
        method: "post",
        body: data,
      })
      console.log(res)
      res.statusCode === 200 && dispatch(updateUser(res.user))
    },
    [fetchData, dispatch]
  )
  const onCloseLogger = useCallback(() => {}, [])
  return { onSuccessLogger, onCloseLogger }
}
