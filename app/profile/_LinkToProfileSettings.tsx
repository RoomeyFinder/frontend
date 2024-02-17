import { VStack, Heading, Link, Text } from "@chakra-ui/react"
import UserIcon from "../_assets/SVG/UserIcon"

export default function ProfileSettingsButton() {
  return (
    <VStack spacing="3rem" alignItems="flex-start">
      <Heading variant="md">
        Settings
      </Heading>
      <VStack
        spacing="3rem"
        p="3rem"
        alignItems="flex-start"
        as={Link}
        href="/profile/account"
        w="90dvw"
        maxW="36rem"
        ml="0"
        boxShadow="0px 2px 8px 0px rgba(0, 0, 0, 0.25)"
        rounded="1.2rem"
        _hover={{ textDecoration: "none", boxShadow: "0px 2px 8px 0px rgba(0, 0, 0, 0.35)" }}
      >
        <UserIcon />
        <VStack spacing="1rem" alignItems="flex-start">
          <Heading as="h5" fontSize="2rem" lineHeight="normal">
            Password & account
          </Heading>
          <Text as="span" fontSize="1.6rem" fontWeight="400" color="gray.main" lineHeight="150%">
            Update your password and secure your account
          </Text>
        </VStack>
      </VStack>
    </VStack>
  )
}
