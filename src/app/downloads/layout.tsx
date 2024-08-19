import { Box, Button, Center, ChakraProvider, Flex, VStack } from "@chakra-ui/react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Biblioteca de Preços"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        {children}
    </>
  );
}
