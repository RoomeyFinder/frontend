import useAxios from "@/app/_hooks/useAxios"
import { Box, Divider, Flex, Link, Text, VStack } from "@chakra-ui/react"
import {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react"
import {
  DobInput,
  EmailInput,
  FirstNameInput,
  FormSubmitButton,
  GenderInput,
  LastNameInput,
  PasswordInput,
} from "./SignupInputs"
import { isUnderage } from "@/app/_utils"
import toast from "react-hot-toast"
import User from "@/app/_types/User"

export default function SignupForm({
  email,
  handleSubmission,
}: {
  email: string
  handleSubmission: (res: { user?: User; statusCode: number }) => void
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
  })
  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
  })
  const [isSubmiting, setIsSubmitting] = useState(false)
  const handleFormDataChange: ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
      setError((prev) => ({ ...prev, [e.target.name]: "" }))
    }, [])
  const { fetchData } = useAxios()
  const handleSignup: FormEventHandler = useCallback(
    async (e) => {
      e.preventDefault()
      let hasDobError = false
      const formDataKeys = Object.keys(formData)
      formDataKeys.forEach((key) => {
        if (!formData[key as keyof typeof formData])
          setError((prev) => ({ ...prev, [key]: "This field is required" }))
        else {
          if (key === "dob" && isUnderage(formData.dob)) {
            setError((prev) => ({
              ...prev,
              [key]: "You must be 16 or older to use RoomeyFinder.",
            }))
            hasDobError = true
          }
        }
      })
      if (
        hasDobError ||
        formDataKeys.some((key) => !formData[key as keyof typeof formData])
      )
        return

      setIsSubmitting(true)
      const res = await fetchData({
        url: "/users",
        method: "post",
        body: formData,
      })
      handleSubmission(res)
      if (res.statusCode !== 201) {
        toast.error(
          "An error occurred while trying to create your account. Please try again. If this persists. Please contact support@roomeyfinder.com"
        )
      }
      setIsSubmitting(false)
    },
    [fetchData, formData, handleSubmission]
  )

  useEffect(() => {
    setFormData((prev) => ({ ...prev, email }))
  }, [email])

  return (
    <>
      <Box
        onSubmit={handleSignup}
        as="form"
        display="flex"
        flexDir="column"
        gap="1.6rem"
        w="100%"
      >
        <VStack gap="1rem" alignItems="start" w="100%">
          <Text fontSize="1.6rem" fontWeight="600">
            Legal Name
          </Text>
          <Flex gap="1rem">
            <FirstNameInput
              error={error.firstName}
              value={formData.firstName}
              onChange={handleFormDataChange}
            />
            <LastNameInput
              error={error.lastName}
              value={formData.lastName}
              onChange={handleFormDataChange}
            />
          </Flex>
        </VStack>
        <VStack gap="1rem" alignItems="start" w="100%">
          <Text fontSize="1.6rem" fontWeight="600">
            Date of birth
          </Text>
          <DobInput
            error={error.dob}
            value={formData.dob}
            onChange={handleFormDataChange}
          />
        </VStack>
        <VStack gap="1rem" alignItems="start" w="100%">
          <Text fontSize="1.6rem" fontWeight="600">
            Gender
          </Text>
          <GenderInput
            value={formData.gender as string}
            onChange={handleFormDataChange}
            error={error.gender}
          />
        </VStack>
        <VStack gap="1rem" alignItems="start" w="100%">
          <Text fontSize="1.6rem" fontWeight="600">
            Contact Info
          </Text>
          <EmailInput
            error={error.email}
            variant="filled"
            value={formData.email}
            onChange={handleFormDataChange}
          />
        </VStack>
        <VStack gap="1rem" alignItems="start" w="100%">
          <Text fontSize="1.6rem" fontWeight="600">
            Password
          </Text>
          <PasswordInput
            error={error.password}
            value={formData.password}
            onChange={handleFormDataChange}
          />
        </VStack>
        <AutoAgreeToTermsText />
        <FormSubmitButton isLoading={isSubmiting} />
      </Box>
      <Divider borderColor="#dddddd" mt="2rem" />
    </>
  )
}

export function AutoAgreeToTermsText() {
  return (
    <Text fontSize="1rem">
      By selecting <Text as="b">Agree and continue</Text>, I agree to{" "}
      <Link href="#" color="brand.main" fontWeight="600" textDecor="underline">
        RoomeyFinder&apos;s Terms of Service
      </Link>
      ,{" "}
      <Link href="#" color="brand.main" fontWeight="600" textDecor="underline">
        Payments Terms of Service
      </Link>
      , and{" "}
      <Link href="#" color="brand.main" fontWeight="600" textDecor="underline">
        Nondiscrimination Policy
      </Link>{" "}
      and acknowledge the{" "}
      <Link href="#" color="brand.main" fontWeight="600" textDecor="underline">
        Privacy Policy
      </Link>
      .
    </Text>
  )
}
