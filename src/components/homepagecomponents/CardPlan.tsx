"use client"
import { Card, CardBody, Text, Heading, HStack, VStack, Image } from "@chakra-ui/react";

export default function CardPlan({  cardHeading, cardMain, imagePng }: any) {

    return (
        <Card 
        m='auto'
        boxShadow='0'
        w={{base:"300px", md:"350px"}}
        _hover={{
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            transform: "scale(1.1)",
            transition: "transform 0.3s ease",
          }}>
            <CardBody>
                <HStack
                bg='#FFEBEB'
                borderRadius='24px'
                justifyContent='space-between'
                alignItems='center'>
                    <VStack gap='12px' pl='20px'
                    alignItems='flex-start'>
                        <Heading
                        fontSize='30px'
                        fontWeight='600'>{cardHeading}</Heading>
                        <Text
                        fontSize='16px'
                        fontWeight='400'>{cardMain}</Text>
                    </VStack>
                    <Image 
                    src={imagePng}
                    maxH='172px'
                    maxW='113px'></Image>
                </HStack>
            </CardBody>
        </Card>
    );
}