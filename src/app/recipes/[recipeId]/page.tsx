"use client";
import {
  Box,
  Button,
  Heading,
  Text,
  Image,
  UnorderedList,
  ListItem,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";

export default function Recipe({ params: { recipeId } }: any) {
  const decodedWord = decodeURIComponent(recipeId);
  const router = useRouter();

  type Meal = {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strInstructions: string;
    strCategory: string;
    strArea: string;
    [key: string]: string | undefined;
  };

  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${decodedWord}`
        );
        setMeals(response.data.meals || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [decodedWord]);

  return (
    <Box
      minH="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box p="32px" h="100%">
        {loading ? (
          <Box>
            <Skeleton height="400px" borderRadius="8px" my="4" />
            <Skeleton height="45px" width="150px" my="4" />
            <Skeleton height="24px" width="100px" my="4" />
            <SkeletonText
              mt="4"
              noOfLines={10}
              spacing="2"
              skeletonHeight="4"
            />
            <SkeletonText
              mt="4"
              noOfLines={5}
              w="300px"
              spacing="2"
              skeletonHeight="4"
            />
          </Box>
        ) : (
          meals.map((meal) => (
            <Box key={meal.idMeal}>
              <Box pos="relative">
                <Image
                  borderRadius="8px"
                  float={{ md: "right" }}
                  w="100%"
                  h={{ md: "500px", base: "400px" }}
                  objectFit="cover"
                  src={meal.strMealThumb}
                  alt=""
                />

                <Box
                  pos="absolute"
                  w="100%"
                  h={{ md: "500px", base: "400px" }}
                  bg="linear-gradient(to top, white, rgba(255, 255, 255, 0.5) 50%, transparent)"
                  top="0"
                >
                  <Heading
                    mb="16px"
                    pos="absolute"
                    size={{ md: "3xl", sm: "2xl", base: "xl" }}
                    bottom="0"
                    p="16px"
                  >
                    {meal.strMeal}{" "}
                  </Heading>
                  <Button
                    position="absolute"
                    top="16px"
                    left="16px"
                    zIndex="1"
                    bg="#233345"
                    color="#fff"
                    borderRadius="24px"
                    _hover={{ bg: "#3e5a7b" }}
                    fontStyle="normal"
                    fontWeight="500"
                    lineHeight="normal"
                    border='1px solid #fff'
                    onClick={() => router.back()}
                  >
                    <BiArrowBack />
                  </Button>
                </Box>
              </Box>
              <Text
                color="#95A6BD"
                fontSize="16px"
                lineHeight="normal"
                bg="#EEF8FD"
                px="8px"
                py="2px"
                borderRadius="6px"
                as="span"
              >
                {meal.strCategory} - {meal.strArea}
              </Text>
              <Text
                mt="16px"
                fontSize="16px"
                fontStyle="normal"
                fontWeight="400"
                lineHeight="24px"
              >
                {meal.strInstructions}
              </Text>
              <UnorderedList mt="16px">
                {Object.entries(meal)
                  .filter(
                    ([key]) => key.startsWith("strIngredient") && meal[key]
                  )
                  .map(([key, value]) => (
                    <ListItem key={key}>
                      {value} -{" "}
                      {meal[`strMeasure${key.replace("strIngredient", "")}`]}
                    </ListItem>
                  ))}
              </UnorderedList>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
}
