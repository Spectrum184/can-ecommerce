import Link from 'next/link';
import Head from 'next/head';

import { useState, useEffect } from 'react';
import { registerValidate } from 'utils/validate';
import { toast } from 'react-toastify';
import { postDataAPI } from 'utils/fetch-data';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const Register = () => {
  const initialState = {
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    name: '',
  };
  const router = useRouter();

  const [userData, setUserData] = useState(initialState);
  const { username, password, email, name, confirmPassword } = userData;
  const { data } = useSession();

  useEffect(() => {
    if (data) router.push('/');
  }, [data, router]);

  const handleDataInput = (e) => {
    const { name, value } = e.target;

    setUserData({ ...userData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const error = registerValidate(userData);

    if (error) {
      toast.error(error);
      return;
    }

    const res = await postDataAPI('auth/register', userData);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success(res.message);
      await signIn('credentials', {
        username,
        password,
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Head>
        <title>Đăng ký</title>
      </Head>
      <div className="bg-white sm:shadow-lg px-8 pb-6 w-full sm:w-8/12 md:w-7/12 xl:w-2/6 text-center rounded-sm">
        <div className="text-center w-full font-bold text-3xl text-gray-600 p-4">
          ĐĂNG KÝ
        </div>
        <div className="w-full bg-gray-200" style={{ height: '1px' }}></div>

        <div className="flex flex-col gap-4 px-0 py-4">
          <form method="POST" onSubmit={onSubmit}>
            <div>
              <label className="text-gray-700">Tên đăng nhập</label>
              <input
                className="py-2 px-2 border border-gray-200 w-full"
                placeholder="Tên đăng nhập"
                type="text"
                autoFocus
                autoComplete="username"
                value={username.toLowerCase().replace(/ /g, '')}
                onChange={handleDataInput}
                name="username"
              />
            </div>
            <div>
              <label className="text-gray-700">Email</label>
              <input
                className="py-2 px-2 border border-gray-200 w-full"
                placeholder="Email"
                type="text"
                value={email}
                onChange={handleDataInput}
                name="email"
              />
            </div>
            <div>
              <label className="text-gray-700">Tên</label>
              <input
                className="py-2 px-2 border border-gray-200 w-full"
                placeholder="Tên"
                type="text"
                value={name}
                onChange={handleDataInput}
                name="name"
              />
            </div>
            <div>
              <label className="text-gray-700">Mật khẩu</label>
              <input
                className="py-2 px-2 border border-gray-200 w-full"
                placeholder="Mật khẩu"
                type="password"
                autoComplete="password"
                onChange={handleDataInput}
                value={password}
                name="password"
              />
            </div>
            <div>
              <label className="text-gray-700">Xác nhận mật khẩu</label>
              <input
                className="py-2 px-2 border border-gray-200 w-full"
                placeholder="Xác nhận mật khẩu"
                type="password"
                autoComplete="password"
                onChange={handleDataInput}
                value={confirmPassword}
                name="confirmPassword"
              />
            </div>
            <div className="w-full flex flex-row gap-2 mt-2">
              <button
                type="submit"
                className="border border-indigo-500 hover:bg-indigo-500 hover:text-white duration-100 ease-in-out w-6/12 text-indigo-500 p-2 flex flex-row justify-center items-center gap-1"
              >
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
              </button>
              <Link href="/login">
                <a
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
                </a>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
