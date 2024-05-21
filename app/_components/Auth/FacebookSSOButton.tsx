import FacebookIcon from "@/app/_assets/SVG/Facebook"
import useHandleFacebookLogin from "@/app/_hooks/useHandleFacebookSignin"
import { useSigninWithFacebook } from "@/app/_providers/FacebookProvider"
import SSOButton from "./SSOButton"



export default function FacebookSSOButton() {
  const handleFacebookUserData = useHandleFacebookLogin()
  const fbSignIn = useSigninWithFacebook(handleFacebookUserData)
  return (
    <SSOButton
      icon={<FacebookIcon />}
      text="Continue with Facebook"
      onClick={fbSignIn}
    />
  )
}