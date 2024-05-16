"use client";

import ProfileImageModal from "@/components/ProfileImageModal";
import { useAuth } from "@/contexts/authContext";
import {
  Avatar,
  Box,
  VStack,
  Text,
  Heading,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Button,
  FormLabel,
  Input,
  Flex,
  Image,
  useBoolean,
  Card,
  HStack,
  Link,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  BiUser,
  BiHeart,
  BiSolidHeart,
  BiSolidEditAlt,
  BiHash,
  BiSave,
  BiArrowBack,
} from "react-icons/bi";

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
};

type Blog = {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: Date;
};

export default function Profile() {
  const { user, unlikeRecipe, logout, loading } = useAuth();
  const [isEditing, setIsEditing] = useBoolean();
  const router = useRouter();
  const [editedUsername, setEditedUsername] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [likedRecipes, setLikedRecipes] = useState<Meal[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [blogsLoading, setBlogsLoading] = useState<boolean>(true);
  const [recipesLoading, setRecipesLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    } else if (user && !loading) {
      setEditedUsername(user.username);
      setEditedEmail(user.email);
      setLikedRecipes(user?.likedRecipes);
      setBlogs(user?.blogs);
      setBlogsLoading(false);
      setRecipesLoading(false);
    }
  }, [loading, user]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const handleUnlike = (mealId: string) => {
    if (
      window.confirm("Are you sure you want to delete this recipe from liked?")
    ) {
      unlikeRecipe(mealId);
      const updatedRecipes = likedRecipes.filter(
        (meal) => meal.idMeal !== mealId
      );
      setLikedRecipes(updatedRecipes);
    }
  };

  const handleBlogDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        console.log("salamsalam", user);
        const token = user?.token;
        const response = await axios.delete(
          `https://fooderra-api.vercel.app/api/blogs/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 204) {
          const updatedBlogs = blogs?.filter((blog) => blog.id !== id);
          setBlogs(updatedBlogs);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEditClick = () => {
    setIsEditing.toggle();
  };

  const handleSubmit = () => {
    setIsEditing.off();
  };

  return (
    <>
      {loading && (
        <Flex
          direction="column"
          gap={4}
          justifyContent="center"
          alignItems="center"
          h="100vh"
        >
          <Spinner thickness="3px" size="lg" />
          <Text fontSize="lg" color="blue.500">
            Loading your data :)
          </Text>
        </Flex>
      )}
      {user && !loading && (
        <Box>
          <Tabs
            variant="soft-rounded"
            display="flex"
            flexDirection={{ lg: "row", base: "column" }}
          >
            <Button
              position="fixed"
              top="32px"
              left="32px"
              zIndex="1"
              bg="#233345"
              color="#fff"
              borderRadius="24px"
              _hover={{ bg: "#3e5a7b" }}
              fontStyle="normal"
              fontWeight="500"
              lineHeight="normal"
              onClick={() => router.back()}
            >
              <BiArrowBack />
            </Button>
            <VStack
              minW="350px"
              bg="#cde9f9"
              h={{ lg: "100vh" }}
              justifyContent="space-between"
              py="48px"
              pos={{ lg: "fixed" }}
            >
              <VStack>
                <Box position="relative">
                  <Avatar
                    size="2xl"
                    name={user?.username}
                    src={user?.avatarImage}
                  />
                  <Box position="absolute" bottom="0" right="0">
                    <BiSolidEditAlt onClick={onOpen} size="24px" />
                  </Box>
                  <ProfileImageModal
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                    initialRef={initialRef}
                    finalRef={finalRef}
                    title="Create your account"
                    saveButtonText="Create"
                    cancelButtonText="Cancel"
                  />
                </Box>
                <Heading>{user?.username}</Heading>
              </VStack>
              <TabList
                flexDirection="column"
                alignItems="strech"
                w={{ lg: "90%" }}
              >
                <Tab _selected={{ color: "white", bg: "#233345" }}>
                  <BiUser /> About me
                </Tab>
                <Tab _selected={{ color: "white", bg: "#233345" }}>
                  <BiHeart /> Liked recipes
                </Tab>
                <Tab _selected={{ color: "white", bg: "#233345" }}>
                  <BiHeart />
                  My blogs
                </Tab>
              </TabList>
              <Button
                bg="#233345"
                color="#fff"
                borderRadius="24px"
                _hover={{ bg: "#3e5a7b" }}
                w={{ lg: "90%" }}
                fontStyle="normal"
                fontWeight="500"
                lineHeight="normal"
                onClick={() => {
                  logout();
                  router.push("/");
                }}
              >
                Sign out
              </Button>
            </VStack>
            <Box w="100%" position="relative" marginLeft={{ lg: "350px" }}>
              <TabPanels>
                <TabPanel p={{ lg: "48px", base: "16px" }}>
                  <Heading color="#3e5a7b">About me</Heading>
                  <VStack
                    mt={{ lg: "48px", base: "16px" }}
                    bg="#ffffff"
                    boxShadow="0px 0px 16px 0px rgba(0, 0, 0, 0.5)"
                    borderRadius="12px"
                    as="form"
                    p={{ md: "32px", base: "16px" }}
                    w="100%"
                  >
                    <Flex
                      flexDirection="column"
                      gap="16px"
                      w={{ lg: "400px", base: "100%" }}
                    >
                      <Flex alignItems="baseline">
                        <FormLabel fontSize="18px">Username:</FormLabel>
                        {isEditing ? (
                          <BiSave ml="4" onClick={handleSubmit} />
                        ) : (
                          <BiSolidEditAlt ml="4" onClick={handleEditClick} />
                        )}
                      </Flex>
                      {isEditing ? (
                        <Input
                          variant="filled"
                          placeholder="Filled"
                          border="red"
                          value={editedUsername}
                          onChange={(e) => setEditedUsername(e.target.value)}
                        />
                      ) : (
                        <Input
                          disabled
                          variant="filled"
                          value={editedUsername}
                          fontSize="18px"
                        />
                      )}
                      <Flex alignItems="baseline">
                        <FormLabel fontSize="18px">Email:</FormLabel>
                      </Flex>
                      <Input
                        disabled
                        variant="filled"
                        value={editedEmail}
                        fontSize="18px"
                      />
                    </Flex>
                  </VStack>
                </TabPanel>
                <TabPanel h={{ lg: "100vh" }} p={{ lg: "48px", base: "16px" }}>
                  <Heading color="#3e5a7b">Liked recipes</Heading>
                  <VStack
                    mt={{ lg: "48px", base: "16px" }}
                    bg="#ffffff"
                    w="100%"
                    boxShadow="0px 0px 16px 0px rgba(0, 0, 0, 0.5)"
                    borderRadius="12px"
                    p={{ md: "32px", base: "16px" }}
                    alignItems="stretch"
                    spacing={10}
                  >
                    {recipesLoading && <div>Loading...</div>}
                    {!recipesLoading && likedRecipes.length === 0 && (
                      <HStack>
                        <Text>You have no liked recipes</Text>
                        <Link
                          href="/recipes"
                          color="green.400"
                          fontSize="md"
                          textDecoration="underline"
                        >
                          It&apos;s time to save
                        </Link>
                      </HStack>
                    )}
                    {!recipesLoading &&
                      likedRecipes.map((meal) => (
                        <Card
                          key={meal.idMeal}
                          direction="row"
                          overflow="hidden"
                          variant="outline"
                        >
                          <Image
                            objectFit="cover"
                            w="100px"
                            src={meal.strMealThumb}
                            alt=""
                          />
                          <Flex
                            p="16px"
                            justifyContent="space-between"
                            w="90%"
                            flexDirection={{ sm: "row", base: "column" }}
                          >
                            <VStack alignItems="flex-start" px={3}>
                              <Heading size="md">{meal.strMeal}</Heading>
                              <Text noOfLines={2}>{meal.strInstructions}</Text>
                            </VStack>
                            <Button
                              minW="100px"
                              color="red"
                              leftIcon={<BiSolidHeart />}
                              onClick={() => handleUnlike(meal.idMeal)}
                            >
                              Liked
                            </Button>
                          </Flex>
                        </Card>
                      ))}
                  </VStack>
                </TabPanel>
                <TabPanel h={{ lg: "100vh" }} p={{ lg: "48px", base: "16px" }}>
                  <Heading color="#3e5a7b">My blogs</Heading>
                  <VStack
                    mt={{ lg: "48px", base: "16px" }}
                    bg="#ffffff"
                    w="100%"
                    boxShadow="0px 0px 16px 0px rgba(0, 0, 0, 0.5)"
                    borderRadius="12px"
                    p={{ md: "32px", base: "16px" }}
                    alignItems="stretch"
                  >
                    {blogsLoading && <div>Loading...</div>}
                    {!blogsLoading && (!blogs || blogs.length === 0) && (
                      <HStack>
                        <Text>You have no shared blogs</Text>
                        <Link
                          href="/blogs/new"
                          color="green.400"
                          fontSize="md"
                          textDecoration="underline"
                        >
                          It&apos;s time to share
                        </Link>
                      </HStack>
                    )}
                    {!blogsLoading &&
                      blogs &&
                      blogs.map((blog) => (
                        <Card
                          key={blog.id}
                          direction="row"
                          overflow="hidden"
                          variant="outline"
                        >
                          <Image
                            objectFit="cover"
                            w="150px"
                            src={blog.imageUrl}
                            alt=""
                          />
                          <Flex
                            p="16px"
                            justifyContent="space-between"
                            w="90%"
                            flexDirection={{ sm: "row", base: "column" }}
                          >
                            <VStack alignItems="flex-start" px={3}>
                              <Heading size="md">{blog.title}</Heading>
                              <Text noOfLines={2}>{blog.content}</Text>
                            </VStack>
                            <Button
                              minW="100px"
                              color="red"
                              onClick={() => handleBlogDelete(blog.id)}
                            >
                              Delete
                            </Button>
                          </Flex>
                        </Card>
                      ))}
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Box>
          </Tabs>
          <Box></Box>
        </Box>
      )}
    </>
  );
}
