"use client"
import AuthFormLayout from "../_components/Auth/AuthFormLayout"
import { useCallback, useContext, useState } from "react"
import useAxios, { RequestBody } from "../_hooks/useAxios"
import { useRouter, useSearchParams } from "next/navigation"
import ResetPasswordForm from "./_Form"
import toast from "react-hot-toast"
import { isStrongPassword } from "../_utils"
import { Button, Heading, Text, VStack } from "@chakra-ui/react"
import { AuthModalContext } from "../_providers/AuthModalProvider"

export default function Login() {
  const router = useRouter()
  const { open: openAuthModal } = useContext(AuthModalContext)
  const searchParams = useSearchParams()
  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<{
    confirmPassword: string
    password: string
  }>({
    confirmPassword: "",
    password: "",
  })
  const [passwordResetData, setPasswordResetData] = useState<{
    confirmPassword: string
    password: string
  }>({
    confirmPassword: "",
    password: "",
  })
  const { fetchData } = useAxios()

  const handleSubmit = useCallback(async () => {
    if (!passwordResetData.password)
      return setError((prev) => ({
        ...prev,
        password: "This field is required!",
      }))
    if (!isStrongPassword(passwordResetData.password))
      return setError((prev) => ({
        ...prev,
        password:
          "Your password must be minimum of 8 characters. Combine numbers, upper and lowercase letters, and special symbols",
      }))
    if (!passwordResetData.confirmPassword)
      return setError((prev) => ({
        ...prev,
        confirmPassword: "This field is required!",
      }))
    if (passwordResetData.confirmPassword !== passwordResetData.password)
      return setError((prev) => ({
        ...prev,
        confirmPassword: "Passwords must match",
      }))
    setLoading(true)
    const res = await fetchData({
      url: "/users/reset-password",
      body: {
        password: passwordResetData.password,
        code: searchParams.get("code"),
        userId: searchParams.get("user_id"),
      } as RequestBody,
      method: "post",
    })
    if (res.statusCode === 200) {
      setPasswordResetSuccess(true)
    } else
      toast.error(res.message || "Something went wrong", { duration: 5000 })
    setLoading(false)
  }, [fetchData, passwordResetData, searchParams])

  if (passwordResetSuccess)
    return (
      <VStack
        bgImage="url(/images/password-reset-done.svg)"
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
        <Heading as="h1" w="max-content" fontSize="2.8rem" variant="700">
          Password reset
        </Heading>
        <Text
          fontSize="1.6rem"
          textAlign={{ base: "center", sm: "left" }}
          maxW="30rem"
        >
          Password reset successfully!
        </Text>
        <Button
          mt="1.5rem"
          minW="8rem"
          variant="brand"
          onClick={() => {
            router.push("/")
            openAuthModal()
          }}
        >
          Login
        </Button>
      </VStack>
    )

  return (
    <>
      <AuthFormLayout
        loading={loading}
        submitButtonType="submit"
        handleSubmit={handleSubmit}
        heading="Reset Password"
        submitButtonText="Reset Password"
        showAuthProviderMethods={false}
        submitButtonProps={{
          mr: "auto",
          ml: "0",
        }}
      >
        <ResetPasswordForm
          handleChange={(e) => {
            setError((prev) => ({ ...prev, [e.target.name]: "" }))
            setPasswordResetData((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }}
          passwordResetData={passwordResetData}
          error={error}
        />
      </AuthFormLayout>
    </>
  )
}
