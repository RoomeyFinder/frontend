import EyeIcon, { EyeSlash, PasswordEye } from "@/app/_assets/SVG/EyeIcon"
import { Box, Input, InputProps, Text } from "@chakra-ui/react"
import { useState } from "react"

export default function AuthPasswordInput(props: InputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Box as="label" pos="relative" w="100%">
      <Input {...props} type={showPassword ? "text" : "password"} />
      <Text
        onClick={() => setShowPassword((prev) => !prev)}
        as="button"
        type="button"
        pos="absolute"
        top="50%"
        transform="translateY(-50%)"
        right="2rem"
        opacity=".4"
      >
        {showPassword ? <EyeSlash/> : <PasswordEye />}
      </Text>
    </Box>
  )
}
