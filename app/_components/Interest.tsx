import { useRouter } from "next/navigation"
import Interest from "../_types/Interest"
import {
  Flex,
  Avatar,
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Text,
  Box,
} from "@chakra-ui/react"

import { useState, useMemo, useCallback } from "react"
import { FavoriteType } from "../_types/Favorites"
import { Listing } from "../_types/Listings"
import User from "../_types/User"
import TimeSince from "./TimeSince"
import { useAppSelector } from "../_redux"
import useActOnInterest from "../_hooks/useActOnInterest"

export default function InterestComponent({
  isSent,
  interest,
}: {
  isSent?: boolean
  interest: Interest
}) {
  const router = useRouter()
  const [confirmation, setConfirmation] = useState({
    text: "",
    confirmAction: () => {},
    show: false,
  })
  const isPending = useMemo(
    () => interest.accepted === false && interest.declined === false,
    [interest]
  )
  const profileToDisplay = useMemo<User | undefined>(() => {
    if (!isSent) return interest.sender
    if (interest.type === FavoriteType.USER) return interest.doc as User
    else return (interest.doc as Listing)?.owner
  }, [interest, isSent])

  const hideConfirmation = useCallback(
    () => setConfirmation({ show: false, confirmAction: () => {}, text: "" }),
    []
  )
  const { handleAccept, handleDecline, handleUnsend, loading } =
    useActOnInterest(interest)

  const { user } = useAppSelector((store) => store.auth)

  return (
    <Flex
      bg="#3a86ff0d"
      rounded="1.2rem"
      alignItems="center"
      gap={{ base: "1rem", md: "1.5rem" }}
      py="1rem"
      px="2rem"
      w="full"
    >
      <Avatar
        w={{ base: "7rem", md: "7rem" }}
        h={{ base: "7rem", md: "7rem" }}
        border="1px solid #3A86FF"
        src={profileToDisplay?.profileImage?.secure_url}
        name={`${profileToDisplay?.firstName} ${profileToDisplay?.lastName}`}
      />
      <Flex flexDir="column" gap=".4rem">
        <Heading
          fontSize={{ base: "1.4rem", md: "1.9rem" }}
          textTransform="capitalize"
          as="h4"
          fontWeight="600"
          onClick={() => router.push(`/users/${profileToDisplay?._id}`)}
        >
          {profileToDisplay?.firstName} {profileToDisplay?.lastName} <br />
          <Text
            mt=".5rem"
            as="span"
            display="block"
            fontWeight="normal"
            fontSize="1.4rem"
            textTransform="lowercase"
            color="gray.main"
          >
            {isSent
              ? `You showed interest in their
            ${interest.type === "User" ? "Profile" : "Ad"}`
              : `Showed interest in your ${interest.type === "User" ? "Profile" : "Ad"}`}
          </Text>
        </Heading>
        <Box>
          <Flex
            ml="auto"
            gap=".8rem"
            alignItems="center"
            fontSize={{ base: "1.2rem", md: "1.6rem" }}
            fontWeight="700"
          >
            {isPending && (
              <>
                {isSent ? (
                  <>
                    <Text
                      disabled={loading}
                      as="button"
                      onClick={() =>
                        setConfirmation({
                          show: true,
                          text: "Are you show you want to unsend your interest?",
                          confirmAction: handleUnsend,
                        })
                      }
                      p="0"
                      bg="transparent"
                      color="gray.main"
                      aria-label="unsend interest"
                    >
                      Unsend
                    </Text>
                  </>
                ) : (
                  <>
                    <Text
                      onClick={handleAccept}
                      as="button"
                      color="brand.main"
                      aria-label="accept interest"
                      title="accept interest"
                    >
                      Accept
                    </Text>
                    <Text
                      onClick={() =>
                        setConfirmation({
                          show: true,
                          text: "Are you show you want to decline this interest?",
                          confirmAction: handleDecline,
                        })
                      }
                      as="button"
                      color="gray.main"
                      aria-label="decline interest"
                      title="decline interest"
                    >
                      Decline
                    </Text>
                  </>
                )}
              </>
            )}
            {!isPending && (
              <Text
                as="button"
                onClick={() =>
                  interest.accepted &&
                  router.push(
                    `/messenger?otherUser=${interest.sender._id === user?._id ? interest.docOwner : interest.sender._id}`
                  )
                }
                color={interest.accepted ? "brand.main" : "gray.main"}
                fontWeight="500"
                aria-label="decline interest"
              >
                {interest.accepted ? "Send message" : "Declined"}
              </Text>
            )}
          </Flex>
        </Box>
      </Flex>
      <Text
        fontSize={{ base: "1.3rem", md: "1.6rem" }}
        ml="auto"
        color="#A1A1A1"
      >
        <TimeSince date={interest.createdAt} />
      </Text>
      <Modal isOpen={confirmation.show} isCentered onClose={hideConfirmation}>
        <ModalOverlay />
        <ModalContent
          bg="white"
          rounded="1.2rem"
          maxW="50rem"
          textAlign="center"
          p="2rem"
        >
          <ModalHeader fontSize="2.4rem">{confirmation.text}</ModalHeader>
          <ModalBody>
            <Flex justifyContent="center" alignItems="center" gap="2rem">
              <Button bg="transparent" as="button" onClick={hideConfirmation}>
                Cancel
              </Button>
              <Button
                variant="brand"
                onClick={() => {
                  confirmation.confirmAction()
                  hideConfirmation()
                }}
              >
                Yes
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  )
}
