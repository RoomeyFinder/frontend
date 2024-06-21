"use client"
import { Divider, VStack, Heading, Box, Flex } from "@chakra-ui/react"
import Hero from "../_components/PublicPages/Hero"
import { useState, useRef, useCallback, ChangeEventHandler } from "react"
import { HeroInput, ContactForm, SocialLinks } from "./_Components"
import PageText from "../_components/PublicPages/Text"
import useAxios from "../_hooks/useAxios"
import useAppToast from "../_hooks/useAppToast"
import ContactUsSVG from "../_assets/SVG/ContactUs"
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
  }, [toast, formData, fetchData])

  return (
    <>
      {/* <Hero bgImagePath="/images/contact-hero.png">
        <Heading as="h1" variant="large" mb="2rem">
          Contact us:
        </Heading>
        <VStack spacing="3rem" alignItems="start">
          
          <SocialLinks />
          <Divider borderColor="gray.100" />
        </VStack>
        <HeroInput handleSubmit={goToForm} />
      </Hero> */}
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
