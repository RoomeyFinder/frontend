import { BoxProps, Flex, VisuallyHidden } from "@chakra-ui/react"
import { ReactNode, ChangeEventHandler } from "react"

export const defaultInputStyles = {
  px: "1rem",
  pb: ".2rem",
  py: ".5rem",
  border: "1px solid currentColor",
  h: "unset",
  rounded: ".6rem",
  w: "8rem",
  fontSize: "1.4rem",
  color: "gray.main",
  _placeholder: {
    color: "gray.100",
  },
}
export default function TextCheckbox({
  children,
  isSelected,
  name,
  onChange,
  value,
  inputType,
  styleProps = {}
}: {
  children: ReactNode[] | ReactNode
  isSelected: boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
  name: string
  value: string
  inputType?: "radio" | "checkbox"
  styleProps?: BoxProps
}) {
  return (
    <Flex
      as={inputType ? "label" : "p"}
      {...defaultInputStyles}
      justifyContent="center"
      alignItems="center"
      bg={isSelected ? "#3a86ff0f" : ""}
      color={isSelected ? "brand.main" : "gray.main"}
      fontWeight={isSelected ? "500" : ""}
      borderColor="currentColor"
      w="auto"
      cursor="pointer"
      _hover={{ bg: "white.300" }}
      {...styleProps}
    >
      {children}
      {inputType && (
        <VisuallyHidden>
          <input
            name={name}
            type={inputType}
            checked={isSelected}
            value={value}
            onChange={(e) => {
              onChange && onChange(e)
            }}
          />
        </VisuallyHidden>
      )}
    </Flex>
  )
}
