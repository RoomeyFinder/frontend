import ProfileAvatar from "@/app/_components/ProfileAvatar"
import User from "@/app/_types/User"
import {
  Avatar,
  AvatarGroup,
  Flex,
  HStack,
  Heading,
  Hide,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react"
import { useCallback, useState } from "react"
import ProfilePhotos, { ProfilePhotosModal } from "./ProfilePhotos"
import { timeAgo } from "@/app/_utils/date"
import ActiveBall from "@/app/_assets/SVG/ActiveBall"
import InterestButton, { KeyValue } from "@/app/_components/InterestButton"

const genderMapping = {
  Female: "F",
  Male: "M",
}

export default function ProfileOverview({
  userData,
  isOwner,
  hasSentInterest,
  handleRemoveInterest,
}: {
  userData: User
  isOwner?: boolean
  hasSentInterest: boolean
  handleRemoveInterest?: () => void
}) {
  const [show, setShow] = useState(false)
  const [activePhotoIdx, setActivePhotoIdx] = useState(0)

  const handlePhotoClick = useCallback((idx: number) => {
    setActivePhotoIdx(idx)
    setShow(true)
  }, [])

  return (
    <>
      {userData.photos.length > 0 && (
        <ProfilePhotosModal
          show={show}
          photos={userData.photos}
          close={() => setShow(false)}
          activeIdx={activePhotoIdx}
        />
      )}
      <Flex
        flexDir={{ md: "row-reverse" }}
        alignItems="start"
        justifyContent={{
          base: "space-between",
          md: "start",
        }}
        w="full"
        gap={{ md: "3rem" }}
      >
        <Flex gap="2rem" w="full" justifyContent="space-between">
          <VStack
            alignItems={{ base: "start" }}
            textAlign={{ base: "left", md: "left" }}
          >
            <Heading variant="xl">
              {!isOwner && <>Hi, I&apos;m </>}
              {userData.firstName} {isOwner && userData.lastName}
            </Heading>
            {isOwner && (
              <KeyValue
                keyNode="Interest Left"
                generalProps={{ fontSize: "1.6rem", my: ".5rem" }}
                valueNode={userData.countOfInterestsLeft}
              />
            )}
            <VStack gap=".2rem" alignItems={{ md: "start" }}>
              <KeyValue
                keyNode="Occupation"
                valueNode={userData.isStudent ? "Student" : userData.occupation}
              />
              <KeyValue
                keyNode="Age"
                valueNode={`${
                  new Date(Date.now()).getFullYear() -
                  new Date(userData.dob).getFullYear()
                }yrs`}
              />
              <KeyValue
                keyNode="Sex"
                valueNode={genderMapping[userData.gender]}
              />
              <KeyValue
                keyNode="State of origin"
                valueNode={`${userData.stateOfOrigin || ""} ${userData.countryOfOrigin || "Not provided"}`}
              />
              <Text
                textTransform="capitalize"
                color="brand.main"
                fontSize="1.3rem"
                as={Link}
                href="/profile/account"
              >
                Get Verified
              </Text>
            </VStack>
            <HStack alignItems="center" gap="2rem" mt="1.5rem">
              <InterestButton
                docOwner={userData._id}
                isOwner={isOwner as boolean}
                doc={userData._id}
                docType={"User"}
              />
              {hasSentInterest === false ||
                (isOwner === true && (
                  <Text
                    onClick={handleRemoveInterest}
                    as="button"
                    fontSize="1.4rem"
                    fontWeight="500"
                    textDecor="underline"
                  >
                    Undo
                  </Text>
                ))}
            </HStack>
          </VStack>
          <Hide below="md">
            <ProfilePhotos
              photos={userData.photos}
              onPhotoClick={(idx) => handlePhotoClick(idx)}
              name={isOwner ? "me" : userData.firstName || userData.lastName}
            />
          </Hide>
        </Flex>
        <VStack gap="2rem">
          <VStack alignItems="start" gap=".5rem">
            <ProfileAvatar
              width={{ base: "10rem", md: "12rem" }}
              height={{ base: "10rem", md: "12rem" }}
              showVerifiedBadge
              imageSrc={userData.profileImage?.secure_url}
            />
            {!isOwner && (
              <Text
                display="flex"
                alignItems="center"
                gap=".5rem"
                alignSelf="center"
                color="black"
                fontSize="1.3rem"
              >
                <ActiveBall color={userData.isOnline ? "#009A49" : "#707070"} />
                Active&nbsp;
                {!userData.isOnline && (
                  <Text color="gray.main" as="span">
                    {timeAgo(new Date(userData.lastSeen))} ago
                  </Text>
                )}
              </Text>
            )}
          </VStack>
          <Hide above="md">
            <AvatarGroup size={{ base: "md", sm: "lg" }} max={2}>
              {userData.photos.map((photo, idx) => (
                <Avatar
                  onClick={() => handlePhotoClick(idx)}
                  src={photo.secure_url}
                  key={photo._id}
                />
              ))}
            </AvatarGroup>
          </Hide>
        </VStack>
      </Flex>
    </>
  )
}
