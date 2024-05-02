"use client"
import { Divider, VStack, Heading } from "@chakra-ui/react"
import Hero from "../_components/PublicPages/Hero"
import {
  useState,
  useRef,
  useCallback,
  ChangeEventHandler,
} from "react"
import { HeroInput, ContactForm, SocialLinks } from "./_Components"
import PageText from "../_components/PublicPages/Text"
import useAxios from "../_hooks/useAxios"
import useAppToast from "../_hooks/useAppToast"

const initialState = {
  name: "",
  email: "",
  message: "",
}
export default function ContactPage() {
  const toast = useAppToast()
  const { fetchData, isFetching } = useAxios()
  const formRef = useRef<HTMLDivElement | null>(null)
  const [formData, setFormData] = useState(initialState)
  const goToForm = useCallback((initialMessage: string) => {
    formRef.current?.scrollIntoView()
    setFormData((prev) => ({ ...prev, message: initialMessage }))
  }, [])
  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    },
    []
  )
  const handleSubmitContactForm = useCallback(
    async () => {
      const response = await fetchData({
        url: "/feedbacks",
        method: "post",
        body: formData,
      })
      const isError = response.statusCode !== 201
      toast.closeAll()
      toast({
        title: isError ? "Oops" : "Thanks for your feedback",
        description: response.message,
        status: isError ? "warning" : "success",
      })
      if (!isError) {
        setFormData(initialState)
      }
    },
    [toast, formData, fetchData]
  )

  return (
    <>
      <Hero bgImagePath="/images/contact-hero.png">
        <Heading as="h1" variant="large" mb="2rem">
          Contact us:
        </Heading>
        <VStack spacing="3rem" alignItems="start">
          <Divider borderColor="gray.100" />
          <PageText>
            Connect with us easily, whether you have questions, feedback, or
            just want to say hello, we&apos;re here and ready to hear from you
          </PageText>
          <SocialLinks />
          <Divider borderColor="gray.100" />
        </VStack>
        <HeroInput handleSubmit={goToForm} />
      </Hero>
      <ContactForm
        formRef={formRef}
        formData={formData}
        isLoading={isFetching}
        handleChange={handleChange}
        handleSubmit={handleSubmitContactForm}
      />
    </>
  )
}
