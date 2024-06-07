import {
  Button,
  FormLabel,
  VStack,
  Input,
} from "@chakra-ui/react"
import { ProfileModal } from "./AccountSettingsModal"

export default function ChangePasswordModal({
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
        heading={"Change password"}
      >
        <VStack gap="1.5rem" alignItems="start">
    
          <VStack alignItems="start" w="full" justifyContent="space-between">
            <FormLabel fontSize="1.6rem" m="0" fontWeight="400">
              Old password
            </FormLabel>
            <Input py=".8rem" />
          </VStack>
          <VStack alignItems="start" w="full" justifyContent="space-between">
            <FormLabel fontSize="1.6rem" m="0" fontWeight="400">
              New password
            </FormLabel>
            <Input py=".8rem" />
          </VStack>
          <VStack alignItems="start" w="full" justifyContent="space-between">
            <FormLabel fontSize="1.6rem" m="0" fontWeight="400">
              Confirm new password
            </FormLabel>
            <Input py=".8rem" />
          </VStack>
          <Button mt="2rem" variant="brand-secondary">
            Change password
          </Button>
        </VStack>
      </ProfileModal>
    </>
  )
}