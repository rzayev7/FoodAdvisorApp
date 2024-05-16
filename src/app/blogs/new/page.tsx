"use client";
import {
  Text,
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
  HStack
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/contexts/authContext";
import { imageDb } from "@/firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image"
import { useRouter } from "next/navigation";

export default function BlogForm() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  const toast = useToast();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    let imageUrl = "";
    e.preventDefault();
    if(image) {
      const imageRef = ref(imageDb, `images/${image.name}`);
      const snapshot = await uploadBytes(imageRef,image);
      imageUrl = await getDownloadURL(snapshot.ref);
    }
    try {
      const response = await axios.post(
        "https://fooderra-api.vercel.app/api/blogs",
        {title, content, imageUrl},
        {
          headers: {
            Authorization: `Bearer ${user?.token}`
          },
        }
      );

      if (response.status === 201) {
        toast({
          position:"top",
          title: "Blog post created successfully",
          status: "success",
          isClosable: true,
          duration: 2000,
          containerStyle: {
            bottom: "100px",
          }
        })
        setTitle("");
        setContent("");
        setImage(null);
        setImageUrl("");
        router.push("/blogs");
      } else {
        toast({
          title: "Could not create blog post. Please try again.",
          status: "error",
          isClosable: true,
        })
      }
    } catch (error) {
      toast({
        title: "Unexpected error happened.",
        status: "error",
        isClosable: true,
      })
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} >
      <Flex direction="column" px={{base: 12, md: 56}} py={20}>
        <FormControl id="title" isRequired>
          <FormLabel>Title</FormLabel>
          <Input
            variant="filled"
            placeholder="Title"
            size="md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl id="content" isRequired mt={6}>
          <FormLabel>Content</FormLabel>
          <Textarea
            variant="filled"
            placeholder="I want to share..."
            size="md"
            resize="none"
            h="300px"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </FormControl>
        <FormControl id="image" mt={6}>
          <Flex
            align="center"
            p={1}
            border="1px"
            borderColor="gray.200"
            borderRadius="md"
          >
            <Input
              variant="filled"
              type="file"
              accept="image/*"
              hidden
              id="file-upload"
              onChange={(event) => {
                if(event.target.files && event.target.files.length > 0) {
                  setImage(event.target.files[0]);
                  setImageUrl(URL.createObjectURL(event.target.files[0]));
                } 
              }}
            />
            {!imageUrl && <FormLabel htmlFor="file-upload" mx={4} mt={2} cursor="pointer">
              Upload Image
            </FormLabel>}
            {imageUrl && <Flex direction={{base: "column", md: "row"}} alignItems="center" justifyContent="center" gap={4}>
              <Text mx={4} mt={2}>{image?.name}</Text>
              <Image alt="" src={imageUrl} width={100} height={100} />
              <Button onClick={() => {setImageUrl(""); setImage(null)}} ml={4}>Remove</Button>
              </Flex>}
          </Flex>
        </FormControl>
        <Button type="submit" mt={10} colorScheme="green">
          Publish
        </Button>
      </Flex>
    </form>
  );
}