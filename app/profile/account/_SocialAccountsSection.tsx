import FacebookIcon from "@/app/_assets/SVG/FacebookIcon"
import InstagramIcon from "@/app/_assets/SVG/InstagramIcon"
import XIcon from "@/app/_assets/SVG/XIcon"
import { Heading, Flex, Circle, Box, Text } from "@chakra-ui/react"
import { FunctionComponent } from "react"

export default function SocialAccountsSection() {
  return null && (
    <>
      <Box w="100%">
        <Heading variant="md" as="h2" mb={{ base: "1.5rem", lg: "3rem" }}>
          Social accounts
        </Heading>
        <Flex
          justifyContent={{ base: "center", sm: "start" }}
          w="100%"
          gap="3rem"
          flexWrap="wrap"
        >
          <SocialMediaConnectCard name="Facebook" Icon={FacebookIcon} />
          <SocialMediaConnectCard name="Twitter" Icon={XIcon} />
          <SocialMediaConnectCard name="Instagram" Icon={InstagramIcon} />
        </Flex>
      </Box>
    </>
  )
}

function SocialMediaConnectCard({
  name,
  Icon,
}: {
  name: string
  Icon: FunctionComponent
}) {
  return (
    <Flex
      boxShadow="0px 1px 1px 0px rgba(0, 0, 0, 0.25)"
      border="1px solid"
      borderColor="rgba(112, 112, 112, 0.25)"
      overflow="hidden"
      alignItems="center"
      justifyContent="center"
      pt="3rem"
      rounded="1.2rem"
      flexDir="column"
      gap="2.5rem"
      bg="white.400"
      maxW="22.4rem"
      w="90dvw"
    >
      <Circle bg="gray.main" minW="5rem" minH="5rem" color="white">
        <Icon />
      </Circle>
      <Heading
        lineHeight="normal"
        fontSize="1.9rem"
        variant="600"
        textAlign="center"
      >
        {name}
      </Heading>
      <Text
        as="button"
        fontSize="1.6rem"
        fontWeight="400"
        w="full"
        bg="white"
        py="1.2rem"
        lineHeight="normal"
      >
        Connect
      </Text>
    </Flex>
  )
}
