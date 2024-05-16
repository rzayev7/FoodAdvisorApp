'use client'
import React, { useEffect, useState } from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';
import axios from 'axios';
import CardSkeleton from './CardSkeleton';
import { useAuth } from '@/contexts/authContext';
import RecipeCard from './RecipeCard';

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
};

export function CardContainer() {
  const { user } = useAuth();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s');
        setMeals(response.data.meals || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [user]);

  return (
    <Box padding="24px">
      {loading ? (
        <CardSkeleton />
      ) : (
        <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(285px, 1fr))">
          {meals.length > 0 &&
            meals.map((meal) => (
              <RecipeCard key={meal.idMeal} meal={meal} />
            ))}
        </SimpleGrid>
      )}
    </Box>
  );
}
