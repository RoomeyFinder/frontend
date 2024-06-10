import { ReactNode, useCallback, useMemo, useState } from "react"
import useManageStageFlow from "../_hooks/useManageStageFlow"
import useAxios, { RequestBody } from "../_hooks/useAxios"
import SignupContext from "./_Context"
import { validateEmail } from "../_utils"
import toast from "react-hot-toast"
import { useAppDispatch } from "../_redux"
import { authenticate } from "../_redux/slices/auth.slice"

// const SIXTEEN_YEARS_AGO = new Date(Date.now())
// SIXTEEN_YEARS_AGO.setFullYear(SIXTEEN_YEARS_AGO.getFullYear() - 16)
export const FOURTEEN_YEARS_IN_MILLISECONDS = 4.418e11

export default function SignupProvider({
  children,
}: {
  children: ReactNode | ReactNode[]
}) {
  const [isSignupDone, setIsSignupDone] = useState(false)
  const { fetchData } = useAxios()
  const [loading, setLoading] = useState(false)

  const totalStages = useManageStageFlow({
    maxStage: 2,
    minStage: 0,
    start: 0,
  })

  const [formErrors, setError] = useState<{ [x: string]: string }>({})

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
      } else toast.error(res.message)
      setLoading(false)
    },
    [contactDetails.formData, fetchData, profileInitials.formData]
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
    if (res.statusCode === 200) toast.success(res.message)
    else toast.error(res.message)
    setLoading(false)
  }, [contactDetails.formData.email, fetchData])
  
  const dispatch = useAppDispatch()

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
        // updateUser(res.user)
        // updateToken(res.token)
        dispatch(
          authenticate({
            user: res.user,
            token: res.token,
          })
        )
      } else
        setError((prev) => ({
          ...prev,
          verificationToken: res.message || "Something went wrong",
        }))
      console.log("dfdkfkj")
      setLoading(false)
    },
    [
      emailVerificationDetails.formData.verificationToken,
      fetchData,
      contactDetails.formData.email,
      dispatch
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
    if (isValidated.hasError === true)
      return setError(isValidated.errors as any)
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
        setError((prev) => {
          const update = { ...prev }
          delete update[name as keyof typeof update]
          return update
        })
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
      const errors: { [x: string]: string } = {}
      if (!formData.gender) errors.gender = "This field is required"
      if (!formData.firstName) errors.firstName = "This field is required"
      if ((formData.firstName as string).length <= 4)
        errors.firstName = "Must be at least 4 characters"
      if (!formData.lastName) errors.lastName = "This field is required"
      if ((formData.lastName as string).length <= 4)
        errors.lastName = "Must be at least 4 characters"
      const isOfAge =
        Date.now() - new Date(formData.dob as string).getTime() >=
        FOURTEEN_YEARS_IN_MILLISECONDS
      if (!formData.dob) errors.dob = "This field is required"
      if (!isOfAge) errors.dob = "You must be at least 14 years"
      if (
        formData["isStudent" as formDataKey] === false &&
        !(formData["occupation" as formDataKey] as string)?.length
      )
        errors.occupation = "This field is required"
      if (
        formData["isStudent" as formDataKey] === true &&
        !(formData["school" as formDataKey] as string)?.length
      )
        errors.school = "This field is required"
      return { hasError: Object.entries(errors).length > 0, errors }
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
      const errors: { [x: string]: string } = {}
      if (!formData.email) errors.email = "This field is required"
      if (!validateEmail(formData.email)) errors.email = "Invalid email address"
      if (!formData.phoneNumber) errors.phoneNumber = "This field is required"
      if (!formData.password) errors.password = "This field is required"
      if ((formData.password as string).length < 8)
        errors.password = "Must be at least 8 characters"
      if (!formData.confirmPassword)
        errors.confirmPassword = "This field is required"
      if (
        (formData.confirmPassword as string) !== (formData.password as string)
      )
        errors.confirmPassword = "Must be the same as password"
      return {
        hasError: Object.entries(errors).length > 0,
        errors,
      }
    },
  })
  const [emailVerificationDetails, setEmailVerificationDetails] = useState({
    name: "EMAIL-VERIFICATION",
    formData: {
      verificationToken: "",
    },
    validate: (formData: { [x: string]: string }) => {
      return {
        hasError: formData.verificationToken.length < 6,
        errors: { verificationToken: "This field is required" },
      }
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
