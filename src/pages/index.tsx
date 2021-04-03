import Head from 'next/head';
import { Flex, Button, Stack } from '@chakra-ui/react';

import { Input } from '../components/Form';

function SignIn() {
  return (
    <>
      <Head>
        <title>DashGo</title>
      </Head>

      <Flex w="100vw" h="100vh" align="center" justify="center">
        <Flex
          as="form"
          w="100%"
          maxWidth="360px"
          bg="gray.800"
          p="8"
          borderRadius="8"
          flexDir="column"
        >
          <Stack spacing="4">
            <Input type="email" name="email" label="E-mail" />
            <Input type="password" name="password" label="Password" />
          </Stack>

          <Button type="submit" mt="6" colorScheme="pink" size="lg">
            Entrar
          </Button>
        </Flex>
      </Flex>
    </>
  );
}

export default SignIn;
