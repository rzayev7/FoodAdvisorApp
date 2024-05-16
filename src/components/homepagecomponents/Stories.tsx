"use client";
import React, { useState } from "react";

import {
  Box,
  Center,
  Flex,
  Heading,
  useBreakpointValue,
} from "@chakra-ui/react";
import CardStory from "@/components/homepagecomponents/CardStory";
import "./slider.css";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Keyboard, Scrollbar, Navigation, Pagination } from "swiper/modules";

export function Stories() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const [swiperOptions, setSwiperOptions] = useState({
    slidesPerView: 1,
    centeredSlides: false,
    grabCursor: true,
    navigation: true,
    keyboard: {
      enabled: true,
    },
    breakpoints: {
      1450: {
        slidesPerView: 3,
        slidesPerGroup: 1,
        pagination: false,
      },
    },
    scrollbar: false,
    pagination: isMobile ? { clickable: true } : false,
    modules: [Keyboard, Scrollbar, Navigation, Pagination],
    loop: true,
  });
  return (
    <>
      
    </>
  );
}
