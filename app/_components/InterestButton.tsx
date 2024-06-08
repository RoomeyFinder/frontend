import { Button, Text, TextProps } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useContext, useState, useMemo, useCallback, ReactNode } from "react"
import toast from "react-hot-toast"
import EditIcon from "../_assets/SVG/EditIcon"
import { PersonIconTwo } from "../_assets/SVG/PersonIcon"
import useAxios from "../_hooks/useAxios"
import { InterestsContext } from "../_providers/InterestsProvider"
import { useAppSelector, useAppDispatch } from "../_redux"
import { updateUser } from "../_redux/slices/auth.slice"

export default function InterestButton({
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
  const { user } = useAppSelector((store) => store.auth)
  const dispatch = useAppDispatch()
  const { addNewInterest, interests } = useContext(InterestsContext)
  const [sendingInterest, setSendingInterest] = useState(false)
  const [showPremiumModal, setShowPremiumModal] = useState(false)

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
    if (res.statusCode === 402) setShowPremiumModal(true)
    else if (res.statusCode === 201) {
      addNewInterest(res.interest)
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
  }, [fetchData, doc, docType, addNewInterest, docOwner, user, dispatch])

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
    <>
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
