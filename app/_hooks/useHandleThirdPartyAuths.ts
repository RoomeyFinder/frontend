import { TokenResponse } from "@react-oauth/google"
import { useCallback } from "react"
import useAxios from "./useAxios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "../_redux"
import { authenticate } from "../_redux/slices/auth.slice"

export default function useHandleThirdPartyAuths() {
  const router = useRouter()
  const { fetchData } = useAxios()
  const dispatch = useAppDispatch()

  const handleGoogleAuthSuccess = useCallback(
    async (tokenResponse: TokenResponse) => {
      const userData = await fetch(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        }
      )
      const response = await fetchData({
        url: "/users/google",
        method: "post",
        body: {
          userData: await userData.json(),
        },
      })
      if (response.statusCode === 200 || response.statusCode === 201) {
        toast.success("You are signed in!")
        dispatch(
          authenticate({
            user: response.user,
            token: response.token,
          })
        )
      } else {
        toast.error(
          response.message ||
            "Something went wrong! Please try again or use another method."
        )
        if (response.statusCode === 302) router.push("/signup")
      }
    },
    [fetchData, dispatch, router]
  )
  return {
    handleGoogleAuthSuccess,
  }
}
