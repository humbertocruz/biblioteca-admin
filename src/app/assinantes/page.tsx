'use client'
import { Box, Center, Heading, HStack, IconButton, Table,Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import useSWR from 'swr';
import dayjs from 'dayjs';
import { FaDollarSign, FaEdit, FaEye, FaHistory, FaPlus, FaTrash } from 'react-icons/fa';

export default function Home() {
  const fetcher = (url:string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR('/api/subscriber', fetcher);
  return (
    <Box w={'100%'}>
      <Center><Heading my={10}>Assinantes</Heading></Center>
      {isLoading ? <Center h={'80vh'}>Carregando...</Center>:
      <Table variant={'striped'}>
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Cidade</Th>
            <Th>Segmento</Th>
            <Th>Criado em</Th>
            <Th>Pago até</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.data.map((item:any, i:number) => {
            const vencido = !item.subscription || dayjs(item.subscription).isAfter(dayjs())
            return (
            <Tr key={'subscriber_'+i}>
              <Td>{item.name}</Td>
              <Td>{item.municipioName}</Td>
              <Td>{item.segment}</Td>
              <Td>{dayjs(item.createdAt).format('DD/MM/YYYY')}</Td>
              <Td color={dayjs(item.subscription).isAfter(dayjs())?'green':'red'}>{item.subscription?dayjs(item.subscription).format('DD/MM/YYYY'):'xx-xx-xx'}</Td>
              <Td>
                <HStack>
                  <IconButton as={'a'} href={`/assinantes/${item.id}/historico`} aria-label="Histórico" colorScheme="orange" size={'sm'} icon={<FaHistory />} />
                </HStack>
              </Td>
            </Tr>
          )
    })}
        </Tbody>
        <Tfoot>
          <IconButton as={'a'} href="/assinantes/novo" aria-label="Novo" colorScheme="orange" size={'sm'} icon={<FaPlus />} />
        </Tfoot>
      </Table>
      }
    </Box>
  );
}
