import { Button, Text, TextProps } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import { useState, useMemo, useCallback, ReactNode } from "react"
import toast from "react-hot-toast"
import useAxios from "../_hooks/useAxios"
import { useAppSelector, useAppDispatch } from "../_redux"
import { updateUser } from "../_redux/slices/auth.slice"
import { addNewInterest } from "../_redux/slices/interests.slice"
import { Listing } from "../_types/Listings"
import { capitalizeFirstLetter } from "../_utils"
import { PersonIconTwo } from "../_assets/SVG/PersonIcon"
import useActOnInterest from "../_hooks/useActOnInterest"

export default function InterestButton({
  doc,
  docType,
  docOwner,
}: {
  doc: string
  docType: "User" | "Listing"
  docOwner: string
}) {
  const router = useRouter()
  const { fetchData } = useAxios()
  const { user } = useAppSelector((store) => store.auth)
  const dispatch = useAppDispatch()
  const { interests } = useAppSelector((store) => store.interests)
  const [sendingInterest, setSendingInterest] = useState(false)

  const existingInterest = useMemo(
    () =>
      interests?.find(
        (interest) =>
          interest.sender?._id === doc ||
          interest.doc?._id === doc ||
          (interest.doc as Listing)?.owner?._id === doc
      ),
    [doc, interests]
  )
  const { handleAccept, loading } = useActOnInterest(existingInterest)
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
    if (res.statusCode === 201) {
      res.alreadyReceivedInterest &&
        toast.success(
          `${capitalizeFirstLetter(res.interest?.sender.firstName || "")} already sent you an interest!`,
          { duration: 5000 }
        )
      dispatch(addNewInterest(res.interest))
      user &&
        dispatch(
          updateUser({
            ...user,
            countOfInterestsLeft: user.countOfInterestsLeft - 1,
          })
        )
    } else
      toast.error(
        res.message ||
          "Sorry, we are unable to send that interest at the moment. Please try again."
      )
    setSendingInterest(false)
  }, [fetchData, doc, docType, docOwner, user, dispatch])

  const buttonProps = useMemo(() => {
    if (existingInterest) {
      if (existingInterest.accepted)
        return {
          onClick: () => {
            console.log("djdjaccepted")
          },
          children: "Send message",
        }
      if (isSender)
        return {
          title: `You will notified when ${(existingInterest?.doc as any)?.firstName || (existingInterest?.doc as any)?.owner?.firstName} accepts your interest`,
          isDisabled: isSender,
          children: "Interest sent",
        }
      return {
        children: "Accept interest",
        onClick: () => handleAccept(),
      }
    }
    return {
      onClick: handleSendInterest,
      children: "Show Interest",
    }
  }, [existingInterest, handleSendInterest, router, isSender, handleAccept])

  return (
    <>
      <Button
        fontWeight="400"
        display="flex"
        alignItems="end"
        py={{ base: "1rem" }}
        px={{ base: "1.2rem" }}
        variant={"brand"}
        minW={{ md: "18.5rem" }}
        _loading={{
          bg: "brand.main !important",
          color: "white !important",
          opacity: ".3",
          justifyContent: "center !important",
          alignItems: "center !important",
        }}
        _disabled={{
          bg: "brand.10",
          color: "brand.main",
          _hover: {
            filter: "brightness(100%)",
            bg: "brand.10",
            color: "brand.main",
          },
          cursor: "not-allowed",
        }}
        isLoading={sendingInterest || loading}
        {...buttonProps}
      >
        {buttonProps.children} <PersonIconTwo />
      </Button>
    </>
  )
}

export function KeyValue({
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
