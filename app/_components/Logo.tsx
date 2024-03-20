import { Flex, Image, Show, Text } from "@chakra-ui/react"
import LogoText from "../_assets/SVG/LogoText"

export default function AppLogo({
  showTextLogoAlways,
}: {
  showTextLogoAlways?: boolean
}) {
  return (
    <Flex gap="1rem" alignItems="center">
      <Image
        src="/images/logo.png"
        width="3.588rem"
        height="3rem"
        alt="RoomeyFinder Logo - Two magnifying glasses upside down connected by their handles forming an acute angle"
      />
      <Text
        display={showTextLogoAlways ? "inline" : { base: "none", md: "block" }}
      >
        <LogoText />
      </Text>
    </Flex>
  )
}
