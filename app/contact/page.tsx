"use client"
import { Heading, Flex } from "@chakra-ui/react"
import { useState, useRef, useCallback, ChangeEventHandler } from "react"
import { ContactForm } from "./_Components"
import PageText from "../_components/PublicPages/Text"
import useAxios from "../_hooks/useAxios"
import toast from "react-hot-toast"

const initialState = {
  name: "",
  email: "",
  message: "",
}
export default function ContactPage() {
  const { fetchData, isFetching } = useAxios()
  const formRef = useRef<HTMLDivElement | null>(null)
  const [formData, setFormData] = useState(initialState)
  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    },
    []
  )
  const handleSubmitContactForm = useCallback(async () => {
    const response = await fetchData({
      url: "/feedbacks",
      method: "post",
      body: formData,
    })
    const isError = response.statusCode !== 201
    toast[isError ? "error" : "success"](response.message)
    if (!isError) {
      setFormData(initialState)
    }
  }, [formData, fetchData])

  return (
    <>
      <Flex flexDir="column" alignItems="center" pos="relative" py="4rem">
        <Heading as="h2" variant="md" mb="1rem" fontWeight="500">
          Contact Us
        </Heading>
        <PageText
          textAlign="center"
          mx="auto"
          fontSize="1.6rem"
          px="2rem"
          letterSpacing=".2px"
          maxW="56rem"
          color="gray.main"
          mb="2rem"
        >
          Connect with us easily, whether you have questions, feedback, or just
          want to say hello, we&apos;re here and ready to hear from you
        </PageText>
        <ContactForm
          formRef={formRef}
          formData={formData}
          isLoading={isFetching}
          handleChange={handleChange}
          handleSubmit={handleSubmitContactForm}
        />
      </Flex>
    </>
  )
}
