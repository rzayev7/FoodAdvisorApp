"use client";
import { Box, HStack, Image, Button, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <HStack
      p="20px"
      justifyContent="space-between"
      w="100%"
      maxH="64px"
      bg="#EEF8FD"
    >
      <HStack gap="16px">
        <Image
          onClick={() => {
            router.push("/");
          }}
          src="/images/fooderra_logocrop.png"
          alt="Logo"
          cursor="pointer"
        />
        <HStack
          gap="16px"
          pt="8px"
          fontSize="16px"
          fontWeight="500px"
          color="gray.400"
        >
          <Link href={"/blog"} passHref>
            <Button variant="link" _hover={{ color: "#233345" }}>
              Blog
            </Button>
          </Link>
          <Link href={"/recipes"} passHref>
            <Button variant="link" _hover={{ color: "#233345" }}>
              Recipes
            </Button>
          </Link>
          <Link href={"/help"} passHref>
            <Button variant="link" _hover={{ color: "#233345" }}>
              Help
            </Button>
          </Link>
        </HStack>
      </HStack>
      <HStack gap="16px">
        <HStack
          bg="white"
          borderRadius="500px"
          fontSize="16px"
          fontWeight="500px"
        >
          <Link href={"/login"}>
            <Button variant="link" _hover={{ color: "#233345" }} p="8px 16px">
              Already have an account? Log in
            </Button>
          </Link>
          <Button
            p="8px 16px"
            borderRadius="500px"
            color="white"
            bg="#233345"
            _hover={{ color: "#233345", backgroundColor: "white" }}
          >
            <Link href={"/signup"}>Sign up</Link>
          </Button>
        </HStack>
        <Text>en</Text>
      </HStack>

      <HStack gap="16px">
        <HStack
          bg="white"
          borderRadius="500px"
          fontSize="16px"
          fontWeight="500px"
        >
          <Button
            p="8px 16px"
            borderRadius="500px"
            color="white"
            bg="#233345"
            _hover={{ color: "#233345", backgroundColor: "white" }}
          >
            <Link href={"/profile"}>My Account</Link>
          </Button>
          <Link href={"/login"}>
            <Button
              as="a"
              variant="link"
              _hover={{ color: "#233345" }}
              p="8px 16px"
            >
              Already have an account? Log in
            </Button>
          </Link>
          <Button
            p="8px 16px"
            borderRadius="500px"
            color="white"
            bg="#233345"
            _hover={{ color: "#233345", backgroundColor: "white" }}
          >
            <Link href={"/signup"}>Sign up</Link>
          </Button>
        </HStack>
        <Text>en</Text>
      </HStack>
    </HStack>
  );
}
