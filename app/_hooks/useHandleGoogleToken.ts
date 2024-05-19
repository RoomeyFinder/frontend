import { TokenResponse } from "@react-oauth/google"
import { useRouter } from "next/navigation"
import { useContext, useCallback } from "react"
import toast from "react-hot-toast"
import { AuthContext } from "../_providers/AuthContext"
import { UserContext } from "../_providers/UserProvider"
import useAxios from "./useAxios"

export default function useHandleGoogleToken() {
  const router = useRouter()
  const { fetchData } = useAxios()
  const { updateUser } = useContext(UserContext)
  const { updateToken } = useContext(AuthContext)

  const handleGoogleToken = useCallback(
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
        updateToken(response.token, false)
        updateUser(response.user, false)
      } else {
        toast.error(
          response.message ||
            "Something went wrong! Please try again or use another method."
        )
        if (response.statusCode === 302) router.push("/signup")
      }
    },
    [fetchData, updateToken, updateUser, router]
  )
  return handleGoogleToken
}
