import SendIcon from "@/app/_assets/SVG/SendIcon"
import { Input, InputGroup, InputRightAddon } from "@chakra-ui/react"
import { useCallback, useState } from "react"

export default function ConversationInput({
  onSubmit,
}: {
  onSubmit: (text: string) => void
}) {
  const [text, setText] = useState("")

  const handleSubmit = useCallback(() => {
    onSubmit(text)
    setText("")
  }, [text, onSubmit])

  return (
    <>
      <InputGroup
        bg="white"
        shadow="0px 0px 3px 3px #00000008"
        rounded="1.2rem"
        w="full"
      >
        <Input
          border="0"
          p="0"
          py="1.5rem"
          pl="1.5rem"
          color="#555"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              handleSubmit()
            }
          }}
        />
        <InputRightAddon
          border="0"
          color="brand.main"
          bg="brand.10"
          w={{ base: "4rem" }}
          h={{ base: "4rem" }}
          _hover={{ bg: "brand.50" }}
          display="flex"
          my="auto"
          mr=".8rem"
          justifyContent="center"
          alignItems="center"
          borderRadius="1.2rem"
          onClick={handleSubmit}
        >
          <SendIcon />
        </InputRightAddon>
      </InputGroup>
    </>
  )
}
