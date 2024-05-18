"use client"
import { Heading, Box, Text, Link, Button, Flex } from "@chakra-ui/react"
import { ReactNode, useContext, useEffect, useMemo } from "react"
// import AuthProviderMethods from "./AuthProviderMethods"
import { useSearchParams } from "next/navigation"
import { AuthContext } from "@/app/_providers/AuthContext"
import AuthProviderMethods from "./AuthProviderMethods"
import RightArrow from "@/app/_assets/SVG/RightArrow"

const modeTexts = {
  signin: {
    prompt: "New to Roomeyfinder?",
    link: "signup",
    linkText: "Create Account",
  },
  signup: {
    prompt: "Already have an account?",
    link: "/login",
    linkText: "Sign In",
  },
}

export default function AuthFormLayout({
  children,
  submitButtonText,
  mode,
  heading,
  handleSubmit,
  submitButtonType,
  submitButtonVariant,
  loading,
  showBackButton = false,
  handleBackButtonClick,
  showAuthProviderMethods,
}: {
  children: ReactNode | ReactNode[]
  submitButtonText: string
  mode: "signin" | "signup"
  heading: string
  handleSubmit: () => void
  submitButtonType?: "button" | "submit" | "reset"
  submitButtonVariant?: string
  loading?: boolean
  showBackButton?: boolean
  handleBackButtonClick?: () => void
  showAuthProviderMethods?: boolean
}) {
  const { isAuthorized, loading: loadingAuthState } = useContext(AuthContext)

  const searchParams = useSearchParams()
  const nextRoute = useMemo(() => searchParams.get("next"), [searchParams])

  useEffect(() => {
    if (isAuthorized && !loadingAuthState)
      window.location.replace(nextRoute || "/")
  }, [isAuthorized, nextRoute, loadingAuthState])

  return (
    <Box as="main">
      <Box
        w="85dvw"
        maxW="85.9rem"
        mx="auto"
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit()
        }}
      >
        <Heading as="h1" w="max-content" mb="1rem" size="base" variant="700">
          {heading}
        </Heading>
        <Flex as="p" gap="1rem" alignItems="center">
          <Text as="span" fontSize="1.6rem" lineHeight="150%">
            {modeTexts[mode].prompt}{" "}
          </Text>
          <Text
            as={Link}
            href={modeTexts[mode].link}
            fontSize="1.4rem"
            color="gray.100"
            textTransform="uppercase"
            fontWeight="700"
            transition="all 250ms ease"
            _hover={{ color: "gray.300" }}
          >
            {modeTexts[mode].linkText}
          </Text>
        </Flex>
        <Box>{children}</Box>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          gap="2rem"
          // flexDir={{ base: "column-reverse", sm: "row" }}
        >
          {showBackButton && (
            <Button
              type="button"
              variant="brand-secondary"
              bg="transparent"
              onClick={handleBackButtonClick}
              isDisabled={loading}
              _disabled={{
                opacity: ".3",
                cursor: "not-allowed",
              }}
            >
              <Text as="span" display="block" transform="rotate(180deg)">
                <RightArrow />{" "}
              </Text>
              Back
            </Button>
          )}
          {showAuthProviderMethods && (
            <Flex
              flexDir="column"
              justifyContent="start"
              gap="1rem"
              alignSelf={{ base: "center", sm: "end" }}
            >
              <Text
                fontSize="1rem"
                fontWeight="normal"
                lineHeight="normal"
                textTransform="uppercase"
              >
                or sign in with
              </Text>
              <AuthProviderMethods />
            </Flex>
          )}
          <Button
            ml="auto"
            onClick={() => handleSubmit()}
            _loading={{
              bg: "brand.main",
              color: "white",
              _hover: { bg: "brand.main", color: "white" },
            }}
            isLoading={loading}
            textTransform="capitalize"
            type={submitButtonType}
            variant={{
              base: submitButtonVariant || "brand",
              sm: submitButtonVariant || "brand-secondary",
            }}
            w="50%"
            maxW={{ md: "19.8rem" }}
            lineHeight="150%"
            padding={{ base: "1.5rem 2rem", md: "1.5rem 2rem" }}
          >
            {submitButtonText}
          </Button>
        </Flex>
      </Box>
    </Box>
  )
}

/*<Flex
              flexDir="column"
              justifyContent="start"
              gap="1rem"
              alignSelf={{ base: "center", sm: "end" }}
            >
              <Text
                fontSize="1rem"
                fontWeight="normal"
                lineHeight="normal"
                textTransform="uppercase"
              >
                or sign in with
              </Text>
              <AuthProviderMethods />
            </Flex>*/
