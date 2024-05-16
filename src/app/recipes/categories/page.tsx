"use client";
import {
  Box,
  Circle,
  Flex,
  Heading,
  Link,
  SimpleGrid,
  Skeleton,
  Image
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
type Category = {
  strCategory: string;
};

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
        );
        setCategories(response.data.meals || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <Heading ml="24px" mt='24px'>List of the all categories:</Heading>
      <Box p="24px">
        {loading ? (
          <Skeleton height="300px" borderRadius='24px' />
        ) : (
          <>
          <SimpleGrid minChildWidth="250px" bg="#EEF8FD" py='16px' px='32px' borderRadius='24px'>
            {categories.length > 0 &&
              categories.map((category) => (
                <Flex
                  key={category.strCategory}
                  py="8px"
                  alignItems='baseline'
                >
                  <Circle size='16px' bg="#9babc1" mr='12px' />
                  <Link
                    mt="8px"
                    fontSize="24px"
                    fontWeight="500"
                    _hover={{ color: "red" }}
                    href={`categories/${category.strCategory}`}
                  >
                    {category.strCategory}
                  </Link>
                </Flex>
              ))}
          </SimpleGrid>
          </>
        )}
      </Box>
    </>
  );
}
