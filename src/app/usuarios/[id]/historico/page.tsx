'use client';
import { Box, Center, Heading, Icon, List, ListItem, Text, VStack } from '@chakra-ui/react';
import { FaSpinner } from 'react-icons/fa';
import useSWR from 'swr';
const HistoricoUsuariosPage = ({ params }: { params: { id: string } }) => {
    const fetcher = (url: string) => fetch(url).then((res) => res.json())
    const {data,error,isLoading} = useSWR(`/api/history?id=${params.id}`,fetcher)   
    if (!data) return <Center h={'100vh'}><Box bg={'orange.100'} p={10} rounded={10} shadow={10}>
        <VStack><Icon as={FaSpinner} w={10} h={10} />
        <Text>Carregando...</Text>
        </VStack>
        </Box></Center>
    return (
        <VStack>
            <Heading>HistoricoUsuariosPage</Heading>
            <List>
                <ListItem>Logins: {data.subscriberLogins}</ListItem>
                <ListItem>Consultas Simples: {data.data.length}</ListItem>
                <ListItem>Consultas Produto: {data.dataProd.length}</ListItem>
                <ListItem>Pagamentos: {data.subscriberPagamentos}</ListItem>
            </List>
        </VStack>
    );
    }
    export default HistoricoUsuariosPage;
