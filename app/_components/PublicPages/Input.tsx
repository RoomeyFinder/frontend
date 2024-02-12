import { Input, InputAddonProps, InputGroup, InputProps, InputRightAddon } from "@chakra-ui/react"
import { ReactNode } from "react"

export default function PageInput({
  icon,
  inputProps,
  iconProps,
}: {
  icon: ReactNode
  inputProps: InputProps
  iconProps?: InputAddonProps
}) {
  return (
    <InputGroup
      border="1px solid"
      borderColor="gray.100"
      rounded="1.2rem"
      overflow="hidden"
    >
      <Input bg="white" border="0" borderRadius="0" {...inputProps} />
      <InputRightAddon
        display="flex"
        justifyContent="center"
        alignItems="center"
        w="6rem"
        minH="6rem"
        border="0"
        bg="white.200"
        color="gray.main"
        {...(iconProps || {})}
        onClick={iconProps?.onClick}
      >
        {icon}
      </InputRightAddon>
    </InputGroup>
  )
}
