import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { useCreatePostMutation, useMeQuery } from "../generated/graphql";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import Layout from "./../components/Layout";
import { useIsAuth } from "./../utils/useIsAuth";
const CreatePost: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, createPost] = useCreatePostMutation();
  useIsAuth();
  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values, { setErrors }) => {
          console.log("values", values);
          const { error } = await createPost({ input: values });
          if (!error) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }, handleChange) => (
          <Form>
            <InputField name="title" placeholder="title" label="Title" />
            <Box mt={4}>
              <InputField
                name="text"
                placeholder="text..."
                label="Body"
                textarea
              />
            </Box>
            <Button
              mt={2}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="teal"
            >
              create post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
