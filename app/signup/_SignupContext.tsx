
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation"
import { ReactNode, createContext, useCallback, useMemo, useState } from "react"
import useManageStageFlow from "../_hooks/useManageStageFlow"

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
}
export const SignupContext = createContext<SignupValue>({
  isVerificationStage: false,
  query: null,
  profileAndContactFlow: {
    currentStage: 1,
    goToNextStage: () => {},
    goToPrevStage: () => {},
    progressInPercentage: 50
  },
  emailVerificationAndAddressFlow: {
    currentStage: 0,
    goToNextStage: () => {},
    goToPrevStage: () => {},
    progressInPercentage: 0
  },
  totalStages: {
    currentStage: 1,
    goToNextStage: () => {},
    goToPrevStage: () => {},
    progressInPercentage: 0
  },
  handleSubmitButtonClick: () => {}
})

export default function SignupProvider({ children }: {
  children: ReactNode | ReactNode[]
}){
  const query = useSearchParams()
  const isVerificationStage = useMemo(() => query.get("verifyEmail") === "true", [query])
  const totalStages = useManageStageFlow({ maxStage: 2, minStage: 1, start: 1 })
  const profileAndContactFlow = useManageStageFlow({ maxStage: 2, minStage: 1, start: 1 })
  const emailVerificationAndAddressFlow = useManageStageFlow({ maxStage: 2, minStage: 1, start: 0 })
  const [signupFormData, setSignupFormData] = useState(getInitialSignupData)

  const handleFormDataChange = useCallback((mainStage: number, subStage: number, name: string, value: string | number) => {
    setSignupFormData(previous => {
      return ({
        ...previous,
        [mainStage]: {
          ...previous[mainStage],
          [subStage]: {
            ...previous[mainStage][subStage],
            formData: {
              ...previous[mainStage][subStage].formData,
              [name]: value
            }
          }
        }
      })
    })
  }, [])

  const submitSignup = useCallback(() => {
    console.log("heererje")
  }, [])

  const handleSubmitButtonClick = useCallback(() => {
    if(totalStages.currentStage === 1){
      if(profileAndContactFlow.currentStage >= 2) {
        totalStages.goToNextStage()
        emailVerificationAndAddressFlow.goToNextStage()
      } else profileAndContactFlow.goToNextStage()
    }else{
      if(emailVerificationAndAddressFlow.currentStage === 2) submitSignup()
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
    signupFormData,
    handleFormDataChange
  }), [
    emailVerificationAndAddressFlow, handleSubmitButtonClick, 
    isVerificationStage, profileAndContactFlow, query, 
    signupFormData, totalStages, handleFormDataChange
  ])

  return (
    <SignupContext.Provider value={signupContextValue}>
      {children}
    </SignupContext.Provider>
  )
}

function getInitialSignupData(): { [x: number]: { [x: number]: { name: string, formData: { [x: string]: string | number } }}} {
  return ({
    1: {
      1: {
        name: "PROFILE-INITIALS",
        formData: {

        }
      },
      2: {
        name: "CONTACT",
        formData: {

        }
      },
    },
    2: {
      1: {
        name: "EMAIL-VERIFICATION",
        formData: {

        }
      },
      2: {
        name: "LOCATION",
        formData: {

        }
      },
    }
  })
}