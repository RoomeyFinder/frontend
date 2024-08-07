import {
  FormLabel,
  HStack,
  Input,
  VStack,
  Text,
  Heading,
} from "@chakra-ui/react"
import { adFeatures } from "@/app/_data/adFeatures"
import useCategorizeListOfObjects from "@/app/_hooks/useCategorizeListOfObjects"
import TextCheckbox from "@/app/nexus/me/_components/TextCheckbox"
import { useState } from "react"
import { getErrorPropsV1 } from "@/app/signup/utils"
import ErrorText from "@/app/_components/Auth/ErrorText"

function getCharacterCountMessage(
  value: string,
  { min, max }: { min: number; max: number }
) {
  if (value.trim().length >= min && value.trim().length <= max) {
    return `You have ${max - value.trim().length} characters left.`
  } else if (value.trim().length < min) {
    return `You need at least ${min} characters. Enter ${min - value.trim().length} more characters.`
  } else {
    return `You have exceeded the maximum character limit by ${value.trim().length - max} characters.`
  }
}
export default function DescriptionAndFeaturesSection({
  description,
  selectedFeatures,
  handleDescriptionChange,
  handleFeaturesChange,
  isSubmitting,
}: {
  description: string
  handleDescriptionChange: (text: string) => void
  selectedFeatures: string[]
  handleFeaturesChange: (selection: string) => void
  isSubmitting: boolean
}) {
  const categorizedList = useCategorizeListOfObjects({
    list: adFeatures as { icon: any; value: any; category: any }[],
    keyToCategorizeBy: "category",
  })

  const [descriptionError, setDescriptionError] = useState("")

  return (
    <VStack w="full" alignItems="start" pb="3rem" pt="1rem" gap="2.8rem">
      <HStack
        w="full"
        gap={{ base: "1rem", sm: "2rem" }}
        flexWrap={{ base: "wrap", sm: "nowrap" }}
      >
        <FormLabel w="full">
          <VStack
            gap=".5rem"
            w="full"
            justifyContent="space-between"
            alignItems="start"
            mb=".4rem"
          >
            <Text as="span" fontSize="1.4rem" fontWeight="500">
              Decription
            </Text>
            {
              //
              //  ||
              ((description.trim().length > 0 &&
                description.trim().length < 50) ||
                description.trim().length > 1200) && (
                <ErrorText m="0" fontSize="1.4rem" color={description.trim().length > 1200 ? "gray.main" : "red"}>
                  {getCharacterCountMessage(description, {
                    min: 50,
                    max: 1500,
                  })}
                </ErrorText>
              )
            }
          </VStack>
          <Input
            value={description}
            name="description"
            placeholder="Describe your ad"
            type="text"
            as="textarea"
            variant="filled"
            h="22rem"
            resize="none"
            isDisabled={isSubmitting}
            onChange={(e) => {
              if (e.target.value.length <= 1500) {
                handleDescriptionChange(e.target.value)
                setDescriptionError("")
              } else setDescriptionError("A maximum of 1500 characters")
            }}
            onBlur={() => {
              if (description.length < 50)
                setDescriptionError("A minimum of 50 characters")
              else if (description.length > 1500)
                setDescriptionError("A maximum of 1500 characters")
              // else setDescriptionError("")
            }}
            {...getErrorPropsV1(descriptionError)}
          />
        </FormLabel>
      </HStack>
      <VStack alignItems="start" gap="1rem">
        <VStack
          gap=".5rem"
          w="full"
          justifyContent="space-between"
          alignItems="start"
        >
          <Heading fontSize="1.4rem" fontWeight="600">
            Features
          </Heading>
          <ErrorText m="0" fontSize="1.4rem">
            {selectedFeatures.length < 2 && <>A minimum of 2 features</>}
          </ErrorText>
        </VStack>
        {Object.keys(categorizedList).map((key) => (
          <VStack key={key} w="full" alignItems="start">
            <Text fontSize="1.3rem" fontWeight="400">
              {key}
            </Text>
            <HStack
              gap="1.5rem"
              alignItems="start"
              justifyContent="start"
              flexWrap="wrap"
            >
              {categorizedList[key as keyof typeof categorizedList].map(
                (item) => (
                  <TextCheckbox
                    key={item.value}
                    isSelected={selectedFeatures.includes(item.value)}
                    name={""}
                    onChange={(e) =>
                      !isSubmitting && handleFeaturesChange(e.target.value)
                    }
                    value={item.value}
                    inputType="checkbox"
                  >
                    {typeof item.icon === "function" && item.icon()}&nbsp;&nbsp;
                    {item.value}
                  </TextCheckbox>
                )
              )}
            </HStack>
          </VStack>
        ))}
      </VStack>
    </VStack>
  )
}
