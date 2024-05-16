"use client";
import { Layout } from "@/components/";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  VStack,
  Spinner,
  Center,
  Grid,
  SimpleGrid,
  HStack,
  Link,
} from "@chakra-ui/react";
import BlogCard from "@/components/BlogCard";
import { set } from "react-hook-form";

type TBlog = {
  id: string;
  title: string;
  content: string;
  likes: number;
  imageUrl: string;
  dateCreated: Date;
  whoLiked: [
    {
      username: string;
      avatar: string;
    }
  ];
  user: {
    username: string;
    email: string;
    avatar: string;
  };
};

export default function Blog() {
  const [blogs, setBlogs] = useState<TBlog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sorting, setSorting] = useState("");
  const [sortedBlogs, setSortedBlogs] = useState<TBlog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("https://fooderra-api.vercel.app/api/blogs");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setBlogs(
          data.sort(
            (a: TBlog, b: TBlog) =>
              new Date(b.dateCreated).getTime() -
              new Date(a.dateCreated).getTime()
          )
        );
        setSortedBlogs(data);
        setIsLoading(false);
        setSorting("newest");
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    switchSort(sorting);
  }, [sorting]);

  const resetSorting = () => {
    setSorting("newest");
  };

  const switchSort = (sorting: string) => {
    const updatedBlogs = [...sortedBlogs]; 

    if (sorting === "newest") {
      updatedBlogs.sort(
        (a, b) =>
          new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
      );
    } else if (sorting === "oldest") {
      updatedBlogs.sort(
        (a, b) =>
          new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime()
      );
    } else if (sorting === "most") {
      updatedBlogs.sort((a, b) => b.likes - a.likes);
    } else if (sorting === "least") {
      updatedBlogs.sort((a, b) => a.likes - b.likes);
    }

    setSortedBlogs(updatedBlogs);
  };

  return (
    <Layout>
      <VStack spacing={4} align="stretch">
        <Flex p={4} gap={4}  flexDirection={{base: "column", md: "row"}} alignItems="center">
          <Heading size="lg" color="blue.500" textAlign="center">
            Read and enjoy the latest blogs! 🥑
          </Heading>
          <HStack>
          <Button
            onClick={() => {
              setSorting("newest");
            }}
            borderWidth={sorting === "newest" ? 2 : undefined}
            borderColor={sorting === "newest" ? "green.500" : undefined}
            w={{base: "100px", md: "auto"}}
          >
            Newest
          </Button>
          <Button
            onClick={() => {
              setSorting("oldest");
            }}
            borderWidth={sorting === "oldest" ? 2 : undefined}
            borderColor={sorting === "oldest" ? "green.500" : undefined}
            w={{base: "100px", md: "auto"}}
          >
            Oldest
          </Button>
          </HStack>
          <HStack>
          <Button
            onClick={() => {
              setSorting("most");
            }}
            borderWidth={sorting === "most" ? 2 : undefined}
            borderColor={sorting === "most" ? "green.500" : undefined}
            w={{base: "100px", md: "auto"}}
          >
            Most liked
          </Button>
          <Button
            onClick={() => {
              setSorting("least");
            }}
            borderWidth={sorting === "least" ? 2 : undefined}
            borderColor={sorting === "least" ? "green.500" : undefined}
            w={{base: "100px", md: "auto"}}
          >
            Least liked
          </Button>
          </HStack>
          <HStack>
          <Button onClick={resetSorting} w={{base: "100px", md: "auto"}}>Reset sorting</Button>
          <Link href="/blogs/new">
            <Button
              bg="#233345"
              color="#fff"
              borderRadius="24px"
              _hover={{ bg: "#3e5a7b" }}
              fontSize="13.672px"
              fontStyle="normal"
              fontWeight="500"
              lineHeight="normal"
              w={{base: "100px", md: "auto"}}
            >
              Add new blog
            </Button>
          </Link>
          </HStack>
        </Flex>
        {isLoading && (
          <Flex
            direction="column"
            align="center"
            justify="center"
            h="full"
            py={20}
          >
            <Spinner
              thickness="3px"
              speed="0.5s"
              emptyColor="gray.300"
              color="blue.600"
              size="lg"
            />
            <Text as="p" mt={4}>
              Loading content...
            </Text>
          </Flex>
        )}
        <SimpleGrid
          justifyItems="center"
          spacing={10}
          p={{ base: 4, md: 8 }}
          templateColumns="repeat(auto-fill, minmax(350px, 1fr))"
        >
          {sortedBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </SimpleGrid>
      </VStack>
    </Layout>
  );
}