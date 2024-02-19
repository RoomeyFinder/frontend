import {
  Heading,
  Flex,
  Show,
  Box,
  Text,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react"
import { MutableRefObject, ChangeEventHandler, DragEventHandler } from "react"
import DragOverFileInput from "../_components/DragOverFileInput"
import ConfirmAction from "../_components/ConfirmAction"
import ProfileAvatar from "../_components/ProfileAvatar"
import { PreviewablePhoto } from "../_types"

export default function PhotosUploadSection({
  inputRef,
  openFileExplorer,
  handleChange,
  handleDragOver,
  handleDrop,
  handleDragLeave,
  handleDragEnter,
  dragActive,
  show,
  photos,
  toggleShow,
  isDisabled,
  removeFile,
}: {
  inputRef: MutableRefObject<HTMLInputElement | null>
  openFileExplorer: () => void
  handleChange: ChangeEventHandler
  handleDragOver: DragEventHandler
  handleDrop: DragEventHandler
  handleDragLeave: DragEventHandler
  handleDragEnter: DragEventHandler
  removeFile: (url: string, fileName: string) => void
  dragActive: boolean
  show: boolean
  photos: PreviewablePhoto[]
  toggleShow: () => void
  isDisabled: boolean
}) {
  return (
    <>
      <Box
        transition="all 250ms linear"
        top="12rem"
        position={{ md: "sticky" }}
        flexGrow={{ base: show ? 1 : 0, md: 1 }}
        w={{ base: show ? "100%" : "0px", md: "45%" }}
        overflow="hidden"
        whiteSpace="nowrap"
        maxW={{ md: "40rem", xl: "65rem" }}
      >
        <Heading
          whiteSpace="wrap"
          display="flex"
          gap="2rem"
          justifyContent="space-between"
          alignItems="flex-end"
          variant="md"
          flexWrap="wrap"
          mb="3rem"
          size="md"
        >
          More photos of me
          <Show below="md">
            <Text
              as="button"
              type="button"
              onClick={toggleShow}
              ml="auto"
              textAlign="center"
              fontSize="1.4rem"
              fontWeight="600"
              display="block"
              textDecor="underline"
              whiteSpace="nowrap"
              textTransform="capitalize"
            >
              Continue updating profile
            </Text>
          </Show>
        </Heading>
        <UploadedPhotosSection removeFile={removeFile} photos={photos} />
        <Flex
          gap="3rem"
          flexDir="column"
          borderRadius="1.2rem"
          border={{ base: show ? "1px solmid" : "", md: "1px solnid" }}
          borderColor={{ base: show ? "#7070704D" : "", md: "#7070704D" }}
        >
          <Heading variant="700" size="base">
            Upload Photos &nbsp;
            <Text as="span" fontSize="1.2rem" fontWeight="600" color="gray.100">
              Maximum of 4
            </Text>
          </Heading>
          <DragOverFileInput
            fileTypePrefix="image"
            multiple
            dragActive={dragActive}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            handleDragLeave={handleDragLeave}
            handleDragEnter={handleDragEnter}
            handleChange={handleChange}
            inputRef={inputRef}
            openFileExplorer={openFileExplorer}
            supportedFileTypes={["jpg", "png", "svg"]}
            isDisabled={isDisabled}
          />
        </Flex>
      </Box>
    </>
  )
}

function UploadedPhotosSection({
  photos,
  removeFile,
}: {
  photos: PreviewablePhoto[]
  removeFile: (url: string, fileName: string) => void
}) {
  return (
    <Flex
      pb="2rem"
      pt="1rem"
      gap={{ base: "2rem", md: "3rem" }}
      flexWrap="wrap"
    >
      {photos.map((p) => (
        <Flex key={p.id}>
          <Popover matchWidth preventOverflow={false} placement="left">
            {({ isOpen, onClose }) => (
              <>
                <PopoverTrigger>
                  <Box>
                    <ProfileAvatar
                      showVerifiedBadge={false}
                      width={{ base: "8.8rem", md: "12.8rem" }}
                      height={{ base: "9rem", md: "13.8rem" }}
                      imageSrc={p.preview as string}
                      isDeletable={true}
                      defaultShowRemoveIcon={isOpen}
                    />
                  </Box>
                </PopoverTrigger>
                <PopoverContent
                  boxShadow="0"
                  bg="transparent"
                  m="0"
                  minW="max-content"
                  border="0"
                  p="1rem"
                  _focusVisible={{ boxShadow: 0, outline: 0 }}
                >
                  <PopoverBody m="0" p="0" minW="full">
                    <ConfirmAction
                      confirmText={"Delete this photo"}
                      confirm={() => {
                        removeFile(p.preview as string, p.file?.name || p.preview as string)
                      }}
                      cancel={onClose}
                      variant={"warning"}
                    />
                  </PopoverBody>
                </PopoverContent>
              </>
            )}
          </Popover>
        </Flex>
      ))}
    </Flex>
  )
}
