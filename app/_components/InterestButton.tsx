import { Button, Text, TextProps } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import { useState, useMemo, useCallback, ReactNode } from "react"
import toast from "react-hot-toast"
import EditIcon from "../_assets/SVG/EditIcon"
import { PersonIconTwo } from "../_assets/SVG/PersonIcon"
import useAxios from "../_hooks/useAxios"
import { useAppSelector, useAppDispatch } from "../_redux"
import { updateUser } from "../_redux/slices/auth.slice"
import { addNewInterest } from "../_redux/slices/interests.slice"

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
  const [, setShowPremiumModal] = useState(false)

  const existingInterest = useMemo(
    () =>
      interests?.find(
        (interest) => interest.doc._id === doc || interest.sender?._id === doc
      ),
    [doc, interests]
  )

  console.log(existingInterest, interests)
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
    if (res.statusCode === 402) setShowPremiumModal(true)
    else if (res.statusCode === 201) {
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

  const display = useMemo(() => {
    if (existingInterest) {
      if (isSender) return "Interest sent"
      if (existingInterest.accepted) return "Send message"
      return "Accept"
    }
    return "Show Interest"
  }, [existingInterest, isSender])

  const buttonProps = useMemo(() => {
    if (existingInterest)
      return {
        title: `You will notified when ${(existingInterest?.doc as any)?.firstName || (existingInterest?.doc as any)?.owner?.firstName} accepts your interest`,
        isDisabled: isSender,
      }
    return {
      onClick: handleSendInterest,
    }
  }, [existingInterest, handleSendInterest, router])

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
        _hover={{ filter: "brightness(100%)", color: "brand.main" }}
        _disabled={{
          bg: "brand.10",
          color: "brand.main",
          _hover: { filter: "brightness(100%)", color: "brand.main" },
          cursor: "not-allowed",
        }}
        isLoading={sendingInterest}
        isDisabled={isSender}
        {...buttonProps}
      >
        {display} <PersonIconTwo />
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
