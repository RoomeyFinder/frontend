import { Flex, Heading, Input, Textarea, Button, Box, Text } from "@chakra-ui/react"
import {
  ChangeEventHandler,
  RefObject,
  useState,
  FormEventHandler,
  useCallback,
  useMemo,
} from "react"
import RightArrow from "../_assets/RightArrow"
import PageInput from "../_components/PublicPages/Input"
import { socialMediaLinks } from "../_data/navLinks"
import StandAloneIcon from "../_components/StandaloneIcon"
import EmailIcon from "../_assets/EmailIcon"

export function ContactForm({
  formData,
  handleChange,
  formRef,
  isLoading,
  handleSubmit
}: {
  formData: {
    name: string
    email: string
    message: string
  }
  isLoading: boolean
  handleChange: ChangeEventHandler<HTMLInputElement>
  formRef: RefObject<HTMLDivElement>
  handleSubmit: () => void
}) {
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
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
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
            <Button
              isLoading={isLoading}
              loadingText="Sending Message..."
              _loading={{ backgroundColor: "brand.secondary"}}
              variant="brand-secondary"
              w="full"
              type="submit"
            >
              Send Message
            </Button>
          </Flex>
        </Box>
      </Flex>
    </>
  )
}

export function HeroInput({
  handleSubmit,
}: {
  handleSubmit: (val: string) => void
}) {
  const [heroInputValue, setHeroInputValue] = useState("")

  const submitValue: FormEventHandler = useCallback(
    (e) => {
      e.preventDefault()
      handleSubmit(heroInputValue)
      setHeroInputValue("")
    },
    [handleSubmit, heroInputValue]
  )
  return (
    <Box mt="3rem" as="form" onSubmit={submitValue}>
      <PageInput
        inputProps={{
          placeholder: "Say hi to us",
          _placeholder: {
            color: "gray.100",
          },
          value: heroInputValue,
          onChange: (e) => {
            setHeroInputValue(e.target.value)
          },
        }}
        icon={<RightArrow />}
        iconProps={{ onClick: submitValue }}
      />
    </Box>
  )
}

export function SocialLinks() {
  const links = useMemo(
    () =>
      socialMediaLinks.filter((it) => it.name.toLowerCase() !== "instagram"),
    []
  )
  return (
    <Flex gap="1.7rem" alignItems="center">
      {links.map(({ Icon, href, name }) => (
        <Text key={href} as="a" href={href} aria-description={name} target="_blank">
          <StandAloneIcon aria-label={name}>
            <Icon size="sm" variant="bird" />
          </StandAloneIcon>
        </Text>
      ))}
      <Text lineHeight="normal" as="a" href="mailto:exploitenomah@gmail.com" target="_blank" aria-description={"Email"}>
        <StandAloneIcon aria-label={"Email"}>
          <EmailIcon />
        </StandAloneIcon>
      </Text>
    </Flex>
  )
}
