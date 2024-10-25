import { Button } from "@/components/ui/button";
import { VStack } from "@chakra-ui/react";

const LeftMenuComponent = ({selected}:{selected:string}) => {
    const Option = ({label,href}:{label:string,href:string}) => {
        return(
            <Button as={'a'} href={href} w={'100%'} bg={selected==label?'orange.700':'orange.500'}>{label}</Button>
        )
    }
    return(
        <VStack>
            <Option label="Dashboard" href="/dashboard" />
            <Option label="Assinantes" href="/assinantes" />
            <Option label="Pagamentos" href="/pagamentos" />
            <Option label="Logs" href="/logs" />
       </VStack>
    )
}
export default LeftMenuComponent
