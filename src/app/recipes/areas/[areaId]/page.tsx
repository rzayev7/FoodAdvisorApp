"use client";
import CardSkeleton from "@/components/CardSkeleton";
import MealsNotFound from "@/components/MealsNotFound";
import RecipeCard from "@/components/RecipeCard";
import {
  Box,
  Heading,
  SimpleGrid,
  Skeleton
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  [key: string]: string | undefined;
};

export default function Area({ params: { areaId } }: any) {
  const decodedWord = decodeURIComponent(areaId);

  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?a=${decodedWord}`
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
      <Box>
        <Box padding="24px">
          {loading ? (
            <>
            <Skeleton h='48px' w='300px' mb='16px' />
            <CardSkeleton />
            </>
          ) : meals.length > 0 ? (
            <>
              <Heading mb="24px">{decodedWord} meals:</Heading>
              <SimpleGrid
                spacing={4}
                templateColumns="repeat(auto-fill, minmax(280px, 1fr))"
              >
                {meals.map((meal) => (
                  <RecipeCard key={meal.idMeal} meal={meal} />
                ))}
              </SimpleGrid>
            </>
          ) : (
            <MealsNotFound />
          )}
        </Box>
      </Box>
    </>
  );
}
