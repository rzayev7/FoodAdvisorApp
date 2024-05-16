
"use client";
import EmailInput from "@/components/(formComponents)/EmailInput";
import ForgotPassButton from "@/components/(formComponents)/ForgotPassButton";
import { Image, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

const ForgotPassword = () => {
  const router = useRouter();
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "all",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = useCallback(
    handleSubmit(async (data: { email: string }) => {
      const url = `/resetpassword?email=${data.email}`;
      router.push(url);
    }),
    [router]
  );

  useEffect(() => {
    const handleKeyPress = (e: any) => {
      if (e.key === "Enter" && isValid) {
        onSubmit();
      }
    };

    document.addEventListener("keypress", handleKeyPress);

    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [onSubmit, isValid, handleSubmit]);

  return (
    <VStack
      gap="0"
      bg="#EEF8FD"
      minWidth="400px"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      bgImage="/images/guakka.svg"
      bgRepeat="no-repeat"
      bgPosition="left 5% top 70%"
      bgSize={{ base: "0", "2xl": "20%" }}
    >
      <Image
        alt=""
        src="../images/Logo.svg"
        cursor="pointer"
        width={{ base: "40%", sm: "35%", md: "30%", lg: "20%" }}
        mb={{ base: "20px", lg: "40px" }}
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
        alignItems="flex-start"
      >
        <Text fontSize={{ base: "20px", md: "30px" }} fontWeight="600">
          Forgot your password?
        </Text>
        <Text mb="20px" fontSize={{ base: "14px", md: "16px" }}>
          Please enter the email you use to sign in
        </Text>
        <EmailInput errors={errors} control={control} />
        <ForgotPassButton onSubmit={onSubmit} isValid={isValid} />
      </VStack>
    </VStack>
  );
};
export default ForgotPassword;