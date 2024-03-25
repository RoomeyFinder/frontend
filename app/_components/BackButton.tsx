import { Flex } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import LeftChevron from "../_assets/SVG/LeftChevron"


export default function BackButton(){
  const router = useRouter()

  return (
    <Flex
      gap="1rem"
      alignItems="center"
      fontSize="1.4rem"
      p="1rem"
      as="button"
      onClick={() => router.back()}
    >
      <LeftChevron /> Back
    </Flex>
  )
}