"use client"
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Show,
  Text,
  VStack,
} from "@chakra-ui/react"
import MyAdsHeader from "../../_components/PageHeader"
import CheckIcon from "../../_assets/SVG/CheckIcon"
import { TimesIconSmall } from "../../_assets/SVG/TimesIcon"
import { InterestsContext } from "../../_providers/InterestsProvider"
import { useCallback, useContext, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import InterestInterface from "../../_types/Interest"
import { FavoriteType } from "../../_types/Favorites"
import { Listing } from "../../_types/Listings"
import User from "../../_types/User"
import TimeSince from "../../_components/TimeSince"
import { useRouter } from "next/navigation"
import CenteredSpinner from "../../_components/CenteredSpinner"
import FailureUIWithRetryButton from "../../_components/FailureUIWithRetryButton"
import useActOnInterest from "../../_hooks/useActOnInterest"
import Empty from "../../_components/Empty"
import { useAppSelector } from "../../_redux"

export default function Page() {
  const { interests, loading, failedToFetch, reloadInterests } =
    useContext(InterestsContext)
  const { user } = useAppSelector((store) => store.auth)
  const searchParams = useSearchParams()
  const currentDisplay = useMemo(
    () => (searchParams.get("filter") || "received") as "sent" | "received",
    [searchParams]
  )
  const sentInterests = useMemo(() => {
    return (interests || []).filter(
      (interest) => interest.sender?._id === user?._id
    )
  }, [interests, user])

  const receivedInterests = useMemo(() => {
    return (interests || []).filter(
      (interest) => interest.sender?._id !== user?._id
    )
  }, [interests, user])

  const displayFilteredInterests = useCallback(() => {
    if (currentDisplay.startsWith("sent"))
      return sentInterests.map((interest) => (
        <Interest
          key={interest._id}
          isSent={currentDisplay.startsWith("sent")}
          interest={interest}
        />
      ))
    return receivedInterests.map((interest) => (
      <Interest
        key={interest._id}
        isSent={currentDisplay.startsWith("sent")}
        interest={interest}
      />
    ))
  }, [currentDisplay, sentInterests, receivedInterests])

  return (
    <Box pos="relative" minH="80dvh">
      <MyAdsHeader
        background="white"
        heading={`${currentDisplay} Interests`}
        pathname={"/interests"}
        filters={[
          {
            displayText: `received(${receivedInterests.length})`,
            filterText: "received",
          },
          { displayText: `sent(${sentInterests.length})`, filterText: "sent" },
        ]}
      />
      {loading && interests?.length === 0 && <CenteredSpinner />}
      {failedToFetch && !loading && !interests?.length && (
        <FailureUIWithRetryButton
          handleRetry={() => reloadInterests()}
          text="An error was encountered while trying to load your interests"
        />
      )}
      {!failedToFetch && !loading && interests?.length === 0 && (
        <Empty
          heading={"No interests yet"}
          text={`Interests you ${currentDisplay.startsWith("sent") ? "send" : "receive"} will appear here`}
        />
      )}
      <VStack
        w="90%"
        maxW={{ lg: "80%" }}
        alignItems="center"
        gap="1rem"
        py="3rem"
        justifyContent="center"
        mx="auto"
      >
        {displayFilteredInterests()}
      </VStack>
    </Box>
  )
}

function Interest({
  isSent,
  interest,
}: {
  isSent?: boolean
  interest: InterestInterface
}) {
  const router = useRouter()
  // const { unsendInterest, acceptInterest, declineInterest } =
  //   useContext(InterestsContext)
  // const [loading, setLoading] = useState(false)
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

  // const handleUnsend = useCallback(async () => {
  //   if (loading) return
  //   setLoading(true)
  //   await unsendInterest(interest?._id)
  //   setLoading(false)
  // }, [interest, unsendInterest])

  // const handleAccept = useCallback(async () => {
  //   if (loading) return
  //   setLoading(true)
  //   await acceptInterest(interest?._id)
  //   setLoading(false)
  // }, [interest, acceptInterest])

  // const handleDecline = useCallback(async () => {
  //   if (loading) return
  //   setLoading(true)
  //   await declineInterest(interest?._id)
  //   setLoading(false)
  // }, [interest, declineInterest])

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
