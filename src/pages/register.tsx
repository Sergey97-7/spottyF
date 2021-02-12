import React from "react";
import { Form, Formik } from "formik";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Box,
  Button,
} from "@chakra-ui/react";
import Wrapper from "./../components/Wrapper";
import InputField from "./../components/InputField";
import { useMutation } from "urql";
import { useRegisterMutation } from "./../generated/graphql";
import { toErrorMap } from "./../utils/toErrorMap";
import { useRouter } from "next/router";
interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useRegisterMutation();
  const router = useRouter();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          console.log("values", values);
          const response = await register(values);
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }, handleChange) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="teal"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
export default Register;
