import { useAppDispatch, useAppSelector } from "@/app/_redux"
import { updateSettings } from "@/app/_redux/thunks/auth.thunk"
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
import { FormEvent, ReactNode, useCallback, useState } from "react"

export default function ProfileSettingsModal({
  onClose,
  isOpen,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user } = useAppSelector((store) => store.auth)
  const [settings, setSettings] = useState({
    isAgeVisibleOnProfile: user?.settings?.isAgeVisibleOnProfile || false,
    isOccupationVisibleOnProfile:
      user?.settings?.isOccupationVisibleOnProfile || false,
    isStateOfOriginVisibleOnProfile:
      user?.settings?.isStateOfOriginVisibleOnProfile || false,
  })
  console.log(user?.settings, "dafdsfd")
  const dispatch = useAppDispatch()

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      setIsSubmitting(true)
      dispatch(updateSettings(settings)).then(() => {
        setIsSubmitting(false)
        onClose()
      })
    },
    [settings, dispatch, onClose]
  )
  return (
    <>
      <ProfileModal
        isOpen={isOpen}
        onClose={onClose}
        heading={"Profile settings"}
      >
        <VStack
          onSubmit={handleSubmit}
          gap="1.5rem"
          alignItems="start"
          as="form"
        >
          <HStack w="full" justifyContent="space-between">
            <FormLabel
              htmlFor="ageSetting"
              fontSize="1.6rem"
              m="0"
              fontWeight="400"
            >
              Show age on profile
            </FormLabel>
            <Switch
              id="ageSetting"
              onChange={(e) => {
                setSettings((prev) => ({
                  ...prev,
                  isAgeVisibleOnProfile: e.target.checked,
                }))
              }}
              checked={settings.isAgeVisibleOnProfile}
              isChecked={settings.isAgeVisibleOnProfile}
              colorScheme="blue"
              size="lg"
              h="unset"
            />
          </HStack>
          <HStack w="full" justifyContent="space-between">
            <FormLabel
              htmlFor="occupationSetting"
              fontSize="1.6rem"
              m="0"
              fontWeight="400"
            >
              Show occupation on profile
            </FormLabel>
            <Switch
              id="occupationSetting"
              onChange={(e) => {
                setSettings((prev) => ({
                  ...prev,
                  isOccupationVisibleOnProfile: e.target.checked,
                }))
              }}
              checked={settings.isOccupationVisibleOnProfile}
              isChecked={settings.isOccupationVisibleOnProfile}
              colorScheme="blue"
              size="lg"
              h="unset"
            />
          </HStack>
          <HStack w="full" justifyContent="space-between">
            <FormLabel
              htmlFor="stateOfOriginSetting"
              fontSize="1.6rem"
              m="0"
              fontWeight="400"
            >
              Show state of origin on profile
            </FormLabel>
            <Switch
              id="stateOfOriginSetting"
              onChange={(e) => {
                setSettings((prev) => ({
                  ...prev,
                  isStateOfOriginVisibleOnProfile: e.target.checked,
                }))
              }}
              checked={settings.isStateOfOriginVisibleOnProfile}
              isChecked={settings.isStateOfOriginVisibleOnProfile}
              colorScheme="blue"
              size="lg"
              h="unset"
            />
          </HStack>
          <Button
            type="submit"
            isLoading={isSubmitting}
            mt="2rem"
            variant="brand-secondary"
          >
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
