import { Flex, Text } from "@chakra-ui/react"
import Image from "next/image"
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
        width={35.8}
        height={30}
        objectFit="contain"
        style={{ width: "3.58rem", height: "auto" }}
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
