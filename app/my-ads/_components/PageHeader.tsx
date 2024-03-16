"use client"
import {
  Button,
  Flex,
  Heading,
  Link,
  Text,
} from "@chakra-ui/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"

function Tab({
  onClick,
  isActivated,
  name,
}: {
  onClick: () => void
  isActivated: boolean
  name: string
}) {
  return (
    <Text
      onClick={onClick}
      color={isActivated ? "black" : "gray.main"}
      borderBottom=".3rem solid"
      borderBottomColor={isActivated ? "black" : "transparent"}
      pb="1rem"
      textDecor="none"
      _hover={{ textDecor: "none", color: "black" }}
      as="button"
    >
      {name}
    </Text>
  )
}
export default function MyAdsHeader() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentDisplay, setCurrentDisplay] = useState<
    "active" | "drafts" | "deactivated"
  >((searchParams.get("filter") as any) || "active")

  const toggleDisplay = useCallback((newDisplay: typeof currentDisplay) => {
    setCurrentDisplay(newDisplay)
    router.push(`/my-ads?filter=${newDisplay}`)
  }, [router])

  return (
    <Flex
      position="sticky"
      top="6rem"
      px={{ base: "4%", md: "10.5%" }}
      h="19rem"
      justifyContent="start"
      alignItems="center"
      zIndex="10"
      bg="white.400"
    >
      <Heading variant="md" textTransform="capitalize">
        {currentDisplay}
      </Heading>
      <Button
        as={Link}
        href="/my-ads?new=true"
        variant="brand-secondary"
        minW={{ md: "18.5rem" }}
        ml="auto"
      >
        Create ad
      </Button>
      <Flex
        fontSize={{ base: "1.6rem", lg: "2.4rem" }}
        lineHeight="normal"
        gap="2rem"
        mt="auto"
        position="absolute"
        bottom="0"
        alignItems="end"
      >
        <Tab
          onClick={() => toggleDisplay("active")}
          isActivated={currentDisplay === "active"}
          name={"Active"}
        />
        <Tab
          onClick={() => toggleDisplay("drafts")}
          isActivated={currentDisplay === "drafts"}
          name={"Drafts"}
        />
        <Tab
          onClick={() => toggleDisplay("deactivated")}
          isActivated={currentDisplay === "deactivated"}
          name={"Deactivated"}
        />
      </Flex>
    </Flex>
  )
}
