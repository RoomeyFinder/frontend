"use client"
import { Heading, Box, Text, Link, Button, Flex } from "@chakra-ui/react"
import { ReactNode } from "react"
import AuthProviderMethods from "./AuthProviderMethods"

const modeTexts = {
  "signin": {prompt: "New to Roomeyfinder?", link: "signup", linkText: "Create Account"},
  "signup": {prompt: "Already have an account?", link: "/login", linkText: "Sign In"}
}

export default function AuthFormLayout({ 
  children, submitButtonText, mode, heading, handleSubmit, submitButtonType, submitButtonVariant
}: {
  children: ReactNode | ReactNode[]
  submitButtonText: string
  mode: "signin" | "signup"
  heading: string
  handleSubmit: () => void,
  submitButtonType?: "button" | "submit" | "reset" 
  submitButtonVariant?: string
}){
  return (
    <>
      <Box as="main" w="93dvw" maxW="85.9rem" mx="auto">
        <Heading as="h1" w="max-content" mb="1rem" lineHeight="normal">{heading}</Heading>
        <Flex as="p" gap="1rem" alignItems="center">
          <Text as="span" fontSize="1.6rem" lineHeight="150%">{modeTexts[mode].prompt} </Text>
          <Text 
            as={Link} 
            href={modeTexts[mode].link} 
            fontSize="1.4rem" color="gray.100" 
            textTransform="uppercase" 
            fontWeight="700"
            transition="all 250ms ease"
            _hover={{ color: "gray.300" }}>
            {modeTexts[mode].linkText}
          </Text>
        </Flex>
        <Box>{children}</Box>
        <Flex justifyContent="space-between" alignItems={{ base: "stretch", md: "end" }} gap="2rem" flexDir={{ base: "column-reverse", sm: "row"}}>
          <Flex flexDir="column" justifyContent="start" gap="1rem" alignSelf={{ base: "center", sm: "end"}}>
            <Text fontSize="1rem" fontWeight="normal" lineHeight="normal" textTransform="uppercase">or sign in with</Text>
            <AuthProviderMethods />
          </Flex>
          <Button onClick={() => handleSubmit()} textTransform="capitalize" type={submitButtonType} variant={{ base: submitButtonVariant || "brand", sm: submitButtonVariant || "brand-secondary" }} minW={{ md: "19.8rem" }} lineHeight="150%" padding={{ base: "1.5rem 2rem", md: "1.5rem 2rem" }}>{submitButtonText}</Button>
        </Flex>
      </Box> 
    </>
  )
}