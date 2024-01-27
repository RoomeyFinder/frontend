import {
  Flex,
} from "@chakra-ui/react"
import PageHeading from "./_PageHeading"
import PasswordChangeForm from "./_PasswordChangeForm"
import SocialAccountsSection from "./_SocialAccountsSection"
import DeactivateAccountSection from "./_DeactivateAccountSection"

export default function ProfileSettings() {
  return (
    <Flex
      flexDir="column"
      gap={{ base: "3.8rem", lg: "5rem" }}
      as="main"
      w="90dvw"
      maxW="79.2%"
      mx="auto"
      my="5rem"
    >
      <PageHeading />
      <PasswordChangeForm />
      <SocialAccountsSection />
      <DeactivateAccountSection />
    </Flex>
  )
}
