import { HStack, IconButton, Button, Th, Tr } from '@chakra-ui/react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

//@ts-ignore
const PaginationComponent = ({ total, setPage, page, perPage = 10 }) => {
    const calculatePages = () => Math.ceil(total/perPage)
    const showPageNumbers = () => {
        const pages = calculatePages()
        const arr = []
        for (let i = 0; i <= pages-1; i++) {
            const disabled = i === page
            if (!disabled) arr.push(<Button disabled={disabled} onClick={()=>setPage(i)} colorScheme={'orange'} size={'sm'}>{i+1}</Button>)
            else arr.push(<Button disabled={disabled} colorScheme={'gray'} size={'sm'}>{i+1}</Button>)
        }
        return arr
        }
    return(
        <Tr>
            <Th colSpan={2}>
                <HStack>
                    <IconButton aria-label="Primeira página" colorScheme="orange" size={'sm'} icon={<FaArrowLeft />} />
                    {showPageNumbers()}
                    <IconButton aria-label="Última página" colorScheme={'orange'} size={'sm'} icon={<FaArrowRight />} />
                </HStack>
            </Th>
            <Th colSpan={1}>{total} registros</Th>
        </Tr>
        
    )
}
export default PaginationComponent;