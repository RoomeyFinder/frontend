import useAxios from "@/app/_hooks/useAxios"
import { Box, Input } from "@chakra-ui/react"
import { FormEventHandler, useCallback, useState } from "react"
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
export default function EmailCheckForm({
  handleStatus,
}: {
  handleStatus: (response: AccountCheckResponse) => void
}) {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isSubmiting, setIsSubmitting] = useState(false)
  const { fetchData } = useAxios()

  const handleEmailCheck: FormEventHandler = useCallback(
    async (e) => {
      e.preventDefault()
      if (email.length === 0) return setError("Please provide an email!")
      if (!validateEmail(email)) return setError("Email address is invalid!")
      setIsSubmitting(true)
      const res = await fetchData({
        url: "/users/find-account",
        method: "post",
        body: {
          email,
        },
      })
      if (res.statusCode === 200) {
        setEmail("")
        handleStatus(res)
      } else setError("Something went wrong!")
      setError("")
      setIsSubmitting(false)
    },
    [fetchData, handleStatus, email]
  )
  return (
    <>
      <Box
        onSubmit={handleEmailCheck}
        as="form"
        display="flex"
        flexDir="column"
        gap="1.6rem"
      >
        <Box>
          <Input
            {...getErrorPropsV1(error)}
            variant="filled"
            placeholder="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
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
          Continue
        </FormSubmitButton>
      </Box>
    </>
  )
}
