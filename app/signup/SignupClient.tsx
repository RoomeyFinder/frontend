"use client"
import AuthFormLayout from "../_components/Auth/AuthFormLayout"
import Stage from "./Stage"
import ProfileInitialsForm from "./_ProfileInitials"
import { useContext, useEffect } from "react"
import SignupProvider from "./_ContextProvider"
import ContactForm from "./_Contact"
import EmailVerficationForm from "./_EmailVerification"
import SignupProgress from "./_SignupProgress"
import {
  Box,
  Collapse,
  GridItem,
  HStack,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react"
import SignupContext from "./_Context"
import Welcome from "./_Welcome"
import { DividerWithCenteredText } from "../_components/PremiumModal"
import GoogleSSOButton from "../_components/Auth/GoogleSSOButton"
import FacebookSSOButton from "../_components/Auth/FacebookSSOButton"

export default function SignupClient() {
  return (
    <SignupProvider>
      <SignupConsumer />
    </SignupProvider>
  )
}

function SignupConsumer() {
  const {
    totalStages,
    handleSubmitButtonClick,
    profileInitials,
    contactDetails,
    emailVerificationDetails,
    handleFormDataChange,
    formErrors,
    resendVerificationEmail,
    loading,
    isSignupDone,
  } = useContext(SignupContext)

  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      sessionStorage.removeItem("unverifiedEmail")
    })
    return () => {
      window.removeEventListener("beforeunload", () => {})
    }
  }, [])

  if (isSignupDone)
    return (
      <Collapse in={isSignupDone}>
        <Welcome />
      </Collapse>
    )
  return (
    <>
      <Collapse in={isSignupDone === false} unmountOnExit>
        <Box py={{ base: "5rem", md: "" }}>
          <AuthFormLayout
            handleSubmit={handleSubmitButtonClick}
            heading="Create Account"
            mode="signup"
            submitButtonVariant={
              totalStages.currentStage === 2 ? "brand" : "brand-secondary"
            }
            submitButtonText={"Next"}
            loading={loading}
            showBackButton={totalStages.currentStage === 1}
            handleBackButtonClick={() => totalStages.goToPrevStage()}
          >
            <>
              <Box display="flex" flexDir="column" gap="3rem">
                <SignupProgress
                  progressOnePercentage={totalStages.currentStage > 0 ? 100 : 0}
                  progressTwoPercentage={totalStages.currentStage > 1 ? 100 : 0}
                  currentStage={totalStages.currentStage}
                />
                <Stage currentStage={totalStages.currentStage} stage={0}>
                  <ProfileInitialsForm
                    error={formErrors}
                    handleChange={handleFormDataChange}
                    formData={profileInitials.formData}
                    sectionName={profileInitials.name}
                  />
                </Stage>
                <Stage
                  currentStage={totalStages.currentStage}
                  stage={1}
                  unmountOnExit
                >
                  <ContactForm
                    error={formErrors}
                    handleChange={handleFormDataChange}
                    formData={contactDetails.formData}
                    sectionName={contactDetails.name}
                  />
                </Stage>
                <Stage currentStage={totalStages.currentStage} stage={2}>
                  <EmailVerficationForm
                    error={formErrors}
                    resendVerificationEmail={resendVerificationEmail}
                    handleChange={handleFormDataChange}
                    formData={emailVerificationDetails.formData}
                    sectionName={emailVerificationDetails.name}
                  />
                  <GridItem colSpan={{ base: 1, sm: 2 }} mb="1.6rem">
                    <Text textAlign="right" lineHeight="normal">
                      By clicking complete, I agree to Roomeyfinder&apos;s
                      <Link
                        fontWeight="600"
                        color="brand.main"
                        href="/terms-of-service"
                      >
                        {" "}
                        Terms of Service
                      </Link>{" "}
                      and
                      <Link
                        fontWeight="600"
                        color="brand.main"
                        href="/privacy-policy"
                      >
                        {" "}
                        Privacy Policy
                      </Link>
                    </Text>
                  </GridItem>
                </Stage>
              </Box>
            </>
          </AuthFormLayout>
        </Box>
        <VStack maxW="90rem" gap="2rem" mx="auto" alignItems="start" mt="-3rem">
          <DividerWithCenteredText
            maxW="50rem"
            mx="auto"
            text="Continue with"
          />
          <HStack w="full" gap="2rem" alignItems="center">
            <GoogleSSOButton />
            <FacebookSSOButton />
          </HStack>
        </VStack>
      </Collapse>
    </>
  )
}
