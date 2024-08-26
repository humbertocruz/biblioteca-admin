'use client';
import { Center, Heading, List, ListItem, Spinner, Table, Th, Td, Tr, VStack } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { FC, useState } from 'react';
import useSWR from 'swr';
import {
    Pagination,
    usePagination,
    PaginationNext,
    PaginationPage,
    PaginationPrevious,
    PaginationContainer,
    PaginationPageGroup, } from '@ajna/pagination'

const HistoricoUsuariosPage = ({ params }: { params: { id: string } }) => {
    const fetcher = (url: string) => fetch(url).then((res) => res.json())
    const [page, setPage] = useState(1)
    const {data,error,isLoading} = useSWR(`/api/history?id=${params.id}&page=${page}`,fetcher)   
    const {
        currentPage,
        setCurrentPage,
        pagesCount,
        pages
      } = usePagination({
        pagesCount: 4,
        initialState: { currentPage: 1 },
    });

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
                <Pagination
                    pagesCount={pagesCount}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                >
                    <PaginationContainer>
                        <PaginationPrevious>Previous</PaginationPrevious>
                        <PaginationPageGroup>
                            {pages.map((page: number) => (
                            <PaginationPage 
                                key={`pagination_page_${page}`} 
                                page={page} 
                            />
                            ))}
                        </PaginationPageGroup>
                        <PaginationNext>Next</PaginationNext>
                    </PaginationContainer>
                </Pagination>
                <Table>
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
