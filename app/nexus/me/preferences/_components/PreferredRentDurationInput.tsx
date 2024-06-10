import { VStack, FormLabel, HStack } from "@chakra-ui/react"
import TextCheckbox from "../../_components/TextCheckbox"
import { ChangeEventHandler } from "react"

export default function PreferredRentDurationInput({
  selectedValues,
  onChange,
}: {
  selectedValues: string[]
  onChange: ChangeEventHandler<HTMLInputElement>
}) {
  return (
    <VStack alignItems="start" gap=".8rem">
      <FormLabel fontSize="2rem" m="0" fontWeight="600">
        Preferred rent durations
      </FormLabel>
      <HStack gap="2rem" fontSize="1.6rem" fontWeight="500" flexWrap="wrap">
        <TextCheckbox
          onChange={onChange}
          isSelected={selectedValues.includes("annually")}
          name="annually"
          inputType="checkbox"
          value="annually"
        >
          Annually
        </TextCheckbox>
        <TextCheckbox
          onChange={onChange}
          isSelected={selectedValues.includes("biannually")}
          name="biannually"
          value="biannually"
          inputType="checkbox"
        >
          Biannually
        </TextCheckbox>
        <TextCheckbox
          onChange={onChange}
          isSelected={selectedValues.includes("quarterly")}
          name="quarterly"
          value="quarterly"
          inputType="checkbox"
        >
          Quarterly
        </TextCheckbox>
        <TextCheckbox
          onChange={onChange}
          isSelected={selectedValues.includes("monthly")}
          name="monthly"
          value="monthly"
          inputType="checkbox"
        >
          Monthly
        </TextCheckbox>
      </HStack>
    </VStack>
  )
}
