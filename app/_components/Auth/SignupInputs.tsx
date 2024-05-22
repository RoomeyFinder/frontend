import DownChevron from "@/app/_assets/SVG/DownChevron"
import { getErrorPropsV1 } from "@/app/signup/utils"
import {
  Box,
  Button,
  ButtonProps,
  Input,
  InputProps,
  Select,
  Text,
} from "@chakra-ui/react"
import ErrorText from "./ErrorText"
import AuthPasswordInput from "./AuthPasswordInput"

type SignupInputProps = InputProps & {
  error: string
}

export function GenderInput({
  value,
  onChange,
  error,
  ...inputProps
}: SignupInputProps) {
  return (
    <Box w="100%">
      <Input
        {...getErrorPropsV1(error)}
        variant="filled"
        color={value ? "black" : "gray.100"}
        placeholder="Gender"
        min={4}
        name="gender"
        value={value}
        as={Select}
        onChange={onChange}
        _focusVisible={{
          outline: "none",
          boxShadow: "none",
        }}
        icon={<DownChevron />}
        {...inputProps}
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="nil">Prefer not to say</option>
      </Input>
      {error && <ErrorText>{error}</ErrorText>}
    </Box>
  )
}

export function FirstNameInput({
  error,
  value,
  onChange,
  ...inputProps
}: SignupInputProps) {
  return (
    <Box w="100%">
      <Input
        {...getErrorPropsV1(error)}
        variant="filled"
        placeholder="First name"
        type="text"
        name="firstName"
        value={value}
        onChange={onChange}
        {...inputProps}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </Box>
  )
}
export function LastNameInput({
  error,
  value,
  onChange,
  ...inputProps
}: SignupInputProps) {
  return (
    <Box w="100%">
      <Input
        {...getErrorPropsV1(error)}
        variant="filled"
        placeholder="Last name"
        type="text"
        name="lastName"
        value={value}
        onChange={onChange}
        {...inputProps}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </Box>
  )
}
export function EmailInput({
  error,
  value,
  onChange,
  ...inputProps
}: SignupInputProps) {
  return (
    <Box w="100%">
      <Input
        {...getErrorPropsV1(error)}
        variant="filled"
        placeholder="Email"
        type="email"
        name="email"
        value={value}
        onChange={onChange}
        {...inputProps}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </Box>
  )
}
export function DobInput({
  error,
  value,
  onChange,
  ...inputProps
}: SignupInputProps) {
  return (
    <Box w="100%" pos="relative">
      <Input
        {...getErrorPropsV1(error)}
        color={value ? "black" : "gray.100"}
        zIndex="2"
        variant="filled"
        placeholder="Date of birth *"
        name="dob"
        type="date"
        height="5.4rem"
        value={value}
        onChange={onChange}
        {...inputProps}
      />
      {!value && (
        <Text
          pos="absolute"
          top="50%"
          left="2rem"
          transform="translateY(-50%)"
          fontSize="1.4rem"
          color="gray.100"
          display={{ base: value ? "none" : "block", md: "none" }}
          zIndex="300"
        >
          Date of birth *
        </Text>
      )}
      {error && <ErrorText>{error}</ErrorText>}
    </Box>
  )
}

export function PasswordInput({
  error,
  value,
  onChange,
  ...inputProps
}: SignupInputProps) {
  return (
    <Box w="100%">
      <AuthPasswordInput
        {...getErrorPropsV1(error)}
        variant="filled"
        placeholder="Password"
        type="password"
        name="password"
        value={value}
        onChange={onChange}
        {...inputProps}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </Box>
  )
}

export function FormSubmitButton(props: ButtonProps) {
  return (
    <Button
      variant="brand"
      cursor="pointer"
      py="1.3rem"
      fontSize="1.6rem"
      fontWeight="600"
      type="submit"
      loadingText="Please wait"
      _loading={{
        bg: "brand.50"
      }}
      {...props}
    >
      {props.children || <>Agree and continue</>}
    </Button>
  )
}
