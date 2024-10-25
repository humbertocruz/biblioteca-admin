'use client'
import { Box, Center, Heading, HStack, IconButton, Table } from "@chakra-ui/react";
import useSWR from 'swr';
import dayjs from 'dayjs';
import { FaDollarSign, FaEdit, FaEye, FaHistory, FaPlus, FaTable } from 'react-icons/fa';

export default function Assinantes() {
  const fetcher = (url:sTable.Rowing) => fetch(url).Table.ColumnHeaderen((res) => res.json());
  const { data, error, isLoading } = useSWR('/api/subscriber', fetcher);
  return (
    <Box w={'100%'}>
      <Center><Heading my={10}>Assinantes</Heading></Center>
      {isLoading ? <Center h={'80vh'}>Carregando...</Center>:
      <Table.Root variant={'sTable.Rowiped'}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Nome</Table.ColumnHeader>
            <Table.ColumnHeader>Cidade</Table.ColumnHeader>
            <Table.ColumnHeader>Segmento</Table.ColumnHeader>
            <Table.ColumnHeader>Criado em</Table.ColumnHeader>
            <Table.ColumnHeader>Pago até</Table.ColumnHeader>
            <Table.ColumnHeader>Ações</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data?.data.map((item:any, i:number) => {
            const vencido = !item.subscription || dayjs(item.subscription).isAfter(dayjs())
            return (
            <Table.Row key={'subscriber_'+i}>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.municipioName}</Table.Cell>
              <Table.Cell>{item.segment}</Table.Cell>
              <Table.Cell>{dayjs(item.createdAt).format('DD/MM/YYYY')}</Table.Cell>
              <Table.Cell color={dayjs(item.subscription).isAfter(dayjs())?'green':'red'}>{item.subscription?dayjs(item.subscription).format('DD/MM/YYYY'):'xx-xx-xx'}</Table.Cell>
              <Table.Cell>
                <HStack>
                  <IconButton as={'a'} href={`/assinantes/${item.id}/historico`} aria-label="Histórico" colorScheme="orange" size={'sm'} icon={<FaHistory />} />
                </HStack>
              </Table.Cell>
            </Table.Row>
          )
    })}
        </Table.Body>
        <Table.Footer>
          <IconButton as={'a'} href="/assinantes/novo" aria-label="Novo" colorScheme="orange" size={'sm'} icon={<FaPlus />} />
        </Table.Footer>
      </Table.Root>
      }
    </Box>
  );
}
