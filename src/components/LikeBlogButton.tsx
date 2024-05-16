import { useState } from "react";
import { BiLike, BiSolidLike } from "react-icons/bi";
import axios from "axios";
import { useAuth } from "@/contexts/authContext";
import { Button, HStack, Icon, Text } from "@chakra-ui/react";

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

interface ILikeBtnProps {
    id: TBlog["id"];
    likesCount: number;
    whoLiked: TBlog["whoLiked"];
  }
  

export default function LikeButton ({ likesCount, whoLiked, id }: ILikeBtnProps)  {
    const { user } = useAuth();
    const [likes, setLikes] = useState(likesCount);
    const [loading, setLoading] = useState(false);
    const [currentUserLiked, setCurrentUserLike] = useState(() => {
      const bool = whoLiked.some(
        (someuser) => someuser.username === user?.username
      );
      return bool;
    });
  
    const updateLike = async (likeType: string) => {
      setLoading(true);
      const url = `https://fooderra-api.vercel.app/api/blogs/${id}/${likeType}`;
      try {
        const response = await axios.patch(
          url,
          {},
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        setLoading(false);
      } catch (error) {
        console.error(error);
        throw error;
      }
    };
  
    const handleLike = async () => {
      try {
        if (currentUserLiked) {
          await updateLike("removelike");
          setLikes((prev) => prev - 1);
          setCurrentUserLike(false);
        } else {
          await updateLike("like");
          setLikes((prev) => prev + 1);
          setCurrentUserLike(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    return (
      <HStack spacing="2">
        <Button
          variant="solid"
          colorScheme={"blue"}
          cursor="pointer"
          onClick={handleLike}
          isLoading={loading}
          w={28}
        >
          {currentUserLiked ? (
            <Icon as={BiSolidLike} w={8} h={8} mr={2} color="white" />
          ) : (
            <Icon as={BiLike} w={8} h={8} mr={2} color="white" />
          )}
          {currentUserLiked ? "Liked" : "Like"}
        </Button>
        <Text fontSize="lg" color="blue.500" fontWeight="semibold">
          {likes} likes
        </Text>
      </HStack>
    );
  };