import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react";

export default function Search() {
  return (
    <VStack p="32px">
      <Text
        lineHeight="28px"
        fontSize="20px"
        fontWeight="500"
        color="#405167"
        py="16px"
        textAlign="center"
        maxW='500px'
      >
        You have the flexibility to explore the desired dish by searching for
        its name and discovering its corresponding recipe.
      </Text>
      <Image src="/images/guakka-meals.gif" alt="" />
    </VStack>
  );
}
