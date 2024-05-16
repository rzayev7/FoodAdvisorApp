"use client";
import {
  Box,
  Button,
  Flex,
  Link,
  Image,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useAuth } from "@/contexts/authContext";
import DrawerComponent from "./DrawerComponent";

export function Navigation() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
  const handleLinkClick = () => {
    if (!user) {
      router.push("/login");
    } else {
      router.push("/contact");
    }
  };

  return (
    <Flex
      py="20px"
      px={{sm:"32px", base:'16px'}}
      bg="#EEF8FD"
      alignItems="center"
      justifyContent="space-between"
      h="80px"
    >
      <Box display="flex" alignItems="center" gap="32px">
        <Link href="/">
          <Image h="36px" src="/images/logo.svg" alt="logo" />
        </Link>

        <Box display={{ lg: "flex", base: "none" }} gap="32px">
          <Link
            href="/blogs"
            color="#95A6BD"
            fontSize="16px"
            fontWeight="500"
            lineHeight="normal"
          >
            Blogs
          </Link>
          <Menu>
            <MenuButton
              color="#95A6BD"
              fontSize="16px"
              fontWeight="500"
              lineHeight="normal"
              _hover={{ textDecoration: "underline" }}
            >
              Recipes
            </MenuButton>
            <MenuList>
              <MenuItem as="a" href="/recipes">
                Recipes
              </MenuItem>
              <MenuItem as="a" href="/recipes/areas">
                Areas
              </MenuItem>
              <MenuItem as="a" href="/recipes/categories">
                Categories
              </MenuItem>
              <MenuItem as="a" href="/recipes/search">
                Search
              </MenuItem>
            </MenuList>
          </Menu>
          <Link
            color="#95A6BD"
            fontSize="16px"
            fontWeight="500"
            lineHeight="normal"
            onClick={handleLinkClick}
          >
            Contact us
          </Link>
        </Box>
      </Box>
      <Flex>
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
          >
            <Spinner size="sm" thickness="3px" />
          </Box>
        ) : user ? (
          <Flex
            fontWeight="bold"
            alignItems="center"
            onClick={() => router.push("/profile")}
            cursor="pointer"
          >
            {" "}
            <Avatar size="sm" name={user.username} src={user.avatarImage} mr={3} />
            <Text fontSize="md" display={{lg:'block', base:'none'}}>{user.username}</Text>
          </Flex>
        ) : (
          <Box
            display={{ lg: "flex", base: "none" }}
            alignItems="center"
            bg="#fff"
          >
            <Link
              href="/login"
              color="#95A6BD"
              fontSize="16px"
              fontWeight="500"
              lineHeight="40px"
              px="16px"
              h="40px"
            >
              Already have an account? Log in
            </Link>
            <Button
              bg="#233345"
              color="#fff"
              borderRadius="24px"
              _hover={{ bg: "#3e5a7b" }}
              fontSize="13.672px"
              fontStyle="normal"
              fontWeight="500"
              lineHeight="normal"
              onClick={() => router.push("/signup")}
            >
              Sign Up
            </Button>
          </Box>
        )}
        <Button
        p='0'
          variant="ghost"
          ref={btnRef}
          onClick={onOpen}
          display={{ lg: "none" }}
        >
          <Image src="/images/hamburger.svg" alt="" />
        </Button>
      </Flex>
      <DrawerComponent isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
}
