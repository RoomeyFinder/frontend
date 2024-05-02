

"use client"
import { TokenResponse, useGoogleLogin } from "@react-oauth/google"
import { FunctionComponent } from "react"

export default function GoogleAuthButton({
  childComponent = () => <></>,
  onSuccess = () => {},
}: {
  childComponent: FunctionComponent<{[x:string]: any} & { onClick: () => void }>
  onSuccess: (accessToken: TokenResponse) => void
}) {
  const login = useGoogleLogin({
    onSuccess: async (accessToken) => {
      if (typeof onSuccess === "function") onSuccess(accessToken)
    },
  })
  return <>{childComponent({ onClick: login })}</>
}