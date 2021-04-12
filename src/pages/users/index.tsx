import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import {
  Box,
  Flex,
  Heading,
  Button,
  Icon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Checkbox,
  Td,
  Text,
  useBreakpointValue,
  Spinner
} from '@chakra-ui/react';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import { Header, Pagination, Sidebar } from '../../components';
import { api } from '../../services/api';

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

type Data = {
  users: User[];
};

function UserList() {
  const router = useRouter();
  const { data, isLoading, isFetching, error } = useQuery(
    'users',
    async () => {
      const { data: userData } = await api.get<Data>('users');

      const users = userData.users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: new Date(user.createdAt).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        })
      }));

      return users;
    },
    {
      staleTime: 1000 * 60 * 5
    }
  );
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });

  useEffect(() => {}, []);

  return (
    <Box>
      <Head>
        <title>Usuários | DashGo</title>
      </Head>

      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Heading>

            <Button
              as="a"
              size="sm"
              fontSize="sm"
              colorScheme="pink"
              leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              onClick={() => router.push('/users/create')}
            >
              Criar novo
            </Button>
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter os dados dos usuários</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={['4', '4', '6']} color="gray.600" width="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && (
                      <>
                        <Th>Data de cadastro</Th>
                        <Th w="8"></Th>
                      </>
                    )}
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.map(user => (
                    <Tr key={user.id}>
                      <Td px={['4', '4', '6']} color="gray.600" width="8">
                        <Checkbox colorScheme="pink" />
                      </Td>
                      <Td>
                        <Box>
                          <Text fontWeight="bold">{user.name}</Text>
                          <Text fontSize="sm" color="gray.300">
                            {user.email}
                          </Text>
                        </Box>
                      </Td>
                      {isWideVersion && (
                        <>
                          <Td>{user.created_at}</Td>
                          <Td>
                            <Button
                              as="a"
                              size="sm"
                              fontSize="sm"
                              colorScheme="purple"
                              leftIcon={
                                <Icon as={RiPencilLine} fontSize="16" />
                              }
                            >
                              Editar
                            </Button>
                          </Td>
                        </>
                      )}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Pagination />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

export default UserList;
