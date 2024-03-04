"use client"
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useMemo, useState } from "react"

function Tab({
  onClick,
  isActive,
  href,
  name,
}: {
  onClick: () => void
  isActive: boolean
  href: string
  name: string
}) {
  return (
    <Text
      as={Link}
      href={href}
      onClick={onClick}
      color={isActive ? "black" : "gray.main"}
      borderBottom=".3rem solid"
      borderBottomColor={isActive ? "black" : "transparent"}
      pb="1rem"
      textDecor="none"
      _hover={{ textDecor: "none" }}
    >
      {name}
    </Text>
  )
}
export default function MyAdsHeader() {
  const searchParams = useSearchParams()
  const [currentDisplay, setCurrentDisplay] = useState<
    "active" | "drafts" | "deactivated"
  >((searchParams.get("filter") as any) || "active")

  const toggleDisplay = useCallback((newDisplay: typeof currentDisplay) => {
    setCurrentDisplay(newDisplay)
  }, [])

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
      <Button as={Link} href="/my-ads?new=true" variant="brand-secondary" minW={{ md: "18.5rem"}} ml="auto">
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
          href="/my-ads?filter=active"
          onClick={() => toggleDisplay("active")}
          isActive={currentDisplay === "active"}
          name={`Active`}
        />
        <Tab
          href="/my-ads?filter=drafts"
          onClick={() => toggleDisplay("drafts")}
          isActive={currentDisplay === "drafts"}
          name={`Drafts`}
        />
        <Tab
          href="/my-ads?filter=deactivated"
          onClick={() => toggleDisplay("deactivated")}
          isActive={currentDisplay === "deactivated"}
          name={`Deactivated`}
        />
      </Flex>
    </Flex>
  )
}
