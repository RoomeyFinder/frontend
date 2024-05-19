"use client"
import {
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react"
import { DividerWithCenteredText } from "../PremiumModal"
import EmailCheckForm from "./EmailCheckForm"
import GoogleIcon from "@/app/_assets/SVG/Google"
import { ReactNode } from "react"
import FacebookIcon from "@/app/_assets/SVG/Facebook"
import { useSigninWithFacebook } from "@/app/_providers/FacebookProvider"
import useHandleGoogleToken from "@/app/_hooks/useHandleGoogleToken"
import { useGoogleLogin } from "@react-oauth/google"
import useHandleFacebookLogin from "@/app/_hooks/useHandleFacebookSignin"

export default function AuthModal() {
  return (
    <>
      <Modal isOpen={true} onClose={() => {}} isCentered={false}>
        <ModalOverlay bgColor="#22222261" />
        <ModalContent
          bgColor="white"
          w="full"
          maxW="45.8rem"
          rounded="1.2rem"
          roundedBottom={{ base: "0", sm: "1.2rem" }}
          mt={{ base: "auto" }}
          mb={{ base: "0", sm: "auto" }}
        >
          <ModalHeader
            pos="relative"
            p="2.4rem"
            borderBottom="1px solid #dddddd"
          >
            <ModalCloseButton
              _focusVisible={{
                boxShadow: "none",
                border: "1px solid",
                borderColor: "brand.50",
              }}
              size="lg"
              pos="absolute"
              left="2.4rem"
              top="50%"
              transform="translateY(-50%)"
            />
            <Heading
              as="h3"
              textAlign="center"
              fontSize="1.6rem"
              fontWeight="700"
            >
              Log in or sign up
            </Heading>
          </ModalHeader>
          <ModalBody p="2.4rem" display="flex" flexDir="column" gap="2.4rem">
            <Heading as="h3" fontSize="2.2rem" fontWeight="600" my=".8rem">
              Welcome to RoomeyFinder
            </Heading>
            <AuthForms />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

function AuthForms() {
  const handleGoogleToken = useHandleGoogleToken()
  const handleFacebookUserData = useHandleFacebookLogin()
  const fbSignIn = useSigninWithFacebook(handleFacebookUserData)
  const googleSignIn = useGoogleLogin({
    onSuccess: handleGoogleToken,
  })

  return (
    <>
      <EmailCheckForm />
      <DividerWithCenteredText text="or" />
      <VStack gap="1.6rem">
        <SSOButton
          icon={<FacebookIcon />}
          text="Continue with Facebook"
          onClick={fbSignIn}
        />
        <SSOButton
          icon={<GoogleIcon />}
          text="Continue with Google"
          onClick={googleSignIn}
        />
      </VStack>
    </>
  )
}

function SSOButton({
  icon,
  text,
  onClick,
}: {
  icon: ReactNode | ReactNode[]
  text: ReactNode | ReactNode[]
  onClick: () => void
}) {
  return (
    <Flex
      as="button"
      gap="1.6rem"
      w="full"
      alignItems="center"
      fontSize="1.4rem"
      fontWeight="600"
      px="2.4rem"
      py="1.4rem"
      border="1px solid"
      rounded="1.2rem"
      _hover={{ bg: "white.100" }}
      onClick={onClick}
    >
      <Text as="span" w="2rem" h="2rem" textAlign="center">
        {icon}
      </Text>
      <Text as="span" flexGrow="1" textAlign="center">
        {text}
      </Text>
    </Flex>
  )
}
