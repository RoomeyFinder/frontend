

export type SignupValue = {
  loading: boolean
  formErrors: string[]
  profileAndContactFlow: {
    currentStage: number
    goToNextStage: () => void
    goToPrevStage: () => void
    progressInPercentage: number
  }
  emailVerificationAndAddressFlow: {
    currentStage: number
    goToNextStage: () => void
    goToPrevStage: () => void
    progressInPercentage: number
  }
  totalStages: {
    currentStage: number
    goToNextStage: () => void
    goToPrevStage: () => void
    progressInPercentage: number
  }
  handleSubmitButtonClick: () => void
  profileInitials: { name: string, formData: { [x: string]: string | number | boolean }, validate: (formData: { [x: string]: string | boolean }) => (boolean | string[])[]}
  contactDetails: { name: string, formData: { [x: string]: string }, validate: (formData: { [x: string]: string }) => (boolean | string[])[] }
  emailVerificationDetails: { name: string, formData: { [x: string]: string }, validate: (formData: { [x: string]: string }) => (boolean | string[])[] }
  locationDetails: { name: string, formData: { [x: string]: string }, validate: (formData: { [x: string]: string }) => (boolean | string[])[] }
  handleFormDataChange: (stageName: string, name: string, value: string | number | boolean) => void
  resendVerificationEmail: () => void
}