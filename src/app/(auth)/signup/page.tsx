"use client";
import axios from "axios";
import { VStack, Image, Text, useToast } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import EmailInput from "@/components/(formComponents)/EmailInput";
import PasswordInput from "@/components/(formComponents)/PasswordInput";
import UsernameInput from "@/components/(formComponents)/UsernameInput";
import TermsCondition from "@/components/(formComponents)/TermsCondition";
import SignButton from "@/components/(formComponents)/SignButton";
import { useAuth } from "@/contexts/authContext";

const SignUp = () => {
  const { user, logout } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isloading, setisLoading] = useState(false);

  useEffect(() => {
    if (user) {
      logout();
    }
  }, [])

  const toast = useToast();
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
  async function onSubmit() {
    const { username, email, password } = getValues();
    setisLoading(true);
    try {
      const response = await axios.post(
        "https://fooderra-api.vercel.app/api/users",
        { username, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }      
      );
      toast({
        title: "You successfully registered!",
        status: "success",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
      router.push("/login");
    } catch (error) {
      toast({
        title: "This account already exist!",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
      console.error("Error creating account:", error);
    } finally {
      setisLoading(false);
    }
  }
  useEffect(() => {
    const handleKeyPress = (e:any) => {
      if (e.key === 'Enter' && isValid && agreeTerms) {
        handleSubmit(onSubmit)();
      }
    };
  
    document.addEventListener('keypress', handleKeyPress);
  
    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [isValid, agreeTerms]);
  return (
    <VStack
      minWidth="400px"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      gap="0"
      bg="#EEF8FD"
      bgImage="/images/guakka.svg"
      bgRepeat="no-repeat"
      bgPosition="left 5% top 70%"
      bgSize={{ base: "0", "2xl": "20%" }}
    >
      <Image
        width={{ base: "40%", sm: "35%", md: "30%", lg: "20%" }}
        src="../images/Logo.svg"
        mb="20px"
        alt=""
        cursor="pointer"
        onClick={() => {
          router.push("/");
        }}
      />
      <VStack
        width={{
          base: "80%",
          sm: "75%",
          md: "65%",
          lg: "60%",
          xl: "50%",
          "2xl": "35%",
        }}
      >
        <Text fontWeight="700" fontSize={{ base: "20px", md: "30px" }}>
          Create your account
        </Text>
        <Text fontSize={{ base: "14px", md: "16px" }}>
          Register your account to save your settings
        </Text>
        <form style={{ width: "100%" }}>
          <UsernameInput errors={errors} control={control} />
          <EmailInput errors={errors} control={control} />
          <PasswordInput
            errors={errors}
            control={control}
            showPassword={showPassword}
            handleTogglePassword={handleTogglePassword}
          />

          <TermsCondition
            setAgreeTerms={setAgreeTerms}
            setIsTermsModalOpen={setIsTermsModalOpen}
            handleReject={handleReject}
            handleAccept={handleAccept}
            agreeTerms={agreeTerms}
            isTermsModalOpen={isTermsModalOpen}
          />
          <SignButton
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            isValid={isValid}
            agreeTerms={agreeTerms}
            isloading={isloading}
          />
        </form>
      </VStack>
    </VStack>
  );
};
export default SignUp;
