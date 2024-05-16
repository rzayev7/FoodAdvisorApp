import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { FormControl, FormErrorMessage, FormLabel, IconButton, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { Controller } from "react-hook-form"
interface PasswordProps{
    errors:any,
    control:any,
    showPassword:any,
    handleTogglePassword:any
}
const PasswordInput: React.FC<PasswordProps> = ({errors,control,showPassword,handleTogglePassword}) => {
  return (
    <FormControl
          isInvalid={!!errors?.password}
          mb={errors?.password ? 0 : 6}
        >
          <FormLabel>Password</ FormLabel>
          <InputGroup>
            <Controller
              name="password"
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
                  type={showPassword ? "text" : "password"}
                  bg="white"
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
            {errors?.password?.message}
          </FormErrorMessage>
        </FormControl>
  )
}

export default PasswordInput
