import { VStack, FormLabel, HStack } from "@chakra-ui/react"
import TextCheckbox from "../../_components/TextCheckbox"
import { ChangeEventHandler } from "react"

export default function LookingForInput({
  value,
  onChange,
}: {
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
}) {
  return (
    <VStack alignItems="start" gap=".8rem">
      <FormLabel fontSize="2rem" m="0" fontWeight="600">
        I'm looking for:
      </FormLabel>
      <HStack gap="2rem" fontSize="1.6rem" fontWeight="500" flexWrap="wrap">
        <TextCheckbox
          onChange={onChange}
          name="lookingFor"
          value="room"
          isSelected={value === "room"}
          inputType="radio"
        >
          Room
        </TextCheckbox>

        <TextCheckbox
          onChange={onChange}
          isSelected={value === "roommate"}
          inputType="radio"
          name="lookingFor"
          value="roommate"
        >
          Roomey
        </TextCheckbox>
        <TextCheckbox
          onChange={onChange}
          isSelected={value === "both"}
          inputType="radio"
          name="lookingFor"
          value="both"
        >
          Both
        </TextCheckbox>
        <TextCheckbox
          onChange={onChange}
          isSelected={value === "none"}
          inputType="radio"
          name="lookingFor"
          value="none"
        >
          Not searching
        </TextCheckbox>
      </HStack>
    </VStack>
  )
}
