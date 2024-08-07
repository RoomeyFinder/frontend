import { VStack, FormLabel, Input } from "@chakra-ui/react"
import { defaultInputStyles } from "../../_components/TextCheckbox"
import { ChangeEventHandler } from "react"

export default function EarliestMoveDateInput({
  value,
  onChange,
}: {
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
}) {
  return (
    <VStack alignItems="start" gap=".8rem">
      <FormLabel fontSize="2rem" m="0" fontWeight="600">
        Earliest Move-In Date
      </FormLabel>
      <Input
        {...defaultInputStyles}
        type="date"
        name="earliestMoveDate"
        placeholder="Earliest Move Date"
        value={value}
        onChange={onChange}
        w="100%"
        maxW="20rem"
        height="3.3rem"
        textAlign="left"
      />
    </VStack>
  )
}
