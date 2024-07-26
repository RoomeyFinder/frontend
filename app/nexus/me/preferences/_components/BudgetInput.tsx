import { VStack, FormLabel, HStack, Input, Text } from "@chakra-ui/react"
import { defaultInputStyles } from "../../_components/TextCheckbox"
import { ChangeEventHandler } from "react"

export default function BudgetInput({
  minBudget,
  maxBudget,
  onChange,
}: {
  minBudget: number
  maxBudget: number
  onChange: ChangeEventHandler<HTMLInputElement>
}) {
  return (
    <VStack alignItems="start" gap=".8rem">
      <FormLabel fontSize="2rem" m="0" fontWeight="600">
        Budget
      </FormLabel>
      <HStack gap="2rem" fontSize="1.6rem" fontWeight="500" flexWrap="wrap">
        <HStack gap="1rem">
          <Text>Min:</Text>
          <Input
            {...defaultInputStyles}
            type="number"
            name="minBudget"
            placeholder="0"
            onChange={onChange}
            value={minBudget}
          />
        </HStack>
        <HStack gap="1rem">
          <Text>Max:</Text>
          <Input
            {...defaultInputStyles}
            type="number"
            name="maxBudget"
            placeholder="0"
            onChange={onChange}
            value={maxBudget}
          />
        </HStack>
      </HStack>
    </VStack>
  )
}
