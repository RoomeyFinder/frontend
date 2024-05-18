export type SignupValue = {
  isSignupDone: boolean
  loading: boolean
  formErrors: { [x: string]: string }
  totalStages: {
    currentStage: number
    navigateToStage: (stage: number) => void
    goToNextStage: () => void
    goToPrevStage: () => void
    progressInPercentage: number
  }
  handleSubmitButtonClick: () => void
  profileInitials: {
    name: string
    formData: { [x: string]: string | number | boolean }
    validate: (formData: { [x: string]: string | boolean }) => {
      hasError: boolean
      errors: { [x: string]: string }
    }
  }
  contactDetails: {
    name: string
    formData: { [x: string]: string }
    validate: (formData: { [x: string]: string }) => {
      hasError: boolean
      errors: { [x: string]: string }
    }
  }
  emailVerificationDetails: {
    name: string
    formData: { [x: string]: string }
    validate: (formData: { [x: string]: string }) => {
      hasError: boolean
      errors: { [x: string]: string }
    }
  }
  handleFormDataChange: (
    stageName: string,
    name: string,
    value: string | number | boolean
  ) => void
  resendVerificationEmail: () => void
}
