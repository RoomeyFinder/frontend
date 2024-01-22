"use client"
import AuthFormLayout from "../_components/Auth/AuthFormLayout"
import Stage from "./Stage"
import ProfileInitialsForm from "./_ProfileInitials/_FormSection"
import { FormEvent, useContext } from "react"
import SignupProvider, { SignupContext } from "./_Context"
import ContactForm from "./_Contact/_FormSection"
import EmailVerficationForm from "./_EmailVerification/_FormSection"
import AddressForm from "./_Address/_FormSection"
import SignupProgress from "./_SharedComponents/_SignupProgress"
import { Box } from "@chakra-ui/react"

export default function Signup() {
  return (
    <SignupProvider>
      <SignupConsumer />
    </SignupProvider>
  )
}

function SignupConsumer(){
  const {
    profileAndContactFlow,
    emailVerificationAndAddressFlow,
    totalStages,
    handleSubmitButtonClick,
    profileInitials,
    contactDetails,
    locationDetails,
    handleFormDataChange
  } = useContext(SignupContext)

  return (
    <Box py={{ base: "5rem", md: "" }}>
      <AuthFormLayout 
        handleSubmit={handleSubmitButtonClick} 
        heading="Create Account" mode="signup" 
        submitButtonVariant={emailVerificationAndAddressFlow.currentStage === 2 ? "brand" : "brand-secondary"}
        submitButtonText={totalStages.currentStage === 2 && emailVerificationAndAddressFlow.currentStage === 2 ? "Complete" : "Next"}>
        <Box as="form" onSubmit={(e: FormEvent) => {e.preventDefault()}}>
          <SignupProgress progressOnePercentage={profileAndContactFlow.progressInPercentage} progressTwoPercentage={emailVerificationAndAddressFlow.progressInPercentage} />
          <Stage currentStage={totalStages.currentStage} stage={1}>
            <Stage currentStage={profileAndContactFlow.currentStage} stage={1}><ProfileInitialsForm handleChange={handleFormDataChange} formData={profileInitials.formData} sectionName={profileInitials.name} /></Stage>
            <Stage currentStage={profileAndContactFlow.currentStage} stage={2}><ContactForm handleChange={handleFormDataChange} formData={contactDetails.formData} sectionName={contactDetails.name} /></Stage>
          </Stage>
          <Stage currentStage={totalStages.currentStage} stage={2}>
            <Stage currentStage={emailVerificationAndAddressFlow.currentStage} stage={1}><EmailVerficationForm /></Stage>
            <Stage currentStage={emailVerificationAndAddressFlow.currentStage} stage={2}><AddressForm handleChange={handleFormDataChange} formData={locationDetails.formData} sectionName={locationDetails.name} /></Stage>
          </Stage>
        </Box>
      </AuthFormLayout>
    </Box>
  )
}
