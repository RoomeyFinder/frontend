"use client"
import LoginForm from "./_Form"
import AuthFormLayout from "../_components/Auth/AuthFormLayout"
import { ChangeEventHandler, useCallback, useState } from "react"
import useAxios, { RequestBody } from "../_hooks/useAxios"
import { HStack, VStack, useToast } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "../_redux"
import { authenticate } from "../_redux/slices/auth.slice"
import FacebookSSOButton from "../_components/Auth/FacebookSSOButton"
import GoogleSSOButton from "../_components/Auth/GoogleSSOButton"
import { DividerWithCenteredText } from "../_components/PremiumModal"

export default function LoginClient() {
  const router = useRouter()
  const toast = useToast({
    containerStyle: { fontSize: "1.6rem", color: "white" },
    position: "top",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string[]>([])
  const [loginData, setLoginData] = useState<{
    email: string
    password: string
    keepSignedIn: boolean
  }>({
    email: "",
    password: "",
    keepSignedIn: false,
  })
  const { fetchData } = useAxios()

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const value =
        e.target.type === "checkbox" ? e.target.checked : e.target.value
      setLoginData((prev) => ({ ...prev, [e.target.name]: value }))
    },
    []
  )
  const dispatch = useAppDispatch()
  const handleSubmit = useCallback(async () => {
    const invalids = ["email", "password"].filter(
      (it) => Boolean(loginData[it as keyof typeof loginData]) === false
    )
    if (invalids.length > 0) {
      setError(invalids)
      return
    }
    setLoading(true)
    const res = await fetchData({
      url: "/users/login",
      body: { ...loginData, emailOrUserName: loginData.email } as RequestBody,
      method: "post",
    })
    if (res.statusCode === 302) {
      sessionStorage.setItem("unverifiedEmail", loginData.email)
      router.push("/signup")
    } else if (res.statusCode === 200) {
      dispatch(
        authenticate({
          user: res.user,
          token: res.token,
        })
      )
      // if (loginData.keepSignedIn) {
      //   updateToken(res.token, false)
      //   updateUser(res.user, false)
      // } else {
      //   updateToken(res.token, true)
      //   updateUser(res.user, true)
      // }
      toast({ status: "success", description: "You are signed in" })
    } else
      toast({
        status: "error",
        description: res.message || "Something went wrong",
      })
    setLoading(false)
  }, [fetchData, loginData, toast, dispatch, router])

  return (
    <>
      <AuthFormLayout
        loading={loading}
        handleSubmit={handleSubmit}
        heading="Sign In"
        mode="signin"
        submitButtonText="continue"
        showAuthProviderMethods={false}
      >
        <LoginForm
          error={error}
          handleChange={handleChange}
          loginData={loginData}
        />
      </AuthFormLayout>
      <VStack maxW="90rem" gap="2rem" mx="auto" alignItems="start" mt="3rem">
        <DividerWithCenteredText
          maxW="50rem"
          my="1rem"
          mx="auto"
          text="Continue with"
        />
        <HStack
          w="full"
          rowGap="2rem"
          columnGap="2rem"
          alignItems="center"
          flexWrap="wrap"
          px="1rem"
          display={{ base: "flex", sm: "grid"}}
          gridTemplateColumns="repeat(2, 1fr)"
        >
          <GoogleSSOButton />
          <FacebookSSOButton />
        </HStack>
      </VStack>
    </>
  )
}
