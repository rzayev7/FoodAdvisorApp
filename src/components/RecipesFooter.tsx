import { Box, Button, Flex, Text } from "@chakra-ui/react";

export function RecipesFooter() {
  return (
    <Flex justifyContent="center" alignItems="center">
      <Box textAlign="center" py='48px'>
        <Button
          bg="#233345"
          color="#fff"
          borderRadius="24px"
          _hover={{ bg: "#3e5a7b" }}
          fontSize="13.672px"
          fontStyle="normal"
          fontWeight="500"
          lineHeight="normal"
        >
          Load more articles
        </Button>
        <Text
        p='8px'
        color='#95A6BD'
        fontSize= '14px'
        fontWeight='400'
        lineHeight='18px' 
        >Showing 30 of a total of 204 stories.</Text>
      </Box>
    </Flex>
  );
}
