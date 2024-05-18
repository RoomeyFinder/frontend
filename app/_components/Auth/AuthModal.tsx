"use client"
import {
  Button,
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

export default function AuthModal() {
  return (
    <>
      <Modal isOpen={true} onClose={() => {}} isCentered={false}>
        <ModalOverlay bgColor="#22222261" />
        <ModalContent
          bgColor="white"
          w="full"
          maxW="56.8rem"
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
  return (
    <>
      <EmailCheckForm />
      <DividerWithCenteredText text="or" />
      <VStack gap="1.6rem">
        <SSOGoogleButton />
        <SSOGoogleButton />
      </VStack>
    </>
  )
}

function SSOGoogleButton() {
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
    >
      <GoogleIcon />{" "}
      <Text as="span" flexGrow="1" textAlign="center">
        Continue with Google
      </Text>
    </Flex>
  )
}
