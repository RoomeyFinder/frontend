import useAxios from "@/app/_hooks/useAxios"
import { Box, Text, VStack } from "@chakra-ui/react"
import { FormEvent, useCallback, useState } from "react"
import User from "@/app/_types/User"
import { ResendCodeButton } from "@/app/signup/_EmailVerification"
import PinInputElement from "../PinInputElement"
import ErrorText from "./ErrorText"
import toast from "react-hot-toast"
import { FormSubmitButton } from "./SignupInputs"
import { authenticate } from "@/app/_redux/slices/auth.slice"
import { useAppDispatch } from "@/app/_redux"

export default function ConfirmEmailForm({
  email,
  // handleSubmission,
  handleSuccess,
}: {
  email: string
  handleSubmission: (res: { user?: User; statusCode: number }) => void
  handleSuccess: () => void
}) {
  const dispatch = useAppDispatch()
  const [prevCode, setPrevCode] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [error, setError] = useState({
    verificationCode: "",
    api: "",
  })
  const [isSubmiting, setIsSubmitting] = useState(false)
  const { fetchData } = useAxios()
  const verifyEmail = useCallback(async () => {
    if (isSubmiting) return
    if (verificationCode.length < 6)
      return setError((prev) => ({
        ...prev,
        verificationCode: "Please provide the code that was sent to your email",
      }))
    if (prevCode === verificationCode) return
    setIsSubmitting(true)
    const res = await fetchData({
      url: `/users/verify-email/${verificationCode}`,
      body: { email: email },
      method: "post",
    })
    if (res.statusCode === 200) {
      dispatch(
        authenticate({
          user: res.user,
          token: res.token,
        })
      )
      handleSuccess()
      setVerificationCode("")
      setError({
        api: "",
        verificationCode: "",
      })
      setPrevCode("")
    } else {
      setPrevCode(verificationCode)
      setError((prev) => ({ ...prev, api: res.message }))
    }
    setIsSubmitting(false)
  }, [
    fetchData,
    email,
    verificationCode,
    isSubmiting,
    prevCode,
    handleSuccess,
    dispatch,
  ])

  const resendVerificationEmail = useCallback(async () => {
    const res = await fetchData({
      url: "/users/verify-email",
      method: "post",
      body: {
        email,
      },
    })
    if (res.statusCode === 200) toast.success(res.message)
  }, [email, fetchData])

  return (
    <>
      <Box
        onSubmit={(e: FormEvent) => {
          e.preventDefault()
          verifyEmail()
        }}
        as="form"
        display="flex"
        flexDir="column"
        w="100%"
        gap="1.8rem"
        alignItems="start"
      >
        <VStack w="full" alignItems="start" gap="1rem">
          <Text fontSize="1.6rem" fontWeight="600">
            Verification code
          </Text>
          <PinInputElement
            hasError={error.verificationCode?.length > 0}
            handleChange={(val) => {
              setError((prev) => ({ ...prev, verificationCode: "" }))
              setVerificationCode(val)
            }}
            value={verificationCode}
          />
          {error.verificationCode && (
            <ErrorText>{error.verificationCode}</ErrorText>
          )}
          {error.api && <ErrorText>{error.api}</ErrorText>}
        </VStack>
        <ResendCodeButton onClick={resendVerificationEmail} />
        <FormSubmitButton isLoading={isSubmiting} w="full">
          Verify
        </FormSubmitButton>
      </Box>
    </>
  )
}
