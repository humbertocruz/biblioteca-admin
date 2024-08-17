'use client'
import { Box, Button, calc, Center, Heading, HStack, IconButton, Table,Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import useSWR from 'swr';
import dayjs from 'dayjs';
import { FaDollarSign, FaEye, FaTrash } from 'react-icons/fa';
import { useState } from "react";
import PaginationComponent from "../components/pagination";

export default function Home() {
  const [page, setPage] = useState(0)
  const fetcher = (url:string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(`/api/logs?page=${page}&take=10`, fetcher);
  
  return (
    <Box w={'100%'}>
      <Center><Heading my={10}>Logs</Heading></Center>
      {isLoading ? <Center h={'80vh'}>Carregando...</Center>:
      <Table variant={'striped'}>
        <Thead>
          <PaginationComponent perPage={10} total={data.counter} setPage={setPage} page={page} />
          <Tr>
            <Th>Criado em</Th>
            <Th>Assinante</Th>
            <Th>Tipo</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.data.map((item:any, i:number) => {
            const { dateRangeStart, dateRangeEnd, groupId } = JSON.parse(item.data)
            return (
            <>
            <Tr key={'subscriber_'+i}>
              <Td>{dayjs(item.createdAt).format('DD/MM/YYYY HH:mm')}</Td>
              <Td>{item.subscriber.name}</Td>
              <Td>{item.action}</Td>
              <Td>
                <HStack>
                  <IconButton aria-label="Ver" colorScheme="orange" size={'sm'} icon={<FaEye />} />
                  <IconButton aria-label="Pagamentos" colorScheme={'orange'} size={'sm'} icon={<FaDollarSign />} />
                </HStack>
              </Td>
            </Tr>
            <Tr>
              <Td p={10} colSpan={4} bg={'orange.100'}>
                  {dayjs(dateRangeStart).format('DD/MM/YYYY HH:mm')}
                  {dayjs(dateRangeEnd).format('DD/MM/YYYY HH:mm')}
                  {groupId}
              </Td>
            </Tr>
            </>
          )
    })}
        </Tbody>
      </Table>
      }
    </Box>
  );
}
