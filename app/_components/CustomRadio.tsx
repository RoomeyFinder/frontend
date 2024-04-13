"use client"

import {
  useRadio,
  useRadioGroup,
  HStack,
  Box,
  RadioProps,
  Flex,
  ScaleFade,
  StackProps,
} from "@chakra-ui/react"
import CheckedRadioFill from "../_assets/SVG/CheckedRadioFill"

function CustomRadio(
  props: RadioProps & { selectedValue: string; size?: "small" | "large"}
) {
  const { getInputProps, getRadioProps } = useRadio(props)
  const radioProps = getRadioProps()
  const inputProps = getInputProps()
  return (
    <Box as="label">
      <input {...inputProps} />
      <Flex
        {...radioProps}
        alignItems="center"
        cursor="pointer"
        gap="1rem"
        fontSize={{ base: "1.4rem", md: "1.6rem" }}
      >
        <Flex
          border={props.size === "small" ? ".1rem solid" : ".2rem solid"}
          borderColor="brand.main"
          w={props.size === "small" ? "1rem" : "1.8rem"}
          h={props.size === "small" ? "1rem" : "1.8rem"}
          justifyContent="center"
          alignItems="center"
          borderRadius="50%"
        >
          <ScaleFade in={props.value === props.selectedValue ? true : false}>
            <CheckedRadioFill isSmall={props.size === "small"} />
          </ScaleFade>
        </Flex>
        {props.children}
      </Flex>
    </Box>
  )
}

export default function CustomRadioGroup({
  options,
  onChange,
  selectedValue,
  name,
  radioSize,
  containerProps,
}: {
  options: string[]
  onChange: (selection: string) => void
  name: string
  selectedValue: string
  containerProps?: StackProps
  radioSize?: "small" | "large"
}) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    defaultValue: selectedValue,
    onChange: (val: string) => {
      onChange(val)
    },
  })

  const group = getRootProps()

  return (
    <HStack {...(containerProps || {})} {...group}>
      {options.map((value) => {
        return (
          <CustomRadio
            selectedValue={selectedValue}
            size={radioSize}
            key={value}
            {...getRadioProps({ value })}
          >
            {value}
          </CustomRadio>
        )
      })}
    </HStack>
  )
}
