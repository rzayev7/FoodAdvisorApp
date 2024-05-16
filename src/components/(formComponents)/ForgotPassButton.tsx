"use client";
import { VStack, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";

interface IForgotPassButtonProps {
  onSubmit: () => void; 
  isValid: boolean;
}
const ForgotPassButton: React.FC<IForgotPassButtonProps> = ({ isValid, onSubmit }) => {
  const router = useRouter();

  return (
    <VStack width="100%">
      <Button
        mb="20px"
        mt="20px"
        width="100%"
        colorScheme="blue"
        variant="solid"
        color="white"
        onClick={onSubmit}
        isDisabled={!isValid}
      >
        Reset password
      </Button>

      <Button
        width="100%"
        colorScheme="blue"
        variant="solid"
        color="white"
        onClick={() => {
          router.push("/login");
        }}
      >
        Back to Login
      </Button>
    </VStack>
  );
};

export default ForgotPassButton;