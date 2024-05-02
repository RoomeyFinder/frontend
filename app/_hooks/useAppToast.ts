import { UseToastOptions, useToast } from "@chakra-ui/react"

export default function useAppToast(options?: UseToastOptions) {
  const toast = useToast({
    containerStyle: {
      ...(options?.containerStyle || {
        fontSize: "1.6rem",
        color: "white",
      }),
    },
    position: options?.position || "top",
    id: options?.id || "",
    duration: options?.duration,
    status: options?.status || "info",
  })
  return toast
}
