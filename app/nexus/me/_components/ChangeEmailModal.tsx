import {
  Button,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react"
import { ProfileModal } from "./AccountSettingsModal"

export default function ChangeEmailModal({
  onClose,
  isOpen,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  return (
    <>
      <ProfileModal isOpen={isOpen} onClose={onClose} heading={"Change email"}>
        <VStack gap="1.5rem" alignItems="start">
          <VStack alignItems="start" w="full" justifyContent="space-between">
            <FormLabel fontSize="1.6rem" m="0" fontWeight="400">
              Enter password
            </FormLabel>
            <Input py=".8rem" />
          </VStack>
          <Button mt="1rem" variant="brand-secondary">
            Continue
          </Button>
        </VStack>
      </ProfileModal>
    </>
  )
}