"use client";
import { Card, CardBody, Text, Box, VStack, Avatar } from "@chakra-ui/react";

export default function CardStory({
  imageStory,
  cardName,
  cardHistory,
  cardAbout,
}: any) {
  return (
    <Card >
      <CardBody width="250px">
        <Box
          position="relative"
          bg="#F5F8FC"
          w="220px"
          textAlign="center"
        >
          <Avatar name={cardName} src={imageStory} style={{ width: '100px', height: '100px' }}/>
          <VStack>
            <Text mt="90px" fontSize="20px" fontWeight="600" color='#233345'>
              {cardName}
            </Text>
            <Text fontSize="18px" fontWeight="600">
              {cardHistory}
            </Text>
            <Text fontSize="14px" fontWeight="400">
              {cardAbout}
            </Text>
          </VStack>
        </Box>
      </CardBody>
    </Card>
  );
}
