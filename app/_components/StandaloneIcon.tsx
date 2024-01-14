

import { Box, useStyleConfig } from '@chakra-ui/react'

export default function StandAloneIcon(props: any) {
  const { variant, ...rest } = props
  const styles = useStyleConfig('StandAloneIcon', { variant })
  return <Box __css={styles} {...rest} />
}