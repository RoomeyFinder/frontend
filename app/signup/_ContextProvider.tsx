import {
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"
import useManageStageFlow from "../_hooks/useManageStageFlow"
import useAxios, { RequestBody } from "../_hooks/useAxios"
import { useToast } from "@chakra-ui/react"
import SignupContext from "./_Context"
import { UserContext } from "../_providers/UserProvider"
import { AuthContext } from "../_providers/AuthContext"

export const FOURTEEN_YEARS_IN_MILLISECONDS = 4.418e11

const validateFormDataFields = (
  formData: { [x: string]: string | boolean },
  fields: string[]
) => {
  type formDataKey = keyof typeof formData
  return fields.every((field) => formData[field as formDataKey])
}

const findErrorFields = (
  formData: { [x: string]: string | boolean },
  fields: string[]
) => {
  type formDataKey = keyof typeof formData
  return fields.filter((it) => Boolean(formData[it as formDataKey]) === false)
}

export default function SignupProvider({
  children,
}: {
  children: ReactNode | ReactNode[]
}) {
  const [isSignupDone, setIsSignupDone] = useState(false)
  const toast = useToast({
    containerStyle: { fontSize: "1.6rem", color: "white" },
    position: "top",
  })
  const { fetchData } = useAxios()
  const [loading, setLoading] = useState(false)

  const totalStages = useManageStageFlow({
    maxStage: 2,
    minStage: 0,
    start: 0,
  })

  const [formErrors, setError] = useState<string[]>([])

  const {
    profileInitials,
    contactDetails,
    emailVerificationDetails,
    handleFormDataChange,
  } = useManageFormData()

  const sendEmailVerificationCode = useCallback(
    async (successCallback: () => void) => {
      setLoading(true)
      const res = await fetchData({
        url: "/users",
        method: "post",
        body: {
          ...profileInitials.formData,
          ...contactDetails.formData,
        } as RequestBody,
      })
      if (res.statusCode === 201) {
        successCallback()
        sessionStorage.setItem("unverifiedEmail", contactDetails.formData.email)
      } else toast({ description: res.message, status: "error" })
      setLoading(false)
    },
    [contactDetails.formData, fetchData, profileInitials.formData, toast]
  )

  const resendVerificationEmail = useCallback(async () => {
    setLoading(true)
    const body: { [x: string]: string } = {
      email: contactDetails.formData.email,
    }
    const res = await fetchData({
      url: "/users/verify-email",
      method: "post",
      body,
    })
    if (res.statusCode === 200)
      toast({ description: res.message, status: "success" })
    else toast({ description: res.message, status: "success" })
    setLoading(false)
  }, [contactDetails.formData.email, fetchData, toast])

  const { updateUser } = useContext(UserContext)
  const { updateToken } = useContext(AuthContext)

  const verifyEmail = useCallback(
    async (successCallback: () => void) => {
      setLoading(true)
      const res = await fetchData({
        url: `/users/verify-email/${emailVerificationDetails.formData.verificationToken}`,
        body: { email: contactDetails.formData.email } as RequestBody,
        method: "post",
      })
      if (res.statusCode === 200) {
        successCallback()
        setIsSignupDone(true)
        updateUser(res.user)
        updateToken(res.token)
      } else toast({ description: res.message, status: "error" })
      setLoading(false)
    },
    [
      emailVerificationDetails.formData.verificationToken,
      fetchData,
      toast,
      contactDetails.formData.email,
      updateUser,
      updateToken,
    ]
  )
  const handleSubmitButtonClick = useCallback(() => {
    let isValidated
    if (totalStages.currentStage === 0) {
      isValidated = profileInitials.validate(profileInitials.formData)
    } else if (totalStages.currentStage === 1) {
      isValidated = contactDetails.validate(contactDetails.formData)
    } else {
      isValidated = emailVerificationDetails.validate(
        emailVerificationDetails.formData
      )
    }
    if (isValidated[0] === false) return setError(isValidated[1] as string[])
    else {
      if (totalStages.currentStage === 2)
        verifyEmail(() => {
          totalStages.goToNextStage()
        })
      else if (totalStages.currentStage === 1)
        sendEmailVerificationCode(() => totalStages.goToNextStage())
      else totalStages.goToNextStage()
    }
  }, [
    totalStages,
    sendEmailVerificationCode,
    verifyEmail,
    profileInitials,
    contactDetails,
    emailVerificationDetails,
  ])

  const signupContextValue = useMemo(
    () => ({
      totalStages,
      handleSubmitButtonClick,
      handleFormDataChange: handleFormDataChange((name) =>
        setError((prev) => prev.filter((it) => it !== name))
      ),
      profileInitials,
      contactDetails,
      emailVerificationDetails,
      formErrors,
      resendVerificationEmail,
      loading,
      isSignupDone,
    }),
    [
      totalStages,
      handleSubmitButtonClick,
      handleFormDataChange,
      profileInitials,
      contactDetails,
      emailVerificationDetails,
      formErrors,
      resendVerificationEmail,
      loading,
      isSignupDone,
    ]
  )

  return (
    <SignupContext.Provider value={signupContextValue}>
      {children}
    </SignupContext.Provider>
  )
}

function useManageFormData() {
  const [profileInitials, setProfileInitials] = useState({
    name: "PROFILE-INITIALS",
    formData: {
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      isStudent: false,
      occupation: "",
      school: "",
    },
    validate: (formData: { [x: string]: string | boolean }) => {
      type formDataKey = keyof typeof formData
      const mainRequiredFields = ["firstName", "lastName", "dob", "gender"]
      const firstCheck =
        validateFormDataFields(formData, mainRequiredFields) &&
        (formData.firstName as string).length >= 4 &&
        (formData.lastName as string).length >= 4
      const passedIsNotAStudentCheck =
        formData["isStudent" as formDataKey] === false &&
        (formData["occupation" as formDataKey] as string).length > 0
      const passedIsStudentCheck =
        formData["isStudent" as formDataKey] === true &&
        (formData["school" as formDataKey] as string).length > 0
      const formErrorsFields = findErrorFields(formData, mainRequiredFields)
      if (formData.isStudent === true)
        return [
          passedIsStudentCheck && firstCheck,
          formErrorsFields.concat(!passedIsStudentCheck ? "school" : []),
        ]
      return [
        passedIsNotAStudentCheck && firstCheck,
        formErrorsFields
          .concat(!passedIsNotAStudentCheck ? "occupation" : [])
          .concat(
            (formData.firstName as string).length < 4 ? ["firstName"] : []
          )
          .concat((formData.lastName as string).length < 4 ? ["lastName"] : []),
      ]
    },
  })
  const [contactDetails, setContactDetails] = useState({
    name: "CONTACT",
    formData: {
      email: "",
      phoneNumber: "",
      countryCode: "234",
      password: "",
      confirmPassword: "",
    },
    validate: (formData: { [x: string]: string }) => {
      const mainRequiredFields = ["email", "phoneNumber", "countryCode"]
      const passedPasswordCheck =
        formData.password === formData.confirmPassword &&
        formData.password.length >= 8
      const formErrorsFields = findErrorFields(formData, mainRequiredFields)
      return [
        validateFormDataFields(formData, mainRequiredFields) &&
          passedPasswordCheck,
        formErrorsFields.concat(
          !passedPasswordCheck ? ["password", "confirmPassword"] : []
        ),
      ]
    },
  })
  const [emailVerificationDetails, setEmailVerificationDetails] = useState({
    name: "EMAIL-VERIFICATION",
    formData: {
      verificationToken: "",
    },
    validate: (formData: { [x: string]: string }) => {
      return [formData.verificationToken.length === 6, ["verificationToken"]]
    },
  })

  const onChangeHandlers = useMemo(
    () => ({
      "PROFILE-INITIALS": (name: string, value: string | number | boolean) =>
        setProfileInitials((prev) => ({
          ...prev,
          formData: { ...prev.formData, [name]: value },
        })),
      CONTACT: (name: string, value: string | number | boolean) =>
        setContactDetails((prev) => ({
          ...prev,
          formData: { ...prev.formData, [name]: value },
        })),
      "EMAIL-VERIFICATION": (name: string, value: string | number | boolean) =>
        setEmailVerificationDetails((prev) => ({
          ...prev,
          formData: { ...prev.formData, [name]: value },
        })),
    }),
    []
  )

  const handleFormDataChange = useCallback(
    (resetError: (name: string) => void) =>
      (stageName: string, name: string, value: string | number | boolean) => {
        resetError(name)
        onChangeHandlers[stageName as keyof typeof onChangeHandlers](
          name,
          value
        )
      },
    [onChangeHandlers]
  )
  return {
    handleFormDataChange,
    profileInitials,
    contactDetails,
    emailVerificationDetails,
  }
}
