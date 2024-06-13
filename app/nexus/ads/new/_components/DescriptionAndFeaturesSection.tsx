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
  return (
    <VStack w="full" alignItems="start" pb="3rem" pt="1rem" gap="2.8rem">
      <HStack
        w="full"
        gap={{ base: "1rem", sm: "2rem" }}
        flexWrap={{ base: "wrap", sm: "nowrap" }}
      >
        <FormLabel w="full">
          <HStack w="full" justifyContent="space-between" alignItems="center">
            <Text as="span" mb="1rem" fontSize="1.4rem" fontWeight="500">
              Decription
            </Text>
            <Text as="p" fontSize="1.2rem" fontWeight="500" color="gray.main">
              {description.trim().length === 0 && (
                <>A minimum of 50 characters and a maximum of 1500</>
              )}
              {description.trim().length < 50 && (
                <>{description.trim().length} Characters</>
              )}
              {description.trim().length >= 1200 && (
                <>{1500 - description.trim().length} Characters left</>
              )}
            </Text>
          </HStack>
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
            onChange={(e) =>
              e.target.value.length <= 1500 &&
              handleDescriptionChange(e.target.value)
            }
          />
        </FormLabel>
      </HStack>
      <VStack alignItems="start" gap="1rem">
        <HStack w="full" justifyContent="space-between" alignItems="center">
          <Heading fontSize="1.4rem" fontWeight="600">
            Features
          </Heading>
          <Text as="p" fontSize="1.2rem" fontWeight="500" color="gray.main">
            {selectedFeatures.length < 10 && <>A minimum of 10 features</>}
          </Text>
        </HStack>
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
