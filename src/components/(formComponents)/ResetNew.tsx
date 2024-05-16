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

const ResetNew: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const { control, formState, trigger, watch } = useFormContext();

  const { errors } = formState;

  return (
    <FormControl
      isInvalid={!!errors?.newPassword}
      mb={errors?.newPassword ? 0 : 6}
    >
      <FormLabel>New password</FormLabel>
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
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]*$/,
              message:
                "Password must include at least one lowercase letter, one uppercase letter, and one digit",
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              isInvalid={!!errors.newPassword}
              type={showPassword ? "text" : "password"}
              bg="white"
              onChange={(e) => {
                field.onChange(e);
                watch("confirmPassword") && trigger("confirmPassword");
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
        {errors?.newPassword?.message as React.ReactNode}
      </FormErrorMessage>
    </FormControl>
  );
};

export default ResetNew;
