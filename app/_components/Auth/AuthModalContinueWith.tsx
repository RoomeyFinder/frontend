import SmallEmailIcon from "@/app/_assets/SVG/SmallEmailIcon"
import { obfuscateEmail } from "@/app/_utils"
import { VStack, Avatar, Text } from "@chakra-ui/react"
import FacebookSSOButton from "./FacebookSSOButton"
import GoogleSSOButton from "./GoogleSSOButton"

export default function ContinueWithProvider({
  email,
  ssoProvider,
  handleSuccess,
}: {
  email: string
  ssoProvider?: "google" | "facebook"
  handleSuccess: () => void
}) {
  return (
    <>
      <VStack alignItems="center" gap="1.8rem">
        <Avatar
          w="10rem"
          h="10rem"
          size="2xl"
          name={email}
          background="brand.main"
          color="white"
        />
        <Text fontSize="1.4rem" display="flex" alignItems="center" gap=".8rem">
          <SmallEmailIcon />
          {obfuscateEmail(email)}
        </Text>
        {ssoProvider === "google" ? <GoogleSSOButton /> : <FacebookSSOButton onSuccess={handleSuccess} />}
      </VStack>
    </>
  )
}
