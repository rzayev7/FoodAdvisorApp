"use client";
import EmailInput from "@/components/(formComponents)/EmailInput";
import ForgotPassButton from "@/components/(formComponents)/ForgotPassButton";
import ResetNew from "@/components/(formComponents)/ResetNew";
import ResetRepeat from "@/components/(formComponents)/ResetRepeat";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  VStack,
  Image,
  Text,
  Button,
  InputRightElement,
  IconButton,
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  FormErrorMessage,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const handleToggleNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const onSubmit = async () => {
    const { newPassword } = getValues();
    setIsLoading(true)
    const response = await axios.patch("https://fooderra-api.vercel.app/api/users/resetpassword", {
      email: searchParams.get("email"),
      password: newPassword,
    });
    if(response.status === 200) {
      router.push("/login");
    }
    setIsLoading(false);
  }
  


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
          Reset your password
        </Text>
        <Text mb="20px" fontSize={{ base: "14px", md: "16px" }}>
          Please choose a new password to finishing sign in
        </Text>

        <FormControl
          isInvalid={!!errors?.newPassword}
          mb={errors?.newPassword ? 0 : 6}
        >
          <FormLabel>New Password</FormLabel>
          <InputGroup>
            <Controller
              name="newPassword"
              control={control}
              rules={{
                required: "Password is required!",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]*$/,
                  message: "Password must include at least one lowercase letter, one uppercase letter, and one digit",
                },
                
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type={showNewPassword ? "text" : "password"}
                  bg="white"
                />
              )}
            />

            <InputRightElement>
              <IconButton
                variant="gray"
                backgroundColor="transparent"
                outline="none"
                aria-label={showNewPassword ? "Hide Password" : "Show Password"}
                icon={showNewPassword ? <ViewIcon /> : <ViewOffIcon />}
                onClick={handleToggleNewPassword}
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage fontSize="14px">
            {errors?.newPassword?.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={!!errors?.confirmPassword}
          mb={errors?.confirmPassword ? 0 : 6}
        >
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "Confirm password is required!",
                validate: (value) =>
                  value === getValues().newPassword ||
                  "The passwords do not match",
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type={showConfirmPassword ? "text" : "password"}
                  bg="white"
                />
              )}
            />

            <InputRightElement>
              <IconButton
                variant="gray"
                backgroundColor="transparent"
                outline="none"
                aria-label={
                  showConfirmPassword ? "Hide Password" : "Show Password"
                }
                icon={showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                onClick={handleToggleConfirmPassword}
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage fontSize="14px">
            {errors?.confirmPassword?.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          mb="20px"
          mt="20px"
          width="100%"
          colorScheme="blue"
          variant="solid"
          type="submit"
          color="white"
          onClick={handleSubmit(onSubmit)}
          isDisabled={!isValid}
          isLoading={isLoading}
        >
          Confirm
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
    </VStack>
  );
};
export default ResetPassword;
