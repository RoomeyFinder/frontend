import { BoxProps, Flex } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import BackIcon from "../_assets/SVG/BackIcon"

export default function BackButton({
  showText,
  ...props
}: BoxProps & { showText?: boolean }) {
  const router = useRouter()

  return (
    <Flex
      gap="1rem"
      alignItems="center"
      fontSize="1.6rem"
      p=".5rem"
      as="button"
      {...props}
      onClick={() => router.back()}
      aria-label="back"
    >
      <BackIcon /> {showText && "Back"}
    </Flex>
  )
}
