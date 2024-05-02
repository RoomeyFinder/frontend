import { TokenResponse } from "@react-oauth/google"
import { useCallback, useContext } from "react"
import useAxios from "./useAxios"
import { UserContext } from "../_providers/UserProvider"
import { AuthContext } from "../_providers/AuthContext"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

export default function useHandleThirdPartyAuths() {
  const router = useRouter()
  const { fetchData } = useAxios()
  const { updateUser } = useContext(UserContext)
  const { updateToken } = useContext(AuthContext)

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
        updateToken(response.token)
        updateUser(response.user)
      } else {
        toast.error(
          response.message ||
            "Something went wrong! Please try again or use another method."
        )
        if(response.statusCode === 302) router.push("/signup")
      }
    },
    [fetchData, updateToken, updateUser, router]
  )
  return {
    handleGoogleAuthSuccess,
  }
}
