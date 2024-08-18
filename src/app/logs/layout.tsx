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
      <Center p={2} bg={'gray.300'} h={10} w={'100%'}>Admin Biblioteca de Preços</Center>
      <Flex minH={'100vh'}>
        <Box roundedTopLeft={5} roundedBottomLeft={5} p={2} w={'30%'} bg={'gray.300'}>
          <Center fontWeight={'bold'} my={4} fontSize={18}>Menu</Center>
          <VStack>
            <Button as={'a'} href="/usuarios" w={'100%'} colorScheme="orange">Usuários</Button>
            <Button as={'a'} href="/pagamentos" w={'100%'} colorScheme="orange">Pagamentos</Button>
            <Button as={'a'} href="/logs" w={'100%'} colorScheme="orange">Logs</Button>
          </VStack>
        </Box>
        <Box p={2} w={'100%'} bg={'gray.200'}>{children}</Box>
      </Flex>
    </>
  );
}
