import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import {
  ComponentWithAs,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  textarea?: boolean;
};
// interface inputFieldProps {}
const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  size: _,
  ...props
}) => {
  const [field, { error }] = useField(props);
  let InputOrTextarea:  ComponentWithAs<"textarea" | "input", TextareaProps | InputProps>  = Input;
  if(textarea) {
    InputOrTextarea = Textarea;
  }
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputOrTextarea {...field} {...props} id={field.name} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
export default InputField;
