'use client'
import { Box, Center, Heading, HStack, IconButton, Table, Text } from "@chakra-ui/react";
import useSWR from 'swr';
import dayjs from 'dayjs';
import { FaDollarSign, FaDownload, FaEye } from 'react-icons/fa';
import { useState } from "react";
import PaginationComponent from "../components/pagination";
import { useRecoilValue } from "recoil";
import { dateRangeAtom, filterNomeEmailAssinanteAtom, filterSearchAtom, filterTipoAtom } from "@/state/atoms";

export default function Logs() {
  const [page, setPage] = useState(0)
  const dateRange = useRecoilValue(dateRangeAtom);
  const filterTipo = useRecoilValue(filterTipoAtom);
  const filterSearch = useRecoilValue(filterSearchAtom);
  const filterAssinante = useRecoilValue(filterNomeEmailAssinanteAtom);

  const fetcher = (url:string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(`/api/logs?page=${page}&search=${filterSearch.toString()}&assinante=${filterAssinante.length>2?filterAssinante:''}&tipo=${filterTipo}&take=10&startDate=${dateRange[0]}&endDate=${dateRange[1]}`, fetcher);
  console.log(data)
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
      <Table.Root variant={'striped'}>
        <Table.Header>
          <PaginationComponent perPage={10} total={data.counter} setPage={setPage} page={page} />
          <Table.Row>
            <Table.ColumnHeader>Criado em</Table.ColumnHeader>
            <Table.ColumnHeader>Assinante</Table.ColumnHeader>
            <Table.ColumnHeader>Tipo</Table.ColumnHeader>
            <Table.ColumnHeader>Ações</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data?.data.map((item:any, i:number) => {
            //const { dateRangeStart, dateRangeEnd, region, search } = JSON.parse(item.data)
            return (
            <>
            <Table.Row key={'subscriber_'+i}>
              <Table.Cell>{dayjs(item.createdAt).format('DD/MM/YYYY HH:mm')}</Table.Cell>
              <Table.Cell>{item.subscriber.name}</Table.Cell>
              <Table.Cell>{LogActions(item.action)}</Table.Cell>
              <Table.Cell>
                <HStack>
                  <IconButton aria-label="Ver" colorScheme="orange" size={'sm'} icon={<FaEye />} />
                  <IconButton aria-label="Pagamentos" colorScheme={'orange'} size={'sm'} icon={<FaDollarSign />} />
                </HStack>
              </Table.Cell>
            </Table.Row>
            {item.action=='Consulta' && <Table.Row>
              <Table.Cell p={4} colSpan={4}>
                  <Text>De: {dayjs(item.dateStart).format('DD/MM/YYYY HH:mm')} - Até: {dayjs(item.dateEnd).format('DD/MM/YYYY HH:mm')}</Text>
                  <Text>Região: {item.region}</Text>
                  {item.productId && <Text>Código Barras: {item.productId}</Text>}
              </Table.Cell>
            </Table.Row>}
            {item.action=='Payment' && <Table.Row>
              <Table.Cell p={4} colSpan={4}>
                  <Text>Valor: {item.data.value}</Text>
                  <Text>Meio: {item.data.method}</Text>
              </Table.Cell>
            </Table.Row>}
            </>
          )
    })}
        </Table.Body>
      </Table.Root>
      }
    </Box>
  );
}
