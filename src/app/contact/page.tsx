"use client";
import axios from "axios";
import {
  VStack,
  Image,
  Text,
  useToast,
  HStack,
  Flex,
  Avatar,
  Heading,
  Box,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, RefObject } from "react";
import { Controller, useForm } from "react-hook-form";
import PasswordInput from "@/components/(formComponents)/PasswordInput";
import EmailInput from "@/components/(formComponents)/EmailInput";
import LoginButton from "@/components/(formComponents)/LoginButton";
import HelpTitle from "@/components/helpPage/HelpTitle";
import HelpTextarea from "@/components/helpPage/HelpTextarea";
import HelpButton from "@/components/helpPage/HelpButton";
import emailjs from "@emailjs/browser";
import { useAuth } from "@/contexts/authContext";
import UsernameInput from "@/components/(formComponents)/UsernameInput";
const HelpPage = () => {
  const {user} = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [isErr, setIsErr] = useState(false);

  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    if (window) {
      window.history.pushState(null, "", window.location.href);
      window.onpopstate = function () {
        window.history.go(1);
      };
    }
  }, []);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
  } = useForm({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const form: RefObject<HTMLFormElement> = useRef(null);

  const sendEmail = (e: any) => {
    setIsLoading(true);
    if (form.current) {
      emailjs
        .sendForm(
          "service_c8rv9pl",
          "template_objj23j",
          form.current,
          "g7ff1YFVqqwiDDX1K"
        )
        .then(
          (result) => {
            console.log(result.text);
            toast({
              title:
                "We received your application. Please wait for our response!",
              status: "success",
              duration: 3000,
              position: "top",
              isClosable: true,
              colorScheme: "blue",
            });

          },
          (error) => {
            console.log(error.text);
          }
        )
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      console.error("Form ref is not defined.");
    }
  };
 
 
  return (
    <VStack width="100%" height="100vh" padding="20px 70px">
      <HStack justifyContent="space-between" width="100%">
        <Image src="../images/image 28.png" onClick={()=>router.push("/")} cursor="pointer"/>
        <Flex fontWeight="bold" alignItems="center" onClick={()=> router.push("/profile")}>
          {" "}
          <Avatar size="sm" name={user?.username} mr={3} />
          <Text fontSize="md">{user?.username}</Text>
        </Flex>
      </HStack>
      <HStack width="100%" justifyContent="space-between">
        <VStack alignItems="flex-start" width={{base: "100%",md:"50%"}} mt="20px">
          <Heading fontWeight="600" >Contact us:</Heading>
          <Text fontSize="16px" fontWeight="200" mb="20px">
            We’re here to help! Send us your feedback via the form below or send
            us an email at{" "}
            <Link style={{color:"blue"}} href="mailto:fooderra.contact@gmail.com">
              {" "}
              fooderra.contact@gmail.com
            </Link>{" "}
            for any issue you’re facing
          </Text>
          <form style={{ width: "100%" }} ref={form}>
            <EmailInput errors={errors} control={control} />
            <HelpTitle errors={errors} control={control} />
            <HelpTextarea errors={errors} control={control} />
            <HelpButton
              handleSubmit={handleSubmit}
              onSubmit={sendEmail}
              isValid={isValid}
              isloading={isloading}
            />
          </form>
        </VStack>
        <Image src="../images/Page-1.png" width={{base:"0",md:"25%"}} mr="50px"/>
      </HStack>
    </VStack>
  );
};
export default HelpPage;
