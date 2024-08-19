'use client';
import { dateRangeAtom, filterTipoAtom } from "@/state/atoms";
import { HStack, Select, Text, VStack } from "@chakra-ui/react";
import ReactDatePicker from "react-datepicker";
import { useRecoilState } from "recoil";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

export default function FiltersLog() {
    const [filterTipo, setFilterTipo] = useRecoilState(filterTipoAtom);
    const [dateRange, setDateRange] = useRecoilState(dateRangeAtom);
    return (
        <VStack>
            <Text>Tipo de Log</Text>
            <Select value={filterTipo} onChange={(e) => setFilterTipo(e.target.value)}>
                <option value="all">Todos</option>
                <option value="Consulta">Consulta</option>
                <option value="Login">Login</option>
                <option value="Payment">Pagamento</option>
            </Select>
            <Text>Período</Text>
            <HStack>
                <ReactDatePicker withPortal minDate={dayjs('2019-01-01').toDate()} maxDate={dayjs().toDate()} locale={'pt'} dateFormat={'dd/MM/YYYY'} onSelect={(date)=>setDateRange([date,dateRange[1]])} selected={dateRange[0]} />
                <ReactDatePicker withPortal minDate={dayjs('2019-01-01').toDate()} maxDate={dayjs().toDate()} locale={'pt'} dateFormat={'dd/MM/YYYY'} onSelect={(date)=>setDateRange([dateRange[0],date])} selected={dateRange[1]} />
            </HStack>
        </VStack>
    )
}


