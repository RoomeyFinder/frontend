import EditIcon from "@/app/_assets/SVG/EditIcon"
import ProfileAvatar from "@/app/_components/ProfileAvatar"
import User from "@/app/_types/User"
import {
  Avatar,
  AvatarGroup,
  Button,
  Flex,
  HStack,
  Heading,
  Hide,
  Link,
  Text,
  TextProps,
  VStack,
} from "@chakra-ui/react"
import { ReactNode, useCallback, useContext, useMemo, useState } from "react"
import ProfilePhotos, { ProfilePhotosModal } from "./ProfilePhotos"
import { useRouter } from "next/navigation"
import useAxios from "@/app/_hooks/useAxios"
import { UserContext } from "@/app/_providers/UserProvider"
import { InterestsContext } from "@/app/_providers/InterestsProvider"
import toast from "react-hot-toast"
import { PersonIconTwo } from "@/app/_assets/SVG/PersonIcon"

const genderMapping = {
  female: "F",
  male: "M",
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
                valueNode={userData.interestCount ?? 20}
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
          <ProfileAvatar
            width={{ base: "10rem", md: "12rem" }}
            height={{ base: "10rem", md: "12rem" }}
            showVerifiedBadge
            imageSrc={userData.profileImage?.secure_url}
          />
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

export function InterestButton({
  isOwner,
  variant,
  doc,
  docType,
  docOwner,
}: {
  isOwner: boolean
  variant?: string
  doc: string
  docType: "User" | "Listing"
  docOwner: string
}) {
  const router = useRouter()
  const { fetchData } = useAxios()
  const { user } = useContext(UserContext)
  const { addNewInterest, interests } = useContext(InterestsContext)
  const [sendingInterest, setSendingInterest] = useState(false)

  const existingInterest = useMemo(
    () =>
      interests?.find(
        (interest) => interest.doc._id === doc || interest.sender?._id === doc
      ),
    [doc, interests]
  )

  const isSender = useMemo(
    () =>
      existingInterest?.sender?._id &&
      existingInterest?.sender?._id === user?._id
        ? true
        : false,
    [existingInterest, user?._id]
  )

  const handleSendInterest = useCallback(async () => {
    const body = {
      sender: user?._id,
      doc,
      type: docType,
      docOwner,
    }
    setSendingInterest(true)
    const res = await fetchData({ url: "/interests", method: "post", body })
    if (res.statusCode === 201) addNewInterest(res.interest)
    else
      toast.error(
        res.message ||
          "Sorry, we are unable to send that interest at the moment. Please try again."
      )
    setSendingInterest(false)
  }, [fetchData, user, doc, docType, addNewInterest, docOwner])

  const display = useMemo(() => {
    if (isOwner) return "Edit Profile"
    else {
      if (existingInterest)
        return isSender ? "Interest sent" : "Interest received"
      return "Show Interest"
    }
  }, [isOwner, existingInterest, isSender])

  const buttonProps = useMemo(() => {
    if (isOwner)
      return {
        onClick: () => router.push("/profile?edit=true"),
      }
    else {
      if (existingInterest)
        return {
          title: `You will notified when ${(existingInterest?.doc as any)?.firstName || (existingInterest?.doc as any)?.owner?.firstName} accepts your interest`,
          isDisabled: true,
        }
      return {
        onClick: handleSendInterest,
      }
    }
  }, [isOwner, existingInterest, handleSendInterest, router])

  return (
    <Button
      fontWeight="400"
      display="flex"
      alignItems="end"
      variant={variant || "brand-secondary"}
      minW={{ md: "18.5rem" }}
      _loading={{
        bg: "brand.main !important",
        color: "white !important",
        opacity: ".3",
        justifyContent: "center !important",
        alignItems: "center !important",
        py: "1.5rem"
      }}
      _disabled={{
        bg: "transparent",
        color: "",
        _hover: { bg: "transparent", color: "brand.main" },
        p: "0",
        justifyContent: "start",
      }}
      isLoading={sendingInterest}
      {...buttonProps}
    >
      {display} {isOwner ? <EditIcon /> : <PersonIconTwo />}
    </Button>
  )
}

function KeyValue({
  keyNode,
  valueNode,
  generalProps = {},
  keyProps = {},
  valueProps = {},
}: {
  keyNode: ReactNode
  valueNode: ReactNode
  generalProps?: TextProps
  keyProps?: TextProps
  valueProps?: TextProps
}) {
  return (
    <Text
      textTransform="capitalize"
      fontSize="1.3rem"
      lineHeight="1.52rem"
      {...generalProps}
    >
      <Text color="black" as="span" {...keyProps}>
        {keyNode}:
      </Text>
      &nbsp;
      <Text as="span" color="gray.main" {...valueProps}>
        {valueNode}
      </Text>
    </Text>
  )
}
