'use client'
import { Box, Button, Center, Heading, HStack, Icon, IconButton, Table,Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import useSWR from 'swr';
import dayjs from 'dayjs';
import { FaDollarSign, FaDownload, FaEye, FaTrash } from 'react-icons/fa';
import { CSVLink } from "react-csv";

export default function Home() {
  const fetcher = (url:string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR('/api/payment', fetcher);
  const PayStatus = (status:string) => {
    switch (status) {
      case 'payed':
        return 'Pago'
      case 'PENDING':
        return 'Pendente'
      case 'canceled':
        return 'Cancelado'
      default:
        return 'Desconhecido'
    }
  }
  const headers = [
    { label: "Criado em", key: "createdAt" },
    { label: "Assinante", key: "subscriber.name" },
    { label: "Situação", key: "status" },
    { label: "Meio", key: "method" },
    { label: "Valor", key: "value" }
  ];
  return (
    <Box w={'100%'}>
      <Center><Heading my={10}>Pagamentos</Heading></Center>
      <IconButton position={'absolute'} right={2} as={'a'}
        href={'/downloads/pagamentos'}
        target="_blank"
        colorScheme="orange"
        size={'sm'}
        aria-label="Exportar"
        icon={<FaDownload />}
      />
      {isLoading ? <Center h={'80vh'}>Carregando...</Center>:
      <Table variant={'striped'}>
        <Thead>
          <Tr>
            <Th>Criado em</Th>
            <Th>Assinante</Th>
            <Th>Situação</Th>
            <Th>Meio</Th>
            <Th>Valor</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.data.map((item:any, i:number) => {
            const vencido = !item.subscription || dayjs(item.subscription).isAfter(dayjs())
            return (
            <Tr key={'subscriber_'+i}>
              <Td>{dayjs(item.createdAt).format('DD/MM/YYYY')}</Td>
              <Td>{item.subscriber?.name}</Td>
              <Td>{PayStatus(item.status)}</Td>
              <Td>{item.method}</Td>
              <Td isNumeric>{parseFloat(item.value).toFixed(2)}</Td>
              <Td>
                <HStack>
                  <IconButton aria-label="Ver" colorScheme="orange" size={'sm'} icon={<FaEye />} />
                </HStack>
              </Td>
            </Tr>
          )
    })}
        </Tbody>
      </Table>
      }
    </Box>
  );
}
