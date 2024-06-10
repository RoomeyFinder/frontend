import { Box, Flex, FormLabel, Text } from "@chakra-ui/react"
import FileUploadIcon from "../_assets/SVG/FileUploadIcon"
import { ChangeEventHandler, DragEventHandler, MutableRefObject } from "react"

export default function DragOverFileInput({
  supportedFileTypes,
  inputRef,
  openFileExplorer,
  handleChange,
  handleDragOver,
  handleDrop,
  handleDragLeave,
  handleDragEnter,
  dragActive,
  fileTypePrefix,
  multiple,
  isDisabled,
}: {
  supportedFileTypes: string[]
  inputRef: MutableRefObject<HTMLInputElement | null>
  openFileExplorer: () => void
  handleChange: ChangeEventHandler<HTMLInputElement>
  handleDragOver: DragEventHandler
  handleDrop: DragEventHandler
  handleDragLeave: DragEventHandler
  handleDragEnter: DragEventHandler
  dragActive: boolean
  fileTypePrefix: string
  multiple?: boolean
  isDisabled: boolean
}) {
  return (
    <>
      <input
        ref={inputRef}
        onChange={handleChange}
        type="file"
        hidden
        multiple={multiple}
        accept={supportedFileTypes
          .map((it) => `${fileTypePrefix || "image"}/${it}`)
          .join(", ")}
        disabled={isDisabled}
      />
      <Flex
        onDragEnter={handleDragEnter}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        as={FormLabel}
        flexDir="column"
        textAlign="center"
        opacity={dragActive ? ".7" : "1"}
        bg={dragActive ? "brand.10" : "#3a86ff0a"}
        m="0"
        fontSize={{ base: "1.4rem", md: "1.4rem" }}
        gap=".967rem"
        px={{ base: "2rem", md: "2.5rem" }}
        justifyContent="center"
        alignItems="center"
        w="90%"
        mx="auto"
        maxW="45rem"
        minH={{ base: "12rem", lg: "28rem" }}
        border=".2rem dashed #D9D9D9"
        py="12rem"
        borderRadius={{ base: "1.2rem", md: "3rem" }}
        lineHeight="normal"
      >
        <FileUploadIcon />

        <Text>
          <Text
            onClick={openFileExplorer}
            as="button"
            fontWeight="600"
            color="brand.main"
          >
            Click to upload
          </Text>{" "}
          or drag and drop
        </Text>

        <Box>
          <Text mb=".7rem" fontWeight="400" fontSize="1.2rem">
            Max. File size: 25MB
          </Text>
          <Text fontWeight="400" fontSize="1.2rem">
            Supported file types:&nbsp; (
            {supportedFileTypes.map((type, idx) => (
              <Text as="span" key={idx}>
                {type}
                {idx < supportedFileTypes.length - 1 && <>, </>}
              </Text>
            ))}
            )
          </Text>
        </Box>
      </Flex>
    </>
  )
}
