import useAxios from "@/app/_hooks/useAxios"
import { Box, Text, VStack } from "@chakra-ui/react"
import { FormEventHandler, useCallback, useState } from "react"
import ErrorText from "./ErrorText"
import { getErrorPropsV1 } from "@/app/signup/utils"
import AuthPasswordInput from "./AuthPasswordInput"
import { FormSubmitButton } from "./SignupInputs"
import { useAppDispatch } from "@/app/_redux"
import { authenticate } from "@/app/_redux/slices/auth.slice"

export default function PasswordForm({
  email,
  handleForgotPasswordClick,
  handleUnverifiedEmail,
  handleSuccess,
}: {
  email: string
  handleForgotPasswordClick: () => void
  handleUnverifiedEmail: () => void
  handleSuccess: () => void
}) {
  const dispatch = useAppDispatch()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmiting, setIsSubmitting] = useState(false)
  const { fetchData } = useAxios()

  const handleEmailCheck: FormEventHandler = useCallback(
    async (e) => {
      e.preventDefault()
      if (password.length === 0) return setError("This field is required!")
      setIsSubmitting(true)
      const res = await fetchData({
        url: "/users/login",
        method: "post",
        body: {
          emailOrUserName: email,
          password,
        },
      })
      if (res.statusCode === 200) {
        // updateUser(res.user)
        // updateToken(res.token)
        dispatch(
          authenticate({
            user: res.user,
            token: res.token,
          })
        )
        handleSuccess()
        setError("")
      } else if (res.statusCode === 302) {
        handleUnverifiedEmail()
      } else setError(res.message || "Something went wrong!")
      setIsSubmitting(false)
    },
    [
      fetchData,
      email,
      password,
      handleSuccess,
      dispatch,
      handleUnverifiedEmail,
    ]
  )
  return (
    <VStack w="100%" pb="10rem" alignItems="start">
      <Box
        onSubmit={handleEmailCheck}
        as="form"
        display="flex"
        flexDir="column"
        gap="1.6rem"
        w="100%"
      >
        <Box>
          <AuthPasswordInput
            {...getErrorPropsV1(error)}
            variant="filled"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError("")
            }}
          />
          {error && <ErrorText>{error}</ErrorText>}
        </Box>
        <FormSubmitButton
          variant="brand"
          cursor="pointer"
          py="1.3rem"
          fontSize="1.6rem"
          fontWeight="600"
          isLoading={isSubmiting}
          type="submit"
          loadingText="Please wait"
        >
          Login
        </FormSubmitButton>
      </Box>
      <Text
        onClick={handleForgotPasswordClick}
        as="button"
        textDecor="underline"
        fontWeight="600"
        fontSize="1.4rem"
        mt="1.8rem"
        mb=".1rem"
      >
        Forgot Password?
      </Text>
    </VStack>
  )
}
