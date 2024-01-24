import { ReadonlyURLSearchParams } from "next/navigation"


export type SignupValue = {
  loading: boolean
  formErrors: string[]
  isVerificationStage: boolean
  query: ReadonlyURLSearchParams | null
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
    profileInitials: { name: string, formData: { [x: string]: string | number | boolean } }
contactDetails: { name: string, formData: { [x: string]: string } }
emailVerificationDetails: { name: string, formData: { [x: string]: string } }
locationDetails: { name: string, formData: { [x: string]: string } }
handleFormDataChange: (stageName: string, name: string, value: string | number | boolean) => void
  resendVerificationEmail: () => void
}