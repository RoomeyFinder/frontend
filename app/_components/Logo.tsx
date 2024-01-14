import { Flex, Hide, Image, Show } from "@chakra-ui/react";
import LogoText from "../_assets/LogoText";


export default function AppLogo({ showTextLogo }: {
  showTextLogo?: string
}){
  return (
    <Flex gap="1rem" alignItems="center">
      <Image src="/images/logo.png" width="3.588rem" height="3rem"/>
      <Show above={showTextLogo || "md"}>
        <LogoText />
      </Show>
    </Flex>
  )
}