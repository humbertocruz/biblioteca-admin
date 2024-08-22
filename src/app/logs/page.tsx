'use client'
import { Box, Center, Heading, HStack, IconButton, Table,Tbody, Td, Th, Thead, Tr, Text } from "@chakra-ui/react";
import useSWR from 'swr';
import dayjs from 'dayjs';
import { FaDollarSign, FaDownload, FaEye } from 'react-icons/fa';
import { useState } from "react";
import PaginationComponent from "../components/pagination";
import { useRecoilState, useRecoilValue } from "recoil";
import { dateRangeAtom, filterNomeEmailAssinanteAtom, filterSearchAtom, filterTipoAtom } from "@/state/atoms";

export default function Home() {
  const [page, setPage] = useState(0)
  const dateRange = useRecoilValue(dateRangeAtom);
  const filterTipo = useRecoilValue(filterTipoAtom);
  const filterSearch = useRecoilValue(filterSearchAtom);
  const filterAssinante = useRecoilValue(filterNomeEmailAssinanteAtom);

  const fetcher = (url:string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(`/api/logs?page=${page}&search=${filterSearch.toString()}&assinante=${filterAssinante.length>2?filterAssinante:''}&tipo=${filterTipo}&take=10&startDate=${dateRange[0]}&endDate=${dateRange[1]}`, fetcher);

  const LogActions = (action:string) => {
    switch (action) {
      case 'all':
        return 'Todos'
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
      <Text>Tipo: {LogActions(filterTipo)}</Text>
      <Text>De: {dayjs(dateRange[0]).format('DD/MM/YYYY')} - Até: {dayjs(dateRange[1]).format('DD/MM/YYYY')}</Text>
      <IconButton position={'absolute'} right={2} as={'a'}
        href={'/downloads/logs'}
        target="_blank"
        colorScheme="orange"
        size={'sm'}
        aria-label="Exportar"
        icon={<FaDownload />}
      />
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
            const { dateRangeStart, dateRangeEnd, region, search } = JSON.parse(item.data)
            
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
                  {search && <Text>Código Barras: {search}</Text>}
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
