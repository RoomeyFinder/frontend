import { createContext } from "react"
import { SignupValue } from "./_types"


const SignupContext = createContext<SignupValue>({
  isVerificationStage: false,
  loading: false,
  query: null,
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
    formData: {}
  },
  contactDetails: {
    name: "CONTACT",
    formData: {}
  },
  emailVerificationDetails: {
    name: "EMAIL-VERIFICATION",
    formData: {}
  },
  locationDetails: {
    name: "LOCATION",
    formData: {}
  },
  handleFormDataChange: () => { },
  formErrors: [],
  resendVerificationEmail: () => { }
})

export default SignupContext