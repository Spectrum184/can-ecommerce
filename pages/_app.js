import 'styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import Layout from 'components/Layout';
import Loading from 'components/Loading';

import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
    };
    const handleComplete = () => {
      setPageLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
  }, [router]);

  return (
    <SessionProvider session={session}>
      {pageLoading ? (
        <Loading />
      ) : (
        <Layout>
          <Component {...pageProps} />
          <ToastContainer />
        </Layout>
      )}
    </SessionProvider>
  );
}

export default MyApp;
