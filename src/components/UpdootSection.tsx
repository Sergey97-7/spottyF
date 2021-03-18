import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  PostSnippetFragment,
  PostsQuery,
  useVoteMutation,
} from "../generated/graphql";

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [, vote] = useVoteMutation();
  const [loadingState, setLoadingState] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading");
  return (
    <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
      <IconButton
        colorScheme={post.voteStatus === 1 ? "green" : undefined}
        isLoading={loadingState === "updoot-loading"}
        onClick={async () => {
          if (post.voteStatus === 1) return;
          setLoadingState("updoot-loading");
          await vote({ value: 1, postId: post.id });
          setLoadingState("not-loading");
        }}
        aria-label="updoot post"
        icon={<ChevronUpIcon />}
      />
      {post.points}
      <IconButton
        colorScheme={post.voteStatus === -1 ? "red" : undefined}
        isLoading={loadingState === "downdoot-loading"}
        onClick={async () => {
          if (post.voteStatus === -1) return;
          setLoadingState("downdoot-loading");
          await vote({ value: -1, postId: post.id });
          setLoadingState("not-loading");
        }}
        aria-label="downdoot post"
        icon={<ChevronDownIcon />}
      />
    </Flex>
  );
};
