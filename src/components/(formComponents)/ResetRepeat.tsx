import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

const ResetRepeat: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    control,
    formState,
    clearErrors,
    getValues,
    setValue,
    setError,
    trigger,
  } = useFormContext();

  const { errors } = formState;

  return (
    <FormControl
      isInvalid={!!errors?.confirmPassword}
      mb={errors?.confirmPassword ? 0 : 6}
    >
      <FormLabel>Confirm new password</FormLabel>
      <InputGroup>
        <Controller
          name="confirmPassword"
          control={control}
          rules={{
            required: "Password confirmation is required!",
          }}
          render={({ field }) => (
            <Input
              {...field}
              isInvalid={!!errors.confirmPassword}
              type={showPassword ? "text" : "password"}
              bg="white"
              onChange={(e) => {
                setValue("confirmPassword", e.target.value);
                const newPasswordValue = getValues("newPassword");

                if (e.target.value) {
                  if (newPasswordValue !== e.target.value) {
                    setError("confirmPassword", {
                      type: "matching",
                      message: "Passwords don't match!",
                    });
                  } else {
                    clearErrors("confirmPassword");
                  }
                } else if (e.target.value === "") {
                  setError("confirmPassword", {
                    type: "required",
                    message: "Password confirmation is required!",
                  });
                }
              }}
            />
          )}
        />

        <InputRightElement>
          <IconButton
            variant="gray"
            backgroundColor="transparent"
            outline="none"
            aria-label={showPassword ? "Hide Password" : "Show Password"}
            icon={showPassword ? <ViewIcon /> : <ViewOffIcon />}
            onClick={handleTogglePassword}
          />
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage fontSize="14px">
        {errors?.confirmPassword?.message as React.ReactNode}
      </FormErrorMessage>
    </FormControl>
  );
};

export default ResetRepeat;
