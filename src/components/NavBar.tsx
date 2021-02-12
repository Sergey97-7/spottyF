import { Box, Button, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useMeQuery } from "./../generated/graphql";
interface NavBarProps {}
export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data }] = useMeQuery();
  let body = null;
  if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={4}>login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>register</Link>
        </NextLink>
      </>
    );
  }  else {
    body = (
      <Flex>
        <Box mr="4">{data.me.username}</Box>
        <Button variant="link">logout</Button>
      </Flex>
    );
  }
  return (
    <Flex bg="tan" p={4}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};