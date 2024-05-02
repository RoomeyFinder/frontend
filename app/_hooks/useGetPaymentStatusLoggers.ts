import { useCallback, useContext } from "react"
import useAxios from "./useAxios"
import { UserContext } from "../_providers/UserProvider"

export default function PaymentStatusLoggers() {
  const { fetchData } = useAxios()
  const { updateUser } = useContext(UserContext)
  const onSuccessLogger = useCallback(
    async (data: any) => {
      const res = await fetchData({
        url: "/purchases",
        method: "post",
        body: data,
      })
      console.log(res)
      res.statusCode === 200 && updateUser(res.user)
    },
    [fetchData, updateUser]
  )
  const onCloseLogger = useCallback(() => {}, [])
  return { onSuccessLogger, onCloseLogger }
}
