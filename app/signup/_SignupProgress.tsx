import { Flex, Text, Progress } from "@chakra-ui/react"
import { ReactNode } from "react"


const progressProps = {
  size: "sm",
  colorScheme: "brand",
  bg: "brand.10",
  max: 100,
  flexGrow: "1",
  flexShrink: "0",
  maxW: { sm: "18.6rem" },
  h: ".3rem"
}


export default function SignupProgress({
  progressOnePercentage,
  progressTwoPercentage
}: {
    progressOnePercentage: number
    progressTwoPercentage: number
}) {
  return (
    <Flex alignItems="center" gap="1rem" pt={{ base: "2rem", md: "3.4rem" }} pb={{ base: "1.6rem", md: "3rem" }}>
      <ProgressHeading>Profile Initials</ProgressHeading>
      <Progress value={progressOnePercentage} {...progressProps} />
      <ProgressHeading>Contact</ProgressHeading>
      <Progress value={progressTwoPercentage} {...progressProps} />
      <ProgressHeading>Location</ProgressHeading>
    </Flex>
  )
}

function ProgressHeading({ children }: {
  children: ReactNode | ReactNode[]
}) {
  return (
    <Text as="h3" flexGrow="1" maxW="fit-content" whiteSpace="nowrap" 
      fontSize={{ base: "1.2rem", sm: "1.4rem", md: "1.6rem" }} lineHeight="150%" fontWeight="600">
      {children}
    </Text>
  )
}