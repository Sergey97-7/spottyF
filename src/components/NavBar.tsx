import { Box, Button, Center, Flex, Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { isServer } from "../utils/isServer";
import { useLogoutMutation, useMeQuery } from "./../generated/graphql";
import { useRouter } from "next/router";

interface NavBarProps {}
export const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
  const [{ data }] = useMeQuery({
    pause: isServer(),
  });
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
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
  } else {
    body = (
      <Flex align={"center"}>
        <NextLink href="/create-post">
          <Button as={Link} mr={4}>
            create post
          </Button>
        </NextLink>
        <Box mr="4">{data.me.username}</Box>
        <Button
          onClick={async () => {
            await logout();
            router.reload();
          }}
          isLoading={logoutFetching}
          variant="link"
        >
          logout
        </Button>
      </Flex>
    );
  }
  return (
    <Flex
      zIndex={1}
      position="sticky"
      top={0}
      bg="tan"
      p={4}
      align={"center"}
      justifyContent={"center"}
    >
      <Flex flex={1} maxW={800} align="center">
        <NextLink href="/">
          <Link>
            <Heading>Spotty</Heading>
          </Link>
        </NextLink>
        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};
