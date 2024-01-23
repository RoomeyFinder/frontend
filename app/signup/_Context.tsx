
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation"
import { ReactNode, createContext, useCallback, useMemo, useState } from "react"
import useManageStageFlow from "../_hooks/useManageStageFlow"

export const FOURTEEN_YEARS_IN_MILLISECONDS = 4.418e+11

type SignupValue = {
  error: string[]
  isVerificationStage: boolean;
  query: ReadonlyURLSearchParams | null;
  profileAndContactFlow: {
    currentStage: number;
    goToNextStage: () => void;
    goToPrevStage: () => void;
    progressInPercentage: number;
  };
  emailVerificationAndAddressFlow: {
    currentStage: number;
    goToNextStage: () => void;
    goToPrevStage: () => void;
    progressInPercentage: number;
  };
  totalStages: {
    currentStage: number;
    goToNextStage: () => void;
    goToPrevStage: () => void;
    progressInPercentage: number;
  };
  handleSubmitButtonClick: () => void
  profileInitials: { name: string, formData: { [x: string]: string | number | boolean } }
  contactDetails: { name: string, formData: { [x: string]: string  } }
  emailVerificationDetails: { name: string, formData: { [x: string]: string  } }
  locationDetails: { name: string, formData: { [x: string]: string  } }
  handleFormDataChange: (stageName: string, name: string, value: string | number | boolean) => void
}
export const SignupContext = createContext<SignupValue>({
  isVerificationStage: false,
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
  handleFormDataChange: () => {},
  error: []
})

