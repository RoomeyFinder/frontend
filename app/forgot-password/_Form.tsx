import { Box, Flex, Input } from "@chakra-ui/react"
import { ChangeEventHandler } from "react"
import { getErrorPropsV1 } from "../signup/utils"
import ErrorText from "../_components/Auth/ErrorText"

export default function ResetPasswordForm({
  handleChange,
  email,
  error,
}: {
  handleChange: ChangeEventHandler<HTMLInputElement>
  email: string
  error: string
}) {
  return (
    <Box
      pt={{ base: "1.6rem", md: "2rem" }}
      pb={{ base: "3.5rem", md: "5rem" }}
      maxW="60rem"
    >
      <Flex gap="3rem" flexWrap={{ base: "wrap", sm: "nowrap" }} mb="1.5rem">
        <Box w="full">
          <Input
            variant="filled"
            {...getErrorPropsV1(error)}
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            autoComplete="email"
            placeholder="Email*"
          />
          {error && <ErrorText>{error}</ErrorText>}
        </Box>
      </Flex>
    </Box>
  )
}
