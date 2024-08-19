'use client'
import { Box, Center, Heading, HStack, IconButton, Table,Tbody, Td, Th, Thead, Tr, Text, Card, CardHeader, CardFooter, Flex, SimpleGrid } from "@chakra-ui/react";
import useSWR from 'swr';
import dayjs from 'dayjs';
import { FaDollarSign, FaDownload, FaEye } from 'react-icons/fa';
import { useState } from "react";
import PaginationComponent from "../components/pagination";
import { CSVLink } from "react-csv";
import { Head } from "next/document";

export default function Home() {
  const [page, setPage] = useState(0)
  const fetcher = (url:string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(`/api/logs?page=${page}&take=10`, fetcher);
  const LogActions = (action:string) => {
    switch (action) {
      case 'Payment':
        return 'Pagamento'
      case 'Consulta':
        return 'Consulta'
      case 'Login':
        return 'Login'
      default:
        return 'Desconhecido'
    }
  }
  return (
    <Box w={'100%'}>
      <Center><Heading my={10}>Dashboard</Heading></Center>
      <SimpleGrid columns={2} gap={10}>
        <Card>
          <CardHeader>
            <Heading as={'h3'}>Assinantes Ativos</Heading>
          </CardHeader>
          <CardFooter>
            <Text>Assinantes</Text>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <Heading as={'h3'}>Assinantes Inativos</Heading>
          </CardHeader>
          <CardFooter>
            <Text>Assinantes</Text>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <Heading as={'h3'}>Pagamento Pendente</Heading>
          </CardHeader>
          <CardFooter>
            <Text>Assinantes</Text>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <Heading as={'h3'}>Vencimento Próximo</Heading>
          </CardHeader>
          <CardFooter>
            <Text>Assinantes</Text>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <Heading as={'h3'}>Valores Recebidos</Heading>
          </CardHeader>
          <CardFooter>
            <Text>Assinantes</Text>
          </CardFooter>
        </Card>
      </SimpleGrid>
    </Box>
  );
}
