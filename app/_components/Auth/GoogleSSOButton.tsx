import GoogleIcon from "@/app/_assets/SVG/Google"
import useHandleGoogleToken from "@/app/_hooks/useHandleGoogleToken"
import { useGoogleLogin } from "@react-oauth/google"
import SSOButton from "./SSOButton"

export default function GoogleSSOButton({
  onSuccess,
}: {
  onSuccess?: () => void
}) {
  const handleGoogleToken = useHandleGoogleToken(onSuccess)
  const googleSignIn = useGoogleLogin({
    onSuccess: (tokenRes) => {
      handleGoogleToken(tokenRes)
    },
  })
  return (
    <SSOButton
      icon={<GoogleIcon />}
      text="Continue with Google"
      onClick={googleSignIn}
    />
  )
}
