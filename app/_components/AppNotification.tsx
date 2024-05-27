import { Box, CloseButton } from "@chakra-ui/react"
import { ReactNode, useRef } from "react"

export default function AppNotification({
  children,
  onClose,
}: {
  children: ReactNode
  onClose?: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  if (!children) return null
  return (
    <Box
      ref={ref}
      pos="relative"
      w="full"
      py="1.2rem"
      px="8rem"
      fontSize="1.6rem"
      fontWeight="500"
      textAlign="center"
      bg="#ff000036"
    >
      <CloseButton
        size="lg"
        pos="absolute"
        top="1.2rem"
        right="5rem"
        onClick={() => {
          onClose && onClose()
        }}
      />
      {children}
    </Box>
  )
}
