'use client';
import { dateRangeAtom, filterTipoAtom, filterSearchAtom, filterNomeEmailAssinanteAtom } from "@/state/atoms";
import { Checkbox, FormControl, FormHelperText, HStack, Input, Select, Text, VStack } from "@chakra-ui/react";
import ReactDatePicker from "react-datepicker";
import { useRecoilState } from "recoil";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

export default function FiltersLog() {
    const [filterTipo, setFilterTipo] = useRecoilState(filterTipoAtom);
    const [dateRange, setDateRange] = useRecoilState(dateRangeAtom);
    const [filterSearch, setFilterSearch] = useRecoilState(filterSearchAtom);
    const [filterNomeEmailAssinante, setFilterNomeEmailAssinante] = useRecoilState(filterNomeEmailAssinanteAtom);

    return (
        <VStack>
            <Text>Tipo de Log</Text>
            <Select value={filterTipo} onChange={(e) => setFilterTipo(e.target.value)}>
                <option value="all">Todos</option>
                <option value="Consulta">Consulta</option>
                <option value="Login">Login</option>
                <option value="Payment">Pagamento</option>
            </Select>
            <FormControl>
            <Text>Assinante</Text>
                <Input value={filterNomeEmailAssinante} onChange={(e)=>setFilterNomeEmailAssinante(e.currentTarget.value)} placeholder="Nome ou email" />
                <FormHelperText>Digite 3 ou mais caracteres</FormHelperText>
            </FormControl>
            <Checkbox value={1} onChange={(e)=>setFilterSearch(e.currentTarget.checked.toString())}>Busca por Produto</Checkbox>
            <Text>Período</Text>
            <HStack>
                <ReactDatePicker onChange={()=>{}} withPortal minDate={dayjs('2019-01-01').toDate()} maxDate={dayjs().toDate()} locale={'pt'} dateFormat={'dd/MM/YYYY'} onSelect={(date)=>setDateRange([date||dayjs().startOf('month').toDate(),dateRange[1]])} selected={dateRange[0]} />
                <ReactDatePicker onChange={()=>{}} withPortal minDate={dayjs('2019-01-01').toDate()} maxDate={dayjs().toDate()} locale={'pt'} dateFormat={'dd/MM/YYYY'} onSelect={(date)=>setDateRange([dateRange[0],date||dayjs().toDate()])} selected={dateRange[1]} />
            </HStack>
        </VStack>
    )
}


