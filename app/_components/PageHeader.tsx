"use client"
import { Flex, Heading, Text } from "@chakra-ui/react"
import { useRouter, useSearchParams } from "next/navigation"
import { ReactNode, useCallback, useState } from "react"

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
      textTransform="capitalize"
    >
      {name}
    </Text>
  )
}
export default function MyAdsHeader({
  pathname,
  filters,
  children,
  isDisplayDynamic,
  heading,
  background,
}: {
  pathname: string
  filters: string[] | { displayText: string; filterText: string }[]
  children?: ReactNode | ReactNode[]
  isDisplayDynamic?: boolean
  heading?: string
  background?: string
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentDisplay, setCurrentDisplay] = useState<string>(
    (searchParams.get("filter") as any) || (filters[0] as any).filterText || filters[0]
  )

  const toggleDisplay = useCallback(
    (newDisplay: typeof currentDisplay) => {
      setCurrentDisplay(newDisplay)
      router.push(`${pathname}?filter=${newDisplay}`)
    },
    [router, pathname]
  )

  return (
    <Flex
      position="sticky"
      top="6rem"
      px={{ base: "4%", md: "10.5%" }}
      h="19rem"
      justifyContent="start"
      alignItems="center"
      zIndex="12"
      bg={background || "white.400"}
    >
      <Heading variant="md" textTransform="capitalize">
        {isDisplayDynamic ? currentDisplay : heading}
      </Heading>
      {children}
      <Flex
        fontSize={{ base: "1.6rem", lg: "2.4rem" }}
        lineHeight="normal"
        gap="2rem"
        mt="auto"
        position="absolute"
        bottom="0"
        alignItems="end"
      >
        {filters.map((filter, idx) => (
          <Tab
            key={(filter as any).displayText || filter}
            onClick={() => toggleDisplay((filter as any).filterText || filter)}
            isActivated={
              currentDisplay === (filter as any).filterText ||
              currentDisplay === filter ||
              (!currentDisplay && idx === 0)
            }
            name={(filter as any).displayText || filter}
          />
        ))}
      </Flex>
    </Flex>
  )
}
