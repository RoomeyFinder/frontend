import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Link,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react"
import { ReactNode, useContext, useMemo } from "react"
import LikeIcon from "../_assets/SVG/LikeIcon"
import { FilledIcon } from "../_assets/SVG/FilledPlusIcon"
import ShareIcon from "../_assets/SVG/ShareIcon"
import EyeIcon, { EyeIconLarge } from "../_assets/SVG/EyeIcon"
import HouseIcon, { HouseIconLarge } from "../_assets/SVG/HouseIcon"
import { usePaystackPayment } from "react-paystack"
import { UserContext } from "../_providers/UserProvider"
import useGetPaymentStatusLoggers from "../_hooks/useGetPaymentStatusLoggers"
import toast from "react-hot-toast"

const TWO_THOUSAND_NAIRA_IN_KOBO = 200000

export default function PremiumModal({
  show,
  onClose,
}: {
  show: boolean
  onClose: () => void
}) {
  const { user } = useContext(UserContext)
  const hasPremium = useMemo(() => {
    if (!user) return false
    if (!user.premiumPurchaseExpiry) return false
    return new Date(user.premiumPurchaseExpiry).getTime() > Date.now()
  }, [user])
  const initializePayment = usePaystackPayment({
    reference: new Date().getTime().toString(),
    email: user?.email,
    amount: TWO_THOUSAND_NAIRA_IN_KOBO,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
    firstname: user?.firstName,
    lastname: user?.lastName,
    metadata: {
      custom_fields: [
        {
          display_name: "_id",
          variable_name: "_id",
          value: user?._id,
        },
      ],
    },
  })
  const { onSuccessLogger, onCloseLogger } = useGetPaymentStatusLoggers()
  return (
    <>
      <Modal isOpen={show} isCentered onClose={onClose}>
        <ModalOverlay bg="#000000BF" />
        <>
          <ModalContent
            bg="white"
            maxW={{ base: "95dvmin", sm: "55rem" }}
            // minH={{ base: "57rem" }}
            border="1px solid black"
            rounded="1.2rem"
            p={{ base: "1.5rem", md: "3rem" }}
          >
            <ModalBody
              display="flex"
              gap="3rem"
              flexDir="column"
              alignItems="center"
              justifyContent="center"
              fontSize={{ base: "1.8rem", md: "2.4rem" }}
              lineHeight="100%"
              textAlign="center"
            >
              {!hasPremium && (
                <>
                  <Heading lineHeight="100%" fontSize="inherit">
                    Get Premium
                  </Heading>
                  <Flex
                    flexDir="column"
                    gap="3rem"
                    p={{ base: "1rem", md: "2rem" }}
                    alignItems="start"
                    border="1px solid #7070704D"
                    rounded="1.2rem"
                    w="full"
                  >
                    <Heading
                      fontSize="inherit"
                      color="gray.main"
                      fontWeight="600"
                    >
                      Benefits
                    </Heading>
                    <VStack as={List} gap="2rem" w="full">
                      <PremiumBenefit
                        icon={<LikeIcon />}
                        title={<>Higher Interest Limit</>}
                        text={<>30 interests per day</>}
                      />
                      <PremiumBenefit
                        icon={<EyeIconLarge />}
                        title={<>Listing views</>}
                        text={<>See all profile and ad views</>}
                      />
                      <PremiumBenefit
                        icon={<HouseIconLarge />}
                        title={<>Higher ad limit</>}
                        text={<>Upload up to 3 ads</>}
                      />
                    </VStack>
                  </Flex>
                  <VStack justifyContent="start" gap="1rem">
                    <TermsOfService />
                    <Button
                      onClick={() =>
                        initializePayment({
                          onSuccess: (data) => {
                            onSuccessLogger(data)
                            if (data.status === "success") {
                              toast.success(
                                "You are now on RoomeyFinder premium"
                              )
                              onClose()
                            }
                          },
                          onClose: onCloseLogger,
                        })
                      }
                      variant="brand"
                      w="full"
                      p={{ base: "1.5rem", md: "2rem" }}
                    >
                      ₦2000.00&nbsp;/&nbsp;Month
                    </Button>
                  </VStack>
                  <DividerWithCenteredText text="Or" />
                </>
              )}
              {hasPremium && (
                <Heading lineHeight="100%" fontSize="inherit">
                  You have used up your interests for today.
                </Heading>
              )}
              <VStack gap="2rem">
                <Heading fontSize="1.6rem" color="gray.main" fontWeight="600">
                  Share RoomeyFinder for 5 additional interests today
                </Heading>
                <Button
                  variant="brand-secondary"
                  w="full"
                  p={{ base: "1.5rem", md: "2rem" }}
                >
                  <ShareIcon />
                  Share
                </Button>
              </VStack>
            </ModalBody>
          </ModalContent>
        </>
      </Modal>
    </>
  )
}

function PremiumBenefit({
  icon,
  title,
  text,
}: {
  icon: ReactNode
  title: ReactNode
  text: ReactNode
}) {
  return (
    <ListItem w="full">
      <HStack
        justifyContent="space-between"
        textAlign="left"
        gap={{ base: "1rem", md: "1.5rem" }}
        color="gray.main"
        w="full"
      >
        <Flex
          w="5rem"
          h="5rem"
          bg="brand.main"
          rounded="full"
          justifyContent="center"
          alignItems="center"
          color="white"
        >
          {icon}
        </Flex>
        <VStack gap="1rem" alignItems="start" mr="auto">
          <Heading
            color="black"
            fontWeight="600"
            fontSize={{ base: "1.6rem", md: "1.9rem" }}
          >
            {title}
          </Heading>
          <Text fontSize={{ base: "1.4rem", md: "1.6rem" }}>{text}</Text>
        </VStack>
        <FilledIcon />
      </HStack>
    </ListItem>
  )
}

function TermsOfService() {
  return (
    <Text
      lineHeight="120%"
      color="gray.main"
      fontSize={{ base: "1rem", md: "1.2rem" }}
      whiteSpace={{ base: "wrap", md: "nowrap" }}
    >
      By continuing, I agree to Roomeyfinder&apos;s&nbsp;
      <Link fontWeight="600" color="brand.main" href="/terms-of-service">
        Terms of Service
      </Link>
      &nbsp;and&nbsp;
      <Link fontWeight="600" color="brand.main" href="/privacy-policy">
        Privacy&nbsp;Policy
      </Link>
    </Text>
  )
}

export function DividerWithCenteredText({ text }: { text: ReactNode }) {
  return (
    <Box pos="relative" py=".8rem" w="full">
      <Text h="1px" w="full" bg="gray.100">
        <Text
          as="span"
          textAlign="center"
          whiteSpace="nowrap"
          pos="absolute"
          display="inline-block"
          top="50%"
          left="50%"
          transform="translate(-50%,-50%)"
          bg="white"
          px=".8rem"
          fontSize="1.4rem"
          lineHeight="2.3rem"
          w="fit-content"
          color="gray.100"
        >
          {text}
        </Text>
      </Text>
    </Box>
  )
}
