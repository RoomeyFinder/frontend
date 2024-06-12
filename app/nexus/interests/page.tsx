"use client"
import {
  Box,
  Heading,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react"
import { useMemo } from "react"
import CenteredSpinner from "../../_components/CenteredSpinner"
import { useAppDispatch, useAppSelector } from "../../_redux"
import { WithPrependPortal } from "@/app/_components/_HOC/withPrependPortal"
import AppNotification from "@/app/_components/AppNotification"
import { resetError } from "@/app/_redux/slices/interests.slice"
import InterestInterface from "../../_types/Interest"
import NoResultsDisplay from "@/app/_components/NoResultsDisplay"
import InterestComponent from "@/app/_components/Interest"

export default function Page() {
  const { interests, loading, hasError, errorMessage } = useAppSelector(
    (store) => store.interests
  )
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((store) => store.auth)
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

  // console.log(interests, sentInterests, receivedInterests)
  return (
    <Box pos="relative" py="3rem">
      {WithPrependPortal(
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
        <TabPanels
          px={{ base: "2rem", md: "5rem" }}
          mx="auto"
          py={{ base: "2rem", md: "3rem" }}
        >
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
    <SimpleGrid columns={{ base: 1 }}>
      {interests.map((interest) => (
        <InterestComponent
          key={interest._id}
          isSent={isSent}
          interest={interest}
        />
      ))}
    </SimpleGrid>
  )
}
