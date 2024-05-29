import {
  Flex,
} from "@chakra-ui/react"
import PageHeading from "./_PageHeading"
import PasswordChangeForm from "./_PasswordChangeForm"
import SocialAccountsSection from "./_SocialAccountsSection"
import DeactivateAccountSection from "./_DeactivateAccountSection"
import EmailChangeForm from "./EmailChangeForm"

export default function ProfileSettings() {
  return (
    <Flex
      flexDir="column"
      gap={{ base: "3.8rem", lg: "5rem" }}
      as="main"
      w={{ base: "95dvw",md: "79.2%"}}
      mx="auto"
      my="5rem"
    >
      <PageHeading />
      <EmailChangeForm />
      <PasswordChangeForm />
      <SocialAccountsSection />
      <DeactivateAccountSection />
    </Flex>
  )
}
