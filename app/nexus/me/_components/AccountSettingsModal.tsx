import {
  Button,
  FormLabel,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Switch,
  VStack,
} from "@chakra-ui/react"
import { ReactNode } from "react"

export default function ProfileSettingsModal({
  onClose,
  isOpen,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  return (
    <>
      <ProfileModal
        isOpen={isOpen}
        onClose={onClose}
        heading={"Profile settings"}
      >
        <VStack gap="1.5rem" alignItems="start">
          <HStack w="full" justifyContent="space-between">
            <FormLabel fontSize="1.6rem" m="0" fontWeight="400">
              Show age on profile
            </FormLabel>
            <Switch colorScheme="blue" size="lg" h="unset" />
          </HStack>
          <HStack w="full" justifyContent="space-between">
            <FormLabel fontSize="1.6rem" m="0" fontWeight="400">
              Show occupation on profile
            </FormLabel>
            <Switch colorScheme="blue" size="lg" h="unset" />
          </HStack>
          <HStack w="full" justifyContent="space-between">
            <FormLabel fontSize="1.6rem" m="0" fontWeight="400">
              Show state of origin on profile
            </FormLabel>
            <Switch colorScheme="blue" size="lg" h="unset" />
          </HStack>
          <Button mt="2rem" variant="brand-secondary">
            Save settings
          </Button>
        </VStack>
      </ProfileModal>
    </>
  )
}

export function ProfileModal({
  children,
  heading,
  isOpen,
  onClose = () => {},
}: {
  children: ReactNode | ReactNode[]
  heading: ReactNode | ReactNode[]
  isOpen: boolean
  onClose: () => void
}) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          bg="white"
          rounded="1.2rem"
          py="3rem"
          px="3rem"
          w="85%"
          maxW="45rem"
        >
          <ModalCloseButton size="2xl" top="1.5rem" right="2rem" p=".5rem" />
          <ModalHeader p="0" mb="3rem" fontSize="2rem">
            {heading}
          </ModalHeader>
          <ModalBody p="0">{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
