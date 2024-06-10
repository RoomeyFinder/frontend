import useAxios from "@/app/_hooks/useAxios"
import { Box, Button, Input, Text, VStack } from "@chakra-ui/react"
import { FormEventHandler, useCallback, useEffect, useState } from "react"
import ErrorText from "./ErrorText"
import { getErrorPropsV1 } from "@/app/signup/utils"
import { validateEmail } from "@/app/_utils"
import { FormSubmitButton } from "./SignupInputs"

export type AccountCheckResponse = {
  statusCode: number
  hasAccount: boolean
  ssoProvider?: "google" | "facebook"
  email: string
  firstName?: string
}
export default function ForgotPasswordForm({
  handleSuccess,
  email,
}: {
  handleSuccess: () => void
  email: string
}) {
  const [error, setError] = useState("")
  const [emailValue, setEmailValue] = useState(email)
  const [isSubmiting, setIsSubmitting] = useState(false)
  const [hasSentLink, setHasSentLink] = useState(false)
  const { fetchData } = useAxios()

  const handleEmailCheck: FormEventHandler = useCallback(
    async (e) => {
      e.preventDefault()
      if (emailValue.length === 0) return setError("Please provide an email!")
      if (!validateEmail(emailValue))
        return setError("Email address is invalid!")
      setIsSubmitting(true)
      const res = await fetchData({
        url: "/users/forgot-password",
        method: "post",
        body: {
          email: emailValue,
        },
      })
      if (res.statusCode === 200) {
        setHasSentLink(true)
      } else setError("Something went wrong!")
      setError("")
      setIsSubmitting(false)
    },
    [fetchData, emailValue]
  )

  useEffect(() => {
    setEmailValue(email)
  }, [email])

  return (
    <>
      {hasSentLink ? (
        <>
          <VStack gap="4rem">
            <Text fontSize="1.6rem">
              A link to reset your password has been sent to{" "}
              <Text as="b">{emailValue}</Text>
            </Text>
            <Button minW="8rem" variant="brand" onClick={handleSuccess}>
              Ok
            </Button>
          </VStack>
        </>
      ) : (
        <Box
          onSubmit={handleEmailCheck}
          as="form"
          display="flex"
          flexDir="column"
          gap="1.6rem"
          minH="30dvh"
        >
          <Text fontSize="1.6rem">
            Enter the email address associated with your account, and we&apos;ll
            email you a link to reset your password.
          </Text>
          <Box>
            <Input
              {...getErrorPropsV1(error)}
              variant="filled"
              placeholder="Email"
              type="email"
              name="email"
              value={emailValue}
              onChange={(e) => {
                setEmailValue(e.target.value)
                setError("")
              }}
            />
            {error && <ErrorText>{error}</ErrorText>}
          </Box>
          <FormSubmitButton
            variant="brand"
            cursor="pointer"
            py="1.3rem"
            mt="auto"
            fontSize="1.6rem"
            fontWeight="600"
            isLoading={isSubmiting}
            type="submit"
            loadingText="Please wait"
          >
            Send reset link
          </FormSubmitButton>
        </Box>
      )}
    </>
  )
}
