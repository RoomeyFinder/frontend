import { Image, ImageProps } from "@chakra-ui/react"

export default function ListingPreviewPhoto({ src }: ImageProps) {
  return (
    <Image
      width={{ base: "13.8rem", md: "23rem" }}
      height={{ base: "12rem", md: "20rem" }}
      objectFit="cover"
      objectPosition="center"
      src={src}
      alt=""
    />
  )
}
