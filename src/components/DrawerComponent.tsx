import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Link,
    VStack,
    useDisclosure
  } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useAuth } from "@/contexts/authContext";
export default function DrawerComponent({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const router = useRouter();
    const btnRef = useRef(null);
    const { user } = useAuth();
    return (
        <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody mt="40px">
            <VStack gap='16px'>
              <Link
                href="/blogs"
                color="#95A6BD"
                fontSize="16px"
                fontWeight="500"
                lineHeight="normal"
              >
                Blogs
              </Link>
              <Link
                href="/recipes"
                color="#95A6BD"
                fontSize="16px"
                fontWeight="500"
                lineHeight="normal"
              >
                Recipes
              </Link>
              <Link
                href="/recipes/areas"
                color="#95A6BD"
                fontSize="16px"
                fontWeight="500"
                lineHeight="normal"
              >
                Areas
              </Link>
              <Link
                href="/recipes/categories"
                color="#95A6BD"
                fontSize="16px"
                fontWeight="500"
                lineHeight="normal"
              >
                Categories
              </Link>
              <Link
                href="/recipes/search"
                color="#95A6BD"
                fontSize="16px"
                fontWeight="500"
                lineHeight="normal"
              >
                Search
              </Link>
              <Link
                href="/contact"
                color="#95A6BD"
                fontSize="16px"
                fontWeight="500"
                lineHeight="normal"
              >
                Contact us
              </Link>
              {user ? (
                <Button
                bg="#233345"
                color="#fff"
                borderRadius="24px"
                _hover={{ bg: "#3e5a7b" }}
                fontSize="13.672px"
                fontStyle="normal"
                fontWeight="500"
                lineHeight="normal"
                px="40px" onClick={() => router.push("/profile")}>{user.username}</Button>
              ) : (
                <VStack gap='16px'>
                  <Button
                    bg="#F5F8FC"
                    color="#000"
                    borderRadius="24px"
                    _hover={{ bg: "#e4ecf7" }}
                    fontSize="13.672px"
                    fontStyle="normal"
                    fontWeight="500"
                    lineHeight="normal"
                    onClick={() => router.push("/login")}
                    px="40px"
                  >
                    Log in
                  </Button>
                  <Button
                    bg="#233345"
                    color="#fff"
                    borderRadius="24px"
                    _hover={{ bg: "#3e5a7b" }}
                    fontSize="13.672px"
                    fontStyle="normal"
                    fontWeight="500"
                    lineHeight="normal"
                    px="40px"
                    onClick={() => router.push("/signup")}
                  >
                    Sign Up
                  </Button>
                </VStack>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    )
}
