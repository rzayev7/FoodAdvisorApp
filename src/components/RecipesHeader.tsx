"use client";
import { Search2Icon } from "@chakra-ui/icons";
import { Box, Flex, Icon, Input, Button, Select } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
type Category = {
  strArea: string;
  strCategory: string;
};

export function RecipesHeader() {
  const [areas, setAreas] = useState<Category[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const handleAreaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedArea(selectedValue);
    setSelectedCategory("");
    setSearchValue("");
    router.push(`/recipes/areas/${selectedValue}`);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
    setSelectedArea("");
    setSearchValue("");
    router.push(`/recipes/categories/${selectedValue}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [areasResponse, categoriesResponse] = await Promise.all([
          axios.get("https://www.themealdb.com/api/json/v1/1/list.php?a=list"),
          axios.get("https://www.themealdb.com/api/json/v1/1/list.php?c=list"),
        ]);

        setAreas(areasResponse.data.meals || []);
        setCategories(categoriesResponse.data.meals || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedArea("");
    setSelectedCategory("");
    router.push(`/recipes/search/${searchValue}`);
  };

  return (
    <Box
      bg="#EEF8FD"
      bgImage="/images/guakka.svg"
      bgRepeat="no-repeat"
      bgPosition="top 20px left 20px"
    >
      <Flex
        display="flex"
        justifyContent="center"
        gap="24px"
        pt="24px"
        flexDirection={{ base: "column", md: "row" }}
        alignItems="center"
      >
        <Select
          maxW="220px"
          placeholder={`Filter by area ${
            selectedArea ? `- ${selectedArea}` : ""
          }`}
          borderRadius="24px"
          outline="0"
          border="0"
          _hover={{ bg: "#d6e0e7" }}
          _active={{ bg: "#d6e0e7", color: "#405167" }}
          onChange={handleAreaChange}
          value={selectedArea}
        >
          {areas.map((area) => (
            <option key={area.strArea}>{area.strArea}</option>
          ))}
        </Select>
        <Select
          maxW="220px"
          placeholder="Filter by category"
          borderRadius="24px"
          outline="0"
          border="0"
          _hover={{ bg: "#d6e0e7" }}
          _focus={{ bg: "#d6e0e7", color: "#405167" }}
          onChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <option key={category.strCategory}>{category.strCategory}</option>
          ))}
        </Select>
      </Flex>
      <Flex justifyContent="center">
        <Flex
          w={{ lg: "70%", base: "90%" }}
          position="relative"
          py="24px"
          as="form"
          onSubmit={onSearch}
        >
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            w="100%"
            placeholder="Search by recipe title"
            bg="#fff"
            border="gray.100"
            pl="40px"
            borderRadius="24px"
            onFocus={() => {
              setSelectedArea("");
              setSelectedCategory("");
            }}
          />
          {searchValue && (
            <Button
              variant="ghost"
              position="absolute"
              zIndex="500"
              p="0"
              borderRadius="24px"
              onClick={() => setSearchValue("")}
            >
              <CloseIcon color="#3e5a7b" />
            </Button>
          )}
          <Button
            type="submit"
            zIndex="1"
            ml="-64px"
            bg="#233345"
            borderRadius="24px"
            _hover={{ bg: "#3e5a7b" }}
            px="24px"
          >
            <Icon as={Search2Icon} color="#fff" />
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
