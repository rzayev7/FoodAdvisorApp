import { Button, Spinner,Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React from 'react'
 interface IHelpButtonProps {
    handleSubmit: any,
    onSubmit: any,
    isValid: any,
    isloading: boolean
 }
const HelpButton: React.FC<IHelpButtonProps> = ({handleSubmit,onSubmit, isloading,isValid}) => {
    const router = useRouter();
  return (
    
    <VStack width="100%">
     <Button
          mb="20px"
          mt="20px"
          width="100%"
          bg="#233345"
          variant="brand"
          color="white"
          onClick={()=>{
            handleSubmit(onSubmit);
            router.push("/")

          }
        }
          isDisabled={!isValid}
        >
          {isloading ? <Spinner /> : "Send"}
        </Button>
       
    </VStack>
  )
}

export default HelpButton
