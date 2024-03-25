"use client"
import useAxios from "@/app/_hooks/useAxios"
import { UserContext } from "@/app/_providers/UserProvider"
import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react"
import { useCallback, useContext, useState } from "react"

export default function DeactivateAccountSection() {
  const [isDeleting, setIsDeleting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const { user, logout } = useContext(UserContext)

  const { fetchData } = useAxios()
  const deactivateAccount = useCallback(async () => {
    const res = await fetchData({
      url: `/users/${user?._id}`,
      method: "delete"
    })
    if(res.statusCode === 200){
      logout()
    }
  }, [fetchData, user?._id, logout])
  return (
    // null &&
    <Box>
      <Heading size="md" variant="md" as="h2" mb="3rem">
        Account
      </Heading>
      <Text
        onClick={() => setShowConfirm(true)}
        as="button"
        fontSize="1.9rem"
        fontWeight="400"
        lineHeight="3.2rem"
      >
        Deactivate account
      </Text>
      <Modal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        isCentered
      >
        <ModalOverlay />
        <ModalContent
          bg="white"
          textAlign="center"
          p="4rem"
          maxW="40rem"
          rounded="1.2rem"
        >
          <Heading mb="2rem">
            Are you sure you want to deactivate your account?
          </Heading>
          <Text mb="2rem" fontSize="1.8rem">
            We'd hate to see you go 😔
          </Text>
          <Flex justifyContent="center" alignItems="baseline" gap="2rem">
            <Button
              onClick={() => setShowConfirm(false)}
              p="1.4rem"
              variant="brand-secondary"
            >
              Cancel
            </Button>
            <Button
              onClick={deactivateAccount}
              variant="brand-secondary"
              bg="transparent"
              color="red.main"
              p="0"
              _hover={{
                bg: "transparent",
                color: "red.main",
                textDecor: "underline",
              }}
              isDisabled={isDeleting}
              isLoading={isDeleting}
              loadingText="Deactivating"
            >
              Deactivate
            </Button>
          </Flex>
        </ModalContent>
      </Modal>
    </Box>
  )
}
