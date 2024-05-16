"use client";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Box } from "@chakra-ui/react";
import CardPlan from "@/components/homepagecomponents/CardPlan";

export function SliderPlan() {
  return (
    <>
      <Box display={{ md: "none" }}>
        <Carousel
          autoPlay
          showStatus={false}
          showArrows={false}
          infiniteLoop
          interval={5000}
          width={350}
        >
          <Box w='100%' position='relative'>
            <CardPlan
              imagePng="../images/calendar.png"
              cardHeading="Keto Diet"
              cardMain="Most popular for weight loss"
            />
          </Box>
          <Box w='100%' position='relative'>
            <CardPlan
              imagePng="../images/meal.png"
              cardHeading="Meal planning"
              cardMain="Most popular for lifestyle"
            />
          </Box>
          <Box w='100%' position='relative'>
            <CardPlan
              imagePng="../images/bulk.png"
              cardHeading="Bulk Up"
              cardMain="Most popular for sport"
            />
          </Box>
          <Box w='100%' position='relative'>
            <CardPlan
              imagePng="../images/carb.png"
              cardHeading="Low Carb"
              cardMain="Most popular for weight loss"
            />
          </Box>
        </Carousel>
      </Box>
    </>
  );
}
