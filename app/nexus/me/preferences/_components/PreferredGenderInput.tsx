import { VStack, FormLabel, HStack } from "@chakra-ui/react"
import TextCheckbox from "../../_components/TextCheckbox"
import { ChangeEventHandler } from "react"

export default function PreferredGenderInput({
  value,
  onChange,
}: {
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
}) {
  return (
    <VStack alignItems="start" gap=".8rem">
      <FormLabel fontSize="2rem" m="0" fontWeight="600">
        Preferred roommate gender
      </FormLabel>
      <HStack gap="2rem" fontSize="1.6rem" fontWeight="500">
        <TextCheckbox
          inputType="radio"
          onChange={onChange}
          isSelected={value === "male"}
          name="preferredRoomiesGender"
          value="male"
        >
          Male
        </TextCheckbox>
        <TextCheckbox
          inputType="radio"
          onChange={onChange}
          isSelected={value === "female"}
          name="preferredRoomiesGender"
          value="female"
        >
          Female
        </TextCheckbox>
        <TextCheckbox
          inputType="radio"
          onChange={onChange}
          isSelected={value === "both"}
          name="preferredRoomiesGender"
          value="both"
        >
          Any
        </TextCheckbox>
      </HStack>
    </VStack>
  )
}
