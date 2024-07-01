import Baloon from "@/app/_assets/SVG/Baloon"
import CalenderIcon from "@/app/_assets/SVG/CalenderIcon"
import JobIcon from "@/app/_assets/SVG/JobIcon"
import LeftChevron from "@/app/_assets/SVG/LeftChevron"
import { Listing } from "@/app/_types/Listings"
import { capitalizeFirstLetter } from "@/app/_utils"
import {
  ProfileCard,
  ProfileIconTextPair,
} from "@/app/users/_components/UserOverview"
import { Heading, VStack, Box, Flex, Text, Avatar } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import { GiGraduateCap } from "react-icons/gi"
import { IoInformationCircle } from "react-icons/io5"

function getStringRepresentationOfYearOfBirth(yearOfBirth: number) {
  const decade = Math.floor(yearOfBirth / 10) * 10
  return `${decade}'s`
}

export default function ListingOwnerSection({
  listing,
}: {
  listing: Listing
}) {
  const router = useRouter()
  return (
    <Box
      id="owner-section"
      w="100%"
      h="30rem"
      mt="6rem"
      mb="5rem"
      px={{ base: "1rem", sm: "0" }}
    >
      <Heading fontSize="2.2rem" fontWeight="600" mb="2rem">
        Meet the owner
      </Heading>
      <ProfileCard
        heading={
          <Flex gap="1rem" alignItems="center">
            <Avatar
              size="md"
              w="4rem"
              h="4rem"
              name={`${listing.owner?.firstName} ${listing.owner?.lastName}`}
              src={listing.owner?.profileImage?.secure_url}
            />
            <Text as="span">
              {`About ${capitalizeFirstLetter(listing.owner?.firstName || "")}`}
            </Text>
          </Flex>
        }
      >
        <VStack alignItems="start" gap="1.5rem">
          {listing.owner?.dob && (
            <ProfileIconTextPair
              startText="Born in the "
              mainText={getStringRepresentationOfYearOfBirth(
                new Date(listing.owner?.dob).getFullYear()
              )}
              icon={<Baloon />}
            />
          )}
          <ProfileIconTextPair
            startText={listing.owner?.isStudent ? "Studies at" : "Occupation: "}
            mainText={
              listing.owner?.isStudent
                ? listing.owner.school
                : listing?.owner?.occupation
            }
            icon={
              listing.owner?.isStudent ? (
                <GiGraduateCap size={24} />
              ) : (
                <JobIcon />
              )
            }
          />
          <ProfileIconTextPair
            startText="Originates from"
            mainText={`${listing?.owner?.stateOfOrigin} ${listing.owner?.countryOfOrigin || ""}`}
            icon={<CalenderIcon />}
          />
          <VStack
            as="p"
            fontSize="1.5rem"
            alignItems="start"
            justifyContent="start"
            gap=".6rem"
          >
            <Text
              as="span"
              display="flex"
              alignItems="center"
              justifyContent="start"
              gap=".6rem"
            >
              <IoInformationCircle size="20" />
              <Text as="span" fontWeight="500" lineHeight="normal">
                {`About ${capitalizeFirstLetter(listing.owner?.firstName || "")}`}
              </Text>{" "}
            </Text>
            <Text as="span" noOfLines={2}>
              {listing?.owner?.about}
            </Text>
            <Text
              as="button"
              _hover={{ textDecor: "underline" }}
              fontSize="1.5rem"
              display="flex"
              alignItems="center"
              gap=".5rem"
              fontWeight="600"
              onClick={() => router.push(`/users/${listing.owner?._id}`)}
            >
              View full profile
              <Text as="span" display="block" transform="rotate(180deg)">
                <LeftChevron />
              </Text>
            </Text>
          </VStack>
        </VStack>
      </ProfileCard>
    </Box>
  )
}
