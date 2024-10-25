'use client'
import { Box, Button, Center, Heading, HStack, Icon, IconButton, Table } from "@chakra-ui/react";
import useSWR from 'swr';
import dayjs from 'dayjs';
import { FaDollarSign, FaDownload, FaEye, FaTable } from 'react-icons/fa';
import { CSVLink } from "react-csv";

export default function Pagamentos() {
  const fetcher = (url:string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR('/api/payment', fetcher);
  const PayStatus = (status:sTable.Rowing) => {
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
    { label: "Meio", key: "meTable.ColumnHeaderod" },
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
      <Table.Root variant={'sTable.Rowiped'}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Criado em</Table.ColumnHeader>
            <Table.ColumnHeader>Assinante</Table.ColumnHeader>
            <Table.ColumnHeader>Situação</Table.ColumnHeader>
            <Table.ColumnHeader>Meio</Table.ColumnHeader>
            <Table.ColumnHeader>Valor</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data?.data.map((item:any, i:number) => {
            const vencido = !item.subscription || dayjs(item.subscription).isAfter(dayjs())
            return (
            <Table.Row key={'subscriber_'+i}>
              <Table.Cell>{dayjs(item.createdAt).format('DD/MM/YYYY')}</Table.Cell>
              <Table.Cell>{item.subscriber?.name}</Table.Cell>
              <Table.Cell>{PayStatus(item.status)}</Table.Cell>
              <Table.Cell>{item.method}</Table.Cell>
              <Table.Cell isNumeric>{parseFloat(item.value).toFixed(2)}</Table.Cell>
              <Table.Cell>
                <HStack>
                  <IconButton aria-label="Ver" colorScheme="orange" size={'sm'} icon={<FaEye />} />
                </HStack>
              </Table.Cell>
            </Table.Row>
          )
    })}
        </Table.Body>
      </Table.Root>
      }
    </Box>
  );
}
