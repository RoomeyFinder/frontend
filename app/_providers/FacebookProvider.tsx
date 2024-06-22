"use client"
import { useCallback, useEffect } from "react"
import toast from "react-hot-toast"

declare const window: any

export default function FacebookProvider() {
  useEffect(() => {
    window.FB
  }, [])
  return (
    <>
      <script
        async
        defer
        crossOrigin="anonymous"
        src="https://connect.facebook.net/en_US/sdk.js"
      ></script>
    </>
  )
}

export type FBUser = {
  birthday: string
  email: string
  first_name: string
  gender: string
  id: string
  last_name: string
}
export type FBError = {
  error: any
}
export function useSigninWithFacebook(
  handleResponse: (response: FBUser) => void
) {
  const getDetails = useCallback(() => {
    window.FB.api(
      "/me",
      "GET",
      { fields: "id,last_name,first_name,email,birthday,gender" },
      function (response?: FBUser | FBError) {
        if (!response || (response as FBError).error) {
          toast.error(
            "An error occured. Unable to sign you in with facebook. Please try another method."
          )
        } else {
          console.log(response)
          handleResponse(response as FBUser)
        }
      }
    )
  }, [handleResponse])
  const fbSignIn = useCallback(() => {
    window.FB.init({
      appId: process.env.NEXT_PUBLIC_FB_APP_ID,
      xfbml: true,
      version: "v19.0",
    })
    window.FB.login(getDetails)
  }, [getDetails])
  return fbSignIn
}
