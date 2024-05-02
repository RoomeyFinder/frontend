import GoogleIcon from "@/app/_assets/SVG/GoogleIcon"
import { Button, ButtonProps, Flex } from "@chakra-ui/react"
import { ReactNode } from "react"
import useHandleThirdPartyAuths from "@/app/_hooks/useHandleThirdPartyAuths"
import GoogleAuthButton from "./GoogleAuthButton"

export default function AuthProviderMethods() {
  const { handleGoogleAuthSuccess } = useHandleThirdPartyAuths()
  return (
    <>
      <Flex alignItems="center" gap="1.3rem">
        <GoogleAuthButton
          onSuccess={handleGoogleAuthSuccess}
          childComponent={({ onClick }) => (
            <AuthProviderButton
              onClick={onClick}
              display="flex"
              alignItems="center"
              gap=".8rem"
              as="span"
              color="#4285F4"
              _focus={{ boxShadow: "none" }}
              rounded=".4rem"
            >
              <GoogleIcon /> Google
            </AuthProviderButton>
          )}
        />
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
      <>{children}</>
    </Button>
  )
}
