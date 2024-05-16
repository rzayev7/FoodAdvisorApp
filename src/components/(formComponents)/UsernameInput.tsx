import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'
import React from 'react'
import { Controller } from 'react-hook-form'

interface IUsernameInput {
    errors: any,
    control: any,
}
const UsernameInput: React.FC<IUsernameInput> = ({errors, control}) => {
  return (
    <FormControl
          isInvalid={!!errors?.username}
          mb={errors?.username ? 0 : 6}
        >
          <FormLabel>Username</FormLabel>
          <Controller
            name="username"
            control={control}
            rules={{
              required: "Username is required!",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters long",
              },
              maxLength: {
                value: 20,
                message: "Username cannot exceed 20 characters",
              },
              pattern: {
                value: /^[a-zA-Z0-9_]+$/,
                message:
                  "Username can only contain letters, numbers, and underscores",
              },
            }}
            render={({ field }) => <Input {...field} bg="white" />}
          />
          <FormErrorMessage fontSize="14px">
            {errors?.username?.message}
          </FormErrorMessage>
        </FormControl>
  )
}

export default UsernameInput
