"use client"
import {
  Box,
  Flex,
  GridItem,
  Heading,
  SimpleGrid,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
  VStack,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import useManageStageFlow from "@/app/_hooks/useManageStageFlow"
import ListingForm from "./_components/Form"

const steps = [
  { title: "Step 1", description: "Add photos" },
  { title: "Step 2", description: "Basic Info" },
  { title: "Step 3", description: "Describe your ad and add features" },
]

export default function ListingPage() {
  const { goToNextStage, currentStage, navigateToStage, goToPrevStage } =
    useManageStageFlow({
      maxStage: 3,
      start: 0,
      minStage: 0,
    })
  return (
    <SimpleGrid
      columns={12}
      h={{ sm: "calc(100vh - 9rem)" }}
      overflow="hidden"
      w="full"
      alignItems="center"
      px={{ base: "1.2rem", md: "3rem" }}
      gap="1.5rem"
      autoFlow={{ base: "row", sm: "column" }}
      pos="relative"
    >
      <GridItem
        pb={{ base: "2rem", sm: "0" }}
        pt={{ base: "4rem", sm: "0" }}
        colSpan={{ base: 12, sm: 2 }}
        h={{ sm: "full" }}
        my="auto"
        maxH={{ sm: "70rem" }}
        pos="sticky"
        top="0"
        pl={{ md: "" }}
      >
        <FormStepper currentStage={currentStage} />
      </GridItem>
      <GridItem
        // h="full"
        alignSelf="center"
        colSpan={{ base: 12, sm: 10 }}
        display="flex"
        flexDir="column"
        overflow="hidden"
        w="full"
        justifyContent="center"
      >
        <VStack
          w="full"
          pos="relative"
          h={{ base: "calc(100vh - 25rem)", sm: "calc(100vh - 9rem)" }}
          maxH={{ base: "70rem", sm: "85rem" }}
          overflow="auto"
          className="styled-scrollbar"
          pr={{ sm: "2rem", md: "8rem" }}
        >
          <Flex
            flexDir="column"
            mb={{ sm: "4rem" }}
            zIndex="10"
            bg="white"
            pos="sticky"
            pt={{ sm: "8%" }}
            top="0"
            w="full"
          >
            <Heading
              fontSize="3.2rem"
              fontWeight="500"
              textAlign="center"
              mb="1.2rem"
            >
              Create Ad
            </Heading>
            <Text
              color="gray.main"
              fontSize="1.6rem"
              fontWeight="500"
              textAlign="center"
            >
              {steps[currentStage]?.description}
            </Text>
          </Flex>
          <ListingForm
            currentStage={currentStage}
            goToNextStage={goToNextStage}
            goToPrevStage={goToPrevStage}
            navigateToStage={navigateToStage}
            uploadedPhotos={[]}
          />
        </VStack>
      </GridItem>
    </SimpleGrid>
  )
}

function FormStepper({ currentStage }: { currentStage: number }) {
  const [stepOrientation, setStepOrientation] = useState<string | undefined>()

  useEffect(() => {
    if (window.innerWidth > 640) setStepOrientation("vertical")
    else setStepOrientation(undefined)
  }, [])

  const activeStepText = steps[currentStage].description
  return (
    <>
      <Stepper
        size="lg"
        orientation={stepOrientation as any}
        colorScheme="blue"
        index={currentStage}
        h="full"
      >
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="0" display={{ base: "none", sm: "block" }}>
              <StepTitle>
                <Text
                  as="span"
                  w={{ base: "min-content", sm: "max-content" }}
                  fontSize={{ base: "1.4rem", sm: "1.6rem" }}
                >
                  {step.title}
                </Text>
              </StepTitle>
              <StepDescription>
                <Text
                  as="span"
                  fontSize={{ base: "1.4rem" }}
                  w={{ sm: "10rem" }}
                >
                  {step.description}
                </Text>
              </StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      <Text mt="1.5rem" fontSize={{ base: "1.8rem" }} display={{ sm: "none" }}>
        Step {currentStage + 1}:{" "}
        <Text as="b" fontWeight="600">
          {activeStepText}
        </Text>
      </Text>
    </>
  )
}
