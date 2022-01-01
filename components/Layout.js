import Navbar from './Navbar';
import Head from 'next/head';

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-100 h-screen w-full overflow-hidden">
      <Head>
        <title>Trang chủ</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar />
      <div className="max-w-screen-xl px-6 mx-auto h-full">{children}</div>
    </div>
  );
};

export default Layout;
