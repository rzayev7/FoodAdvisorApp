import { Button, Spinner, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React from 'react'

interface ISignButtonProps{
    handleSubmit: any,
    onSubmit: any,
    isValid: any,
    isloading: boolean,
    agreeTerms: boolean
}
const SignButton: React.FC<ISignButtonProps> = ({handleSubmit, onSubmit,isValid,agreeTerms, isloading}) => {
    const router = useRouter();
  return (
    <VStack>
      <Button
          mb="20px"
          width="100%"
          colorScheme="blue"
          variant="solid"
          color="white"
          onClick={handleSubmit(onSubmit)}
          isDisabled={!isValid || !agreeTerms}
        >
         {isloading ? <Spinner /> : "Sign Up"}
        </Button>
        <Text >
          Already have an account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => {
              router.push("/login");
            }}
          >
            Login
          </span>
        </Text>
    </VStack>
  )
}

export default SignButton
