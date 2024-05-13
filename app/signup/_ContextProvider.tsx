import { useRouter } from "next/navigation"
import {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import useManageStageFlow from "../_hooks/useManageStageFlow"
import useAxios, { RequestBody } from "../_hooks/useAxios"
import { getGeocode, getZipCode, getLatLng } from "use-places-autocomplete"
import { useToast } from "@chakra-ui/react"
import SignupContext from "./_Context"
import { UserContext } from "../_providers/UserProvider"
import { AuthContext } from "../_providers/AuthContext"

export const FOURTEEN_YEARS_IN_MILLISECONDS = 4.418e11

const fetchLatLng = async (placeId: string) => {
  const results = await getGeocode({ placeId })
  return await getLatLng(results[0])
}
const fetchZipCode = async (placeId: string) => {
  const results = await getGeocode({ placeId })
  return getZipCode(results[0], false)
}

const validateFormDataFields = (
  formData: { [x: string]: string | boolean },
  fields: string[]
) => {
    type formDataKey = keyof typeof formData;
    return fields.every((field) => formData[field as formDataKey])
}

const findErrorFields = (
  formData: { [x: string]: string | boolean },
  fields: string[]
) => {
    type formDataKey = keyof typeof formData;
    return fields.filter(
      (it) => Boolean(formData[it as formDataKey]) === false
    )
}

export default function SignupProvider({
  children,
}: {
    children: ReactNode | ReactNode[];
}) {
  const router = useRouter()
  const toast = useToast({
    containerStyle: { fontSize: "1.6rem", color: "white" },
    position: "top",
  })
  const { fetchData } = useAxios()
  const [loading, setLoading] = useState(false)
  const totalStages = useManageStageFlow({
    maxStage: 2,
    minStage: 1,
    start: 1,
  })
  const profileAndContactFlow = useManageStageFlow({
    maxStage: 2,
    minStage: 1,
    start: 1,
  })
  const emailVerificationAndAddressFlow = useManageStageFlow({
    maxStage: 2,
    minStage: 1,
    start: 0,
  })
  const [formErrors, setError] = useState<string[]>([])

  const {
    profileInitials,
    contactDetails,
    emailVerificationDetails,
    locationDetails,
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
        sessionStorage.setItem(
          "unverifiedEmail",
          contactDetails.formData.email
        )
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

  const verifyEmail = useCallback(
    async (successCallback: () => void) => {
      setLoading(true)
      const res = await fetchData({
        url: `/users/verify-email/${emailVerificationDetails.formData.verificationToken}`,
        body: { email: contactDetails.formData.email } as RequestBody,
        method: "post",
      })
      if (res.statusCode === 200) successCallback()
      else toast({ description: res.message, status: "error" })
      setLoading(false)
    },
    [
      emailVerificationDetails.formData.verificationToken,
      fetchData,
      toast,
      contactDetails.formData.email,
    ]
  )

  const { updateUser } = useContext(UserContext)
  const { updateToken } = useContext(AuthContext)
  const submitSignup = useCallback(async () => {
    setLoading(true)
    const zipcode = await fetchZipCode(locationDetails.formData.placeId)
    const latLng = await fetchLatLng(locationDetails.formData.placeId)
    const body: { [x: string]: string | number | undefined } = {
      ...locationDetails.formData,
      currentAddress: locationDetails.formData.address,
      currentLongitude: latLng.lat,
      currentLatitude: latLng.lng,
      zipcode,
      email: contactDetails.formData.email,
    }
    const res = await fetchData({
      url: `/users/verify-email/${emailVerificationDetails.formData.verificationToken}`,
      method: "put",
      body,
    })
    if (res.statusCode === 200) {
      toast({
        description: "Your account has been created successfully",
        status: "success",
      })
      sessionStorage.removeItem("unverifiedEmail")
      updateUser(res.token, true)
      updateToken(res.user, true)
      // sessionStorage.setItem("RF_TOKEN", JSON.stringify(res.token))
      // sessionStorage.setItem("RF_USER", JSON.stringify(res.user))
      router.push("/")
    } else
      toast({
        description: "Something went wrong! Please try logging in.",
        status: "error",
      })
    setLoading(false)
  }, [
    locationDetails.formData,
    fetchData,
    emailVerificationDetails.formData.verificationToken,
    toast,
    router,
    contactDetails.formData.email,
    updateToken,
    updateUser,
  ])

  const handleSubmitButtonClick = useCallback(() => {
    if (totalStages.currentStage === 1) {
      const currentStage = profileAndContactFlow.currentStage
      let isValidated
      if (currentStage === 1) {
        isValidated = profileInitials.validate(
          profileInitials.formData
        )
        console.log(isValidated)
      } else
        isValidated = contactDetails.validate(contactDetails.formData)
      if (isValidated[0] === false)
        return setError(isValidated[1] as string[])
      if (profileAndContactFlow.currentStage >= 2) {
        sendEmailVerificationCode(() => {
          totalStages.goToNextStage()
          emailVerificationAndAddressFlow.goToNextStage()
        })
      } else profileAndContactFlow.goToNextStage()
    } else {
      const currentStage = emailVerificationAndAddressFlow.currentStage
      let isValidated
      if (currentStage === 1)
        isValidated = emailVerificationDetails.validate(
          emailVerificationDetails.formData
        )
      else
        isValidated = locationDetails.validate(
          locationDetails.formData
        )
      if (isValidated[0] === false)
        return setError(isValidated[1] as string[])
      if (emailVerificationAndAddressFlow.currentStage === 2)
        submitSignup()
      else {
        verifyEmail(() =>
          emailVerificationAndAddressFlow.goToNextStage()
        )
      }
    }
  }, [
    totalStages,
    sendEmailVerificationCode,
    verifyEmail,
    profileAndContactFlow,
    profileInitials,
    contactDetails,
    emailVerificationAndAddressFlow,
    emailVerificationDetails,
    locationDetails,
    submitSignup,
  ])

  const signupContextValue = useMemo(
    () => ({
      profileAndContactFlow,
      emailVerificationAndAddressFlow,
      totalStages,
      handleSubmitButtonClick,
      handleFormDataChange: handleFormDataChange((name) =>
        setError((prev) => prev.filter((it) => it !== name))
      ),
      profileInitials,
      contactDetails,
      emailVerificationDetails,
      locationDetails,
      formErrors,
      resendVerificationEmail,
      loading,
    }),
    [
      profileAndContactFlow,
      emailVerificationAndAddressFlow,
      totalStages,
      handleSubmitButtonClick,
      handleFormDataChange,
      profileInitials,
      contactDetails,
      emailVerificationDetails,
      locationDetails,
      formErrors,
      resendVerificationEmail,
      loading,
    ]
  )

  useEffect(() => {
    const unverifiedEmail = sessionStorage.getItem("unverifiedEmail")
    if (
      unverifiedEmail &&
            totalStages.currentStage !== 2 &&
            emailVerificationAndAddressFlow.currentStage !== 1
    ) {
      handleFormDataChange((name: string) =>
        setError((prev) => prev.filter((it) => it !== name))
      )("CONTACT", "email", unverifiedEmail)
      totalStages.navigateToStage(2)
      profileAndContactFlow.navigateToStage(2)
      emailVerificationAndAddressFlow.navigateToStage(1)
    }
  }, [
    emailVerificationAndAddressFlow,
    handleFormDataChange,
    profileAndContactFlow,
    totalStages,
  ])

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
            type formDataKey = keyof typeof formData;
            const mainRequiredFields = [
              "firstName",
              "lastName",
              "dob",
              "gender",
            ]
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
            const formErrorsFields = findErrorFields(
              formData,
              mainRequiredFields
            )
            if (formData.isStudent === true)
              return [
                passedIsStudentCheck && firstCheck,
                formErrorsFields.concat(
                  !passedIsStudentCheck ? "school" : []
                ),
              ]
            return [
              passedIsNotAStudentCheck && firstCheck,
              formErrorsFields
                .concat(!passedIsNotAStudentCheck ? "occupation" : [])
                .concat(
                  (formData.firstName as string).length < 4
                    ? ["firstName"]
                    : []
                )
                .concat(
                  (formData.lastName as string).length < 4
                    ? ["lastName"]
                    : []
                ),
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
      const formErrorsFields = findErrorFields(
        formData,
        mainRequiredFields
      )
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
      return [
        formData.verificationToken.length === 6,
        ["verificationToken"],
      ]
    },
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
      zipcode: "",
    },
    validate: (formData: { [x: string]: string }) => {
      const mainRequiredFields = [
        "address",
        "city",
        "state",
        "country",
        "placeId",
      ]
      const formErrorsFields = findErrorFields(
        formData,
        mainRequiredFields
      )
      return [
        validateFormDataFields(formData, mainRequiredFields),
        formErrorsFields,
      ]
    },
  })

  const onChangeHandlers = useMemo(
    () => ({
      "PROFILE-INITIALS": (
        name: string,
        value: string | number | boolean
      ) =>
        setProfileInitials((prev) => ({
          ...prev,
          formData: { ...prev.formData, [name]: value },
        })),
      CONTACT: (name: string, value: string | number | boolean) =>
        setContactDetails((prev) => ({
          ...prev,
          formData: { ...prev.formData, [name]: value },
        })),
      "EMAIL-VERIFICATION": (
        name: string,
        value: string | number | boolean
      ) =>
        setEmailVerificationDetails((prev) => ({
          ...prev,
          formData: { ...prev.formData, [name]: value },
        })),
      LOCATION: (name: string, value: string | number | boolean) =>
        setLocationDetails((prev) => ({
          ...prev,
          formData: { ...prev.formData, [name]: value },
        })),
    }),
    []
  )

  const handleFormDataChange = useCallback(
    (resetError: (name: string) => void) =>
      (
        stageName: string,
        name: string,
        value: string | number | boolean
      ) => {
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
    locationDetails,
  }
}
