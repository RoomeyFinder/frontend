
import { Box, useStyleConfig, BoxProps } from "@chakra-ui/react"

export default function StandAloneIcon(props: BoxProps & { variant: string }) {
  const { variant, ...rest } = props
  const styles = useStyleConfig("StandAloneIcon", { variant })
  return <Box __css={styles} {...rest} />
}