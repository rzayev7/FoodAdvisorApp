'use client';
import CardSkeleton from "@/components/CardSkeleton";
import MealsNotFound from "@/components/MealsNotFound";
import RecipeCard from "@/components/RecipeCard";
import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Heading,
  Image,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  Text,
  VStack,
  Link,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import { TwitterShareButton, TwitterIcon } from "next-share";
import { useEffect, useState } from "react";
import { BiLike, BiSolidLike } from "react-icons/bi";

export default function SearchId({ params: { searchId } }: any) {
  const decodedWord = decodeURIComponent(searchId);

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
    <>
      <Box padding="24px">
        {loading ? (
          <CardSkeleton />
        ) : (
          <>
            {meals.length > 0 ? (
              <SimpleGrid
                spacing={4}
                templateColumns="repeat(auto-fill, minmax(280px, 1fr))"
              >
                {meals.map((meal, index) => (
                  <RecipeCard key={meal.idMeal} meal={meal} />
                ))}
              </SimpleGrid>
            ) : (
              <MealsNotFound />
            )}
          </>
        )}
      </Box>
    </>
  );
}
