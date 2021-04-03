import Head from 'next/head';
import { Flex } from '@chakra-ui/react';

import { Header, Sidebar } from '../components';

function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard | DashGo</title>
      </Head>

      <Flex direction="column" h="100vh">
        <Header />
        <Flex w="100%" my="6" maxWidth="1480" mx="auto" px="6">
          <Sidebar />
        </Flex>
      </Flex>
    </>
  );
}

export default Dashboard;
