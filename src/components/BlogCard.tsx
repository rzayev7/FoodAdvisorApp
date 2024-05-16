"use client";
import { useAuth } from "@/contexts/authContext";
import Cookies from "js-cookie";
import {
  Icon,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Image,
  Stack,
  Text,
  CardFooter,
  Button,
  Box,
  HStack,
  Link,
  Flex,
  WrapItem,
  Avatar,
  Skeleton,
} from "@chakra-ui/react";
import React from "react";
import LikeBlogButton from "@/components/LikeBlogButton";

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

type TBlogCard = {
  blog: TBlog;
};


const BlogCard = ({ blog }: TBlogCard) => {
  const { loading } = useAuth();
  return (
    <Card w={{ base: "full", md: "sm" }} h="xl" rounded="xl" shadow="md">
      <CardHeader>
        <Flex justify="space-between">
          <Stack align={{ base: "start", md: "center" }}>
            <WrapItem>
              <Avatar src={blog.user.avatar || ""} name={blog.user.username} />
            </WrapItem>
            <Heading size="sm">@{blog.user.username}</Heading>
          </Stack>
          {blog.dateCreated && (
            <Text color="gray.500" fontSize="md">
              {new Date(blog.dateCreated)
                .toLocaleString(undefined, {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })
                .replace(
                  /(\d{2})\.(\d{2})\.(\d{4}),\s(\d{2}):(\d{2})/,
                  "$1.$2.$3, $4:$5"
                )}
            </Text>
          )}
        </Flex>
      </CardHeader>
      <CardBody>
        <Stack spacing="2">
          <Heading noOfLines={1} size="md">
            {blog.title}
          </Heading>
          <Text noOfLines={[1, 2]}>{blog.content}</Text>
          <Link color="blue.500" fontSize="sm" href={`/blogs/${blog.id}`}>
            Read more
          </Link>
        </Stack>
      </CardBody>
      {blog.imageUrl && (
        <Image
          src={blog.imageUrl}
          alt="blog image"
          width="full"
          height={{ base: 180, md: 220, lg: 240 }}
          mx="auto"
          objectFit="cover"
          objectPosition="top"
        />
      )}
      <CardFooter justify="center">
        {loading ? (
          <HStack spacing="2">
            <Skeleton w={28} h={8}/>
          </HStack>
        ) : (
          <LikeBlogButton
            id={blog.id}
            likesCount={blog.likes}
            whoLiked={blog.whoLiked}
          />
        )}
      </CardFooter>
    </Card>
  );
};

export default BlogCard;