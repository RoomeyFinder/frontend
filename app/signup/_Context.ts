import { createContext } from "react"
import { SignupValue } from "./_types"


const SignupContext = createContext<SignupValue>({
  loading: false,
  profileAndContactFlow: {
    currentStage: 1,
    goToNextStage: () => { },
    goToPrevStage: () => { },
    progressInPercentage: 50
  },
  emailVerificationAndAddressFlow: {
    currentStage: 0,
    goToNextStage: () => { },
    goToPrevStage: () => { },
    progressInPercentage: 0
  },
  totalStages: {
    currentStage: 1,
    goToNextStage: () => { },
    goToPrevStage: () => { },
    progressInPercentage: 0
  },
  handleSubmitButtonClick: () => { },
  profileInitials: {
    name: "PROFILE-INITIALS",
    formData: {},
    validate: () => [false, []]
  },
  contactDetails: {
    name: "CONTACT",
    formData: {},
    validate: () => [false, []]
  },
  emailVerificationDetails: {
    name: "EMAIL-VERIFICATION",
    formData: {},
    validate: () => [false, []]
  },
  handleFormDataChange: () => { },
  formErrors: [],
  resendVerificationEmail: () => { },
  isSignupDone: false
})

export default SignupContext