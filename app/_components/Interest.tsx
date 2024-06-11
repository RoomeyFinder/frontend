import { useRouter } from "next/navigation"
import Interest from "../_types/Interest"
import {
  Flex,
  Avatar,
  Heading,
  Button,
  Show,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Text,
  Box,
} from "@chakra-ui/react"

import { useState, useMemo, useCallback } from "react"
import CheckIcon from "../_assets/SVG/CheckIcon"
import { TimesIconSmall } from "../_assets/SVG/TimesIcon"
import useActOnInterest from "../_hooks/useActOnInterest"
import { FavoriteType } from "../_types/Favorites"
import { Listing } from "../_types/Listings"
import User from "../_types/User"
import TimeSince from "./TimeSince"

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
    useActOnInterest()

  return (
    <Flex
      bg="#d9d9d94f"
      rounded="1.2rem"
      alignItems="center"
      gap={{ base: "1rem", md: "1.5rem" }}
      py="1rem"
      px="2rem"
      w="full"
    >
      <Avatar
        w={{ base: "4rem", md: "7rem" }}
        h={{ base: "4rem", md: "7rem" }}
        border="1px solid #3A86FF"
        src={profileToDisplay?.profileImage?.secure_url}
        name={`${profileToDisplay?.firstName} ${profileToDisplay?.lastName}`}
      />
      <Flex flexDir="column" gap={{ base: ".5rem", md: "1rem" }}>
        <Heading
          fontSize={{ base: "1.4rem", md: "1.9rem" }}
          lineHeight="1.2rem"
        >
          {profileToDisplay?.firstName} {profileToDisplay?.lastName}
        </Heading>
        <Box>
          <Text
            as="button"
            color="gray.main"
            fontWeight="600"
            fontSize={{ base: "1.2rem", md: "1.6rem" }}
            textDecor="underline"
            onClick={() => router.push(`/profile/${profileToDisplay?._id}`)}
          >
            View profile
          </Text>
          &nbsp;&nbsp;&nbsp;
          <Text
            as="span"
            display={{ md: "none" }}
            fontSize={{ base: "1.3rem", md: "1.6rem" }}
            color="#A1A1A1"
          >
            <TimeSince date={interest.createdAt} />
          </Text>
        </Box>
      </Flex>
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
                <Button
                  isLoading={loading}
                  onClick={() =>
                    setConfirmation({
                      show: true,
                      text: "Are you show you want to unsend your interest?",
                      confirmAction: handleUnsend,
                    })
                  }
                  bg="transparent"
                  color="gray.main"
                  aria-label="unsend interest"
                >
                  Unsend
                </Button>
              </>
            ) : (
              <>
                <Text
                  onClick={handleAccept}
                  as="button"
                  color="brand.main"
                  aria-label="accept interest"
                >
                  <Show below="md">
                    <CheckIcon />
                  </Show>
                  <Show above="md">Accept</Show>
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
                >
                  <Show below="md">
                    <TimesIconSmall />
                  </Show>
                  <Show above="md">Decline</Show>
                </Text>
              </>
            )}
          </>
        )}
        {!isPending && (
          <Text
            color={interest.accepted ? "brand.main" : "gray.main"}
            aria-label="decline interest"
          >
            {interest.accepted ? "Accepted" : "Declined"}
          </Text>
        )}
        <Show above="md">
          <Text fontSize={{ base: "1.3rem", md: "1.6rem" }} color="#A1A1A1">
            <TimeSince date={interest.createdAt} />
          </Text>
        </Show>
      </Flex>
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
