"use client"
import InputLabel from "@/app/_components/InputLabel"
import useAxios, { RequestBody } from "@/app/_hooks/useAxios"
import { Flex, Heading, InputGroup, Input, Button } from "@chakra-ui/react"
import { FormEventHandler, useCallback, useState } from "react"


export default function PasswordChangeForm() {
  const { fetchData } = useAxios()
  const [isValidOldPassword, setIsValidOldPassword] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [oldPassword, setOldPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const sendRequest = useCallback(async (body: { oldPassword: string, newPassword?: string }) => await fetchData({
    url: "/users/change-password",
    body: body as RequestBody,
    method: "post",
  }), [fetchData])

  const handleSubmitNewPassword: FormEventHandler = useCallback(async (e) => {
    e.preventDefault()
    console.log(newPassword=== confirmNewPassword, oldPassword)
    if(newPassword.length <= 0) return 
    if(newPassword !== confirmNewPassword) return
    setLoading(true)
    const res = await sendRequest({ oldPassword, newPassword })
    console.log(res)
    if(res.statusCode === 200){
      setIsValidOldPassword(false)
      alert(res.message)
      setOldPassword("")
      setNewPassword("")
      setConfirmNewPassword("")
    }
    setLoading(false)
  }, [confirmNewPassword, newPassword, oldPassword, sendRequest])

  const handleSubmitOldPassword: FormEventHandler = useCallback(async (e) => {
    e.preventDefault()
    if (oldPassword.length === 0) return
    setLoading(true)
    const res = await sendRequest({ oldPassword })
    if(res.statusCode === 200) setIsValidOldPassword(res.isValidPassword)
    setLoading(false)
  }, [oldPassword, sendRequest])

  return (
    <Flex
      maxW="85.5rem"
      gap={{ base: "1.5rem", lg: "3rem" }}
      flexDir="column"
      as="form"
      onSubmit={isValidOldPassword ? handleSubmitNewPassword : handleSubmitOldPassword}
    >
      <Heading
        size="md"
        variant="700"
        as="h2"
      >
        Password
      </Heading>
      { isValidOldPassword ? 
        <>
          <InputGroup flexDir="column" gap="1rem">
            <InputLabel>New password</InputLabel>
            <Input placeholder="00000000" onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />
          </InputGroup>
          <InputGroup flexDir="column" gap="1rem">
            <InputLabel>Confirm password</InputLabel>
            <Input placeholder="00000000" onChange={(e) => setConfirmNewPassword(e.target.value)} value={confirmNewPassword} />
          </InputGroup>
        </> :
        <InputGroup flexDir="column" gap="1rem">
          <InputLabel>Current password</InputLabel>
          <Input placeholder="00000000" onChange={(e) => setOldPassword(e.target.value)} value={oldPassword} />
        </InputGroup>
      }
      <Button isLoading={loading} type="submit" variant="brand-secondary" fontWeight="400" maxW="18.5rem">
        Change Password
      </Button>
    </Flex>
  )
}