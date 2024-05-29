import { PreviewablePhoto } from "@/app/_types"
import { DeletablePhoto } from "@/app/nexus/profile/_components/PhotosUploadSection"
import { Flex } from "@chakra-ui/react"
import ListingPreviewPhoto from "./ListingPreviewPhoto"

export default function PhotosPreviewSection({
  removeFile,
  files,
}: {
  removeFile: (idx: number) => void
  files: PreviewablePhoto[]
}) {
  return (
    <Flex
      gap="2rem"
      minW={{ base: "full", sm: "50%", lg: "full" }}
      overflowX="auto"
    >
      {files.map((file) => (
        <DeletablePhoto
          key={file.id}
          photo={<ListingPreviewPhoto src={file.preview as string} />}
          onConfirm={() => {
            removeFile(file.index as number)
            URL.revokeObjectURL(file.preview as string)
          }}
          containerProps={{
            borderRadius: "1.2rem",
            overflow: "hidden",
          }}
        />
      ))}
      {/* <PhotosPreviewSection
        previewFiles={files}
        // ImageComponent={({ file }) => (
         
        // )}
      /> */}
    </Flex>
  )
}
