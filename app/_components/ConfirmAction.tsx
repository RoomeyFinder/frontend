import { Button, Flex, Text } from "@chakra-ui/react"
import { ReactNode } from "react"

const colorMappings = {
  warning: "red",
  info: "blue",
}
export default function ConfirmAction({
  confirmText,
  confirm,
  cancel,
  variant,
}: {
  confirmText: string
  confirm: () => void
  cancel: () => void
  variant: "warning" | "info"
}) {
  return (
    <>
      <Flex
        bg="white"
        textAlign="center"
        minW="22.2rem"
        role="alert"
        p="3rem"
        gap="2rem"
        flexDir="column"
        boxShadow="0px 0px 1px 0px #00000066"
        rounded="1.2rem"
      >
        <Text fontSize="2rem" fontWeight="600" color={colorMappings[variant]}>
          {confirmText}
        </Text>
        <Flex gap="1rem" justifyContent="center" alignItems="center">
          <ActionButton onClick={confirm}>Yes</ActionButton>
          <ActionButton onClick={cancel}>No</ActionButton>
        </Flex>
      </Flex>
    </>
  )
}

function ActionButton({ onClick, children}: {
  onClick: () => void
  children: ReactNode
}){

  return (
    <Button
      bg="transparent"
      rounded="1rem"
      p="1rem 2rem"
      fontSize="1.6rem"
      fontWeight="normal"
      border="1px solid #7070704D"
      h="unset"
      _hover={{
        borderColor: "transparent",
        bg: "#7070704D",
        color: "white",
      }}
      onClick={onClick}
      type="button"
    >
      {children}
    </Button>
  )
}
