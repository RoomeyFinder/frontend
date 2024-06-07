import { VStack, FormLabel, HStack, Input, Text } from "@chakra-ui/react"
import { defaultInputStyles } from "../../_components/TextCheckbox"
import { ChangeEventHandler } from "react"
import ErrorText from "@/app/_components/Auth/ErrorText"

export default function PreferredLocationInput({
  targetCity,
  targetState,
  maxDistanceFromTargetLocationInMeters,
  onChange,
  error,
}: {
  targetCity: string
  targetState: string
  maxDistanceFromTargetLocationInMeters: number
  onChange: ChangeEventHandler<HTMLInputElement>
  error?: string
}) {
  return (
    <VStack alignItems="start" gap=".8rem">
      <FormLabel fontSize="2rem" m="0" fontWeight="600">
        Target location
      </FormLabel>
      <HStack gap="2rem" flexWrap="wrap">
        <VStack
          gap="1rem"
          flexGrow="1"
          alignItems="start"
          fontSize="1.6rem"
          fontWeight="500"
        >
          <Text>City</Text>
          <Input
            {...defaultInputStyles}
            type="text"
            w="full"
            display="block"
            name="targetCity"
            placeholder="Port Harcourt"
            onChange={onChange}
            value={targetCity}
          />
        </VStack>
        <VStack
          gap="1rem"
          flexGrow="1"
          alignItems="start"
          fontSize="1.6rem"
          fontWeight="500"
        >
          <Text>State</Text>
          <Input
            {...defaultInputStyles}
            type="text"
            w="full"
            maxW="unset"
            name="targetState"
            placeholder="Rivers"
            onChange={onChange}
            value={targetState}
          />
        </VStack>
        <VStack
          gap="1rem"
          flexGrow="1"
          alignItems="start"
          fontSize="1.6rem"
          fontWeight="500"
        >
          <Text whiteSpace="nowrap">Max Distance (in Meters)</Text>
          <Input
            {...defaultInputStyles}
            type="number"
            w="full"
            name="maxDistanceFromTargetLocationInMeters"
            placeholder="10,000"
            onChange={onChange}
            value={maxDistanceFromTargetLocationInMeters}
          />
        </VStack>
      </HStack>
      {error && <ErrorText fontSize="1.4rem">{error}</ErrorText>}
    </VStack>
  )
}
