"use client"
import { Card, CardBody, Image, Text,Box} from "@chakra-ui/react";

export default function Cards({ imageUrl, cardText, cardTime }: any) {

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
                <Box position='relative'>
                    <Image src={imageUrl} ></Image>
                    <Text 
                    position='absolute' 
                    right='8px' 
                    bottom='8px'
                    color='white'>{cardTime}</Text>
                </Box>
                <Box bg='#F5F8FC' py='16px' pl='16px'>
                    <Text 
                    fontSize='16px' 
                    fontWeight='400'

                    >
                        {cardText}
                    </Text>
                </Box>
            </CardBody>
        </Card>
    );
}