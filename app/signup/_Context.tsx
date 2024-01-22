
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation"
import { ReactNode, createContext, useCallback, useMemo, useState } from "react"
import useManageStageFlow from "../_hooks/useManageStageFlow"

export const FOURTEEN_YEARS_IN_MILLISECONDS = 4.418e+11

type SignupValue = {
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
  contactDetails: { name: string, formData: { [x: string]: string | number | boolean } }
  emailVerificationDetails: { name: string, formData: { [x: string]: string | number | boolean } }
  locationDetails: { name: string, formData: { [x: string]: string | number | boolean } }
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
  handleFormDataChange: () => {}
})

export default function SignupProvider({ children }: {
  children: ReactNode | ReactNode[]
}) {
  const query = useSearchParams()
  const isVerificationStage = useMemo(() => query.get("verifyEmail") === "true", [query])
  const totalStages = useManageStageFlow({ maxStage: 2, minStage: 1, start: 1 })
  const profileAndContactFlow = useManageStageFlow({ maxStage: 2, minStage: 1, start: 1 })
  const emailVerificationAndAddressFlow = useManageStageFlow({ maxStage: 2, minStage: 1, start: 0 })
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
    }
  })
  const [emailVerificationDetails, setEmailVerificationDetails] = useState({
    name: "EMAIL-VERIFICATION",
    formData: {
      verificationToken: ""
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
    }
  })

  const onChangeHandlers = useMemo(() => ({
    "PROFILE-INITIALS": (name: string, value: string | number | boolean) => setProfileInitials(prev => ({ ...prev, formData: { ...prev.formData, [name]: value } })),
    "CONTACT": (name: string, value: string | number | boolean) => setContactDetails(prev => ({ ...prev, formData: { ...prev.formData, [name]: value } })),
    "EMAIL-VERIFICATION": (name: string, value: string | number | boolean) => setEmailVerificationDetails(prev => ({ ...prev, formData: { ...prev.formData, [name]: value } })),
    "LOCATION": (name: string, value: string | number | boolean) => setLocationDetails(prev => ({ ...prev, formData: { ...prev.formData, [name]: value } })),
  }), [])

  const handleFormDataChange = useCallback((stageName: string, name: string, value: string | number | boolean) => {
    onChangeHandlers[stageName as keyof typeof onChangeHandlers](name, value)
  }, [onChangeHandlers])

  const submitSignup = useCallback(() => {
    console.log("heererje")
  }, [])

  const handleSubmitButtonClick = useCallback(() => {
    if (totalStages.currentStage === 1) {
      if (profileAndContactFlow.currentStage >= 2) {
        totalStages.goToNextStage()
        emailVerificationAndAddressFlow.goToNextStage()
      } else profileAndContactFlow.goToNextStage()
    } else {
      if (emailVerificationAndAddressFlow.currentStage === 2) submitSignup()
      else emailVerificationAndAddressFlow.goToNextStage()
    }
  }, [totalStages, profileAndContactFlow, emailVerificationAndAddressFlow, submitSignup])


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
    locationDetails
  }), [isVerificationStage, query, profileAndContactFlow, emailVerificationAndAddressFlow,
    totalStages, handleSubmitButtonClick, handleFormDataChange, profileInitials,
    contactDetails, emailVerificationDetails, locationDetails])

  return (
    <SignupContext.Provider value={signupContextValue}>
      {children}
    </SignupContext.Provider>
  )
}