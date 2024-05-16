"use client";
import {
  Box,
  Circle,
  Flex,
  Heading,
  Link,
  SimpleGrid,
  Skeleton,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
type Area = {
  strArea: string;
};

export default function Areas() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
        );
        setAreas(response.data.meals || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAreas();
  }, []);

  return (
    <>
      <Heading ml="24px" mt='24px'>List of the all areas:</Heading>
      <Box p="24px">
        {loading ? (
            <Skeleton height="300px" borderRadius='24px' />
        ) : (
          <SimpleGrid minChildWidth="250px" bg="#EEF8FD" py='16px' px='32px' borderRadius='24px'>
            {areas.length > 0 &&
              areas.map((area) => (
                <Flex
                  key={area.strArea}
                  py="8px"
                  alignItems='baseline'
                >
                  <Circle size='16px' bg="#9babc1" mr='12px' />
                  <Link
                    mt="8px"
                    fontSize="24px"
                    fontWeight="500"
                    _hover={{ color: "red" }}
                    href={`areas/${area.strArea}`}
                  >
                    {area.strArea}
                  </Link>
                </Flex>
              ))}
          </SimpleGrid>
        )}
      </Box>
    </>
  );
}
