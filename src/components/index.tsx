import {  Box, Flex, VStack } from "@chakra-ui/react";
import Footer from "./Footer";
import { Navigation } from "./Navigation";

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Navigation />
        <Box flexGrow={1}>{children}</Box>
        <Footer/>
      </Box>
    );
  };