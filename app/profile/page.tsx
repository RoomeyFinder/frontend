"use client"
import { useSearchParams } from "next/navigation"
import ProfileEditForm from "./_ProfileEditForm"
import { Box, Flex, Spinner } from "@chakra-ui/react"
import useGetFromStorage from "../_hooks/useGetFromStorage"



export default function Profile(){
  const searchParams = useSearchParams()
  const { data: userData, loading } = useGetFromStorage("rfuser")

  if (loading || userData === null) return (
    <Flex justifyContent="center" alignItems="center">
      <Spinner size="xl" thickness=".4rem" />
    </Flex>
  )
  else if(searchParams.get("edit") === "true" && userData !== null){
    return (
      <Box>
        <ProfileEditForm userData={userData} />
      </Box>
    )
  }
  return (
    <>View profile</>
  )
}