export default function SignupProvider({ children }: {
  children: ReactNode | ReactNode[]
}) {
  const query = useSearchParams()
  const isVerificationStage = useMemo(() => query.get("verifyEmail") === "true", [query])
  const totalStages = useManageStageFlow({ maxStage: 2, minStage: 1, start: 1 })
  const profileAndContactFlow = useManageStageFlow({ maxStage: 2, minStage: 1, start: 1 })
  const emailVerificationAndAddressFlow = useManageStageFlow({ maxStage: 2, minStage: 1, start: 0 })
  const [error, setError] = useState<string[]>([])
  const [profileInitials, setProfileInitials] = useState({
    name: "PROFILE-INITIALS",
    formData: {
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      isStudent: false,
      occupation: "",
      university: ""
    },
    validate: (formData: {[x:string]: string | boolean}) => {
      type formDataKey = keyof typeof formData
      const mainRequiredFields = ["firstName", "lastName", "dob", "gender"]
      const firstCheck = mainRequiredFields.every(field => formData[field as formDataKey])
      const passedIsNotAStudentCheck = formData["isStudent" as formDataKey] === false && (formData["occupation" as formDataKey] as string).length > 0
      const passedIsStudentCheck = formData["isStudent" as formDataKey] === true && (formData["university" as formDataKey] as string).length > 0
      //school ! university
      const errorFields = mainRequiredFields.filter(it => Boolean(formData[it as formDataKey]) !== true)
      if(formData.isStudent === true) return [passedIsStudentCheck && firstCheck, errorFields.concat( !passedIsStudentCheck ? "university" : [])]
      return [passedIsNotAStudentCheck && firstCheck, errorFields.concat(!passedIsNotAStudentCheck ? "occupation" : [])]
    }
  })
  const [contactDetails, setContactDetails] = useState({
    name: "CONTACT",
    formData: {
      email: "",
      phone: "",
      countryCode: "234",
      password: "",
      confirmPassword: ""
    },
    validate: (formData: { [x: string]: string }) => {
      type formDataKey = keyof typeof formData
      const mainRequiredFields = ["email", "phone", "countryCode"]
      const firstCheck = mainRequiredFields.every(field => formData[field as formDataKey].length > 0)
      const passedPasswordCheck = (formData.password === formData.confirmPassword) && formData.password.length > 8
      const errorFields = mainRequiredFields.filter(it => Boolean(formData[it as formDataKey]) !== true)
      return [firstCheck && passedPasswordCheck, errorFields.concat(!passedPasswordCheck ? ["password", "confirmPassword"] : [])]
    }
  })
  const [emailVerificationDetails, setEmailVerificationDetails] = useState({
    name: "EMAIL-VERIFICATION",
    formData: {
      verificationToken: ""
    },
    validate: (formData: { [x: string]: string }) => {
      return [formData.verificationToken.length === 6, ["verificationToken"]]
    }
  })
  const [locationDetails, setLocationDetails] = useState({
    name: "LOCATION",
    formData: {
      longitude: "",
      latitude: "",
      address: "",
      city: "",
      state: "",
      country: "",
      placeId: "",
      zipCode: "",
    },
    validate: (formData: { [x: string]: string }) => {
      type formDataKey = keyof typeof formData
      const mainRequiredFields = ["address", "city", "state", "country", "placeId",]
      const firstCheck = mainRequiredFields.every(field => formData[field as formDataKey])
      const errorFields = mainRequiredFields.filter(it => formData[it as formDataKey].length === 0)
      return [firstCheck, errorFields]
    }
  })

  const onChangeHandlers = useMemo(() => ({
    "PROFILE-INITIALS": (name: string, value: string | number | boolean) => setProfileInitials(prev => ({ ...prev, formData: { ...prev.formData, [name]: value } })),
    "CONTACT": (name: string, value: string | number | boolean) => setContactDetails(prev => ({ ...prev, formData: { ...prev.formData, [name]: value } })),
    "EMAIL-VERIFICATION": (name: string, value: string | number | boolean) => setEmailVerificationDetails(prev => ({ ...prev, formData: { ...prev.formData, [name]: value } })),
    "LOCATION": (name: string, value: string | number | boolean) => setLocationDetails(prev => ({ ...prev, formData: { ...prev.formData, [name]: value } })),
  }), [])

  const handleFormDataChange = useCallback((stageName: string, name: string, value: string | number | boolean) => {
    setError(prev => prev.filter(it => it !== name))
    onChangeHandlers[stageName as keyof typeof onChangeHandlers](name, value)
  }, [onChangeHandlers])

  const submitSignup = useCallback(() => {
    console.log("heererje")
  }, [])

  const handleSubmitButtonClick = useCallback(() => {
    if (totalStages.currentStage === 1) {
      const currentStage = profileAndContactFlow.currentStage
      let isValidated
      if(currentStage === 1) isValidated = profileInitials.validate(profileInitials.formData)
      else isValidated = contactDetails.validate(contactDetails.formData)
      if(isValidated[0] === false) return setError(isValidated[1] as string[])
      if (profileAndContactFlow.currentStage >= 2) {
        totalStages.goToNextStage()
        emailVerificationAndAddressFlow.goToNextStage()
      } else profileAndContactFlow.goToNextStage()
    } else {
      const currentStage = emailVerificationAndAddressFlow.currentStage
      let isValidated
      if (currentStage === 1) isValidated = emailVerificationDetails.validate(emailVerificationDetails.formData)
      else isValidated = locationDetails.validate(locationDetails.formData)
      if (isValidated[0] === false) return setError(isValidated[1] as string[])
      if (emailVerificationAndAddressFlow.currentStage === 2) submitSignup()
      else emailVerificationAndAddressFlow.goToNextStage()
    }
  }, [totalStages, profileAndContactFlow, profileInitials, contactDetails, emailVerificationAndAddressFlow, emailVerificationDetails, locationDetails, submitSignup])


  const signupContextValue = useMemo(() => ({
    isVerificationStage,
    query,
    profileAndContactFlow,
    emailVerificationAndAddressFlow,
    totalStages,
    handleSubmitButtonClick,
    handleFormDataChange,
    profileInitials,
    contactDetails,
    emailVerificationDetails,
    locationDetails,
    error
  }), [isVerificationStage, query, profileAndContactFlow, emailVerificationAndAddressFlow, totalStages, 
    handleSubmitButtonClick, handleFormDataChange, profileInitials, contactDetails, emailVerificationDetails, 
    locationDetails, error])

  return (
    <SignupContext.Provider value={signupContextValue}>
      {children}
    </SignupContext.Provider>
  )
}