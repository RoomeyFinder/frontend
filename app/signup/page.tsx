"use client"
import AuthFormLayout from "../_components/Auth/AuthFormLayout"
import Stage from "./Stage"
import ProfileInitialsForm from "./_ProfileInitials"
import { FormEvent, useContext } from "react"
import SignupProvider from "./_ContextProvider"
import ContactForm from "./_Contact"
import EmailVerficationForm from "./_EmailVerification"
import AddressForm from "./_Address"
import SignupProgress from "./_SignupProgress"
import { Box } from "@chakra-ui/react"
import SignupContext from "./_Context"

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
    emailVerificationDetails,
    handleFormDataChange,
    formErrors,
    resendVerificationEmail,
    loading
  } = useContext(SignupContext)

  return (
    <Box py={{ base: "5rem", md: "" }}>
      <AuthFormLayout 
        handleSubmit={handleSubmitButtonClick} 
        heading="Create Account" mode="signup" 
        submitButtonVariant={emailVerificationAndAddressFlow.currentStage === 2 ? "brand" : "brand-secondary"}
        submitButtonText={totalStages.currentStage === 2 && emailVerificationAndAddressFlow.currentStage === 2 ? "Complete" : "Next"}
        loading={loading}>
        <Box as="form" onSubmit={(e: FormEvent) => {e.preventDefault()}}>
          <SignupProgress progressOnePercentage={profileAndContactFlow.progressInPercentage} progressTwoPercentage={emailVerificationAndAddressFlow.progressInPercentage} />
          <Stage currentStage={totalStages.currentStage} stage={1}>
            <Stage currentStage={profileAndContactFlow.currentStage} stage={1}><ProfileInitialsForm error={formErrors} handleChange={handleFormDataChange} formData={profileInitials.formData} sectionName={profileInitials.name} /></Stage>
            <Stage currentStage={profileAndContactFlow.currentStage} stage={2}><ContactForm error={formErrors} handleChange={handleFormDataChange} formData={contactDetails.formData} sectionName={contactDetails.name} /></Stage>
          </Stage>
          <Stage currentStage={totalStages.currentStage} stage={2}>
            <Stage currentStage={emailVerificationAndAddressFlow.currentStage} stage={1}><EmailVerficationForm error={formErrors} resendVerificationEmail={resendVerificationEmail} handleChange={handleFormDataChange} formData={emailVerificationDetails.formData} sectionName={emailVerificationDetails.name} /></Stage>
            <Stage currentStage={emailVerificationAndAddressFlow.currentStage} stage={2}><AddressForm error={formErrors} handleChange={handleFormDataChange} formData={locationDetails.formData} sectionName={locationDetails.name} /></Stage>
          </Stage>
        </Box>
      </AuthFormLayout>
    </Box>
  )
}
