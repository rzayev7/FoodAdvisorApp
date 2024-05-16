"use client";

import { Text, HStack, VStack, Grid, GridItem } from "@chakra-ui/react";
import CardPlan from "@/components/homepagecomponents/CardPlan";
import { SliderPlan } from "@/components/homepagecomponents/SliderPlan";

export default function DietPlan() {
  return (
    <HStack
      flexDirection={{ base: "column", xl: "row" }}
      alignItems="center"
      mt="64px"
      justifyContent="space-between"
    >
      <VStack textAlign="center" gap="12px" p="12px 52px">
        <Text fontSize="30px" fontWeight="500">
          Explore Culinary Delights Tailored to Your Tastes
        </Text>
        <Text fontSize="20px" fontWeight="400">
          Discover the perfect recipes for your lifestyle and savor long-lasting
          satisfaction. Choose from a diverse selection of over 15 personalized
          culinary plans!
        </Text>
      </VStack>
      <SliderPlan />
      <Grid
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(2, 1fr)"
        gap="24px"
        display={{ base: "none", md: "grid" }}
      >
        <GridItem>
          <CardPlan
            imagePng="../images/calendar.png"
            cardHeading="Keto Diet"
            cardMain="Most popular for weight loss"
          />
        </GridItem>
        <GridItem>
          <CardPlan
            imagePng="../images/meal.png"
            cardHeading="Meal planning"
            cardMain="Most popular for lifestyle"
          />
        </GridItem>
        <GridItem>
          <CardPlan
            imagePng="../images/bulk.png"
            cardHeading="Bulk Up"
            cardMain="Most popular for sport"
          />
        </GridItem>
        <GridItem>
          <CardPlan
            imagePng="../images/carb.png"
            cardHeading="Low Carb"
            cardMain="Most popular for weight loss"
          />
        </GridItem>
      </Grid>
    </HStack>
  );
}
