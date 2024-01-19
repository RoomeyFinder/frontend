"use client"
import AuthFormLayout from "../_components/Auth/AuthFormLayout"
import Stage from "./Stage"
import ProfileInitialsForm from "./_ProfileInitialsForm"
import { useContext } from "react"
import SignupProvider, { SignupContext } from "./_SignupContext"
import ContactForm from "./_ContactForm"
import EmailVerficationForm from "./_EmailVerificationForm"
import AddressForm from "./_AddressForm"
import SignupProgress from "./_SignupProgress"

export default function Signup() {
  return (
    <SignupProvider>
      <SignupConsumer/>
    </SignupProvider>
  )
}

function SignupConsumer(){
  const { profileAndContactFlow, emailVerificationAndAddressFlow, totalStages, handleSubmitButtonClick } = useContext(SignupContext)

  return (
    <>
      <AuthFormLayout handleSubmit={handleSubmitButtonClick} heading="Create Account" mode="signup" submitButtonText={totalStages.currentStage === 2 && emailVerificationAndAddressFlow.currentStage === 2 ? "Complete" : "Next"}>
        <SignupProgress progressOnePercentage={profileAndContactFlow.progressInPercentage} progressTwoPercentage={emailVerificationAndAddressFlow.progressInPercentage} />
        <Stage currentStage={totalStages.currentStage} stage={1}>
          <Stage currentStage={profileAndContactFlow.currentStage} stage={1}><ProfileInitialsForm /></Stage>
          <Stage currentStage={profileAndContactFlow.currentStage} stage={2}><ContactForm /></Stage>
        </Stage>
        <Stage currentStage={totalStages.currentStage} stage={2}>
          <Stage currentStage={emailVerificationAndAddressFlow.currentStage} stage={1}><EmailVerficationForm /></Stage>
          <Stage currentStage={emailVerificationAndAddressFlow.currentStage} stage={2}><AddressForm /></Stage>
        </Stage>
      </AuthFormLayout>
    </>
  )
}
