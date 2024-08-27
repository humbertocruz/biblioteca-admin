'use client';
import PaginationComponent from '@/app/components/pagination';
import { Center, Heading, List, ListItem, Spinner, Table, Th, Td, Tr, VStack } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useState } from 'react';
import useSWR from 'swr';

const HistoricoUsuariosPage = ({ params }: { params: { id: string } }) => {
    const fetcher = (url: string) => fetch(url).then((res) => res.json())
    const [page, setPage] = useState(1)
    const {data,error,isLoading} = useSWR(`/api/history?id=${params.id}&page=${page}`,fetcher)   


if (!data) return <Center h={'100vh'}>
        <Spinner thickness='4px' size={'xl'} color={'orange.500'} label='Carregando...' />
    </Center>
    return (
        <VStack>
            <Heading>HistoricoUsuariosPage</Heading>
            <List>
                <ListItem>Logins: {data.subscriberLogins}</ListItem>
                <ListItem>Consultas Simples: {data.data.length}</ListItem>
                <ListItem>Consultas Produto: {data.dataProd.length}</ListItem>
                <ListItem>Pagamentos: {data.subscriberPagamentos}</ListItem>
            </List>
                <Table>
                <PaginationComponent total={data?.count} setPage={setPage} page={page} />
                    <Tr>
                        <Th w={100}>Ação</Th>
                        <Th>Data</Th>
                    </Tr>
                    {data.data.map((log: any) => (
                    <Tr>
                        <Td>{log.action}</Td>
                        <Td>{dayjs(log.createdAt).format('DD/MM/YYYY HH:mm')}</Td>
                    </Tr>
                    ))}
                </Table>
        </VStack>
    );
    }
    export default HistoricoUsuariosPage;
