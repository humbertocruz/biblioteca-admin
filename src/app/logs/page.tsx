'use client'
import { Box, Center, Heading, HStack, IconButton, Table,Tbody, Td, Th, Thead, Tr, Text } from "@chakra-ui/react";
import useSWR from 'swr';
import dayjs from 'dayjs';
import { FaDollarSign, FaDownload, FaEye } from 'react-icons/fa';
import { useState } from "react";
import PaginationComponent from "../components/pagination";
import { CSVLink } from "react-csv";

export default function Home() {
  const [page, setPage] = useState(0)
  const fetcher = (url:string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(`/api/logs?page=${page}&take=10`, fetcher);
  const {data:data_download} = useSWR(`/api/logs?page=0&take=100000`, fetcher);
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
      <Center><Heading my={10}>Logs</Heading></Center>
      {data_download && <IconButton position={'absolute'} right={2} as={CSVLink}
        data={data_download.data}
        //headers={headers}
        filename={'pagamentos.csv'}
        colorScheme="orange"
        size={'sm'}
        aria-label="Exportar"
        icon={<FaDownload />}
      />}
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
            const { dateRangeStart, dateRangeEnd, region } = item.data
            return (
            <>
            <Tr key={'subscriber_'+i}>
              <Td>{dayjs(item.createdAt).format('DD/MM/YYYY HH:mm')}</Td>
              <Td>{item.subscriber.name}</Td>
              <Td>{LogActions(item.action)}</Td>
              <Td>
                <HStack>
                  <IconButton aria-label="Ver" colorScheme="orange" size={'sm'} icon={<FaEye />} />
                  <IconButton aria-label="Pagamentos" colorScheme={'orange'} size={'sm'} icon={<FaDollarSign />} />
                </HStack>
              </Td>
            </Tr>
            {item.action=='Consulta' && <Tr>
              <Td p={4} colSpan={4}>
                  <Text>De: {dayjs(dateRangeStart).format('DD/MM/YYYY HH:mm')} - Até: {dayjs(dateRangeEnd).format('DD/MM/YYYY HH:mm')}</Text>
                  <Text>Região: {region}</Text>
              </Td>
            </Tr>}
            {item.action=='Payment' && <Tr>
              <Td p={4} colSpan={4}>
                  <Text>Valor: {item.data.value}</Text>
                  <Text>Meio: {item.data.method}</Text>
              </Td>
            </Tr>}
            </>
          )
    })}
        </Tbody>
      </Table>
      }
    </Box>
  );
}
