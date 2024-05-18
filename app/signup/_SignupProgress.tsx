import { Flex, Text, Progress, VStack } from "@chakra-ui/react"
import { ReactNode } from "react"

const progressProps = {
  size: "sm",
  colorScheme: "brand",
  bg: "brand.10",
  max: 100,
  flexGrow: "1",
  flexShrink: "0",
  h: ".3rem",
  transition: "all 500ms linear",
}

export default function SignupProgress({
  progressOnePercentage,
  progressTwoPercentage,
  currentStage,
}: {
  progressOnePercentage: number
  progressTwoPercentage: number
  currentStage: number
}) {
  return (
    <Flex
      alignItems="center"
      pt={{ base: "2rem", md: "3.4rem" }}
      pb={{ base: "1.6rem", md: "3rem" }}
      w="full"
      px={{ base: "1.5rem", md: "0" }}
    >
      <ProgressHeading isActive={currentStage >= 0} heading={"Personal Info"}>
        1
      </ProgressHeading>
      <Progress value={progressOnePercentage} {...progressProps} />
      <ProgressHeading isActive={currentStage >= 1} heading={"Contact Info"}>
        2
      </ProgressHeading>
      <Progress value={progressTwoPercentage} {...progressProps} />
      <ProgressHeading isActive={currentStage >= 2} heading={"Verify email"}>
        3
      </ProgressHeading>
    </Flex>
  )
}

function ProgressHeading({
  children,
  isActive,
  heading,
}: {
  children: ReactNode | ReactNode[]
  isActive?: boolean
  heading?: ReactNode | ReactNode[]
}) {
  return (
    <VStack pos="relative">
      <Text
        whiteSpace="nowrap"
        fontSize={{ base: "1.2rem", sm: "1.4rem", md: "1.6rem" }}
        lineHeight="150%"
        fontWeight="700"
        border="3px solid"
        color={isActive ? "brand.main" : "black"}
        borderColor={isActive ? "brand.main" : "transparent"}
        w="4rem"
        h="4rem"
        rounded="full"
        display="flex"
        justifyContent="center"
        alignItems="center"
        transition="all 500ms linear"
      >
        {children}
      </Text>
      <Text
        pos="absolute"
        color={isActive ? "brand.main" : "black"}
        w="max-content"
        top="100%"
        fontWeight="700"
        fontSize={{ base: "1.2rem", md: "1.25rem" }}
      >
        {heading}
      </Text>
    </VStack>
  )
}
