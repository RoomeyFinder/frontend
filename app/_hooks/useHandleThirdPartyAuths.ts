import { TokenResponse } from "@react-oauth/google"
import { useCallback, useContext } from "react"
import useAxios from "./useAxios"
import { UserContext } from "../_providers/UserProvider"
import { AuthContext } from "../_providers/AuthContext"
import toast from "react-hot-toast"

export default function useHandleThirdPartyAuths() {
  const { fetchData } = useAxios()
  const { updateUser } = useContext(UserContext)
  const { updateToken } = useContext(AuthContext)

  const handleGoogleAuthSuccess = useCallback(
    async (tokenResposne: TokenResponse) => {
      console.log(tokenResposne)
      const response = await fetchData({
        url: "/users/google",
        method: "get",
        body: {
          token: tokenResposne.access_token,
        },
      })
      if (response.statusCode === 200 || response.statusCode === 201) {
        console.log("success")
        updateToken(response.token)
        updateUser(response.user)
      } else
        toast.error(
          response.message ||
            "Something went wrong! Please try again or use another method."
        )
    },
    [fetchData]
  )
  return {
    handleGoogleAuthSuccess,
  }
}
