'use client';
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import { registerLocale } from  "react-datepicker";
import { extendTheme } from "@chakra-ui/react";
import { pt } from 'date-fns/locale/pt';
registerLocale('pt', pt)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = extendTheme({
    colors: {
      orange: {
        100: '#ffede5',
        200: '#ffcab3',
        300: '#ffa780',
        400: '#ff834d',
        500: '#ff601a',
        600: '#e64600',
        700: '#b33700',
        800: '#802700',
        900: '##4d1700', 
      },
    },
  })
  return (
    <html lang="en">
      <body>
        <RecoilRoot>
        <ChakraProvider theme={theme}>
        {children}
        </ChakraProvider>
        </RecoilRoot>
      </body>
    </html>
  );
}
