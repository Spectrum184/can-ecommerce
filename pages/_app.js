import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import Layout from 'components/Layout';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
