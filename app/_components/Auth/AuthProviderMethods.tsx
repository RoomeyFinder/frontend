import FacebookIcon from "@/app/_assets/SVG/FacebookIcon"
import GoogleIcon from "@/app/_assets/SVG/GoogleIcon"
import XIcon from "@/app/_assets/SVG/XIcon"
import { Button, ButtonProps, Flex } from "@chakra-ui/react"
import { ReactNode } from "react"
import StandAloneIcon from "../StandaloneIcon"
import GoogleAuthButton from "./GoogleAuthButton"
import useHandleThirdPartyAuths from "@/app/_hooks/useHandleThirdPartyAuths"


/*{
  "access_token": "ya29.a0Ad52N3_FIjDWjy9zazm4ytPPK7gfRye99RRW56Hto9a7Zo9oiJ5blDpH1xvmHEh037MZxCeNN5EMY77pjEB4-tSRRWD_PdH9KlwTCjWDUF5nkSjVDInAGrl5cP4bi55a-mjCYxvl2O05Hq1mXKRCfutK5efE-VDcRwaCgYKAe8SARASFQHGX2Mig6zVtv74QywglzDhqKqCyw0169",
  "token_type": "Bearer",
  "expires_in": 3599,
  "scope": "email profile https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/userinfo.email",
  "authuser": "0",
  "prompt": "consent"
} */
export default function AuthProviderMethods() {

  const { handleGoogleAuthSuccess } = useHandleThirdPartyAuths()
  return (
    <>
      <Flex alignItems="center" gap="1.3rem">
        <GoogleAuthButton
          childComponent={({ onClick }) => (
            <AuthProviderButton onClick={() => {
              onClick()
              console.log(onClick)
            }}>
              <GoogleIcon />
            </AuthProviderButton>
          )}
          onSuccess={handleGoogleAuthSuccess}
        />
        <AuthProviderButton>
          <FacebookIcon />
        </AuthProviderButton>
        <AuthProviderButton>
          <XIcon />
        </AuthProviderButton>
      </Flex>
    </>
  )
}

function AuthProviderButton({
  children,
  ...rest
}: {
  children: ReactNode | ReactNode[]
} & ButtonProps) {
  return (
    <Button
      h="auto"
      p="0"
      cursor="pointer"
      bg="transparent"
      border="none"
      borderRadius="0"
      _hover={{ bg: "transparent" }}
      {...rest}
    >
      <StandAloneIcon>{children}</StandAloneIcon>
    </Button>
  )
}
