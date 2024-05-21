import useAxios from "@/app/_hooks/useAxios"
import { Box, Button, Text, VStack } from "@chakra-ui/react"
import { FormEventHandler, useCallback, useState } from "react"
import ErrorText from "./ErrorText"
import { getErrorPropsV1 } from "@/app/signup/utils"
import AuthPasswordInput from "./AuthPasswordInput"

export default function PasswordForm({
  email,
  handleForgotPasswordClick,
}: {
  email: string
  handleForgotPasswordClick: () => void
}) {
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
          email,
          password,
        },
      })
      console.log(res)
      if (res.statusCode === 200) {
      } else setError("Something went wrong!")
      setError("")
      setIsSubmitting(false)
    },
    [fetchData, email, password]
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
        <Button
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
        </Button>
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
