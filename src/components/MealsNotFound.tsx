import { Box, Button, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function MealsNotFound() {
    const router = useRouter();
    return(
        <Box display='flex' justifyContent='center' alignItems='center'>
        <Box display='flex' flexDirection='column' alignItems='center'>
          <Image src="/images/guakka.gif" alt="" h='300px' />
          <Text
            lineHeight="28px"
            fontSize="20px"
            fontWeight="500"
            color="#405167"
            py='16px'
            textAlign='center'
          >
            We can&apos;t find anything, please come back and try again
          </Text>
          <Button
            bg="#233345"
            color="#fff"
            borderRadius="24px"
            _hover={{ bg: "#3e5a7b" }}
            fontSize="18px"
            fontStyle="normal"
            fontWeight="500"
            lineHeight="normal"
            px="40px"
            onClick={() => router.back()}
          >
            Take me back
          </Button>
        </Box>
      </Box>
    )
}