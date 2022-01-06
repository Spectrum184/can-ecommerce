import Navbar from './Navbar';
import Head from 'next/head';

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-100 w-full min-h-screen">
      <Head>
        <title>Trang chủ</title>
        <meta charSet="utf-8"></meta>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar />
      <div className="max-w-screen-xl px-6 mx-auto pt-14">{children}</div>
    </div>
  );
};

export default Layout;
