"use client"
import LogoutIcon from "@/app/_assets/SVG/Logout"
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
    setIsDeleting(true)
    const res = await fetchData({
      url: `/users/${user?._id}`,
      method: "delete",
    })
    if (res.statusCode === 200) {
      logout()
    }
    setIsDeleting(false)
  }, [fetchData, user?._id, logout])
  
  return (
    <Box>
      <Heading size="md" variant="md" as="h2" mb="3rem">
        Account
      </Heading>
      <Flex alignItems="center" gap="2rem">
        <Button
          onClick={() => logout()}
          fontSize="1.6rem"
          fontWeight="600"
          lineHeight="2.4rem"
          color="gray.main"
          variant="brand-secondary"
          bg="#7070701A"
          _hover={{ bg: "gray.main", color: "white" }}
          _active={{ bg: "gray.main", color: "white" }}
          _focus={{ bg: "gray.main", color: "white" }}
        >
          Log Out <LogoutIcon />
        </Button>
        <Text
          onClick={() => setShowConfirm(true)}
          as="button"
          fontSize="1.9rem"
          fontWeight="400"
          lineHeight="3.2rem"
          color="gray.main"
          _hover={{ textDecor: "underline" }}
        >
          Delete account
        </Text>
      </Flex>
      <Modal
        isOpen={showConfirm}
        onClose={() => !isDeleting && setShowConfirm(false)}
        isCentered
      >
        <ModalOverlay bg="#000000B2" />
        <ModalContent
          bg="white"
          textAlign="center"
          p="3rem"
          w="90dvw"
          maxW="60rem"
          rounded="1.2rem"
          display="flex"
          flexDir="column"
          gap="3rem"
        >
          <Heading color="red.main" fontSize="2rem" lineHeight="2rem">
            Delete account?
          </Heading>
          <Text fontSize="1.6rem">
            Your photos, ads and all information will be permanently deleted.
            You won't be able to retrieve anything
          </Text>
          <Flex justifyContent="center" alignItems="baseline" gap="2rem">
            <Button
              onClick={deactivateAccount}
              fontSize="1.6rem"
              fontWeight="600"
              lineHeight="2.4rem"
              color="gray.main"
              bg="#7070704D"
              px="2rem"
              py="1rem"
              rounded="1rem"
              h="unset"
              _hover={{ bg: "gray.main", color: "white" }}
              isLoading={isDeleting}
            >
              Yes
            </Button>
            <Button
              onClick={() => {}}
              fontSize="1.6rem"
              fontWeight="600"
              lineHeight="2.4rem"
              color="gray.main"
              bg="#7070704D"
              px="2rem"
              py="1rem"
              rounded="1rem"
              h="unset"
              _hover={{ bg: "gray.main", color: "white" }}
            >
              No
            </Button>
          </Flex>
        </ModalContent>
      </Modal>
    </Box>
  )
}
