"use client";

import { Layout } from "@/components";
import BalancedRecipes from "@/components/homepagecomponents/BalancedRecipes";
import DietPlan from "@/components/homepagecomponents/DietPlan";
import { Stories } from "@/components/homepagecomponents/Stories";
import {
  Image,
  Text,
  HStack,
  VStack,
  Heading,
  Button,
  Box,
  useBreakpointValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const button1HoverStyles = useBreakpointValue({
    base: { color: "#233345", backgroundColor: "white" },
    md: { color: "white", backgroundColor: "#233345" },
  });

  return (
    <Layout>
      <VStack>
        <HStack
          pt="62px"
          w="100%"
          h='80vh'
          bgImage={{ base: "none", xl: "../images/backnew.png" }}
          bgColor={{ base: "#eef8fd", xl: "none" }}
          bgSize="cover"
          bgPosition="center"
          bgRepeat="no-repeat"
          alignItems="center"
          justifyContent={{base:"center", xl:"flex-start"}}
        >
          <VStack pb="36px" color="black" pl={{ base: "none", xl: "200px" }}>
            <Heading pb="16px" fontSize="40px" fontWeight="500" textAlign='center'>
              Cook, Share, Savor!
            </Heading>
            <Text pb="40px" fontSize="20px" fontWeight="400" textAlign='center'>
              Kickstart Your Path to a Healthier, Happier You!.
            </Text>
            <Button
            p='20px 80px'
              bg="#233345"
              color="#fff"
              borderRadius="24px"
              _hover={{ bg: "#3e5a7b" }}
              fontSize="18px"
              fontStyle="normal"
              fontWeight="600"
              lineHeight="normal"
              onClick={() => router.push("/recipes")}
            >
              Start now
            </Button>
          </VStack>
        </HStack>
        <BalancedRecipes />
        <DietPlan />
        <VStack bg="#EEF8FD"  textAlign="center" gap="60px" p="64px 52px" width="100%">
          <Heading fontSize="30px" fontWeight="500" >Discover World Cuisines with Us</Heading>
          <Text fontSize="20px" fontWeight="400">Explore global flavors with us. Ready to start your culinary adventure?</Text>
          <Image src="../images/image 5.png"/>
          <Button
            p='20px 80px'
              bg="#233345"
              color="#fff"
              borderRadius="24px"
              _hover={{ bg: "#3e5a7b" }}
              fontSize="18px"
              fontStyle="normal"
              fontWeight="600"
              lineHeight="normal"
              onClick={() => router.push("/recipes/areas")}
            >
              Start now
            </Button>
        </VStack>
        <Stories />
      </VStack>
    </Layout>
  );
}
