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
import Wrapper, { WrapperVariant } from "./Wrapper";
import { NavBar } from "./NavBar";

interface LayoutProps {
  variant?: WrapperVariant;
}
// interface inputFieldProps {}
const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
  return (
    <>
      <NavBar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};
export default Layout;
