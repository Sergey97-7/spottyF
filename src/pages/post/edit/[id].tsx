import React from "react";
import { withUrqlClient } from "next-urql";
// import { createUrqlClient } from "../../utils/createUrqlClient";
// import { useRouter } from "next/router";
// import { usePostQuery } from "./../../generated/graphql";
// import Layout from "./../../components/Layout";
import { Heading } from "@chakra-ui/layout";
import { Box, Button } from "@chakra-ui/react";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { Formik, Form } from "formik";
import router, { useRouter } from "next/router";
import InputField from "../../../components/InputField";
import Layout from "../../../components/Layout";
import createPost from "../../create-post";
import { usePostQuery, usePostsQuery } from "../../../generated/graphql";
import { useGetPostFromUrl } from "../../../utils/useGetPostFromUrl";
import { useGetIntId } from "../../../utils/useGetIntId";
import { useUpdatePostMutation } from "./../../../generated/graphql";

const EditPost: React.FC<{}> = ({}) => {
  const router = useRouter();
  const intId = useGetIntId();
  const [{ data, fetching, error }] = usePostQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
  const [, updatePost] = useUpdatePostMutation();
  if (fetching) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  if (!data?.post) {
    return (
      <Layout>
        <Box>could not find post</Box>
      </Layout>
    );
  }
  //   return (
  //     <Layout>
  //       <Heading mb={4}>{data.post.title}</Heading>
  //       {data.post.text}
  //     </Layout>
  //   );
  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: data.post.title, text: data.post.text }}
        onSubmit={async (values, { setErrors }) => {
          await updatePost({ id: intId, ...values });
          router.back();
          //   console.log("values", values);
          //   const { error } = await createPost({ input: values });
          //   if (!error) {
          //     router.push("/");
          //   }
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
              update post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(EditPost);
