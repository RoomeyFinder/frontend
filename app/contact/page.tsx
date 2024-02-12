"use client"
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react"
import Hero from "../_components/PublicPages/Hero"
import PageInput from "../_components/PublicPages/Input"
import RightArrow from "../_assets/RightArrow"
import {
  useState,
  useRef,
  useCallback,
  RefObject,
  FormEvent,
  ChangeEventHandler,
} from "react"

export default function Home() {
  const [inputValue, setInputValue] = useState("")
  const [initialFormValue, setInitialFormValue] = useState("")
  const formRef = useRef<HTMLDivElement | null>(null)

  const goToForm = useCallback(
    (e: FormEvent | MouseEvent) => {
      e.preventDefault()
      formRef.current?.scrollIntoView()
      setInputValue("")
    },
    [inputValue]
  )
  return (
    <>
      <Hero bgImagePath="/images/contact-hero.png">
        <Heading as="h1" variant="large" mb="2rem">
          Contact us:
        </Heading>
        <Divider borderColor="gray.100" />
        <Text
          fontSize={{ base: "1.3rem", md: "1.6rem" }}
          color="black"
          my="3rem"
          lineHeight="2.2rem"
        >
          Have any questions?
        </Text>
        <Divider borderColor="gray.100" />
        <Box mt="3rem" as="form" onSubmit={goToForm}>
          <PageInput
            inputProps={{
              placeholder: "Say hi to us",
              _placeholder: {
                color: "gray.100",
              },
              value: inputValue,
              onChange: (e) => {
                setInputValue(e.target.value)
                setInitialFormValue(e.target.value)
              },
            }}
            icon={<RightArrow />}
            iconProps={{ onClick: goToForm }}
          />
        </Box>
      </Hero>
      <ContactForm formRef={formRef} initialMessage={initialFormValue} />
    </>
  )
}

function ContactForm({
  initialMessage,
  formRef,
}: {
  initialMessage?: string
  formRef: RefObject<HTMLDivElement>
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: initialMessage,
  })

  console.log(initialMessage, formData.message, "here")
  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    },
    []
  )

  return (
    <>
      <Flex
        minH="40dvh"
        bg="white"
        textAlign="center"
        justifyContent="center"
        w="100%"
        py={{ base: "8rem", md: "5rem" }}
        ref={formRef}
      >
        <Box w="95dvw">
          <Heading as="h2" variant="md" mb="3rem">
            Leave a message
          </Heading>
          <Flex
            flexWrap="wrap"
            gap="3rem"
            w="full"
            justifyContent="center"
            as="form"
            maxW="60rem"
            mx="auto"
          >
            <Input
              placeholder="Your name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              borderColor="#7070704D"
            />
            <Input
              placeholder="Your email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              borderColor="#7070704D"
            />
            <Input
              onChange={handleChange}
              name="message"
              value={formData.message}
              as={Textarea}
              placeholder="Your message"
              resize="none"
              h="25rem"
              rounded="1.2rem"
              borderColor="#7070704D"
            />
            <Button variant="brand-secondary" w="full">
              Send Message
            </Button>
          </Flex>
        </Box>
      </Flex>
    </>
  )
}
