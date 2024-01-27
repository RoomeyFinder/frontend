import { Heading, Flex, List, ListItem, Show, Box, Text } from "@chakra-ui/react"
import { MutableRefObject, ChangeEventHandler, DragEventHandler } from "react"
import DragOverFileInput from "../_components/DragOverFileInput"

export default function PhotosUploadSection({
  inputRef, openFileExplorer,
  handleChange, handleDragOver, handleDrop,
  handleDragLeave, handleDragEnter, dragActive,
  show, files, toggleShow
}: {
  inputRef: MutableRefObject<HTMLInputElement | null>
  openFileExplorer: () => void
  handleChange: ChangeEventHandler
  handleDragOver: DragEventHandler
  handleDrop: DragEventHandler
  handleDragLeave: DragEventHandler
  handleDragEnter: DragEventHandler
  dragActive: boolean
  show: boolean
  files: File[]
  toggleShow: () => void
}) {
  return (
    <>
      <Heading fontWeight="700" mb="3rem" variant={{ md: "medium" }}>More photos of me</Heading>

      <Flex
        //  px={{ base: show ? "2rem" : "", md: "3rem" }} 
        gap="3rem" flexDir="column" borderRadius="1.2rem" border={{ base: show ? "1px solmid" : "", md: "1px solnid" }} borderColor={{ base: show ? "#7070704D" : "", md: "#7070704D" }}
      // py="5rem"
      >
        <Heading fontWeight="700">Upload Photos</Heading>
        <DragOverFileInput dragActive={dragActive} handleDragOver={handleDragOver} handleDrop={handleDrop} handleDragLeave={handleDragLeave} handleDragEnter={handleDragEnter} handleChange={handleChange} inputRef={inputRef} openFileExplorer={openFileExplorer} supportedFileTypes={["jpg", "png", "svg"]} />
        <Box>
          <List>
            {files.map((file, idx) => (
              <ListItem key={idx}>
                {file.name}
                {file.size * 1e-6}
                {file.type.split("/")[1]}
              </ListItem>
            ))}
          </List>        </Box>
      </Flex>

      <Show below="md"><Text as="button" onClick={toggleShow} textAlign="center" fontSize="1.4rem" fontWeight="600" display="block" textDecor="underline" margin="2rem 0 0" textTransform="capitalize">Continue updating profile</Text></Show>
    </>
  )
}

