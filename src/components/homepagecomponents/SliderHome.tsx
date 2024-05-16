"use client";
import React from "react";
import CardHome from "@/components/homepagecomponents/CardHome";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Box } from "@chakra-ui/react";

export function SliderHome() {
  return (
    <>
      <Box display={{ md: "none" }} textAlign="center">
        <Carousel
          autoPlay
          showStatus={false}
          showArrows={false}
          infiniteLoop
          interval={5000}
          width={350}
        >
          <Box w='100%' position='relative'>
            <CardHome
              imageUrl="../images/home1.png"
              cardText="Avocado toast with egg"
              cardTime="15 min"
            />
          </Box>

          <Box w='100%' position='relative'>
            <CardHome
              imageUrl="../images/home2.png"
              cardText="Yoghurt with mixed fruits"
              cardTime="5 min"
            />
          </Box>
          <Box w='100%' position='relative'>
            <CardHome
              imageUrl="../images/home3.png"
              cardText="Chicken breast & kale"
              cardTime="15 min"
            />
          </Box>
          <Box w='100%' position='relative'>
            <CardHome
              imageUrl="../images/home4.png"
              cardText="Fig & chickpeas salad"
              cardTime="15 min"
            />
          </Box>
        </Carousel>
      </Box>
    </>
  );
}
