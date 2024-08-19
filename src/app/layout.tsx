'use client';
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import { pt } from 'date-fns/locale/pt';
registerLocale('pt', pt)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body>
        <RecoilRoot>
        <ChakraProvider>
        {children}
        </ChakraProvider>
        </RecoilRoot>
      </body>
    </html>
  );
}
