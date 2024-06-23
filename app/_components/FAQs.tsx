import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
} from "@chakra-ui/react"
import { ReactNode } from "react"

export default function FAQS() {
  return (
    <>
      <Heading
        variant="sm"
        fontSize="3.6rem"
        mt="7rem"
        mb="4rem"
        fontWeight="500"
        textAlign="center"
        mx="auto"
      >
        Frequently Asked Questions
      </Heading>
      <Accordion allowToggle maxW="60rem" w="90%" mx="auto" mb="12rem">
        <FAQItem heading={"What is RoomeyFinder?"}>
          RoomeyFinder is a platform designed to help users find the perfect
          roommate or living space, making the process hassle-free.
        </FAQItem>
        <FAQItem heading={"How can I list my space on RoomeyFinder?"}>
          RoomeyFinder allows users to effortlessly list and showcase their
          available living spaces, connecting with individuals searching for
          their ideal space.
        </FAQItem>
        <FAQItem
          heading={"Can I find a new living space through RoomeyFinder?"}
        >
          Yes, RoomeyFinder offers a curated selection of living spaces tailored
          to user preferences, making it easy to find and make informed
          decisions.
        </FAQItem>
        <FAQItem
          heading={
            "Does RoomeyFinder offer communication tools for potential roommates?"
          }
        >
          Yes, RoomeyFinder provides an intuitive messaging system for seamless
          communication with potential roommates, facilitating connections and
          sharing details.
        </FAQItem>
        <FAQItem heading={"How can I get started with RoomeyFinder"}>
          To get started, visit the RoomeyFinder website and sign up for an
          account. From there, you can list your space or search for new living
          arrangements.
        </FAQItem>
      </Accordion>
    </>
  )
}

function FAQItem({
  heading,
  children,
}: {
  heading: ReactNode
  children: ReactNode | ReactNode[]
}) {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton
          py="2rem"
          fontSize="1.6rem"
          fontWeight="600"
          color="gray.main"
        >
          <Box as="span" flex="1" textAlign="left">
            {heading}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel color="gray.main" pb={4} fontSize="1.4rem">
        {children}
      </AccordionPanel>
    </AccordionItem>
  )
}
