import React from "react";
import { BiHeart, BiSolidHeart } from "react-icons/bi";
import { Button, Flex } from "@chakra-ui/react";
import { TwitterIcon, TwitterShareButton } from "next-share";

type LikeAndShareButtonsProps = {
  isLiked: boolean;
  onLikeClick: () => void;
  recipeUrl: string;
  recipeTitle: string;
};

const LikeAndShareButtons: React.FC<LikeAndShareButtonsProps> = ({
  isLiked,
  onLikeClick,
  recipeUrl,
  recipeTitle,
}) => {
  return (
    <Flex width="100%" gap="8px">
      <Button
        width="50%"
        color={isLiked ? "red" : ""}
        leftIcon={isLiked ? <BiSolidHeart /> : <BiHeart />}
        onClick={onLikeClick}
      >
        {isLiked ? "Liked" : "Like"}
      </Button>
      <TwitterShareButton
        style={{
          display: "flex",
          width: "50%",
          height: "40px",
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
          borderRadius: "8px",
          color: "#fff",
          fontWeight: "500",
        }}
        url={recipeUrl}
        title={`"Share the Joy: Discover the Delightful Recipe of ${recipeTitle} with #fooderra on X!"`}
        hashtags={["fooderra"]}
      >
        <TwitterIcon size={40} />
        Share
      </TwitterShareButton>
    </Flex>
  );
};

export default LikeAndShareButtons;