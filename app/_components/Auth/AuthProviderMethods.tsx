import FacebookIcon from "@/app/_assets/SVG/FacebookIcon"
import GoogleIcon from "@/app/_assets/SVG/GoogleIcon"
import XIcon from "@/app/_assets/SVG/XIcon"
import { Button, Flex } from "@chakra-ui/react"
import { ReactNode } from "react"
import StandAloneIcon from "../StandaloneIcon"

export default function AuthProviderMethods() {
  return (
    <>
      <Flex alignItems="center" gap="1.3rem">
        <AuthProviderButton>
          <GoogleIcon />
        </AuthProviderButton>
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
}: {
  children: ReactNode | ReactNode[]
}) {
  return (
    <Button
      h="auto"
      p="0"
      cursor="pointer"
      bg="transparent"
      border="none"
      borderRadius="0"
      _hover={{ bg: "transparent" }}
    >
      <StandAloneIcon>{children}</StandAloneIcon>
    </Button>
  )
}
