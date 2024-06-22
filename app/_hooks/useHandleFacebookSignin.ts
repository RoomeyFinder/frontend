import { useRouter } from "next/navigation"
import { useCallback } from "react"
import toast from "react-hot-toast"
import useAxios from "./useAxios"
import { FBUser } from "../_providers/FacebookProvider"
import { authenticate } from "../_redux/slices/auth.slice"
import { useAppDispatch } from "../_redux"

export default function useHandleFacebookLogin(onSuccess?: () => void) {
  const router = useRouter()
  const { fetchData } = useAxios()
  const dispatch = useAppDispatch()

  const handleFacebookUserData = useCallback(
    async (userData: FBUser) => {
      const response = await fetchData({
        url: "/users/facebook",
        method: "post",
        body: {
          userData,
        },
      })
      if (response.statusCode === 200 || response.statusCode === 201) {
        onSuccess && onSuccess()
        dispatch(
          authenticate({
            user: response.user,
            token: response.token,
          })
        )
        toast.success("Signed in successfully")
      } else {
        toast.error(
          response.message ||
            "Something went wrong! Please try again or use another method."
        )
        if (response.statusCode === 302) router.push("/signup")
      }
    },
    [fetchData, dispatch, router, onSuccess]
  )
  return handleFacebookUserData
}
