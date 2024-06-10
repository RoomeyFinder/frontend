import { createContext } from "react"
import { SignupValue } from "./_types"

const SignupContext = createContext<SignupValue>({
  loading: false,
  totalStages: {
    currentStage: 1,
    navigateToStage: (stage: number) => {
      console.log(stage)
    },
    goToNextStage: () => {},
    goToPrevStage: () => {},
    progressInPercentage: 0,
  },
  handleSubmitButtonClick: () => {},
  profileInitials: {
    name: "PROFILE-INITIALS",
    formData: {},
    validate: () => ({ hasError: false, errors: {} }),
  },
  contactDetails: {
    name: "CONTACT",
    formData: {},
    validate: () => ({ hasError: false, errors: {} }),
  },
  emailVerificationDetails: {
    name: "EMAIL-VERIFICATION",
    formData: {},
    validate: () => ({ hasError: false, errors: {} }),
  },
  handleFormDataChange: () => {},
  formErrors: {},
  resendVerificationEmail: () => {},
  isSignupDone: false,
})

export default SignupContext
