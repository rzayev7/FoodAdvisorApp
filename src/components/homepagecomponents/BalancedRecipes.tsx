"use client";

import CardHome from "@/components/homepagecomponents/CardHome";
import {
  Text,
  HStack,
  VStack,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { SliderHome } from "@/components/homepagecomponents/SliderHome";

export default function BalancedRecipes() {
  return (
    <HStack
      flexDirection={{ base: "column-reverse", xl: "row" }}
      justifyContent="space-between"
      mt="64px"
    >
      <Grid
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(2, 1fr)"
        gap={4}
        justifyContent="center"
        display={{ base: "none", md: "grid" }}
      >
        <GridItem>
          <CardHome
            imageUrl="../images/home1.png"
            cardText="Avocado toast with egg"
            cardTime="15 min"
          />
        </GridItem>
        <GridItem>
          <CardHome
            imageUrl="../images/home2.png"
            cardText="Yoghurt with mixed fruits"
            cardTime="5 min"
          />
        </GridItem>
        <GridItem>
          <CardHome
            imageUrl="../images/home3.png"
            cardText="Chicken breast & kale"
            cardTime="15 min"
          />
        </GridItem>
        <GridItem>
          <CardHome
            imageUrl="../images/home4.png"
            cardText="Fig & chickpeas salad"
            cardTime="15 min"
          />
        </GridItem>
      </Grid>
      <SliderHome />
      <VStack textAlign="center" gap="12px" p="12px 52px">
        <Text fontSize="30px" fontWeight="500">
          Get Daily Inspiration with Balanced Recipes: Quick and Easy Delights!
        </Text>
        <Text fontSize="20px" fontWeight="400">
        Our quick and easy recipes are always on the table in no time! All recipes are approved by our expert chef team, providing you with a healthy and balanced culinary experience.
        </Text>
      </VStack>
    </HStack>
  );
}
