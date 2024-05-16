"use client";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <Box display='flex' justifyContent='center' alignItems='center' h='100vh'>
      <Box display='flex' flexDirection='column' alignItems='center'>
        <Image src="/images\guakka-search.svg" alt="" />
        <Text
          lineHeight="28px"
          fontSize="20px"
          fontWeight="500"
          color="#405167"
          py='16px'
        >
          It seems that this page doesn&apos;t exist
        </Text>
        <Button
          bg="#233345"
          color="#fff"
          borderRadius="24px"
          _hover={{ bg: "#3e5a7b" }}
          fontSize="18px"
          fontStyle="normal"
          fontWeight="500"
          lineHeight="normal"
          px="40px"
          onClick={() => router.push("/")}
        >
          Take me back
        </Button>
      </Box>
    </Box>
  );
}
