import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { Controller } from "react-hook-form";
interface IHelpTextareaProps {
  errors: any;
  control: any;
}
const HelpTextarea: React.FC<IHelpTextareaProps> = ({ errors, control }) => {
  return (
    <FormControl
      width="100%"
      isInvalid={!!errors?.complaint}
      mb={errors?.complaint ? 0 : 6}
    >
      <FormLabel>Your message</FormLabel>
      <Controller
        name="complaint"
        control={control}
        rules={{
          required: "Please write your message!",
         
        }}
        render={({ field }) => <Textarea {...field} height="100px"/>}
      />
      <FormErrorMessage fontSize="14px">
        {errors?.complaint?.message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default HelpTextarea;
