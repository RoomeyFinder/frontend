import { FormLabel, HStack, Text, VStack } from "@chakra-ui/react"
import { ChangeEventHandler, Fragment, useMemo, useState } from "react"
import lifestyleJson from "../../../../_data/lifestyle.json"
import TextCheckbox from "../../_components/TextCheckbox"

export default function LifestyleInputs({
  selectedValues,
  onChange,
}: {
  selectedValues: string[]
  onChange: ChangeEventHandler<HTMLInputElement>
}) {
  const groupedLifestyles = useMemo(() => {
    return lifestyleJson.reduce((acc: { [x: string]: string[] }, lifestyle) => {
      const { category, value } = lifestyle
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(value)
      return acc
    }, {})
  }, [lifestyleJson])
  const [
    maxNumOfLifestyleCategoriesToShow,
    setMaxNumOfLifestyleCategoriesToShow,
  ] = useState(2)
  const isShowingAllCategories = useMemo(
    () =>
      maxNumOfLifestyleCategoriesToShow >=
      Object.keys(groupedLifestyles).length,
    [maxNumOfLifestyleCategoriesToShow, groupedLifestyles]
  )

  return (
    <>
      <VStack alignItems="start" gap="1rem" w="full">
        <FormLabel fontSize="2rem" m="0" fontWeight="600">
          Preferred lifestyle
        </FormLabel>

        {Object.keys(groupedLifestyles).map((category, catIdx) =>
          catIdx > maxNumOfLifestyleCategoriesToShow ? (
            <Fragment key={category} />
          ) : (
            <VStack key={category} alignItems="start" w="full" mb="1rem">
              <Text as="h2" fontSize="1.6rem" fontWeight="500">
                {category}
              </Text>
              <HStack
                key={category}
                gap="2rem"
                fontSize="1.6rem"
                flexWrap="wrap"
              >
                {groupedLifestyles[category].map((lifestyle) => (
                  <TextCheckbox
                    key={lifestyle + category}
                    isSelected={selectedValues.includes(lifestyle)}
                    name={lifestyle}
                    onChange={onChange}
                    value={lifestyle}
                    inputType="checkbox"
                  >
                    {lifestyle}
                  </TextCheckbox>
                ))}
              </HStack>
            </VStack>
          )
        )}
        <Text
          as="button"
          type="button"
          onClick={() => {
            setMaxNumOfLifestyleCategoriesToShow(
              isShowingAllCategories ? 2 : Object.keys(groupedLifestyles).length
            )
          }}
          fontSize="1.6rem"
          ml="auto"
          color="brand.main"
          textDecor="underline"
          fontWeight="500"
        >
          {isShowingAllCategories ? "Limit " : "Show all "}
          categories
        </Text>
      </VStack>
    </>
  )
}
