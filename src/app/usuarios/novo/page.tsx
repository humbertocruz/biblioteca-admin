'use client'
import { Box, Center, FormControl, FormHelperText, Heading, HStack, Input, Select, VStack } from "@chakra-ui/react";
import { useState } from "react";

export default function Home() {
  const Segment:any = {
    'SUPERMERCADO':'Supermercado',
    'ATACADO':'Atacado',
    'ATACAREJO':'Atacarejo',
    'MERCEARIA':'Mercearia',
    'DISTRIBUIDOR':'Distribuidor',
    'RESTAURANTE':'Restaurante',
    'PETS':'Pets',
    'FARMACIA':'Farmácia',
    'OUTROS':'Outros'
  }
  const [values, setValues] = useState({
    name: '',
    contact: '',
    fantasyName: '',
    cnpj: '',
    email: '',
    segment: ''
  });
  return (
    <Box w={'100%'}>
      <Center><Heading my={10}>Novo Usuário</Heading></Center>
        <HStack>
          <FormControl>
            <Input value={values.name} placeholder="Nome" onChange={(e)=>setValues({...values,name:e.currentTarget.value})} />
          </FormControl>
          <FormControl>
            <Input placeholder="Contato" />
          </FormControl>
          <FormControl>
            <Input placeholder="Nome Fantasia"/>
          </FormControl>
        </HStack>
        <HStack>
          <FormControl>
            <Input placeholder="CNPJ" />
          </FormControl>
          <FormControl>
            <Input placeholder="Email" />
          </FormControl>
          <FormControl>
            <Select placeholder="Segmento">
              {Object.keys(Segment).map((key, i) => <option key={'segment_'+i} value={key}>{Segment[key]}</option>)}
            </Select>
          </FormControl>
        </HStack>
    </Box>
  );
}
