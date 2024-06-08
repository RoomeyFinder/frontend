import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react"
import { useCallback, useState } from "react"
import { ProfileModal } from "./AccountSettingsModal"
import useAxios from "@/app/_hooks/useAxios"
import { useAppSelector, useAppDispatch } from "@/app/_redux"
import { logout } from "@/app/_redux/slices/auth.slice"

export default function DeleteAcountModal({
  onClose,
  isOpen,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [isDeleting, setIsDeleting] = useState(false)
  const { user } = useAppSelector((store) => store.auth)
  const dispatch = useAppDispatch()

  const { fetchData } = useAxios()
  const deactivateAccount = useCallback(async () => {
    setIsDeleting(true)
    const res = await fetchData({
      url: `/users/${user?._id}`,
      method: "delete",
    })
    if (res.statusCode === 200) {
      dispatch(logout())
    }
    setIsDeleting(false)
  }, [fetchData, user?._id, dispatch])

  return (
    <>
      <ProfileModal
        isOpen={isOpen}
        onClose={onClose}
        heading={"Delete account?"}
      >
        <VStack gap="2.5rem" alignItems="start">
          <Text fontSize="1.6rem">
            Your photos, ads and all information will be permanently deleted.
            You won&apos;t be able to retrieve anything
          </Text>
          <Flex justifyContent="center" alignItems="baseline" gap="2rem">
            <Button
              onClick={deactivateAccount}
              fontSize="1.6rem"
              fontWeight="600"
              lineHeight="2.4rem"
              color="red.main"
              bg="transparennt"
              px="2rem"
              py="1rem"
              rounded="1rem"
              border="1px solid currentColor"
              h="unset"
              _hover={{ bg: "#fe251b17" }}
              isLoading={isDeleting}
            >
              Yes
            </Button>
            <Button
              onClick={onClose}
              fontSize="1.6rem"
              fontWeight="600"
              lineHeight="2.4rem"
              color="gray.100"
              border="1px solid currentColor"
              bg="white"
              px="2rem"
              py="1rem"
              rounded="1rem"
              h="unset"
              _hover={{ bg: "gray.100", color: "white" }}
            >
              No
            </Button>
          </Flex>
        </VStack>
      </ProfileModal>
    </>
  )
}
