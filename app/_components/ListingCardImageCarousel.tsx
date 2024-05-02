import { ReactNode, useRef, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Swiper as SwiperType } from "swiper"
import { Navigation, Pagination } from "swiper/modules"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { Box, Text } from "@chakra-ui/react"
import CarouselNavIcon from "../_assets/SVG/CarouselNavIcon"

export default function Carousel({
  slides = [],
  swiperSlideContent,
}: {
  slides?: any[]
  swiperSlideContent: (props: any) => ReactNode
}) {
  const [isHovering, setIsHovering] = useState(false)
  const swiperRef = useRef<SwiperType>()

  return (
    <Box
      pos="relative"
      onMouseLeave={() => setIsHovering(false)}
      onMouseOver={() => setIsHovering(true)}
    >
      <Swiper
        modules={[Pagination, Navigation]}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper
        }}
        pagination={{
          clickable: true,
        }}
        loop
        spaceBetween={10}
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx} style={{ height: "100%"}}>
            {swiperSlideContent({ slide })}
          </SwiperSlide>
        ))}
      </Swiper>
      <Text
        opacity={isHovering ? 1 : 0}
        as="button"
        pos="absolute"
        top="50%"
        transform="translateY(-50%)"
        zIndex="100"
        right="1.5rem"
        onClick={() => swiperRef.current?.slideNext()}
      >
        <CarouselNavIcon />
      </Text>
    </Box>
  )
}
