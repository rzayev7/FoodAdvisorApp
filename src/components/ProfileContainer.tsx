"use client";
import axios from "axios";
import {
  AtSignIcon,
  CheckIcon,
  EmailIcon,
  PhoneIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  HStack,
  ModalFooter,
  InputLeftAddon,
  InputLeftElement,
} from "@chakra-ui/react";
import {
  Box,
  VStack,
  Image,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  InputGroup,
  IconButton,
  InputRightElement,
  Checkbox,
  FormErrorMessage,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const ProfileContainer = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const router = useRouter();
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleAccept = () => {
    setAgreeTerms(true);
    setIsTermsModalOpen(false);
  };

  const handleReject = () => {
    setAgreeTerms(false);
    setIsTermsModalOpen(false);
  };
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
  } = useForm({
    mode: "all",
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = async () => {
    const { username, email, password } = getValues();
    console.log("username", username, email, password);
    try {
      const response = await axios.post(
        "http://localhost:3003/api/users",
        { username, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Account created successfully");
      router.push("/login");
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  return (
    <VStack
      width={{
        base: "80%",
        sm: "75%",
        md: "65%",
        lg: "60%",
        xl: "50%",
        "2xl": "35%",
      }}
      marginLeft={50}
      marginTop={50}
    >
      <FormControl>
        <InputGroup>
          <Controller
            name="password"
            control={control}
            disabled={true}
            render={({ field }) => (
              <>
                <InputLeftElement pointerEvents="none" marginTop={1}>
                  <CheckIcon color="gray.300" />
                </InputLeftElement>
                <Input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  bg="white"
                  height={50}
                  borderRadius={50}
                />
                <FormLabel
                  htmlFor="ID"
                  position="absolute"
                  top="5px"
                  left="8px"
                  zIndex="1"
                  bg="white"
                  fontSize={12}
                  pl="5"
                  pr="2"
                  ml="5"
                >
                  ID
                </FormLabel>
              </>
            )}
          />
        </InputGroup>
      </FormControl>
      <FormControl>
        <InputGroup>
          <Controller
            name="password"
            control={control}
            disabled={true}
            render={({ field }) => (
              <>
                <InputLeftElement pointerEvents="none" marginTop={1}>
                  <AtSignIcon color="gray.300" />
                </InputLeftElement>
                <Input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  bg="white"
                  height={50}
                  borderRadius={50}
                />
                <FormLabel
                  htmlFor="ID"
                  position="absolute"
                  top="5px"
                  left="8px"
                  zIndex="1"
                  bg="white"
                  fontSize={12}
                  pl="5"
                  pr="2"
                  ml="5"
                >
                  ID
                </FormLabel>
              </>
            )}
          />
        </InputGroup>
      </FormControl>
      <FormControl>
        <InputGroup>
          <Controller
            name="password"
            control={control}
            disabled={true}
            render={({ field }) => (
              <>
                <InputLeftElement pointerEvents="none" marginTop={1}>
                  <EmailIcon color="gray.300" />
                </InputLeftElement>
                <Input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  bg="white"
                  height={50}
                  borderRadius={50}
                />
                <FormLabel
                  htmlFor="ID"
                  position="absolute"
                  top="5px"
                  left="8px"
                  zIndex="1"
                  bg="white"
                  fontSize={12}
                  pl="5"
                  pr="2"
                  ml="5"
                >
                  ID
                </FormLabel>
              </>
            )}
          />
        </InputGroup>
      </FormControl>
    </VStack>
  );
};
export default ProfileContainer;
