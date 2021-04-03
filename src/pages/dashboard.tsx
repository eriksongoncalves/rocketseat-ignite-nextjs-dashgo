import Head from 'next/head';

import { Header } from '../components/Header';

function Dashboard() {
  return (
    <>
      <Head>
        <title>DashGo</title>
      </Head>
      <Header />
    </>
  );
}

export default Dashboard;
