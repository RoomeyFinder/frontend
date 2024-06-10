import {
  FormLabel,
  HStack,
  Input,
  Select,
  VStack,
  Text,
  Heading,
} from "@chakra-ui/react"
import { adFeatures, icons } from "@/app/_data/adFeatures"
import useCategorizeListOfObjects from "@/app/_hooks/useCategorizeListOfObjects"
import TextCheckbox from "@/app/nexus/me/_components/TextCheckbox"
import { Fragment } from "react"

export default function DescriptionAndFeaturesSection() {
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
          <Text as="p" mb="1rem" fontSize="1.4rem" fontWeight="500">
            Decription
          </Text>
          <Input
            name="description"
            placeholder="Describe your ad"
            type="text"
            as="textarea"
            variant="filled"
            h="22rem"
            resize="none"
          />
        </FormLabel>
      </HStack>
      <VStack alignItems="start" gap="1rem">
        <Heading fontSize="1.4rem" fontWeight="600">
          Features
        </Heading>
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
                    isSelected={false}
                    name={""}
                    value={""}
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
