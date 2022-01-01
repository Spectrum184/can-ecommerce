import Head from 'next/head';
import Link from 'next/link';

import { useState, useEffect } from 'react';
import { getCsrfToken, signIn, useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const Login = ({ csrfToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { data } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (data) router.push('/');
  }, [data, router]);

  const loginWithCredential = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error('Vui lòng điền đầy đủ các ô');
      return;
    }

    const res = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    if (res.error) toast.error(res.error);
  };

  const loginWithGoogle = async (e) => {
    e.preventDefault();
    await signIn('google');
  };

  const loginWithFacebook = async (e) => {
    e.preventDefault();
    await signIn('facebook');
  };

  return (
    <div
      className="flex flex-col justify-center items-center w-full"
      style={{ height: 'calc(100vh - 56px)' }}
    >
      <Head>
        <title>Đăng nhập</title>
      </Head>
      <div className="bg-white sm:shadow-lg px-8 pb-6 w-full sm:w-8/12 md:w-7/12 xl:w-2/6 text-center rounded-sm">
        <div className="text-center w-full font-bold text-3xl text-gray-600 p-4">
          ĐĂNG NHẬP
        </div>
        <div className="w-full bg-gray-200" style={{ height: '1px' }}></div>

        <div className="flex flex-col gap-4 px-0 py-4">
          <form method="POST" onSubmit={loginWithCredential}>
            <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
            <div>
              <label className="text-gray-700">Tên đăng nhập</label>
              <input
                className="py-2 px-2 border border-gray-200 w-full"
                placeholder="Tên đăng nhập"
                type="text"
                autoFocus
                autoComplete="username"
                value={username.toLowerCase().replace(/ /g, '')}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="text-gray-700">Mật khẩu</label>
              <input
                className="py-2 px-2 border border-gray-200 w-full"
                placeholder="Mật khẩu"
                type="password"
                autoComplete="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="w-full flex flex-row gap-2 mt-2">
              <button
                className="border border-indigo-500 hover:bg-indigo-500 hover:text-white duration-100 ease-in-out w-6/12 text-indigo-500 p-0 flex flex-row justify-center items-center gap-1"
                type="submit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                Đăng nhập
              </button>
              <Link href="/register">
                <a className="border border-indigo-500 hover:bg-indigo-500 hover:text-white duration-100 ease-in-out w-6/12 text-indigo-500 p-2 flex flex-row justify-center items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Đăng ký
                </a>
              </Link>
            </div>
          </form>
          <div className="my-2 flex flex-row justify-center">
            <span className="absolute bg-white px-4">hoặc</span>
            <div
              className="w-full bg-gray-200 mt-3"
              style={{ height: '1px' }}
            ></div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <form action="POST" onSubmit={loginWithGoogle}>
              <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
              <button className="bg-red-500 text-white w-full p-2 flex flex-row justify-center gap-2 items-center hover:bg-red-600 duration-100 ease-in-out">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="img"
                  className="w-5"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <g fill="none">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12c6.627 0 12-5.373 12-12S18.627 0 12 0zm.14 19.018c-3.868 0-7-3.14-7-7.018c0-3.878 3.132-7.018 7-7.018c1.89 0 3.47.697 4.682 1.829l-1.974 1.978v-.004c-.735-.702-1.667-1.062-2.708-1.062c-2.31 0-4.187 1.956-4.187 4.273c0 2.315 1.877 4.277 4.187 4.277c2.096 0 3.522-1.202 3.816-2.852H12.14v-2.737h6.585c.088.47.135.96.135 1.474c0 4.01-2.677 6.86-6.72 6.86z"
                      fill="currentColor"
                    />
                  </g>
                </svg>
                Đăng nhập với Google
              </button>
            </form>
            <form action="POST" onSubmit={loginWithFacebook}>
              <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
              <button className="bg-blue-600 text-white w-full p-2 flex flex-row justify-center gap-2 items-center hover:bg-blue-700 duration-100 ease-in-out">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="img"
                  className="w-5"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 1024 1024"
                >
                  <path
                    d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-92.4 233.5h-63.9c-50.1 0-59.8 23.8-59.8 58.8v77.1h119.6l-15.6 120.7h-104V912H539.2V602.2H434.9V481.4h104.3v-89c0-103.3 63.1-159.6 155.3-159.6c44.2 0 82.1 3.3 93.2 4.8v107.9z"
                    fill="currentColor"
                  />
                </svg>
                Đăng nhập với Facebook
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

export default Login;
