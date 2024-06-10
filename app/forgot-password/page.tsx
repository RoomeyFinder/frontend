"use client"
import AuthFormLayout from "../_components/Auth/AuthFormLayout"
import { useCallback, useState } from "react"
import useAxios from "../_hooks/useAxios"
import ResetPasswordForm from "./_Form"
import toast from "react-hot-toast"
import { validateEmail } from "../_utils"
import { Button, Heading, Text, VStack } from "@chakra-ui/react"

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [hasSentLink, setHasSentLink] = useState(false)
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const { fetchData } = useAxios()
  const handleSubmit = useCallback(async () => {
    if (!email) return setError("This field is required")
    if (!validateEmail(email)) return setError("Invalid email address")
    setLoading(true)
    const res = await fetchData({
      url: "/users/forgot-password",
      body: {
        email,
      },
      method: "post",
    })
    if (res.statusCode === 200) {
      setHasSentLink(true)
    } else toast.error("Something went wrong")
    setLoading(false)
  }, [fetchData, email])

  if (hasSentLink && email)
    return (
      <>
        <VStack
          bgImage="url(/images/password-reset-email-sent.svg)"
          bgSize="30dvmax"
          bgRepeat="no-repeat"
          bgPos={{ base: "top", sm: "right" }}
          gap="1.5rem"
          alignItems={{ base: "center", sm: "start" }}
          justifyContent={{ base: "end", sm: "center" }}
          w="80dvw"
          maxW="88rem"
          mx="auto"
          minH="50dvh"
        >
          <Heading as="h1" w="max-content" size="base" variant="700">
            Password reset link sent
          </Heading>
          <Text
            fontSize="1.6rem"
            textAlign={{ base: "center", sm: "left" }}
            maxW="30rem"
          >
            A link to reset your password has been sent to{" "}
            <Text as="b">{email}</Text>
          </Text>
          <Button
            mt="1.5rem"
            minW="8rem"
            variant="brand"
            as="a"
            href="mailto:"
            target="_blank"
          >
            Open email
          </Button>
        </VStack>
      </>
    )

  return (
    <>
      <AuthFormLayout
        loading={loading}
        submitButtonType="submit"
        handleSubmit={handleSubmit}
        heading="Forgot Password?"
        submitButtonText="Send reset link"
        showAuthProviderMethods={false}
        submitButtonProps={{
          mr: "auto",
          ml: "0",
        }}
      >
        <ResetPasswordForm
          handleChange={(e) => {
            setError("")
            setEmail(e.target.value)
          }}
          email={email}
          error={error}
        />
      </AuthFormLayout>
    </>
  )
}
