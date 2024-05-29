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
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react"
import CheckIcon from "../../_assets/SVG/CheckIcon"
import { TimesIconSmall } from "../../_assets/SVG/TimesIcon"
import { useCallback, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { FavoriteType } from "../../_types/Favorites"
import { Listing } from "../../_types/Listings"
import User from "../../_types/User"
import TimeSince from "../../_components/TimeSince"
import { useRouter } from "next/navigation"
import CenteredSpinner from "../../_components/CenteredSpinner"
import useActOnInterest from "../../_hooks/useActOnInterest"
import { useAppDispatch, useAppSelector } from "../../_redux"
import { withPrependPortal } from "@/app/_components/_HOC/withPrependPortal"
import AppNotification from "@/app/_components/AppNotification"
import { resetError } from "@/app/_redux/slices/listings.slice"
import InterestInterface from "../../_types/Interest"
import NoResultsDisplay from "@/app/_components/NoResultsDisplay"
import InterestComponent from "@/app/_components/Interest"

export default function Page() {
  const { interests, loading, hasError, errorMessage } = useAppSelector(
    (store) => store.interests
  )
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((store) => store.auth)
  const searchParams = useSearchParams()
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

  return (
    <Box pos="relative" py="3rem">
      {withPrependPortal(
        <AppNotification
          onClose={() => {
            dispatch(resetError())
          }}
        >
          {hasError && errorMessage}
        </AppNotification>,
        document.body
      )}
      <Heading
        mb={{ base: "2.2rem" }}
        w="full"
        px={{ base: "2rem", md: "5rem" }}
        fontSize={{ base: "2.6rem", sm: "3.2rem" }}
        fontWeight="500"
      >
        Interests
      </Heading>
      <Tabs isFitted variant="line" colorScheme="blackAlpha" size="lg">
        <TabList fontSize="1.4rem">
          <Tab
            px="0"
            fontSize={{ base: "1.4rem", md: "1.6rem" }}
            fontWeight="600"
          >
            Received ({receivedInterests.length})
          </Tab>
          <Tab
            px="0"
            fontSize={{ base: "1.4rem", md: "1.6rem" }}
            fontWeight="600"
          >
            Sent ({sentInterests.length})
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel px="0">
            {
              <InterestsList
                interests={receivedInterests}
                loading={loading}
                isSent={false}
              />
            }
          </TabPanel>
          <TabPanel px="0">
            {
              <InterestsList
                interests={sentInterests}
                loading={loading}
                isSent
              />
            }
          </TabPanel>
        </TabPanels>
      </Tabs>
      {loading && <CenteredSpinner />}
    </Box>
  )
}

function InterestsList({
  interests,
  isSent,
  loading,
}: {
  interests: InterestInterface[]
  isSent: boolean
  loading: boolean
}) {
  if (interests.length === 0 && !loading)
    return (
      <NoResultsDisplay
        heading={<>Oops! Nothing here.</>}
        body={<>Interests you {isSent ? "send" : "receive"} will appear here</>}
      />
    )
  return (
    <>
      {interests.map((interest) => (
        <InterestComponent
          key={interest._id}
          isSent={isSent}
          interest={interest}
        />
      ))}
    </>
  )
}
