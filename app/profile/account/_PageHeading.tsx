import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading } from "@chakra-ui/react"


export default function PageHeading(){
  return (
    <Box>
      <Breadcrumb
        separator=">"
        fontSize="1.6rem"
        color="gray.main"
        lineHeight="normal"
        fontWeight="400"
      >
        <BreadcrumbItem>
          <BreadcrumbLink href="/profile?edit=true">Profile</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">Password & account</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Heading
        as="h1"
        mt={{ base: "1.5rem", lg: "3rem" }}
        variant="large"
      >
        Password & account
      </Heading>
    </Box>
  )
}