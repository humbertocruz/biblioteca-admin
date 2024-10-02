// src/components/post-form.tsx

// this is a client component
'use client'

import { Box, Center, FormControl, FormHelperText, Heading, HStack, Input, Select } from "@chakra-ui/react";

import Link from "next/link"
import { useFormState } from "react-dom"

// Define the shape of the form errors
interface FormErrors {
    name?: string[],
    phone?: string[],
    cnpj?: string[],
    email?: string[]
}

// Define the shape of the form state
interface FormState {
    errors: FormErrors,
}

interface SubscriberFormProps {
    formAction: any, // The action to perform when the form is submitted
    initialData: { // The initial data for the form fields
        name: string,
        phone: string,
        cnpj: string,
        email: string
    },
}

// The formAction is the action to perform when the form is submitted. We use it as a props because
// we will use this for create and edit page which both page doesn't have the same action
// The initialData is the initial data for the form fields. 
const SubscriberForm = ({ formAction, initialData }: SubscriberFormProps) => {
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
    // Initialize the form state and action
    const [formState, action] = useFormState<FormState>(formAction, {
        errors: {},
    })

    return (
        <Box w={'100%'}>
        <Center><Heading my={10}>Editar Usuário</Heading></Center>
            <HStack>
            <FormControl>
                <Input value={initialData.name} placeholder="Nome" name="name"/>
                <FormHelperText>{formState.errors.name?.join(', ')}</FormHelperText>
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
    )
}

export default SubscriberForm