import { Box, Flex, GridItem, Heading, Link, Text } from "@chakra-ui/react"
import { StaticImport } from "next/dist/shared/lib/get-img-props"
import Image from "next/image"

import { ReactNode } from "react"

export default function BlogPostItem({
  imageSrc,
  imageAlt,
  href,
  date,
  heading,
}: {
  imageSrc: string | StaticImport
  imageAlt: string
  href: string
  date: ReactNode
  heading: ReactNode
}) {
  return (
    <GridItem>
      <Link
        target="_blank"
        href={href}
        isExternal
        w="full"
        display="flex"
        flexDir={{ base: "row", sm: "column" }}
        gap={4}
        borderRadius="12px"
        overflow="hidden"
      >
        <>
          <Box>
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={1000}
              height={350}
              objectFit="cover"
              loading="eager"
              priority
              className="blog-image"
            />
          </Box>
          <Box
            p={4}
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Heading
              as="h2"
              fontSize={{ base: "1.8rem", md: "2.2rem" }}
              fontWeight="700"
              color="#222"
            >
              {heading}
            </Heading>
            <Text fontSize="1.4rem" color="#717171">
              {date}
            </Text>
          </Box>
        </>
      </Link>
    </GridItem>
  )
}
