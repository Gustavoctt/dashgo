import Link from "next/link";
import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";

import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../services/api";
import { useRouter } from "next/router";

type CreateUserData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const createUsersFormSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('Email inválido'),
  password: yup.string().required('Senha obrigatória').min(6, 'A senha precisa ter no minímo 6 caracteres'),
  password_confirmation: yup.string().oneOf([
    null, yup.ref('password')
  ], 'As senhas precisam ser iguais')
})

export default function CreateUsers(){
  const router = useRouter();
  // Com o useMutation eu consigo verificar se occoreu erro, sucesso...
  const createUser = useMutation(async (users: CreateUserData) => {
    const response = await api.post('users', {
      user: {
        ...users,
        created_at: new Date()
      }
    })
    console.log(response.data.user)
    router.push('/users');
  })

  const { register, formState, handleSubmit } = useForm({
    resolver: yupResolver(createUsersFormSchema)
  })

  const { errors } = formState;

  const handleCreateUsers: SubmitHandler<CreateUserData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    await createUser.mutateAsync(values);
  }


  return(
    <>
      <header>
        <title>Dashgo. | Create</title>
      </header>
      
      <Box>
        <Header />
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar/>
          <Box 
            as="form"
            flex="1" 
            borderRadius={8} 
            bg="gray.800" 
            p={["6","8"]} 
            onSubmit={handleSubmit(handleCreateUsers)} 
          >
            <Heading size="lg" fontWeight="normal">Criar usuário</Heading>

            <Divider my="6" borderColor="gray.700" />

            <VStack spacing="8">
              <SimpleGrid minChildWidth="240px" spacing={["6","8"]} w="100%">
                <Input 
                  name="name" 
                  label="Nome completo" 
                  error={errors.name}
                  {...register('name')}
                />
                <Input 
                  name="email" 
                  type="email" 
                  label="E-mail" 
                  error={errors.email}
                  {...register('email')}
                />
              </SimpleGrid>

              <SimpleGrid minChildWidth="240px" spacing={["6","8"]} w="100%">
                <Input 
                  name="password" 
                  type="password" 
                  label="Senha" 
                  error={errors.password}
                  {...register('password')}
                />
                <Input 
                  name="password_confirmation" 
                  type="password" 
                  label="Confirme a senha" 
                  error={errors.password_confirmation}
                  {...register('password_confirmation')}
                />
              </SimpleGrid>
            </VStack>

            <Flex mt="8" justify="flex-end">
              <HStack spacing="4">
                <Link href="/users" passHref>
                  <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
                </Link>
                <Button type="submit" colorScheme="pink" isLoading={formState.isSubmitting}>Salvar</Button>
              </HStack>
            </Flex>

          </Box>
        </Flex>
      </Box>
    </>
  )
}