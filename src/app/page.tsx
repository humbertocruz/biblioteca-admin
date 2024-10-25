import { Button } from "@/components/ui/button";
import { Box, Heading } from "@chakra-ui/react";

export default function Home() {
  return (
    <Button as={'a'} href={'/dashboard'}>Hello</Button>
  );
}
