import { Box, Flex, Input } from "@chakra-ui/react"
import CustomCheckbox from "../_components/CustomCheckbox"



export default function LoginForm(){
  return (
    <Box pt={{ base: "1.6rem", md: "2rem" }} pb={{ base: "3.5rem", md: "5rem" }}>
      <Flex as="form" gap="3rem" flexWrap={{ base: "wrap", sm: "nowrap" }} mb="1.5rem">
        <Input variant="filled" name="email" autoComplete="email" required type="text" placeholder="Email Address *" />
        <Input variant="filled" name="password" autoComplete="password" required type="password" placeholder="Password *" />
      </Flex>
      <CustomCheckbox labelProps={{ lineHeight: "normal", color:"gray.main", fontSize: "1.6rem", }}>
        Keep me signed in on this device.
      </CustomCheckbox>
    </Box>
  )
}