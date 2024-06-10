import { Box, Flex, Text } from "@chakra-ui/react"
import { ChangeEventHandler } from "react"
import { getErrorPropsV1 } from "../signup/utils"
import AuthPasswordInput from "../_components/Auth/AuthPasswordInput"
import ErrorText from "../_components/Auth/ErrorText"
import { useRouter } from "next/navigation"

export default function ResetPasswordForm({
  handleChange,
  passwordResetData,
  error,
}: {
  handleChange: ChangeEventHandler<HTMLInputElement>
  passwordResetData: { password: string; confirmPassword: string }
  error: { password: string; confirmPassword: string }
}) {
  const router = useRouter()
  return (
    <Box
      pt={{ base: "1.6rem", md: "2rem" }}
      pb={{ base: "3.5rem", md: "5rem" }}
    >
      <Flex gap="3rem" flexWrap={{ base: "wrap", sm: "nowrap" }} mb="1.5rem">
        <Box w="full">
          <AuthPasswordInput
            variant="filled"
            {...getErrorPropsV1(error.password)}
            type="password"
            name="password"
            value={passwordResetData.password}
            onChange={handleChange}
            isRequired
            placeholder="Password*"
          />
          {error.password && <ErrorText>{error.password}</ErrorText>}
        </Box>
        <Box w="full">
          <AuthPasswordInput
            variant="filled"
            {...getErrorPropsV1(error.confirmPassword)}
            type="password"
            name="confirmPassword"
            value={passwordResetData.confirmPassword}
            onChange={handleChange}
            isRequired
            placeholder="Confirm Password *"
          />
          {error.confirmPassword && (
            <ErrorText>{error.confirmPassword}</ErrorText>
          )}
        </Box>
      </Flex>
      <Text
        fontSize="1.6rem"
        textDecor="underline"
        as="button"
        type="button"
        fontWeight="500"
        textUnderlineOffset=".2rem"
        onClick={() => router.push("/forgot-password")}
      >Resend link</Text>
    </Box>
  )
}
