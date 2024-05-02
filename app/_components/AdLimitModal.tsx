import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react"

export default function AdLimitModal({
  show,
  onClose,
}: {
  show: boolean
  onClose: () => void
}) {
  return (
    <>
      <Modal isOpen={show} isCentered onClose={() => {}}>
        <ModalOverlay bg="#FFFFFFF2" />
        <>
          <ModalContent
            bg="#F9F9F9"
            maxW={{ base: "95dvmin", sm: "60rem" }}
            minH={{ base: "55dvmax", md: "60rem" }}
            border="1px solid black"
            rounded="1.2rem"
          >
            <ModalHeader>
              <ModalCloseButton onClick={onClose} />
            </ModalHeader>
            <ModalBody
              display="flex"
              gap="1rem"
              flexDir="column"
              alignItems="center"
              justifyContent="center"
              fontSize={{ base: "1.8rem", md: "2.4rem" }}
              lineHeight="100%"
              textAlign="center"
            >
              <Heading as="h3" fontSize="inherit">
                Free Account Ad Limit Reached
              </Heading>
              <Text color="gray.main">
                Oops. You already have an active ad. Unlock premium features to
                create <b>more ads</b> and maximize your advertising potential.
              </Text>
              <Button variant="brand-secondary" mt="1.5rem">
                Upgrade Now
              </Button>
            </ModalBody>
          </ModalContent>
        </>
      </Modal>
    </>
  )
}
