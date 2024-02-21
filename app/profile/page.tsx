"use client"
import { useSearchParams } from "next/navigation"
import ProfileEditForm from "./_ProfileEditForm"
import { Box, Flex, Spinner } from "@chakra-ui/react"
import useGetFromStorage from "../_hooks/useGetFromStorage"
import { Suspense } from "react"

export default function Profile(){
  return (
    <Suspense 
      fallback={
        <Flex justifyContent="center" alignItems="center">
          <Spinner size="xl" thickness=".4rem" />
        </Flex>}>
      <Renderer />
    </Suspense>
  )
}

function Renderer(){
  const { data: userData, loading, updateData } = useGetFromStorage("rfuser")
  const searchParams = useSearchParams()
  if(loading) {
    return (
      <Flex justifyContent="center" alignItems="center">
        <Spinner size="xl" thickness=".4rem" />
      </Flex>
    )
  }
  if (searchParams.get("edit") === "true" && userData !== null) {
    return (
      <Box>
        <ProfileEditForm setUserData={updateData} userData={userData} />
      </Box>
    )
  }
  return (
    <>View profile</>
  )
}