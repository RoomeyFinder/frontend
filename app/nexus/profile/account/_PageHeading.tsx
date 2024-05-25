import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading } from "@chakra-ui/react"


export default function PageHeading(){
  return (
    <Box>
      <Breadcrumb
        separator=">"
        fontSize={{base: "1.2rem", md: "1.6rem"}}
        color="gray.main"
        lineHeight="normal"
        fontWeight="400"
      >
        <BreadcrumbItem>
          <BreadcrumbLink href="/profile">Profile</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">Password & account</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Heading
        aria-level={1}
        mt={{ base: "1.5rem", lg: "3rem" }}
        variant="large"
      >
        Password & account
      </Heading>
    </Box>
  )
}