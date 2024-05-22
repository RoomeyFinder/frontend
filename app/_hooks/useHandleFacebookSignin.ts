import { useRouter } from "next/navigation"
import { useContext, useCallback } from "react"
import toast from "react-hot-toast"
import { AuthContext } from "../_providers/AuthContext"
import { UserContext } from "../_providers/UserProvider"
import useAxios from "./useAxios"
import { FBUser } from "../_providers/FacebookProvider"

export default function useHandleFacebookLogin(onSuccess?: () => void) {
  const router = useRouter()
  const { fetchData } = useAxios()
  const { updateUser } = useContext(UserContext)
  const { updateToken } = useContext(AuthContext)

  const handleFacebookUserData = useCallback(
    async (userData: FBUser) => {
      const response = await fetchData({
        url: "/users/facebook",
        method: "post",
        body: {
          userData,
        },
      })
      console.log(response, "ssfac")
      if (response.statusCode === 200 || response.statusCode === 201) {
        onSuccess && onSuccess()
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
    [fetchData, updateToken, updateUser, router, onSuccess]
  )
  return handleFacebookUserData
}
