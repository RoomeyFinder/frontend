"use client"
import { Flex, Input, Text, useCheckbox, chakra, TextProps } from "@chakra-ui/react"
import { ReactNode } from "react"
import CheckMarkFilled from "../_assets/CheckMarkFilled"


export default function CustomCheckbox({ children, labelProps = {} }: {
  children: ReactNode | ReactNode[]
  labelProps?: TextProps
}){
  const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } =
    useCheckbox()
  return (
    <chakra.label  {...htmlProps} cursor="pointer">
      <Input {...getInputProps()} hidden />
      <Flex gap="1rem" alignItems="center">
        <Flex 
          w="2rem" 
          h="2rem" 
          borderRadius={state.isChecked ? "50%" : ".5rem"}
          border="2px solid" 
          borderColor="brand.main"
          justifyContent="center"
          alignItems="center" {...getCheckboxProps()}>
          <CheckMarkFilled />
        </Flex>
        <Text {...labelProps} {...getLabelProps()}>{children}</Text>
      </Flex>
    </chakra.label>
  )
}