'use client';
import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react"
import { Provider } from "@/components/ui/provider"
import { defaultSystem } from "@chakra-ui/react"
import { RecoilRoot } from "recoil";
import { registerLocale } from  "react-datepicker";
import { pt } from 'date-fns/locale/pt';
registerLocale('pt', pt)


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = createSystem(defaultConfig, {
    theme: {
      tokens: {
        fonts: {
          heading: { value: `'Figtree', sans-serif` },
          body: { value: `'Figtree', sans-serif` },
        },
        colors: {
          orange: {
            100: {value: '#ffede5'},
            200: {value: '#ffcab3'},
            300: {value: '#ffa780'},
            400: {value: '#ff834d'},
            500: {value: '#ff601a'},
            600: {value: '#e64600'},
            700: {value: '#b33700'},
            800: {value: '#802700'},
            900: {value: '#4d1700'}
          }
        }
      }
    }
  })
  return (
    <html lang="en">
      <body>
        <RecoilRoot>
        <ChakraProvider value={theme}>
        {children}
        </ChakraProvider>
        </RecoilRoot>
      </body>
    </html>
  );
}
