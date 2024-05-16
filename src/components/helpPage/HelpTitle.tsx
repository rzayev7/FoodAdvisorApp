import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react"
import React from "react"
import { Controller } from "react-hook-form"
 interface IHelpTitleProps {
    errors: any,
    control:any,

 }
const HelpTitle: React.FC<IHelpTitleProps> = ({errors, control}) => {
  return (
    <FormControl
    width="100%"
    isInvalid={!!errors?.title}
    mb={errors?.title ? 0 : 6}
  >
    <FormLabel>Subject</FormLabel>
    <Controller
      name="title"
      control={control}
      rules={{
        required: "Subject is required!",
        
      }}
      render={({ field }) => <Input {...field}  />}
    />
    <FormErrorMessage fontSize="14px">
      {errors?.title?.message}
    </FormErrorMessage>
  </FormControl>
  )
}

export default HelpTitle
