"use client"
import {
  BoxProps,
  Button,
  ButtonProps,
  Collapse,
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
import EmailCheckForm, { AccountCheckResponse } from "./EmailCheckForm"
import { useCallback, useContext, useState } from "react"
import useManageStageFlow from "@/app/_hooks/useManageStageFlow"
import PasswordForm from "./PasswordForm"
import BackChevron from "@/app/_assets/SVG/BackChevron"
import SignupForm from "./SignupForm"
import ContinueWithProvider from "./AuthModalContinueWith"
import FacebookSSOButton from "./FacebookSSOButton"
import GoogleSSOButton from "./GoogleSSOButton"
import User from "@/app/_types/User"
import ConfirmEmailForm from "./ConfirmEmailForm"
import { obfuscateEmail } from "@/app/_utils"
import toast from "react-hot-toast"
import { AuthModalContext } from "@/app/_providers/AuthModalProvider"
import ForgotPasswordForm from "./ForgotPasswordForm"

const modalContentProps: BoxProps = {
  bgColor: "white",
  w: "full",
  maxW: "48.5rem",
  rounded: "1.2rem",
  roundedBottom: { base: "0", sm: "1.2rem" },
  mt: { base: "auto" },
  mb: { base: "0", sm: "auto" },
}

const modalHeaderProps: BoxProps = {
  pos: "relative",
  p: "2.4rem",
  borderBottom: "1px solid #dddddd",
}

export default function AuthModalContainer() {
  const { isOpen, close } = useContext(AuthModalContext)

  return isOpen ? <AuthModal isOpen={isOpen} onClose={close} /> : null
}

function AuthModal({
  isOpen,
  onClose,
}: {
  onClose: () => void
  isOpen: boolean
}) {
  const [accountIsSSOProvided, setAccountIsSSOProvided] = useState(false)
  const [usersFirstName, setUsersFirstName] = useState("")
  const [nonSSOHeading, setNonSSOHeading] = useState("Log in")
  const { currentStage, goToNextStage, navigateToStage } = useManageStageFlow({
    maxStage: 3,
    minStage: 0,
    start: 0,
  })
  const [hasAccount, setHasAccount] = useState(false)
  const [email, setEmail] = useState("")
  const [ssoProvider, setSSoProvider] = useState<
    "google" | "facebook" | undefined
  >()

  const handleEmailCheckStatus = useCallback(
    (res: AccountCheckResponse) => {
      setHasAccount(res.hasAccount)
      setSSoProvider(res.ssoProvider)
      setEmail(res.email)
      if (res.hasAccount) {
        setAccountIsSSOProvided(res.ssoProvider !== undefined)
        res.firstName && setUsersFirstName(res.firstName)
        res.ssoProvider === undefined && setNonSSOHeading("Log in")
      } else {
        res.ssoProvider === undefined && setNonSSOHeading("Finish signing up")
      }
      goToNextStage()
    },
    [goToNextStage]
  )

  const handleGoBackFromEmailCheck = useCallback(() => {
    setHasAccount(false)
    navigateToStage(0)
    setAccountIsSSOProvided(false)
    setUsersFirstName("")
  }, [navigateToStage])

  const handleBackBtnClick = useCallback(() => {
    if (currentStage === 1) {
      setAccountIsSSOProvided(false)
      setUsersFirstName("")
    }
    const stageToGoBackTo = currentStage === 3 ? 1 : currentStage - 1
    navigateToStage(stageToGoBackTo)
  }, [navigateToStage, currentStage])

  const handleForgotPasswordClick = useCallback(() => {
    setAccountIsSSOProvided(false)
    setUsersFirstName("")
    navigateToStage(3)
    console.log("djkad;jkfaa", "currentStage")
  }, [navigateToStage])

  const handleSignupResponse = useCallback(
    (res: { user?: User; statusCode: number }) => {
      if (res.statusCode === 201) {
        navigateToStage(2)
        res.user && setEmail(res.user?.email)
      }
    },
    [navigateToStage]
  )

  const handleAuthSuccess = useCallback(() => {
    toast.success(
      usersFirstName
        ? `Welcome back, ${usersFirstName}!`
        : "You are signed in!",
      {
        style: {
          textTransform: "capitalize",
        },
        duration: 5000,
      }
    )
    //push to /dashboard
    onClose()
  }, [usersFirstName, onClose])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={false}>
        <ModalOverlay bgColor="#22222261" />
        <ModalContent
          {...modalContentProps}
          maxW={currentStage > 1 ? "59rem" : "48.5rem"}
        >
          <ModalHeader {...modalHeaderProps}>
            {!accountIsSSOProvided && currentStage > 0 && currentStage !== 2 ? (
              <AuthModalBackButton onClick={handleBackBtnClick} />
            ) : (
              <AuthModalCloseButton onClick={onClose} />
            )}
            {
              <ModalHeading
                usersFirstName={usersFirstName}
                accountIsSSOProvided={accountIsSSOProvided}
                currentStage={currentStage}
                nonSSOHeading={nonSSOHeading}
              />
            }
          </ModalHeader>
          <ModalBody p="2.4rem" display="flex" flexDir="column" gap="2.4rem">
            {!accountIsSSOProvided && currentStage === 0 && (
              <Heading as="h3" fontSize="2.2rem" fontWeight="600" my=".8rem">
                Welcome to RoomeyFinder
              </Heading>
            )}
            <VStack gap="2.4rem" alignItems="stretch" w="100%">
              <Collapse in={currentStage === 0}>
                <EmailCheckForm handleStatus={handleEmailCheckStatus} />
              </Collapse>
              <Collapse in={currentStage === 1} unmountOnExit>
                <Collapse in={hasAccount === true && !ssoProvider}>
                  <PasswordForm
                    email={email}
                    handleSuccess={handleAuthSuccess}
                    handleForgotPasswordClick={handleForgotPasswordClick}
                    handleUnverifiedEmail={() => {
                      toast(
                        `A verification code has been sent to ${obfuscateEmail(email)}`
                      )
                      navigateToStage(2)
                    }}
                  />
                </Collapse>
                <Collapse in={hasAccount === true && ssoProvider !== undefined}>
                  <ContinueWithProvider
                    ssoProvider={ssoProvider}
                    email={email}
                    handleSuccess={handleAuthSuccess}
                  />
                  <UseAnotherAccountText
                    handleClick={handleGoBackFromEmailCheck}
                  />
                </Collapse>
                <Collapse
                  in={hasAccount === false && ssoProvider === undefined}
                >
                  <SignupForm
                    email={email}
                    handleSubmission={handleSignupResponse}
                  />
                </Collapse>
              </Collapse>
              <Collapse in={currentStage === 2}>
                <ConfirmEmailForm
                  handleSuccess={handleAuthSuccess}
                  handleSubmission={() => {}}
                  email={email}
                />
              </Collapse>
              <Collapse in={currentStage === 3}>
                <ForgotPasswordForm handleSuccess={onClose} email={email} />
              </Collapse>
              <Collapse in={currentStage === 0}>
                <VStack alignItems="start" gap="1.6rem" w="100%">
                  <DividerWithCenteredText text="or" />
                  <VStack gap="1.6rem" w="full">
                    <FacebookSSOButton onSuccess={handleAuthSuccess} />
                    <GoogleSSOButton onSuccess={handleAuthSuccess} />
                  </VStack>
                </VStack>
              </Collapse>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

function ModalHeading({
  usersFirstName,
  accountIsSSOProvided,
  currentStage,
  nonSSOHeading,
}: {
  usersFirstName: string
  accountIsSSOProvided: boolean
  currentStage: number
  nonSSOHeading: string
}) {
  return (
    <Heading as="h3" textAlign="center" fontSize="1.6rem" fontWeight="700">
      {accountIsSSOProvided && currentStage > 0 && (
        <>
          Welcome back,{" "}
          <Text as="span" fontSize="inherit" textTransform="capitalize">
            {usersFirstName}
          </Text>
        </>
      )}
      {!accountIsSSOProvided && currentStage === 0 && <>Log in or sign up</>}
      {!accountIsSSOProvided && currentStage > 0 && currentStage < 2 && (
        <>{nonSSOHeading}</>
      )}
      {currentStage === 2 && <>Verify Email</>}
      {currentStage === 3 && <>Forgot password?</>}
    </Heading>
  )
}

function UseAnotherAccountText({ handleClick }: { handleClick: () => void }) {
  return (
    <Text
      display="flex"
      gap=".8rem"
      alignItems="center"
      fontSize="1.4rem"
      alignSelf="start"
      mt="1.8rem"
      mb=".1rem"
    >
      Not you?
      <Text
        onClick={handleClick}
        as="button"
        textDecor="underline"
        fontWeight="600"
      >
        Use another account
      </Text>
    </Text>
  )
}

function AuthModalCloseButton({ onClick }: ButtonProps) {
  return (
    <ModalCloseButton
      _focusVisible={{
        boxShadow: "none",
        border: "1px solid",
        borderColor: "brand.50",
      }}
      size="lg"
      pos="absolute"
      left={{ base: "1.4rem", sm: "2.4rem" }}
      top="50%"
      transform="translateY(-50%)"
      onClick={onClick}
    />
  )
}

function AuthModalBackButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      onClick={onClick}
      _focusVisible={{
        boxShadow: "none",
        border: "1px solid",
        borderColor: "brand.50",
      }}
      _hover={{
        bg: "white.100",
      }}
      _active={{
        bg: "white.100",
      }}
      size="lg"
      pos="absolute"
      left={{ base: "1.4rem", sm: "2.4rem" }}
      top="50%"
      transform="translateY(-50%)"
      bg="transparent"
      rounded="full"
      height="3.2rem"
      width="3.2rem"
    >
      <BackChevron />
    </Button>
  )
}
