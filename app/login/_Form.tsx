import { Box, Flex, Input, Link, Text } from "@chakra-ui/react"
import CustomCheckbox from "../_components/CustomCheckbox"
import { ChangeEventHandler } from "react"
import { getErrorProps } from "../signup/utils"
import AuthPasswordInput from "../_components/Auth/AuthPasswordInput"

export default function LoginForm({
  handleChange,
  loginData,
  error,
}: {
  handleChange: ChangeEventHandler<HTMLInputElement>
  loginData: { email: string; password: string; keepSignedIn: boolean }
  error: string[]
}) {
  return (
    <Box
      pt={{ base: "1.6rem", md: "2rem" }}
      pb={{ base: "3.5rem", md: "5rem" }}
    >
      <Flex gap="3rem" flexWrap={{ base: "wrap", sm: "nowrap" }} mb="1.5rem">
        <Input
          variant="filled"
          {...getErrorProps("email", error)}
          type="email"
          name="email"
          value={loginData.email}
          onChange={handleChange}
          autoComplete="email"
          required
          placeholder="Email Address *"
        />
        <AuthPasswordInput
          variant="filled"
          {...getErrorProps("password", error)}
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
          autoComplete="password"
          isRequired
          placeholder="Password *"
        />
      </Flex>
      <Flex
        flexDir={{ base: "column", sm: "row" }}
        mt="1.8rem"
        alignItems="start"
        gap="1.8rem"
        justifyContent="space-between"
      >
        <CustomCheckbox
          name="keepSignedIn"
          labelProps={{
            lineHeight: "normal",
            color: "gray.main",
            fontSize: "1.6rem",
          }}
          value={loginData.keepSignedIn}
          onChange={handleChange}
        >
          Keep me signed in on this device.
        </CustomCheckbox>
        <Text
          as={Link}
          href="/forgot-password"
          fontSize="1.6rem"
          fontWeight="500"
          textDecor="underline"
          textUnderlineOffset=".2rem"
          color="Forgot password?"
        >
          Forgot password?
        </Text>
      </Flex>
    </Box>
  )
}
