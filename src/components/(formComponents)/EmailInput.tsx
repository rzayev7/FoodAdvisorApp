import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react"
import React from "react"
import { Controller } from "react-hook-form"
 interface IEmailInput {
    errors: any,
    control:any,

 }
const EmailInput: React.FC<IEmailInput> = ({errors, control}) => {
  return (
    <FormControl
    width="100%"
    isInvalid={!!errors?.email}
    mb={errors?.email ? 0 : 6}
  >
    <FormLabel>Email address</FormLabel>
    <Controller
      name="email"
      control={control}
      rules={{
        required: "Email is required!",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email address",
        },
      }}
      render={({ field }) => <Input {...field} bg="white" />}
    />
    <FormErrorMessage fontSize="14px">
      {errors?.email?.message}
    </FormErrorMessage>
  </FormControl>
  )
}

export default EmailInput
